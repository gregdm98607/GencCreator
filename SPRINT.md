# Current Sprint — Sprint 8 Launch Readiness + Beta Proof

> **Sprint #:** 8
> **Window:** 2026-07-21 → 2026-08-04
> **Sprint goal:** Turn the deployed MVP into a Gate 2-ready launch candidate by proving the live capture funnel, collecting beta feedback, and assembling launch-readiness evidence without expanding MVP scope.
> **Last updated:** 2026-07-21

---

## Decision

Sprint 8 is a **launch-readiness sprint**, not a feature-expansion sprint.

Sprint 7 finished the Development kickoff: Gate 1 waiver recorded, source CI added, `/research-planner/` deployed while preserving `/gencreator/`, Kit capture wired to form `9616629`, and CJ affiliate strategy documented. The remaining risk is no longer "can we build it?" It is "can we prove the live MVP is ready enough for beta/launch despite waived validation?"

**Selected focus:** Kit operational proof + beta feedback + Gate 2 evidence.

**Deferred on purpose:** paid tier, Stripe, accounts, saved plans, LLM, GEDCOM, public pricing, standalone deployment, and CJ affiliate activation without CRO approvals/ad IDs.

---

## Must Land

- [ ] **[S8-1] Kit operational proof** — confirm Kit form `9616629` applies tag `gencreator-plan-generated`; run exactly one live seed signup after Greg confirms the test email; record the result in `docs/KIT_INTEGRATION_PLAN.md`.
- [ ] **[S8-2] Beta packet** — prepare a short beta tester prompt, feedback questions, and tracking method for 5-10 OGF users; keep it focused on plan clarity and next-action usefulness.
- [ ] **[S8-3] Deployed smoke check** — verify live `/research-planner/` and `/gencreator/` still render the planner, produce a plan, expose print/save, and keep the sitemap entries.
- [ ] **[S8-4] Launch-readiness checklist** — create and maintain `docs/LAUNCH_READINESS_CHECKLIST.md` with route, Kit, analytics, affiliate, QA, beta, copy, and approval evidence.
- [ ] **[S8-5] Copy/FTC review queue** — identify the exact UI copy and affiliate disclosure lines that need CPO/CRO sign-off before Gate 2.
- [ ] **[S8-6] Source/host parity check** — confirm GenCreator source files still match the deployed OGF implementation where expected, or document intentional differences.

## Conditional / Blocked

- [ ] **CJ affiliate activation** — blocked until CRO/Greg provide advertiser approvals and network/ad/link IDs.
- [ ] **Validation-driven fixes** — only implement if beta feedback identifies clear P0/P1 issues inside existing MVP scope.

## Explicitly Not In Sprint

- Paid tier, Stripe, saved plans, accounts, LLM augmentation, GEDCOM import.
- Standalone app migration, new domain, or iframe deployment.
- Public pricing communication.
- New genealogy knowledge-base expansion beyond beta-identified bug fixes.

---

## Daily / Session Log

| Date | Owner | What changed | Next |
|------|-------|--------------|------|
| 2026-07-21 | CTO/Greg | Sprint 8 selected as Launch Readiness + Beta Proof. Sprint 7 is treated as closed; live MVP exists, but Kit seed proof and beta evidence remain open. | Create launch-readiness checklist; confirm Kit seed email; prepare beta packet |
| 2026-07-21 | CTO | Production route/sitemap check passed: both planner routes return 200 and `sitemap-0.xml` lists both. | Run interactive generated-plan smoke; confirm Kit tag/test email |

---

## Definition of Done

1. Kit form/tag behavior is confirmed or precisely blocked.
2. One live seed signup is completed and recorded, or explicitly deferred by Greg.
3. Beta packet is ready to send to 5-10 OGF users.
4. Live deployed smoke check is recorded for both planner routes.
5. Launch-readiness checklist exists and shows current Gate 2 blockers.
6. No out-of-scope paid/account/LLM/standalone work is introduced.

---

## Risks

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Kit form accepts signups but does not apply the intended tag | M | H | Confirm in Kit admin before treating lead capture as launch-ready |
| Waived validation creates plan-quality blind spots | H | H | Use beta packet to collect direct quality feedback before Gate 2 |
| Affiliate approvals remain blocked | H | M | Launch can proceed with direct/free links; monetized links activate later |
| Sprint drifts into V2 ideas | M | M | Keep every task tied to Gate 2 evidence or beta-critical fixes |

---

*Sprint maintained by CTO. Review by 2026-08-04 or after beta evidence arrives, whichever comes first.*
