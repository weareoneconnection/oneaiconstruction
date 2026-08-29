/**
 * Single source of truth for external URLs, brand strings and contact details.
 * Never hardcode a vendor origin (vercel.app / railway.app) in a page again —
 * point the environment variable at a first-party subdomain before launch.
 */

export const site = {
  name: 'OneAI Construction',
  legalName: 'OneAI Construction, a OneAI Labs product',
  tagline: 'Intelligence for the Built World.',
  description:
    'AI-native intelligence platform for construction and infrastructure. Connect BIM, schedules, documents, evidence, risk, forecasts and AI agents into one governed project intelligence layer.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://oneaiconstruction.com',
  locale: 'en_US'
} as const;

export const productUrls = {
  os: process.env.NEXT_PUBLIC_CONSTRUCTION_OS_URL || 'https://os.oneaiconstruction.com',
  twin: process.env.NEXT_PUBLIC_CONSTRUCTION_TWIN_URL || 'https://twin.oneaiconstruction.com',
  forge: process.env.NEXT_PUBLIC_ONEAI_FORGE_URL || 'https://oneaiforge.com'
} as const;

export const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'hello@oneaiconstruction.com';

/** Routes listed in the sitemap, with their relative crawl priority. */
export const routes = [
  { path: '', priority: 1.0 },
  { path: '/products', priority: 0.9 },
  { path: '/products/construction-os', priority: 0.9 },
  { path: '/products/construction-twin', priority: 0.9 },
  { path: '/solutions', priority: 0.8 },
  { path: '/platform', priority: 0.8 },
  { path: '/industries', priority: 0.7 },
  { path: '/enterprise', priority: 0.8 },
  { path: '/security', priority: 0.7 },
  { path: '/customers', priority: 0.8 },
  { path: '/pricing', priority: 0.7 },
  { path: '/resources', priority: 0.7 },
  { path: '/pilot', priority: 0.9 },
  { path: '/company', priority: 0.6 },
  { path: '/contact', priority: 0.9 }
] as const;

/**
 * Static build stamp for sitemap `lastModified`. Using `new Date()` there makes
 * every page look freshly edited on every deploy, which trains crawlers to
 * ignore the signal. Bump this when content actually changes.
 */
export const contentLastModified = new Date('2026-08-29');
