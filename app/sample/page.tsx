import { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Sample Case Analysis Report — Employment Discrimination (NOS 442)',
  description:
    'Explore a complete sample case analysis report for federal employment discrimination cases. View win rates, settlement distributions, recovery ranges, and key outcome factors.',
  openGraph: {
    title: 'Sample Case Analysis Report — Employment Discrimination (NOS 442)',
    description:
      'Complete sample analytics for federal employment discrimination cases with outcome distributions and recovery analysis.',
    url: `${SITE_URL}/sample`,
    type: 'website',
    siteName: 'MyCaseValue',
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sample Case Analysis Report — Employment Discrimination (NOS 442)',
    description:
      'Complete sample analytics for federal employment discrimination cases with outcome distributions and recovery analysis.',
  },
  alternates: {
    canonical: `${SITE_URL}/sample`,
  },
};

export default function SampleReportPage() {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Dataset',
            name: 'Employment Discrimination Cases — S.D.N.Y.',
            description:
              'Sample dataset of 2,847 federal employment discrimination cases in the Southern District of New York with outcomes, settlements, and judge analytics.',
            url: `${SITE_URL}/sample`,
            distribution: {
              '@type': 'DataDownload',
              encodingFormat: 'JSON',
              contentUrl: `${SITE_URL}/api/sample`,
            },
            author: {
              '@type': 'Organization',
              name: 'MyCaseValue',
              url: SITE_URL,
            },
            datePublished: '2026-04-02',
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CreativeWork',
            name: 'Employment Discrimination Sample Report',
            description:
              'Illustrative legal analytics for federal employment discrimination cases.',
            author: {
              '@type': 'Organization',
              name: 'MyCaseValue',
            },
            datePublished: '2026-04-02',
            isPartOf: {
              '@type': 'WebSite',
              name: 'MyCaseValue',
              url: SITE_URL,
            },
          }),
        }}
      />

      <div
        style={{
          backgroundColor: 'var(--color-surface-1)',
          color: 'var(--color-text-primary)',
          minHeight: '100vh',
        }}
      >
        {/* Navy Header */}
        <div
          style={{
            backgroundColor: 'var(--accent-primary)',
            borderBottom: '1px solid var(--accent-primary)',
            padding: '20px 24px',
            position: 'sticky',
            top: 0,
            zIndex: 50,
          }}
        >
          <div
            style={{
              maxWidth: '960px',
              margin: '0 auto',
            }}
          >
            <h1
              style={{
                fontSize: '32px',
                fontWeight: 600,
                fontFamily: 'var(--font-ui)',
                margin: '0 0 8px 0',
                color: 'var(--color-text-inverse)',
              }}
            >
              Explore a Complete Federal Case Analysis
            </h1>
            <p
              style={{
                fontSize: '14px',
                color: 'rgba(255, 255, 255, 0.8)',
                margin: 0,
              }}
            >
              See how MyCaseValue analyzes federal employment discrimination cases with real win rates, settlement distributions, recovery ranges, and key outcome insights.
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div
          style={{
            maxWidth: '960px',
            margin: '0 auto',
            padding: '24px 24px',
          }}
        >
          {/* Breadcrumb */}
          <nav
            style={{
              display: 'flex',
              gap: '8px',
              marginBottom: '16px',
              fontSize: '14px',
              color: 'var(--color-text-secondary)',
            }}
          >
            <Link
              href="/"
              style={{
                color: 'var(--color-text-secondary)',
                textDecoration: 'none',
              }}
              className="sample-breadcrumb-link"
            >
              Home
            </Link>
            <span>{'>'}</span>
            <Link
              href="/search"
              style={{
                color: 'var(--color-text-secondary)',
                textDecoration: 'none',
              }}
              className="sample-breadcrumb-link"
            >
              Search
            </Link>
            <span>{'>'}</span>
            <span style={{ color: 'var(--color-text-primary)' }}>Sample Report</span>
          </nav>

          {/* Metadata Section */}
          <section style={{ marginBottom: '24px' }}>
            <div
              style={{
                backgroundColor: 'var(--color-surface-0)',
                border: '1px solid var(--border-default)',
                borderRadius: '4px',
                padding: '16px',
              }}
            >
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                  gap: '20px',
                }}
              >
                <div>
                  <p
                    style={{
                      fontSize: '12px',
                      fontWeight: 600,
                      color: 'var(--color-text-secondary)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      margin: '0 0 6px 0',
                    }}
                  >
                    Case Type
                  </p>
                  <p
                    style={{
                      fontSize: '14px',
                      color: 'var(--color-text-primary)',
                      margin: 0,
                      fontWeight: 500,
                    }}
                  >
                    Employment Discrimination
                  </p>
                </div>
                <div>
                  <p
                    style={{
                      fontSize: '12px',
                      fontWeight: 600,
                      color: 'var(--color-text-secondary)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      margin: '0 0 6px 0',
                    }}
                  >
                    NOS Code
                  </p>
                  <p
                    style={{
                      fontSize: '14px',
                      color: 'var(--color-text-primary)',
                      margin: 0,
                      fontWeight: 500,
                      fontFamily: 'var(--font-mono)',
                    }}
                  >
                    442
                  </p>
                </div>
                <div>
                  <p
                    style={{
                      fontSize: '12px',
                      fontWeight: 600,
                      color: 'var(--color-text-secondary)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      margin: '0 0 6px 0',
                    }}
                  >
                    Sample Size
                  </p>
                  <p
                    style={{
                      fontSize: '14px',
                      color: 'var(--color-text-primary)',
                      margin: 0,
                      fontWeight: 500,
                      fontFamily: 'var(--font-mono)',
                    }}
                  >
                    2,847 cases
                  </p>
                </div>
                <div>
                  <p
                    style={{
                      fontSize: '12px',
                      fontWeight: 600,
                      color: 'var(--color-text-secondary)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      margin: '0 0 6px 0',
                    }}
                  >
                    Report Date
                  </p>
                  <p
                    style={{
                      fontSize: '14px',
                      color: 'var(--color-text-primary)',
                      margin: 0,
                      fontWeight: 500,
                      fontFamily: 'var(--font-mono)',
                    }}
                  >
                    April 2026
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section A: Win Rate Analysis */}
          <section style={{ paddingTop: '24px' }}>
            <h2
              style={{
                fontSize: '24px',
                fontWeight: 600,
                fontFamily: 'var(--font-ui)',
                marginBottom: '16px',
                color: 'var(--color-text-primary)',
              }}
            >
              Win Rate Analysis
            </h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '20px',
                marginBottom: '16px',
              }}
            >
              <div
                style={{
                  backgroundColor: 'var(--color-surface-0)',
                  border: '1px solid var(--border-default)',
                  borderRadius: '4px',
                  padding: '16px',
                }}
              >
                <p
                  style={{
                    fontSize: '13px',
                    fontWeight: 600,
                    color: 'var(--color-text-secondary)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    margin: '0 0 12px 0',
                  }}
                >
                  Plaintiff Win Rate
                </p>
                <div
                  style={{
                    fontSize: '36px',
                    fontWeight: 600,
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--outcome-win)',
                    margin: '0 0 8px 0',
                  }}
                >
                  34%
                </div>
                <p
                  style={{
                    fontSize: '13px',
                    color: 'var(--color-text-secondary)',
                    margin: 0,
                    fontFamily: 'var(--font-mono)',
                  }}
                >
                  CI: 31–37%
                </p>
              </div>

              <div
                style={{
                  backgroundColor: 'var(--color-surface-0)',
                  border: '1px solid var(--border-default)',
                  borderRadius: '4px',
                  padding: '16px',
                }}
              >
                <p
                  style={{
                    fontSize: '13px',
                    fontWeight: 600,
                    color: 'var(--color-text-secondary)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    margin: '0 0 12px 0',
                  }}
                >
                  Defendant Win Rate
                </p>
                <div
                  style={{
                    fontSize: '36px',
                    fontWeight: 600,
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--outcome-loss)',
                    margin: '0 0 8px 0',
                  }}
                >
                  47.8%
                </div>
                <p
                  style={{
                    fontSize: '13px',
                    color: 'var(--color-text-secondary)',
                    margin: 0,
                  }}
                >
                  &nbsp;
                </p>
              </div>

              <div
                style={{
                  backgroundColor: 'var(--color-surface-0)',
                  border: '1px solid var(--border-default)',
                  borderRadius: '4px',
                  padding: '16px',
                }}
              >
                <p
                  style={{
                    fontSize: '13px',
                    fontWeight: 600,
                    color: 'var(--color-text-secondary)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    margin: '0 0 12px 0',
                  }}
                >
                  Dismissed
                </p>
                <div
                  style={{
                    fontSize: '36px',
                    fontWeight: 600,
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--color-text-secondary)',
                    margin: '0 0 8px 0',
                  }}
                >
                  14%
                </div>
                <p
                  style={{
                    fontSize: '13px',
                    color: 'var(--color-text-secondary)',
                    margin: 0,
                  }}
                >
                  &nbsp;
                </p>
              </div>
            </div>
            <p
              style={{
                fontSize: '13px',
                color: 'var(--color-text-secondary)',
                margin: '0 0 24px 0',
                fontFamily: 'var(--font-mono)',
              }}
            >
              Based on 2,847 cases
            </p>
            <a
              href="/cases"
              style={{
                fontSize: '13px',
                color: 'var(--accent-primary-hover)',
                textDecoration: 'none',
              }}
              className="sample-section-link"
            >
              Upgrade to see real data for your case →
            </a>
          </section>

          {/* Section B: Settlement Range */}
          <section style={{ paddingTop: '24px' }}>
            <h2
              style={{
                fontSize: '24px',
                fontWeight: 600,
                fontFamily: 'var(--font-ui)',
                marginBottom: '16px',
                color: 'var(--color-text-primary)',
              }}
            >
              Settlement Range
            </h2>
            <div
              style={{
                backgroundColor: 'var(--color-surface-0)',
                border: '1px solid var(--border-default)',
                borderRadius: '4px',
                padding: '32px 24px',
                marginBottom: '16px',
              }}
            >
              {/* Percentile Bar */}
              <div style={{ marginBottom: '32px' }}>
                <div
                  style={{
                    height: '8px',
                    backgroundColor: 'var(--border-default)',
                    borderRadius: '4px',
                    overflow: 'hidden',
                    marginBottom: '16px',
                    position: 'relative',
                  }}
                >
                  {/* Visual gradient bar */}
                  <div
                    style={{
                      height: '100%',
                      background:
                        'linear-gradient(90deg, var(--accent-primary-hover) 0%, var(--accent-primary) 100%)',
                    }}
                  />
                </div>

                {/* Labels below bar */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '12px',
                    color: 'var(--color-text-secondary)',
                  }}
                >
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
                      $8.5K
                    </div>
                    <div>P10</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
                      $22K
                    </div>
                    <div>P25</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
                      $58K
                    </div>
                    <div>P50</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
                      $145K
                    </div>
                    <div>P75</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
                      $310K
                    </div>
                    <div>P90</div>
                  </div>
                </div>
              </div>

              <p
                style={{
                  fontSize: '13px',
                  color: 'var(--color-text-secondary)',
                  margin: 0,
                  lineHeight: 1.5,
                }}
              >
                Settlement amounts are documented in cases where monetary awards appear in
                public records.
              </p>
            </div>
            <a
              href="/cases"
              style={{
                fontSize: '13px',
                color: 'var(--accent-primary-hover)',
                textDecoration: 'none',
              }}
              className="sample-section-link"
            >
              Upgrade to see real data for your case →
            </a>
          </section>

          {/* Section C: Case Timeline */}
          <section style={{ paddingTop: '24px' }}>
            <h2
              style={{
                fontSize: '24px',
                fontWeight: 600,
                fontFamily: 'var(--font-ui)',
                marginBottom: '16px',
                color: 'var(--color-text-primary)',
              }}
            >
              Case Timeline
            </h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '20px',
                marginBottom: '24px',
              }}
            >
              <div
                style={{
                  backgroundColor: 'var(--color-surface-0)',
                  border: '1px solid var(--border-default)',
                  borderRadius: '4px',
                  padding: '16px',
                }}
              >
                <p
                  style={{
                    fontSize: '13px',
                    fontWeight: 600,
                    color: 'var(--color-text-secondary)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    margin: '0 0 12px 0',
                  }}
                >
                  Median to Resolution
                </p>
                <div
                  style={{
                    fontSize: '36px',
                    fontWeight: 600,
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--color-text-primary)',
                    margin: '0 0 4px 0',
                  }}
                >
                  14.3
                </div>
                <p
                  style={{
                    fontSize: '13px',
                    color: 'var(--color-text-secondary)',
                    margin: 0,
                  }}
                >
                  months
                </p>
              </div>

              <div
                style={{
                  backgroundColor: 'var(--color-surface-0)',
                  border: '1px solid var(--border-default)',
                  borderRadius: '4px',
                  padding: '16px',
                }}
              >
                <p
                  style={{
                    fontSize: '13px',
                    fontWeight: 600,
                    color: 'var(--color-text-secondary)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    margin: '0 0 12px 0',
                  }}
                >
                  Settled Cases
                </p>
                <div
                  style={{
                    fontSize: '36px',
                    fontWeight: 600,
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--color-text-primary)',
                    margin: '0 0 4px 0',
                  }}
                >
                  ~11
                </div>
                <p
                  style={{
                    fontSize: '13px',
                    color: 'var(--color-text-secondary)',
                    margin: 0,
                  }}
                >
                  months median
                </p>
              </div>

              <div
                style={{
                  backgroundColor: 'var(--color-surface-0)',
                  border: '1px solid var(--border-default)',
                  borderRadius: '4px',
                  padding: '16px',
                }}
              >
                <p
                  style={{
                    fontSize: '13px',
                    fontWeight: 600,
                    color: 'var(--color-text-secondary)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    margin: '0 0 12px 0',
                  }}
                >
                  Trial Cases
                </p>
                <div
                  style={{
                    fontSize: '36px',
                    fontWeight: 600,
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--color-text-primary)',
                    margin: '0 0 4px 0',
                  }}
                >
                  ~28
                </div>
                <p
                  style={{
                    fontSize: '13px',
                    color: 'var(--color-text-secondary)',
                    margin: 0,
                  }}
                >
                  months median
                </p>
              </div>
            </div>
            <a
              href="/cases"
              style={{
                fontSize: '13px',
                color: 'var(--accent-primary-hover)',
                textDecoration: 'none',
              }}
              className="sample-section-link"
            >
              Upgrade to see real data for your case →
            </a>
          </section>

          {/* Section D: Judge Analytics */}
          <section style={{ paddingTop: '24px' }}>
            <h2
              style={{
                fontSize: '24px',
                fontWeight: 600,
                fontFamily: 'var(--font-ui)',
                marginBottom: '16px',
                color: 'var(--color-text-primary)',
              }}
            >
              Judge Analytics — Top 5 S.D.N.Y. Judges
            </h2>
            <div
              style={{
                backgroundColor: 'var(--color-surface-0)',
                border: '1px solid var(--border-default)',
                borderRadius: '4px',
                overflow: 'hidden',
                marginBottom: '24px',
              }}
            >
              <table
                style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  fontSize: '14px',
                }}
              >
                <thead>
                  <tr
                    style={{
                      backgroundColor: 'var(--color-surface-1)',
                      borderBottom: '1px solid var(--border-default)',
                    }}
                  >
                    <th
                      style={{
                        padding: '16px 24px',
                        textAlign: 'left',
                        fontWeight: 600,
                        color: 'var(--color-text-secondary)',
                        fontSize: '12px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                      }}
                    >
                      Judge
                    </th>
                    <th
                      style={{
                        padding: '16px 24px',
                        textAlign: 'center',
                        fontWeight: 600,
                        color: 'var(--color-text-secondary)',
                        fontSize: '12px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                      }}
                    >
                      Appointed
                    </th>
                    <th
                      style={{
                        padding: '16px 24px',
                        textAlign: 'center',
                        fontWeight: 600,
                        color: 'var(--color-text-secondary)',
                        fontSize: '12px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                      }}
                    >
                      Plaintiff Win Rate
                    </th>
                    <th
                      style={{
                        padding: '16px 24px',
                        textAlign: 'center',
                        fontWeight: 600,
                        color: 'var(--color-text-secondary)',
                        fontSize: '12px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                      }}
                    >
                      Motion Grant Rate
                    </th>
                    <th
                      style={{
                        padding: '16px 24px',
                        textAlign: 'center',
                        fontWeight: 600,
                        color: 'var(--color-text-secondary)',
                        fontSize: '12px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                      }}
                    >
                      Median Duration
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      name: 'Jed S. Rakoff',
                      appointed: '1996',
                      pwRate: '38%',
                      mgrRate: '42%',
                      duration: '12.1 mo',
                    },
                    {
                      name: 'Colleen McMahon',
                      appointed: '1998',
                      pwRate: '31%',
                      mgrRate: '38%',
                      duration: '15.8 mo',
                    },
                    {
                      name: 'Jesse M. Furman',
                      appointed: '2012',
                      pwRate: '36%',
                      mgrRate: '45%',
                      duration: '13.4 mo',
                    },
                    {
                      name: 'Paul G. Gardephe',
                      appointed: '2008',
                      pwRate: '33%',
                      mgrRate: '40%',
                      duration: '14.7 mo',
                    },
                    {
                      name: 'Vernon S. Broderick',
                      appointed: '2013',
                      pwRate: '35%',
                      mgrRate: '44%',
                      duration: '13.9 mo',
                    },
                  ].map((judge, idx) => (
                    <tr
                      key={idx}
                      style={{
                        borderBottom:
                          idx < 4 ? '1px solid var(--border-default)' : 'none',
                      }}
                    >
                      <td
                        style={{
                          padding: '16px 24px',
                          fontWeight: 500,
                          color: 'var(--color-text-primary)',
                        }}
                      >
                        {judge.name}
                      </td>
                      <td
                        style={{
                          padding: '16px 24px',
                          textAlign: 'center',
                          fontFamily: 'var(--font-mono)',
                          color: 'var(--color-text-secondary)',
                        }}
                      >
                        {judge.appointed}
                      </td>
                      <td
                        style={{
                          padding: '16px 24px',
                          textAlign: 'center',
                          fontFamily: 'var(--font-mono)',
                          fontWeight: 600,
                          color: 'var(--outcome-win)',
                        }}
                      >
                        {judge.pwRate}
                      </td>
                      <td
                        style={{
                          padding: '16px 24px',
                          textAlign: 'center',
                          fontFamily: 'var(--font-mono)',
                          color: 'var(--color-text-secondary)',
                        }}
                      >
                        {judge.mgrRate}
                      </td>
                      <td
                        style={{
                          padding: '16px 24px',
                          textAlign: 'center',
                          fontFamily: 'var(--font-mono)',
                          color: 'var(--color-text-secondary)',
                        }}
                      >
                        {judge.duration}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <a
              href="/cases"
              style={{
                fontSize: '13px',
                color: 'var(--accent-primary-hover)',
                textDecoration: 'none',
              }}
              className="sample-section-link"
            >
              Upgrade to see real data for your case →
            </a>
          </section>

          {/* Section E: Attorney Impact */}
          <section style={{ paddingTop: '24px' }}>
            <h2
              style={{
                fontSize: '24px',
                fontWeight: 600,
                fontFamily: 'var(--font-ui)',
                marginBottom: '16px',
                color: 'var(--color-text-primary)',
              }}
            >
              Attorney Impact
            </h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '20px',
                marginBottom: '24px',
              }}
            >
              <div
                style={{
                  backgroundColor: 'var(--color-surface-0)',
                  border: '1px solid var(--border-default)',
                  borderRadius: '4px',
                  padding: '16px',
                }}
              >
                <p
                  style={{
                    fontSize: '13px',
                    fontWeight: 600,
                    color: 'var(--color-text-secondary)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    margin: '0 0 12px 0',
                  }}
                >
                  Represented Plaintiff
                </p>
                <div
                  style={{
                    fontSize: '36px',
                    fontWeight: 600,
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--outcome-win)',
                    margin: '0 0 4px 0',
                  }}
                >
                  38%
                </div>
                <p
                  style={{
                    fontSize: '13px',
                    color: 'var(--color-text-secondary)',
                    margin: 0,
                  }}
                >
                  win rate
                </p>
              </div>

              <div
                style={{
                  backgroundColor: 'var(--color-surface-0)',
                  border: '1px solid var(--border-default)',
                  borderRadius: '4px',
                  padding: '16px',
                }}
              >
                <p
                  style={{
                    fontSize: '13px',
                    fontWeight: 600,
                    color: 'var(--color-text-secondary)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    margin: '0 0 12px 0',
                  }}
                >
                  Pro Se
                </p>
                <div
                  style={{
                    fontSize: '36px',
                    fontWeight: 600,
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--outcome-loss)',
                    margin: '0 0 4px 0',
                  }}
                >
                  11%
                </div>
                <p
                  style={{
                    fontSize: '13px',
                    color: 'var(--color-text-secondary)',
                    margin: 0,
                  }}
                >
                  win rate
                </p>
              </div>

              <div
                style={{
                  backgroundColor: 'var(--color-surface-0)',
                  border: '1px solid var(--border-default)',
                  borderRadius: '4px',
                  padding: '16px',
                }}
              >
                <p
                  style={{
                    fontSize: '13px',
                    fontWeight: 600,
                    color: 'var(--color-text-secondary)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    margin: '0 0 12px 0',
                  }}
                >
                  Attorney Impact
                </p>
                <div
                  style={{
                    fontSize: '36px',
                    fontWeight: 600,
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--accent-primary)',
                    margin: '0 0 4px 0',
                  }}
                >
                  +27pp
                </div>
                <p
                  style={{
                    fontSize: '13px',
                    color: 'var(--color-text-secondary)',
                    margin: 0,
                  }}
                >
                  advantage
                </p>
              </div>
            </div>
            <a
              href="/cases"
              style={{
                fontSize: '13px',
                color: 'var(--accent-primary-hover)',
                textDecoration: 'none',
              }}
              className="sample-section-link"
            >
              Upgrade to see real data for your case →
            </a>
          </section>

          {/* Section F: District Comparison */}
          <section style={{ paddingTop: '24px' }}>
            <h2
              style={{
                fontSize: '24px',
                fontWeight: 600,
                fontFamily: 'var(--font-ui)',
                marginBottom: '16px',
                color: 'var(--color-text-primary)',
              }}
            >
              District Comparison
            </h2>
            <div
              style={{
                backgroundColor: 'var(--color-surface-0)',
                border: '1px solid var(--border-default)',
                borderRadius: '4px',
                overflow: 'hidden',
                marginBottom: '24px',
              }}
            >
              <table
                style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  fontSize: '14px',
                }}
              >
                <thead>
                  <tr
                    style={{
                      backgroundColor: 'var(--color-surface-1)',
                      borderBottom: '1px solid var(--border-default)',
                    }}
                  >
                    <th
                      style={{
                        padding: '16px 24px',
                        textAlign: 'left',
                        fontWeight: 600,
                        color: 'var(--color-text-secondary)',
                        fontSize: '12px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                      }}
                    >
                      District
                    </th>
                    <th
                      style={{
                        padding: '16px 24px',
                        textAlign: 'center',
                        fontWeight: 600,
                        color: 'var(--color-text-secondary)',
                        fontSize: '12px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                      }}
                    >
                      Win Rate
                    </th>
                    <th
                      style={{
                        padding: '16px 24px',
                        textAlign: 'center',
                        fontWeight: 600,
                        color: 'var(--color-text-secondary)',
                        fontSize: '12px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                      }}
                    >
                      Median Settlement
                    </th>
                    <th
                      style={{
                        padding: '16px 24px',
                        textAlign: 'center',
                        fontWeight: 600,
                        color: 'var(--color-text-secondary)',
                        fontSize: '12px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                      }}
                    >
                      Median Duration
                    </th>
                    <th
                      style={{
                        padding: '16px 24px',
                        textAlign: 'center',
                        fontWeight: 600,
                        color: 'var(--color-text-secondary)',
                        fontSize: '12px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                      }}
                    >
                      Sample Size
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      district: 'S.D.N.Y.',
                      winRate: '34%',
                      settlement: '$58K',
                      duration: '14.3 mo',
                      sampleSize: '2,847',
                    },
                    {
                      district: 'National Average',
                      winRate: '31%',
                      settlement: '$52K',
                      duration: '16.2 mo',
                      sampleSize: '84,293',
                    },
                    {
                      district: 'E.D.N.Y.',
                      winRate: '29%',
                      settlement: '$48K',
                      duration: '15.7 mo',
                      sampleSize: '1,924',
                    },
                    {
                      district: 'D.N.J.',
                      winRate: '32%',
                      settlement: '$55K',
                      duration: '15.1 mo',
                      sampleSize: '2,156',
                    },
                  ].map((row, idx) => (
                    <tr
                      key={idx}
                      style={{
                        borderBottom:
                          idx < 3 ? '1px solid var(--border-default)' : 'none',
                        backgroundColor: idx === 0 ? 'rgba(232,23,31,0.04)' : 'transparent',
                      }}
                    >
                      <td
                        style={{
                          padding: '16px 24px',
                          fontWeight: 500,
                          color: 'var(--color-text-primary)',
                        }}
                      >
                        {row.district}
                      </td>
                      <td
                        style={{
                          padding: '16px 24px',
                          textAlign: 'center',
                          fontFamily: 'var(--font-mono)',
                          fontWeight: 600,
                          color: 'var(--outcome-win)',
                        }}
                      >
                        {row.winRate}
                      </td>
                      <td
                        style={{
                          padding: '16px 24px',
                          textAlign: 'center',
                          fontFamily: 'var(--font-mono)',
                          color: 'var(--color-text-secondary)',
                        }}
                      >
                        {row.settlement}
                      </td>
                      <td
                        style={{
                          padding: '16px 24px',
                          textAlign: 'center',
                          fontFamily: 'var(--font-mono)',
                          color: 'var(--color-text-secondary)',
                        }}
                      >
                        {row.duration}
                      </td>
                      <td
                        style={{
                          padding: '16px 24px',
                          textAlign: 'center',
                          fontFamily: 'var(--font-mono)',
                          color: 'var(--color-text-secondary)',
                        }}
                      >
                        {row.sampleSize}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <a
              href="/cases"
              style={{
                fontSize: '13px',
                color: 'var(--accent-primary-hover)',
                textDecoration: 'none',
              }}
              className="sample-section-link"
            >
              Upgrade to see real data for your case →
            </a>
          </section>

          {/* Final CTA */}
          <section style={{ paddingTop: '64px', paddingBottom: '48px' }}>
            <div style={{ textAlign: 'center' }}>
              <a
                href="/cases?category=work"
                style={{
                  display: 'inline-block',
                  backgroundColor: 'var(--accent-primary)',
                  color: 'var(--color-text-inverse)',
                  padding: '16px 32px',
                  borderRadius: '4px',
                  fontSize: '16px',
                  fontWeight: 600,
                  textDecoration: 'none',
                  transition: 'opacity 0.2s',
                }}
                className="sample-cta-btn"
              >
                Get my real Employment Discrimination report
              </a>
            </div>
          </section>


        </div>
      </div>
      {/* Hover styles (CSS-only, no event handlers needed in Server Component) */}
      <style dangerouslySetInnerHTML={{ __html: `
        .sample-banner-cta:hover { background-color: var(--color-surface-1) !important; }
        .sample-breadcrumb-link:hover { color: var(--accent-primary-hover) !important; }
        .sample-section-link:hover { text-decoration: underline !important; }
        .sample-cta-btn:hover { opacity: 0.9; }
      `}} />
    </>
  );
}
