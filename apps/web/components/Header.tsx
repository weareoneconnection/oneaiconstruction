'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BrandMark } from './BrandMark';
import { LanguageSwitcher } from './LanguageSwitcher';
import { MobileNav } from './MobileNav';
import type { Dictionary } from '../lib/i18n/dictionaries';
import { localePath, splitLocale, type Locale } from '../lib/i18n/config';
import { primaryNav } from '../lib/navigation';

export function Header({ locale, t }: { locale: Locale; t: Dictionary }) {
  const pathname = usePathname();
  const { rest } = splitLocale(pathname);

  return (
    <header className="site-header">
      <div className="container nav-shell">
        <Link href={localePath(locale, '/')} className="brand" aria-label={t.nav.homeLabel}>
          <BrandMark size={38} />
          <span>
            <strong>ONEAI</strong>
            <small>CONSTRUCTION</small>
          </span>
        </Link>

        <nav className="desktop-nav" aria-label={t.nav.primaryLabel}>
          {primaryNav(t).map((item) => (
            <Link
              key={item.href}
              href={localePath(locale, item.href)}
              aria-current={rest.startsWith(item.href) ? 'page' : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="nav-actions">
          <LanguageSwitcher locale={locale} label={t.nav.switchLanguage} />
          <Link className="text-link" href={localePath(locale, '/pilot')}>
            {t.nav.pilot}
          </Link>
          <Link className="button small" href={localePath(locale, '/contact')}>
            {t.nav.bookDemo}
          </Link>
          <MobileNav locale={locale} t={t} />
        </div>
      </div>
    </header>
  );
}
