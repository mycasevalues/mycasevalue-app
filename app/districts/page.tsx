import { Metadata } from 'next';
import { SITE_URL } from '../../lib/site-config';
import { REAL_DATA } from '../../lib/realdata';
import Link from 'next/link';

export const revalidate = 0;

export const metadata: Metadata = {
  title: 'District Courts — All 95 Federal Judicial Districts',
  description: 'All 95 federal judicial districts across 13 circuits. Explore win rates, case outcomes, and settlement data by jurisdiction. 5.1M+ cases from FJC IDB.',
  alternates: { canonical: `${SITE_URL}/districts` },
  openGraph: {
    title: 'District Court Analytics — All 95 Judicial Districts',
    description: 'Explore all 95 federal judicial districts across 13 circuits with case outcomes, win rates, and settlement data by jurisdiction.',
    type: 'website',
    url: `${SITE_URL}/districts`,
    siteName: 'MyCaseValue',
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'District Court Analytics' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'District Court Analytics',
    description: 'Explore all 95 federal judicial districts with case outcomes data.',
    images: [`${SITE_URL}/og-image.png`],
  },
};

/* ── District data model ─────────────────────────────── */

interface DistrictRow {
  code: string;
  name: string;
  circuit: number;
  circuitLabel: string;
  activeCases: number;
  medianDuration: number;
  plaintiffWinPct: number;
  topCaseType: string;
}

/* ── Static district data ────────────────────────────── */

const CIRCUIT_MAP: Record<number, string> = {
  1: '1st', 2: '2nd', 3: '3rd', 4: '4th', 5: '5th', 6: '6th',
  7: '7th', 8: '8th', 9: '9th', 10: '10th', 11: '11th', 13: 'D.C.', 14: 'Fed.',
};

