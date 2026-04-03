/**
 * SiteFooter.tsx — Site-wide dark footer (Server Component compatible).
 * bg #111111 — the ONLY dark element on the entire site per Paper design system.
 * Rendered from app/layout.tsx so every page gets consistent footer.
 * The homepage client component (MyCaseValue) renders its own Footer and hides this via CSS.
 */

import Link from 'next/link';

export default function SiteFooter() {
  return (
    <footer
      className="site-footer"
      style={{
        background: '#111111',
        borderTop: '1px solid rgba(255,255,255,0.08)',
        padding: '64px 24px 32px',
        color: 'rgba(255,255,255,0.6)',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* 4-column grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '40px',
            marginBottom: '48px',
          }}
        >
          {/* Col 1: Brand */}
          <div>
            <Link
              href="/"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '20px',
                fontWeight: 900,
                color: '#FFFFFF',
                textDecoration: 'none',
                letterSpacing: '-0.5px',
              }}
            >
              MyCaseValue
            </Link>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
                color: 'rgba(255,255,255,0.5)',
                lineHeight: 1.6,
                marginTop: '8px',
              }}
            >
              What really happened in cases like yours.
            </p>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '12px',
                color: 'rgba(255,255,255,0.4)',
                marginTop: '8px',
              }}
            >
              Built on PACER &middot; FJC &middot; CourtListener data
            </p>
          </div>

          {/* Col 2: Explore */}
          <div>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '11px',
                fontWeight: 600,
                color: 'rgba(255,255,255,0.4)',
                textTransform: 'uppercase',
                letterSpacing: '0.10em',
                marginBottom: '16px',
              }}
            >
              Explore
            </p>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <Link href="/districts" className="site-footer-link" style={footerLinkStyle}>Districts</Link>
              <Link href="/cases" className="site-footer-link" style={footerLinkStyle}>Case Types</Link>
              <Link href="/judges" className="site-footer-link" style={footerLinkStyle}>Judge Profiles</Link>
              <Link href="/calculator" className="site-footer-link" style={footerLinkStyle}>Settlement Calculator</Link>
              <Link href="/attorney" className="site-footer-link" style={footerLinkStyle}>Attorney Mode</Link>
            </nav>
          </div>

          {/* Col 3: Account */}
          <div>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '11px',
                fontWeight: 600,
                color: 'rgba(255,255,255,0.4)',
                textTransform: 'uppercase',
                letterSpacing: '0.10em',
                marginBottom: '16px',
              }}
            >
              Account
            </p>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <Link href="/sign-in" className="site-footer-link" style={footerLinkStyle}>Sign In</Link>
              <Link href="/sign-up" className="site-footer-link" style={footerLinkStyle}>Create Account</Link>
              <Link href="/pricing" className="site-footer-link" style={footerLinkStyle}>Pricing</Link>
              <Link href="/dashboard" className="site-footer-link" style={footerLinkStyle}>Dashboard</Link>
            </nav>
          </div>

          {/* Col 4: Company */}
          <div>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '11px',
                fontWeight: 600,
                color: 'rgba(255,255,255,0.4)',
                textTransform: 'uppercase',
                letterSpacing: '0.10em',
                marginBottom: '16px',
              }}
            >
              Company
            </p>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <Link href="/methodology" className="site-footer-link" style={footerLinkStyle}>Methodology</Link>
              <Link href="/about" className="site-footer-link" style={footerLinkStyle}>About</Link>
              <Link href="/privacy" className="site-footer-link" style={footerLinkStyle}>Privacy Policy</Link>
              <Link href="/terms" className="site-footer-link" style={footerLinkStyle}>Terms of Service</Link>
            </nav>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: '1px solid rgba(255,255,255,0.08)',
            paddingTop: '24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '8px',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '12px',
              color: 'rgba(255,255,255,0.4)',
              margin: 0,
            }}
          >
            &copy; {new Date().getFullYear()} MyCaseValue. All rights reserved.
          </p>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '12px',
              color: 'rgba(255,255,255,0.4)',
              margin: 0,
            }}
          >
            For informational purposes only. Not legal advice.
          </p>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .site-footer-link:hover { color: rgba(255,255,255,1) !important; }
      `}} />
    </footer>
  );
}

const footerLinkStyle: React.CSSProperties = {
  fontFamily: 'var(--font-body)',
  fontSize: '14px',
  color: 'rgba(255,255,255,0.6)',
  textDecoration: 'none',
  transition: 'color 200ms ease',
};
