/**
 * SiteNav.tsx — Frosted glass navigation bar with mobile hamburger menu.
 * Height 64px, sticky, glassmorphism blur, translucent border.
 * Rendered from app/layout.tsx so every page gets consistent nav.
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
      <nav
        className="site-nav"
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
            <div style={{
              width: '32px',
              height: '32px',
              background: '#E8171F',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                <path d="M12 2v20M2 10h20M4 10l3 8h10l3-8"/>
              </svg>
            </div>
            <span style={{ fontSize: '18px', fontWeight: 800, color: '#212529', fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}>
              MyCaseValue
            </span>
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
                  padding: '6px 14px',
                  borderRadius: '4px',
                  fontSize: '14px',
                  fontWeight: isActive(link.href) ? 600 : 400,
                  color: isActive(link.href) ? '#212529' : '#666666',
                  textDecoration: 'none',
                  fontFamily: 'var(--font-body)',
                  transition: 'all 150ms',
                  background: isActive(link.href) ? 'rgba(0,105,151,0.08)' : 'transparent',
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
                    Get started free
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

      {/* Mobile drawer overlay */}
      {mobileOpen && (
        <div
          className="site-nav-mobile-overlay"
          style={{
            position: 'fixed',
            inset: 0,
            top: '64px',
            zIndex: 199,
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
          zIndex: 200,
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
        .site-nav-mobile-link:hover { background: rgba(0,0,0,0.04) !important; }
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
