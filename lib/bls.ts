// BLS API integration for CPI inflation adjustment
const BLS_BASE = 'https://api.bls.gov/publicAPI/v2/timeseries/data/';
const CPI_SERIES = 'CUUR0000SA0'; // CPI-U All Urban Consumers

interface CPIData {
  year: string;
  period: string;
  value: string;
  periodName: string;
}

// Fallback CPI values (annual averages) if API is unavailable
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

export async function getCPIForYear(year: number): Promise<number> {
  const yearStr = String(year);
  if (CPI_FALLBACK[yearStr]) return CPI_FALLBACK[yearStr];

  try {
    const apiKey = process.env.BLS_API_KEY;
    const url = apiKey
      ? `${BLS_BASE}${CPI_SERIES}?registrationkey=${apiKey}&startyear=${year}&endyear=${year}`
      : `${BLS_BASE}${CPI_SERIES}?startyear=${year}&endyear=${year}`;

    const res = await fetch(url, { next: { revalidate: 86400 } } as unknown as RequestInit);
    if (!res.ok) return CPI_FALLBACK[yearStr] || 314.2;

    const data = await res.json() as Record<string, unknown>;
    const resultsData = data.Results as Record<string, unknown> | undefined;
    const series = (resultsData?.series as Array<Record<string, unknown>>) || [];

    if (data.status === 'REQUEST_SUCCEEDED' && series[0]?.data) {
      const dataArray = (series[0].data as Array<CPIData>) || [];
      const annualData = dataArray.filter((d: CPIData) => d.period === 'M13');
      if (annualData.length > 0) return parseFloat(annualData[0].value);
      if (dataArray.length > 0) return parseFloat(dataArray[0].value);
    }
  } catch (e) {
    console.warn(`[BLS] Failed to fetch CPI for ${year}:`, e);
  }

  return CPI_FALLBACK[yearStr] || 314.2;
}

export function adjustForInflation(amount: number, fromYear: number, toYear: number = 2024): number {
  const fromCPI = CPI_FALLBACK[String(fromYear)];
  const toCPI = CPI_FALLBACK[String(toYear)];
  if (!fromCPI || !toCPI) return amount;
  return Math.round(amount * (toCPI / fromCPI));
}

export function getInflationRate(fromYear: number, toYear: number): number {
  const fromCPI = CPI_FALLBACK[String(fromYear)];
  const toCPI = CPI_FALLBACK[String(toYear)];
  if (!fromCPI || !toCPI) return 0;
  return ((toCPI - fromCPI) / fromCPI) * 100;
}
