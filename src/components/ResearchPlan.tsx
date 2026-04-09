/**
 * ResearchPlanView — Displays the generated research plan.
 *
 * Renders the prioritized list of research steps with database links.
 * Stub — UI to be implemented in Phase E.
 */

import type { ResearchPlan } from '../lib/types.js';
import { ResearchStepCard } from './ResearchStep.js';

interface ResearchPlanViewProps {
  plan: ResearchPlan;
  onReset: () => void;
}

export function ResearchPlanView({ plan, onReset }: ResearchPlanViewProps) {
  return (
    <div class="research-plan">
      <h2>Your Research Plan for {plan.ancestor.name}</h2>
      <p>
        {plan.ancestor.timePeriod} &middot; {plan.ancestor.locations.join(', ')}
      </p>
      <ol>
        {plan.steps.map((step) => (
          <li key={step.priority}>
            <ResearchStepCard step={step} />
          </li>
        ))}
      </ol>
      <p class="disclaimer">{plan.disclaimer}</p>
      <button type="button" onClick={onReset}>
        Start Over
      </button>
    </div>
  );
}
