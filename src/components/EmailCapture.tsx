/**
 * EmailCapture — "Email me this plan" widget.
 *
 * Optional (not gated). Subscribes the user through the GenCreator Kit form.
 */

import { useState } from 'preact/hooks';
import type { ResearchPlan } from '../lib/types.js';
import { track } from '../lib/analytics.js';

const KIT_FORM_ACTION = 'https://app.kit.com/forms/9616629/subscriptions';

interface EmailCaptureProps {
  plan: ResearchPlan;
}

export function EmailCapture({ plan }: EmailCaptureProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  async function handleSubmit(e: Event) {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus('sending');

    const formData = new FormData();
    formData.set('email_address', email.trim());
    formData.set('fields[lead_source_page]', 'gencreator');
    formData.set('fields[research_goal]', plan.ancestor.researchGoal);
    formData.set('fields[step_count]', String(plan.steps.length));

    try {
      const response = await fetch(KIT_FORM_ACTION, {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      });
      const result = await response.json().catch(() => ({ status: 'success' }));

      if (!response.ok && result?.status !== 'quarantined') {
        throw new Error('Kit subscription failed');
      }
      if (result?.status && result.status !== 'success' && result.status !== 'quarantined') {
        throw new Error('Kit subscription failed');
      }

      setStatus('sent');
      track('gencreator_email_captured', {
        research_goal: plan.ancestor.researchGoal,
        step_count: plan.steps.length,
      });
    } catch {
      setStatus('error');
    }
  }

  if (status === 'sent') {
    return (
      <div class="gc-email" role="status" aria-live="polite">
        <p class="gc-email-success">
          You're on the Operation Granny Files list at {email}. Keep this plan
          open or use Print Plan to save a copy before you go.
        </p>
      </div>
    );
  }

  return (
    <div class="gc-email">
      <h3>Email Me This Plan</h3>
      <p>
        Join the Operation Granny Files list for follow-up help with this
        research plan.
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
      {status === 'error' && (
        <p class="gc-email-error" role="alert">
          Something went wrong. Try again, or use Print Plan to save this plan now.
        </p>
      )}
      <p class="gc-affiliate-disclosure" style={{ marginTop: '0.5rem' }}>
        By submitting your email, you'll also be subscribed to the Operation
        Granny Files newsletter. You can unsubscribe anytime.
      </p>
    </div>
  );
}
