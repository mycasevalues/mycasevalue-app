import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL, SITE_NAME } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'For Insurance Companies',
  description: 'Settlement benchmarking, claim valuation, and litigation cost forecasting for insurers and defense counsel.',
  alternates: { canonical: `${SITE_URL}/solutions/insurance` },
  openGraph: {
    title: 'For Insurance Companies',
    description: 'Reduce claims payouts and litigation costs with data-driven valuation models, risk scoring, and settlement intelligence for insurance carriers.',
    url: `${SITE_URL}/solutions/insurance`,
    type: 'website',
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'MyCaseValue — Federal Court Outcome Data' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'For Insurance Companies',
    description: 'Settlement benchmarking, claim valuation, and litigation cost forecasting for insurers and defense counsel.',
  },
};

const FEATURES = [
  {
    iconPath: 'M3 3v18h18M18 17V9m-5 8V5m-5 12v-3',
    title: 'Settlement Benchmarking',
    desc: 'Compare claims against industry benchmarks and historical settlement patterns to validate valuations and identify outliers.',
  },
  {
    iconPath: 'M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6',
    title: 'Claim Valuation Models',
    desc: 'Deploy data-driven valuation frameworks that account for injury severity, jurisdiction, defense profile, and litigation costs.',
  },
  {
    iconPath: 'M12 9v2m0 4v2m0 0v2M7 9h.01M17 9h.01M7 13h.01M17 13h.01M7 17h.01M17 17h.01',
    title: 'Risk Scoring',
    desc: 'Automatically score litigation risk based on case characteristics, judge history, and settlement probability modeling.',
  },
  {
    iconPath: 'M9 12l2 2 4-4M7 12a5 5 0 1 0 10 0 5 5 0 0 0-10 0z',
    title: 'Reserve Setting',
    desc: 'Generate defensible reserve recommendations backed by settlement data and actuarial analysis for claims management.',
  },
  {
    iconPath: 'M13 10V3L4 14h7v7l9-11h-7z',
    title: 'Litigation Cost Forecasting',
    desc: 'Project defense costs, trial expenses, and likely awards to optimize settlement negotiation and budget allocation.',
  },
  {
    iconPath: 'M9 12l2 2 4-4m-7 3h6m-6 2h6',
    title: 'Defense Strategy Intelligence',
    desc: 'Research defense counsel capabilities, settlement rates, and trial success metrics to select optimal legal representation.',
  },
];

