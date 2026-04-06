import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL, SITE_NAME } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'API & Integrations | MyCaseValue+',
  description: 'REST API, webhooks, SDKs, and integrations for developers building with MyCaseValue+ data.',
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
      <section style={{ background: '#1B3A5C', color: '#FAFBFC', padding: '80px 24px 64px' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '13px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: '#6D28D9',
            marginBottom: '16px',
          }}>
            SOLUTIONS
          </p>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '2.5rem',
            fontWeight: 700,
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
              background: '#7C3AED',
              color: '#FAFBFC',
              padding: '0.875rem 2rem',
              borderRadius: '6px',
              textDecoration: 'none',
              fontFamily: 'var(--font-body)',
              fontWeight: 700,
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
              borderRadius: '6px',
              border: '1.5px solid rgba(255,255,255,0.5)',
              textDecoration: 'none',
              fontFamily: 'var(--font-body)',
              fontWeight: 700,
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
            fontWeight: 700,
            color: '#212529',
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
                borderRadius: '6px',
                padding: '32px 24px',
              }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '12px' }}><path d={f.iconPath}/></svg>
                <h3 style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '1rem',
                  fontWeight: 700,
                  color: '#212529',
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

      {/* Get Started CTA */}
      <section style={{ padding: '64px 24px', background: '#FFFFFF', textAlign: 'center' }}>
        <div style={{ maxWidth: '640px', margin: '0 auto' }}>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.75rem',
            fontWeight: 700,
            color: '#212529',
            marginBottom: '16px',
          }}>
            Start building with {SITE_NAME} APIs
          </h2>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1rem',
            color: '#4B5563',
            marginBottom: '32px',
            lineHeight: 1.6,
          }}>
            Get started in minutes with our comprehensive API documentation, sandbox environment, and developer support team.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/solutions/api" style={{
              background: '#7C3AED',
              color: '#FAFBFC',
              padding: '0.875rem 2rem',
              borderRadius: '6px',
              textDecoration: 'none',
              fontFamily: 'var(--font-body)',
              fontWeight: 700,
              fontSize: '0.875rem',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              display: 'inline-block',
            }}>
              View API Docs
            </Link>
            <Link href="/calculator" style={{
              background: 'transparent',
              color: '#212529',
              padding: '0.875rem 2rem',
              borderRadius: '6px',
              border: '1.5px solid #E5E7EB',
              textDecoration: 'none',
              fontFamily: 'var(--font-body)',
              fontWeight: 700,
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
      <section style={{ padding: '64px 24px', background: '#F7F8FA' }}>
        <div style={{ maxWidth: '1120px', margin: '0 auto' }}>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.75rem',
            fontWeight: 700,
            color: '#212529',
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
                borderRadius: '6px',
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
                fontWeight: 700,
                color: '#212529',
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
                borderRadius: '6px',
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
                fontWeight: 700,
                color: '#212529',
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
                borderRadius: '6px',
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
                fontWeight: 700,
                color: '#212529',
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
