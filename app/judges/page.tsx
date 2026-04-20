import { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL } from '../../lib/site-config';
import { getJudges } from '../../lib/judge-data-service';
import JudgeDirectoryClient from '../../components/JudgeDirectoryClient';
import JsonLd from '../../components/JsonLd';
import dynamic from 'next/dynamic';

const JudgeRadarPreview = dynamic(() => import('../../components/JudgeRadarPreview'), {
  ssr: false,
  loading: () => (
    <div style={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text4)', fontFamily: 'var(--font-ui)', fontSize: 14 }}>
      Loading radar preview…
    </div>
  ),
});

export const revalidate = 3600; // Revalidate every hour

export const metadata: Metadata = {
  title: 'Judge Intelligence — Federal Court Analytics',
  description: 'Research federal judges across 94 districts. Win rates, motion rates, settlement patterns, case duration. Data from 5.1M+ federal cases.',
  alternates: { canonical: `${SITE_URL}/judges` },
  openGraph: {
    title: 'Judge Intelligence — Statistics & Analytics',
    description: 'Research federal judges across all 13 circuits and 94 districts with comprehensive analytics.',
    type: 'website',
    url: `${SITE_URL}/judges`,
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'Judge Intelligence - MyCaseValue' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Judge Intelligence — Statistics & Analytics',
    description: 'Research federal judges across 94 districts with comprehensive statistics. Compare win rates, motion grant rates, settlement patterns, and case duration for 5.1M+ cases.',
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
    <div style={{ background: 'var(--surf, #F6F5F2)', minHeight: '100vh' }}>
      <JsonLd data={jsonLd} />
      {/* Header */}
      <div style={{
        borderBottom: '1px solid var(--bdr)',
        background: 'var(--card)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', position: 'relative' }}>
          {/* Breadcrumb */}
          <div style={{ paddingTop: 12, display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, fontFamily: 'var(--font-ui)' }}>
            <Link href="/" style={{ color: 'var(--text3, #4A4940)', textDecoration: 'none' }}>Home</Link>
            <span style={{ color: 'var(--bdr-strong, #C8C4B8)' }}>›</span>
            <span style={{ color: 'var(--text2, #42403C)' }}>Judges</span>
          </div>

          <div style={{ paddingTop: 20, paddingBottom: 24 }}>
            {/* Eyebrow */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '2px 8px', marginBottom: 12,
              borderRadius: 3,
              border: '1px solid var(--bdr-strong, #C8C4B8)',
              background: 'var(--tbl-hdr, #EDEAE4)',
              fontFamily: 'var(--font-mono)', fontSize: 12,
              fontWeight: 600, letterSpacing: '0.5px', textTransform: 'uppercase' as const,
              color: 'var(--text3, #4A4940)',
            }}>
              <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--pos, #176438)' }} />
              Judges
            </div>

            <h1 style={{
              fontSize: 28, fontWeight: 700, marginBottom: 16,
              color: 'var(--text1)', letterSpacing: '-0.01em', fontFamily: 'var(--font-legal)', lineHeight: 1.2,
            }}>
              Judge Intelligence
            </h1>

            <p style={{
              fontSize: 14, lineHeight: 1.65, maxWidth: 640,
              color: 'var(--text2, #42403C)', fontFamily: 'var(--font-ui)',
            }}>
              Ruling patterns, case duration, and outcome tendencies across all 94 federal districts. Data from 5.1M+ public federal cases.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px 24px 48px' }}>
        {/* Judge Directory Client Component */}
        <JudgeDirectoryClient initialJudges={initialJudges} initialTotal={initialTotal} />

        {/* Advanced Metrics with Radar Preview */}
        <section style={{ padding: '24px', borderRadius: 4, border: '1px solid var(--bdr)', background: 'var(--card)', marginBottom: 48, marginTop: 48, position: 'relative' }}>
          <div style={{
            fontSize: 12,
            fontFamily: 'var(--font-mono)',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: 'var(--text3, #4A4940)',
            marginBottom: 8,
          }}>
            Advanced Metrics
          </div>
          <h2 style={{ fontSize: 20, fontWeight: 600, color: 'var(--text1)', fontFamily: 'var(--font-ui)', marginBottom: 12, letterSpacing: '-0.01em' }}>
            Analytics Radar — Multi-dimensional Profiles
          </h2>
          <p style={{ fontSize: 12, color: 'var(--text2, #42403C)', fontFamily: 'var(--font-ui)', maxWidth: 680, margin: '0 0 24px', lineHeight: 1.6 }}>
            Explore detailed judge profiles with motion grant rates, settlement patterns, and disposition metrics derived from PACER and FJC records.
          </p>

          {/* Radar chart preview */}
          <JudgeRadarPreview />
        </section>

        {/* Disclaimer */}
        <div style={{ padding: '12px 16px', border: '1px solid var(--bdr)', borderRadius: 3, background: 'var(--tbl-hdr, #EDEAE4)' }}>
          <h3 style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text3, #4A4940)', fontFamily: 'var(--font-mono)', marginBottom: 8 }}>
            Data Methodology
          </h3>
          <p style={{ fontSize: 12, lineHeight: 1.6, color: 'var(--text3, #4A4940)', fontFamily: 'var(--font-ui)', margin: 0 }}>
            Judge analytics are derived from publicly available federal court records and PACER data. Metrics include motion grant rates, case duration, win rates, and settlement patterns. Data is updated periodically and covers active Article III judges in the 94 federal judicial districts. MyCaseValue LLC is not a law firm and does not provide legal advice.
          </p>
        </div>
      </div>
    </div>
  );
}
