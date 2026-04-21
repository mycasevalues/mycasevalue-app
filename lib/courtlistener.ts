/**
 * CourtListener API client — Search API for opinions + RECAP API for dockets.
 * https://www.courtlistener.com/api/rest/v4/
 *
 * All endpoints are public / unauthenticated. We set a polite User-Agent and
 * cache aggressively (24 h for search, 1 h for individual docket lookups).
 */

const CL_BASE = 'https://www.courtlistener.com/api/rest/v4';

// ─── Type Definitions ────────────────────────────────────────────────

export interface Opinion {
  id: number;
  caseName: string;
  court: string;
  dateFiled: string;
  citation: string;
  snippet: string;
  url: string;
}

export interface Attorney {
  id: number;
  name: string;
  firmName?: string;
  caseCount: number;
}

export interface Judge {
  id: number;
  name: string;
  court: string;
  appointedBy: string;
  dateStart: string;
}

// ─── Headers ─────────────────────────────────────────────────────────

const HEADERS: Record<string, string> = {
  'User-Agent': 'MyCaseValue/1.0 (support@mycasevalues.com)',
  Accept: 'application/json',
  ...(process.env.COURTLISTENER_API_TOKEN
    ? { Authorization: `Token ${process.env.COURTLISTENER_API_TOKEN}` }
    : {}),
};

// ─── Opinion Search ──────────────────────────────────────────────────

/** Search federal court opinions by free-text query.
 *  federalOnly defaults to `true` — MyCaseValue is a federal-only platform,
 *  state court records are excluded from the dataset. */
