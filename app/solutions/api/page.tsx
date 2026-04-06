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
    icon: '-',
    title: 'REST API',
    desc: 'Comprehensive REST API with full case analytics, settlement data, and judge intelligence accessible via standard HTTP endpoints.',
  },
  {
    icon: '-',
    title: 'Webhooks & Events',
    desc: 'Real-time webhooks for case updates, settlement notifications, and custom event triggers integrated directly into your applications.',
  },
  {
    icon: '-',
    title: 'Bulk Endpoints',
    desc: 'High-performance bulk data import/export endpoints for processing large datasets and batch operations at scale.',
  },
  {
    icon: '-',
    title: 'SDK Libraries',
    desc: 'Official SDKs for JavaScript, Python, Go, and Java with full type definitions, error handling, and helper utilities.',
  },
  {
    icon: '-',
    title: 'API Documentation',
    desc: 'Comprehensive, interactive API documentation with code examples, Swagger/OpenAPI specs, and migration guides.',
  },
  {
    icon: '-',
    title: 'Sandbox Environment',
    desc: 'Risk-free development sandbox with full API functionality, realistic test data, and isolated from production systems.',
  },
];

export default function ApiPage() {
  return (
    <main>
      {/* Hero */}
      <section style={{ background: '#00172E', color: '#FAFBFC', padding: '80px 24px 64px' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '13px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: '#006997',
            marginBottom: '16px',
          }}>
            SOLUTIONS
          </p>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '2.5rem',
            fontWeight: 800,
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
              background: 'linear-gradient(to right, #d91b5a 0%, #dd2c00 100%)',
              color: '#FAFBFC',
              padding: '0.875rem 2rem',
              borderRadius: '2px',
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
              borderRadius: '2px',
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
      <section style={{ padding: '80px 24px', background: '#F5F6F7' }}>
        <div style={{ maxWidth: '1120px', margin: '0 auto' }}>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '2rem',
            fontWeight: 800,
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
                border: '1px solid #E5EBF0',
                borderRadius: '2px',
                padding: '32px 24px',
              }}>
                <div style={{ fontSize: '28px', marginBottom: '12px' }}>{f.icon}</div>
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
                  color: '#455A64',
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
            fontWeight: 800,
            color: '#212529',
            marginBottom: '16px',
          }}>
            Start building with {SITE_NAME} APIs
          </h2>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1rem',
            color: '#455A64',
            marginBottom: '32px',
            lineHeight: 1.6,
          }}>
            Get started in minutes with our comprehensive API documentation, sandbox environment, and developer support team.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/solutions/api" style={{
              background: 'linear-gradient(to right, #d91b5a 0%, #dd2c00 100%)',
              color: '#FAFBFC',
              padding: '0.875rem 2rem',
              borderRadius: '2px',
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
              borderRadius: '2px',
              border: '1.5px solid #D5D8DC',
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
      <section style={{ padding: '64px 24px', background: '#F5F6F7' }}>
        <div style={{ maxWidth: '1120px', margin: '0 auto' }}>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.75rem',
            fontWeight: 800,
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
                border: '1px solid #E5EBF0',
                borderRadius: '2px',
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
                color: '#455A64',
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
                border: '1px solid #E5EBF0',
                borderRadius: '2px',
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
                color: '#455A64',
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
                border: '1px solid #E5EBF0',
                borderRadius: '2px',
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
                color: '#455A64',
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
