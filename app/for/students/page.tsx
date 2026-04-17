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
    title: 'Federal Court Data for Law Students',
    description: 'Go beyond the casebook. Research real federal court outcomes for moot court prep, law review, and understanding court patterns.',
    type: 'website',
    url: `${SITE_URL}/for/students`,
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'Federal Court Data for Law Students' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Federal Court Data for Law Students',
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
          From Casebooks to Real Cases — Free Access to Real Federal Court Data
        </h1>

        <p style={{ fontSize: '1.125rem', lineHeight: 1.8, color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
          Stop studying cases in a vacuum. See how federal courts actually rule on the issues you're learning. Research real win rates, real settlement patterns, real judge behavior. Free access for all law students. Perfect for moot court, law review, and understanding how the law actually works.
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
              title: 'Learn from Real Cases',
              description: 'See how federal courts actually rule on the topics in your classes. Win rates, timelines, and outcomes from 5.1M real federal cases.',
            },
            {
              title: 'Smarter Moot Court Prep',
              description: 'Research actual judge behavior and preferences. Make data-backed arguments instead of guessing how judges rule.',
            },
            {
              title: 'Free Legal Education',
              description: 'Full access at no cost while you\'re in law school. No subscriptions. No limits. Everything you need to understand real federal litigation.',
            },
          ].map((feature, i) => (
            <div
              key={i}
              style={{
                padding: '1.5rem',
                border: '1px solid var(--border-default)',
                borderRadius: '6px',
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
              borderRadius: '4px',
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
