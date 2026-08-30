# Operations Checklist

State of the OneAI Construction estate, and what is still outstanding. Covers
three repositories and five deployed services, because the marketing site now
reads live data from two of them and a change in either shows up on the public
site within seconds.

Last reviewed: 2026-08-30.

## Live today

| Surface | Where | Notes |
|---|---|---|
| Marketing site | `oneaiconstruction.com` | Apex serves, `www` 308s to it. English and Simplified Chinese, 48 pages. |
| Construction OS | `os.oneaiconstruction.com` | Vercel |
| Construction Twin | `twin.oneaiconstruction.com` | Railway (web) |
| Twin API | `oneaiconstractiontwin-production.up.railway.app` | Public demo enabled |
| OS API | `oneaiapi-production.up.railway.app` | Public demo enabled |
| OCR service | `oneaiocr-api-production.up.railway.app` | Internal token required |
| OneAI gateway | `oneai-api-production.up.railway.app` | Bearer required |
| OneClaw | `oneclaw-production.up.railway.app` | Bearer required |

Four panels on the marketing site read live product output: Ask Twin, the 4D
forecast, the OS cost position and the OS prediction accuracy. Each falls back
to sample data when its endpoint is unreachable, so an outage is invisible to
visitors rather than a broken page.

## Outstanding — security

These are live risks. Nothing below is blocked on engineering work; each needs
an action in a provider console.

- [ ] **Rotate the Neon database password.** Committed to
      `OnAIConstructionOS/.env.example` and still in git history. Update
      `DATABASE_URL` in Railway afterwards.
- [ ] **Rotate the Mistral API key.** Same exposure. Update `MISTRAL_API_KEY`
      on the OCR service.
- [ ] **Rotate the OCR API key.** Same exposure. Update
      `DOCUMENT_OCR_API_KEY` on the OS API.
- [ ] **Reset `founder@oneai.local`.** The README published a default password
      against a FOUNDER account, and FOUNDER carries cross-organization
      visibility. Check `AuditLog` for logins you do not recognise.
- [ ] **Rotate the Twin `JWT_SECRET`.** It was pasted into a terminal
      transcript. `openssl rand -base64 48`, update Railway, restart.
- [ ] **Rewrite the OS git history**, after every rotation above has landed.
      Rewriting first protects nothing.
- [ ] **Read the provider access logs** for the window the credentials were
      live. Rewriting history removes the strings; it does not tell you whether
      anyone used them.

Procedure: `OnAIConstructionOS/docs/CREDENTIAL_ROTATION.md`.

## Outstanding — hardening

- [ ] **Enable GitHub secret scanning with push protection** on the
      organization. It blocks the commit rather than reporting it afterwards.
- [ ] **Decide the Twin API's production posture.** It runs `APP_ENV=staging`
      with `DEMO_ENDPOINTS_ENABLED=true` so the demo project can be seeded.
      That is correct for a demo instance and wrong for one holding customer
      data. Before a customer deployment, run them as separate services.
- [ ] **Clean the 14 test projects** in the Twin's `demo-tenant`. The public
      demo cannot reach them — it is pinned to `public-demo-tenant` — but they
      should not survive into a production database.
- [ ] **Configure an identity provider for the Twin.** The API runs
      `AUTH_MODE=jwt` with `oidc: null`, so the only way to sign in to
      `twin.oneaiconstruction.com` is to paste a token minted with the
      deployment's `JWT_SECRET` (`scripts/mint_token.py` in the Twin repo).
      That works for operators and for nobody else. Before anyone outside the
      team gets an account, set `OIDC_ISSUER`, `OIDC_AUDIENCE` and
      `OIDC_CLIENT_ID` — `docs/AUTH_OIDC.md` there has the full procedure.
      Re-enabling `ALLOW_DEV_HEADER_AUTH` is not the fix: it grants any
      anonymous caller `platform_admin`, which is the hole this closed.
- [ ] **Commission an external penetration test.** The Security & Trust page
      says it has not been done; that statement should stop being true before
      general availability.

## Outstanding — product

- [ ] **Replace the demo metrics on `/customers` with real ones.** The page
      currently shows the demo organization's seeded prediction history
      (79% / 75% / 79%). Once a live project produces scored predictions,
      point `PUBLIC_DEMO_ORGANIZATION_ID` at it — or publish both, clearly
      separated.
- [ ] **Get a reference customer.** `/customers` says there are no case
      studies yet, which is honest and is also the largest gap in the funnel.
- [ ] **Decide whether the demo instance keeps its model gateway.** With
      `ONEAI_CORE_URL` set, Ask Twin answers are model-backed and cost roughly
      $0.002 per question, bounded by a 6/minute limit. Without it, answers
      come from the local reasoner and the site says so.

## What must stay true

The marketing site makes claims that are only true while the code behind them
is. If you change one of these, change the site in the same pass.

- **`/security` lists implemented controls and a "what we have not done"
  section.** SAML, SOC 2, ISO 27001 and penetration testing are named as
  absent. If one becomes true, move it; if a listed control is removed from the
  product, remove it here.
- **`/customers` publishes the scoring tolerances** — delay ±7 days, cost ±10%,
  risk ±20 points. These are fixed in `scorePrediction` and unit-tested.
  Changing them there changes what the page means.
- **Ask Twin renders whatever provenance the API reports**, including
  `model_backed: false`. Do not override it. A demo claiming reasoning it did
  not use would undercut the evidence policy the page exists to demonstrate.
- **The accuracy panel withholds a rate below 10 scored predictions.** A
  percentage over one or two is noise, and the page argues against exactly
  that.

`apps/web/lib/product-facts.ts` records each claim with the source file it came
from. A claim that cannot be traced to shipped code does not belong there, and
therefore does not belong on the site.

## Verification

Run after any deployment that touches the demo endpoints.

```bash
SITE=https://oneaiconstruction.com
TWIN=https://oneaiconstractiontwin-production.up.railway.app
OS=https://oneaiapi-production.up.railway.app
OCR=https://oneaiocr-api-production.up.railway.app

# Site: apex serves, www redirects to it
curl -sL -o /dev/null -w '%{url_effective} %{http_code}\n' $SITE

# Metadata routes must not be swallowed by the locale middleware
for p in /opengraph-image /icon /sitemap.xml /robots.txt; do
  printf '%-20s %s\n' "$p" "$(curl -s -o /dev/null -w '%{http_code}' "$SITE$p")"
done

# Demo endpoints answer without credentials
curl -s -o /dev/null -w 'twin meta %{http_code}\n' $TWIN/api/v1/public/demo/meta
curl -s -o /dev/null -w 'os accuracy %{http_code}\n' $OS/public/demo/accuracy

# Authenticated surfaces still refuse anonymous callers
curl -s -o /dev/null -w 'twin projects %{http_code} (expect 401)\n' $TWIN/api/v1/projects
curl -s -o /dev/null -w 'os projects   %{http_code} (expect 401)\n' $OS/v1/projects

# OCR guard is armed. `false` means the deployment lost OCR_INTERNAL_TOKEN
# and is refusing every request — the intended failure, but still a failure.
curl -s $OCR/health | grep -o '"authConfigured":[a-z]*'
```

The site's own suite covers the rest:

```bash
cd apps/web && npm run lint && npm run typecheck && npm run test:e2e
```

`e2e/proof.spec.ts` fails if a withdrawn claim reappears on the site.
