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
    title: t.pilot.meta.title,
    description: t.pilot.meta.description,
    path: '/pilot'
  });
}

export default async function PilotPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale);
  const p = t.pilot;

  return (
    <>
      <JsonLd
        data={breadcrumbSchema(locale, [
          { name: t.nav.homeLabel, path: '/' },
          { name: p.meta.title, path: '/pilot' }
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
            <Link className="button secondary" href={localePath(locale, '/pricing')}>
              {p.ctaSecondary}
            </Link>
          </div>
        </div>
      </section>

      <Section eyebrow={p.firstPilotEyebrow} title={p.firstPilotTitle}>
        <div className="pilot-detail">
          {p.firstPilot.map((item) => (
            <div key={item.label}>
              <span>{item.label}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow={p.runEyebrow} title={p.runTitle} copy={p.runCopy} tone="raised">
        <ol className="timeline-steps">
          {p.weeks.map((week) => (
            <li key={week.range}>
              <span>{week.range}</span>
              <h3>{week.title}</h3>
              <p>{week.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section eyebrow={p.needEyebrow} title={p.needTitle} copy={p.needCopy}>
        <div className="pilot-card">
          <div>
            <span>{p.inputsLabel}</span>
            <p>{p.inputs}</p>
          </div>
          <i aria-hidden="true">→</i>
          <div>
            <span>{p.outputsLabel}</span>
            <p>{p.outputs}</p>
          </div>
          <Link className="button" href={localePath(locale, '/contact')}>
            {p.startCta}
          </Link>
        </div>
      </Section>
    </>
  );
}
