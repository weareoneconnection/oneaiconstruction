import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { notFound } from 'next/navigation';
import '../globals.css';
import { Analytics } from '../../components/Analytics';
import { Footer } from '../../components/Footer';
import { Header } from '../../components/Header';
import { JsonLd } from '../../components/JsonLd';
import { site } from '../../lib/config';
import { getDictionary } from '../../lib/i18n/dictionaries';
import { isLocale, localeOpenGraph, localeTags, locales, type Locale } from '../../lib/i18n/config';
import { alternates, organizationSchema } from '../../lib/seo';

/**
 * The stylesheet asked for Inter but nothing ever loaded it, so the whole site
 * silently rendered in system-ui. `next/font` self-hosts the file and supplies
 * a size-adjusted fallback, which also removes the layout shift on first paint.
 */
const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter' });

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  const t = getDictionary(locale);

  return {
    metadataBase: new URL(site.url),
    title: { default: t.meta.siteTitle, template: `%s | ${site.name}` },
    description: t.meta.description,
    applicationName: site.name,
    keywords: [...t.meta.keywords],
    authors: [{ name: site.name, url: site.url }],
    creator: site.name,
    alternates: alternates(locale, '/'),
    openGraph: {
      title: site.name,
      description: t.meta.tagline,
      url: `${site.url}/${locale}`,
      siteName: site.name,
      locale: localeOpenGraph[locale],
      type: 'website'
    },
    twitter: { card: 'summary_large_image', title: site.name, description: t.meta.tagline },
    robots: { index: true, follow: true }
  };
}

export const viewport: Viewport = {
  themeColor: '#070a0e',
  colorScheme: 'dark'
};

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const t = getDictionary(locale as Locale);

  return (
    <html lang={localeTags[locale]} className={inter.variable}>
      <body>
        <a className="skip-link" href="#main">
          {t.nav.skipToContent}
        </a>
        <JsonLd data={organizationSchema(locale)} />
        <Header locale={locale} t={t} />
        <main id="main">{children}</main>
        <Footer locale={locale} t={t} />
        <Analytics />
      </body>
    </html>
  );
}
