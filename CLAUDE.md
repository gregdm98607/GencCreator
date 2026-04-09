# GenCreator — Claude Code Project Instructions

> **Product:** GenCreator — Interactive Genealogy Research Planner
> **Owner:** Silver Sage Media (SSM) → Operation Granny Files (OGF)
> **Tech Lead:** CTO (AI Agent)
> **Product Owner:** CPO (AI Agent)
> **Directed by:** SSM CEO (AI Agent)
> **Reports to:** Chairman — Greg Maxfield
> **Status:** Phase 1 — Conception & Design

---

## What Is GenCreator?

GenCreator is a browser-based interactive genealogy research planner. Users input what they already know about their family (names, dates, locations, records found) and GenCreator generates a prioritized research plan with links to relevant databases.

**Core value proposition:** "Tell us what you know. We'll tell you what to find next."

**Target user:** Beginner-to-intermediate genealogist, 35-70 years old, emotionally motivated by connection to ancestors, overwhelmed by where to start.

**Deployment target:** Embedded on operationgrannyfiles.com as a lead magnet, audience differentiator, and monetization vehicle.
---

## Technical Context

### SSM Technology Stack (mandatory alignment)
- **Framework:** Astro SSG (all SSM sites use Astro)
- **Hosting:** Vercel (standard for SSM portfolio)
- **Analytics:** GA4 + Vercel Analytics
- **Version control:** GitHub
- **Node.js:** v24 (current SSM standard)
- **Content:** Markdown-based where applicable

### GenCreator Architecture Decision
GenCreator should be built as one of:
1. **Astro component** embedded directly in the OGF site (simplest, recommended for MVP)
2. **Standalone Astro app** deployed on Vercel, embedded via iframe on OGF
3. **React/Preact island** within the OGF Astro site (if heavy interactivity needed)

**CTO recommendation:** Start with option 1 (Astro component) for MVP. Migrate to option 2 only if GenCreator needs its own deployment lifecycle or grows beyond OGF.

### Integration Points
- **OGF site:** operationgrannyfiles.com — embed GenCreator as interactive tool
- **Email capture:** ConvertKit/Substack API — capture leads from GenCreator users
- **Affiliate links:** Ancestry, MyHeritage, FamilySearch, Newspapers.com, FindMyPast — tracked links in research plans
- **OGF content:** Reference OGF missions and field guides in research plan recommendations
---

## Governance & Decision Authority

This project operates within the Silver Sage Media C-Suite governance structure:

### Oversight Chain
```
Greg Maxfield (Chairman) — final approval on launch, budget > $500/mo, strategic direction
        │
    SSM CEO (AI) — directs execution, coordinates cross-unit dependencies
        │
    ┌───┴───┐
   CTO     CPO
   (how)   (what/why)
```

### Decision Gates
1. **Validation → Development:** Requires SSM CEO approval
2. **Development → Launch:** Requires Chairman (Greg) approval
3. **Architecture decisions:** CTO authority, consult CPO on user impact
4. **Feature prioritization:** CPO authority, consult CTO on feasibility
5. **Revenue/pricing decisions:** CRO authority, coordinated with CPO

