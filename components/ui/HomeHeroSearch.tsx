'use client';

/**
 * HomeHeroSearch.tsx — Interactive hero search bar for the homepage.
 * Client component so it can use useRouter + useState.
 * Matches the existing 44px search bar design in page.tsx.
 */

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

function SearchIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="8.5" cy="8.5" r="6" stroke="currentColor" strokeWidth="2" />
      <path d="M13 13L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export default function HomeHeroSearch() {
  const router = useRouter();
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    router.push(query.trim() ? `/case-search?q=${encodeURIComponent(query.trim())}` : '/case-search');
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSearch();
  };

  return (
    <form onSubmit={handleSubmit} role="search" aria-label="Search federal court records">
      <div
        style={{
          display: 'flex',
          height: 44,
          maxWidth: 820,
          border: '2px solid var(--chrome-bg)',
          borderRadius: 2,
          overflow: 'hidden',
        }}
      >
        {/* Search input */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            padding: '0 12px',
            background: 'var(--card)',
            gap: 8,
          }}
        >
          <span style={{ color: 'var(--text4, #8A8780)', flexShrink: 0 }}>
            <SearchIcon />
          </span>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search cases, judges, districts, or legal issues..."
            aria-label="Search federal court records"
            style={{
              flex: 1,
              border: 'none',
              outline: 'none',
              fontSize: 14,
              fontFamily: 'var(--font-ui)',
              color: 'var(--text1, #18181A)',
              background: 'transparent',
            }}
          />
        </div>

        {/* Jurisdiction dropdown — RIGHT side */}
        <div
          style={{
            width: 152,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 10px',
            background: 'var(--surf, #F6F5F2)',
            borderLeft: '1px solid var(--bdr)',
            fontSize: 12,
            fontFamily: 'var(--font-ui)',
            color: 'var(--text2, #42403C)',
            cursor: 'pointer',
            flexShrink: 0,
          }}
        >
          <span>All Jurisdictions</span>
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true">
            <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
          </svg>
        </div>

        {/* Search button */}
        <button
          type="submit"
          style={{
            width: 92,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 4,
            background: 'var(--chrome-bg)',
            color: 'var(--card)',
            fontSize: 14,
            fontFamily: 'var(--font-ui)',
            fontWeight: 600,
            border: 'none',
            cursor: 'pointer',
            flexShrink: 0,
          }}
        >
          Search
        </button>
      </div>
    </form>
  );
}
