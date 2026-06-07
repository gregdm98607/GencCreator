/**
 * AncestorForm — Input form for ancestor details.
 *
 * Collects name, dates, locations, records found, and research goal.
 * Accessible: visible labels, ARIA, keyboard navigation, 16px min text.
 */

import { useRef, useState } from 'preact/hooks';
import type { AncestorInput, RecordType, ResearchGoal } from '../lib/types.js';
import { track } from '../lib/analytics.js';

interface AncestorFormProps {
  onSubmit: (input: AncestorInput) => void;
}

const RECORD_TYPE_LABELS: Record<RecordType, string> = {
  census: 'Census records',
  birth_record: 'Birth records',
  death_record: 'Death records',
  marriage_record: 'Marriage records',
  military: 'Military records',
  immigration: 'Immigration / ship manifests',
  naturalization: 'Naturalization records',
  land_deed: 'Land / property deeds',
  probate: 'Probate / wills',
  newspaper: 'Newspaper articles',
  church_record: 'Church / parish records',
  city_directory: 'City directories',
  cemetery: 'Cemetery / burial records',
  tax_record: 'Tax records',
  school_record: 'School records',
  dna_test: 'DNA test',
};

const RESEARCH_GOAL_LABELS: Record<ResearchGoal, string> = {
  find_parents: 'Find their parents',
  find_children: 'Find their children',
  find_spouse: 'Find their spouse',
  find_siblings: 'Find their siblings',
  confirm_identity: 'Confirm identity (distinguish from others with same name)',
  general_exploration: 'General exploration (learn everything I can)',
  immigration_origin: 'Find where they immigrated from',
  military_service: 'Learn about their military service',
};

const ALL_RECORD_TYPES = Object.keys(RECORD_TYPE_LABELS) as RecordType[];
const ALL_GOALS = Object.keys(RESEARCH_GOAL_LABELS) as ResearchGoal[];

