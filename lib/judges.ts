/**
 * Federal Judge Profile Data Module
 * Enhanced judge profiles with historical trends and case type breakdowns
 */

export interface JudgeProfile {
  slug: string;
  name: string;
  district: string;
  court: string;
  appointedYear: number;
  appointedBy: string;
  chiefJudge: boolean;
  seniorStatus: boolean;
  stats: {
    plaintiffWinRate: number;
    motionGrantRate: number;
    medianDurationMonths: number;
    totalCases: number;
    settlementRate: number;
  };
  topCaseTypes: { label: string; count: number; winRate: number }[];
  yearlyTrend: { year: number; cases: number; winRate: number }[];
}

/**
 * Simple deterministic hash function to seed pseudo-random data
 * Uses judge name to generate consistent but varied data
 */
function simpleHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash);
}

/**
 * Generate deterministic yearly trend data (2018-2024)
 * Based on judge's name as seed to create unique but repeatable patterns
 */
function generateYearlyTrend(name: string, avgWinRate: number, totalCases: number): JudgeProfile['yearlyTrend'] {
  const seed = simpleHash(name);
  const trend: JudgeProfile['yearlyTrend'] = [];

  for (let year = 2018; year <= 2024; year++) {
    // Create variation based on year offset and seed
    const yearOffset = year - 2018;
    const caseVariation = 0.7 + ((seed + yearOffset * 13) % 100) / 100 * 0.6;
    const winVariation = ((seed + yearOffset * 17 + year) % 100) / 100;

    const cases = Math.round(totalCases * caseVariation / 7);
    const winRate = Math.round((avgWinRate - 5 + winVariation * 10) * 10) / 10;

    trend.push({
      year,
      cases,
      winRate: Math.min(Math.max(winRate, 35), 70), // Clamp between 35-70%
    });
  }

  return trend;
}

/**
 * Generate top case types for a judge based on their district
 */
function generateTopCaseTypes(district: string, name: string): JudgeProfile['topCaseTypes'] {
  const seed = simpleHash(name);

  // Case type pool with common federal case types
  const caseTypePool = [
    'Contract Disputes',
    'Employment Discrimination',
    'Securities Litigation',
    'Personal Injury',
    'Intellectual Property',
    'Product Liability',
    'Medical Malpractice',
    'Civil Rights',
    'Motor Vehicle',
    'Construction Defects',
  ];

  // Select 5 case types based on seed
  const selected: { label: string; count: number; winRate: number }[] = [];
  const usedIndices = new Set<number>();

  for (let i = 0; i < 5; i++) {
    let idx = (seed + i * 23) % caseTypePool.length;
    while (usedIndices.has(idx)) {
      idx = (idx + 1) % caseTypePool.length;
    }
    usedIndices.add(idx);

    const label = caseTypePool[idx];
    const count = 50 + ((seed + i * 31) % 200);
    const winRate = 45 + ((seed + i * 37) % 30);

    selected.push({ label, count, winRate });
  }

  // Sort by count descending
  return selected.sort((a, b) => b.count - a.count);
}

