import { NotFoundContent } from '../../components/NotFoundContent';
import { getDictionary } from '../../lib/i18n/dictionaries';
import { locales } from '../../lib/i18n/config';

/**
 * A `not-found` file can read neither route params nor - without cost - a header.
 * It once read one the middleware set, which was expensive in a way nothing
 * pointed at: `not-found` is part of every page's render tree, so that single
 * `headers()` call opted the whole `[locale]` segment out of static rendering.
 * Next still reported the pages as SSG while emitting no HTML for any of them,
 * and every request hit an origin function under `Cache-Control: no-store`. It
 * bought nothing either - unmatched paths fell past this boundary to the root
 * `not-found.tsx`, so `/zh/anything` answered in English regardless.
 *
 * Making this a client component is not the way out: Next renders a client
 * `not-found` boundary on the client only, so the 404 would arrive with an empty
 * body. Instead both languages are rendered and the surrounding layout's
 * `<html lang>` picks one in CSS - static, scriptless, and correct on first paint.
 * Two short blocks of duplicated markup on a noindex page is a cheap price for
 * keeping every other page in the segment cacheable.
 */
export default function LocaleNotFound() {
  return (
    <>
      {locales.map((locale) => (
        <div key={locale} className="locale-only" data-locale={locale}>
          <NotFoundContent locale={locale} t={getDictionary(locale)} />
        </div>
      ))}
    </>
  );
}
