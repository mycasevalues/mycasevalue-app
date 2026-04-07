/**
 * SiteFooter.tsx — Dark navy footer with LexisNexis-style corporate layout.
 * Rendered from app/layout.tsx so every page gets consistent footer.
 */

import Link from 'next/link';
// Image import removed — logo uses plain <img> for SVG compatibility

const FOOTER_COLUMNS = [
  {
    heading: 'Case Research',
    links: [
      { label: 'Search cases', href: '/search' },
      { label: 'Case types', href: '/cases' },
      { label: 'Districts', href: '/districts' },
      { label: 'Judge statistics', href: '/judges' },
      { label: 'Settlement data', href: '/cases' },
      { label: 'NOS code explorer', href: '/nos-explorer' },
      { label: 'Calculator', href: '/calculator' },
    ],
  },
  {
    heading: 'Solutions',
    links: [
      { label: 'For individuals', href: '/solutions/individuals' },
      { label: 'For small firms', href: '/solutions/small-firms' },
      { label: 'For enterprise', href: '/solutions/enterprise' },
      { label: 'For insurance', href: '/solutions/insurance' },
      { label: 'For litigation funders', href: '/solutions/funders' },
      { label: 'All solutions', href: '/solutions' },
    ],
  },
  {
    heading: 'Attorney Tools',
    links: [
      { label: 'Attorney mode', href: '/attorney' },
      { label: 'Case predictor', href: '/attorney/case-predictor' },
      { label: 'Judge intelligence', href: '/attorney/judge-intelligence' },
      { label: 'API access', href: '/solutions/api' },
      { label: 'Pricing', href: '/pricing' },
    ],
  },
  {
    heading: 'Resources',
    links: [
      { label: 'How it works', href: '/how-it-works' },
      { label: 'Methodology', href: '/methodology' },
      { label: 'Blog', href: '/blog' },
      { label: 'FAQ', href: '/faq' },
      { label: 'Legal glossary', href: '/glossary' },
      { label: 'Jargon translator', href: '/translate' },
      { label: 'Filing trends', href: '/trends' },
      { label: 'Compare cases', href: '/compare' },
      { label: 'Data Changelog', href: '/data/changelog' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Platform Overview', href: '/platform' },
      { label: 'Contact', href: '/contact' },
      { label: 'Press Kit', href: '/press' },
      { label: 'Disclaimer', href: '/disclaimer' },
      { label: 'Privacy policy', href: '/privacy' },
      { label: 'Terms of service', href: '/terms' },
      { label: 'Acceptable Use Policy', href: '/legal/aup' },
      { label: 'Cookie Policy', href: '/legal/cookies' },
      { label: 'Sign In', href: '/sign-in' },
      { label: 'Create Account', href: '/sign-up' },
    ],
  },
];

export default function SiteFooter() {
  return (
    <footer
      className="site-footer"
      role="contentinfo"
      style={{
        background: '#1C3A5E',
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
            gridTemplateColumns: '1.5fr 1fr 1fr 1fr 1fr 1fr',
            gap: '56px',
            marginBottom: '56px',
          }}
        >
          {/* Brand column */}
          <div>
            <div className="site-footer-logo">
              {/* Brand identity mark — on navy variant */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <svg width="30" height="30" viewBox="-100 -100 200 200" style={{ display: 'block', flexShrink: 0 }}>
                  <rect x="-100" y="-100" width="200" height="200" rx="26" fill="#0966C3" />
                  <g transform="rotate(12)">
                    <polygon points="0,0 -40,-69.3 40,-69.3 80,0" fill="white" opacity="0.93" />
                    <polygon points="0,0 80,0 40,69.3 -40,69.3" fill="white" opacity="0.52" />
                    <polygon points="0,0 -40,69.3 -80,0 -40,-69.3" fill="white" opacity="0.24" />
                  </g>
                </svg>
                <span style={{ fontFamily: 'var(--font-inter), Inter, -apple-system, BlinkMacSystemFont, sans-serif', fontSize: '17px', fontWeight: 700, letterSpacing: '-0.3px', color: '#FFFFFF', whiteSpace: 'nowrap' }}>
                  MyCase<span style={{ color: '#0966C3' }}>Value</span>
                </span>
              </div>
            </div>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '13px',
              color: '#E5E7EB',
              lineHeight: 1.7,
              marginBottom: '12px',
            }}>
              Federal court analytics powered by public records.
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
                fontWeight: 600,
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
                      color: '#E5E7EB',
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
          borderRadius: '12px',
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
          <Link href="/sign-up" style={{
            background: '#0966C3',
            color: '#FAFBFC',
            padding: '0.75rem 1.5rem',
            borderRadius: '20px',
            textDecoration: 'none',
            fontFamily: 'var(--font-body)',
            fontWeight: 600,
            fontSize: '1rem',
            transition: 'background 150ms ease-out',
            display: 'inline-block',
          }} className="site-footer-cta-button">
            Start Researching
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
            fontWeight: 600,
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
            <Link href="https://twitter.com/mycasevalue" target="_blank" rel="noopener noreferrer" className="site-footer-social-icon" style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 150ms ease-out',
              padding: '8px',
              borderRadius: '12px',
            }} title="Twitter/X">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#E5E7EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2s9 5 20 5a9.5 9.5 0 00-9-5.5c4.75 2.25 7-1 7-1"></path>
              </svg>
            </Link>
            {/* LinkedIn Icon */}
            <Link href="https://linkedin.com/company/mycasevalue" target="_blank" rel="noopener noreferrer" className="site-footer-social-icon" style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 150ms ease-out',
              padding: '8px',
              borderRadius: '12px',
            }} title="LinkedIn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#E5E7EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </Link>
            {/* Facebook Icon */}
            <Link href="https://facebook.com/company/mycasevalue" target="_blank" rel="noopener noreferrer" className="site-footer-social-icon" style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 150ms ease-out',
              padding: '8px',
              borderRadius: '12px',
            }} title="Facebook">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#E5E7EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
              &copy; 2026 MyCaseValue LLC. All rights reserved.
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
                color: '#E5E7EB',
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
                color: '#E5E7EB',
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

        {/* Legal disclaimer */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.06)',
          paddingTop: '20px',
          marginTop: '20px',
        }}>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '11px',
            color: 'rgba(213, 216, 220, 0.35)',
            lineHeight: 1.6,
            margin: 0,
            maxWidth: '800px',
          }}>
            MyCaseValue provides aggregate historical data from public federal court records for informational and research purposes only. Nothing on this platform constitutes legal advice or creates an attorney-client relationship. Case outcome data reflects historical averages and does not predict individual results. Always consult a licensed attorney before making legal decisions. Data sourced from the Federal Judicial Center Integrated Database, PACER, CourtListener, and the Bureau of Justice Statistics. &copy; 2026 MyCaseValue LLC. All rights reserved.
          </p>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .site-footer-logo {
          margin-bottom: 16px;
          display: inline-block;
        }
        .site-footer-logo svg {
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
          background: #004182 !important;
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
