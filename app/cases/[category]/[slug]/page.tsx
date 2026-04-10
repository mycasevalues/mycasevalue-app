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
      title: 'Case Type Not Found — MyCaseValue',
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
        padding: '20px',
        borderRadius: '12px',
        background: '#FFFFFF',
        border: '1px solid #E5E7EB',
        textAlign: 'center',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)',
      }}
    >
      <p style={{ color: '#4B5563', fontSize: '14px', margin: '0 0 8px', fontFamily: 'var(--font-body)' }}>
        {label}
      </p>
      <p
        style={{
          fontSize: '28px',
          fontWeight: 'bold',
          color: '#0966C3',
          margin: '0',
          fontFamily: 'var(--font-data)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
        }}
      >
        {value}
        {shouldShowDot && (
          <span title={`Based on ${casesCount.toLocaleString()} cases — ${casesCount >= 10000 ? 'High' : casesCount >= 1000 ? 'Medium' : casesCount >= 100 ? 'Low' : 'Insufficient'} confidence`} style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', backgroundColor: casesCount >= 10000 ? '#057642' : casesCount >= 1000 ? '#C37D16' : casesCount >= 100 ? '#CC1016' : '#999999' }} />
        )}
      </p>
      {subtitle && (
        <p style={{ color: '#4B5563', fontSize: '12px', margin: '6px 0 0', fontFamily: 'var(--font-body)' }}>
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
        style={{ background: '#F7F8FA' }}
      >
        <div style={{ textAlign: 'center', color: '#0f0f0f' }}>
          <h1 style={{ fontSize: '28px', fontWeight: 'bold', margin: '0 0 16px', fontFamily: 'var(--font-display)', color: '#0f0f0f' }}>
            Case type not found
          </h1>
          <p style={{ color: '#4B5563', margin: '0 0 24px', fontFamily: 'var(--font-body)' }}>
            This case type does not exist in our database.
          </p>
          <Link
            href={`/cases/${category}`}
            style={{
              display: 'inline-block',
              padding: '12px 32px',
              borderRadius: '12px',
              background: '#0966C3',
              color: 'white',
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: '14px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
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
    <div style={{ background: '#F7F8FA', color: '#0f0f0f' }}>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Dark Navy Header Section */}
      <header
        style={{
          background: '#0966C3',
          padding: 'clamp(20px, 4vw, 40px) 24px',
          marginBottom: 'clamp(20px, 4vw, 40px)',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* Breadcrumb */}
          <nav style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', gap: '8px', fontSize: '14px', alignItems: 'center', flexWrap: 'wrap' }}>
              <Link href="/" style={{ color: '#FFFFFF', textDecoration: 'none' }}>
                Home
              </Link>
              <span style={{ color: '#E5E7EB' }}>&gt;</span>
              <Link
                href="/cases"
                style={{ color: '#FFFFFF', textDecoration: 'none' }}
              >
                Cases
              </Link>
              <span style={{ color: '#E5E7EB' }}>&gt;</span>
              <Link
                href={`/cases/${category}`}
                style={{ color: '#FFFFFF', textDecoration: 'none' }}
              >
                {getCategoryLabel(category)}
              </Link>
              <span style={{ color: '#E5E7EB' }}>&gt;</span>
              <span style={{ color: '#E5E7EB' }}>{caseType.label}</span>
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
                  color: '#FFFFFF',
                }}
              >
                {caseType.label}
              </h1>
              <p
                style={{
                  fontSize: '16px',
                  color: '#E5E7EB',
                  margin: '0',
                  fontFamily: 'var(--font-body)',
                }}
              >
                Federal Court Outcomes & Win Rates
              </p>
            </div>
            <span
              style={{
                display: 'inline-block',
                padding: '8px 16px',
                borderRadius: '12px',
                background: '#0966C3',
                fontSize: '12px',
                fontWeight: '600',
                color: '#FFFFFF',
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
          <StatsCard label="Win Rate" value={`${winRate}%`} subtitle="Favorable outcomes" casesCount={data?.total} />
          <StatsCard label="Settlement Rate" value={`${settlementRate}%`} subtitle="Resolved pre-trial" />
          <StatsCard label="Median Duration" value={`${medianMonths} mo`} subtitle="Time to resolution" />
          <StatsCard label="Median Recovery" value={medianRecovery} subtitle="Successful cases" />
          <StatsCard label="Total Cases" value={totalCases} subtitle="Federal courts analyzed" />
        </div>

        {/* Description Section */}
        <div
          style={{
            background: '#FFFFFF',
            border: '1px solid #E5E7EB',
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
              color: '#0f0f0f',
            }}
          >
            About {caseType.label}
          </h2>
          <p
            style={{
              lineHeight: '1.6',
              color: '#4B5563',
              margin: '0',
              fontFamily: 'var(--font-body)',
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
            marginBottom: '40px',
          }}
        >
          {/* Federal Law */}
          <div
            style={{
              background: '#FFFFFF',
              border: '1px solid #E5E7EB',
              borderRadius: '12px',
              padding: '24px',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)',
            }}
          >
            <h3
              style={{
                fontSize: '16px',
                fontWeight: 'bold',
                margin: '0 0 16px',
                fontFamily: 'var(--font-display)',
                color: '#0f0f0f',
              }}
            >
              Governing Federal Law
            </h3>
            <p
              style={{
                fontSize: '15px',
                color: '#4B5563',
                margin: '0',
                fontFamily: 'var(--font-body)',
              }}
            >
              {caseType.federalLaw}
            </p>
          </div>

          {/* Typical Claims */}
          <div
            style={{
              background: '#FFFFFF',
              border: '1px solid #E5E7EB',
              borderRadius: '12px',
              padding: '24px',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)',
            }}
          >
            <h3
              style={{
                fontSize: '16px',
                fontWeight: 'bold',
                margin: '0 0 16px',
                fontFamily: 'var(--font-display)',
                color: '#0f0f0f',
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
                    paddingLeft: '20px',
                    marginBottom: idx < caseType.typicalClaims.length - 1 ? '10px' : '0',
                    position: 'relative',
                    color: '#4B5563',
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  <span
                    style={{
                      position: 'absolute',
                      left: '0',
                      color: '#0966C3',
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
            padding: 14px 36px;
            border-radius: 12px;
            background: #0966C3;
            color: white;
            text-decoration: none;
            font-weight: 600;
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            transition: background-color 0.2s ease, transform 0.2s ease;
          }
          .cta-button:hover {
            background-color: #c41218;
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
            background: '#0966C3',
            color: '#FFFFFF',
            borderRadius: '12px',
            padding: '48px 40px',
            textAlign: 'center',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          }}
        >
          <h2
            style={{
              fontSize: '28px',
              fontWeight: 'bold',
              margin: '0 0 12px',
              fontFamily: 'var(--font-display)',
              color: '#FFFFFF',
            }}
          >
            Research Your District
          </h2>
          <p
            style={{
              fontSize: '16px',
              margin: '0 0 28px',
              color: '#E5E7EB',
              fontFamily: 'var(--font-body)',
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
              border-radius: 12px;
              background: #FFFFFF;
              border: 1px solid #E5E7EB;
              text-decoration: none;
              color: inherit;
              transition: all 0.2s ease;
              box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
            }
            .related-case-card:hover {
              border-color: #0966C3;
              background: #FFFFFF;
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.12);
              transform: translateY(-1px);
            }
          `}</style>
          <h2
            style={{
              fontSize: '20px',
              fontWeight: 'bold',
              margin: '0 0 24px',
              fontFamily: 'var(--font-display)',
              color: '#0f0f0f',
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
                  <h3 style={{ fontSize: '14px', fontWeight: 'bold', margin: '0', color: '#0f0f0f', fontFamily: 'var(--font-display)' }}>
                    {related.label}
                  </h3>
                  <p style={{ fontSize: '12px', color: '#4B5563', margin: '4px 0 0', fontFamily: 'var(--font-body)' }}>
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
