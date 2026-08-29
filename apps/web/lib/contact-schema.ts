import { z } from 'zod';
import { INTEREST_VALUES } from './contact-options';
import { getDictionary } from './i18n/dictionaries';
import { defaultLocale, isLocale, type Locale } from './i18n/config';

/** Free-mail domains rejected on an enterprise demo form. */
const FREE_EMAIL_DOMAINS = new Set([
  'gmail.com',
  'yahoo.com',
  'hotmail.com',
  'outlook.com',
  'icloud.com',
  'aol.com',
  'proton.me',
  'protonmail.com',
  'mail.com',
  'gmx.com',
  'qq.com',
  '163.com'
]);

/**
 * Built per request so validation errors come back in the visitor's language.
 * The locale travels with the payload — the API route has no layout context to
 * read it from.
 */
export function contactSchema(locale: Locale = defaultLocale) {
  const v = getDictionary(locale).validation;

  return z.object({
    name: z.string().trim().min(2, v.name).max(120),
    company: z.string().trim().min(2, v.company).max(160),
    email: z
      .string()
      .trim()
      .toLowerCase()
      .email(v.emailInvalid)
      .max(200)
      .refine((value) => !FREE_EMAIL_DOMAINS.has(value.split('@')[1] ?? ''), v.emailFree),
    role: z.string().trim().max(120).optional().or(z.literal('')),
    interest: z.enum(INTEREST_VALUES).default('enterprise-demo'),
    message: z.string().trim().min(20, v.message).max(4000),
    /** Honeypot: must stay empty. Bots fill every field they find. */
    website: z.string().max(0).optional().or(z.literal('')),
    /** Which language the form was submitted in. */
    locale: z.string().optional()
  });
}

export type ContactInput = z.infer<ReturnType<typeof contactSchema>>;

/** Read the submitted locale defensively — it arrives from the browser. */
export function localeFromPayload(payload: unknown): Locale {
  if (payload && typeof payload === 'object' && 'locale' in payload) {
    const value = (payload as { locale?: unknown }).locale;
    if (typeof value === 'string' && isLocale(value)) return value;
  }
  return defaultLocale;
}
