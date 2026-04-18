import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL, SITE_NAME } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'For Small Law Firms',
  description: 'Case analytics, opposing counsel intelligence, and venue selection tools designed for solo practitioners and small law firms.',
  alternates: { canonical: `${SITE_URL}/solutions/small-firms` },
  openGraph: {
    title: 'For Small Law Firms',
    description: 'Level the playing field with enterprise-grade case analytics, judge profiles, and opposing counsel intelligence designed for solo practitioners.',
    url: `${SITE_URL}/solutions/small-firms`,
    type: 'website',
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'MyCaseValue — Federal Court Outcome Data' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'For Small Law Firms',
    description: 'Case analytics, opposing counsel intelligence, and venue selection tools designed for solo practitioners and small law firms.',
  },
};

const FEATURES = [
  {
    iconPath: 'M21 21l-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0z',
    title: 'Case Value Research',
    desc: 'Build sophisticated case evaluation frameworks using our comprehensive settlement and verdict database across all practice areas.',
  },
  {
    iconPath: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z',
    title: 'Opposing Counsel Intel',
    desc: 'Research opposing attorney track records, settlement patterns, and litigation history to inform strategy and negotiation approach.',
  },
  {
    iconPath: 'M9 12l2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0z',
    title: 'Judge Analytics',
    desc: 'Access detailed judge profiles including rulings, verdict data, and procedural tendencies specific to your jurisdiction and case type.',
  },
  {
    iconPath: 'M17.657 16.657L13.414 20.9a2 2 0 0 1-2.828 0l-4.243-4.243a2 2 0 0 1 2.828-2.828L9.172 15l2.657-2.657a2 2 0 0 1 2.828 0l4.243 4.243a2 2 0 0 1-2.828 2.828L15 17.172l2.657 2.657z',
    title: 'Venue Selection',
    desc: 'Make data-driven venue decisions using comparative jury verdict analysis, judge statistics, and case outcome benchmarks.',
  },
  {
    iconPath: 'M3 3v18h18M18 17V9m-5 8V5m-5 12v-3',
    title: 'Bulk Analysis Tools',
    desc: 'Analyze multiple cases in parallel with portfolio-level analytics and comparative benchmarking across your case inventory.',
  },
  {
    iconPath: 'M17 20h5v-2a3 3 0 0 0-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857m0 0a5.002 5.002 0 0 0-4.898-4.142M9 20H4v-2a3 3 0 0 1 5.356-1.857m0 0A5.002 5.002 0 0 1 13.75 12',
    title: 'Team Workspace',
    desc: 'Collaborate securely with team members, share research findings, and maintain client confidentiality across your firm.',
  },
];

