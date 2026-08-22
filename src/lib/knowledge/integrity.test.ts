import { describe, expect, it } from 'vitest';
import recordAvailability from './record-availability.json' with { type: 'json' };
import researchStrategies from './research-strategies.json' with { type: 'json' };
import databaseDirectory from './database-directory.json' with { type: 'json' };
import ogfMissions from './ogf-missions.json' with { type: 'json' };
import { validateKnowledgeBase } from './integrity.js';

const knowledgeBase = { recordAvailability, researchStrategies, databaseDirectory, ogfMissions };

describe('knowledge-base integrity', () => {
  it('accepts the production knowledge base', () => {
    expect(validateKnowledgeBase(knowledgeBase)).toEqual([]);
  });

  it('rejects invalid time ranges and duplicate references', () => {
    const invalid = structuredClone(knowledgeBase) as typeof knowledgeBase;
    invalid.recordAvailability.records[0].endYear = 1700;
    invalid.researchStrategies.strategies[0].prioritizedRecords.push('census');
    const errors = validateKnowledgeBase(invalid);
    expect(errors).toEqual(expect.arrayContaining([
      expect.stringContaining('startYear must not exceed endYear'),
      expect.stringContaining('prioritizedRecords contains a duplicate'),
    ]));
  });

  it('rejects unknown mappings and malformed URLs', () => {
    const invalid = structuredClone(knowledgeBase) as typeof knowledgeBase;
    invalid.databaseDirectory.databases[0].recordTypes = ['not_a_record'];
    invalid.databaseDirectory.databases[0].baseUrl = 'javascript:alert(1)';
    invalid.ogfMissions.missions[0].slug = 'mission-x';
    const errors = validateKnowledgeBase(invalid);
    expect(errors).toEqual(expect.arrayContaining([
      expect.stringContaining('recordTypes contains an unknown record type'),
      expect.stringContaining('baseUrl must be an https URL'),
      expect.stringContaining('slug must match mission-N'),
    ]));
  });
});

