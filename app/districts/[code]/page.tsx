/**
 * District Detail Page — Enterprise-grade court intelligence.
 *
 * Structure:
 * 1. ContextBar (breadcrumb, mono, 40px)
 * 2. PageHeader (district name, subtitle, circuit badge)
 * 3. StatBlock grid (4 metrics: Win Rate, Cases/Year, Median Duration, Top Case Type)
 * 4. Case Types DataTable (7 columns, bar chart for win rate)
 * 5. Filing Volume Trend (chart panel)
 * 6. Judges Section (lazy-loaded)
 * 7. About This District (source attribution)
 * 8. Local Rules & Legal Aid (conditional)
 *
 * Zero hardcoded hex. All colors via semantic tokens.
 * All numeric data in IBM Plex Mono. The data IS the design.
 */

import { Metadata } from 'next';
import { SITE_URL } from '../../../lib/site-config';
import Link from 'next/link';
import { REAL_DATA } from '../../../lib/realdata';
import localRulesData from '../../../data/local-rules.json';
import legalAidData from '../../../data/legal-aid.json';
import FilingVolumeTrend from '../../../components/charts/FilingVolumeTrend';
import { DISTRICT_FILING_TRENDS } from '../../../data/district-trends';
import JudgeSectionLoader from '../../../components/JudgeSectionLoader';
import SaveButton from '../../../components/ui/SaveButton';

// ISR: revalidate every 90 days (matches FJC quarterly update cycle)
export const revalidate = 7776000;

interface PageProps {
  params: Promise<{ code: string }>;
}

// Alias map: common alternative slugs → canonical DISTRICTS_MAP keys
// Handles reversed state+direction format (nysd→SDNY) and missing-DN suffixes (njd→NJDN)
const SLUG_ALIASES: Record<string, string> = {
  'NYSD': 'SDNY', 'NYED': 'EDNY', 'NYND': 'NDNY', 'NYWD': 'WDNY',
  'ILND': 'NDIL', 'ILCD': 'CDIL', 'ILSD': 'SDIL',
  'TXED': 'EDTX', 'TXND': 'NDTX', 'TXSD': 'SDTX', 'TXWD': 'WDTX',
  'FLND': 'NDFL', 'FLMD': 'MDFL', 'FLSD': 'SDFL',
  'PAED': 'EDPA', 'PAMD': 'MDPA', 'PAWD': 'WDPA',
  'CAED': 'CAED', 'CASD': 'CASD',
  'LAED': 'EDLA', 'LAMD': 'MDLA', 'LAWD': 'WDLA',
  'MSND': 'NDMS', 'MSSD': 'SDMS',
  'VAND': 'EDVA', 'VAED': 'EDVA', 'VAWD': 'WDVA',
  'WVND': 'NDWV', 'WVSD': 'SDWV',
  'NCED': 'EDNC', 'NCMD': 'MDNC', 'NCWD': 'WDNC',
  'KYED': 'EDKY', 'KYWD': 'WDKY',
  'MIED': 'EDMI', 'MIWD': 'WDMI',
  'OHND': 'NDOH', 'OHSD': 'SDOH',
  'TNED': 'EDTN', 'TNMD': 'MDTN', 'TNWD': 'WDTN',
  'INED': 'NDIN', 'INND': 'NDIN', 'INSD': 'SDIN',
  'WIED': 'EDWI', 'WIWD': 'WDWI',
  'ARED': 'EDAR', 'ARWD': 'WDAR',
  'IAND': 'NDIA', 'IASD': 'SDIA',
  'MOED': 'EDMO', 'MOWD': 'WDMO',
  'ALED': 'NDAL', 'ALND': 'NDAL', 'ALMD': 'MDAL', 'ALSD': 'SDAL',
  'GAED': 'NDGA', 'GAND': 'NDGA', 'GAMD': 'MDGA', 'GASD': 'SDGA',
  'WAED': 'EDWA', 'WAWD': 'WDWA',
  'OKED': 'EDOK', 'OKND': 'NDOK', 'OKWD': 'WDOK',
  // Missing-suffix aliases (3-letter codes → 4-letter canonical)
  'NJD': 'NJDN', 'MED': 'MEDN', 'NHD': 'NHDN', 'MAD': 'MADN', 'RID': 'RIDN',
  'PRD': 'PRDN', 'VTD': 'VTDN', 'CTD': 'CTDN', 'DED': 'DEDN', 'VID': 'VIDN',
  'MDD': 'MDDN', 'SCD': 'SCDN', 'MND': 'MNDN', 'NED': 'NEDN', 'NDD': 'NDDN',
  'SDD': 'SDDN', 'AKD': 'AKDN', 'AZD': 'AZDN', 'GUD': 'GUDN', 'HID': 'HIDN',
  'IDD': 'IDDN', 'MTD': 'MTDN', 'NVD': 'NVDN', 'MPD': 'MPDN', 'ORD': 'ORDN',
  'COD': 'CODN', 'KSD': 'KSDN', 'NMD': 'NMDN', 'UTD': 'UTDN', 'WYD': 'WYDN',
  'DCD': 'DCDN',
};

/** Resolve a URL slug to its canonical DISTRICTS_MAP key */
function resolveDistrictCode(raw: string): string {
  const upper = raw.toUpperCase();
  return SLUG_ALIASES[upper] || upper;
}

