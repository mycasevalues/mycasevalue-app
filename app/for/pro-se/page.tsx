import { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { DisclaimerFooter } from '@/components/ui/DisclaimerFooter';
import { SITE_URL } from '@/lib/site-config';

export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Pro Se Litigants Federal Court Data | MyCaseValues',
  description: 'Access federal court outcome data as a pro se litigant. Win rates, judge analytics, settlement ranges, and case timelines sourced from public records.',
  alternates: { canonical: `${SITE_URL}/for/pro-se` },
  openGraph: {
    title: 'Federal Court Data for Pro Se Litigants | MyCaseValues',
    description: 'Research real outcomes from federal cases. Get win rates, settlement ranges, and judge analytics — the same data attorneys use.',
    type: 'website',
    url: `${SITE_URL}/for/pro-se`,
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'Federal Court Data for Pro Se Litigants' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Federal Court Data for Pro Se Litigants | MyCaseValues',
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
          Federal Court Data for Pro Se Litigants
        </h1>

        <p style={{ fontSize: '1.125rem', lineHeight: 1.8, color: '#4B5563', marginBottom: '2rem' }}>
          Representing yourself in federal court is challenging enough without having to guess at outcomes. MyCaseValues gives you access to the same federal court outcome data that attorneys use — win rates, settlement ranges, judge analytics, and case timelines — sourced from public records and presented in plain language.
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
              title: 'Case Outcome Data',
              description: 'Win rates, timelines by case type, and settlement statistics from 5.1M+ real federal cases.',
            },
            {
              title: 'Judge Analytics',
              description: 'Research how your judge rules on similar cases. See ruling patterns and decision tendencies.',
            },
            {
              title: 'District Comparisons',
              description: 'Understand local trends in your federal district. Compare outcomes across districts.',
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
            onMouseEnter={(e) => {
              (e.target as HTMLAnchorElement).style.backgroundColor = '#005AA8';
              (e.target as HTMLAnchorElement).style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLAnchorElement).style.backgroundColor = '#0966C3';
              (e.target as HTMLAnchorElement).style.transform = 'translateY(0)';
            }}
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
