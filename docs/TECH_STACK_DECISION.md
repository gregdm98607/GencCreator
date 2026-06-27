# GenCreator Tech Stack — CTO Decision Record

> **Decision:** APPROVED
> **Date:** 2026-04-16
> **Author:** CTO (Shared Services)
> **Status:** Updated 2026-06-27 — aligns with SSM Astro/Vercel standard; styling adjusted to match deployed OGF reality

---

## Decision

The GenCreator MVP will use the SSM standard stack with no deviations. The technology choices documented in ARCHITECTURE.md are hereby confirmed as the formal tech stack selection for Phase 1.

## Stack Summary

| Layer | Technology | Version/Notes |
|-------|-----------|---------------|
| Host site | Astro SSG | OGF site (operationgrannyfiles.com) |
| Interactive component | Preact via `@astrojs/preact` | ~3KB; React-compatible; Astro first-class support |
| Styling | Handwritten CSS + OGF CSS custom properties | OGF does not use Tailwind; GenCreator ships `gencreator.css` and inherits "Archival Warmth" tokens |
| Knowledge base | TypeScript/JSON static data files | No database for MVP |
| Email integration | ConvertKit API (server-side) | OGF's existing platform; via Astro API route |
| Affiliate tracking | UTM parameters + affiliate IDs | Configured in database-directory.json |
| Analytics | GA4 custom events | 6 event types defined in ARCHITECTURE.md |
| Hosting | Vercel (via OGF deployment) | Free tier sufficient for MVP traffic |
| Testing | Vitest | Astro ecosystem standard; TypeScript-native |
| Runtime | Node.js v24 | SSM standard per CTO Architecture Overview |
| Build approach | Preact island in OGF (Option C) | Per ARCHITECTURE.md decision |
| Integration method | Direct copy into OGF src/ for MVP | Upgrade to npm workspace if complexity warrants |

## Deviation Assessment

No deployment-stack deviations from SSM standard are required. GenCreator uses Astro + Vercel in the OGF site, with Preact added via the official Astro integration for the interactive planner. Styling deliberately follows OGF's existing handwritten CSS system rather than Tailwind, because the live host site does not use Tailwind.

## Dependencies Confirmed

| Dependency | Status | Notes |
|-----------|--------|-------|
| `@astrojs/preact` | Available | Official Astro integration; actively maintained |
| `preact` | v10.x stable | 3KB gzipped; API-compatible with React |
| ConvertKit API | Available | OGF already uses ConvertKit; API key exists |
| Vercel hosting | Available | OGF already deployed on Vercel |
| GA4 | Available | OGF already has GA4 property configured |

## Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Preact/React API gap | Low | Medium | MVP uses basic hooks only; no exotic React APIs needed |
| Astro islands hydration overhead | Low | Low | Target <50KB gzipped; Preact is inherently small |
| ConvertKit API rate limits | Low | Low | MVP traffic is <1000 plans/day; well within limits |
| Knowledge base maintenance burden | Medium | Low | Static JSON is easy to update; no schema migrations |

---

*This decision formalizes the stack already documented in ARCHITECTURE.md. No new technology introductions are required.*
*See also: [[ARCHITECTURE]] | [[MVP_SPEC_DRAFT]] | [[PRODUCT_BRIEF]]*
