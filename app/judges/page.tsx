import { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL } from '../../lib/site-config';
import JudgeDirectoryClient from '../../components/JudgeDirectoryClient';
import JudgeRadarPreview from '../../components/JudgeRadarPreview';

export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Federal Judge Directory — Statistics & Analytics | MyCaseValue',
  description: 'Research federal judges across 94 districts with comprehensive statistics. Compare plaintiff win rates, motion grant rates, settlement patterns, and case duration for 5.1M+ cases.',
  alternates: { canonical: `${SITE_URL}/judges` },
  openGraph: {
    title: 'Federal Judge Directory — Statistics & Analytics',
    description: 'Research federal judges across all 13 circuits and 94 districts with comprehensive analytics.',
    type: 'website',
    url: `${SITE_URL}/judges`,
  },
};

export default function JudgesPage() {
  return (
    <div style={{ background: '#F7F8FA', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ borderBottom: '1px solid #E5E7EB', background: '#1B3A5C' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
          {/* Breadcrumb */}
          <div style={{ paddingTop: 24, display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, fontFamily: 'var(--font-body)' }}>
            <Link href="/" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>Home</Link>
            <span style={{ color: 'rgba(255,255,255,0.4)' }}>/</span>
            <span style={{ color: '#FFFFFF' }}>Judges</span>
          </div>

          <div style={{ paddingTop: 40, paddingBottom: 48 }}>
            <div
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '6px 12px', borderRadius: 2, fontSize: 11, fontWeight: 600,
                letterSpacing: '1.5px', marginBottom: 16, background: 'rgba(10, 102, 194, 0.15)',
                color: '#FFFFFF', textTransform: 'uppercase', border: '1px solid rgba(255,255,255,0.2)',
              }}
            >
              JUDGE ANALYTICS
            </div>

            <h1 style={{
              fontSize: 'clamp(28px, 5vw, 44px)', fontWeight: 900, marginBottom: 16,
              color: '#FFFFFF', letterSpacing: '-1.5px', fontFamily: 'var(--font-display)', lineHeight: 1.2,
            }}>
              Federal Judge Directory
            </h1>

            <p style={{
              fontSize: 'clamp(15px, 2vw, 17px)', lineHeight: 1.6, maxWidth: 640,
              color: '#C7D1D8', fontFamily: 'var(--font-body)',
            }}>
              Explore 94 federal judicial districts with comprehensive data from the Federal Judicial Center and CourtListener. Motion grant rates, case duration, plaintiff win rates, and ruling patterns.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '32px 24px 48px' }}>
        {/* Judge Directory Client Component */}
        <JudgeDirectoryClient />

        {/* Beta Notice with Radar Preview */}
        <section style={{ padding: '48px 32px', borderRadius: 2, border: '1px solid #E5E7EB', background: '#F7F8FA', marginBottom: 64, marginTop: 64 }}>
          <h2 style={{ fontSize: 24, fontWeight: 600, color: '#0f0f0f', fontFamily: 'var(--font-display)', marginBottom: 12 }}>
            Judge Analytics — Expanded Profile Features Coming Soon
          </h2>
          <p style={{ fontSize: 15, color: '#4B5563', fontFamily: 'var(--font-body)', maxWidth: 680, margin: '0 0 28px', lineHeight: 1.6 }}>
            Detailed judge profiles are being enhanced with additional metrics from PACER and FJC records. View the preview below to see what's coming.
          </p>

          {/* Radar chart preview */}
          <JudgeRadarPreview />
        </section>

        {/* Disclaimer */}
        <div style={{ padding: 24, border: '1px solid #E5E7EB', borderRadius: 2, background: '#FFFFFF' }}>
          <h3 style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.8px', color: '#0f0f0f', fontFamily: 'var(--font-display)', marginBottom: 8 }}>
            Data Methodology
          </h3>
          <p style={{ fontSize: 12, lineHeight: 1.6, color: '#4B5563', fontFamily: 'var(--font-body)', margin: 0 }}>
            Judge analytics are derived from publicly available federal court records and PACER data. Metrics include motion grant rates, case duration, plaintiff win rates, and settlement patterns. Data is updated periodically and covers active Article III judges in the 94 federal judicial districts. MyCaseValue LLC is not a law firm and does not provide legal advice.
          </p>
        </div>
      </div>
    </div>
  );
}
