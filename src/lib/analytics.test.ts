import { describe, it, expect, vi, afterEach } from 'vitest';
import { track, hashName } from './analytics.js';

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('track', () => {
  it('is a no-op when gtag is unavailable', () => {
    vi.stubGlobal('window', {});
    expect(() => track('gencreator_print', { step_count: 3 })).not.toThrow();
  });

  it('forwards the event name and params to gtag when present', () => {
    const gtag = vi.fn();
    vi.stubGlobal('window', { gtag });
    track('gencreator_plan_generated', {
      research_goal: 'find_parents',
      step_count: 5,
    });
    expect(gtag).toHaveBeenCalledWith('event', 'gencreator_plan_generated', {
      research_goal: 'find_parents',
      step_count: 5,
    });
  });

  it('forwards gencreator_form_started (the B3 funnel start event)', () => {
    const gtag = vi.fn();
    vi.stubGlobal('window', { gtag });
    track('gencreator_form_started');
    expect(gtag).toHaveBeenCalledWith('event', 'gencreator_form_started', {});
  });

  it('pushes to dataLayer when Astro does not expose gtag on window', () => {
    const dataLayer: unknown[] = [];
    vi.stubGlobal('window', { dataLayer });
    track('gencreator_plan_generated', {
      research_goal: 'find_parents',
      step_count: 5,
    });
    expect(dataLayer).toEqual([
      [
        'event',
        'gencreator_plan_generated',
        {
          research_goal: 'find_parents',
          step_count: 5,
        },
      ],
    ]);
  });

  it('swallows errors thrown by gtag so the UI never breaks', () => {
    const gtag = vi.fn(() => {
      throw new Error('blocked by extension');
    });
    vi.stubGlobal('window', { gtag });
    expect(() => track('gencreator_email_captured')).not.toThrow();
  });
});

describe('hashName', () => {
  it('is deterministic and ignores case and surrounding space', () => {
    expect(hashName('John Smith')).toBe(hashName('  john smith '));
  });

  it('produces different tokens for different names', () => {
    expect(hashName('John Smith')).not.toBe(hashName('Jane Doe'));
  });

  it('returns a sentinel for empty input', () => {
    expect(hashName('   ')).toBe('anon');
  });
});
