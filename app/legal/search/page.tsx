'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardBody } from '../../../components/ui/Card';
import { SearchIcon } from '../../../components/ui/Icons';

/* ââ Source config (icon colors + labels) ââ */
const SOURCE_CONFIG: Record<string, { label: string; color: string; bg: string }> = {
  courtlistener:    { label: 'CourtListener',    color: '#1E3A5F', bg: '#EFF6FF' },
  federal_register: { label: 'Federal Register', color: '#7C3AED', bg: '#F5F3FF' },
  ecfr:             { label: 'eCFR',             color: '#0D9488', bg: '#F0FDFA' },
  edgar:            { label: 'EDGAR',            color: '#D97706', bg: '#FFFBEB' },
  caselaw:          { label: 'Caselaw Access',   color: '#059669', bg: '#F0FDF4' },
  canlii:           { label: 'CanLII',           color: '#DC2626', bg: '#FEF2F2' },
  govinfo:          { label: 'GovInfo',          color: '#4B5563', bg: '#F9FAFB' },
};

const DOC_TYPES = ['opinion', 'regulation', 'filing', 'statute', 'notice', 'rule'];

interface SearchResult {
  id: string;
  source: string;
  sourceId: string;
  title: string;
  type: string;
  snippet: string;
  jurisdiction: string;
  dateFiled: string;
  datePublished: string;
  metadata: any;
}

interface SearchResponse {
  results: SearchResult[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  query: string;
}

/* ââ Skeleton loader ââ */
const SkeletonCard = () => (
  <div style={{
    padding: '20px',
    marginBottom: '12px',
    background: '#FFFFFF',
    border: '1px solid #E5E7EB',
    borderRadius: '12px',
    animation: 'shimmer 2s infinite',
  }}>
    <div style={{ height: 20, width: '70%', background: '#E8EAED', borderRadius: 8, marginBottom: 10 }} />
    <div style={{ height: 14, width: '40%', background: '#E8EAED', borderRadius: 8, marginBottom: 8 }} />
    <div style={{ height: 14, width: '90%', background: '#E8EAED', borderRadius: 8 }} />
  </div>
);

export default function LegalSearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [source, setSource] = useState(searchParams.get('source') || '');
  const [docType, setDocType] = useState(searchParams.get('type') || '');
  const [dateFrom, setDateFrom] = useState(searchParams.get('from') || '');
  const [dateTo, setDateTo] = useState(searchParams.get('to') || '');
  const [page, setPage] = useState(parseInt(searchParams.get('page') || '1', 10));

