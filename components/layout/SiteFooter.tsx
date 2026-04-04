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
            gridTemplateColumns: '2fr 1fr 1fr 1fr',
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
              What really happened in cases like yours.
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

        {/* Follow Us section */}
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
            <Link href="https://twitter.com/mycasevalue" className="site-footer-link" style={{
              fontSize: '14px',
              color: 'rgba(255,255,255,0.7)',
              textDecoration: 'none',
              fontFamily: 'var(--font-body)',
              transition: 'color 150ms',
            }}>
              Twitter
            </Link>
            <Link href="https://linkedin.com/company/mycasevalue" className="site-footer-link" style={{
              fontSize: '14px',
              color: 'rgba(255,255,255,0.7)',
              textDecoration: 'none',
              fontFamily: 'var(--font-body)',
              transition: 'color 150ms',
            }}>
              LinkedIn
            </Link>
            <Link href="https://facebook.com/mycasevalue" className="site-footer-link" style={{
              fontSize: '14px',
              color: 'rgba(255,255,255,0.7)',
              textDecoration: 'none',
              fontFamily: 'var(--font-body)',
              transition: 'color 150ms',
            }}>
              Facebook
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
            &copy; {new Date().getFullYear()} MyCaseValue LLC. All rights reserved.
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
