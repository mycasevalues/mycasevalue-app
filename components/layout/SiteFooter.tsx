/**
 * SiteFooter.tsx — Dark navy footer with LexisNexis-style corporate layout.
 * Rendered from app/layout.tsx so every page gets consistent footer.
 */

import Link from 'next/link';
import Image from 'next/image';

const FOOTER_COLUMNS = [
  {
    heading: 'Case Research',
    links: [
      { label: 'Search cases', href: '/search' },
      { label: 'Case types', href: '/cases' },
      { label: 'Districts', href: '/districts' },
      { label: 'Judge statistics', href: '/judges' },
      { label: 'Settlement data', href: '/settlements' },
    ],
  },
  {
    heading: 'Resources',
    links: [
      { label: 'How it works', href: '/how-it-works' },
      { label: 'FAQ', href: '/faq' },
      { label: 'Documentation', href: '/methodology' },
      { label: 'Blog', href: '/blog' },
      { label: 'Calculator', href: '/calculator' },
    ],
  },
  {
    heading: 'Legal Tools',
    links: [
      { label: 'Attorney mode', href: '/attorney' },
      { label: 'API access', href: '/attorney/api-access' },
      { label: 'Integrations', href: '/integrations' },
      { label: 'Translate', href: '/translate' },
      { label: 'Pricing', href: '/pricing' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Methodology', href: '/methodology' },
      { label: 'Contact', href: '/contact' },
      { label: 'Sign in', href: '/sign-in' },
      { label: 'Create account', href: '/sign-up' },
    ],
  },
];

export default function SiteFooter() {
  return (
    <footer
      className="site-footer"
      role="contentinfo"
      style={{
        background: '#00172E',
        backdropFilter: undefined,
        WebkitBackdropFilter: undefined,
        borderTop: 'none',
        color: 'rgba(255,255,255,0.7)',
        padding: '64px 24px 32px',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* Top: brand + columns */}
        <div
          className="site-footer-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1.5fr 1fr 1fr 1fr 1fr',
            gap: '56px',
            marginBottom: '56px',
          }}
        >
          {/* Brand column */}
          <div>
            <div className="site-footer-logo">
              <Image
                src="/logo.svg"
                alt="MyCaseValue"
                width={112}
                height={28}
                style={{ display: 'block' }}
              />
            </div>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '13px',
              color: '#D5D8DC',
              lineHeight: 1.7,
              marginBottom: '12px',
            }}>
              Federal court case analytics with data-driven insights on settlement values, win rates, and judge statistics across all 94 judicial districts.
            </p>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '11px',
              color: 'rgba(213, 216, 220, 0.6)',
              letterSpacing: '0.05em',
            }}>
              Powered by PACER &middot; FJC &middot; CourtListener
            </p>
          </div>

          {/* Link columns */}
          {FOOTER_COLUMNS.map(col => (
            <div key={col.heading}>
              <h4 style={{
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
                fontWeight: 700,
                color: '#FFFFFF',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                marginBottom: '20px',
                margin: 0,
                paddingBottom: '0',
              }}>
                {col.heading}
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '20px' }}>
                {col.links.map(link => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="site-footer-link"
                    style={{
                      fontSize: '13px',
                      color: '#D5D8DC',
                      textDecoration: 'none',
                      fontFamily: 'var(--font-body)',
                      fontWeight: 400,
                      transition: 'color 150ms ease-out',
                    }}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA Row */}
        <div style={{
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '4px',
          padding: '32px 28px',
          marginBottom: '48px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '24px',
        }}>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '15px',
            fontWeight: 500,
            color: '#FFFFFF',
            margin: 0,
          }}>
            Ready to research your case?
          </p>
          <Link href="/search" style={{
            background: '#E8171F',
            color: '#FFFFFF',
            padding: '11px 28px',
            borderRadius: '4px',
            textDecoration: 'none',
            fontFamily: 'var(--font-body)',
            fontWeight: 600,
            fontSize: '13px',
            transition: 'background 150ms ease-out',
            display: 'inline-block',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }} className="site-footer-cta-button">
            Start Free Trial
          </Link>
        </div>

        {/* Follow Us section with SVG icons */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.08)',
          paddingTop: '28px',
          paddingBottom: '28px',
        }}>
          <h4 style={{
            fontFamily: 'var(--font-body)',
            fontSize: '14px',
            fontWeight: 700,
            color: '#FFFFFF',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            marginBottom: '20px',
            margin: 0,
          }}>
            Connect With Us
          </h4>
          <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
            {/* Twitter/X Icon */}
            <Link href="https://twitter.com/mycasevalue" className="site-footer-social-icon" style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 150ms ease-out',
              padding: '8px',
              borderRadius: '4px',
            }} title="Twitter/X">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D5D8DC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2s9 5 20 5a9.5 9.5 0 00-9-5.5c4.75 2.25 7-1 7-1"></path>
              </svg>
            </Link>
            {/* LinkedIn Icon */}
            <Link href="https://linkedin.com/company/mycasevalue" className="site-footer-social-icon" style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 150ms ease-out',
              padding: '8px',
              borderRadius: '4px',
            }} title="LinkedIn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D5D8DC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </Link>
            {/* Facebook Icon */}
            <Link href="https://facebook.com/mycasevalue" className="site-footer-social-icon" style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 150ms ease-out',
              padding: '8px',
              borderRadius: '4px',
            }} title="Facebook">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D5D8DC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a6 6 0 00-6 6v3H7v4h2v8h4v-8h3l1-4h-4V8a2 2 0 012-2h3z"></path>
              </svg>
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.08)',
          paddingTop: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '12px',
              color: 'rgba(213, 216, 220, 0.6)',
              margin: 0,
              fontWeight: 400,
            }}>
              &copy; 2026 MyCaseValue LLC
            </p>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <span style={{
                fontFamily: 'var(--font-body)',
                fontSize: '11px',
                color: 'rgba(213, 216, 220, 0.4)',
              }}>|</span>
              <Link href="/privacy" style={{
                fontFamily: 'var(--font-body)',
                fontSize: '12px',
                color: '#D5D8DC',
                textDecoration: 'none',
                transition: 'color 150ms ease-out',
              }} className="site-footer-legal-link">
                Privacy Policy
              </Link>
              <span style={{
                fontFamily: 'var(--font-body)',
                fontSize: '11px',
                color: 'rgba(213, 216, 220, 0.4)',
              }}>|</span>
              <Link href="/terms" style={{
                fontFamily: 'var(--font-body)',
                fontSize: '12px',
                color: '#D5D8DC',
                textDecoration: 'none',
                transition: 'color 150ms ease-out',
              }} className="site-footer-legal-link">
                Terms of Service
              </Link>
            </div>
          </div>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '12px',
            color: 'rgba(213, 216, 220, 0.6)',
            margin: 0,
            fontWeight: 400,
          }}>
            For informational purposes only. Not legal advice.
          </p>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .site-footer-logo {
          margin-bottom: 16px;
          display: inline-block;
        }
        .site-footer-logo img {
          filter: brightness(0) invert(1);
          margin-bottom: 12px;
          display: block;
        }
        .site-footer-link:hover {
          color: #FFFFFF !important;
          text-decoration: none;
        }
        .site-footer-legal-link:hover {
          color: #FFFFFF !important;
          text-decoration: underline;
        }
        .site-footer-social-icon:hover svg {
          stroke: #FFFFFF !important;
        }
        .site-footer-social-icon:hover {
          background: rgba(255, 255, 255, 0.1) !important;
        }
        .site-footer-cta-button:hover {
          background: #CC1019 !important;
          transform: translateY(-1px);
        }
        @media (max-width: 768px) {
          .site-footer-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 40px !important;
            margin-bottom: 40px !important;
          }
        }
        @media (max-width: 480px) {
          .site-footer-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
            margin-bottom: 32px !important;
          }
        }
      `}} />
    </footer>
  );
}
