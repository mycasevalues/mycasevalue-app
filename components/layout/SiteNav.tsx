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
        background: 'var(--bg-surface)',
        borderBottom: '1px solid var(--border-default)',
        boxShadow: 'var(--shadow-xs)',
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
            color: 'var(--accent-primary)',
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
                borderRadius: 'var(--r-md)',
                fontSize: '14px',
                fontWeight: 500,
                color: 'var(--fg-muted)',
                textDecoration: 'none',
                fontFamily: 'var(--font-body)',
                transition: 'color var(--duration-normal) var(--ease-out)',
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
              color: 'var(--fg-muted)',
              textDecoration: 'none',
              fontFamily: 'var(--font-body)',
              borderRadius: 'var(--r-md)',
              border: '1.5px solid var(--border-default)',
              transition: 'all var(--duration-normal) var(--ease-out)',
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
              color: 'var(--fg-inverse)',
              background: 'var(--accent-primary)',
              borderRadius: 'var(--r-md)',
              textDecoration: 'none',
              fontFamily: 'var(--font-body)',
              transition: 'all var(--duration-normal) var(--ease-out)',
            }}
          >
            Get Started Free
          </Link>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .site-nav-link:hover { color: var(--accent-primary) !important; }
        @media (max-width: 768px) {
          .site-nav-center { display: none !important; }
          .site-nav-right { display: none !important; }
        }
      `}} />
    </nav>
  );
}
