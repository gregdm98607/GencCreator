/**
 * Priority scoring algorithm for research plan steps.
 */

import type { Difficulty, RecordType, ResearchGoal } from '../types.js';

export interface ScoreResult {
  score: number;
  difficulty: Difficulty;
}

/**
 * Score a record type for prioritization in the research plan.
 *
 * Higher scores = higher priority. Factors:
 * - Base priority from strategy order (position in the goal's prioritized list)
 * - Accessibility bonus (free sources score higher)
 */
export function scoreRecord(
  recordType: RecordType,
  goal: ResearchGoal,
  strategyIndex: number,
  databases: { accessModel: string }[],
): ScoreResult {
  // Base score: higher for records earlier in the strategy order
  const baseScore = 100 - strategyIndex * 10;

  // Accessibility bonus: +10 if any free database covers this record
  const hasFreeSource = databases.some((db) => db.accessModel === 'free');
  const accessibilityBonus = hasFreeSource ? 10 : 0;

  const score = baseScore + accessibilityBonus;

  // Difficulty assignment based on record type complexity
  const difficulty = getRecordDifficulty(recordType);

  return { score, difficulty };
}

const ADVANCED_RECORDS: RecordType[] = [
  'naturalization',
  'land_deed',
  'probate',
  'church_record',
  'tax_record',
];

const BEGINNER_RECORDS: RecordType[] = [
  'census',
  'cemetery',
  'dna_test',
  'newspaper',
];

function getRecordDifficulty(recordType: RecordType): Difficulty {
  if (BEGINNER_RECORDS.includes(recordType)) return 'beginner';
  if (ADVANCED_RECORDS.includes(recordType)) return 'advanced';
  return 'intermediate';
}
