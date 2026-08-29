'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useTransition } from 'react';
import {
  localeNames,
  localePath,
  localeShortNames,
  locales,
  splitLocale,
  type Locale
} from '../lib/i18n/config';

const LOCALE_COOKIE = 'oneai-locale';

/**
 * Switches locale while staying on the same page. The choice is written to the
 * same cookie the middleware reads, so a later visit to a bare path lands on
 * the language the visitor actually picked.
 */
export function LanguageSwitcher({ locale, label }: { locale: Locale; label: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const { rest } = splitLocale(pathname);

  function choose(next: Locale) {
    if (next === locale) return;
    document.cookie = `${LOCALE_COOKIE}=${next};path=/;max-age=${60 * 60 * 24 * 365};samesite=lax`;
    startTransition(() => router.push(localePath(next, rest)));
  }

  return (
    <div className="lang-switch" role="group" aria-label={label}>
      {locales.map((candidate) => (
        <button
          key={candidate}
          type="button"
          lang={candidate}
          className={candidate === locale ? 'is-active' : ''}
          aria-current={candidate === locale ? 'true' : undefined}
          aria-label={localeNames[candidate]}
          disabled={pending}
          onClick={() => choose(candidate)}
        >
          {localeShortNames[candidate]}
        </button>
      ))}
    </div>
  );
}
