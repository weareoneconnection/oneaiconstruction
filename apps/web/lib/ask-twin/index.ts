import type { Locale } from '../i18n/config';
import type { AskTwinContent } from './types';
import { en } from './en';
import { zh } from './zh';

const content: Record<Locale, AskTwinContent> = { en, zh };

export function getAskTwinContent(locale: Locale): AskTwinContent {
  return content[locale];
}

export type { AskTwinContent, Answer, EvidenceRecord } from './types';
