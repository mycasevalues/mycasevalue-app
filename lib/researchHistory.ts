/**
 * researchHistory.ts — Westlaw-style client-side research trail
 *
 * Persists the last N routes a user has visited in localStorage so the
 * Header "History" dropdown can show recent research. No server round-trip,
 * no PII — just the pathname + a derived label + visit timestamp.
 *
 * Storage key: mcv-research-history
 * Max entries: 10
 */

export interface ResearchHistoryEntry {
  /** Canonical pathname, e.g. "/judges/1234" */
  href: string;
  /** Human-readable label derived from pathname or document.title */
  label: string;
  /** Section bucket for grouping/filtering, e.g. "Judge", "District", "Case" */
  kind: string;
  /** Unix ms timestamp of the visit */
  ts: number;
}

const STORAGE_KEY = 'mcv-research-history';
const MAX_ENTRIES = 10;

export function readResearchHistory(): ResearchHistoryEntry[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (e): e is ResearchHistoryEntry =>
        e &&
        typeof e.href === 'string' &&
        typeof e.label === 'string' &&
        typeof e.kind === 'string' &&
        typeof e.ts === 'number',
    );
  } catch {
    return [];
  }
}

export function pushResearchHistory(entry: Omit<ResearchHistoryEntry, 'ts'>): void {
  if (typeof window === 'undefined') return;
  try {
    const current = readResearchHistory();
    const deduped = current.filter((e) => e.href !== entry.href);
    const next = [{ ...entry, ts: Date.now() }, ...deduped].slice(0, MAX_ENTRIES);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    // Notify listeners in the same tab (storage event only fires cross-tab).
    window.dispatchEvent(new CustomEvent('mcv-research-history'));
  } catch {
    /* localStorage full / disabled — silently ignore */
  }
}

export function clearResearchHistory(): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new CustomEvent('mcv-research-history'));
  } catch {
    /* ignore */
  }
}

/**
 * Derive a friendly label + kind from a pathname. Returns null for paths
 * that shouldn't be tracked (homepage, generic listings, legal pages).
 */
export function classifyPath(pathname: string, documentTitle?: string): {
  label: string;
  kind: string;
} | null {
  const segs = pathname.split('/').filter(Boolean);
  if (segs.length === 0) return null;

  // Judge detail: /judges/[id]
  if (segs[0] === 'judges' && segs.length >= 2) {
    const fromTitle = documentTitle?.split(' — ')[0]?.trim();
    return {
      label: fromTitle || `Judge ${segs[1]}`,
      kind: 'Judge',
    };
  }
  // District detail: /districts/[code]
  if (segs[0] === 'districts' && segs.length >= 2) {
    return {
      label: segs[1].toUpperCase(),
      kind: 'District',
    };
  }
  // Case detail: /case/[id]
  if (segs[0] === 'case' && segs.length >= 2) {
    const fromTitle = documentTitle?.split(' — ')[0]?.trim();
    return {
      label: fromTitle || `Case ${segs[1]}`,
      kind: 'Case',
    };
  }
  // Case type: /cases/[category]/[slug]
  if (segs[0] === 'cases' && segs.length >= 3) {
    const slug = segs[segs.length - 1]
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (c) => c.toUpperCase());
    return { label: slug, kind: 'Case Type' };
  }
  // NOS guide: /nos/[code]/guide
  if (segs[0] === 'nos' && segs.length >= 3 && segs[2] === 'guide') {
    return { label: `NOS ${segs[1]} Guide`, kind: 'NOS' };
  }

  return null;
}
