# GenCreator MVP Feature Specification — DRAFT

> **Status:** DRAFT — awaiting CPO refinement and CEO approval
> **Author:** CTO (initial draft from synthesis of Obsidian context)
> **Date:** 2026-04-08
> **Due for finalization:** 2026-05-30 (per Revenue Workstream)
> **Approval gate:** SSM CEO must approve before Development phase begins

---

## MVP Scope Definition

**In scope:**
- Single-page interactive research planner
- Structured form input (ancestor details, known records, research goal)
- Generated prioritized research plan (5-10 steps)
- Affiliate links to genealogy databases in plan output
- Links to relevant OGF missions and field guides
- "Email me this plan" email capture
- Print/save as PDF option
- Mobile-responsive design
- Accessible (WCAG 2.1 AA)

**Explicitly out of scope for MVP:**
- User accounts / saved sessions
- GEDCOM file import/export
- Family tree visualization
- Multi-ancestor planning
- LLM/AI-generated narrative advice
- Integration with Ancestry/FamilySearch APIs (read from their databases)
- Paid/premium features (all MVP features are free)
---

## User Stories

### US-1: Generate a Research Plan
**As a** beginner genealogist visiting OGF,
**I want to** enter what I know about an ancestor and get a prioritized list of next steps,
**So that** I know exactly where to look next instead of guessing.

**Acceptance criteria:**
- Form accepts: ancestor name, known dates (approx OK), known locations, records already found, research goal
- System generates 5-10 prioritized research steps
- Each step includes: record type, rationale, database link, difficulty level
- Plan renders in <3 seconds
- Works on mobile and desktop

### US-2: Email My Research Plan
**As a** GenCreator user who generated a plan,
**I want to** email the plan to myself,
**So that** I can reference it later when I sit down to do research.

**Acceptance criteria:**
- "Email me this plan" button appears after plan generation
- User enters email address
- Formatted plan sent via email (ConvertKit/Substack integration)
- Email also subscribes user to OGF list (with disclosure)
- Works without JavaScript (progressive enhancement)
### US-3: Follow Affiliate Links to Databases
**As a** GenCreator user reviewing my plan,
**I want to** click directly to the recommended database/collection,
**So that** I can start searching immediately without hunting for the right page.

**Acceptance criteria:**
- Each database recommendation includes a direct tracked link
- Links use affiliate tracking (UTM parameters + affiliate IDs)
- Links open in new tab
- Affiliate disclosure visible on the page

### US-4: Learn More via OGF Missions
**As a** GenCreator user who doesn't understand a recommended record type,
**I want to** access an OGF guide that explains it,
**So that** I can learn the skill before attempting the search.

