'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div style={{
      maxWidth: '600px',
      margin: '80px auto',
      padding: '32px',
      textAlign: 'center',
      fontFamily: 'var(--font-inter), Inter, -apple-system, sans-serif',
    }}>
      <h2 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '12px' }}>
        Unable to load case data
      </h2>
      <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', marginBottom: '24px' }}>
        We encountered an issue loading the case information. Please try again, or browse our case categories to find what you're looking for.
      </p>
      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
        <button
          onClick={reset}
          style={{
            padding: '10px 24px',
            backgroundColor: 'var(--accent-primary)',
            color: 'var(--color-text-inverse)',
            border: 'none',
            borderRadius: '20px',
            fontSize: '14px',
            fontWeight: 600,
            cursor: 'pointer',
            fontFamily: 'inherit',
          }}
        >
          Try again
        </button>
        <a
          href="/cases"
          style={{
            padding: '10px 24px',
            backgroundColor: 'var(--color-surface-1)',
            color: 'var(--color-text-primary)',
            border: '1px solid var(--border-default)',
            borderRadius: '20px',
            fontSize: '14px',
            fontWeight: 600,
            textDecoration: 'none',
            cursor: 'pointer',
            fontFamily: 'inherit',
          }}
        >
          Browse cases
        </a>
      </div>
    </div>
  );
}
