import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL, SITE_NAME } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'For Government Agencies',
  description: 'Court performance data, policy analysis, and transparency reporting tools for federal and state agencies.',
  alternates: { canonical: `${SITE_URL}/solutions/government` },
  openGraph: {
    title: 'For Government Agencies',
    description: 'Court performance data, policy analysis, and transparency reporting tools for federal and state agencies.',
    url: `${SITE_URL}/solutions/government`,
    type: 'website',
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'MyCaseValue — Federal Court Outcome Data' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'For Government Agencies',
    description: 'Court performance data, policy analysis, and transparency reporting tools for federal and state agencies.',
  },
};

const FEATURES = [
  {
    iconPath: 'M3 3v18h18M18 17V9m-5 8V5m-5 12v-3',
    title: 'Court Performance Data',
    desc: 'Benchmark court performance metrics including case disposition time, settlement rates, verdict distributions, and caseload analysis.',
  },
  {
    iconPath: 'M9 19v-6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2zm0 0V9a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v10m-6 0a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2m0 0V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2z',
    title: 'Policy Analysis',
    desc: 'Evaluate policy impacts on case outcomes, judicial efficiency, and system performance with comprehensive statistical analysis.',
  },
  {
    iconPath: 'M12 8c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm0 2c-2.209 0-4 1.791-4 4v2h8v-2c0-2.209-1.791-4-4-4zm6-6h4m-2 2v4',
    title: 'Resource Allocation',
    desc: 'Optimize court resources and judge assignments using data on caseload, complexity distribution, and efficiency metrics.',
  },
  {
    iconPath: 'M9 12l2 2 4-4m7 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0z',
    title: 'Transparency Reporting',
    desc: 'Generate public-facing reports on court operations, judge statistics, and case outcomes supporting judicial transparency initiatives.',
  },
  {
    iconPath: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-1.946 3.42 3.42 0 01.946 1.946m4.438 0a3.42 3.42 0 001.946-1.946 3.42 3.42 0 01.946 1.946M15.355 8.647a3.42 3.42 0 001.946-1.946 3.42 3.42 0 01.946 1.946m-4.438 0a3.42 3.42 0 001.946-1.946 3.42 3.42 0 01.946 1.946m4.438 0a3.42 3.42 0 001.946-1.946 3.42 3.42 0 01.946 1.946M4.929 4.697a3.42 3.42 0 001.946-1.946A3.42 3.42 0 017.821 4.697m0 0a3.42 3.42 0 001.946-1.946 3.42 3.42 0 01.946 1.946',
    title: 'Compliance Tools',
    desc: 'Track compliance with performance standards, access benchmarks, and generate compliance documentation for oversight bodies.',
  },
  {
    iconPath: 'M12 10v6m4-6v6m4-6v6M3 16V7a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v9a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z',
    title: 'Bulk Data Access',
    desc: 'Authorized government agencies access comprehensive case data in bulk formats for research, analysis, and archival purposes.',
  },
];

