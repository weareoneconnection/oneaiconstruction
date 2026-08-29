import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArchitectureDiagram } from '../../components/ArchitectureDiagram';
import { AskTwinDemo } from '../../components/AskTwinDemo';
import { FeatureGrid } from '../../components/FeatureGrid';
import { JsonLd } from '../../components/JsonLd';
import { Reveal } from '../../components/Reveal';
import { Section } from '../../components/Section';
import { TimelineDemo } from '../../components/TimelineDemo';
import { TwinScene } from '../../components/TwinScene';
import { productUrls } from '../../lib/config';
import { getDictionary } from '../../lib/i18n/dictionaries';
import { isLocale, localePath } from '../../lib/i18n/config';
import { softwareSchema } from '../../lib/seo';

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const t = getDictionary(locale);
  const h = t.home;

  return (
    <>
      <JsonLd data={softwareSchema(locale, 'twin')} />

      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="pill">{h.pill}</span>
            <h1>
              {h.h1Line1}
              <br />
              {h.h1Line2Prefix}
              <em>{h.h1Line2Accent}</em>
            </h1>
            <p>{h.lede}</p>
            <div className="hero-actions">
              <Link className="button" href={localePath(locale, '/contact')}>
                {h.ctaPrimary}
              </Link>
              <a
                className="button secondary"
                href={productUrls.twin}
                target="_blank"
                rel="noopener noreferrer"
              >
                {h.ctaSecondary}
              </a>
            </div>
            <div className="hero-principle">
              {h.principle.map((step, index) => (
                <span key={step} style={{ display: 'contents' }}>
                  <span>{step}</span>
                  {index < h.principle.length - 1 && <i aria-hidden="true">→</i>}
                </span>
              ))}
            </div>
          </div>
          <TwinScene locale={locale} t={t} />
        </div>
      </section>

      <section className="signal-strip">
        <div className="container signal-grid">
          {h.signals.map((signal) => (
            <div key={signal.title}>
              <strong>{signal.title}</strong>
              <span>{signal.text}</span>
            </div>
          ))}
        </div>
      </section>

      <Section eyebrow={h.dataFlow.eyebrow} title={h.dataFlow.title} copy={h.dataFlow.copy}>
        <div className="data-flow">
          {h.dataFlow.inputs.map((input, index) => (
            <span key={input} style={{ display: 'contents' }}>
              <div>{input}</div>
              {index < h.dataFlow.inputs.length - 1 && <b>+</b>}
            </span>
          ))}
          <span aria-hidden="true">→</span>
          <strong>{h.dataFlow.brand}</strong>
          <span aria-hidden="true">→</span>
          <em>{h.dataFlow.output}</em>
        </div>
      </Section>

      <Section
        eyebrow={h.products.eyebrow}
        title={h.products.title}
        copy={h.products.copy}
        tone="raised"
      >
        <div className="product-split">
          <article className="product-card os">
            <span>{h.products.os.label}</span>
            <h3>{h.products.os.title}</h3>
            <p>{h.products.os.text}</p>
            <ul>
              {h.products.os.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
            <Link href={localePath(locale, '/products/construction-os')}>{h.products.os.link}</Link>
          </article>

          <article className="product-card twin">
            <span>{h.products.twin.label}</span>
            <h3>{h.products.twin.title}</h3>
            <p>{h.products.twin.text}</p>
            <ul>
              {h.products.twin.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
            <Link href={localePath(locale, '/products/construction-twin')}>
              {h.products.twin.link}
            </Link>
          </article>
        </div>
      </Section>

      <Section eyebrow={h.ask.eyebrow} title={h.ask.title} copy={h.ask.copy}>
        <AskTwinDemo locale={locale} t={t} />
      </Section>

      <Section
        eyebrow={h.timeline.eyebrow}
        title={h.timeline.title}
        copy={h.timeline.copy}
        tone="raised"
      >
        <TimelineDemo t={t} />
      </Section>

      <section className="metric-strip">
        <div className="container metric-strip-grid">
          {t.customers.metrics.map((metric) => (
            <div key={metric.label}>
              <strong>{metric.value}</strong>
              <span>{metric.label}</span>
            </div>
          ))}
        </div>
        <div className="container metric-strip-foot">
          <Link className="inline-link" href={localePath(locale, '/customers')}>
            {h.metricsLink}
          </Link>
        </div>
      </section>

      <Section eyebrow={h.prediction.eyebrow} title={h.prediction.title} copy={h.prediction.copy}>
        <FeatureGrid
          items={h.prediction.items.map((item, index) => ({
            ...item,
            tag: String(index + 1).padStart(2, '0')
          }))}
        />
      </Section>

      <Section eyebrow={h.agents.eyebrow} title={h.agents.title} copy={h.agents.copy} tone="raised">
        <div className="agent-flow">
          {h.agents.steps.map((step, index) => (
            <div key={step}>
              <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
              <strong>{step}</strong>
              {index < h.agents.steps.length - 1 && <i aria-hidden="true">→</i>}
            </div>
          ))}
        </div>
      </Section>

      <Section
        eyebrow={h.architecture.eyebrow}
        title={h.architecture.title}
        copy={h.architecture.copy}
      >
        <ArchitectureDiagram t={t} />
      </Section>

      <Section
        eyebrow={h.industries.eyebrow}
        title={h.industries.title}
        copy={h.industries.copy}
        tone="raised"
      >
        <FeatureGrid items={h.industries.items} />
      </Section>

      <Section eyebrow={h.pilot.eyebrow} title={h.pilot.title} copy={h.pilot.copy}>
        <div className="pilot-card">
          <div>
            <span>{h.pilot.inputsLabel}</span>
            <p>{h.pilot.inputs}</p>
          </div>
          <i aria-hidden="true">→</i>
          <div>
            <span>{h.pilot.outputsLabel}</span>
            <p>{h.pilot.outputs}</p>
          </div>
          <Link className="button" href={localePath(locale, '/pilot')}>
            {h.pilot.cta}
          </Link>
        </div>
      </Section>

      <section className="final-cta">
        <div className="container">
          <Reveal>
            <span className="eyebrow">{h.finalCta.eyebrow}</span>
            <h2>{h.finalCta.title}</h2>
            <p>{h.finalCta.copy}</p>
            <div>
              <Link className="button light" href={localePath(locale, '/contact')}>
                {h.finalCta.primary}
              </Link>
              <Link className="button secondary-light" href={localePath(locale, '/platform')}>
                {h.finalCta.secondary}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
