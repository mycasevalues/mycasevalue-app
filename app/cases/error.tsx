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
        Something went wrong
      </h2>
      <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', marginBottom: '24px' }}>
        We encountered an unexpected error loading this page. Please try again.
      </p>
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
    </div>
  );
}