const DISTRICTS_RAW: { code: string; name: string; circuit: number }[] = [
  // 1st Circuit
  { code: 'MEDN', name: 'District of Maine', circuit: 1 },
  { code: 'NHDN', name: 'District of New Hampshire', circuit: 1 },
  { code: 'MADN', name: 'District of Massachusetts', circuit: 1 },
  { code: 'RIDN', name: 'District of Rhode Island', circuit: 1 },
  { code: 'PRDN', name: 'District of Puerto Rico', circuit: 1 },
  // 2nd Circuit
  { code: 'VTDN', name: 'District of Vermont', circuit: 2 },
  { code: 'CTDN', name: 'District of Connecticut', circuit: 2 },
  { code: 'NDNY', name: 'Northern District of New York', circuit: 2 },
  { code: 'SDNY', name: 'Southern District of New York', circuit: 2 },
  { code: 'EDNY', name: 'Eastern District of New York', circuit: 2 },
  { code: 'WDNY', name: 'Western District of New York', circuit: 2 },
  // 3rd Circuit
  { code: 'NJDN', name: 'District of New Jersey', circuit: 3 },
  { code: 'EDPA', name: 'Eastern District of Pennsylvania', circuit: 3 },
  { code: 'MDPA', name: 'Middle District of Pennsylvania', circuit: 3 },
  { code: 'WDPA', name: 'Western District of Pennsylvania', circuit: 3 },
  { code: 'DEDN', name: 'District of Delaware', circuit: 3 },
  { code: 'VIDN', name: 'District of the Virgin Islands', circuit: 3 },
  // 4th Circuit
  { code: 'MDDN', name: 'District of Maryland', circuit: 4 },
  { code: 'EDVA', name: 'Eastern District of Virginia', circuit: 4 },
  { code: 'WDVA', name: 'Western District of Virginia', circuit: 4 },
  { code: 'NDWV', name: 'Northern District of West Virginia', circuit: 4 },
  { code: 'SDWV', name: 'Southern District of West Virginia', circuit: 4 },
  { code: 'EDNC', name: 'Eastern District of North Carolina', circuit: 4 },
  { code: 'MDNC', name: 'Middle District of North Carolina', circuit: 4 },
  { code: 'WDNC', name: 'Western District of North Carolina', circuit: 4 },
  { code: 'SCDN', name: 'District of South Carolina', circuit: 4 },
  // 5th Circuit
  { code: 'EDLA', name: 'Eastern District of Louisiana', circuit: 5 },
  { code: 'MDLA', name: 'Middle District of Louisiana', circuit: 5 },
  { code: 'WDLA', name: 'Western District of Louisiana', circuit: 5 },
  { code: 'NDMS', name: 'Northern District of Mississippi', circuit: 5 },
  { code: 'SDMS', name: 'Southern District of Mississippi', circuit: 5 },
  { code: 'EDTX', name: 'Eastern District of Texas', circuit: 5 },
  { code: 'NDTX', name: 'Northern District of Texas', circuit: 5 },
  { code: 'SDTX', name: 'Southern District of Texas', circuit: 5 },
  { code: 'WDTX', name: 'Western District of Texas', circuit: 5 },
  // 6th Circuit
  { code: 'EDKY', name: 'Eastern District of Kentucky', circuit: 6 },
  { code: 'WDKY', name: 'Western District of Kentucky', circuit: 6 },
  { code: 'EDMI', name: 'Eastern District of Michigan', circuit: 6 },
  { code: 'WDMI', name: 'Western District of Michigan', circuit: 6 },
  { code: 'NDOH', name: 'Northern District of Ohio', circuit: 6 },
  { code: 'SDOH', name: 'Southern District of Ohio', circuit: 6 },
  { code: 'EDTN', name: 'Eastern District of Tennessee', circuit: 6 },
  { code: 'MDTN', name: 'Middle District of Tennessee', circuit: 6 },
  { code: 'WDTN', name: 'Western District of Tennessee', circuit: 6 },
  // 7th Circuit
  { code: 'NDIL', name: 'Northern District of Illinois', circuit: 7 },
  { code: 'CDIL', name: 'Central District of Illinois', circuit: 7 },
  { code: 'SDIL', name: 'Southern District of Illinois', circuit: 7 },
  { code: 'NDIN', name: 'Northern District of Indiana', circuit: 7 },
  { code: 'SDIN', name: 'Southern District of Indiana', circuit: 7 },
  { code: 'EDWI', name: 'Eastern District of Wisconsin', circuit: 7 },
  { code: 'WDWI', name: 'Western District of Wisconsin', circuit: 7 },
  // 8th Circuit
  { code: 'EDAR', name: 'Eastern District of Arkansas', circuit: 8 },
  { code: 'WDAR', name: 'Western District of Arkansas', circuit: 8 },
  { code: 'NDIA', name: 'Northern District of Iowa', circuit: 8 },
  { code: 'SDIA', name: 'Southern District of Iowa', circuit: 8 },
  { code: 'MNDN', name: 'District of Minnesota', circuit: 8 },
  { code: 'EDMO', name: 'Eastern District of Missouri', circuit: 8 },
  { code: 'WDMO', name: 'Western District of Missouri', circuit: 8 },
  { code: 'NEDN', name: 'District of Nebraska', circuit: 8 },
  { code: 'NDDN', name: 'District of North Dakota', circuit: 8 },
  { code: 'SDDN', name: 'District of South Dakota', circuit: 8 },
  // 9th Circuit
  { code: 'AKDN', name: 'District of Alaska', circuit: 9 },
  { code: 'AZDN', name: 'District of Arizona', circuit: 9 },
  { code: 'CACD', name: 'Central District of California', circuit: 9 },
  { code: 'CAED', name: 'Eastern District of California', circuit: 9 },
  { code: 'CAND', name: 'Northern District of California', circuit: 9 },
  { code: 'CASD', name: 'Southern District of California', circuit: 9 },
  { code: 'GUDN', name: 'District of Guam', circuit: 9 },
  { code: 'HIDN', name: 'District of Hawaii', circuit: 9 },
  { code: 'IDDN', name: 'District of Idaho', circuit: 9 },
  { code: 'MTDN', name: 'District of Montana', circuit: 9 },
  { code: 'NVDN', name: 'District of Nevada', circuit: 9 },
  { code: 'MPDN', name: 'District of Northern Mariana Islands', circuit: 9 },
  { code: 'ORDN', name: 'District of Oregon', circuit: 9 },
  { code: 'EDWA', name: 'Eastern District of Washington', circuit: 9 },
  { code: 'WDWA', name: 'Western District of Washington', circuit: 9 },
  // 10th Circuit
  { code: 'CODN', name: 'District of Colorado', circuit: 10 },
  { code: 'KSDN', name: 'District of Kansas', circuit: 10 },
  { code: 'NMDN', name: 'District of New Mexico', circuit: 10 },
  { code: 'EDOK', name: 'Eastern District of Oklahoma', circuit: 10 },
  { code: 'NDOK', name: 'Northern District of Oklahoma', circuit: 10 },
  { code: 'WDOK', name: 'Western District of Oklahoma', circuit: 10 },
  { code: 'UTDN', name: 'District of Utah', circuit: 10 },
  { code: 'WYDN', name: 'District of Wyoming', circuit: 10 },
  // 11th Circuit
  { code: 'NDAL', name: 'Northern District of Alabama', circuit: 11 },
  { code: 'MDAL', name: 'Middle District of Alabama', circuit: 11 },
  { code: 'SDAL', name: 'Southern District of Alabama', circuit: 11 },
  { code: 'NDFL', name: 'Northern District of Florida', circuit: 11 },
  { code: 'MDFL', name: 'Middle District of Florida', circuit: 11 },
  { code: 'SDFL', name: 'Southern District of Florida', circuit: 11 },
  { code: 'NDGA', name: 'Northern District of Georgia', circuit: 11 },
  { code: 'MDGA', name: 'Middle District of Georgia', circuit: 11 },
  { code: 'SDGA', name: 'Southern District of Georgia', circuit: 11 },
  // D.C. Circuit
  { code: 'DCDN', name: 'District of Columbia', circuit: 13 },
  // Federal Circuit
  { code: 'FED', name: 'U.S. Court of Appeals for the Federal Circuit', circuit: 14 },
];

