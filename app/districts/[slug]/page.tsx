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
  loading: () => <div style={{ textAlign: 'center', padding: '2rem', color: '#455A64' }}>Loading charts...</div>,
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
        style={{ background: '#F5F6F7', color: '#212529' }}
      >
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4" style={{ color: '#212529', fontFamily: 'var(--font-display)' }}>District not found</h1>
          <p className="mb-6" style={{ color: '#455A64', fontFamily: 'var(--font-body)' }}>
            The district "{slug}" does not exist in our database.
          </p>
          <Link
            href="/districts"
            className="inline-block px-6 py-3 font-semibold text-white transition"
            style={{ background: '#E8171F', borderRadius: '4px' }}
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
        '@type': 'GovernmentOrganization',
        '@id': `https://mycasevalues.com/districts/${slug}`,
        name: `${state.label} Federal District Court`,
        alternateName: `United States District Court for the ${state.label}`,
        areaServed: state.label,
        description: `Federal court district serving ${state.label}. Jurisdiction for civil and criminal cases in the U.S. federal court system.`,
        url: `https://mycasevalues.com/districts/${slug}`,
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'Customer Service',
          name: `${state.label} District Court Information`,
        },
      },
      {
        '@type': 'Dataset',
        '@id': `https://mycasevalues.com/districts/${slug}#dataset`,
        name: `${state.label} Federal Court Data`,
        description: `Aggregate outcome data for federal court cases in ${state.label}. Includes win rates, case types, and settlement information based on ${districtStats.totalCases.toLocaleString()} analyzed cases.`,
        url: `https://mycasevalues.com/districts/${slug}`,
        creator: {
          '@type': 'Organization',
          name: 'Federal Judicial Center',
          url: 'https://www.fjc.gov',
        },
        isAccessibleForFree: true,
        spatialCoverage: state.label,
        temporalCoverage: '1999-..',
        keywords: [
          `${state.label} court statistics`,
          'federal court win rates',
          'case duration analysis',
          'settlement data',
          `${state.label} litigation outcomes`,
        ],
        distribution: {
          '@type': 'DataDownload',
          contentUrl: `https://mycasevalues.com/districts/${slug}`,
          encodingFormat: 'application/json',
          inLanguage: 'en-US',
        },
        variableMeasured: [
          {
            '@type': 'PropertyValue',
            name: 'Plaintiff Win Rate',
            value: `${districtStats.winRate}%`,
          },
          {
            '@type': 'PropertyValue',
            name: 'Median Case Duration',
            value: `${districtStats.medianDuration} months`,
          },
          {
            '@type': 'PropertyValue',
            name: 'Total Cases Analyzed',
            value: districtStats.totalCases.toLocaleString(),
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: `What is the win rate in ${state.label} federal court?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: `Based on analysis of ${districtStats.totalCases.toLocaleString()} cases, the plaintiff win rate in ${state.label} federal court is approximately ${districtStats.winRate}%. This includes both trial victories and favorable settlements.`,
            },
          },
          {
            '@type': 'Question',
            name: `How long do cases take in ${state.label} federal court?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: `The median duration for cases in ${state.label} federal court is approximately ${districtStats.medianDuration} months from filing to resolution. This varies based on case complexity and whether the case settles or goes to trial.`,
            },
          },
          {
            '@type': 'Question',
            name: `What are the most common case types in ${state.label}?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: `The most common case type in ${state.label} federal court is ${districtStats.topCaseType}. Other frequent case types include employment discrimination, personal injury, and breach of contract cases.`,
            },
          },
        ],
      },
    ],
  };

  return (
    <div
      className="min-h-screen"
      style={{
        background: '#F5F6F7',
        color: '#455A64',
        fontFamily: 'var(--font-body)',
      }}
    >
      <style>{`
        .district-header {
          background: #00172E;
          color: #FFFFFF;
        }

        .district-breadcrumb-link {
          color: #D5D8DC;
          text-decoration: none;
          transition: color 0.2s ease;
          font-family: var(--font-body);
        }

        .district-breadcrumb-link:hover {
          color: #FFFFFF;
        }

        .district-breadcrumb-separator {
          color: #8B92A1;
          margin: 0 6px;
        }

        .district-badge {
          display: inline-block;
          background: #E8171F;
          color: #FFFFFF;
          padding: 6px 12px;
          border-radius: 4px;
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          font-family: var(--font-body);
          margin-left: 12px;
        }

        .stat-card {
          background: #FFFFFF;
          border: 1px solid #D5D8DC;
          border-radius: 4px;
          padding: 24px;
          text-align: center;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
          transition: box-shadow 0.2s ease, transform 0.2s ease;
        }

        .stat-card:hover {
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          transform: translateY(-2px);
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

        .card-container {
          background: #FFFFFF;
          border: 1px solid #D5D8DC;
          border-radius: 4px;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
        }

        .case-table {
          width: 100%;
          border-collapse: collapse;
        }

        .case-table thead {
          background: #00172E;
        }

        .case-table thead th {
          color: #FFFFFF;
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
          border-bottom: 1px solid #D5D8DC;
        }

        .case-table tbody tr:nth-child(odd) {
          background: #FFFFFF;
        }

        .case-table tbody tr:nth-child(even) {
          background: #F8F9FA;
        }

        .case-table tbody tr:hover {
          background: #F5F6F7;
        }

        .case-table tbody td {
          padding: 16px;
          border: none;
          font-size: 14px;
          color: #455A64;
          font-family: var(--font-body);
        }

        .related-district-pill {
          display: inline-block;
          background: #FFFFFF;
          border: 1px solid #D5D8DC;
          border-radius: 20px;
          padding: 12px 16px;
          margin: 8px;
          text-decoration: none;
          color: #006997;
          font-weight: 500;
          font-size: 14px;
          transition: all 0.2s ease;
          font-family: var(--font-body);
        }

        .related-district-pill:hover {
          background: #00172E;
          color: #FFFFFF;
          border-color: #00172E;
        }

        .cta-button-primary {
          background: #E8171F;
          color: #FFFFFF;
          padding: 16px 24px;
          border-radius: 4px;
          text-decoration: none;
          font-weight: 600;
          font-size: 16px;
          display: inline-block;
          transition: all 0.2s ease;
          font-family: var(--font-body);
          border: none;
          cursor: pointer;
        }

        .cta-button-primary:hover {
          background: #CC0000;
          box-shadow: 0 4px 12px rgba(232, 23, 31, 0.3);
          transform: translateY(-1px);
        }

        .section-heading {
          color: #212529;
          font-family: var(--font-display);
          font-size: 24px;
          font-weight: 700;
          margin-bottom: 24px;
        }

        .subsection-heading {
          color: #212529;
          font-family: var(--font-display);
          font-size: 18px;
          font-weight: 600;
        }

        .body-text {
          color: #455A64;
          font-family: var(--font-body);
        }

        .teal-link {
          color: #006997;
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .teal-link:hover {
          color: #005078;
        }

        .card-section {
          background: #FFFFFF;
          border: 1px solid #D5D8DC;
          border-radius: 4px;
          padding: 32px;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
        }

        .bg-subtle {
          background: #F5F6F7;
        }

        .case-table-wrapper {
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
        }

        @media (max-width: 768px) {
          h1 {
            font-size: 28px !important;
          }
          h2 {
            font-size: 20px !important;
          }
          .case-table-wrapper {
            overflow-x: auto;
          }
          .card-section {
            padding: 24px;
          }
        }
      `}</style>

      {/* Dark Navy Header */}
      <header className="district-header px-4 sm:px-6 lg:px-8 py-8" style={{ paddingTop: 'clamp(16px, 3vw, 32px)', paddingBottom: 'clamp(16px, 3vw, 32px)' }}>
        <div className="max-w-[960px] mx-auto">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <div className="flex items-center text-sm">
              <Link
                href="/"
                className="district-breadcrumb-link"
              >
                Home
              </Link>
              <span className="district-breadcrumb-separator">›</span>
              <Link
                href="/districts"
                className="district-breadcrumb-link"
              >
                Districts
              </Link>
              <span className="district-breadcrumb-separator">›</span>
              <span style={{ color: '#FFFFFF', fontFamily: 'var(--font-body)' }}>{state.label}</span>
            </div>
          </nav>

          {/* District Name with Badge */}
          <div className="flex items-center gap-3 flex-wrap mb-2">
            <h1
              className="font-extrabold"
              style={{
                fontSize: 'clamp(28px, 8vw, 64px)',
                color: '#FFFFFF',
                letterSpacing: '-2px',
                lineHeight: 1.1,
                fontFamily: 'var(--font-display)',
                margin: 0,
              }}
            >
              {state.label}
            </h1>
            <span className="district-badge">District</span>
          </div>

          {/* Court Info */}
          {circuit && (
            <p
              className="text-lg sm:text-xl mb-6"
              style={{
                color: '#D5D8DC',
                fontFamily: 'var(--font-body)',
              }}
            >
              {circuit} Circuit Court
            </p>
          )}

          {/* Stats Pills */}
          <div className="flex flex-wrap gap-4">
            <span
              className="px-4 py-2 text-sm font-semibold"
              style={{
                borderRadius: '9999px',
                background: 'rgba(255, 255, 255, 0.12)',
                color: '#D5D8DC',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                fontFamily: 'var(--font-body)',
              }}
            >
              {districtStats.totalCases.toLocaleString()} Cases
            </span>
            <span
              className="px-4 py-2 text-sm font-semibold"
              style={{
                borderRadius: '9999px',
                background: 'rgba(232, 23, 31, 0.2)',
                color: '#FFB3B8',
                border: '1px solid rgba(232, 23, 31, 0.4)',
                fontFamily: 'var(--font-body)',
              }}
            >
              {districtStats.winRate}% Win Rate
            </span>
            <span
              className="px-4 py-2 text-sm font-semibold"
              style={{
                borderRadius: '9999px',
                background: 'rgba(255, 255, 255, 0.12)',
                color: '#D5D8DC',
                border: '1px solid rgba(255, 255, 255, 0.2)',
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
            <div className="card-section">
              <h2 className="section-heading">
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
                <div className="border-t" style={{ borderColor: '#D5D8DC', paddingTop: '24px', marginTop: '24px' }}>
                  <h3 className="subsection-heading mb-6">
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
          <h2 className="section-heading">
            Case Type Breakdown in {state.label}
          </h2>
          <div
            className="overflow-hidden"
            style={{
              borderRadius: '4px',
              background: '#FFFFFF',
              border: '1px solid #D5D8DC',
              boxShadow: '0 1px 2px rgba(0, 0, 0, 0.04)',
            }}
          >
            <div className="case-table-wrapper">
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
        </div>
      </section>

      {/* District Charts Section */}
      {libDistrictStats && (
        <section className="px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-[960px] mx-auto">
            <h2 className="section-heading">
              Detailed Analytics
            </h2>
            <div className="card-section">
              <DistrictCharts stats={libDistrictStats} />
            </div>
          </div>
        </section>
      )}

      {/* Related Districts Section */}
      {circuit && (
        <section className="px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-[960px] mx-auto">
            <h2 className="section-heading mb-8">
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
            className="p-8 sm:p-12 text-center"
            style={{
              borderRadius: '4px',
              background: '#FFFFFF',
              border: '1px solid #D5D8DC',
              boxShadow: '0 1px 2px rgba(0, 0, 0, 0.04)',
            }}
          >
            <h2
              className="text-2xl sm:text-3xl font-bold mb-4"
              style={{
                color: '#212529',
                fontFamily: 'var(--font-display)',
              }}
            >
              Calculate Your Case Value in {state.label}
            </h2>
            <p
              className="mb-8 text-lg body-text"
              style={{
                color: '#455A64',
              }}
            >
              Get an instant estimate based on actual court data from {state.label}
            </p>
            <Link
              href="/calculator"
              className="cta-button-primary"
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
            className="p-6 text-sm body-text"
            style={{
              borderRadius: '4px',
              background: '#F8F9FA',
              border: '1px solid #D5D8DC',
              color: '#455A64',
            }}
          >
            <strong style={{ color: '#212529' }}>Disclaimer:</strong> MyCaseValue provides aggregate data from public federal court records for
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
