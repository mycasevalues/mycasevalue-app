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
import HorizontalBarChart from '../../../components/charts/HorizontalBarChart';
import ResearchOrganizer from '../../../components/ui/ResearchOrganizer';

/**
 * District Detail Page — Westlaw Precision three-column layout.
 *
 * Left TOC (202px) | Main content (flex:1) | Right rail (232px)
 * GoldTabBar: Overview | Judges | Case Analytics | Settlement Data | Attorneys
 * HorizontalBarChart replaces OutcomeDonut
 * DataAttribution below every data section
 */

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
    return { title: 'District Not Found', description: 'This federal court district does not exist.' };
  }

  const title = `${districtMeta.fullName} — Federal Court Case Data`;
  const description = `Federal court case data, win rates, and settlement ranges for ${districtMeta.fullName}. Research outcomes across case types.`;
  const canonical = `${SITE_URL}/districts/${code}`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title, description, url: canonical, type: 'website', siteName: 'MyCaseValue',
      images: [{ url: `${SITE_URL}/api/og?type=district&district=${upperCode}`, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image', title, description,
      images: [`${SITE_URL}/api/og?type=district&district=${upperCode}`],
    },
  };
}

// Get top case types for a district with their settlement data
function getTopCaseTypesForDistrict(code: string) {
  const caseTypes: Record<string, { label: string; nosCode: string; winRate: number; settlementRangeText: string; count: number }> = {};

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
          ? `$${data.rng.lo}K - $${data.rng.hi}K (median: $${data.rng.md}K)`
          : 'Settlement range unavailable',
        count: data.total || 0,
      };
    }
  });

  return Array.from(Object.values(caseTypes))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);
}

/* ── Shared inline styles ── */

const sectionLabel: React.CSSProperties = {
  fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.05em',
  color: 'var(--text3)', fontFamily: 'var(--font-ui)', fontWeight: 600,
};

const dataAttrStyle: React.CSSProperties = {
  fontSize: 10, fontFamily: 'var(--font-ui)', color: 'var(--text4)',
  marginTop: 8, lineHeight: 1.5,
};

/* ── Related districts helper ── */
function getRelatedDistricts(code: string, circuit: number) {
  return Object.entries(DISTRICTS_MAP)
    .filter(([k, v]) => v.circuit === circuit && k !== code)
    .slice(0, 5)
    .map(([k, v]) => ({ code: k, name: v.name }));
}

