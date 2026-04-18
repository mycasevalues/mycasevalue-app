'use client';

/**
 * WorkspaceFooter.tsx — Simplified Westlaw dark footer for workspace shell
 *
 * Same dark background as main Footer (var(--chrome-bg) = #1B2D45)
 * No 4-column grid — just bottom bar text with copyright + links
 * Used inside WorkspaceShell below sidebar content area
 */

import Link from 'next/link';

const LINKS = [
  { label: 'Privacy', href: '/privacy' },
  { label: 'Terms', href: '/terms' },
  { label: 'Methodology', href: '/methodology' },
];

export default function WorkspaceFooter() {
  return (
    <footer
      style={{
        height: 36,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--chrome-bg, #1B2D45)',
        borderTop: '1px solid var(--chrome-border, #2A3F58)',
      }}
      role="contentinfo"
    >
      <div
        style={{
          fontSize: 12,
          fontFamily: 'var(--font-ui)',
          color: 'var(--chrome-text-muted)',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          whiteSpace: 'nowrap',
        }}
      >
        <span>&copy; {new Date().getFullYear()} MyCaseValue LLC</span>
        {LINKS.map((link) => (
          <span key={link.label} style={{ display: 'inline-flex', alignItems: 'center', gap: 12 }}>
            <span style={{ color: 'var(--chrome-border, #2A3F58)' }}>&middot;</span>
            <Link
              href={link.href}
              style={{
                color: 'var(--chrome-text-muted, #8AAAC8)',
                textDecoration: 'none',
                fontSize: 12,
                transition: 'color 120ms',
              }}
              className="wf-link"
            >
              {link.label}
            </Link>
          </span>
        ))}
      </div>

      <style>{`
        .wf-link:hover { color: var(--chrome-text) !important; }
      `}</style>
    </footer>
  );
}