export default function SmallFirmsPage() {
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
            fontFamily: 'var(--font-mono)', fontSize: 12,
            fontWeight: 600, letterSpacing: '0.5px', textTransform: 'uppercase',
            color: 'var(--link)',
          }}>
            <span className="animate-pulse" style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--data-positive)' }} />
            For Small Firms
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
            Enterprise-grade analytics, small-firm economics
          </h1>
          <p style={{
            fontFamily: 'var(--font-ui)',
            fontSize: '1.125rem',
            color: 'rgba(255,255,255,0.7)',
            maxWidth: '640px',
            margin: '0 auto 32px',
            lineHeight: 1.6,
          }}>
            Get the competitive advantage of large law firms without the enterprise cost. Level the playing field with data-driven settlement insights, judge analytics, and opposing counsel intelligence.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/sign-up" style={{
              background: 'var(--gold)',
              color: 'var(--card)',
              padding: '8px 24px',
              borderRadius: 2,
              textDecoration: 'none',
              fontFamily: 'var(--font-ui)',
              fontWeight: 600,
              fontSize: 14,
              letterSpacing: '-0.005em',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              border: '1px solid var(--gold)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08)',
            }}>
              Start trial
              <span style={{ fontSize: 14 }}>→</span>
            </Link>
            <Link href="/contact" style={{
              background: 'transparent',
              color: 'rgba(255,255,255,0.85)',
              padding: '8px 24px',
              borderRadius: 2,
              border: '1px solid rgba(255,255,255,0.2)',
              textDecoration: 'none',
              fontFamily: 'var(--font-ui)',
              fontWeight: 600,
              fontSize: 14,
              letterSpacing: '-0.005em',
              display: 'inline-block',
            }}>
              Request demo
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
            {FEATURES.map(f => {
              let href = '';
              if (f.title === 'Case Value Research') href = '/attorney/case-predictor';
              else if (f.title === 'Opposing Counsel Intel') href = '/attorney/opposing-counsel';
              else if (f.title === 'Judge Analytics') href = '/attorney/judge-intelligence';
              else if (f.title === 'Venue Selection') href = '/attorney/venue-optimizer';

              const card = (
                <div key={f.title} style={{
                  background: 'var(--color-surface-0)',
                  border: '1px solid var(--border-default)',
                  borderRadius: '2px',
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
                  {href && (
                    <Link href={href} style={{
                      display: 'inline-block',
                      marginTop: '12px',
                      fontSize: '0.8rem',
                      color: 'var(--accent-primary)',
                      textDecoration: 'none',
                      fontWeight: 500,
                    }}>
                      Try it →
                    </Link>
                  )}
                </div>
              );

              return href ? (
                <div key={f.title}>{card}</div>
              ) : card;
            })}
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
            Start Winning More Cases with Smarter Research
          </h2>
          <p style={{
            fontFamily: 'var(--font-ui)',
            fontSize: '1rem',
            color: 'var(--color-text-secondary)',
            marginBottom: '32px',
            lineHeight: 1.6,
          }}>
            {SITE_NAME} gives solo practitioners and small firms access to the same competitive intelligence used by Fortune 500 law firms—at a price that works for your practice.
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
              letterSpacing: '0.5px',
              display: 'inline-block',
            }}>
              Search Cases
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
              letterSpacing: '0.5px',
              display: 'inline-block',
            }}>
              Try Calculator
            </Link>
          </div>
        </div>
      </section>

      {/* Widget Embed Section */}
      <section style={{ padding: '24px 16px', background: 'var(--color-surface-0)' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <h2 style={{
            fontFamily: 'var(--font-legal)',
            fontSize: '28px',
            fontWeight: 600,
            color: 'var(--color-text-primary)',
            marginBottom: '24px',
          }}>
            Embed Your Practice Area Data
          </h2>
          <p style={{
            fontFamily: 'var(--font-ui)',
            fontSize: '1rem',
            color: 'var(--color-text-secondary)',
            lineHeight: 1.6,
            marginBottom: '32px',
          }}>
            Share real-time case value data on your website with our embeddable widgets. Display settlement ranges, win rates, and verdict data for your practice areas. Widgets automatically update with the latest data from our database.
          </p>
          <div style={{
            background: 'var(--color-surface-1)',
            border: '1px solid var(--border-default)',
            borderRadius: '4px',
            padding: '24px 16px',
            marginBottom: '32px',
          }}>
            <div style={{
              background: 'var(--color-surface-0)',
              border: '1px solid var(--border-default)',
              borderRadius: '2px',
              padding: '24px',
              textAlign: 'center',
              marginBottom: '24px',
            }}>
              <div style={{
                fontSize: '12px',
                color: 'var(--accent-primary)',
                fontWeight: 500,
                marginBottom: '8px',
              }}>
                Powered by MyCaseValue
              </div>
              <div style={{
                fontSize: '14px',
                fontWeight: 600,
                color: 'var(--color-text-primary)',
                marginBottom: '8px',
              }}>
                Personal Injury
              </div>
              <div style={{
                fontSize: '24px',
                fontWeight: 700,
                color: 'var(--data-positive)',
                marginBottom: '4px',
              }}>
                72%
              </div>
              <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginBottom: '12px' }}>
                case outcome rate
              </div>
              <div style={{
                fontFamily: '"Courier New", monospace',
                fontSize: '14px',
                fontWeight: 500,
                color: 'var(--color-text-primary)',
              }}>
                $285K median
              </div>
            </div>
            <p style={{
              fontFamily: 'var(--font-ui)',
              fontSize: '0.875rem',
              color: 'var(--color-text-muted)',
              textAlign: 'center',
              margin: 0,
            }}>
              Example of a compact widget showing case value data for a practice area
            </p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Link href="/solutions/api/widget" style={{
              background: 'var(--accent-primary)',
              color: 'var(--color-surface-1)',
              padding: '0.875rem 2rem',
              borderRadius: '2px',
              textDecoration: 'none',
              fontFamily: 'var(--font-ui)',
              fontWeight: 600,
              fontSize: '0.875rem',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              display: 'inline-block',
            }}>
              Create Your Widget
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
                Research your case value with real settlement data.
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
                API access and custom dashboards for large teams.
              </p>
            </Link>
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
