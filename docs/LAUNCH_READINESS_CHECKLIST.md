# GenCreator Launch Readiness Checklist

> **Status:** Started for Sprint 8
> **Last updated:** 2026-07-21
> **Purpose:** Gather Gate 2 evidence for the OGF-embedded MVP launch candidate.

## Gate 2 Posture

GenCreator is deployed as an OGF-embedded MVP. Gate 1 advanced by Chairman waiver, so Gate 2 needs extra care around plan-quality evidence and live funnel proof.

Current recommendation: **not yet Gate 2-ready** until Kit operational proof and beta feedback are recorded.

## Evidence Checklist

| Area | Required evidence | Status | Notes |
|---|---|---|---|
| Route availability | `/research-planner/` and `/gencreator/` return 200 on production | Verified 2026-07-21 | Both production routes returned 200 and contained planner text |
| Sitemap | Live sitemap includes both planner routes | Verified 2026-07-21 | `/sitemap-index.xml` returned 200; `sitemap-0.xml` lists both routes |
| Planner flow | User can enter known facts and generate a research plan | Pending re-check | Test production route |
| Print/save | Print Plan control works on generated plan | Pending re-check | Browser print flow is the MVP save path |
| Kit form | Form `9616629` accepts a live seed signup | Pending Greg test email | Avoid duplicate junk records |
| Kit tag | Form/automation applies `gencreator-plan-generated` | Pending Kit admin confirmation | Launch blocker for segmented follow-up |
| Analytics | GA4 events fire for plan generation, email capture, affiliate click, mission click, print | Pending spot check | No PII in event payloads |
| Affiliate disclosure | FTC disclosure visible near outbound database links | Pending CPO/CRO review | Monetized activation still blocked |
| Affiliate links | Free/direct links work; CJ monetized links remain blocked | Partially ready | Requires CRO approvals/ad IDs |
| Accessibility | GenCreator UI remains WCAG 2.1 AA clean | Previously passed | Re-run only if UI changes |
| Performance | Lighthouse remains 90+ target | Previously passed | Re-run before Gate 2 if launch date is set |
| Beta feedback | 5-10 OGF users or Chairman-approved equivalent | Packet ready | See `docs/BETA_TEST_PACKET.md`; responses still pending |
| Gate approval | Greg approves Dev→Launch | Pending | Gate 2 authority is Chairman |

## Beta Packet Draft

The send-ready beta packet lives in `docs/BETA_TEST_PACKET.md`.

## Current Blockers

1. Kit tag `gencreator-plan-generated` is not yet confirmed.
2. Live Kit seed signup has not been run.
3. Beta/user feedback has not been collected after the Gate 1 validation waiver.
4. CJ affiliate activation is blocked on CRO approvals and advertiser/ad/link IDs.

## Scope Guardrail

Gate 2 readiness is about proving the MVP already built. Do not add paid tier, accounts, saved plans, LLM augmentation, GEDCOM import, or standalone deployment work here.
