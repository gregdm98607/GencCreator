/**
 * ResearchStepCard — Individual step in the research plan.
 *
 * Shows step number, title, rationale, difficulty badge,
 * database links with access model badges, OGF mission link, and tips.
 */

import type { ResearchStep } from '../lib/types.js';
import { track } from '../lib/analytics.js';

interface ResearchStepCardProps {
  step: ResearchStep;
}

export function ResearchStepCard({ step }: ResearchStepCardProps) {
  const mission = step.ogfMission;
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
      <div class="gc-databases" role="group" aria-label="Where to search">
        {step.databases.map((db) => (
          <a
            key={db.name}
            href={db.url}
            class="gc-db-link"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              track('gencreator_affiliate_click', {
                database: db.name,
                record_type: step.recordType,
                access_model: db.accessModel,
                is_affiliate: db.isAffiliate,
              })
            }
          >
            {db.name}
            <span class={`gc-badge gc-badge-${db.accessModel}`}>
              {db.accessModel}
            </span>
          </a>
        ))}
      </div>

      {/* OGF Mission link */}
      {mission && (
        <div>
          <a
            href={mission.url}
            class="gc-mission-link"
            onClick={() =>
              track('gencreator_mission_click', {
                mission_title: mission.title,
                mission_level: mission.level,
                record_type: step.recordType,
              })
            }
          >
            OGF Mission: {mission.title} ({mission.level})
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
