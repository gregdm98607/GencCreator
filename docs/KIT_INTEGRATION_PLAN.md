# GenCreator Kit Integration Plan

> **Status:** Implemented with dedicated Kit form `9616629`
> **Last updated:** 2026-07-30

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
| Seed test email: `greg@operationgrannyfiles.com` | Verifies the form accepts a live subscription before public launch |

## Live Operational Check

Completed 2026-07-30 (PDT):

- Kit form `9616629` is the active **GenCreator Plan form**.
- The active **GenCreator Plan Capture** Visual Automation is configured as form completion → `gencreator-plan-generated`.
- Exactly one production seed was submitted at approximately **23:23 PDT** using `greg@operationgrannyfiles.com`.
- The live planner returned its success state. Kit created subscriber `4231946280` and delivered the confirmation message.
- The confirmation link completed successfully. Kit shows the subscriber as **Confirmed**, sourced from the GenCreator form, tagged `gencreator-plan-generated`, and enrolled in **GenCreator Plan Capture**.
- No second seed was submitted.

Sprint 8 operational decision:

- The one-seed limit is exhausted; do not resubmit the production form for testing.
- Kit capture, confirmation, tag, and automation proof all pass.
- `gencreator_email_captured` is source/unit verified and the production success handler executed during the seed, but its GA4 receipt occurred before the host event bridge was repaired and did not appear in Realtime. Close that analytics-only evidence gap without another Kit submission, or record a Chairman exception.

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
