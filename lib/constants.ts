export const PLATFORM_STATS = {
  totalCases: '5.1M+',
  totalCasesLong: '5.1 million',
  districtCount: 95,
  caseTypeCount: 84,
  dataSourceShort: 'FJC IDB · CourtListener · RECAP',
  dataSources: [
    'FJC Integrated Database (Federal Judicial Center)',
    'CourtListener',
    'RECAP Archive',
    'PACER (Public Access to Court Electronic Records)',
  ],
} as const;

export const PLATFORM_META = {
  name: 'MyCaseValue',
  tagline: 'The federal court record. Open to everyone.',
  description: 'Search 5.1M+ federal case outcomes — win rates, settlement ranges, judge analytics — sourced from public federal records.',
  url: 'https://mycasevalues.com',
  company: 'MyCaseValue LLC',
  state: 'West Virginia',
} as const;
