/**
 * Centralized site configuration.
 * Single source of truth for the production URL and site metadata.
 * Uses NEXT_PUBLIC_SITE_URL env var with a sensible fallback.
 */

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://www.mycasevalues.com';

export const SITE_NAME = 'MyCaseValue';

export const SITE_DESCRIPTION =
  'Search millions of federal court records for case outcomes, judge analytics, settlement data, and litigation intelligence. Built entirely from public federal court and agency records.';
