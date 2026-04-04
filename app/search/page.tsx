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
    <main style={{ maxWidth: '720px', margin: '0 auto', padding: '64px 24px', fontFamily: 'var(--font-body)' }}>
      <p style={{ fontSize: '11px', fontWeight: 600, color: '#3D72FF', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px', textAlign: 'center' }}>
        Find your case
      </p>
      <h1 style={{ fontSize: '40px', fontWeight: 800, color: '#F0F2F5', fontFamily: 'var(--font-display)', textAlign: 'center', marginBottom: '8px', letterSpacing: '-0.02em' }}>
        What happened to you?
      </h1>
      <p style={{ fontSize: '18px', color: 'rgba(240,242,245,0.40)', textAlign: 'center', marginBottom: '40px', lineHeight: 1.6, fontFamily: 'var(--font-body)' }}>
        Search across all 84 federal case types to find real outcome data for your situation.
      </p>

      {/* Recently viewed */}
      {query.length === 0 && recentItems.length > 0 && (
        <div style={{ marginBottom: 24 }}>
          <p style={{ fontSize: 13, color: 'rgba(240,242,245,0.40)', marginBottom: 12, fontWeight: 500 }}>Recently viewed:</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {recentItems.map((item, i) => (
              <Link
                key={i}
                href={`/report/${item.nos}`}
                style={{
                  padding: '6px 14px',
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.10)',
                  borderRadius: 20,
                  fontSize: 13,
                  color: 'rgba(240,242,245,0.70)',
                  textDecoration: 'none',
                  fontFamily: 'var(--font-body)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                }}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}

      <div style={{ position: 'relative', marginBottom: 24 }}>
        <svg style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', width: '20px', height: '20px', color: 'rgba(240,242,245,0.30)', pointerEvents: 'none' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            border: '1.5px solid rgba(255,255,255,0.12)',
            borderRadius: '12px',
            background: 'rgba(255,255,255,0.08)',
            color: '#F0F2F5',
            boxShadow: '0 8px 32px rgba(0,0,0,0.30)',
            outline: 'none',
            boxSizing: 'border-box' as const,
            fontFamily: 'var(--font-body)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
          }}
        />
      </div>

      {query.length > 1 && results.length === 0 && (
        <p style={{ color: 'rgba(240,242,245,0.40)', fontSize: 14 }}>
          No case types found for &ldquo;{query}&rdquo;.{' '}
          <Link href="/cases" style={{ color: '#3D72FF', textDecoration: 'none' }}>Browse all categories &rarr;</Link>
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
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.10)',
            borderRadius: 10,
            textDecoration: 'none',
            transition: 'border-color 150ms',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <p style={{ fontSize: 15, fontWeight: 600, color: '#F0F2F5', margin: 0 }}>{r.label}</p>
            <span style={{
              fontSize: 11,
              fontFamily: 'var(--font-mono)',
              color: 'rgba(240,242,245,0.40)',
              background: 'rgba(255,255,255,0.06)',
              padding: '1px 6px',
              borderRadius: 4,
              border: '1px solid rgba(255,255,255,0.10)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
            }}>
              NOS {r.nos}
            </span>
          </div>
          <p style={{ fontSize: 13, color: 'rgba(240,242,245,0.40)', margin: 0 }}>{r.categoryName}</p>
        </Link>
      ))}

      {query.length === 0 && (
        <div style={{ marginTop: 16 }}>
          <p style={{ fontSize: 13, color: 'rgba(240,242,245,0.40)', marginBottom: 16 }}>Popular searches:</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {['Wrongful termination', 'Car accident', 'Medical malpractice', 'Debt collection', 'Discrimination', 'Slip and fall'].map(s => (
              <button key={s} onClick={() => setQuery(s)} style={{
                padding: '6px 14px',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.10)',
                borderRadius: 20,
                fontSize: 13,
                color: 'rgba(240,242,245,0.70)',
                cursor: 'pointer',
                fontFamily: 'var(--font-body)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
              }}>{s}</button>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
