'use client';

/**
 * ResearchBreadcrumb — Westlaw-style breadcrumb trail.
 * Light mode: var(--text4, #8A8780) separators, var(--link, #0A50A2) links, var(--text1, #18181A) current page.
 */

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface Crumb {
  label: string;
  href: string;
}

function pathToCrumbs(pathname: string): Crumb[] {
  const crumbs: Crumb[] = [{ label: 'Home', href: '/' }];
  const segments = pathname.split('/').filter(Boolean);

  if (segments[0] === 'cases') {
    crumbs.push({ label: 'Cases', href: '/cases' });
    if (segments[1]) {
      const catLabel = segments[1].replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
      crumbs.push({ label: catLabel, href: `/cases/${segments[1]}` });
      if (segments[2]) {
        const slugLabel = segments[2].replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
        crumbs.push({ label: slugLabel, href: `/cases/${segments[1]}/${segments[2]}` });
        if (segments[3]) {
          crumbs.push({ label: segments[3].toUpperCase(), href: `/cases/${segments[1]}/${segments[2]}/${segments[3]}` });
        }
      }
    }
  } else if (segments[0] === 'judges') {
    crumbs.push({ label: 'Judges', href: '/judges' });
    if (segments[1]) {
      crumbs.push({ label: 'Judge Profile', href: `/judges/${segments[1]}` });
    }
  } else if (segments[0] === 'districts') {
    crumbs.push({ label: 'Districts', href: '/districts' });
    if (segments[1]) {
      crumbs.push({ label: segments[1].toUpperCase(), href: `/districts/${segments[1]}` });
    }
  } else if (segments[0] === 'attorney') {
    crumbs.push({ label: 'Attorney Tools', href: '/attorney' });
    if (segments[1]) {
      const toolLabel = segments[1].replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
      crumbs.push({ label: toolLabel, href: `/attorney/${segments[1]}` });
    }
  } else if (segments[0] === 'search') {
    crumbs.push({ label: 'Search', href: '/search' });
  } else if (segments[0] === 'legal') {
    crumbs.push({ label: 'Legal Research', href: '/legal' });
    if (segments[1]) {
      const subLabel = segments[1].replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
      crumbs.push({ label: subLabel, href: `/legal/${segments[1]}` });
    }
  } else {
    const label = segments[0].replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    crumbs.push({ label, href: `/${segments[0]}` });
  }

  return crumbs;
}

export default function ResearchBreadcrumb() {
  const pathname = usePathname();
  const crumbs = pathToCrumbs(pathname);

  if (crumbs.length <= 1) return null;

  return (
    <nav
      aria-label="Research breadcrumb"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        fontSize: 12,
        fontFamily: 'var(--font-ui)',
        overflowX: 'auto',
        whiteSpace: 'nowrap',
        padding: '8px 4px',
      }}
    >
      {crumbs.map((crumb, i) => (
        <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          {i > 0 && (
            <svg
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--bdr, #E2DFD8)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ flexShrink: 0 }}
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          )}
          {i === crumbs.length - 1 ? (
            <span style={{ color: 'var(--text1, #18181A)', fontWeight: 500 }}>{crumb.label}</span>
          ) : (
            <Link
              href={crumb.href}
              style={{
                color: 'var(--link, #0A50A2)',
                textDecoration: 'none',
                transition: 'color 120ms',
              }}
            >
              {crumb.label}
            </Link>
          )}
        </span>
      ))}
    </nav>
  );
}
