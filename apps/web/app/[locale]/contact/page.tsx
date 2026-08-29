import { notFound } from 'next/navigation';
import { ContactForm } from '../../../components/ContactForm';
import { JsonLd } from '../../../components/JsonLd';
import { contactEmail } from '../../../lib/config';
import { getDictionary } from '../../../lib/i18n/dictionaries';
import { isLocale } from '../../../lib/i18n/config';
import { breadcrumbSchema, pageMetadata } from '../../../lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDictionary(locale);
  return pageMetadata({
    locale,
    title: t.contact.meta.title,
    description: t.contact.meta.description,
    path: '/contact'
  });
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale);
  const p = t.contact;

  return (
    <>
      <JsonLd
        data={breadcrumbSchema(locale, [
          { name: t.nav.homeLabel, path: '/' },
          { name: p.meta.title, path: '/contact' }
        ])}
      />
      <section className="page-hero contact-page">
        <div className="container contact-grid">
          <div>
            <span className="eyebrow">{p.eyebrow}</span>
            <h1>{p.h1}</h1>
            <p>{p.lede}</p>
            <div className="contact-points">
              {p.points.map((point) => (
                <span key={point}>{point}</span>
              ))}
            </div>
            <p className="contact-direct">
              {p.preferEmail}{' '}
              <a className="inline-link" href={`mailto:${contactEmail}`}>
                {contactEmail}
              </a>
            </p>
          </div>
          <ContactForm locale={locale} t={t} contactEmail={contactEmail} />
        </div>
      </section>
    </>
  );
}
