/**
 * Affiliate link URL generation.
 *
 * Builds tracked URLs with UTM parameters and affiliate IDs.
 */

import type { RecordType } from '../types.js';

/**
 * Build a tracked affiliate URL from base URL and tracking parameters.
 */
export function buildAffiliateUrl(
  baseUrl: string,
  affiliateId: string,
  utmSource: string,
  utmMedium: string,
  recordType: RecordType,
): string {
  const url = new URL(baseUrl);

  if (affiliateId && affiliateId !== 'TBD') {
    url.searchParams.set('tag', affiliateId);
  }

  url.searchParams.set('utm_source', utmSource);
  url.searchParams.set('utm_medium', utmMedium);
  url.searchParams.set('utm_campaign', recordType);

  return url.toString();
}
