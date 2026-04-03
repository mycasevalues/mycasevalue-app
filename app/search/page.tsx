'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { SITS } from '../../lib/data';

interface RecentItem {
  label: string;
  nos: string;
  category: string;
  ts: number;
}

const saveToRecent = (item: { label: string; nos: string; category: string }) => {
  if (typeof window === 'undefined') return;
  try {
    const recent: RecentItem[] = JSON.parse(localStorage.getItem('mcv_recent') || '[]');
    const filtered = recent.filter((r) => r.label !== item.label);
    const updated = [{ ...item, ts: Date.now() }, ...filtered].slice(0, 5);
    localStorage.setItem('mcv_recent', JSON.stringify(updated));
  } catch {
    // localStorage unavailable
  }
};

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [recentItems, setRecentItems] = useState<RecentItem[]>([]);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('mcv_recent') || '[]');
      setRecentItems(stored);
    } catch {
      // ignore
    }
  }, []);

  const allTypes = SITS.flatMap(cat =>
    cat.opts.map(opt => ({
      label: opt.label,
      nos: opt.nos,
      desc: opt.d,
      category: cat.id,
      categoryName: cat.label,
    }))
  );

  const results = query.length > 1
    ? allTypes.filter(t =>
        t.label.toLowerCase().includes(query.toLowerCase()) ||
        t.categoryName.toLowerCase().includes(query.toLowerCase()) ||
        t.desc.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 20)
    : [];

  return (
    <main style={{ maxWidth: 800, margin: '0 auto', padding: '48px 24px', fontFamily: 'var(--font-body)' }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8, color: 'var(--fg-primary)', fontFamily: 'var(--font-display)' }}>
        Search case types
      </h1>
      <p style={{ color: 'var(--fg-muted)', fontSize: 15, marginBottom: 32 }}>
        Search across all 84 federal case types to find outcome data for your situation.
      </p>

      {/* Recently viewed */}
      {query.length === 0 && recentItems.length > 0 && (
        <div style={{ marginBottom: 24 }}>
          <p style={{ fontSize: 13, color: 'var(--fg-muted)', marginBottom: 12, fontWeight: 500 }}>Recently viewed:</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {recentItems.map((item, i) => (
              <Link
                key={i}
                href={`/report/${item.nos}`}
                style={{
                  padding: '6px 14px',
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-default)',
                  borderRadius: 20,
                  fontSize: 13,
                  color: 'var(--fg-secondary)',
                  textDecoration: 'none',
                  fontFamily: 'var(--font-body)',
                }}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}

      <input
        type="text"
        placeholder="e.g. wrongful termination, car accident, debt collection..."
        value={query}
        onChange={e => setQuery(e.target.value)}
        autoFocus
        style={{
          width: '100%',
          padding: '14px 18px',
          fontSize: 16,
          border: '1.5px solid var(--border-default)',
          borderRadius: 10,
          background: 'var(--bg-surface)',
          color: 'var(--fg-primary)',
          marginBottom: 24,
          outline: 'none',
          boxSizing: 'border-box' as const,
          fontFamily: 'var(--font-body)',
        }}
      />

      {query.length > 1 && results.length === 0 && (
        <p style={{ color: 'var(--fg-muted)', fontSize: 14 }}>
          No case types found for &ldquo;{query}&rdquo;.{' '}
          <Link href="/cases" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>Browse all categories &rarr;</Link>
        </p>
      )}

      {results.map((r, i) => (
        <Link
          key={i}
          href={`/report/${r.nos}`}
          onClick={() => saveToRecent({ label: r.label, nos: r.nos, category: r.category })}
          style={{
            display: 'block',
            padding: 16,
            marginBottom: 8,
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-default)',
            borderRadius: 10,
            textDecoration: 'none',
            transition: 'border-color 150ms',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <p style={{ fontSize: 15, fontWeight: 600, color: 'var(--fg-primary)', margin: 0 }}>{r.label}</p>
            <span style={{
              fontSize: 11,
              fontFamily: 'var(--font-mono)',
              color: 'var(--fg-muted)',
              background: 'var(--bg-base)',
              padding: '1px 6px',
              borderRadius: 4,
              border: '1px solid var(--border-default)',
            }}>
              NOS {r.nos}
            </span>
          </div>
          <p style={{ fontSize: 13, color: 'var(--fg-muted)', margin: 0 }}>{r.categoryName}</p>
        </Link>
      ))}

      {query.length === 0 && (
        <div style={{ marginTop: 16 }}>
          <p style={{ fontSize: 13, color: 'var(--fg-muted)', marginBottom: 16 }}>Popular searches:</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {['Wrongful termination', 'Car accident', 'Medical malpractice', 'Debt collection', 'Discrimination', 'Slip and fall'].map(s => (
              <button key={s} onClick={() => setQuery(s)} style={{
                padding: '6px 14px',
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-default)',
                borderRadius: 20,
                fontSize: 13,
                color: 'var(--fg-secondary)',
                cursor: 'pointer',
                fontFamily: 'var(--font-body)',
              }}>{s}</button>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
