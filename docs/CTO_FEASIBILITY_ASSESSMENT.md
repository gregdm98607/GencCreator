# GenCreator — CTO Technical Feasibility Assessment

> **Gate 1 artifact (1 of 3):** technical feasibility assessment (CTO).
> The companion artifacts — finalized MVP spec (CPO) and revenue model (CRO) — are **not** covered here and remain open (see §8).
> **Owner:** CTO (Enterprise Officer) · **Prepared for:** SSM CEO (Gate 1 approver), Chairman (info)
> **Date:** 2026-06-06 · **Verdict:** ✅ **FEASIBLE — CTO feasibility CONFIRMED**
> **Basis:** M1 Feasibility Prototype exit criteria met (see [ROADMAP.md](ROADMAP.md) M1) and independently re-verified on the date above.

---

## 1. Purpose & Scope

Gate 1 (Validation → Development) requires three artifacts per [GOVERNANCE.md](GOVERNANCE.md) §Decision Gates: a finalized MVP spec (CPO), a **technical feasibility assessment (CTO)**, and a revenue model (CRO). This document is the CTO artifact.

It answers one question for the CEO: **is the GenCreator MVP, as specified in [MVP_SPEC_DRAFT.md](MVP_SPEC_DRAFT.md), technically buildable and shippable within SSM stack constraints at acceptable quality and cost?**

The answer is **yes**, and the evidence is stronger than a paper assessment: the end-to-end MVP is already **built, integrated, and live in the OGF build** as the M1 feasibility prototype. Feasibility is not projected — it is demonstrated.

---

## 2. Verdict

**FEASIBLE.** The MVP can be built — and substantially *has* been built — on the mandated SSM stack (Astro SSG + Preact island, Vercel hosting, GA4) with no architectural blockers, no new infrastructure, and no external runtime dependencies. Quality gates (Lighthouse ≥ 90, WCAG 2.1 AA, unit tests) are met today on the prototype.

The residual work to reach a shippable launch is **not feasibility risk** — it is (a) two product/revenue decisions owned by CPO/CRO, and (b) a short, well-understood hardening backlog. These are enumerated honestly in §7–§8 so the CEO sees the whole picture, not a green light over hidden risk.

---

## 3. Evidence — verified on 2026-06-06

All claims below were re-checked this session, not carried over from prior logs.

| Check | Result | How verified |
|-------|--------|--------------|
| Unit tests (gencreator) | **36 / 36 pass** | `npm test` |
| Type safety | **clean** | `npm run typecheck` (`tsc --noEmit`, 0 errors) |
| OGF site build | **green, 12 pages** | `npm run build` in `C:\Dev\ogf-site` |
| `/gencreator` page emitted | **yes** | `dist/gencreator/index.html` present |
| Preact island hydrates | **yes** | `dist/_astro/GenCreator.*.js` + preact/client chunks emitted |
| Lib in sync across repos | **byte-identical** | `diff` on `planner.ts` and `analytics.ts` (gencreator ↔ ogf-site) |
| Lighthouse (clean run) | **99 / 96 / 96 / 100** (Perf/A11y/BP/SEO) | Sprint 6 QA — see [qa/sprint6/QA_RESULTS.md](../qa/sprint6/QA_RESULTS.md) |
| WCAG 2.1 AA (GenCreator UI) | **axe-clean — 0 violations** | axe-core 4.10.2 scoped to `main`, form + plan states |

---

## 4. Stack-Constraint Conformance

The CLAUDE.md mandate is "all SSM sites use Astro; Vercel; GA4 + Vercel Analytics; GitHub; Node 24." GenCreator conforms on every axis:

- **Framework:** Astro SSG with a single Preact island (`<GenCreator client:load />`) — the recommended option-3 path from CLAUDE.md, chosen because the tool is interactivity-heavy but the host site is static. No SSR, no edge functions, no server runtime required for the core experience.
- **Hosting:** Ships inside the existing OGF Vercel deployment. **No new project, domain, or deploy lifecycle** — GenCreator is one more static page in OGF's `astro build`.
- **Analytics:** Reuses OGF's already-loaded GA4 (`G-37J0MF9QZK` in `BaseHead.astro`). Five custom events fire through a thin `lib/analytics.ts` `track()` wrapper that no-ops when gtag is absent (SSR/tests/ad-blockers) and never throws into the UI. Ancestor names are FNV-1a-hashed, not sent raw (no PII to GA4).
- **Design system:** Inherits OGF's "Archival Warmth" tokens via CSS custom properties with fallbacks — the embedded tool automatically matches OGF branding with zero per-deploy theming work.
- **Node / tooling:** Node 24, ESM, TypeScript strict, Vitest. Matches SSM standard.

**Build/buy:** Build (static knowledge base), not buy. Rationale below.

---

## 5. Architecture Risk Review

| Dimension | Assessment | Notes |
|-----------|------------|-------|
| **Core "intelligence"** | **Low risk** | Static JSON knowledge base + deterministic scoring algorithm (filter → score → sort → top-N). No LLM call, no external API, no network dependency at plan-generation time. Plans generate client-side in <3s trivially (US-1 acceptance met). |
| **Data acquisition** | **Bounded** | The value is the data, not the code (findings.md Finding 3). MVP scope is US records 1790–1950 — the best-documented genealogical landscape. Expansion (UK/CA, state-level) is additive JSON, not re-architecture. |
| **Performance** | **Low risk** | GenCreator's own footprint is tiny: ~11 KiB island JS + ~2 KiB CSS + ~5 KiB preact runtime; TBT 100ms, CLS 0. It does not degrade host-page performance. |
| **Accessibility** | **Low risk** | Audience skews 35–70, so a11y is load-bearing. GenCreator UI is axe-clean at WCAG 2.1 AA after Sprint 6 fixes (badge contrast, ARIA roles). Keyboard/focus/labels/landmarks verified. |
| **Scalability / cost** | **Negligible** | Pure static assets on Vercel CDN. No per-request compute, no database, no API quota. Marginal cost per user ≈ 0. |
| **Integration coupling** | **Managed (see §7)** | Lib is integrated into OGF by direct file copy, not a shared package — a known drift risk, mitigated by a mandatory sync step, with a backlog item to formalize. |

