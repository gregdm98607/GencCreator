/**
 * ResearchStepCard — Individual step in the research plan.
 *
 * Shows step number, title, rationale, difficulty badge,
 * database links with access model badges, OGF mission link, and tips.
 */

import type { ResearchStep } from '../lib/types.js';

interface ResearchStepCardProps {
  step: ResearchStep;
}

export function ResearchStepCard({ step }: ResearchStepCardProps) {
  return (
    <div class="gc-step">
      <div class="gc-step-header">
        <span class="gc-step-number" aria-hidden="true">
          {step.priority}
        </span>
        <h3 class="gc-step-title">{step.title}</h3>
        <span class={`gc-badge gc-badge-${step.difficulty}`}>
          {step.difficulty}
        </span>
      </div>

      <p class="gc-step-rationale">{step.rationale}</p>

      {/* Database links */}
      <div class="gc-databases" aria-label="Where to search">
        {step.databases.map((db) => (
          <a
            key={db.name}
            href={db.url}
            class="gc-db-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            {db.name}
            <span class={`gc-badge gc-badge-${db.accessModel}`}>
              {db.accessModel}
            </span>
          </a>
        ))}
      </div>

      {/* OGF Mission link */}
      {step.ogfMission && (
        <div>
          <a href={step.ogfMission.url} class="gc-mission-link">
            OGF Mission: {step.ogfMission.title} ({step.ogfMission.level})
          </a>
        </div>
      )}

      {/* Tips */}
      {step.tips.length > 0 && (
        <ul class="gc-tips" aria-label="Tips for this step">
          {step.tips.map((tip, i) => (
            <li key={i} class="gc-tip">
              {tip}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
