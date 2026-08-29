import { NextResponse } from 'next/server';
import { contactSchema, localeFromPayload } from '../../../lib/contact-schema';
import { clientIp, rateLimit } from '../../../lib/rate-limit';
import { deliverLead } from '../../../lib/notify';
import { getDictionary } from '../../../lib/i18n/dictionaries';
import { defaultLocale } from '../../../lib/i18n/config';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Two budgets rather than one. A visitor correcting a typo should not burn the
 * same quota as a visitor sending real enquiries, so validation failures are
 * charged only against the loose request budget.
 */
const REQUEST_BUDGET = { limit: 30, windowMs: 60 * 60 * 1000 };
const SUBMISSION_BUDGET = { limit: 5, windowMs: 60 * 60 * 1000 };

export async function POST(request: Request) {
  const ip = clientIp(request);

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: getDictionary(defaultLocale).apiErrors.malformed },
      { status: 400 }
    );
  }

  const locale = localeFromPayload(payload);
  const errors = getDictionary(locale).apiErrors;

  const requests = rateLimit(`contact:req:${ip}`, REQUEST_BUDGET);
  if (!requests.ok) return tooMany(requests.resetAt, errors.tooMany);

  const parsed = contactSchema(locale).safeParse(payload);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const field = String(issue.path[0] ?? 'form');
      fieldErrors[field] ??= issue.message;
    }
    return NextResponse.json({ ok: false, error: errors.checkForm, fieldErrors }, { status: 422 });
  }

  // Honeypot tripped: accept silently so the bot does not learn it was caught.
  if (parsed.data.website) {
    return NextResponse.json({ ok: true });
  }

  const submissions = rateLimit(`contact:sub:${ip}`, SUBMISSION_BUDGET);
  if (!submissions.ok) return tooMany(submissions.resetAt, errors.tooMany);

  try {
    const { delivered } = await deliverLead({
      ...parsed.data,
      locale,
      ip,
      submittedAt: new Date().toISOString()
    });

    // A configured-but-failing channel is a real outage: tell the visitor so
    // they can fall back to email rather than assume we received the request.
    if (!delivered && process.env.NODE_ENV === 'production' && hasChannel()) {
      return NextResponse.json({ ok: false, error: errors.undelivered }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('[contact] unexpected failure:', error);
    return NextResponse.json({ ok: false, error: errors.unexpected }, { status: 500 });
  }
}

function tooMany(resetAt: number, message: string) {
  return NextResponse.json(
    { ok: false, error: message },
    {
      status: 429,
      headers: { 'Retry-After': String(Math.ceil((resetAt - Date.now()) / 1000)) }
    }
  );
}

function hasChannel() {
  return Boolean(
    (process.env.RESEND_API_KEY && process.env.LEAD_INBOX) || process.env.LEAD_WEBHOOK_URL
  );
}
