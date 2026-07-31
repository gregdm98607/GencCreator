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
  ResearchGoal,
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
              url: `https://operationgrannyfiles.com/blog/${mission.slug}/`,
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

// --- Step content builders (grounded in the knowledge base + standard US research methodology) ---

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

/**
 * What each record type contains and why it is genealogically valuable.
 * Forms the base sentence of a step's rationale.
 */
const RECORD_RATIONALE: Record<RecordType, string> = {
  census:
    "The federal census enumerates the whole household together every ten years, capturing names, ages, birthplaces, relationships, and occupations.",
  birth_record:
    "A birth record names the child's parents (including the mother's maiden name) with the exact date and place - primary evidence created at the event itself.",
  death_record:
    "Death records frequently name the deceased's parents, spouse, and birth details, linking one generation to the next at the end of a life.",
  marriage_record:
    "A marriage record confirms the couple, the date and place of the union, and often the names of both sets of parents and the witnesses.",
  military:
    "Military service, pension, and draft records can reveal physical descriptions, residences, and next of kin - and pension files often carry detailed family and marriage proof.",
  immigration:
    "Passenger manifests record the ship, the port and date of arrival, the town of origin, and the relative the immigrant was leaving or joining.",
  naturalization:
    "Naturalization papers can state the immigrant's birth date and place and arrival details - and, after 1906, name the spouse and children.",
  land_deed:
    "Land and property records place an ancestor in a precise location at a precise time and can name heirs, neighbors, and relationships in a transfer.",
  probate:
    "Probate records - wills, inventories, and estate files - name heirs and their relationships, making them one of the strongest sources for proving family ties.",
  newspaper:
    "Newspapers carry obituaries, marriage and birth announcements, and local news that name relatives and bridge the gaps between official records.",
  church_record:
    "Church registers of baptism, marriage, and burial often predate civil registration and name parents, sponsors, and witnesses.",
  city_directory:
    "City directories place a person at a street address year by year, helping you track moves, occupations, and - by their absence - an approximate death or departure.",
  cemetery:
    "Cemetery and burial records, including headstones and sexton books, supply death dates and frequently cluster family members in adjoining plots.",
  tax_record:
    "Tax lists place an ancestor in a county year by year, useful for tracking presence and property in the years between censuses.",
  school_record:
    "School census and enrollment records can establish a child's age, residence, and family in years when other records are thin.",
  dna_test:
    "DNA testing connects you with genetic relatives and can confirm - or overturn - a paper-trail hypothesis about a relationship.",
};

/**
 * Goal-specific guidance appended to the base rationale: what to look for in
 * this record given the user's stated objective.
 */
const GOAL_CONNECTOR: Record<ResearchGoal, string> = {
  find_parents:
    "Look for any detail that names an older generation - parents, in-laws, or the informant - to extend the tree backward.",
  find_children:
    "Watch for younger household members and named heirs that point to this person's children.",
  find_spouse:
    "Note spouses, witnesses, and shared households that help confirm a marriage.",
  find_siblings:
    "Compare households, witnesses, and shared parents to surface brothers and sisters.",
  confirm_identity:
    "Cross-check the names, dates, and places here against what you already know to make sure you have the right person.",
  general_exploration:
    "Every detail adds context - residences, occupations, and relationships that flesh out the family story.",
  immigration_origin:
    "Focus on any birthplace, last-residence, or port detail that points back toward the homeland.",
  military_service:
    "Capture the unit, rank, and service dates that document this person's military record.",
};

/**
 * High-value (goal x record) pairs where the record is THE source for that
 * goal. Overrides the generic base + connector with a sharper sentence.
 */
const RATIONALE_OVERRIDES: Partial<
  Record<ResearchGoal, Partial<Record<RecordType, string>>>
> = {
  find_parents: {
    birth_record:
      "A birth record names the parents directly - when one survives for your ancestor, it is the single best proof of parentage.",
    census:
      "For a child still living at home, the census is often the fastest way to see candidate parents, their ages, and birthplaces in one place.",
    death_record:
      "Death certificates frequently name the deceased's father and mother, a key parent-finding source when no birth record survives.",
    probate:
      "A parent's will or estate file that names this person as a child is powerful evidence of the parent-child link.",
  },
  find_children: {
    census:
      "Successive censuses show children appearing and aging in the household - the most efficient way to assemble a list of children.",
    probate:
      "A will or estate distribution typically names the surviving children and their relationships.",
  },
  find_spouse: {
    marriage_record:
      "A marriage record is direct, primary evidence of a spouse, the date, and the place of the union.",
  },
  immigration_origin: {
    immigration:
      "Manifests (especially 1892 and later) record the town of origin and last residence - the most direct evidence of where your ancestor came from.",
    naturalization:
      "After 1906, naturalization files state the exact birthplace and arrival details, often pinpointing the place of origin.",
  },
  military_service: {
    military:
      "Service and pension files are the core record of military service - and pension files often prove family relationships as a bonus.",
  },
};

