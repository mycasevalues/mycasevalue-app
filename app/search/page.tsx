'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { SITS } from '../../lib/data';
import { REAL_DATA } from '../../lib/realdata';
import { formatSettlementAmount, fmtK } from '../../lib/format';
import { SearchIcon } from '../../components/ui/Icons';

// Loading skeleton component
const SkeletonResultCard = () => (
  <div style={{
    display: 'block',
    padding: '16px',
    marginBottom: '12px',
    background: '#FFFFFF',
    border: '1px solid #E5E7EB',
    borderRadius: '12px',
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
        borderRadius: '12px',
        flex: '1 1 auto',
        minWidth: '150px',
      }} />
      <div style={{
        height: '20px',
        width: '20%',
        background: '#E8EAED',
        borderRadius: '12px',
        minWidth: '50px',
      }} />
    </div>
    <div style={{
      height: '14px',
      width: '40%',
      background: '#E8EAED',
      borderRadius: '12px',
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
  const [tipsExpanded, setTipsExpanded] = useState(false);
  const [recentlyViewedItems, setRecentlyViewedItems] = useState<RecentItem[]>([]);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('mcv_recent') || '[]');
      setRecentItems(stored);
      setRecentlyViewedItems(stored.slice(0, 3));
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
    <main style={{ fontFamily: 'var(--font-body)', background: '#F7F8FA', minHeight: '100vh' }}>
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
          border-color: #8B5CF6 !important;
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
      <div className="search-header" style={{ background: '#1B3A5C', borderBottom: '1px solid #E5E7EB', padding: '64px 24px' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 12px', borderRadius: '12px', marginBottom: '16px', background: 'rgba(255,255,255,0.1)' }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ color: '#8B5CF6', flexShrink: 0 }}>
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span style={{ fontSize: '11px', fontWeight: 600, color: '#8B5CF6', textTransform: 'uppercase', letterSpacing: '1.5px' }}>
              Search
            </span>
          </div>
          <h1 className="search-header" style={{ fontSize: '40px', fontWeight: 600, color: '#FFFFFF', fontFamily: 'var(--font-display)', marginBottom: '8px', letterSpacing: '-0.02em', margin: '0 0 8px 0' }}>
            Search federal court outcomes
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
          <p style={{ fontSize: '11px', fontWeight: 600, color: '#4B5563', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '12px', fontFamily: 'var(--font-body)' }}>
            Filter by Category
          </p>
          <button
            onClick={() => setSelectedCategory(null)}
            style={{
              display: 'block', width: '100%', textAlign: 'left',
              padding: '8px 12px', fontSize: '13px', fontWeight: selectedCategory === null ? 700 : 400,
              color: selectedCategory === null ? '#8B5CF6' : '#4B5563',
              background: selectedCategory === null ? 'rgba(139, 92, 246, 0.06)' : 'transparent',
              border: 'none', borderLeft: selectedCategory === null ? '3px solid #8B5CF6' : '3px solid transparent',
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
                color: selectedCategory === cat.id ? '#8B5CF6' : '#4B5563',
                background: selectedCategory === cat.id ? 'rgba(139, 92, 246, 0.06)' : 'transparent',
                border: 'none', borderLeft: selectedCategory === cat.id ? '3px solid #8B5CF6' : '3px solid transparent',
                cursor: 'pointer', fontFamily: 'var(--font-body)', transition: 'all 120ms',
                marginBottom: '2px',
              }}
            >
              <span>{cat.label}</span>
              <span style={{ fontSize: '11px', color: '#9CA3AF', fontFamily: 'var(--font-mono)' }}>{cat.count}</span>
            </button>
          ))}
        </aside>

        {/* Main content */}
        <div className="search-main">
        {/* Recently viewed */}
      {query.length === 0 && recentItems.length > 0 && (
        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: '#4B5563', flexShrink: 0 }}>
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <p style={{ fontSize: '13px', color: '#4B5563', margin: '0', fontWeight: '500', fontFamily: 'var(--font-body)' }}>Recently viewed</p>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {recentItems.map((item, i) => (
              <Link
                key={i}
                href={`/report/${item.nos}`}
                style={{
                  padding: '8px 16px',
                  background: '#FFFFFF',
                  border: '1px solid #E5E7EB',
                  borderRadius: '12px',
                  fontSize: '13px',
                  color: '#6D28D9',
                  textDecoration: 'none',
                  fontFamily: 'var(--font-body)',
                  transition: 'all 150ms ease-out',
                  cursor: 'pointer',
                  fontWeight: '500',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#F0F6FB';
                  e.currentTarget.style.borderColor = '#6D28D9';
                  e.currentTarget.style.color = '#004D7A';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#FFFFFF';
                  e.currentTarget.style.borderColor = '#E5E7EB';
                  e.currentTarget.style.color = '#6D28D9';
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
            <SearchIcon size={20} color="#4B5563" />
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
              border: '1px solid #E5E7EB',
              borderRadius: '12px',
              background: '#FFFFFF',
              color: '#0f0f0f',
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
            background: '#8B5CF6',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: '12px',
            cursor: 'pointer',
            fontFamily: 'var(--font-body)',
            transition: 'all 150ms ease-out',
            boxShadow: '0 2px 4px rgba(139, 92, 246, 0.2)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#6D28D9';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(139, 92, 246, 0.25)';
            e.currentTarget.style.transform = 'translateY(-1px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#8B5CF6';
            e.currentTarget.style.boxShadow = '0 2px 4px rgba(139, 92, 246, 0.2)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
          aria-label="Search"
        >
          Search
        </button>
      </div>

      {/* Search Tips Section */}
      <div style={{ marginBottom: '24px', background: '#F0F9FF', border: '1px solid #BAE6FD', borderRadius: '12px', overflow: 'hidden' }}>
        <button
          onClick={() => setTipsExpanded(!tipsExpanded)}
          style={{
            width: '100%',
            padding: '12px 16px',
            background: '#F0F9FF',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontFamily: 'var(--font-body)',
            transition: 'background 150ms',
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = '#E0F2FE'}
          onMouseLeave={(e) => e.currentTarget.style.background = '#F0F9FF'}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: '#0369A1', flexShrink: 0 }}>
            <circle cx="12" cy="12" r="10" />
            <path d="M12 16v-4m0-4h.01" />
          </svg>
          <span style={{ fontSize: '13px', fontWeight: '600', color: '#0369A1', margin: 0, flex: 1, textAlign: 'left' }}>Search Tips</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ color: '#0369A1', transform: tipsExpanded ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 150ms' }}>
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
        {tipsExpanded && (
          <div style={{ padding: '12px 16px', borderTop: '1px solid #BAE6FD', fontSize: '13px', color: '#0C4A6E', lineHeight: '1.6', fontFamily: 'var(--font-body)' }}>
            <div style={{ marginBottom: '8px' }}>• Search by case type name (e.g., 'employment discrimination')</div>
            <div style={{ marginBottom: '8px' }}>• Search by NOS code (e.g., '442')</div>
            <div style={{ marginBottom: '8px' }}>• Search by category (e.g., 'consumer' or 'civil rights')</div>
            <div>• Use keywords from your situation (e.g., 'wrongful termination')</div>
          </div>
        )}
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
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: '#E5E7EB', margin: '0 auto 16px', display: 'block' }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <p style={{ color: '#4B5563', fontSize: 16, margin: 0, marginBottom: 8, fontFamily: 'var(--font-body)' }}>
            No case types match your search
          </p>
          <p style={{ color: '#AAAAAA', fontSize: 14, margin: 0, marginBottom: 16, fontFamily: 'var(--font-body)' }}>
            for &ldquo;{query}&rdquo;
          </p>
          <Link href="/cases" style={{ color: '#6D28D9', textDecoration: 'none', fontSize: 14 }}>Browse all categories &rarr;</Link>
        </div>
      )}

      {/* Result count */}
      {query.length > 1 && !isLoading && results.length > 0 && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <p style={{ fontSize: '13px', color: '#4B5563', margin: 0, fontFamily: 'var(--font-body)' }}>
            <strong style={{ color: '#0f0f0f' }}>{results.length}</strong> result{results.length !== 1 ? 's' : ''} for &ldquo;{query}&rdquo;
            {selectedCategory && <span> in <strong style={{ color: '#8B5CF6' }}>{categories.find(c => c.id === selectedCategory)?.label}</strong></span>}
          </p>
          {selectedCategory && (
            <button onClick={() => setSelectedCategory(null)} style={{ fontSize: '12px', color: '#6D28D9', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600, fontFamily: 'var(--font-body)' }}>
              Clear filter
            </button>
          )}
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
            border: '1px solid #E5E7EB',
            borderRadius: '12px',
            textDecoration: 'none',
            transition: 'all 150ms ease-out',
            cursor: 'pointer',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.1)';
            e.currentTarget.style.borderColor = '#8B5CF6';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.05)';
            e.currentTarget.style.borderColor = '#E5E7EB';
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
            <h3 style={{ fontSize: '15px', fontWeight: '600', color: '#0f0f0f', margin: '0', fontFamily: 'var(--font-display)', flex: '1 1 auto' }}>{r.label}</h3>
            <span style={{
              fontSize: '12px',
              fontWeight: '600',
              color: '#8B5CF6',
              background: 'rgba(139, 92, 246, 0.08)',
              padding: '4px 10px',
              borderRadius: '12px',
              border: 'none',
              fontFamily: 'var(--font-body)',
              whiteSpace: 'nowrap',
            }}>
              {r.nos}
            </span>
          </div>
          <p style={{ fontSize: '13px', color: '#4B5563', margin: '0', fontFamily: 'var(--font-body)', lineHeight: '1.5' }}>{r.categoryName}</p>
          {r.desc && <p style={{ fontSize: '13px', color: '#4B5563', margin: '8px 0 0 0', fontFamily: 'var(--font-body)', lineHeight: '1.4' }}>{r.desc}</p>}
          {/* Inline data preview */}
          {(() => {
            const rd = REAL_DATA[r.nos];
            if (!rd) return null;
            return (
              <div style={{ display: 'flex', gap: '16px', marginTop: '10px', paddingTop: '10px', borderTop: '1px solid #F0F3F5' }}>
                {rd.wr != null && (
                  <span style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', color: '#0f0f0f' }}>
                    <span style={{ color: '#4B5563', fontFamily: 'var(--font-body)' }}>Win Rate </span>
                    <strong style={{ color: rd.wr >= 50 ? '#059669' : '#8B5CF6' }}>{rd.wr}%</strong>
                  </span>
                )}
                {rd.sp != null && (
                  <span style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', color: '#0f0f0f' }}>
                    <span style={{ color: '#4B5563', fontFamily: 'var(--font-body)' }}>Settlement </span>
                    <strong style={{ color: '#6D28D9' }}>{rd.sp}%</strong>
                  </span>
                )}
                {rd.total != null && (
                  <span style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', color: '#0f0f0f' }}>
                    <span style={{ color: '#4B5563', fontFamily: 'var(--font-body)' }}>Cases </span>
                    <strong>{rd.total.toLocaleString()}</strong>
                  </span>
                )}
                {rd.mo != null && (
                  <span style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', color: '#0f0f0f' }}>
                    <span style={{ color: '#4B5563', fontFamily: 'var(--font-body)' }}>Duration </span>
                    <strong>{rd.mo}mo</strong>
                  </span>
                )}
                {rd.rng?.md != null && rd.rng.md > 0 && (
                  <span style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', color: '#0f0f0f' }}>
                    <span style={{ color: '#4B5563', fontFamily: 'var(--font-body)' }}>Median </span>
                    <strong style={{ color: '#8B5CF6' }}>{formatSettlementAmount(rd.rng.md, { compact: true })}</strong>
                  </span>
                )}
              </div>
            );
          })()}
        </Link>
      ))}

      {query.length === 0 && (
        <>
          {/* Popular Searches */}
          <div style={{ marginTop: '24px', marginBottom: '32px' }}>
            <p style={{ fontSize: '13px', color: '#4B5563', marginBottom: '12px', fontWeight: '500', fontFamily: 'var(--font-body)' }}>Popular searches</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {['Wrongful termination', 'Car accident', 'Medical malpractice', 'Debt collection', 'Discrimination', 'Slip and fall', 'Breach of contract', 'Insurance bad faith', 'Product liability', 'Sexual harassment', 'ADA violation', 'Wage theft'].map(s => (
                <button
                  key={s}
                  onClick={() => setQuery(s)}
                  style={{
                    padding: '8px 16px',
                    background: '#FFFFFF',
                    border: '1px solid #E5E7EB',
                    borderRadius: '12px',
                    fontSize: '13px',
                    color: '#6D28D9',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-body)',
                    transition: 'all 150ms ease-out',
                    fontWeight: '500',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#F0F6FB';
                    e.currentTarget.style.borderColor = '#6D28D9';
                    e.currentTarget.style.color = '#004D7A';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#FFFFFF';
                    e.currentTarget.style.borderColor = '#E5E7EB';
                    e.currentTarget.style.color = '#6D28D9';
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Top Case Types by Volume */}
          <div style={{ marginBottom: '32px' }}>
            <p style={{ fontSize: '11px', fontWeight: 600, color: '#4B5563', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '12px', fontFamily: 'var(--font-body)' }}>
              Most Common Federal Case Types
            </p>
            <div style={{ display: 'grid', gap: 8 }}>
              {(() => {
                const seen = new Set<string>();
                const topNos: { nos: string; label: string; total: number; wr: number; mo: number; rngMd: number }[] = [];
                for (const cat of SITS) {
                  for (const opt of cat.opts) {
                    if (seen.has(opt.nos)) continue;
                    seen.add(opt.nos);
                    const rd = REAL_DATA[opt.nos];
                    if (rd && rd.total) {
                      topNos.push({ nos: opt.nos, label: opt.label, total: rd.total, wr: rd.wr || 0, mo: rd.mo || 0, rngMd: rd.rng?.md || 0 });
                    }
                  }
                }
                topNos.sort((a, b) => b.total - a.total);
                return topNos.slice(0, 8).map((item, i) => (
                  <Link
                    key={item.nos}
                    href={`/report/${item.nos}`}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px',
                      background: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: 2,
                      textDecoration: 'none', transition: 'all 0.15s ease',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#6D28D9'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#E5E7EB'; e.currentTarget.style.boxShadow = 'none'; }}
                  >
                    <span style={{ width: 24, height: 24, borderRadius: 2, background: '#8B5CF6', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 600, flexShrink: 0 }}>
                      {i + 1}
                    </span>
                    <div style={{ flex: 1 }}>
                      <span style={{ fontSize: 14, fontWeight: 600, color: '#0f0f0f', fontFamily: 'var(--font-display)' }}>{item.label}</span>
                    </div>
                    <div style={{ display: 'flex', gap: 16, fontSize: 12, fontFamily: 'var(--font-mono)', color: '#4B5563', flexShrink: 0 }}>
                      <span style={{ color: item.wr >= 50 ? '#059669' : item.wr >= 35 ? '#D97706' : '#8B5CF6', fontWeight: 600 }}>{item.wr}%</span>
                      <span>{item.total.toLocaleString()}</span>
                      <span>{item.mo}mo</span>
                      {item.rngMd > 0 && <span style={{ color: '#8B5CF6', fontWeight: 600 }}>{fmtK(item.rngMd)}</span>}
                    </div>
                  </Link>
                ));
              })()}
            </div>
          </div>

          {/* Browse by Category Grid */}
          <div style={{ marginBottom: '32px' }}>
            <p style={{ fontSize: '11px', fontWeight: 600, color: '#4B5563', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '12px', fontFamily: 'var(--font-body)' }}>
              Browse by Category
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 12 }}>
              {SITS.map(cat => {
                const seen = new Set<string>();
                let totalCases = 0;
                let wrSum = 0;
                let wrCount = 0;
                for (const opt of cat.opts) {
                  if (seen.has(opt.nos)) continue;
                  seen.add(opt.nos);
                  const rd = REAL_DATA[opt.nos];
                  if (rd?.total) {
                    totalCases += rd.total;
                    if (rd.wr) { wrSum += rd.wr; wrCount++; }
                  }
                }
                const avgWr = wrCount > 0 ? Math.round(wrSum / wrCount) : 0;
                return (
                  <Link
                    key={cat.id}
                    href={`/cases/${cat.id}`}
                    style={{
                      padding: '16px', background: '#FFFFFF', border: '1px solid #E5E7EB',
                      borderRadius: 2, textDecoration: 'none', transition: 'all 0.15s ease',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#8B5CF6'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#E5E7EB'; e.currentTarget.style.boxShadow = 'none'; }}
                  >
                    <div style={{ fontSize: 14, fontWeight: 600, color: '#0f0f0f', fontFamily: 'var(--font-display)', marginBottom: 4 }}>{cat.label}</div>
                    <div style={{ fontSize: 12, color: '#4B5563', fontFamily: 'var(--font-body)', marginBottom: 8 }}>{cat.opts.length} case types</div>
                    <div style={{ display: 'flex', gap: 12, fontSize: 11, fontFamily: 'var(--font-mono)' }}>
                      <span style={{ color: avgWr >= 50 ? '#059669' : avgWr >= 35 ? '#D97706' : '#8B5CF6', fontWeight: 600 }}>{avgWr}% win</span>
                      <span style={{ color: '#4B5563' }}>{totalCases >= 1000 ? `${(totalCases / 1000).toFixed(0)}K cases` : `${totalCases} cases`}</span>
                    </div>
                    <div style={{ height: 3, background: '#F0F3F5', borderRadius: 2, marginTop: 8, overflow: 'hidden' }}>
                      <div style={{ width: `${avgWr}%`, height: '100%', background: avgWr >= 50 ? '#059669' : avgWr >= 35 ? '#D97706' : '#8B5CF6', borderRadius: 2 }} />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Data Highlights Section */}
          <div style={{ marginBottom: '32px' }}>
            <p style={{ fontSize: '11px', fontWeight: 600, color: '#4B5563', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '12px', fontFamily: 'var(--font-body)' }}>
              Data Highlights
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
              {(() => {
                const seen = new Set<string>();
                const allNos: { nos: string; label: string; total: number; wr: number; mo: number; rngMd: number }[] = [];
                for (const cat of SITS) {
                  for (const opt of cat.opts) {
                    if (seen.has(opt.nos)) continue;
                    seen.add(opt.nos);
                    const rd = REAL_DATA[opt.nos];
                    if (rd) {
                      allNos.push({
                        nos: opt.nos,
                        label: opt.label,
                        total: rd.total || 0,
                        wr: rd.wr || 0,
                        mo: rd.mo || 0,
                        rngMd: rd.rng?.md || 0,
                      });
                    }
                  }
                }

                // Calculate highlights
                const mostFiled = allNos.reduce((a, b) => b.total > a.total ? b : a, allNos[0]);
                const highestWr = allNos.reduce((a, b) => b.wr > a.wr ? b : a, allNos[0]);
                const fastestResolution = allNos.filter(x => x.mo > 0).reduce((a, b) => b.mo < a.mo ? b : a, allNos.filter(x => x.mo > 0)[0]);
                const highestRecovery = allNos.filter(x => x.rngMd > 0).reduce((a, b) => b.rngMd > a.rngMd ? b : a, allNos.filter(x => x.rngMd > 0)[0]);

                const highlights = [
                  { title: 'Most Filed Case Type', value: mostFiled.label, display: `${mostFiled.total.toLocaleString()} cases`, color: '#8B5CF6' },
                  { title: 'Highest Win Rate', value: highestWr.label, display: `${highestWr.wr}%`, color: '#059669' },
                  { title: 'Fastest Resolution', value: fastestResolution?.label || 'N/A', display: fastestResolution ? `${fastestResolution.mo} months` : 'N/A', color: '#0369A1' },
                  { title: 'Highest Recovery', value: highestRecovery?.label || 'N/A', display: highestRecovery ? `${fmtK(highestRecovery.rngMd)} median` : 'N/A', color: '#8B5CF6' },
                ];

                return highlights.map((h, i) => (
                  <div
                    key={i}
                    style={{
                      padding: '16px',
                      background: '#FFFFFF',
                      border: '1px solid #E5E7EB',
                      borderRadius: '12px',
                      transition: 'all 0.15s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = h.color;
                      e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = '#E5E7EB';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <div style={{ fontSize: '11px', fontWeight: 600, color: '#4B5563', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px', fontFamily: 'var(--font-body)' }}>
                      {h.title}
                    </div>
                    <div style={{ fontSize: '13px', fontWeight: '600', color: '#0f0f0f', marginBottom: '6px', fontFamily: 'var(--font-display)', lineHeight: '1.4' }}>
                      {h.value}
                    </div>
                    <div style={{ fontSize: '14px', fontWeight: '600', color: h.color, fontFamily: 'var(--font-mono)' }}>
                      {h.display}
                    </div>
                  </div>
                ));
              })()}
            </div>
          </div>

          {/* Quick Actions Bar */}
          <div style={{ marginTop: '32px', padding: '24px 0', borderTop: '1px solid #E5E7EB' }}>
            <p style={{ fontSize: '11px', fontWeight: 600, color: '#4B5563', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '12px', fontFamily: 'var(--font-body)' }}>
              Quick Actions
            </p>
            <div style={{ display: 'inline-flex', flexWrap: 'wrap', gap: '12px' }}>
              {[
                { label: 'Calculator', href: '/calculator' },
                { label: 'Compare', href: '/compare' },
                { label: 'Odds Checker', href: '/odds' },
                { label: 'Judge Analytics', href: '/judges' },
                { label: 'Trends', href: '/trends' },
              ].map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    padding: '12px 20px',
                    background: '#FFFFFF',
                    border: '1px solid #E5E7EB',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: '600',
                    textDecoration: 'none',
                    color: '#4B5563',
                    fontFamily: 'var(--font-body)',
                    transition: 'all 0.15s ease',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#8B5CF6';
                    e.currentTarget.style.color = '#8B5CF6';
                    e.currentTarget.style.background = 'rgba(139, 92, 246, 0.08)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#E5E7EB';
                    e.currentTarget.style.color = '#4B5563';
                    e.currentTarget.style.background = '#FFFFFF';
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </>
      )}
      </div>
      </div>
    </main>
  );
}
