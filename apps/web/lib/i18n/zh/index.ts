import type { Dictionary } from '../types';
import { common } from './common';
import { home } from './home';
import { demos } from './demos';
import { pages } from './pages';
import { pages2 } from './pages2';
import { pages3 } from './pages3';

/**
 * Typed against the English dictionary, so a missing or renamed key fails the
 * build rather than silently rendering English text on the Chinese site.
 */
export const zh: Dictionary = {
  ...common,
  home,
  demos,
  ...pages,
  ...pages2,
  ...pages3
};
