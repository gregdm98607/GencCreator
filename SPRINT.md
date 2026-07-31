# Current Sprint — Sprint 8 Launch Readiness + Beta Proof

> **Sprint #:** 8
> **Window:** 2026-07-21 → 2026-08-04
> **Sprint goal:** Turn the deployed MVP into a Gate 2-ready launch candidate by proving the live capture funnel, collecting beta feedback, and assembling launch-readiness evidence without expanding MVP scope.
> **Last updated:** 2026-07-30

---

## Decision

Sprint 8 is a **launch-readiness sprint**, not a feature-expansion sprint.

Sprint 7 finished the Development kickoff: Gate 1 waiver recorded, source CI added, `/research-planner/` deployed while preserving `/gencreator/`, Kit capture wired to form `9616629`, and CJ affiliate strategy documented. The remaining risk is no longer "can we build it?" It is "can we prove the live MVP is ready enough for beta/launch despite waived validation?"

**Selected focus:** Kit operational proof + Chairman acceptance walkthrough + Gate 2 evidence.

**Chairman decisions recorded 2026-07-30:**
- A fixed three-scenario Chairman walkthrough replaces the 5–10-person beta as the pre-Gate-2 evidence package. External-user feedback moves to post-launch monitoring.
- GenCreator may launch with free/direct database links while CJ monetization remains deferred.
- The single Kit production seed uses `greg@operationgrannyfiles.com`.

**Deferred on purpose:** paid tier, Stripe, accounts, saved plans, LLM, GEDCOM, public pricing, standalone deployment, and CJ affiliate activation without CRO approvals/ad IDs.

---

## Must Land

- [x] **[S8-1] Kit operational proof** — form `9616629`, exactly one confirmed seed, `gencreator-plan-generated`, and “GenCreator Plan Capture” membership verified and recorded.
- [x] **[S8-2] Acceptance method locked** — Greg selected the Chairman walkthrough as the pre-Gate-2 substitute for external beta; the original beta packet remains available for post-launch feedback.
- [x] **[S8-3] Deployed smoke check** — verified 2026-07-22: both live routes rendered the form and generated a 10-step plan for the same test case; the primary route's Print / Save as PDF control was enabled and executed without page error/navigation; the alias exposed the same enabled control; route/sitemap HTTP evidence remains recorded from 2026-07-21.
- [x] **[S8-4] Launch-readiness checklist** — `docs/LAUNCH_READINESS_CHECKLIST.md` now tracks route, Kit, analytics, affiliate, QA, beta, copy, approval, smoke, and parity evidence; continue maintaining it as Kit/beta results arrive.
- [x] **[S8-5] Copy/FTC review queue** — exact CPO/CRO review surface recorded in `docs/LAUNCH_READINESS_CHECKLIST.md`; no copy was changed without sign-off.
- [x] **[S8-6] Source/host parity check** — verified 2026-07-22: source and OGF logic/data/CSS match after line-ending normalization; component diffs are limited to intentional OGF-relative import paths.
- [x] **[S8-7] Analytics delivery hardening** — OGF PR #5 exposed the GA bridge globally; PR #7 preserved queued delivery while deferring third-party cost. Realtime proves five live-UI events and post-performance queued delivery. The one pre-fix email event remains a documented evidence exception, not a source-wiring defect.
- [x] **[S8-8] Source merge + CI proof** — GenCreator PR #1 passed 38 tests and typecheck in GitHub Actions and merged to `main` on 2026-07-30. The workflow trigger was corrected from stale `master` to the actual default branch, `main`.
- [x] **[S8-9] Chairman walkthrough evidence** — all three scenarios pass the objective checks and Greg scored them 5/5, 5/5, and 4/5. No unresolved P0/P1 issue remains; formal Gate 2 disposition is tracked separately.
- [ ] **[S8-10] Gate 2 packet** — complete `docs/GATE2_PACKET.md` with Kit/GA4 proof, walkthrough disposition, copy/FTC reviews, launch plan, and honest pre-CJ revenue posture.

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
| 2026-07-21 | CTO | Created send-ready beta test packet in `docs/BETA_TEST_PACKET.md`. | Send to 5-10 OGF testers; collect responses in tracking table |
| 2026-07-22 | CTO | Interactive production smoke passed on both routes using a Utah parent-finding scenario; primary route generated 10 steps and executed the enabled print/save control without page error or navigation; alias generated the same plan shape and exposed the enabled print/save control. | Confirm Kit tag/test email; send beta packet |
| 2026-07-22 | CTO | Source/host parity passed after line-ending normalization. All shared logic, data, analytics, utilities, and CSS match; component differences are intentional import-path rewrites. Copy/FTC sign-off surface queued. All 37 tests and typecheck passed. | Commit focused evidence update; then confirm Kit and collect beta responses |
| 2026-07-22 | CTO | Live analytics smoke generated another 10-step plan with no runtime warnings/errors. The browser exposed the GA script but not a callable `window.gtag`, so the shared tracker was hardened with a tested `dataLayer` fallback and synced to OGF. GenCreator: 38 tests + typecheck pass; OGF: 43-page build pass. | Deploy OGF analytics fallback; verify events in GA4 DebugView/Realtime; confirm Kit tag/test email |
| 2026-07-30 | Greg/CTO | Locked the Gate 2 path: Chairman walkthrough instead of external beta; launch with direct/free links while CJ is deferred; one Kit seed to `greg@operationgrannyfiles.com`. GenCreator PR #1 passed CI and merged to `main`; OGF PR #4 had already deployed the GA fallback. | Prove Kit + GA4, run the walkthrough, close sign-offs, assemble Gate 2 packet |
| 2026-07-30 | CTO | Kit proof passed with exactly one confirmed/tagged seed. Three walkthrough scenarios passed mechanically. OGF PRs #5–#7 fixed the GA bridge, published mission links, and Lighthouse performance. Production QA: 90/92/100/100 and scoped axe 0/0. | Record Chairman ratings/disposition, CPO/CRO sign-offs, and the email-event evidence exception |

---

## Definition of Done

1. Kit form/tag behavior is confirmed or precisely blocked.
2. One live seed signup is completed and recorded, or explicitly deferred by Greg.
3. Chairman walkthrough is completed with all three scenarios ≥4/5 and no unresolved P0/P1 issue.
4. Live deployed smoke check is recorded for both planner routes.
5. Launch-readiness checklist exists and shows current Gate 2 blockers.
6. No out-of-scope paid/account/LLM/standalone work is introduced.

---

## Risks

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Kit form accepts signups but does not apply the intended tag | M | H | Confirm in Kit admin before treating lead capture as launch-ready |
| Waived validation creates plan-quality blind spots | H | H | Require a scored Chairman walkthrough before Gate 2 and collect external-user feedback after launch |
| Affiliate approvals remain blocked | H | M | Launch can proceed with direct/free links; monetized links activate later |
| Sprint drifts into V2 ideas | M | M | Keep every task tied to Gate 2 evidence or beta-critical fixes |

---

*Sprint maintained by CTO. Review by 2026-08-04 or after beta evidence arrives, whichever comes first.*
