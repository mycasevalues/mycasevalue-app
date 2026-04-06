import { Metadata } from 'next';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { getJudgeBySlug, getAllJudges, getJudgesByDistrict } from '@/lib/judges';
import { ArrowRightIcon } from '@/components/ui/Icons';
import { SITE_URL } from '@/lib/site-config';

// Dynamic import for client component
const JudgeCharts = dynamic(() => import('@/components/features/JudgeCharts'), {
  ssr: false,
  loading: () => <div style={{ padding: '24px', textAlign: 'center', color: '#4B5563' }}>Loading charts...</div>,
});

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllJudges().map((judge) => ({ slug: judge.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const judge = getJudgeBySlug(slug);

  if (!judge) {
    return {
      title: 'Judge Profile — MyCaseValue',
      description: 'Access federal judge profiles with case outcome analytics and ruling patterns from federal court records.',
    };
  }

  const title = `Judge ${judge.name} — ${judge.district}`;
  const description = `Research Judge ${judge.name}'s ruling patterns, motion grant rates, and case outcomes. Appointed ${judge.appointedYear}. ${judge.stats.totalCases}+ cases analyzed from federal court records.`;
  const canonical = `${SITE_URL}/judges/${slug}`;

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
      images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default async function JudgePage({ params }: PageProps) {
  const { slug } = await params;
  const judge = getJudgeBySlug(slug);

  // If judge not found, show judge profile browser page
  if (!judge) {
    return (
      <div style={{ background: '#F7F8FA', minHeight: '100vh' }}>
        <style>{`
          .judge-coming-soon-link {
            color: #212529;
            transition: color 0.2s ease;
          }
          .judge-coming-soon-link:hover {
            color: #6D28D9;
          }
          .judge-coming-soon-btn {
            transition: background-color 0.2s ease;
          }
          .judge-coming-soon-btn:hover {
            background-color: #d00f1a;
          }
        `}</style>
        {/* Header */}
        <div
          style={{
            borderBottom: '1px solid #E5E7EB',
            background: '#FFFFFF',
          }}
        >
          <div style={{ maxWidth: '960px', margin: '0 auto', padding: '0 24px' }}>
            <div style={{ paddingTop: '24px', paddingBottom: '24px' }}>
              <Link
                href="/judges"
                className="judge-coming-soon-link"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '14px',
                  fontWeight: '600',
                  textDecoration: 'none',
                }}
              >
                <ArrowRightIcon size={16} />
                Back to Judges
              </Link>
            </div>
          </div>
        </div>

        {/* Judge Profile Browser Content */}
        <div
          style={{
            maxWidth: '960px',
            margin: '0 auto',
            padding: '96px 24px',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '64px',
              height: '64px',
              borderRadius: '6px',
              background: '#FCE5E6',
              margin: '0 auto 32px',
            }}
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#7C3AED"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </div>

          <h1
            style={{
              fontSize: '32px',
              fontWeight: '900',
              marginBottom: '16px',
              color: '#212529',
              fontFamily: 'var(--font-display)',
            }}
          >
            Judge Profile
          </h1>

          <p
            style={{
              fontSize: '16px',
              lineHeight: '1.6',
              maxWidth: '560px',
              margin: '0 auto 32px',
              color: '#4B5563',
              fontFamily: 'var(--font-body)',
            }}
          >
            This judge's detailed analytics profile is being compiled. We're processing public court records to build comprehensive profiles for all federal judges.
          </p>

          <Link
            href="/judges"
            className="judge-coming-soon-btn"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 28px',
              borderRadius: '6px',
              background: '#7C3AED',
              color: '#FFFFFF',
              fontSize: '16px',
              fontWeight: '600',
              textDecoration: 'none',
            }}
          >
            Browse all judges
            <ArrowRightIcon size={16} />
          </Link>

          <p
            style={{
              fontSize: '14px',
              color: '#4B5563',
              marginTop: '48px',
              fontFamily: 'var(--font-body)',
            }}
          >
            Access profiles for federal judges with comprehensive case outcome analytics and ruling patterns.
          </p>
        </div>
      </div>
    );
  }

  // Full judge profile page

  // JSON-LD structured data for known judges
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://www.mycasevalues.com',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Judges',
            item: 'https://www.mycasevalues.com/judges',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: `Judge ${judge.name}`,
            item: `https://www.mycasevalues.com/judges/${slug}`,
          },
        ],
      },
      {
        '@type': 'Person',
        '@id': `https://www.mycasevalues.com/judges/${slug}`,
        name: judge.name,
        jobTitle: 'Federal Judge',
        workLocation: {
          '@type': 'Place',
          name: judge.court,
        },
        worksFor: {
          '@type': 'GovernmentOrganization',
          name: `United States District Court, ${judge.district}`,
          url: `https://www.mycasevalues.com/districts/${judge.district.toLowerCase().replace(/\s+/g, '-')}`,
        },
        affiliation: {
          '@type': 'Organization',
          name: `United States District Court, ${judge.district}`,
        },
        description: `Federal Judge ${judge.name} serves in the ${judge.district}. Appointed in ${judge.appointedYear}. ${judge.seniorStatus ? 'Senior Judge.' : ''} Based on analysis of ${judge.stats.totalCases}+ federal court cases.`,
        honorificPrefix: 'Judge',
        birthDate: undefined, // Not typically published for privacy
        knowsAbout: judge.topCaseTypes.map(ct => ct.label),
        sameAs: [],
      },
      {
        '@type': 'CreativeWork',
        name: `${judge.name} - Judge Profile & Analytics`,
        author: {
          '@type': 'Organization',
          name: 'MyCaseValue',
        },
        datePublished: new Date().toISOString().split('T')[0],
        description: `Comprehensive profile and ruling analytics for Federal Judge ${judge.name}. Includes plaintiff win rates, motion grant rates, median case duration, settlement rates, and case type analysis from ${judge.stats.totalCases}+ federal court records.`,
        text: `Judge ${judge.name} Profile. Plaintiff Win Rate: ${judge.stats.plaintiffWinRate}%. Motion Grant Rate: ${judge.stats.motionGrantRate}%. Median Case Duration: ${judge.stats.medianDurationMonths} months. Settlement Rate: ${judge.stats.settlementRate}%. Total Cases Analyzed: ${judge.stats.totalCases.toLocaleString()}.`,
      },
    ],
  };

  return (
    <div style={{ background: '#F7F8FA', minHeight: '100vh' }}>
      <style>{`
        .judge-breadcrumb-link {
          color: #4B5563;
          text-decoration: none;
          transition: color 0.2s ease;
        }
        .judge-breadcrumb-link:hover {
          color: #6D28D9;
        }

        @media (max-width: 768px) {
          h1 {
            font-size: 28px !important;
          }
          h2 {
            font-size: 18px !important;
          }
          .judge-stats-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      {/* Dark Navy Header */}
      <div
        style={{
          background: '#1B3A5C',
          color: '#FFFFFF',
          padding: 'clamp(16px, 3vw, 24px)',
          marginBottom: 'clamp(24px, 5vw, 48px)',
        }}
      >
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          {/* Breadcrumb */}
          <nav
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '14px',
              marginBottom: '24px',
              fontFamily: 'var(--font-body)',
              flexWrap: 'wrap',
            }}
          >
            <Link
              href="/"
              className="judge-breadcrumb-link"
              style={{}}
            >
              Home
            </Link>
            <span style={{ color: '#4B5563' }}>›</span>
            <Link
              href="/judges"
              className="judge-breadcrumb-link"
              style={{}}
            >
              Judges
            </Link>
            <span style={{ color: '#4B5563' }}>›</span>
            <span style={{ color: '#FFFFFF', fontWeight: '600' }}>
              {judge.name}
            </span>
          </nav>

          {/* Judge Title Section */}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '24px', flexWrap: 'wrap' }}>
            <div>
              <h1
                style={{
                  fontSize: 'clamp(28px, 6vw, 40px)',
                  fontWeight: '900',
                  marginBottom: '8px',
                  color: '#FFFFFF',
                  letterSpacing: '-0.5px',
                  fontFamily: 'var(--font-display)',
                  margin: 0,
                }}
              >
                {judge.name}
              </h1>
              <p
                style={{
                  fontSize: '16px',
                  color: '#E5E7EB',
                  marginBottom: 0,
                  marginTop: '8px',
                  fontFamily: 'var(--font-body)',
                }}
              >
                {judge.court}
                {judge.seniorStatus && ' • Senior Judge'}
              </p>
            </div>
            <div
              style={{
                display: 'inline-block',
                padding: '8px 16px',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: '700',
                letterSpacing: '0.5px',
                background: '#7C3AED',
                color: '#FFFFFF',
                whiteSpace: 'nowrap',
                marginTop: '4px',
              }}
            >
              JUDGE PROFILE
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: '960px', margin: '0 auto', padding: 'clamp(24px, 5vw, 48px) 24px' }}>

        {/* Stats Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '16px',
            marginBottom: '48px',
          }}
          className="judge-stats-grid"
        >
          {[
            {
              label: 'Plaintiff Win Rate',
              value: `${judge.stats.plaintiffWinRate}%`,
              color: judge.stats.plaintiffWinRate >= 50 ? '#15803D' : '#7C3AED',
            },
            {
              label: 'Motion Grant Rate',
              value: `${judge.stats.motionGrantRate}%`,
              color: '#6D28D9',
            },
            {
              label: 'Median Duration',
              value: `${judge.stats.medianDurationMonths} mo`,
              color: '#1B3A5C',
            },
            {
              label: 'Settlement Rate',
              value: `${judge.stats.settlementRate}%`,
              color: '#10B981',
            },
            {
              label: 'Cases Analyzed',
              value: judge.stats.totalCases.toLocaleString(),
              color: '#212529',
            },
          ].map((stat, idx) => (
            <div
              key={idx}
              style={{
                padding: '20px',
                borderRadius: '6px',
                border: '1px solid #E5E7EB',
                background: '#FFFFFF',
              }}
            >
              <div
                style={{
                  fontSize: '12px',
                  fontWeight: '700',
                  letterSpacing: '0.5px',
                  color: '#4B5563',
                  marginBottom: '8px',
                  textTransform: 'uppercase',
                  fontFamily: 'var(--font-body)',
                }}
              >
                {stat.label}
              </div>
              <div
                style={{
                  fontSize: '28px',
                  fontWeight: '900',
                  color: stat.color,
                  fontFamily: 'var(--font-mono)',
                  letterSpacing: '-0.5px',
                }}
              >
                {stat.value}
              </div>
            </div>
          ))}
        </div>

        {/* Appointment Info */}
        <div
          style={{
            padding: '24px',
            borderRadius: '6px',
            border: '1px solid #E5E7EB',
            background: '#FFFFFF',
            marginBottom: '48px',
          }}
        >
          <h3
            style={{
              fontSize: '14px',
              fontWeight: '700',
              letterSpacing: '0.5px',
              color: '#4B5563',
              marginBottom: '12px',
              textTransform: 'uppercase',
              fontFamily: 'var(--font-display)',
            }}
          >
            Appointment
          </h3>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '24px',
            }}
          >
            <div>
              <div
                style={{
                  fontSize: '12px',
                  fontWeight: '700',
                  color: '#4B5563',
                  marginBottom: '4px',
                  fontFamily: 'var(--font-body)',
                }}
              >
                Appointed
              </div>
              <div
                style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: '#212529',
                  fontFamily: "monospace, 'Courier New'",
                }}
              >
                {judge.appointedYear}
              </div>
            </div>
            <div>
              <div
                style={{
                  fontSize: '12px',
                  fontWeight: '700',
                  color: '#4B5563',
                  marginBottom: '4px',
                  fontFamily: 'var(--font-body)',
                }}
              >
                Appointing President
              </div>
              <div
                style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: '#212529',
                  fontFamily: 'var(--font-body)',
                }}
              >
                {judge.appointedBy}
              </div>
            </div>
            {judge.chiefJudge && (
              <div>
                <div
                  style={{
                    fontSize: '12px',
                    fontWeight: '700',
                    color: '#4B5563',
                    marginBottom: '4px',
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  Chief Judge
                </div>
                <div
                  style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#7C3AED',
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  Yes
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Outcome Breakdown */}
        <div
          style={{
            padding: '24px',
            borderRadius: '6px',
            border: '1px solid #E5E7EB',
            background: '#FFFFFF',
            marginBottom: '48px',
          }}
        >
          <h3
            style={{
              fontSize: '16px',
              fontWeight: '700',
              color: '#212529',
              marginBottom: '20px',
              fontFamily: 'var(--font-display)',
            }}
          >
            Outcome Breakdown
          </h3>
          {(() => {
            const winRate = judge.stats.plaintiffWinRate;
            const settlementRate = judge.stats.settlementRate;
            const dismissalRate = 100 - winRate - settlementRate;

            return (
              <div>
                <div
                  style={{
                    display: 'flex',
                    height: '32px',
                    borderRadius: '6px',
                    overflow: 'hidden',
                    marginBottom: '16px',
                    border: '1px solid #E5E7EB',
                  }}
                >
                  <div
                    style={{
                      width: `${winRate}%`,
                      background: '#15803D',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#FFFFFF',
                      fontSize: '12px',
                      fontWeight: '700',
                    }}
                  >
                    {winRate > 5 && `${winRate}%`}
                  </div>
                  <div
                    style={{
                      width: `${settlementRate}%`,
                      background: '#D97706',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#FFFFFF',
                      fontSize: '12px',
                      fontWeight: '700',
                    }}
                  >
                    {settlementRate > 5 && `${settlementRate}%`}
                  </div>
                  <div
                    style={{
                      width: `${dismissalRate}%`,
                      background: '#7C3AED',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#FFFFFF',
                      fontSize: '12px',
                      fontWeight: '700',
                    }}
                  >
                    {dismissalRate > 5 && `${dismissalRate}%`}
                  </div>
                </div>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
                    gap: '12px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#212529', fontFamily: 'var(--font-body)' }}>
                    <span style={{ width: '12px', height: '12px', borderRadius: '6px', background: '#15803D' }}></span>
                    Plaintiff Win: {winRate}%
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#212529', fontFamily: 'var(--font-body)' }}>
                    <span style={{ width: '12px', height: '12px', borderRadius: '6px', background: '#D97706' }}></span>
                    Settlement: {settlementRate}%
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#212529', fontFamily: 'var(--font-body)' }}>
                    <span style={{ width: '12px', height: '12px', borderRadius: '6px', background: '#7C3AED' }}></span>
                    Other/Dismissal: {dismissalRate}%
                  </div>
                </div>
              </div>
            );
          })()}
        </div>

        {/* How This Judge Compares */}
        <div
          style={{
            padding: '24px',
            borderRadius: '6px',
            border: '1px solid #E5E7EB',
            background: '#FFFFFF',
            marginBottom: '48px',
          }}
        >
          <h3
            style={{
              fontSize: '16px',
              fontWeight: '700',
              color: '#212529',
              marginBottom: '20px',
              fontFamily: 'var(--font-display)',
            }}
          >
            How This Judge Compares
          </h3>
          {(() => {
            const nationalAvgWinRate = 50;
            const nationalAvgMotionGrantRate = 65;
            const nationalAvgDuration = 24;

            const comparisons = [
              {
                label: 'Plaintiff Win Rate',
                judgeValue: judge.stats.plaintiffWinRate,
                avgValue: nationalAvgWinRate,
                unit: '%',
              },
              {
                label: 'Motion Grant Rate',
                judgeValue: judge.stats.motionGrantRate,
                avgValue: nationalAvgMotionGrantRate,
                unit: '%',
              },
              {
                label: 'Median Duration',
                judgeValue: judge.stats.medianDurationMonths,
                avgValue: nationalAvgDuration,
                unit: 'mo',
                isLowerBetter: true,
              },
            ];

            return (
              <div style={{ display: 'grid', gap: '16px' }}>
                {comparisons.map((comp, idx) => {
                  const diff = comp.judgeValue - comp.avgValue;
                  const isPositive = comp.isLowerBetter ? diff < 0 : diff > 0;
                  const badge = (
                    <span
                      style={{
                        display: 'inline-block',
                        padding: '4px 8px',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: '700',
                        background: isPositive ? '#DCF7E5' : '#FDE5E6',
                        color: isPositive ? '#15803D' : '#7C3AED',
                        fontFamily: 'var(--font-mono)',
                      }}
                    >
                      {isPositive ? '+' : ''}{diff.toFixed(1)}{comp.unit}
                    </span>
                  );

                  return (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '16px', borderBottom: '1px solid #E5E7EB' }}>
                      <div>
                        <div style={{ fontSize: '13px', fontWeight: '600', color: '#212529', marginBottom: '4px', fontFamily: 'var(--font-body)' }}>
                          {comp.label}
                        </div>
                        <div style={{ fontSize: '12px', color: '#4B5563', fontFamily: 'var(--font-body)' }}>
                          National avg: {comp.avgValue}{comp.unit}
                        </div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '16px', fontWeight: '700', color: '#212529', marginBottom: '4px', fontFamily: 'var(--font-mono)' }}>
                          {comp.judgeValue}{comp.unit}
                        </div>
                        {badge}
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })()}
        </div>

        {/* Judge Analytics Charts */}
        <div style={{ marginBottom: '48px' }}>
          <h3
            style={{
              fontSize: '16px',
              fontWeight: '700',
              color: '#212529',
              marginBottom: '20px',
              fontFamily: 'var(--font-display)',
            }}
          >
            Judge Analytics
          </h3>
          <JudgeCharts yearlyTrend={judge.yearlyTrend} topCaseTypes={judge.topCaseTypes} />
        </div>

        {/* Cases Before This Judge */}
        <div
          style={{
            padding: '24px',
            borderRadius: '6px',
            border: '1px solid #E5E7EB',
            background: '#FFFFFF',
            marginBottom: '48px',
          }}
        >
          <h3
            style={{
              fontSize: '16px',
              fontWeight: '700',
              color: '#212529',
              marginBottom: '16px',
              fontFamily: 'var(--font-display)',
            }}
          >
            Top Case Types
          </h3>
          <p
            style={{
              fontSize: '14px',
              color: '#4B5563',
              marginBottom: '16px',
              lineHeight: '1.6',
              fontFamily: 'var(--font-body)',
            }}
          >
            Judge {judge.name.split(' ').slice(1).join(' ')} most frequently hears the following case types:
          </p>
          <ul
            style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              display: 'grid',
              gap: '12px',
            }}
          >
            {judge.topCaseTypes.map((caseType, idx) => (
              <li
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  fontSize: '14px',
                  color: '#212529',
                  fontFamily: 'var(--font-body)',
                }}
              >
                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '20px',
                    height: '20px',
                    borderRadius: '6px',
                    background: '#7C3AED',
                    color: '#FFFFFF',
                    fontWeight: '700',
                    fontSize: '12px',
                  }}
                >
                  [x]
                </span>
                {caseType.label} ({caseType.count} cases, {caseType.winRate}% win rate)
              </li>
            ))}
          </ul>
        </div>

        {/* Case Load by Type Mini Chart */}
        {judge.topCaseTypes && judge.topCaseTypes.length > 0 && (
          <div
            style={{
              padding: '24px',
              borderRadius: '6px',
              border: '1px solid #E5E7EB',
              background: '#FFFFFF',
              marginBottom: '48px',
            }}
          >
            <h3
              style={{
                fontSize: '16px',
                fontWeight: '700',
                color: '#212529',
                marginBottom: '20px',
                fontFamily: 'var(--font-display)',
              }}
            >
              Case Load by Type
            </h3>
            {(() => {
              const sortedTypes = [...judge.topCaseTypes].sort((a, b) => b.count - a.count);
              const totalCases = sortedTypes.reduce((sum, ct) => sum + ct.count, 0);

              return (
                <div style={{ display: 'grid', gap: '12px' }}>
                  {sortedTypes.map((caseType, idx) => {
                    const percentage = Math.round((caseType.count / totalCases) * 100);
                    return (
                      <div key={idx}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                          <span style={{ fontSize: '13px', fontWeight: '600', color: '#212529', fontFamily: 'var(--font-body)' }}>
                            {caseType.label}
                          </span>
                          <span style={{ fontSize: '13px', fontWeight: '700', color: '#6D28D9', fontFamily: 'var(--font-mono)' }}>
                            {percentage}% ({caseType.count} cases)
                          </span>
                        </div>
                        <div style={{ display: 'flex', height: '8px', borderRadius: '6px', background: '#E5E7EB', overflow: 'hidden' }}>
                          <div
                            style={{
                              width: `${percentage}%`,
                              background: '#6D28D9',
                              borderRadius: '6px',
                            }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })()}
          </div>
        )}

        {/* Yearly Trend Mini Chart */}
        {judge.yearlyTrend && judge.yearlyTrend.length > 0 && (
          <div
            style={{
              padding: '24px',
              borderRadius: '6px',
              border: '1px solid #E5E7EB',
              background: '#FFFFFF',
              marginBottom: '48px',
            }}
          >
            <h3
              style={{
                fontSize: '16px',
                fontWeight: '700',
                color: '#212529',
                marginBottom: '20px',
                fontFamily: 'var(--font-display)',
              }}
            >
              Case Volume by Year
            </h3>
            {(() => {
              const maxCases = Math.max(...judge.yearlyTrend.map(yt => yt.cases));
              return (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(60px, 1fr))', gap: '8px' }}>
                  {judge.yearlyTrend.map((trend, idx) => {
                    const heightPercentage = (trend.cases / maxCases) * 100;
                    return (
                      <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                        <div
                          style={{
                            width: '100%',
                            height: '80px',
                            background: '#E5E7EB',
                            borderRadius: '6px',
                            display: 'flex',
                            alignItems: 'flex-end',
                            justifyContent: 'center',
                            padding: '4px 0',
                            position: 'relative',
                          }}
                        >
                          <div
                            style={{
                              width: '70%',
                              height: `${heightPercentage}%`,
                              background: '#1B3A5C',
                              borderRadius: '2px 2px 0 0',
                            }}
                          ></div>
                          {heightPercentage > 20 && (
                            <span
                              style={{
                                position: 'absolute',
                                fontSize: '11px',
                                fontWeight: '700',
                                color: '#FFFFFF',
                                bottom: '4px',
                                fontFamily: 'var(--font-mono)',
                              }}
                            >
                              {trend.cases}
                            </span>
                          )}
                        </div>
                        <span style={{ fontSize: '11px', fontWeight: '600', color: '#212529', fontFamily: 'var(--font-body)' }}>
                          {trend.year}
                        </span>
                      </div>
                    );
                  })}
                </div>
              );
            })()}
          </div>
        )}

        {/* Sample Size Note */}
        <div
          style={{
            padding: '16px 20px',
            borderRadius: '6px',
            background: '#FCE5E6',
            border: '1px solid #7C3AED',
            marginBottom: '48px',
          }}
        >
          <p
            style={{
              fontSize: '13px',
              color: '#212529',
              lineHeight: '1.6',
              margin: 0,
              fontFamily: 'var(--font-body)',
            }}
          >
            <strong>Data Source:</strong> Based on {judge.stats.totalCases.toLocaleString()} federal cases from public court records, FJC statistics, and CourtListener databases. This profile reflects historical patterns and is intended for research purposes.
          </p>
        </div>

        {/* Comparable Judges in Same District */}
        {(() => {
          const districtJudges = getJudgesByDistrict(judge.district).filter(j => j.slug !== judge.slug).slice(0, 4);
          if (districtJudges.length === 0) return null;
          return (
            <div style={{ padding: '24px', borderRadius: '6px', border: '1px solid #E5E7EB', background: '#FFFFFF', marginBottom: '48px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#212529', marginBottom: '16px', fontFamily: 'var(--font-display)' }}>
                Other Judges in {judge.district}
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '12px' }}>
                {districtJudges.map((j) => (
                  <Link
                    key={j.slug}
                    href={`/judges/${j.slug}`}
                    style={{
                      display: 'block',
                      padding: '16px',
                      background: '#FAFBFC',
                      border: '1px solid #E5E7EB',
                      borderRadius: '6px',
                      textDecoration: 'none',
                      transition: 'border-color 0.2s',
                    }}
                  >
                    <div style={{ fontSize: '14px', fontWeight: 600, color: '#212529', marginBottom: '8px' }}>{j.name}</div>
                    <div style={{ display: 'flex', gap: '12px', fontSize: '12px', color: '#4B5563' }}>
                      <span style={{ fontWeight: 600, color: j.stats.plaintiffWinRate >= 50 ? '#15803D' : '#7C3AED' }}>{j.stats.plaintiffWinRate}% win</span>
                      <span>{j.stats.totalCases.toLocaleString()} cases</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          );
        })()}

        {/* Related Resources */}
        <div style={{ marginBottom: '48px' }}>
          <h3
            style={{
              fontSize: '16px',
              fontWeight: '700',
              color: '#212529',
              marginBottom: '20px',
              fontFamily: 'var(--font-display)',
            }}
          >
            Related Resources
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
            {[
              {
                href: '/judges',
                label: 'All Judges',
                description: 'Browse profiles of federal judges nationwide',
              },
              {
                href: '/districts',
                label: 'Districts',
                description: 'Explore federal court districts and their judges',
              },
              {
                href: '/calculator',
                label: 'Calculator',
                description: 'Calculate case values and estimate outcomes',
              },
              {
                href: '/compare',
                label: 'Compare Cases',
                description: 'Compare judges and case statistics side-by-side',
              },
            ].map((resource, idx) => (
              <Link
                key={idx}
                href={resource.href}
                style={{
                  display: 'block',
                  padding: '20px',
                  borderRadius: '6px',
                  border: '1px solid #E5E7EB',
                  background: '#FFFFFF',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer',
                }}

              >
                <div style={{ fontSize: '14px', fontWeight: '700', color: '#6D28D9', marginBottom: '8px', fontFamily: 'var(--font-body)' }}>
                  {resource.label}
                </div>
                <div style={{ fontSize: '13px', color: '#4B5563', lineHeight: '1.5', fontFamily: 'var(--font-body)' }}>
                  {resource.description}
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <div
          style={{
            padding: '24px',
            borderRadius: '6px',
            border: '1px solid #E5E7EB',
            background: '#FFFFFF',
          }}
        >
          <h3
            style={{
              fontSize: '14px',
              fontWeight: '700',
              color: '#212529',
              marginBottom: '12px',
              fontFamily: 'var(--font-display)',
            }}
          >
            Legal Disclaimer
          </h3>
          <p
            style={{
              fontSize: '13px',
              color: '#4B5563',
              lineHeight: '1.6',
              margin: 0,
              fontFamily: 'var(--font-body)',
            }}
          >
            This judge profile is provided for educational and research purposes only and does not constitute legal advice. The statistics presented are based on publicly available federal court data and should not be used as the sole basis for litigation decisions. Judge rulings depend on specific case facts, applicable law, jurisdiction, and individual circumstances. This profile does not predict outcomes in any specific case. Please consult with a qualified attorney for legal advice regarding your individual case. MyCaseValue does not provide case valuations or legal advice. No attorney-client relationship is created by this information.
          </p>
        </div>
      </div>

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <style>{`
        /* Remove hover underline from breadcrumb */
        a {
          text-decoration: none;
        }
      `}</style>
    </div>
  );
}