export default function InsurancePage() {
  return (
    <div>
      {/* Hero */}
      <section style={{
        background: 'var(--card)',
        color: 'var(--card)',
        padding: '48px 24px 40px',
        position: 'relative',
        overflow: 'hidden',
        borderBottom: '1px solid var(--bdr)',
      }}>
        <div aria-hidden style={{
          position: 'absolute', inset: 0, opacity: 0.03, pointerEvents: 'none',
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center', position: 'relative' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '4px 10px', marginBottom: 16,
            borderRadius: 999,
            border: '1px solid rgba(59,130,246,0.2)',
            background: 'rgba(59,130,246,0.08)',
            fontFamily: 'var(--font-mono)', fontSize: 10,
            fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase',
            color: 'var(--link)',
          }}>
            <span className="animate-pulse" style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--data-positive)' }} />
            For Insurance
          </div>
          <h1 style={{
            fontFamily: 'var(--font-legal)',
            fontSize: '28px',
            fontWeight: 700,
            letterSpacing: '-0.025em',
            lineHeight: 1.1,
            marginBottom: 16,
            color: 'var(--card)',
          }}>
            Intelligent claims management
          </h1>
          <p style={{
            fontFamily: 'var(--font-ui)',
            fontSize: '1.125rem',
            color: 'rgba(255,255,255,0.7)',
            maxWidth: '640px',
            margin: '0 auto 32px',
            lineHeight: 1.6,
          }}>
            Reduce claims payouts and litigation costs with data-driven valuation, risk scoring, and settlement intelligence tailored for insurance carriers and defense teams.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact" style={{
              background: 'var(--gold)',
              color: 'var(--card)',
              padding: '8px 24px',
              borderRadius: 2,
              textDecoration: 'none',
              fontFamily: 'var(--font-ui)',
              fontWeight: 600,
              fontSize: 13,
              letterSpacing: '-0.005em',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              border: '1px solid var(--gold)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08)',
            }}>
              Request demo
              <span style={{ fontSize: 14 }}>→</span>
            </Link>
            <Link href="/contact?type=consultation" style={{
              background: 'transparent',
              color: 'rgba(255,255,255,0.85)',
              padding: '8px 24px',
              borderRadius: 2,
              border: '1px solid rgba(255,255,255,0.2)',
              textDecoration: 'none',
              fontFamily: 'var(--font-ui)',
              fontWeight: 600,
              fontSize: 13,
              letterSpacing: '-0.005em',
              display: 'inline-block',
            }}>
              Speak with expert
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section style={{ padding: '40px 24px', background: 'var(--color-surface-1)' }}>
        <div style={{ maxWidth: '1120px', margin: '0 auto' }}>
          <h2 style={{
            fontFamily: 'var(--font-legal)',
            fontSize: '28px',
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
                borderRadius: '4px',
                padding: '24px 16px',
              }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '12px' }}><path d={f.iconPath}/></svg>
                <h3 style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '1rem',
                  fontWeight: 600,
                  color: 'var(--color-text-primary)',
                  marginBottom: '8px',
                }}>
                  {f.title}
                </h3>
                <p style={{
                  fontFamily: 'var(--font-ui)',
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
      <section style={{ padding: '24px 16px', background: 'var(--color-surface-0)', textAlign: 'center' }}>
        <div style={{ maxWidth: '640px', margin: '0 auto' }}>
          <h2 style={{
            fontFamily: 'var(--font-legal)',
            fontSize: '28px',
            fontWeight: 600,
            color: 'var(--color-text-primary)',
            marginBottom: '16px',
          }}>
            Optimize claim outcomes with better data
          </h2>
          <p style={{
            fontFamily: 'var(--font-ui)',
            fontSize: '1rem',
            color: 'var(--color-text-secondary)',
            marginBottom: '32px',
            lineHeight: 1.6,
          }}>
            Insurance carriers and defense counsel use {SITE_NAME} to make faster, more accurate claim valuations and reduce unnecessary payouts.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/search" style={{
              background: 'var(--accent-primary)',
              color: 'var(--color-surface-1)',
              padding: '0.875rem 2rem',
              borderRadius: '2px',
              textDecoration: 'none',
              fontFamily: 'var(--font-ui)',
              fontWeight: 600,
              fontSize: '0.875rem',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              display: 'inline-block',
            }}>
              Research Cases
            </Link>
            <Link href="/calculator" style={{
              background: 'transparent',
              color: 'var(--color-text-primary)',
              padding: '0.875rem 2rem',
              borderRadius: '2px',
              border: '1.5px solid var(--border-default)',
              textDecoration: 'none',
              fontFamily: 'var(--font-ui)',
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
      <section style={{ padding: '24px 16px', background: 'var(--color-surface-1)' }}>
        <div style={{ maxWidth: '1120px', margin: '0 auto' }}>
          <h2 style={{
            fontFamily: 'var(--font-legal)',
            fontSize: '28px',
            fontWeight: 600,
            color: 'var(--color-text-primary)',
            textAlign: 'center',
            marginBottom: '48px',
          }}>
            Related Solutions
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
            <Link
              href="/solutions/funders"
              style={{
                background: 'var(--color-surface-0)',
                border: '1px solid var(--border-default)',
                borderRadius: '2px',
                padding: '24px 16px',
                textDecoration: 'none',
                display: 'block',
                transition: 'box-shadow 200ms ease, border-color 200ms ease',
              }}
              className="related-solutions-card"
            >
              <div style={{ fontSize: '32px', marginBottom: '12px' }}>-</div>
              <h3 style={{
                fontFamily: 'var(--font-ui)',
                fontSize: '1.125rem',
                fontWeight: 600,
                color: 'var(--color-text-primary)',
                marginBottom: '8px',
              }}>
                Litigation Funders
              </h3>
              <p style={{
                fontFamily: 'var(--font-ui)',
                fontSize: '0.875rem',
                color: 'var(--color-text-secondary)',
                lineHeight: 1.6,
                margin: 0,
              }}>
                Portfolio analytics and ROI projections.
              </p>
            </Link>
            <Link
              href="/solutions/enterprise"
              style={{
                background: 'var(--color-surface-0)',
                border: '1px solid var(--border-default)',
                borderRadius: '2px',
                padding: '24px 16px',
                textDecoration: 'none',
                display: 'block',
                transition: 'box-shadow 200ms ease, border-color 200ms ease',
              }}
              className="related-solutions-card"
            >
              <div style={{ fontSize: '32px', marginBottom: '12px' }}>-</div>
              <h3 style={{
                fontFamily: 'var(--font-ui)',
                fontSize: '1.125rem',
                fontWeight: 600,
                color: 'var(--color-text-primary)',
                marginBottom: '8px',
              }}>
                Enterprise Legal
              </h3>
              <p style={{
                fontFamily: 'var(--font-ui)',
                fontSize: '0.875rem',
                color: 'var(--color-text-secondary)',
                lineHeight: 1.6,
                margin: 0,
              }}>
                Custom dashboards and API integration.
              </p>
            </Link>
            <Link
              href="/solutions/individuals"
              style={{
                background: 'var(--color-surface-0)',
                border: '1px solid var(--border-default)',
                borderRadius: '2px',
                padding: '24px 16px',
                textDecoration: 'none',
                display: 'block',
                transition: 'box-shadow 200ms ease, border-color 200ms ease',
              }}
              className="related-solutions-card"
            >
              <div style={{ fontSize: '32px', marginBottom: '12px' }}>-</div>
              <h3 style={{
                fontFamily: 'var(--font-ui)',
                fontSize: '1.125rem',
                fontWeight: 600,
                color: 'var(--color-text-primary)',
                marginBottom: '8px',
              }}>
                Individuals
              </h3>
              <p style={{
                fontFamily: 'var(--font-ui)',
                fontSize: '0.875rem',
                color: 'var(--color-text-secondary)',
                lineHeight: 1.6,
                margin: 0,
              }}>
                Settlement research for all parties.
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
