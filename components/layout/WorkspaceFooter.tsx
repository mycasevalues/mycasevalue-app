'use client';

import Link from 'next/link';

export default function WorkspaceFooter() {
  return (
    <footer
      style={{
        height: 36,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#F7F7F5',
        borderTop: '1px solid #E0E0E0',
      }}
      role="contentinfo"
    >
      <div
        style={{
          fontSize: 11,
          fontFamily: 'var(--font-inter)',
          color: '#888888',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          whiteSpace: 'nowrap',
        }}
      >
        <span>&copy; 2026 MyCaseValue LLC</span>
        <span style={{ color: '#CCCCCC' }}>&middot;</span>
        <Link
          href="/privacy"
          style={{ color: '#888888', textDecoration: 'none', transition: 'color 120ms' }}
          className="hover:!text-[#0052CC]"
        >
          Privacy
        </Link>
        <span style={{ color: '#CCCCCC' }}>&middot;</span>
        <Link
          href="/terms"
          style={{ color: '#888888', textDecoration: 'none', transition: 'color 120ms' }}
          className="hover:!text-[#0052CC]"
        >
          Terms
        </Link>
        <span style={{ color: '#CCCCCC' }}>&middot;</span>
        <Link
          href="/methodology"
          style={{ color: '#888888', textDecoration: 'none', transition: 'color 120ms' }}
          className="hover:!text-[#0052CC]"
        >
          Methodology
        </Link>
      </div>
    </footer>
  );
}
