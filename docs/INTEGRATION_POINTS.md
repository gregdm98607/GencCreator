# GenCreator Integration Points — CTO Decision Record

> **Decision:** APPROVED
> **Date:** 2026-04-16
> **Author:** CTO (Shared Services)
> **Status:** Final — integration architecture confirmed for MVP build

---

## Decision

GenCreator has four integration points for the MVP. Each is documented below with the confirmed approach, responsible parties, and blocking dependencies.

---

## 1. OGF Site Embed

**Approach:** Direct copy integration (ARCHITECTURE.md Option 3 — simplest for MVP)

GenCreator Preact components and knowledge base files will be copied from `c:\dev\GenCreator\src\` into the OGF Astro project at `c:\dev\operation-granny-files\`. The GenCreator page lives at `/gencreator` on operationgrannyfiles.com.

| Detail | Value |
|--------|-------|
| Integration method | Direct file copy into OGF `src/` |
| Page route | `/gencreator` (Astro page) |
| Hydration | Preact island via `client:visible` directive |
| Styling | Tailwind CSS (shared with OGF) |
| Navigation | Link from OGF main nav + footer; internal links from mission pages |
| SEO | Static Astro shell provides SSR content for crawlers; interactive island hydrates on scroll |

**Migration path:** If build complexity grows in Phase 3+, upgrade to npm workspace (monorepo) or private npm package. The component boundaries are clean enough to support extraction.

**Blocking dependencies:** None. OGF repo is accessible; Astro + Preact integration is standard.

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

**Blocking dependencies:** None for build. ConvertKit API key already exists for OGF. CRO to configure the "gencreator" subscriber tag in ConvertKit.

---

## 3. Affiliate Link Injection

**Approach:** Client-side URL generation from static database-directory.json

Every research step that references an external database includes a tracked affiliate link. Links are generated at render time by `src/lib/utils/affiliate.ts` using data from `database-directory.json`.

| Detail | Value |
|--------|-------|
| Link format | `{baseUrl}?tag={affiliateId}&utm_source=gencreator&utm_medium=research-plan&utm_campaign={recordType}` |
| Affiliate programs | Ancestry (Rakuten), MyHeritage, FindMyPast, Newspapers.com |
| Free sources | FamilySearch, BLM/GLO, state archives — no affiliate ID; UTM tracking only |
| Disclosure | FTC-compliant disclosure on GenCreator page: "Some links are affiliate links. We earn a small commission at no cost to you." |
| Link behavior | `target="_blank" rel="noopener noreferrer"` — opens in new tab |
| Analytics | `gencreator_affiliate_click` GA4 event fires on each click (link URL, record type, database name) |

**Current state:** database-directory.json is populated with real URLs and UTM parameters. Affiliate IDs are placeholder ("TBD") pending program approvals.

**Blocking dependencies:** Affiliate program approvals (Greg/CRO) — overdue as of 2026-04-15. Not blocking Phase 1/2 work; will block Phase 3 affiliate link activation. Links will work without affiliate IDs (users still reach the correct page, just no commission tracking).

---

## 4. Analytics (GA4)

**Approach:** GA4 custom events via `gtag()` calls in Preact components

OGF already has GA4 configured. GenCreator adds six custom events to track the user journey from form start to plan interaction.

| Event Name | Trigger | Key Parameters |
|-----------|---------|---------------|
| `gencreator_form_start` | User begins filling form | country, researchGoal |
| `gencreator_plan_generated` | Form submitted, plan renders | stepCount, country, researchGoal |
| `gencreator_email_captured` | Email submitted successfully | — |
| `gencreator_affiliate_click` | User clicks database link | databaseName, recordType, accessModel |
| `gencreator_mission_click` | User clicks OGF mission link | missionSlug, missionLevel |
| `gencreator_print` | User triggers print/save | — |

**Implementation:** Thin wrapper function in `src/lib/utils/analytics.ts` that calls `window.gtag()` with structured event data. Falls back gracefully if gtag is not loaded (ad blockers, privacy settings).

**Blocking dependencies:** None. GA4 property exists; custom events require no configuration in the GA4 admin — they appear automatically on first fire.

---

## Integration Dependency Summary

| Integration | Build-ready | Activation blocker |
|------------|-------------|-------------------|
| OGF site embed | Yes | None |
| Email capture (ConvertKit) | Yes | CRO to create "gencreator" tag in ConvertKit |
| Affiliate links | Yes (graceful degradation) | Affiliate IDs pending program approvals (Greg/CRO) |
| Analytics (GA4) | Yes | None |

**Bottom line:** All four integrations are buildable now. Two have minor activation dependencies (ConvertKit tag, affiliate IDs) that don't block development work.

---

*This document formalizes the integration architecture documented in ARCHITECTURE.md and confirms CTO decisions on approach for each integration point.*
*See also: [[ARCHITECTURE]] | [[TECH_STACK_DECISION]] | [[DATA_MODEL_DECISION]] | [[MVP_SPEC_DRAFT]]*
