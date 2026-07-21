# GenCreator Backlog

> **Purpose:** Prioritized list of work not yet committed to a sprint. Anything scope-creepy or "nice-to-have" lives here, not in SPRINT.md.
> **Last updated:** 2026-07-21
> **Sizing:** XS (<1hr) · S (1–4hr) · M (half-day to day) · L (multi-day) · XL (week+)

**Rules:**
1. New ideas go HERE first, not into SPRINT.md. CPO/CTO decide what pulls into the next sprint.
2. Feature creep is the #1 CPO-flagged risk. Default answer to a new idea is "backlog it."
3. Items marked 🔒 require role/gate approval before they can be pulled.

---

## P0 — Blocks MVP Ship (must clear before Gate 2)

| ID | Title | Size | Owner | Notes |
|----|-------|------|-------|-------|
| P0-1 | Visual QA on `/gencreator` (desktop + mobile + print) | S | CTO | ✅ **DONE** — Sprint 6 QA pass, see `qa/sprint6/QA_RESULTS.md` |
| P0-2 | GA4 custom events (5 events — see SPRINT.md) | S | CTO | ✅ **DONE** — expanded to 6 events including `gencreator_form_started` |
| P0-3 | Kit (ConvertKit) capture integration | M | CTO+CRO | ✅ Implemented with dedicated Kit form `9616629`; captures/subscribes after plan generation. Exact generated-plan email remains deferred/automation-dependent |
| P0-4 | Real affiliate links — **CJ deep-link builder** (not just an ID swap) | M | CTO+CRO | 🟡 Strategy complete in `docs/AFFILIATE_LINK_STRATEGY.md`; activation blocked on CRO approvals/ad IDs. Ancestry/MyHeritage/FindMyPast via Commission Junction (PID 7928154) need redirect URLs |
| P0-5 | Lighthouse ≥ 90 across all categories | S | CTO | ✅ **DONE** — clean run 99/96/96/100 |
| P0-6 | WCAG 2.1 AA audit + fixes | M | CTO | ✅ **DONE** — GenCreator UI axe-clean; OGF footer contrast remains OGF-owned |
| P0-7 | MVP spec finalized | M | CPO | ✅ **DONE** — CPO_GenCreator_MVP_Spec_v1_2026-06-02 (Finding 13) |
| P0-8 | Revenue model doc | M | CRO | ✅ **DONE** — GenCreator_Revenue_Model_2026-06-06 (Finding 14) |
| P0-9 | Concept validation with 5–10 OGF subscribers | M | CPO/Greg | ⚪ **WAIVED FOR GATE 1** — B1=0, but Greg selected Option B on 2026-06-27. Keep beta/post-launch feedback as risk mitigation. |
| P0-10 | Enrich `buildRationale()` — goal-specific prose | S | CTO | ✅ **DONE** — enriched and tested |
| P0-11 | Enrich `buildTips()` — record-specific tips | S | CTO | ✅ **DONE** — enriched and tested |
| P0-12 | `/research-planner` route alias/redirect | S | CTO+CPO | ✅ Implemented and deployed in OGF PR #3; live checks on 2026-06-27 returned 200 for `/research-planner/` and `/gencreator/`, and `sitemap-0.xml` includes both. |
| P0-13 | Kit operational proof | S | CTO+CRO/Greg | 🔄 Pulled into Sprint 8 — confirm tag `gencreator-plan-generated` on form `9616629`, then run one live seed signup after Greg confirms the test email |
| P0-14 | Beta feedback proof after waiver | M | CPO/Greg | 🔄 Pulled into Sprint 8 — collect 5-10 lightweight responses or record Chairman-approved equivalent before Gate 2 |

## P1 — High Value, Post-MVP

| ID | Title | Size | Notes |
|----|-------|------|-------|
| P1-1 | Share plan by URL (query-string-encoded state) | M | Decision pending — CPO to confirm for MVP or defer |
| P1-2 | State-level US record availability | L | Currently country-level only |
| P1-3 | "Email me" also auto-subscribes to OGF list | S | Requires disclosure copy |
| P1-4 | PDF export as server-generated (vs. browser print) | M | Nicer output but adds infra |
| P1-5 | Plan quality feedback widget (1-5 stars + comment) | S | Feeds knowledge base improvement |
| P1-6 | Error telemetry (Sentry or equivalent) | S | Production readiness |
| P1-7 | Rate limiting on email endpoint | S | Abuse prevention |
| P1-8 | Copy polish pass (CPO) | S | Tone, CTAs, disclaimers |
| P1-9 | Launch-readiness checklist / go-live packet | S | 🔄 Pulled into Sprint 8 — `docs/LAUNCH_READINESS_CHECKLIST.md` gathers route, Kit, affiliate, QA, beta, copy, and owner sign-offs before Gate 2 |

## P2 — Feature Expansion

| ID | Title | Size | Notes |
|----|-------|------|-------|
| P2-1 | UK knowledge base (records 1837–1950) | XL | High value for OGF audience |
| P2-2 | Canada knowledge base | L | |
| P2-3 | Multi-ancestor planning (family unit) | XL | Significant data model change |
| P2-4 | LLM-augmented rationale prose | L | Anthropic SDK call; needs prompt caching design |
| P2-5 | "I don't know" fields that infer from context | M | E.g., no dates → use broad template |
| P2-6 | Printable research workbook (multi-page PDF) | M | Beyond current single-page print |
| P2-7 | Saved plans (account + history) | XL | Out of MVP scope per spec |
| P2-8 | GEDCOM import to pre-fill form | L | Out of MVP scope per spec |

## P3 — Infrastructure / Tech Debt

| ID | Title | Size | Notes |
|----|-------|------|-------|
| P3-1 | Pull GenCreator lib/ into shared npm package | M | When a 2nd consumer exists |
| P3-2 | Knowledge base content pipeline (Markdown → JSON) | M | If editors without dev skills maintain data |
| P3-3 | E2E tests (Playwright) against deployed preview | M | Currently only unit tests |
| P3-4 | Visual regression tests (Percy or equiv.) | M | |
| P3-5 | Knowledge base integrity CI check | S | Validate JSON schema + ID refs |
| P3-6 | GenCreator standalone CI | S | ✅ **DONE** — `.github/workflows/gencreator-check.yml` runs Node 24, `npm test`, and `npm run typecheck` |

## P4 — Strategic / Post-Gate-3 (Standalone Evaluation)

| ID | Title | Size | Notes |
|----|-------|------|-------|
| P4-1 | Standalone app migration (own Vercel deployment) | XL | 🔒 Only if M5 green-lights standalone |
| P4-2 | Premium tier (saved plans, advanced features) | XL | 🔒 CRO + CPO + Chairman |
| P4-3 | Dedicated domain / brand | M | 🔒 |
| P4-4 | Mobile app (React Native / Capacitor) | XL | 🔒 Only with demonstrated standalone demand |

---

## Rejected / Out of Scope (keep the "no" list explicit)

- **User accounts in MVP** — Rejected. MVP spec explicit.
- **LLM narrative generation in MVP** — Rejected. Static JSON knowledge base is MVP. LLM augmentation is P2.
- **Family tree visualization** — Rejected for MVP. Not the product's job.
- **Reading records from Ancestry/FamilySearch APIs** — Rejected. GenCreator is "where to look," not "what it says."

---

*Grooming cadence: CPO + CTO review before each sprint. Remove shipped items. Re-sort priorities.*
