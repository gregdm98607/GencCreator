# GenCreator Launch Readiness Checklist

> **Status:** Started for Sprint 8
> **Last updated:** 2026-07-22
> **Purpose:** Gather Gate 2 evidence for the OGF-embedded MVP launch candidate.

## Gate 2 Posture

GenCreator is deployed as an OGF-embedded MVP. Gate 1 advanced by Chairman waiver, so Gate 2 needs extra care around plan-quality evidence and live funnel proof.

Current recommendation: **not yet Gate 2-ready** until Kit operational proof and beta feedback are recorded.

## Evidence Checklist

| Area | Required evidence | Status | Notes |
|---|---|---|---|
| Route availability | `/research-planner/` and `/gencreator/` return 200 on production | Verified 2026-07-21 | Both production routes returned 200 and contained planner text |
| Sitemap | Live sitemap includes both planner routes | Verified 2026-07-21 | `/sitemap-index.xml` returned 200; `sitemap-0.xml` lists both routes |
| Planner flow | User can enter known facts and generate a research plan | Verified 2026-07-22 | Both live routes generated a 10-step plan for “Eleanor May Carter,” born about 1882 in Salt Lake City, with the Find parents goal |
| Print/save | Print Plan control works on generated plan | Verified 2026-07-22 | Primary route control was visible, enabled, and executed without page error/navigation; alias exposed the same enabled control. OS print-dialog completion remains a user/browser action |
| Kit form | Form `9616629` accepts a live seed signup | Pending Greg test email | Avoid duplicate junk records |
| Kit tag | Form/automation applies `gencreator-plan-generated` | Pending Kit admin confirmation | Launch blocker for segmented follow-up |
| Analytics | GA4 events fire for plan generation, email capture, affiliate click, mission click, print | Pending spot check | No PII in event payloads |
| Affiliate disclosure | FTC disclosure visible near outbound database links | Visible; sign-off pending | Disclosure rendered on the generated plan; exact review queue below. Monetized activation still blocked |
| Affiliate links | Free/direct links work; CJ monetized links remain blocked | Partially ready | Requires CRO approvals/ad IDs |
| Accessibility | GenCreator UI remains WCAG 2.1 AA clean | Previously passed; no UI change | Sprint 8 evidence update changed documentation only |
| Performance | Lighthouse remains 90+ target | Previously passed; no UI change | Re-run before Gate 2 if launch date is set |
| Beta feedback | 5-10 OGF users or Chairman-approved equivalent | Packet ready | See `docs/BETA_TEST_PACKET.md`; responses still pending |
| Gate approval | Greg approves Dev→Launch | Pending | Gate 2 authority is Chairman |

## Copy / FTC Review Queue

No copy change is proposed in this evidence pass. Before Gate 2, request sign-off on:

| Owner | Source | Review question |
|---|---|---|
| CPO | `src/components/AncestorForm.tsx:101-104` | Does “Tell Us What You Know” plus the prioritized-plan promise match the approved light Granny voice without overstating certainty? |
| CPO + CRO | `src/components/EmailCapture.tsx:71-75` and `:92` | “Email Me This Plan” / “Send My Plan” currently leads to list capture and follow-up help, not delivery of the exact generated plan. Confirm this label/promise is acceptable or approve clearer wording. |
| CRO | `src/components/EmailCapture.tsx:101-103` | Confirm the newsletter-subscription consent copy meets Kit/list policy and the intended funnel promise. |
| CRO | `src/components/ResearchPlan.tsx:69-74` | Confirm the on-page affiliate disclosure meets the CD-2026-006/FTC framework before monetized CJ links activate. |
| CPO | `src/components/ResearchPlan.tsx:77-82` | Confirm “Print / Save as PDF” accurately describes the browser print-dialog save path for the target audience. |

The corresponding OGF-hosted component lines contain the same user-facing text; only import paths differ.

## Source / Host Parity Evidence

Checked 2026-07-22 between `C:\Dev\gencreator` and `C:\Dev\ogf-site`:

- `planner.ts`, `types.ts`, `analytics.ts`, `utils/scoring.ts`, and `utils/affiliate.ts` are byte-identical.
- `gencreator.css` and all four knowledge JSON files are identical after normalizing CRLF/LF line endings.
- All six Preact component diffs are limited to the intentional OGF import rewrite from `../lib/...` to `../../lib/gencreator/...`.
- OGF retains the host-only shared `GenCreatorPage.astro` wrapper and the two route pages.

## Beta Packet Draft

The send-ready beta packet lives in `docs/BETA_TEST_PACKET.md`.

## Current Blockers

1. Kit tag `gencreator-plan-generated` is not yet confirmed.
2. Live Kit seed signup has not been run.
3. Beta/user feedback has not been collected after the Gate 1 validation waiver.
4. CJ affiliate activation is blocked on CRO approvals and advertiser/ad/link IDs.

## Scope Guardrail

Gate 2 readiness is about proving the MVP already built. Do not add paid tier, accounts, saved plans, LLM augmentation, GEDCOM import, or standalone deployment work here.
