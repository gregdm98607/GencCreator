# GenCreator Roadmap

> **Owner:** CTO (technical) / CPO (product) / CEO (gate approvals)
> **Last updated:** 2026-05-31
> **Governance:** See [GOVERNANCE.md](GOVERNANCE.md) for gate approvers and escalation paths.

---

## Milestone Overview

| Milestone | Gate | Approver | Target | Status |
|-----------|------|----------|--------|--------|
| M1 — Feasibility Prototype | Internal | CTO | ~~2026-04-30~~ → 2026-06-03 | 🟢 **Complete** — all exit criteria met (Sprint 6 closed 2026-06-03); CTO feasibility signed off 2026-06-06 |
| M2 — MVP Spec Finalized + Gate 1 | Gate 1 (Validation→Dev) | SSM CEO | ~~2026-05-30~~ → 2026-06-30 (proposed) | 🟡 CTO leg done ([CTO_FEASIBILITY_ASSESSMENT.md](CTO_FEASIBILITY_ASSESSMENT.md), 2026-06-06); **CPO + CRO artifacts overdue** |
| M3 — MVP Hardening + Beta | Internal | CTO + CPO | ~~2026-06-30~~ → 2026-07-31 (proposed) | ⬜ Not started (gated on M1 + M2) |
| M4 — Launch on OGF | Gate 2 (Dev→Launch) | Chairman (Greg) | Q3 2026 | ⬜ Not started |
| M5 — 90-Day Evaluation | Gate 3 (Post-launch) | Chairman | Q4 2026 | ⬜ Not started |

> **🔄 Schedule re-baseline (2026-05-31):** Sprint 5 lapsed with no activity for 39 days; the M1 polish and M2/Gate 1 deadlines (2026-05-30) passed unmet. Targets above are reset to reflect a realistic restart from today. **CTO-owned dates** (M1, Sprint 6) are committed; **product/gate-owned dates** (M2, M3) are *proposed* pending CPO/CEO/CRO confirmation. M4/M5 (Q3/Q4 2026) are unchanged but now carry compression risk. See [SPRINT.md](../SPRINT.md) + progress.md Session 6.

---

## M1 — Feasibility Prototype (re-targeted → 2026-06-12)

**Goal:** Prove the end-to-end concept is buildable within SSM stack constraints. De-risk architecture before CPO finalizes the spec.

**Exit criteria:**
- [x] Preact island scaffolded with Vitest (25 tests passing)
- [x] Knowledge base JSONs populated (record availability, strategies, databases, OGF missions)
- [x] Plan generation algorithm implemented and unit-tested
- [x] Full UI component tree built against OGF's "Archival Warmth" design system
- [x] Integrated into OGF site — `/gencreator` page live in build
- [x] Visual QA complete (dev server, responsive check at 375/768/1280)
- [x] GA4 custom events wired (5 events — see [SPRINT.md](../SPRINT.md))
- [x] Lighthouse ≥ 90 across all categories (clean run 99/96/96/100)
- [x] WCAG 2.1 AA pass (GenCreator UI axe-clean)

**Deliverable:** A working `/gencreator` page that a beta tester can click through, even if ConvertKit and final copy are stubs.

---

## M2 — MVP Spec Finalized + Gate 1 (slipped; re-target → 2026-06-30, proposed)

**Goal:** Lock the MVP product definition. Get CEO authorization to leave Conception phase.

**CPO deliverables:**
- Finalize `MVP_SPEC_DRAFT.md` → `MVP_SPEC_v1.md` (remove DRAFT, resolve open questions)
- Validate concept with 5-10 OGF subscribers (user research: do they "get it"?)
- Decide: email-gated results? (currently: show freely — per Greg 2026-04-09)
- Decide: share-plan-by-URL feature in MVP or backlog?
- Decide: LLM augmentation in MVP (knowledge base + LLM polish) or static only?

**CRO deliverables:**
- Finalized affiliate program status (Ancestry, MyHeritage, Newspapers.com signup or deferral)
- Revenue projection: leads/month × conversion × affiliate value
- Monetization plan (free MVP vs. premium tier timing)

**CTO deliverables:** ✅ **DONE** (2026-06-06) — see [CTO_FEASIBILITY_ASSESSMENT.md](CTO_FEASIBILITY_ASSESSMENT.md)
- [x] Feasibility confirmed (M1 exit = CTO sign-off on feasibility)
- [x] Production readiness checklist (perf, a11y, error handling, analytics) — in the assessment §6

**Gate 1 approval (SSM CEO):** all three deliverables reviewed → authorizes Development phase.

---

## M3 — MVP Hardening + Beta (re-target → 2026-07-31, proposed)

**Goal:** Ship-quality MVP with real affiliate links, real email capture, real analytics, validated with beta users.

**Scope:**
- Swap placeholder affiliate IDs for real ones (CRO-approved programs)
- ConvertKit API integration (real email capture, not simulated)
- Knowledge base enrichment: goal-specific rationales, record-specific tips
- Error states + empty states polished
- Content audit: tone, copy, disclaimers (CPO review)
- 5-10 beta testers from OGF list, feedback loop, 2 iterations

**Exit criteria:** No P0/P1 bugs from beta. Plan quality rated 4+/5 average by beta testers.

---

## M4 — Launch on OGF (Gate 2 — Q3 2026)

**Goal:** Public launch as the OGF lead magnet.

**Launch prep (CPO + CRO):**
- Launch blog post on OGF
- Social announcement (Substack, any social channels)
- Email to existing OGF list
- Affiliate tracking dashboard confirmed working
- Conversion metrics baseline captured day 1

**Gate 2 approval (Chairman):** Working MVP + beta results + launch plan + revenue projections reviewed → go/no-go.

**Success metrics (first 30 days):**
- N plans generated (baseline TBD)
- % → email captured
- % → affiliate link click
- Average plan quality rating

---

## M5 — 90-Day Evaluation (Gate 3 — Q4 2026)

**Goal:** Decide whether GenCreator earns standalone-product status or stays an OGF feature.

**Data for review:**
- 90-day usage (plans generated, unique users, retention)
- 90-day revenue (affiliate commissions, lead-list growth value)
- Cost to maintain (CTO time, CPO time, ops)
- Standalone business case (separate domain? brand? pricing tier?)

**Gate 3 decision options:**
1. **Keep embedded** — stay an OGF feature, expand knowledge base
2. **Graduate** — spin out to standalone Astro app, own domain, premium tier
3. **Sunset** — evidence doesn't support continued investment

---

## Post-Launch Backlog Themes

See [BACKLOG.md](../BACKLOG.md) for specific items. High-level themes:

- **Knowledge base expansion** — UK, Canada, Germany; state-level US granularity
- **Multi-ancestor planning** — family unit, not single person
- **LLM augmentation** — personalized rationale prose
- **Saved plans** — accounts, user history
- **GEDCOM import** — pre-fill form from existing tree
- **Mobile app** (post-M5 only, if M5 green-lights standalone)

---

*Roadmap maintained by CTO. Updated at each milestone boundary and at any gate approval.*
