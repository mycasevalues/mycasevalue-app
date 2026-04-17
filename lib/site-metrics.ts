/**
 * Centralized site-wide metrics and data claims.
 *
 * All numerical claims used across the site should reference these constants.
 * When the data pipeline provides a verified count, update the values here
 * and every page will reflect the change automatically.
 *
 * Data source integration plan:
 * - Connect to Supabase data_sources table to store verified metrics
 * - Admin dashboard (/app/admin) page can update these values
 * - Backend API should query Supabase to fetch current values
 * - Cache metrics for 1 hour to avoid constant database hits
 * - Until fully integrated, use conservative language in UI copy
 */

export const SITE_METRICS = {
  /** Total federal cases in the database. Source: FJC IDB + CourtListener. */
  totalCases: '5.1M+',
  totalCasesNumeric: 5_100_000,

  /** Number of federal district courts covered */
  districtCourts: 94,

  /** NOS case type categories */
  caseTypes: 84,

  /** Years of historical data coverage (approximate) */
  yearsOfData: '55+',

  /** Primary public data sources */
  dataSources: [
    {
      name: 'Federal Judicial Center',
      abbrev: 'FJC IDB',
      description: 'Integrated Database of federal civil cases',
      category: 'Federal Courts',
      updateFrequency: 'Quarterly',
    },
    {
      name: 'CourtListener',
      abbrev: 'CourtListener',
      description: 'Judicial opinions and RECAP docket archive',
      category: 'Federal Courts',
      updateFrequency: 'Daily',
    },
    {
      name: 'PACER / RECAP',
      abbrev: 'PACER',
      description: 'Federal court electronic records',
      category: 'Federal Courts',
      updateFrequency: 'Daily',
    },
    {
      name: 'Federal Register',
      abbrev: 'Fed. Register',
      description: 'Daily journal of the U.S. Government',
      category: 'Federal Agencies',
      updateFrequency: 'Daily',
    },
    {
      name: 'eCFR',
      abbrev: 'eCFR',
      description: 'Electronic Code of Federal Regulations',
      category: 'Federal Agencies',
      updateFrequency: 'Daily',
    },
    {
      name: 'SEC EDGAR',
      abbrev: 'EDGAR',
      description: 'Securities and Exchange Commission filings',
      category: 'Federal Agencies',
      updateFrequency: 'Daily',
    },
    {
      name: 'GovInfo',
      abbrev: 'GovInfo',
      description: 'U.S. Government Publishing Office',
      category: 'Government Publications',
      updateFrequency: 'Daily',
    },
  ],
} as const;
