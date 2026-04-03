/**
 * SiteNav.tsx — Site-wide navigation bar with mobile hamburger menu.
 * Height 64px, sticky, white bg, border-bottom.
 * Rendered from app/layout.tsx so every page gets consistent nav.
 * The homepage client component (MyCaseValue) renders its own Navbar and hides this via CSS.
 */

'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_LINKS = [
  { href: '/search', label: 'Search' },
  { href: '/districts', label: 'Districts' },
  { href: '/judges', label: 'Judges' },
  { href: '/calculator', label: 'Calculator' },
  { href: '/blog', label: 'Resources' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/attorney', label: 'Attorney Mode' },
];

export default function SiteNav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  // Close on Escape key
  useEffect(() => {
    if (!mobileOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileOpen(false);
        hamburgerRef.current?.focus();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [mobileOpen]);

  // Focus trap inside mobile drawer
  useEffect(() => {
    if (!mobileOpen || !drawerRef.current) return;
    const drawer = drawerRef.current;
    const focusable = drawer.querySelectorAll<HTMLElement>(
      'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    const trapFocus = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus(); }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    drawer.addEventListener('keydown', trapFocus);
    first.focus();
    return () => drawer.removeEventListener('keydown', trapFocus);
  }, [mobileOpen]);

  // Close drawer on route change
  useEffect(() => { setMobileOpen(false); }, [pathname]);

  const isActive = useCallback((href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  }, [pathname]);

  return (
    <>
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
        aria-label="Main navigation"
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
            aria-label="MyCaseValue home"
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
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="site-nav-link"
                style={{
                  padding: '8px 14px',
                  borderRadius: 'var(--r-md)',
                  fontSize: '14px',
                  fontWeight: isActive(link.href) ? 600 : 500,
                  color: isActive(link.href) ? 'var(--accent-primary)' : 'var(--fg-muted)',
                  textDecoration: 'none',
                  fontFamily: 'var(--font-body)',
                  transition: 'color var(--duration-base) ease',
                  borderBottom: isActive(link.href) ? '2px solid var(--accent-primary)' : '2px solid transparent',
                }}
                aria-current={isActive(link.href) ? 'page' : undefined}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right: Auth buttons (desktop) + Hamburger (mobile) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
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
                  transition: 'all var(--duration-base) ease',
                }}
              >
                Sign In
              </Link>
              <Link
                href="/cases"
                style={{
                  padding: '8px 20px',
                  fontSize: '14px',
                  fontWeight: 600,
                  color: 'var(--fg-inverse)',
                  background: 'var(--accent-primary)',
                  borderRadius: 'var(--r-md)',
                  textDecoration: 'none',
                  fontFamily: 'var(--font-body)',
                  transition: 'all var(--duration-base) ease',
                }}
              >
                Get Started Free
              </Link>
            </div>

            {/* Mobile hamburger button */}
            <button
              ref={hamburgerRef}
              className="site-nav-hamburger"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileOpen}
              style={{
                display: 'none',
                background: 'none',
                border: 'none',
                padding: '10px',
                cursor: 'pointer',
                color: 'var(--fg-primary)',
                minHeight: '44px',
                minWidth: '44px',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                {mobileOpen ? (
                  <>
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </>
                ) : (
                  <>
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer overlay */}
      {mobileOpen && (
        <div
          className="site-nav-mobile-overlay"
          style={{
            position: 'fixed',
            inset: 0,
            top: '64px',
            zIndex: 199,
            background: 'rgba(30,20,10,0.3)',
          }}
          onClick={() => { setMobileOpen(false); hamburgerRef.current?.focus(); }}
          aria-hidden="true"
        />
      )}

      {/* Mobile drawer */}
      <div
        ref={drawerRef}
        className="site-nav-mobile-drawer"
        style={{
          position: 'fixed',
          top: '64px',
          right: 0,
          bottom: 0,
          width: '280px',
          zIndex: 200,
          background: 'var(--bg-surface)',
          borderLeft: '1px solid var(--border-default)',
          boxShadow: 'var(--shadow-lg)',
          transform: mobileOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 250ms ease',
          padding: '24px',
          display: 'none',
          flexDirection: 'column',
          gap: '8px',
          overflowY: 'auto',
        }}
        role="dialog"
        aria-label="Mobile navigation"
        aria-modal={mobileOpen ? true : undefined}
      >
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setMobileOpen(false)}
            style={{
              display: 'block',
              padding: '14px 16px',
              borderRadius: 'var(--r-md)',
              fontSize: '16px',
              fontWeight: isActive(link.href) ? 600 : 500,
              color: isActive(link.href) ? 'var(--accent-primary)' : 'var(--fg-primary)',
              textDecoration: 'none',
              fontFamily: 'var(--font-body)',
              minHeight: '44px',
              background: isActive(link.href) ? 'var(--bg-elevated)' : 'transparent',
            }}
            className="site-nav-mobile-link"
            aria-current={isActive(link.href) ? 'page' : undefined}
          >
            {link.label}
          </Link>
        ))}

        <div style={{ borderTop: '1px solid var(--border-default)', margin: '12px 0', padding: '12px 0' }}>
          <Link
            href="/sign-in"
            onClick={() => setMobileOpen(false)}
            style={{
              display: 'block',
              padding: '14px 16px',
              borderRadius: 'var(--r-md)',
              fontSize: '16px',
              fontWeight: 500,
              color: 'var(--fg-primary)',
              textDecoration: 'none',
              fontFamily: 'var(--font-body)',
              minHeight: '44px',
            }}
            className="site-nav-mobile-link"
          >
            Sign In
          </Link>
          <Link
            href="/cases"
            onClick={() => setMobileOpen(false)}
            style={{
              display: 'block',
              padding: '14px 16px',
              borderRadius: 'var(--r-md)',
              fontSize: '16px',
              fontWeight: 600,
              color: 'var(--fg-inverse)',
              background: 'var(--accent-primary)',
              textDecoration: 'none',
              fontFamily: 'var(--font-body)',
              textAlign: 'center',
              minHeight: '44px',
              marginTop: '8px',
            }}
          >
            Get Started Free
          </Link>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .site-nav-link:hover { color: var(--accent-primary) !important; }
        .site-nav-mobile-link:hover { background: var(--bg-elevated) !important; }
        @media (max-width: 768px) {
          .site-nav-center { display: none !important; }
          .site-nav-right { display: none !important; }
          .site-nav-hamburger { display: flex !important; }
          .site-nav-mobile-drawer { display: flex !important; }
        }
      `}} />
    </>
  );
}
