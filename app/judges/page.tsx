import { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL } from '../../lib/site-config';
import { getJudges } from '../../lib/judge-data-service';
import JudgeDirectoryClient from '../../components/JudgeDirectoryClient';
import dynamic from 'next/dynamic';

const JudgeRadarPreview = dynamic(() => import('../../components/JudgeRadarPreview'), {
  ssr: false,
  loading: () => (
    <div style={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-muted)', fontFamily: 'var(--font-body)', fontSize: 14 }}>
      Loading radar preview…
    </div>
  ),
});

export const revalidate = 3600; // Revalidate every hour

export const metadata: Metadata = {
  title: 'Judge Intelligence',
  description: 'Research federal judges across 95 districts. Win rates, motion rates, settlement patterns, case duration. Data from 5.1M+ federal cases.',
  alternates: { canonical: `${SITE_URL}/judges` },
  openGraph: {
    title: 'Judge Intelligence — Statistics & Analytics',
    description: 'Research federal judges across all 13 circuits and 95 districts with comprehensive analytics.',
    type: 'website',
    url: `${SITE_URL}/judges`,
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'Judge Intelligence - MyCaseValue' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Judge Intelligence — Statistics & Analytics',
    description: 'Research federal judges across 95 districts with comprehensive statistics. Compare win rates, motion grant rates, settlement patterns, and case duration for 5.1M+ cases.',
    images: [`${SITE_URL}/og-image.png`],
  },
};

export default async function JudgesPage() {
  // Pre-fetch initial 24 judges server-side for instant first paint
  let initialJudges: Awaited<ReturnType<typeof getJudges>>['judges'] = [];
  let initialTotal = 0;
  try {
    const result = await getJudges({ limit: 24, sortBy: 'name', order: 'asc' });
    initialJudges = result.judges;
    initialTotal = result.total;
  } catch (err) {
    console.error('Failed to pre-fetch judges:', err);
  }


  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Judges', item: `${SITE_URL}/judges` },
        ],
      },
      {
        '@type': 'CollectionPage',
        name: 'Federal Judge Analytics',
        description: 'Explore detailed analytics for federal judges including case outcomes, ruling patterns, and settlement statistics.',
        url: `${SITE_URL}/judges`,
        isPartOf: { '@type': 'WebSite', name: 'MyCaseValue', url: SITE_URL },
      },
    ],
  };

  return (
    <div style={{ background: 'var(--color-surface-1)', minHeight: '100vh' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Header */}
      <div style={{ borderBottom: '1px solid var(--border-default)', background: 'var(--gradient-hero)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
          {/* Breadcrumb */}
          <div style={{ paddingTop: 12, display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, fontFamily: 'var(--font-body)' }}>
            <Link href="/" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>Home</Link>
            <span style={{ color: 'rgba(255,255,255,0.4)' }}>/</span>
            <span style={{ color: 'var(--color-text-inverse)' }}>Judges</span>
          </div>

          <div style={{ paddingTop: 16, paddingBottom: 20 }}>
            <h1 style={{
              fontSize: 'clamp(22px, 3vw, 28px)', fontWeight: 900, marginBottom: 8,
              color: 'var(--color-text-inverse)', letterSpacing: '-1.5px', fontFamily: 'var(--font-display)', lineHeight: 1.2,
            }}>
              Judge Intelligence
            </h1>

            <p style={{
              fontSize: 14, lineHeight: 1.5, maxWidth: 640,
              color: '#C7D1D8', fontFamily: 'var(--font-body)',
            }}>
              Ruling patterns, case duration, and outcome tendencies across 95 federal districts.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '32px 24px 48px' }}>
        {/* Judge Directory Client Component */}
        <JudgeDirectoryClient initialJudges={initialJudges} initialTotal={initialTotal} />

        {/* Beta Notice with Radar Preview */}
        <section style={{ padding: '48px 32px', borderRadius: 8, border: '1px solid var(--border-default)', background: 'var(--color-surface-1)', marginBottom: 64, marginTop: 64 }}>
          <h2 style={{ fontSize: 24, fontWeight: 600, color: 'var(--color-text-primary)', fontFamily: 'var(--font-display)', marginBottom: 12 }}>
            Judge Analytics — Advanced Profile Metrics
          </h2>
          <p style={{ fontSize: 15, color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)', maxWidth: 680, margin: '0 0 28px', lineHeight: 1.6 }}>
            Explore detailed judge profiles with additional metrics derived from PACER and FJC records. Preview the analytics radar below.
          </p>

          {/* Radar chart preview */}
          <JudgeRadarPreview />
        </section>

        {/* Disclaimer */}
        <div style={{ padding: 24, border: '1px solid var(--border-default)', borderRadius: 8, background: 'var(--color-surface-0)' }}>
          <h3 style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.8px', color: 'var(--color-text-primary)', fontFamily: 'var(--font-display)', marginBottom: 8 }}>
            Data Methodology
          </h3>
          <p style={{ fontSize: 12, lineHeight: 1.6, color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)', margin: 0 }}>
            Judge analytics are derived from publicly available federal court records and PACER data. Metrics include motion grant rates, case duration, win rates, and settlement patterns. Data is updated periodically and covers active Article III judges in the 95 federal judicial districts. MyCaseValue LLC is not a law firm and does not provide legal advice.
          </p>
        </div>
      </div>
    </div>
  );
}
