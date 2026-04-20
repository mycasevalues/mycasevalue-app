import { Metadata } from 'next';
import Link from 'next/link';
import ContactForm from '@/components/ContactForm';
import { SITE_URL } from '../../lib/site-config';

export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Contact MyCaseValue — Support & Enterprise',
  description: 'Contact the MyCaseValue team for support, enterprise API inquiries, partnerships, or data methodology questions.',
  alternates: { canonical: `${SITE_URL}/contact` },
  openGraph: {
    title: 'Contact Us',
    description: 'Get in touch with the MyCaseValue team for support, enterprise inquiries, or data methodology questions.',
    url: `${SITE_URL}/contact`,
    type: 'website',
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'MyCaseValue — Federal Court Outcome Data' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us',
    description: 'Get in touch with the MyCaseValue team for support, enterprise inquiries, or data methodology questions.',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Contact MyCaseValue',
  url: `${SITE_URL}/contact`,
  mainEntity: {
    '@type': 'Organization',
    name: 'MyCaseValue',
    url: SITE_URL,
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'Customer Support',
        email: 'support@mycasevalues.com',
      },
      {
        '@type': 'ContactPoint',
        contactType: 'Enterprise & API',
        email: 'enterprise@mycasevalues.com',
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
      <div style={{ background: 'var(--surf)', minHeight: '100vh' }}>
        {/* Header Banner */}
        <div style={{
          background: 'var(--card)',
          padding: '56px 24px',
          position: 'relative',
          overflow: 'hidden',
          borderBottom: '1px solid var(--bdr)',
        }}>
          <div aria-hidden style={{
            position: 'absolute', inset: 0, opacity: 0.03, pointerEvents: 'none',
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }} />
          <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '4px 8px', marginBottom: 16,
              borderRadius: 999,
              border: '1px solid rgba(59,130,246,0.2)',
              background: 'rgba(59,130,246,0.08)',
              fontFamily: 'var(--font-mono)', fontSize: 12,
              fontWeight: 600, letterSpacing: '0.5px', textTransform: 'uppercase',
              color: 'var(--link)',
            }}>
              <span className="animate-pulse" style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--data-positive)' }} />
              Contact
            </div>
            <h1
              style={{
                fontSize: '28px',
                fontWeight: 700,
                color: 'var(--chrome-text, #FFFFFF)',
                fontFamily: 'var(--font-legal)',
                letterSpacing: '-0.025em',
                marginBottom: 8,
                lineHeight: 1.1,
              }}
            >
              Get in Touch
            </h1>
            <p
              style={{
                fontSize: 16,
                color: 'var(--chrome-text, #FFFFFF)',
                fontFamily: 'var(--font-ui)',
                lineHeight: 1.65,
                maxWidth: 560,
              }}
            >
              Questions about data methodology, enterprise API access, partnerships, or general support—our team typically responds within one business day.
            </p>
          </div>
        </div>

        {/* Breadcrumb Navigation */}
        <div style={{ borderBottom: '1px solid var(--bdr)', paddingTop: '1rem', paddingBottom: '1rem', backgroundColor: 'var(--surf)' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', paddingLeft: '24px', paddingRight: '24px' }}>
            <nav style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', fontFamily: 'var(--font-ui)' }}>
              <Link href="/" style={{ color: 'var(--gold)', textDecoration: 'none' }}>
                Home
              </Link>
              <span style={{ color: 'var(--text2)' }}>/</span>
              <span style={{ color: 'var(--text2)' }}>Contact</span>
            </nav>
          </div>
        </div>

        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '48px 24px' }}>

        {/* Quick Links Section */}
        <div style={{ marginBottom: '48px' }}>
          <h2
            style={{
              fontSize: 24,
              fontWeight: 600,
              color: 'var(--text1)',
              fontFamily: 'var(--font-ui)',
              marginBottom: 24,
            }}
          >
            Helpful Resources
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 24 }}>
            {[
              {
                title: 'FAQ',
                href: '/faq',
                description: 'Answers to common questions about MyCaseValue.',
              },
              {
                title: 'Methodology',
                href: '/methodology',
                description: 'Learn how we analyze and calculate case data.',
              },
              {
                title: 'Glossary',
                href: '/glossary',
                description: 'Legal terms explained in plain English.',
              },
              {
                title: 'About',
                href: '/about',
                description: 'Our mission and story.',
              },
            ].map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  padding: 24,
                  borderRadius: '4px',
                  border: '1px solid var(--bdr)',
                  background: 'var(--card)',
                  boxShadow: 'var(--shadow-xs)',
                  textDecoration: 'none',
                  color: 'inherit',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 8,
                }}
                className="contact-quick-link"
              >
                <h3
                  style={{
                    fontSize: 16,
                    fontWeight: 600,
                    color: 'var(--text1)',
                    fontFamily: 'var(--font-ui)',
                    margin: 0,
                  }}
                >
                  {link.title}
                </h3>
                <p
                  style={{
                    fontSize: 14,
                    color: 'var(--text2)',
                    fontFamily: 'var(--font-ui)',
                    lineHeight: 1.5,
                    margin: 0,
                  }}
                >
                  {link.description}
                </p>
              </Link>
            ))}
          </div>
        </div>

        <style>{`
          .contact-quick-link:hover {
            border-color: var(--link) !important;
            box-shadow: 0 8px 24px rgba(27, 58, 92, 0.12) !important;
            transform: translateY(-4px);
          }
        `}</style>

        <div className="contact-page-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
          {/* Left Column: Contact Info Cards */}
          <div style={{ display: 'grid', gap: 24, gridColumn: '1' }}>
            {/* Support */}
            <div
              style={{
                padding: 32,
                borderRadius: '4px',
                border: '1px solid var(--bdr)',
                background: 'var(--card)',
                boxShadow: 'var(--shadow-xs)',
              }}
            >
              <h2
                style={{
                  fontSize: 18,
                  fontWeight: 600,
                  color: 'var(--text1)',
                  fontFamily: 'var(--font-ui)',
                  marginBottom: 8,
                }}
              >
                Support & Feedback
              </h2>
              <p
                style={{
                  fontSize: 14,
                  color: 'var(--text2)',
                  fontFamily: 'var(--font-ui)',
                  lineHeight: 1.6,
                  marginBottom: 16,
                }}
              >
                Account questions, technical issues, billing inquiries, or feature ideas. We read every message and respond promptly.
              </p>
              <a
                href="mailto:support@mycasevalues.com"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  fontSize: 16,
                  fontWeight: 600,
                  color: 'var(--link)',
                  textDecoration: 'none',
                  fontFamily: 'var(--font-ui)',
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="M22 7l-10 7L2 7" />
                </svg>
                support@mycasevalues.com
              </a>
            </div>

            {/* Enterprise */}
            <div
              style={{
                padding: 32,
                borderRadius: '4px',
                border: '1px solid var(--bdr)',
                background: 'var(--card)',
                boxShadow: 'var(--shadow-xs)',
              }}
            >
              <h2
                style={{
                  fontSize: 18,
                  fontWeight: 600,
                  color: 'var(--text1)',
                  fontFamily: 'var(--font-ui)',
                  marginBottom: 8,
                }}
              >
                Enterprise Solutions
              </h2>
              <p
                style={{
                  fontSize: 14,
                  color: 'var(--text2)',
                  fontFamily: 'var(--font-ui)',
                  lineHeight: 1.6,
                  marginBottom: 16,
                }}
              >
                Bulk data licensing, API access, custom integrations, team accounts, and dedicated support for your firm.
              </p>
              <a
                href="mailto:enterprise@mycasevalues.com"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  fontSize: 16,
                  fontWeight: 600,
                  color: 'var(--link)',
                  textDecoration: 'none',
                  fontFamily: 'var(--font-ui)',
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="M22 7l-10 7L2 7" />
                </svg>
                enterprise@mycasevalues.com
              </a>
            </div>

            {/* Methodology */}
            <div
              style={{
                padding: 32,
                borderRadius: '4px',
                border: '1px solid var(--bdr)',
                background: 'var(--card)',
                boxShadow: 'var(--shadow-xs)',
              }}
            >
              <h2
                style={{
                  fontSize: 18,
                  fontWeight: 600,
                  color: 'var(--text1)',
                  fontFamily: 'var(--font-ui)',
                  marginBottom: 8,
                }}
              >
                Data Transparency
              </h2>
              <p
                style={{
                  fontSize: 14,
                  color: 'var(--text2)',
                  fontFamily: 'var(--font-ui)',
                  lineHeight: 1.6,
                  marginBottom: 16,
                }}
              >
                Want to understand our methodology? Need details about data sources or how we calculate outcomes? We provide full transparency on everything.
              </p>
              <Link
                href="/methodology"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  fontSize: 16,
                  fontWeight: 600,
                  color: 'var(--link)',
                  textDecoration: 'none',
                  fontFamily: 'var(--font-ui)',
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

        {/* Response Time Info Box */}
        <div
          style={{
            padding: '24px',
            marginTop: 48,
            marginBottom: 24,
            borderRadius: '4px',
            border: '1px solid var(--bdr)',
            backgroundColor: 'rgba(0,105,151,0.05)',
            textAlign: 'center',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '8px' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--link)" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--gold)', fontFamily: 'var(--font-ui)' }}>
              Response Time
            </span>
          </div>
          <p
            style={{
              fontSize: 14,
              color: 'var(--text2)',
              fontFamily: 'var(--font-ui)',
              margin: 0,
              lineHeight: 1.6,
            }}
          >
            We typically respond within 24-48 hours. For urgent account issues, include your account email address in your message.
          </p>
        </div>

        <p
          style={{
            fontSize: 14,
            color: 'var(--text2)',
            fontFamily: 'var(--font-ui)',
            textAlign: 'center',
            marginTop: 24,
            lineHeight: 1.6,
          }}
        >
          You can also reach out via email at <a href="mailto:support@mycasevalues.com" style={{ color: 'var(--link)', textDecoration: 'none', fontWeight: 600 }}>support@mycasevalues.com</a> or <a href="mailto:enterprise@mycasevalues.com" style={{ color: 'var(--link)', textDecoration: 'none', fontWeight: 600 }}>enterprise@mycasevalues.com</a>
        </p>
        </div>
      </div>
    </>
  );
}
