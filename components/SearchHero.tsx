'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

const EXAMPLE_QUERIES = [
  'Securities fraud cases in SDNY',
  'Employment discrimination',
  'Patent infringement verdicts',
  'Product liability filings',
  'ERISA class actions',
];

export function SearchHero() {
  const router = useRouter();
  const [query, setQuery] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/cases?q=${encodeURIComponent(query)}`);
    } else {
      router.push('/cases');
    }
  };

  const handleExampleClick = (example: string) => {
    setQuery(example);
    router.push(`/cases?q=${encodeURIComponent(example)}`);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form
        onSubmit={handleSubmit}
        role="search"
        aria-label="Search federal court records"
        className="mb-4"
      >
        <div className="flex shadow-lg rounded-2xl overflow-hidden bg-white border border-gray-200 focus-within:border-brand-blue focus-within:ring-2 focus-within:ring-brand-blue/10 transition-all">
          <div className="flex items-center pl-5 text-gray-400">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search cases, judges, districts, or legal topics..."
            aria-label="Search federal court cases, judges, districts, or case types"
            className="flex-1 h-14 px-4 border-none outline-none text-gray-900 placeholder:text-gray-400 text-sm"
          />
          <button
            type="submit"
            className="bg-brand-blue text-white font-semibold px-6 text-sm hover:bg-brand-blue-dark transition-colors flex items-center justify-center"
            aria-label="Search"
          >
            Search
          </button>
        </div>
      </form>

      {/* Example queries */}
      <div className="flex flex-wrap justify-center gap-2">
        {EXAMPLE_QUERIES.map((example) => (
          <button
            key={example}
            onClick={() => handleExampleClick(example)}
            className="text-xs px-3 py-1.5 rounded-full border border-gray-200 text-gray-500 hover:border-brand-blue hover:text-brand-blue hover:bg-blue-50/50 transition-all cursor-pointer"
          >
            {example}
          </button>
        ))}
      </div>
    </div>
  );
}
