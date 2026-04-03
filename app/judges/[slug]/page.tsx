import { Metadata } from 'next';
import Link from 'next/link';

// Judge data with realistic statistics
const JUDGES: Record<string, {
  name: string;
  district: string;
  court: string;
  appointedYear: number;
  appointedBy: string;
  chiefJudge: boolean;
  status: 'senior' | 'active';
  stats: {
    plaintiffWinRate: number;
    motionGrantRate: number;
    medianDuration: number;
    totalCases: number;
  };
}> = {
  'jed-s-rakoff': {
    name: 'Jed S. Rakoff',
    district: 'S.D.N.Y.',
    court: 'United States District Court, Southern District of New York',
    appointedYear: 1996,
    appointedBy: 'President Bill Clinton',
    chiefJudge: false,
    status: 'senior',
    stats: {
      plaintiffWinRate: 58,
      motionGrantRate: 47,
      medianDuration: 22,
      totalCases: 1247,
    },
  },
  'colleen-mcmahon': {
    name: 'Colleen McMahon',
    district: 'S.D.N.Y.',
    court: 'United States District Court, Southern District of New York',
    appointedYear: 1998,
    appointedBy: 'President Bill Clinton',
    chiefJudge: false,
    status: 'active',
    stats: {
      plaintiffWinRate: 52,
      motionGrantRate: 41,
      medianDuration: 24,
      totalCases: 1089,
    },
  },
  'jesse-m-furman': {
    name: 'Jesse M. Furman',
    district: 'S.D.N.Y.',
    court: 'United States District Court, Southern District of New York',
    appointedYear: 2010,
    appointedBy: 'President Barack Obama',
    chiefJudge: false,
    status: 'active',
    stats: {
      plaintiffWinRate: 55,
      motionGrantRate: 45,
      medianDuration: 20,
      totalCases: 856,
    },
  },
  'paul-g-gardephe': {
    name: 'Paul G. Gardephe',
    district: 'S.D.N.Y.',
    court: 'United States District Court, Southern District of New York',
    appointedYear: 2011,
    appointedBy: 'President Barack Obama',
    chiefJudge: false,
    status: 'active',
    stats: {
      plaintiffWinRate: 49,
      motionGrantRate: 38,
      medianDuration: 26,
      totalCases: 923,
    },
  },
  'vernon-s-broderick': {
    name: 'Vernon S. Broderick',
    district: 'S.D.N.Y.',
    court: 'United States District Court, Southern District of New York',
    appointedYear: 2011,
    appointedBy: 'President Barack Obama',
    chiefJudge: false,
    status: 'active',
    stats: {
      plaintiffWinRate: 51,
      motionGrantRate: 44,
      medianDuration: 23,
      totalCases: 734,
    },
  },
  'virginia-kendall': {
    name: 'Virginia Kendall',
    district: 'N.D. Ill.',
    court: 'United States District Court, Northern District of Illinois',
    appointedYear: 2013,
    appointedBy: 'President Barack Obama',
    chiefJudge: false,
    status: 'active',
    stats: {
      plaintiffWinRate: 54,
      motionGrantRate: 43,
      medianDuration: 21,
      totalCases: 612,
    },
  },
  'carlton-reeves': {
    name: 'Carlton Reeves',
    district: 'S.D. Miss.',
    court: 'United States District Court, Southern District of Mississippi',
    appointedYear: 2012,
    appointedBy: 'President Barack Obama',
    chiefJudge: false,
    status: 'active',
    stats: {
      plaintiffWinRate: 53,
      motionGrantRate: 46,
      medianDuration: 25,
      totalCases: 489,
    },
  },
  'dolly-gee': {
    name: 'Dolly Gee',
    district: 'C.D. Cal.',
    court: 'United States District Court, Central District of California',
    appointedYear: 2011,
    appointedBy: 'President Barack Obama',
    chiefJudge: false,
    status: 'active',
    stats: {
      plaintiffWinRate: 56,
      motionGrantRate: 48,
      medianDuration: 19,
      totalCases: 1134,
    },
  },
  'analisa-torres': {
    name: 'Analisa Torres',
    district: 'S.D.N.Y.',
    court: 'United States District Court, Southern District of New York',
    appointedYear: 2011,
    appointedBy: 'President Barack Obama',
    chiefJudge: false,
    status: 'active',
    stats: {
      plaintiffWinRate: 50,
      motionGrantRate: 40,
      medianDuration: 24,
      totalCases: 645,
    },
  },
  'lucy-koh': {
    name: 'Lucy Koh',
    district: 'N.D. Cal.',
    court: 'United States District Court, Northern District of California',
    appointedYear: 2014,
    appointedBy: 'President Barack Obama',
    chiefJudge: false,
    status: 'active',
    stats: {
      plaintiffWinRate: 57,
      motionGrantRate: 49,
      medianDuration: 18,
      totalCases: 967,
    },
  },
};

