# GenCreator Technical Architecture

> **Owner:** CTO (AI Agent)
> **Date:** 2026-04-08
> **Status:** Draft — architectural decisions pending prototype validation

---

## Architecture Decision: Build Approach

### Options Evaluated

| Option | Description | Pros | Cons |
|--------|-------------|------|------|
| **A: Astro component in OGF repo** | Build GenCreator as pages/components within the existing OGF Astro site | Simplest deployment; shared OGF styles; no CORS issues; single build pipeline | Couples GenCreator lifecycle to OGF; harder to extract later |
| **B: Standalone Astro app** | Separate Astro project at `c:\dev\GenCreator`, deployed on Vercel, embedded via iframe on OGF | Independent deployment; can evolve separately; reusable across properties | Iframe complexity; separate hosting; CORS for email capture |
| **C: React/Preact island in OGF** | Interactive React component using Astro's island architecture within OGF site | Rich interactivity; leverages Astro islands; stays in OGF build | Adds React dependency to OGF; island hydration overhead |

### Recommended Approach: Option C (React/Preact Island in OGF)

**Rationale:** GenCreator is inherently interactive — a multi-step form with dynamic output. Astro's island architecture is designed exactly for this: static page shell with an interactive component that hydrates on the client. This keeps GenCreator within the OGF deployment pipeline while enabling the rich form interaction needed.
**Migration path:** If GenCreator outgrows OGF (needs its own domain, backend, user accounts), the React component can be extracted into a standalone app with minimal rewrite.

**This repo (`c:\dev\GenCreator`) serves as:**
1. The development workspace for the GenCreator component
2. Documentation and specification home
3. Knowledge base files (record-availability, database-directory, etc.)
4. Test suite for the research plan generation logic
5. Build artifacts that get integrated into the OGF site

---

## Technology Stack

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| **Host site** | Astro SSG (OGF) | SSM standard; GenCreator lives as a page/island in OGF |
| **Interactive component** | Preact (via `@astrojs/preact`) | Lightweight React-compatible; Astro has first-class support; 3KB vs 40KB for React |
| **Styling** | Tailwind CSS | Consistent with SSM sites; utility-first; responsive |
| **Knowledge base** | TypeScript/JSON data files | Static data; no database needed for MVP |
| **Email integration** | ConvertKit API (server-side) | OGF's existing email platform; Astro API route handles the call |
| **Affiliate tracking** | UTM parameters + affiliate IDs | Standard; configured in database-directory.json |
| **Analytics** | GA4 custom events | Track plan generations, email captures, affiliate clicks |
| **Hosting** | Vercel (via OGF deployment) | SSM standard; free tier sufficient |
| **Testing** | Vitest | Astro ecosystem standard; fast; TypeScript-native |
| **Node.js** | v24 | SSM standard (per CTO Architecture Overview) |

---

## Component Architecture

```
OGF Astro Site (operationgrannyfiles.com)
├── src/pages/gencreator.astro          # GenCreator landing page (static shell)
├── src/components/gencreator/
│   ├── GenCreator.tsx                   # Main Preact island component
│   ├── AncestorForm.tsx                 # Input form component
│   ├── ResearchPlan.tsx                 # Plan output component
│   ├── ResearchStep.tsx                 # Individual step card
│   ├── EmailCapture.tsx                 # Email-me-this-plan widget
│   └── PrintView.tsx                    # Print-optimized layout
├── src/lib/gencreator/
│   ├── planner.ts                       # Core plan generation algorithm
│   ├── types.ts                         # TypeScript interfaces (Input, Output, etc.)
│   ├── knowledge/
│   │   ├── record-availability.json     # Time/place → available records
│   │   ├── research-strategies.json     # Goal → prioritized record sequences
│   │   ├── database-directory.json      # Record type → databases + affiliate links
│   │   └── ogf-missions.json           # Record type → OGF mission links
│   └── utils/
│       ├── scoring.ts                   # Priority scoring algorithm
│       └── affiliate.ts                 # Affiliate link generation
├── src/pages/api/gencreator-email.ts    # API route: send plan via email
└── tests/gencreator/
    ├── planner.test.ts                  # Plan generation tests
    ├── scoring.test.ts                  # Scoring algorithm tests
    └── knowledge.test.ts               # Knowledge base integrity tests
```
---

## Integration Architecture

### OGF Site Integration
GenCreator components developed in this repo are integrated into the OGF site build. During development, this repo serves as the workspace; for deployment, the components are copied or symlinked into the OGF project at `c:\dev\operation-granny-files\` (or equivalent OGF repo path).

**Integration options (CTO to decide during Development phase):**
1. **npm workspace:** OGF and GenCreator in a monorepo workspace
2. **npm package:** GenCreator published as a private npm package, imported by OGF
3. **Direct copy:** GenCreator files copied into OGF src/ (simplest for MVP)

### Email Capture Flow
```
User clicks "Email Me This Plan"
  → Client-side: collect email, validate
  → POST to /api/gencreator-email (Astro API route on Vercel)
  → Server-side: format plan as HTML email
  → Call ConvertKit API: create subscriber + send email
  → Client-side: show confirmation, update UI
```

### Affiliate Link Architecture
```
database-directory.json contains:
  {
    "ancestry_census": {
      "name": "Ancestry.com - U.S. Census",
      "baseUrl": "https://www.ancestry.com/search/collections/...",
      "affiliateId": "TBD",       // Set after affiliate approval
      "utmSource": "gencreator",
      "utmMedium": "research-plan",
      "accessModel": "subscription"
    }
  }

affiliate.ts generates tracked URLs:
  → baseUrl + ?tag={affiliateId}&utm_source=gencreator&utm_medium=research-plan&utm_campaign={recordType}
```

### Analytics Events
```
GA4 Custom Events:
  gencreator_plan_generated    — user completes form, plan renders
  gencreator_email_captured    — user submits email for plan delivery
  gencreator_affiliate_click   — user clicks a database link in plan
  gencreator_mission_click     — user clicks an OGF mission link in plan
  gencreator_print             — user prints/saves plan
  gencreator_form_abandoned    — user starts form but doesn't submit (after 60s)
```
---

## Performance Requirements

| Metric | Target | Rationale |
|--------|--------|-----------|
| Lighthouse Performance | 90+ | CTO KPI; essential for older/slower devices |
| Plan generation time | <500ms client-side | Static knowledge base; no API calls needed |
| First Contentful Paint | <1.5s | Astro SSG delivers static shell instantly |
| Time to Interactive | <3s | Preact island hydrates fast (3KB) |
| Bundle size (GenCreator island) | <50KB gzipped | Keep it lean; target audience may have slower connections |

## Security Considerations

- No user data stored (stateless MVP — no database)
- Email addresses sent server-side to ConvertKit only (never logged or stored locally)
- Affiliate IDs in client-side JSON are not sensitive (they're in public URLs anyway)
- CSP headers should allow ConvertKit API calls and GA4
- No authentication needed for MVP

## Accessibility Requirements

- WCAG 2.1 AA compliance (target audience skews 45-70)
- All form fields have visible labels (not placeholder-only)
- Color is never the sole indicator of information
- Keyboard-navigable entire flow
- Screen reader compatible (ARIA labels on interactive elements)
- Text size minimum 16px; generous spacing
- High contrast mode support

---

*Created: 2026-04-08 by CTO*
*See also: CLAUDE.md | PRODUCT_BRIEF.md | MVP_SPEC_DRAFT.md | GOVERNANCE.md*