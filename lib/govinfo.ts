// GovInfo API — Federal court opinions, rules, and statutory text
const GOVINFO_BASE = 'https://api.govinfo.gov';

interface GovInfoCollection {
  collectionCode: string;
  collectionName: string;
  packageCount: number;
  granuleCount: number;
}

interface GovInfoPackage {
  packageId: string;
  title: string;
  dateIssued: string;
  collectionCode: string;
  governmentAuthor1: string;
  category: string;
}

export async function searchGovInfo(query: string, collection = 'USCOURTS', limit = 20): Promise<GovInfoPackage[]> {
  const apiKey = process.env.GOVINFO_API_KEY;
  if (!apiKey) {
    console.warn('[GovInfo] API key not configured');
    return [];
  }

  try {
    const url = `${GOVINFO_BASE}/search?query=${encodeURIComponent(query)}&collection=${collection}&pageSize=${limit}&api_key=${apiKey}`;
    const res = await fetch(url, { next: { revalidate: 3600 } } as unknown as RequestInit);
    if (!res.ok) return [];

    const data = await res.json() as Record<string, unknown>;
    const results = (data.results as Array<Record<string, unknown>>) || [];
    return results.map((r: Record<string, unknown>) => ({
      packageId: String(r.packageId || ''),
      title: String(r.title || ''),
      dateIssued: String(r.dateIssued || ''),
      collectionCode: String(r.collectionCode || collection),
      governmentAuthor1: String(r.governmentAuthor1 || ''),
      category: String(r.category || ''),
    }));
  } catch (e) {
    console.warn('[GovInfo] Search failed:', e);
    return [];
  }
}

export async function getFederalRuleText(title: string, section: string): Promise<string | null> {
  const apiKey = process.env.GOVINFO_API_KEY;
  if (!apiKey) return null;

  try {
    const year = new Date().getFullYear();
    const url = `${GOVINFO_BASE}/packages/USCODE-${year}-title${title}/granules/USCODE-${year}-title${title}-sec${section}?api_key=${apiKey}`;
    const res = await fetch(url, { next: { revalidate: 604800 } } as unknown as RequestInit);
    if (!res.ok) return null;

    const data = await res.json() as Record<string, unknown>;
    return String(data.title || null);
  } catch (e) {
    console.warn('[GovInfo] Rule text fetch failed:', e);
    return null;
  }
}

export async function getCollections(): Promise<GovInfoCollection[]> {
  const apiKey = process.env.GOVINFO_API_KEY;
  if (!apiKey) return [];

  try {
    const res = await fetch(`${GOVINFO_BASE}/collections?api_key=${apiKey}`, { next: { revalidate: 86400 } } as unknown as RequestInit);
    if (!res.ok) return [];

    const data = await res.json() as Record<string, unknown>;
    const collections = (data.collections as Array<GovInfoCollection>) || [];
    return collections;
  } catch (e) {
    console.warn('[GovInfo] Collections fetch failed:', e);
    return [];
  }
}
