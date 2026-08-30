# OneAI Construction Web v2.1

Enterprise product website for **OneAI Construction** — AI-native intelligence for
construction and infrastructure.

## What is included

**Languages**
- English and Simplified Chinese, both fully translated — UI, page copy, all
  three interactive demos, and all four long-form articles
- Explicit `/en` and `/zh` URL prefixes with canonical + hreflang on every page
- Automatic locale detection from cookie then `Accept-Language`, with an
  in-header switcher that keeps you on the same page
- CJK-aware typography and reading-time estimation

**Marketing surface**
- Premium enterprise homepage with an interactive 3D Project Twin hero
- Construction OS and Construction Twin product pages, with a capability comparison
- Solutions, Platform, Industries, Enterprise, Pilot, Company and Contact pages
- Customers page with case studies and measured outcomes
- Security & Trust page covering the questions a procurement review asks first
- Pricing and engagement model with FAQ
- Resources: a file-based Markdown content layer with four long-form articles

**Interactive demos**
- 3D Twin scene — real rotation, depth sorting and orbit control, no WebGL dependency
- Ask Twin — evidence-first answers where every claim opens its source record
- 4D forecast chart — baseline, actual and a P10/P50/P90 uncertainty cone

**Engineering**
- Working contact pipeline: zod validation, honeypot, dual rate-limit budgets,
  Resend and webhook delivery
- Per-page metadata, canonical URLs, Organization / SoftwareApplication /
  Breadcrumb / Article / FAQ JSON-LD, sitemap and robots
- Self-hosted Inter via `next/font`, skip link, visible focus, keyboard-operable demos
- Layered stylesheet, cookieless analytics, dynamic favicon and OG image
- ESLint flat config, Prettier, TypeScript strict checks
- 114 Playwright tests across desktop and mobile, both locales
- GitHub Actions CI with Lighthouse budgets

## Requirements

- Node.js 20+
- npm 10+

## Fast start

```bash
cp apps/web/.env.example apps/web/.env.local
npm install
npm run dev
```

Open `http://localhost:3000`.

## Commands

```bash
npm run dev           # development server
npm run build         # production build
npm run start         # serve the production build
npm run lint          # ESLint
npm run typecheck     # tsc --noEmit
npm run format        # Prettier
npm run test:e2e      # Playwright (builds and serves automatically)
```

## Before production

**The contact form now works — but only once a delivery channel is configured.**
Set `RESEND_API_KEY` + `LEAD_INBOX`, or `LEAD_WEBHOOK_URL`. Without either, leads
are written to the server log and nothing is delivered.

**Point the product URLs at first-party subdomains.** Vendor origins
(`*.vercel.app`, `*.up.railway.app`) must not appear in public marketing.

See `docs/DEPLOYMENT.md` for the full pre-launch checklist, and
`docs/OPERATIONS.md` for the current state of the estate and what is still
outstanding across the three repositories.

## Adding an article

Drop a Markdown file into `apps/web/content/insights/<locale>/` — the same
filename in each locale directory, since the slug is shared and used to pair the
translations for hreflang:

```markdown
---
title: Your title
description: One-sentence summary used for search and social cards.
date: 2026-09-01
category: Platform
---
```

The route, sitemap entry, reading time and Article JSON-LD are generated
automatically, for every locale.

## Adding a language

See `docs/ARCHITECTURE.md` → Internationalisation. In short: add the code to
`locales` in `apps/web/lib/i18n/config.ts`, then create the dictionary
directory — `npm run typecheck` will list every key you still owe.

## Recommended DNS architecture

```text
oneaiconstruction.com        -> marketing website
www.oneaiconstruction.com    -> redirect to apex
os.oneaiconstruction.com     -> Construction OS
twin.oneaiconstruction.com   -> Construction Twin
api.oneaiconstruction.com    -> future platform API
docs.oneaiconstruction.com   -> future developer docs
status.oneaiconstruction.com -> status page
```

## Brand position

**OneAI Construction — Intelligence for the Built World.**

```text
Project Data → Project World Model → Evidence + Intelligence
            → Risk + Forecast + Simulation → Human-approved Action
```

Product structure:

```text
OneAI Construction
├── Construction OS
└── Construction Twin
```

## Translation notes

The Chinese copy is a full translation, not machine output routed through a
template — including the demo evidence records, which read as genuine site
documentation rather than transliterated English. Have a native
construction-industry reviewer read `/zh` before launch: the terminology choices
(标段, 时差, 关键线路, 基线) are deliberate, but a domestic PM should confirm
they match how your target customers actually speak.

## Data disclosure

The three homepage demos run on representative project data in
`lib/twin-data.ts`, `lib/ask-twin-data.ts` and `lib/forecast.ts`. Replace them
with live Construction Twin API responses when the public read endpoint is
available. The metrics on `/customers` are placeholders pending client sign-off —
verify each figure before launch.
