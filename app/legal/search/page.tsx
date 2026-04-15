'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

interface SearchResult {
  id: string;
  title: string;
  snippet: string;
  source: string;
  sourceId: string;
  type: string;
  jurisdiction: string;
  date: string;
  url?: string;
}

interface SearchResponse {
  results: SearchResult[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  query: string;
  filters: Record<string, string | undefined>;
  isDemo: boolean;
}

const SOURCES = [
  { value: 'all', label: 'All Sources' },
  { value: 'courtlistener', label: 'CourtListener' },
  { value: 'federal_register', label: 'Federal Register' },
  { value: 'ecfr', label: 'eCFR' },
  { value: 'edgar', label: 'EDGAR' },
  { value: 'caselaw', label: 'Caselaw Access' },
  { value: 'canlii', label: 'CanLII' },
  { value: 'govinfo', label: 'GovInfo' },
];

const TYPES = [
  { value: 'all', label: 'All Types' },
  { value: 'opinion', label: 'Opinions' },
  { value: 'regulation', label: 'Regulations' },
  { value: 'statute', label: 'Statutes' },
  { value: 'filing', label: 'SEC Filings' },
  { value: 'notice', label: 'Notices' },
];

const SOURCE_COLORS: Record<string, string> = {
  courtlistener: '#1E3A5F',
  federal_register: '#7C3AED',
  ecfr: '#0D9488',
  edgar: '#D97706',
  caselaw: '#059669',
  canlii: '#DC2626',
  govinfo: '#6B7280',
};

const SOURCE_LABELS: Record<string, string> = {
  courtlistener: 'CourtListener',
  federal_register: 'Federal Register',
  ecfr: 'eCFR',
  edgar: 'EDGAR',
  caselaw: 'Caselaw Access',
  canlii: 'CanLII',
  govinfo: 'GovInfo',
};

function highlightQuery(text: string, query: string): string {
  if (!query.trim()) return text;
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return text.replace(new RegExp(`(${escaped})`, 'gi'), '<mark style="background:#FEF08A;padding:0 2px;border-radius:2px">$1</mark>');
}

export default function LegalSearchPage() {
  const [query, setQuery] = useState('');
  const [source, setSource] = useState('all');
  const [docType, setDocType] = useState('all');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isDemo, setIsDemo] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const doSearch = useCallback(async (searchPage = 1) => {
    setLoading(true);
    setHasSearched(true);
    try {
      const params = new URLSearchParams();
      if (query.trim()) params.set('q', query.trim());
      if (source !== 'all') params.set('source', source);
      if (docType !== 'all') params.set('type', docType);
      if (dateFrom) params.set('from', dateFrom);
      if (dateTo) params.set('to', dateTo);
      params.set('page', String(searchPage));
      params.set('limit', '10');

      const res = await fetch(`/api/legal/search?${params.toString()}`);
      const data: SearchResponse = await res.json();

      setResults(data.results);
      setTotal(data.total);
      setPage(data.page);
      setTotalPages(data.totalPages);
      setIsDemo(data.isDemo);
    } catch {
      setResults([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  }, [query, source, docType, dateFrom, dateTo]);

  useEffect(() => {
    doSearch(1);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    doSearch(1);
  };

  const selectStyle: React.CSSProperties = {
    padding: '10px 14px',
    borderRadius: 10,
    border: '1px solid #D1D5DB',
    fontSize: 14,
    color: '#374151',
    background: 'var(--color-surface-0)',
    outline: 'none',
    minWidth: 140,
  };

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 16px 80px' }}>

      {/* Breadcrumb */}
      <nav style={{ fontSize: 13, color: '#6B7280', marginBottom: 24 }}>
        <Link href="/legal" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>Research Hub</Link>
        <span style={{ margin: '0 8px' }}>/</span>
        <span>Document Search</span>
      </nav>

      {/* Hero */}
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 32, fontWeight: 700, color: 'var(--color-text-primary)', margin: '0 0 8px', lineHeight: 1.2 }}>
          Legal Document Search
        </h1>
        <p style={{ fontSize: 15, color: '#6B7280', margin: 0, maxWidth: 600, lineHeight: 1.6 }}>
          Search across 7 authoritative legal data sources. Find opinions, regulations, statutes, SEC filings, and government documents from a single interface.
        </p>
      </div>

      {/* Search bar */}
      <form onSubmit={handleSubmit} style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
          <div style={{ flex: 1, position: 'relative' }}>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search cases, regulations, filings..."
              style={{
                width: '100%',
                padding: '14px 18px 14px 46px',
                borderRadius: 12,
                border: '2px solid #D1D5DB',
                fontSize: 16,
                color: 'var(--color-text-primary)',
                outline: 'none',
                boxSizing: 'border-box',
                transition: 'border-color 0.15s',
              }}
              onFocus={(e) => (e.target.style.borderColor = 'var(--accent-primary)')}
              onBlur={(e) => (e.target.style.borderColor = '#D1D5DB')}
            />
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-muted)" strokeWidth="2" style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)' }}>
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>
          <button
            type="submit"
            disabled={loading}
            style={{
              padding: '14px 28px',
              borderRadius: 12,
              background: 'var(--accent-primary)',
              color: 'var(--color-surface-0)',
              fontSize: 15,
              fontWeight: 600,
              border: 'none',
              cursor: loading ? 'wait' : 'pointer',
              opacity: loading ? 0.7 : 1,
              whiteSpace: 'nowrap',
            }}
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            style={{
              padding: '14px 18px',
              borderRadius: 12,
              background: showFilters ? '#E8F4FD' : '#F3F4F6',
              color: showFilters ? 'var(--accent-primary)' : '#6B7280',
              fontSize: 14,
              fontWeight: 500,
              border: showFilters ? '1px solid var(--accent-primary)' : '1px solid #D1D5DB',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
          >
            Filters {showFilters ? 'á¶²' : 'â¼'}
          </button>
        </div>

        {/* Filters panel */}
        {showFilters && (
          <div style={{
            display: 'flex',
            gap: 12,
            flexWrap: 'wrap',
            padding: '16px 20px',
            background: '#F9FAFB',
            borderRadius: 12,
            border: '1px solid var(--border-default)',
            alignItems: 'center',
          }}>
            <div>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#6B7280', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Source</label>
              <select value={source} onChange={(e) => setSource(e.target.value)} style={selectStyle}>
                {SOURCES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#6B7280', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Type</label>
              <select value={docType} onChange={(e) => setDocType(e.target.value)} style={selectStyle}>
                {TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#6B7280', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.05em' }}>From</label>
              <input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} style={{ ...selectStyle, minWidth: 150 }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#6B7280', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.05em' }}>To</label>
              <input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} style={{ ...selectStyle, minWidth: 150 }} />
            </div>
            <div style={{ marginLeft: 'auto', alignSelf: 'flex-end' }}>
              <button
                type="button"
                onClick={() => { setSource('all'); setDocType('all'); setDateFrom(''); setDateTo(''); }}
                style={{ padding: '10px 16px', borderRadius: 8, background: 'transparent', color: '#6B7280', fontSize: 13, border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
              >
                Clear filters
              </button>
            </div>
          </div>
        )}
      </form>

      {/* Demo banner */}
      {isDemo && hasSearched && (
        <div style={{
          padding: '10px 16px',
          background: '#FFFBEB',
          border: '1px solid #FDE68A',
          borderRadius: 10,
          fontSize: 13,
          color: '#92400E',
          marginBottom: 16,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}>
          <span style={{ fontSize: 16 }}>&#x1F50D;</span>
          <span>Showing demo results â connect to Supabase for live data from all 7 sources.</span>
        </div>
      )}

      {/* Results header */}
      {hasSearched && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div style={{ fontSize: 14, color: '#6B7280' }}>
            {loading ? 'Searching...' : `${total} result${total !== 1 ? 's' : ''} found`}
            {query.trim() && !loading && <span> for &ldquo;<strong style={{ color: 'var(--color-text-primary)' }}>{query}</strong>&rdquo;</span>}
          </div>
          {total > 0 && totalPages > 1 && (
            <div style={{ fontSize: 13, color: '#6B7280' }}>
              Page {page} of {totalPages}
            </div>
          )}
        </div>
      )}

      {/* Results list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {results.map((doc) => (
          <div
            key={doc.id}
            style={{
              padding: '20px 24px',
              borderRadius: 14,
              border: '1px solid var(--border-default)',
              background: 'var(--color-surface-0)',
              transition: 'border-color 0.15s, box-shadow 0.15s',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--accent-primary)'; e.currentTarget.style.boxShadow = '0 2px 12px rgba(9,102,195,0.08)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-default)'; e.currentTarget.style.boxShadow = 'none'; }}
          >
            {/* Meta row */}
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8, flexWrap: 'wrap' }}>
              <span style={{
                display: 'inline-block',
                padding: '3px 10px',
                borderRadius: 6,
                fontSize: 11,
                fontWeight: 600,
                color: SOURCE_COLORS[doc.source] || '#6B7280',
                background: `${SOURCE_COLORS[doc.source] || '#6B7280'}14`,
                letterSpacing: '0.02em',
              }}>
                {SOURCE_LABELS[doc.source] || doc.source}
              </span>
              <span style={{
                display: 'inline-block',
                padding: '3px 10px',
                borderRadius: 6,
                fontSize: 11,
                fontWeight: 500,
                color: '#6B7280',
                background: '#F3F4F6',
                textTransform: 'capitalize',
              }}>
                {doc.type}
              </span>
              <span style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>
                {doc.jurisdiction}
              </span>
              <span style={{ fontSize: 12, color: 'var(--color-text-muted)', marginLeft: 'auto' }}>
                {new Date(doc.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
              </span>
            </div>

            {/* Title */}
            <h3
              style={{ fontSize: 16, fontWeight: 600, color: 'var(--accent-primary)', margin: '0 0 6px', lineHeight: 1.4 }}
              dangerouslySetInnerHTML={{ __html: highlightQuery(doc.title, query) }}
            />

            {/* Snippet */}
            <p
              style={{ fontSize: 14, color: 'var(--color-text-secondary)', margin: 0, lineHeight: 1.65 }}
              dangerouslySetInnerHTML={{ __html: highlightQuery(doc.snippet, query) }}
            />

            {/* Footer */}
            <div style={{ display: 'flex', gap: 16, marginTop: 12, alignItems: 'center' }}>
              <span style={{ fontSize: 12, color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono, monospace)' }}>
                {doc.sourceId}
              </span>
              {doc.url && (
                <a
                  href={doc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontSize: 12, color: 'var(--accent-primary)', textDecoration: 'none', fontWeight: 500 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  View source &#x2197;
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Empty state */}
      {hasSearched && !loading && results.length === 0 && (
        <div style={{ textAlign: 'center', padding: '48px 20px' }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>&#x1F50D;</div>
          <h3 style={{ fontSize: 18, fontWeight: 600, color: 'var(--color-text-primary)', margin: '0 0 8px' }}>No results found</h3>
          <p style={{ fontSize: 14, color: '#6B7280', margin: 0 }}>
            Try adjusting your search terms or filters to find what you&apos;re looking for.
          </p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 28 }}>
          <button
            onClick={() => doSearch(page - 1)}
            disabled={page <= 1 || loading}
            style={{
              padding: '10px 18px',
              borderRadius: 10,
              border: '1px solid #D1D5DB',
              background: page <= 1 ? '#F3F4F6' : 'var(--color-surface-0)',
              color: page <= 1 ? 'var(--color-text-muted)' : '#374151',
              fontSize: 14,
              cursor: page <= 1 ? 'not-allowed' : 'pointer',
            }}
          >
            &larr; Previous
          </button>
          <button
            onClick={() => doSearch(page + 1)}
            disabled={page >= totalPages || loading}
            style={{
              padding: '10px 18px',
              borderRadius: 10,
              border: '1px solid #D1D5DB',
              background: page >= totalPages ? '#F3F4F6' : 'var(--color-surface-0)',
              color: page >= totalPages ? 'var(--color-text-muted)' : '#374151',
              fontSize: 14,
              cursor: page >= totalPages ? 'not-allowed' : 'pointer',
            }}
          >
            Next &rarr;
          </button>
        </div>
      )}

      {/* Source stats sidebar */}
      <div style={{
        marginTop: 48,
        padding: '28px 32px',
        borderRadius: 16,
        background: '#F9FAFB',
        border: '1px solid var(--border-default)',
      }}>
        <h3 style={{ fontSize: 16, fontWeight: 600, color: 'var(--color-text-primary)', margin: '0 0 16px' }}>
          Search Across 7 Sources
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 10 }}>
          {SOURCES.filter(s => s.value !== 'all').map((s) => (
            <button
              key={s.value}
              onClick={() => { setSource(s.value); doSearch(1); }}
              style={{
                padding: '10px 14px',
                borderRadius: 10,
                border: source === s.value ? `2px solid ${SOURCE_COLORS[s.value]}` : '1px solid var(--border-default)',
                background: source === s.value ? `${SOURCE_COLORS[s.value]}0A` : 'var(--color-surface-0)',
                cursor: 'pointer',
                textAlign: 'left',
              }}
            >
              <div style={{ fontSize: 13, fontWeight: 600, color: SOURCE_COLORS[s.value] }}>
                {s.label}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Back to hub */}
      <div style={{ textAlign: 'center', marginTop: 40 }}>
        <Link href="/legal" style={{ fontSize: 14, color: 'var(--accent-primary)', textDecoration: 'none', fontWeight: 500 }}>
          &larr; Back to Research Hub
        </Link>
      </div>
    </div>
  );
}
