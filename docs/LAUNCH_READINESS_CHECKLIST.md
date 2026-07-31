# GenCreator Launch Readiness Checklist

> **Status:** Started for Sprint 8
> **Last updated:** 2026-07-30
> **Purpose:** Gather Gate 2 evidence for the OGF-embedded MVP launch candidate.

## Gate 2 Posture

GenCreator is deployed as an OGF-embedded MVP. Gate 1 advanced by Chairman waiver, so Gate 2 needs extra care around plan-quality evidence and live funnel proof.

Current recommendation: **HOLD** until the Chairman records a disposition, CPO/CRO sign-offs are recorded, and the remaining GA4 email-event evidence gap is accepted or closed without a second Kit submission.

## Evidence Checklist

| Area | Required evidence | Status | Notes |
|---|---|---|---|
| Route availability | `/research-planner/` and `/gencreator/` return 200 on production | Verified 2026-07-21 | Both production routes returned 200 and contained planner text |
| Sitemap | Live sitemap includes both planner routes | Verified 2026-07-21 | `/sitemap-index.xml` returned 200; `sitemap-0.xml` lists both routes |
| Planner flow | User can enter known facts and generate a research plan | Verified 2026-07-22 | Both live routes generated a 10-step plan for “Eleanor May Carter,” born about 1882 in Salt Lake City, with the Find parents goal |
| Print/save | Print Plan control works on generated plan | Verified 2026-07-22 | Primary route control was visible, enabled, and executed without page error/navigation; alias exposed the same enabled control. OS print-dialog completion remains a user/browser action |
| Kit form | Form `9616629` accepts a live seed signup | Verified 2026-07-30 23:23 PDT | Exactly one seed submitted to `greg@operationgrannyfiles.com`; success response, delivered confirmation, confirmed subscriber, and form attribution verified |
| Kit tag | Form/automation applies `gencreator-plan-generated` | Verified 2026-07-30 | Subscriber `4231946280` shows the tag and “GenCreator Plan Capture” membership after processing |
| Analytics | GA4 events fire for form start, plan generation, email capture, database click, mission click, print | 5/6 Realtime; source coverage 6/6 | OGF PR #5 repaired the host bridge. Realtime proves form start, plan generation, database click, mission click, and print. Email success ran before the repair; its event is source/unit verified but not present in Realtime. Do not submit a second seed |
| Affiliate disclosure | FTC disclosure visible near outbound database links | Visible; sign-off pending | Disclosure rendered on the generated plan; exact review queue below. Monetized activation still blocked |
| Affiliate links | Free/direct links work; CJ monetized links remain blocked | Launch policy approved | Chairman allows launch on direct/free links; pre-CJ affiliate revenue forecast is $0 |
| Accessibility | GenCreator UI remains WCAG 2.1 AA clean | Verified 2026-07-30 | Scoped axe 4.12.1 production scan: 0 violations, 0 incomplete, 16 passes; Lighthouse deductions are shared-footer-only |
| Performance | Lighthouse remains 90+ target | Verified 2026-07-30 | After OGF PR #7: production mobile Lighthouse 90 / 92 / 100 / 100; FCP/LCP 2.7s, TBT 0, CLS 0 |
| Acceptance evidence | Three-scenario Chairman walkthrough | Usefulness threshold passed; disposition pending | All objective checks pass. Greg scored the scenarios 5/5, 5/5, and 4/5. Mission-link P1 was fixed through OGF PR #6 and re-tested live |
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

## Acceptance Evidence

The pre-Gate-2 scorecard lives in `docs/CHAIRMAN_ACCEPTANCE_WALKTHROUGH.md`. The beta packet remains available for post-launch external-user feedback.

## Current Blockers

1. Chairman residual-risk acknowledgement and explicit disposition remain pending; usefulness passed at 5/5, 5/5, and 4/5.
2. CPO/CRO copy, consent, and FTC sign-offs remain pending.
3. `gencreator_email_captured` lacks GA4 Realtime receipt after the host repair; the one-seed limit prevents an ordinary replay.
4. CJ activation is deferred pending CRO approvals and advertiser/ad/link IDs; it is not a Gate 2 blocker.

## Scope Guardrail

Gate 2 readiness is about proving the MVP already built. Do not add paid tier, accounts, saved plans, LLM augmentation, GEDCOM import, or standalone deployment work here.
