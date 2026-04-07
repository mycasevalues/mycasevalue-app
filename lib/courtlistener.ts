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
  'User-Agent': 'MyCaseValue/1.0 (support@mycasevalue.com)',
  Accept: 'application/json',
  ...(process.env.COURTLISTENER_API_TOKEN
    ? { Authorization: `Token ${process.env.COURTLISTENER_API_TOKEN}` }
    : {}),
};

// ─── Opinion Search ──────────────────────────────────────────────────

/** Search federal court opinions by free-text query. */
export async function searchOpinions(
  query: string,
  court?: string,
  limit = 5,
  federalOnly = false,
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

/** Search RECAP dockets (free PACER mirrors) by free-text query. */
export async function searchRECAPDockets(query: string, limit = 5, federalOnly = false) {
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
