import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL, SITE_NAME } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'API & Integrations | MyCaseValue',
  description: 'REST API, webhooks, SDKs, and integrations for developers building with MyCaseValue data.',
  alternates: { canonical: `${SITE_URL}/solutions/api` },
};

const FEATURES = [
  {
    iconPath: 'M16 18l6-6-6-6M8 6l-6 6 6 6',
    title: 'REST API',
    desc: 'Comprehensive REST API with full case analytics, settlement data, and judge intelligence accessible via standard HTTP endpoints.',
  },
  {
    iconPath: 'M15 17H3v-2a6 6 0 0 1 12 0v2zM9 9a3 3 0 1 0 6 0 3 3 0 0 0-6 0z',
    title: 'Webhooks & Events',
    desc: 'Real-time webhooks for case updates, settlement notifications, and custom event triggers integrated directly into your applications.',
  },
  {
    iconPath: 'M3 3v18h18M9 3v18M3 9h18M3 15h18',
    title: 'Bulk Endpoints',
    desc: 'High-performance bulk data import/export endpoints for processing large datasets and batch operations at scale.',
  },
  {
    iconPath: 'M16 18l6-6-6-6M8 6l-6 6 6 6',
    title: 'SDK Libraries',
    desc: 'Official SDKs for JavaScript, Python, Go, and Java with full type definitions, error handling, and helper utilities.',
  },
  {
    iconPath: 'M12 6.253v13m0-13C6.5 6.253 2 10.058 2 15s4.5 8.747 10 8.747m0-13c5.5 0 10 4.058 10 9s-4.5 8.747-10 8.747M9 9h.01M15 9h.01M9 15h.01M15 15h.01',
    title: 'API Documentation',
    desc: 'Comprehensive, interactive API documentation with code examples, Swagger/OpenAPI specs, and migration guides.',
  },
  {
    iconPath: 'M9 12l2 2 4-4m7 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0z',
    title: 'Sandbox Environment',
    desc: 'Risk-free development sandbox with full API functionality, realistic test data, and isolated from production systems.',
  },
];

