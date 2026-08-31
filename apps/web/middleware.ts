import { NextResponse, type NextRequest } from 'next/server';
import { defaultLocale, isLocale, locales, type Locale } from './lib/i18n/config';

const LOCALE_COOKIE = 'oneai-locale';

/**
 * Every page lives under an explicit `/en` or `/zh` prefix, which keeps
 * canonical URLs and hreflang unambiguous. Anything without a prefix is
 * redirected to the visitor's best-guess locale.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const active = locales.find(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );

  // A prefixed path is already where it belongs; leave the response untouched so
  // the prerendered page can be served straight from the edge cache.
  if (active) return NextResponse.next();

  const locale = resolveLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === '/' ? '' : pathname}`;

  const response = NextResponse.redirect(url);
  // Remember the resolved locale so the next bare-path visit is stable.
  response.cookies.set(LOCALE_COOKIE, locale, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
    sameSite: 'lax'
  });
  return response;
}

/** An explicit choice beats the browser's preference. */
function resolveLocale(request: NextRequest): Locale {
  const cookie = request.cookies.get(LOCALE_COOKIE)?.value;
  if (cookie && isLocale(cookie)) return cookie;

  return matchAcceptLanguage(request.headers.get('accept-language')) ?? defaultLocale;
}

/**
 * Minimal Accept-Language negotiation: parse tags with their q-values, sort by
 * preference and return the first that maps to a supported locale.
 */
function matchAcceptLanguage(header: string | null): Locale | null {
  if (!header) return null;

  const preferences = header
    .split(',')
    .map((part) => {
      const [tag, ...params] = part.trim().split(';');
      const q = params.find((p) => p.trim().startsWith('q='));
      return { tag: tag.trim().toLowerCase(), q: q ? Number(q.split('=')[1]) || 0 : 1 };
    })
    .filter((entry) => entry.tag)
    .sort((a, b) => b.q - a.q);

  for (const { tag } of preferences) {
    // `zh`, `zh-CN`, `zh-Hans`, `zh-hant` all map to the Chinese site.
    if (tag === 'zh' || tag.startsWith('zh-')) return 'zh';
    if (tag === 'en' || tag.startsWith('en-')) return 'en';
  }

  return null;
}

export const config = {
  /**
   * Skip Next internals, the API, and any path with a file extension, so
   * sitemap.xml, robots.txt and manifest.webmanifest are untouched.
   *
   * The generated metadata images need naming explicitly: `/icon` and
   * `/opengraph-image` carry no file extension, so the extension rule alone let
   * them through and they were redirected to `/en/opengraph-image`, which does
   * not exist. That silently broke every social share card and the tab icon,
   * while every page still looked fine.
   */
  matcher: ['/((?!_next|api|icon|apple-icon|opengraph-image|twitter-image|.*\\..*).*)']
};
