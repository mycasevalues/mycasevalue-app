import { Metadata } from 'next';
import Link from 'next/link';
import { REAL_DATA } from '../../../../lib/realdata';
import { SITS } from '../../../../lib/data';
import {
  getAllCaseTypeSEO,
  getCaseTypeSEO,
  CaseTypeSEO,
} from '../../../../lib/case-type-seo';
import { SITE_URL } from '../../../../lib/site-config';
import SaveButton from '../../../../components/ui/SaveButton';

export const revalidate = 3600; // Revalidate every hour

/**
 * Generate static params for all 84+ federal case types
 */
export async function generateStaticParams() {
  const allCaseTypes = getAllCaseTypeSEO();
  return allCaseTypes.map((caseType) => ({
    category: caseType.categorySlug,
    slug: caseType.slug,
  }));
}

/**
 * Generate metadata with SEO optimization
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}): Promise<Metadata> {
  const { category, slug } = await params;
  const caseType = getCaseTypeSEO(category, slug);

  if (!caseType) {
    return {
      title: 'Case Type Not Found',
      description: 'This case type does not exist in our database.',
    };
  }

  const title = `${caseType.label} — Federal Court Outcomes & Win Rates`;
  const description = caseType.description.substring(0, 160) + '...';
  const canonical = `${SITE_URL}/cases/${category}/${slug}`;

  return {
    title,
    description,
    keywords: [
      caseType.label,
      'federal court',
      'win rates',
      'settlement data',
      'case outcomes',
      caseType.federalLaw,
      'NOS code ' + caseType.nosCode,
    ].join(', '),
    alternates: { canonical },
    openGraph: {
      title: `${caseType.label} — Federal Court Outcomes & Win Rates`,
      description,
      url: canonical,
      type: 'website',
      siteName: 'MyCaseValue',
      images: [
        {
          url: `${SITE_URL}/og-image.png`,
          width: 1200,
          height: 630,
          alt: `${caseType.label} Federal Court Outcomes`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${caseType.label} — Federal Court Outcomes`,
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
  casesCount,
}: {
  label: string;
  value: string | number;
  subtitle?: string;
  casesCount?: number;
}) {
  const shouldShowDot = label === 'Win Rate' && casesCount && casesCount > 0;

  return (
    <div
      style={{
        padding: '24px',
        borderRadius: '4px',
        background: 'var(--color-surface-0)',
        border: '1px solid var(--border-default)',
        textAlign: 'center',
        boxShadow: 'var(--shadow-xs)',
      }}
    >
      <p style={{ color: 'var(--color-text-secondary)', fontSize: '14px', margin: '0 0 8px', fontFamily: 'var(--font-ui)' }}>
        {label}
      </p>
      <p
        style={{
          fontSize: '28px',
          fontWeight: 700,
          color: 'var(--accent-primary)',
          margin: '0',
          fontFamily: 'var(--font-mono)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
        }}
      >
        {value}
        {shouldShowDot && (
          <span title={`Based on ${casesCount.toLocaleString()} cases — ${casesCount >= 10000 ? 'High' : casesCount >= 1000 ? 'Medium' : casesCount >= 100 ? 'Low' : 'Insufficient'} confidence`} style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', backgroundColor: casesCount >= 10000 ? 'var(--data-positive)' : casesCount >= 1000 ? 'var(--wrn-txt)' : casesCount >= 100 ? 'var(--data-negative)' : 'var(--text4, #A8A6A0)' }} />
        )}
      </p>
      {subtitle && (
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '12px', margin: '6px 0 0', fontFamily: 'var(--font-ui)' }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

export default async function CaseTypeDetailPage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;
  const caseType = getCaseTypeSEO(category, slug);

  if (!caseType) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: 'var(--color-surface-1)' }}
      >
        <div style={{ textAlign: 'center', color: 'var(--color-text-primary)' }}>
          <h1 style={{ fontSize: '28px', fontWeight: 700, margin: '0 0 16px', fontFamily: 'var(--font-legal)', color: 'var(--color-text-primary)' }}>
            Case type not found
          </h1>
          <p style={{ color: 'var(--color-text-secondary)', margin: '0 0 24px', fontFamily: 'var(--font-ui)' }}>
            This case type does not exist in our database.
          </p>
          <Link
            href={`/cases/${category}`}
            style={{
              display: 'inline-block',
              padding: '8px 24px',
              borderRadius: 4,
              background: 'var(--gold)',
              color: 'var(--color-surface-0)',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: 14,
              letterSpacing: '-0.005em',
              border: '1px solid var(--gold)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08)',
              fontFamily: 'var(--font-ui)',
            }}
          >
            Back to {getCategoryLabel(category)}
          </Link>
        </div>
      </div>
    );
  }

  const data = REAL_DATA[caseType.nosCode];
  const winRate = data ? Math.round(data.wr || 0) : 42;
  const settlementRate = data ? Math.round(data.sp || 0) : 30;
  const medianMonths = data ? data.mo || 6 : 8;
  const medianRecovery = data?.rng?.md ? `$${Math.round(data.rng.md * 1000).toLocaleString()}` : '$50,000';
  const totalCases = data ? data.total?.toLocaleString() : '1000+';

  // JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://mycasevalues.com' },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Cases',
            item: 'https://www.mycasevalues.com/cases',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: getCategoryLabel(category),
            item: `https://mycasevalues.com/cases/${category}`,
          },
          {
            '@type': 'ListItem',
            position: 4,
            name: caseType.label,
            item: `https://mycasevalues.com/cases/${category}/${slug}`,
          },
        ],
      },
      {
        '@type': 'Dataset',
        name: `${caseType.label} Federal Court Outcome Data`,
        description: `Aggregate outcome data for ${caseType.label} cases in U.S. federal courts.`,
        url: `https://mycasevalues.com/cases/${category}/${slug}`,
        creator: { '@type': 'Organization', name: 'Federal Judicial Center' },
        isAccessibleForFree: true,
        spatialCoverage: 'United States Federal Courts',
        keywords: [caseType.label, 'federal court', 'win rates', 'settlement data'],
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
          padding: '16px 24px',
          marginBottom: '24px',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* Breadcrumb */}
          <nav style={{ marginBottom: '12px', display: 'none' }}>
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
              <span style={{ color: 'var(--border-default)' }}>{caseType.label}</span>
            </div>
          </nav>

          {/* Header Content */}
          <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '0', flexWrap: 'wrap' }}>
            <div style={{ flex: 1 }}>
              <h1
                style={{
                  fontSize: '20px',
                  fontWeight: 700,
                  margin: '0',
                  fontFamily: 'var(--font-legal)',
                  color: 'var(--color-text-inverse)',
                }}
              >
                {caseType.label}
              </h1>
            </div>
            <SaveButton
              item={{
                id: `casetype-${caseType.nosCode}`,
                type: 'case',
                label: caseType.label,
                sublabel: 'Case Type',
                href: `/cases/${category}/${slug}`,
              }}
              size="sm"
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: 'clamp(24px, 4vw, 40px) 24px' }}>

        {/* Stats Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px',
            marginBottom: '48px',
          }}
          className="stats-grid"
        >
          <StatsCard label="Win Rate" value={`${winRate}%`} subtitle="Favorable outcomes" casesCount={data?.total} />
          <StatsCard label="Settlement Rate" value={`${settlementRate}%`} subtitle="Resolved pre-trial" />
          <StatsCard label="Median Duration" value={`${medianMonths} mo`} subtitle="Time to resolution" />
          <StatsCard label="Median Recovery" value={medianRecovery} subtitle="Successful cases" />
          <StatsCard label="Total Cases" value={totalCases} subtitle="Federal courts analyzed" />
        </div>

        {/* Description Section */}
        <div
          style={{
            background: 'var(--color-surface-0)',
            border: '1px solid var(--border-default)',
            borderRadius: '4px',
            padding: '32px',
            marginBottom: '48px',
            boxShadow: 'var(--shadow-xs)',
          }}
        >
          <h2
            style={{
              fontSize: '20px',
              fontWeight: 700,
              margin: '0 0 16px',
              fontFamily: 'var(--font-ui)',
              color: 'var(--color-text-primary)',
            }}
          >
            About {caseType.label}
          </h2>
          <p
            style={{
              lineHeight: '1.6',
              color: 'var(--color-text-secondary)',
              margin: '0',
              fontFamily: 'var(--font-ui)',
            }}
          >
            {caseType.description}
          </p>
        </div>

        {/* Federal Law & Typical Claims */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px',
            marginBottom: '48px',
          }}
        >
          {/* Federal Law */}
          <div
            style={{
              background: 'var(--color-surface-0)',
              border: '1px solid var(--border-default)',
              borderRadius: '4px',
              padding: '24px',
              boxShadow: 'var(--shadow-xs)',
            }}
          >
            <h3
              style={{
                fontSize: '16px',
                fontWeight: 700,
                margin: '0 0 16px',
                fontFamily: 'var(--font-ui)',
                color: 'var(--color-text-primary)',
              }}
            >
              Governing Federal Law
            </h3>
            <p
              style={{
                fontSize: '14px',
                color: 'var(--color-text-secondary)',
                margin: '0',
                fontFamily: 'var(--font-ui)',
              }}
            >
              {caseType.federalLaw}
            </p>
          </div>

          {/* Typical Claims */}
          <div
            style={{
              background: 'var(--color-surface-0)',
              border: '1px solid var(--border-default)',
              borderRadius: '4px',
              padding: '24px',
              boxShadow: 'var(--shadow-xs)',
            }}
          >
            <h3
              style={{
                fontSize: '16px',
                fontWeight: 700,
                margin: '0 0 16px',
                fontFamily: 'var(--font-ui)',
                color: 'var(--color-text-primary)',
              }}
            >
              Typical Claims
            </h3>
            <ul
              style={{
                listStyle: 'none',
                padding: '0',
                margin: '0',
              }}
            >
              {caseType.typicalClaims.map((claim, idx) => (
                <li
                  key={idx}
                  style={{
                    paddingLeft: '24px',
                    marginBottom: idx < caseType.typicalClaims.length - 1 ? '10px' : '0',
                    position: 'relative',
                    color: 'var(--color-text-secondary)',
                    fontFamily: 'var(--font-ui)',
                  }}
                >
                  <span
                    style={{
                      position: 'absolute',
                      left: '0',
                      color: 'var(--accent-primary)',
                    }}
                  >
                    •
                  </span>
                  {claim}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* CTA Section */}
        <style>{`
          .cta-button {
            display: inline-block;
            padding: 8px 24px;
            border-radius: 4px;
            background: var(--gold);
            color: var(--chrome-text);
            text-decoration: none;
            font-weight: 600;
            font-size: 14px;
            letter-spacing: -0.005em;
            border: 1px solid var(--gold);
            box-shadow: inset 0 1px 0 rgba(255,255,255,0.08);
            font-family: var(--font-ui);
            transition: background-color 150ms ease, border-color 150ms ease;
          }
          .cta-button:hover {
            background-color: var(--gold);
            border-color: var(--gold);
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
            background: 'var(--accent-primary)',
            color: 'var(--color-text-inverse)',
            borderRadius: '4px',
            padding: '48px 40px',
            textAlign: 'center',
            boxShadow: 'var(--shadow-xs)',
          }}
        >
          <h2
            style={{
              fontSize: '28px',
              fontWeight: 700,
              margin: '0 0 12px',
              fontFamily: 'var(--font-ui)',
              color: 'var(--color-text-inverse)',
            }}
          >
            Research Your District
          </h2>
          <p
            style={{
              fontSize: '16px',
              margin: '0 0 28px',
              color: 'var(--border-default)',
              fontFamily: 'var(--font-ui)',
            }}
          >
            Get detailed case outcomes and win rates for your specific federal district
          </p>
          <Link
            href={`/report/${caseType.nosCode}`}
            className="cta-button"
          >
            View District Data
          </Link>
        </div>

        {/* Related Case Types */}
        <div style={{ marginTop: '60px' }}>
          <style>{`
            .related-case-card {
              padding: 16px;
              border-radius: 4px;
              background: var(--color-surface-0);
              border: 1px solid var(--border-default);
              text-decoration: none;
              color: inherit;
              transition: all 200ms ease;
              box-shadow: var(--shadow-xs);
            }
            .related-case-card:hover {
              border-color: var(--accent-primary);
              background: var(--color-surface-0);
              box-shadow: var(--shadow-md);
              transform: translateY(-1px);
            }
          `}</style>
          <h2
            style={{
              fontSize: '20px',
              fontWeight: 700,
              margin: '0 0 24px',
              fontFamily: 'var(--font-ui)',
              color: 'var(--color-text-primary)',
            }}
          >
            Related Case Types
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
              gap: '16px',
            }}
          >
            {getAllCaseTypeSEO()
              .filter(
                (ct) => ct.categorySlug === category && ct.nosCode === caseType.nosCode && ct.slug !== slug
              )
              .slice(0, 4)
              .map((related) => (
                <Link
                  key={`${related.categorySlug}-${related.slug}`}
                  href={`/cases/${related.categorySlug}/${related.slug}`}
                  className="related-case-card"
                >
                  <h3 style={{ fontSize: '14px', fontWeight: 700, margin: '0', color: 'var(--color-text-primary)', fontFamily: 'var(--font-ui)' }}>
                    {related.label}
                  </h3>
                  <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', margin: '4px 0 0', fontFamily: 'var(--font-ui)' }}>
                    NOS {related.nosCode}
                  </p>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
