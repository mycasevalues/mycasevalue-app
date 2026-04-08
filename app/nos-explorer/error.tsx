'use client';

import { useEffect } from 'react';

export default function NosExplorerError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('NOS Explorer error:', error);
  }, [error]);

  return (
    <div style={{
      minHeight: '60vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      textAlign: 'center',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#1f2937', marginBottom: '0.5rem' }}>
        [WARNING] Something went wrong
      </h2>
      <p style={{ color: '#6b7280', marginBottom: '1.5rem', maxWidth: '400px' }}>
        We encountered an error loading the NOS Explorer. Please try again.
      </p>
      <button
        onClick={() => reset()}
        style={{
          backgroundColor: '#0966C3',
          color: '#fff',
          border: 'none',
          borderRadius: '8px',
          padding: '0.75rem 1.5rem',
          fontSize: '0.95rem',
          fontWeight: 500,
          cursor: 'pointer',
        }}
      >
        Try again
      </button>
    </div>
  );
}

