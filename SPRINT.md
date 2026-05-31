# Current Sprint — MVP Hardening (re-baselined)

> **Sprint #:** 6 (re-baseline of the lapsed Sprint 5 — same scope, fresh window)
> **Window:** 2026-05-31 → 2026-06-12 (provisional ~2 wk; confirm cadence with Greg)
> **Sprint goal:** Close the M1 Feasibility Prototype exit criteria so CTO can sign feasibility into the Gate 1 packet.
> **Last updated:** 2026-05-31

> ⚠️ **Sprint 5 (2026-04-22 → 04-30) lapsed** — closed unexecuted: 0 of 7 must-land items done, 0 commits in window. Full scope carried into Sprint 6 unchanged. See [progress.md](progress.md) Session 6.

---

## Sprint Goal (one sentence)

**Ship a `/gencreator` page on OGF that passes visual QA, GA4, Lighthouse 90+, and WCAG 2.1 AA — so the CTO feasibility sign-off for Gate 1 is unblocked.**

---

## In Scope This Sprint

Pulled from [BACKLOG.md](BACKLOG.md) P0 items the CTO can close without external dependencies. Ordered by execution sequence — baseline check first, then the unblocked pure-code work, then the audit/instrumentation items.

### Must land
- [x] **[P0-0]** Baseline smoke check — `npm test` (expect 25 green) in `C:\Dev\gencreator` + `astro build` green in `C:\Dev\ogf-site`. Confirms nothing rotted in the 39-day gap before building on it.
- [x] **[P0-10]** `buildRationale()` — goal-specific prose (stub removed; goal-aware + high-value overrides, +tests)
- [x] **[P0-11]** `buildTips()` — record-specific tips (stub removed; per-record + time-sensitive, +tests)
- [ ] **[P0-1]** Visual QA — `npm run dev` in OGF site, walk full flow, capture screenshots at 375/768/1280
- [x] **[P0-2]** GA4 custom events wired (via `lib/analytics.ts` → global gtag already in `BaseHead.astro`):
  - `gencreator_plan_generated` (ancestor name hash, goal, step count)
  - `gencreator_email_captured`
  - `gencreator_affiliate_click` (database name, record type)
  - `gencreator_mission_click`
  - `gencreator_print`
- [ ] **[P0-5]** Lighthouse ≥ 90 on Performance, Accessibility, Best Practices, SEO
- [ ] **[P0-6]** WCAG 2.1 AA quick audit — keyboard nav, focus states, contrast, labels, ARIA

### Stretch
- [ ] **[P0-3]** ConvertKit API integration (if API key is pulled from the vault this sprint)
- [ ] **[P1-6]** Error telemetry decision — pick tool, defer wire-up if not trivial

### Explicitly NOT in this sprint
- P0-4 (real affiliate IDs) — blocked on CRO signup status
- P0-7 / P0-8 / P0-9 (CPO & CRO Gate 1 artifacts) — not CTO work; **now overdue** (see ROADMAP M2 slip)
- All P1/P2/P3 items

---

## Daily / Session Log

| Date | Owner | What changed | Next |
|------|-------|--------------|------|
| 2026-04-22 | CTO | Consolidated planning: created ROADMAP.md, BACKLOG.md, SPRINT.md. Updated task_plan.md structure. | Visual QA + GA4 events |
| 2026-04-23 → 05-30 | — | **(no activity — Sprint 5 lapsed, 0 commits)** | — |
| 2026-05-31 | CTO | Re-baseline: closed lapsed Sprint 5, opened Sprint 6 (same scope, P0-0 smoke check added), slipped ROADMAP M1/M2/M3 targets, updated task_plan + progress. | P0-0 smoke check → P0-10/P0-11 |
| 2026-05-31 | CTO | Sprint 6 P0-0 **PASSED** — gencreator 25/25 tests + typecheck clean; OGF `astro build` green (11 pages, /gencreator/ present). | P0-10 / P0-11 enrichment |
| 2026-05-31 | CTO | **P0-10 + P0-11 done** — enriched `buildRationale()` (goal-aware + overrides) & `buildTips()` (record + time-specific); +5 tests (**30 green**), typecheck clean; synced `planner.ts` → OGF + rebuilt green. | P0-2 GA4; then P0-1/P0-5/P0-6 (browser tooling) |
| 2026-05-31 | CTO | **P0-2 done** — 5 GA4 events via new `lib/analytics.ts` (`track()` + `hashName()`, no-PII); wired into GenCreator/ResearchPlan/ResearchStep/EmailCapture; +6 tests (**36 green**); synced to OGF (6 components byte-identical mod paths) + rebuilt green. | P0-1 / P0-5 / P0-6 (need dev server + browser/Lighthouse/axe) |

*Append rows as each session closes. Keep it terse.*

---

## Definition of Done (sprint-level)

1. All "Must land" items checked.
2. `/gencreator` page on OGF passes Lighthouse ≥ 90 on all four categories (recorded in progress.md).
3. GA4 events firing (verified via GA4 DebugView or browser devtools).
4. 25 unit tests still pass in `C:\Dev\gencreator`.
5. OGF build still green (`astro build`).
6. Task_plan.md + progress.md updated.
7. Git committed in both repos with clear messages.

---

## Risks This Sprint

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| 39-day gap left dependencies/build broken | M | M | P0-0 smoke check **first** — don't build on an unverified baseline |
| Schedule keeps slipping (Sprint 5 already lapsed) | M | H | Provisional 2-wk window; if cadence is uncertain, scope down to P0-0 + P0-10 + P0-11 (pure-code, no deps) as the minimum viable session |
| ConvertKit API key not found / account issue | M | Low (stretch only) | Leave EmailCapture.tsx simulated; log as P0-3 still open |
| Lighthouse flunks on CLS or LCP | L | M | Preact island is small; if it flunks, investigate font loading and CSS var fallbacks |
| A11y gaps found late | M | M | Run axe-core early, not end of sprint |
| Scope creep from knowledge base enrichment | H | M | Hard cap: rationales + tips only this sprint, not new record types |

---

## Next Sprint Preview (Sprint 7)

Tentative scope — confirm in sprint planning:
- CPO concept validation sessions (if CPO is ready) — **overdue Gate 1 blocker**
- ConvertKit if it slipped
- Real affiliate ID swap (if CRO cleared programs)
- Copy polish pass (P1-8)
- E2E Playwright spike (P3-3) — probably defer

Sprint 7 may pivot to support Gate 1 packet assembly if CPO/CRO artifacts land.

---

*Sprint maintained by CTO. Review end-of-sprint, update task_plan.md + progress.md, commit.*