export default function ApiPage() {
  return (
    <main>
      {/* Hero */}
      <section style={{ background: '#0966C3', color: '#FAFBFC', padding: '80px 24px 64px' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '13px',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: '#004182',
            marginBottom: '16px',
          }}>
            SOLUTIONS
          </p>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '2.5rem',
            fontWeight: 600,
            lineHeight: 1.1,
            marginBottom: '20px',
          }}>
            APIs for Developers
          </h1>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1.125rem',
            color: 'rgba(255,255,255,0.7)',
            maxWidth: '640px',
            margin: '0 auto 32px',
            lineHeight: 1.6,
          }}>
            Build powerful case analytics applications with our developer-friendly REST API, webhooks, SDKs, and comprehensive documentation.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/solutions/api" style={{
              background: '#0966C3',
              color: '#FAFBFC',
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
              View API Docs
            </Link>
            <Link href="/contact?type=developer" style={{
              background: 'transparent',
              color: '#FAFBFC',
              padding: '0.875rem 2rem',
              borderRadius: '12px',
              border: '1.5px solid rgba(255,255,255,0.5)',
              textDecoration: 'none',
              fontFamily: 'var(--font-body)',
              fontWeight: 600,
              fontSize: '0.875rem',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              display: 'inline-block',
            }}>
              Contact Sales
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section style={{ padding: '80px 24px', background: '#F7F8FA' }}>
        <div style={{ maxWidth: '1120px', margin: '0 auto' }}>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '2rem',
            fontWeight: 600,
            color: '#0f0f0f',
            textAlign: 'center',
            marginBottom: '48px',
          }}>
            Key Capabilities
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
            {FEATURES.map(f => (
              <div key={f.title} style={{
                background: '#FFFFFF',
                border: '1px solid #E5E7EB',
                borderRadius: '12px',
                padding: '32px 24px',
              }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0966C3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '12px' }}><path d={f.iconPath}/></svg>
                <h3 style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '1rem',
                  fontWeight: 600,
                  color: '#0f0f0f',
                  marginBottom: '8px',
                }}>
                  {f.title}
                </h3>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.875rem',
                  color: '#4B5563',
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

      {/* What the API Provides */}
      <section style={{ padding: '80px 24px', background: '#FFFFFF' }}>
        <div style={{ maxWidth: '1120px', margin: '0 auto' }}>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '2rem',
            fontWeight: 600,
            color: '#0f0f0f',
            textAlign: 'center',
            marginBottom: '48px',
          }}>
            What the API Provides
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '32px' }}>
            <div style={{ padding: '24px', background: '#F7F8FA', borderRadius: '8px', border: '1px solid #E5E7EB' }}>
              <h3 style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', fontWeight: 600, color: '#0f0f0f', marginTop: 0, marginBottom: '8px' }}>Case Statistics</h3>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: '#4B5563', lineHeight: 1.6, margin: 0 }}>
                Win rates, settlement data, and outcome predictions for 84 case types and 95 districts
              </p>
            </div>
            <div style={{ padding: '24px', background: '#F7F8FA', borderRadius: '8px', border: '1px solid #E5E7EB' }}>
              <h3 style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', fontWeight: 600, color: '#0f0f0f', marginTop: 0, marginBottom: '8px' }}>Judge Intelligence</h3>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: '#4B5563', lineHeight: 1.6, margin: 0 }}>
                Judge profiles, historical case outcomes, and plaintiff/defendant statistics
              </p>
            </div>
            <div style={{ padding: '24px', background: '#F7F8FA', borderRadius: '8px', border: '1px solid #E5E7EB' }}>
              <h3 style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', fontWeight: 600, color: '#0f0f0f', marginTop: 0, marginBottom: '8px' }}>Trend Analysis</h3>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: '#4B5563', lineHeight: 1.6, margin: 0 }}>
                10-year historical trends showing how case outcomes have evolved over time
              </p>
            </div>
            <div style={{ padding: '24px', background: '#F7F8FA', borderRadius: '8px', border: '1px solid #E5E7EB' }}>
              <h3 style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', fontWeight: 600, color: '#0f0f0f', marginTop: 0, marginBottom: '8px' }}>AI Predictions</h3>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: '#4B5563', lineHeight: 1.6, margin: 0 }}>
                Machine learning-powered outcome predictions based on case characteristics and historical patterns
              </p>
            </div>
            <div style={{ padding: '24px', background: '#F7F8FA', borderRadius: '8px', border: '1px solid #E5E7EB' }}>
              <h3 style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', fontWeight: 600, color: '#0f0f0f', marginTop: 0, marginBottom: '8px' }}>District Data</h3>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: '#4B5563', lineHeight: 1.6, margin: 0 }}>
                Geographic breakdowns with jurisdiction-specific case statistics and trends
              </p>
            </div>
            <div style={{ padding: '24px', background: '#F7F8FA', borderRadius: '8px', border: '1px solid #E5E7EB' }}>
              <h3 style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', fontWeight: 600, color: '#0f0f0f', marginTop: 0, marginBottom: '8px' }}>Real-Time Updates</h3>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: '#4B5563', lineHeight: 1.6, margin: 0 }}>
                Latest data from CourtListener and FJC Integrated Database with automatic daily updates
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section style={{ padding: '80px 24px', background: '#F7F8FA' }}>
        <div style={{ maxWidth: '1120px', margin: '0 auto' }}>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '2rem',
            fontWeight: 600,
            color: '#0f0f0f',
            textAlign: 'center',
            marginBottom: '48px',
          }}>
            Pricing Tiers
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
            <div style={{ padding: '32px', background: '#FFFFFF', borderRadius: '12px', border: '1px solid #E5E7EB', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 600, color: '#0f0f0f', marginTop: 0, marginBottom: '8px' }}>Starter</h3>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '2rem', fontWeight: 600, color: '#0966C3', margin: '0 0 16px 0' }}>$99<span style={{ fontSize: '1rem', color: '#6B7280', fontWeight: 400 }}>/month</span></p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: '#4B5563', margin: '16px 0', lineHeight: 1.6 }}>
                Perfect for individual attorneys and small practices
              </p>
              <ul style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: '#4B5563', lineHeight: 1.8, listStyle: 'none', padding: 0, margin: '16px 0' }}>
                <li>10 requests/min rate limit</li>
                <li>100K requests/month</li>
                <li>Access to 7 core endpoints</li>
                <li>Standard support</li>
              </ul>
            </div>

            <div style={{ padding: '32px', background: '#FFFFFF', borderRadius: '12px', border: '2px solid #0966C3', boxShadow: '0 4px 16px rgba(10, 102, 194, 0.15)', position: 'relative' }}>
              <div style={{ position: 'absolute', top: '-12px', left: '24px', background: '#0966C3', color: '#FAFBFC', padding: '4px 12px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Most Popular
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 600, color: '#0f0f0f', marginTop: '16px', marginBottom: '8px' }}>Professional</h3>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '2rem', fontWeight: 600, color: '#0966C3', margin: '0 0 16px 0' }}>$399<span style={{ fontSize: '1rem', color: '#6B7280', fontWeight: 400 }}>/month</span></p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: '#4B5563', margin: '16px 0', lineHeight: 1.6 }}>
                Ideal for law firms and legal tech platforms
              </p>
              <ul style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: '#4B5563', lineHeight: 1.8, listStyle: 'none', padding: 0, margin: '16px 0' }}>
                <li>30 requests/min rate limit</li>
                <li>1M requests/month</li>
                <li>All endpoints including AI prediction</li>
                <li>Priority support</li>
              </ul>
            </div>

            <div style={{ padding: '32px', background: '#FFFFFF', borderRadius: '12px', border: '1px solid #E5E7EB', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 600, color: '#0f0f0f', marginTop: 0, marginBottom: '8px' }}>Enterprise</h3>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '2rem', fontWeight: 600, color: '#0966C3', margin: '0 0 16px 0' }}>Custom</p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: '#4B5563', margin: '16px 0', lineHeight: 1.6 }}>
                For mission-critical integrations at scale
              </p>
              <ul style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: '#4B5563', lineHeight: 1.8, listStyle: 'none', padding: 0, margin: '16px 0' }}>
                <li>Unlimited rate limits</li>
                <li>Unlimited requests</li>
                <li>Custom endpoints & webhooks</li>
                <li>Dedicated support & SLA</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Get Started CTA */}
      <section style={{ padding: '80px 24px', background: '#FFFFFF', textAlign: 'center' }}>
        <div style={{ maxWidth: '640px', margin: '0 auto' }}>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.75rem',
            fontWeight: 600,
            color: '#0f0f0f',
            marginBottom: '16px',
          }}>
            Ready to get started?
          </h2>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1rem',
            color: '#4B5563',
            marginBottom: '32px',
            lineHeight: 1.6,
          }}>
            View our complete developer documentation and request access to start building with the {SITE_NAME} API today.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/developers" style={{
              background: '#0966C3',
              color: '#FAFBFC',
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
              View Full Documentation
            </Link>
            <Link href="/solutions/enterprise" style={{
              background: 'transparent',
              color: '#0f0f0f',
              padding: '0.875rem 2rem',
              borderRadius: '12px',
              border: '1.5px solid #E5E7EB',
              textDecoration: 'none',
              fontFamily: 'var(--font-body)',
              fontWeight: 600,
              fontSize: '0.875rem',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              display: 'inline-block',
            }}>
              Request API Access
            </Link>
          </div>
        </div>
      </section>

      {/* Related Solutions */}
      <section style={{ padding: '64px 24px', background: '#F7F8FA' }}>
        <div style={{ maxWidth: '1120px', margin: '0 auto' }}>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.75rem',
            fontWeight: 600,
            color: '#0f0f0f',
            textAlign: 'center',
            marginBottom: '48px',
          }}>
            Related Solutions
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
            <Link
              href="/solutions/enterprise"
              style={{
                background: '#FFFFFF',
                border: '1px solid #E5E7EB',
                borderRadius: '12px',
                padding: '32px 24px',
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
                color: '#0f0f0f',
                marginBottom: '8px',
              }}>
                Enterprise Legal
              </h3>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.875rem',
                color: '#4B5563',
                lineHeight: 1.6,
                margin: 0,
              }}>
                SSO and custom dashboards.
              </p>
            </Link>
            <Link
              href="/solutions/academic"
              style={{
                background: '#FFFFFF',
                border: '1px solid #E5E7EB',
                borderRadius: '12px',
                padding: '32px 24px',
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
                color: '#0f0f0f',
                marginBottom: '8px',
              }}>
                Academic Research
              </h3>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.875rem',
                color: '#4B5563',
                lineHeight: 1.6,
                margin: 0,
              }}>
                Research datasets and tools.
              </p>
            </Link>
            <Link
              href="/solutions/government"
              style={{
                background: '#FFFFFF',
                border: '1px solid #E5E7EB',
                borderRadius: '12px',
                padding: '32px 24px',
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
                color: '#0f0f0f',
                marginBottom: '8px',
              }}>
                Government Agencies
              </h3>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.875rem',
                color: '#4B5563',
                lineHeight: 1.6,
                margin: 0,
              }}>
                Bulk data access and analytics.
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
    </main>
  );
}
