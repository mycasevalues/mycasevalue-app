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
      if (p > 1) params.set('page', String(p));

      // Update URL without navigation
      const url = `/case-search?${params.toString()}`;
      window.history.replaceState({}, '', url);

      try {
        params.set('limit', '20');
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
    [query, court, caseType, yearFrom, yearTo, status, sort, page]
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
    setResults([]);
    setTotal(0);
    setHasSearched(false);
    window.history.replaceState({}, '', '/case-search');
  };

  const hasFilters = court || caseType || yearFrom || yearTo || status;

  return (
    <div className="min-h-screen" style={{ background: 'var(--surf)' }}>
      {/* Header */}
      <div className="border-b" style={{ borderColor: 'var(--bdr)', background: 'var(--card)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
          <h1 style={{ fontSize: '28px', fontWeight: 700, fontFamily: 'var(--font-legal)', color: 'var(--text1)', marginBottom: '0.25rem' }}>Search Federal Cases</h1>
          <p className="text-sm text-[var(--color-text-muted)]">
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
                className="w-full h-11 pl-10 pr-4 rounded border text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-colors"
                style={{ borderColor: 'var(--bdr)', background: 'var(--card)' }}
              />
            </div>
            <button
              type="submit"
              className="h-11 px-5 rounded bg-[var(--gold, #C4882A)] text-white text-sm font-semibold hover:bg-[var(--gold)] transition-colors"
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
                <span className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">
                  Filters
                </span>
                {hasFilters && (
                  <button
                    onClick={handleReset}
                    className="text-xs text-[var(--link)] hover:underline"
                  >
                    Reset
                  </button>
                )}
              </div>

              {/* Court */}
              <div>
                <label className="block text-xs font-medium text-[var(--color-text-muted)] mb-1">Court</label>
                <input
                  type="text"
                  value={court}
                  onChange={(e) => setCourt(e.target.value)}
                  placeholder="e.g. SDNY, CACD"
                  className="w-full h-9 px-3 rounded-md border text-sm"
                  style={{ borderColor: 'var(--bdr)' }}
                />
              </div>

              {/* Case Type */}
              <div>
                <label className="block text-xs font-medium text-[var(--color-text-muted)] mb-1">Case Type</label>
                <input
                  type="text"
                  value={caseType}
                  onChange={(e) => setCaseType(e.target.value)}
                  placeholder="e.g. Securities Fraud"
                  className="w-full h-9 px-3 rounded-md border text-sm"
                  style={{ borderColor: 'var(--bdr)' }}
                />
              </div>

              {/* Year Range */}
              <div className="flex gap-2">
                <div className="flex-1">
                  <label className="block text-xs font-medium text-[var(--color-text-muted)] mb-1">From</label>
                  <input
                    type="number"
                    value={yearFrom}
                    onChange={(e) => setYearFrom(e.target.value)}
                    placeholder="2020"
                    min="1970"
                    max="2026"
                    className="w-full h-9 px-3 rounded-md border text-sm"
                    style={{ borderColor: 'var(--bdr)' }}
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-medium text-[var(--color-text-muted)] mb-1">To</label>
                  <input
                    type="number"
                    value={yearTo}
                    onChange={(e) => setYearTo(e.target.value)}
                    placeholder="2026"
                    min="1970"
                    max="2026"
                    className="w-full h-9 px-3 rounded-md border text-sm"
                    style={{ borderColor: 'var(--bdr)' }}
                  />
                </div>
              </div>

              {/* Status */}
              <div>
                <label className="block text-xs font-medium text-[var(--color-text-muted)] mb-1">Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full h-9 px-3 rounded-md border text-sm"
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
                className="w-full h-9 rounded-md bg-[rgba(255,255,255,0.04)] text-sm font-medium text-[var(--color-text-muted)] hover:bg-[rgba(255,255,255,0.08)] transition-colors"
              >
                Apply Filters
              </button>
            </div>
          </aside>

          {/* Results Area */}
          <div className="flex-1 min-w-0">
            {/* Results header */}
            {hasSearched && (
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-[var(--color-text-muted)]">
                  {loading ? (
                    'Searching...'
                  ) : total > 0 ? (
                    <>
                      <span className="font-semibold text-[var(--color-text-muted)]">{total.toLocaleString()}</span>{' '}
                      result{total !== 1 ? 's' : ''}
                      {query ? (
                        <>
                          {' '}for &ldquo;<span className="font-medium text-[var(--color-text-muted)]">{query}</span>&rdquo;
                        </>
                      ) : null}
                    </>
                  ) : (
                    'No results found'
                  )}
                </p>

                <select
                  value={sort}
                  onChange={(e) => {
                    setSort(e.target.value);
                    performSearch(1);
                  }}
                  className="h-8 px-3 rounded-md border text-xs"
                  style={{ borderColor: 'var(--bdr)' }}
                >
                  {SORT_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Loading */}
            {loading && (
              <div className="space-y-3">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="rounded border p-5 animate-pulse"
                    style={{ borderColor: 'var(--bdr)', background: 'var(--card)' }}
                  >
                    <div className="h-5 bg-[rgba(255,255,255,0.08)] rounded w-3/4 mb-3" />
                    <div className="h-3 bg-[rgba(255,255,255,0.04)] rounded w-1/2 mb-4" />
                    <div className="h-3 bg-[rgba(255,255,255,0.04)] rounded w-full mb-2" />
                    <div className="h-3 bg-[rgba(255,255,255,0.04)] rounded w-2/3" />
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
                <p className="text-sm text-[var(--data-negative)] mb-2">{error}</p>
                <button
                  onClick={() => performSearch(page)}
                  className="text-sm text-[var(--link)] hover:underline"
                >
                  Try again
                </button>
              </div>
            )}

            {/* Empty state (before search) */}
            {!hasSearched && !loading && (
              <div
                className="rounded border p-8 text-center"
                style={{ borderColor: 'var(--bdr)', background: 'var(--card)' }}
              >
                
                <h3 className="text-base font-semibold text-[var(--color-text-muted)] mb-2">
                  Search Federal Court Records
                </h3>
                <p className="text-sm text-[var(--color-text-muted)] mb-5 max-w-md mx-auto">
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
                      className="text-xs px-3 py-1.5 rounded border text-[var(--color-text-muted)] hover:border-[var(--link)] hover:text-[var(--link)] hover:bg-white/5 transition-all"
                      style={{ borderColor: 'var(--bdr)' }}
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
                style={{ borderColor: 'var(--bdr)', background: 'var(--card)' }}
              >
                <h3 className="text-base font-semibold text-[var(--color-text-muted)] mb-2">No Cases Found</h3>
                <p className="text-sm text-[var(--color-text-muted)] mb-4">
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
                      className="text-xs px-3 py-1.5 rounded border text-[var(--color-text-muted)] hover:border-[var(--link)] hover:text-[var(--link)] transition-all"
                      style={{ borderColor: 'var(--bdr)' }}
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
                  className="h-8 px-3 rounded-md border text-xs font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[var(--color-surface-2)] transition-colors"
                  style={{ borderColor: 'var(--bdr)' }}
                >
                  Previous
                </button>
                <span className="text-xs text-[var(--color-text-muted)] px-2">
                  Page {page} of {totalPages}
                </span>
                <button
                  onClick={() => performSearch(page + 1)}
                  disabled={page >= totalPages}
                  className="h-8 px-3 rounded-md border text-xs font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[var(--color-surface-2)] transition-colors"
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

// ── Case Result Card ──

function CaseResultCard({ result }: { result: SearchResult }) {
  const filingYear = result.filingDate ? new Date(result.filingDate).getFullYear() : null;

  return (
    <Link
      href={`/case/${result.id}`}
      className="block rounded border p-5 hover:shadow-md transition-all group"
      style={{ borderColor: 'var(--bdr)', background: 'var(--card)' }}
    >
      {/* Top row: case name + status */}
      <div className="flex items-start justify-between gap-3 mb-2">
        <h3 className="text-sm font-semibold text-[var(--text1)] group-hover:text-[var(--link)] transition-colors leading-snug">
          {result.caseName}
        </h3>
        {result.status && (
          <span
            className="flex-shrink-0 text-[10px] font-medium px-2 py-0.5 rounded uppercase tracking-wider"
            style={{
              background:
                result.status === 'open'
                  ? 'rgba(30,64,175,0.15)'
                  : result.status === 'closed'
                  ? 'rgba(22,101,52,0.15)'
                  : 'rgba(255,255,255,0.05)',
              color:
                result.status === 'open'
                  ? '#60a5fa'
                  : result.status === 'closed'
                  ? '#4ade80'
                  : '#9ca3af',
            }}
          >
            {result.status}
          </span>
        )}
      </div>

      {/* Meta row */}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[var(--color-text-muted)] mb-3">
        {result.court && (
          <span className="font-medium">{result.court.abbreviation}</span>
        )}
        {result.docketNumber && <span>{result.docketNumber}</span>}
        {filingYear && <span>Filed {filingYear}</span>}
        {result.caseType && (
          <span className="text-[var(--color-text-muted)]">{result.caseType}</span>
        )}
      </div>

      {/* Summary preview */}
      {result.summaryPreview && (
        <p className="text-xs text-[var(--color-text-muted)] leading-relaxed mb-3 line-clamp-2">
          {result.summaryPreview}
        </p>
      )}

      {/* Tags */}
      {result.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {result.tags.slice(0, 5).map((t) => (
            <span
              key={`${t.category}-${t.tag}`}
              className="text-[10px] px-2 py-0.5 rounded border"
              style={{
                borderColor: 'var(--bdr)',
                color: 'var(--text2)',
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
          <div className="text-sm text-[var(--color-text-muted)]">Loading search...</div>
        </div>
      }
    >
      <CaseSearchContent />
    </Suspense>
  );
}
