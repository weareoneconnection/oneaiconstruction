import type { Metadata } from 'next';
import { site, productUrls, contactEmail } from './config';
import { getDictionary } from './i18n/dictionaries';
import {
  defaultLocale,
  localeOpenGraph,
  localePath,
  localeTags,
  locales,
  type Locale
} from './i18n/config';

/**
 * Canonical plus hreflang for one page in one locale.
 *
 * `x-default` points at the default locale so search engines have somewhere to
 * send visitors whose language we do not publish.
 */
export function alternates(locale: Locale, path: string): Metadata['alternates'] {
  const languages: Record<string, string> = {};
  for (const candidate of locales) {
    languages[localeTags[candidate]] = `${site.url}${localePath(candidate, path)}`;
  }
  languages['x-default'] = `${site.url}${localePath(defaultLocale, path)}`;

  return {
    canonical: `${site.url}${localePath(locale, path)}`,
    languages
  };
}

/**
 * Build per-page metadata. Every route must call this — without it all pages
 * inherit the layout defaults and compete with each other in search.
 */
export function pageMetadata({
  locale,
  title,
  description,
  path,
  noIndex
}: {
  locale: Locale;
  title: string;
  description: string;
  path: string;
  noIndex?: boolean;
}): Metadata {
  const url = `${site.url}${localePath(locale, path)}`;

  return {
    // Repeated per page: a page-level metadata export does not inherit the
    // layout's metadataBase, and without it Open Graph URLs fall back to
    // localhost at build time.
    metadataBase: new URL(site.url),
    title,
    description,
    alternates: alternates(locale, path),
    robots: noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      title: `${title} | ${site.name}`,
      description,
      url,
      siteName: site.name,
      locale: localeOpenGraph[locale],
      type: 'website'
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${site.name}`,
      description
    }
  };
}

export function organizationSchema(locale: Locale) {
  const t = getDictionary(locale);

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: site.name,
    legalName: site.legalName,
    url: `${site.url}${localePath(locale, '/')}`,
    slogan: t.meta.tagline,
    description: t.meta.description,
    email: contactEmail,
    industry: 'Construction Technology',
    sameAs: [productUrls.forge]
  };
}

export function softwareSchema(locale: Locale, product: 'os' | 'twin') {
  const t = getDictionary(locale);
  const data = {
    os: {
      name: 'Construction OS',
      path: '/products/construction-os',
      description: t.os.meta.description
    },
    twin: {
      name: 'Construction Twin',
      path: '/products/construction-twin',
      description: t.twin.meta.description
    }
  }[product];

  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: data.name,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    url: `${site.url}${localePath(locale, data.path)}`,
    description: data.description,
    inLanguage: localeTags[locale],
    provider: { '@type': 'Organization', name: site.name, url: site.url },
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      priceSpecification: {
        '@type': 'PriceSpecification',
        description: 'Enterprise pilot and annual platform licensing. Contact sales for pricing.'
      }
    }
  };
}

export function breadcrumbSchema(locale: Locale, trail: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${site.url}${localePath(locale, item.path)}`
    }))
  };
}

export function articleSchema(
  locale: Locale,
  a: { title: string; description: string; slug: string; date: string }
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: a.title,
    description: a.description,
    datePublished: a.date,
    inLanguage: localeTags[locale],
    url: `${site.url}${localePath(locale, `/resources/${a.slug}`)}`,
    author: { '@type': 'Organization', name: site.name, url: site.url },
    publisher: { '@type': 'Organization', name: site.name, url: site.url }
  };
}