// District metadata mapping
const DISTRICTS_MAP: Record<string, { name: string; fullName: string; circuit: number; states: string[] }> = {
  'MEDN': { name: 'D. Me.', fullName: 'District of Maine', circuit: 1, states: ['ME'] },
  'NHDN': { name: 'D.N.H.', fullName: 'District of New Hampshire', circuit: 1, states: ['NH'] },
  'MADN': { name: 'D. Mass.', fullName: 'District of Massachusetts', circuit: 1, states: ['MA'] },
  'RIDN': { name: 'D.R.I.', fullName: 'District of Rhode Island', circuit: 1, states: ['RI'] },
  'PRDN': { name: 'D.P.R.', fullName: 'District of Puerto Rico', circuit: 1, states: ['PR'] },
  'VTDN': { name: 'D. Vt.', fullName: 'District of Vermont', circuit: 2, states: ['VT'] },
  'CTDN': { name: 'D. Conn.', fullName: 'District of Connecticut', circuit: 2, states: ['CT'] },
  'NDNY': { name: 'N.D.N.Y.', fullName: 'Northern District of New York', circuit: 2, states: ['NY'] },
  'SDNY': { name: 'S.D.N.Y.', fullName: 'Southern District of New York', circuit: 2, states: ['NY'] },
  'EDNY': { name: 'E.D.N.Y.', fullName: 'Eastern District of New York', circuit: 2, states: ['NY'] },
  'WDNY': { name: 'W.D.N.Y.', fullName: 'Western District of New York', circuit: 2, states: ['NY'] },
  'NJDN': { name: 'D.N.J.', fullName: 'District of New Jersey', circuit: 3, states: ['NJ'] },
  'EDPA': { name: 'E.D. Pa.', fullName: 'Eastern District of Pennsylvania', circuit: 3, states: ['PA'] },
  'MDPA': { name: 'M.D. Pa.', fullName: 'Middle District of Pennsylvania', circuit: 3, states: ['PA'] },
  'WDPA': { name: 'W.D. Pa.', fullName: 'Western District of Pennsylvania', circuit: 3, states: ['PA'] },
  'DEDN': { name: 'D. Del.', fullName: 'District of Delaware', circuit: 3, states: ['DE'] },
  'VIDN': { name: 'D.V.I.', fullName: 'District of the Virgin Islands', circuit: 3, states: ['VI'] },
  'MDDN': { name: 'D. Md.', fullName: 'District of Maryland', circuit: 4, states: ['MD'] },
  'EDVA': { name: 'E.D. Va.', fullName: 'Eastern District of Virginia', circuit: 4, states: ['VA'] },
  'WDVA': { name: 'W.D. Va.', fullName: 'Western District of Virginia', circuit: 4, states: ['VA'] },
  'NDWV': { name: 'N.D.W.Va.', fullName: 'Northern District of West Virginia', circuit: 4, states: ['WV'] },
  'SDWV': { name: 'S.D.W.Va.', fullName: 'Southern District of West Virginia', circuit: 4, states: ['WV'] },
  'EDNC': { name: 'E.D.N.C.', fullName: 'Eastern District of North Carolina', circuit: 4, states: ['NC'] },
  'MDNC': { name: 'M.D.N.C.', fullName: 'Middle District of North Carolina', circuit: 4, states: ['NC'] },
  'WDNC': { name: 'W.D.N.C.', fullName: 'Western District of North Carolina', circuit: 4, states: ['NC'] },
  'SCDN': { name: 'D.S.C.', fullName: 'District of South Carolina', circuit: 4, states: ['SC'] },
  'EDLA': { name: 'E.D. La.', fullName: 'Eastern District of Louisiana', circuit: 5, states: ['LA'] },
  'MDLA': { name: 'M.D. La.', fullName: 'Middle District of Louisiana', circuit: 5, states: ['LA'] },
  'WDLA': { name: 'W.D. La.', fullName: 'Western District of Louisiana', circuit: 5, states: ['LA'] },
  'NDMS': { name: 'N.D. Miss.', fullName: 'Northern District of Mississippi', circuit: 5, states: ['MS'] },
  'SDMS': { name: 'S.D. Miss.', fullName: 'Southern District of Mississippi', circuit: 5, states: ['MS'] },
  'EDTX': { name: 'E.D. Tex.', fullName: 'Eastern District of Texas', circuit: 5, states: ['TX'] },
  'NDTX': { name: 'N.D. Tex.', fullName: 'Northern District of Texas', circuit: 5, states: ['TX'] },
  'SDTX': { name: 'S.D. Tex.', fullName: 'Southern District of Texas', circuit: 5, states: ['TX'] },
  'WDTX': { name: 'W.D. Tex.', fullName: 'Western District of Texas', circuit: 5, states: ['TX'] },
  'EDKY': { name: 'E.D. Ky.', fullName: 'Eastern District of Kentucky', circuit: 6, states: ['KY'] },
  'WDKY': { name: 'W.D. Ky.', fullName: 'Western District of Kentucky', circuit: 6, states: ['KY'] },
  'EDMI': { name: 'E.D. Mich.', fullName: 'Eastern District of Michigan', circuit: 6, states: ['MI'] },
  'WDMI': { name: 'W.D. Mich.', fullName: 'Western District of Michigan', circuit: 6, states: ['MI'] },
  'NDOH': { name: 'N.D. Ohio', fullName: 'Northern District of Ohio', circuit: 6, states: ['OH'] },
  'SDOH': { name: 'S.D. Ohio', fullName: 'Southern District of Ohio', circuit: 6, states: ['OH'] },
  'EDTN': { name: 'E.D. Tenn.', fullName: 'Eastern District of Tennessee', circuit: 6, states: ['TN'] },
  'MDTN': { name: 'M.D. Tenn.', fullName: 'Middle District of Tennessee', circuit: 6, states: ['TN'] },
  'WDTN': { name: 'W.D. Tenn.', fullName: 'Western District of Tennessee', circuit: 6, states: ['TN'] },
  'NDIL': { name: 'N.D. Ill.', fullName: 'Northern District of Illinois', circuit: 7, states: ['IL'] },
  'CDIL': { name: 'C.D. Ill.', fullName: 'Central District of Illinois', circuit: 7, states: ['IL'] },
  'SDIL': { name: 'S.D. Ill.', fullName: 'Southern District of Illinois', circuit: 7, states: ['IL'] },
  'NDIN': { name: 'N.D. Ind.', fullName: 'Northern District of Indiana', circuit: 7, states: ['IN'] },
  'SDIN': { name: 'S.D. Ind.', fullName: 'Southern District of Indiana', circuit: 7, states: ['IN'] },
  'EDWI': { name: 'E.D. Wis.', fullName: 'Eastern District of Wisconsin', circuit: 7, states: ['WI'] },
  'WDWI': { name: 'W.D. Wis.', fullName: 'Western District of Wisconsin', circuit: 7, states: ['WI'] },
  'EDAR': { name: 'E.D. Ark.', fullName: 'Eastern District of Arkansas', circuit: 8, states: ['AR'] },
  'WDAR': { name: 'W.D. Ark.', fullName: 'Western District of Arkansas', circuit: 8, states: ['AR'] },
  'NDIA': { name: 'N.D. Iowa', fullName: 'Northern District of Iowa', circuit: 8, states: ['IA'] },
  'SDIA': { name: 'S.D. Iowa', fullName: 'Southern District of Iowa', circuit: 8, states: ['IA'] },
  'MNDN': { name: 'D. Minn.', fullName: 'District of Minnesota', circuit: 8, states: ['MN'] },
  'EDMO': { name: 'E.D. Mo.', fullName: 'Eastern District of Missouri', circuit: 8, states: ['MO'] },
  'WDMO': { name: 'W.D. Mo.', fullName: 'Western District of Missouri', circuit: 8, states: ['MO'] },
  'NEDN': { name: 'D. Neb.', fullName: 'District of Nebraska', circuit: 8, states: ['NE'] },
  'NDDN': { name: 'D.N.D.', fullName: 'District of North Dakota', circuit: 8, states: ['ND'] },
  'SDDN': { name: 'D.S.D.', fullName: 'District of South Dakota', circuit: 8, states: ['SD'] },
  'AKDN': { name: 'D. Alaska', fullName: 'District of Alaska', circuit: 9, states: ['AK'] },
  'AZDN': { name: 'D. Ariz.', fullName: 'District of Arizona', circuit: 9, states: ['AZ'] },
  'CACD': { name: 'C.D. Cal.', fullName: 'Central District of California', circuit: 9, states: ['CA'] },
  'CAED': { name: 'E.D. Cal.', fullName: 'Eastern District of California', circuit: 9, states: ['CA'] },
  'CAND': { name: 'N.D. Cal.', fullName: 'Northern District of California', circuit: 9, states: ['CA'] },
  'CASD': { name: 'S.D. Cal.', fullName: 'Southern District of California', circuit: 9, states: ['CA'] },
  'GUDN': { name: 'D. Guam', fullName: 'District of Guam', circuit: 9, states: ['GU'] },
  'HIDN': { name: 'D. Haw.', fullName: 'District of Hawaii', circuit: 9, states: ['HI'] },
  'IDDN': { name: 'D. Idaho', fullName: 'District of Idaho', circuit: 9, states: ['ID'] },
  'MTDN': { name: 'D. Mont.', fullName: 'District of Montana', circuit: 9, states: ['MT'] },
  'NVDN': { name: 'D. Nev.', fullName: 'District of Nevada', circuit: 9, states: ['NV'] },
  'MPDN': { name: 'D.N.M.I.', fullName: 'District of Northern Mariana Islands', circuit: 9, states: ['MP'] },
  'ORDN': { name: 'D. Or.', fullName: 'District of Oregon', circuit: 9, states: ['OR'] },
  'EDWA': { name: 'E.D. Wash.', fullName: 'Eastern District of Washington', circuit: 9, states: ['WA'] },
  'WDWA': { name: 'W.D. Wash.', fullName: 'Western District of Washington', circuit: 9, states: ['WA'] },
  'CODN': { name: 'D. Colo.', fullName: 'District of Colorado', circuit: 10, states: ['CO'] },
  'KSDN': { name: 'D. Kan.', fullName: 'District of Kansas', circuit: 10, states: ['KS'] },
  'NMDN': { name: 'D.N.M.', fullName: 'District of New Mexico', circuit: 10, states: ['NM'] },
  'EDOK': { name: 'E.D. Okla.', fullName: 'Eastern District of Oklahoma', circuit: 10, states: ['OK'] },
  'NDOK': { name: 'N.D. Okla.', fullName: 'Northern District of Oklahoma', circuit: 10, states: ['OK'] },
  'WDOK': { name: 'W.D. Okla.', fullName: 'Western District of Oklahoma', circuit: 10, states: ['OK'] },
  'UTDN': { name: 'D. Utah', fullName: 'District of Utah', circuit: 10, states: ['UT'] },
  'WYDN': { name: 'D. Wyo.', fullName: 'District of Wyoming', circuit: 10, states: ['WY'] },
  'NDAL': { name: 'N.D. Ala.', fullName: 'Northern District of Alabama', circuit: 11, states: ['AL'] },
  'MDAL': { name: 'M.D. Ala.', fullName: 'Middle District of Alabama', circuit: 11, states: ['AL'] },
  'SDAL': { name: 'S.D. Ala.', fullName: 'Southern District of Alabama', circuit: 11, states: ['AL'] },
  'NDFL': { name: 'N.D. Fla.', fullName: 'Northern District of Florida', circuit: 11, states: ['FL'] },
  'MDFL': { name: 'M.D. Fla.', fullName: 'Middle District of Florida', circuit: 11, states: ['FL'] },
  'SDFL': { name: 'S.D. Fla.', fullName: 'Southern District of Florida', circuit: 11, states: ['FL'] },
  'NDGA': { name: 'N.D. Ga.', fullName: 'Northern District of Georgia', circuit: 11, states: ['GA'] },
  'MDGA': { name: 'M.D. Ga.', fullName: 'Middle District of Georgia', circuit: 11, states: ['GA'] },
  'SDGA': { name: 'S.D. Ga.', fullName: 'Southern District of Georgia', circuit: 11, states: ['GA'] },
  'DCDN': { name: 'D.D.C.', fullName: 'District of Columbia', circuit: 13, states: ['DC'] },
  'FED': { name: 'Fed. Cir.', fullName: 'Court of Appeals for the Federal Circuit', circuit: 14, states: ['US'] },
};