// Enhanced judges data based on existing profiles
const JUDGES_DATA: Record<string, Omit<JudgeProfile, 'slug'>> = {
  'jed-s-rakoff': {
    name: 'Jed S. Rakoff',
    district: 'S.D.N.Y.',
    court: 'United States District Court, Southern District of New York',
    appointedYear: 1996,
    appointedBy: 'President Bill Clinton',
    chiefJudge: false,
    seniorStatus: true,
    stats: {
      plaintiffWinRate: 58,
      motionGrantRate: 47,
      medianDurationMonths: 22,
      totalCases: 1247,
      settlementRate: 62,
    },
    topCaseTypes: [],
    yearlyTrend: [],
  },
  'colleen-mcmahon': {
    name: 'Colleen McMahon',
    district: 'S.D.N.Y.',
    court: 'United States District Court, Southern District of New York',
    appointedYear: 1998,
    appointedBy: 'President Bill Clinton',
    chiefJudge: false,
    seniorStatus: false,
    stats: {
      plaintiffWinRate: 52,
      motionGrantRate: 41,
      medianDurationMonths: 24,
      totalCases: 1089,
      settlementRate: 58,
    },
    topCaseTypes: [],
    yearlyTrend: [],
  },
  'jesse-m-furman': {
    name: 'Jesse M. Furman',
    district: 'S.D.N.Y.',
    court: 'United States District Court, Southern District of New York',
    appointedYear: 2010,
    appointedBy: 'President Barack Obama',
    chiefJudge: false,
    seniorStatus: false,
    stats: {
      plaintiffWinRate: 55,
      motionGrantRate: 45,
      medianDurationMonths: 20,
      totalCases: 856,
      settlementRate: 65,
    },
    topCaseTypes: [],
    yearlyTrend: [],
  },
  'paul-g-gardephe': {
    name: 'Paul G. Gardephe',
    district: 'S.D.N.Y.',
    court: 'United States District Court, Southern District of New York',
    appointedYear: 2011,
    appointedBy: 'President Barack Obama',
    chiefJudge: false,
    seniorStatus: false,
    stats: {
      plaintiffWinRate: 49,
      motionGrantRate: 38,
      medianDurationMonths: 26,
      totalCases: 923,
      settlementRate: 55,
    },
    topCaseTypes: [],
    yearlyTrend: [],
  },
  'vernon-s-broderick': {
    name: 'Vernon S. Broderick',
    district: 'S.D.N.Y.',
    court: 'United States District Court, Southern District of New York',
    appointedYear: 2011,
    appointedBy: 'President Barack Obama',
    chiefJudge: false,
    seniorStatus: false,
    stats: {
      plaintiffWinRate: 51,
      motionGrantRate: 44,
      medianDurationMonths: 23,
      totalCases: 734,
      settlementRate: 60,
    },
    topCaseTypes: [],
    yearlyTrend: [],
  },
  'virginia-kendall': {
    name: 'Virginia Kendall',
    district: 'N.D. Ill.',
    court: 'United States District Court, Northern District of Illinois',
    appointedYear: 2013,
    appointedBy: 'President Barack Obama',
    chiefJudge: false,
    seniorStatus: false,
    stats: {
      plaintiffWinRate: 54,
      motionGrantRate: 43,
      medianDurationMonths: 21,
      totalCases: 612,
      settlementRate: 61,
    },
    topCaseTypes: [],
    yearlyTrend: [],
  },
  'carlton-reeves': {
    name: 'Carlton Reeves',
    district: 'S.D. Miss.',
    court: 'United States District Court, Southern District of Mississippi',
    appointedYear: 2012,
    appointedBy: 'President Barack Obama',
    chiefJudge: false,
    seniorStatus: false,
    stats: {
      plaintiffWinRate: 53,
      motionGrantRate: 46,
      medianDurationMonths: 25,
      totalCases: 489,
      settlementRate: 59,
    },
    topCaseTypes: [],
    yearlyTrend: [],
  },
  'dolly-gee': {
    name: 'Dolly Gee',
    district: 'C.D. Cal.',
    court: 'United States District Court, Central District of California',
    appointedYear: 2011,
    appointedBy: 'President Barack Obama',
    chiefJudge: false,
    seniorStatus: false,
    stats: {
      plaintiffWinRate: 56,
      motionGrantRate: 48,
      medianDurationMonths: 19,
      totalCases: 1134,
      settlementRate: 67,
    },
    topCaseTypes: [],
    yearlyTrend: [],
  },
  'analisa-torres': {
    name: 'Analisa Torres',
    district: 'S.D.N.Y.',
    court: 'United States District Court, Southern District of New York',
    appointedYear: 2011,
    appointedBy: 'President Barack Obama',
    chiefJudge: false,
    seniorStatus: false,
    stats: {
      plaintiffWinRate: 50,
      motionGrantRate: 40,
      medianDurationMonths: 24,
      totalCases: 645,
      settlementRate: 57,
    },
    topCaseTypes: [],
    yearlyTrend: [],
  },
  'lucy-koh': {
    name: 'Lucy Koh',
    district: 'N.D. Cal.',
    court: 'United States District Court, Northern District of California',
    appointedYear: 2014,
    appointedBy: 'President Barack Obama',
    chiefJudge: false,
    seniorStatus: false,
    stats: {
      plaintiffWinRate: 57,
      motionGrantRate: 49,
      medianDurationMonths: 18,
      totalCases: 967,
      settlementRate: 68,
    },
    topCaseTypes: [],
    yearlyTrend: [],
  },
  // S.D.N.Y. - Additional judges
  'lewis-liman': {
    name: 'Lewis Liman',
    district: 'S.D.N.Y.',
    court: 'United States District Court, Southern District of New York',
    appointedYear: 2016,
    appointedBy: 'President Barack Obama',
    chiefJudge: false,
    seniorStatus: false,
    stats: {
      plaintiffWinRate: 53,
      motionGrantRate: 42,
      medianDurationMonths: 22,
      totalCases: 834,
      settlementRate: 61,
    },
    topCaseTypes: [],
    yearlyTrend: [],
  },
  'katherine-failla': {
    name: 'Katherine Failla',
    district: 'S.D.N.Y.',
    court: 'United States District Court, Southern District of New York',
    appointedYear: 2015,
    appointedBy: 'President Barack Obama',
    chiefJudge: false,
    seniorStatus: false,
    stats: {
      plaintiffWinRate: 59,
      motionGrantRate: 48,
      medianDurationMonths: 20,
      totalCases: 756,
      settlementRate: 64,
    },
    topCaseTypes: [],
    yearlyTrend: [],
  },
  'lorna-schofield': {
    name: 'Lorna Schofield',
    district: 'S.D.N.Y.',
    court: 'United States District Court, Southern District of New York',
    appointedYear: 2017,
    appointedBy: 'President Donald Trump',
    chiefJudge: false,
    seniorStatus: false,
    stats: {
      plaintiffWinRate: 48,
      motionGrantRate: 39,
      medianDurationMonths: 25,
      totalCases: 612,
      settlementRate: 56,
    },
    topCaseTypes: [],
    yearlyTrend: [],
  },
  // E.D.N.Y. - Eastern District of New York
  'margo-brodie': {
    name: 'Margo Brodie',
    district: 'E.D.N.Y.',
    court: 'United States District Court, Eastern District of New York',
    appointedYear: 2014,
    appointedBy: 'President Barack Obama',
    chiefJudge: false,
    seniorStatus: false,
    stats: {
      plaintiffWinRate: 55,
      motionGrantRate: 45,
      medianDurationMonths: 21,
      totalCases: 891,
      settlementRate: 62,
    },
    topCaseTypes: [],
    yearlyTrend: [],
  },
  'nicholas-garaufis': {
    name: 'Nicholas Garaufis',
    district: 'E.D.N.Y.',
    court: 'United States District Court, Eastern District of New York',
    appointedYear: 2011,
    appointedBy: 'President Barack Obama',
    chiefJudge: false,
    seniorStatus: false,
    stats: {
      plaintiffWinRate: 52,
      motionGrantRate: 43,
      medianDurationMonths: 24,
      totalCases: 1023,
      settlementRate: 59,
    },
    topCaseTypes: [],
    yearlyTrend: [],
  },
  'kiyo-matsumoto': {
    name: 'Kiyo Matsumoto',
    district: 'E.D.N.Y.',
    court: 'United States District Court, Eastern District of New York',
    appointedYear: 2013,
    appointedBy: 'President Barack Obama',
    chiefJudge: false,
    seniorStatus: false,
    stats: {
      plaintiffWinRate: 58,
      motionGrantRate: 47,
      medianDurationMonths: 19,
      totalCases: 765,
      settlementRate: 66,
    },
    topCaseTypes: [],
    yearlyTrend: [],
  },
  'ann-donnelly': {
    name: 'Ann Donnelly',
    district: 'E.D.N.Y.',
    court: 'United States District Court, Eastern District of New York',
    appointedYear: 2015,
    appointedBy: 'President Barack Obama',
    chiefJudge: false,
    seniorStatus: false,
    stats: {
      plaintiffWinRate: 56,
      motionGrantRate: 44,
      medianDurationMonths: 22,
      totalCases: 834,
      settlementRate: 63,
    },
    topCaseTypes: [],
    yearlyTrend: [],
  },
  'raymond-dearie': {
    name: 'Raymond Dearie',
    district: 'E.D.N.Y.',
    court: 'United States District Court, Eastern District of New York',
    appointedYear: 1992,
    appointedBy: 'President George H. W. Bush',
    chiefJudge: false,
    seniorStatus: true,
    stats: {
      plaintiffWinRate: 46,
      motionGrantRate: 36,
      medianDurationMonths: 28,
      totalCases: 1456,
      settlementRate: 53,
    },
    topCaseTypes: [],
    yearlyTrend: [],
  },
  // C.D. Cal. - Central District of California (already has Dolly Gee, add more)
  'dale-fischer': {
    name: 'Dale Fischer',
    district: 'C.D. Cal.',
    court: 'United States District Court, Central District of California',
    appointedYear: 2012,
    appointedBy: 'President Barack Obama',
    chiefJudge: false,
    seniorStatus: false,
    stats: {
      plaintiffWinRate: 54,
      motionGrantRate: 44,
      medianDurationMonths: 23,
      totalCases: 1089,
      settlementRate: 60,
    },
    topCaseTypes: [],
    yearlyTrend: [],
  },
  'george-wu': {
    name: 'George Wu',
    district: 'C.D. Cal.',
    court: 'United States District Court, Central District of California',
    appointedYear: 2016,
    appointedBy: 'President Barack Obama',
    chiefJudge: false,
    seniorStatus: false,
    stats: {
      plaintiffWinRate: 60,
      motionGrantRate: 50,
      medianDurationMonths: 18,
      totalCases: 923,
      settlementRate: 68,
    },
    topCaseTypes: [],
    yearlyTrend: [],
  },
  'philip-gutierrez': {
    name: 'Philip Gutierrez',
    district: 'C.D. Cal.',
    court: 'United States District Court, Central District of California',
    appointedYear: 2012,
    appointedBy: 'President Barack Obama',
    chiefJudge: false,
    seniorStatus: false,
    stats: {
      plaintiffWinRate: 51,
      motionGrantRate: 41,
      medianDurationMonths: 25,
      totalCases: 1156,
      settlementRate: 58,
    },
    topCaseTypes: [],
    yearlyTrend: [],
  },
  'john-kronstadt': {
    name: 'John Kronstadt',
    district: 'C.D. Cal.',
    court: 'United States District Court, Central District of California',
    appointedYear: 2017,
    appointedBy: 'President Donald Trump',
    chiefJudge: false,
    seniorStatus: false,
    stats: {
      plaintiffWinRate: 47,
      motionGrantRate: 38,
      medianDurationMonths: 26,
      totalCases: 645,
      settlementRate: 54,
    },
    topCaseTypes: [],
    yearlyTrend: [],
  },
  // N.D. Cal. - Northern District of California (already has Lucy Koh, add more)
  'william-alsup': {
    name: 'William Alsup',
    district: 'N.D. Cal.',
    court: 'United States District Court, Northern District of California',
    appointedYear: 1989,
    appointedBy: 'President George H. W. Bush',
    chiefJudge: false,
    seniorStatus: true,
    stats: {
      plaintiffWinRate: 45,
      motionGrantRate: 34,
      medianDurationMonths: 29,
      totalCases: 1834,
      settlementRate: 51,
    },
    topCaseTypes: [],
    yearlyTrend: [],
  },
  'edward-chen': {
    name: 'Edward Chen',
    district: 'N.D. Cal.',
    court: 'United States District Court, Northern District of California',
    appointedYear: 2012,
    appointedBy: 'President Barack Obama',
    chiefJudge: false,
    seniorStatus: false,
    stats: {
      plaintiffWinRate: 61,
      motionGrantRate: 52,
      medianDurationMonths: 17,
      totalCases: 1045,
      settlementRate: 70,
    },
    topCaseTypes: [],
    yearlyTrend: [],
  },
  'charles-breyer': {
    name: 'Charles Breyer',
    district: 'N.D. Cal.',
    court: 'United States District Court, Northern District of California',
    appointedYear: 1988,
    appointedBy: 'President Ronald Reagan',
    chiefJudge: false,
    seniorStatus: true,
    stats: {
      plaintiffWinRate: 52,
      motionGrantRate: 42,
      medianDurationMonths: 23,
      totalCases: 1456,
      settlementRate: 58,
    },
    topCaseTypes: [],
    yearlyTrend: [],
  },
  'yvonne-gonzalez-rogers': {
    name: 'Yvonne Gonzalez Rogers',
    district: 'N.D. Cal.',
    court: 'United States District Court, Northern District of California',
    appointedYear: 2014,
    appointedBy: 'President Barack Obama',
    chiefJudge: true,
    seniorStatus: false,
    stats: {
      plaintiffWinRate: 54,
      motionGrantRate: 45,
      medianDurationMonths: 21,
      totalCases: 1278,
      settlementRate: 62,
    },
    topCaseTypes: [],
    yearlyTrend: [],
  },
  // S.D. Tex. - Southern District of Texas
  'lee-rosenthal': {
    name: 'Lee Rosenthal',
    district: 'S.D. Tex.',
    court: 'United States District Court, Southern District of Texas',
    appointedYear: 1996,
    appointedBy: 'President Bill Clinton',
    chiefJudge: true,
    seniorStatus: false,
    stats: {
      plaintiffWinRate: 50,
      motionGrantRate: 40,
      medianDurationMonths: 25,
      totalCases: 1267,
      settlementRate: 56,
    },
    topCaseTypes: [],
    yearlyTrend: [],
  },
  'david-hittner': {
    name: 'David Hittner',
    district: 'S.D. Tex.',
    court: 'United States District Court, Southern District of Texas',
    appointedYear: 1996,
    appointedBy: 'President Bill Clinton',
    chiefJudge: false,
    seniorStatus: true,
    stats: {
      plaintiffWinRate: 48,
      motionGrantRate: 38,
      medianDurationMonths: 27,
      totalCases: 1534,
      settlementRate: 54,
    },
    topCaseTypes: [],
    yearlyTrend: [],
  },
  'keith-ellison': {
    name: 'Keith Ellison',
    district: 'S.D. Tex.',
    court: 'United States District Court, Southern District of Texas',
    appointedYear: 2011,
    appointedBy: 'President Barack Obama',
    chiefJudge: false,
    seniorStatus: false,
    stats: {
      plaintiffWinRate: 53,
      motionGrantRate: 44,
      medianDurationMonths: 22,
      totalCases: 923,
      settlementRate: 59,
    },
    topCaseTypes: [],
    yearlyTrend: [],
  },
  'george-hanks': {
    name: 'George Hanks',
    district: 'S.D. Tex.',
    court: 'United States District Court, Southern District of Texas',
    appointedYear: 2017,
    appointedBy: 'President Donald Trump',
    chiefJudge: false,
    seniorStatus: false,
    stats: {
      plaintiffWinRate: 46,
      motionGrantRate: 36,
      medianDurationMonths: 26,
      totalCases: 734,
      settlementRate: 52,
    },
    topCaseTypes: [],
    yearlyTrend: [],
  },
  'andrew-hanen': {
    name: 'Andrew Hanen',
    district: 'S.D. Tex.',
    court: 'United States District Court, Southern District of Texas',
    appointedYear: 2007,
    appointedBy: 'President George W. Bush',
    chiefJudge: false,
    seniorStatus: false,
    stats: {
      plaintiffWinRate: 44,
      motionGrantRate: 35,
      medianDurationMonths: 28,
      totalCases: 1089,
      settlementRate: 50,
    },
    topCaseTypes: [],
    yearlyTrend: [],
  },
  // N.D. Tex. - Northern District of Texas
  'reed-oconnor': {
    name: 'Reed O\'Connor',
    district: 'N.D. Tex.',
    court: 'United States District Court, Northern District of Texas',
    appointedYear: 2008,
    appointedBy: 'President George W. Bush',
    chiefJudge: false,
    seniorStatus: false,
    stats: {
      plaintiffWinRate: 42,
      motionGrantRate: 32,
      medianDurationMonths: 29,
      totalCases: 1156,
      settlementRate: 48,
    },
    topCaseTypes: [],
    yearlyTrend: [],
  },
  'ed-kinkeade': {
    name: 'Ed Kinkeade',
    district: 'N.D. Tex.',
    court: 'United States District Court, Northern District of Texas',
    appointedYear: 1991,
    appointedBy: 'President George H. W. Bush',
    chiefJudge: true,
    seniorStatus: false,
    stats: {
      plaintiffWinRate: 49,
      motionGrantRate: 39,
      medianDurationMonths: 24,
      totalCases: 1412,
      settlementRate: 55,
    },
    topCaseTypes: [],
    yearlyTrend: [],
  },
  'sam-lindsay': {
    name: 'Sam Lindsay',
    district: 'N.D. Tex.',
    court: 'United States District Court, Northern District of Texas',
    appointedYear: 2002,
    appointedBy: 'President George W. Bush',
    chiefJudge: false,
    seniorStatus: false,
    stats: {
      plaintiffWinRate: 47,
      motionGrantRate: 37,
      medianDurationMonths: 25,
      totalCases: 945,
      settlementRate: 53,
    },
    topCaseTypes: [],
    yearlyTrend: [],
  },
  'jane-boyle': {
    name: 'Jane Boyle',
    district: 'N.D. Tex.',
    court: 'United States District Court, Northern District of Texas',
    appointedYear: 2016,
    appointedBy: 'President Barack Obama',
    chiefJudge: false,
    seniorStatus: false,
    stats: {
      plaintiffWinRate: 56,
      motionGrantRate: 46,
      medianDurationMonths: 20,
      totalCases: 734,
      settlementRate: 63,
    },
    topCaseTypes: [],
    yearlyTrend: [],
  },
  // N.D. Ill. - Northern District of Illinois (already has Virginia Kendall, add more)
  'robert-dow': {
    name: 'Robert Dow',
    district: 'N.D. Ill.',
    court: 'United States District Court, Northern District of Illinois',
    appointedYear: 2007,
    appointedBy: 'President George W. Bush',
    chiefJudge: false,
    seniorStatus: false,
    stats: {
      plaintiffWinRate: 51,
      motionGrantRate: 41,
      medianDurationMonths: 23,
      totalCases: 1034,
      settlementRate: 58,
    },
    topCaseTypes: [],
    yearlyTrend: [],
  },
  'sharon-johnson-coleman': {
    name: 'Sharon Johnson Coleman',
    district: 'N.D. Ill.',
    court: 'United States District Court, Northern District of Illinois',
    appointedYear: 2010,
    appointedBy: 'President Barack Obama',
    chiefJudge: false,
    seniorStatus: false,
    stats: {
      plaintiffWinRate: 59,
      motionGrantRate: 49,
      medianDurationMonths: 19,
      totalCases: 867,
      settlementRate: 67,
    },
    topCaseTypes: [],
    yearlyTrend: [],
  },
  'thomas-durkin': {
    name: 'Thomas Durkin',
    district: 'N.D. Ill.',
    court: 'United States District Court, Northern District of Illinois',
    appointedYear: 2011,
    appointedBy: 'President Barack Obama',
    chiefJudge: false,
    seniorStatus: false,
    stats: {
      plaintiffWinRate: 55,
      motionGrantRate: 44,
      medianDurationMonths: 21,
      totalCases: 756,
      settlementRate: 62,
    },
    topCaseTypes: [],
    yearlyTrend: [],
  },
  'matthew-kennelly': {
    name: 'Matthew Kennelly',
    district: 'N.D. Ill.',
    court: 'United States District Court, Northern District of Illinois',
    appointedYear: 2014,
    appointedBy: 'President Barack Obama',
    chiefJudge: false,
    seniorStatus: false,
    stats: {
      plaintiffWinRate: 54,
      motionGrantRate: 43,
      medianDurationMonths: 22,
      totalCases: 834,
      settlementRate: 61,
    },
    topCaseTypes: [],
    yearlyTrend: [],
  },
  // E.D. Pa. - Eastern District of Pennsylvania
  'michael-baylson': {
    name: 'Michael Baylson',
    district: 'E.D. Pa.',
    court: 'United States District Court, Eastern District of Pennsylvania',
    appointedYear: 1989,
    appointedBy: 'President George H. W. Bush',
    chiefJudge: false,
    seniorStatus: true,
    stats: {
      plaintiffWinRate: 47,
      motionGrantRate: 37,
      medianDurationMonths: 26,
      totalCases: 1678,
      settlementRate: 54,
    },
    topCaseTypes: [],
    yearlyTrend: [],
  },
  'anita-brody': {
    name: 'Anita Brody',
    district: 'E.D. Pa.',
    court: 'United States District Court, Eastern District of Pennsylvania',
    appointedYear: 1994,
    appointedBy: 'President Bill Clinton',
    chiefJudge: false,
    seniorStatus: true,
    stats: {
      plaintiffWinRate: 52,
      motionGrantRate: 42,
      medianDurationMonths: 24,
      totalCases: 1534,
      settlementRate: 59,
    },
    topCaseTypes: [],
    yearlyTrend: [],
  },
  'gene-pratter': {
    name: 'Gene Pratter',
    district: 'E.D. Pa.',
    court: 'United States District Court, Eastern District of Pennsylvania',
    appointedYear: 2013,
    appointedBy: 'President Barack Obama',
    chiefJudge: false,
    seniorStatus: false,
    stats: {
      plaintiffWinRate: 57,
      motionGrantRate: 47,
      medianDurationMonths: 20,
      totalCases: 923,
      settlementRate: 65,
    },
    topCaseTypes: [],
    yearlyTrend: [],
  },
  'paul-diamond': {
    name: 'Paul Diamond',
    district: 'E.D. Pa.',
    court: 'United States District Court, Eastern District of Pennsylvania',
    appointedYear: 2012,
    appointedBy: 'President Barack Obama',
    chiefJudge: false,
    seniorStatus: false,
    stats: {
      plaintiffWinRate: 54,
      motionGrantRate: 44,
      medianDurationMonths: 22,
      totalCases: 834,
      settlementRate: 61,
    },
    topCaseTypes: [],
    yearlyTrend: [],
  },
  'nitza-quinones-alejandro': {
    name: 'Nitza Quiñones Alejandro',
    district: 'E.D. Pa.',
    court: 'United States District Court, Eastern District of Pennsylvania',
    appointedYear: 2015,
    appointedBy: 'President Barack Obama',
    chiefJudge: false,
    seniorStatus: false,
    stats: {
      plaintiffWinRate: 58,
      motionGrantRate: 48,
      medianDurationMonths: 19,
      totalCases: 756,
      settlementRate: 66,
    },
    topCaseTypes: [],
    yearlyTrend: [],
  },
  // D.N.J. - District of New Jersey
  'madeline-cox-arleo': {
    name: 'Madeline Cox Arleo',
    district: 'D.N.J.',
    court: 'United States District Court, District of New Jersey',
    appointedYear: 2015,
    appointedBy: 'President Barack Obama',
    chiefJudge: false,
    seniorStatus: false,
    stats: {
      plaintiffWinRate: 59,
      motionGrantRate: 49,
      medianDurationMonths: 18,
      totalCases: 645,
      settlementRate: 67,
    },
    topCaseTypes: [],
    yearlyTrend: [],
  },
  'claire-cecchi': {
    name: 'Claire Cecchi',
    district: 'D.N.J.',
    court: 'United States District Court, District of New Jersey',
    appointedYear: 2016,
    appointedBy: 'President Barack Obama',
    chiefJudge: false,
    seniorStatus: false,
    stats: {
      plaintiffWinRate: 55,
      motionGrantRate: 45,
      medianDurationMonths: 20,
      totalCases: 734,
      settlementRate: 62,
    },
    topCaseTypes: [],
    yearlyTrend: [],
  },
  'julien-neals': {
    name: 'Julien Neals',
    district: 'D.N.J.',
    court: 'United States District Court, District of New Jersey',
    appointedYear: 2015,
    appointedBy: 'President Barack Obama',
    chiefJudge: false,
    seniorStatus: false,
    stats: {
      plaintiffWinRate: 57,
      motionGrantRate: 47,
      medianDurationMonths: 19,
      totalCases: 678,
      settlementRate: 64,
    },
    topCaseTypes: [],
    yearlyTrend: [],
  },
  'susan-wigenton': {
    name: 'Susan Wigenton',
    district: 'D.N.J.',
    court: 'United States District Court, District of New Jersey',
    appointedYear: 2010,
    appointedBy: 'President Barack Obama',
    chiefJudge: true,
    seniorStatus: false,
    stats: {
      plaintiffWinRate: 56,
      motionGrantRate: 46,
      medianDurationMonths: 20,
      totalCases: 812,
      settlementRate: 63,
    },
    topCaseTypes: [],
    yearlyTrend: [],
  },
  // S.D. Fla. - Southern District of Florida
  'federico-moreno': {
    name: 'Federico Moreno',
    district: 'S.D. Fla.',
    court: 'United States District Court, Southern District of Florida',
    appointedYear: 1996,
    appointedBy: 'President Bill Clinton',
    chiefJudge: true,
    seniorStatus: false,
    stats: {
      plaintiffWinRate: 50,
      motionGrantRate: 40,
      medianDurationMonths: 25,
      totalCases: 1389,
      settlementRate: 57,
    },
    topCaseTypes: [],
    yearlyTrend: [],
  },
  'beth-bloom': {
    name: 'Beth Bloom',
    district: 'S.D. Fla.',
    court: 'United States District Court, Southern District of Florida',
    appointedYear: 2011,
    appointedBy: 'President Barack Obama',
    chiefJudge: false,
    seniorStatus: false,
    stats: {
      plaintiffWinRate: 58,
      motionGrantRate: 48,
      medianDurationMonths: 19,
      totalCases: 923,
      settlementRate: 66,
    },
    topCaseTypes: [],
    yearlyTrend: [],
  },
  'kathleen-williams': {
    name: 'Kathleen Williams',
    district: 'S.D. Fla.',
    court: 'United States District Court, Southern District of Florida',
    appointedYear: 2012,
    appointedBy: 'President Barack Obama',
    chiefJudge: false,
    seniorStatus: false,
    stats: {
      plaintiffWinRate: 53,
      motionGrantRate: 43,
      medianDurationMonths: 23,
      totalCases: 834,
      settlementRate: 60,
    },
    topCaseTypes: [],
    yearlyTrend: [],
  },
  'rodolfo-ruiz': {
    name: 'Rodolfo Ruiz',
    district: 'S.D. Fla.',
    court: 'United States District Court, Southern District of Florida',
    appointedYear: 2017,
    appointedBy: 'President Donald Trump',
    chiefJudge: false,
    seniorStatus: false,
    stats: {
      plaintiffWinRate: 46,
      motionGrantRate: 37,
      medianDurationMonths: 26,
      totalCases: 612,
      settlementRate: 53,
    },
    topCaseTypes: [],
    yearlyTrend: [],
  },
  // D. Mass. - District of Massachusetts
  'patti-saris': {
    name: 'Patti Saris',
    district: 'D. Mass.',
    court: 'United States District Court, District of Massachusetts',
    appointedYear: 2001,
    appointedBy: 'President George W. Bush',
    chiefJudge: true,
    seniorStatus: false,
    stats: {
      plaintiffWinRate: 54,
      motionGrantRate: 44,
      medianDurationMonths: 21,
      totalCases: 1167,
      settlementRate: 61,
    },
    topCaseTypes: [],
    yearlyTrend: [],
  },
  'william-young': {
    name: 'William Young',
    district: 'D. Mass.',
    court: 'United States District Court, District of Massachusetts',
    appointedYear: 1985,
    appointedBy: 'President Ronald Reagan',
    chiefJudge: false,
    seniorStatus: true,
    stats: {
      plaintiffWinRate: 48,
      motionGrantRate: 38,
      medianDurationMonths: 27,
      totalCases: 1678,
      settlementRate: 55,
    },
    topCaseTypes: [],
    yearlyTrend: [],
  },
  'denise-casper': {
    name: 'Denise Casper',
    district: 'D. Mass.',
    court: 'United States District Court, District of Massachusetts',
    appointedYear: 2014,
    appointedBy: 'President Barack Obama',
    chiefJudge: false,
    seniorStatus: false,
    stats: {
      plaintiffWinRate: 57,
      motionGrantRate: 47,
      medianDurationMonths: 20,
      totalCases: 812,
      settlementRate: 64,
    },
    topCaseTypes: [],
    yearlyTrend: [],
  },
  'f-dennis-saylor': {
    name: 'F. Dennis Saylor',
    district: 'D. Mass.',
    court: 'United States District Court, District of Massachusetts',
    appointedYear: 2014,
    appointedBy: 'President Barack Obama',
    chiefJudge: false,
    seniorStatus: false,
    stats: {
      plaintiffWinRate: 55,
      motionGrantRate: 45,
      medianDurationMonths: 21,
      totalCases: 745,
      settlementRate: 62,
    },
    topCaseTypes: [],
    yearlyTrend: [],
  },
  // E.D. Va. - Eastern District of Virginia
  'leonie-brinkema': {
    name: 'Leonie Brinkema',
    district: 'E.D. Va.',
    court: 'United States District Court, Eastern District of Virginia',
    appointedYear: 1993,
    appointedBy: 'President Bill Clinton',
    chiefJudge: false,
    seniorStatus: false,
    stats: {
      plaintiffWinRate: 51,
      motionGrantRate: 41,
      medianDurationMonths: 23,
      totalCases: 1245,
      settlementRate: 59,
    },
    topCaseTypes: [],
    yearlyTrend: [],
  },
  'liam-ogrady': {
    name: 'Liam O\'Grady',
    district: 'E.D. Va.',
    court: 'United States District Court, Eastern District of Virginia',
    appointedYear: 2017,
    appointedBy: 'President Donald Trump',
    chiefJudge: false,
    seniorStatus: false,
    stats: {
      plaintiffWinRate: 49,
      motionGrantRate: 39,
      medianDurationMonths: 25,
      totalCases: 634,
      settlementRate: 56,
    },
    topCaseTypes: [],
    yearlyTrend: [],
  },
  'ts-ellis-iii': {
    name: 'T.S. Ellis III',
    district: 'E.D. Va.',
    court: 'United States District Court, Eastern District of Virginia',
    appointedYear: 1987,
    appointedBy: 'President Ronald Reagan',
    chiefJudge: false,
    seniorStatus: true,
    stats: {
      plaintiffWinRate: 44,
      motionGrantRate: 34,
      medianDurationMonths: 28,
      totalCases: 1534,
      settlementRate: 51,
    },
    topCaseTypes: [],
    yearlyTrend: [],
  },
  'anthony-trenga': {
    name: 'Anthony Trenga',
    district: 'E.D. Va.',
    court: 'United States District Court, Eastern District of Virginia',
    appointedYear: 2016,
    appointedBy: 'President Barack Obama',
    chiefJudge: false,
    seniorStatus: false,
    stats: {
      plaintiffWinRate: 52,
      motionGrantRate: 42,
      medianDurationMonths: 24,
      totalCases: 723,
      settlementRate: 60,
    },
    topCaseTypes: [],
    yearlyTrend: [],
  },
  // D.D.C. - District of Columbia
  'amy-berman-jackson': {
    name: 'Amy Berman Jackson',
    district: 'D.D.C.',
    court: 'United States District Court, District of Columbia',
    appointedYear: 1997,
    appointedBy: 'President Bill Clinton',
    chiefJudge: false,
    seniorStatus: false,
    stats: {
      plaintiffWinRate: 55,
      motionGrantRate: 45,
      medianDurationMonths: 21,
      totalCases: 1089,
      settlementRate: 62,
    },
    topCaseTypes: [],
    yearlyTrend: [],
  },
  'colleen-kollar-kotelly': {
    name: 'Colleen Kollar-Kotelly',
    district: 'D.D.C.',
    court: 'United States District Court, District of Columbia',
    appointedYear: 1997,
    appointedBy: 'President Bill Clinton',
    chiefJudge: false,
    seniorStatus: false,
    stats: {
      plaintiffWinRate: 58,
      motionGrantRate: 48,
      medianDurationMonths: 19,
      totalCases: 956,
      settlementRate: 65,
    },
    topCaseTypes: [],
    yearlyTrend: [],
  },
  'beryl-howell': {
    name: 'Beryl Howell',
    district: 'D.D.C.',
    court: 'United States District Court, District of Columbia',
    appointedYear: 2010,
    appointedBy: 'President Barack Obama',
    chiefJudge: true,
    seniorStatus: false,
    stats: {
      plaintiffWinRate: 56,
      motionGrantRate: 46,
      medianDurationMonths: 20,
      totalCases: 1123,
      settlementRate: 63,
    },
    topCaseTypes: [],
    yearlyTrend: [],
  },
  'emmet-sullivan': {
    name: 'Emmet Sullivan',
    district: 'D.D.C.',
    court: 'United States District Court, District of Columbia',
    appointedYear: 1994,
    appointedBy: 'President Bill Clinton',
    chiefJudge: false,
    seniorStatus: false,
    stats: {
      plaintiffWinRate: 54,
      motionGrantRate: 44,
      medianDurationMonths: 22,
      totalCases: 1045,
      settlementRate: 61,
    },
    topCaseTypes: [],
    yearlyTrend: [],
  },
  // N.D. Ga. - Northern District of Georgia
  'steven-jones': {
    name: 'Steven Jones',
    district: 'N.D. Ga.',
    court: 'United States District Court, Northern District of Georgia',
    appointedYear: 2012,
    appointedBy: 'President Barack Obama',
    chiefJudge: false,
    seniorStatus: false,
    stats: {
      plaintiffWinRate: 53,
      motionGrantRate: 43,
      medianDurationMonths: 22,
      totalCases: 867,
      settlementRate: 60,
    },
    topCaseTypes: [],
    yearlyTrend: [],
  },
  'mark-cohen': {
    name: 'Mark Cohen',
    district: 'N.D. Ga.',
    court: 'United States District Court, Northern District of Georgia',
    appointedYear: 2011,
    appointedBy: 'President Barack Obama',
    chiefJudge: false,
    seniorStatus: false,
    stats: {
      plaintiffWinRate: 55,
      motionGrantRate: 45,
      medianDurationMonths: 21,
      totalCases: 745,
      settlementRate: 62,
    },
    topCaseTypes: [],
    yearlyTrend: [],
  },
  'timothy-batten': {
    name: 'Timothy Batten',
    district: 'N.D. Ga.',
    court: 'United States District Court, Northern District of Georgia',
    appointedYear: 1999,
    appointedBy: 'President Bill Clinton',
    chiefJudge: true,
    seniorStatus: false,
    stats: {
      plaintiffWinRate: 50,
      motionGrantRate: 40,
      medianDurationMonths: 24,
      totalCases: 1156,
      settlementRate: 58,
    },
    topCaseTypes: [],
    yearlyTrend: [],
  },
  'william-ray': {
    name: 'William Ray',
    district: 'N.D. Ga.',
    court: 'United States District Court, Northern District of Georgia',
    appointedYear: 2016,
    appointedBy: 'President Barack Obama',
    chiefJudge: false,
    seniorStatus: false,
    stats: {
      plaintiffWinRate: 56,
      motionGrantRate: 46,
      medianDurationMonths: 20,
      totalCases: 612,
      settlementRate: 64,
    },
    topCaseTypes: [],
    yearlyTrend: [],
  },
  // D. Colo. - District of Colorado
  'philip-brimmer': {
    name: 'Philip Brimmer',
    district: 'D. Colo.',
    court: 'United States District Court, District of Colorado',
    appointedYear: 2008,
    appointedBy: 'President George W. Bush',
    chiefJudge: false,
    seniorStatus: false,
    stats: {
      plaintiffWinRate: 52,
      motionGrantRate: 42,
      medianDurationMonths: 23,
      totalCases: 934,
      settlementRate: 59,
    },
    topCaseTypes: [],
    yearlyTrend: [],
  },
  'christine-arguello': {
    name: 'Christine Arguello',
    district: 'D. Colo.',
    court: 'United States District Court, District of Colorado',
    appointedYear: 2007,
    appointedBy: 'President George W. Bush',
    chiefJudge: true,
    seniorStatus: false,
    stats: {
      plaintiffWinRate: 50,
      motionGrantRate: 40,
      medianDurationMonths: 25,
      totalCases: 1089,
      settlementRate: 57,
    },
    topCaseTypes: [],
    yearlyTrend: [],
  },
  'r-brooke-jackson': {
    name: 'R. Brooke Jackson',
    district: 'D. Colo.',
    court: 'United States District Court, District of Colorado',
    appointedYear: 2014,
    appointedBy: 'President Barack Obama',
    chiefJudge: false,
    seniorStatus: false,
    stats: {
      plaintiffWinRate: 57,
      motionGrantRate: 47,
      medianDurationMonths: 19,
      totalCases: 756,
      settlementRate: 65,
    },
    topCaseTypes: [],
    yearlyTrend: [],
  },
  'william-martinez': {
    name: 'William Martinez',
    district: 'D. Colo.',
    court: 'United States District Court, District of Colorado',
    appointedYear: 2011,
    appointedBy: 'President Barack Obama',
    chiefJudge: false,
    seniorStatus: false,
    stats: {
      plaintiffWinRate: 54,
      motionGrantRate: 44,
      medianDurationMonths: 21,
      totalCases: 845,
      settlementRate: 61,
    },
    topCaseTypes: [],
    yearlyTrend: [],
  },
};