function buildRationale(recordType: RecordType, goal: ResearchGoal): string {
  const override = RATIONALE_OVERRIDES[goal]?.[recordType];
  if (override) return override;

  const base =
    RECORD_RATIONALE[recordType] ??
    `${RECORD_LABELS[recordType] ?? recordType} can contain information relevant to your research.`;
  const connector = GOAL_CONNECTOR[goal];
  return connector ? `${base} ${connector}` : base;
}

/**
 * Practical, record-specific search tips. Base tips per record type, with
 * time-sensitive additions layered on for certain year ranges.
 */
const RECORD_TIPS: Record<RecordType, string[]> = {
  census: [
    "Search every census year your ancestor was alive - each is a ten-year snapshot of the whole household.",
    "When a surname search fails, try first name plus approximate age and location; enumerators spelled names by ear.",
  ],
  birth_record: [
    "Mandatory state birth registration mostly began between 1880 and 1920 - for earlier births, look to church baptisms or county records.",
  ],
  death_record: [
    "The informant (often a grieving relative) shapes a death record's accuracy - note who supplied the information.",
    "Death records may name the undertaker; the funeral home can hold additional family detail.",
  ],
  marriage_record: [
    "Check the county where the bride lived and the county where the groom lived - the license and the return may be filed separately.",
    "Church marriage records can predate civil registration; look there for earlier unions.",
  ],
  military: [
    "Look for pension files, not just service records - pensions usually carry the richest family detail.",
    "Match the conflict to your ancestor's age (Civil War 1861-1865, WWI 1917-1918, WWII 1941-1945) to find the right record set.",
  ],
  immigration: [
    "Identify the likely port - Castle Garden (1855-1890) or Ellis Island (1892 onward) - to target the right manifests.",
    "Manifests after 1906 ask far more, including the relative left behind and the person being joined.",
  ],
  naturalization: [
    "Citizenship was a two-step process: a Declaration of Intent, then a Petition years later - search for both papers.",
  ],
  land_deed: [
    "Deeds are indexed two ways, by grantor (seller) and grantee (buyer) - search both indexes.",
    "A sale to the 'heirs of' someone, or among family members, can reveal relationships.",
  ],
  probate: [
    "Read the whole estate packet, not just the will - inventories, receipts, and guardianship papers name family.",
    "No will does not mean no probate; intestate estates still generate records that name heirs.",
  ],
  newspaper: [
    "Start with the obituary - it often names survivors, residences, and a woman's maiden name.",
    "Try several spellings and nearby towns; small papers covered the surrounding communities.",
  ],
  church_record: [
    "Identify the family's denomination and congregation to find the right register.",
    "Baptism sponsors and marriage witnesses were frequently relatives - record their names too.",
  ],
  city_directory: [
    "Use directories to bridge the years between censuses and to pin down exact addresses.",
    "A 'widow of' entry, or a sudden disappearance, can flag the year a spouse died.",
  ],
  cemetery: [
    "Note who is buried nearby - families often share a plot or lie in adjoining graves.",
    "Treat carved headstone dates with care; cross-check them against death records.",
  ],
  tax_record: [
    "A man's first appearance on a tax list often marks when he came of age or arrived in the county.",
    "Tax rolls help place an ancestor between census years and hint at land ownership.",
  ],
  school_record: [
    "Some states ran school censuses that list every child in a household - useful between federal census years.",
  ],
  dna_test: [
    "Test the oldest living generation first; they carry DNA segments younger relatives may have already lost.",
    "Use DNA matches alongside records - DNA suggests a relationship, documents prove it.",
  ],
};

function buildTips(
  recordType: RecordType,
  startYear: number,
  endYear: number,
): string[] {
  const tips: string[] = [...(RECORD_TIPS[recordType] ?? [])];

  // Time-sensitive additions, layered on top of the record's base tips.
  if (recordType === 'census') {
    if (startYear <= 1890 && endYear >= 1890) {
      tips.push(
        "The 1890 federal census was largely destroyed by fire - bridge the 1880-1900 gap with state censuses, city directories, and tax lists.",
      );
    }
    if (startYear < 1850) {
      tips.push(
        "Before 1850 the census names only the head of household and counts everyone else by age and sex - pair it with other records to identify individuals.",
      );
    }
  }
  if (recordType === 'naturalization' && startYear < 1906) {
    tips.push(
      "Pre-1906 naturalizations were not standardized and could be filed in any federal, state, or county court - widen your search.",
    );
  }
  if (recordType === 'immigration' && startYear < 1820) {
    tips.push(
      "Federal passenger lists begin in 1820; for earlier arrivals, look to colonial and published immigration records.",
    );
  }
  if (recordType === 'death_record' && endYear < 1910) {
    tips.push(
      "Statewide death registration was spotty before about 1910 in many states - check county and church burial records as well.",
    );
  }

  return tips;
}