export function AncestorForm({ onSubmit }: AncestorFormProps) {
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [birthPlace, setBirthPlace] = useState('');
  const [deathDate, setDeathDate] = useState('');
  const [deathPlace, setDeathPlace] = useState('');
  const [marriageDate, setMarriageDate] = useState('');
  const [marriagePlace, setMarriagePlace] = useState('');
  const [recordsFound, setRecordsFound] = useState<RecordType[]>([]);
  const [researchGoal, setResearchGoal] = useState<ResearchGoal>('general_exploration');

  // Fire gencreator_form_started exactly once, on the user's first interaction
  // with any field. Gives B3 (form-completion rate) a denominator: started vs.
  // gencreator_plan_generated (completed).
  const startedRef = useRef(false);
  function markStarted() {
    if (startedRef.current) return;
    startedRef.current = true;
    track('gencreator_form_started');
  }

  function toggleRecord(rt: RecordType) {
    setRecordsFound((prev) =>
      prev.includes(rt) ? prev.filter((r) => r !== rt) : [...prev, rt],
    );
  }

  function handleSubmit(e: Event) {
    e.preventDefault();
    const input: AncestorInput = {
      name: name.trim(),
      birthDate: birthDate.trim() || undefined,
      birthPlace: birthPlace.trim() || undefined,
      deathDate: deathDate.trim() || undefined,
      deathPlace: deathPlace.trim() || undefined,
      marriageDate: marriageDate.trim() || undefined,
      marriagePlace: marriagePlace.trim() || undefined,
      country: 'US',
      recordsFound,
      researchGoal,
    };
    onSubmit(input);
  }

  return (
    <form
      class="gc-form"
      onSubmit={handleSubmit}
      onInput={markStarted}
      onChange={markStarted}
      aria-label="Ancestor research planner"
    >
      <h2>Tell Us What You Know</h2>
      <p class="gc-form-intro">
        Enter what you know about your ancestor and we'll create a prioritized
        research plan with links to the databases you need.
      </p>

      {/* --- About Your Ancestor --- */}
      <fieldset class="gc-fieldset">
        <legend>About Your Ancestor</legend>

        <div class="gc-field">
          <label for="gc-name">
            Ancestor's Full Name <span aria-hidden="true">*</span>
          </label>
          <input
            id="gc-name"
            type="text"
            required
            value={name}
            onInput={(e) => setName((e.target as HTMLInputElement).value)}
            placeholder="e.g. John William Smith"
            aria-required="true"
          />
        </div>

        <div class="gc-row">
          <div class="gc-field">
            <label for="gc-birth-date">Birth Date</label>
            <span class="gc-hint">Approximate is fine: "about 1850" or "1845-1855"</span>
            <input
              id="gc-birth-date"
              type="text"
              value={birthDate}
              onInput={(e) => setBirthDate((e.target as HTMLInputElement).value)}
              placeholder="e.g. 1850"
            />
          </div>
          <div class="gc-field">
            <label for="gc-birth-place">Birth Place</label>
            <span class="gc-hint">As specific as you know</span>
            <input
              id="gc-birth-place"
              type="text"
              value={birthPlace}
              onInput={(e) => setBirthPlace((e.target as HTMLInputElement).value)}
              placeholder="e.g. New York, New York"
            />
          </div>
        </div>

        <div class="gc-row">
          <div class="gc-field">
            <label for="gc-death-date">Death Date</label>
            <input
              id="gc-death-date"
              type="text"
              value={deathDate}
              onInput={(e) => setDeathDate((e.target as HTMLInputElement).value)}
              placeholder="e.g. 1920"
            />
          </div>
          <div class="gc-field">
            <label for="gc-death-place">Death Place</label>
            <input
              id="gc-death-place"
              type="text"
              value={deathPlace}
              onInput={(e) => setDeathPlace((e.target as HTMLInputElement).value)}
              placeholder="e.g. Brooklyn, New York"
            />
          </div>
        </div>

        <div class="gc-row">
          <div class="gc-field">
            <label for="gc-marriage-date">Marriage Date</label>
            <input
              id="gc-marriage-date"
              type="text"
              value={marriageDate}
              onInput={(e) => setMarriageDate((e.target as HTMLInputElement).value)}
              placeholder="e.g. 1875"
            />
          </div>
          <div class="gc-field">
            <label for="gc-marriage-place">Marriage Place</label>
            <input
              id="gc-marriage-place"
              type="text"
              value={marriagePlace}
              onInput={(e) => setMarriagePlace((e.target as HTMLInputElement).value)}
              placeholder="e.g. Manhattan, New York"
            />
          </div>
        </div>
      </fieldset>

      {/* --- Records Already Found --- */}
      <fieldset class="gc-fieldset">
        <legend>Records You've Already Found</legend>
        <p class="gc-hint" style={{ marginTop: 0 }}>
          Check any records you've already searched so we don't recommend them again.
        </p>
        <div class="gc-checkbox-grid" role="group" aria-label="Records already found">
          {ALL_RECORD_TYPES.map((rt) => (
            <div class="gc-checkbox-item" key={rt}>
              <input
                type="checkbox"
                id={`gc-rec-${rt}`}
                checked={recordsFound.includes(rt)}
                onChange={() => toggleRecord(rt)}
              />
              <label for={`gc-rec-${rt}`}>{RECORD_TYPE_LABELS[rt]}</label>
            </div>
          ))}
        </div>
      </fieldset>

      {/* --- Research Goal --- */}
      <fieldset class="gc-fieldset">
        <legend>What's Your Research Goal?</legend>
        <div class="gc-radio-grid" role="radiogroup" aria-label="Research goal">
          {ALL_GOALS.map((goal) => (
            <div class="gc-radio-item" key={goal}>
              <input
                type="radio"
                id={`gc-goal-${goal}`}
                name="researchGoal"
                value={goal}
                checked={researchGoal === goal}
                onChange={() => setResearchGoal(goal)}
              />
              <label for={`gc-goal-${goal}`}>{RESEARCH_GOAL_LABELS[goal]}</label>
            </div>
          ))}
        </div>
      </fieldset>

      <button type="submit" class="gc-submit" disabled={!name.trim()}>
        Generate My Research Plan
      </button>
    </form>
  );
}
