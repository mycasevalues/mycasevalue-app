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
          className="flex rounded-md overflow-hidden border transition-all focus-within:border-blue-400/60 focus-within:shadow-[0_0_0_3px_rgba(59,130,246,0.1)]"
          style={{
            background: dark ? 'rgba(255,255,255,0.04)' : '#fff',
            borderColor: dark ? 'rgba(255,255,255,0.10)' : '#e5e7eb',
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
            className="h-11 px-5 font-semibold text-[13px] transition-colors flex-shrink-0 inline-flex items-center gap-1.5 tracking-[-0.005em]"
            style={{
              background: dark ? '#1a56db' : '#1a56db',
              color: '#fff',
            }}
          >
            Search
            <kbd className="hidden sm:inline-flex items-center justify-center h-4 px-1 rounded-[3px] bg-white/15 text-[9px] font-mono font-semibold text-white/80 border border-white/15">⏎</kbd>
          </button>
        </div>
      </form>

      <div className="flex flex-wrap items-center gap-2 mt-3">
        <span className="text-[10px] font-mono tracking-[0.15em] uppercase" style={{ color: dark ? '#4b5563' : '#9ca3af' }}>Try</span>
        {EXAMPLES.map((ex) => (
          <button
            key={ex}
            onClick={() => handleExample(ex)}
            className="text-[11px] px-2.5 py-1 rounded-[4px] border transition-all cursor-pointer hover:border-blue-400/40 hover:text-blue-400"
            style={{
              borderColor: dark ? 'rgba(255,255,255,0.08)' : '#e5e7eb',
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
