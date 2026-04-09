import { describe, it, expect } from 'vitest';
import { buildAffiliateUrl } from './affiliate.js';

describe('buildAffiliateUrl', () => {
  it('appends UTM parameters', () => {
    const url = buildAffiliateUrl(
      'https://www.ancestry.com/search/',
      'TBD',
      'gencreator',
      'research-plan',
      'census',
    );
    expect(url).toContain('utm_source=gencreator');
    expect(url).toContain('utm_medium=research-plan');
    expect(url).toContain('utm_campaign=census');
  });

  it('excludes affiliate tag when TBD', () => {
    const url = buildAffiliateUrl(
      'https://www.ancestry.com/search/',
      'TBD',
      'gencreator',
      'research-plan',
      'census',
    );
    expect(url).not.toContain('tag=');
  });

  it('includes affiliate tag when set', () => {
    const url = buildAffiliateUrl(
      'https://www.ancestry.com/search/',
      'ssm-ogf-20',
      'gencreator',
      'research-plan',
      'census',
    );
    expect(url).toContain('tag=ssm-ogf-20');
  });

  it('excludes affiliate tag when empty', () => {
    const url = buildAffiliateUrl(
      'https://www.familysearch.org/search/',
      '',
      'gencreator',
      'research-plan',
      'census',
    );
    expect(url).not.toContain('tag=');
  });
});
