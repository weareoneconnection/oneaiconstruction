import { en } from './en';
import { zh } from './zh';
import type { Locale } from './config';
import type { Dictionary } from './types';

const dictionaries = { en, zh } as const;

/**
 * Dictionaries are plain modules rather than dynamic imports: the whole site is
 * statically rendered per locale at build time, so there is nothing to defer,
 * and a synchronous lookup keeps every page a server component.
 */
export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] as Dictionary;
}

export type { Dictionary };
