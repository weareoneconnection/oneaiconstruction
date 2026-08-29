import type { en } from './en';

/**
 * The English dictionary is the source of truth for the *shape*: every other
 * locale must supply the same keys, arrays and nesting, or the build fails.
 *
 * Literal types are widened to `string` / `number` — otherwise `as const` would
 * demand that a translation equal the English text character for character —
 * while `readonly` is preserved so `as const` dictionaries still assign.
 */
export type Dictionary = Widen<typeof en>;

type Widen<T> = T extends (...args: never[]) => unknown
  ? T
  : T extends string
    ? string
    : T extends number
      ? number
      : T extends boolean
        ? boolean
        : T extends readonly (infer U)[]
          ? readonly Widen<U>[]
          : T extends object
            ? { readonly [K in keyof T]: Widen<T[K]> }
            : T;