  const [results, setResults] = useState<SearchResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const doSearch = useCallback(async (p: number = 1) => {
    if (!query.trim()) return;
    setLoading(true);
    setError('');

    const params = new URLSearchParams({ q: query.trim(), page: String(p), limit: '20' });
    if (source) params.set('source', source);
    if (docType) params.set('type', docType);
    if (dateFrom) params.set('from', dateFrom);
    if (dateTo) params.set('to', dateTo);

    // Update URL
    router.push(`/legal/search?${params.toString()}`, { scroll: false });

    try {
      const res = await fetch(`/api/legal/search?${params.toString()}`);
      if (!res.ok) throw new Error('Search request failed');
      const data = await res.json();
      setResults(data);
      setPage(p);
    } catch (err) {
      setError('Failed to search. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [query, source, docType, dateFrom, dateTo, router]);

  // Initial search from URL params
  useEffect(() => {
    if (searchParams.get('q')) doSearch(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    doSearch(1);
  };

  const formatDate = (d: string | null) => {
    if (!d) return 'â';
    return new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 16px 64px' }}>

      {/* ââ Header ââ */}
      <div style={{ marginBottom: 32 }}>
        <nav style={{ fontSize: 13, color: '#6B7280', marginBottom: 8 }}>
          <Link href="/" style={{ color: '#0966C3', textDecoration: 'none' }}>Home</Link>
          <span style={{ margin: '0 6px' }}>/</span>
          <Link href="/legal" style={{ color: '#0966C3', textDecoration: 'none' }}>Legal Data</Link>
          <span style={{ margin: '0 6px' }}>/</span>
          <span>Search</span>
        </nav>
        <h1 style={{
          fontFamily: 'var(--font-inter, Inter, sans-serif)',
          fontSize: 28,
          fontWeight: 700,
          color: '#0f0f0f',
          margin: 0,
        }}>
          Legal Document Search
        </h1>
        <p style={{ color: '#4B5563', fontSize: 15, margin: '6px 0 0', lineHeight: 1.5 }}>
          Search across 7 legal data sources â opinions, regulations, filings, and statutes with full-text and semantic matching.
        </p>
      </div>

      {/* ââ Search bar ââ */}
      <form onSubmit={handleSubmit} style={{ marginBottom: 24 }}>
        <div style={{
          display: 'flex',
          gap: 8,
          alignItems: 'stretch',
        }}>
          <div style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            background: '#FFFFFF',
            border: '2px solid #E5E7EB',
            borderRadius: 12,
            padding: '0 12px',
            transition: 'border-color 0.15s',
          }}>
            <span style={{ display: 'inline-flex', width: 18, height: 18, color: '#9CA3AF', flexShrink: 0 }}><SearchIcon /></span>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search legal documents... (e.g., patent infringement, GDPR compliance)"
              style={{
                flex: 1,
                border: 'none',
                outline: 'none',
                padding: '14px 10px',
                fontSize: 15,
                fontFamily: 'var(--font-inter, Inter, sans-serif)',
                background: 'transparent',
                color: '#0f0f0f',
              }}
            />
          </div>
          <button
            type="submit"
            disabled={loading || !query.trim()}
            className="mcv-btn mcv-btn--primary"
            style={{
              padding: '14px 28px',
              borderRadius: 12,
              fontSize: 15,
              fontWeight: 600,
              cursor: loading ? 'wait' : 'pointer',
              opacity: loading || !query.trim() ? 0.6 : 1,
              whiteSpace: 'nowrap',
            }}
          >
            {loading ? 'Searchingâ¦' : 'Search'}
          </button>
        </div>

        {/* Filter toggle */}
        <button
          type="button"
          onClick={() => setShowFilters(!showFilters)}
          style={{
            background: 'none',
            border: 'none',
            color: '#0966C3',
            fontSize: 13,
            fontWeight: 500,
            cursor: 'pointer',
            padding: '8px 0',
            display: 'flex',
            alignItems: 'center',
            gap: 4,
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
          </svg>
          {showFilters ? 'Hide filters' : 'Show filters'}
        </button>

        {/* ââ Filters ââ */}
        {showFilters && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 12,
            padding: 16,
            background: '#F7F8FA',
            borderRadius: 12,
            marginTop: 4,
          }}>
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#4B5563', marginBottom: 4 }}>Source</label>
              <select
                value={source}
                onChange={(e) => setSource(e.target.value)}
                style={{ width: '100%', padding: '8px 10px', borderRadius: 8, border: '1px solid #D1D5DB', fontSize: 14, background: '#fff' }}
              >
                <option value="">All sources</option>
                {Object.entries(SOURCE_CONFIG).map(([key, cfg]) => (
                  <option key={key} value={key}>{cfg.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#4B5563', marginBottom: 4 }}>Document Type</label>
              <select
                value={docType}
                onChange={(e) => setDocType(e.target.value)}
                style={{ width: '100%', padding: '8px 10px', borderRadius: 8, border: '1px solid #D1D5DB', fontSize: 14, background: '#fff' }}
              >
                <option value="">All types</option>
                {DOC_TYPES.map((t) => (
                  <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>
                ))}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#4B5563', marginBottom: 4 }}>From Date</label>
              <input
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                style={{ width: '100%', padding: '8px 10px', borderRadius: 8, border: '1px solid #D1D5DB', fontSize: 14 }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#4B5563', marginBottom: 4 }}>To Date</label>
              <input
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                style={{ width: '100%', padding: '8px 10px', borderRadius: 8, border: '1px solid #D1D5DB', fontSize: 14 }}
              />
            </div>
          </div>
        )}
      </form>

      {/* ââ Error ââ */}
      {error && (
        <div style={{
          padding: '12px 16px',
          background: '#FEF2F2',
          border: '1px solid #FECACA',
          borderRadius: 8,
          color: '#B91C1C',
          fontSize: 14,
          marginBottom: 16,
        }}>
          {error}
        </div>
      )}

      {/* ââ Results header ââ */}
      {results && !loading && (
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 16,
          flexWrap: 'wrap',
          gap: 8,
        }}>
          <p style={{ fontSize: 14, color: '#4B5563', margin: 0 }}>
            <strong>{results.total.toLocaleString()}</strong> results for &ldquo;{results.query}&rdquo;
          </p>
          {results.totalPages > 1 && (
            <p style={{ fontSize: 13, color: '#6B7280', margin: 0 }}>
              Page {results.page} of {results.totalPages}
            </p>
          )}
        </div>
      )}

      {/* ââ Loading ââ */}
      {loading && (
        <div>
          {[1, 2, 3, 4, 5].map(i => <SkeletonCard key={i} />)}
        </div>
      )}

      {/* ââ Results list ââ */}
      {results && !loading && results.results.map((doc) => {
        const srcCfg = SOURCE_CONFIG[doc.source] || { label: doc.source, color: '#4B5563', bg: '#F9FAFB' };
        return (
          <Card key={doc.id} variant="outlined" padding="md" className="mb-3">
            <CardBody>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6, flexWrap: 'wrap' }}>
                <span style={{
                  display: 'inline-block',
                  padding: '2px 10px',
                  borderRadius: 20,
                  fontSize: 11,
                  fontWeight: 600,
                  color: srcCfg.color,
                  background: srcCfg.bg,
                  letterSpacing: '0.02em',
                }}>
                  {srcCfg.label}
                </span>
                {doc.type && (
                  <span style={{
                    display: 'inline-block',
                    padding: '2px 8px',
                    borderRadius: 20,
                    fontSize: 11,
                    color: '#4B5563',
                    background: '#F3F4F6',
                  }}>
                    {doc.type}
                  </span>
                )}
                {doc.jurisdiction && (
                  <span style={{ fontSize: 12, color: '#6B7280' }}>{doc.jurisdiction}</span>
                )}
              </div>
              <h3 style={{
                fontSize: 16,
                fontWeight: 600,
                color: '#0f0f0f',
                margin: '0 0 6px',
                lineHeight: 1.35,
              }}>
                <Link
                  href={`/legal/citations?documentId=${doc.id}`}
                  style={{ color: '#004182', textDecoration: 'none' }}
                >
                  {doc.title || 'Untitled Document'}
                </Link>
              </h3>
              <p style={{
                fontSize: 13.5,
                color: '#4B5563',
                lineHeight: 1.55,
                margin: '0 0 8px',
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}>
                {doc.snippet}
              </p>
              <div style={{ fontSize: 12, color: '#9CA3AF' }}>
                {doc.datePublished && <span>Published {formatDate(doc.datePublished)}</span>}
                {doc.dateFiled && doc.dateFiled !== doc.datePublished && (
                  <span style={{ marginLeft: 12 }}>Filed {formatDate(doc.dateFiled)}</span>
                )}
              </div>
            </CardBody>
          </Card>
        );
      })}

      {/* ââ Empty state ââ */}
      {results && !loading && results.results.length === 0 && (
        <div style={{ textAlign: 'center', padding: '48px 16px', color: '#6B7280' }}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#D1D5DB" strokeWidth="1.5" style={{ margin: '0 auto 16px' }}>
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <p style={{ fontSize: 16, fontWeight: 500, margin: '0 0 4px' }}>No documents found</p>
          <p style={{ fontSize: 14 }}>Try broadening your search or adjusting the filters.</p>
        </div>
      )}

      {/* ââ Pagination ââ */}
      {results && results.totalPages > 1 && !loading && (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 8,
          marginTop: 32,
        }}>
          <button
            onClick={() => doSearch(page - 1)}
            disabled={page <= 1}
            className="mcv-btn mcv-btn--secondary"
            style={{ padding: '8px 20px', borderRadius: 8, fontSize: 14, opacity: page <= 1 ? 0.4 : 1 }}
          >
            Previous
          </button>
          <span style={{ display: 'flex', alignItems: 'center', fontSize: 14, color: '#4B5563', padding: '0 12px' }}>
            {page} / {results.totalPages}
          </span>
          <button
            onClick={() => doSearch(page + 1)}
            disabled={page >= results.totalPages}
            className="mcv-btn mcv-btn--secondary"
            style={{ padding: '8px 20px', borderRadius: 8, fontSize: 14, opacity: page >= results.totalPages ? 0.4 : 1 }}
          >
            Next
          </button>
        </div>
      )}

      {/* ââ Initial state (no search yet) ââ */}
      {!results && !loading && !error && (
        <div style={{ textAlign: 'center', padding: '64px 16px' }}>
          <div style={{
            width: 64,
            height: 64,
            borderRadius: '50%',
            background: '#E8F4FD',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px',
          }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0966C3" strokeWidth="2">
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>
          <h2 style={{ fontSize: 20, fontWeight: 600, color: '#0f0f0f', margin: '0 0 8px' }}>
            Search Legal Documents
          </h2>
          <p style={{ fontSize: 14, color: '#6B7280', maxWidth: 460, margin: '0 auto', lineHeight: 1.5 }}>
            Enter a query above to search across CourtListener opinions, Federal Register regulations, eCFR, EDGAR filings, Harvard Caselaw, CanLII, and GovInfo.
          </p>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 8,
            justifyContent: 'center',
            marginTop: 24,
          }}>
            {Object.entries(SOURCE_CONFIG).map(([key, cfg]) => (
              <span
                key={key}
                style={{
                  padding: '4px 14px',
                  borderRadius: 20,
                  fontSize: 12,
                  fontWeight: 500,
                  color: cfg.color,
                  background: cfg.bg,
                }}
              >
                {cfg.label}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
