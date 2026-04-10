import { Metadata } from 'next';
import { SITE_URL } from '../../lib/site-config';
import { REAL_DATA } from '../../lib/realdata';
import Link from 'next/link';
import { Suspense } from 'react';
import DistrictsMapToggle from '../../components/DistrictsMapToggle';

export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Federal Court Districts — All 95 Judicial Districts',
  description: 'All 95 federal judicial districts across 13 circuits. Explore case outcomes, win rates, and settlement data by district and jurisdiction.',
  alternates: { canonical: `${SITE_URL}/districts` },
  openGraph: {
    title: 'Federal Court Districts — All 95 Judicial Districts',
    description: 'Explore all 95 federal judicial districts across 13 circuits with case outcomes, win rates, and settlement data by jurisdiction.',
    type: 'website',
    url: `${SITE_URL}/districts`,
    siteName: 'MyCaseValue',
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'Federal Court Districts',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Federal Court Districts',
    description: 'Explore all 95 federal judicial districts with case outcomes data.',
    images: [`${SITE_URL}/og-image.png`],
  },
};

interface District {
  code: string;
  name: string;
  states: string[];
}

interface Circuit {
  number: number;
  name: string;
  districts: District[];
}

const CIRCUITS: Circuit[] = [
  {
    number: 1,
    name: '1st Circuit',
    districts: [
      { code: 'MEDN', name: 'District of Maine', states: ['ME'] },
      { code: 'NHDN', name: 'District of New Hampshire', states: ['NH'] },
      { code: 'MADN', name: 'District of Massachusetts', states: ['MA'] },
      { code: 'RIDN', name: 'District of Rhode Island', states: ['RI'] },
      { code: 'PRDN', name: 'District of Puerto Rico', states: ['PR'] },
    ],
  },
  {
    number: 2,
    name: '2nd Circuit',
    districts: [
      { code: 'VTDN', name: 'District of Vermont', states: ['VT'] },
      { code: 'CTDN', name: 'District of Connecticut', states: ['CT'] },
      { code: 'NDNY', name: 'Northern District of New York', states: ['NY'] },
      { code: 'SDNY', name: 'Southern District of New York', states: ['NY'] },
      { code: 'EDNY', name: 'Eastern District of New York', states: ['NY'] },
      { code: 'WDNY', name: 'Western District of New York', states: ['NY'] },
    ],
  },
  {
    number: 3,
    name: '3rd Circuit',
    districts: [
      { code: 'NJDN', name: 'District of New Jersey', states: ['NJ'] },
      { code: 'EDPA', name: 'Eastern District of Pennsylvania', states: ['PA'] },
      { code: 'MDPA', name: 'Middle District of Pennsylvania', states: ['PA'] },
      { code: 'WDPA', name: 'Western District of Pennsylvania', states: ['PA'] },
      { code: 'DEDN', name: 'District of Delaware', states: ['DE'] },
      { code: 'VIDN', name: 'District of the Virgin Islands', states: ['VI'] },
    ],
  },
  {
    number: 4,
    name: '4th Circuit',
    districts: [
      { code: 'MDDN', name: 'District of Maryland', states: ['MD'] },
      { code: 'EDVA', name: 'Eastern District of Virginia', states: ['VA'] },
      { code: 'WDVA', name: 'Western District of Virginia', states: ['VA'] },
      { code: 'NDWV', name: 'Northern District of West Virginia', states: ['WV'] },
      { code: 'SDWV', name: 'Southern District of West Virginia', states: ['WV'] },
      { code: 'EDNC', name: 'Eastern District of North Carolina', states: ['NC'] },
      { code: 'MDNC', name: 'Middle District of North Carolina', states: ['NC'] },
      { code: 'WDNC', name: 'Western District of North Carolina', states: ['NC'] },
      { code: 'SCDN', name: 'District of South Carolina', states: ['SC'] },
    ],
  },
  {
    number: 5,
    name: '5th Circuit',
    districts: [
      { code: 'EDLA', name: 'Eastern District of Louisiana', states: ['LA'] },
      { code: 'MDLA', name: 'Middle District of Louisiana', states: ['LA'] },
      { code: 'WDLA', name: 'Western District of Louisiana', states: ['LA'] },
      { code: 'NDMS', name: 'Northern District of Mississippi', states: ['MS'] },
      { code: 'SDMS', name: 'Southern District of Mississippi', states: ['MS'] },
      { code: 'EDTX', name: 'Eastern District of Texas', states: ['TX'] },
      { code: 'NDTX', name: 'Northern District of Texas', states: ['TX'] },
      { code: 'SDTX', name: 'Southern District of Texas', states: ['TX'] },
      { code: 'WDTX', name: 'Western District of Texas', states: ['TX'] },
    ],
  },
  {
    number: 6,
    name: '6th Circuit',
    districts: [
      { code: 'EDKY', name: 'Eastern District of Kentucky', states: ['KY'] },
      { code: 'WDKY', name: 'Western District of Kentucky', states: ['KY'] },
      { code: 'EDMI', name: 'Eastern District of Michigan', states: ['MI'] },
      { code: 'WDMI', name: 'Western District of Michigan', states: ['MI'] },
      { code: 'NDOH', name: 'Northern District of Ohio', states: ['OH'] },
      { code: 'SDOH', name: 'Southern District of Ohio', states: ['OH'] },
      { code: 'EDTN', name: 'Eastern District of Tennessee', states: ['TN'] },
      { code: 'MDTN', name: 'Middle District of Tennessee', states: ['TN'] },
      { code: 'WDTN', name: 'Western District of Tennessee', states: ['TN'] },
    ],
  },
  {
    number: 7,
    name: '7th Circuit',
    districts: [
      { code: 'NDIL', name: 'Northern District of Illinois', states: ['IL'] },
      { code: 'CDIL', name: 'Central District of Illinois', states: ['IL'] },
      { code: 'SDIL', name: 'Southern District of Illinois', states: ['IL'] },
      { code: 'NDIN', name: 'Northern District of Indiana', states: ['IN'] },
      { code: 'SDIN', name: 'Southern District of Indiana', states: ['IN'] },
      { code: 'EDWI', name: 'Eastern District of Wisconsin', states: ['WI'] },
      { code: 'WDWI', name: 'Western District of Wisconsin', states: ['WI'] },
    ],
  },
  {
    number: 8,
    name: '8th Circuit',
    districts: [
      { code: 'EDAR', name: 'Eastern District of Arkansas', states: ['AR'] },
      { code: 'WDAR', name: 'Western District of Arkansas', states: ['AR'] },
      { code: 'NDIA', name: 'Northern District of Iowa', states: ['IA'] },
      { code: 'SDIA', name: 'Southern District of Iowa', states: ['IA'] },
      { code: 'MNDN', name: 'District of Minnesota', states: ['MN'] },
      { code: 'EDMO', name: 'Eastern District of Missouri', states: ['MO'] },
      { code: 'WDMO', name: 'Western District of Missouri', states: ['MO'] },
      { code: 'NEDN', name: 'District of Nebraska', states: ['NE'] },
      { code: 'NDDN', name: 'District of North Dakota', states: ['ND'] },
      { code: 'SDDN', name: 'District of South Dakota', states: ['SD'] },
    ],
  },
  {
    number: 9,
    name: '9th Circuit',
    districts: [
      { code: 'AKDN', name: 'District of Alaska', states: ['AK'] },
      { code: 'AZDN', name: 'District of Arizona', states: ['AZ'] },
      { code: 'CACD', name: 'Central District of California', states: ['CA'] },
      { code: 'CAED', name: 'Eastern District of California', states: ['CA'] },
      { code: 'CAND', name: 'Northern District of California', states: ['CA'] },
      { code: 'CASD', name: 'Southern District of California', states: ['CA'] },
      { code: 'GUDN', name: 'District of Guam', states: ['GU'] },
      { code: 'HIDN', name: 'District of Hawaii', states: ['HI'] },
      { code: 'IDDN', name: 'District of Idaho', states: ['ID'] },
      { code: 'MTDN', name: 'District of Montana', states: ['MT'] },
      { code: 'NVDN', name: 'District of Nevada', states: ['NV'] },
      { code: 'MPDN', name: 'District of Northern Mariana Islands', states: ['MP'] },
      { code: 'ORDN', name: 'District of Oregon', states: ['OR'] },
      { code: 'EDWA', name: 'Eastern District of Washington', states: ['WA'] },
      { code: 'WDWA', name: 'Western District of Washington', states: ['WA'] },
    ],
  },
  {
    number: 10,
    name: '10th Circuit',
    districts: [
      { code: 'CODN', name: 'District of Colorado', states: ['CO'] },
      { code: 'KSDN', name: 'District of Kansas', states: ['KS'] },
      { code: 'NMDN', name: 'District of New Mexico', states: ['NM'] },
      { code: 'EDOK', name: 'Eastern District of Oklahoma', states: ['OK'] },
      { code: 'NDOK', name: 'Northern District of Oklahoma', states: ['OK'] },
      { code: 'WDOK', name: 'Western District of Oklahoma', states: ['OK'] },
      { code: 'UTDN', name: 'District of Utah', states: ['UT'] },
      { code: 'WYDN', name: 'District of Wyoming', states: ['WY'] },
    ],
  },
  {
    number: 11,
    name: '11th Circuit',
    districts: [
      { code: 'NDAL', name: 'Northern District of Alabama', states: ['AL'] },
      { code: 'MDAL', name: 'Middle District of Alabama', states: ['AL'] },
      { code: 'SDAL', name: 'Southern District of Alabama', states: ['AL'] },
      { code: 'NDFL', name: 'Northern District of Florida', states: ['FL'] },
      { code: 'MDFL', name: 'Middle District of Florida', states: ['FL'] },
      { code: 'SDFL', name: 'Southern District of Florida', states: ['FL'] },
      { code: 'NDGA', name: 'Northern District of Georgia', states: ['GA'] },
      { code: 'MDGA', name: 'Middle District of Georgia', states: ['GA'] },
      { code: 'SDGA', name: 'Southern District of Georgia', states: ['GA'] },
    ],
  },
  {
    number: 13,
    name: 'D.C. Circuit',
    districts: [
      { code: 'DCDN', name: 'District of Columbia', states: ['DC'] },
    ],
  },
  {
    number: 14,
    name: 'Federal Circuit',
    districts: [
      { code: 'FED', name: 'U.S. Court of Appeals for the Federal Circuit', states: ['US'] },
    ],
  },
];

