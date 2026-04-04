'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const TOOLS = [
  { label: 'Case Predictor', href: '/attorney/case-predictor', icon: '🧠' },
  { label: 'Judge Intel', href: '/attorney/judge-intelligence', icon: '⚖️' },
  { label: 'Venue Optimizer', href: '/attorney/venue-optimizer', icon: '🎯' },
  { label: 'Opposing Counsel', href: '/attorney/opposing-counsel', icon: '🔍' },
  { label: 'Bulk Analysis', href: '/attorney/bulk-analysis', icon: '📊' },
  { label: 'Doc Intel', href: '/attorney/document-intelligence', icon: '📄' },
  { label: 'PACER', href: '/attorney/pacer-monitor', icon: '📡' },
  { label: 'Team', href: '/attorney/team-workspace', icon: '👥' },
  { label: 'API', href: '/attorney/api-access', icon: '🔗' },
];

export default function AttorneyToolsNav() {
  const pathname = usePathname();

  // Don't show on the attorney hub page itself
  if (pathname === '/attorney') return null;

  return (
    <div style={{
      backgroundColor: '#FFFFFF',
      borderBottom: '1px solid #E5E7EB',
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
            color: '#8B5CF6',
            textDecoration: 'none',
            borderBottom: '2px solid transparent',
            whiteSpace: 'nowrap',
            fontFamily: 'var(--font-body)',
          }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1" /></svg>
          All Tools
        </Link>
        <div style={{ width: '1px', backgroundColor: '#E5E7EB', margin: '6px 4px' }} />
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
                color: isActive ? '#8B5CF6' : '#6B7280',
                textDecoration: 'none',
                borderBottom: isActive ? '2px solid #8B5CF6' : '2px solid transparent',
                whiteSpace: 'nowrap',
                transition: 'all 0.15s ease',
                fontFamily: 'var(--font-body)',
              }}
            >
              <span style={{ fontSize: '14px' }}>{tool.icon}</span>
              {tool.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
