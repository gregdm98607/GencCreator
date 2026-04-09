/**
 * PrintView — Print-optimized layout for research plans.
 *
 * Stub — to be implemented in Phase E.
 */

import type { ResearchPlan } from '../lib/types.js';

interface PrintViewProps {
  plan: ResearchPlan;
}

export function PrintView({ plan: _plan }: PrintViewProps) {
  return (
    <div class="print-view">
      <p>Stub — print layout implementation in Phase E.</p>
    </div>
  );
}
