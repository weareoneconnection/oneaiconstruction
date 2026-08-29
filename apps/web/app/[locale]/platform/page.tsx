import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArchitectureDiagram } from '../../../components/ArchitectureDiagram';
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
    title: t.platform.meta.title,
    description: t.platform.meta.description,
    path: '/platform'
  });
}

export default async function PlatformPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale);
  const p = t.platform;

  return (
    <>
      <JsonLd
        data={breadcrumbSchema(locale, [
          { name: t.nav.homeLabel, path: '/' },
          { name: p.meta.title, path: '/platform' }
        ])}
      />

      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">{p.eyebrow}</span>
          <h1>{p.h1}</h1>
          <p>{p.lede}</p>
        </div>
      </section>

      <Section
        eyebrow={p.architecture.eyebrow}
        title={p.architecture.title}
        copy={p.architecture.copy}
      >
        <ArchitectureDiagram t={t} />
      </Section>

      <Section eyebrow={p.foundationsEyebrow} title={p.foundationsTitle}>
        <FeatureGrid items={p.foundations} />
      </Section>

      <Section eyebrow={p.deeper.eyebrow} title={p.deeper.title} copy={p.deeper.copy}>
        <div className="hero-actions">
          <Link
            className="button secondary"
            href={localePath(locale, '/resources/project-world-model')}
          >
            {p.deeper.worldModel}
          </Link>
          <Link
            className="button secondary"
            href={localePath(locale, '/resources/evidence-first-retrieval')}
          >
            {p.deeper.evidence}
          </Link>
        </div>
      </Section>
    </>
  );
}
