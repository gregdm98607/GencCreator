import { describe, it, expect } from 'vitest';
import { scoreRecord } from './scoring.js';

describe('scoreRecord', () => {
  it('gives higher score to earlier strategy positions', () => {
    const first = scoreRecord('census', 'find_parents', 0, []);
    const fifth = scoreRecord('probate', 'find_parents', 4, []);
    expect(first.score).toBeGreaterThan(fifth.score);
  });

  it('gives accessibility bonus for free sources', () => {
    const withFree = scoreRecord('census', 'general_exploration', 0, [
      { accessModel: 'free' },
    ]);
    const withoutFree = scoreRecord('census', 'general_exploration', 0, [
      { accessModel: 'subscription' },
    ]);
    expect(withFree.score).toBeGreaterThan(withoutFree.score);
  });

  it('assigns beginner difficulty to census', () => {
    const result = scoreRecord('census', 'general_exploration', 0, []);
    expect(result.difficulty).toBe('beginner');
  });

  it('assigns advanced difficulty to probate', () => {
    const result = scoreRecord('probate', 'general_exploration', 0, []);
    expect(result.difficulty).toBe('advanced');
  });

  it('assigns intermediate difficulty to birth_record', () => {
    const result = scoreRecord('birth_record', 'general_exploration', 0, []);
    expect(result.difficulty).toBe('intermediate');
  });
});
