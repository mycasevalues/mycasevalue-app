'use client';

import { useState, useCallback } from 'react';
import { REAL_DATA } from '../lib/realdata';
import { formatSettlementAmount, fmtK } from '../lib/format';

/**
 * Extracted search parameters from natural language query
 */
interface ExtractedParams {
  nosCode: number | null;
  district: string | null;
  minSettlement: number | null;
  maxSettlement: number | null;
  yearFrom: number | null;
  yearTo: number | null;
  keywords: string[];
}

/**
 * Search result from REAL_DATA
 */
interface SearchResult {
  code: string;
  label: string;
  category?: string;
  total?: number;
  rng?: { lo: number; md: number; hi: number };
  sp?: number; // settlement percentage
  wr?: number; // win rate
}

/**
 * Get NOS code label from REAL_DATA
 */
function getNOSLabel(code: number | string): string | null {
  const data = REAL_DATA[String(code)];
  return data?.label || null;
}

/**
 * Filter REAL_DATA based on extracted parameters
 */
function filterResults(params: ExtractedParams): SearchResult[] {
  const results: SearchResult[] = [];

  // If nosCode is specified, return just that
  if (params.nosCode) {
    const data = REAL_DATA[String(params.nosCode)];
    if (data) {
      results.push({
        code: String(params.nosCode),
        label: data.label,
        category: data.category,
        total: data.total,
        rng: data.rng,
        sp: data.sp,
        wr: data.wr,
      });
    }
  } else if (params.keywords.length > 0) {
    // Search by keywords if no NOS code specified
    const keywordsLower = params.keywords.map((k) => k.toLowerCase());

    Object.entries(REAL_DATA).forEach(([code, data]) => {
      if (!data || !data.label) return;

      const labelLower = data.label.toLowerCase();
      const subLower = data.sub ? data.sub.toLowerCase() : '';

      // Check if any keyword matches the label or sub
      const matches = keywordsLower.forEach((keyword) => {
        if (labelLower.includes(keyword) || subLower.includes(keyword)) {
          results.push({
            code,
            label: data.label,
            category: data.category,
            total: data.total,
            rng: data.rng,
            sp: data.sp,
            wr: data.wr,
          });
        }
      });
    });
  }

  // Filter by settlement amount range if specified
  if (params.minSettlement || params.maxSettlement) {
    // Note: settlement amounts are in thousands (rng.md is median in thousands)
    const minThousands = params.minSettlement ? Math.floor(params.minSettlement / 1000) : 0;
    const maxThousands = params.maxSettlement ? Math.ceil(params.maxSettlement / 1000) : Infinity;

    return results.filter((r) => {
      if (!r.rng) return true;
      return r.rng.md >= minThousands && r.rng.md <= maxThousands;
    });
  }

  return results;
}

/**
 * Format settlement amount for display
 */
function formatSettlement(thousands: number): string {
  if (thousands < 1) return 'Under $1K';
  if (thousands < 1000) return `$${thousands}K`;
  return `$${(thousands / 1000).toFixed(1)}M`;
}

/**
 * Natural Language Search Component
 */