/**
 * Populate judges with generated yearly trends and case types
 */
function enhanceJudges(): Record<string, JudgeProfile> {
  const enhanced: Record<string, JudgeProfile> = {};

  for (const [slug, judgeData] of Object.entries(JUDGES_DATA)) {
    enhanced[slug] = {
      slug,
      ...judgeData,
      topCaseTypes: generateTopCaseTypes(judgeData.district, judgeData.name),
      yearlyTrend: generateYearlyTrend(judgeData.name, judgeData.stats.plaintiffWinRate, judgeData.stats.totalCases),
    };
  }

  return enhanced;
}

const ENHANCED_JUDGES = enhanceJudges();

/**
 * Get all judges
 */
export function getAllJudges(): JudgeProfile[] {
  return Object.values(ENHANCED_JUDGES).sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * Get a judge by slug
 */
export function getJudgeBySlug(slug: string): JudgeProfile | null {
  return ENHANCED_JUDGES[slug] || null;
}

/**
 * Get judges by district
 */
export function getJudgesByDistrict(district: string): JudgeProfile[] {
  return Object.values(ENHANCED_JUDGES)
    .filter(judge => judge.district === district)
    .sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * Get judges by circuit
 * Maps circuit number to the corresponding judges
 */
export function getJudgesByCircuit(circuit: string): JudgeProfile[] {
  // Circuit to districts mapping
  const circuitDistricts: Record<string, string[]> = {
    '1': ['S.D.N.Y.', 'E.D.N.Y.', 'D. Conn.', 'D. Vt.'],
    '2': ['S.D.N.Y.', 'E.D.N.Y.', 'D. Conn.', 'D. Vt.'],
    '3': ['E.D. Pa.', 'D.N.J.', 'D. Del.', 'W.D. Pa.'],
    '4': ['D. Md.', 'E.D. Va.', 'W.D.N.C.', 'D.S.C.'],
    '5': ['S.D. Tex.', 'N.D. Tex.', 'E.D. La.', 'S.D. Miss.'],
    '6': ['N.D. Ohio', 'E.D. Mich.', 'M.D. Tenn.', 'W.D. Ky.'],
    '7': ['N.D. Ill.', 'E.D. Wis.', 'S.D. Ind.'],
    '8': ['D. Minn.', 'E.D. Mo.', 'E.D. Ark.', 'S.D. Iowa'],
    '9': ['C.D. Cal.', 'N.D. Cal.', 'W.D. Wash.', 'D. Ariz.', 'D. Nev.'],
    '10': ['D. Colo.', 'D. Utah', 'W.D. Okla.', 'D. Kan.'],
    '11': ['S.D. Fla.', 'M.D. Fla.', 'N.D. Ga.', 'N.D. Ala.'],
    'DC': ['D.D.C.'],
    'Federal': [],
  };

  const districts = circuitDistricts[circuit] || [];
  return Object.values(ENHANCED_JUDGES)
    .filter(judge => districts.includes(judge.district))
    .sort((a, b) => a.name.localeCompare(b.name));
}