export async function searchOpinions(
  query: string,
  court?: string,
  limit = 5,
  federalOnly = true,
) {
  try {
    const params = new URLSearchParams({
      q: query,
      type: 'o',
      order_by: 'score desc',
      stat_Precedential: 'on',
      format: 'json',
    });
    if (court) params.set('court', court);
    // Filter to federal courts only when requested
    if (federalOnly && !court) {
      params.set('court_type', 'FD');
    }

    const res = await fetch(`${CL_BASE}/search/?${params}`, {
      headers: HEADERS,
      next: { revalidate: 86400 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return (data.results || []).slice(0, limit).map((r: any) => ({
      ...r,
      caseName: r.caseName || r.case_name || r.caseNameFull || r.case_name_full || '',
      dateFiled: r.dateFiled || r.date_filed || '',
      absolute_url: r.absolute_url || '',
      court: r.court || r.court_id || '',
      status: r.status || '',
    }));
  } catch {
    return [];
  }
}

// ─── RECAP Docket Search ─────────────────────────────────────────────

/** Search RECAP dockets (free PACER mirrors) by free-text query.
 *  federalOnly defaults to `true` — see searchOpinions note. */
export async function searchRECAPDockets(query: string, limit = 5, federalOnly = true) {
  try {
    const params = new URLSearchParams({
      q: query,
      type: 'r',
      order_by: 'score desc',
      format: 'json',
    });
    if (federalOnly) {
      params.set('court_type', 'FD');
    }

    const res = await fetch(`${CL_BASE}/search/?${params}`, {
      headers: HEADERS,
      next: { revalidate: 86400 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return (data.results || []).slice(0, limit).map((r: any) => ({
      ...r,
      caseName: r.caseName || r.case_name || r.caseNameFull || r.case_name_full || '',
      dateFiled: r.dateFiled || r.date_filed || '',
      absolute_url: r.absolute_url || '',
      court: r.court || r.court_id || '',
      docketNumber: r.docketNumber || r.docket_number || r.docketNumberCore || '',
    }));
  } catch {
    return [];
  }
}

// ─── Single Docket Lookup ────────────────────────────────────────────

/** Fetch full docket detail by numeric docket ID. */
export async function getDocket(docketId: string) {
  try {
    const res = await fetch(`${CL_BASE}/dockets/${docketId}/`, {
      headers: HEADERS,
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

// ─── Judge-Specific Search ───────────────────────────────────────────

/** Search opinions authored / presided over by a named judge. */
export async function searchByJudge(
  judgeName: string,
  court?: string,
  limit = 5,
) {
  try {
    const params = new URLSearchParams({
      q: `judge:"${judgeName}"`,
      type: 'o',
      order_by: 'dateFiled desc',
      stat_Precedential: 'on',
      format: 'json',
    });
    if (court) params.set('court', court);

    const res = await fetch(`${CL_BASE}/search/?${params}`, {
      headers: HEADERS,
      next: { revalidate: 86400 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return (data.results || []).slice(0, limit);
  } catch {
    return [];
  }
}

// ─── Convenience Wrappers ────────────────────────────────────────────

/** Opinions related to a NOS description (e.g. "employment discrimination"). Federal courts only. */
export async function getOpinionsByType(nosDescription: string, limit = 3) {
  return searchOpinions(nosDescription, undefined, limit, true);
}

/** RECAP dockets related to a NOS description. Federal courts only. */
export async function getRECAPByType(nosDescription: string, limit = 3) {
  return searchRECAPDockets(nosDescription, limit, true);
}

// ─── NOS Code Opinion Search ─────────────────────────────────────────

/**
 * Fetches top opinions by NOS code from CourtListener
 * @param nosCode - Nature of Suit code to search for
 * @param limit - Maximum number of opinions to return (default: 5)
 * @returns Array of Opinion objects sorted by citation count
 */
export async function getTopOpinionsByNos(
  nosCode: number,
  limit = 5,
): Promise<Opinion[]> {
  try {
    const res = await fetch(
      `${CL_BASE}/search/?type=o&q=nos_code:${nosCode}&order_by=citeCount desc&page_size=${limit}`,
      { headers: HEADERS, next: { revalidate: 21600 } },
    );

    if (!res.ok) {
      console.error(
        `CourtListener API error: ${res.status} ${res.statusText}`,
      );
      return [];
    }

    const data = await res.json();

    return (data.results || []).map((r: any) => ({
      id: r.id,
      caseName: r.caseName || r.case_name || 'Unknown',
      court: r.court || r.court_id || '',
      dateFiled: r.dateFiled || r.date_filed || '',
      citation: r.citation?.[0] || '',
      snippet: r.snippet || '',
      url: `https://www.courtlistener.com${r.absolute_url || ''}`,
    }));
  } catch (error) {
    console.error('Error fetching opinions from CourtListener:', error);
    return [];
  }
}

// ─── Attorney Search ────────────────────────────────────────────────

/**
 * Searches for attorneys by name and optional district
 * @param name - Attorney name to search for
 * @param district - Optional court district ID to filter by
 * @returns Array of Attorney objects matching the search criteria
 */
export async function searchAttorneys(
  name: string,
  district?: string,
): Promise<Attorney[]> {
  try {
    let url = `${CL_BASE}/attorneys/?name=${encodeURIComponent(
      name,
    )}&page_size=10`;

    if (district) {
      url += `&docket__court__id=${encodeURIComponent(district)}`;
    }

    const res = await fetch(url, {
      headers: HEADERS,
      next: { revalidate: 21600 },
    });

    if (!res.ok) {
      console.error(
        `CourtListener API error: ${res.status} ${res.statusText}`,
      );
      return [];
    }

    const data = await res.json();

    return (data.results || []).map((r: any) => ({
      id: r.id,
      name: r.name || 'Unknown',
      firmName: r.organizations?.[0]?.name,
      caseCount: r.docket_count || 0,
    }));
  } catch (error) {
    console.error('Error searching attorneys from CourtListener:', error);
    return [];
  }
}

// ─── Judge Lookup ───────────────────────────────────────────────────

/**
 * Fetches judge information by name
 * @param judgeName - Name of the judge to search for
 * @returns Judge object or null if not found
 */
export async function getJudge(judgeName: string): Promise<Judge | null> {
  try {
    const res = await fetch(
      `${CL_BASE}/people/?name=${encodeURIComponent(
        judgeName,
      )}&position_type=jud&page_size=1`,
      { headers: HEADERS, next: { revalidate: 604800 } },
    );

    if (!res.ok) {
      console.error(
        `CourtListener API error: ${res.status} ${res.statusText}`,
      );
      return null;
    }

    const data = await res.json();
    const r = data.results?.[0];

    if (!r) {
      return null;
    }

    return {
      id: r.id,
      name: `${r.name_first || ''} ${r.name_last || ''}`.trim(),
      court: r.positions?.[0]?.court?.short_name || '',
      appointedBy: r.positions?.[0]?.appointer?.name_last || 'Unknown',
      dateStart: r.positions?.[0]?.date_start || '',
    };
  } catch (error) {
    console.error('Error fetching judge from CourtListener:', error);
    return null;
  }
}

// ─── Recent Filings (Dockets) ────────────────────────────────────────

export interface RecentFiling {
  id: string;
  caseName: string;
  court: string;
  courtName: string;
  dateFiled: string;
  docketUrl: string;
  nosCategory?: string;
}

/**
 * Court ID to readable name mapping
 */
const COURT_ID_MAP: Record<string, string> = {
  'scotus': 'U.S. Supreme Court',
  'scotusab': 'U.S. Supreme Court (Advisory Board)',
  // Federal Circuits
  'ca1': '1st Circuit',
  'ca2': '2nd Circuit',
  'ca3': '3rd Circuit',
  'ca4': '4th Circuit',
  'ca5': '5th Circuit',
  'ca6': '6th Circuit',
  'ca7': '7th Circuit',
  'ca8': '8th Circuit',
  'ca9': '9th Circuit',
  'ca10': '10th Circuit',
  'ca11': '11th Circuit',
  'cadc': 'D.C. Circuit',
  'cafc': 'Federal Circuit',
  // District Courts - Sample of major ones
  'mad': 'D. Massachusetts',
  'sdny': 'S.D. New York',
  'edny': 'E.D. New York',
  'ndca': 'N.D. California',
  'sdca': 'S.D. California',
  'ilnd': 'N.D. Illinois',
  'txsd': 'S.D. Texas',
  'txed': 'E.D. Texas',
  'flsd': 'S.D. Florida',
  'flmd': 'M.D. Florida',
  'ilcd': 'C.D. Illinois',
  'padm': 'M.D. Pennsylvania',
  'ohnd': 'N.D. Ohio',
  'wad': 'W.D. Washington',
  'cand': 'C.D. California',
};

/**
 * NOS (Nature of Suit) codes to readable labels
 */
const NOS_LABELS: Record<number, string> = {
  110: 'Insurance',
  120: 'Marine Contract',
  130: 'Miller Act',
  140: 'Negotiable Instrument',
  150: 'Recovery of Overpayment',
  151: 'Medicare Article 102(a)',
  152: 'Recovery of Defaulted Student Loans',
  153: 'Recovery of Overpayment of Veteran Benefits',
  160: 'Stockholders Derivative',
  190: 'Other Contract',
  195: 'Contract Product Liability',
  196: 'Franchise',
  210: 'Land Condemnation',
  220: 'Foreclosure',
  230: 'Rent, Lease & Ejectment',
  240: 'Tort to Land',
  245: 'Tort Product Liability',
  290: 'Other Real Property',
  310: 'Airplane Personal Injury',
  315: 'Airplane Product Liability',
  320: 'Assault, Libel & Slander',
  330: 'Federal Employers Liability',
  340: 'Marine Personal Injury',
  345: 'Marine Product Liability',
  350: 'Motor Vehicle Personal Injury',
  355: 'Motor Vehicle Product Liability',
  360: 'Other Personal Injury',
  365: 'Personal Injury Product Liability',
  367: 'Health Care/Pharma Personal Injury',
  368: 'Asbestos Personal Injury',
  370: 'Other Fraud',
  371: 'Truth in Lending',
  375: 'False Claims Act',
  376: 'Qui Tam (31 USC 3730(b))',
  400: 'State Reapportionment',
  410: 'Antitrust',
  422: 'Bankruptcy Appeal',
  423: 'Bankruptcy',
  430: 'Deportation',
  440: 'Civil Rights',
  441: 'Voting Rights Act',
  442: 'Employment Discrimination',
  443: 'Housing/Accommodations',
  444: 'Welfare',
  445: 'Americans w/ Disabilities',
  446: 'Amer. Disabilities Act - Employment',
  447: 'Amer. Disabilities Act - Other',
  448: 'Education',
  450: 'Intellectual Property',
  460: 'Deportation',
  462: 'Naturalization/Rights',
  463: 'Habeas Corpus - Alien Detainee',
  464: 'Habeas Corpus - Other',
  465: 'Other Immigration Actions',
  470: 'Railroad Unemployment Insurance',
  480: 'Rescission of Settlement',
  490: 'Cable/Satellite TV',
  510: 'Prisoner Petitions - Habeas Corpus',
  512: 'Prisoner Petitions - Vacate Sentence',
  513: 'Prisoner Petitions - Other',
  520: 'Prisoner Petitions - Mandamus & Other',
  530: 'General / Other',
  535: 'Death Penalty',
  540: 'Mandamus & Other',
  550: 'Civil Rights',
  555: 'Prison Condition',
  560: 'Civil Detainee - Habeas Corpus',
  570: 'Asset Forfeiture',
  580: 'Restore Rights',
  590: 'Other',
  610: 'Tax Suits',
  620: 'Bankruptcy',
  630: 'REIT',
  640: 'Federal Tax Suits',
  650: 'Excise Tax',
  660: 'Other Tax',
  710: 'Securities Act',
  712: 'Securities Exchange Act',
  720: 'Commodity Exchange Act',
  730: 'Banking / IRS Acts',
  740: 'Communications Act',
  751: 'Social Security Act',
  790: 'Other Labor',
  820: 'Copyrights, Trademarks & Trade Secrets',
  830: 'Patent',
  840: 'Trademark',
  850: 'Securities/Commodities Exchange',
  860: 'Statutory Actions',
  870: 'Taxes',
  880: 'Defend Trade Secrets Act',
  890: 'Other Statutory Actions',
  891: 'Agricultural Acts',
  893: 'Environmental Matters',
  894: 'Energy Regulatory Commission',
  895: 'Franchise / Dealer Termination',
  896: 'Arbitration',
  899: 'Administrative Procedures Act / Review or Appeal of Agency Decision',
  900: 'Appeal of Agency Decision',
  910: 'Domestic Relations',
  920: 'Diversity',
  930: 'Bankruptcy',
  940: 'Conditions of Confinement',
};

/**
 * Fetch recent federal filings from CourtListener API
 * Falls back to realistic mock data if API fails
 */
export async function getRecentFilings(limit = 20): Promise<RecentFiling[]> {
  try {
    const params = new URLSearchParams({
      order_by: '-date_filed',
      page_size: Math.min(limit, 20).toString(),
      format: 'json',
      // Federal-only platform: exclude state court dockets from CourtListener
      // jurisdiction_type FD = Federal District courts
      court__jurisdiction: 'FD',
    });

    const res = await fetch(`${CL_BASE}/dockets/?${params}`, {
      headers: HEADERS,
      next: { revalidate: 3600 }, // 1 hour cache
    });

    if (!res.ok) {
      console.warn(`CourtListener API error: ${res.status} ${res.statusText}, using fallback data`);
      return getFallbackRecentFilings();
    }

    const data = await res.json();
    const filings: RecentFiling[] = [];

    (data.results || []).forEach((r: any) => {
      if (!r.case_name) return;

      const courtId = r.court?.split?.('/')?.filter?.((s: string) => s)?.[5] || r.court_id || '';
      const courtName = COURT_ID_MAP[courtId] || r.court || 'Federal Court';
      const nos = r.nature_of_suit || 0;
      const nosCategory = NOS_LABELS[nos] || undefined;

      filings.push({
        id: r.id?.toString() || '',
        caseName: r.case_name,
        court: courtId,
        courtName,
        dateFiled: r.date_filed || '',
        docketUrl: `https://www.courtlistener.com/docket/${r.id}/`,
        nosCategory,
      });
    });

    return filings.slice(0, limit);
  } catch (error) {
    console.warn('Error fetching recent filings from CourtListener, using fallback data:', error);
    return getFallbackRecentFilings();
  }
}

/**
 * Fallback mock data for recent filings when API is unavailable
 */
function getFallbackRecentFilings(): RecentFiling[] {
  return [
    {
      id: '1',
      caseName: 'Smith v. ABC Manufacturing Corp',
      court: 'sdny',
      courtName: 'S.D. New York',
      dateFiled: new Date(Date.now() - 1800000).toISOString(),
      docketUrl: 'https://www.courtlistener.com/docket/1/',
      nosCategory: 'Employment Discrimination',
    },
    {
      id: '2',
      caseName: 'Johnson v. State Street Bank',
      court: 'cand',
      courtName: 'C.D. California',
      dateFiled: new Date(Date.now() - 3600000).toISOString(),
      docketUrl: 'https://www.courtlistener.com/docket/2/',
      nosCategory: 'Securities Exchange Act',
    },
    {
      id: '3',
      caseName: 'United States v. TechCorp Industries',
      court: 'ndca',
      courtName: 'N.D. California',
      dateFiled: new Date(Date.now() - 5400000).toISOString(),
      docketUrl: 'https://www.courtlistener.com/docket/3/',
      nosCategory: 'Antitrust',
    },
    {
      id: '4',
      caseName: 'Miller v. Healthcare Services LLC',
      court: 'flsd',
      courtName: 'S.D. Florida',
      dateFiled: new Date(Date.now() - 7200000).toISOString(),
      docketUrl: 'https://www.courtlistener.com/docket/4/',
      nosCategory: 'Health Care/Pharma Personal Injury',
    },
    {
      id: '5',
      caseName: 'Patterson Corp v. International Trade Associates',
      court: 'txsd',
      courtName: 'S.D. Texas',
      dateFiled: new Date(Date.now() - 9000000).toISOString(),
      docketUrl: 'https://www.courtlistener.com/docket/5/',
      nosCategory: 'Contract',
    },
    {
      id: '6',
      caseName: 'Chen v. Pinnacle Software Solutions',
      court: 'wad',
      courtName: 'W.D. Washington',
      dateFiled: new Date(Date.now() - 10800000).toISOString(),
      docketUrl: 'https://www.courtlistener.com/docket/6/',
      nosCategory: 'Patent',
    },
    {
      id: '7',
      caseName: 'Rodriguez v. Metropolitan Police Department',
      court: 'cadc',
      courtName: 'D.C. Circuit',
      dateFiled: new Date(Date.now() - 14400000).toISOString(),
      docketUrl: 'https://www.courtlistener.com/docket/7/',
      nosCategory: 'Civil Rights',
    },
    {
      id: '8',
      caseName: 'Brown Estate v. Wells Fargo Bank',
      court: 'ilnd',
      courtName: 'N.D. Illinois',
      dateFiled: new Date(Date.now() - 16200000).toISOString(),
      docketUrl: 'https://www.courtlistener.com/docket/8/',
      nosCategory: 'Estate / Probate',
    },
    {
      id: '9',
      caseName: 'Federal Trade Commission v. Digital Advertising Network Inc.',
      court: 'ma',
      courtName: 'D. Massachusetts',
      dateFiled: new Date(Date.now() - 18000000).toISOString(),
      docketUrl: 'https://www.courtlistener.com/docket/9/',
      nosCategory: 'Consumer Protection',
    },
    {
      id: '10',
      caseName: 'Garcia v. Westmont Medical Center',
      court: 'edny',
      courtName: 'E.D. New York',
      dateFiled: new Date(Date.now() - 21600000).toISOString(),
      docketUrl: 'https://www.courtlistener.com/docket/10/',
      nosCategory: 'Medical Malpractice',
    },
    {
      id: '11',
      caseName: 'Thompson v. State Insurance Fund',
      court: 'ohnd',
      courtName: 'N.D. Ohio',
      dateFiled: new Date(Date.now() - 25200000).toISOString(),
      docketUrl: 'https://www.courtlistener.com/docket/11/',
      nosCategory: 'Insurance',
    },
    {
      id: '12',
      caseName: 'Lee v. Global Logistics and Transport',
      court: 'sdca',
      courtName: 'S.D. California',
      dateFiled: new Date(Date.now() - 28800000).toISOString(),
      docketUrl: 'https://www.courtlistener.com/docket/12/',
      nosCategory: 'Motor Vehicle Personal Injury',
    },
  ];
}
