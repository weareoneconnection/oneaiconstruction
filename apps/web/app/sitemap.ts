import type { MetadataRoute } from 'next';
import { contentLastModified, routes, site } from '../lib/config';
import { localePath, localeTags, locales, defaultLocale } from '../lib/i18n/config';
import { getAllInsights } from '../lib/insights';

/**
 * Every URL is emitted once per locale, each carrying the full set of language
 * alternates so crawlers can pair the translations.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const route of routes) {
      entries.push({
        url: `${site.url}${localePath(locale, route.path)}`,
        lastModified: contentLastModified,
        changeFrequency: 'monthly',
        priority: route.priority,
        alternates: { languages: languagesFor(route.path) }
      });
    }

    for (const insight of getAllInsights(locale)) {
      const path = `/resources/${insight.slug}`;
      entries.push({
        url: `${site.url}${localePath(locale, path)}`,
        lastModified: new Date(insight.date),
        changeFrequency: 'yearly',
        priority: 0.6,
        alternates: { languages: languagesFor(path) }
      });
    }
  }

  return entries;
}

function languagesFor(path: string): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const locale of locales) {
    languages[localeTags[locale]] = `${site.url}${localePath(locale, path)}`;
  }
  languages['x-default'] = `${site.url}${localePath(defaultLocale, path)}`;
  return languages;
}
