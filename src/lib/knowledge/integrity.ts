import type {
  AccessModel,
  Difficulty,
  MissionLevel,
  RecordType,
  ResearchGoal,
} from '../types.js';

export const RECORD_TYPES: readonly RecordType[] = [
  'census', 'birth_record', 'death_record', 'marriage_record', 'military',
  'immigration', 'naturalization', 'land_deed', 'probate', 'newspaper',
  'church_record', 'city_directory', 'cemetery', 'tax_record', 'school_record',
  'dna_test',
];

export const RESEARCH_GOALS: readonly ResearchGoal[] = [
  'find_parents', 'find_children', 'find_spouse', 'find_siblings',
  'confirm_identity', 'general_exploration', 'immigration_origin', 'military_service',
];

const ACCESS_MODELS: readonly AccessModel[] = ['free', 'subscription', 'pay-per-view'];
const MISSION_LEVELS: readonly MissionLevel[] = ['101', '201', '301', '401'];
const DIFFICULTIES: readonly Difficulty[] = ['beginner', 'intermediate', 'advanced'];

type JsonObject = Record<string, unknown>;

function isObject(value: unknown): value is JsonObject {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isString(value: unknown): value is string {
  return typeof value === 'string' && value.length > 0;
}

function has<T extends string>(values: readonly T[], value: unknown): value is T {
  return typeof value === 'string' && values.includes(value as T);
}

function add(errors: string[], condition: boolean, message: string): void {
  if (!condition) errors.push(message);
}

export interface KnowledgeBaseInput {
  recordAvailability: unknown;
  researchStrategies: unknown;
  databaseDirectory: unknown;
  ogfMissions: unknown;
}

/** Validate the knowledge graph's shape and references without network access. */
export function validateKnowledgeBase(input: KnowledgeBaseInput): string[] {
  const errors: string[] = [];
  const knownRecords = new Set(RECORD_TYPES);
  const knownGoals = new Set(RESEARCH_GOALS);

  const availability = isObject(input.recordAvailability) ? input.recordAvailability.records : undefined;
  add(errors, Array.isArray(availability), 'record-availability.records must be an array');
  const availabilityKeys = new Set<string>();
  if (Array.isArray(availability)) {
    availability.forEach((entry, index) => {
      const path = `record-availability.records[${index}]`;
      add(errors, isObject(entry), `${path} must be an object`);
      if (!isObject(entry)) return;
      add(errors, knownRecords.has(entry.recordType as RecordType), `${path}.recordType is unknown`);
      add(errors, isString(entry.country), `${path}.country must be a non-empty string`);
      add(errors, Number.isInteger(entry.startYear), `${path}.startYear must be an integer`);
      add(errors, Number.isInteger(entry.endYear), `${path}.endYear must be an integer`);
      if (Number.isInteger(entry.startYear) && Number.isInteger(entry.endYear)) {
        add(errors, (entry.startYear as number) <= (entry.endYear as number), `${path} startYear must not exceed endYear`);
        add(errors, (entry.startYear as number) >= 1500 && (entry.endYear as number) <= 2100, `${path} years are outside the supported range`);
      }
      const key = `${entry.country}|${entry.recordType}`;
      add(errors, !availabilityKeys.has(key), `${path} duplicates ${key}`);
      availabilityKeys.add(key);
    });
  }

  const strategies = isObject(input.researchStrategies) ? input.researchStrategies.strategies : undefined;
  add(errors, Array.isArray(strategies), 'research-strategies.strategies must be an array');
  const strategyGoals = new Set<string>();
  if (Array.isArray(strategies)) {
    strategies.forEach((entry, index) => {
      const path = `research-strategies.strategies[${index}]`;
      add(errors, isObject(entry), `${path} must be an object`);
      if (!isObject(entry)) return;
      add(errors, knownGoals.has(entry.goal as ResearchGoal), `${path}.goal is unknown`);
      add(errors, !strategyGoals.has(String(entry.goal)), `${path}.goal is duplicated`);
      strategyGoals.add(String(entry.goal));
      add(errors, isString(entry.description), `${path}.description must be non-empty`);
      add(errors, Array.isArray(entry.prioritizedRecords) && entry.prioritizedRecords.length > 0, `${path}.prioritizedRecords must be non-empty`);
      if (Array.isArray(entry.prioritizedRecords)) {
        const records = new Set<string>();
        entry.prioritizedRecords.forEach((record, recordIndex) => {
          add(errors, knownRecords.has(record as RecordType), `${path}.prioritizedRecords[${recordIndex}] is unknown`);
          add(errors, !records.has(String(record)), `${path}.prioritizedRecords contains a duplicate`);
          records.add(String(record));
        });
      }
    });
  }
  RESEARCH_GOALS.forEach((goal) => add(errors, strategyGoals.has(goal), `missing research strategy for ${goal}`));

  const databases = isObject(input.databaseDirectory) ? input.databaseDirectory.databases : undefined;
  add(errors, Array.isArray(databases), 'database-directory.databases must be an array');
  const databaseIds = new Set<string>();
  if (Array.isArray(databases)) {
    databases.forEach((entry, index) => {
      const path = `database-directory.databases[${index}]`;
      add(errors, isObject(entry), `${path} must be an object`);
      if (!isObject(entry)) return;
      add(errors, isString(entry.id), `${path}.id must be non-empty`);
      add(errors, !databaseIds.has(String(entry.id)), `${path}.id is duplicated`);
      databaseIds.add(String(entry.id));
      add(errors, isString(entry.name), `${path}.name must be non-empty`);
      add(errors, typeof entry.baseUrl === 'string' && /^https:\/\/[^\s]+$/.test(entry.baseUrl), `${path}.baseUrl must be an https URL`);
      add(errors, has(ACCESS_MODELS, entry.accessModel), `${path}.accessModel is invalid`);
      add(errors, Array.isArray(entry.recordTypes) && entry.recordTypes.length > 0, `${path}.recordTypes must be non-empty`);
      if (Array.isArray(entry.recordTypes)) entry.recordTypes.forEach((record) => add(errors, knownRecords.has(record as RecordType), `${path}.recordTypes contains an unknown record type`));
    });
  }

  const missions = isObject(input.ogfMissions) ? input.ogfMissions.missions : undefined;
  add(errors, Array.isArray(missions), 'ogf-missions.missions must be an array');
  const missionRecords = new Set<string>();
  if (Array.isArray(missions)) {
    missions.forEach((entry, index) => {
      const path = `ogf-missions.missions[${index}]`;
      add(errors, isObject(entry), `${path} must be an object`);
      if (!isObject(entry)) return;
      add(errors, knownRecords.has(entry.recordType as RecordType), `${path}.recordType is unknown`);
      add(errors, !missionRecords.has(String(entry.recordType)), `${path}.recordType is duplicated`);
      missionRecords.add(String(entry.recordType));
      add(errors, isString(entry.title), `${path}.title must be non-empty`);
      add(errors, has(MISSION_LEVELS, entry.level), `${path}.level is invalid`);
      add(errors, typeof entry.slug === 'string' && /^mission-\d+$/.test(entry.slug), `${path}.slug must match mission-N`);
    });
  }

  return errors;
}

