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
    title: t.products.meta.title,
    description: t.products.meta.description,
    path: '/products'
  });
}

export default async function ProductsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale);
  const p = t.products;
  const c = p.compare;

  // Which column each row emphasises, kept beside the translated row labels.
  const emphasis: [string, string][] = [
    [c.primary, c.linked],
    [c.partial, c.primary],
    [c.partial, c.primary],
    [c.none, c.primary],
    [c.primary, c.linked],
    [c.primary, c.none]
  ];

  return (
    <>
      <JsonLd
        data={breadcrumbSchema(locale, [
          { name: t.nav.homeLabel, path: '/' },
          { name: p.meta.title, path: '/products' }
        ])}
      />

      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">{p.eyebrow}</span>
          <h1>{p.h1}</h1>
          <p>{p.lede}</p>
        </div>
      </section>

      <Section title={p.chooseTitle}>
        <div className="product-split">
          <article className="product-card os">
            <span>{t.home.products.os.label}</span>
            <h3>{t.home.products.os.title}</h3>
            <p>{t.home.products.os.text}</p>
            <ul>
              {t.home.products.os.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
            <Link href={localePath(locale, '/products/construction-os')}>
              {t.home.products.os.link}
            </Link>
          </article>

          <article className="product-card twin">
            <span>{t.home.products.twin.label}</span>
            <h3>{t.home.products.twin.title}</h3>
            <p>{t.home.products.twin.text}</p>
            <ul>
              {t.home.products.twin.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
            <Link href={localePath(locale, '/products/construction-twin')}>
              {t.home.products.twin.link}
            </Link>
          </article>
        </div>
      </Section>

      <Section eyebrow={c.eyebrow} title={c.title} copy={c.copy}>
        <div className="compare-table-wrap">
          <table className="compare-table">
            <caption className="visually-hidden">{c.caption}</caption>
            <thead>
              <tr>
                <th scope="col">{c.question}</th>
                <th scope="col">{c.os}</th>
                <th scope="col">{c.twin}</th>
              </tr>
            </thead>
            <tbody>
              {c.rows.map((row, index) => (
                <tr key={row}>
                  <th scope="row">{row}</th>
                  <td>{emphasis[index][0]}</td>
                  <td>{emphasis[index][1]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
    </>
  );
}
