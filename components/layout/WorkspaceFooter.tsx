'use client';

/**
 * WorkspaceFooter — Minimal legal footer for workspace pages
 *
 * Single line: © 2026 MyCaseValue LLC · Privacy · Terms · Methodology
 * Height: 36px, gray-50 background with top border
 * Used on: /cases, /judges, /districts, /attorney/*, /search, /dashboard, etc.
 */

import Link from 'next/link';

export default function WorkspaceFooter() {
  return (
    <footer
      className="border-t border-gray-200 bg-gray-50"
      style={{
        height: '36px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      role="contentinfo"
    >
      <div
        style={{
          fontSize: '11px',
          color: 'rgb(107, 114, 128)', // gray-600
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          whiteSpace: 'nowrap',
        }}
      >
        <span>© 2026 MyCaseValue LLC</span>
        <span style={{ color: 'rgb(179, 184, 191)' }}>·</span>
        <Link
          href="/privacy"
          style={{
            color: 'rgb(107, 114, 128)',
            textDecoration: 'none',
            transition: 'color 150ms',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = 'rgb(79, 70, 229)'; // indigo-600
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'rgb(107, 114, 128)';
          }}
        >
          Privacy
        </Link>
        <span style={{ color: 'rgb(179, 184, 191)' }}>·</span>
        <Link
          href="/terms"
          style={{
            color: 'rgb(107, 114, 128)',
            textDecoration: 'none',
            transition: 'color 150ms',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = 'rgb(79, 70, 229)'; // indigo-600
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'rgb(107, 114, 128)';
          }}
        >
          Terms
        </Link>
        <span style={{ color: 'rgb(179, 184, 191)' }}>·</span>
        <Link
          href="/methodology"
          style={{
            color: 'rgb(107, 114, 128)',
            textDecoration: 'none',
            transition: 'color 150ms',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = 'rgb(79, 70, 229)'; // indigo-600
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'rgb(107, 114, 128)';
          }}
        >
          Methodology
        </Link>
      </div>
    </footer>
  );
}
