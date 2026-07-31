/**
 * Lightweight GA4 event tracking for GenCreator.
 *
 * Fires GA4 custom events through the global `gtag()` that the OGF site loads
 * in BaseHead.astro (the measurement ID is configured there, not here). Safe
 * in any environment: when no gtag is present (SSR, tests, ad-blockers) the
 * calls are no-ops, and an error inside gtag never bubbles into the UI.
 */

export type GenCreatorEvent =
  | 'gencreator_form_started'
  | 'gencreator_plan_generated'
  | 'gencreator_email_captured'
  | 'gencreator_affiliate_click'
  | 'gencreator_mission_click'
  | 'gencreator_print';

type GtagFn = (
  command: 'event',
  eventName: string,
  params?: Record<string, unknown>,
) => void;

type AnalyticsWindow = {
  gtag?: GtagFn;
  dataLayer?: unknown[];
};

/** Fire a GA4 custom event. No-op when no GA runtime is available. */
export function track(
  event: GenCreatorEvent,
  params: Record<string, unknown> = {},
): void {
  if (typeof window === 'undefined') return;
  const analyticsWindow = window as unknown as AnalyticsWindow;
  try {
    if (typeof analyticsWindow.gtag === 'function') {
      analyticsWindow.gtag('event', event, params);
      return;
    }
    if (Array.isArray(analyticsWindow.dataLayer)) {
      analyticsWindow.dataLayer.push(['event', event, params]);
    }
  } catch {
    // Analytics must never break the research planner.
  }
}

/**
 * Deterministic, non-reversible short token for an ancestor name, so GA4 can
 * count distinct plans without receiving a personally identifying name.
 * FNV-1a (32-bit), rendered in base36.
 */
export function hashName(name: string): string {
  const normalized = name.trim().toLowerCase();
  if (!normalized) return 'anon';
  let hash = 0x811c9dc5;
  for (let i = 0; i < normalized.length; i++) {
    hash ^= normalized.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }
  return (hash >>> 0).toString(36);
}
