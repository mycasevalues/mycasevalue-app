'use client';

/**
 * Header.tsx — Bloomberg Law-style unified top navigation bar
 *
 * Structure (left → right):
 * [Logo: isometric cube (navy SVG) + "MyCaseValue" white wordmark]
 * [CENTER: Full-width GO search bar]
 * [RIGHT: "Sign In" | "Get Access" orange button | user avatar if logged in]
 *
 * Specs:
 * - Height: 52px
 * - Background: #1A1A1A (Bloomberg charcoal)
 * - Bottom border: 1px solid #333333
 * - Position: sticky top: 0, z-index: 1000
 * - No mega-menus — Bloomberg keeps top nav clean/minimal
 * - Search bar persists on EVERY page
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { createBrowserClient } from '@supabase/ssr';

/* ── Search Autocomplete Data ── */

const SEARCH_SUGGESTIONS = [
  { label: 'Employment Discrimination', href: '/cases/employment-workplace/employment-discrimination', type: 'case' },
  { label: 'Personal Injury', href: '/cases/personal-injury', type: 'case' },
  { label: 'Southern District of New York', href: '/districts/SDNY', type: 'district' },
  { label: 'Central District of California', href: '/districts/CACD', type: 'district' },
  { label: 'Civil Rights', href: '/cases/civil-rights', type: 'case' },
  { label: 'Consumer Protection', href: '/cases/consumer-protection', type: 'case' },
  { label: 'Browse All Judges', href: '/judges', type: 'judge' },
  { label: 'Browse All Districts', href: '/districts', type: 'district' },
  { label: 'Browse All Cases', href: '/cases', type: 'case' },
  { label: 'Attorney Tools', href: '/attorney', type: 'tool' },
  { label: 'Settlement Ranges', href: '/cases', type: 'case' },
  { label: 'Win Rate Explorer', href: '/odds', type: 'tool' },
];

/* ── Main Header ── */

