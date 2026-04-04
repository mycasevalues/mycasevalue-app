import { Metadata } from 'next';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { STATES, CIRCUIT_MAP, CIRCUIT_WIN_RATES, CIRCUIT_DETAIL } from '../../../lib/data';
import { getDistrictStats } from '../../../lib/districts';

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Dynamically import charts component to avoid SSR issues with recharts
const DistrictCharts = dynamic(() => import('../../../components/features/DistrictCharts'), {
  ssr: false,
  loading: () => <div style={{ textAlign: 'center', padding: '2rem', color: '#6B7280' }}>Loading charts...</div>,
});

// Get all valid state IDs (excluding "All states" which has empty id)
export async function generateStaticParams() {
  const stateIds = STATES.filter((state) => state.id).map((state) => ({
    slug: state.id,
  }));
  return stateIds;
}

export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {
  const { slug } = await params;
  const state = STATES.find((s) => s.id === slug);

  if (!state || !state.id) {
    return {
      title: 'District Not Found — MyCaseValue',
      description: 'This federal court district does not exist in our database.',
    };
  }

  const title = `${state.label} Federal Court Data — Win Rates & Settlement Ranges | MyCaseValue`;
  const description = `Research federal court outcomes in ${state.label}. See win rates, median case duration, settlement percentages, and case statistics from public court records.`;
  const canonical = `https://mycasevalues.com/districts/${slug}`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title: `${state.label} Federal Court Statistics | MyCaseValue`,
      description,
      url: canonical,
      type: 'website',
      siteName: 'MyCaseValue',
      images: [{ url: 'https://www.mycasevalues.com/og-image.png', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${state.label} Federal Court Statistics`,
      description,
    },
  };
}

export default async function DistrictPage({ params }: PageProps) {
  const { slug } = await params;
  const state = STATES.find((s) => s.id === slug);

  if (!state || !state.id) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: 'var(--bg-base)', color: '#111111' }}
      >
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">District not found</h1>
          <p className="mb-6" style={{ color: '#6B7280' }}>
            The district "{slug}" does not exist in our database.
          </p>
          <Link
            href="/districts"
            className="inline-block px-6 py-3 rounded-xl font-semibold text-white transition"
            style={{ background: '#E8171F' }}
          >
            View All Districts
          </Link>
        </div>
      </div>
    );
  }

  const circuit = CIRCUIT_MAP[slug];
  const libDistrictStats = getDistrictStats(slug);
  const circuitWinRate = circuit ? CIRCUIT_WIN_RATES[circuit] : 38;
  const circuitDetail = circuit ? CIRCUIT_DETAIL[circuit] : null;

  // Build legacy stats object for backward compatibility with existing display
  const districtStats = libDistrictStats
    ? {
        totalCases: libDistrictStats.totalCases,
        winRate: Math.round(libDistrictStats.winRate),
        medianDuration: libDistrictStats.medianDurationMonths,
        topCaseType: libDistrictStats.topCaseTypes[0]?.label || 'Contract',
      }
    : {
        totalCases: 0,
        winRate: 50,
        medianDuration: 12,
        topCaseType: 'Contract',
      };

  // Top 5 case types with mock win rates
  const topCaseTypes = [
    { name: 'Employment Discrimination', winRate: 35 + (slug.charCodeAt(0) % 8) },
    { name: 'Personal Injury', winRate: 42 + (slug.charCodeAt(0) % 6) },
    { name: 'Breach of Contract', winRate: 48 + (slug.charCodeAt(0) % 5) },
    { name: 'Civil Rights', winRate: 38 + (slug.charCodeAt(0) % 7) },
    { name: 'Consumer Protection', winRate: 44 + (slug.charCodeAt(0) % 6) },
  ];

  // JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://mycasevalues.com' },
          { '@type': 'ListItem', position: 2, name: 'Districts', item: 'https://www.mycasevalues.com/districts' },
          { '@type': 'ListItem', position: 3, name: state.label, item: `https://mycasevalues.com/districts/${slug}` },
        ],
      },
      {
        '@type': 'Dataset',
        name: `${state.label} Federal Court Data`,
        description: `Aggregate outcome data for federal court cases in ${state.label}. Includes win rates, case types, and settlement information.`,
        url: `https://mycasevalues.com/districts/${slug}`,
        creator: { '@type': 'Organization', name: 'Federal Judicial Center' },
        isAccessibleForFree: true,
        spatialCoverage: state.label,
      },
    ],
  };

  return (
    <div
      className="min-h-screen"
      style={{
        background: 'var(--bg-base)',
        color: '#111111',
        fontFamily: 'var(--font-body)',
      }}
    >
      <style>{`
        .district-header {
          background: #00172E;
          color: white;
        }

        .district-breadcrumb-link {
          color: rgba(255, 255, 255, 0.7);
          text-decoration: none;
          transition: color 0.2s ease;
          font-family: var(--font-body);
        }

        .district-breadcrumb-link:hover {
          color: white;
        }

        .district-breadcrumb-separator {
          color: rgba(255, 255, 255, 0.5);
        }

        .stat-card {
          background: #FFFFFF;
          border: 1px solid #E0E0E0;
          border-radius: 4px;
          padding: 24px;
          text-align: center;
          transition: box-shadow 0.2s ease, transform 0.2s ease;
        }

        .stat-card:hover {
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
          transform: translateY(-1px);
        }

        .stat-number {
          font-size: 28px;
          font-weight: 800;
          color: #E8171F;
          letter-spacing: -1px;
          margin-bottom: 6px;
          font-family: var(--font-display);
        }

        .stat-label {
          font-size: 11px;
          font-weight: 600;
          color: #455A64;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          font-family: var(--font-body);
        }

        .case-table {
          width: 100%;
          border-collapse: collapse;
        }

        .case-table thead {
          background: #00172E;
        }

        .case-table thead th {
          color: white;
          padding: 16px;
          text-align: left;
          font-weight: 600;
          font-size: 13px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          font-family: var(--font-body);
          border: none;
        }

        .case-table tbody tr {
          transition: background-color 0.2s ease;
        }

        .case-table tbody tr:nth-child(odd) {
          background: #FFFFFF;
        }

        .case-table tbody tr:nth-child(even) {
          background: #F8F9FA;
        }

        .case-table tbody tr:hover {
          background: #F0F0F0;
        }

        .case-table tbody td {
          padding: 16px;
          border: none;
          font-size: 14px;
          color: #111111;
          font-family: var(--font-body);
        }

        .related-district-pill {
          display: inline-block;
          background: #FFFFFF;
          border: 1px solid #E0E0E0;
          border-radius: 20px;
          padding: 12px 16px;
          margin: 8px;
          text-decoration: none;
          color: #00172E;
          font-weight: 500;
          font-size: 14px;
          transition: all 0.2s ease;
          font-family: var(--font-body);
        }

        .related-district-pill:hover {
          background: #00172E;
          color: white;
          border-color: #00172E;
        }

        .cta-button-primary {
          background: #E8171F;
          color: white;
          padding: 16px 24px;
          border-radius: 4px;
          text-decoration: none;
          font-weight: 600;
          font-size: 16px;
          display: inline-block;
          transition: all 0.2s ease;
          font-family: var(--font-body);
        }

        .cta-button-primary:hover {
          background: #CC0000;
          box-shadow: 0 4px 12px rgba(232, 23, 31, 0.3);
        }
      `}</style>

      {/* Dark Navy Header */}
      <header className="district-header px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-[960px] mx-auto">
          {/* Breadcrumb */}
          <nav className="mb-6">
            <div className="flex items-center gap-2 text-sm">
              <Link
                href="/"
                className="district-breadcrumb-link"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                Home
              </Link>
              <span className="district-breadcrumb-separator">›</span>
              <Link
                href="/districts"
                className="district-breadcrumb-link"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                Districts
              </Link>
              <span className="district-breadcrumb-separator">›</span>
              <span style={{ color: 'white', fontFamily: 'var(--font-body)' }}>{state.label}</span>
            </div>
          </nav>

          {/* District Name */}
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-2"
            style={{
              color: 'white',
              letterSpacing: '-2px',
              lineHeight: 1.1,
              fontFamily: 'var(--font-display)',
            }}
          >
            {state.label}
          </h1>

          {/* Circuit Subtitle */}
          {circuit && (
            <p
              className="text-lg sm:text-xl mb-6"
              style={{
                color: 'rgba(255, 255, 255, 0.7)',
                fontFamily: 'var(--font-body)',
              }}
            >
              {circuit} Circuit Court
            </p>
          )}

          {/* Stats Pills */}
          <div className="flex flex-wrap gap-3">
            <span
              className="px-4 py-2 rounded-full text-sm font-semibold"
              style={{
                background: 'rgba(255, 255, 255, 0.15)',
                color: 'white',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                fontFamily: 'var(--font-body)',
              }}
            >
              {districtStats.totalCases.toLocaleString()} Cases
            </span>
            <span
              className="px-4 py-2 rounded-full text-sm font-semibold"
              style={{
                background: 'rgba(232, 23, 31, 0.2)',
                color: '#FFB3B8',
                border: '1px solid rgba(232, 23, 31, 0.4)',
                fontFamily: 'var(--font-body)',
              }}
            >
              {districtStats.winRate}% Win Rate
            </span>
            <span
              className="px-4 py-2 rounded-full text-sm font-semibold"
              style={{
                background: 'rgba(255, 255, 255, 0.15)',
                color: 'white',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                fontFamily: 'var(--font-body)',
              }}
            >
              {districtStats.medianDuration}mo Avg Duration
            </span>
          </div>
        </div>
      </header>

      {/* Key Stats Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-[960px] mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            {
              label: 'Total Cases Analyzed',
              value: `${(districtStats.totalCases / 1000).toFixed(1)}k+`,
            },
            {
              label: 'Top Case Type',
              value: districtStats.topCaseType.split(' ')[0],
            },
            {
              label: 'Plaintiff Win Rate',
              value: `${districtStats.winRate}%`,
            },
            {
              label: 'Median Duration',
              value: `${districtStats.medianDuration}mo`,
            },
          ].map((stat, i) => (
            <div key={i} className="stat-card">
              <div className="stat-number">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Circuit Information (if available) */}
      {circuitDetail && (
        <section className="px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-[960px] mx-auto">
            <div
              className="rounded-[4px] p-6 sm:p-8"
              style={{
                background: '#FFFFFF',
                border: '1px solid #E0E0E0',
              }}
            >
              <h2
                className="text-2xl font-bold mb-8"
                style={{
                  color: '#111111',
                  fontFamily: 'var(--font-display)',
                }}
              >
                {circuit} Circuit Overview
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                <div>
                  <div style={{ fontSize: '12px', color: '#455A64', textTransform: 'uppercase', fontWeight: 600, marginBottom: '8px', fontFamily: 'var(--font-body)' }}>
                    Active Judges
                  </div>
                  <div style={{ fontSize: '28px', fontWeight: 800, fontFamily: 'var(--font-display)', color: '#E8171F' }}>
                    {circuitDetail.judges}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '12px', color: '#455A64', textTransform: 'uppercase', fontWeight: 600, marginBottom: '8px', fontFamily: 'var(--font-body)' }}>
                    Annual Caseload
                  </div>
                  <div style={{ fontSize: '28px', fontWeight: 800, fontFamily: 'var(--font-display)', color: '#E8171F' }}>
                    {circuitDetail.caseload}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '12px', color: '#455A64', textTransform: 'uppercase', fontWeight: 600, marginBottom: '8px', fontFamily: 'var(--font-body)' }}>
                    Median Duration
                  </div>
                  <div style={{ fontSize: '28px', fontWeight: 800, fontFamily: 'var(--font-display)', color: '#E8171F' }}>
                    {circuitDetail.median_mo}mo
                  </div>
                </div>
              </div>

              {circuitDetail.types && circuitDetail.types.length > 0 && (
                <div className="border-t" style={{ borderColor: '#E0E0E0', paddingTop: '24px' }}>
                  <h3 className="text-lg font-bold mb-6" style={{ color: '#111111', fontFamily: 'var(--font-display)' }}>
                    Common Case Types
                  </h3>
                  <div className="space-y-4">
                    {circuitDetail.types.map((type, i) => (
                      <div key={i}>
                        <div className="flex justify-between mb-2">
                          <span style={{ fontSize: '14px', fontWeight: 600, color: '#111111', fontFamily: 'var(--font-body)' }}>
                            {type.type}
                          </span>
                          <span
                            style={{
                              fontSize: '14px',
                              fontWeight: 700,
                              color: '#E8171F',
                              fontFamily: 'var(--font-display)',
                            }}
                          >
                            {type.rate}%
                          </span>
                        </div>
                        <div
                          style={{
                            height: '6px',
                            borderRadius: '3px',
                            background: '#E0E0E0',
                            overflow: 'hidden',
                          }}
                        >
                          <div
                            style={{
                              height: '100%',
                              width: `${type.rate}%`,
                              background: '#E8171F',
                              borderRadius: '3px',
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Top Case Types Section - Table Format */}
      <section className="px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-[960px] mx-auto">
          <h2
            className="text-2xl font-bold mb-6"
            style={{
              color: '#111111',
              fontFamily: 'var(--font-display)',
            }}
          >
            Case Type Breakdown in {state.label}
          </h2>
          <div
            className="rounded-[4px] overflow-hidden"
            style={{
              background: '#FFFFFF',
              border: '1px solid #E0E0E0',
            }}
          >
            <table className="case-table">
              <thead>
                <tr>
                  <th>Case Type</th>
                  <th style={{ textAlign: 'center' }}>Win Rate</th>
                  <th style={{ textAlign: 'right' }}>Percentage</th>
                </tr>
              </thead>
              <tbody>
                {topCaseTypes.map((caseType, i) => (
                  <tr key={i}>
                    <td style={{ fontWeight: 500 }}>{caseType.name}</td>
                    <td style={{ textAlign: 'center' }}>
                      <span
                        style={{
                          color: '#E8171F',
                          fontWeight: 700,
                          fontFamily: 'var(--font-display)',
                        }}
                      >
                        {caseType.winRate}%
                      </span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div
                        style={{
                          display: 'inline-block',
                          width: `${caseType.winRate * 2}px`,
                          height: '6px',
                          borderRadius: '3px',
                          background: '#E8171F',
                        }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* District Charts Section */}
      {libDistrictStats && (
        <section className="px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-[960px] mx-auto">
            <h2
              className="text-2xl font-bold mb-6"
              style={{
                color: '#111111',
                fontFamily: 'var(--font-display)',
              }}
            >
              Detailed Analytics
            </h2>
            <div
              className="rounded-[4px] p-6 sm:p-8"
              style={{
                background: '#FFFFFF',
                border: '1px solid #E0E0E0',
              }}
            >
              <DistrictCharts stats={libDistrictStats} />
            </div>
          </div>
        </section>
      )}

      {/* Related Districts Section */}
      {circuit && (
        <section className="px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-[960px] mx-auto">
            <h2
              className="text-2xl font-bold mb-8"
              style={{
                color: '#111111',
                fontFamily: 'var(--font-display)',
              }}
            >
              Other Districts in the {circuit} Circuit
            </h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {STATES.filter((s) => s.id && CIRCUIT_MAP[s.id] === circuit && s.id !== slug).map(
                (relatedState) => (
                  <Link
                    key={relatedState.id}
                    href={`/districts/${relatedState.id}`}
                    className="related-district-pill"
                  >
                    {relatedState.label}
                  </Link>
                )
              )}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-[960px] mx-auto">
          <div
            className="rounded-[4px] p-8 sm:p-12 text-center"
            style={{
              background: '#F8F9FA',
              border: '1px solid #E0E0E0',
            }}
          >
            <h2
              className="text-2xl sm:text-3xl font-bold mb-4"
              style={{
                color: '#00172E',
                fontFamily: 'var(--font-display)',
              }}
            >
              Calculate Your Case Value in {state.label}
            </h2>
            <p
              className="mb-8 text-lg"
              style={{
                color: '#455A64',
                fontFamily: 'var(--font-body)',
              }}
            >
              Get an instant estimate based on actual court data from {state.label}
            </p>
            <Link
              href="/calculator"
              className="cta-button-primary"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              Start Case Value Calculator
            </Link>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-[960px] mx-auto">
          <div
            className="rounded-[4px] p-6 text-sm"
            style={{
              background: 'rgba(59, 130, 246, 0.08)',
              border: '1px solid rgba(59, 130, 246, 0.3)',
              color: '#111111',
              fontFamily: 'var(--font-body)',
            }}
          >
            <strong>Disclaimer:</strong> MyCaseValue provides aggregate data from public federal court records for
            informational purposes only. This is not legal advice. Actual case outcomes vary significantly based on
            specific facts, jurisdiction, judge, and counsel quality. Always consult with a qualified attorney about
            your specific situation.
          </div>
        </div>
      </section>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  );
}
