'use client';

import { FormEvent, useState } from 'react';
import { INTEREST_VALUES } from '../lib/contact-options';
import type { Dictionary } from '../lib/i18n/dictionaries';
import type { Locale } from '../lib/i18n/config';

type Status = 'idle' | 'submitting' | 'success' | 'error';

export function ContactForm({
  locale,
  t,
  contactEmail
}: {
  locale: Locale;
  t: Dictionary;
  contactEmail: string;
}) {
  const f = t.contact.form;
  const [status, setStatus] = useState<Status>('idle');
  const [formError, setFormError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === 'submitting') return;

    setStatus('submitting');
    setFormError(null);
    setFieldErrors({});

    const payload = Object.fromEntries(new FormData(event.currentTarget));

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // The API has no layout context, so the locale travels with the payload
        // and validation errors come back in the visitor's language.
        body: JSON.stringify({ ...payload, locale })
      });
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        setFieldErrors(data.fieldErrors ?? {});
        setFormError(data.error ?? f.genericError);
        setStatus('error');
        return;
      }

      setStatus('success');
    } catch {
      setFormError(f.networkError);
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="contact-form">
        <div className="success" role="status">
          <strong>{f.successTitle}</strong>
          <p>
            {f.successBodyPrefix}
            <a className="inline-link" href={`mailto:${contactEmail}`}>
              {contactEmail}
            </a>
            .
          </p>
        </div>
      </div>
    );
  }

  const busy = status === 'submitting';

  return (
    <form className="contact-form" onSubmit={submit} noValidate>
      {formError && (
        <div className="form-error" role="alert">
          {formError}
        </div>
      )}

      <Field id="name" label={f.name} error={fieldErrors.name}>
        <input id="name" name="name" autoComplete="name" required disabled={busy} />
      </Field>

      <Field id="company" label={f.company} error={fieldErrors.company}>
        <input id="company" name="company" autoComplete="organization" required disabled={busy} />
      </Field>

      <Field id="email" label={f.email} error={fieldErrors.email}>
        <input id="email" name="email" type="email" autoComplete="email" required disabled={busy} />
      </Field>

      <Field id="role" label={f.role} error={fieldErrors.role}>
        <input id="role" name="role" autoComplete="organization-title" disabled={busy} />
      </Field>

      <Field id="interest" label={f.interest} error={fieldErrors.interest}>
        <select id="interest" name="interest" defaultValue="enterprise-demo" disabled={busy}>
          {INTEREST_VALUES.map((value) => (
            <option key={value} value={value}>
              {f.interests[value]}
            </option>
          ))}
        </select>
      </Field>

      <Field id="message" label={f.message} error={fieldErrors.message}>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          disabled={busy}
          placeholder={f.messagePlaceholder}
        />
      </Field>

      {/* Honeypot — hidden from people, irresistible to bots. */}
      <div className="honeypot" aria-hidden="true">
        <label htmlFor="website">{f.honeypot}</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <button className="button" type="submit" disabled={busy}>
        {busy ? f.submitting : f.submit}
      </button>

      <p className="form-note">{f.note}</p>
    </form>
  );
}

function Field({
  id,
  label,
  error,
  children
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`field${error ? ' has-error' : ''}`}>
      <label htmlFor={id}>{label}</label>
      {children}
      {error && (
        <span className="field-error" role="alert">
          {error}
        </span>
      )}
    </div>
  );
}
