import { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL } from '../../lib/site-config';

export const metadata: Metadata = {
  title: 'Case Results',
  description: 'View detailed case results and outcomes from the MyCaseValue database.',
  alternates: { canonical: `${SITE_URL}/results` },
  openGraph: {
    title: 'Case Results',
    description: 'View detailed case results and outcomes from the MyCaseValue database.',
    type: 'website',
    url: `${SITE_URL}/results`,
    siteName: 'MyCaseValue',
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Case Results',
    description: 'View detailed case results and outcomes from the MyCaseValue database.',
  },
};

export default function ResultsPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-surface-1)' }}>
      <style>{`
        .cta-button {
          transition: all 0.2s ease;
        }
        .cta-button:hover {
          background-color: #CC0D14 !important;
          transform: translateY(-1px);
        }
        .secondary-button {
          transition: all 0.2s ease;
        }
        .secondary-button:hover {
          background-color: var(--color-surface-1);
          border-color: #A8ACB1;
        }
        .info-card {
          transition: all 0.2s ease;
        }
        .info-card:hover {
          border-color: #B0B5BA;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
        }
      `}</style>

      {/* Breadcrumb */}
      <div style={{ background: 'var(--color-surface-0)', borderBottom: '1px solid var(--border-default)', padding: '12px 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', paddingLeft: '24px', paddingRight: '24px' }}>
          <nav style={{ fontSize: '13px', fontFamily: 'var(--font-body)', color: 'var(--color-text-secondary)' }}>
            <Link href="/" style={{ color: 'var(--accent-primary-hover)', textDecoration: 'none' }}>
              Home
            </Link>
            <span style={{ margin: '0 8px', color: '#A8ACB1' }}>&gt;</span>
            <span style={{ color: 'var(--color-text-primary)', fontWeight: '600' }}>Case Results</span>
          </nav>
        </div>
      </div>

      {/* Header */}
      <div style={{
        background: 'var(--card, #FFFFFF)',
        paddingTop: '40px',
        paddingBottom: '32px',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div aria-hidden style={{
          position: 'absolute', inset: 0, opacity: 0.03, pointerEvents: 'none',
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />
        <div style={{ maxWidth: '1200px', margin: '0 auto', paddingLeft: '24px', paddingRight: '24px', position: 'relative' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '4px 10px', marginBottom: 16,
            borderRadius: 999,
            border: '1px solid rgba(59,130,246,0.2)',
            background: 'rgba(59,130,246,0.08)',
            fontFamily: 'var(--font-mono)', fontSize: 10,
            fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase',
            color: 'var(--link, #0A50A2)',
          }}>
            <span className="animate-pulse" style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--data-positive, #176438)' }} />
            Case Results
          </div>
          <h1 style={{
            fontFamily: 'var(--font-ui)',
            fontSize: 'clamp(28px, 4vw, 36px)',
            fontWeight: 700,
            letterSpacing: '-0.025em',
            lineHeight: 1.1,
            color: 'var(--text1, #18181A)',
            margin: '0 0 16px 0',
          }}>
            Benchmark your case against real data
          </h1>
          <p style={{
            fontSize: '16px',
            color: 'rgba(255,255,255,0.7)',
            margin: '0',
            maxWidth: '600px',
            fontFamily: 'var(--font-body)',
            lineHeight: '1.6'
          }}>
            Federal court outcomes, win rates, and settlement data — contextualized for your case type, district, and procedural posture.
          </p>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', paddingLeft: '24px', paddingRight: '24px', paddingTop: '24px', paddingBottom: '24px' }}>
        {/* Empty State Card */}
        <div style={{
          padding: '24px',
          borderRadius: '4px',
          border: '1px solid var(--border-default)',
          background: 'var(--color-surface-0)',
          textAlign: 'center'
        }}>
          <h2 style={{
            fontSize: '18px',
            fontWeight: '600',
            color: 'var(--color-text-primary)',
            margin: '0 0 12px 0',
            fontFamily: 'var(--font-ui)'
          }}>
            No Results Selected
          </h2>
          <p style={{
            fontSize: '14px',
            color: 'var(--color-text-secondary)',
            margin: '0 0 24px 0',
            lineHeight: '1.6',
            fontFamily: 'var(--font-body)'
          }}>
            Select a case type and district to see detailed results including win rates, settlement ranges, average awards, and case timelines.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
            <Link href="/calculator"
              className="cta-button"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                padding: '12px 20px',
                borderRadius: 4,
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: '-0.005em',
                background: 'var(--gold, #C4882A)',
                color: 'var(--card, #ffffff)',
                textDecoration: 'none',
                fontFamily: 'var(--font-ui)',
                border: '1px solid var(--gold, #C4882A)',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08)',
                cursor: 'pointer',
                transition: 'background-color 150ms ease, border-color 150ms ease',
              }}>
              Use Settlement Calculator
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
            <Link href="/"
              className="secondary-button"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                paddingLeft: '24px',
                paddingRight: '24px',
                height: '48px',
                borderRadius: '4px',
                fontSize: '14px',
                fontWeight: '600',
                background: 'var(--color-surface-0)',
                color: 'var(--color-text-primary)',
                textDecoration: 'none',
                fontFamily: 'var(--font-body)',
                border: '1px solid var(--border-default)',
                cursor: 'pointer'
              }}>
              Browse by Type
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </div>
        </div>

        {/* Info Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px', marginTop: '16px' }}>
          <div className="info-card" style={{
            padding: '12px',
            borderRadius: '4px',
            border: '1px solid var(--border-default)',
            background: 'var(--color-surface-0)'
          }}>
            <h3 style={{
              fontSize: '11px',
              fontWeight: '600',
              color: 'var(--color-text-primary)',
              margin: '0 0 8px 0',
              fontFamily: 'var(--font-ui)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase'
            }}>
              Win Rates & Outcomes
            </h3>
            <p style={{
              fontSize: '13px',
              color: 'var(--color-text-secondary)',
              margin: '0',
              lineHeight: '1.5',
              fontFamily: 'var(--font-body)'
            }}>
              Percentage of cases won, settled, or dismissed by outcome type.
            </p>
          </div>
          <div className="info-card" style={{
            padding: '12px',
            borderRadius: '4px',
            border: '1px solid var(--border-default)',
            background: 'var(--color-surface-0)'
          }}>
            <h3 style={{
              fontSize: '11px',
              fontWeight: '600',
              color: 'var(--color-text-primary)',
              margin: '0 0 8px 0',
              fontFamily: 'var(--font-ui)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase'
            }}>
              Settlement Ranges
            </h3>
            <p style={{
              fontSize: '13px',
              color: 'var(--color-text-secondary)',
              margin: '0',
              lineHeight: '1.5',
              fontFamily: 'var(--font-body)'
            }}>
              Median and average settlement amounts for your case type.
            </p>
          </div>
          <div className="info-card" style={{
            padding: '12px',
            borderRadius: '4px',
            border: '1px solid var(--border-default)',
            background: 'var(--color-surface-0)'
          }}>
            <h3 style={{
              fontSize: '11px',
              fontWeight: '600',
              color: 'var(--color-text-primary)',
              margin: '0 0 8px 0',
              fontFamily: 'var(--font-ui)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase'
            }}>
              Case Duration
            </h3>
            <p style={{
              fontSize: '13px',
              color: 'var(--color-text-secondary)',
              margin: '0',
              lineHeight: '1.5',
              fontFamily: 'var(--font-body)'
            }}>
              Average time from filing to resolution.
            </p>
          </div>
          <div className="info-card" style={{
            padding: '12px',
            borderRadius: '4px',
            border: '1px solid var(--border-default)',
            background: 'var(--color-surface-0)'
          }}>
            <h3 style={{
              fontSize: '11px',
              fontWeight: '600',
              color: 'var(--color-text-primary)',
              margin: '0 0 8px 0',
              fontFamily: 'var(--font-ui)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase'
            }}>
              Regional Variation
            </h3>
            <p style={{
              fontSize: '13px',
              color: 'var(--color-text-secondary)',
              margin: '0',
              lineHeight: '1.5',
              fontFamily: 'var(--font-body)'
            }}>
              How outcomes differ across federal districts.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ borderTop: '1px solid var(--border-default)', paddingTop: '24px', paddingBottom: '24px', textAlign: 'center', marginTop: '24px', background: 'var(--color-surface-0)' }}>
        <p style={{
          fontSize: '11px',
          color: 'var(--color-text-secondary)',
          maxWidth: '600px',
          margin: '0 auto',
          paddingLeft: '24px',
          paddingRight: '24px',
          fontFamily: 'var(--font-body)',
          lineHeight: '1.6'
        }}>
          All results are based on aggregate data from official federal court records.
          This is not legal advice. © {new Date().getFullYear()} MyCaseValue LLC.
        </p>
      </div>
    </div>
  );
}
