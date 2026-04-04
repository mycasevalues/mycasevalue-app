import { Metadata } from 'next';
import Link from 'next/link';

export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Contact Us | MyCaseValue',
  description: 'Get in touch with the MyCaseValue team for support, enterprise inquiries, or data methodology questions.',
  alternates: { canonical: 'https://www.mycasevalues.com/contact' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Contact MyCaseValue',
  url: 'https://www.mycasevalues.com/contact',
  mainEntity: {
    '@type': 'Organization',
    name: 'MyCaseValue',
    url: 'https://www.mycasevalues.com',
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'Customer Support',
        email: 'support@mycasevalue.com',
      },
      {
        '@type': 'ContactPoint',
        contactType: 'Enterprise & API',
        email: 'enterprise@mycasevalue.com',
      },
    ],
  },
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div style={{ background: 'var(--bg-base)', minHeight: '100vh' }}>
        <div style={{ maxWidth: 720, margin: '0 auto', padding: '64px 24px' }}>
        <h1
          style={{
            fontSize: 'clamp(28px, 4vw, 40px)',
            fontWeight: 800,
            color: '#F0F2F5',
            fontFamily: 'var(--font-display)',
            letterSpacing: '-1px',
            marginBottom: 12,
          }}
        >
          Contact Us
        </h1>
        <p
          style={{
            fontSize: 16,
            color: 'rgba(240,242,245,0.40)',
            fontFamily: 'var(--font-body)',
            lineHeight: 1.7,
            marginBottom: 48,
          }}
        >
          Have a question, need help with your account, or interested in enterprise access? We&apos;re here to help.
        </p>

        <div style={{ display: 'grid', gap: 24 }}>
          {/* Support */}
          <div
            style={{
              padding: 32,
              borderRadius: 12,
              border: '1px solid rgba(255,255,255,0.10)',
              background: 'rgba(255,255,255,0.06)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.30)',
            }}
          >
            <h2
              style={{
                fontSize: 18,
                fontWeight: 600,
                color: '#F0F2F5',
                fontFamily: 'var(--font-display)',
                marginBottom: 8,
              }}
            >
              General Support
            </h2>
            <p
              style={{
                fontSize: 14,
                color: 'rgba(240,242,245,0.40)',
                fontFamily: 'var(--font-body)',
                lineHeight: 1.6,
                marginBottom: 16,
              }}
            >
              Account issues, billing questions, bug reports, or feature requests.
            </p>
            <a
              href="mailto:support@mycasevalue.com"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                fontSize: 15,
                fontWeight: 600,
                color: '#3D72FF',
                textDecoration: 'none',
                fontFamily: 'var(--font-body)',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="M22 7l-10 7L2 7" />
              </svg>
              support@mycasevalue.com
            </a>
          </div>

          {/* Enterprise */}
          <div
            style={{
              padding: 32,
              borderRadius: 12,
              border: '1px solid rgba(255,255,255,0.10)',
              background: 'rgba(255,255,255,0.06)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.30)',
            }}
          >
            <h2
              style={{
                fontSize: 18,
                fontWeight: 600,
                color: '#F0F2F5',
                fontFamily: 'var(--font-display)',
                marginBottom: 8,
              }}
            >
              Enterprise &amp; API Access
            </h2>
            <p
              style={{
                fontSize: 14,
                color: 'rgba(240,242,245,0.40)',
                fontFamily: 'var(--font-body)',
                lineHeight: 1.6,
                marginBottom: 16,
              }}
            >
              Bulk data licensing, custom integrations, team accounts, and API partnerships.
            </p>
            <a
              href="mailto:enterprise@mycasevalue.com"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                fontSize: 15,
                fontWeight: 600,
                color: '#3D72FF',
                textDecoration: 'none',
                fontFamily: 'var(--font-body)',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="M22 7l-10 7L2 7" />
              </svg>
              enterprise@mycasevalue.com
            </a>
          </div>

          {/* Methodology */}
          <div
            style={{
              padding: 32,
              borderRadius: 12,
              border: '1px solid rgba(255,255,255,0.10)',
              background: 'rgba(255,255,255,0.06)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.30)',
            }}
          >
            <h2
              style={{
                fontSize: 18,
                fontWeight: 600,
                color: '#F0F2F5',
                fontFamily: 'var(--font-display)',
                marginBottom: 8,
              }}
            >
              Data &amp; Methodology
            </h2>
            <p
              style={{
                fontSize: 14,
                color: 'rgba(240,242,245,0.40)',
                fontFamily: 'var(--font-body)',
                lineHeight: 1.6,
                marginBottom: 16,
              }}
            >
              For questions about our data sources, statistical methodology, or how we calculate case outcomes, see our detailed methodology page.
            </p>
            <Link
              href="/methodology"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                fontSize: 15,
                fontWeight: 600,
                color: '#3D72FF',
                textDecoration: 'none',
                fontFamily: 'var(--font-body)',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
              </svg>
              View Methodology
            </Link>
          </div>
        </div>

        <p
          style={{
            fontSize: 13,
            color: 'rgba(240,242,245,0.40)',
            fontFamily: 'var(--font-body)',
            textAlign: 'center',
            marginTop: 48,
            lineHeight: 1.6,
          }}
        >
          We typically respond within 1 business day. For urgent account issues, include your account email in your message.
        </p>
        </div>
      </div>
    </>
  );
}
