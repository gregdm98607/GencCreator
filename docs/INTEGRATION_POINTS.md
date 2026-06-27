# GenCreator Integration Points — CTO Decision Record

> **Decision:** APPROVED
> **Date:** 2026-04-16
> **Author:** CTO (Shared Services)
> **Status:** Updated 2026-06-27 — integration architecture confirmed and OGF deployment verified

---

## Decision

GenCreator has four integration points for the MVP. Each is documented below with the confirmed approach, responsible parties, and blocking dependencies.

---

## 1. OGF Site Embed

**Approach:** Direct copy integration (ARCHITECTURE.md Option 3 — simplest for MVP)

GenCreator Preact components and knowledge base files are copied from `C:\Dev\gencreator\src\` into the OGF Astro project at `C:\Dev\ogf-site\src\`. The GenCreator page currently lives at `/research-planner/` on operationgrannyfiles.com, while `/gencreator/` remains preserved as a compatibility route.

**Deployment verification (2026-06-27):**
- `https://www.operationgrannyfiles.com/research-planner/` returns 200 and contains the planner.
- `https://www.operationgrannyfiles.com/gencreator/` returns 200 and contains the planner.
- `https://www.operationgrannyfiles.com/sitemap-index.xml` returns the sitemap index.
- `https://operationgrannyfiles.com/sitemap-0.xml` returns 200 and lists both `/research-planner/` and `/gencreator/`.
- `https://www.operationgrannyfiles.com/sitemap.xml` returns 404; use `/sitemap-index.xml` as the live sitemap entrypoint.

| Detail | Value |
|--------|-------|
| Integration method | Direct file copy into OGF `src/` |
| Page route | `/research-planner/` live; `/gencreator/` preserved |
| Hydration | Preact island via `client:load` directive |
| Styling | Handwritten `src/styles/gencreator.css` inheriting OGF "Archival Warmth" tokens; not Tailwind |
| Navigation | Link from OGF desktop and mobile header nav as "Research Planner"; footer does not currently include it |
| SEO | Static Astro shell renders the form markup; island hydrates on load. Live sitemap includes both routes. |

**Migration path:** If build complexity grows in Phase 3+, upgrade to npm workspace (monorepo) or private npm package. The component boundaries are clean enough to support extraction.

**Blocking dependencies:** None. OGF repo is accessible; Astro + Preact integration is already installed.

**Repo/deploy notes:**
- Local OGF branch is `master`, and `origin/master` points to the latest inspected commit `c4abbc0`.
- `.github/workflows/frontend-check.yml` runs `npm run build` on pushes/PRs to `master` with Node 22.
- `.deployconfig.yml` still names `production_branch: main`, while the actual local/remote branch is `master`; treat that as a deployment-config discrepancy to clarify before relying on the auto-deploy metadata.

---

## 2. Email Capture (ConvertKit)

**Approach:** Server-side Astro API route → ConvertKit REST API

When a user clicks "Email Me This Plan," the plan is formatted as HTML and sent via ConvertKit. The user is simultaneously subscribed to the OGF email list (with clear disclosure on the form).

