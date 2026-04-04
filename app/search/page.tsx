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
  // Also save to server for Unlimited+ users (fire-and-forget)
  try {
    fetch('/api/user/history', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: item.label, category: item.category }),
    }).catch(() => {});
  } catch {
    // Non-critical
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
    <main style={{ fontFamily: 'var(--font-body)' }}>
      {/* Dark Navy Header Banner */}
      <div style={{ background: '#00172E', borderBottom: '1px solid #D5D8DC', padding: '64px 24px' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 12px', borderRadius: '999px', marginBottom: '16px', background: 'rgba(255,255,255,0.1)' }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ color: '#E8171F', flexShrink: 0 }}>
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span style={{ fontSize: '11px', fontWeight: 600, color: '#E8171F', textTransform: 'uppercase', letterSpacing: '1.5px' }}>
              Search
            </span>
          </div>
          <h1 style={{ fontSize: '40px', fontWeight: 800, color: '#FFFFFF', fontFamily: 'var(--font-display)', marginBottom: '8px', letterSpacing: '-0.02em', margin: '0 0 8px 0' }}>
            What happened to you?
          </h1>
          <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.7)', marginBottom: 0, lineHeight: 1.6, fontFamily: 'var(--font-body)' }}>
            Search across all 84 federal case types to find real outcome data for your situation.
          </p>
        </div>
      </div>

      {/* Content area below header */}
      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '64px 24px', fontFamily: 'var(--font-body)' }}>
        {/* Recently viewed */}
      {query.length === 0 && recentItems.length > 0 && (
        <div style={{ marginBottom: 24 }}>
          <p style={{ fontSize: 13, color: '#999999', marginBottom: 12, fontWeight: 500 }}>Recently viewed:</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {recentItems.map((item, i) => (
              <Link
                key={i}
                href={`/report/${item.nos}`}
                style={{
                  padding: '6px 14px',
                  background: '#FFFFFF',
                  border: '1px solid #D5D8DC',
                  borderRadius: 4,
                  fontSize: 13,
                  color: '#455A64',
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

      <div style={{ position: 'relative', marginBottom: 24 }}>
        <svg style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', width: '20px', height: '20px', color: '#999999', pointerEvents: 'none' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          placeholder="e.g. wrongful termination, car accident, debt collection..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          autoFocus
          aria-label="Search case types"
          style={{
            width: '100%',
            height: '56px',
            paddingLeft: '48px',
            paddingRight: '16px',
            fontSize: '16px',
            border: '1.5px solid #D5D8DC',
            borderRadius: '4px',
            background: '#FFFFFF',
            color: '#212529',
            boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
            outline: 'none',
            boxSizing: 'border-box' as const,
            fontFamily: 'var(--font-body)',
          }}
        />
      </div>

      {query.length > 1 && results.length === 0 && (
        <p style={{ color: '#999999', fontSize: 14 }}>
          No case types found for &ldquo;{query}&rdquo;.{' '}
          <Link href="/cases" style={{ color: '#006997', textDecoration: 'none' }}>Browse all categories &rarr;</Link>
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
            background: '#FFFFFF',
            border: '1px solid #D5D8DC',
            borderRadius: 4,
            textDecoration: 'none',
            transition: 'border-color 150ms',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <p style={{ fontSize: 15, fontWeight: 600, color: '#212529', margin: 0 }}>{r.label}</p>
            <span style={{
              fontSize: 11,
              fontFamily: 'var(--font-mono)',
              color: '#999999',
              background: '#FAFBFC',
              padding: '1px 6px',
              borderRadius: 0,
              border: '1px solid #D5D8DC',
            }}>
              NOS {r.nos}
            </span>
          </div>
          <p style={{ fontSize: 13, color: '#999999', margin: 0 }}>{r.categoryName}</p>
        </Link>
      ))}

      {query.length === 0 && (
        <div style={{ marginTop: 16 }}>
          <p style={{ fontSize: 13, color: '#999999', marginBottom: 16 }}>Popular searches:</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {['Wrongful termination', 'Car accident', 'Medical malpractice', 'Debt collection', 'Discrimination', 'Slip and fall'].map(s => (
              <button key={s} onClick={() => setQuery(s)} style={{
                padding: '6px 14px',
                background: '#FFFFFF',
                border: '1px solid #D5D8DC',
                borderRadius: 4,
                fontSize: 13,
                color: '#455A64',
                cursor: 'pointer',
                fontFamily: 'var(--font-body)',
              }}>{s}</button>
            ))}
          </div>
        </div>
      )}
      </div>
    </main>
  );
}
