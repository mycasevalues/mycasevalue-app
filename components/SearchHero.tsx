'use client';

/**
 * SearchHero — Westlaw-style search bar for the homepage context bar.
 * Light mode: white input, gold SEARCH button, subtle border.
 * Also supports dark variant for potential use in dark sections.
 */

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

const EXAMPLES = [
  'Securities fraud',
  'Employment discrimination',
  'Patent infringement',
  'Product liability',
  'ERISA class actions',
];

export function SearchHero({ variant = 'light' }: { variant?: 'light' | 'dark' }) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const dark = variant === 'dark';

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(query.trim() ? `/case-search?q=${encodeURIComponent(query)}` : '/case-search');
  };

  const handleExample = (q: string) => {
    setQuery(q);
    router.push(`/case-search?q=${encodeURIComponent(q)}`);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} role="search" aria-label="Search federal court records">
        <div
          style={{
            display: 'flex',
            height: 38,
            borderRadius: 2,
            overflow: 'hidden',
            border: dark ? '1px solid rgba(255,255,255,0.10)' : '1px solid #CCCCCC',
            background: dark ? 'rgba(255,255,255,0.04)' : '#FFFFFF',
            transition: 'border-color 120ms',
          }}
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search cases, judges, districts, or case numbers..."
            aria-label="Search federal court records"
            className="ignore-institutional"
            style={{
              flex: 1,
              height: 38,
              padding: '0 12px',
              background: 'transparent',
              border: 'none',
              outline: 'none',
              fontSize: 13,
              fontFamily: 'var(--font-inter)',
              color: dark ? '#E5E7EB' : 'var(--text1, #18181A)',
            }}
          />
          <button
            type="submit"
            style={{
              height: 38,
              padding: '0 16px',
              background: 'var(--gold, #C4882A)',
              color: '#FFFFFF',
              border: 'none',
              fontSize: 13,
              fontWeight: 600,
              fontFamily: 'var(--font-inter)',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              flexShrink: 0,
            }}
          >
            SEARCH
          </button>
        </div>
      </form>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: 6,
          marginTop: 10,
        }}
      >
        <span
          style={{
            fontSize: 10,
            fontFamily: 'var(--font-mono)',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: dark ? '#4B5563' : '#888888',
          }}
        >
          Try:
        </span>
        {EXAMPLES.map((ex) => (
          <button
            key={ex}
            onClick={() => handleExample(ex)}
            style={{
              fontSize: 11,
              padding: '3px 8px',
              borderRadius: 2,
              border: dark ? '1px solid rgba(255,255,255,0.08)' : '1px solid #E0E0E0',
              color: dark ? '#6B7280' : 'var(--link, #0A50A2)',
              background: 'transparent',
              cursor: 'pointer',
              fontFamily: 'var(--font-inter)',
              transition: 'border-color 120ms, background 120ms',
            }}
            className="search-example-pill"
          >
            {ex}
          </button>
        ))}
      </div>

      <style>{`
        .search-example-pill:hover {
          border-color: var(--link, #0A50A2) !important;
          background: rgba(0,82,204,0.04) !important;
        }
      `}</style>
    </div>
  );
}
