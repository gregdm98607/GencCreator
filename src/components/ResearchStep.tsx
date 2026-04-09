/**
 * ResearchStepCard — Individual step in the research plan.
 *
 * Stub — UI to be implemented in Phase E.
 */

import type { ResearchStep } from '../lib/types.js';

interface ResearchStepCardProps {
  step: ResearchStep;
}

export function ResearchStepCard({ step }: ResearchStepCardProps) {
  return (
    <div class="research-step">
      <h3>
        {step.priority}. {step.title}
      </h3>
      <p>{step.rationale}</p>
      <span class="difficulty">{step.difficulty}</span>
      {step.databases.map((db) => (
        <a key={db.name} href={db.url} target="_blank" rel="noopener noreferrer">
          {db.name} ({db.accessModel})
        </a>
      ))}
      {step.ogfMission && (
        <a href={step.ogfMission.url}>
          OGF Mission: {step.ogfMission.title} ({step.ogfMission.level})
        </a>
      )}
    </div>
  );
}
