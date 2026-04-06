import { Metadata } from 'next';
import Link from 'next/link';
import ContactForm from '@/components/ContactForm';

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
      <style>{`
        @media (max-width: 1024px) {
          .contact-grid {
            display: grid !important;
            gridTemplateColumns: 1fr !important;
            gap: 32px !important;
          }
        }
      `}</style>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div style={{ background: '#F5F6F7', minHeight: '100vh' }}>
        {/* Header Banner */}
        <div style={{ background: '#00172E', padding: '64px 24px' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto' }}>
            <div style={{ marginBottom: 16 }}>
              <span style={{
                display: 'inline-block',
                padding: '6px 12px',
                backgroundColor: '#E8171F',
                color: '#FFFFFF',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                borderRadius: '4px',
                fontFamily: 'var(--font-display)',
              }}>
                CONTACT US
              </span>
            </div>
            <h1
              style={{
                fontSize: 'clamp(28px, 4vw, 40px)',
                fontWeight: 800,
                color: '#FFFFFF',
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
                color: 'rgba(255,255,255,0.7)',
                fontFamily: 'var(--font-body)',
                lineHeight: 1.7,
              }}
            >
              Have a question, need help with your account, or interested in enterprise access? We&apos;re here to help.
            </p>
          </div>
        </div>

        {/* Breadcrumb Navigation */}
        <div style={{ borderBottom: '1px solid #D5D8DC', paddingTop: '1rem', paddingBottom: '1rem', backgroundColor: '#F5F6F7' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto', paddingLeft: '24px', paddingRight: '24px' }}>
            <nav style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', fontFamily: 'var(--font-body)' }}>
              <Link href="/" style={{ color: '#006997', textDecoration: 'none' }}>
                Home
              </Link>
              <span style={{ color: '#455A64' }}>/</span>
              <span style={{ color: '#455A64' }}>Contact</span>
            </nav>
          </div>
        </div>

        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '64px 24px' }}>

        <div className="contact-page-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
          {/* Left Column: Contact Info Cards */}
          <div style={{ display: 'grid', gap: 24, gridColumn: '1' }}>
            {/* Support */}
            <div
              style={{
                padding: 32,
                borderRadius: '4px',
                border: '1px solid #D5D8DC',
                background: '#FFFFFF',
                boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
              }}
            >
              <h2
                style={{
                  fontSize: 18,
                  fontWeight: 600,
                  color: '#212529',
                  fontFamily: 'var(--font-display)',
                  marginBottom: 8,
                }}
              >
                General Support
              </h2>
              <p
                style={{
                  fontSize: 14,
                  color: '#455A64',
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
                  color: '#E8171F',
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
                borderRadius: '4px',
                border: '1px solid #D5D8DC',
                background: '#FFFFFF',
                boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
              }}
            >
              <h2
                style={{
                  fontSize: 18,
                  fontWeight: 600,
                  color: '#212529',
                  fontFamily: 'var(--font-display)',
                  marginBottom: 8,
                }}
              >
                Enterprise &amp; API Access
              </h2>
              <p
                style={{
                  fontSize: 14,
                  color: '#455A64',
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
                  color: '#E8171F',
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
                borderRadius: '4px',
                border: '1px solid #D5D8DC',
                background: '#FFFFFF',
                boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
              }}
            >
              <h2
                style={{
                  fontSize: 18,
                  fontWeight: 600,
                  color: '#212529',
                  fontFamily: 'var(--font-display)',
                  marginBottom: 8,
                }}
              >
                Data &amp; Methodology
              </h2>
              <p
                style={{
                  fontSize: 14,
                  color: '#455A64',
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
                  color: '#E8171F',
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

          {/* Right Column: Contact Form */}
          <div style={{ gridColumn: '2' }}>
            <ContactForm />
          </div>
        </div>

        <p
          style={{
            fontSize: 13,
            color: '#455A64',
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
