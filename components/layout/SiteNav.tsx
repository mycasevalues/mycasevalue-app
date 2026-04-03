/**
 * SiteNav.tsx — Site-wide navigation bar (Server Component compatible).
 * Height 64px, sticky, white bg, border-bottom.
 * Rendered from app/layout.tsx so every page gets consistent nav.
 * The homepage client component (MyCaseValue) renders its own Navbar and hides this via CSS.
 */

import Link from 'next/link';

export default function SiteNav() {
  return (
    <nav
      className="site-nav"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 200,
        height: '64px',
        background: '#FFFFFF',
        borderBottom: '1px solid #E5E0D8',
        boxShadow: '0 1px 3px rgba(17,24,39,0.04)',
      }}
      role="navigation"
      aria-label="Site navigation"
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '100%',
        }}
      >
        {/* Logo / Wordmark */}
        <Link
          href="/"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '20px',
            fontWeight: 900,
            color: '#111111',
            textDecoration: 'none',
            letterSpacing: '-0.5px',
          }}
        >
          MyCaseValue
        </Link>

        {/* Center: Desktop nav links */}
        <div
          className="site-nav-center"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '2px',
          }}
        >
          {[
            { href: '/districts', label: 'Districts' },
            { href: '/judges', label: 'Judges' },
            { href: '/calculator', label: 'Calculator' },
            { href: '/pricing', label: 'Pricing' },
            { href: '/attorney', label: 'Attorney Mode' },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="site-nav-link"
              style={{
                padding: '8px 14px',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: 500,
                color: '#6B7280',
                textDecoration: 'none',
                fontFamily: 'var(--font-body)',
                transition: 'color 200ms ease',
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right: Auth buttons */}
        <div
          className="site-nav-right"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <Link
            href="/sign-in"
            className="site-nav-link"
            style={{
              padding: '8px 16px',
              fontSize: '14px',
              fontWeight: 500,
              color: '#6B7280',
              textDecoration: 'none',
              fontFamily: 'var(--font-body)',
              borderRadius: '8px',
              border: '1.5px solid #C9C3BB',
              transition: 'all 200ms ease',
            }}
          >
            Sign In
          </Link>
          <Link
            href="/"
            style={{
              padding: '8px 20px',
              fontSize: '14px',
              fontWeight: 600,
              color: '#FFFFFF',
              background: '#111111',
              borderRadius: '8px',
              textDecoration: 'none',
              fontFamily: 'var(--font-body)',
              transition: 'all 200ms ease',
            }}
          >
            Get Started Free
          </Link>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .site-nav-link:hover { color: #111111 !important; }
        @media (max-width: 768px) {
          .site-nav-center { display: none !important; }
          .site-nav-right { display: none !important; }
        }
      `}} />
    </nav>
  );
}
