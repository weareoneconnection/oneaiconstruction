import Link from 'next/link';
import { contactEmail, site } from '../lib/config';
import type { Dictionary } from '../lib/i18n/dictionaries';
import { localePath, type Locale } from '../lib/i18n/config';
import { footerNav } from '../lib/navigation';

export function Footer({ locale, t }: { locale: Locale; t: Dictionary }) {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <div className="brand footer-brand">
            <span className="brand-mark" aria-hidden="true">
              1A
            </span>
            <span>
              <strong>ONEAI</strong>
              <small>CONSTRUCTION</small>
            </span>
          </div>
          <p className="muted">{t.footer.blurb}</p>
          <a className="inline-link" href={`mailto:${contactEmail}`}>
            {contactEmail}
          </a>
        </div>

        {footerNav(t).map((group) => (
          <div key={group.heading}>
            <h4>{group.heading}</h4>
            {group.links.map((link) => (
              <Link key={link.href} href={localePath(locale, link.href)}>
                {link.label}
              </Link>
            ))}
          </div>
        ))}
      </div>

      <div className="container footer-bottom">
        <span>
          © {new Date().getFullYear()} {site.name}. {t.footer.rights}
        </span>
        <span>{t.meta.tagline}</span>
      </div>
    </footer>
  );
}