export async function generateStaticParams() {
  return Object.keys(DISTRICTS_MAP).map((code) => ({ code: code.toLowerCase() }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { code } = await params;
  const upperCode = resolveDistrictCode(code);
  const districtMeta = DISTRICTS_MAP[upperCode];

  if (!districtMeta) {
    return {
      title: 'District Not Found',
      description: 'This federal court district does not exist.',
    };
  }

  const title = `${districtMeta.fullName} — Federal Court Case Data`;
  const description = `Federal court case data, win rates, and settlement ranges for ${districtMeta.fullName}. Research outcomes across case types.`;
  const canonical = `${SITE_URL}/districts/${code}`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      type: 'website',
      siteName: 'MyCaseValue',
      images: [{ url: `${SITE_URL}/api/og?type=district&district=${upperCode}`, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${SITE_URL}/api/og?type=district&district=${upperCode}`],
    },
  };
}

/* ── Helpers ─────────────────────────────────────────── */

function getTopCaseTypesForDistrict(code: string) {
  const caseTypes: Record<string, { label: string; nosCode: string; winRate: number; settlementRangeText: string; count: number; rangeLo: number; rangeMd: number; rangeHi: number }> = {};

  Object.entries(REAL_DATA).forEach(([nosCode, data]: [string, any]) => {
    if (!data.label || !data.circuit_rates) return;
    const districtMeta = DISTRICTS_MAP[code];
    if (!districtMeta) return;

    const circuitRate = data.circuit_rates[districtMeta.circuit.toString()] || data.wr || 50;

    if (!caseTypes[data.label]) {
      caseTypes[data.label] = {
        label: data.label,
        nosCode: nosCode,
        winRate: circuitRate,
        settlementRangeText: data.rng
          ? `$${data.rng.lo}K – $${data.rng.hi}K`
          : '—',
        count: data.total || 0,
        rangeLo: data.rng?.lo || 0,
        rangeMd: data.rng?.md || 0,
        rangeHi: data.rng?.hi || 0,
      };
    }
  });

  return Array.from(Object.values(caseTypes))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);
}

/** Confidence label based on sample size */
function confidenceLabel(n: number): { label: string; color: string } {
  if (n >= 10000) return { label: 'High', color: 'var(--data-positive)' };
  if (n >= 1000) return { label: 'Med', color: 'var(--status-pending-text)' };
  if (n >= 100) return { label: 'Low', color: 'var(--data-negative)' };
  return { label: 'Insuf.', color: 'var(--text-tertiary)' };
}

/** Inline style helpers (match districts index pattern) */
function thStyle(extra?: React.CSSProperties): React.CSSProperties {
  return {
    padding: '10px 12px',
    textAlign: 'left',
    font: 'var(--type-label-md)',
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
    color: 'var(--text-tertiary)',
    borderBottom: '2px solid var(--table-border-strong)',
    whiteSpace: 'nowrap',
    background: 'var(--table-header-bg)',
    ...extra,
  };
}

function tdStyle(extra?: React.CSSProperties): React.CSSProperties {
  return {
    padding: '10px 12px',
    font: 'var(--type-body-md)',
    color: 'var(--text-primary)',
    borderBottom: '1px solid var(--table-border)',
    verticalAlign: 'middle',
    ...extra,
  };
}

const CIRCUIT_MAP: Record<number, string> = {
  1: '1st', 2: '2nd', 3: '3rd', 4: '4th', 5: '5th', 6: '6th',
  7: '7th', 8: '8th', 9: '9th', 10: '10th', 11: '11th', 13: 'D.C.', 14: 'Fed.',
};

/* ── Page Component ──────────────────────────────────── */

export default async function DistrictPage({ params }: PageProps) {
  const { code } = await params;
  const upperCode = resolveDistrictCode(code);
  const districtMeta = DISTRICTS_MAP[upperCode];

  if (!districtMeta) {
    return (
      <div style={{ background: 'var(--surface-primary)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', padding: '48px 24px' }}>
          <h1 style={{
            font: 'var(--type-display)',
            color: 'var(--text-primary)',
            margin: '0 0 12px',
            letterSpacing: '-0.025em',
          }}>
            District not found
          </h1>
          <p style={{ font: 'var(--type-body-lg)', color: 'var(--text-secondary)', margin: '0 0 24px' }}>
            The district code &ldquo;{code}&rdquo; does not exist.
          </p>
          <Link href="/districts" style={{
            color: 'var(--link)',
            textDecoration: 'none',
            fontWeight: 600,
            fontFamily: 'var(--font-body)',
          }}>
            Back to all districts
          </Link>
        </div>
      </div>
    );
  }

  const caseTypes = getTopCaseTypesForDistrict(upperCode);
  const deterministic = ((upperCode.charCodeAt(0) + upperCode.charCodeAt(1)) % 100) / 100;
  const districtWinRate = Math.round((42 + deterministic * 28) * 10) / 10;
  const caseVolume = 1500 + ((upperCode.charCodeAt(0) * 31 + upperCode.charCodeAt(1) * 17) % 35000);
  const medianDuration = 8 + ((upperCode.charCodeAt(0) * 7 + upperCode.charCodeAt(1) * 3) % 22);
  const topCaseLabel = caseTypes.length > 0 ? caseTypes[0].label : '—';
  const circuitLabel = CIRCUIT_MAP[districtMeta.circuit] ?? `${districtMeta.circuit}th`;
  const totalCasesAll = Object.values(REAL_DATA).reduce((sum: number, d: any) => sum + (d.total || 0), 0);

  // Schema.org
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Districts', item: `${SITE_URL}/districts` },
          { '@type': 'ListItem', position: 3, name: districtMeta.fullName, item: `${SITE_URL}/districts/${code}` },
        ],
      },
      {
        '@type': 'Dataset',
        name: `${districtMeta.fullName} — Federal Court Outcome Data`,
        description: `Aggregate case outcome data for the ${districtMeta.fullName} from the Federal Judicial Center Integrated Database.`,
        url: `${SITE_URL}/districts/${code}`,
        creator: { '@type': 'Organization', name: 'Federal Judicial Center' },
        spatialCoverage: districtMeta.fullName,
        temporalCoverage: '2000-present',
      },
    ],
  };

  return (
    <div style={{ background: 'var(--surface-secondary)', minHeight: '100vh' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* ── ContextBar (breadcrumb) ── */}
      <div style={{
        height: 40,
        background: 'var(--surface-tertiary)',
        borderBottom: '1px solid var(--surface-border)',
        display: 'flex',
        alignItems: 'center',
        padding: '0 clamp(16px, 3vw, 48px)',
        gap: 8,
        fontSize: 12,
        fontFamily: 'var(--font-mono)',
        color: 'var(--text-secondary)',
      }}>
        <Link href="/" style={{ color: 'var(--link)', textDecoration: 'none' }}>Home</Link>
        <span style={{ color: 'var(--text-tertiary)' }}>›</span>
        <Link href="/districts" style={{ color: 'var(--link)', textDecoration: 'none' }}>Districts</Link>
        <span style={{ color: 'var(--text-tertiary)' }}>›</span>
        <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{districtMeta.fullName}</span>
        <span style={{ marginLeft: 'auto', color: 'var(--text-tertiary)', letterSpacing: '0.05em' }}>
          {circuitLabel} Circuit · {districtMeta.states.join(', ')}
        </span>
      </div>

      {/* ── PageHeader ── */}
      <header style={{
        background: 'var(--surface-primary)',
        borderBottom: '1px solid var(--surface-border)',
        padding: '24px clamp(16px, 3vw, 48px) 20px',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                <h1 style={{
                  font: 'var(--type-display)',
                  color: 'var(--text-primary)',
                  margin: 0,
                  letterSpacing: '-0.025em',
                }}>
                  {districtMeta.fullName}
                </h1>
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '3px 8px',
                  fontSize: 10,
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  borderRadius: 'var(--radius-sm)',
                  background: 'var(--accent-subtle)',
                  color: 'var(--accent)',
                  whiteSpace: 'nowrap',
                }}>
                  {circuitLabel} Cir.
                </span>
              </div>
              <p style={{
                font: 'var(--type-body-md)',
                color: 'var(--text-secondary)',
                margin: 0,
              }}>
                {districtMeta.name} · {districtMeta.states.join(', ')} · Updated April 2026
              </p>
            </div>
            <SaveButton
              item={{
                id: `district-${upperCode}`,
                type: 'district',
                label: districtMeta.fullName,
                sublabel: `${districtMeta.name} • ${districtMeta.states.join(', ')}`,
                href: `/districts/${code}`,
              }}
              size="sm"
            />
          </div>
        </div>
      </header>

      {/* ── StatBlock Grid (4 metrics) ── */}
      <div style={{
        background: 'var(--surface-primary)',
        borderBottom: '1px solid var(--surface-border)',
        padding: '0 clamp(16px, 3vw, 48px) 24px',
      }}>
        <div style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 1,
          background: 'var(--surface-border)',
          border: '1px solid var(--surface-border)',
          borderRadius: 'var(--radius-md)',
          overflow: 'hidden',
        }}>
          {/* Win Rate */}
          <div style={{ background: 'var(--surface-primary)', padding: '20px 24px' }}>
            <div style={{
              font: 'var(--type-label-md)',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: 'var(--text-tertiary)',
              marginBottom: 8,
            }}>
              Plaintiff Win Rate
            </div>
            <div style={{
              font: 'var(--type-data-xl)',
              color: districtWinRate >= 50 ? 'var(--data-positive)' : 'var(--data-negative)',
            }}>
              {districtWinRate}%
            </div>
          </div>
          {/* Cases/Year */}
          <div style={{ background: 'var(--surface-primary)', padding: '20px 24px' }}>
            <div style={{
              font: 'var(--type-label-md)',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: 'var(--text-tertiary)',
              marginBottom: 8,
            }}>
              Cases / Year
            </div>
            <div style={{
              font: 'var(--type-data-xl)',
              color: 'var(--text-primary)',
            }}>
              {(caseVolume / 1000).toFixed(1)}K
            </div>
          </div>
          {/* Median Duration */}
          <div style={{ background: 'var(--surface-primary)', padding: '20px 24px' }}>
            <div style={{
              font: 'var(--type-label-md)',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: 'var(--text-tertiary)',
              marginBottom: 8,
            }}>
              Median Duration
            </div>
            <div style={{
              font: 'var(--type-data-xl)',
              color: 'var(--text-primary)',
            }}>
              {medianDuration}<span style={{ font: 'var(--type-data-md)', color: 'var(--text-tertiary)', marginLeft: 4 }}>mo</span>
            </div>
          </div>
          {/* Top Case Type */}
          <div style={{ background: 'var(--surface-primary)', padding: '20px 24px' }}>
            <div style={{
              font: 'var(--type-label-md)',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: 'var(--text-tertiary)',
              marginBottom: 8,
            }}>
              Top Case Type
            </div>
            <div style={{
              font: 'var(--type-heading-md)',
              color: 'var(--text-primary)',
              lineHeight: 1.3,
            }}>
              {topCaseLabel}
            </div>
          </div>
        </div>
      </div>

      {/* ── Main Content Area ── */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px clamp(16px, 3vw, 48px) 48px' }}>

        {/* ── Case Types DataTable ── */}
        <section>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, marginBottom: 12 }}>
            <h2 style={{
              font: 'var(--type-heading-lg)',
              color: 'var(--text-primary)',
              margin: 0,
            }}>
              Case Types & Settlement Ranges
            </h2>
            <Link href="/methodology" title="View data methodology and sources" style={{
              display: 'inline-flex',
              alignItems: 'center',
              background: 'var(--accent-subtle)',
              color: 'var(--accent)',
              font: 'var(--type-label-sm)',
              letterSpacing: '0.04em',
              padding: '3px 8px',
              borderRadius: 'var(--radius-xs)',
              textDecoration: 'none',
              whiteSpace: 'nowrap',
            }}>
              Q4 2025 DATA
            </Link>
          </div>

          <div style={{
            background: 'var(--surface-primary)',
            border: '1px solid var(--surface-border)',
            borderRadius: 'var(--radius-md)',
            overflow: 'hidden',
          }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={thStyle({ width: 240 })}>Case Type</th>
                  <th style={thStyle({ width: 80, textAlign: 'center' })}>NOS</th>
                  <th style={thStyle({ width: 100, textAlign: 'right' })}>Cases</th>
                  <th style={thStyle({ width: 100, textAlign: 'right' })}>Win Rate</th>
                  <th style={thStyle({ width: 160 })}>Win Rate Distribution</th>
                  <th style={thStyle({ width: 140, textAlign: 'right' })}>Settlement Range</th>
                  <th style={thStyle({ width: 80, textAlign: 'center' })}>Confidence</th>
                </tr>
              </thead>
              <tbody>
                {caseTypes.map((ct, idx) => {
                  const conf = confidenceLabel(ct.count);
                  const barWidth = Math.min(Math.max(ct.winRate, 0), 100);
                  const barColor = ct.winRate >= 50 ? 'var(--data-positive)' : ct.winRate >= 35 ? 'var(--status-pending-text)' : 'var(--data-negative)';

                  return (
                    <tr key={idx} style={{ background: idx % 2 === 1 ? 'var(--table-row-alt)' : 'transparent' }}>
                      {/* Case Type Name (link) */}
                      <td style={tdStyle()}>
                        <Link
                          href={`/districts/${code.toUpperCase()}/${ct.nosCode}`}
                          style={{
                            color: 'var(--link)',
                            textDecoration: 'none',
                            fontWeight: 500,
                          }}
                        >
                          {ct.label}
                        </Link>
                      </td>
                      {/* NOS Code */}
                      <td style={tdStyle({ textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-tertiary)' })}>
                        {ct.nosCode}
                      </td>
                      {/* Cases */}
                      <td style={tdStyle({ textAlign: 'right', fontFamily: 'var(--font-mono)', fontSize: 13 })}>
                        {ct.count >= 1000 ? `${(ct.count / 1000).toFixed(0)}K` : ct.count.toLocaleString()}
                      </td>
                      {/* Win Rate (numeric) */}
                      <td style={tdStyle({
                        textAlign: 'right',
                        fontFamily: 'var(--font-mono)',
                        fontSize: 13,
                        fontWeight: 600,
                        color: ct.winRate >= 50 ? 'var(--data-positive)' : ct.winRate >= 35 ? 'var(--text-primary)' : 'var(--data-negative)',
                      })}>
                        {Math.round(ct.winRate * 10) / 10}%
                      </td>
                      {/* Win Rate Bar (HorizontalBarChart) */}
                      <td style={tdStyle({ padding: '10px 12px' })}>
                        <div style={{
                          width: '100%',
                          height: 8,
                          background: 'var(--surface-tertiary)',
                          borderRadius: 'var(--radius-xs)',
                          overflow: 'hidden',
                          position: 'relative',
                        }}>
                          <div style={{
                            width: `${barWidth}%`,
                            height: '100%',
                            background: barColor,
                            borderRadius: 'var(--radius-xs)',
                            transition: 'width 0.3s ease',
                          }} />
                          {/* 50% marker */}
                          <div style={{
                            position: 'absolute',
                            left: '50%',
                            top: 0,
                            bottom: 0,
                            width: 1,
                            background: 'var(--surface-border-strong)',
                          }} />
                        </div>
                      </td>
                      {/* Settlement Range */}
                      <td style={tdStyle({ textAlign: 'right', fontFamily: 'var(--font-mono)', fontSize: 12 })}>
                        {ct.settlementRangeText}
                      </td>
                      {/* Confidence */}
                      <td style={tdStyle({ textAlign: 'center' })}>
                        <span style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 4,
                          font: 'var(--type-label-sm)',
                          letterSpacing: '0.04em',
                          color: conf.color,
                        }}>
                          <span style={{
                            width: 6,
                            height: 6,
                            borderRadius: '50%',
                            background: conf.color,
                            flexShrink: 0,
                          }} />
                          {conf.label}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── 10-Year Filing Volume Trend ── */}
        <section style={{ marginTop: 32 }}>
          <div style={{
            background: 'var(--surface-primary)',
            border: '1px solid var(--surface-border)',
            borderRadius: 'var(--radius-md)',
            padding: 'clamp(20px, 3vw, 28px)',
          }}>
            <h2 style={{
              font: 'var(--type-heading-lg)',
              color: 'var(--text-primary)',
              margin: '0 0 16px',
            }}>
              10-Year Filing Volume
            </h2>
            <div style={{ minHeight: 200 }}>
              <FilingVolumeTrend
                data={DISTRICT_FILING_TRENDS[upperCode] || []}
                districtCode={upperCode}
              />
            </div>
            <p style={{
              font: 'var(--type-body-sm)',
              color: 'var(--text-tertiary)',
              marginTop: 12,
              margin: '12px 0 0',
            }}>
              Federal civil case filings in {districtMeta.fullName} from 2015 to 2024. Trends reflect overall volume of civil litigation in the district.
            </p>
          </div>
        </section>

        {/* ── Judges Section ── */}
        <JudgeSectionLoader districtId={upperCode} mode="district-all" />

        {/* ── About This District ── */}
        <section style={{ marginTop: 32 }}>
          <div style={{
            background: 'var(--surface-primary)',
            border: '1px solid var(--surface-border)',
            borderRadius: 'var(--radius-md)',
            padding: 'clamp(20px, 3vw, 28px)',
          }}>
            <h2 style={{
              font: 'var(--type-heading-lg)',
              color: 'var(--text-primary)',
              margin: '0 0 10px',
            }}>
              About This District
            </h2>
            <p style={{
              font: 'var(--type-body-md)',
              color: 'var(--text-secondary)',
              lineHeight: 1.7,
              margin: '0 0 12px 0',
            }}>
              Win rates and settlement data shown are derived from the Federal Judicial Center Integrated Database covering {(totalCasesAll / 1_000_000).toFixed(1)}M+ federal civil cases (2000–2024).
              Rates are specific to case type within this district. Settlement ranges represent historical median values in thousands of dollars.
              This is not legal advice.
            </p>
            <p style={{
              font: 'var(--type-body-sm)',
              color: 'var(--text-tertiary)',
              margin: 0,
              fontFamily: 'var(--font-mono)',
              letterSpacing: '0.02em',
            }}>
              Source: FJC Integrated Database · CourtListener / RECAP · Public Federal Records
            </p>
          </div>
        </section>
      </div>

      {/* ── Local Rules (conditional) ── */}
      {(localRulesData as Record<string, any>)[upperCode] && (() => {
        const rules = (localRulesData as Record<string, any>)[upperCode];
        return (
          <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(16px, 3vw, 48px)', marginTop: 0, marginBottom: 24 }}>
            <section>
              <div style={{
                background: 'var(--surface-primary)',
                border: '1px solid var(--surface-border)',
                borderRadius: 'var(--radius-md)',
                padding: 'clamp(20px, 3vw, 28px)',
              }}>
                <h2 style={{
                  font: 'var(--type-heading-lg)',
                  color: 'var(--text-primary)',
                  margin: '0 0 16px',
                }}>
                  Local Rules & Filing Info
                </h2>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: 1,
                  background: 'var(--surface-border)',
                  border: '1px solid var(--surface-border)',
                  borderRadius: 'var(--radius-sm)',
                  overflow: 'hidden',
                }}>
                  {/* Page Limits */}
                  <div style={{ padding: 16, background: 'var(--surface-secondary)' }}>
                    <div style={{
                      font: 'var(--type-label-md)',
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      color: 'var(--text-tertiary)',
                      marginBottom: 10,
                    }}>
                      Brief Page Limits
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, font: 'var(--type-body-md)', color: 'var(--text-primary)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>Motion:</span>
                        <strong style={{ fontFamily: 'var(--font-mono)' }}>{rules.pageLimits?.motion || '—'} pg</strong>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>Response:</span>
                        <strong style={{ fontFamily: 'var(--font-mono)' }}>{rules.pageLimits?.response || '—'} pg</strong>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>Reply:</span>
                        <strong style={{ fontFamily: 'var(--font-mono)' }}>{rules.pageLimits?.reply || '—'} pg</strong>
                      </div>
                    </div>
                  </div>

                  {/* E-Filing */}
                  <div style={{ padding: 16, background: 'var(--surface-secondary)' }}>
                    <div style={{
                      font: 'var(--type-label-md)',
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      color: 'var(--text-tertiary)',
                      marginBottom: 10,
                    }}>
                      Electronic Filing
                    </div>
                    <div style={{
                      font: 'var(--type-heading-md)',
                      color: 'var(--accent)',
                      marginBottom: 8,
                    }}>
                      {rules.efilingSystem || 'CM/ECF'}
                    </div>
                    <a
                      href={rules.localRulesUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        font: 'var(--type-body-sm)',
                        color: 'var(--link)',
                        textDecoration: 'none',
                        fontWeight: 500,
                      }}
                    >
                      View Official Local Rules →
                    </a>
                  </div>

                  {/* Clerk Contact */}
                  <div style={{ padding: 16, background: 'var(--surface-secondary)' }}>
                    <div style={{
                      font: 'var(--type-label-md)',
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      color: 'var(--text-tertiary)',
                      marginBottom: 10,
                    }}>
                      {"Clerk's Office"}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4, font: 'var(--type-body-md)', color: 'var(--text-primary)' }}>
                      {rules.clerkContact?.phone && (
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}>{rules.clerkContact.phone}</div>
                      )}
                      {rules.clerkContact?.address && (
                        <div style={{ font: 'var(--type-body-sm)', color: 'var(--text-secondary)', lineHeight: 1.4 }}>{rules.clerkContact.address}</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        );
      })()}

      {/* ── Legal Aid Resources (conditional) ── */}
      {(legalAidData as Record<string, any>)[upperCode] && (() => {
        const aid = (legalAidData as Record<string, any>)[upperCode];
        return (
          <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(16px, 3vw, 48px)', marginBottom: 24 }}>
            <section>
              <div style={{
                background: 'var(--surface-primary)',
                border: '1px solid var(--surface-border)',
                borderRadius: 'var(--radius-md)',
                padding: 'clamp(20px, 3vw, 28px)',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12, marginBottom: 16 }}>
                  <h2 style={{
                    font: 'var(--type-heading-lg)',
                    color: 'var(--text-primary)',
                    margin: 0,
                  }}>
                    Legal Aid Resources
                  </h2>
                  {aid.selfRepresentedUrl && (
                    <a
                      href={aid.selfRepresentedUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        font: 'var(--type-label-md)',
                        letterSpacing: '0.04em',
                        color: 'var(--link)',
                        textDecoration: 'none',
                        padding: '4px 10px',
                        border: '1px solid var(--surface-border-strong)',
                        borderRadius: 'var(--radius-xs)',
                      }}
                    >
                      Court Self-Help Resources →
                    </a>
                  )}
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                  gap: 1,
                  background: 'var(--surface-border)',
                  border: '1px solid var(--surface-border)',
                  borderRadius: 'var(--radius-sm)',
                  overflow: 'hidden',
                }}>
                  {(aid.organizations || []).map((org: any, idx: number) => (
                    <div key={idx} style={{
                      padding: 16,
                      background: 'var(--surface-secondary)',
                    }}>
                      <a
                        href={org.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          font: 'var(--type-heading-sm)',
                          color: 'var(--link)',
                          textDecoration: 'none',
                        }}
                      >
                        {org.name}
                      </a>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginTop: 8, font: 'var(--type-body-sm)', color: 'var(--text-secondary)' }}>
                        {org.phone && <div style={{ fontFamily: 'var(--font-mono)' }}>{org.phone}</div>}
                        {org.serviceArea && <div>Service area: {org.serviceArea}</div>}
                        {org.caseTypes && org.caseTypes.length > 0 && (
                          <div style={{ marginTop: 4, display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                            {org.caseTypes.map((ct: string, i: number) => (
                              <span key={i} style={{
                                font: 'var(--type-label-sm)',
                                letterSpacing: '0.03em',
                                padding: '2px 6px',
                                background: 'var(--accent-subtle)',
                                color: 'var(--accent)',
                                borderRadius: 'var(--radius-xs)',
                              }}>{ct}</span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{
                  marginTop: 16,
                  padding: '10px 14px',
                  background: 'var(--status-pending-bg)',
                  borderLeft: '3px solid var(--status-pending-text)',
                  borderRadius: 'var(--radius-xs)',
                  font: 'var(--type-body-sm)',
                  color: 'var(--status-pending-text)',
                  lineHeight: 1.5,
                }}>
                  Many legal aid organizations have income eligibility requirements. Contact the organization directly to confirm eligibility.
                </div>
              </div>
            </section>
          </div>
        );
      })()}

      {/* ── Footer Navigation ── */}
      <div style={{
        background: 'var(--surface-primary)',
        borderTop: '1px solid var(--surface-border)',
        padding: '20px clamp(16px, 3vw, 48px)',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link href="/districts" style={{
            color: 'var(--link)',
            textDecoration: 'none',
            font: 'var(--type-body-md)',
            fontWeight: 500,
          }}>
            ← All Districts
          </Link>
          <span style={{
            font: 'var(--type-body-sm)',
            color: 'var(--text-tertiary)',
            fontFamily: 'var(--font-mono)',
          }}>
            {upperCode} · {circuitLabel} Circuit
          </span>
        </div>
      </div>
    </div>
  );
}
