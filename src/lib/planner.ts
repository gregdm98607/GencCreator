/**
 * Core plan generation algorithm.
 *
 * Takes an AncestorInput and produces a prioritized ResearchPlan
 * by cross-referencing the knowledge base files.
 */

import type {
  AncestorInput,
  ResearchPlan,
  ResearchStep,
  RecordType,
} from './types.js';
import { scoreRecord } from './utils/scoring.js';
import { buildAffiliateUrl } from './utils/affiliate.js';
import recordAvailability from './knowledge/record-availability.json' with { type: 'json' };
import researchStrategies from './knowledge/research-strategies.json' with { type: 'json' };
import databaseDirectory from './knowledge/database-directory.json' with { type: 'json' };
import ogfMissions from './knowledge/ogf-missions.json' with { type: 'json' };

const DEFAULT_DISCLAIMER =
  'This research plan is a starting point based on what you told us. Actual record availability may vary by specific location and time period.';

const MAX_STEPS = 10;

/**
 * Parse a time period string or date inputs into a numeric range.
 */
export function resolveTimePeriod(input: AncestorInput): {
  startYear: number;
  endYear: number;
} {
  if (input.timePeriod) {
    const match = input.timePeriod.match(/(\d{4})\s*-\s*(\d{4})/);
    if (match) {
      return { startYear: parseInt(match[1]), endYear: parseInt(match[2]) };
    }
  }

  const years: number[] = [];
  for (const dateStr of [
    input.birthDate,
    input.deathDate,
    input.marriageDate,
  ]) {
    if (dateStr) {
      const match = dateStr.match(/(\d{4})/);
      if (match) years.push(parseInt(match[1]));
    }
  }

  if (years.length > 0) {
    const min = Math.min(...years);
    const max = Math.max(...years);
    return { startYear: min - 10, endYear: max + 10 };
  }

  return { startYear: 1800, endYear: 1950 };
}

/**
 * Get record types available for a given country and time period.
 */
export function getAvailableRecords(
  country: string,
  startYear: number,
  endYear: number,
): RecordType[] {
  return recordAvailability.records
    .filter(
      (r) =>
        r.country === country &&
        r.startYear <= endYear &&
        r.endYear >= startYear,
    )
    .map((r) => r.recordType as RecordType);
}

/**
 * Get the prioritized record sequence for a given research goal.
 */
export function getStrategyOrder(goal: string): RecordType[] {
  const strategy = researchStrategies.strategies.find(
    (s) => s.goal === goal,
  );
  return (strategy?.prioritizedRecords ?? []) as RecordType[];
}

/**
 * Find databases that cover a given record type.
 */
export function getDatabasesForRecord(recordType: RecordType) {
  return databaseDirectory.databases.filter((db) =>
    db.recordTypes.includes(recordType),
  );
}

/**
 * Find the OGF mission for a given record type, if one exists.
 */
export function getOGFMission(recordType: RecordType) {
  return ogfMissions.missions.find((m) => m.recordType === recordType) ?? null;
}

/**
 * Generate a research plan from ancestor input.
 */
export function generatePlan(input: AncestorInput): ResearchPlan {
  const { startYear, endYear } = resolveTimePeriod(input);
  const available = getAvailableRecords(input.country, startYear, endYear);
  const strategyOrder = getStrategyOrder(input.researchGoal);

  // Filter to records that are available AND not already found
  const candidates = strategyOrder.filter(
    (rt) => available.includes(rt) && !input.recordsFound.includes(rt),
  );

  // Score and build steps
  const steps: ResearchStep[] = candidates
    .slice(0, MAX_STEPS)
    .map((recordType, index) => {
      const databases = getDatabasesForRecord(recordType).map((db) => ({
        name: db.name,
        url: buildAffiliateUrl(db.baseUrl, db.affiliateId, db.utmSource, db.utmMedium, recordType),
        accessModel: db.accessModel as 'free' | 'subscription' | 'pay-per-view',
        isAffiliate: db.affiliateId !== '' && db.affiliateId !== 'TBD',
      }));

      const mission = getOGFMission(recordType);
      const score = scoreRecord(recordType, input.researchGoal, index, databases);

      return {
        priority: index + 1,
        recordType,
        title: buildStepTitle(recordType, startYear, endYear),
        rationale: buildRationale(recordType, input.researchGoal),
        difficulty: score.difficulty,
        databases,
        ogfMission: mission
          ? {
              title: mission.title,
              level: mission.level as '101' | '201' | '301' | '401',
              url: `https://operationgrannyfiles.com/missions/${mission.slug}`,
            }
          : undefined,
        tips: buildTips(recordType, startYear, endYear),
      };
    });

  const locations = [
    input.birthPlace,
    input.deathPlace,
    input.marriagePlace,
    ...(input.knownLocations ?? []),
  ].filter((l): l is string => !!l);

  return {
    ancestor: {
      name: input.name,
      timePeriod: `${startYear}-${endYear}`,
      locations,
      country: input.country,
      researchGoal: input.researchGoal,
    },
    generatedDate: new Date().toISOString().split('T')[0],
    steps,
    ogfMissionsReferenced: steps
      .map((s) => s.ogfMission?.url)
      .filter((u): u is string => !!u),
    disclaimer: DEFAULT_DISCLAIMER,
  };
}

// --- Helpers (to be expanded with real genealogical knowledge) ---

const RECORD_LABELS: Record<string, string> = {
  census: 'U.S. Federal Census',
  birth_record: 'Birth Records',
  death_record: 'Death Records',
  marriage_record: 'Marriage Records',
  military: 'Military Records',
  immigration: 'Immigration Records (Ship Manifests)',
  naturalization: 'Naturalization Records',
  land_deed: 'Land & Property Records',
  probate: 'Probate Records (Wills & Estates)',
  newspaper: 'Historical Newspapers',
  church_record: 'Church & Parish Records',
  city_directory: 'City Directories',
  cemetery: 'Cemetery & Burial Records',
  tax_record: 'Tax Records',
  school_record: 'School Records',
};

function buildStepTitle(
  recordType: RecordType,
  startYear: number,
  endYear: number,
): string {
  const label = RECORD_LABELS[recordType] ?? recordType;
  return `Search ${label} (${startYear}-${endYear})`;
}

function buildRationale(recordType: RecordType, goal: string): string {
  // Stub — will be expanded with goal-specific rationales
  const label = RECORD_LABELS[recordType] ?? recordType;
  return `${label} for this time period and location may contain information relevant to your research goal.`;
}

function buildTips(
  recordType: RecordType,
  startYear: number,
  endYear: number,
): string[] {
  // Stub — will be expanded with record-specific tips
  const tips: string[] = [];
  if (recordType === 'census' && startYear <= 1890 && endYear >= 1890) {
    tips.push(
      'The 1890 census was largely destroyed by fire. Use city directories and tax records to fill the gap.',
    );
  }
  if (recordType === 'naturalization' && startYear < 1906) {
    tips.push(
      'Pre-1906 naturalization records are not standardized and could be filed in any court.',
    );
  }
  return tips;
}
