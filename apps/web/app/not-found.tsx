import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { NotFoundContent } from '../components/NotFoundContent';
import { getDictionary } from '../lib/i18n/dictionaries';
import { defaultLocale, localeTags } from '../lib/i18n/config';

const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false, follow: false }
};

/**
 * Reached only for paths outside any locale segment. The root layout is a
 * pass-through, so this page has to supply `<html>` and `<body>` itself.
 */
export default function RootNotFound() {
  return (
    <html lang={localeTags[defaultLocale]} className={inter.variable}>
      <body>
        <main id="main">
          <NotFoundContent locale={defaultLocale} t={getDictionary(defaultLocale)} />
        </main>
      </body>
    </html>
  );
}
