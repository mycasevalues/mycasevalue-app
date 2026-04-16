'use client';

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
          className="flex rounded-lg overflow-hidden border transition-all focus-within:ring-2"
          style={{
            background: dark ? 'rgba(255,255,255,0.07)' : '#fff',
            borderColor: dark ? 'rgba(255,255,255,0.12)' : '#e5e7eb',
            boxShadow: dark ? 'none' : '0 1px 3px rgba(0,0,0,0.06)',
          }}
        >
          <svg
            className="ml-4 mt-3.5 flex-shrink-0"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke={dark ? '#6b7280' : '#9ca3af'}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search cases, judges, districts, or case numbers..."
            aria-label="Search federal court records"
            className="flex-1 h-11 px-3 bg-transparent border-none outline-none text-sm"
            style={{ color: dark ? '#e5e7eb' : '#111827' }}
          />
          <button
            type="submit"
            className="h-11 px-5 font-semibold text-sm transition-colors flex-shrink-0"
            style={{
              background: dark ? 'rgba(255,255,255,0.1)' : '#1a56db',
              color: dark ? '#e5e7eb' : '#fff',
            }}
          >
            Search
          </button>
        </div>
      </form>

      <div className="flex flex-wrap gap-2 mt-3">
        {EXAMPLES.map((ex) => (
          <button
            key={ex}
            onClick={() => handleExample(ex)}
            className="text-[11px] px-2.5 py-1 rounded border transition-all cursor-pointer"
            style={{
              borderColor: dark ? 'rgba(255,255,255,0.1)' : '#e5e7eb',
              color: dark ? '#6b7280' : '#9ca3af',
              background: 'transparent',
            }}
          >
            {ex}
          </button>
        ))}
      </div>
    </div>
  );
}
