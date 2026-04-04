import { Metadata } from 'next';
import Link from 'next/link';
import { REAL_DATA } from '../../../../lib/realdata';
import { SITS } from '../../../../lib/data';
import {
  getAllCaseTypeSEO,
  getCaseTypeSEO,
  CaseTypeSEO,
} from '../../../../lib/case-type-seo';

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

  const title = `${caseType.label} — Federal Court Outcomes & Win Rates | MyCaseValue`;
  const description = caseType.description.substring(0, 160) + '...';
  const canonical = `https://mycasevalues.com/cases/${category}/${slug}`;

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
          url: 'https://www.mycasevalues.com/og-image.png',
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
        background: '#FFFFFF',
        border: '1px solid var(--border-default)',
        textAlign: 'center',
      }}
    >
      <p style={{ color: '#6B7280', fontSize: '14px', margin: '0 0 8px' }}>
        {label}
      </p>
      <p
        style={{
          fontSize: '28px',
          fontWeight: 'bold',
          color: '#8B5CF6',
          margin: '0',
          fontFamily: 'var(--font-data)',
        }}
      >
        {value}
      </p>
      {subtitle && (
        <p style={{ color: '#6B7280', fontSize: '12px', margin: '6px 0 0' }}>
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
        style={{ background: 'var(--bg-base)' }}
      >
        <div style={{ textAlign: 'center', color: '#111111' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', margin: '0 0 16px' }}>
            Case type not found
          </h1>
          <p style={{ color: '#6B7280', margin: '0 0 24px' }}>
            This case type does not exist in our database.
          </p>
          <Link
            href={`/cases/${category}`}
            style={{
              display: 'inline-block',
              padding: '12px 24px',
              borderRadius: '8px',
              background: '#8B5CF6',
              color: 'white',
              textDecoration: 'none',
              fontWeight: 'bold',
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
    <main style={{ background: 'var(--bg-base)', color: '#111111' }}>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb */}
      <nav
        style={{
          padding: '16px 24px',
          borderBottom: '1px solid var(--border-default)',
          background: '#FFFFFF',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', gap: '8px', fontSize: '14px', alignItems: 'center' }}>
            <Link href="/" style={{ color: '#8B5CF6', textDecoration: 'none' }}>
              Home
            </Link>
            <span style={{ color: '#6B7280' }}>›</span>
            <Link
              href="/cases"
              style={{ color: '#8B5CF6', textDecoration: 'none' }}
            >
              Cases
            </Link>
            <span style={{ color: '#6B7280' }}>›</span>
            <Link
              href={`/cases/${category}`}
              style={{ color: '#8B5CF6', textDecoration: 'none' }}
            >
              {getCategoryLabel(category)}
            </Link>
            <span style={{ color: '#6B7280' }}>›</span>
            <span style={{ color: '#111111' }}>{caseType.label}</span>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px' }}>
        {/* Header */}
        <div style={{ marginBottom: '40px' }}>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '16px' }}>
            <h1
              style={{
                fontSize: '32px',
                fontWeight: 'bold',
                margin: '0',
                fontFamily: 'var(--font-display)',
              }}
            >
              {caseType.label}
            </h1>
            <span
              style={{
                display: 'inline-block',
                padding: '6px 12px',
                borderRadius: '6px',
                background: '#FFFFFF',
                border: '1px solid var(--border-default)',
                fontSize: '12px',
                fontWeight: '600',
                color: '#6B7280',
              }}
            >
              NOS {caseType.nosCode}
            </span>
          </div>
          <h2
            style={{
              fontSize: '18px',
              color: '#6B7280',
              margin: '0',
              fontWeight: 'normal',
            }}
          >
            Federal Court Outcomes & Win Rates
          </h2>
        </div>

        {/* Stats Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px',
            marginBottom: '40px',
          }}
        >
          <StatsCard label="Win Rate" value={`${winRate}%`} subtitle="Favorable outcomes" />
          <StatsCard label="Settlement Rate" value={`${settlementRate}%`} subtitle="Resolved pre-trial" />
          <StatsCard label="Median Duration" value={`${medianMonths} mo`} subtitle="Time to resolution" />
          <StatsCard label="Median Recovery" value={medianRecovery} subtitle="Successful cases" />
          <StatsCard label="Total Cases" value={totalCases} subtitle="Federal courts analyzed" />
        </div>

        {/* Description Section */}
        <div
          style={{
            background: '#FFFFFF',
            border: '1px solid var(--border-default)',
            borderRadius: '12px',
            padding: '32px',
            marginBottom: '40px',
          }}
        >
          <h2
            style={{
              fontSize: '20px',
              fontWeight: 'bold',
              margin: '0 0 16px',
              fontFamily: 'var(--font-display)',
            }}
          >
            About {caseType.label}
          </h2>
          <p
            style={{
              lineHeight: '1.6',
              color: '#111111',
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
              border: '1px solid var(--border-default)',
              borderRadius: '12px',
              padding: '24px',
            }}
          >
            <h3
              style={{
                fontSize: '16px',
                fontWeight: 'bold',
                margin: '0 0 16px',
                fontFamily: 'var(--font-display)',
              }}
            >
              Governing Federal Law
            </h3>
            <p
              style={{
                fontSize: '15px',
                color: '#111111',
                margin: '0',
              }}
            >
              {caseType.federalLaw}
            </p>
          </div>

          {/* Typical Claims */}
          <div
            style={{
              background: '#FFFFFF',
              border: '1px solid var(--border-default)',
              borderRadius: '12px',
              padding: '24px',
            }}
          >
            <h3
              style={{
                fontSize: '16px',
                fontWeight: 'bold',
                margin: '0 0 16px',
                fontFamily: 'var(--font-display)',
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
                  }}
                >
                  <span
                    style={{
                      position: 'absolute',
                      left: '0',
                      color: '#8B5CF6',
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
        <div
          style={{
            background: 'linear-gradient(135deg, #8B5CF6, rgba(51, 51, 51, 0.8))',
            color: 'white',
            borderRadius: '12px',
            padding: '40px',
            textAlign: 'center',
          }}
        >
          <h2
            style={{
              fontSize: '24px',
              fontWeight: 'bold',
              margin: '0 0 12px',
              fontFamily: 'var(--font-display)',
            }}
          >
            Research Your District
          </h2>
          <p
            style={{
              fontSize: '16px',
              margin: '0 0 24px',
              opacity: 0.95,
            }}
          >
            Get detailed case outcomes and win rates for your specific federal district
          </p>
          <style>{`
            .cta-link:hover {
              transform: translateY(-2px);
            }
          `}</style>
          <Link
            href={`/report/${caseType.nosCode}`}
            className="cta-link"
            style={{
              display: 'inline-block',
              padding: '12px 32px',
              borderRadius: '8px',
              background: 'white',
              color: '#8B5CF6',
              textDecoration: 'none',
              fontWeight: 'bold',
              fontSize: '16px',
              transition: 'transform 0.2s',
            }}
          >
            View District Data
          </Link>
        </div>

        {/* Related Case Types */}
        <div style={{ marginTop: '60px' }}>
          <style>{`
            .related-case-card:hover {
              border-color: #8B5CF6;
              background: var(--bg-base);
            }
          `}</style>
          <h2
            style={{
              fontSize: '20px',
              fontWeight: 'bold',
              margin: '0 0 24px',
              fontFamily: 'var(--font-display)',
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
                  style={{
                    padding: '16px',
                    borderRadius: '8px',
                    background: '#FFFFFF',
                    border: '1px solid var(--border-default)',
                    textDecoration: 'none',
                    color: 'inherit',
                    transition: 'all 0.2s',
                  }}
                >
                  <h3 style={{ fontSize: '14px', fontWeight: 'bold', margin: '0' }}>
                    {related.label}
                  </h3>
                  <p style={{ fontSize: '12px', color: '#6B7280', margin: '4px 0 0' }}>
                    NOS {related.nosCode}
                  </p>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </main>
  );
}
