# GenCreator Kit Integration Plan

> **Status:** Implemented with dedicated Kit form `9616629`
> **Last updated:** 2026-06-27

## Decision

Use OGF's existing safe static-site pattern for Kit capture:

- Post directly from the client to Kit's public form subscription endpoint.
- Do not expose API secrets in browser code.
- Let Kit form configuration apply the GenCreator-specific tag and follow-up automation.

This matches the deployed OGF `/unit1` and `/firmlyplanted` pages, which post to `https://app.kit.com/forms/{form_id}/subscriptions`.

## Form Details

GenCreator uses:

`https://app.kit.com/forms/9616629/subscriptions`

Do **not** reuse OGF form `9444299` for GenCreator; existing comments indicate that form applies Workbook/FPF tags.

Still confirm in Kit:

| Required item | Purpose |
|---|---|
| Tag `gencreator-plan-generated` is applied by form/automation | Ensures GenCreator opt-ins are segmented correctly |
| Confirmation of follow-up automation | Current static pattern can subscribe/tag; plan-email delivery requires Kit automation or a server-side email provider |
| Seed test email | Verifies the form accepts a live subscription before public launch |

## Live Operational Check

2026-06-27 deployment check:

- OGF PR #3 is live; both `https://www.operationgrannyfiles.com/research-planner/` and `https://www.operationgrannyfiles.com/gencreator/` return 200.
- The live sitemap index points to `https://operationgrannyfiles.com/sitemap-0.xml`, which lists both planner routes.
- Seed signup has **not** been run yet. Run only one live seed after Greg confirms the test email, to avoid duplicate junk records.
- Kit admin still needs to confirm form `9616629` applies tag `gencreator-plan-generated`.

## Implementation Shape

Implemented:

1. `EmailCapture.tsx` posts `email_address` to Kit form `9616629`.
2. It also submits `lead_source_page=gencreator`, research goal, and step count as custom fields.
3. `gencreator_email_captured` GA4 event fires only after Kit returns `success` or `quarantined`.
4. Success copy promises subscription/follow-up, not delivery of the exact generated plan.

## Important Scope Note

The current OGF static deployment can safely do public-form subscription capture. It should **not** send a private Kit API secret from the browser. A true "email this exact plan contents" feature requires either:

- Kit automation that sends a generic follow-up and links the user back to the planner, or
- a server-side endpoint/adapter that can render and send the generated plan without exposing credentials.

For MVP, the active implementation is: capture/tag the user after plan generation, keep the plan visible on screen, and invite them to print/save it.
