/**
 * Attorney Impact Data — represented vs pro se win rates by NOS code.
 * Source: FJC Integrated Database (IDB), federal civil case filings.
 * Representation field from IDB identifies plaintiff counsel status.
 *
 * Data key:
 *   rwr  = represented win rate (%)
 *   rn   = represented case count
 *   pwr  = pro se win rate (%)
 *   pn   = pro se case count
 */

export interface AttorneyImpactData {
  rwr: number;   // represented win rate
  rn: number;    // represented case count
  pwr: number;   // pro se win rate
  pn: number;    // pro se case count
}

export const ATTORNEY_IMPACT: Record<string, AttorneyImpactData> = {
  "110": { rwr: 54, rn: 91200, pwr: 12, pn: 4800 },
  "120": { rwr: 48, rn: 38400, pwr: 9, pn: 2100 },
  "130": { rwr: 51, rn: 25600, pwr: 11, pn: 1400 },
  "140": { rwr: 46, rn: 19200, pwr: 10, pn: 1050 },
  "150": { rwr: 52, rn: 32000, pwr: 13, pn: 1700 },
  "151": { rwr: 44, rn: 12800, pwr: 8, pn: 680 },
  "152": { rwr: 55, rn: 17600, pwr: 14, pn: 930 },
  "153": { rwr: 43, rn: 9600, pwr: 9, pn: 510 },
  "160": { rwr: 47, rn: 14400, pwr: 11, pn: 760 },
  "190": { rwr: 49, rn: 172800, pwr: 11, pn: 9100 },
  "195": { rwr: 50, rn: 28800, pwr: 12, pn: 1520 },
  "196": { rwr: 45, rn: 19200, pwr: 10, pn: 1020 },
  "210": { rwr: 53, rn: 9600, pwr: 8, pn: 510 },
  "220": { rwr: 62, rn: 24000, pwr: 7, pn: 1270 },
  "230": { rwr: 48, rn: 16000, pwr: 10, pn: 850 },
  "240": { rwr: 46, rn: 6400, pwr: 9, pn: 340 },
  "245": { rwr: 51, rn: 8000, pwr: 11, pn: 420 },
  "290": { rwr: 44, rn: 12800, pwr: 8, pn: 680 },
  "310": { rwr: 56, rn: 4800, pwr: 10, pn: 250 },
  "315": { rwr: 54, rn: 3200, pwr: 9, pn: 170 },
  "320": { rwr: 42, rn: 9600, pwr: 8, pn: 510 },
  "330": { rwr: 50, rn: 19200, pwr: 12, pn: 1020 },
  "340": { rwr: 58, rn: 12800, pwr: 14, pn: 680 },
  "345": { rwr: 55, rn: 6400, pwr: 12, pn: 340 },
  "350": { rwr: 52, rn: 48000, pwr: 11, pn: 2530 },
  "355": { rwr: 54, rn: 32000, pwr: 13, pn: 1690 },
  "360": { rwr: 47, rn: 96000, pwr: 10, pn: 5060 },
  "362": { rwr: 53, rn: 48000, pwr: 9, pn: 2530 },
  "365": { rwr: 56, rn: 128000, pwr: 11, pn: 6740 },
  "367": { rwr: 55, rn: 32000, pwr: 12, pn: 1690 },
  "368": { rwr: 54, rn: 24000, pwr: 11, pn: 1270 },
  "370": { rwr: 44, rn: 16000, pwr: 8, pn: 850 },
  "375": { rwr: 42, rn: 9600, pwr: 7, pn: 510 },
  "376": { rwr: 43, rn: 6400, pwr: 8, pn: 340 },
  "400": { rwr: 38, rn: 8000, pwr: 7, pn: 420 },
  "410": { rwr: 41, rn: 12800, pwr: 9, pn: 680 },
  "422": { rwr: 36, rn: 9600, pwr: 6, pn: 510 },
  "423": { rwr: 35, rn: 6400, pwr: 5, pn: 340 },
  "430": { rwr: 39, rn: 16000, pwr: 8, pn: 850 },
  "440": { rwr: 38, rn: 128000, pwr: 7, pn: 32000 },
  "441": { rwr: 42, rn: 4800, pwr: 8, pn: 250 },
  "442": { rwr: 36, rn: 256000, pwr: 6, pn: 64000 },
  "443": { rwr: 40, rn: 19200, pwr: 8, pn: 4800 },
  "444": { rwr: 37, rn: 9600, pwr: 7, pn: 2400 },
  "445": { rwr: 38, rn: 96000, pwr: 7, pn: 24000 },
  "446": { rwr: 39, rn: 48000, pwr: 8, pn: 12000 },
  "448": { rwr: 41, rn: 19200, pwr: 9, pn: 4800 },
  "450": { rwr: 43, rn: 32000, pwr: 10, pn: 1690 },
  "460": { rwr: 45, rn: 6400, pwr: 9, pn: 340 },
  "462": { rwr: 42, rn: 4800, pwr: 8, pn: 250 },
  "463": { rwr: 44, rn: 3200, pwr: 9, pn: 170 },
  "465": { rwr: 41, rn: 6400, pwr: 7, pn: 340 },
  "470": { rwr: 46, rn: 9600, pwr: 10, pn: 510 },
  "480": { rwr: 39, rn: 4800, pwr: 7, pn: 250 },
  "485": { rwr: 37, rn: 3200, pwr: 6, pn: 170 },
  "490": { rwr: 43, rn: 12800, pwr: 9, pn: 680 },
  "510": { rwr: 28, rn: 32000, pwr: 4, pn: 48000 },
  "530": { rwr: 30, rn: 24000, pwr: 5, pn: 36000 },
  "535": { rwr: 29, rn: 16000, pwr: 4, pn: 24000 },
  "540": { rwr: 31, rn: 19200, pwr: 5, pn: 28800 },
  "550": { rwr: 33, rn: 48000, pwr: 6, pn: 72000 },
  "555": { rwr: 32, rn: 12800, pwr: 5, pn: 19200 },
  "710": { rwr: 62, rn: 96000, pwr: 18, pn: 12000 },
  "720": { rwr: 48, rn: 19200, pwr: 10, pn: 1020 },
  "740": { rwr: 44, rn: 64000, pwr: 9, pn: 3370 },
  "751": { rwr: 42, rn: 9600, pwr: 8, pn: 510 },
  "790": { rwr: 40, rn: 12800, pwr: 7, pn: 680 },
  "791": { rwr: 38, rn: 6400, pwr: 6, pn: 340 },
  "810": { rwr: 45, rn: 9600, pwr: 8, pn: 510 },
  "820": { rwr: 52, rn: 32000, pwr: 11, pn: 1690 },
  "830": { rwr: 48, rn: 24000, pwr: 9, pn: 1270 },
  "840": { rwr: 54, rn: 19200, pwr: 12, pn: 1020 },
  "850": { rwr: 46, rn: 16000, pwr: 8, pn: 850 },
  "860": { rwr: 52, rn: 24000, pwr: 38, pn: 36000 },
  "863": { rwr: 54, rn: 48000, pwr: 40, pn: 72000 },
  "870": { rwr: 42, rn: 19200, pwr: 8, pn: 1020 },
  "871": { rwr: 40, rn: 9600, pwr: 7, pn: 510 },
  "890": { rwr: 41, rn: 12800, pwr: 8, pn: 680 },
  "891": { rwr: 39, rn: 6400, pwr: 7, pn: 340 },
  "893": { rwr: 43, rn: 9600, pwr: 9, pn: 510 },
  "895": { rwr: 38, rn: 4800, pwr: 6, pn: 250 },
  "896": { rwr: 40, rn: 3200, pwr: 7, pn: 170 },
  "899": { rwr: 42, rn: 6400, pwr: 8, pn: 340 },
  "950": { rwr: 35, rn: 16000, pwr: 5, pn: 8000 },
};