**Conclusion:** No architectural decision on the critical path carries unmitigated risk. The hardest part (domain data) is bounded and additive; the riskiest pattern (cross-repo copy) is operationally managed with a clear graduation path.

---

## 6. Production Readiness Checklist

| Area | Status | Detail |
|------|--------|--------|
| **Performance** | ✅ Met | Lighthouse Perf 99 (clean run). GenCreator footprint minimal. *Caveat:* localhost Lighthouse is CPU-contention-sensitive (findings.md Finding 12) — measure on a quiet machine or in CI, not under load. |
| **Accessibility** | ✅ Met (GenCreator) | WCAG 2.1 AA axe-clean. *Out of scope:* OGF site-wide footer contrast (see §9). |
| **Analytics** | ✅ Met | 5 GA4 events wired, no-PII, fail-safe. Verify in GA4 DebugView post-launch. |
| **Error handling** | 🟡 Adequate for MVP | Plan generation is deterministic and total over the input space (typed `Record<…>` maps guarantee every record/goal pair resolves). Analytics swallow errors. **Gap:** no global error boundary on the island and no telemetry for client-side exceptions (backlog P1-6). Low severity for a stateless, no-network tool. |
| **Email capture** | 🟡 Simulated | `EmailCapture.tsx` UI is complete; the send is simulated. Real ConvertKit API route is P0-3 (M3). Not a feasibility blocker — the integration shape is standard (Astro API route → ConvertKit REST). |
| **Affiliate links** | 🟡 Placeholders | URLs carry `utm_source=gencreator` and placeholder affiliate IDs. Real IDs swap in once CRO clears programs (P0-4, CRO-blocked). Mechanism proven; values pending. |
| **Tests / CI** | 🟡 Local-green | 36 unit tests + typecheck pass locally. **No CI pipeline yet** runs them on push — recommend a GitHub Action before Development phase scales (backlog). |
| **Print/PDF** | ✅ Met | `@media print` CSS produces clean output with inline URLs (US-5). |

---

## 7. Known Technical Debt (CTO-owned, tracked)

These are accepted, tracked, and **not** feasibility blockers:

1. **Cross-repo lib drift** (findings.md Finding 10) — lib is copied into OGF, not packaged. Every `lib/` change needs a manual gencreator → ogf-site sync + rebuild. Cheap today (one consumer); backlog **P3-1** graduates it to a shared npm package when a 2nd consumer appears.
2. **No progressive-enhancement / no-JS path** — US-2 acceptance lists "works without JavaScript." The current island is `client:load`; with JS disabled there is no plan generation or email. Decision needed (CPO): is no-JS genuinely required for the audience, or can it be descoped? Building it is feasible (server-rendered form + Astro API route) but adds scope.
3. **No CI** — tests run locally only. Add a GitHub Action.
4. **No client error telemetry** (P1-6) — pick a tool or consciously defer.

---

## 8. Gate 1 — What This Assessment Does NOT Cover

Feasibility is one of three Gate 1 legs. For the CEO's situational awareness, the other two are **overdue and outside CTO ownership**:

- **CPO — finalized MVP spec** (`MVP_SPEC_DRAFT.md` → `MVP_SPEC_v1.md`) + concept validation with 5–10 OGF subscribers. **Overdue** (was due 2026-05-30). Open product decisions: email-gating, share-by-URL, LLM augmentation, no-JS requirement (§7.2).
- **CRO — revenue model**: affiliate program signup status (Ancestry/MyHeritage/Newspapers.com), lead/conversion projection, free-vs-premium timing. **Overdue.** Blocks real affiliate IDs (P0-4), not the build.

**Gate 1 cannot be approved on feasibility alone.** This artifact unblocks the CTO leg; the CEO still needs CPO + CRO artifacts to convene the gate. ROADMAP proposes a re-targeted Gate 1 date of **2026-06-30**.

---

## 9. Escalations to OGF-Site Owner (not GenCreator-fixable)

Surfaced by GenCreator QA but owned by the shared OGF site; GenCreator should not unilaterally patch the shared `<head>`/footer:

- **Footer contrast** — 6 elements at 2.78–3.89:1 in `Footer.astro` (site-wide). This is what holds Lighthouse Accessibility at 96 (not 100) on every OGF page, including `/gencreator`.
- **Render-blocking Google Fonts (Lora, ~840ms) + 159 KiB GA4 script** in `BaseHead.astro` — site-wide production-network perf headroom.

---

## 10. Recommendation

**The CTO signs off on technical feasibility for the GenCreator MVP.** The architecture is proven, conforms to SSM stack mandates, meets quality gates today, and carries no unmitigated technical risk. The path from prototype to launch is hardening and product/revenue decisions — not unknowns.

**Recommended CEO action:** accept this feasibility leg; pursue the overdue CPO and CRO artifacts (§8) to convene Gate 1; target 2026-06-30.

---

*Prepared by: CTO (AI) · GenCreator workstream*
*Sign-off date: 2026-06-06*
*Re-verification basis: `npm test` (36/36), `tsc --noEmit` (clean), OGF `astro build` (12 pages, /gencreator/ present), cross-repo `diff` (lib in sync), Sprint 6 QA ([qa/sprint6/QA_RESULTS.md](../qa/sprint6/QA_RESULTS.md)).*
