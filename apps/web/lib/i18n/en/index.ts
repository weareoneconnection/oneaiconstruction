import { common } from './common';
import { home } from './home';
import { demos } from './demos';
import { pages } from './pages';
import { pages2 } from './pages2';
import { pages3 } from './pages3';

export const en = {
  ...common,
  home,
  demos,
  ...pages,
  ...pages2,
  ...pages3
} as const;