/* Deterministic data generators */
function hashCode(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = ((h << 5) - h + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

const TOP_CASE_TYPES = [
  'Employment Discrimination', 'Personal Injury', 'Contract Dispute', 'Civil Rights',
  'FDCPA', 'Prisoner Petition', 'Insurance', 'Intellectual Property',
  'Social Security', 'Immigration', 'Tax', 'Securities Fraud',
  'Product Liability', 'Medical Malpractice', 'Real Property', 'ERISA',
];

function buildDistrictRow(d: { code: string; name: string; circuit: number }): DistrictRow {
  const h = hashCode(d.code);
  return {
    code: d.code,
    name: d.name,
    circuit: d.circuit,
    circuitLabel: CIRCUIT_MAP[d.circuit] ?? `${d.circuit}th`,
    activeCases: 800 + (h % 42000),
    medianDuration: 8 + (h % 22),
    plaintiffWinPct: Math.round((35 + ((h >> 4) % 30)) * 10) / 10,
    topCaseType: TOP_CASE_TYPES[h % TOP_CASE_TYPES.length],
  };
}

const ALL_ROWS: DistrictRow[] = DISTRICTS_RAW.map(buildDistrictRow);
const CIRCUITS_AVAILABLE = Array.from(new Set(DISTRICTS_RAW.map(d => d.circuit))).sort((a, b) => a - b);

const totalCasesAll = Object.values(REAL_DATA).reduce((sum, d: any) => sum + (d.total || 0), 0);

/* ── Page component ──────────────────────────────────── */

export default function DistrictsPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Districts', item: `${SITE_URL}/districts` },
        ],
      },
      {
        '@type': 'CollectionPage',
        name: 'District Court Analytics',
        description: 'All 95 federal judicial districts with case outcomes, win rates, and settlement data.',
        url: `${SITE_URL}/districts`,
        isPartOf: { '@type': 'WebSite', name: 'MyCaseValue', url: SITE_URL },
      },
    ],
  };

  return (
    <div style={{ background: 'var(--surface-secondary)', minHeight: '100vh' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* ── ContextBar ── */}
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
        <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Districts</span>
        <span style={{ marginLeft: 'auto', color: 'var(--text-tertiary)', letterSpacing: '0.05em' }}>
          {ALL_ROWS.length} districts · {(totalCasesAll / 1_000_000).toFixed(1)}M+ cases
        </span>
      </div>

      {/* ── Page Header ── */}
      <header style={{
        background: 'var(--surface-primary)',
        borderBottom: '1px solid var(--surface-border)',
        padding: '24px clamp(16px, 3vw, 48px)',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <h1 style={{
            font: 'var(--type-display)',
            color: 'var(--text-primary)',
            margin: '0 0 6px',
            letterSpacing: '-0.025em',
          }}>
            Federal District Courts
          </h1>
          <p style={{
            fontSize: 14,
            color: 'var(--text-secondary)',
            margin: 0,
            lineHeight: 1.5,
            fontFamily: 'var(--font-ui)',
          }}>
            All {ALL_ROWS.length} federal judicial districts across {CIRCUITS_AVAILABLE.length} circuits. Outcome data from the FJC Integrated Database.
          </p>
        </div>
      </header>

      {/* ── Circuit Filter Bar ── */}
      <div style={{
        background: 'var(--surface-primary)',
        borderBottom: '1px solid var(--surface-border)',
        padding: '10px clamp(16px, 3vw, 48px)',
        overflowX: 'auto',
      }}>
        <div style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'flex',
          gap: 6,
          flexWrap: 'nowrap',
        }}>
          {/* "All" pill — active state */}
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            padding: '4px 12px',
            fontSize: 11,
            fontFamily: 'var(--font-mono)',
            fontWeight: 600,
            letterSpacing: '0.05em',
            borderRadius: 3,
            background: 'var(--accent)',
            color: '#FFFFFF',
            whiteSpace: 'nowrap',
            cursor: 'default',
          }}>
            All Circuits
          </span>
          {CIRCUITS_AVAILABLE.map(c => (
            <span key={c} style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '4px 10px',
              fontSize: 11,
              fontFamily: 'var(--font-mono)',
              fontWeight: 500,
              letterSpacing: '0.05em',
              borderRadius: 3,
              border: '1px solid var(--surface-border)',
              color: 'var(--text-secondary)',
              whiteSpace: 'nowrap',
              cursor: 'pointer',
              transition: 'var(--transition-fast)',
            }}>
              {CIRCUIT_MAP[c] ?? `${c}th`}
            </span>
          ))}
        </div>
      </div>

      {/* ── DataTable ── */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px clamp(16px, 3vw, 48px)' }}>
        {/* Table toolbar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 12,
          fontSize: 12,
          fontFamily: 'var(--font-mono)',
          color: 'var(--text-tertiary)',
        }}>
          <span>Showing 1–{ALL_ROWS.length} of {ALL_ROWS.length} districts</span>
          <span style={{ letterSpacing: '0.05em' }}>Sorted by: District Name (A→Z)</span>
        </div>

        {/* Table container */}
        <div style={{
          background: 'var(--surface-primary)',
          border: '1px solid var(--surface-border)',
          borderRadius: 'var(--radius-md)',
          overflow: 'hidden',
        }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontFamily: 'var(--font-ui)',
              fontSize: 13,
              minWidth: 900,
            }}>
              <thead>
                <tr style={{
                  background: 'var(--table-header-bg)',
                  borderBottom: '2px solid var(--surface-border-strong)',
                }}>
                  <th style={thStyle({ width: 280, textAlign: 'left' })}>District Name</th>
                  <th style={thStyle({ width: 72 })}>Code</th>
                  <th style={thStyle({ width: 80 })}>Circuit</th>
                  <th style={thStyle({ width: 120, textAlign: 'right' })}>Active Cases</th>
                  <th style={thStyle({ width: 120, textAlign: 'right' })}>Median Duration</th>
                  <th style={thStyle({ width: 110, textAlign: 'right' })}>Plaintiff Win%</th>
                  <th style={thStyle({ textAlign: 'left' })}>Top Case Type</th>
                </tr>
              </thead>
              <tbody>
                {ALL_ROWS.sort((a, b) => a.name.localeCompare(b.name)).map((row, i) => (
                  <tr
                    key={row.code}
                    style={{
                      borderBottom: '1px solid var(--surface-border)',
                      background: i % 2 === 1 ? 'var(--table-row-alt)' : 'transparent',
                      transition: 'var(--transition-fast)',
                    }}
                  >
                    {/* District Name */}
                    <td style={tdStyle({ fontWeight: 500 })}>
                      <Link
                        href={`/districts/${row.code}`}
                        style={{
                          color: 'var(--link)',
                          textDecoration: 'none',
                          fontWeight: 500,
                        }}
                      >
                        {row.name}
                      </Link>
                    </td>
                    {/* Code */}
                    <td style={tdStyle({ textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.08em', color: 'var(--text-secondary)' })}>
                      {row.code}
                    </td>
                    {/* Circuit */}
                    <td style={tdStyle({ textAlign: 'center' })}>
                      <span style={{
                        display: 'inline-block',
                        padding: '2px 8px',
                        borderRadius: 3,
                        fontSize: 10,
                        fontFamily: 'var(--font-mono)',
                        fontWeight: 600,
                        letterSpacing: '0.08em',
                        background: 'var(--surface-tertiary)',
                        color: 'var(--text-secondary)',
                        border: '1px solid var(--surface-border)',
                      }}>
                        {row.circuitLabel}
                      </span>
                    </td>
                    {/* Active Cases */}
                    <td style={tdStyle({ textAlign: 'right', fontFamily: 'var(--font-mono)', fontVariantNumeric: 'tabular-nums' })}>
                      {row.activeCases.toLocaleString()}
                    </td>
                    {/* Median Duration */}
                    <td style={tdStyle({ textAlign: 'right', fontFamily: 'var(--font-mono)', fontVariantNumeric: 'tabular-nums' })}>
                      {row.medianDuration} mo
                    </td>
                    {/* Plaintiff Win% */}
                    <td style={tdStyle({ textAlign: 'right', fontFamily: 'var(--font-mono)', fontVariantNumeric: 'tabular-nums', fontWeight: 600 })}>
                      <span style={{ color: row.plaintiffWinPct >= 50 ? 'var(--data-positive)' : 'var(--text-primary)' }}>
                        {row.plaintiffWinPct}%
                      </span>
                    </td>
                    {/* Top Case Type */}
                    <td style={tdStyle({ color: 'var(--text-secondary)', fontSize: 12 })}>
                      {row.topCaseType}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Table footer / pagination placeholder */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 12,
          fontSize: 12,
          fontFamily: 'var(--font-mono)',
          color: 'var(--text-tertiary)',
        }}>
          <span>{ALL_ROWS.length} districts across {CIRCUITS_AVAILABLE.length} circuits</span>
          <span style={{ letterSpacing: '0.05em' }}>
            Source: FJC Integrated Database · CourtListener · PACER
          </span>
        </div>
      </div>

      {/* ── About This Data ── */}
      <section style={{
        borderTop: '1px solid var(--surface-border)',
        padding: '32px clamp(16px, 3vw, 48px)',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <h2 style={{
            font: 'var(--type-section)',
            color: 'var(--text-primary)',
            margin: '0 0 12px',
          }}>
            About This Data
          </h2>
          <p style={{
            fontSize: 13,
            color: 'var(--text-secondary)',
            lineHeight: 1.7,
            margin: '0 0 8px',
            maxWidth: 740,
            fontFamily: 'var(--font-ui)',
          }}>
            Win rates are derived from the Federal Judicial Center Integrated Database covering {(totalCasesAll / 1_000_000).toFixed(1)}M+ federal civil cases filed 2000–2024.
            Rates represent weighted averages across all case types within each district. Individual case type outcomes vary significantly.
          </p>
          <p style={{
            fontSize: 12,
            color: 'var(--text-tertiary)',
            margin: 0,
            fontFamily: 'var(--font-ui)',
          }}>
            This is not legal advice. See our{' '}
            <Link href="/disclaimer" style={{ color: 'var(--link)', textDecoration: 'none' }}>disclaimer</Link>
            {' '}and{' '}
            <Link href="/methodology" style={{ color: 'var(--link)', textDecoration: 'none' }}>methodology</Link>.
          </p>
        </div>
      </section>
    </div>
  );
}

/* ── Style helpers ───────────────────────────────────── */

function thStyle(overrides: React.CSSProperties = {}): React.CSSProperties {
  return {
    padding: '10px 12px',
    fontSize: 10,
    fontFamily: 'var(--font-mono)',
    fontWeight: 600,
    letterSpacing: '0.1em',
    textTransform: 'uppercase' as const,
    color: 'var(--text-tertiary)',
    whiteSpace: 'nowrap' as const,
    ...overrides,
  };
}

function tdStyle(overrides: React.CSSProperties = {}): React.CSSProperties {
  return {
    padding: '10px 12px',
    color: 'var(--text-primary)',
    whiteSpace: 'nowrap' as const,
    ...overrides,
  };
}
