/**
 * SiteFooter.tsx — Lightweight site-wide footer (Server Component compatible).
 * Rendered from app/layout.tsx so every page gets consistent footer.
 * The homepage client component (MyCaseValue) renders its own Footer and hides this via CSS.
 */

import Link from 'next/link';

export default function SiteFooter() {
  return (
    <footer
      className="site-footer"
      style={{
        borderTop: '1px solid var(--border-default)',
        background: 'var(--bg-base)',
        padding: '40px 24px 24px',
      }}
    >
      <div style={{ maxWidth: '1140px', margin: '0 auto' }}>
        {/* Top row: brand + links */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            gap: '32px',
            marginBottom: '24px',
          }}
        >
          {/* Brand */}
          <div style={{ maxWidth: '320px' }}>
            <Link
              href="/"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '16px',
                fontWeight: 900,
                color: 'var(--fg-primary)',
                textDecoration: 'none',
                letterSpacing: '-0.5px',
              }}
            >
              MyCaseValue
            </Link>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '12px',
                color: 'var(--fg-muted)',
                lineHeight: 1.6,
                marginTop: '8px',
              }}
            >
              Aggregate historical data from public federal court records for
              informational and research purposes only. Not legal advice.
            </p>
          </div>

          {/* Nav links */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '24px',
              fontSize: '12px',
              fontFamily: 'var(--font-body)',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ fontWeight: 700, color: 'var(--fg-primary)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px' }}>Product</span>
              <Link href="/how-it-works" style={{ color: 'var(--fg-muted)', textDecoration: 'none' }}>How It Works</Link>
              <Link href="/cases" style={{ color: 'var(--fg-muted)', textDecoration: 'none' }}>Case Types</Link>
              <Link href="/pricing" style={{ color: 'var(--fg-muted)', textDecoration: 'none' }}>Pricing</Link>
              <Link href="/faq" style={{ color: 'var(--fg-muted)', textDecoration: 'none' }}>FAQ</Link>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ fontWeight: 700, color: 'var(--fg-primary)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px' }}>Legal</span>
              <Link href="/terms" style={{ color: 'var(--fg-muted)', textDecoration: 'none' }}>Terms of Service</Link>
              <Link href="/privacy" style={{ color: 'var(--fg-muted)', textDecoration: 'none' }}>Privacy Policy</Link>
              <Link href="/methodology" style={{ color: 'var(--fg-muted)', textDecoration: 'none' }}>Methodology</Link>
              <Link href="/about" style={{ color: 'var(--fg-muted)', textDecoration: 'none' }}>About</Link>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ fontWeight: 700, color: 'var(--fg-primary)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px' }}>Contact</span>
              <a href="mailto:support@mycasevalue.com" style={{ color: 'var(--fg-muted)', textDecoration: 'none' }}>support@mycasevalue.com</a>
              <a href="mailto:billing@mycasevalue.com" style={{ color: 'var(--fg-muted)', textDecoration: 'none' }}>billing@mycasevalue.com</a>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div
          style={{
            borderTop: '1px solid var(--border-default)',
            paddingTop: '16px',
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
              fontSize: '11px',
              color: 'var(--fg-muted)',
              margin: 0,
            }}
          >
            © {new Date().getFullYear()} MyCaseValue LLC. All rights reserved.
          </p>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '11px',
              color: 'var(--fg-muted)',
              margin: 0,
            }}
          >
            Data from FJC, PACER, CourtListener
          </p>
        </div>
      </div>
    </footer>
  );
}