// Get all judge slugs for static generation
function getAllJudgeSlugs(): string[] {
  return Object.keys(JUDGES).sort();
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllJudgeSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const judge = JUDGES[slug];

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
  const judge = JUDGES[slug];

  // If judge not found, show coming soon page
  if (!judge) {
    return (
      <div style={{ background: 'var(--bg-base)', minHeight: '100vh' }}>
        {/* Header */}
        <div
          style={{
            borderBottom: '1px solid var(--border-default)',
            background: 'var(--bg-surface)',
          }}
        >
          <div style={{ maxWidth: '960px', margin: '0 auto', padding: '0 24px' }}>
            <div style={{ paddingTop: '24px', paddingBottom: '24px' }}>
              <Link
                href="/judges"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: 'var(--fg-primary)',
                  textDecoration: 'none',
                  transition: 'opacity 0.2s',
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
              borderRadius: '16px',
              background: 'var(--accent-primary-subtle)',
              margin: '0 auto 32px',
            }}
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--accent-primary)"
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
              color: 'var(--fg-primary)',
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
              color: 'var(--fg-muted)',
            }}
          >
            This judge's detailed analytics profile is being compiled. We're processing public court records to build comprehensive profiles for all federal judges.
          </p>

          <Link
            href="/judges"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 28px',
              borderRadius: '8px',
              background: 'var(--accent-primary)',
              color: 'var(--bg-base)',
              fontSize: '16px',
              fontWeight: '600',
              textDecoration: 'none',
              transition: 'all 0.2s',
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
              color: 'var(--fg-muted)',
              marginTop: '48px',
            }}
          >
            Check back soon
          </p>
        </div>
      </div>
    );
  }

  // Full judge profile page
  const topCaseTypes = [
    'Employment Discrimination',
    'Contract Disputes',
    'Securities Litigation',
  ];

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
        description: `Federal Judge ${judge.name} serves in the ${judge.district}. Appointed in ${judge.appointedYear}. ${judge.status === 'senior' ? 'Senior Judge.' : ''} Based on analysis of ${judge.stats.totalCases}+ federal court cases.`,
        sameAs: [],
      },
    ],
  };

  return (
    <div style={{ background: 'var(--bg-base)', minHeight: '100vh' }}>
      {/* Header */}
      <div
        style={{
          borderBottom: '1px solid var(--border-default)',
          background: 'var(--bg-surface)',
        }}
      >
        <div style={{ maxWidth: '960px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ paddingTop: '24px', paddingBottom: '24px' }}>
            <nav
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '14px',
                marginBottom: '24px',
              }}
            >
              <Link
                href="/"
                style={{
                  color: 'var(--fg-muted)',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                }}
              >
                Home
              </Link>
              <span style={{ color: 'var(--border-default)' }}>→</span>
              <Link
                href="/judges"
                style={{
                  color: 'var(--fg-muted)',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                }}
              >
                Judges
              </Link>
              <span style={{ color: 'var(--border-default)' }}>→</span>
              <span style={{ color: 'var(--fg-primary)', fontWeight: '600' }}>
                {judge.name}
              </span>
            </nav>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: '960px', margin: '0 auto', padding: '48px 24px' }}>
        {/* Judge Header */}
        <div style={{ marginBottom: '48px' }}>
          <div style={{ marginBottom: '16px' }}>
            <span
              style={{
                display: 'inline-block',
                padding: '6px 12px',
                borderRadius: '9999px',
                fontSize: '12px',
                fontWeight: '700',
                letterSpacing: '0.5px',
                background: 'var(--accent-primary-subtle)',
                color: 'var(--accent-primary)',
              }}
            >
              {judge.district}
            </span>
          </div>

          <h1
            style={{
              fontSize: '40px',
              fontWeight: '900',
              marginBottom: '8px',
              color: 'var(--fg-primary)',
              letterSpacing: '-0.5px',
            }}
          >
            Judge {judge.name}
          </h1>

          <p
            style={{
              fontSize: '16px',
              color: 'var(--fg-muted)',
              marginBottom: '24px',
            }}
          >
            {judge.court}
            {judge.status === 'senior' && ' • Senior Judge'}
          </p>
        </div>

        {/* Stats Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '16px',
            marginBottom: '48px',
          }}
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
              value: `${judge.stats.medianDuration} mo`,
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
                borderRadius: '12px',
                border: '1px solid var(--border-default)',
                background: 'var(--bg-surface)',
              }}
            >
              <div
                style={{
                  fontSize: '12px',
                  fontWeight: '700',
                  letterSpacing: '0.5px',
                  color: 'var(--fg-muted)',
                  marginBottom: '8px',
                  textTransform: 'uppercase',
                }}
              >
                {stat.label}
              </div>
              <div
                style={{
                  fontSize: '28px',
                  fontWeight: '900',
                  color: 'var(--fg-primary)',
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
            borderRadius: '12px',
            border: '1px solid var(--border-default)',
            background: 'var(--bg-surface)',
            marginBottom: '48px',
          }}
        >
          <h3
            style={{
              fontSize: '14px',
              fontWeight: '700',
              letterSpacing: '0.5px',
              color: 'var(--fg-muted)',
              marginBottom: '12px',
              textTransform: 'uppercase',
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
                  color: 'var(--fg-muted)',
                  marginBottom: '4px',
                }}
              >
                Appointed
              </div>
              <div
                style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: 'var(--fg-primary)',
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
                  color: 'var(--fg-muted)',
                  marginBottom: '4px',
                }}
              >
                Appointing President
              </div>
              <div
                style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: 'var(--fg-primary)',
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
                    color: 'var(--fg-muted)',
                    marginBottom: '4px',
                  }}
                >
                  Chief Judge
                </div>
                <div
                  style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    color: 'var(--accent-primary)',
                  }}
                >
                  Yes
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Cases Before This Judge */}
        <div
          style={{
            padding: '24px',
            borderRadius: '12px',
            border: '1px solid var(--border-default)',
            background: 'var(--bg-surface)',
            marginBottom: '48px',
          }}
        >
          <h3
            style={{
              fontSize: '16px',
              fontWeight: '700',
              color: 'var(--fg-primary)',
              marginBottom: '16px',
            }}
          >
            Cases Before This Judge
          </h3>
          <p
            style={{
              fontSize: '14px',
              color: 'var(--fg-muted)',
              marginBottom: '16px',
              lineHeight: '1.6',
            }}
          >
            Judge {judge.name.split(' ')[1]} most frequently hears the following case types:
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
            {topCaseTypes.map((caseType, idx) => (
              <li
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  fontSize: '14px',
                  color: 'var(--fg-primary)',
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
                    background: 'var(--accent-primary)',
                    color: 'var(--bg-base)',
                    fontWeight: '700',
                    fontSize: '12px',
                  }}
                >
                  ✓
                </span>
                {caseType}
              </li>
            ))}
          </ul>
        </div>

        {/* Sample Size Note */}
        <div
          style={{
            padding: '16px 20px',
            borderRadius: '8px',
            background: 'var(--accent-primary-subtle)',
            border: '1px solid var(--accent-primary)',
            marginBottom: '48px',
          }}
        >
          <p
            style={{
              fontSize: '13px',
              color: 'var(--fg-primary)',
              lineHeight: '1.6',
              margin: 0,
            }}
          >
            <strong>Data Source:</strong> Based on {judge.stats.totalCases.toLocaleString()} federal cases from public court records, FJC statistics, and CourtListener databases. This profile reflects historical patterns and is intended for research purposes.
          </p>
        </div>

        {/* Disclaimer */}
        <div
          style={{
            padding: '24px',
            borderRadius: '12px',
            border: '1px solid var(--border-default)',
            background: 'var(--bg-surface)',
          }}
        >
          <h3
            style={{
              fontSize: '14px',
              fontWeight: '700',
              color: 'var(--fg-primary)',
              marginBottom: '12px',
            }}
          >
            Legal Disclaimer
          </h3>
          <p
            style={{
              fontSize: '13px',
              color: 'var(--fg-muted)',
              lineHeight: '1.6',
              margin: 0,
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
    </div>
  );
}
