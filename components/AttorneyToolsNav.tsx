'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SearchIcon } from './ui/Icons';

const TOOLS = [
  { label: 'Case Predictor', href: '/attorney/case-predictor', icon: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
  )},
  { label: 'Judge Intel', href: '/attorney/judge-intelligence', icon: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M2 10h20M4 10l3 8h10l3-8"/></svg>
  )},
  { label: 'Venue Optimizer', href: '/attorney/venue-optimizer', icon: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="10" r="3"/><path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 7 8 11.7z"/></svg>
  )},
  { label: 'Opposing Counsel', href: '/attorney/opposing-counsel', icon: (
    <SearchIcon size={14} />
  )},
  { label: 'Bulk Analysis', href: '/attorney/bulk-analysis', icon: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
  )},
  { label: 'Doc Intel', href: '/attorney/document-intelligence', icon: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
  )},
  { label: 'PACER', href: '/attorney/pacer-monitor', icon: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
  )},
  { label: 'Team', href: '/attorney/team-workspace', icon: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
  )},
  { label: 'API', href: '/attorney/api-access', icon: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
  )},
];

export default function AttorneyToolsNav() {
  const pathname = usePathname();

  // Don't show on the attorney hub page itself
  if (pathname === '/attorney') return null;

  return (
    <div style={{
      background: 'var(--color-surface-0)',
      backdropFilter: undefined,
      WebkitBackdropFilter: undefined,
      borderBottom: '1px solid var(--border-default)',
      overflowX: 'auto',
      WebkitOverflowScrolling: 'touch',
    }}>
      <div style={{
        maxWidth: '900px',
        margin: '0 auto',
        padding: '0 20px',
        display: 'flex',
        gap: '2px',
        minWidth: 'max-content',
      }}>
        <Link
          href="/attorney"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            padding: '10px 12px',
            fontSize: '12px',
            fontWeight: 600,
            color: 'var(--accent-primary)',
            textDecoration: 'none',
            borderBottom: '2px solid transparent',
            whiteSpace: 'nowrap',
            fontFamily: 'var(--font-body)',
          }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1" /></svg>
          All Tools
        </Link>
        <div style={{ width: '1px', backgroundColor: 'var(--border-default)', margin: '6px 4px' }} />
        {TOOLS.map((tool) => {
          const isActive = pathname === tool.href;
          return (
            <Link
              key={tool.href}
              href={tool.href}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '10px 12px',
                fontSize: '12px',
                fontWeight: isActive ? 700 : 500,
                color: isActive ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
                textDecoration: 'none',
                borderBottom: isActive ? '2px solid var(--accent-primary)' : '2px solid transparent',
                whiteSpace: 'nowrap',
                transition: 'all 0.15s ease',
                fontFamily: 'var(--font-body)',
              }}
            >
              <span style={{ display: 'flex', opacity: isActive ? 1 : 0.5 }}>{tool.icon}</span>
              {tool.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
