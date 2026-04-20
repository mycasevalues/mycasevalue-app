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
            border: dark ? '1px solid rgba(255,255,255,0.10)' : '1px solid var(--bdr, #E2DFD8)',
            background: dark ? 'rgba(255,255,255,0.04)' : 'var(--card, #FFFFFF)',
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
              fontSize: 14,
              fontFamily: 'var(--font-ui)',
              color: dark ? 'var(--bdr)' : 'var(--text1, #18181A)',
            }}
          />
          <button
            type="submit"
            style={{
              height: 38,
              padding: '0 16px',
              background: 'var(--gold, #C4882A)',
              color: 'var(--card, #FFFFFF)',
              border: 'none',
              fontSize: 14,
              fontWeight: 600,
              fontFamily: 'var(--font-ui)',
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
          gap: 8,
          marginTop: 8,
        }}
      >
        <span
          style={{
            fontSize: 12,
            fontFamily: 'var(--font-mono)',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: dark ? 'var(--text2)' : 'var(--text4, #8A8780)',
          }}
        >
          Try:
        </span>
        {EXAMPLES.map((ex) => (
          <button
            key={ex}
            onClick={() => handleExample(ex)}
            style={{
              fontSize: 12,
              padding: '4px 8px',
              borderRadius: 2,
              border: dark ? '1px solid rgba(255,255,255,0.08)' : '1px solid var(--bdr, #E2DFD8)',
              color: dark ? 'var(--color-text-muted)' : 'var(--link, #0A50A2)',
              background: 'transparent',
              cursor: 'pointer',
              fontFamily: 'var(--font-ui)',
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
