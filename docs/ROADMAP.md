# GenCreator Roadmap

> **Owner:** CTO (technical) / CPO (product) / CEO (gate approvals)
> **Last updated:** 2026-07-21
> **Governance:** See [GOVERNANCE.md](GOVERNANCE.md) for gate approvers and escalation paths.

---

## Milestone Overview

| Milestone | Gate | Approver | Target | Status |
|-----------|------|----------|--------|--------|
| M1 — Feasibility Prototype | Internal | CTO | ~~2026-04-30~~ → 2026-06-03 | 🟢 **Complete** — all exit criteria met (Sprint 6 closed 2026-06-03); CTO feasibility signed off 2026-06-06; live `/gencreator/` page verified on operationgrannyfiles.com 2026-06-27 |
| M2 — MVP Spec Finalized + Gate 1 | Gate 1 (Validation→Dev) | SSM CEO / Chairman waiver | ~~2026-05-30~~ → ~~2026-06-21~~ → 2026-06-27 | 🟢 **Advanced by Chairman waiver (Option B)**. Validation B1=0, but Greg selected Option B on 2026-06-27 to waive behavioral validation and proceed. |
| M3 — MVP Hardening + Beta | Internal | CTO + CPO | ~~2026-06-30~~ → ~~2026-07-31~~ → 2026-08-04 | 🟡 Sprint 8 active: launch-readiness evidence, Kit operational proof, and beta feedback. CI, live `/research-planner` alias, and Kit capture implementation are done; CJ is prepared but blocked on affiliate details. |
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
- [x] Integrated into OGF site — `/gencreator` page live in build and verified publicly
- [x] Public deployment verified — `https://www.operationgrannyfiles.com/gencreator/` returns 200 and contains the planner/island (2026-06-27)
- [x] Visual QA complete (dev server, responsive check at 375/768/1280)
- [x] GA4 custom events wired (5 events — see [SPRINT.md](../SPRINT.md))
- [x] Lighthouse ≥ 90 across all categories (clean run 99/96/96/100)
- [x] WCAG 2.1 AA pass (GenCreator UI axe-clean)

**Deliverable:** A working `/gencreator` page that a beta tester can click through, even if ConvertKit and final copy are stubs.

---

## M2 — MVP Spec Finalized + Gate 1 (advanced by waiver → 2026-06-27)

**Goal:** Lock the MVP product definition. Get CEO authorization to leave Conception phase.

> **Gate history:** Path 1 validation closed with B1=0 completed sessions. CEO/CPO recommended Option A extension. Greg selected **Option B** on 2026-06-27, waiving behavioral validation and authorizing Development to proceed on Chairman confidence.

**CPO deliverables:** ✅ spec DONE (v1, scope locked); ⚪ behavioral validation waived by Chairman
- [x] Finalize MVP spec → `CPO_GenCreator_MVP_Spec_v1_2026-06-02.md` (DRAFT resolved; open questions dispositioned §10)
- [x] Validate concept with 5-10 OGF subscribers — **waived** by Greg Option B after B1=0
- [x] Email-gated results? → **optional capture AFTER plan renders** (value-first; Kit tag on opt-in)
- [x] Share-plan-by-URL? → out of MVP (non-goal; V2+)
- [x] LLM augmentation? → **static only** for MVP (rules-based, no-LLM)

**CRO deliverables:**
- Finalized affiliate program status (Ancestry, MyHeritage, Newspapers.com signup or deferral)
- Revenue projection: leads/month × conversion × affiliate value
- Monetization plan (free MVP vs. premium tier timing)

**CTO deliverables:** ✅ **DONE** (2026-06-06) — see [CTO_FEASIBILITY_ASSESSMENT.md](CTO_FEASIBILITY_ASSESSMENT.md)
- [x] Feasibility confirmed (M1 exit = CTO sign-off on feasibility)
- [x] Production readiness checklist (perf, a11y, error handling, analytics) — in the assessment §6

**Gate 1 approval:** advanced by Chairman waiver. Record the accepted risk: no behavioral validation evidence exists.

### Waiver Record (2026-06-27)

1. Validation capture file exists but logged 0 sessions.
2. CEO/CPO recommended Option A extension.
3. Greg selected Option B: waive validation and proceed.
4. Development may begin, but MVP scope remains locked.
5. Beta/post-launch feedback must carry the plan-quality risk that validation would have reduced.

---

## M3 — MVP Hardening + Beta (re-target → 2026-07-31, proposed)

**Goal:** Ship-quality MVP with real affiliate links, real email capture, real analytics, validated with beta users.

**Sprint 7 completed scope:**
- P0-3 Kit integration: capture implemented with dedicated Kit form `9616629`; exact generated-plan email delivery deferred/automation-dependent.
- Route alias: OGF PR #3 is deployed; `/research-planner/` and `/gencreator/` both return 200 and the live sitemap includes both.
- P0-4 affiliate builder: CJ deep-link strategy prepared, activation waits on CRO approvals/ad IDs.
- CI: OGF host already has a build-only GitHub Action on `master`; GenCreator source CI now runs `npm test` and `npm run typecheck` on Node 24.

**Sprint 8 focus:**
- Kit operational proof: confirm tag `gencreator-plan-generated` and run one live seed signup after Greg confirms test email.
- Acceptance proof: Greg selected the fixed three-scenario Chairman walkthrough as the pre-Gate-2 substitute for external beta; external-user feedback moves to post-launch monitoring.
- Launch-readiness evidence: maintain `docs/LAUNCH_READINESS_CHECKLIST.md` for route, sitemap, planner flow, print/save, analytics, affiliate disclosure, and approval status.
- Validation fixes: apply only clear beta-identified P0/P1 issues inside locked MVP scope.

**Scope:**
- Affiliate links: **CJ deep-link builder** (Ancestry/MyHeritage/FindMyPast via Commission Junction, PID 7928154) + keep Amazon `tag` model — NOT a simple ID swap (CRO model; findings.md Finding 14). Gated on CRO approvals (overdue). Telemetry prereq (CD-2026-006) likely already met by GA4 `gencreator_affiliate_click`.
- Kit (ConvertKit) capture integration — wired to form `9616629`; confirm form/automation applies `gencreator-plan-generated`
- Route rename → `/research-planner` (alias `/gencreator`)
- Knowledge base enrichment: goal-specific rationales, record-specific tips; Mountain-West depth (validation refinement list)
- Error states + empty states polished
- Content audit: tone, copy (light Granny voice), FTC disclosure vs. CRO framework (CPO/CRO review)
- Chairman walkthrough across sparse-beginner, existing-research, and immigration scenarios; only P0/P1 fixes enter M3

> **Paid tier ("GenCreator Plus", $19.99/mo) is NOT in M3.** Deferred to the Q3 paid-tier corridor (CD-2026-016), gated on the standalone decision + Chairman pricing approval. MVP/beta launches **affiliate-only**.

**Exit criteria:** No unresolved P0/P1 issues. Every Chairman walkthrough scenario scores at least 4/5. Kit and GA4 production proof are recorded.

---

## M4 — Launch on OGF (Gate 2 — Q3 2026)

**Goal:** Public launch as the OGF lead magnet.

**Launch prep (CPO + CRO):**
- Launch blog post on OGF
- Social announcement (Substack, any social channels)
- Email to existing OGF list
- Direct-link click tracking confirmed working; CJ monetization may activate later
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
