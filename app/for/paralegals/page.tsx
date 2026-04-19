import { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { DisclaimerFooter } from '@/components/ui/DisclaimerFooter';
import { SITE_URL } from '@/lib/site-config';

export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Paralegals Federal Court Data',
  description: 'Pull federal court outcome data in minutes. Judge analytics, district data, and case research tools for paralegals supporting attorneys.',
  alternates: { canonical: `${SITE_URL}/for/paralegals` },
  openGraph: {
    title: 'Federal Court Data for Paralegals',
    description: 'Research federal court outcomes quickly. Judge analytics, district trends, and data-driven insights to support your legal team.',
    type: 'website',
    url: `${SITE_URL}/for/paralegals`,
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'Federal Court Data for Paralegals' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Federal Court Data for Paralegals',
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
        <h1 style={{ fontSize: '28px', fontWeight: 700, fontFamily: 'var(--font-legal)', lineHeight: 1.2, color: 'var(--color-text-primary)', marginBottom: '1.5rem' }}>
          Cut Research Time in Half. Replace Manual Digging with Data-Backed Answers.
        </h1>

        <p style={{ fontSize: '1.125rem', lineHeight: 1.8, color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
          Spend less time on research tasks and more time supporting your attorneys. MyCaseValue gives you instant access to judge analytics, settlement data, and case outcomes. Get answers in minutes, not hours. Free your team to focus on higher-value work.
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
              title: 'Instant Research Results',
              description: 'Get answers in minutes instead of hours. Search by case type, district, judge, and outcome. No more manual PACER digging.',
            },
            {
              title: 'Judge Ruling Patterns',
              description: 'Show your attorneys exactly how judges rule on specific issues. Data-backed judge profiles save attorneys hours of pre-trial prep.',
            },
            {
              title: 'Reduce Billable Hours',
              description: 'Less time on research tasks means lower costs per case. Improve firm profitability while giving attorneys better intel faster.',
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
