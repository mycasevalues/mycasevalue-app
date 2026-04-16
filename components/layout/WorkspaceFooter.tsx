'use client';

import Link from 'next/link';

export default function WorkspaceFooter() {
  return (
    <footer
      className="border-t border-white/5"
      style={{ height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#060a14' }}
      role="contentinfo"
    >
      <div style={{ fontSize: '11px', color: '#6b7280', display: 'flex', alignItems: 'center', gap: '12px', whiteSpace: 'nowrap' }}>
        <span>&copy; 2026 MyCaseValue LLC</span>
        <span style={{ color: '#374151' }}>&middot;</span>
        <Link href="/privacy" className="hover:text-gray-400 transition-colors" style={{ color: '#6b7280', textDecoration: 'none' }}>Privacy</Link>
        <span style={{ color: '#374151' }}>&middot;</span>
        <Link href="/terms" className="hover:text-gray-400 transition-colors" style={{ color: '#6b7280', textDecoration: 'none' }}>Terms</Link>
        <span style={{ color: '#374151' }}>&middot;</span>
        <Link href="/methodology" className="hover:text-gray-400 transition-colors" style={{ color: '#6b7280', textDecoration: 'none' }}>Methodology</Link>
      </div>
    </footer>
  );
}
