'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { SITS } from '../../lib/data';
import { REAL_DATA } from '../../lib/realdata';
import { SearchIcon } from '../../components/ui/Icons';

// Loading skeleton component
const SkeletonResultCard = () => (
  <div style={{
    display: 'block',
    padding: '16px',
    marginBottom: '12px',
    background: '#FFFFFF',
    border: '1px solid #D5D8DC',
    borderRadius: '2px',
    animation: 'shimmer 2s infinite',
  }}>
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      marginBottom: '8px',
      flexWrap: 'wrap',
    }}>
      <div style={{
        height: '20px',
        width: '60%',
        background: '#E8EAED',
        borderRadius: '2px',
        flex: '1 1 auto',
        minWidth: '150px',
      }} />
      <div style={{
        height: '20px',
        width: '20%',
        background: '#E8EAED',
        borderRadius: '2px',
        minWidth: '50px',
      }} />
    </div>
    <div style={{
      height: '14px',
      width: '40%',
      background: '#E8EAED',
      borderRadius: '2px',
    }} />
  </div>
);

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
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('mcv_recent') || '[]');
      setRecentItems(stored);
    } catch {
      // ignore
    }
  }, []);

  // Simulate loading state when query changes
  useEffect(() => {
    if (query.length > 1) {
      setIsLoading(true);
      const timer = setTimeout(() => setIsLoading(false), 300);
      return () => clearTimeout(timer);
    }
  }, [query]);

  const allTypes = SITS.flatMap(cat =>
    cat.opts.map(opt => ({
      label: opt.label,
      nos: opt.nos,
      desc: opt.d,
      category: cat.id,
      categoryName: cat.label,
    }))
  );

  // Scored search: word-boundary matches rank higher, exact NOS code highest
  const results = query.length > 1
    ? (() => {
        const q = query.toLowerCase().trim();
        const words = q.split(/\s+/).filter(w => w.length > 0);
        const scored = allTypes
          .filter(t => !selectedCategory || t.category === selectedCategory)
          .map(t => {
            let score = 0;
            const label = t.label.toLowerCase();
            const cat = t.categoryName.toLowerCase();
            const desc = t.desc.toLowerCase();

            // Exact NOS code match = highest priority
            if (t.nos === q || t.nos === q.replace(/^0+/, '')) score += 100;

            // Full query substring matches
            if (label.includes(q)) score += 30;
            if (cat.includes(q)) score += 15;
            if (desc.includes(q)) score += 10;

            // Individual word matches (fuzzy multi-word)
            for (const word of words) {
              if (label.includes(word)) score += 8;
              if (cat.includes(word)) score += 4;
              if (desc.includes(word)) score += 2;
              // Word-start bonus (e.g., "wrong" matching "Wrongful")
              if (label.split(/\s+/).some(w => w.startsWith(word))) score += 5;
            }

            return { ...t, score };
          })
          .filter(t => t.score > 0)
          .sort((a, b) => b.score - a.score)
          .slice(0, 20);
        return scored;
      })()
    : [];

  // Category counts for sidebar
  const categories = SITS.map(cat => ({
    id: cat.id,
    label: cat.label,
    count: cat.opts.length,
  }));

  return (
    <main style={{ fontFamily: 'var(--font-body)', background: '#F5F6F7', minHeight: '100vh' }}>
      <style>{`
        @keyframes shimmer {
          0% {
            background-position: -1200px 0;
          }
          100% {
            background-position: 1200px 0;
          }
        }

        input:focus {
          border-color: #E8171F !important;
          box-shadow: 0 0 0 3px rgba(232, 23, 31, 0.08) !important;
        }

        @media (max-width: 768px) {
          .search-header {
            padding: 40px 20px !important;
          }
          .search-header h1 {
            font-size: 28px !important;
          }
          .search-header p {
            font-size: 16px !important;
          }
          .search-layout {
            grid-template-columns: 1fr !important;
            padding: 24px 20px !important;
          }
          .search-sidebar {
            display: none !important;
          }
        }
      `}</style>
      {/* Dark Navy Header Banner */}
      <div className="search-header" style={{ background: '#00172E', borderBottom: '1px solid #D5D8DC', padding: '64px 24px' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 12px', borderRadius: '2px', marginBottom: '16px', background: 'rgba(255,255,255,0.1)' }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ color: '#E8171F', flexShrink: 0 }}>
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span style={{ fontSize: '11px', fontWeight: 600, color: '#E8171F', textTransform: 'uppercase', letterSpacing: '1.5px' }}>
              Search
            </span>
          </div>
          <h1 className="search-header" style={{ fontSize: '40px', fontWeight: 800, color: '#FFFFFF', fontFamily: 'var(--font-display)', marginBottom: '8px', letterSpacing: '-0.02em', margin: '0 0 8px 0' }}>
            What happened to you?
          </h1>
          <p className="search-header" style={{ fontSize: '18px', color: 'rgba(255,255,255,0.7)', marginBottom: 0, lineHeight: 1.6, fontFamily: 'var(--font-body)' }}>
            Search across all 84 federal case types to find real outcome data for your situation.
          </p>

          {/* Breadcrumb */}
          <div style={{ marginTop: '24px', fontSize: '13px', color: 'rgba(255,255,255,0.6)', fontFamily: 'var(--font-body)' }}>
            <Link href="/" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none', transition: 'color 150ms' }} onMouseEnter={(e) => e.currentTarget.style.color = '#FFFFFF'} onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.8)'}>
              Home
            </Link>
            <span style={{ margin: '0 8px', color: 'rgba(255,255,255,0.5)' }}>/</span>
            <span style={{ color: 'rgba(255,255,255,0.6)' }}>Search Results</span>
          </div>
        </div>
      </div>

      {/* Content area below header — sidebar + main */}
      <div className="search-layout" style={{ maxWidth: '1080px', margin: '0 auto', padding: '40px 24px', display: 'grid', gridTemplateColumns: '220px 1fr', gap: '32px', fontFamily: 'var(--font-body)' }}>
        {/* Left sidebar — category filters */}
        <aside className="search-sidebar" style={{ position: 'sticky', top: '128px', alignSelf: 'start' }}>
          <p style={{ fontSize: '11px', fontWeight: 700, color: '#455A64', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '12px', fontFamily: 'var(--font-body)' }}>
            Filter by Category
          </p>
          <button
            onClick={() => setSelectedCategory(null)}
            style={{
              display: 'block', width: '100%', textAlign: 'left',
              padding: '8px 12px', fontSize: '13px', fontWeight: selectedCategory === null ? 700 : 400,
              color: selectedCategory === null ? '#E8171F' : '#455A64',
              background: selectedCategory === null ? 'rgba(232,23,31,0.06)' : 'transparent',
              border: 'none', borderLeft: selectedCategory === null ? '3px solid #E8171F' : '3px solid transparent',
              cursor: 'pointer', fontFamily: 'var(--font-body)', transition: 'all 120ms',
              marginBottom: '2px',
            }}
          >
            All Categories
          </button>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id === selectedCategory ? null : cat.id)}
              style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                width: '100%', textAlign: 'left',
                padding: '8px 12px', fontSize: '13px', fontWeight: selectedCategory === cat.id ? 700 : 400,
                color: selectedCategory === cat.id ? '#E8171F' : '#455A64',
                background: selectedCategory === cat.id ? 'rgba(232,23,31,0.06)' : 'transparent',
                border: 'none', borderLeft: selectedCategory === cat.id ? '3px solid #E8171F' : '3px solid transparent',
                cursor: 'pointer', fontFamily: 'var(--font-body)', transition: 'all 120ms',
                marginBottom: '2px',
              }}
            >
              <span>{cat.label}</span>
              <span style={{ fontSize: '11px', color: '#999', fontFamily: 'var(--font-mono)' }}>{cat.count}</span>
            </button>
          ))}
        </aside>

        {/* Main content */}
        <div className="search-main">
        {/* Recently viewed */}
      {query.length === 0 && recentItems.length > 0 && (
        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: '#455A64', flexShrink: 0 }}>
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <p style={{ fontSize: '13px', color: '#455A64', margin: '0', fontWeight: '500', fontFamily: 'var(--font-body)' }}>Recently viewed</p>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {recentItems.map((item, i) => (
              <Link
                key={i}
                href={`/report/${item.nos}`}
                style={{
                  padding: '8px 16px',
                  background: '#FFFFFF',
                  border: '1px solid #D5D8DC',
                  borderRadius: '2px',
                  fontSize: '13px',
                  color: '#006997',
                  textDecoration: 'none',
                  fontFamily: 'var(--font-body)',
                  transition: 'all 150ms ease-out',
                  cursor: 'pointer',
                  fontWeight: '500',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#F0F6FB';
                  e.currentTarget.style.borderColor = '#006997';
                  e.currentTarget.style.color = '#004D7A';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#FFFFFF';
                  e.currentTarget.style.borderColor = '#D5D8DC';
                  e.currentTarget.style.color = '#006997';
                }}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}

      <div style={{ display: 'flex', gap: '12px', marginBottom: 24, flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: '1 1 auto', minWidth: '200px' }}>
          <div style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <SearchIcon size={20} color="#455A64" />
          </div>
          <input
            type="text"
            placeholder="e.g. wrongful termination, car accident, debt collection..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            autoFocus
            aria-label="Search case types"
            style={{
              width: '100%',
              height: '48px',
              paddingLeft: '44px',
              paddingRight: '16px',
              fontSize: '16px',
              border: '1px solid #D5D8DC',
              borderRadius: '2px',
              background: '#FFFFFF',
              color: '#212529',
              boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
              outline: 'none',
              boxSizing: 'border-box' as const,
              fontFamily: 'var(--font-body)',
              transition: 'border-color 150ms, box-shadow 150ms',
            }}
          />
        </div>
        <button
          onClick={() => {
            // Trigger search - query state already updates results
            if (query.length > 1) {
              const firstResult = results[0];
              if (firstResult) {
                window.location.href = `/report/${firstResult.nos}`;
              }
            }
          }}
          style={{
            height: '48px',
            paddingLeft: '24px',
            paddingRight: '24px',
            fontSize: '15px',
            fontWeight: '600',
            background: '#E8171F',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: '2px',
            cursor: 'pointer',
            fontFamily: 'var(--font-body)',
            transition: 'all 150ms ease-out',
            boxShadow: '0 2px 4px rgba(232, 23, 31, 0.2)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#C41119';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(232, 23, 31, 0.3)';
            e.currentTarget.style.transform = 'translateY(-1px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#E8171F';
            e.currentTarget.style.boxShadow = '0 2px 4px rgba(232, 23, 31, 0.2)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
          aria-label="Search"
        >
          Search
        </button>
      </div>

      {/* Loading skeleton */}
      {query.length > 1 && isLoading && (
        <>
          <SkeletonResultCard />
          <SkeletonResultCard />
          <SkeletonResultCard />
        </>
      )}

      {/* Empty state */}
      {query.length > 1 && results.length === 0 && !isLoading && (
        <div style={{ textAlign: 'center', padding: '40px 24px' }}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: '#D5D8DC', margin: '0 auto 16px', display: 'block' }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <p style={{ color: '#455A64', fontSize: 16, margin: 0, marginBottom: 8, fontFamily: 'var(--font-body)' }}>
            No case types match your search
          </p>
          <p style={{ color: '#AAAAAA', fontSize: 14, margin: 0, marginBottom: 16, fontFamily: 'var(--font-body)' }}>
            for &ldquo;{query}&rdquo;
          </p>
          <Link href="/cases" style={{ color: '#006997', textDecoration: 'none', fontSize: 14 }}>Browse all categories &rarr;</Link>
        </div>
      )}

      {!isLoading && results.map((r, i) => (
        <Link
          key={i}
          href={`/report/${r.nos}`}
          onClick={() => saveToRecent({ label: r.label, nos: r.nos, category: r.category })}
          style={{
            display: 'block',
            padding: '16px',
            marginBottom: '12px',
            background: '#FFFFFF',
            border: '1px solid #D5D8DC',
            borderRadius: '2px',
            textDecoration: 'none',
            transition: 'all 150ms ease-out',
            cursor: 'pointer',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.1)';
            e.currentTarget.style.borderColor = '#E8171F';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.05)';
            e.currentTarget.style.borderColor = '#D5D8DC';
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
            <h3 style={{ fontSize: '15px', fontWeight: '600', color: '#212529', margin: '0', fontFamily: 'var(--font-display)', flex: '1 1 auto' }}>{r.label}</h3>
            <span style={{
              fontSize: '12px',
              fontWeight: '600',
              color: '#E8171F',
              background: '#FEE9EB',
              padding: '4px 10px',
              borderRadius: '2px',
              border: 'none',
              fontFamily: 'var(--font-body)',
              whiteSpace: 'nowrap',
            }}>
              {r.nos}
            </span>
          </div>
          <p style={{ fontSize: '13px', color: '#455A64', margin: '0', fontFamily: 'var(--font-body)', lineHeight: '1.5' }}>{r.categoryName}</p>
          {r.desc && <p style={{ fontSize: '13px', color: '#455A64', margin: '8px 0 0 0', fontFamily: 'var(--font-body)', lineHeight: '1.4' }}>{r.desc}</p>}
          {/* Inline data preview */}
          {(() => {
            const rd = REAL_DATA[r.nos];
            if (!rd) return null;
            return (
              <div style={{ display: 'flex', gap: '16px', marginTop: '10px', paddingTop: '10px', borderTop: '1px solid #F0F3F5' }}>
                {rd.wr != null && (
                  <span style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', color: '#212529' }}>
                    <span style={{ color: '#455A64', fontFamily: 'var(--font-body)' }}>Win Rate </span>
                    <strong style={{ color: rd.wr >= 50 ? '#07874A' : '#E8171F' }}>{rd.wr}%</strong>
                  </span>
                )}
                {rd.sp != null && (
                  <span style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', color: '#212529' }}>
                    <span style={{ color: '#455A64', fontFamily: 'var(--font-body)' }}>Settlement </span>
                    <strong style={{ color: '#006997' }}>{rd.sp}%</strong>
                  </span>
                )}
                {rd.total != null && (
                  <span style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', color: '#212529' }}>
                    <span style={{ color: '#455A64', fontFamily: 'var(--font-body)' }}>Cases </span>
                    <strong>{rd.total.toLocaleString()}</strong>
                  </span>
                )}
                {rd.mo != null && (
                  <span style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', color: '#212529' }}>
                    <span style={{ color: '#455A64', fontFamily: 'var(--font-body)' }}>Duration </span>
                    <strong>{rd.mo}mo</strong>
                  </span>
                )}
              </div>
            );
          })()}
        </Link>
      ))}

      {query.length === 0 && (
        <div style={{ marginTop: '24px' }}>
          <p style={{ fontSize: '13px', color: '#455A64', marginBottom: '12px', fontWeight: '500', fontFamily: 'var(--font-body)' }}>Popular searches</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {['Wrongful termination', 'Car accident', 'Medical malpractice', 'Debt collection', 'Discrimination', 'Slip and fall'].map(s => (
              <button
                key={s}
                onClick={() => setQuery(s)}
                style={{
                  padding: '8px 16px',
                  background: '#FFFFFF',
                  border: '1px solid #D5D8DC',
                  borderRadius: '2px',
                  fontSize: '13px',
                  color: '#006997',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-body)',
                  transition: 'all 150ms ease-out',
                  fontWeight: '500',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#F0F6FB';
                  e.currentTarget.style.borderColor = '#006997';
                  e.currentTarget.style.color = '#004D7A';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#FFFFFF';
                  e.currentTarget.style.borderColor = '#D5D8DC';
                  e.currentTarget.style.color = '#006997';
                }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}
      </div>
      </div>
    </main>
  );
}
