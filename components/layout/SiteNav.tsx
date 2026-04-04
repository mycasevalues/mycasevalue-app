/**
 * SiteNav.tsx — Two-tier navigation with white top bar and dark navy sub-nav.
 *
 * Tier 1 (White, 64px): MyCaseValue logo left, auth buttons right
 * Tier 2 (Dark navy #00172E, 48px): "MyCaseValue+" text left, FREE TRIAL button, nav links right
 *
 * Both sticky; sub-nav hides on mobile (<768px) and shows hamburger menu instead.
 */

'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { createBrowserClient } from '@supabase/ssr';

const NAV_LINKS = [
  { href: '/search', label: 'Search' },
  { href: '/cases', label: 'Cases' },
  { href: '/districts', label: 'Districts' },
  { href: '/how-it-works', label: 'How It Works' },
  { href: '/blog', label: 'Blog' },
  { href: '/calculator', label: 'Calculator' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/attorney', label: 'Attorney Mode' },
];

export default function SiteNav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const pathname = usePathname();
  const router = useRouter();
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  // Check auth state
  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) return;

    const supabase = createBrowserClient(url, key);
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUserEmail(user?.email ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserEmail(session?.user?.email ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) return;

    const supabase = createBrowserClient(url, key);
    await supabase.auth.signOut();
    setUserEmail(null);
    router.push('/');
    router.refresh();
  };

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
      {/* TIER 1: WHITE TOP NAV (64px) */}
      <nav
        className="site-nav-top"
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 200,
          height: '64px',
          background: '#FFFFFF',
          backdropFilter: undefined,
          WebkitBackdropFilter: undefined,
          borderBottom: '1px solid #E5EBF0',
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
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
            aria-label="MyCaseValue home"
          >
            <img src="/logo.svg" alt="MyCaseValue" style={{ height: '30px', width: 'auto' }} />
          </Link>

          {/* Right: Auth buttons (desktop) + Hamburger (mobile) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              className="site-nav-auth"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              {userEmail ? (
                <>
                  <Link
                    href="/dashboard"
                    className="site-nav-link"
                    style={{
                      padding: '8px 16px',
                      fontSize: '14px',
                      fontWeight: 500,
                      color: '#455A64',
                      textDecoration: 'none',
                      fontFamily: 'var(--font-body)',
                      borderRadius: '4px',
                      border: '1px solid #D5D8DC',
                      transition: 'all var(--duration-base) ease',
                    }}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="site-nav-link"
                    style={{
                      padding: '8px 20px',
                      fontSize: '14px',
                      fontWeight: 600,
                      color: '#FFFFFF',
                      background: '#E8171F',
                      borderRadius: '4px',
                      fontFamily: 'var(--font-body)',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'all var(--duration-base) ease',
                    }}
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/sign-in"
                    className="site-nav-link"
                    style={{
                      padding: '8px 16px',
                      fontSize: '14px',
                      fontWeight: 500,
                      color: '#455A64',
                      textDecoration: 'none',
                      fontFamily: 'var(--font-body)',
                      borderRadius: '4px',
                      border: '1px solid #D5D8DC',
                      transition: 'all 150ms',
                    }}
                  >
                    Sign in
                  </Link>
                  <Link
                    href="/search"
                    style={{
                      padding: '8px 20px',
                      fontSize: '14px',
                      fontWeight: 600,
                      color: '#FFFFFF',
                      background: '#E8171F',
                      borderRadius: '4px',
                      textDecoration: 'none',
                      fontFamily: 'var(--font-display)',
                      transition: 'all 150ms',
                      boxShadow: '0 2px 8px rgba(232,23,31,0.20)',
                    }}
                  >
                    Sign Up
                  </Link>
                </>
              )}
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
                color: '#212529',
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

      {/* TIER 2: DARK NAVY SUB-NAV (48px) */}
      <nav
        className="site-nav-sub"
        style={{
          position: 'sticky',
          top: '64px',
          zIndex: 199,
          height: '48px',
          background: 'rgba(0,0,0,0.8)',
          borderBottom: 'none',
          display: 'flex',
          alignItems: 'center',
        }}
        role="navigation"
        aria-label="Secondary navigation"
      >
        <div
          style={{
            maxWidth: '1280px',
            width: '100%',
            margin: '0 auto',
            padding: '0 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '100%',
            gap: '24px',
          }}
        >
          {/* Left: MyCaseValue+ brand text */}
          <div style={{
            fontSize: '18px',
            fontWeight: 600,
            color: '#FFFFFF',
            fontStyle: 'italic',
            fontFamily: 'var(--font-display)',
            whiteSpace: 'nowrap',
            flexShrink: 0,
          }}>
            MyCaseValue+<sup style={{ fontSize: '12px' }}>®</sup>
          </div>

          {/* Center-Left: FREE TRIAL button */}
          <button
            style={{
              background: '#E8171F',
              color: '#FFFFFF',
              fontSize: '12px',
              fontWeight: 700,
              letterSpacing: '0.04em',
              padding: '8px 20px',
              borderRadius: '4px',
              border: 'none',
              cursor: 'pointer',
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
              flexShrink: 0,
              transition: 'all 150ms',
              fontFamily: 'var(--font-body)',
            }}
            onClick={() => router.push('/search')}
          >
            FREE TRIAL
          </button>

          {/* Right: Nav links */}
          <div
            className="site-nav-sub-links"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0px',
              marginLeft: 'auto',
              flexGrow: 1,
              justifyContent: 'flex-end',
            }}
          >
            {NAV_LINKS.map((link) => {
              // Determine if this link should have a dropdown
              const hasDropdown = ['Cases', 'Districts', 'Attorney Mode'].includes(link.label);

              if (!hasDropdown) {
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="site-nav-sub-link"
                    style={{
                      padding: '0 16px',
                      fontSize: '14px',
                      fontWeight: 400,
                      color: isActive(link.href) ? '#FFFFFF' : '#E6E6E6',
                      textDecoration: 'none',
                      fontFamily: 'var(--font-body)',
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      borderBottom: isActive(link.href) ? '2px solid #E8171F' : '2px solid transparent',
                      transition: 'all 150ms',
                      position: 'relative',
                    }}
                    aria-current={isActive(link.href) ? 'page' : undefined}
                  >
                    {link.label}
                  </Link>
                );
              }

              // Render dropdown for Cases, Districts, Attorney Mode
              let dropdownContent = null;
              if (link.label === 'Cases') {
                dropdownContent = (
                  <>
                    <div className="nav-dropdown-heading">Browse by Category</div>
                    <a href="/report/442">Employment</a>
                    <a href="/report/360">Personal Injury</a>
                    <a href="/report/440">Civil Rights</a>
                    <a href="/report/190">Contract</a>
                    <a href="/report/350">Tort</a>
                    <div className="nav-dropdown-divider" />
                    <a href="/cases" className="nav-dropdown-footer">View All Case Types →</a>
                  </>
                );
              } else if (link.label === 'Districts') {
                dropdownContent = (
                  <>
                    <div className="nav-dropdown-heading">Browse by Circuit</div>
                    <a href="/districts/1st">1st Circuit</a>
                    <a href="/districts/2nd">2nd Circuit</a>
                    <a href="/districts/3rd">3rd Circuit</a>
                    <div className="nav-dropdown-divider" />
                    <a href="/districts" className="nav-dropdown-footer">View All 94 Districts →</a>
                  </>
                );
              } else if (link.label === 'Attorney Mode') {
                dropdownContent = (
                  <>
                    <div className="nav-dropdown-heading">Attorney Tools</div>
                    <a href="/attorney/case-predictor">Case Predictor</a>
                    <a href="/attorney/judge-intelligence">Judge Intelligence</a>
                    <a href="/attorney/venue-optimizer">Venue Optimizer</a>
                    <div className="nav-dropdown-divider" />
                    <a href="/attorney" className="nav-dropdown-footer">View All Tools →</a>
                  </>
                );
              }

              return (
                <div
                  key={link.href}
                  className="nav-dropdown-parent"
                  style={{
                    position: 'relative',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Link
                    href={link.href}
                    className="site-nav-sub-link"
                    style={{
                      padding: '0 16px',
                      fontSize: '14px',
                      fontWeight: 400,
                      color: isActive(link.href) ? '#FFFFFF' : '#E6E6E6',
                      textDecoration: 'none',
                      fontFamily: 'var(--font-body)',
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      borderBottom: isActive(link.href) ? '2px solid #E8171F' : '2px solid transparent',
                      transition: 'all 150ms',
                      position: 'relative',
                    }}
                    aria-current={isActive(link.href) ? 'page' : undefined}
                  >
                    {link.label}
                  </Link>
                  <div className="nav-dropdown">
                    {dropdownContent}
                  </div>
                </div>
              );
            })}
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
            zIndex: 198,
            background: 'rgba(0,23,46,0.40)',
            backdropFilter: undefined,
            WebkitBackdropFilter: undefined,
          }}
          onClick={() => { setMobileOpen(false); hamburgerRef.current?.focus(); }}
          aria-hidden="true"
        />
      )}

      {/* Mobile drawer — frosted glass */}
      <div
        ref={drawerRef}
        className="site-nav-mobile-drawer"
        style={{
          position: 'fixed',
          top: '64px',
          right: 0,
          bottom: 0,
          width: '280px',
          zIndex: 199,
          background: '#FFFFFF',
          backdropFilter: undefined,
          WebkitBackdropFilter: undefined,
          borderLeft: '1px solid #E5EBF0',
          boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
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
              borderRadius: '4px',
              fontSize: '16px',
              fontWeight: isActive(link.href) ? 600 : 500,
              color: isActive(link.href) ? '#212529' : '#666666',
              textDecoration: 'none',
              fontFamily: 'var(--font-body)',
              minHeight: '44px',
              background: isActive(link.href) ? 'rgba(0,105,151,0.08)' : 'transparent',
            }}
            className="site-nav-mobile-link"
            aria-current={isActive(link.href) ? 'page' : undefined}
          >
            {link.label}
          </Link>
        ))}

        <div style={{ borderTop: '1px solid #E5EBF0', margin: '12px 0', padding: '12px 0' }}>
          {userEmail ? (
            <>
              <Link
                href="/dashboard"
                onClick={() => setMobileOpen(false)}
                style={{
                  display: 'block',
                  padding: '14px 16px',
                  borderRadius: '4px',
                  fontSize: '16px',
                  fontWeight: 500,
                  color: '#455A64',
                  textDecoration: 'none',
                  fontFamily: 'var(--font-body)',
                  minHeight: '44px',
                }}
                className="site-nav-mobile-link"
              >
                Dashboard
              </Link>
              <button
                onClick={() => { setMobileOpen(false); handleSignOut(); }}
                style={{
                  display: 'block',
                  width: '100%',
                  padding: '14px 16px',
                  borderRadius: '4px',
                  fontSize: '16px',
                  fontWeight: 600,
                  color: '#FFFFFF',
                  background: '#E8171F',
                  fontFamily: 'var(--font-body)',
                  textAlign: 'center',
                  minHeight: '44px',
                  marginTop: '8px',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link
                href="/sign-in"
                onClick={() => setMobileOpen(false)}
                style={{
                  display: 'block',
                  padding: '14px 16px',
                  borderRadius: '4px',
                  fontSize: '16px',
                  fontWeight: 500,
                  color: '#455A64',
                  textDecoration: 'none',
                  fontFamily: 'var(--font-body)',
                  minHeight: '44px',
                }}
                className="site-nav-mobile-link"
              >
                Sign In
              </Link>
              <Link
                href="/search"
                onClick={() => setMobileOpen(false)}
                style={{
                  display: 'block',
                  padding: '14px 16px',
                  borderRadius: '4px',
                  fontSize: '16px',
                  fontWeight: 600,
                  color: '#FFFFFF',
                  background: '#E8171F',
                  textDecoration: 'none',
                  fontFamily: 'var(--font-body)',
                  textAlign: 'center',
                  minHeight: '44px',
                  marginTop: '8px',
                }}
              >
                Search Cases
              </Link>
            </>
          )}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .site-nav-link:hover { color: #212529 !important; }
        .site-nav-sub-link:hover { color: #FFFFFF !important; }
        .site-nav-mobile-link:hover { background: rgba(0,0,0,0.04) !important; }

        /* CSS-only dropdown menus */
        .nav-dropdown {
          display: none;
          position: absolute;
          top: 100%;
          left: 0;
          min-width: 240px;
          background: #FFFFFF;
          border: 1px solid #D5D8DC;
          border-radius: 0 0 4px 4px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.12);
          padding: 16px 0;
          z-index: 300;
        }
        .nav-dropdown-parent:hover .nav-dropdown { display: block; }
        .nav-dropdown a {
          display: block;
          padding: 8px 20px;
          font-size: 14px;
          color: #455A64;
          text-decoration: none;
          font-family: var(--font-body);
          transition: all 150ms;
        }
        .nav-dropdown a:hover { background: #F8F9FA; color: #212529; }
        .nav-dropdown-heading {
          padding: 4px 20px 12px;
          font-size: 11px;
          font-weight: 700;
          color: #999999;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          font-family: var(--font-body);
        }
        .nav-dropdown-divider {
          height: 1px;
          background: #D5D8DC;
          margin: 8px 0;
        }
        .nav-dropdown-footer {
          padding: 12px 20px 4px;
          font-size: 13px;
          font-weight: 600;
          color: #E8171F !important;
        }

        @media (max-width: 768px) {
          .site-nav-sub { display: none !important; }
          .site-nav-auth { display: none !important; }
          .site-nav-hamburger { display: flex !important; }
          .site-nav-mobile-drawer { display: flex !important; }
          .nav-dropdown { display: none !important; }
        }
      `}} />
    </>
  );
}
