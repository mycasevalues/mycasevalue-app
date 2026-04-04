import { Metadata } from 'next';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { getJudgeBySlug, getAllJudges } from '@/lib/judges';

// Dynamic import for client component
const JudgeCharts = dynamic(() => import('@/components/features/JudgeCharts'), {
  ssr: false,
  loading: () => <div style={{ padding: '24px', textAlign: 'center', color: '#455A64' }}>Loading charts...</div>,
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
      description: 'Federal judge profile coming soon.',
    };
  }

  const title = `Judge ${judge.name} — ${judge.district} | MyCaseValue`;
  const description = `Research Judge ${judge.name}'s ruling patterns, motion grant rates, and case outcomes. Appointed ${judge.appointedYear}. ${judge.stats.totalCases}+ cases analyzed from federal court records.`;
  const canonical = `https://www.mycasevalues.com/judges/${slug}`;

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
      images: [{ url: 'https://www.mycasevalues.com/og-image.png', width: 1200, height: 630 }],
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

  // If judge not found, show coming soon page
  if (!judge) {
    return (
      <div style={{ background: '#EDEEEE', minHeight: '100vh' }}>
        <style>{`
          .judge-coming-soon-link {
            color: #212529;
            transition: color 0.2s ease;
          }
          .judge-coming-soon-link:hover {
            color: #006997;
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
            borderBottom: '1px solid #D5D8DC',
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
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                Back to Judges
              </Link>
            </div>
          </div>
        </div>

        {/* Coming Soon Content */}
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
              borderRadius: '4px',
              background: '#FCE5E6',
              margin: '0 auto 32px',
            }}
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#E8171F"
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
              color: '#455A64',
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
              borderRadius: '4px',
              background: '#E8171F',
              color: '#FFFFFF',
              fontSize: '16px',
              fontWeight: '600',
              textDecoration: 'none',
            }}
          >
            Browse all judges
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>

          <p
            style={{
              fontSize: '14px',
              color: '#455A64',
              marginTop: '48px',
              fontFamily: 'var(--font-body)',
            }}
          >
            Check back soon
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
        name: judge.name,
        jobTitle: 'Federal Judge',
        workLocation: {
          '@type': 'Place',
          name: judge.court,
        },
        affiliation: {
          '@type': 'Organization',
          name: `United States District Court, ${judge.district}`,
        },
        description: `Federal Judge ${judge.name} serves in the ${judge.district}. Appointed in ${judge.appointedYear}. ${judge.seniorStatus ? 'Senior Judge.' : ''} Based on analysis of ${judge.stats.totalCases}+ federal court cases.`,
        sameAs: [],
      },
    ],
  };

  return (
    <div style={{ background: '#EDEEEE', minHeight: '100vh' }}>
      <style>{`
        .judge-breadcrumb-link {
          color: #455A64;
          text-decoration: none;
          transition: color 0.2s ease;
        }
        .judge-breadcrumb-link:hover {
          color: #006997;
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
          background: '#00172E',
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
            <span style={{ color: '#6B7280' }}>›</span>
            <Link
              href="/judges"
              className="judge-breadcrumb-link"
              style={{}}
            >
              Judges
            </Link>
            <span style={{ color: '#6B7280' }}>›</span>
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
                  color: '#D5D8DC',
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
                borderRadius: '4px',
                fontSize: '12px',
                fontWeight: '700',
                letterSpacing: '0.5px',
                background: '#E8171F',
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
            },
            {
              label: 'Motion Grant Rate',
              value: `${judge.stats.motionGrantRate}%`,
            },
            {
              label: 'Median Case Duration',
              value: `${judge.stats.medianDurationMonths} mo`,
            },
            {
              label: 'Settlement Rate',
              value: `${judge.stats.settlementRate}%`,
            },
            {
              label: 'Total Cases Analyzed',
              value: judge.stats.totalCases.toLocaleString(),
            },
          ].map((stat, idx) => (
            <div
              key={idx}
              style={{
                padding: '20px',
                borderRadius: '4px',
                border: '1px solid #D5D8DC',
                background: '#FFFFFF',
              }}
            >
              <div
                style={{
                  fontSize: '12px',
                  fontWeight: '700',
                  letterSpacing: '0.5px',
                  color: '#455A64',
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
                  color: '#212529',
                  fontFamily: "monospace, 'Courier New'",
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
            borderRadius: '4px',
            border: '1px solid #D5D8DC',
            background: '#FFFFFF',
            marginBottom: '48px',
          }}
        >
          <h3
            style={{
              fontSize: '14px',
              fontWeight: '700',
              letterSpacing: '0.5px',
              color: '#455A64',
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
                  color: '#455A64',
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
                  color: '#455A64',
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
                    color: '#455A64',
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
                    color: '#E8171F',
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  Yes
                </div>
              </div>
            )}
          </div>
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
            borderRadius: '4px',
            border: '1px solid #D5D8DC',
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
              color: '#455A64',
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
                    borderRadius: '4px',
                    background: '#E8171F',
                    color: '#FFFFFF',
                    fontWeight: '700',
                    fontSize: '12px',
                  }}
                >
                  ✓
                </span>
                {caseType.label} ({caseType.count} cases, {caseType.winRate}% win rate)
              </li>
            ))}
          </ul>
        </div>

        {/* Sample Size Note */}
        <div
          style={{
            padding: '16px 20px',
            borderRadius: '4px',
            background: '#FCE5E6',
            border: '1px solid #E8171F',
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

        {/* Disclaimer */}
        <div
          style={{
            padding: '24px',
            borderRadius: '4px',
            border: '1px solid #D5D8DC',
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
              color: '#455A64',
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
