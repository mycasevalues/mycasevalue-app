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
      <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1f2937', marginBottom: '12px' }}>
        Unable to load attorney resources
      </h2>
      <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '24px' }}>
        We encountered an issue loading this page. Please try again or visit our homepage to explore resources for attorneys.
      </p>
      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
        <button
          onClick={reset}
          style={{
            padding: '10px 24px',
            backgroundColor: 'var(--accent-primary)',
            color: 'white',
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
          href="/"
          style={{
            padding: '10px 24px',
            backgroundColor: 'var(--color-surface-1)',
            color: '#1f2937',
            border: '1px solid #e5e7eb',
            borderRadius: '20px',
            fontSize: '14px',
            fontWeight: 600,
            textDecoration: 'none',
            cursor: 'pointer',
            fontFamily: 'inherit',
          }}
        >
          Go home
        </a>
      </div>
    </div>
  );
}
