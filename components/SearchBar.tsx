'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const SUGGESTIONS = [
  'Personal injury settlements in California',
  'Employment discrimination win rates',
  'Medical malpractice average duration',
  'Patent infringement settlement ranges',
  'Civil rights case outcomes by district',
  'Product liability trends 2020-2024',
  'Contract dispute resolution statistics',
  'Securities fraud case values',
];

export default function SearchBar({ large = false }: { large?: boolean }) {
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState(-1);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = query.length > 0
    ? SUGGESTIONS.filter(s => s.toLowerCase().includes(query.toLowerCase())).slice(0, 5)
    : SUGGESTIONS.slice(0, 5);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIdx(prev => Math.min(prev + 1, filtered.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIdx(prev => Math.max(prev - 1, -1));
    } else if (e.key === 'Enter' && selectedIdx >= 0) {
      e.preventDefault();
      setQuery(filtered[selectedIdx]);
      router.push(`/search?q=${encodeURIComponent(filtered[selectedIdx])}`);
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ position: 'relative', width: '100%', maxWidth: large ? 680 : 500 }}>
      <div style={{
        display: 'flex', alignItems: 'center',
        border: focused ? '2px solid #8B5CF6' : '2px solid #e5e7eb',
        borderRadius: large ? 16 : 10,
        backgroundColor: '#fff',
        padding: large ? '4px 4px 4px 20px' : '2px 2px 2px 14px',
        transition: 'border-color 0.2s, box-shadow 0.2s',
        boxShadow: focused ? '0 0 0 4px rgba(139,92,246,0.1)' : '0 1px 3px rgba(0,0,0,0.06)',
      }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
          <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          ref={inputRef}
          value={query}
          onChange={e => { setQuery(e.target.value); setSelectedIdx(-1); }}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 200)}
          onKeyDown={handleKeyDown}
          placeholder="Search federal court data..."
          style={{
            flex: 1, border: 'none', outline: 'none', padding: large ? '14px 12px' : '10px 12px',
            fontSize: large ? 16 : 14, color: '#0f0f0f', backgroundColor: 'transparent',
          }}
        />
        <button type="submit" style={{
          padding: large ? '12px 28px' : '8px 18px',
          borderRadius: large ? 12 : 8,
          border: 'none', backgroundColor: '#8B5CF6', color: '#fff',
          fontWeight: 600, fontSize: large ? 15 : 13, cursor: 'pointer',
        }}>
          Search
        </button>
      </div>
      <AnimatePresence>
        {focused && filtered.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            style={{
              position: 'absolute', top: '100%', left: 0, right: 0,
              marginTop: 8, backgroundColor: '#fff', borderRadius: 12,
              border: '1px solid #e5e7eb', boxShadow: '0 8px 30px rgba(0,0,0,0.1)',
              overflow: 'hidden', zIndex: 50,
            }}
          >
            {filtered.map((s, i) => (
              <div
                key={s}
                onMouseDown={() => { setQuery(s); router.push(`/search?q=${encodeURIComponent(s)}`); }}
                style={{
                  padding: '10px 16px', fontSize: 14, color: '#374151', cursor: 'pointer',
                  backgroundColor: i === selectedIdx ? '#f3f4f6' : 'transparent',
                }}
              >
                <span style={{ color: '#9CA3AF', marginRight: 8 }}>🔍</span>
                {s}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}
