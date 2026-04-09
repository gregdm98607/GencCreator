/**
 * GenCreator — Main Preact island component.
 *
 * Manages state between the input form and research plan output.
 * This is the top-level component hydrated as an Astro island.
 */

import { useState } from 'preact/hooks';
import type { AncestorInput, ResearchPlan } from '../lib/types.js';
import { generatePlan } from '../lib/planner.js';
import { AncestorForm } from './AncestorForm.js';
import { ResearchPlanView } from './ResearchPlan.js';

export function GenCreator() {
  const [plan, setPlan] = useState<ResearchPlan | null>(null);

  function handleSubmit(input: AncestorInput) {
    const result = generatePlan(input);
    setPlan(result);
  }

  function handleReset() {
    setPlan(null);
  }

  return (
    <div class="gencreator">
      {plan === null ? (
        <AncestorForm onSubmit={handleSubmit} />
      ) : (
        <ResearchPlanView plan={plan} onReset={handleReset} />
      )}
    </div>
  );
}
