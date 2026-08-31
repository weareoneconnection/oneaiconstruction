'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import type { Dictionary } from '../lib/i18n/dictionaries';
import { localePath, splitLocale, type Locale } from '../lib/i18n/config';
import { primaryNav } from '../lib/navigation';

export function MobileNav({ locale, t }: { locale: Locale; t: Dictionary }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const panelRef = useRef<HTMLDivElement>(null);
  const { rest } = splitLocale(pathname);

  // The panel is portalled to <body>, which only exists once hydrated.
  useEffect(() => setMounted(true), []);

  // Close on route change so a tap on a link does not leave the panel open.
  useEffect(() => setOpen(false), [pathname]);

  // Lock the page behind the panel and restore focus predictably.
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    panelRef.current?.querySelector<HTMLElement>('a')?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false);
    }
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  // `.site-header` carries a backdrop-filter, which makes it the containing block
  // for any `position: fixed` descendant. Rendered inside it, this panel resolved
  // its `inset: 66px 0 0` against the 66px-tall header and collapsed to a 65px
  // sliver - open, populated, and showing nothing. Portalling it to <body> puts it
  // back on the viewport, where a full-screen overlay belongs.
  const panel = !mounted ? null : createPortal(
    <div
      id="mobile-nav-panel"
      ref={panelRef}
      className={`mobile-nav${open ? ' is-open' : ''}`}
      hidden={!open}
    >
      <nav aria-label={t.nav.mobileLabel}>
        {primaryNav(t).map((item) => (
          <Link
            key={item.href}
            href={localePath(locale, item.href)}
            aria-current={rest === item.href ? 'page' : undefined}
          >
            {item.label}
          </Link>
        ))}
        <Link href={localePath(locale, '/pilot')}>{t.nav.enterprisePilot}</Link>
      </nav>
      <Link className="button" href={localePath(locale, '/contact')}>
        {t.nav.bookDemo}
      </Link>
    </div>,
    document.body
  );

  return (
    <>
      <button
        type="button"
        className="nav-toggle"
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
        onClick={() => setOpen((value) => !value)}
      >
        <span className={`nav-toggle-bars${open ? ' is-open' : ''}`} aria-hidden="true">
          <i />
          <i />
        </span>
      </button>

      {panel}
    </>
  );
}
