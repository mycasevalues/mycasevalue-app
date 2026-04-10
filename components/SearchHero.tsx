'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

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

  return (
    <form
      onSubmit={handleSubmit}
      role="search"
      aria-label="Search federal court records"
      className="w-full max-w-2xl mx-auto mb-8"
    >
      <div className="flex shadow-lg rounded-full overflow-hidden bg-white border border-gray-200">
        {/* Input field */}
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search cases, judges, districts, or case types..."
          aria-label="Search federal court cases, judges, districts, or case types"
          className="flex-1 h-14 px-6 border-none outline-none text-gray-900 placeholder:text-gray-500 rounded-l-full focus:ring-2 focus:ring-brand-blue focus:ring-inset"
        />

        {/* Submit button */}
        <button
          type="submit"
          className="bg-brand-blue text-white font-semibold px-8 rounded-r-full hover:bg-brand-blue/90 transition-colors flex items-center justify-center"
          aria-label="Search"
        >
          Search
        </button>
      </div>
    </form>
  );
}