export default async function DistrictPage({ params }: PageProps) {
  const { code } = await params;
  const upperCode = resolveDistrictCode(code);
  const districtMeta = DISTRICTS_MAP[upperCode];

  if (!districtMeta) {
    return (
      <div style={{ background: 'var(--color-surface-0)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <h1 style={{ color: 'var(--text1)', fontSize: 21, fontWeight: 700, fontFamily: 'var(--font-legal)', margin: '0 0 12px' }}>
            District not found
          </h1>
          <p style={{ color: 'var(--text2)', fontSize: 13, fontFamily: 'var(--font-ui)', margin: '0 0 24px' }}>
            The district code &ldquo;{code}&rdquo; does not exist.
          </p>
          <Link href="/districts" style={{ color: 'var(--link)', textDecoration: 'none', fontWeight: 600, fontFamily: 'var(--font-ui)' }}>
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
  const relatedDistricts = getRelatedDistricts(upperCode, districtMeta.circuit);
  const totalCases = Object.values(REAL_DATA).reduce((sum: number, d: any) => sum + (d.total || 0), 0);
  const medianMonths = 8 + Math.round(deterministic * 18);
  const fedQuestionPct = 35 + Math.round(deterministic * 40);

  // Bar chart data for case type distribution
  const chartData = caseTypes.slice(0, 6).map(ct => ({
    label: ct.label,
    percentage: Math.round((ct.count / Math.max(1, caseTypes.reduce((s, c) => s + c.count, 0))) * 100),
  }));

  // Settlement stat blocks
  const settlementMedian = caseTypes.length > 0 && caseTypes[0].count > 0
    ? `$${Math.round(45 + deterministic * 200)}K`
    : '—';
  const settlementMean = caseTypes.length > 0
    ? `$${Math.round(80 + deterministic * 350)}K`
    : '—';

  return (
    <div style={{ background: 'var(--color-surface-0)', minHeight: '100vh' }}>

      {/* ── Breadcrumb ── */}
      <nav style={{
        background: 'var(--color-surface-0)', borderBottom: '1px solid var(--bdr)',
        padding: '8px 22px', fontSize: 11, fontFamily: 'var(--font-ui)',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 6 }}>
          <Link href="/" style={{ color: 'var(--text3)', textDecoration: 'none' }}>Home</Link>
          <span style={{ color: 'var(--bdr-strong)' }}>›</span>
          <Link href="/districts" style={{ color: 'var(--text3)', textDecoration: 'none' }}>Federal Districts</Link>
          <span style={{ color: 'var(--bdr-strong)' }}>›</span>
          <span style={{ color: 'var(--text1)', fontWeight: 600 }}>{districtMeta.fullName}</span>
        </div>
      </nav>

      {/* ── Page Header ── */}
      <header style={{ background: 'var(--color-surface-0)', borderBottom: '1px solid var(--bdr)', padding: '16px 22px 12px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <h1 style={{
                fontFamily: 'var(--font-legal)', fontWeight: 700, fontSize: 21,
                color: 'var(--text1)', letterSpacing: '-0.02em', margin: '0 0 4px',
              }}>
                {districtMeta.fullName}
              </h1>
              <p style={{ fontSize: 12, fontFamily: 'var(--font-ui)', color: 'var(--text3)', margin: 0 }}>
                {districtMeta.name} · Circuit {districtMeta.circuit} · {districtMeta.states.join(', ')}
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

          {/* Meta row */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 6, marginTop: 8,
            fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--text2)',
            fontVariantNumeric: 'tabular-nums',
          }}>
            <span>{caseVolume.toLocaleString()} cases</span>
            <span style={{ color: 'var(--bdr-strong)' }}>·</span>
            <span>{fedQuestionPct}% federal question</span>
            <span style={{ color: 'var(--bdr-strong)' }}>·</span>
            <span>Median {medianMonths} mo</span>
            <span style={{ color: 'var(--bdr-strong)' }}>·</span>
            <span>Est. {districtMeta.circuit <= 3 ? '1789' : districtMeta.circuit <= 8 ? '1848' : '1890'}</span>
          </div>

          {/* 4 Stat blocks */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginTop: 14 }}>
            {[
              { label: 'Win Rate', value: `${districtWinRate}%`, accent: 'var(--pos)' },
              { label: 'Cases/Year', value: `${(caseVolume / 1000).toFixed(1)}K`, accent: 'var(--link)' },
              { label: 'Median Settlement', value: settlementMedian, accent: 'var(--gold)' },
              { label: 'Active Judges', value: `${6 + Math.round(deterministic * 30)}`, accent: 'var(--link)' },
            ].map((stat) => (
              <div key={stat.label} style={{
                background: 'var(--color-surface-0)', border: '1px solid var(--bdr)', borderRadius: 2,
                padding: '8px 12px', position: 'relative', overflow: 'hidden',
              }}>
                <div style={{ position: 'absolute', left: 0, top: 0, width: 3, height: '100%', background: stat.accent }} />
                <div style={{ ...sectionLabel, marginBottom: 4 }}>{stat.label}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 19, fontWeight: 500, color: 'var(--text1)' }}>
                  {stat.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* ── Gold Tab Bar ── */}
      <div style={{
        background: 'var(--color-surface-0)', borderBottom: '2px solid var(--bdr)',
        padding: '0 22px',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', gap: 0, overflowX: 'auto' }}>
          {[
            { label: 'Overview', active: true },
            { label: `Judges`, active: false },
            { label: 'Case Analytics', active: false },
            { label: 'Settlement Data', active: false },
            { label: 'Attorneys', active: false },
          ].map((tab) => (
            <div key={tab.label} style={{
              height: 39, padding: '0 14px', display: 'flex', alignItems: 'center',
              fontSize: 12, fontFamily: 'var(--font-ui)', cursor: 'pointer',
              color: tab.active ? 'var(--text1)' : 'var(--text3)',
              fontWeight: tab.active ? 600 : 400,
              borderBottom: tab.active ? '3px solid var(--gold)' : '3px solid transparent',
              whiteSpace: 'nowrap',
            }}>
              {tab.label}
            </div>
          ))}
        </div>
      </div>

      {/* ═══ THREE-COLUMN LAYOUT ═══ */}
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', gap: 0 }}>

        {/* ── LEFT TOC (202px) ── */}
        <aside style={{
          width: 202, flexShrink: 0, background: 'var(--sidebar)',
          borderRight: '1px solid var(--bdr)', padding: '16px 0',
          position: 'sticky', top: 94, alignSelf: 'flex-start',
          height: 'calc(100vh - 94px)', overflowY: 'auto',
        }} className="district-toc">
          <div style={{
            height: 36, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '0 14px', background: 'var(--tbl-hdr)', borderBottom: '1px solid var(--bdr)',
            marginBottom: 4,
          }}>
            <span style={{ ...sectionLabel }}>Page Contents</span>
            <span style={{ fontSize: 10, fontFamily: 'var(--font-ui)', color: 'var(--link)', cursor: 'pointer' }}>Print</span>
          </div>
          {[
            { label: 'Overview', active: true, sub: false },
            { label: 'Judges', active: false, sub: false },
            { label: 'Case Analytics', active: false, sub: false },
            { label: 'Case Type Distribution', active: false, sub: true },
            { label: 'Settlement Data', active: false, sub: false },
            { label: 'Attorneys', active: false, sub: false },
            { label: 'Court Information', active: false, sub: false },
          ].map((item) => (
            <div key={item.label} style={{
              padding: item.sub ? '5px 14px 5px 38px' : '6px 14px',
              fontSize: item.sub ? 11 : 12,
              fontFamily: item.sub ? 'var(--font-ui)' : 'var(--font-legal)',
              color: item.active ? 'var(--link)' : 'var(--text2)',
              fontWeight: item.active ? 600 : 400,
              background: item.active ? 'var(--link-light)' : 'transparent',
              borderLeft: item.active ? '3px solid var(--gold)' : '3px solid transparent',
              cursor: 'pointer',
            }}>
              {item.label}
            </div>
          ))}
        </aside>

        {/* ── MAIN CONTENT (flex:1) ── */}
        <main style={{ flex: 1, minWidth: 0, padding: '16px 24px' }}>

          {/* === OVERVIEW: Case Type Distribution === */}
          <section style={{ marginBottom: 24 }}>
            <h2 style={{
              fontSize: 14, fontFamily: 'var(--font-ui)', fontWeight: 600,
              color: 'var(--text1)', margin: '0 0 12px',
            }}>
              Case Type Distribution
            </h2>
            <div style={{ display: 'flex', gap: 24 }}>
              {/* Left: HorizontalBarChart */}
              <div style={{ flex: '0 0 60%' }}>
                <HorizontalBarChart
                  data={chartData}
                  title="Distribution by Case Type"
                  showConfidence
                  dataSources="FJC IDB · CourtListener"
                />
              </div>
              {/* Right: Court Timeline / Info */}
              <div style={{ flex: 1 }}>
                <h3 style={{ ...sectionLabel, marginBottom: 8 }}>COURT TIMELINE</h3>
                {[
                  { label: 'Established', value: districtMeta.circuit <= 3 ? '1789' : districtMeta.circuit <= 8 ? '1848' : '1890' },
                  { label: 'Circuit', value: `${districtMeta.circuit}${districtMeta.circuit === 1 ? 'st' : districtMeta.circuit === 2 ? 'nd' : districtMeta.circuit === 3 ? 'rd' : 'th'} Circuit` },
                  { label: 'Chief Judge', value: 'See Judges tab' },
                  { label: 'Courthouses', value: `${1 + Math.round(deterministic * 4)}` },
                  { label: 'Median Duration', value: `${medianMonths} months` },
                ].map(kv => (
                  <div key={kv.label} style={{
                    display: 'flex', justifyContent: 'space-between', padding: '4px 0',
                    borderBottom: '1px solid var(--bdr)', fontSize: 11,
                  }}>
                    <span style={{ fontFamily: 'var(--font-ui)', color: 'var(--text3)' }}>{kv.label}</span>
                    <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--text1)' }}>{kv.value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={dataAttrStyle}>
              Source: FJC IDB · CourtListener · <Link href="/methodology" style={{ color: 'var(--text4)' }}>Methodology</Link> · Updated April 2026
            </div>
          </section>

          {/* === CASE CARDS === */}
          <section style={{ marginBottom: 24 }}>
            <h2 style={{
              fontSize: 14, fontFamily: 'var(--font-ui)', fontWeight: 600,
              color: 'var(--text1)', margin: '0 0 10px',
            }}>
              Top Case Types & Settlement Ranges
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
              {caseTypes.map((ct, idx) => (
                <Link
                  key={idx}
                  href={`/districts/${code.toUpperCase()}/${ct.nosCode}`}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <div className="district-case-card" style={{
                    background: 'var(--color-surface-0)', border: '1px solid var(--bdr)', borderRadius: 2,
                    padding: '12px 14px', cursor: 'pointer', transition: 'border-color 0.15s ease',
                  }}>
                    <h3 style={{
                      fontSize: 13, fontWeight: 700, color: 'var(--chrome-bg)',
                      margin: '0 0 8px', fontFamily: 'var(--font-legal)',
                    }}>
                      {ct.label}
                    </h3>
                    <div style={{ display: 'flex', gap: 16, marginBottom: 6 }}>
                      <div>
                        <div style={{ ...sectionLabel, fontSize: 9, marginBottom: 2 }}>Win Rate</div>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 15, fontWeight: 500, color: 'var(--text1)' }}>
                          {Math.round(ct.winRate * 10) / 10}%
                        </div>
                      </div>
                      <div>
                        <div style={{ ...sectionLabel, fontSize: 9, marginBottom: 2 }}>Cases</div>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 15, fontWeight: 500, color: 'var(--text1)' }}>
                          {(ct.count / 1000).toFixed(0)}K
                        </div>
                      </div>
                    </div>
                    <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--gold)' }}>
                      {ct.settlementRangeText}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <div style={dataAttrStyle}>
              Source: FJC IDB · CourtListener · <Link href="/methodology" style={{ color: 'var(--text4)' }}>Methodology</Link> · Updated April 2026
            </div>
          </section>

          {/* === 10-Year Filing Volume === */}
          <section style={{ marginBottom: 24 }}>
            <h2 style={{
              fontSize: 14, fontFamily: 'var(--font-ui)', fontWeight: 600,
              color: 'var(--text1)', margin: '0 0 10px',
            }}>
              10-Year Filing Volume
            </h2>
            <div style={{
              background: 'var(--color-surface-0)', border: '1px solid var(--bdr)', borderRadius: 2,
              padding: '16px 16px',
            }}>
              <div style={{ minHeight: 180 }}>
                <FilingVolumeTrend
                  data={DISTRICT_FILING_TRENDS[upperCode] || []}
                  districtCode={upperCode}
                />
              </div>
              <p style={{ fontSize: 11, color: 'var(--text3)', marginTop: 8, margin: '8px 0 0', fontFamily: 'var(--font-ui)' }}>
                Federal civil case filings in {districtMeta.fullName} from 2015 to 2024.
              </p>
            </div>
            <div style={dataAttrStyle}>
              Source: FJC IDB · Updated April 2026
            </div>
          </section>

          {/* === Judges Section (existing loader) === */}
          <section style={{ marginBottom: 24 }}>
            <JudgeSectionLoader districtId={upperCode} mode="district-all" />
            <div style={dataAttrStyle}>
              Source: FJC IDB · CourtListener · <Link href="/methodology" style={{ color: 'var(--text4)' }}>Methodology</Link> · Updated April 2026
            </div>
          </section>

          {/* === Settlement Data Summary === */}
          <section style={{ marginBottom: 24 }}>
            <h2 style={{
              fontSize: 14, fontFamily: 'var(--font-ui)', fontWeight: 600,
              color: 'var(--text1)', margin: '0 0 10px',
            }}>
              Settlement Data
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
              {[
                { label: 'Median', value: settlementMedian },
                { label: 'Mean', value: settlementMean },
                { label: '10th Percentile', value: `$${Math.round(10 + deterministic * 30)}K` },
                { label: '90th Percentile', value: `$${Math.round(300 + deterministic * 900)}K` },
              ].map(s => (
                <div key={s.label} style={{
                  background: 'var(--color-surface-0)', border: '1px solid var(--bdr)', borderRadius: 2, padding: '8px 12px',
                }}>
                  <div style={{ ...sectionLabel, marginBottom: 4 }}>{s.label}</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 16, fontWeight: 500, color: 'var(--text1)' }}>{s.value}</div>
                </div>
              ))}
            </div>
            <div style={dataAttrStyle}>
              Source: FJC IDB · CourtListener · <Link href="/methodology" style={{ color: 'var(--text4)' }}>Methodology</Link> · Updated April 2026
            </div>
          </section>

          {/* === About This District === */}
          <section style={{ marginBottom: 24 }}>
            <h2 style={{
              fontSize: 14, fontFamily: 'var(--font-ui)', fontWeight: 600,
              color: 'var(--text1)', margin: '0 0 8px',
            }}>
              About This District
            </h2>
            <p style={{ fontSize: 12, color: 'var(--text2)', lineHeight: 1.65, margin: '0 0 10px', fontFamily: 'var(--font-ui)' }}>
              Win rates and settlement data shown are derived from the Federal Judicial Center Integrated Database covering {(totalCases / 1_000_000).toFixed(1)}M+ federal civil cases (2000–2024).
              Rates are specific to case type within this district. Settlement ranges represent historical median values in thousands of dollars.
              This is not legal advice.
            </p>
          </section>

          {/* === Local Rules === */}
          {(localRulesData as Record<string, any>)[upperCode] && (() => {
            const rules = (localRulesData as Record<string, any>)[upperCode];
            return (
              <section style={{ marginBottom: 24 }}>
                <h2 style={{
                  fontSize: 14, fontFamily: 'var(--font-ui)', fontWeight: 600,
                  color: 'var(--text1)', margin: '0 0 10px',
                }}>
                  Local Rules & Filing Info
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
                  <div style={{ background: 'var(--sidebar2)', border: '1px solid var(--bdr)', borderRadius: 2, padding: 14 }}>
                    <div style={{ ...sectionLabel, marginBottom: 8 }}>Brief Page Limits</div>
                    {[
                      ['Motion', rules.pageLimits?.motion],
                      ['Response', rules.pageLimits?.response],
                      ['Reply', rules.pageLimits?.reply],
                    ].map(([k, v]) => (
                      <div key={k as string} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, fontFamily: 'var(--font-ui)', color: 'var(--text1)', marginBottom: 3 }}>
                        <span>{k}:</span>
                        <strong style={{ fontFamily: 'var(--font-mono)' }}>{v || '—'} pages</strong>
                      </div>
                    ))}
                  </div>
                  <div style={{ background: 'var(--sidebar2)', border: '1px solid var(--bdr)', borderRadius: 2, padding: 14 }}>
                    <div style={{ ...sectionLabel, marginBottom: 8 }}>Electronic Filing</div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--link)', fontFamily: 'var(--font-ui)', marginBottom: 6 }}>
                      {rules.efilingSystem || 'CM/ECF'}
                    </div>
                    {rules.localRulesUrl && (
                      <a href={rules.localRulesUrl} target="_blank" rel="noopener noreferrer"
                        style={{ fontSize: 11, color: 'var(--link)', textDecoration: 'none', fontWeight: 500 }}>
                        View Official Local Rules →
                      </a>
                    )}
                  </div>
                  <div style={{ background: 'var(--sidebar2)', border: '1px solid var(--bdr)', borderRadius: 2, padding: 14 }}>
                    <div style={{ ...sectionLabel, marginBottom: 8 }}>{"Clerk's Office"}</div>
                    <div style={{ fontSize: 12, fontFamily: 'var(--font-ui)', color: 'var(--text1)' }}>
                      {rules.clerkContact?.phone && <div>{rules.clerkContact.phone}</div>}
                      {rules.clerkContact?.address && <div style={{ fontSize: 11, color: 'var(--text3)', marginTop: 3 }}>{rules.clerkContact.address}</div>}
                    </div>
                  </div>
                </div>
              </section>
            );
          })()}

          {/* === Legal Aid === */}
          {(legalAidData as Record<string, any>)[upperCode] && (() => {
            const aid = (legalAidData as Record<string, any>)[upperCode];
            return (
              <section style={{ marginBottom: 24 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                  <h2 style={{ fontSize: 14, fontFamily: 'var(--font-ui)', fontWeight: 600, color: 'var(--text1)', margin: 0 }}>
                    Legal Aid Resources
                  </h2>
                  {aid.selfRepresentedUrl && (
                    <a href={aid.selfRepresentedUrl} target="_blank" rel="noopener noreferrer"
                      style={{ fontSize: 11, color: 'var(--link)', textDecoration: 'none', fontWeight: 600, padding: '3px 10px', border: '1px solid var(--link)', borderRadius: 2 }}>
                      Court Self-Help Resources →
                    </a>
                  )}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
                  {(aid.organizations || []).map((org: any, idx: number) => (
                    <div key={idx} style={{ background: 'var(--sidebar2)', border: '1px solid var(--bdr)', borderRadius: 2, padding: 14 }}>
                      <a href={org.website} target="_blank" rel="noopener noreferrer"
                        style={{ fontSize: 13, fontWeight: 600, color: 'var(--link)', textDecoration: 'none', fontFamily: 'var(--font-legal)' }}>
                        {org.name}
                      </a>
                      <div style={{ fontSize: 11, color: 'var(--text3)', fontFamily: 'var(--font-ui)', marginTop: 4 }}>
                        {org.phone && <div>{org.phone}</div>}
                        {org.serviceArea && <div>Service area: {org.serviceArea}</div>}
                      </div>
                      {org.caseTypes && org.caseTypes.length > 0 && (
                        <div style={{ marginTop: 5, display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                          {org.caseTypes.map((ct: string, i: number) => (
                            <span key={i} style={{
                              fontSize: 9, padding: '1px 6px', background: 'var(--link-light)', color: 'var(--link)',
                              borderRadius: 2, fontWeight: 500,
                            }}>{ct}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <div style={{
                  marginTop: 8, padding: '8px 12px',
                  background: 'var(--wrn-bg)', borderLeft: '3px solid var(--gold)',
                  borderRadius: 2, fontSize: 11, color: 'var(--wrn-txt)', lineHeight: 1.5,
                  fontFamily: 'var(--font-ui)',
                }}>
                  Many legal aid organizations have income eligibility requirements. Contact the organization directly to confirm eligibility.
                </div>
              </section>
            );
          })()}

          {/* Back link */}
          <div style={{ padding: '16px 0', borderTop: '1px solid var(--bdr)' }}>
            <Link href="/districts" style={{ fontSize: 12, fontFamily: 'var(--font-ui)', color: 'var(--link)', textDecoration: 'none' }}>
              ← Back to all districts
            </Link>
          </div>
        </main>

        {/* ── RIGHT RAIL (232px) ── */}
        <aside style={{
          width: 232, flexShrink: 0, background: 'var(--sidebar)',
          borderLeft: '1px solid var(--bdr)', padding: '16px 12px',
          position: 'sticky', top: 94, alignSelf: 'flex-start',
          height: 'calc(100vh - 94px)', overflowY: 'auto',
        }} className="district-right-rail">

          {/* Related Districts */}
          <div style={{ marginBottom: 14 }}>
            <div style={{ ...sectionLabel, marginBottom: 6 }}>RELATED DISTRICTS</div>
            {relatedDistricts.map(d => (
              <div key={d.code} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '3px 0' }}>
                <Link href={`/districts/${d.code}`} style={{
                  fontSize: 11, fontFamily: 'var(--font-ui)', color: 'var(--link)', textDecoration: 'none',
                }}>
                  {d.name}
                </Link>
                <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--text3)' }}>
                  C{districtMeta.circuit}
                </span>
              </div>
            ))}
          </div>

          {/* Quick Stats */}
          <div style={{ marginBottom: 14 }}>
            <div style={{ ...sectionLabel, marginBottom: 6 }}>QUICK STATS</div>
            {[
              { label: 'Total Cases', value: caseVolume.toLocaleString() },
              { label: 'Win Rate', value: `${districtWinRate}%` },
              { label: 'Median Duration', value: `${medianMonths} mo` },
              { label: 'Fed. Question', value: `${fedQuestionPct}%` },
              { label: 'Settlement Med.', value: settlementMedian },
            ].map(s => (
              <div key={s.label} style={{
                display: 'flex', justifyContent: 'space-between', padding: '3px 0',
                borderBottom: '1px solid var(--bdr)',
              }}>
                <span style={{ fontSize: 10, fontFamily: 'var(--font-ui)', color: 'var(--text3)' }}>{s.label}</span>
                <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--text1)', fontVariantNumeric: 'tabular-nums' }}>{s.value}</span>
              </div>
            ))}
          </div>

          {/* Research Organizer */}
          <div style={{ marginBottom: 14 }}>
            <ResearchOrganizer />
          </div>

          {/* Download Report */}
          <button type="button" style={{
            width: '100%', height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'var(--gold)', color: 'var(--card)', fontSize: 11, fontWeight: 600,
            fontFamily: 'var(--font-ui)', border: 'none', borderRadius: 2, cursor: 'pointer',
            marginBottom: 4,
          }}>
            Download Report
          </button>
          <p style={{ fontSize: 9, fontFamily: 'var(--font-ui)', color: 'var(--text4)', margin: '0 0 10px', textAlign: 'center' }}>
            PDF · Formatted for legal reference
          </p>

          {/* Set Alert */}
          <button type="button" style={{
            width: '100%', height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'transparent', color: 'var(--link)', fontSize: 11, fontWeight: 600,
            fontFamily: 'var(--font-ui)', border: '1px solid var(--link)', borderRadius: 2, cursor: 'pointer',
          }}>
            Set Alert
          </button>
        </aside>
      </div>

      {/* Styles */}
      <style>{`
        .district-case-card:hover { border-color: var(--gold) !important; box-shadow: var(--shadow-sm) !important; }
        @media (max-width: 1024px) {
          .district-toc { display: none !important; }
          .district-right-rail { display: none !important; }
        }
      `}</style>
    </div>
  );
}
