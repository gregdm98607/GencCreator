# GenCreator Backlog

> **Purpose:** Prioritized list of work not yet committed to a sprint. Anything scope-creepy or "nice-to-have" lives here, not in SPRINT.md.
> **Last updated:** 2026-04-22
> **Sizing:** XS (<1hr) · S (1–4hr) · M (half-day to day) · L (multi-day) · XL (week+)

**Rules:**
1. New ideas go HERE first, not into SPRINT.md. CPO/CTO decide what pulls into the next sprint.
2. Feature creep is the #1 CPO-flagged risk. Default answer to a new idea is "backlog it."
3. Items marked 🔒 require role/gate approval before they can be pulled.

---

## P0 — Blocks MVP Ship (must clear before Gate 2)

| ID | Title | Size | Owner | Notes |
|----|-------|------|-------|-------|
| P0-1 | Visual QA on `/gencreator` (desktop + mobile + print) | S | CTO | Pulled into current sprint |
| P0-2 | GA4 custom events (5 events — see SPRINT.md) | S | CTO | Pulled into current sprint |
| P0-3 | ConvertKit API integration (real email send) | M | CTO | Depends on API key from vault |
| P0-4 | Swap placeholder affiliate IDs → real ones | S | CRO | 🔒 Blocked on affiliate program signups |
| P0-5 | Lighthouse ≥ 90 across all categories | S | CTO | After P0-1 |
| P0-6 | WCAG 2.1 AA audit + fixes | M | CTO | Target-audience skew 35–70 makes this load-bearing |
| P0-7 | MVP_SPEC_DRAFT.md → MVP_SPEC_v1.md (finalized) | M | CPO | 🔒 Due 2026-05-30, Gate 1 blocker |
| P0-8 | Revenue model doc | M | CRO | 🔒 Gate 1 blocker |
| P0-9 | Concept validation with 5–10 OGF subscribers | M | CPO | 🔒 Gate 1 blocker |
| P0-10 | Enrich `buildRationale()` — goal-specific prose | S | CTO | Currently stubbed |
| P0-11 | Enrich `buildTips()` — record-specific tips | S | CTO | Currently stubbed |

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
