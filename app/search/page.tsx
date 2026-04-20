'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { SITS } from '../../lib/data';
import { REAL_DATA } from '../../lib/realdata';
import { formatSettlementAmount, fmtK } from '../../lib/format';
import { SearchIcon } from '../../components/ui/Icons';
import DataFreshness from '../../components/DataFreshness';
import SampleSizeIndicator from '../../components/SampleSizeIndicator';
import { useResearchStore } from '../../store/research';
import dynamic from 'next/dynamic';

const TrendSparkline = dynamic(() => import('../../components/charts/TrendSparkline'), { ssr: false });
import SearchTabs from '../../components/SearchTabs';
import JudgeSearchResults from '../../components/JudgeSearchResults';
import { SITE_URL } from '../../lib/site-config';

// Loading skeleton component
const SkeletonResultCard = () => (
  <div style={{
    display: 'block',
    padding: '16px',
    marginBottom: '12px',
    background: 'var(--card)',
    border: '1px solid var(--bdr)',
    borderRadius: '4px',
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
        background: 'var(--bdr)',
        borderRadius: '4px',
        flex: '1 1 auto',
        minWidth: '150px',
      }} />
      <div style={{
        height: '20px',
        width: '20%',
        background: 'var(--bdr)',
        borderRadius: '4px',
        minWidth: '50px',
      }} />
    </div>
    <div style={{
      height: '14px',
      width: '40%',
      background: 'var(--bdr)',
      borderRadius: '4px',
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
  // Also save to server for Unlimited users (fire-and-forget)
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

function SearchPageInner() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams?.get('q') ?? '';
  const { currentCaseType, setCaseType, addRecentSearch } = useResearchStore();
  const [query, setQuery] = useState(initialQuery);
  const [recentItems, setRecentItems] = useState<RecentItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(currentCaseType);
  const [tipsExpanded, setTipsExpanded] = useState(false);
  const [recentlyViewedItems, setRecentlyViewedItems] = useState<RecentItem[]>([]);

  // AI Search state
  const [aiQuery, setAiQuery] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState<any>(null);
  const [aiError, setAiError] = useState('');

  // Sync category selection to Zustand store
  useEffect(() => {
    setCaseType(selectedCategory);
  }, [selectedCategory, setCaseType]);

  // Keep query state in sync when the ?q= URL param changes
  // (e.g., user navigates from homepage hero search to /search?q=foo)
  useEffect(() => {
    const q = searchParams?.get('q') ?? '';
    if (q && q !== query) {
      setQuery(q);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

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

  // Scored search: word-boundary matches rank higher, exact NOS code highest.
  // Results are deduplicated by NOS code so we never display the same
  // underlying federal case statistics under multiple labels (which would
  // misleadingly appear as if different case types had identical outcomes).
  // Aliased labels are surfaced inside each result card via `aliases`.
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
          .sort((a, b) => b.score - a.score);

        // Deduplicate by NOS code: keep the highest-scoring entry per NOS,
        // collect the other matching labels as aliases so users still see
        // that their search term matched.
        const byNos = new Map<string, typeof scored[number] & { aliases: string[] }>();
        for (const item of scored) {
          const existing = byNos.get(item.nos);
          if (!existing) {
            byNos.set(item.nos, { ...item, aliases: [] });
          } else if (existing.label !== item.label && !existing.aliases.includes(item.label)) {
            existing.aliases.push(item.label);
          }
        }
        return Array.from(byNos.values()).slice(0, 20);
      })()
    : [];

  // Category counts for sidebar
  const categories = SITS.map(cat => ({
    id: cat.id,
    label: cat.label,
    count: cat.opts.length,
  }));

  // AI Search handler
  const handleAISearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiQuery.trim()) {
      setAiError('Please enter a search query');
      return;
    }

    setAiLoading(true);
    setAiError('');
    setAiResult(null);

    try {
      const response = await fetch('/api/ai/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: aiQuery }),
      });

      const data = await response.json();

      if (!response.ok) {
        setAiError(data.error || 'Failed to process search query');
        return;
      }

      setAiResult(data);
      // If NOS code was extracted, automatically search for it
      if (data.parameters?.nosCode) {
        setQuery('');
        setTimeout(() => {
          setQuery(data.parameters.nosCode);
        }, 100);
      }
    } catch {
      setAiError('Network error. Please try again.');
    } finally {
      setAiLoading(false);
    }
  };


  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Search', item: `${SITE_URL}/search` },
        ],
      },
      {
        '@type': 'WebApplication',
        name: 'Federal Case Search',
        description: 'Search federal court cases by type, judge, district, or natural language. AI-powered legal research tool.',
        url: `${SITE_URL}/search`,
        applicationCategory: 'LegalService',
        isPartOf: { '@type': 'WebSite', name: 'MyCaseValue', url: SITE_URL },
      },
    ],
  };

  return (
    <div style={{ fontFamily: 'var(--font-ui)', background: 'var(--surf)', minHeight: '100vh' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
          border-color: var(--link) !important;
          box-shadow: 0 0 0 3px rgba(9, 102, 195, 0.18) !important;
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
        @media (max-width: 480px) {
          .search-category-grid {
            grid-template-columns: 1fr !important;
          }
          .search-header {
            padding: 24px 12px !important;
          }
        }
      `}</style>
      {/* Dark Institutional Header */}
      <div className="search-header" style={{
        background: 'var(--card)',
        color: 'var(--text1)',
        padding: '40px 24px 32px',
        position: 'relative',
        overflow: 'hidden',
        borderBottom: '1px solid var(--bdr)',
      }}>
        <div aria-hidden style={{
          position: 'absolute', inset: 0, opacity: 0.03, pointerEvents: 'none',
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />
        <div style={{ maxWidth: '720px', margin: '0 auto', textAlign: 'center', position: 'relative' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '4px 10px', marginBottom: 16,
            borderRadius: 999,
            border: '1px solid rgba(59,130,246,0.2)',
            background: 'rgba(59,130,246,0.08)',
            fontFamily: 'var(--font-mono)', fontSize: 12,
            fontWeight: 600, letterSpacing: '0.5px', textTransform: 'uppercase',
            color: 'var(--link)',
          }}>
            <span className="animate-pulse" style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--data-positive)' }} />
            Federal Case Search
          </div>
          <h1 className="search-header" style={{ fontFamily: 'var(--font-legal)', fontSize: '28px', fontWeight: 700, letterSpacing: '-0.025em', lineHeight: 1.1, color: 'var(--text1)', margin: '0 0 12px' }}>
            Search Federal Court Outcomes
          </h1>
          <p className="search-header" style={{ fontSize: '14px', color: 'var(--text2)', marginBottom: 0, lineHeight: 1.6, fontFamily: 'var(--font-ui)' }}>
            Real outcome data across 84 federal case types, 94 districts, and 5.1M+ cases.
          </p>
        </div>
      </div>

      {/* Content area below header — sidebar + main */}
      <div className="search-layout" style={{ maxWidth: '1080px', margin: '0 auto', padding: '40px 24px', display: 'grid', gridTemplateColumns: '220px 1fr', gap: '32px', fontFamily: 'var(--font-ui)' }}>
        {/* Left sidebar — category filters */}
        <aside className="search-sidebar" style={{ position: 'sticky', top: '128px', alignSelf: 'start' }}>
          <p style={{ fontSize: '12px', fontWeight: 500, color: 'var(--text2)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '12px', fontFamily: 'var(--font-ui)' }}>
            Filter by Category
          </p>
          <button
            onClick={() => setSelectedCategory(null)}
            style={{
              display: 'block', width: '100%', textAlign: 'left',
              padding: '8px 12px', fontSize: '14px', fontWeight: selectedCategory === null ? 700 : 400,
              color: selectedCategory === null ? 'var(--link)' : 'var(--text2)',
              background: selectedCategory === null ? 'rgba(10, 102, 194, 0.06)' : 'transparent',
              border: 'none', borderLeft: selectedCategory === null ? '3px solid var(--link)' : '3px solid transparent',
              cursor: 'pointer', fontFamily: 'var(--font-ui)', transition: 'all 150ms',
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
                padding: '8px 12px', fontSize: '14px', fontWeight: selectedCategory === cat.id ? 700 : 400,
                color: selectedCategory === cat.id ? 'var(--link)' : 'var(--text2)',
                background: selectedCategory === cat.id ? 'rgba(10, 102, 194, 0.06)' : 'transparent',
                border: 'none', borderLeft: selectedCategory === cat.id ? '3px solid var(--link)' : '3px solid transparent',
                cursor: 'pointer', fontFamily: 'var(--font-ui)', transition: 'all 150ms',
                marginBottom: '2px',
              }}
            >
              <span>{cat.label}</span>
              <span style={{ fontSize: '12px', color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)' }}>{cat.count}</span>
            </button>
          ))}
        </aside>

        {/* Main content */}
        <div className="search-main">
        {/* Search Tabs - Semantic and Natural Language */}
        <SearchTabs />

        {/* Recently viewed */}
      {query.length === 0 && recentItems.length > 0 && (
        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--text2)', flexShrink: 0 }}>
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <p style={{ fontSize: '14px', color: 'var(--text2)', margin: '0', fontWeight: '500', fontFamily: 'var(--font-ui)' }}>Recently viewed</p>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {recentItems.map((item, i) => (
              <Link
                key={i}
                href={`/report/${item.nos}`}
                style={{
                  padding: '8px 16px',
                  background: 'var(--card)',
                  border: '1px solid var(--bdr)',
                  borderRadius: '4px',
                  fontSize: '14px',
                  color: 'var(--gold)',
                  textDecoration: 'none',
                  fontFamily: 'var(--font-ui)',
                  transition: 'all 150ms ease-out',
                  cursor: 'pointer',
                  fontWeight: '500',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(59,130,246,0.06)';
                  e.currentTarget.style.borderColor = 'var(--gold)';
                  e.currentTarget.style.color = 'var(--link-hover)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'var(--card)';
                  e.currentTarget.style.borderColor = 'var(--bdr)';
                  e.currentTarget.style.color = 'var(--gold)';
                }}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* AI-Powered Search Section */}
      <div style={{ marginBottom: '32px', padding: '24px', background: 'var(--link-light)', border: '1px solid var(--bdr)', borderRadius: '4px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
          <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ color: 'var(--link)', flexShrink: 0 }}>
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/>
          </svg>
          <label style={{ fontSize: '14px', fontWeight: '600', color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0' }}>
            AI-Powered Search (Beta)
          </label>
        </div>
        <p style={{ fontSize: '14px', color: 'var(--link)', marginBottom: '16px', fontFamily: 'var(--font-ui)' }}>
          Describe your case in natural language. AI will extract key details and find matching case types.
        </p>
        <form onSubmit={handleAISearch} style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <input
            type="text"
            aria-label="AI-powered natural language search"
            placeholder="Search with natural language, e.g. 'wrongful termination cases settled over $100K in New York'"
            value={aiQuery}
            onChange={(e) => {
              setAiQuery(e.target.value);
              setAiError('');
            }}
            style={{
              flex: '1 1 auto',
              minWidth: '250px',
              height: '44px',
              padding: '0 14px',
              fontSize: '14px',
              border: '1px solid var(--bdr)',
              borderRadius: '2px',
              background: 'var(--card)',
              color: 'var(--text1)',
              fontFamily: 'var(--font-ui)',
              outline: 'none',
              transition: 'all 150ms',
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = 'var(--link)';
              e.currentTarget.style.boxShadow = '0 0 0 3px rgba(10, 102, 194, 0.1)';
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = 'var(--bdr)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          />
          <button
            type="submit"
            disabled={aiLoading || !aiQuery.trim()}
            style={{
              height: '44px',
              padding: '0 20px',
              fontSize: '14px',
              fontWeight: '600',
              background: aiLoading || !aiQuery.trim() ? 'var(--bdr)' : 'var(--link)',
              color: 'var(--chrome-text)',
              border: 'none',
              borderRadius: '2px',
              cursor: aiLoading || !aiQuery.trim() ? 'not-allowed' : 'pointer',
              fontFamily: 'var(--font-ui)',
              transition: 'all 150ms',
              opacity: aiLoading || !aiQuery.trim() ? 0.7 : 1,
            }}
            onMouseEnter={(e) => {
              if (!aiLoading && aiQuery.trim()) {
                e.currentTarget.style.background = 'var(--gold)';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(10, 102, 194, 0.25)';
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'var(--link)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            {aiLoading ? (
              <>
                <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="inline animate-spin mr-2" style={{ marginBottom: '2px', marginRight: '6px', animation: 'spin 1s linear infinite' }}><path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 2.2"/></svg>
                Analyzing...
              </>
            ) : (
              'Analyze with AI'
            )}
          </button>
        </form>

        {/* AI Error */}
        {aiError && (
          <div style={{ marginTop: '12px', padding: '12px', background: 'rgba(10, 102, 194, 0.1)', border: '1px solid var(--bdr)', borderRadius: '2px' }}>
            <p style={{ fontSize: '14px', color: 'var(--gold)', margin: '0', fontFamily: 'var(--font-ui)' }}>
              {aiError}
            </p>
          </div>
        )}

        {/* AI Result */}
        {aiResult && (
          <div style={{ marginTop: '16px', padding: '16px', background: 'var(--card)', border: '1px solid var(--bdr)', borderRadius: '2px' }}>
            <p style={{ fontSize: '12px', fontWeight: '600', color: 'var(--link-visited)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px', marginTop: '0' }}>
              AI Interpretation
            </p>
            <p style={{ fontSize: '14px', color: 'var(--text1)', marginBottom: '12px', lineHeight: '1.6', fontFamily: 'var(--font-ui)' }}>
              {aiResult.interpretation}
            </p>

            {aiResult.parameters && (
              <div style={{ paddingTop: '12px', borderTop: '1px solid var(--bdr)' }}>
                <p style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text2)', margin: '8px 0', fontFamily: 'var(--font-ui)' }}>
                  Extracted Parameters:
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                  {aiResult.parameters.caseType && (
                    <div style={{ padding: '8px 12px', background: 'rgba(59,130,246,0.06)', border: '1px solid rgba(59,130,246,0.15)', borderRadius: '4px' }}>
                      <p style={{ fontSize: '12px', fontWeight: '500', color: 'var(--link)', margin: '0', fontFamily: 'var(--font-mono)' }}>
                        Case Type: <strong>{aiResult.parameters.caseType}</strong>
                      </p>
                    </div>
                  )}
                  {aiResult.parameters.nosCode && (
                    <div style={{ padding: '8px 12px', background: 'rgba(234,179,8,0.1)', border: '1px solid var(--wrn-txt)', borderRadius: '4px' }}>
                      <p style={{ fontSize: '12px', fontWeight: '500', color: 'var(--wrn-txt)', margin: '0', fontFamily: 'var(--font-mono)' }}>
                        NOS Code: <strong>{aiResult.parameters.nosCode}</strong>
                      </p>
                    </div>
                  )}
                  {aiResult.parameters.settlementMinimum && (
                    <div style={{ padding: '8px 12px', background: 'rgba(34,197,94,0.08)', border: '1px solid var(--data-positive-border, #BFEFE5)', borderRadius: '4px' }}>
                      <p style={{ fontSize: '12px', fontWeight: '500', color: 'var(--data-positive)', margin: '0', fontFamily: 'var(--font-mono)' }}>
                        Settlement Min: <strong>${aiResult.parameters.settlementMinimum.toLocaleString()}</strong>
                      </p>
                    </div>
                  )}
                  {aiResult.parameters.district && (
                    <div style={{ padding: '8px 12px', background: 'rgba(139,92,246,0.06)', border: '1px solid rgba(139,92,246,0.15)', borderRadius: '4px' }}>
                      <p style={{ fontSize: '12px', fontWeight: '500', color: 'var(--link-visited)', margin: '0', fontFamily: 'var(--font-mono)' }}>
                        District: <strong>{aiResult.parameters.district}</strong>
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            <p style={{ fontSize: '12px', color: 'var(--text2)', marginTop: '12px', marginBottom: '0', fontFamily: 'var(--font-ui)' }}>
              {aiResult.disclosure}
            </p>
          </div>
        )}
      </div>

      <form
        role="search"
        aria-label="Search federal case types"
        onSubmit={(e) => {
          e.preventDefault();
          // Update the URL so the search is sharable / bookmarkable.
          // The results list itself updates live as the user types,
          // so we don't need to do anything else here.
          if (typeof window !== 'undefined') {
            const params = new URLSearchParams(window.location.search);
            if (query.trim()) {
              params.set('q', query.trim());
            } else {
              params.delete('q');
            }
            const newUrl = `${window.location.pathname}${params.toString() ? `?${params.toString()}` : ''}`;
            window.history.replaceState(null, '', newUrl);
          }
        }}
        style={{ display: 'flex', gap: '12px', marginBottom: 24, flexWrap: 'wrap' }}
      >
        <div style={{ position: 'relative', flex: '1 1 100%', minWidth: '200px' }}>
          <div style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <SearchIcon size={20} color="var(--text2)" />
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
              paddingRight: query ? '44px' : '16px',
              fontSize: '16px',
              border: '1px solid var(--bdr)',
              borderRadius: '4px',
              background: 'var(--card)',
              color: 'var(--text1)',
              boxShadow: 'var(--shadow-xs)',
              outline: 'none',
              boxSizing: 'border-box' as const,
              fontFamily: 'var(--font-ui)',
              transition: 'border-color 150ms, box-shadow 150ms',
            }}
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              aria-label="Clear search"
              style={{
                position: 'absolute',
                right: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '24px',
                height: '24px',
                border: 'none',
                background: 'transparent',
                color: 'var(--color-text-muted)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '4px',
                fontSize: '18px',
                lineHeight: 1,
                padding: 0,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                e.currentTarget.style.color = 'var(--text1, #18181A)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = 'var(--color-text-muted)';
              }}
            >
              ×
            </button>
          )}
          <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginTop: '6px', fontFamily: 'var(--font-ui)' }}>
            Press <kbd style={{ background: 'var(--card)', padding: '2px 6px', borderRadius: '4px', border: '1px solid var(--bdr)', fontSize: '12px', fontWeight: 600 }}>Enter</kbd> to search
          </div>
        </div>
      </form>

      {/* Search Tips Section */}
      <div style={{ marginBottom: '24px', background: 'rgba(59,130,246,0.06)', border: '1px solid rgba(59,130,246,0.15)', borderRadius: '4px', overflow: 'hidden' }}>
        <button
          onClick={() => setTipsExpanded(!tipsExpanded)}
          style={{
            width: '100%',
            padding: '12px 16px',
            background: 'rgba(59,130,246,0.06)',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontFamily: 'var(--font-ui)',
            transition: 'background 150ms',
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(59,130,246,0.08)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(59,130,246,0.04)'}
        >
          <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--link)', flexShrink: 0 }}>
            <circle cx="12" cy="12" r="10" />
            <path d="M12 16v-4m0-4h.01" />
          </svg>
          <span style={{ fontSize: '14px', fontWeight: '600', color: 'var(--link)', margin: 0, flex: 1, textAlign: 'left' }}>Search Tips</span>
          <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ color: 'var(--link)', transform: tipsExpanded ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 150ms' }}>
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
        {tipsExpanded && (
          <div style={{ padding: '12px 16px', borderTop: '1px solid var(--bdr)', fontSize: '14px', color: 'var(--text1)', lineHeight: '1.6', fontFamily: 'var(--font-ui)' }}>
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
          <svg aria-hidden="true" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: 'var(--bdr)', margin: '0 auto 16px', display: 'block' }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <p style={{ color: 'var(--text2)', fontSize: 16, margin: 0, marginBottom: 8, fontFamily: 'var(--font-ui)' }}>
            No case types match your search
          </p>
          <p style={{ color: 'var(--color-text-muted)', fontSize: 14, margin: 0, marginBottom: 16, fontFamily: 'var(--font-ui)' }}>
            for &ldquo;{query}&rdquo;
          </p>
          <Link href="/cases" style={{ color: 'var(--gold)', textDecoration: 'none', fontSize: 14 }}>Browse all categories &rarr;</Link>
        </div>
      )}

      {/* Results header and category filter pills */}
      {query.length > 1 && (
        <>
          {/* Results for... header */}
          <div style={{ marginBottom: '16px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--text1)', margin: '0 0 12px 0', fontFamily: 'var(--font-ui)' }}>
              Results for &ldquo;{query}&rdquo;
            </h2>

            {/* Category filter pills */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              <button
                onClick={() => setSelectedCategory(null)}
                style={{
                  padding: '6px 14px',
                  fontSize: '14px',
                  fontWeight: selectedCategory === null ? 600 : 500,
                  background: selectedCategory === null ? 'var(--link)' : 'var(--card)',
                  color: selectedCategory === null ? 'var(--chrome-text)' : 'var(--text2)',
                  border: selectedCategory === null ? 'none' : '1px solid var(--bdr)',
                  borderRadius: '2px',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-ui)',
                  transition: 'all 150ms ease-out',
                }}
                onMouseEnter={(e) => {
                  if (selectedCategory !== null) {
                    e.currentTarget.style.background = 'rgba(59,130,246,0.06)';
                    e.currentTarget.style.borderColor = 'var(--gold)';
                    e.currentTarget.style.color = 'var(--link)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedCategory !== null) {
                    e.currentTarget.style.background = 'var(--card)';
                    e.currentTarget.style.borderColor = 'var(--bdr)';
                    e.currentTarget.style.color = 'var(--text2)';
                  }
                }}
              >
                All Categories
              </button>
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id === selectedCategory ? null : cat.id)}
                  style={{
                    padding: '6px 14px',
                    fontSize: '14px',
                    fontWeight: selectedCategory === cat.id ? 600 : 500,
                    background: selectedCategory === cat.id ? 'var(--link)' : 'var(--card)',
                    color: selectedCategory === cat.id ? 'var(--chrome-text)' : 'var(--text2)',
                    border: selectedCategory === cat.id ? 'none' : '1px solid var(--bdr)',
                    borderRadius: '2px',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-ui)',
                    transition: 'all 150ms ease-out',
                  }}
                  onMouseEnter={(e) => {
                    if (selectedCategory !== cat.id) {
                      e.currentTarget.style.background = 'rgba(59,130,246,0.06)';
                      e.currentTarget.style.borderColor = 'var(--gold)';
                      e.currentTarget.style.color = 'var(--link)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedCategory !== cat.id) {
                      e.currentTarget.style.background = 'var(--card)';
                      e.currentTarget.style.borderColor = 'var(--bdr)';
                      e.currentTarget.style.color = 'var(--text2)';
                    }
                  }}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Result count */}
          {!isLoading && results.length > 0 && (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <p style={{ fontSize: '14px', color: 'var(--text2)', margin: 0, fontFamily: 'var(--font-ui)' }}>
                <strong style={{ color: 'var(--text1)' }}>{results.length}</strong> result{results.length !== 1 ? 's' : ''} {selectedCategory && <span>in <strong style={{ color: 'var(--link)' }}>{categories.find(c => c.id === selectedCategory)?.label}</strong></span>}
              </p>
            </div>
          )}
        </>
      )}

      {!isLoading && results.map((r, i) => (
        <Link
          key={i}
          href={`/report/${r.nos}`}
          onClick={() => { saveToRecent({ label: r.label, nos: r.nos, category: r.category }); addRecentSearch({ query: r.label, nosCode: r.nos }); }}
          style={{
            display: 'block',
            padding: '16px',
            marginBottom: '12px',
            background: 'var(--card)',
            border: '1px solid var(--bdr)',
            borderRadius: '4px',
            textDecoration: 'none',
            transition: 'all 150ms ease-out',
            cursor: 'pointer',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.1)';
            e.currentTarget.style.borderColor = 'var(--link)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.05)';
            e.currentTarget.style.borderColor = 'var(--bdr)';
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '600', color: 'var(--text1)', margin: '0', fontFamily: 'var(--font-ui)', flex: '1 1 auto' }}>{r.label}</h3>
            <span style={{
              fontSize: '12px',
              fontWeight: '600',
              color: 'var(--link)',
              background: 'rgba(10, 102, 194, 0.08)',
              padding: '4px 10px',
              borderRadius: '4px',
              border: 'none',
              fontFamily: 'var(--font-ui)',
              whiteSpace: 'nowrap',
            }}>
              {r.nos}
            </span>
          </div>
          <p style={{ fontSize: '14px', color: 'var(--text2)', margin: '0', fontFamily: 'var(--font-ui)', lineHeight: '1.5' }}>{r.categoryName}</p>
          {r.desc && <p style={{ fontSize: '14px', color: 'var(--text2)', margin: '8px 0 0 0', fontFamily: 'var(--font-ui)', lineHeight: '1.4' }}>{r.desc}</p>}
          {(r as { aliases?: string[] }).aliases && (r as { aliases: string[] }).aliases.length > 0 && (
            <p
              style={{
                fontSize: '12px',
                color: 'var(--text2)',
                margin: '8px 0 0 0',
                fontFamily: 'var(--font-ui)',
                lineHeight: '1.4',
                fontStyle: 'italic',
              }}
              title={`These case-type labels share NOS code ${r.nos} and are reported under the same federal classification.`}
            >
              Also matches: {(r as { aliases: string[] }).aliases.slice(0, 4).join(', ')}
              {(r as { aliases: string[] }).aliases.length > 4 ? ` +${(r as { aliases: string[] }).aliases.length - 4} more` : ''}
            </p>
          )}
          {/* Inline data preview */}
          {(() => {
            const rd = REAL_DATA[r.nos];
            if (!rd) return null;
            return (
              <div style={{ display: 'flex', gap: '16px', marginTop: '8px', paddingTop: '10px', borderTop: '1px solid var(--bdr)', alignItems: 'center' }}>
                <TrendSparkline nosCode={r.nos} width={64} height={28} />
                {rd.wr != null && (
                  <span style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', color: 'var(--text1)' }}>
                    <span style={{ color: 'var(--text2)', fontFamily: 'var(--font-ui)' }}>Win Rate </span>
                    <strong style={{ color: rd.wr >= 50 ? 'var(--data-positive)' : 'var(--link)' }}>{rd.wr}%</strong>
                  </span>
                )}
                {rd.sp != null && (
                  <span style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', color: 'var(--text1)' }}>
                    <span style={{ color: 'var(--text2)', fontFamily: 'var(--font-ui)' }}>Settlement </span>
                    <strong style={{ color: 'var(--gold)' }}>{rd.sp}%</strong>
                  </span>
                )}
                {rd.total != null && (
                  <span style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', color: 'var(--text1)' }}>
                    <span style={{ color: 'var(--text2)', fontFamily: 'var(--font-ui)' }}>Cases </span>
                    <strong>{rd.total.toLocaleString()}</strong>
                  </span>
                )}
                {rd.mo != null && (
                  <span style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', color: 'var(--text1)' }}>
                    <span style={{ color: 'var(--text2)', fontFamily: 'var(--font-ui)' }}>Duration </span>
                    <strong>{rd.mo}mo</strong>
                  </span>
                )}
                {rd.rng?.md != null && rd.rng.md > 0 && (
                  <span style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', color: 'var(--text1)' }}>
                    <span style={{ color: 'var(--text2)', fontFamily: 'var(--font-ui)' }}>Median </span>
                    <strong style={{ color: 'var(--link)' }}>{formatSettlementAmount(rd.rng.md, { compact: true })}</strong>
                  </span>
                )}
              </div>
            );
          })()}
        </Link>
      ))}

      {/* Judge Search Results */}
      {query.length > 1 && <JudgeSearchResults query={query} />}

      {query.length === 0 && (
        <>
          {/* Popular Searches — Compact */}
          <div style={{ marginTop: '16px', marginBottom: '28px' }}>
            <p style={{ fontSize: '12px', fontWeight: 500, color: 'var(--text2)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px', fontFamily: 'var(--font-ui)' }}>Popular searches</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {['Wrongful termination', 'Car accident', 'Medical malpractice', 'Debt collection', 'Discrimination', 'Slip and fall', 'Breach of contract', 'Insurance bad faith', 'Product liability', 'Sexual harassment', 'ADA violation', 'Wage theft'].map(s => (
                <button
                  key={s}
                  onClick={() => setQuery(s)}
                  style={{
                    padding: '6px 12px',
                    background: 'var(--card)',
                    border: '1px solid var(--bdr)',
                    borderRadius: '4px',
                    fontSize: '12px',
                    color: 'var(--gold)',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-ui)',
                    transition: 'all 150ms ease-out',
                    fontWeight: '500',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(59,130,246,0.06)';
                    e.currentTarget.style.borderColor = 'var(--gold)';
                    e.currentTarget.style.color = 'var(--link-hover)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'var(--card)';
                    e.currentTarget.style.borderColor = 'var(--bdr)';
                    e.currentTarget.style.color = 'var(--gold)';
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Top Case Types by Volume */}
          <div style={{ marginBottom: '32px' }}>
            <p style={{ fontSize: '12px', fontWeight: 500, color: 'var(--text2)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '12px', fontFamily: 'var(--font-ui)' }}>
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
                      background: 'var(--card)', border: '1px solid var(--bdr)', borderRadius: 2,
                      textDecoration: 'none', transition: 'all 150ms ease',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--gold)'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--bdr)'; e.currentTarget.style.boxShadow = 'none'; }}
                  >
                    <span style={{ width: 24, height: 24, borderRadius: 2, background: 'var(--link)', color: 'var(--chrome-text)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 600, flexShrink: 0 }}>
                      {i + 1}
                    </span>
                    <div style={{ flex: 1 }}>
                      <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text1)', fontFamily: 'var(--font-ui)' }}>{item.label}</span>
                    </div>
                    <div style={{ display: 'flex', gap: 16, fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--text2)', flexShrink: 0 }}>
                      <span style={{ color: item.wr >= 50 ? 'var(--data-positive)' : item.wr >= 35 ? 'var(--wrn-txt)' : 'var(--link)', fontWeight: 600 }}>{item.wr}%</span>
                      <span>{item.total.toLocaleString()}</span>
                      <span>{item.mo}mo</span>
                      {item.rngMd > 0 && <span style={{ color: 'var(--link)', fontWeight: 600 }}>{fmtK(item.rngMd)}</span>}
                    </div>
                  </Link>
                ));
              })()}
            </div>
          </div>

          {/* Browse by Category Grid */}
          <div style={{ marginBottom: '32px' }}>
            <p style={{ fontSize: '12px', fontWeight: 500, color: 'var(--text2)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '12px', fontFamily: 'var(--font-ui)' }}>
              Browse by Category
            </p>
            <div className="search-category-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 12 }}>
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
                      padding: '16px', background: 'var(--card)', border: '1px solid var(--bdr)',
                      borderRadius: 2, textDecoration: 'none', transition: 'all 150ms ease',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--link)'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--bdr)'; e.currentTarget.style.boxShadow = 'none'; }}
                  >
                    <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text1)', fontFamily: 'var(--font-ui)', marginBottom: 4 }}>{cat.label}</div>
                    <div style={{ fontSize: 12, color: 'var(--text2)', fontFamily: 'var(--font-ui)', marginBottom: 8 }}>{cat.opts.length} case types</div>
                    <div style={{ display: 'flex', gap: 12, fontSize: 12, fontFamily: 'var(--font-mono)' }}>
                      <span style={{ color: avgWr >= 50 ? 'var(--data-positive)' : avgWr >= 35 ? 'var(--wrn-txt)' : 'var(--link)', fontWeight: 600 }}>{avgWr}% win</span>
                      <span style={{ color: 'var(--text2)' }}>{totalCases >= 1000 ? `${(totalCases / 1000).toFixed(0)}K cases` : `${totalCases} cases`}</span>
                    </div>
                    <div style={{ height: 3, background: 'var(--bdr)', borderRadius: 2, marginTop: 8, overflow: 'hidden' }}>
                      <div style={{ width: `${avgWr}%`, height: '100%', background: avgWr >= 50 ? 'var(--data-positive)' : avgWr >= 35 ? 'var(--wrn-txt)' : 'var(--link)', borderRadius: 2 }} />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Data Highlights Section */}
          <div style={{ marginBottom: '32px' }}>
            <p style={{ fontSize: '12px', fontWeight: 500, color: 'var(--text2)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '12px', fontFamily: 'var(--font-ui)' }}>
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
                  { title: 'Most Filed Case Type', value: mostFiled.label, display: `${mostFiled.total.toLocaleString()} cases`, color: 'var(--link)' },
                  { title: 'Highest Win Rate', value: highestWr.label, display: `${highestWr.wr}%`, color: 'var(--data-positive)' },
                  { title: 'Fastest Resolution', value: fastestResolution?.label || 'N/A', display: fastestResolution ? `${fastestResolution.mo} months` : 'N/A', color: 'var(--link)' },
                  { title: 'Highest Recovery', value: highestRecovery?.label || 'N/A', display: highestRecovery ? `${fmtK(highestRecovery.rngMd)} median` : 'N/A', color: 'var(--link)' },
                ];

                return highlights.map((h, i) => (
                  <div
                    key={i}
                    style={{
                      padding: '16px',
                      background: 'var(--card)',
                      border: '1px solid var(--bdr)',
                      borderRadius: '4px',
                      transition: 'all 150ms ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = h.color;
                      e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'var(--bdr)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <div style={{ fontSize: '12px', fontWeight: 500, color: 'var(--text2)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px', fontFamily: 'var(--font-ui)' }}>
                      {h.title}
                    </div>
                    <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text1)', marginBottom: '6px', fontFamily: 'var(--font-ui)', lineHeight: '1.4' }}>
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

          {/* Data Freshness Indicator */}
          <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid var(--bdr)', fontSize: '12px', color: 'var(--color-text-muted)', fontFamily: 'var(--font-ui)' }}>
            <DataFreshness />
          </div>

          {/* Quick Actions Bar */}
          <div style={{ marginTop: '32px', padding: '24px 0', borderTop: '1px solid var(--bdr)' }}>
            <p style={{ fontSize: '12px', fontWeight: 500, color: 'var(--text2)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '12px', fontFamily: 'var(--font-ui)' }}>
              Quick Actions
            </p>
            <div style={{ display: 'inline-flex', flexWrap: 'wrap', gap: '12px' }}>
              {[
                { label: 'Calculator', href: '/calculator' },
                { label: 'Compare', href: '/compare' },
                { label: 'Odds Checker', href: '/odds' },
                { label: 'Judge Analytics', href: '/judges' },
                { label: 'Trends', href: '/trends' },
                { label: 'Advanced Search', href: '/attorney/advanced-search' },
              ].map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    padding: '12px 20px',
                    background: 'var(--card)',
                    border: '1px solid var(--bdr)',
                    borderRadius: '2px',
                    fontSize: '12px',
                    fontWeight: '600',
                    textDecoration: 'none',
                    color: 'var(--text2)',
                    fontFamily: 'var(--font-ui)',
                    transition: 'all 150ms ease',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--link)';
                    e.currentTarget.style.color = 'var(--link)';
                    e.currentTarget.style.background = 'rgba(10, 102, 194, 0.08)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--bdr)';
                    e.currentTarget.style.color = 'var(--text2)';
                    e.currentTarget.style.background = 'var(--card)';
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
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div style={{ minHeight: '100vh', background: 'var(--surf)', padding: '60px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          {[...Array(5)].map((_, i) => <SkeletonResultCard key={i} />)}
        </div>
      </div>
    }>
      <SearchPageInner />
    </Suspense>
  );
}
