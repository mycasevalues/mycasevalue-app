'use client';

/**
 * ResearchBreadcrumb — contextual breadcrumb trail that tracks
 * the user's research path across connected entities.
 *
 * Unlike static breadcrumbs, this shows the actual research journey:
 * Cases > Employment > Wrongful Termination > SDNY > Judge Smith
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
    <nav aria-label="Research breadcrumb" className="flex items-center gap-1.5 text-xs text-gray-400 overflow-x-auto whitespace-nowrap py-2 px-1">
      {crumbs.map((crumb, i) => (
        <span key={i} className="flex items-center gap-1.5">
          {i > 0 && (
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-gray-300 flex-shrink-0">
              <path d="M9 18l6-6-6-6" />
            </svg>
          )}
          {i === crumbs.length - 1 ? (
            <span className="text-gray-600 font-medium">{crumb.label}</span>
          ) : (
            <Link href={crumb.href} className="text-gray-400 hover:text-brand-blue transition-colors">
              {crumb.label}
            </Link>
          )}
        </span>
      ))}
    </nav>
  );
}
