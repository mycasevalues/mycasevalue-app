/**
 * BLS API integration for CPI inflation adjustment.
 * Fetches annual CPI-U (All Items, All Urban Consumers) data for inflation calculations.
 * Features 30-day in-memory cache (future: migrate to Supabase for distributed caching).
 */

const BLS_BASE = 'https://api.bls.gov/publicAPI/v2/timeseries/data/';
const CPI_SERIES = 'CUUR0000SA0'; // CPI-U All Items, All Urban Consumers
const CACHE_TTL_MS = 30 * 24 * 60 * 60 * 1000; // 30 days in milliseconds

interface CPIData {
  year: string;
  period: string;
  value: string;
  periodName: string;
}

interface CacheEntry {
  data: Record<string, number>;
  timestamp: number;
}

// In-memory cache (module-level). Future: migrate to Supabase for distributed caching.
const cpiCache = new Map<string, CacheEntry>();

// Hardcoded fallback CPI-U values (annual averages) for years 2010-2024
const CPI_FALLBACK: Record<string, number> = {
  '2024': 314.2, '2023': 304.7, '2022': 292.7, '2021': 270.97,
  '2020': 258.81, '2019': 255.66, '2018': 251.1, '2017': 245.12,
  '2016': 240.01, '2015': 237.02, '2014': 236.74, '2013': 232.96,
  '2012': 229.59, '2011': 224.94, '2010': 218.06, '2009': 214.54,
  '2008': 215.3, '2007': 207.34, '2006': 201.6, '2005': 195.27,
  '2004': 188.91, '2003': 183.96, '2002': 179.88, '2001': 177.04,
  '2000': 172.19, '1999': 166.58, '1998': 163.0, '1997': 160.53,
  '1996': 156.86, '1995': 152.38, '1994': 148.23, '1993': 144.48,
  '1992': 140.31, '1991': 136.17, '1990': 130.66,
};

/**
 * Retrieve CPI data, using cache when available and falling back to hardcoded values.
 * The cache is keyed by a simple string "cpi" and stores all CPI data.
 * @param year - The year to fetch CPI for
 * @returns The CPI-U value for that year
 */
export async function getCPIData(): Promise<Record<string, number>> {
  const cacheKey = 'cpi';
  const cached = cpiCache.get(cacheKey);

  // Return cached data if available and not expired
  if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
    return cached.data;
  }

  try {
    const apiKey = process.env.BLS_API_KEY;
    const url = apiKey
      ? `${BLS_BASE}${CPI_SERIES}?registrationkey=${apiKey}&startyear=2010&endyear=2024`
      : `${BLS_BASE}${CPI_SERIES}?startyear=2010&endyear=2024`;

    const res = await fetch(url, { next: { revalidate: 86400 } } as unknown as RequestInit);
    if (!res.ok) {
      // Return fallback on API failure
      cpiCache.set(cacheKey, { data: CPI_FALLBACK, timestamp: Date.now() });
      return CPI_FALLBACK;
    }

    const data = await res.json() as Record<string, unknown>;
    const resultsData = data.Results as Record<string, unknown> | undefined;
    const series = (resultsData?.series as Array<Record<string, unknown>>) || [];

    if (data.status === 'REQUEST_SUCCEEDED' && series[0]?.data) {
      const dataArray = (series[0].data as Array<CPIData>) || [];
      const cpiData: Record<string, number> = { ...CPI_FALLBACK };

      // Extract annual data (period M13 indicates annual average)
      dataArray.forEach((d: CPIData) => {
        if (d.period === 'M13') {
          cpiData[d.year] = parseFloat(d.value);
        }
      });

      cpiCache.set(cacheKey, { data: cpiData, timestamp: Date.now() });
      return cpiData;
    }
  } catch (e) {
    console.warn('[BLS] Failed to fetch CPI data:', e);
  }

  // Return fallback on any error
  cpiCache.set(cacheKey, { data: CPI_FALLBACK, timestamp: Date.now() });
  return CPI_FALLBACK;
}

/**
 * Adjust a settlement amount for inflation.
 * @param amount - The settlement amount in thousands (as stored in REAL_DATA)
 * @param sourceYear - The year the amount was measured in
 * @param targetYear - The year to adjust to (default: 2024)
 * @returns The inflation-adjusted amount in thousands
 */
export function adjustForInflation(amount: number, sourceYear: number, targetYear: number = 2024): number {
  const fromCPI = CPI_FALLBACK[String(sourceYear)];
  const toCPI = CPI_FALLBACK[String(targetYear)];

  if (!fromCPI || !toCPI) {
    return amount;
  }

  return Math.round(amount * (toCPI / fromCPI) * 100) / 100;
}
