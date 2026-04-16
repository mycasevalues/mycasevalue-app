import { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { DisclaimerFooter } from '@/components/ui/DisclaimerFooter';
import { SITE_URL } from '@/lib/site-config';

export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Academic Researchers Federal Court Data',
  description: 'Access 5.1 million federal case outcomes for empirical legal research. Searchable by district, case type, judge, outcome, and year. Built on public FJC, CourtListener, and RECAP data.',
  alternates: { canonical: `${SITE_URL}/for/researchers` },
  openGraph: {
    title: 'Federal Court Data for Academic Researchers',
    description: 'Comprehensive dataset of 5.1M federal cases with advanced filtering for empirical legal research. Built on public records.',
    type: 'website',
    url: `${SITE_URL}/for/researchers`,
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'Federal Court Data for Academic Researchers' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Federal Court Data for Academic Researchers',
    description: 'Comprehensive dataset of 5.1M federal cases with advanced filtering for empirical legal research. Built on public records.',
    images: [`${SITE_URL}/og-image.png`],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Researchers', item: `${SITE_URL}/for/researchers` },
      ],
    },
  ],
};

export default function ResearchersPage() {
  return (
    <div style={{ background: 'var(--color-surface-0)' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header with Breadcrumb */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <Breadcrumb />
      </div>

      {/* Hero Section */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 style={{ fontSize: '2.25rem', fontWeight: 600, lineHeight: 1.2, color: 'var(--color-text-primary)', marginBottom: '1.5rem' }}>
          The Most Comprehensive Federal Court Dataset — Ready for Citation
        </h1>

        <p style={{ fontSize: '1.125rem', lineHeight: 1.8, color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
          5.1 million federal civil cases with standardized variables, fully sourced from public records. Built on the FJC Integrated Database, CourtListener, and RECAP. Full transparency into methodology. Designed for empirical legal research that passes peer review.
        </p>

        {/* Feature Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2rem',
        }}>
          {[
            {
              title: 'Depth & Scale',
              description: '5.1M cases with consistent variables across 30+ years. Rich filtering by judge, district, case type, outcome, and temporal range. Export for analysis.',
            },
            {
              title: 'Academic Integrity',
              description: 'Every case sourced from official public records (FJC IDB, CourtListener, RECAP). Methodology is fully documented and auditable for peer review.',
            },
            {
              title: 'Ready to Cite',
              description: 'Transparent data sourcing means your research passes journal standards. Include exact citations to underlying federal records.',
            },
          ].map((feature, i) => (
            <div
              key={i}
              style={{
                padding: '1.5rem',
                border: '1px solid var(--border-default)',
                borderRadius: '12px',
                background: 'var(--color-surface-0)',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
              }}
            >
              <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '0.5rem' }}>
                {feature.title}
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div style={{ marginBottom: '3rem' }}>
          <Link
            href="/cases"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              backgroundColor: 'var(--accent-primary)',
              color: 'var(--color-surface-0)',
              textDecoration: 'none',
              fontSize: '0.875rem',
              fontWeight: 600,
              transition: 'all 300ms ease',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
            }}
            className="hover:opacity-90 hover:-translate-y-0.5"
          >
            Start Searching
          </Link>
        </div>
      </div>

      {/* Disclaimer Footer */}
      <div className="max-w-4xl mx-auto px-6">
        <DisclaimerFooter />
      </div>
    </div>
  );
}
