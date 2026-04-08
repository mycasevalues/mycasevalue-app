import { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { DisclaimerFooter } from '@/components/ui/DisclaimerFooter';
import { SITE_URL } from '@/lib/site-config';

export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Paralegals Federal Court Data | MyCaseValues',
  description: 'Pull federal court outcome data in minutes. Judge analytics, district data, and case research tools for paralegals supporting attorneys.',
  alternates: { canonical: `${SITE_URL}/for/paralegals` },
  openGraph: {
    title: 'Federal Court Data for Paralegals | MyCaseValues',
    description: 'Research federal court outcomes quickly. Judge analytics, district trends, and data-driven insights to support your legal team.',
    type: 'website',
    url: `${SITE_URL}/for/paralegals`,
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'Federal Court Data for Paralegals' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Federal Court Data for Paralegals | MyCaseValues',
    description: 'Research federal court outcomes quickly. Judge analytics, district trends, and data-driven insights to support your legal team.',
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
        { '@type': 'ListItem', position: 2, name: 'Paralegals', item: `${SITE_URL}/for/paralegals` },
      ],
    },
  ],
};

export default function ParalegalsPage() {
  return (
    <div style={{ background: '#FFFFFF' }}>
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
        <h1 style={{ fontSize: '2.25rem', fontWeight: 600, lineHeight: 1.2, color: '#0f0f0f', marginBottom: '1.5rem' }}>
          Federal Court Data for Paralegals
        </h1>

        <p style={{ fontSize: '1.125rem', lineHeight: 1.8, color: '#4B5563', marginBottom: '2rem' }}>
          Pull federal court outcome data in minutes instead of hours. MyCaseValues lets you research judge analytics, filter by district and case type, and support your attorneys with data-driven insights — all from public records.
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
              title: 'Quick Research',
              description: 'Find federal court data in minutes. Search by case type, district, and outcome for instant case insights.',
            },
            {
              title: 'Judge Analytics',
              description: 'Analyze judge ruling patterns and tendencies. Support your legal strategy with data on judicial behavior.',
            },
            {
              title: 'District Data',
              description: 'Understand local court trends and patterns. Compare outcomes across federal districts and case types.',
            },
          ].map((feature, i) => (
            <div
              key={i}
              style={{
                padding: '1.5rem',
                border: '1px solid #E5E7EB',
                borderRadius: '12px',
                background: '#FFFFFF',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
              }}
            >
              <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#0f0f0f', marginBottom: '0.5rem' }}>
                {feature.title}
              </h3>
              <p style={{ fontSize: '0.875rem', color: '#4B5563', lineHeight: 1.6 }}>
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
              backgroundColor: '#0966C3',
              color: '#FFFFFF',
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
