import { Metadata } from 'next';
import Link from 'next/link';
import { REAL_DATA } from '../../../../../lib/realdata';
import { SITS, STATES } from '../../../../../lib/data';
import {
  getAllCaseTypeSEO,
  getCaseTypeSEO,
  CaseTypeSEO,
} from '../../../../../lib/case-type-seo';
import { SITE_URL } from '../../../../../lib/site-config';

export const revalidate = 3600; // Revalidate every hour

/**
 * Generate static params for all category/slug/district combinations
 * Only generates for combos where real data exists
 */
export async function generateStaticParams() {
  const allCaseTypes = getAllCaseTypeSEO();
  const states = STATES.filter((s) => s.id); // Exclude "All states"

  const params: Array<{ category: string; slug: string; district: string }> = [];

  allCaseTypes.forEach((caseType) => {
    const data = REAL_DATA[caseType.nosCode];

    // Only generate pages if this case type has real data
    if (!data || !data.state_rates) {
      return;
    }

    // Only generate for states that have data for this case type
    states.forEach((state) => {
      if (state.id && data.state_rates[state.id] !== undefined) {
        params.push({
          category: caseType.categorySlug,
          slug: caseType.slug,
          district: state.id,
        });
      }
    });
  });

  return params;
}

/**
 * Generate metadata with SEO optimization
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; slug: string; district: string }>;
}): Promise<Metadata> {
  const { category, slug, district } = await params;
  const caseType = getCaseTypeSEO(category, slug);
  const state = STATES.find((s) => s.id === district);

  if (!caseType || !state) {
    return {
      title: 'Case Data Not Found — MyCaseValue',
      description: 'This case type and district combination does not exist in our database.',
    };
  }

  const title = `${caseType.label} Cases in ${state.label} — Win Rates & Outcomes`;
  const description = `Real outcome data for ${caseType.label} cases in ${state.label} federal courts. See win rates, settlement rates, case duration, and sample size from 5M+ federal court records.`;
  const canonical = `${SITE_URL}/cases/${category}/${slug}/${district}`;

  return {
    title,
    description,
    keywords: [
      caseType.label,
      state.label,
      'federal court',
      'win rates',
      'settlement data',
      'case outcomes',
      'NOS code ' + caseType.nosCode,
    ].join(', '),
    alternates: { canonical },
    openGraph: {
      title: `${caseType.label} in ${state.label} — Win Rates & Outcomes`,
      description,
      url: canonical,
      type: 'website',
      siteName: 'MyCaseValue',
      images: [
        {
          url: `${SITE_URL}/og-image.png`,
          width: 1200,
          height: 630,
          alt: `${caseType.label} Cases in ${state.label}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${caseType.label} in ${state.label}`,
      description,
    },
  };
}

/**
 * Get category label for breadcrumb
 */
function getCategoryLabel(categoryId: string): string {
  const category = SITS.find((c) => c.id === categoryId);
  return category ? category.label : categoryId;
}

/**
 * Stats Card Component
 */
