/**
 * EmailCapture — "Email me this plan" widget.
 *
 * Optional (not gated). UI only for now — backend integration (ConvertKit)
 * will be added in Phase F.
 */

import { useState } from 'preact/hooks';
import type { ResearchPlan } from '../lib/types.js';

interface EmailCaptureProps {
  plan: ResearchPlan;
}

export function EmailCapture({ plan }: EmailCaptureProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  function handleSubmit(e: Event) {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus('sending');

    // TODO: Phase F — POST to /api/gencreator-email (Astro API route → ConvertKit)
    // For now, simulate success after a short delay
    setTimeout(() => {
      setStatus('sent');
    }, 800);
  }

  if (status === 'sent') {
    return (
      <div class="gc-email" role="status" aria-live="polite">
        <p class="gc-email-success">
          Your research plan for {plan.ancestor.name} has been sent to {email}.
          Check your inbox!
        </p>
      </div>
    );
  }

  return (
    <div class="gc-email">
      <h3>Email Me This Plan</h3>
      <p>
        Save your research plan for later. We'll send it to your inbox so you
        can reference it when you sit down to research.
      </p>
      <form onSubmit={handleSubmit} class="gc-email-row">
        <input
          type="email"
          class="gc-email-input"
          placeholder="your@email.com"
          value={email}
          onInput={(e) => setEmail((e.target as HTMLInputElement).value)}
          required
          aria-label="Email address"
          disabled={status === 'sending'}
        />
        <button
          type="submit"
          class="gc-btn gc-btn-primary"
          disabled={status === 'sending' || !email.trim()}
        >
          {status === 'sending' ? 'Sending...' : 'Send My Plan'}
        </button>
      </form>
      <p class="gc-affiliate-disclosure" style={{ marginTop: '0.5rem' }}>
        By submitting your email, you'll also be subscribed to the Operation
        Granny Files newsletter. You can unsubscribe anytime.
      </p>
    </div>
  );
}
