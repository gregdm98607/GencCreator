import { describe, it, expect } from 'vitest';
import {
  generatePlan,
  resolveTimePeriod,
  getAvailableRecords,
  getStrategyOrder,
  getDatabasesForRecord,
  getOGFMission,
} from './planner.js';
import type { AncestorInput } from './types.js';

const SAMPLE_INPUT: AncestorInput = {
  name: 'John Smith',
  birthDate: '1850',
  birthPlace: 'New York, New York',
  deathDate: '1920',
  deathPlace: 'Brooklyn, New York',
  country: 'US',
  recordsFound: ['census'],
  researchGoal: 'find_parents',
};

describe('resolveTimePeriod', () => {
  it('derives time period from birth and death dates', () => {
    const result = resolveTimePeriod(SAMPLE_INPUT);
    expect(result.startYear).toBe(1840);
    expect(result.endYear).toBe(1930);
  });

  it('uses explicit time period when provided', () => {
    const input = { ...SAMPLE_INPUT, timePeriod: '1800-1900' };
    const result = resolveTimePeriod(input);
    expect(result.startYear).toBe(1800);
    expect(result.endYear).toBe(1900);
  });

  it('returns defaults when no dates provided', () => {
    const input: AncestorInput = {
      name: 'Unknown',
      country: 'US',
      recordsFound: [],
      researchGoal: 'general_exploration',
    };
    const result = resolveTimePeriod(input);
    expect(result.startYear).toBe(1800);
    expect(result.endYear).toBe(1950);
  });
});

describe('getAvailableRecords', () => {
  it('returns US record types for 1850-1920', () => {
    const records = getAvailableRecords('US', 1850, 1920);
    expect(records).toContain('census');
    expect(records).toContain('birth_record');
    expect(records).toContain('military');
    expect(records).toContain('immigration');
    expect(records.length).toBeGreaterThan(10);
  });

  it('returns empty for unsupported country', () => {
    const records = getAvailableRecords('JP', 1850, 1920);
    expect(records).toHaveLength(0);
  });
});

describe('getStrategyOrder', () => {
  it('returns prioritized records for find_parents', () => {
    const order = getStrategyOrder('find_parents');
    expect(order[0]).toBe('birth_record');
    expect(order[1]).toBe('census');
    expect(order.length).toBeGreaterThan(5);
  });

  it('returns empty for unknown goal', () => {
    const order = getStrategyOrder('unknown_goal');
    expect(order).toHaveLength(0);
  });
});

describe('getDatabasesForRecord', () => {
  it('finds databases for census records', () => {
    const dbs = getDatabasesForRecord('census');
    expect(dbs.length).toBeGreaterThan(0);
    const names = dbs.map((d) => d.name);
    expect(names).toContain('FamilySearch — U.S. Census');
  });

  it('finds databases for cemetery records', () => {
    const dbs = getDatabasesForRecord('cemetery');
    expect(dbs.length).toBeGreaterThan(0);
    const names = dbs.map((d) => d.name);
    expect(names).toContain('Find a Grave');
  });
});

describe('getOGFMission', () => {
  it('finds mission for census', () => {
    const mission = getOGFMission('census');
    expect(mission).not.toBeNull();
    expect(mission!.level).toBe('101');
  });

  it('returns null for dna_test (no mission)', () => {
    const mission = getOGFMission('dna_test');
    expect(mission).toBeNull();
  });
});

describe('generatePlan', () => {
  it('generates a plan with steps', () => {
    const plan = generatePlan(SAMPLE_INPUT);
    expect(plan.ancestor.name).toBe('John Smith');
    expect(plan.steps.length).toBeGreaterThan(0);
    expect(plan.steps.length).toBeLessThanOrEqual(10);
  });

  it('excludes records the user already has', () => {
    const plan = generatePlan(SAMPLE_INPUT);
    const recordTypes = plan.steps.map((s) => s.recordType);
    expect(recordTypes).not.toContain('census');
  });

  it('includes database links in each step', () => {
    const plan = generatePlan(SAMPLE_INPUT);
    for (const step of plan.steps) {
      expect(step.databases.length).toBeGreaterThan(0);
    }
  });

  it('includes disclaimer', () => {
    const plan = generatePlan(SAMPLE_INPUT);
    expect(plan.disclaimer).toBeTruthy();
  });

  it('populates ancestor summary correctly', () => {
    const plan = generatePlan(SAMPLE_INPUT);
    expect(plan.ancestor.country).toBe('US');
    expect(plan.ancestor.researchGoal).toBe('find_parents');
    expect(plan.ancestor.locations).toContain('New York, New York');
  });
});