**Acceptance criteria:**
- Relevant OGF missions linked in each research step where applicable
- Links display mission title and level (101/201/301/401)
- Dead links handled gracefully (if mission doesn't exist yet, omit the link)

### US-5: Print/Save My Plan
**As a** GenCreator user,
**I want to** print or save my plan as a PDF,
**So that** I can use it offline at a library or archive.

**Acceptance criteria:**
- Print-friendly CSS renders clean output
- Browser print → PDF produces usable document
- Plan includes date generated and ancestor summary
---

## Data Model (Draft)

### Input Schema
```typescript
interface AncestorInput {
  name: string;                    // Full name (required)
  birthDate?: string;              // Approximate OK: "about 1850", "1845-1855", "1850"
  birthPlace?: string;             // As specific as known: "Salt Lake City, Utah" or "Utah" or "USA"
  deathDate?: string;
  deathPlace?: string;
  marriageDate?: string;
  marriagePlace?: string;
  knownLocations?: string[];       // Other places they lived
  timePeriod?: string;             // Auto-derived from dates, or manual: "1840-1910"
  country: string;                 // Primary country of research (required for record matching)
  recordsFound: RecordType[];      // Checkboxes of what user already has
  researchGoal: ResearchGoal;      // What the user wants to find
}

type RecordType =
  | 'census' | 'birth_record' | 'death_record' | 'marriage_record'
  | 'military' | 'immigration' | 'naturalization' | 'land_deed'
  | 'probate' | 'newspaper' | 'church_record' | 'city_directory'
  | 'cemetery' | 'tax_record' | 'school_record' | 'dna_test';

type ResearchGoal =
  | 'find_parents' | 'find_children' | 'find_spouse'
  | 'find_siblings' | 'confirm_identity' | 'general_exploration'
  | 'immigration_origin' | 'military_service';
```
### Output Schema
```typescript
interface ResearchPlan {
  ancestor: AncestorSummary;       // Echo back what user entered
  generatedDate: string;           // ISO date
  steps: ResearchStep[];           // Ordered by priority
  ogfMissionsReferenced: string[]; // List of OGF mission slugs linked
  disclaimer: string;              // "This plan is a starting point..."
}

interface ResearchStep {
  priority: number;                // 1 = highest
  recordType: RecordType;
  title: string;                   // "Search U.S. Federal Census (1850-1940)"
  rationale: string;               // Why this record matters for this ancestor
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  databases: DatabaseLink[];       // Where to search (with affiliate links)
  ogfMission?: OGFMissionLink;     // Relevant OGF guide if available
  tips: string[];                  // 1-2 practical tips for this search
}

interface DatabaseLink {
  name: string;                    // "Ancestry.com"
  url: string;                     // Direct link with affiliate tracking
  accessModel: 'free' | 'subscription' | 'pay-per-view';
  isAffiliate: boolean;
}

interface OGFMissionLink {
  title: string;
  level: '101' | '201' | '301' | '401';
  url: string;                     // Link to OGF mission page
}
```
---

## Research Plan Generation Logic (Draft)

The core intelligence of GenCreator is a **knowledge model** mapping:
- **Time period + Location → Available record types** (what records exist for this era/place?)
- **Research goal → Recommended record types** (what records help find parents vs. military service?)
- **Records already found → Records NOT yet searched** (what's missing from the user's research?)
- **Record type → Databases** (where can you find this record? with affiliate links)
- **Record type → OGF missions** (which OGF guide teaches this skill?)

### Knowledge Model Approach (CTO Recommendation)

For MVP, implement as a **static knowledge base** (JSON/TypeScript data files):
- `record-availability.json` — maps country + time period ranges → available record types
- `research-strategies.json` — maps research goals → prioritized record type sequences
- `database-directory.json` — maps record types → databases with URLs and affiliate info
- `ogf-missions.json` — maps record types → OGF mission pages

This avoids the complexity of an LLM call or external API while still producing personalized plans. The knowledge base can be expanded over time and eventually augmented with LLM assistance in a future version.

### Priority Algorithm (Simplified)
```
For each record type available for this ancestor's time/place:
  IF user has NOT already found this record type:
    score = base_priority(research_goal, record_type)
            + location_specificity_bonus
            + time_period_relevance
            + accessibility_bonus (free sources scored higher)
    ADD to plan with score
Sort by score descending
Return top 5-10 steps
```

---

## Wireframe (Text Description)

**Page layout:** Single scrolling page with two main sections

**Section 1: Input Form ("Tell Us What You Know")**
- Clean, friendly form with clear labels and helper text
- Grouped into: "About Your Ancestor" / "Records You've Already Found" / "Your Research Goal"
- Large, tappable checkboxes for record types (mobile-friendly)
- "Generate My Research Plan" call-to-action button

**Section 2: Research Plan Output ("Your Next Steps")**
- Appears below form after submission (no page reload — progressive enhancement)
- Ancestor summary header echoing what user entered
- Numbered list of research steps, each as a card/section with:
  - Step number and title
  - Why this matters (1-2 sentences)
  - Database links (buttons/badges with affiliate tracking)
  - OGF mission link (if applicable)
  - Difficulty badge (beginner/intermediate/advanced)
- Action bar at bottom: "Email Me This Plan" | "Print/Save PDF" | "Start Over"

---

*DRAFT — to be refined by CPO with user research input*
*Due for finalization: 2026-05-30*
*Created: 2026-04-08*