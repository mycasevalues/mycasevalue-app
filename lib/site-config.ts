/**
 * Centralized site configuration.
 * Single source of truth for the production URL and site metadata.
 * Uses NEXT_PUBLIC_SITE_URL env var with a sensible fallback.
 */

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://www.mycasevalues.com';

export const SITE_NAME = 'MyCaseValue';

export const SITE_DESCRIPTION =
  'Research real outcomes from 5.1M+ federal court cases across 95 districts. Get win rates, settlement ranges, timelines, and judge analytics sourced from public court records.';
