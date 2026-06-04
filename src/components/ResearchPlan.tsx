/**
 * ResearchPlanView — Displays the generated research plan.
 *
 * Renders ancestor summary, prioritized step cards, email capture,
 * and action bar (start over, print).
 */

import type { ResearchPlan } from '../lib/types.js';
import { track } from '../lib/analytics.js';
import { ResearchStepCard } from './ResearchStep.js';
import { EmailCapture } from './EmailCapture.js';

interface ResearchPlanViewProps {
  plan: ResearchPlan;
  onReset: () => void;
}

const GOAL_LABELS: Record<string, string> = {
  find_parents: 'Find parents',
  find_children: 'Find children',
  find_spouse: 'Find spouse',
  find_siblings: 'Find siblings',
  confirm_identity: 'Confirm identity',
  general_exploration: 'General exploration',
  immigration_origin: 'Find immigration origin',
  military_service: 'Military service research',
};

export function ResearchPlanView({ plan, onReset }: ResearchPlanViewProps) {
  function handlePrint() {
    track('gencreator_print', {
      research_goal: plan.ancestor.researchGoal,
      step_count: plan.steps.length,
    });
    window.print();
  }

  return (
    <div class="gc-plan" role="region" aria-label="Research plan results">
      {/* --- Header --- */}
      <div class="gc-plan-header">
        <h2>Research Plan for {plan.ancestor.name}</h2>
        <p class="gc-plan-meta">
          <span>{plan.ancestor.timePeriod}</span>
          {plan.ancestor.locations.length > 0 && (
            <span>{plan.ancestor.locations.join(', ')}</span>
          )}
          <span>Goal: {GOAL_LABELS[plan.ancestor.researchGoal] ?? plan.ancestor.researchGoal}</span>
        </p>
        <p class="gc-plan-meta">
          Generated {plan.generatedDate} &middot; {plan.steps.length} recommended steps
        </p>
      </div>

      {/* --- Steps --- */}
      <ol class="gc-steps" aria-label="Research steps">
        {plan.steps.map((step) => (
          <li key={step.priority}>
            <ResearchStepCard step={step} />
          </li>
        ))}
      </ol>

      {/* --- Email Capture --- */}
      <EmailCapture plan={plan} />

      {/* --- Disclaimer & Disclosure --- */}
      <p class="gc-disclaimer">{plan.disclaimer}</p>
      <p class="gc-affiliate-disclosure">
        Some links on this page are affiliate links. If you make a purchase through
        these links, Operation Granny Files may earn a small commission at no extra
        cost to you. This helps support free genealogy education.
      </p>

      {/* --- Action Bar --- */}
      <div class="gc-actions">
        <button type="button" class="gc-btn gc-btn-secondary" onClick={onReset}>
          Start Over
        </button>
        <button type="button" class="gc-btn gc-btn-secondary" onClick={handlePrint}>
          Print / Save as PDF
        </button>
      </div>
    </div>
  );
}
