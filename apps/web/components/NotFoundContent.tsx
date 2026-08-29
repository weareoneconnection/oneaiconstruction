import Link from 'next/link';
import type { Dictionary } from '../lib/i18n/dictionaries';
import { localePath, type Locale } from '../lib/i18n/config';

export function NotFoundContent({ locale, t }: { locale: Locale; t: Dictionary }) {
  const p = t.notFound;

  return (
    <section className="page-hero not-found">
      <div className="container">
        <span className="eyebrow">{p.code}</span>
        <h1>{p.title}</h1>
        <p>{p.lede}</p>
        <div className="hero-actions">
          <Link className="button" href={localePath(locale, '/')}>
            {p.home}
          </Link>
          <Link className="button secondary" href={localePath(locale, '/resources')}>
            {p.resources}
          </Link>
        </div>
      </div>
    </section>
  );
}
