'use client';

import Link from 'next/link';

interface ShareToolbarProps {
  nos: string;
}

export default function ShareToolbar({ nos }: ShareToolbarProps) {
  const handlePrint = () => {
    window.print();
  };

  const handleCopyLink = () => {
    const url = `${typeof window !== 'undefined' ? window.location.origin : ''}/report/${nos}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url).then(() => {
        // Show brief feedback to user
        const btn = document.querySelector('[data-copy-btn]') as HTMLElement;
        if (btn) {
          const originalText = btn.textContent;
          btn.textContent = 'Copied!';
          setTimeout(() => {
            btn.textContent = originalText;
          }, 2000);
        }
      });
    }
  };

  return (
    <div
      style={{
        background: 'var(--color-surface-1)',
        border: '1px solid var(--border-default)',
        borderRadius: '6px',
        padding: '16px 20px',
        marginBottom: '24px',
        marginTop: '24px',
        display: 'flex',
        gap: '12px',
        alignItems: 'center',
        flexWrap: 'wrap',
      }}
    >
      <p
        style={{
          fontSize: '12px',
          fontWeight: 600,
          color: 'var(--color-text-secondary)',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          margin: '0',
          fontFamily: 'var(--font-body)',
          flex: '1 1 100%',
          minWidth: '100%',
        }}
      >
        Share & Export
      </p>

      <button
        onClick={handlePrint}
        style={{
          padding: '8px 16px',
          background: 'var(--color-surface-0)',
          border: '1px solid var(--border-default)',
          borderRadius: '6px',
          fontSize: '13px',
          fontWeight: 500,
          color: 'var(--color-text-primary)',
          fontFamily: 'var(--font-body)',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'var(--color-surface-1)';
          e.currentTarget.style.borderColor = 'var(--color-text-secondary)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'var(--color-surface-0)';
          e.currentTarget.style.borderColor = 'var(--border-default)';
        }}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 6 2 18 2 18 9" />
          <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
        </svg>
        Print Report
      </button>

      <button
        data-copy-btn
        onClick={handleCopyLink}
        style={{
          padding: '8px 16px',
          background: 'var(--color-surface-0)',
          border: '1px solid var(--border-default)',
          borderRadius: '6px',
          fontSize: '13px',
          fontWeight: 500,
          color: 'var(--color-text-primary)',
          fontFamily: 'var(--font-body)',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'var(--color-surface-1)';
          e.currentTarget.style.borderColor = 'var(--color-text-secondary)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'var(--color-surface-0)';
          e.currentTarget.style.borderColor = 'var(--border-default)';
        }}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
        </svg>
        Copy Link
      </button>

      <Link
        href={`/report/${nos}`}
        style={{
          padding: '8px 16px',
          background: 'var(--color-surface-0)',
          border: '1px solid var(--border-default)',
          borderRadius: '6px',
          fontSize: '13px',
          fontWeight: 500,
          color: 'var(--color-text-primary)',
          fontFamily: 'var(--font-body)',
          textDecoration: 'none',
          transition: 'all 0.2s ease',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'var(--color-surface-1)';
          e.currentTarget.style.borderColor = 'var(--color-text-secondary)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'var(--color-surface-0)';
          e.currentTarget.style.borderColor = 'var(--border-default)';
        }}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
        Full Report
      </Link>
    </div>
  );
}