export default function Header() {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [authOpen, setAuthOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const searchRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  /* Auth */
  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) return;
    const supabase = createBrowserClient(url, key);
    supabase.auth
      .getUser()
      .then(({ data: { user } }) => setUserEmail(user?.email ?? null));
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
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

  /* Close dropdown on click outside */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchFocused(false);
      }
      if (authOpen) setAuthOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [authOpen]);

  /* Close on route change */
  useEffect(() => {
    setSearchFocused(false);
    setAuthOpen(false);
    setMobileSearchOpen(false);
  }, [pathname]);

  /* Escape key */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSearchFocused(false);
        setAuthOpen(false);
        setMobileSearchOpen(false);
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  /* Search */
  const filteredSuggestions = searchQuery.length > 0
    ? SEARCH_SUGGESTIONS.filter(s =>
        s.label.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 8)
    : [];

  const handleSearch = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/case-search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchFocused(false);
      setMobileSearchOpen(false);
    }
  }, [searchQuery, router]);

  return (
    <header
      className="sticky top-0 z-[1000] w-full"
      style={{
        background: '#1A1A1A',
        borderBottom: '1px solid #333333',
        height: 52,
      }}
      role="banner"
    >
      <div className="flex items-center h-[52px] px-4" style={{ maxWidth: '100%' }}>

        {/* ── LEFT: Logo Zone (200px) ── */}
        <div className="flex items-center flex-shrink-0" style={{ width: 200 }}>
          <Link
            href="/"
            aria-label="MyCaseValue home"
            className="flex items-center gap-2 flex-shrink-0"
          >
            {/* Isometric cube mark — keeps navy fill per spec */}
            <svg
              width="24"
              height="24"
              viewBox="-100 -100 200 200"
              className="block flex-shrink-0"
            >
              <g transform="rotate(12)">
                <polygon
                  points="0,0 -40,-69.3 40,-69.3 80,0"
                  fill="#1C3A5E"
                  opacity="0.93"
                />
                <polygon
                  points="0,0 80,0 40,69.3 -40,69.3"
                  fill="#1C3A5E"
                  opacity="0.65"
                />
                <polygon
                  points="0,0 -40,69.3 -80,0 -40,-69.3"
                  fill="#1C3A5E"
                  opacity="0.38"
                />
              </g>
            </svg>
            <span
              className="hidden sm:block"
              style={{
                fontFamily: 'var(--font-inter)',
                fontSize: 14,
                fontWeight: 700,
                color: '#FFFFFF',
                letterSpacing: '-0.02em',
              }}
            >
              MyCaseValue
            </span>
          </Link>
        </div>

        {/* ── CENTER: GO Search Bar ── */}
        <div className="flex-1 mx-4 hidden md:block" ref={searchRef}>
          <form onSubmit={handleSearch} className="relative">
            <div className="flex items-center" style={{ height: 34 }}>
              <input
                ref={searchInputRef}
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                placeholder="Search cases, judges, districts, attorneys..."
                className="ignore-institutional"
                style={{
                  width: '100%',
                  height: 34,
                  background: '#FFFFFF',
                  border: '1px solid #555555',
                  borderRight: 'none',
                  borderRadius: '2px 0 0 2px',
                  padding: '0 12px',
                  fontSize: 13,
                  fontFamily: 'var(--font-inter)',
                  color: '#1A1A1A',
                  outline: 'none',
                }}
              />
              <button
                type="submit"
                style={{
                  height: 34,
                  padding: '0 14px',
                  background: '#E65C00',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '0 2px 2px 0',
                  fontSize: 13,
                  fontWeight: 600,
                  fontFamily: 'var(--font-inter)',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                }}
              >
                SEARCH
              </button>
            </div>

            {/* Autocomplete dropdown */}
            {searchFocused && filteredSuggestions.length > 0 && (
              <div
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  right: 0,
                  background: '#FFFFFF',
                  border: '1px solid #E0E0E0',
                  borderTop: 'none',
                  borderRadius: '0 0 2px 2px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  zIndex: 50,
                  maxHeight: 320,
                  overflowY: 'auto',
                }}
              >
                {filteredSuggestions.map((s) => (
                  <Link
                    key={s.href}
                    href={s.href}
                    onClick={() => {
                      setSearchQuery('');
                      setSearchFocused(false);
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      height: 40,
                      padding: '0 12px',
                      fontSize: 13,
                      fontFamily: 'var(--font-inter)',
                      color: '#0052CC',
                      textDecoration: 'none',
                      borderBottom: '1px solid #F5F5F5',
                    }}
                    className="hover:bg-[#F5F5F5] transition-colors"
                  >
                    {/* Type icon */}
                    <span style={{ fontSize: 11, color: '#888888', width: 50, flexShrink: 0, textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.05em' }}>
                      {s.type}
                    </span>
                    {s.label}
                  </Link>
                ))}
              </div>
            )}
          </form>
        </div>

        {/* ── RIGHT: Auth Zone (200px) ── */}
        <div className="flex items-center justify-end gap-3 flex-shrink-0" style={{ width: 200 }}>

          {/* Mobile search toggle */}
          <button
            className="md:hidden flex items-center justify-center w-8 h-8"
            onClick={() => {
              setMobileSearchOpen(!mobileSearchOpen);
              setTimeout(() => searchInputRef.current?.focus(), 100);
            }}
            aria-label="Search"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>

          {userEmail ? (
            <div className="relative">
              <button
                onClick={() => setAuthOpen(!authOpen)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold"
                style={{
                  background: 'rgba(255,255,255,0.15)',
                  color: '#FFFFFF',
                }}
                aria-expanded={authOpen}
                aria-haspopup="true"
                aria-label="User menu"
              >
                {userEmail.charAt(0).toUpperCase()}
              </button>
              {authOpen && (
                <div
                  className="absolute top-full right-0 mt-2 w-44 z-50"
                  style={{
                    background: '#FFFFFF',
                    border: '1px solid #E0E0E0',
                    borderRadius: 4,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    overflow: 'hidden',
                  }}
                >
                  <div style={{ padding: '8px 12px', borderBottom: '1px solid #E8E8E8', fontSize: 12, color: '#888888', fontFamily: 'var(--font-inter)' }}>
                    {userEmail}
                  </div>
                  <Link
                    href="/dashboard"
                    className="block px-3 py-2 text-[13px] hover:bg-[#F5F5F5] transition-colors"
                    style={{ color: '#1A1A1A', fontFamily: 'var(--font-inter)' }}
                    onClick={() => setAuthOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/account"
                    className="block px-3 py-2 text-[13px] hover:bg-[#F5F5F5] transition-colors"
                    style={{ color: '#1A1A1A', fontFamily: 'var(--font-inter)' }}
                    onClick={() => setAuthOpen(false)}
                  >
                    Settings
                  </Link>
                  <button
                    onClick={() => {
                      setAuthOpen(false);
                      handleSignOut();
                    }}
                    className="w-full text-left px-3 py-2 text-[13px] hover:bg-[#F5F5F5] transition-colors"
                    style={{ color: '#B91C1C', borderTop: '1px solid #E8E8E8', fontFamily: 'var(--font-inter)' }}
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                href="/sign-in"
                style={{
                  fontSize: 13,
                  fontWeight: 500,
                  color: '#FFFFFF',
                  fontFamily: 'var(--font-inter)',
                  textDecoration: 'none',
                  whiteSpace: 'nowrap',
                }}
                className="hidden sm:block hover:opacity-80 transition-opacity"
              >
                Sign In
              </Link>
              <Link
                href="/sign-up"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  height: 30,
                  padding: '0 14px',
                  background: '#E65C00',
                  color: '#FFFFFF',
                  borderRadius: 3,
                  fontSize: 13,
                  fontWeight: 600,
                  fontFamily: 'var(--font-inter)',
                  textDecoration: 'none',
                  whiteSpace: 'nowrap',
                }}
                className="hover:opacity-90 transition-opacity"
              >
                Get Access
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile search bar — slides down when toggled */}
      {mobileSearchOpen && (
        <div
          className="md:hidden"
          style={{
            background: '#1A1A1A',
            borderBottom: '1px solid #333333',
            padding: '8px 16px',
          }}
        >
          <form onSubmit={handleSearch} className="flex items-center" style={{ height: 34 }}>
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search cases, judges, districts..."
              className="ignore-institutional"
              style={{
                flex: 1,
                height: 34,
                background: '#FFFFFF',
                border: '1px solid #555555',
                borderRight: 'none',
                borderRadius: '2px 0 0 2px',
                padding: '0 12px',
                fontSize: 13,
                fontFamily: 'var(--font-inter)',
                color: '#1A1A1A',
                outline: 'none',
              }}
            />
            <button
              type="submit"
              style={{
                height: 34,
                padding: '0 14px',
                background: '#E65C00',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '0 2px 2px 0',
                fontSize: 13,
                fontWeight: 600,
                fontFamily: 'var(--font-inter)',
                cursor: 'pointer',
              }}
            >
              SEARCH
            </button>
          </form>
        </div>
      )}
    </header>
  );
}
