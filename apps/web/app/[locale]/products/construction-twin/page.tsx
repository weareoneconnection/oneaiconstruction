import Link from 'next/link';
import { notFound } from 'next/navigation';
import { AskTwinDemo } from '../../../../components/AskTwinDemo';
import { FeatureGrid } from '../../../../components/FeatureGrid';
import { JsonLd } from '../../../../components/JsonLd';
import { Section } from '../../../../components/Section';
import { TimelineDemo } from '../../../../components/TimelineDemo';
import { TwinScene } from '../../../../components/TwinScene';
import { productUrls } from '../../../../lib/config';
import { getDictionary } from '../../../../lib/i18n/dictionaries';
import { isLocale, localePath } from '../../../../lib/i18n/config';
import { breadcrumbSchema, pageMetadata, softwareSchema } from '../../../../lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDictionary(locale);
  return pageMetadata({
    locale,
    title: t.twin.meta.title,
    description: t.twin.meta.description,
    path: '/products/construction-twin'
  });
}

export default async function TwinPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale);
  const p = t.twin;

  return (
    <>
      <JsonLd data={softwareSchema(locale, 'twin')} />
      <JsonLd
        data={breadcrumbSchema(locale, [
          { name: t.nav.homeLabel, path: '/' },
          { name: t.products.meta.title, path: '/products' },
          { name: p.meta.title, path: '/products/construction-twin' }
        ])}
      />

      <section className="page-hero twin-page">
        <div className="container two-col">
          <div>
            <span className="eyebrow">{p.eyebrow}</span>
            <h1>{p.h1}</h1>
            <p>{p.lede}</p>
            <div className="hero-actions">
              <a
                className="button"
                href={productUrls.twin}
                target="_blank"
                rel="noopener noreferrer"
              >
                {p.openProduct}
              </a>
              <Link className="button secondary" href={localePath(locale, '/contact')}>
                {t.nav.bookDemo}
              </Link>
            </div>
          </div>
          <TwinScene locale={locale} t={t} />
        </div>
      </section>

      <Section eyebrow={p.timeline.eyebrow} title={p.timeline.title} copy={p.timeline.copy}>
        <TimelineDemo t={t} />
      </Section>

      <Section eyebrow={p.ask.eyebrow} title={p.ask.title} copy={p.ask.copy} tone="raised">
        <AskTwinDemo locale={locale} t={t} />
      </Section>

      <Section eyebrow={p.capabilitiesEyebrow} title={p.capabilitiesTitle}>
        <FeatureGrid items={p.capabilities} />
      </Section>
    </>
  );
}
