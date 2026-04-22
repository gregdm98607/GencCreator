# GenCreator Data Model — CTO Decision Record

> **Decision:** APPROVED
> **Date:** 2026-04-16
> **Author:** CTO (Shared Services)
> **Status:** Final — data model implemented in `src/lib/types.ts` and knowledge base JSON files

---

## Decision

The GenCreator MVP data model is confirmed as implemented during the prototype phase. The TypeScript interfaces in `src/lib/types.ts` define the complete input/output contract. The four knowledge base JSON files provide the static data layer. No schema changes are required to proceed to Phase 2.

## Schema Overview

### Input Layer
| Interface | Purpose | Key Fields |
|-----------|---------|------------|
| `AncestorInput` | User form submission | name, dates, places, country, recordsFound[], researchGoal |
| `RecordType` | 16 genealogical record categories | census through dna_test |
| `ResearchGoal` | 8 research objectives | find_parents through military_service |

### Output Layer
| Interface | Purpose | Key Fields |
|-----------|---------|------------|
| `ResearchPlan` | Complete plan response | ancestor summary, steps[], disclaimer |
| `ResearchStep` | Individual research action | priority, recordType, title, rationale, databases[], tips[] |
| `DatabaseLink` | Trackable link to a resource | name, url, accessModel, isAffiliate |
| `OGFMissionLink` | Cross-reference to OGF content | title, level (101-401), url |

### Knowledge Base Layer
| Interface | JSON File | Purpose |
|-----------|-----------|---------|
| `RecordAvailabilityEntry` | record-availability.json | Country + time period → available record types |
| `ResearchStrategyEntry` | research-strategies.json | Research goal → prioritized record sequences |
| `DatabaseDirectoryEntry` | database-directory.json | Record type → databases with affiliate info |
| `OGFMissionEntry` | ogf-missions.json | Record type → OGF mission content links |

## MVP Scope Constraints

- **Geography:** US only (backlog: UK, Canada, Ireland, Germany)
- **Time period:** 1790–1950 (covers federal census era through mid-20th century)
- **Storage:** Stateless — no user data persisted; no database required
- **Knowledge base:** Static JSON; manually maintained; no external API dependencies

## Implementation Status

| Artifact | Path | Status |
|----------|------|--------|
| TypeScript interfaces | `src/lib/types.ts` | Complete (134 lines, all interfaces defined) |
| Record availability data | `src/lib/knowledge/record-availability.json` | Populated (US records, 1790-1950) |
| Research strategies data | `src/lib/knowledge/research-strategies.json` | Populated (8 goal types mapped) |
| Database directory data | `src/lib/knowledge/database-directory.json` | Populated (affiliate IDs TBD pending approvals) |
| OGF missions data | `src/lib/knowledge/ogf-missions.json` | Populated (linked to existing OGF mission content) |

## Open Items for Phase 2+

- Affiliate IDs in database-directory.json are placeholder ("TBD") — blocked on affiliate program approvals (Greg/CRO)
- `ExperienceLevel` type (beginner/intermediate/expert) from Prototype_Core_Flow is not yet in types.ts — CPO to decide if this enters the MVP spec during Phase 2 refinement
- Place name autocomplete data source not yet selected — CTO to evaluate during Phase 3 build

---

*This decision confirms the data model already implemented during prototype phase (2026-04-08 through 2026-04-11).*
*See also: [[ARCHITECTURE]] | [[MVP_SPEC_DRAFT]] | [[TECH_STACK_DECISION]]*
