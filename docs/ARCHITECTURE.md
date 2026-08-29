# Architecture

## Repository

```text
oneai-construction-site/
├── .github/workflows/ci.yml     Lint, types, build, E2E, Lighthouse budgets
├── apps/
│   └── web/
│       ├── app/                 App Router routes, metadata, API handlers
│       ├── components/          Presentational and interactive components
│       ├── content/insights/    Markdown articles (file-based content layer)
│       ├── e2e/                 Playwright suites
│       ├── lib/                 Config, SEO, content, domain logic
│       └── styles/              Layered global stylesheet
├── docs/
├── infrastructure/
├── lighthouserc.json
└── scripts/
```

## Layering rules

**`lib/` holds decisions, `components/` holds rendering.** Marketing copy, product
URLs, navigation, forecast maths and 3D projection all live in `lib/` so they can
be changed, reviewed and tested without touching JSX.

**Nothing hardcodes a vendor origin.** All external product URLs resolve through
`lib/config.ts`, which reads environment variables and falls back to first-party
subdomains — never to a `*.vercel.app` or `*.up.railway.app` address.

**Every route exports metadata.** Pages call `pageMetadata()` from `lib/seo.ts`,
which produces title, description, canonical and Open Graph tags together. A page
without it inherits the root defaults and competes with its siblings in search.

**Styles are layered, not monolithic.** `app/globals.css` imports, in order:
`tokens` → `base` → `chrome` → `components` → `twin` → `pages` → `responsive`.
Tokens define the vocabulary; nothing below them hardcodes a colour or radius.

## Client/server boundary

Server components are the default. Client components are limited to the pieces
that genuinely need state: `MobileNav`, `Header` (for `usePathname`), `ContactForm`,
`Reveal`, and the three demos. Validation lives in `lib/contact-schema.ts` (server,
pulls in zod) while the shared option labels live in `lib/contact-options.ts` so
the browser bundle does not ship a validation library to render a `<select>`.

## The 3D Twin scene

`lib/projection.ts` implements yaw/pitch rotation, orthographic projection,
back-face culling and painter's-algorithm depth sorting in roughly 100 lines,
rendered as SVG. This replaced a CSS-transform illusion without adding the
~600 KB gzipped that a WebGL stack would put in front of the LCP element.

## Content layer

Articles are Markdown files in `apps/web/content/insights/` with flat frontmatter,
read at build time by `lib/insights.ts` and rendered through `marked`. Adding an
article means adding a file — the route, sitemap entry and Article JSON-LD follow
automatically via `generateStaticParams`.

## Long-term monorepo target

```text
oneai-construction/
├── apps/
│   ├── web
│   ├── os
│   ├── twin
│   └── docs
├── packages/
│   ├── ui
│   ├── auth
│   ├── api-client
│   ├── twin-sdk
│   └── design-system
└── infrastructure/
```

The website remains the enterprise gateway. Construction OS and Construction Twin
remain independently deployable, sharing identity, design language and API
contracts over time.

## Internationalisation

The site ships in English and Simplified Chinese. Both locales carry an explicit
URL prefix (`/en/...`, `/zh/...`) so canonical URLs and hreflang stay
unambiguous; `middleware.ts` redirects any bare path to the visitor's locale,
resolved from an explicit cookie choice first and `Accept-Language` second.

```text
apps/web/
├── middleware.ts             locale detection, redirect, x-oneai-locale header
├── app/[locale]/             every page, statically rendered once per locale
├── lib/i18n/
│   ├── config.ts             locales, tags, path helpers
│   ├── en/ · zh/             the dictionaries, split by area
│   ├── types.ts              Dictionary shape, derived from English
│   ├── format.ts             `{placeholder}` substitution
│   └── dictionaries.ts       synchronous lookup
├── lib/ask-twin/{en,zh}.ts   demo answers and evidence records
└── content/insights/{en,zh}/ articles, one file per locale
```

### Rules that keep the two languages in step

**English is the source of truth for the shape.** `Dictionary = Widen<typeof en>`
widens string literals but preserves structure, so a key that is missing,
renamed or wrongly nested in `zh` fails `tsc`, rather than silently rendering
English text on the Chinese site.

**Dictionary values must be serialisable.** Every page is a server component
that passes `t` into client components, so a function in a dictionary breaks the
RSC boundary. Strings with `{placeholder}` tokens plus `lib/i18n/format.ts`
cover the cases that need interpolation.

**Locale travels with the contact payload.** `/api/contact` has no layout
context, so the form posts its locale and the route builds the zod schema from
that dictionary — validation errors come back in the language the visitor is
reading.

**Typography is adjusted, not just translated.** Han characters have no word
boundaries and the Latin display tracking is far too tight for them, so
`:lang(zh)` rules in `styles/chrome.css` loosen letter-spacing and line-height
on display sizes. Reading time is counted per character for CJK, since a
whitespace word count reports a 3,000-character essay as a one-minute read.

**Article slugs are shared across locales** so `/en/resources/x` and
`/zh/resources/x` are translations of each other and can point hreflang at each
other. Adding a language means adding `content/insights/<locale>/` with the same
filenames.

### Adding a locale

1. Add the code to `locales` in `lib/i18n/config.ts` with its tag and labels.
2. Create `lib/i18n/<locale>/` — `tsc` will list every key still missing.
3. Add `lib/ask-twin/<locale>.ts` and `content/insights/<locale>/`.
4. Extend the `Accept-Language` matcher in `middleware.ts`.

Everything else — routing, sitemap, hreflang, the switcher, static generation —
picks the new locale up from `locales`.