### Key Documents (Obsidian Vault)
All strategic context lives in the Obsidian vault at `C:\Users\gregm\999_SECOND_BRAIN\_Obsidian\`:
- `05_Projects\Silver_Sage_Media\C-Suite\CTO\CTO_Charter.md` — CTO responsibilities and standards
- `05_Projects\Silver_Sage_Media\C-Suite\CPO\CPO_Charter.md` — product ownership and pipeline
- `05_Projects\Silver_Sage_Media\C-Suite\CEO\SSM_CEO_Charter.md` — operational authority
- `05_Projects\Silver_Sage_Media\C-Suite\Chairman\Chairman_Charter.md` — ultimate authority
- `05_Projects\Silver_Sage_Media\C-Suite\CEO\Code_Agent_Redeployment_Analysis.md` — GenCreator origin (initiative A2)
- `05_Projects\Silver_Sage_Media\C-Suite\CPO\Product_Portfolio_Assessment.md` — portfolio context
- `05_Projects\Silver_Sage_Media\Workstreams\GenCreator_Workstream.md` — workstream task board
- `05_Projects\Operation_Granny_Files\Workstreams\Revenue_Workstream.md` — revenue context
- `05_Projects\Silver_Sage_Media\C-Suite\CTO\Reports\Architecture_Overview.md` — SSM architecture
- `05_Projects\Silver_Sage_Media\C-Suite\CTO\Standards\Technical_Standards.md` — coding standards
---

## Development Guidelines

### MVP Principles
1. **Simplest possible version first.** Single-page form → generated research plan. No accounts, no saved sessions, no complex state.
2. **Guidance, not data.** GenCreator recommends *where to look*, not *what the records say*. Data lives at Ancestry, FamilySearch, etc.
3. **Leverage OGF content.** Research plans should reference OGF missions and field guides — creating a content flywheel.
4. **Affiliate links are the revenue mechanism.** Every "Search Ancestry for [record type]" is a natural affiliate link insertion point.
5. **No feature creep.** The CPO's #1 identified risk. Build the core interaction, validate it, then expand.

### Code Standards
- Follow SSM Technical Standards (see `docs/ARCHITECTURE.md`)
- Astro SSG patterns — static-first, progressive enhancement
- Accessible (WCAG 2.1 AA) — target audience skews older
- Mobile-responsive — genealogy research happens on phones and tablets
- Performance-first — target 90+ Lighthouse scores (CTO KPI)

### File Structure
```
c:\dev\GenCreator\
├── CLAUDE.md                  # This file — project instructions
├── docs/
│   ├── PRODUCT_BRIEF.md       # Synthesized product vision
│   ├── MVP_SPEC_DRAFT.md      # MVP feature specification
│   ├── ARCHITECTURE.md        # Technical architecture decisions
│   └── GOVERNANCE.md          # C-Suite oversight structure
├── src/                       # Application source code (TBD)
├── tests/                     # Test suite
└── README.md                  # Public-facing project readme
```
---

## Current Phase: Conception & Design

### What Needs to Happen Next
1. **Finalize MVP spec** (CPO task, due 2026-05-30) — define exact user flow, input fields, output format
2. **Validate with OGF audience** — test concept with 5-10 existing subscribers
3. **Architecture decision** — Astro component vs. standalone app vs. React island
4. **Prototype core flow** — user inputs → research plan generation logic
5. **CEO approval** — present validated spec for Development phase authorization

### What Has Been Decided
- GenCreator will be an OGF-embedded tool (not standalone initially)
- Target user is beginner-to-intermediate genealogist
- Revenue model: lead magnet + affiliate links + future premium tier
- Must align with SSM Astro/Vercel stack
- CTO owns technical implementation; CPO owns product spec

### What Is Still Open
- Exact input schema (what does the user enter?)
- Research plan generation approach (decision tree? knowledge graph? LLM-assisted?)
- Build vs. embed decision (Astro component vs. iframe vs. React island)
- Pricing model for premium features (if any in MVP)
- Whether GenCreator needs its own domain/brand long-term

---

## Related OGF Context

OGF uses a mission-based progressive learning system:
- **101 missions:** Beginner genealogy (where to start)
- **201 missions:** Intermediate (specific record types)
- **301 missions:** Advanced (complex research scenarios)
- **401 missions:** Expert (methodology and analysis)

OGF also provides free downloadable tools: military records field guide, immigration field guide, probate field guide, research workbooks.

GenCreator's research plans should map to this progression — a beginner gets 101-level recommendations, an experienced researcher gets 301+ guidance.

---

*Last updated: 2026-04-08*
*Created by: CTO Workstream Setup*