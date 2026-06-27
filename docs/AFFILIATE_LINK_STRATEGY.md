# GenCreator Affiliate Link Strategy

> **Status:** Strategy prepared; live activation blocked on affiliate approvals/network IDs
> **Last updated:** 2026-06-27

## Current State

GenCreator currently builds tracked outbound links with:

- base database URL
- UTM parameters
- optional `tag=<affiliateId>` query parameter

That works for Amazon-style affiliate links. It does **not** work for Commission Junction/CJ deep links, which are expected for Ancestry, MyHeritage, and Findmypast per the CRO revenue model.

## Network Strategy

| Provider | Current DB IDs | Expected handling | Status |
|---|---|---|---|
| FamilySearch | `familysearch_*` | Free link + UTM only | Ready |
| Free/public databases | `ellisisland`, `chronicling_america`, `blm_glo`, `findagrave`, `billiongraves` | Free link + UTM only | Ready |
| Ancestry | `ancestry_*` | CJ deep-link redirect | Blocked on CJ advertiser/ad IDs and approval |
| MyHeritage | `myheritage` | CJ deep-link redirect or approved network URL | Blocked on approval/network details |
| Findmypast | `findmypast` | CJ deep-link redirect or approved network URL | Blocked on approval/network details |
| Newspapers.com / Fold3 | `newspapers_com`, `fold3_military` | Confirm network relationship; likely CJ/Ancestry family or separate program | Blocked on CRO confirmation |
| Amazon-style partners | none active in current KB | `tag=<id>` model remains useful | Ready if added |

## Proposed Data Model Change

Extend `DatabaseDirectoryEntry` only when approvals land:

```ts
type AffiliateNetwork = 'none' | 'query_tag' | 'cj';

interface DatabaseDirectoryEntry {
  id: string;
  name: string;
  baseUrl: string;
  affiliateId: string;
  affiliateNetwork?: AffiliateNetwork;
  cjAdvertiserId?: string;
  cjLinkId?: string;
  utmSource: string;
  utmMedium: string;
  accessModel: AccessModel;
  recordTypes: RecordType[];
}
```

Recommended behavior:

- `none`: return base URL + UTM.
- `query_tag`: append `tag=<affiliateId>` + UTM.
- `cj`: wrap the UTM-decorated destination URL in the approved CJ deep-link URL format.

## Required From CRO/Greg

| Required item | Why |
|---|---|
| CJ Publisher ID confirmation | CRO record says Publisher ID `7928154`; confirm still canonical |
| Advertiser approvals | Ancestry/MyHeritage/Findmypast/Fold3/Newspapers.com links cannot activate without approval |
| CJ link/ad IDs per advertiser | Needed to build valid redirect URLs |
| FTC disclosure sign-off | Existing UI disclosure likely sufficient, but CRO should confirm final wording |

## Implementation Sequence

1. Keep all current affiliate IDs as `TBD` until approvals are confirmed.
2. Add `affiliateNetwork` support and tests behind data changes.
3. Update database-directory entries one provider at a time.
4. Verify generated outbound links include:
   - destination URL
   - UTM source/medium/campaign
   - CJ redirect wrapper only for approved CJ partners
5. Confirm GA4 `gencreator_affiliate_click` still fires on every outbound database click.

## MVP Guardrail

No affiliate-link activation should delay the core planner launch if approvals are still pending. The planner can launch with free/direct database links and GA4 click telemetry; monetized links can be activated after CRO confirms network details.
