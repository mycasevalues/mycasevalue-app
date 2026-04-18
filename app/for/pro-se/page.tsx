import { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { DisclaimerFooter } from '@/components/ui/DisclaimerFooter';
import { SITE_URL } from '@/lib/site-config';

export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Federal Court Data for Pro Se Litigants',
  description: 'Research federal court outcomes as a pro se litigant. Win rates, judge analytics, settlement ranges, timelines. Free to start.',
  alternates: { canonical: `${SITE_URL}/for/pro-se` },
  openGraph: {
    title: 'Federal Court Data for Pro Se Litigants',
    description: 'Research real outcomes from federal cases. Get win rates, settlement ranges, and judge analytics — the same data attorneys use.',
    type: 'website',
    url: `${SITE_URL}/for/pro-se`,
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'Federal Court Data for Pro Se Litigants' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Federal Court Data for Pro Se Litigants',
    description: 'Research real outcomes from federal cases. Get win rates, settlement ranges, and judge analytics — the same data attorneys use.',
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
        { '@type': 'ListItem', position: 2, name: 'Pro Se Litigants', item: `${SITE_URL}/for/pro-se` },
      ],
    },
  ],
};

export default function ProSeLitigantsPage() {
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
        <h1 style={{ fontSize: '2.25rem', fontWeight: 700, lineHeight: 1.2, color: 'var(--color-text-primary)', marginBottom: '1.5rem' }}>
          The Data Attorneys Use, Made Accessible to Everyone
        </h1>

        <p style={{ fontSize: '1.125rem', lineHeight: 1.8, color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
          Navigating federal litigation without counsel need not mean navigating without data. MyCaseValue provides access to the same federal court outcome data that attorneys use to evaluate cases — actual win rates, settlement patterns, judge tendencies, and case timelines. All sourced from public records and presented in accessible language.
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
              description: 'See actual win rates and settlement patterns from cases like yours. Understand what happens in your district with your case type.',
            },
            {
              title: 'Know Your Judge',
              description: 'Research how your specific judge rules on similar cases. See what decisions they tend to make and what outcomes litigants get.',
            },
            {
              title: 'Plain Language Analysis',
              description: 'No legal jargon. No subscriptions. Everything explained in terms you can understand and use.',
            },
          ].map((feature, i) => (
            <div
              key={i}
              style={{
                padding: '1.5rem',
                border: '1px solid var(--border-default)',
                borderRadius: '4px',
                background: 'var(--color-surface-0)',
                boxShadow: 'var(--shadow-xs)',
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
              letterSpacing: '0.5px',
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
