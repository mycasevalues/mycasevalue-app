/**
 * SiteNav.tsx — Lightweight site-wide navigation bar (Server Component compatible).
 * Rendered from app/layout.tsx so every page gets consistent nav.
 * The homepage client component (MyCaseValue) renders its own Navbar and hides this via CSS.
 */

import Link from 'next/link';

export default function SiteNav() {
  return (
    <nav
      className="site-nav border-b"
      style={{
        background: '#FFFFFF',
        borderColor: 'var(--border-default)',
      }}
      role="navigation"
      aria-label="Site navigation"
    >
      <div
        style={{
          maxWidth: '1140px',
          margin: '0 auto',
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '56px',
        }}
      >
        {/* Logo / Wordmark */}
        <Link
          href="/"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '18px',
            fontWeight: 900,
            color: 'var(--fg-primary)',
            textDecoration: 'none',
            letterSpacing: '-0.5px',
          }}
        >
          MyCaseValue
        </Link>

        {/* Desktop links */}
        <div
          className="site-nav-links"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
          }}
        >
          {[
            { href: '/how-it-works', label: 'How It Works' },
            { href: '/cases', label: 'Case Types' },
            { href: '/pricing', label: 'Pricing' },
            { href: '/faq', label: 'FAQ' },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                padding: '6px 12px',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: 500,
                color: 'var(--fg-primary)',
                textDecoration: 'none',
                fontFamily: 'var(--font-body)',
              }}
              className="site-nav-link"
            >
              {link.label}
            </Link>
          ))}

          <Link
            href="/sign-in"
            style={{
              padding: '6px 12px',
              fontSize: '14px',
              fontWeight: 500,
              color: 'var(--fg-muted)',
              textDecoration: 'none',
              fontFamily: 'var(--font-body)',
            }}
            className="site-nav-link"
          >
            Sign In
          </Link>

          <Link
            href="/"
            style={{
              padding: '8px 16px',
              fontSize: '14px',
              fontWeight: 600,
              color: '#FFFFFF',
              background: '#111111',
              borderRadius: '8px',
              textDecoration: 'none',
              fontFamily: 'var(--font-body)',
              marginLeft: '4px',
            }}
          >
            Get Started
          </Link>
        </div>
      </div>

      {/* Responsive: hide links on small screens */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 640px) {
          .site-nav-links { display: none !important; }
        }
        .site-nav-link:hover { color: var(--fg-muted) !important; }
      `}} />
    </nav>
  );
}
