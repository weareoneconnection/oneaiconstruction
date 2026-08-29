import Link from 'next/link';
import { notFound } from 'next/navigation';
import { JsonLd } from '../../../components/JsonLd';
import { formatDate, getAllInsights } from '../../../lib/insights';
import { getDictionary } from '../../../lib/i18n/dictionaries';
import { isLocale, localePath } from '../../../lib/i18n/config';
import { breadcrumbSchema, pageMetadata } from '../../../lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDictionary(locale);
  return pageMetadata({
    locale,
    title: t.resources.meta.title,
    description: t.resources.meta.description,
    path: '/resources'
  });
}

export default async function ResourcesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const t = getDictionary(locale);
  const p = t.resources;
  const insights = getAllInsights(locale);

  return (
    <>
      <JsonLd
        data={breadcrumbSchema(locale, [
          { name: t.nav.homeLabel, path: '/' },
          { name: p.meta.title, path: '/resources' }
        ])}
      />

      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">{p.eyebrow}</span>
          <h1>{p.h1}</h1>
          <p>{p.lede}</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="insight-list">
            {insights.map((insight) => (
              <Link
                className="insight-row"
                key={insight.slug}
                href={localePath(locale, `/resources/${insight.slug}`)}
              >
                <div className="insight-meta">
                  <span className="tag">{insight.category}</span>
                  <time dateTime={insight.date}>{formatDate(insight.date, locale)}</time>
                </div>
                <div>
                  <h2>{insight.title}</h2>
                  <p>{insight.description}</p>
                  <span className="insight-more">
                    {p.readPrefix} {insight.readingTime} {p.minRead} <i aria-hidden="true">→</i>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