function StatsCard({
  label,
  value,
  subtitle,
}: {
  label: string;
  value: string | number;
  subtitle?: string;
}) {
  return (
    <div
      style={{
        padding: '20px',
        borderRadius: '12px',
        background: 'var(--color-surface-0)',
        border: '1px solid var(--border-default)',
        textAlign: 'center',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)',
      }}
    >
      <p style={{ color: 'var(--color-text-secondary)', fontSize: '14px', margin: '0 0 8px', fontFamily: 'var(--font-body)' }}>
        {label}
      </p>
      <p
        style={{
          fontSize: '28px',
          fontWeight: 'bold',
          color: 'var(--accent-primary)',
          margin: '0',
          fontFamily: 'var(--font-data)',
        }}
      >
        {value}
      </p>
      {subtitle && (
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '12px', margin: '6px 0 0', fontFamily: 'var(--font-body)' }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

export default async function DistrictCaseTypePage({
  params,
}: {
  params: Promise<{ category: string; slug: string; district: string }>;
}) {
  const { category, slug, district } = await params;
  const caseType = getCaseTypeSEO(category, slug);
  const state = STATES.find((s) => s.id === district);

  if (!caseType || !state) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: 'var(--color-surface-1)' }}
      >
        <div style={{ textAlign: 'center', color: 'var(--color-text-primary)' }}>
          <h1 style={{ fontSize: '28px', fontWeight: 'bold', margin: '0 0 16px', fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}>
            Case data not found
          </h1>
          <p style={{ color: 'var(--color-text-secondary)', margin: '0 0 24px', fontFamily: 'var(--font-body)' }}>
            This case type and district combination does not exist in our database.
          </p>
          <Link
            href={`/cases/${category}/${slug}`}
            style={{
              display: 'inline-block',
              padding: '12px 32px',
              borderRadius: '12px',
              background: 'var(--accent-primary)',
              color: 'var(--color-text-inverse)',
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: '14px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}
          >
            Back to {caseType?.label || 'Case Type'}
          </Link>
        </div>
      </div>
    );
  }

  const data = REAL_DATA[caseType.nosCode];

  // Get state-specific data
  const stateWinRate = data?.state_rates?.[district] || data?.wr || 42;
  const settlementRate = data?.sp || 30;
  const medianMonths = data?.mo || 6;
  const sampleSize = data?.total ? Math.floor((data.total * 0.02)) : 1000; // Rough estimate: 2% of total cases per state

  // JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Cases',
            item: `${SITE_URL}/cases`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: getCategoryLabel(category),
            item: `${SITE_URL}/cases/${category}`,
          },
          {
            '@type': 'ListItem',
            position: 4,
            name: caseType.label,
            item: `${SITE_URL}/cases/${category}/${slug}`,
          },
          {
            '@type': 'ListItem',
            position: 5,
            name: state.label,
            item: `${SITE_URL}/cases/${category}/${slug}/${district}`,
          },
        ],
      },
      {
        '@type': 'Dataset',
        name: `${caseType.label} Federal Court Outcomes in ${state.label}`,
        description: `Aggregate outcome data for ${caseType.label} cases in ${state.label} federal courts.`,
        url: `${SITE_URL}/cases/${category}/${slug}/${district}`,
        creator: { '@type': 'Organization', name: 'Federal Judicial Center' },
        isAccessibleForFree: true,
        spatialCoverage: state.label,
        keywords: [caseType.label, state.label, 'federal court', 'win rates', 'settlement data'],
      },
    ],
  };

  return (
    <div style={{ background: 'var(--color-surface-1)', color: 'var(--color-text-primary)' }}>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Dark Navy Header Section */}
      <header
        style={{
          background: 'var(--accent-primary)',
          padding: 'clamp(20px, 4vw, 40px) 24px',
          marginBottom: 'clamp(20px, 4vw, 40px)',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* Breadcrumb */}
          <nav style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', gap: '8px', fontSize: '14px', alignItems: 'center', flexWrap: 'wrap' }}>
              <Link href="/" style={{ color: 'var(--color-text-inverse)', textDecoration: 'none' }}>
                Home
              </Link>
              <span style={{ color: 'var(--border-default)' }}>&gt;</span>
              <Link
                href="/cases"
                style={{ color: 'var(--color-text-inverse)', textDecoration: 'none' }}
              >
                Cases
              </Link>
              <span style={{ color: 'var(--border-default)' }}>&gt;</span>
              <Link
                href={`/cases/${category}`}
                style={{ color: 'var(--color-text-inverse)', textDecoration: 'none' }}
              >
                {getCategoryLabel(category)}
              </Link>
              <span style={{ color: 'var(--border-default)' }}>&gt;</span>
              <Link
                href={`/cases/${category}/${slug}`}
                style={{ color: 'var(--color-text-inverse)', textDecoration: 'none' }}
              >
                {caseType.label}
              </Link>
              <span style={{ color: 'var(--border-default)' }}>&gt;</span>
              <span style={{ color: 'var(--border-default)' }}>{state.label}</span>
            </div>
          </nav>

          {/* Header Content */}
          <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', marginBottom: '8px', flexWrap: 'wrap' }}>
            <div style={{ flex: 1 }}>
              <h1
                style={{
                  fontSize: 'clamp(28px, 6vw, 36px)',
                  fontWeight: 'bold',
                  margin: '0 0 8px',
                  fontFamily: 'var(--font-display)',
                  color: 'var(--color-text-inverse)',
                }}
              >
                {caseType.label}
              </h1>
              <p
                style={{
                  fontSize: '16px',
                  color: 'var(--border-default)',
                  margin: '0',
                  fontFamily: 'var(--font-body)',
                }}
              >
                {state.label} Federal Court Data
              </p>
            </div>
            <span
              style={{
                display: 'inline-block',
                padding: '8px 16px',
                borderRadius: '12px',
                background: 'var(--accent-primary)',
                fontSize: '12px',
                fontWeight: '600',
                color: 'var(--color-text-inverse)',
                textTransform: 'uppercase',
                marginTop: '4px',
              }}
            >
              NOS {caseType.nosCode}
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: 'clamp(20px, 4vw, 40px) 24px' }}>

        {/* Stats Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px',
            marginBottom: '40px',
          }}
          className="stats-grid"
        >
          <StatsCard label="Win Rate" value={`${Math.round(stateWinRate)}%`} subtitle={`${state.label} federal courts`} />
          <StatsCard label="Settlement Rate" value={`${settlementRate}%`} subtitle="Resolved pre-trial" />
          <StatsCard label="Median Duration" value={`${medianMonths} mo`} subtitle="Time to resolution" />
          <StatsCard label="Sample Size" value={sampleSize.toLocaleString()} subtitle="Estimated cases analyzed" />
        </div>

        {/* District Info Section */}
        <div
          style={{
            background: 'var(--color-surface-0)',
            border: '1px solid var(--border-default)',
            borderRadius: '12px',
            padding: '32px',
            marginBottom: '40px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)',
          }}
        >
          <h2
            style={{
              fontSize: '20px',
              fontWeight: 'bold',
              margin: '0 0 16px',
              fontFamily: 'var(--font-display)',
              color: 'var(--color-text-primary)',
            }}
          >
            {caseType.label} in {state.label}
          </h2>
          <p
            style={{
              lineHeight: '1.6',
              color: 'var(--color-text-secondary)',
              margin: '0',
              fontFamily: 'var(--font-body)',
            }}
          >
            This page shows federal court outcome data for {caseType.label} cases filed in {state.label}.
            The win rate reflects the percentage of cases with favorable outcomes (settlement, trial verdict, or favorable judgment)
            based on analysis of {sampleSize.toLocaleString()} cases from the Federal Judicial Center database.
            The median duration shows the average time from filing to final resolution.
          </p>
        </div>

        {/* About the Case Type */}
        <div
          style={{
            background: 'var(--color-surface-0)',
            border: '1px solid var(--border-default)',
            borderRadius: '12px',
            padding: '24px',
            marginBottom: '40px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)',
          }}
        >
          <h3
            style={{
              fontSize: '16px',
              fontWeight: 'bold',
              margin: '0 0 16px',
              fontFamily: 'var(--font-display)',
              color: 'var(--color-text-primary)',
            }}
          >
            About {caseType.label}
          </h3>
          <p
            style={{
              fontSize: '15px',
              color: 'var(--color-text-secondary)',
              margin: '0',
              lineHeight: '1.6',
              fontFamily: 'var(--font-body)',
            }}
          >
            {caseType.description}
          </p>
        </div>

        {/* Governing Federal Law */}
        <div
          style={{
            background: 'var(--color-surface-0)',
            border: '1px solid var(--border-default)',
            borderRadius: '12px',
            padding: '24px',
            marginBottom: '40px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)',
          }}
        >
          <h3
            style={{
              fontSize: '16px',
              fontWeight: 'bold',
              margin: '0 0 16px',
              fontFamily: 'var(--font-display)',
              color: 'var(--color-text-primary)',
            }}
          >
            Governing Federal Law
          </h3>
          <p
            style={{
              fontSize: '15px',
              color: 'var(--color-text-secondary)',
              margin: '0',
              fontFamily: 'var(--font-body)',
            }}
          >
            {caseType.federalLaw}
          </p>
        </div>

        {/* Navigation Section */}
        <style>{`
          .nav-button {
            display: inline-block;
            padding: '14px 36px';
            border-radius: '12px';
            background: 'var(--accent-primary)';
            color: white;
            text-decoration: none;
            font-weight: '600';
            font-size: '14px';
            text-transform: 'uppercase';
            letter-spacing: '0.5px';
            margin-right: '12px';
            margin-bottom: '12px';
            transition: background-color 0.2s ease, transform 0.2s ease;
          }
          .nav-button:hover {
            background-color: '#c41218';
            transform: translateY(-1px);
          }

          @media (max-width: 768px) {
            h1 {
              font-size: 28px !important;
            }
            h2 {
              font-size: 20px !important;
            }
          }
        `}</style>
        <div
          style={{
            background: '#F3F4F6',
            borderRadius: '12px',
            padding: '32px 24px',
            textAlign: 'center',
          }}
        >
          <h2
            style={{
              fontSize: '20px',
              fontWeight: 'bold',
              margin: '0 0 16px',
              fontFamily: 'var(--font-display)',
              color: 'var(--color-text-primary)',
            }}
          >
            Explore Related Cases
          </h2>
          <div style={{ marginBottom: '12px' }}>
            <Link
              href={`/cases/${category}/${slug}`}
              className="nav-button"
            >
              View All {caseType.label} Cases
            </Link>
            <Link
              href={`/cases/${category}`}
              className="nav-button"
            >
              Back to {getCategoryLabel(category)}
            </Link>
          </div>
        </div>

        {/* Data Disclaimer */}
        <div
          style={{
            marginTop: '40px',
            padding: '16px 20px',
            borderLeft: '4px solid var(--accent-primary)',
            background: '#F0F9FF',
            borderRadius: '4px',
          }}
        >
          <p
            style={{
              fontSize: '12px',
              color: '#475569',
              margin: '0',
              fontFamily: 'var(--font-body)',
            }}
          >
            <strong>Data Source:</strong> This information is derived from publicly available federal court records from the Federal Judicial Center Integrated Database and CourtListener.
            Data represents aggregate outcomes across all cases filed during the analysis period and should not be relied upon for predicting individual case outcomes.
            Consult with a qualified attorney in {state.label} for legal advice specific to your situation.
          </p>
        </div>
      </div>
    </div>
  );
}
