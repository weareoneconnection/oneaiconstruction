import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FeatureGrid } from '../../../components/FeatureGrid';
import { JsonLd } from '../../../components/JsonLd';
import { Section } from '../../../components/Section';
import { getDictionary } from '../../../lib/i18n/dictionaries';
import { isLocale, localePath } from '../../../lib/i18n/config';
import { connectors } from '../../../lib/product-facts';
import { breadcrumbSchema, pageMetadata } from '../../../lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDictionary(locale);
  return pageMetadata({
    locale,
    title: t.integrations.meta.title,
    description: t.integrations.meta.description,
    path: '/integrations'
  });
}

export default async function IntegrationsPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale);
  const p = t.integrations;

  /** Strongest direction a connector supports, for the summary column. */
  function direction(directions: readonly string[]) {
    if (directions.includes('bidirectional')) return p.directions.bidirectional;
    if (directions.includes('export')) return p.directions.export;
    return p.directions.import;
  }

  return (
    <>
      <JsonLd
        data={breadcrumbSchema(locale, [
          { name: t.nav.homeLabel, path: '/' },
          { name: p.meta.title, path: '/integrations' }
        ])}
      />

      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">{p.eyebrow}</span>
          <h1>{p.h1}</h1>
          <p>{p.lede}</p>
          <div className="hero-actions">
            <Link className="button" href={localePath(locale, '/contact')}>
              {p.ctaPrimary}
            </Link>
            <Link className="button secondary" href={localePath(locale, '/platform')}>
              {p.ctaSecondary}
            </Link>
          </div>
        </div>
      </section>

      <Section eyebrow={p.catalogEyebrow} title={p.catalogTitle} copy={p.catalogCopy}>
        <div className="compare-table-wrap">
          <table className="compare-table connector-table">
            <caption className="visually-hidden">{p.catalogTitle}</caption>
            <thead>
              <tr>
                <th scope="col">{p.headers.connector}</th>
                <th scope="col">{p.headers.auth}</th>
                <th scope="col">{p.headers.direction}</th>
                <th scope="col">{p.headers.modules}</th>
              </tr>
            </thead>
            <tbody>
              {connectors.map((connector) => (
                <tr key={connector.id}>
                  <th scope="row">
                    <strong>{connector.name}</strong>
                    <span className="connector-category">{p.categories[connector.category]}</span>
                  </th>
                  <td>{connector.auth}</td>
                  <td>{direction(connector.directions)}</td>
                  <td>
                    <span className="module-tags">
                      {connector.modules.map((module) => (
                        <i key={module}>{p.modules[module as keyof typeof p.modules] ?? module}</i>
                      ))}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section eyebrow={p.formatsEyebrow} title={p.formatsTitle} copy={p.formatsCopy} tone="raised">
        <FeatureGrid items={p.formats} />
      </Section>

      <Section eyebrow={p.syncEyebrow} title={p.syncTitle}>
        <FeatureGrid
          items={p.syncItems.map((item, index) => ({
            ...item,
            tag: String(index + 1).padStart(2, '0')
          }))}
        />
      </Section>

      <Section eyebrow={p.apiEyebrow} title={p.apiTitle} copy={p.apiCopy} tone="raised">
        <div className="metric-strip-grid inline-metrics">
          {p.apiItems.map((item) => (
            <div key={item.label}>
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
