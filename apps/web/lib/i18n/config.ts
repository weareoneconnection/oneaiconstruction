export const locales = ['en', 'zh'] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

/** Display names, each written in its own language. */
export const localeNames: Record<Locale, string> = {
  en: 'English',
  zh: '中文'
};

/** Short labels for the compact header switcher. */
export const localeShortNames: Record<Locale, string> = {
  en: 'EN',
  zh: '中'
};

/** BCP 47 tags for the `lang` attribute, hreflang and Open Graph. */
export const localeTags: Record<Locale, string> = {
  en: 'en',
  zh: 'zh-Hans'
};

export const localeOpenGraph: Record<Locale, string> = {
  en: 'en_US',
  zh: 'zh_CN'
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/**
 * Split a pathname into its locale and the rest, e.g. `/zh/products` becomes
 * `{ locale: 'zh', rest: '/products' }`. Returns a null locale when the path
 * carries no prefix.
 */
export function splitLocale(pathname: string): { locale: Locale | null; rest: string } {
  const segments = pathname.split('/');
  const candidate = segments[1] ?? '';

  if (isLocale(candidate)) {
    const rest = '/' + segments.slice(2).join('/');
    return { locale: candidate, rest: rest === '/' ? '/' : rest.replace(/\/$/, '') };
  }

  return { locale: null, rest: pathname };
}

/** Build a locale-prefixed href. `rest` is always a leading-slash path. */
export function localePath(locale: Locale, rest: string): string {
  if (rest === '/' || rest === '') return `/${locale}`;
  return `/${locale}${rest.startsWith('/') ? rest : `/${rest}`}`;
}
