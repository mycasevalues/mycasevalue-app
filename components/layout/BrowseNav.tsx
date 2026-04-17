'use client';

/**
 * BrowseNav.tsx — Westlaw Precision second navigation bar
 *
 * Height: 40px
 * Background: var(--chrome-bg-dark) = #121F32
 * Border-bottom: 1px solid #1A2E48
 *
 * Items: Home | Court Records | Judicial Analytics | District Intelligence |
 *        Settlement Data | Litigation Tools [AI badge] | Practical Guidance
 * Right-aligned: My Research
 *
 * Active item: color white, border-bottom: 3px solid var(--gold)
 * Inactive: color var(--chrome-text-muted)
 */

import Link from 'next/link';
import { usePathname } from 'next/navigation';

/* ── Route → active section mapping ── */

function getActiveSection(pathname: string): string {
  if (pathname === '/') return 'home';
  if (pathname.startsWith('/districts') || pathname.startsWith('/cases') || pathname.startsWith('/search') || pathname.startsWith('/nos-explorer')) return 'court';
  if (pathname.startsWith('/judges')) return 'judges';
  if (pathname.startsWith('/analytics') || pathname.startsWith('/trends') || pathname.startsWith('/compare') || pathname.startsWith('/map')) return 'districts';
  if (pathname.startsWith('/attorney')) return 'tools';
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
  { id: 'court', label: 'Court Records', href: '/cases' },
  { id: 'judges', label: 'Judicial Analytics', href: '/judges' },
  { id: 'districts', label: 'District Intelligence', href: '/districts' },
  { id: 'settlement', label: 'Settlement Data', href: '/cases' },
  { id: '_sep2', label: '', href: '', separator: true },
  { id: 'tools', label: 'Litigation Tools', href: '/attorney', badge: 'AI' },
  { id: 'research', label: 'Research Tools', href: '/attorney/advanced-search' },
  { id: 'guidance', label: 'Practical Guidance', href: '/methodology' },
  { id: '_sep3', label: '', href: '', separator: true },
  { id: 'saved', label: 'My Research', href: '/dashboard', rightAlign: true },
];

/* ── BrowseNav Component ── */

export default function BrowseNav() {
  const pathname = usePathname();
  const activeSection = getActiveSection(pathname);

  return (
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
                transition: 'color 0.15s ease, background 0.15s ease',
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
                    fontSize: 9,
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
      </div>
    </nav>
  );
}
