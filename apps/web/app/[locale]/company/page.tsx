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
    title: t.company.meta.title,
    description: t.company.meta.description,
    path: '/company'
  });
}

export default async function CompanyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale);
  const p = t.company;

  return (
    <>
      <JsonLd
        data={breadcrumbSchema(locale, [
          { name: t.nav.homeLabel, path: '/' },
          { name: p.meta.title, path: '/company' }
        ])}
      />

      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">{p.eyebrow}</span>
          <h1>{p.h1}</h1>
          <p>{p.lede}</p>
        </div>
      </section>

      <Section eyebrow={p.viewEyebrow} title={p.viewTitle}>
        <div className="prose narrative">
          {p.narrative.map((paragraph) => (
            <p key={paragraph.slice(0, 40)}>{paragraph}</p>
          ))}
          <p>
            {p.closingPrefix}
            <Link className="inline-link" href={localePath(locale, '/products/construction-os')}>
              Construction OS
            </Link>
            {p.closingMiddle}
            <Link className="inline-link" href={localePath(locale, '/products/construction-twin')}>
              Construction Twin
            </Link>
            {p.closingAfterProducts}
            <Link
              className="inline-link"
              href={localePath(locale, '/resources/project-world-model')}
            >
              {p.worldModelLink}
            </Link>
            {p.closingSuffix}
          </p>
        </div>
      </Section>

      <Section
        eyebrow={p.principlesEyebrow}
        title={p.principlesTitle}
        copy={p.principlesCopy}
        tone="raised"
      >
        <FeatureGrid items={p.principles} />
      </Section>

      <section className="final-cta">
        <div className="container">
          <span className="eyebrow">{p.finalCta.eyebrow}</span>
          <h2>{p.finalCta.title}</h2>
          <p>{p.finalCta.copy}</p>
          <div>
            <Link className="button light" href={localePath(locale, '/contact')}>
              {p.finalCta.primary}
            </Link>
            <Link className="button secondary-light" href={localePath(locale, '/resources')}>
              {p.finalCta.secondary}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
