# Current Sprint — MVP Hardening

> **Sprint #:** 5 (first formally-named sprint; sessions 1–4 were scaffold/build)
> **Window:** 2026-04-22 → 2026-04-30 (≈1 week)
> **Sprint goal:** Close the M1 Feasibility Prototype exit criteria so CTO can sign feasibility into the Gate 1 packet.
> **Last updated:** 2026-04-22

---

## Sprint Goal (one sentence)

**Ship a `/gencreator` page on OGF that passes visual QA, GA4, Lighthouse 90+, and WCAG 2.1 AA — so the CTO feasibility sign-off for Gate 1 is unblocked.**

---

## In Scope This Sprint

Pulled from [BACKLOG.md](BACKLOG.md) P0 items that the CTO can close without external dependencies.

### Must land
- [ ] **[P0-1]** Visual QA — `npm run dev` in OGF site, walk full flow, capture screenshots at 375/768/1280
- [ ] **[P0-2]** GA4 custom events wired in OGF `BaseHead.astro` / GenCreator components:
  - `gencreator_plan_generated` (ancestor name hash, goal, step count)
  - `gencreator_email_captured`
  - `gencreator_affiliate_click` (database name, record type)
  - `gencreator_mission_click`
  - `gencreator_print`
- [ ] **[P0-5]** Lighthouse ≥ 90 on Performance, Accessibility, Best Practices, SEO
- [ ] **[P0-6]** WCAG 2.1 AA quick audit — keyboard nav, focus states, contrast, labels, ARIA
- [ ] **[P0-10]** `buildRationale()` — goal-specific prose (remove stubs)
- [ ] **[P0-11]** `buildTips()` — record-specific tips (remove stubs)

### Stretch
- [ ] **[P0-3]** ConvertKit API integration (if API key is pulled from the vault this sprint)
- [ ] **[P1-6]** Error telemetry decision — pick tool, defer wire-up if not trivial

### Explicitly NOT in this sprint
- P0-4 (real affiliate IDs) — blocked on CRO signup status
- P0-7 / P0-8 / P0-9 (CPO & CRO Gate 1 artifacts) — not CTO work
- All P1/P2/P3 items

---

## Daily / Session Log

| Date | Owner | What changed | Next |
|------|-------|--------------|------|
| 2026-04-22 | CTO (this session) | Consolidated planning: created ROADMAP.md, BACKLOG.md, SPRINT.md. Updated task_plan.md structure. | Visual QA + GA4 events |

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
| ConvertKit API key not found / account issue | M | Low (stretch only) | Leave EmailCapture.tsx simulated; log as P0-3 still open |
| Lighthouse flunks on CLS or LCP | L | M | Preact island is small; if it flunks, investigate font loading and CSS var fallbacks |
| A11y gaps found late | M | M | Run axe-core early, not end of sprint |
| Scope creep from knowledge base enrichment | H | M | Hard cap: rationales + tips only this sprint, not new record types |

---

## Next Sprint Preview (Sprint 6)

Tentative scope — confirm in sprint planning:
- CPO concept validation sessions (if CPO is ready)
- ConvertKit if it slipped
- Real affiliate ID swap (if CRO cleared programs)
- Copy polish pass (P1-8)
- E2E Playwright spike (P3-3) — probably defer

Sprint 6 may pivot to support Gate 1 packet assembly if CPO/CRO artifacts land.

---

*Sprint maintained by CTO. Review end-of-sprint, update task_plan.md + progress.md, commit.*