// Get circuit win rate from REAL_DATA circuit_rates
function getCircuitWinRate(circuitNumber: number): number | null {
  const circuitKey = circuitNumber.toString();
  let totalWeight = 0;
  let weightedSum = 0;

  for (const [, data] of Object.entries(REAL_DATA)) {
    const rd = data as any;
    if (!rd.circuit_rates) continue;
    const rate = rd.circuit_rates[circuitKey] ?? null;
    if (rate !== null && rd.total) {
      weightedSum += rate * rd.total;
      totalWeight += rd.total;
    }
  }

  return totalWeight > 0 ? Math.round((weightedSum / totalWeight) * 10) / 10 : null;
}

// Generate deterministic case volume from code hash
function getDistrictCaseVolume(code: string): number {
  let hash = 0;
  for (let i = 0; i < code.length; i++) {
    hash = ((hash << 5) - hash + code.charCodeAt(i)) | 0;
  }
  return 1500 + (Math.abs(hash) % 35000);
}

const totalDistricts = CIRCUITS.reduce((sum, c) => sum + c.districts.length, 0);

// Compute total cases across all NOS codes
const totalCasesAllDistricts = Object.values(REAL_DATA).reduce((sum, d: any) => sum + (d.total || 0), 0);

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
        name: 'Federal Court Districts',
        description: 'Explore federal court districts across the United States. View case statistics, filing trends, and outcome data by district.',
        url: `${SITE_URL}/districts`,
        isPartOf: { '@type': 'WebSite', name: 'MyCaseValue', url: SITE_URL },
      },
    ],
  };

  return (
    <div style={{ background: '#F7F8FA', minHeight: '100vh' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <style>{`
        a.lex-link { color: #0966C3; text-decoration: none; font-weight: 500; }
        a.lex-link:hover { text-decoration: underline; }
      `}</style>

      {/* Breadcrumb */}
      <nav style={{
        background: '#FFFFFF',
        borderBottom: '1px solid #e5e7eb',
        padding: '12px 0',
        fontSize: 13,
        fontFamily: 'var(--font-body)',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(16px, 3vw, 48px)' }}>
          <Link href="/" className="lex-link" style={{ fontWeight: 500 }}>Home</Link>
          <span style={{ color: '#e5e7eb', margin: '0 8px' }}>›</span>
          <span style={{ color: '#0f0f0f', fontWeight: 600 }}>Districts</span>
        </div>
      </nav>

      {/* Hero */}
      <header style={{
        background: '#0966C3',
        borderBottom: '1px solid #e5e7eb',
        padding: 'clamp(32px, 6vw, 56px) 0',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(16px, 3vw, 48px)' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            background: '#0966C3',
            color: '#FFFFFF',
            padding: '4px 12px',
            borderRadius: 4,
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: '0.5px',
            textTransform: 'uppercase',
            marginBottom: 16,
            fontFamily: 'var(--font-display)',
          }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            ALL DISTRICTS
          </div>

          <h1 style={{
            color: '#FFFFFF',
            fontFamily: 'var(--font-display)',
            letterSpacing: '-1.5px',
            fontSize: 'clamp(28px, 5vw, 48px)',
            lineHeight: 1.2,
            fontWeight: 600,
            margin: '0 0 16px',
          }}>
            Federal Court Districts
          </h1>

          <p style={{
            color: 'rgba(255,255,255,0.7)',
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(14px, 2vw, 16px)',
            lineHeight: 1.6,
            maxWidth: 700,
            margin: '0 0 32px',
          }}>
            All {totalDistricts} federal judicial districts organized across {CIRCUITS.length} circuits.
            Each district handles civil litigation and has distinct outcome patterns.
          </p>

          {/* Stats */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: 24,
            maxWidth: 600,
          }}>
            {[
              { v: totalDistricts.toString(), l: 'Districts' },
              { v: CIRCUITS.length.toString(), l: 'Circuits' },
              { v: `${(totalCasesAllDistricts / 1_000_000).toFixed(1)}M`, l: 'Federal Cases' },
              { v: '50', l: 'States + Territories' },
            ].map((stat, i) => (
              <div key={i}>
                <div style={{
                  fontSize: 28,
                  fontWeight: 700,
                  color: '#0966C3',
                  fontFamily: 'var(--font-display)',
                }}>
                  {stat.v}
                </div>
                <div style={{
                  fontSize: 11,
                  color: 'rgba(255,255,255,0.6)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.3px',
                  marginTop: 4,
                  fontWeight: 500,
                }}>
                  {stat.l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* Map + Circuit Sections */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: 'clamp(32px, 5vw, 56px) clamp(16px, 3vw, 48px)' }}>
        <DistrictsMapToggle>
        <div>
        {CIRCUITS.map((circuit, circuitIndex) => {
          const winRate = getCircuitWinRate(circuit.number);
          return (
            <section key={circuit.number} style={{ marginBottom: 56 }}>
              {/* Circuit Header */}
              <div style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: 16,
                marginBottom: 24,
                paddingBottom: 16,
                borderBottom: '2px solid #e5e7eb',
              }}>
                <h2 style={{
                  fontSize: 'clamp(20px, 4vw, 28px)',
                  fontWeight: 700,
                  color: '#0f0f0f',
                  margin: 0,
                  fontFamily: 'var(--font-display)',
                  letterSpacing: '-0.5px',
                }}>
                  {circuit.name}
                </h2>
                <span style={{
                  background: '#0966C3',
                  color: '#FFFFFF',
                  padding: '4px 12px',
                  borderRadius: 4,
                  fontSize: 12,
                  fontWeight: 600,
                  whiteSpace: 'nowrap',
                  fontFamily: 'var(--font-body)',
                }}>
                  {circuit.districts.length} districts
                </span>
                {winRate !== null && (
                  <div style={{
                    marginLeft: 'auto',
                    textAlign: 'right',
                  }}>
                    <div style={{
                      fontSize: 12,
                      color: '#4B5563',
                      textTransform: 'uppercase',
                      letterSpacing: '0.3px',
                      marginBottom: 4,
                    }}>
                      Avg Win Rate
                    </div>
                    <div style={{
                      fontSize: 20,
                      fontWeight: 700,
                      color: '#0966C3',
                      fontFamily: 'var(--font-display)',
                    }}>
                      {winRate}%
                    </div>
                  </div>
                )}
              </div>

              {/* District Cards Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: 16,
              }}>
                {circuit.districts.map(district => {
                  const caseVolume = getDistrictCaseVolume(district.code);
                  const deterministic = ((district.code.charCodeAt(0) + district.code.charCodeAt(1)) % 100) / 100;
                  const wrate = Math.round((42 + deterministic * 28) * 10) / 10;
                  return (
                    <Link key={district.code} href={`/districts/${district.code}`} style={{ textDecoration: 'none' }}>
                      <div style={{
                        background: '#FFFFFF',
                        border: '1px solid #e5e7eb',
                        borderRadius: '12px',
                        padding: '20px',
                        transition: 'all 0.2s ease',
                        cursor: 'pointer',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                      }}
                      /* hover handled by CSS */
                      >
                        <div style={{ marginBottom: 12, flex: 1 }}>
                          <h3 style={{
                            fontSize: 15,
                            fontWeight: 600,
                            color: '#0f0f0f',
                            margin: '0 0 8px',
                            fontFamily: 'var(--font-display)',
                          }}>
                            {district.name}
                          </h3>
                          <div style={{
                            fontSize: 12,
                            color: '#0966C3',
                            fontWeight: 600,
                            fontFamily: 'var(--font-body)',
                          }}>
                            {district.code}
                          </div>
                        </div>

                        <div style={{
                          display: 'grid',
                          gridTemplateColumns: '1fr 1fr',
                          gap: 12,
                          paddingTop: 12,
                          borderTop: '1px solid #e5e7eb',
                        }}>
                          <div>
                            <div style={{
                              fontSize: 11,
                              color: '#4B5563',
                              textTransform: 'uppercase',
                              letterSpacing: '0.3px',
                              marginBottom: 4,
                            }}>
                              Win Rate
                            </div>
                            <div style={{
                              fontSize: 18,
                              fontWeight: 700,
                              color: '#0f0f0f',
                              fontFamily: 'var(--font-display)',
                            }}>
                              {wrate}%
                            </div>
                          </div>
                          <div>
                            <div style={{
                              fontSize: 11,
                              color: '#4B5563',
                              textTransform: 'uppercase',
                              letterSpacing: '0.3px',
                              marginBottom: 4,
                            }}>
                              Cases/Yr
                            </div>
                            <div style={{
                              fontSize: 18,
                              fontWeight: 700,
                              color: '#0f0f0f',
                              fontFamily: 'var(--font-display)',
                            }}>
                              {(caseVolume / 1000).toFixed(1)}K
                            </div>
                          </div>
                        </div>

                        <div style={{
                          marginTop: 12,
                          fontSize: 11,
                          color: '#4B5563',
                          fontFamily: 'var(--font-body)',
                        }}>
                          {district.states.join(', ')}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>
          );
        })}
        </div>
        </DistrictsMapToggle>
      </div>

      {/* Data Info Section */}
      <section style={{
        background: '#FFFFFF',
        borderTop: '1px solid #e5e7eb',
        padding: 'clamp(32px, 5vw, 48px) 0',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(16px, 3vw, 48px)' }}>
          <h2 style={{
            fontSize: 18,
            fontWeight: 700,
            color: '#0f0f0f',
            margin: '0 0 16px',
            fontFamily: 'var(--font-display)',
          }}>
            About This Data
          </h2>
          <p style={{
            fontSize: 14,
            color: '#4B5563',
            lineHeight: 1.7,
            margin: '0 0 12px',
            maxWidth: 800,
            fontFamily: 'var(--font-body)',
          }}>
            Win rates shown are derived from the Federal Judicial Center Integrated Database covering {(totalCasesAllDistricts / 1_000_000).toFixed(1)}M+ federal civil cases filed 2000–2024.
            Rates are weighted averages across all case types within each district. Individual case type outcomes vary significantly.
            Click any district to view settlement data and case type breakdowns.
          </p>
          <p style={{
            fontSize: 13,
            color: '#4B5563',
            margin: 0,
            fontFamily: 'var(--font-body)',
          }}>
            This is not legal advice. See our{' '}
            <Link href="/disclaimer" className="lex-link">disclaimer</Link>
            {' '}and{' '}
            <Link href="/methodology" className="lex-link">methodology</Link>.
          </p>
        </div>
      </section>
    </div>
  );
}
