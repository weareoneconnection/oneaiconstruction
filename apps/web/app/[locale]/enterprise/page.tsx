import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FeatureGrid } from '../../../components/FeatureGrid';
import { JsonLd } from '../../../components/JsonLd';
import { Section } from '../../../components/Section';
import { getDictionary } from '../../../lib/i18n/dictionaries';
import { isLocale, localePath } from '../../../lib/i18n/config';
import { breadcrumbSchema, pageMetadata } from '../../../lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDictionary(locale);
  return pageMetadata({
    locale,
    title: t.enterprise.meta.title,
    description: t.enterprise.meta.description,
    path: '/enterprise'
  });
}

export default async function EnterprisePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale);
  const p = t.enterprise;

  return (
    <>
      <JsonLd
        data={breadcrumbSchema(locale, [
          { name: t.nav.homeLabel, path: '/' },
          { name: p.meta.title, path: '/enterprise' }
        ])}
      />

      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">{p.eyebrow}</span>
          <h1>{p.h1}</h1>
          <p>{p.lede}</p>
          <div className="hero-actions">
            <Link className="button" href={localePath(locale, '/contact')}>
              {t.nav.bookDemo}
            </Link>
            <Link className="button secondary" href={localePath(locale, '/security')}>
              {p.securityLink}
            </Link>
          </div>
        </div>
      </section>

      <Section eyebrow={p.controlsEyebrow} title={p.controlsTitle}>
        <FeatureGrid items={p.controls} />
      </Section>

      <Section
        eyebrow={p.procurement.eyebrow}
        title={p.procurement.title}
        copy={p.procurement.copy}
      >
        <div className="pilot-detail">
          {p.procurement.items.map((item, index) => (
            <div key={item.label}>
              <span>{item.label}</span>
              <h3>{item.title}</h3>
              <p>
                {item.text}
                {index === p.procurement.items.length - 1 && (
                  <>
                    {' '}
                    <Link className="inline-link" href={localePath(locale, '/security')}>
                      {p.procurement.seeSecurity}
                    </Link>
                  </>
                )}
              </p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
