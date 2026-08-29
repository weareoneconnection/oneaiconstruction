# Deployment

## Recommended stack

- Website: Vercel
- DNS / WAF / TLS: Cloudflare
- Construction OS: existing Vercel deployment initially
- Construction Twin: existing Railway deployment initially
- API: Railway or AWS when consolidated
- Object storage: Cloudflare R2 / S3

## Vercel

1. Create a new Vercel project and import this repository.
2. Set Root Directory to `apps/web`.
3. Add every variable from `apps/web/.env.example`.
4. Add `oneaiconstruction.com` and `www.oneaiconstruction.com`.
5. Configure `www` to redirect to the apex domain.

## Required before launch

These are blocking. The site is technically deployable without them, but it will
either drop demand or damage the enterprise positioning.

| Item | Why it blocks |
| --- | --- |
| `RESEND_API_KEY` + `LEAD_INBOX`, or `LEAD_WEBHOOK_URL` | Without a channel, `/api/contact` logs the lead and returns success. Every demo request is lost. |
| `NEXT_PUBLIC_CONSTRUCTION_OS_URL` → `os.oneaiconstruction.com` | Otherwise the site links to a vendor origin. |
| `NEXT_PUBLIC_CONSTRUCTION_TWIN_URL` → `twin.oneaiconstruction.com` | Same. `grateful-dedication-production-53e7.up.railway.app` on an enterprise site undermines the positioning instantly. |
| `NEXT_PUBLIC_SITE_URL` | Drives canonical URLs, sitemap and Open Graph. |

Verify the contact path end-to-end in the production environment after the first
deploy — submit a real request and confirm it arrives.

## Optional

| Item | Effect |
| --- | --- |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | Enables cookieless analytics. Blank disables the script entirely. |
| `LEAD_FROM` | Overrides the notification sender address. |

## Product subdomains

Point `os.oneaiconstruction.com` at the Construction OS deployment and
`twin.oneaiconstruction.com` at the Construction Twin deployment. Keep
Vercel/Railway origin URLs out of public marketing once custom domains are live.

## Rate limiting

`/api/contact` uses an in-memory fixed-window limiter (30 requests and 5 accepted
submissions per IP per hour). This is correct for a single-region deployment. If
the site is scaled across regions or instances, replace the map in
`lib/rate-limit.ts` with Vercel KV or Upstash Redis — the call signature is
designed to stay the same.

## CI

`.github/workflows/ci.yml` runs Prettier, ESLint, `tsc --noEmit` and the
production build; a second job runs Playwright across desktop and mobile
projects; a third asserts Lighthouse budgets (performance ≥ 90, accessibility ≥
95, best practices ≥ 95, SEO ≥ 95) from `lighthouserc.json`.

## Internationalisation

Both locales are statically generated at build time, so no runtime translation
service is involved. Two deployment details matter:

**The middleware must run.** Bare paths (`/`, `/products`) are 307-redirected to
a locale prefix by `middleware.ts`. On Vercel this works out of the box. Behind
a CDN that caches aggressively, make sure the redirect is not cached without
regard for the `Accept-Language` header and the `oneai-locale` cookie — or
visitors will be pinned to whichever language happened to be cached first.

**Submit the sitemap once.** `/sitemap.xml` contains every URL in both locales
with full `xhtml:link` alternates, so a single submission covers both languages.
Do not register the locales as separate properties.
