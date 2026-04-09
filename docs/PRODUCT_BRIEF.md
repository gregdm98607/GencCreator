# GenCreator Product Brief

> **Status:** Draft — Phase 1 Conception
> **Author:** CTO + CPO (synthesized from Obsidian vault context)
> **Date:** 2026-04-08
> **Approval required:** SSM CEO (to advance to Development)

---

## Product Vision

GenCreator is an interactive genealogy research planner that transforms the overwhelming question "Where do I start?" into a clear, prioritized action plan. Users describe what they already know about their family — names, dates, locations, records they've found — and GenCreator produces a step-by-step research plan linking them to the exact databases, record collections, and OGF educational resources they need next.

GenCreator lives on the Operation Granny Files website (operationgrannyfiles.com) as an embedded interactive tool. It serves as a lead magnet (email capture), a differentiator (no competitor offers structured research planning), and a monetization vehicle (affiliate links to genealogy databases).

---

## The Problem

Beginner and intermediate genealogists face a common frustration: they know *some* things about their family but don't know what to do next. The typical experience is:
1. **Information overload:** Ancestry, FamilySearch, MyHeritage, Newspapers.com each have millions of records. Where do you look first?
2. **No structured guidance:** YouTube tutorials and blog posts offer tips but not a personalized plan.
3. **Skill gap:** Users don't know which record types exist for their ancestor's time period and location.
4. **Wasted time:** Hours spent searching the wrong databases for records that don't exist for that era/place.

Existing tools (Ancestry hints, FamilySearch suggestions) recommend records *within their own platform*. No tool provides a cross-platform, prioritized research plan based on what the user already knows.

---

## Target User

**Primary persona:** "Curious Carol"
- Age 45-65, female (70% of genealogy hobbyists)
- Has done some family history — knows grandparents' names, maybe has a few census records
- Emotionally motivated by connection to ancestors, preserving family stories
- Overwhelmed by the next step — knows there's more to find but doesn't know where
- Willing to pay for tools that save time and reduce frustration
- Comfortable with web forms but not technical (no APIs, no GEDCOM uploads for MVP)

**Secondary persona:** "Methodical Mike"
- Age 55-70, has been doing genealogy for years
- Wants to make sure he hasn't missed anything for a specific ancestor/location
- Values thoroughness and methodology over ease-of-use
- Would use GenCreator as a checklist/audit tool
---

## Core Interaction (MVP)

**Input:** User fills out a structured form:
- Ancestor's name (required)
- Known dates (birth, marriage, death — approximate OK)
- Known locations (town, county, state, country)
- Time period (auto-derived from dates, or manually set)
- Records already found (checkboxes: census, vital records, military, immigration, etc.)
- Research goal (find more about this person / find their parents / find their children / general exploration)

**Processing:** GenCreator applies a research planning algorithm:
1. Determine geographic/temporal context (what records *exist* for this time/place?)
2. Identify record types NOT yet searched (based on user's "already found" selections)
3. Prioritize by likelihood of success and information yield
4. Match to specific databases/collections (Ancestry, FamilySearch, Newspapers.com, etc.)
5. Map to relevant OGF missions and field guides

**Output:** A prioritized research plan:
- Ordered list of 5-10 recommended next steps
- Each step includes: record type, why it matters, where to find it (with tracked affiliate links), estimated difficulty
- Links to relevant OGF missions for guidance on that record type
- Option to email the plan to yourself (email capture mechanism)
- Option to print/save as PDF
---

## Competitive Landscape

| Competitor | What They Offer | GenCreator's Advantage |
|-----------|----------------|----------------------|
| Ancestry Hints | Auto-suggested records within Ancestry | Cross-platform; not locked to one vendor |
| FamilySearch Research Wiki | Reference articles on record types by location | Personalized plan, not a reference encyclopedia |
| MyHeritage Discoveries | Auto-matching within MyHeritage database | Prioritized and contextualized, not raw matches |
| Genealogy Gems (Lisa Louise Cooke) | Podcast tips and courses | Interactive tool, not passive content |
| Local genealogy societies | In-person guidance | Available 24/7, scalable, no appointment needed |
| ChatGPT / Claude | General AI advice on genealogy | Structured, repeatable, embedded in OGF ecosystem with affiliate links |

**GenCreator's unique position:** The only tool that takes a structured input about *what you know* and produces a personalized, cross-platform, prioritized research plan. It's a *research planner*, not a *record finder*.

---

## Revenue Model

| Stream | Mechanism | Timeline |
|--------|-----------|----------|
| **Lead magnet** | "Email me my research plan" captures email → enters OGF subscriber funnel | MVP launch |
| **Affiliate revenue** | Research plans include tracked links to Ancestry, MyHeritage, Newspapers.com, FindMyPast | MVP launch (requires affiliate program approvals) |
| **OGF paid tier upsell** | Advanced GenCreator features (saved plans, multiple ancestors, deeper analysis) behind Substack paid tier | Post-MVP |
| **Standalone product** | If validated, GenCreator as its own product with premium pricing | Phase 4 evaluation |

**Revenue estimate (from Code Agent Redeployment Analysis):** $25-50/mo indirect revenue from subscriber conversion + authority. This is conservative and excludes affiliate revenue from research plan links, which could add $30-60/mo based on CRO's affiliate revenue projections for OGF.
---

## Success Metrics (MVP)

| Metric | Target | Measurement |
|--------|--------|-------------|
| Research plans generated | 100 in first 30 days | Analytics event |
| Email captures from "email my plan" | 30% of plan generations | ConvertKit/Substack tracking |
| Affiliate link clicks from plans | 15% click-through rate | UTM tracking |
| Time on GenCreator page | >3 minutes average | GA4 |
| Return visits | 20% of users return within 30 days | GA4 |
| OGF mission click-throughs from plans | 25% of plan generations include a mission click | GA4 events |

---

## Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|-----------|
| Feature creep (CPO #1 risk) | High | Delays launch, dilutes value | Strict MVP scope; CPO enforces prioritization |
| Research plans feel generic | Medium | Users don't return | Invest in the knowledge model; make recommendations specific to time/place |
| Low affiliate conversion | Medium | Revenue underperforms | Optimize link placement; test different affiliate partners |
| Users want GEDCOM import | High (demand) | Scope explosion | Explicitly out of MVP; evaluate for v2 |
| Competing with ChatGPT "just ask AI" | Medium | Users bypass GenCreator | Emphasize structured output, affiliate links, OGF integration — things raw AI doesn't provide |

---

## Open Questions for CPO/CEO

1. Should GenCreator require email before showing results, or show results freely with "email me this plan" as optional?
2. Should the MVP include a "share this plan" feature (social/link sharing)?
3. What's the right balance between free and premium features?
4. Should GenCreator reference only OGF content, or also link to external guides?
5. Is there appetite for an LLM-assisted version (user describes ancestor in natural language) vs. structured form only?

---

*Synthesized from: Code Agent Redeployment Analysis, CPO Charter, Product Portfolio Assessment, Revenue Workstream, CPO Task Board*
*Created: 2026-04-08*