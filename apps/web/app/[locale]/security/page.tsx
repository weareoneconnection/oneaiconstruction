import Link from 'next/link';
import { notFound } from 'next/navigation';
import { JsonLd } from '../../../components/JsonLd';
import { Section } from '../../../components/Section';
import { contactEmail } from '../../../lib/config';
import { getDictionary } from '../../../lib/i18n/dictionaries';
import { isLocale, localePath } from '../../../lib/i18n/config';
import { breadcrumbSchema, pageMetadata } from '../../../lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDictionary(locale);
  return pageMetadata({
    locale,
    title: t.security.meta.title,
    description: t.security.meta.description,
    path: '/security'
  });
}

export default async function SecurityPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale);
  const p = t.security;

  return (
    <>
      <JsonLd
        data={breadcrumbSchema(locale, [
          { name: t.nav.homeLabel, path: '/' },
          { name: p.meta.title, path: '/security' }
        ])}
      />

      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">{p.eyebrow}</span>
          <h1>{p.h1}</h1>
          <p>{p.lede}</p>
          <Link className="button" href={localePath(locale, '/contact')}>
            {p.cta}
          </Link>
        </div>
      </section>

      <section className="commitment-strip">
        <div className="container commitment-grid">
          {p.commitments.map((item) => (
            <div key={item.title}>
              <strong>{item.title}</strong>
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </section>

      <Section eyebrow={p.controlsEyebrow} title={p.controlsTitle} copy={p.controlsCopy}>
        <div className="control-grid">
          {p.controls.map((group) => (
            <article className="control-card" key={group.heading}>
              <h3>{group.heading}</h3>
              <ul>
                {group.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Section>

      <Section eyebrow={p.disclosure.eyebrow} title={p.disclosure.title} copy={p.disclosure.copy}>
        <div className="disclosure-card">
          <div>
            <span>{p.disclosure.contactLabel}</span>
            <a className="inline-link" href={`mailto:${contactEmail}`}>
              {contactEmail}
            </a>
          </div>
          <div>
            <span>{p.disclosure.responseLabel}</span>
            <p>{p.disclosure.responseText}</p>
          </div>
          <div>
            <span>{p.disclosure.docsLabel}</span>
            <p>{p.disclosure.docsText}</p>
          </div>
        </div>
      </Section>
    </>
  );
}
