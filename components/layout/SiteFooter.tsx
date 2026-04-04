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
        background: '#FFFFFF',
        backdropFilter: undefined,
        WebkitBackdropFilter: undefined,
        borderTop: '1px solid #E5EBF0',
        color: '#666666',
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <div style={{
                width: '28px',
                height: '28px',
                background: '#E8171F',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                  <path d="M12 2v20M2 10h20M4 10l3 8h10l3-8"/>
                </svg>
              </div>
              <span style={{ fontSize: '18px', fontWeight: 800, color: '#212529', fontFamily: 'var(--font-display)' }}>
                MyCaseValue
              </span>
            </div>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '14px',
              color: '#666666',
              lineHeight: 1.6,
              marginBottom: '8px',
            }}>
              What really happened in cases like yours.
            </p>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '12px',
              color: '#999999',
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
                color: '#455A64',
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
                      color: '#666666',
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

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid #E5EBF0',
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
            color: '#999999',
            margin: 0,
          }}>
            &copy; {new Date().getFullYear()} MyCaseValue LLC. All rights reserved.
          </p>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '12px',
            color: '#999999',
            margin: 0,
          }}>
            For informational purposes only. Not legal advice.
          </p>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .site-footer-link:hover { color: #212529 !important; }
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
