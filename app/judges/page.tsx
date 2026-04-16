import { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL } from '../../lib/site-config';
import { getJudges } from '../../lib/judge-data-service';
import JudgeDirectoryClient from '../../components/JudgeDirectoryClient';
import dynamic from 'next/dynamic';

const JudgeRadarPreview = dynamic(() => import('../../components/JudgeRadarPreview'), {
  ssr: false,
  loading: () => (
    <div style={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888888', fontFamily: 'var(--font-inter)', fontSize: 14 }}>
      Loading radar preview…
    </div>
  ),
});

export const revalidate = 3600; // Revalidate every hour

export const metadata: Metadata = {
  title: 'Judge Intelligence — Federal Court Analytics',
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
    <div style={{ background: '#F7F7F5', minHeight: '100vh' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Header */}
      <div style={{
        borderBottom: '1px solid #E8E8E8',
        background: '#FFFFFF',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div aria-hidden style={{
          position: 'absolute', inset: 0, opacity: 0.03, pointerEvents: 'none',
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', position: 'relative' }}>
          {/* Breadcrumb */}
          <div style={{ paddingTop: 14, display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, fontFamily: 'var(--font-mono)', letterSpacing: '0.02em' }}>
            <Link href="/" style={{ color: '#888888', textDecoration: 'none' }}>Home</Link>
            <span style={{ color: '#CCCCCC' }}>/</span>
            <span style={{ color: '#1A1A1A' }}>Judges</span>
          </div>

          <div style={{ paddingTop: 24, paddingBottom: 28 }}>
            {/* Eyebrow */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '4px 10px', marginBottom: 14,
              borderRadius: 999,
              border: '1px solid rgba(59,130,246,0.2)',
              background: 'rgba(59,130,246,0.08)',
              fontFamily: 'var(--font-mono)', fontSize: 10,
              fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase',
              color: '#60a5fa',
            }}>
              <span className="animate-pulse" style={{ width: 4, height: 4, borderRadius: '50%', background: '#22c55e' }} />
              Judge Intelligence
            </div>

            <h1 style={{
              fontSize: 'clamp(28px, 4vw, 36px)', fontWeight: 700, marginBottom: 10,
              color: '#1A1A1A', letterSpacing: '-0.025em', fontFamily: 'var(--font-inter)', lineHeight: 1.1,
            }}>
              Federal Judge Analytics
            </h1>

            <p style={{
              fontSize: 15, lineHeight: 1.65, maxWidth: 640,
              color: '#666666', fontFamily: 'var(--font-inter)',
            }}>
              Ruling patterns, case duration, and outcome tendencies across all 95 federal districts. Data from 5.1M+ public federal cases.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '32px 24px 48px' }}>
        {/* Judge Directory Client Component */}
        <JudgeDirectoryClient initialJudges={initialJudges} initialTotal={initialTotal} />

        {/* Beta Notice with Radar Preview */}
        <section style={{ padding: '40px 32px', borderRadius: 6, border: '1px solid #E0E0E0', background: '#FFFFFF', marginBottom: 48, marginTop: 48, position: 'relative' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '3px 8px', marginBottom: 12,
            borderRadius: 3, background: 'rgba(59,130,246,0.08)',
            border: '1px solid rgba(59,130,246,0.15)',
            fontFamily: 'var(--font-mono)', fontSize: 9,
            fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase',
            color: '#60a5fa',
          }}>
            Advanced Metrics
          </div>
          <h2 style={{ fontSize: 22, fontWeight: 600, color: '#1A1A1A', fontFamily: 'var(--font-inter)', marginBottom: 10, letterSpacing: '-0.02em' }}>
            Analytics Radar — Multi-dimensional Profiles
          </h2>
          <p style={{ fontSize: 13, color: '#444444', fontFamily: 'var(--font-inter)', maxWidth: 680, margin: '0 0 28px', lineHeight: 1.65 }}>
            Explore detailed judge profiles with motion grant rates, settlement patterns, and disposition metrics derived from PACER and FJC records.
          </p>

          {/* Radar chart preview */}
          <JudgeRadarPreview />
        </section>

        {/* Disclaimer */}
        <div style={{ padding: '20px 24px', border: '1px solid #E0E0E0', borderLeft: '3px solid rgba(0,82,204,0.3)', borderRadius: 6, background: '#FFFFFF' }}>
          <h3 style={{ fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.2em', color: '#0052CC', fontFamily: 'var(--font-mono)', marginBottom: 10 }}>
            Data Methodology
          </h3>
          <p style={{ fontSize: 12, lineHeight: 1.7, color: '#444444', fontFamily: 'var(--font-inter)', margin: 0 }}>
            Judge analytics are derived from publicly available federal court records and PACER data. Metrics include motion grant rates, case duration, win rates, and settlement patterns. Data is updated periodically and covers active Article III judges in the 95 federal judicial districts. MyCaseValue LLC is not a law firm and does not provide legal advice.
          </p>
        </div>
      </div>
    </div>
  );
}
