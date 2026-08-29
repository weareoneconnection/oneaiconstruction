import Link from 'next/link';
import { notFound } from 'next/navigation';
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

export default async function CustomersPage({ params }: { params: Promise<{ locale: string }> }) {
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

      <section className="metric-strip">
        <div className="container metric-strip-grid">
          {p.metrics.map((metric) => (
            <div key={metric.label}>
              <strong>{metric.value}</strong>
              <span>{metric.label}</span>
            </div>
          ))}
        </div>
      </section>

      <Section eyebrow={p.casesEyebrow} title={p.casesTitle} copy={p.casesCopy}>
        <div className="case-list">
          {p.cases.map((study) => (
            <article className="case-card" key={study.slug} id={study.slug}>
              <div className="case-head">
                <span className="tag">{study.sector}</span>
                <h3>{study.title}</h3>
                <p className="case-scope">{study.scope}</p>
              </div>

              <div className="case-body">
                <div>
                  <h4>{p.labels.challenge}</h4>
                  <p>{study.challenge}</p>
                </div>
                <div>
                  <h4>{p.labels.approach}</h4>
                  <p>{study.approach}</p>
                </div>
                <div>
                  <h4>{p.labels.outcome}</h4>
                  <ul>
                    {study.outcomes.map((outcome) => (
                      <li key={outcome}>{outcome}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <p className="case-disclosure">{study.disclosure}</p>
            </article>
          ))}
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