export default function NaturalLanguageSearch() {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [params, setParams] = useState<ExtractedParams | null>(null);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [activeChips, setActiveChips] = useState<Set<string>>(new Set());

  /**
   * Handle form submission
   */
  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!query.trim()) return;

      setIsLoading(true);
      setError('');
      setParams(null);
      setResults([]);

      try {
        const response = await fetch('/api/search/natural', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to process search');
        }

        const data = await response.json();
        const extractedParams = data.parameters as ExtractedParams;

        setParams(extractedParams);
        setActiveChips(new Set());

        // If no parameters extracted, don't filter
        if (
          !extractedParams.nosCode &&
          !extractedParams.district &&
          !extractedParams.minSettlement &&
          !extractedParams.maxSettlement &&
          extractedParams.keywords.length === 0
        ) {
          setError(
            'We could not extract specific search parameters from your query. Try: "employment discrimination cases in New York" or use the category filters below.'
          );
          return;
        }

        const filtered = filterResults(extractedParams);
        setResults(filtered);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'An error occurred';
        setError(message);
      } finally {
        setIsLoading(false);
      }
    },
    [query]
  );

  /**
   * Remove a parameter chip
   */
  const removeChip = useCallback((chipKey: string) => {
    if (!params) return;

    setActiveChips((prev) => {
      const next = new Set(prev);
      next.delete(chipKey);
      return next;
    });

    // Create new filtered params with this field cleared
    const updatedParams = { ...params };

    switch (chipKey) {
      case 'nosCode':
        updatedParams.nosCode = null;
        break;
      case 'district':
        updatedParams.district = null;
        break;
      case 'minSettlement':
        updatedParams.minSettlement = null;
        break;
      case 'maxSettlement':
        updatedParams.maxSettlement = null;
        break;
    }

    setParams(updatedParams);
    const filtered = filterResults(updatedParams);
    setResults(filtered);
  }, [params]);

  /**
   * Render extracted parameters as removable chips
   */
  const renderChips = () => {
    if (!params) return null;

    const chips = [];

    if (params.nosCode) {
      const label = getNOSLabel(params.nosCode);
      chips.push(
        <div
          key="nosCode"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 12px',
            background: '#E8F4FD',
            border: '1px solid var(--accent-primary)',
            borderRadius: '4px',
            fontSize: '14px',
            color: 'var(--color-text-primary)',
            fontFamily: 'var(--font-ui)',
            marginRight: '8px',
            marginBottom: '8px',
          }}
        >
          <span>
            Case Type: <strong>{label || `NOS ${params.nosCode}`}</strong>
          </span>
          <button
            type="button"
            onClick={() => removeChip('nosCode')}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '16px',
              color: 'var(--accent-primary)',
              padding: '0',
              display: 'flex',
              alignItems: 'center',
            }}
            aria-label="Remove case type filter"
          >
            ×
          </button>
        </div>
      );
    }

    if (params.district) {
      chips.push(
        <div
          key="district"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 12px',
            background: '#E8F4FD',
            border: '1px solid var(--accent-primary)',
            borderRadius: '4px',
            fontSize: '14px',
            color: 'var(--color-text-primary)',
            fontFamily: 'var(--font-ui)',
            marginRight: '8px',
            marginBottom: '8px',
          }}
        >
          <span>
            District: <strong>{params.district}</strong>
          </span>
          <button
            type="button"
            onClick={() => removeChip('district')}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '16px',
              color: 'var(--accent-primary)',
              padding: '0',
              display: 'flex',
              alignItems: 'center',
            }}
            aria-label="Remove district filter"
          >
            ×
          </button>
        </div>
      );
    }

    if (params.minSettlement) {
      chips.push(
        <div
          key="minSettlement"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 12px',
            background: '#E8F4FD',
            border: '1px solid var(--accent-primary)',
            borderRadius: '4px',
            fontSize: '14px',
            color: 'var(--color-text-primary)',
            fontFamily: 'var(--font-ui)',
            marginRight: '8px',
            marginBottom: '8px',
          }}
        >
          <span>
            Min Settlement: <strong>${(params.minSettlement / 1000).toFixed(0)}K</strong>
          </span>
          <button
            type="button"
            onClick={() => removeChip('minSettlement')}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '16px',
              color: 'var(--accent-primary)',
              padding: '0',
              display: 'flex',
              alignItems: 'center',
            }}
            aria-label="Remove minimum settlement filter"
          >
            ×
          </button>
        </div>
      );
    }

    if (params.maxSettlement) {
      chips.push(
        <div
          key="maxSettlement"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 12px',
            background: '#E8F4FD',
            border: '1px solid var(--accent-primary)',
            borderRadius: '4px',
            fontSize: '14px',
            color: 'var(--color-text-primary)',
            fontFamily: 'var(--font-ui)',
            marginRight: '8px',
            marginBottom: '8px',
          }}
        >
          <span>
            Max Settlement: <strong>${(params.maxSettlement / 1000).toFixed(0)}K</strong>
          </span>
          <button
            type="button"
            onClick={() => removeChip('maxSettlement')}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '16px',
              color: 'var(--accent-primary)',
              padding: '0',
              display: 'flex',
              alignItems: 'center',
            }}
            aria-label="Remove maximum settlement filter"
          >
            ×
          </button>
        </div>
      );
    }

    return chips;
  };

  return (
    <div
      style={{
        display: 'block',
        padding: '24px',
        background: 'var(--color-surface-0)',
        border: '2px solid var(--accent-primary)',
        borderRadius: '4px',
        marginBottom: '24px',
      }}
    >
      {/* Header */}
      <h2
        style={{
          fontSize: '18px',
          fontWeight: '600',
          fontFamily: 'var(--font-heading)',
          color: 'var(--color-text-primary)',
          marginBottom: '8px',
        }}
      >
        Search with natural language (AI-powered)
      </h2>
      <p
        style={{
          fontSize: '14px',
          color: 'var(--color-text-secondary)',
          fontFamily: 'var(--font-ui)',
          marginBottom: '16px',
        }}
      >
        Describe your situation in plain English
      </p>

      {/* Search Form */}
      <form onSubmit={handleSubmit} style={{ marginBottom: '16px' }}>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g., wrongful termination cases settled over $100K in New York in the last 5 years"
            disabled={isLoading}
            style={{
              flex: 1,
              padding: '12px',
              fontSize: '14px',
              fontFamily: 'var(--font-ui)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '4px',
              outline: 'none',
              transition: 'border-color 0.2s',
              boxSizing: 'border-box',
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--accent-primary)')}
            onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--bdr, #E2DFD8)')}
          />
          <button
            type="submit"
            disabled={isLoading || !query.trim()}
            style={{
              padding: '12px 24px',
              background: isLoading || !query.trim() ? 'var(--bdr, #E2DFD8)' : 'var(--accent-primary)',
              color: 'var(--color-surface-0)',
              fontSize: '14px',
              fontWeight: '600',
              fontFamily: 'var(--font-ui)',
              border: 'none',
              borderRadius: '4px',
              cursor: isLoading || !query.trim() ? 'not-allowed' : 'pointer',
              transition: 'background-color 0.2s',
            }}
            onMouseEnter={(e) => {
              if (!isLoading && query.trim()) {
                e.currentTarget.style.background = 'var(--accent-primary-hover)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isLoading && query.trim()) {
                e.currentTarget.style.background = 'var(--accent-primary)';
              }
            }}
          >
            {isLoading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </form>

      {/* Error Message */}
      {error && (
        <div
          style={{
            padding: '12px',
            background: 'rgba(239,68,68,0.1)',
            border: '1px solid var(--data-negative-border, #FCA5A5)',
            borderRadius: '4px',
            color: 'var(--data-negative, #B01E1E)',
            fontSize: '14px',
            fontFamily: 'var(--font-ui)',
            marginBottom: '16px',
          }}
        >
          {error}
        </div>
      )}

      {/* Extracted Parameters Chips */}
      {params && Object.keys(renderChips() || {}).length > 0 && (
        <div style={{ marginBottom: '16px' }}>
          <p
            style={{
              fontSize: '12px',
              textTransform: 'uppercase',
              color: 'var(--color-text-secondary)',
              fontWeight: '600',
              fontFamily: 'var(--font-ui)',
              marginBottom: '8px',
            }}
          >
            Extracted Parameters
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {renderChips()}
          </div>
        </div>
      )}

      {/* Results */}
      {results.length > 0 && (
        <div style={{ marginTop: '16px' }}>
          <p
            style={{
              fontSize: '12px',
              textTransform: 'uppercase',
              color: 'var(--color-text-secondary)',
              fontWeight: '600',
              fontFamily: 'var(--font-ui)',
              marginBottom: '12px',
            }}
          >
            Matching Case Types ({results.length})
          </p>
          <div style={{ display: 'grid', gap: '12px' }}>
            {results.map((result) => (
              <div
                key={result.code}
                style={{
                  padding: '12px',
                  background: 'var(--color-surface-0)',
                  border: '1px solid var(--border-default)',
                  borderRadius: '4px',
                }}
              >
                <div
                  style={{
                    fontSize: '14px',
                    fontWeight: '600',
                    fontFamily: 'var(--font-heading)',
                    color: 'var(--color-text-primary)',
                    marginBottom: '4px',
                  }}
                >
                  {result.label}
                </div>
                {result.rng && (
                  <div
                    style={{
                      fontSize: '12px',
                      color: 'var(--color-text-secondary)',
                      fontFamily: 'var(--font-mono)',
                    }}
                  >
                    Settlement Range: {formatSettlement(result.rng.lo)} - {formatSettlement(result.rng.hi)}{' '}
                    (median: {formatSettlement(result.rng.md)})
                  </div>
                )}
                {result.sp && (
                  <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', fontFamily: 'var(--font-mono)' }}>
                    Settlement Rate: {result.sp.toFixed(1)}%
                  </div>
                )}
                {result.total && (
                  <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', fontFamily: 'var(--font-mono)' }}>
                    Total Cases: {result.total.toLocaleString()}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
