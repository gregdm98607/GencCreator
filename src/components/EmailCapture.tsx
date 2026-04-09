/**
 * EmailCapture — "Email me this plan" widget.
 *
 * Optional (not gated). Captures email and sends plan via ConvertKit.
 * Stub — to be implemented in Phase E.
 */

import type { ResearchPlan } from '../lib/types.js';

interface EmailCaptureProps {
  plan: ResearchPlan;
}

export function EmailCapture({ plan: _plan }: EmailCaptureProps) {
  return (
    <div class="email-capture">
      <h3>Email Me This Plan</h3>
      <p>Stub — implementation in Phase E/F.</p>
    </div>
  );
}
