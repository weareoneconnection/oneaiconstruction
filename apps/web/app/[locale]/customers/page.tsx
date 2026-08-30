import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FeatureGrid } from '../../../components/FeatureGrid';
import { LiveAccuracy } from '../../../components/LiveAccuracy';
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
    title: t.customers.meta.title,
    description: t.customers.meta.description,
    path: '/customers'
  });
}

export default async function ProofPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale);
  const p = t.customers;

  return (
    <>
      <JsonLd
        data={breadcrumbSchema(locale, [
          { name: t.nav.homeLabel, path: '/' },
          { name: p.meta.title, path: '/customers' }
        ])}
      />

      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">{p.eyebrow}</span>
          <h1>{p.h1}</h1>
          <p>{p.lede}</p>
        </div>
      </section>

      <Section eyebrow={p.metricsEyebrow} title={p.metricsTitle} copy={p.metricsCopy} tone="raised">
        <div className="compare-table-wrap">
          <table className="compare-table tolerance-table">
            <caption className="visually-hidden">{p.metricsTitle}</caption>
            <thead>
              <tr>
                <th scope="col">{p.toleranceHeaders.kind}</th>
                <th scope="col">{p.toleranceHeaders.tolerance}</th>
                <th scope="col">{p.toleranceHeaders.where}</th>
              </tr>
            </thead>
            <tbody>
              {p.tolerances.map((row) => (
                <tr key={row.kind}>
                  <th scope="row">{row.kind}</th>
                  <td className="tolerance-value">{row.tolerance}</td>
                  <td>{row.where}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="table-note">{p.tolerancesNote}</p>
        <LiveAccuracy locale={locale} t={t} />
      </Section>

      <Section eyebrow={p.evidenceEyebrow} title={p.evidenceTitle} copy={p.evidenceCopy}>
        <FeatureGrid
          items={p.evidenceItems.map((item, index) => ({
            ...item,
            tag: String(index + 1).padStart(2, '0')
          }))}
        />
      </Section>

      <section className="metric-strip">
        <div className="container">
          <div className="section-heading">
            <span className="eyebrow">{p.validationEyebrow}</span>
            <h2>{p.validationTitle}</h2>
            <p>{p.validationCopy}</p>
          </div>
        </div>
        <div className="container metric-strip-grid">
          {p.validationItems.map((item) => (
            <div key={item.label}>
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </section>

      <Section eyebrow={p.limitsEyebrow} title={p.limitsTitle} copy={p.limitsCopy}>
        <div className="hero-actions">
          <Link className="button secondary" href={localePath(locale, '/security')}>
            {t.enterprise.securityLink} →
          </Link>
          <Link className="button secondary" href={localePath(locale, '/contact')}>
            {t.nav.bookDemo} →
          </Link>
        </div>
      </Section>

      <section className="final-cta">
        <div className="container">
          <span className="eyebrow">{p.finalCta.eyebrow}</span>
          <h2>{p.finalCta.title}</h2>
          <p>{p.finalCta.copy}</p>
          <div>
            <Link className="button light" href={localePath(locale, '/pilot')}>
              {p.finalCta.primary}
            </Link>
            <Link className="button secondary-light" href={localePath(locale, '/contact')}>
              {p.finalCta.secondary}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
