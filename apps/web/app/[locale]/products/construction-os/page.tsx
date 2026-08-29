import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FeatureGrid } from '../../../../components/FeatureGrid';
import { JsonLd } from '../../../../components/JsonLd';
import { Section } from '../../../../components/Section';
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
    title: t.os.meta.title,
    description: t.os.meta.description,
    path: '/products/construction-os'
  });
}

export default async function OSPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale);
  const p = t.os;

  return (
    <>
      <JsonLd data={softwareSchema(locale, 'os')} />
      <JsonLd
        data={breadcrumbSchema(locale, [
          { name: t.nav.homeLabel, path: '/' },
          { name: t.products.meta.title, path: '/products' },
          { name: p.meta.title, path: '/products/construction-os' }
        ])}
      />

      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">{p.eyebrow}</span>
          <h1>{p.h1}</h1>
          <p>{p.lede}</p>
          <div className="hero-actions">
            <a className="button" href={productUrls.os} target="_blank" rel="noopener noreferrer">
              {p.openProduct}
            </a>
            <Link className="button secondary" href={localePath(locale, '/contact')}>
              {t.nav.bookDemo}
            </Link>
          </div>
        </div>
      </section>

      <Section eyebrow={p.capabilitiesEyebrow} title={p.capabilitiesTitle}>
        <FeatureGrid items={p.capabilities} />
      </Section>

      <Section
        eyebrow={p.worksWith.eyebrow}
        title={p.worksWith.title}
        copy={p.worksWith.copy}
        tone="raised"
      >
        <div className="data-flow">
          {p.worksWith.inputs.map((input, index) => (
            <span key={input} style={{ display: 'contents' }}>
              <div>{input}</div>
              {index < p.worksWith.inputs.length - 1 && <b>+</b>}
            </span>
          ))}
          <span aria-hidden="true">→</span>
          <strong>{p.worksWith.brand}</strong>
          <span aria-hidden="true">→</span>
          <em>{p.worksWith.output}</em>
        </div>
      </Section>
    </>
  );
}
