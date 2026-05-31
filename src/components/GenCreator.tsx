/**
 * GenCreator — Main Preact island component.
 *
 * Manages state between the input form and research plan output.
 * This is the top-level component hydrated as an Astro island.
 */

import { useState, useRef, useEffect } from 'preact/hooks';
import type { AncestorInput, ResearchPlan } from '../lib/types.js';
import { generatePlan } from '../lib/planner.js';
import { track, hashName } from '../lib/analytics.js';
import { AncestorForm } from './AncestorForm.js';
import { ResearchPlanView } from './ResearchPlan.js';

export function GenCreator() {
  const [plan, setPlan] = useState<ResearchPlan | null>(null);
  const planRef = useRef<HTMLDivElement>(null);

  function handleSubmit(input: AncestorInput) {
    const result = generatePlan(input);
    setPlan(result);
    track('gencreator_plan_generated', {
      research_goal: input.researchGoal,
      step_count: result.steps.length,
      name_hash: hashName(input.name),
    });
  }

  function handleReset() {
    setPlan(null);
  }

  // Scroll to plan when it appears
  useEffect(() => {
    if (plan && planRef.current) {
      planRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [plan]);

  return (
    <div class="gencreator">
      {plan === null ? (
        <AncestorForm onSubmit={handleSubmit} />
      ) : (
        <div ref={planRef}>
          <ResearchPlanView plan={plan} onReset={handleReset} />
        </div>
      )}
    </div>
  );
}
