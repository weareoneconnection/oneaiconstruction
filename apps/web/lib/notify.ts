import type { ContactInput } from './contact-schema';
import { INTEREST_LABELS } from './contact-options';

type Lead = ContactInput & { ip: string; submittedAt: string; locale: string };

/**
 * Deliver a lead. Resend is used when configured; a generic webhook (Slack,
 * HubSpot, Zapier, n8n) is used when configured. Both are attempted, and the
 * caller only fails if *every* configured channel fails.
 *
 * With nothing configured the lead is logged to the server so a misconfigured
 * production deploy is loud in the logs rather than silently dropping demand.
 */
export async function deliverLead(lead: Lead): Promise<{ delivered: boolean; channels: string[] }> {
  const tasks: Promise<string>[] = [];

  if (process.env.RESEND_API_KEY && process.env.LEAD_INBOX) tasks.push(sendViaResend(lead));
  if (process.env.LEAD_WEBHOOK_URL) tasks.push(sendViaWebhook(lead));

  if (tasks.length === 0) {
    console.warn(
      '[contact] No delivery channel configured (RESEND_API_KEY+LEAD_INBOX or LEAD_WEBHOOK_URL). Lead captured in logs only:',
      JSON.stringify({ ...lead, message: lead.message.slice(0, 200) })
    );
    return { delivered: false, channels: [] };
  }

  const results = await Promise.allSettled(tasks);
  const channels = results.flatMap((r) => (r.status === 'fulfilled' ? [r.value] : []));

  for (const r of results) {
    if (r.status === 'rejected') console.error('[contact] delivery channel failed:', r.reason);
  }

  return { delivered: channels.length > 0, channels };
}

async function sendViaResend(lead: Lead): Promise<string> {
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: process.env.LEAD_FROM || 'OneAI Construction <notifications@oneaiconstruction.com>',
      to: [process.env.LEAD_INBOX],
      reply_to: lead.email,
      subject: `[${INTEREST_LABELS[lead.interest]}] ${lead.company} — ${lead.name}`,
      text: formatLead(lead)
    })
  });

  if (!response.ok) {
    throw new Error(`Resend responded ${response.status}: ${await response.text()}`);
  }
  return 'resend';
}

async function sendViaWebhook(lead: Lead): Promise<string> {
  const response = await fetch(process.env.LEAD_WEBHOOK_URL as string, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ source: 'oneaiconstruction.com', text: formatLead(lead), lead })
  });

  if (!response.ok) {
    throw new Error(`Webhook responded ${response.status}`);
  }
  return 'webhook';
}

function formatLead(lead: Lead): string {
  return [
    `Name:      ${lead.name}`,
    `Company:   ${lead.company}`,
    `Email:     ${lead.email}`,
    `Role:      ${lead.role || '—'}`,
    `Interest:  ${INTEREST_LABELS[lead.interest]}`,
    `Submitted: ${lead.submittedAt}`,
    `Language:  ${lead.locale}`,
    `IP:        ${lead.ip}`,
    '',
    lead.message
  ].join('\n');
}
