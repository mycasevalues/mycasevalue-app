/**
 * CourtListener API client — Search API for opinions + RECAP API for dockets.
 * https://www.courtlistener.com/api/rest/v4/
 *
 * All endpoints are public / unauthenticated. We set a polite User-Agent and
 * cache aggressively (24 h for search, 1 h for individual docket lookups).
 */

const CL_BASE = 'https://www.courtlistener.com/api/rest/v4';

const HEADERS: Record<string, string> = {
  'User-Agent': 'MyCaseValue/1.0 (support@mycasevalue.com)',
  Accept: 'application/json',
};

// ─── Opinion Search ──────────────────────────────────────────────────

/** Search federal court opinions by free-text query. */
export async function searchOpinions(
  query: string,
  court?: string,
  limit = 5,
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

// ─── RECAP Docket Search ─────────────────────────────────────────────

/** Search RECAP dockets (free PACER mirrors) by free-text query. */
export async function searchRECAPDockets(query: string, limit = 5) {
  try {
    const params = new URLSearchParams({
      q: query,
      type: 'r',
      order_by: 'score desc',
      format: 'json',
    });

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

/** Opinions related to a NOS description (e.g. "employment discrimination"). */
export async function getOpinionsByType(nosDescription: string, limit = 3) {
  return searchOpinions(nosDescription, undefined, limit);
}

/** RECAP dockets related to a NOS description. */
export async function getRECAPByType(nosDescription: string, limit = 3) {
  return searchRECAPDockets(nosDescription, limit);
}
