/**
 * District Filing Volume Trends (2015-2024)
 * Generates 10-year filing volume trends for all federal districts
 * Uses seeded pseudo-random generation based on district code
 * Base filing volumes calibrated to district size
 */

/**
 * Seeded pseudo-random number generator
 * Produces deterministic values based on input seed
 */
function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

/**
 * Get base filing volume for a district
 * Large districts (e.g., SDNY): 10,000-15,000/year
 * Medium districts: 3,000-8,000/year
 * Small districts: 500-2,000/year
 */
function getBaseVolume(districtCode: string): number {
  // Large, high-volume districts
  const largeDistricts: Record<string, number> = {
    'SDNY': 12500,  // Southern District of New York
    'CDCA': 11000,  // Central District of California
    'NDCA': 9500,   // Northern District of California
    'EDPA': 8500,   // Eastern District of Pennsylvania
    'NDIL': 10200,  // Northern District of Illinois
    'EDTX': 9800,   // Eastern District of Texas
    'SDTX': 8900,   // Southern District of Texas
    'MDFL': 8200,   // Middle District of Florida
    'SDFL': 8700,   // Southern District of Florida
    'NDGA': 7800,   // Northern District of Georgia
  };

  if (largeDistricts[districtCode]) {
    return largeDistricts[districtCode];
  }

  // Medium-sized districts
  const mediumDistricts: Record<string, number> = {
    'EDNY': 6500, 'WDNY': 4200, 'NDNY': 3800,
    'NJDN': 5900, 'MDPA': 4100, 'WDPA': 3200,
    'EDVA': 5200, 'MDNC': 4600, 'WDNC': 3900,
    'EDLA': 5100, 'MDLA': 3200, 'NDTX': 6800,
    'NDFL': 5800, 'SDGA': 5200, 'MDGA': 4100,
  };

  if (mediumDistricts[districtCode]) {
    return mediumDistricts[districtCode];
  }

  // Default: smaller districts
  return 1800;
}

/**
 * Generate filing volume for a specific year
 * Includes trend and annual variation
 */
function getYearVolume(baseVolume: number, year: number, districtSeed: number): number {
  // Trend: slight increase from 2015-2024
  const yearOffset = year - 2015;
  const trendFactor = 1 + (yearOffset * 0.02); // ~2% annual growth on average

  // Annual variation: -5% to +8%
  const variationSeed = districtSeed + year;
  const variation = 0.95 + seededRandom(variationSeed) * 0.13;

  const volume = Math.round(baseVolume * trendFactor * variation);
  return Math.max(100, volume); // Ensure at least 100 filings
}

/**
 * All federal district codes
 */
const DISTRICT_CODES = [
  'AKDN', 'AZDN', 'CACD', 'CAED', 'CAND', 'CASD', 'CDIL', 'CODN', 'CTDN', 'DCDN',
  'DEDN', 'EDAR', 'EDKY', 'EDLA', 'EDMI', 'EDMO', 'EDNC', 'EDNY', 'EDOK', 'EDPA',
  'EDTN', 'EDTX', 'EDVA', 'EDWA', 'EDWI', 'GUDN', 'HIDN', 'IDDN', 'KSDN', 'MADN',
  'MDAL', 'MDDN', 'MDFL', 'MDGA', 'MDLA', 'MDNC', 'MDPA', 'MDTN', 'MEDN', 'MNDN',
  'MPDN', 'MTDN', 'NDAL', 'NDDN', 'NDFL', 'NDGA', 'NDIA', 'NDIL', 'NDIN', 'NDMS',
  'NDNY', 'NDOH', 'NDOK', 'NDTX', 'NDWV', 'NEDN', 'NHDN', 'NJDN', 'NMDN', 'NVDN',
  'ORDN', 'PRDN', 'RIDN', 'SCDN', 'SDAL', 'SDDN', 'SDFL', 'SDGA', 'SDIA', 'SDIL',
  'SDIN', 'SDMS', 'SDNY', 'SDOH', 'SDTX', 'SDWV', 'UTDN', 'VIDN', 'VTDN', 'WDAR',
  'WDKY', 'WDLA', 'WDMI', 'WDMO', 'WDNC', 'WDNY', 'WDOK', 'WDPA', 'WDTN', 'WDTX',
  'WDVA', 'WDWA', 'WDWI', 'WYDN',
];

/**
 * Generate filing trends for all districts
 * Returns a record mapping district code to array of year/filings data
 */
function generateAllDistrictTrends(): Record<string, Array<{ year: number; filings: number }>> {
  const trends: Record<string, Array<{ year: number; filings: number }>> = {};

  DISTRICT_CODES.forEach((districtCode) => {
    const baseVolume = getBaseVolume(districtCode);
    const districtSeed = districtCode.charCodeAt(0) * 31 + districtCode.charCodeAt(1);

    const yearData: Array<{ year: number; filings: number }> = [];
    for (let year = 2015; year <= 2024; year++) {
      yearData.push({
        year,
        filings: getYearVolume(baseVolume, year, districtSeed),
      });
    }

    trends[districtCode] = yearData;
  });

  return trends;
}

/**
 * Export filing volume trends for all districts
 * Structure: { 'SDNY': [{ year: 2015, filings: 12345 }, ...], ... }
 */
export const DISTRICT_FILING_TRENDS: Record<string, Array<{ year: number; filings: number }>> =
  generateAllDistrictTrends();
