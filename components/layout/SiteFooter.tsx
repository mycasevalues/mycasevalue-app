/**
 * SiteFooter.tsx — Glassmorphism footer with subtle glass border.
 * Rendered from app/layout.tsx so every page gets consistent footer.
 */

import Link from 'next/link';

const FOOTER_COLUMNS = [
  {
    heading: 'Explore',
    links: [
      { label: 'Search cases', href: '/search' },
      { label: 'Case types', href: '/cases' },
      { label: 'Districts', href: '/districts' },
      { label: 'Calculator', href: '/calculator' },
      { label: 'Translate', href: '/translate' },
      { label: 'Attorney Mode', href: '/attorney' },
      { label: 'How It Works', href: '/how-it-works' },
    ],
  },
  {
    heading: 'Account',
    links: [
      { label: 'Sign in', href: '/sign-in' },
      { label: 'Create account', href: '/sign-up' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'Dashboard', href: '/dashboard' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Methodology', href: '/methodology' },
      { label: 'Blog', href: '/blog' },
      { label: 'Contact', href: '/contact' },
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
    ],
  },
  {
    heading: 'Resources',
    links: [
      { label: 'How It Works', href: '/how-it-works' },
      { label: 'FAQ', href: '#faq' },
      { label: 'API Access', href: '/attorney/api-access' },
      { label: 'Documentation', href: '/methodology' },
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
            gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr',
            gap: '48px',
            marginBottom: '48px',
          }}
        >
          {/* Brand column */}
          <div>
            <div style={{ marginBottom: '12px' }}>
              <img src="/logo.svg" alt="MyCaseValue" style={{ height: '26px', width: 'auto', filter: 'brightness(0) invert(1)', marginBottom: '12px' }} />
            </div>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '14px',
              color: 'rgba(255,255,255,0.6)',
              lineHeight: 1.6,
              marginBottom: '8px',
            }}>
              MyCaseValue provides data-driven federal court case analytics. Research settlement values, win rates, and judge statistics across all 94 federal judicial districts.
            </p>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '12px',
              color: 'rgba(255,255,255,0.4)',
            }}>
              Built on PACER &middot; FJC &middot; CourtListener data
            </p>
          </div>

          {/* Link columns */}
          {FOOTER_COLUMNS.map(col => (
            <div key={col.heading}>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '11px',
                fontWeight: 600,
                color: '#FFFFFF',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                marginBottom: '16px',
              }}>
                {col.heading}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {col.links.map(link => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="site-footer-link"
                    style={{
                      fontSize: '14px',
                      color: 'rgba(255,255,255,0.7)',
                      textDecoration: 'none',
                      fontFamily: 'var(--font-body)',
                      transition: 'color 150ms',
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
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '8px',
          padding: '32px 24px',
          marginBottom: '48px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '24px',
        }}>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '16px',
            fontWeight: 500,
            color: '#FFFFFF',
            margin: 0,
          }}>
            Ready to research your case?
          </p>
          <Link href="/search" style={{
            background: '#DC2626',
            color: '#FFFFFF',
            padding: '10px 24px',
            borderRadius: '6px',
            textDecoration: 'none',
            fontFamily: 'var(--font-body)',
            fontWeight: 500,
            fontSize: '14px',
            transition: 'background 150ms',
            display: 'inline-block',
          }} className="site-footer-cta-button">
            Start Free Trial
          </Link>
        </div>

        {/* Follow Us section with SVG icons */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.1)',
          paddingTop: '24px',
          paddingBottom: '24px',
        }}>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '11px',
            fontWeight: 600,
            color: '#FFFFFF',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            marginBottom: '16px',
          }}>
            Follow Us
          </p>
          <div style={{ display: 'flex', gap: '24px' }}>
            {/* Twitter/X Icon */}
            <Link href="https://twitter.com/mycasevalue" className="site-footer-social-icon" style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'opacity 150ms',
            }} title="Twitter/X">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2s9 5 20 5a9.5 9.5 0 00-9-5.5c4.75 2.25 7-1 7-1"></path>
              </svg>
            </Link>
            {/* LinkedIn Icon */}
            <Link href="https://linkedin.com/company/mycasevalue" className="site-footer-social-icon" style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'opacity 150ms',
            }} title="LinkedIn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </Link>
            {/* Facebook Icon */}
            <Link href="https://facebook.com/mycasevalue" className="site-footer-social-icon" style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'opacity 150ms',
            }} title="Facebook">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a6 6 0 00-6 6v3H7v4h2v8h4v-8h3l1-4h-4V8a2 2 0 012-2h3z"></path>
              </svg>
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.1)',
          paddingTop: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '8px',
        }}>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '12px',
            color: 'rgba(255,255,255,0.4)',
            margin: 0,
          }}>
            &copy; 2026 MyCaseValue LLC. All rights reserved.
          </p>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '12px',
            color: 'rgba(255,255,255,0.4)',
            margin: 0,
          }}>
            For informational purposes only. Not legal advice.
          </p>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .site-footer-link:hover { color: #FFFFFF !important; }
        .site-footer-social-icon:hover svg { stroke: #FFFFFF !important; opacity: 1 !important; }
        .site-footer-cta-button:hover { background: #B91C1C !important; }
        @media (max-width: 768px) {
          .site-footer-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 480px) {
          .site-footer-grid { grid-template-columns: 1fr !important; }
        }
      `}} />
    </footer>
  );
}
