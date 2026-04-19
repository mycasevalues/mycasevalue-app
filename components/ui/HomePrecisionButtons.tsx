'use client';

/**
 * HomePrecisionButtons.tsx — Interactive buttons for the Precision Analytics form.
 * Extracted as a client component so page.tsx can remain a server component.
 */

import { useRouter } from 'next/navigation';

export default function HomePrecisionButtons() {
  const router = useRouter();

  const handleRunSearch = () => {
    router.push('/case-search');
  };

  const handleSaveSearch = () => {
    // Navigate to sign-in so user can save searches after authenticating
    router.push('/sign-in');
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        marginTop: 12,
      }}
    >
      <button
        type="button"
        onClick={handleRunSearch}
        style={{
          height: 32,
          padding: '0 20px',
          background: 'var(--chrome-bg)',
          color: 'var(--card)',
          fontSize: 12,
          fontFamily: 'var(--font-ui)',
          fontWeight: 600,
          border: 'none',
          borderRadius: 2,
          cursor: 'pointer',
        }}
      >
        Run Precision Search
      </button>
      <button
        type="button"
        onClick={handleSaveSearch}
        style={{
          height: 32,
          padding: '0 14px',
          background: 'transparent',
          color: 'var(--link)',
          fontSize: 12,
          fontFamily: 'var(--font-ui)',
          fontWeight: 600,
          border: '1px solid var(--link)',
          borderRadius: 2,
          cursor: 'pointer',
        }}
      >
        Save Search
      </button>
      <span
        style={{
          fontSize: 12,
          fontFamily: 'var(--font-mono)',
          color: 'var(--text3, #78766C)',
        }}
      >
        Matching <strong style={{ color: 'var(--text1)' }}>5,147,392</strong> cases
      </span>
    </div>
  );
}