| Detail | Value |
|--------|-------|
| Endpoint | `/api/gencreator-email` (Astro API route, runs on Vercel serverless) |
| Email platform | ConvertKit (OGF's existing provider) |
| API method | ConvertKit v3 REST API — `POST /subscribers` + `POST /broadcasts` (or transactional email) |
| API key storage | Vercel environment variable `CONVERTKIT_API_SECRET` |
| Form fields | Email address (required), first name (optional) |
| Disclosure | "We'll also subscribe you to the OGF newsletter. You can unsubscribe anytime." |
| Rate limiting | Client-side: disable button after submit. Server-side: Vercel function default limits sufficient for MVP. |
| Error handling | Client shows friendly error; server logs to Vercel function logs |

**Flow:**
```
User clicks "Email Me This Plan"
  → Client: validate email, show loading state
  → POST /api/gencreator-email { email, firstName?, plan: ResearchPlan }
  → Server: format plan as HTML email body
  → Server: ConvertKit API — create/update subscriber, tag with "gencreator"
  → Server: ConvertKit API — send transactional email with formatted plan
  → Client: show success confirmation
```

**Current deployed state:** OGF PR #3 deployed the Kit public-form capture wiring for form `9616629`. Static HTML checks do not expose the form ID because the capture behavior lives in the hydrated client bundle; live seed testing remains the operational confirmation.

**Activation notes:** Confirm the Kit form/automation applies tag `gencreator-plan-generated`. Do not reuse OGF form `9444299`; existing OGF comments indicate that form is workbook/FPF-scoped. See `docs/KIT_INTEGRATION_PLAN.md`.

---

## 3. Affiliate Link Injection

**Approach:** Client-side URL generation from static database-directory.json

Every research step that references an external database includes a tracked affiliate link. Links are generated at render time by `src/lib/utils/affiliate.ts` using data from `database-directory.json`.

| Detail | Value |
|--------|-------|
| Link format | Current code uses `{baseUrl}?tag={affiliateId}&utm_source=gencreator&utm_medium=research-plan&utm_campaign={recordType}` |
| Affiliate programs | Ancestry (Rakuten), MyHeritage, FindMyPast, Newspapers.com |
| Free sources | FamilySearch, BLM/GLO, state archives — no affiliate ID; UTM tracking only |
| Disclosure | FTC-compliant disclosure on GenCreator page: "Some links are affiliate links. We earn a small commission at no cost to you." |
| Link behavior | `target="_blank" rel="noopener noreferrer"` — opens in new tab |
| Analytics | `gencreator_affiliate_click` GA4 event fires on each click (link URL, record type, database name) |

**Current state:** database-directory.json is populated with real URLs and UTM parameters. Affiliate IDs are placeholder ("TBD") pending program approvals. OGF `BaseHead.astro` also includes an Impact affiliate verification meta tag (`impact-site-verification`), so at least part of affiliate-network site verification is already deployed.

**Blocking dependencies:** Affiliate program approvals (Greg/CRO) and a per-network link builder. Per CRO Finding 14, Ancestry/MyHeritage/FindMyPast need CJ-style deep links, not just the current `tag=` query parameter. Links will work without affiliate IDs (users still reach the correct page, just no commission tracking).

---

## 4. Analytics (GA4)

**Approach:** GA4 custom events via `gtag()` calls in Preact components

OGF already has GA4 configured. GenCreator adds six custom events to track the user journey from form start to plan interaction.

| Event Name | Trigger | Key Parameters |
|-----------|---------|---------------|
| `gencreator_form_started` | User begins filling form | none currently |
| `gencreator_plan_generated` | Form submitted, plan renders | stepCount, country, researchGoal |
| `gencreator_email_captured` | Email submitted successfully | — |
| `gencreator_affiliate_click` | User clicks database link | databaseName, recordType, accessModel |
| `gencreator_mission_click` | User clicks OGF mission link | missionSlug, missionLevel |
| `gencreator_print` | User triggers print/save | — |

**Implementation:** Thin wrapper function in `src/lib/gencreator/analytics.ts` in OGF (`src/lib/analytics.ts` in the source repo) that calls `window.gtag()` with structured event data. Falls back gracefully if gtag is not loaded (ad blockers, privacy settings).

**Blocking dependencies:** None. GA4 property exists; custom events require no configuration in the GA4 admin — they appear automatically on first fire.

---

## Integration Dependency Summary

| Integration | Build-ready | Activation blocker |
|------------|-------------|-------------------|
| OGF site embed | Yes | None |
| Email capture (Kit/ConvertKit) | Deployed to Kit form `9616629` | Seed test; confirm tag automation |
| Affiliate links | Yes (graceful degradation); strategy done | Affiliate IDs/program approvals + CJ deep-link builder details |
| Analytics (GA4) | Yes | None |

**Bottom line:** The OGF embed and analytics are live. Email and affiliate integrations are visible in the UI but still need activation work before launch-quality monetization/lead capture.

---

*This document formalizes the integration architecture documented in ARCHITECTURE.md and confirms CTO decisions on approach for each integration point.*
*See also: [[ARCHITECTURE]] | [[TECH_STACK_DECISION]] | [[DATA_MODEL_DECISION]] | [[MVP_SPEC_DRAFT]]*
