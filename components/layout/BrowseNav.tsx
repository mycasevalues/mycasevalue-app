'use client';

/**
 * BrowseNav.tsx — Westlaw Precision second navigation bar
 *
 * Height: 40px
 * Background: var(--chrome-bg-dark) = #121F32
 * Border-bottom: 1px solid #1A2E48
 *
 * Items: Home | Cases | Judges | Districts |
 *        Calculator | Attorney Tools [AI badge] | Methodology
 * Right-aligned: My Research
 *
 * Active item: color white, border-bottom: 3px solid var(--gold)
 * Inactive: color var(--chrome-text-muted)
 */

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import ThemeToggle from '../ThemeToggle';

/* ── Route → active section mapping ── */

function getActiveSection(pathname: string): string {
  if (pathname === '/') return 'home';
  if (pathname.startsWith('/districts') || pathname.startsWith('/cases') || pathname.startsWith('/search') || pathname.startsWith('/nos-explorer')) return 'court';
  if (pathname.startsWith('/judges')) return 'judges';
  if (pathname.startsWith('/analytics') || pathname.startsWith('/trends') || pathname.startsWith('/compare') || pathname.startsWith('/map')) return 'districts';
  if (pathname.startsWith('/attorney')) return 'tools';
  if (pathname.startsWith('/calculator')) return 'settlement';
  if (pathname.startsWith('/methodology') || pathname.startsWith('/glossary') || pathname.startsWith('/about')) return 'guidance';
  if (pathname.startsWith('/account') || pathname.startsWith('/dashboard') || pathname.startsWith('/settings')) return 'saved';
  return '';
}

/* ── Nav item definition ── */

interface BrowseNavItem {
  id: string;
  label: string;
  href: string;
  badge?: string;
  rightAlign?: boolean;
  separator?: boolean;
}

const NAV_ITEMS: BrowseNavItem[] = [
  { id: 'home', label: 'Home', href: '/' },
  { id: '_sep1', label: '', href: '', separator: true },
  { id: 'court', label: 'Cases', href: '/cases' },
  { id: 'judges', label: 'Judges', href: '/judges' },
  { id: 'districts', label: 'Districts', href: '/districts' },
  { id: 'settlement', label: 'Calculator', href: '/calculator' },
  { id: '_sep2', label: '', href: '', separator: true },
  { id: 'tools', label: 'Attorney Tools', href: '/attorney', badge: 'AI' },
  { id: 'research', label: 'Advanced Search', href: '/attorney/advanced-search' },
  { id: 'guidance', label: 'Methodology', href: '/methodology' },
  { id: '_sep3', label: '', href: '', separator: true },
  { id: 'saved', label: 'My Research', href: '/dashboard', rightAlign: true },
];

/* ── BrowseNav Component ── */

export default function BrowseNav() {
  const pathname = usePathname();
  const activeSection = getActiveSection(pathname);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = NAV_ITEMS.filter((item) => !item.separator);

  return (
    <>
      {/* Desktop nav — unchanged */}
      <nav
        className="w-full hidden md:flex"
        style={{
          height: 40,
          background: 'var(--chrome-bg-dark)',
          borderBottom: '1px solid var(--chrome-border, #2A3F58)',
        }}
        aria-label="Browse navigation"
      >
        <div
          className="flex items-stretch w-full"
          style={{ maxWidth: '100%', padding: '0 4px' }}
        >
          {NAV_ITEMS.map((item) => {
            if (item.separator) {
              return (
                <div
                  key={item.id}
                  style={{
                    width: 1,
                    background: 'var(--chrome-border, #2A3F58)',
                    margin: '8px 0',
                    flexShrink: 0,
                  }}
                />
              );
            }

            const isActive = activeSection === item.id;

            return (
              <Link
                key={item.id}
                href={item.href}
                className="flex items-center"
                style={{
                  padding: '0 14px',
                  fontSize: 12,
                  fontFamily: 'var(--font-sans, var(--font-ui))',
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? 'var(--card, #FFFFFF)' : 'var(--chrome-text-muted)',
                  cursor: 'pointer',
                  borderBottom: isActive ? '3px solid var(--gold)' : '3px solid transparent',
                  whiteSpace: 'nowrap',
                  textDecoration: 'none',
                  transition: 'color 150ms ease, background 150ms ease',
                  ...(item.rightAlign ? { marginLeft: 'auto' } : {}),
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = '#D0E8F8';
                    e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = 'var(--chrome-text-muted)';
                    e.currentTarget.style.background = '';
                  }
                }}
              >
                {item.label}
                {item.badge && (
                  <span
                    style={{
                      background: 'var(--gold)',
                      color: 'var(--card, #FFFFFF)',
                      fontSize: 12,
                      fontWeight: 700,
                      borderRadius: 2,
                      padding: '2px 4px',
                      marginLeft: 4,
                      lineHeight: '14px',
                    }}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
          {/* Theme toggle — right side of browse nav */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              borderLeft: '1px solid var(--chrome-border, #2A3F58)',
              marginLeft: 4,
              paddingLeft: 4,
              flexShrink: 0,
            }}
          >
            <ThemeToggle />
          </div>
        </div>
      </nav>

      {/* Mobile nav — visible below md (768px) */}
      <nav
        className="md:hidden"
        style={{
          background: 'var(--chrome-bg-dark, #121F32)',
          borderBottom: '1px solid var(--chrome-border, #2A3F58)',
          position: 'relative',
        }}
        aria-label="Mobile browse navigation"
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-controls="browse-nav-mobile-menu"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              flex: 1,
              height: 44,
              padding: '0 16px',
              background: 'transparent',
              border: 'none',
              color: 'var(--chrome-text-muted, #8AAAC8)',
              fontSize: 14,
              fontFamily: 'var(--font-sans, var(--font-ui))',
              cursor: 'pointer',
            }}
          >
            <span style={{ fontSize: 18, lineHeight: 1 }}>{mobileOpen ? '\u2715' : '\u2630'}</span>
            <span>Browse</span>
          </button>
          <div style={{ paddingRight: 8 }}>
            <ThemeToggle />
          </div>
        </div>

        {mobileOpen && (
          <div
            id="browse-nav-mobile-menu"
            style={{
              display: 'flex',
              flexDirection: 'column',
              background: 'var(--chrome-bg-dark, #121F32)',
              borderTop: '1px solid var(--chrome-border, #2A3F58)',
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              zIndex: 50,
              boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            }}
          >
            {navLinks.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    minHeight: 44,
                    padding: '0 20px',
                    fontSize: 14,
                    fontFamily: 'var(--font-sans, var(--font-ui))',
                    fontWeight: isActive ? 600 : 400,
                    color: isActive ? 'var(--card, #FFFFFF)' : 'var(--chrome-text-muted, #8AAAC8)',
                    textDecoration: 'none',
                    borderLeft: isActive ? '3px solid var(--gold, #C4882A)' : '3px solid transparent',
                    transition: 'background 150ms ease',
                  }}
                >
                  {item.label}
                  {item.badge && (
                    <span
                      style={{
                        background: 'var(--gold)',
                        color: 'var(--card, #FFFFFF)',
                        fontSize: 12,
                        fontWeight: 700,
                        borderRadius: 2,
                        padding: '2px 4px',
                        lineHeight: '14px',
                      }}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        )}
      </nav>
    </>
  );
}
