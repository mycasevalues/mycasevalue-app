import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Employment Discrimination Sample Report — S.D.N.Y. | MyCaseValue',
  description:
    'Explore sample analytics for employment discrimination cases in the Southern District of New York. Win rates, settlement ranges, judge analytics, and more.',
  openGraph: {
    title: 'Employment Discrimination Sample Report — S.D.N.Y. | MyCaseValue',
    description:
      'Explore sample analytics for employment discrimination cases in the Southern District of New York.',
    url: 'https://www.mycasevalues.com/sample',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.mycasevalues.com/sample',
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
            url: 'https://www.mycasevalues.com/sample',
            distribution: {
              '@type': 'DataDownload',
              encodingFormat: 'JSON',
              contentUrl: 'https://www.mycasevalues.com/api/sample',
            },
            author: {
              '@type': 'Organization',
              name: 'MyCaseValue',
              url: 'https://www.mycasevalues.com',
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
              url: 'https://www.mycasevalues.com',
            },
          }),
        }}
      />

      <div
        style={{
          backgroundColor: '#F5F6F7',
          color: '#212529',
          minHeight: '100vh',
        }}
      >
        {/* Persistent Banner */}
        <div
          style={{
            backgroundColor: '#00172E',
            borderBottom: '1px solid #00172E',
            padding: '16px 24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            position: 'sticky',
            top: 0,
            zIndex: 50,
          }}
        >
          <span
            style={{
              fontSize: '14px',
              fontWeight: 600,
              color: '#FFFFFF',
            }}
          >
            Sample report — illustrative data only
          </span>
          <a
            href="/cases"
            style={{
              fontSize: '14px',
              fontWeight: 600,
              color: '#FFFFFF',
              backgroundColor: '#E8171F',
              padding: '8px 16px',
              borderRadius: '4px',
              textDecoration: 'none',
              transition: 'background-color 0.2s',
            }}
            className="sample-banner-cta"
          >
            Get your real report →
          </a>
        </div>

        {/* Main Content */}
        <main
          style={{
            maxWidth: '960px',
            margin: '0 auto',
            padding: '48px 24px',
          }}
        >
          {/* Breadcrumb */}
          <nav
            style={{
              display: 'flex',
              gap: '8px',
              marginBottom: '32px',
              fontSize: '14px',
              color: '#455A64',
            }}
          >
            <a
              href="/"
              style={{
                color: '#455A64',
                textDecoration: 'none',
              }}
              className="sample-breadcrumb-link"
            >
              Home
            </a>
            <span>→</span>
            <span style={{ color: '#212529' }}>Sample Report</span>
          </nav>

          {/* Page Header */}
          <header style={{ marginBottom: '56px' }}>
            <h1
              style={{
                fontSize: '40px',
                fontWeight: 700,
                fontFamily: 'var(--font-display)',
                margin: '0 0 12px 0',
                lineHeight: 1.2,
              }}
            >
              Employment Discrimination — S.D.N.Y.
            </h1>
            <p
              style={{
                fontSize: '18px',
                color: '#455A64',
                margin: 0,
                fontFamily: 'var(--font-body)',
              }}
            >
              Sample report based on 2,847 federal cases
            </p>
          </header>

          {/* Section A: Win Rate Analysis */}
          <section style={{ paddingTop: '48px' }}>
            <h2
              style={{
                fontSize: '24px',
                fontWeight: 700,
                fontFamily: 'var(--font-display)',
                marginBottom: '32px',
                color: '#212529',
              }}
            >
              Win Rate Analysis
            </h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '20px',
                marginBottom: '32px',
              }}
            >
              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #D5D8DC',
                  borderRadius: '4px',
                  padding: '24px',
                }}
              >
                <p
                  style={{
                    fontSize: '13px',
                    fontWeight: 600,
                    color: '#455A64',
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
                    fontWeight: 700,
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
                    color: '#455A64',
                    margin: 0,
                    fontFamily: 'var(--font-mono)',
                  }}
                >
                  CI: 31–37%
                </p>
              </div>

              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #D5D8DC',
                  borderRadius: '4px',
                  padding: '24px',
                }}
              >
                <p
                  style={{
                    fontSize: '13px',
                    fontWeight: 600,
                    color: '#455A64',
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
                    fontWeight: 700,
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--outcome-loss)',
                    margin: '0 0 8px 0',
                  }}
                >
                  52%
                </div>
                <p
                  style={{
                    fontSize: '13px',
                    color: '#455A64',
                    margin: 0,
                  }}
                >
                  &nbsp;
                </p>
              </div>

              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #D5D8DC',
                  borderRadius: '4px',
                  padding: '24px',
                }}
              >
                <p
                  style={{
                    fontSize: '13px',
                    fontWeight: 600,
                    color: '#455A64',
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
                    fontWeight: 700,
                    fontFamily: 'var(--font-mono)',
                    color: '#455A64',
                    margin: '0 0 8px 0',
                  }}
                >
                  14%
                </div>
                <p
                  style={{
                    fontSize: '13px',
                    color: '#455A64',
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
                color: '#455A64',
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
                color: '#006997',
                textDecoration: 'none',
              }}
              className="sample-section-link"
            >
              Upgrade to see real data for your case →
            </a>
          </section>

          {/* Section B: Settlement Range */}
          <section style={{ paddingTop: '48px' }}>
            <h2
              style={{
                fontSize: '24px',
                fontWeight: 700,
                fontFamily: 'var(--font-display)',
                marginBottom: '32px',
                color: '#212529',
              }}
            >
              Settlement Range
            </h2>
            <div
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #D5D8DC',
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
                    backgroundColor: '#e5e7eb',
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
                        'linear-gradient(90deg, #006997 0%, #E8171F 100%)',
                    }}
                  />
                </div>

                {/* Labels below bar */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '12px',
                    color: '#455A64',
                  }}
                >
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                      $8.5K
                    </div>
                    <div>P10</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                      $22K
                    </div>
                    <div>P25</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                      $58K
                    </div>
                    <div>P50</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                      $145K
                    </div>
                    <div>P75</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                      $310K
                    </div>
                    <div>P90</div>
                  </div>
                </div>
              </div>

              <p
                style={{
                  fontSize: '13px',
                  color: '#455A64',
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
                color: '#006997',
                textDecoration: 'none',
              }}
              className="sample-section-link"
            >
              Upgrade to see real data for your case →
            </a>
          </section>

          {/* Section C: Case Timeline */}
          <section style={{ paddingTop: '48px' }}>
            <h2
              style={{
                fontSize: '24px',
                fontWeight: 700,
                fontFamily: 'var(--font-display)',
                marginBottom: '32px',
                color: '#212529',
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
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #D5D8DC',
                  borderRadius: '4px',
                  padding: '24px',
                }}
              >
                <p
                  style={{
                    fontSize: '13px',
                    fontWeight: 600,
                    color: '#455A64',
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
                    fontWeight: 700,
                    fontFamily: 'var(--font-mono)',
                    color: '#212529',
                    margin: '0 0 4px 0',
                  }}
                >
                  14.3
                </div>
                <p
                  style={{
                    fontSize: '13px',
                    color: '#455A64',
                    margin: 0,
                  }}
                >
                  months
                </p>
              </div>

              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #D5D8DC',
                  borderRadius: '4px',
                  padding: '24px',
                }}
              >
                <p
                  style={{
                    fontSize: '13px',
                    fontWeight: 600,
                    color: '#455A64',
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
                    fontWeight: 700,
                    fontFamily: 'var(--font-mono)',
                    color: '#212529',
                    margin: '0 0 4px 0',
                  }}
                >
                  ~11
                </div>
                <p
                  style={{
                    fontSize: '13px',
                    color: '#455A64',
                    margin: 0,
                  }}
                >
                  months median
                </p>
              </div>

              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #D5D8DC',
                  borderRadius: '4px',
                  padding: '24px',
                }}
              >
                <p
                  style={{
                    fontSize: '13px',
                    fontWeight: 600,
                    color: '#455A64',
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
                    fontWeight: 700,
                    fontFamily: 'var(--font-mono)',
                    color: '#212529',
                    margin: '0 0 4px 0',
                  }}
                >
                  ~28
                </div>
                <p
                  style={{
                    fontSize: '13px',
                    color: '#455A64',
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
                color: '#006997',
                textDecoration: 'none',
              }}
              className="sample-section-link"
            >
              Upgrade to see real data for your case →
            </a>
          </section>

          {/* Section D: Judge Analytics */}
          <section style={{ paddingTop: '48px' }}>
            <h2
              style={{
                fontSize: '24px',
                fontWeight: 700,
                fontFamily: 'var(--font-display)',
                marginBottom: '32px',
                color: '#212529',
              }}
            >
              Judge Analytics — Top 5 S.D.N.Y. Judges
            </h2>
            <div
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #D5D8DC',
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
                      backgroundColor: '#F5F6F7',
                      borderBottom: '1px solid #D5D8DC',
                    }}
                  >
                    <th
                      style={{
                        padding: '16px 24px',
                        textAlign: 'left',
                        fontWeight: 600,
                        color: '#455A64',
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
                        color: '#455A64',
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
                        color: '#455A64',
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
                        color: '#455A64',
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
                        color: '#455A64',
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
                          idx < 4 ? '1px solid #D5D8DC' : 'none',
                      }}
                    >
                      <td
                        style={{
                          padding: '16px 24px',
                          fontWeight: 500,
                          color: '#212529',
                        }}
                      >
                        {judge.name}
                      </td>
                      <td
                        style={{
                          padding: '16px 24px',
                          textAlign: 'center',
                          fontFamily: 'var(--font-mono)',
                          color: '#455A64',
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
                          color: '#455A64',
                        }}
                      >
                        {judge.mgrRate}
                      </td>
                      <td
                        style={{
                          padding: '16px 24px',
                          textAlign: 'center',
                          fontFamily: 'var(--font-mono)',
                          color: '#455A64',
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
                color: '#006997',
                textDecoration: 'none',
              }}
              className="sample-section-link"
            >
              Upgrade to see real data for your case →
            </a>
          </section>

          {/* Section E: Attorney Impact */}
          <section style={{ paddingTop: '48px' }}>
            <h2
              style={{
                fontSize: '24px',
                fontWeight: 700,
                fontFamily: 'var(--font-display)',
                marginBottom: '32px',
                color: '#212529',
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
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #D5D8DC',
                  borderRadius: '4px',
                  padding: '24px',
                }}
              >
                <p
                  style={{
                    fontSize: '13px',
                    fontWeight: 600,
                    color: '#455A64',
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
                    fontWeight: 700,
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
                    color: '#455A64',
                    margin: 0,
                  }}
                >
                  win rate
                </p>
              </div>

              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #D5D8DC',
                  borderRadius: '4px',
                  padding: '24px',
                }}
              >
                <p
                  style={{
                    fontSize: '13px',
                    fontWeight: 600,
                    color: '#455A64',
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
                    fontWeight: 700,
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
                    color: '#455A64',
                    margin: 0,
                  }}
                >
                  win rate
                </p>
              </div>

              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #D5D8DC',
                  borderRadius: '4px',
                  padding: '24px',
                }}
              >
                <p
                  style={{
                    fontSize: '13px',
                    fontWeight: 600,
                    color: '#455A64',
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
                    fontWeight: 700,
                    fontFamily: 'var(--font-mono)',
                    color: '#E8171F',
                    margin: '0 0 4px 0',
                  }}
                >
                  +27pp
                </div>
                <p
                  style={{
                    fontSize: '13px',
                    color: '#455A64',
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
                color: '#006997',
                textDecoration: 'none',
              }}
              className="sample-section-link"
            >
              Upgrade to see real data for your case →
            </a>
          </section>

          {/* Section F: District Comparison */}
          <section style={{ paddingTop: '48px' }}>
            <h2
              style={{
                fontSize: '24px',
                fontWeight: 700,
                fontFamily: 'var(--font-display)',
                marginBottom: '32px',
                color: '#212529',
              }}
            >
              District Comparison
            </h2>
            <div
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #D5D8DC',
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
                      backgroundColor: '#F5F6F7',
                      borderBottom: '1px solid #D5D8DC',
                    }}
                  >
                    <th
                      style={{
                        padding: '16px 24px',
                        textAlign: 'left',
                        fontWeight: 600,
                        color: '#455A64',
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
                        color: '#455A64',
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
                        color: '#455A64',
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
                        color: '#455A64',
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
                        color: '#455A64',
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
                          idx < 3 ? '1px solid #D5D8DC' : 'none',
                        backgroundColor: idx === 0 ? 'rgba(232,23,31,0.04)' : 'transparent',
                      }}
                    >
                      <td
                        style={{
                          padding: '16px 24px',
                          fontWeight: 500,
                          color: '#212529',
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
                          color: '#455A64',
                        }}
                      >
                        {row.settlement}
                      </td>
                      <td
                        style={{
                          padding: '16px 24px',
                          textAlign: 'center',
                          fontFamily: 'var(--font-mono)',
                          color: '#455A64',
                        }}
                      >
                        {row.duration}
                      </td>
                      <td
                        style={{
                          padding: '16px 24px',
                          textAlign: 'center',
                          fontFamily: 'var(--font-mono)',
                          color: '#455A64',
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
                color: '#006997',
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
                  backgroundColor: '#E8171F',
                  color: '#fff',
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


        </main>
      </div>
      {/* Hover styles (CSS-only, no event handlers needed in Server Component) */}
      <style dangerouslySetInnerHTML={{ __html: `
        .sample-banner-cta:hover { background-color: #f3f4f6 !important; }
        .sample-breadcrumb-link:hover { color: #006997 !important; }
        .sample-section-link:hover { text-decoration: underline !important; }
        .sample-cta-btn:hover { opacity: 0.9; }
      `}} />
    </>
  );
}