export default function GovernmentPage() {
  return (
    <div>
      {/* Hero */}
      <section style={{
        background: '#080d19',
        color: '#fff',
        padding: '48px 24px 40px',
        position: 'relative',
        overflow: 'hidden',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}>
        <div aria-hidden style={{
          position: 'absolute', inset: 0, opacity: 0.03, pointerEvents: 'none',
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />
        <div style={{ maxWidth: '960px', margin: '0 auto', textAlign: 'center', position: 'relative' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '4px 10px', marginBottom: 16,
            borderRadius: 999,
            border: '1px solid rgba(59,130,246,0.2)',
            background: 'rgba(59,130,246,0.08)',
            fontFamily: 'var(--font-mono)', fontSize: 10,
            fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase',
            color: '#60a5fa',
          }}>
            <span className="animate-pulse" style={{ width: 4, height: 4, borderRadius: '50%', background: '#22c55e' }} />
            For Government
          </div>
          <h1 style={{
            fontFamily: 'var(--font-inter)',
            fontSize: 'clamp(28px, 4vw, 36px)',
            fontWeight: 700,
            letterSpacing: '-0.025em',
            lineHeight: 1.1,
            marginBottom: 16,
            color: '#ffffff',
          }}>
            Data-driven judicial policy
          </h1>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1.125rem',
            color: 'rgba(255,255,255,0.7)',
            maxWidth: '640px',
            margin: '0 auto 32px',
            lineHeight: 1.6,
          }}>
            Inform judicial policy, resource allocation, and system improvement with data-driven analysis of federal court performance, outcomes, and judge metrics across all districts.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact?type=government" style={{
              background: '#1a56db',
              color: '#ffffff',
              padding: '10px 20px',
              borderRadius: 6,
              textDecoration: 'none',
              fontFamily: 'var(--font-inter)',
              fontWeight: 600,
              fontSize: 13,
              letterSpacing: '-0.005em',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              border: '1px solid #1a56db',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08)',
            }}>
              Request information
              <span style={{ fontSize: 14 }}>→</span>
            </Link>
            <Link href="/contact?type=government-demo" style={{
              background: 'transparent',
              color: 'rgba(255,255,255,0.85)',
              padding: '10px 20px',
              borderRadius: 6,
              border: '1px solid rgba(255,255,255,0.2)',
              textDecoration: 'none',
              fontFamily: 'var(--font-inter)',
              fontWeight: 600,
              fontSize: 13,
              letterSpacing: '-0.005em',
              display: 'inline-block',
            }}>
              Schedule demo
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section style={{ padding: '40px 24px', background: 'var(--color-surface-1)' }}>
        <div style={{ maxWidth: '1120px', margin: '0 auto' }}>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '2rem',
            fontWeight: 600,
            color: 'var(--color-text-primary)',
            textAlign: 'center',
            marginBottom: '48px',
          }}>
            Key Capabilities
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
            {FEATURES.map(f => (
              <div key={f.title} style={{
                background: 'var(--color-surface-0)',
                border: '1px solid var(--border-default)',
                borderRadius: '12px',
                padding: '20px 16px',
              }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '12px' }}><path d={f.iconPath}/></svg>
                <h3 style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '1rem',
                  fontWeight: 600,
                  color: 'var(--color-text-primary)',
                  marginBottom: '8px',
                }}>
                  {f.title}
                </h3>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.875rem',
                  color: 'var(--color-text-secondary)',
                  lineHeight: 1.6,
                  margin: 0,
                }}>
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Get Started CTA */}
      <section style={{ padding: '20px 16px', background: 'var(--color-surface-0)', textAlign: 'center' }}>
        <div style={{ maxWidth: '640px', margin: '0 auto' }}>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.75rem',
            fontWeight: 600,
            color: 'var(--color-text-primary)',
            marginBottom: '16px',
          }}>
            Improve court system performance and transparency
          </h2>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1rem',
            color: 'var(--color-text-secondary)',
            marginBottom: '32px',
            lineHeight: 1.6,
          }}>
            {SITE_NAME} provides federal agencies, state courts, and judicial oversight bodies with actionable insights for improving system performance and advancing judicial transparency.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/search" style={{
              background: 'var(--accent-primary)',
              color: 'var(--color-surface-1)',
              padding: '0.875rem 2rem',
              borderRadius: '12px',
              textDecoration: 'none',
              fontFamily: 'var(--font-body)',
              fontWeight: 600,
              fontSize: '0.875rem',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              display: 'inline-block',
            }}>
              Research Data
            </Link>
            <Link href="/calculator" style={{
              background: 'transparent',
              color: 'var(--color-text-primary)',
              padding: '0.875rem 2rem',
              borderRadius: '12px',
              border: '1.5px solid var(--border-default)',
              textDecoration: 'none',
              fontFamily: 'var(--font-body)',
              fontWeight: 600,
              fontSize: '0.875rem',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              display: 'inline-block',
            }}>
              Try Calculator
            </Link>
          </div>
        </div>
      </section>

      {/* Related Solutions */}
      <section style={{ padding: '20px 16px', background: 'var(--color-surface-1)' }}>
        <div style={{ maxWidth: '1120px', margin: '0 auto' }}>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.75rem',
            fontWeight: 600,
            color: 'var(--color-text-primary)',
            textAlign: 'center',
            marginBottom: '48px',
          }}>
            Related Solutions
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
            <Link
              href="/solutions/academic"
              style={{
                background: 'var(--color-surface-0)',
                border: '1px solid var(--border-default)',
                borderRadius: '12px',
                padding: '20px 16px',
                textDecoration: 'none',
                display: 'block',
                transition: 'box-shadow 200ms ease, border-color 200ms ease',
              }}
              className="related-solutions-card"
            >
              <div style={{ fontSize: '32px', marginBottom: '12px' }}>-</div>
              <h3 style={{
                fontFamily: 'var(--font-body)',
                fontSize: '1.125rem',
                fontWeight: 600,
                color: 'var(--color-text-primary)',
                marginBottom: '8px',
              }}>
                Academic Research
              </h3>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.875rem',
                color: 'var(--color-text-secondary)',
                lineHeight: 1.6,
                margin: 0,
              }}>
                Research datasets and analysis tools.
              </p>
            </Link>
            <Link
              href="/solutions/api"
              style={{
                background: 'var(--color-surface-0)',
                border: '1px solid var(--border-default)',
                borderRadius: '12px',
                padding: '20px 16px',
                textDecoration: 'none',
                display: 'block',
                transition: 'box-shadow 200ms ease, border-color 200ms ease',
              }}
              className="related-solutions-card"
            >
              <div style={{ fontSize: '32px', marginBottom: '12px' }}>-</div>
              <h3 style={{
                fontFamily: 'var(--font-body)',
                fontSize: '1.125rem',
                fontWeight: 600,
                color: 'var(--color-text-primary)',
                marginBottom: '8px',
              }}>
                API & Integrations
              </h3>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.875rem',
                color: 'var(--color-text-secondary)',
                lineHeight: 1.6,
                margin: 0,
              }}>
                REST API and bulk data endpoints.
              </p>
            </Link>
            <Link
              href="/solutions/enterprise"
              style={{
                background: 'var(--color-surface-0)',
                border: '1px solid var(--border-default)',
                borderRadius: '12px',
                padding: '20px 16px',
                textDecoration: 'none',
                display: 'block',
                transition: 'box-shadow 200ms ease, border-color 200ms ease',
              }}
              className="related-solutions-card"
            >
              <div style={{ fontSize: '32px', marginBottom: '12px' }}>-</div>
              <h3 style={{
                fontFamily: 'var(--font-body)',
                fontSize: '1.125rem',
                fontWeight: 600,
                color: 'var(--color-text-primary)',
                marginBottom: '8px',
              }}>
                Enterprise Legal
              </h3>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.875rem',
                color: 'var(--color-text-secondary)',
                lineHeight: 1.6,
                margin: 0,
              }}>
                Custom dashboards and SSO.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* Responsive grid style */}
      <style dangerouslySetInnerHTML={{ __html: `
        .related-solutions-card:hover {
          box-shadow: 0 4px 16px rgba(0,0,0,0.10) !important;
          border-color: rgba(0,105,151,0.30) !important;
        }
        @media (max-width: 768px) {
          section div[style*="grid-template-columns: repeat(3"] {
            grid-template-columns: 1fr !important;
          }
        }
        @media (min-width: 769px) and (max-width: 1024px) {
          section div[style*="grid-template-columns: repeat(3"] {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}} />
    </div>
  );
}
