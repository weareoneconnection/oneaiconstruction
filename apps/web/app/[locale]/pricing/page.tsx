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
    title: t.pricing.meta.title,
    description: t.pricing.meta.description,
    path: '/pricing'
  });
}

export default async function PricingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale);
  const p = t.pricing;

  // The middle tier is the one most customers land on.
  const featuredIndex = 1;
  const tierHrefs = ['/pilot', '/contact', '/contact'];

  return (
    <>
      <JsonLd
        data={breadcrumbSchema(locale, [
          { name: t.nav.homeLabel, path: '/' },
          { name: p.meta.title, path: '/pricing' }
        ])}
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: p.faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: { '@type': 'Answer', text: faq.answer }
          }))
        }}
      />

      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">{p.eyebrow}</span>
          <h1>{p.h1}</h1>
          <p>{p.lede}</p>
        </div>
      </section>

      <Section eyebrow={p.tiersEyebrow} title={p.tiersTitle}>
        <div className="pricing-grid">
          {p.tiers.map((tier, index) => {
            const featured = index === featuredIndex;
            return (
              <article className={`pricing-card${featured ? ' featured' : ''}`} key={tier.name}>
                {featured && <span className="pricing-badge">{p.mostCommon}</span>}
                <h3>{tier.name}</h3>
                <p className="pricing-price">{tier.price}</p>
                <p className="pricing-duration">{tier.duration}</p>
                <p className="pricing-summary">{tier.summary}</p>
                <ul>
                  {tier.includes.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <Link
                  className={`button${featured ? '' : ' secondary'}`}
                  href={localePath(locale, tierHrefs[index])}
                >
                  {tier.cta}
                </Link>
              </article>
            );
          })}
        </div>
      </Section>

      <Section eyebrow={p.faqEyebrow} title={p.faqTitle}>
        <div className="faq-list">
          {p.faqs.map((faq) => (
            <details className="faq-item" key={faq.question}>
              <summary>{faq.question}</summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </Section>
    </>
  );
}
