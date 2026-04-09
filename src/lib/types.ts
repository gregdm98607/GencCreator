/**
 * GenCreator Type Definitions
 *
 * Core interfaces for the genealogy research planner.
 * Derived from MVP_SPEC_DRAFT.md data model.
 */

// --- Input Types ---

export type RecordType =
  | 'census'
  | 'birth_record'
  | 'death_record'
  | 'marriage_record'
  | 'military'
  | 'immigration'
  | 'naturalization'
  | 'land_deed'
  | 'probate'
  | 'newspaper'
  | 'church_record'
  | 'city_directory'
  | 'cemetery'
  | 'tax_record'
  | 'school_record'
  | 'dna_test';

export type ResearchGoal =
  | 'find_parents'
  | 'find_children'
  | 'find_spouse'
  | 'find_siblings'
  | 'confirm_identity'
  | 'general_exploration'
  | 'immigration_origin'
  | 'military_service';

export interface AncestorInput {
  name: string;
  birthDate?: string;
  birthPlace?: string;
  deathDate?: string;
  deathPlace?: string;
  marriageDate?: string;
  marriagePlace?: string;
  knownLocations?: string[];
  timePeriod?: string;
  country: string;
  recordsFound: RecordType[];
  researchGoal: ResearchGoal;
}

// --- Output Types ---

export interface AncestorSummary {
  name: string;
  timePeriod: string;
  locations: string[];
  country: string;
  researchGoal: ResearchGoal;
}

export type Difficulty = 'beginner' | 'intermediate' | 'advanced';

export type AccessModel = 'free' | 'subscription' | 'pay-per-view';

export interface DatabaseLink {
  name: string;
  url: string;
  accessModel: AccessModel;
  isAffiliate: boolean;
}

export type MissionLevel = '101' | '201' | '301' | '401';

export interface OGFMissionLink {
  title: string;
  level: MissionLevel;
  url: string;
}

export interface ResearchStep {
  priority: number;
  recordType: RecordType;
  title: string;
  rationale: string;
  difficulty: Difficulty;
  databases: DatabaseLink[];
  ogfMission?: OGFMissionLink;
  tips: string[];
}

export interface ResearchPlan {
  ancestor: AncestorSummary;
  generatedDate: string;
  steps: ResearchStep[];
  ogfMissionsReferenced: string[];
  disclaimer: string;
}

// --- Knowledge Base Types ---

export interface RecordAvailabilityEntry {
  recordType: RecordType;
  country: string;
  startYear: number;
  endYear: number;
  notes?: string;
}

export interface ResearchStrategyEntry {
  goal: ResearchGoal;
  prioritizedRecords: RecordType[];
  description: string;
}

export interface DatabaseDirectoryEntry {
  id: string;
  name: string;
  baseUrl: string;
  affiliateId: string;
  utmSource: string;
  utmMedium: string;
  accessModel: AccessModel;
  recordTypes: RecordType[];
}

export interface OGFMissionEntry {
  recordType: RecordType;
  title: string;
  level: MissionLevel;
  slug: string;
}
