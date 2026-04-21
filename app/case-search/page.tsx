'use client';

/**
 * Case Search Page
 *
 * Full-featured search interface for the canonical cases table.
 * Includes text search, filters (court, case type, year range, status),
 * result cards with AI summary previews and tags, and pagination.
 *
 * Route: /case-search?q=...&court=...&caseType=...&yearFrom=...&yearTo=...&status=...&sort=...&page=...
 */

import { useState, useEffect, useCallback, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';

// ── Types ──

interface SearchResult {
  id: number;
  caseName: string;
  docketNumber: string;
  caseType: string | null;
  filingDate: string | null;
  terminationDate: string | null;
  status: string | null;
  proceduralPosture: string | null;
  court: { name: string; abbreviation: string; circuit: string } | null;
  summaryPreview: string | null;
  tags: Array<{ tag: string; category: string }>;
}

interface SearchResponse {
  results: SearchResult[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// ── Constants ──

const SORT_OPTIONS = [
  { value: 'relevance', label: 'Most Relevant' },
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
];

const STATUS_OPTIONS = ['', 'open', 'closed', 'settled', 'dismissed'];

const EXAMPLE_QUERIES = [
  'SEC v. Terraform',
  'Patent infringement',
  'Employment discrimination',
  'Class action securities',
  'Civil rights excessive force',
];

// ── Main Component ──

function CaseSearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // State from URL params
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [court, setCourt] = useState(searchParams.get('court') || '');
  const [caseType, setCaseType] = useState(searchParams.get('caseType') || '');
  const [yearFrom, setYearFrom] = useState(searchParams.get('yearFrom') || '');
  const [yearTo, setYearTo] = useState(searchParams.get('yearTo') || '');
  const [status, setStatus] = useState(searchParams.get('status') || '');
  const [sort, setSort] = useState(searchParams.get('sort') || 'relevance');
  const [page, setPage] = useState(parseInt(searchParams.get('page') || '1', 10));
  const [pageSize, setPageSize] = useState(parseInt(searchParams.get('pageSize') || '25', 10));

  // Results state
  const [results, setResults] = useState<SearchResult[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  // Build URL params and search
  const performSearch = useCallback(
    async (p = page) => {
      setLoading(true);
      setError('');
      setHasSearched(true);

      const params = new URLSearchParams();
      if (query) params.set('q', query);
      if (court) params.set('court', court);
      if (caseType) params.set('caseType', caseType);
      if (yearFrom) params.set('yearFrom', yearFrom);
      if (yearTo) params.set('yearTo', yearTo);
      if (status) params.set('status', status);
      if (sort !== 'relevance') params.set('sort', sort);
      if (pageSize !== 25) params.set('pageSize', String(pageSize));
      if (p > 1) params.set('page', String(p));

      // Update URL without navigation
      const url = `/case-search?${params.toString()}`;
      window.history.replaceState({}, '', url);

      try {
        params.set('limit', String(pageSize));
        params.set('page', String(p));
        const res = await fetch(`/api/cases/search?${params.toString()}`);
        if (!res.ok) throw new Error('Search request failed');
        const data: SearchResponse = await res.json();
        setResults(data.results);
        setTotal(data.total);
        setTotalPages(data.totalPages);
        setPage(p);

        // Save search to history
        if (query) {
          try {
            const { saveSearchHistory } = await import('../../lib/persistence');
            await saveSearchHistory(query, caseType || undefined);
          } catch {
            // Silent fail — don't block search
          }
        }
      } catch (err) {
        setError('Unable to search. Please try again.');
        setResults([]);
        setTotal(0);
      } finally {
        setLoading(false);
      }
    },
    [query, court, caseType, yearFrom, yearTo, status, sort, page, pageSize]
  );

  // Search on mount if URL has params
  useEffect(() => {
    if (searchParams.get('q') || searchParams.get('court') || searchParams.get('caseType')) {
      performSearch(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch(1);
  };

  const handleReset = () => {
    setQuery('');
    setCourt('');
    setCaseType('');
    setYearFrom('');
    setYearTo('');
    setStatus('');
    setSort('relevance');
    setPage(1);
    setPageSize(25);
    setResults([]);
    setTotal(0);
    setHasSearched(false);
    window.history.replaceState({}, '', '/case-search');
  };

  const hasFilters = Boolean(court || caseType || yearFrom || yearTo || status);

  // Build active-filter chips for the Westlaw-style toolbar (audit #45)
  const activeFilters: Array<{ key: string; label: string; value: string; onRemove: () => void }> = [];
  if (court) {
    activeFilters.push({ key: 'court', label: 'Court', value: court, onRemove: () => { setCourt(''); setTimeout(() => performSearch(1), 0); } });
  }
  if (caseType) {
    activeFilters.push({ key: 'caseType', label: 'Case Type', value: caseType, onRemove: () => { setCaseType(''); setTimeout(() => performSearch(1), 0); } });
  }
  if (yearFrom || yearTo) {
    const label = yearFrom && yearTo ? `${yearFrom}–${yearTo}` : yearFrom ? `from ${yearFrom}` : `until ${yearTo}`;
    activeFilters.push({ key: 'years', label: 'Years', value: label, onRemove: () => { setYearFrom(''); setYearTo(''); setTimeout(() => performSearch(1), 0); } });
  }
  if (status) {
    activeFilters.push({ key: 'status', label: 'Status', value: status, onRemove: () => { setStatus(''); setTimeout(() => performSearch(1), 0); } });
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--surf)' }}>
      {/* Header */}
      <div className="border-b" style={{ borderColor: 'var(--bdr)', background: 'var(--card)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
          <h1 style={{ fontSize: '28px', fontWeight: 700, fontFamily: 'var(--font-legal)', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>Search Federal Cases</h1>
          <p style={{ fontSize: 14, color: 'var(--text-secondary)' }}>
            Search individual case records from public federal court data.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        {/* Search Bar */}
        <form onSubmit={handleSubmit} className="mb-6">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]"
                width="16"
                height="16"
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
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by case name, docket number, or keyword..."
                className="w-full h-11 pl-10 pr-4 rounded border focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-colors"
                style={{ borderColor: 'var(--bdr)', background: 'var(--card)' }}
              />
            </div>
            <button
 type="submit"
 className="h-11 px-5 rounded bg-[var(--gold, #C4882A)] text-white hover:bg-[var(--gold)] transition-colors" style={{ fontSize: 14, fontWeight: 600 }}
 >
              Search
            </button>
          </div>
        </form>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filter Sidebar */}
          <aside className="w-full lg:w-56 flex-shrink-0">
            <div
              className="rounded border p-4 space-y-4"
              style={{ borderColor: 'var(--bdr)', background: 'var(--card)' }}
            >
              <div className="flex items-center justify-between">
                <span className="text-[var(--color-text-muted)] uppercase tracking-wider" style={{ fontSize: 12, fontWeight: 600 }}>
                  Filters
                </span>
                {hasFilters && (
                  <button
 onClick={handleReset}
 className="text-[var(--link)] hover:underline" style={{ fontSize: 12 }}
 >
                    Reset
                  </button>
                )}
              </div>

              {/* Court */}
              <div>
                <label className="block text-[var(--color-text-muted)] mb-1" style={{ fontSize: 12, fontWeight: 500 }}>Court</label>
                <input
                  type="text"
                  value={court}
                  onChange={(e) => setCourt(e.target.value)}
                  placeholder="e.g. SDNY, CACD"
                  className="w-full h-9 px-3 rounded-md border"
                  style={{ borderColor: 'var(--bdr)' }}
                />
              </div>

              {/* Case Type */}
              <div>
                <label className="block text-[var(--color-text-muted)] mb-1" style={{ fontSize: 12, fontWeight: 500 }}>Case Type</label>
                <input
                  type="text"
                  value={caseType}
                  onChange={(e) => setCaseType(e.target.value)}
                  placeholder="e.g. Securities Fraud"
                  className="w-full h-9 px-3 rounded-md border"
                  style={{ borderColor: 'var(--bdr)' }}
                />
              </div>

              {/* Year Range */}
              <div className="flex gap-2">
                <div className="flex-1">
                  <label className="block text-[var(--color-text-muted)] mb-1" style={{ fontSize: 12, fontWeight: 500 }}>From</label>
                  <input
                    type="number"
                    value={yearFrom}
                    onChange={(e) => setYearFrom(e.target.value)}
                    placeholder="2020"
                    min="1970"
                    max="2026"
                    className="w-full h-9 px-3 rounded-md border"
                    style={{ borderColor: 'var(--bdr)' }}
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-[var(--color-text-muted)] mb-1" style={{ fontSize: 12, fontWeight: 500 }}>To</label>
                  <input
                    type="number"
                    value={yearTo}
                    onChange={(e) => setYearTo(e.target.value)}
                    placeholder="2026"
                    min="1970"
                    max="2026"
                    className="w-full h-9 px-3 rounded-md border"
                    style={{ borderColor: 'var(--bdr)' }}
                  />
                </div>
              </div>

              {/* Status */}
              <div>
                <label className="block text-[var(--color-text-muted)] mb-1" style={{ fontSize: 12, fontWeight: 500 }}>Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full h-9 px-3 rounded-md border"
                  style={{ borderColor: 'var(--bdr)' }}
                >
                  <option value="">All</option>
                  <option value="open">Open</option>
                  <option value="closed">Closed</option>
                  <option value="settled">Settled</option>
                  <option value="dismissed">Dismissed</option>
                </select>
              </div>

              {/* Apply button */}
              <button
                onClick={() => performSearch(1)}
                className="w-full h-9 rounded transition-colors"
                style={{
                  background: 'var(--gold)',
                  color: '#FFFFFF',
                  fontSize: 13,
                  fontWeight: 600,
                  border: 'none',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--gold-hover)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--gold)')}
              >
                Apply Filters
              </button>
            </div>
          </aside>

          {/* Results Area */}
          <div className="flex-1 min-w-0">
            {/* Westlaw-style Results Toolbar (audit #43, #45) */}
            {hasSearched && (
              <div
                className="mb-4 rounded border"
                style={{ borderColor: 'var(--bdr)', background: '#FFFFFF' }}
              >
                {/* Row 1: count + query + sort */}
                <div
                  className="flex items-center justify-between gap-3 px-4 py-2.5"
                  style={{ borderBottom: activeFilters.length > 0 ? '1px solid var(--bdr)' : 'none' }}
                >
                  <div className="flex items-baseline gap-2 min-w-0">
                    {loading ? (
                      <span style={{ fontSize: 13, color: 'var(--text-tertiary)', fontStyle: 'italic' }}>
                        Searching…
                      </span>
                    ) : total > 0 ? (
                      <>
                        <span
                          style={{
                            fontSize: 16,
                            fontWeight: 700,
                            color: 'var(--text-primary)',
                            fontFamily: 'var(--font-mono)',
                          }}
                        >
                          {total.toLocaleString()}
                        </span>
                        <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
                          result{total !== 1 ? 's' : ''}
                          {query ? (
                            <>
                              {' '}for{' '}
                              <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                                &ldquo;{query}&rdquo;
                              </span>
                            </>
                          ) : null}
                        </span>
                      </>
                    ) : (
                      <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
                        No results found
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <div className="inline-flex items-center gap-2">
                      <span className="uppercase" style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.08em', color: 'var(--text-tertiary)' }}>Show</span>
                      <select
                        value={pageSize}
                        onChange={(e) => { const n = parseInt(e.target.value, 10); setPageSize(n); setPage(1); setTimeout(() => performSearch(1), 0); }}
                        className="px-2 py-1 rounded border focus:outline-none focus:ring-1 focus:ring-[var(--link)]/30"
                        style={{ fontSize: 12, fontFamily: 'var(--font-ui)', color: 'var(--text-primary)', borderColor: 'var(--bdr)', background: '#FFFFFF' }}
                      >
                        <option value={10}>10</option>
                        <option value={25}>25</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                      </select>
                    </div>
                    <label
                      className="uppercase hidden sm:inline"
                      style={{
                        fontSize: 10,
                        fontWeight: 600,
                        letterSpacing: '0.08em',
                        color: 'var(--text-tertiary)',
                      }}
                    >
                      Sort
                    </label>
                    <select
                      value={sort}
                      onChange={(e) => {
                        setSort(e.target.value);
                        setTimeout(() => performSearch(1), 0);
                      }}
                      className="h-8 px-2.5 rounded border"
                      style={{
                        borderColor: 'var(--bdr)',
                        fontSize: 13,
                        color: 'var(--text-primary)',
                        background: '#FFFFFF',
                        fontWeight: 500,
                      }}
                    >
                      {SORT_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Row 2: Active-filter chips (only when filters applied) */}
                {activeFilters.length > 0 && (
                  <div
                    className="flex flex-wrap items-center gap-2 px-4 py-2"
                    style={{ background: '#FAFBFC' }}
                  >
                    <span
                      className="uppercase"
                      style={{
                        fontSize: 10,
                        fontWeight: 600,
                        letterSpacing: '0.08em',
                        color: 'var(--text-tertiary)',
                      }}
                    >
                      Filters
                    </span>
                    {activeFilters.map((f) => (
                      <button
                        key={f.key}
                        type="button"
                        onClick={f.onRemove}
                        className="inline-flex items-center gap-1.5 rounded transition-colors hover:opacity-80"
                        style={{
                          padding: '3px 8px 3px 10px',
                          fontSize: 12,
                          fontWeight: 500,
                          color: 'var(--text-primary)',
                          background: '#EBF5FF',
                          border: '1px solid #B6D4F7',
                        }}
                        aria-label={`Remove ${f.label} filter: ${f.value}`}
                      >
                        <span style={{ color: 'var(--text-tertiary)', fontWeight: 600 }}>
                          {f.label}:
                        </span>
                        <span>{f.value}</span>
                        <span
                          aria-hidden
                          style={{
                            marginLeft: 2,
                            color: 'var(--text-tertiary)',
                            fontWeight: 700,
                            fontSize: 14,
                            lineHeight: 1,
                          }}
                        >
                          ×
                        </span>
                      </button>
                    ))}
                    <button
                      type="button"
                      onClick={handleReset}
                      className="hover:underline ml-1"
                      style={{
                        fontSize: 12,
                        color: 'var(--link)',
                        fontWeight: 500,
                      }}
                    >
                      Clear all
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Loading */}
            {loading && (
              <div className="space-y-3">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="rounded border p-5 animate-pulse"
                    style={{ borderColor: 'var(--bdr)', background: '#FFFFFF' }}
                  >
                    <div className="h-5 rounded w-3/4 mb-3" style={{ background: '#F0F1F4' }} />
                    <div className="h-3 rounded w-1/2 mb-4" style={{ background: '#F0F1F4' }} />
                    <div className="h-3 rounded w-full mb-2" style={{ background: '#F7F8FA' }} />
                    <div className="h-3 rounded w-2/3" style={{ background: '#F7F8FA' }} />
                  </div>
                ))}
              </div>
            )}

            {/* Error */}
            {error && (
              <div
                className="rounded border p-6 text-center"
                style={{ borderColor: 'var(--bdr)', background: 'var(--card)' }}
              >
                <p className="text-[var(--data-negative)] mb-2" style={{ fontSize: 14 }}>{error}</p>
                <button
                  onClick={() => performSearch(page)}
                  className="text-[var(--link)] hover:underline"
                >
                  Try again
                </button>
              </div>
            )}

            {/* Empty state (before search) */}
            {!hasSearched && !loading && (
              <div
                className="rounded border p-8 text-center"
                style={{ borderColor: 'var(--bdr)', background: '#FFFFFF' }}
              >
                <h3
                  className="mb-2"
                  style={{
                    fontSize: 18,
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                    fontFamily: 'var(--font-legal)',
                  }}
                >
                  Search Federal Court Records
                </h3>
                <p className="mb-5 max-w-md mx-auto" style={{ fontSize: 14, color: 'var(--text-secondary)' }}>
                  Search by case name, docket number, court, or legal topic.
                  Results include AI-generated summaries and classification tags.
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {EXAMPLE_QUERIES.map((eq) => (
                    <button
                      key={eq}
                      onClick={() => {
                        setQuery(eq);
                        performSearch(1);
                      }}
                      className="px-3 py-1.5 rounded border transition-all"
                      style={{
                        borderColor: 'var(--bdr)',
                        fontSize: 13,
                        color: 'var(--text-primary)',
                        background: '#F7F8FA',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = 'var(--link)';
                        e.currentTarget.style.color = 'var(--link)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'var(--bdr)';
                        e.currentTarget.style.color = 'var(--text-primary)';
                      }}
                    >
                      {eq}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* No results */}
            {hasSearched && !loading && !error && total === 0 && (
              <div
                className="rounded border p-8 text-center"
                style={{ borderColor: 'var(--bdr)', background: '#FFFFFF' }}
              >
                <h3
                  className="mb-2"
                  style={{
                    fontSize: 16,
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                    fontFamily: 'var(--font-legal)',
                  }}
                >
                  No Cases Found
                </h3>
                <p className="mb-4" style={{ fontSize: 14, color: 'var(--text-secondary)' }}>
                  No cases match your search. Try broadening your query or adjusting filters.
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {EXAMPLE_QUERIES.slice(0, 3).map((eq) => (
                    <button
                      key={eq}
                      onClick={() => {
                        setQuery(eq);
                        performSearch(1);
                      }}
                      className="px-3 py-1.5 rounded border transition-all"
                      style={{
                        borderColor: 'var(--bdr)',
                        fontSize: 13,
                        color: 'var(--text-primary)',
                        background: '#F7F8FA',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = 'var(--link)';
                        e.currentTarget.style.color = 'var(--link)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'var(--bdr)';
                        e.currentTarget.style.color = 'var(--text-primary)';
                      }}
                    >
                      Try: {eq}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Results list */}
            {!loading && !error && results.length > 0 && (
              <div className="space-y-3">
                {results.map((r) => (
                  <CaseResultCard key={r.id} result={r} />
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && !loading && (
              <div className="flex items-center justify-center gap-2 mt-6">
                <button
                  onClick={() => performSearch(page - 1)}
                  disabled={page <= 1}
                  className="h-8 px-3 rounded-md border disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[var(--color-surface-2)] transition-colors"
                  style={{ borderColor: 'var(--bdr)' }}
                >
                  Previous
                </button>
                <span
                  className="px-2 tabular-nums"
                  style={{ fontSize: 12, color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}
                >
                  Page {page} of {totalPages}
                </span>
                <button
                  onClick={() => performSearch(page + 1)}
                  disabled={page >= totalPages}
                  className="h-8 px-3 rounded-md border disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[var(--color-surface-2)] transition-colors"
                  style={{ borderColor: 'var(--bdr)' }}
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── CaseCite Flag (Westlaw KeyCite-inspired status indicator) ──

function CaseCiteFlag({ status }: { status?: string | null }) {
  const s = (status || '').toLowerCase();
  // Westlaw KeyCite-inspired palette
  let color = '#9CA3AF'; // default gray (unknown)
  let label = 'Status unknown';
  if (s === 'closed' || s === 'terminated') { color = '#16A34A'; label = 'Closed'; }
  else if (s === 'open' || s === 'pending' || s === 'active') { color = '#1A73E8'; label = 'Open'; }
  else if (s === 'stayed' || s === 'remanded') { color = '#C4882A'; label = 'Stayed'; }
  return (
    <svg aria-label={`CaseCite flag: ${label}`} role="img" width="10" height="14" viewBox="0 0 10 14" style={{ display: 'inline-block', verticalAlign: '-2px', marginRight: 6, flexShrink: 0 }}>
      <rect x="1" y="0" width="1.5" height="14" fill="#6B7280" />
      <path d="M2.5 0 L9 0 L7.5 3 L9 6 L2.5 6 Z" fill={color} />
    </svg>
  );
}

// ── Case Result Card ──

function CaseResultCard({ result }: { result: SearchResult }) {
  const filingYear = result.filingDate ? new Date(result.filingDate).getFullYear() : null;

  // Westlaw-style semantic status palette
  const statusStyle = (() => {
    const s = (result.status || '').toLowerCase();
    if (s === 'open' || s === 'pending' || s === 'active') {
      return { bg: '#EBF5FF', fg: '#1557B0', border: '#B6D4F7' };
    }
    if (s === 'closed' || s === 'terminated' || s === 'settled') {
      return { bg: '#F0F9F3', fg: '#166534', border: '#BBE5C6' };
    }
    if (s === 'dismissed') {
      return { bg: '#FAF3E6', fg: '#8A6020', border: '#E8D09C' };
    }
    return { bg: '#F3F4F6', fg: '#525252', border: '#E5E7EB' };
  })();

  return (
    <Link
      href={`/case/${result.id}`}
      className="block rounded border p-5 transition-all group"
      style={{
        borderColor: 'var(--bdr)',
        background: '#FFFFFF',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'var(--link)';
        e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.08)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--bdr)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* Top row: case name + status */}
      <div className="flex items-start justify-between gap-3 mb-1.5">
        <h3
          className="group-hover:underline transition-colors leading-snug"
          style={{
            fontFamily: 'var(--font-legal)',
            fontSize: 16,
            fontWeight: 600,
            color: 'var(--link)',
          }}
        >
          <CaseCiteFlag status={result.status} />
          {result.caseName}
        </h3>
        {result.status && (
          <span
            className="flex-shrink-0 inline-flex items-center uppercase"
            style={{
              fontSize: 10,
              letterSpacing: '0.08em',
              fontWeight: 700,
              padding: '2px 6px',
              borderRadius: 3,
              background: statusStyle.bg,
              color: statusStyle.fg,
              border: `1px solid ${statusStyle.border}`,
            }}
          >
            {result.status}
          </span>
        )}
      </div>

      {/* Meta row */}
      <div
        className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-2.5"
        style={{ fontSize: 12, color: 'var(--text-tertiary)' }}
      >
        {result.court && (
          <span style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>
            {result.court.abbreviation}
          </span>
        )}
        {result.docketNumber && (
          <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>
            {result.docketNumber}
          </span>
        )}
        {filingYear && <span>Filed {filingYear}</span>}
        {result.caseType && <span>{result.caseType}</span>}
      </div>

      {/* Summary preview */}
      {result.summaryPreview && (
        <p
          className="leading-relaxed mb-3 line-clamp-2"
          style={{ fontSize: 13, color: 'var(--text-primary)' }}
        >
          {result.summaryPreview}
        </p>
      )}

      {/* Tags */}
      {result.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {result.tags.slice(0, 5).map((t) => (
            <span
              key={`${t.category}-${t.tag}`}
              className="rounded border"
              style={{
                fontSize: 11,
                padding: '2px 8px',
                borderColor: 'var(--bdr)',
                color: 'var(--text-secondary)',
                background: '#F7F8FA',
                fontWeight: 500,
              }}
            >
              {t.tag}
            </span>
          ))}
        </div>
      )}
    </Link>
  );
}

// ── Wrapper with Suspense ──

export default function CaseSearchPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--surf)' }}>
          <div className="text-[var(--color-text-muted)]" style={{ fontSize: 14 }}>Loading search...</div>
        </div>
      }
    >
      <CaseSearchContent />
    </Suspense>
  );
}
