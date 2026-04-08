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
        Something went wrong
      </h2>
      <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '24px' }}>
        We encountered an unexpected error loading this page. Please try again.
      </p>
      <button
        onClick={reset}
        style={{
          padding: '10px 24px',
          backgroundColor: '#0966C3',
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
    </div>
  );
}
