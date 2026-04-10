import { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { DisclaimerFooter } from '@/components/ui/DisclaimerFooter';
import { SITE_URL } from '@/lib/site-config';

export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Law Students Federal Court Data',
  description: 'Research real federal court outcomes for law school. Win rates, judge analytics, case timelines, and real-world data for moot court and law review research.',
  alternates: { canonical: `${SITE_URL}/for/students` },
  openGraph: {
    title: 'Federal Court Data for Law Students | MyCaseValue',
    description: 'Go beyond the casebook. Research real federal court outcomes for moot court prep, law review, and understanding court patterns.',
    type: 'website',
    url: `${SITE_URL}/for/students`,
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'Federal Court Data for Law Students' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Federal Court Data for Law Students | MyCaseValue',
    description: 'Go beyond the casebook. Research real federal court outcomes for moot court prep, law review, and understanding court patterns.',
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
        { '@type': 'ListItem', position: 2, name: 'Students', item: `${SITE_URL}/for/students` },
      ],
    },
  ],
};

export default function StudentsPage() {
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
          Federal Court Data for Law Students
        </h1>

        <p style={{ fontSize: '1.125rem', lineHeight: 1.8, color: '#4B5563', marginBottom: '2rem' }}>
          Go beyond the casebook. Research how courts actually rule on the issues you're studying — real win rates, real timelines, real outcomes. Use MyCaseValue for moot court prep, law review research, and understanding federal court patterns.
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
              title: 'Real Outcome Data',
              description: 'See how federal courts actually decide cases like the ones you study. Win rates and settlement data from real cases.',
            },
            {
              title: 'Judge Research',
              description: 'Understand judge decision-making patterns. Analyze how individual judges rule on specific legal issues.',
            },
            {
              title: 'Case Type Analysis',
              description: 'Explore trends across federal case types. Understand patterns in litigation outcomes.',
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
