import fs from 'node:fs';
import path from 'node:path';
import { marked } from 'marked';
import { defaultLocale, type Locale } from './i18n/config';

export type Insight = {
  slug: string;
  title: string;
  description: string;
  date: string;
  readingTime: number;
  category: string;
  body: string;
};

const CONTENT_ROOT = path.join(process.cwd(), 'content', 'insights');

function localeDir(locale: Locale): string {
  return path.join(CONTENT_ROOT, locale);
}

/**
 * Minimal YAML frontmatter reader. The articles only use flat `key: value`
 * pairs, so a full YAML parser would be a dependency we do not need.
 */
function parseFrontmatter(raw: string): { data: Record<string, string>; body: string } {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(raw);
  if (!match) return { data: {}, body: raw };

  const data: Record<string, string> = {};
  for (const line of match[1].split(/\r?\n/)) {
    const separator = line.indexOf(':');
    if (separator === -1) continue;
    const key = line.slice(0, separator).trim();
    const value = line
      .slice(separator + 1)
      .trim()
      .replace(/^["']|["']$/g, '');
    if (key) data[key] = value;
  }

  return { data, body: raw.slice(match[0].length) };
}

function readInsight(locale: Locale, filename: string): Insight {
  const raw = fs.readFileSync(path.join(localeDir(locale), filename), 'utf8');
  const { data, body } = parseFrontmatter(raw);

  return {
    slug: filename.replace(/\.md$/, ''),
    title: data.title ?? filename,
    description: data.description ?? '',
    date: data.date ?? '1970-01-01',
    category: data.category ?? 'Insight',
    readingTime: estimateReadingTime(body),
    body
  };
}

/**
 * Chinese has no spaces between words, so a whitespace word count would report
 * a 3,000-character essay as a one-minute read. CJK is counted per character at
 * a slower rate; everything else stays on words per minute.
 */
function estimateReadingTime(body: string): number {
  const cjk = body.match(/[一-鿿㐀-䶿]/g)?.length ?? 0;

  if (cjk > 50) {
    return Math.max(1, Math.round(cjk / 400));
  }

  const words = body.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

export function getAllInsights(locale: Locale): Insight[] {
  const dir = localeDir(locale);
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith('.md'))
    .map((file) => readInsight(locale, file))
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getInsight(locale: Locale, slug: string): Insight | null {
  return getAllInsights(locale).find((insight) => insight.slug === slug) ?? null;
}

/**
 * Slugs are shared across locales so `/en/resources/x` and `/zh/resources/x`
 * describe the same article and can point hreflang at each other.
 */
export function getInsightSlugs(): string[] {
  return getAllInsights(defaultLocale).map((insight) => insight.slug);
}

/** Articles are first-party files in this repository, not user submissions. */
export function renderMarkdown(body: string): string {
  return marked.parse(body, { async: false }) as string;
}

export function formatDate(date: string, locale: Locale): string {
  return new Date(date).toLocaleDateString(locale === 'zh' ? 'zh-CN' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC'
  });
}
