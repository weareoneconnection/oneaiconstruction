import Link from 'next/link';
import { notFound } from 'next/navigation';
import { JsonLd } from '../../../../components/JsonLd';
import {
  formatDate,
  getAllInsights,
  getInsight,
  getInsightSlugs,
  renderMarkdown
} from '../../../../lib/insights';
import { getDictionary } from '../../../../lib/i18n/dictionaries';
import { isLocale, localePath, locales } from '../../../../lib/i18n/config';
import { articleSchema, breadcrumbSchema, pageMetadata } from '../../../../lib/seo';

export function generateStaticParams() {
  return locales.flatMap((locale) => getInsightSlugs().map((slug) => ({ locale, slug })));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};

  const insight = getInsight(locale, slug);
  if (!insight) {
    return pageMetadata({
      locale,
      title: getDictionary(locale).resources.notFound,
      description: '',
      path: '/resources',
      noIndex: true
    });
  }

  return pageMetadata({
    locale,
    title: insight.title,
    description: insight.description,
    path: `/resources/${insight.slug}`
  });
}

export default async function InsightPage({
  params
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();

  const insight = getInsight(locale, slug);
  if (!insight) notFound();

  const t = getDictionary(locale);
  const p = t.resources;
  const related = getAllInsights(locale)
    .filter((item) => item.slug !== insight.slug)
    .slice(0, 2);

  return (
    <>
      <JsonLd data={articleSchema(locale, insight)} />
      <JsonLd
        data={breadcrumbSchema(locale, [
          { name: t.nav.homeLabel, path: '/' },
          { name: p.meta.title, path: '/resources' },
          { name: insight.title, path: `/resources/${insight.slug}` }
        ])}
      />

      <article>
        <section className="page-hero article-hero">
          <div className="container">
            <div className="insight-meta">
              <span className="tag">{insight.category}</span>
              <time dateTime={insight.date}>{formatDate(insight.date, locale)}</time>
              <span>
                {insight.readingTime} {p.minReadSuffix}
              </span>
            </div>
            <h1>{insight.title}</h1>
            <p>{insight.description}</p>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div
              className="prose"
              dangerouslySetInnerHTML={{ __html: renderMarkdown(insight.body) }}
            />
          </div>
        </section>
      </article>

      <section className="section tone-raised">
        <div className="container">
          <div className="section-heading">
            <span className="eyebrow">{p.relatedEyebrow}</span>
            <h2>{p.relatedTitle}</h2>
          </div>
          <div className="insight-list">
            {related.map((item) => (
              <Link
                className="insight-row"
                key={item.slug}
                href={localePath(locale, `/resources/${item.slug}`)}
              >
                <div className="insight-meta">
                  <span className="tag">{item.category}</span>
                </div>
                <div>
                  <h2>{item.title}</h2>
                  <p>{item.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
