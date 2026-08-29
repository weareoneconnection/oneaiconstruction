import { headers } from 'next/headers';
import { NotFoundContent } from '../../components/NotFoundContent';
import { getDictionary } from '../../lib/i18n/dictionaries';
import { defaultLocale, isLocale } from '../../lib/i18n/config';

/**
 * A `not-found` file cannot read route params, so the locale arrives as a
 * header set by the middleware. Reading it makes this route dynamic, which is
 * the right trade for a page that is never crawled or cached.
 */
export default async function LocaleNotFound() {
  const header = (await headers()).get('x-oneai-locale');
  const locale = header && isLocale(header) ? header : defaultLocale;

  return <NotFoundContent locale={locale} t={getDictionary(locale)} />;
}
