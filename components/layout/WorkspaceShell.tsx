'use client';

/**
 * WorkspaceShell — Layout wrapper that provides the persistent sidebar
 * + main content area for research pages.
 *
 * Used on: /cases, /judges, /districts, /attorney/*, /search, /dashboard,
 * /legal/*, /trends, /nos-explorer, /compare, /calculator, /map, /odds,
 * /case-search, /case/*
 *
 * NOT used on: / (homepage), /pricing, /about, /faq, /contact, /sign-in,
 * /sign-up, /for/*, /how-it-works, /methodology, /press, /solutions/*,
 * /terminal (has its own full-screen layout)
 */

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import WorkspaceSidebar from './WorkspaceSidebar';
import WorkspaceFooter from './WorkspaceFooter';
import ResearchBreadcrumb from '../ui/ResearchBreadcrumb';

// Routes that should show the workspace sidebar
const WORKSPACE_ROUTES = [
  '/cases',
  '/judges',
  '/districts',
  '/attorney',
  '/search',
  '/dashboard',
  '/legal',
  '/trends',
  '/nos-explorer',
  '/compare',
  '/calculator',
  '/map',
  '/odds',
  '/report',
  '/results',
  '/sample',
  '/account',
  '/settings',
  '/glossary',
  '/case-search',
  '/case',
];

function isWorkspaceRoute(pathname: string): boolean {
  return WORKSPACE_ROUTES.some(route => pathname === route || pathname.startsWith(route + '/'));
}

/** Terminal uses its own full-screen layout */
function isFullScreenRoute(pathname: string): boolean {
  return pathname === '/terminal' || pathname.startsWith('/terminal/');
}

export { isWorkspaceRoute, isFullScreenRoute };

export default function WorkspaceShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const showSidebar = isWorkspaceRoute(pathname);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Close sidebar on route change (mobile)
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  if (!showSidebar) {
    return <>{children}</>;
  }

  return (
    <div className="flex">
      <WorkspaceSidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />

      {/* Main content area */}
      <div className="flex-1 min-w-0">
        {/* Mobile sidebar toggle */}
        <div className="lg:hidden sticky top-0 z-30 flex items-center gap-3 px-4 h-12 bg-[#0c1220]/95 backdrop-blur-sm border-b border-white/5">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 -ml-2 text-gray-400 hover:text-white rounded-lg"
            aria-label="Open navigation"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <span className="text-sm font-medium text-gray-300 truncate">
            {getPageTitle(pathname)}
          </span>
        </div>

        {/* Research breadcrumb — desktop only */}
        <div className="hidden lg:block px-4 py-1 border-b border-white/5" style={{ background: '#0a1020' }}>
          <ResearchBreadcrumb />
        </div>

        {/* Page content */}
        <div className="flex flex-col min-h-[calc(100vh-120px)]">
          <div className="flex-1">
            {children}
          </div>
          {/* Minimal workspace footer */}
          <WorkspaceFooter />
        </div>
      </div>
    </div>
  );
}

/** Client component to conditionally hide footer on workspace/fullscreen routes */
export function ConditionalFooter({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (isWorkspaceRoute(pathname) || isFullScreenRoute(pathname)) return null;
  return <>{children}</>;
}

/** Client component to conditionally hide beta banner on workspace/fullscreen routes */
export function ConditionalBanner({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (isWorkspaceRoute(pathname) || isFullScreenRoute(pathname)) return null;
  return <>{children}</>;
}

/** Client component to conditionally hide header on fullscreen routes only */
export function ConditionalHeader({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (isFullScreenRoute(pathname)) return null;
  return <>{children}</>;
}

function getPageTitle(pathname: string): string {
  if (pathname.startsWith('/case-search')) return 'Case Search';
  if (pathname.startsWith('/case/')) return 'Case Detail';
  if (pathname.startsWith('/cases')) return 'Cases';
  if (pathname.startsWith('/judges')) return 'Judges';
  if (pathname.startsWith('/districts')) return 'Districts';
  if (pathname.startsWith('/attorney')) return 'Attorney Tools';
  if (pathname.startsWith('/search')) return 'Search';
  if (pathname.startsWith('/dashboard')) return 'Dashboard';
  if (pathname.startsWith('/legal')) return 'Legal Research';
  if (pathname.startsWith('/trends')) return 'Trends';
  if (pathname.startsWith('/nos-explorer')) return 'NOS Explorer';
  if (pathname.startsWith('/compare')) return 'Compare';
  if (pathname.startsWith('/calculator')) return 'Calculator';
  if (pathname.startsWith('/map')) return 'Map';
  return 'MyCaseValue';
}
