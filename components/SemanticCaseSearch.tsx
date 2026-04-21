'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { getWinRateColor } from '../lib/color-scale';

/**
 * Semantic search result with case metadata
 */
interface SemanticResult {
  nosCode: number;
  label: string;
  similarity: number;
  reasoning: string;
  winRate: number | null;
  settlementMedian: number | null;
  caseCount: number | null;
}

/**
 * Format settlement amount for display
 */
function formatSettlement(thousands: number | null): string {
  if (thousands === null || thousands === undefined) return 'N/A';
  if (thousands < 1) return 'Under $1K';
  if (thousands < 1000) return `$${thousands}K`;
  return `$${(thousands / 1000).toFixed(1)}M`;
}

/**
 * Semantic Case Search Component
 */
export default function SemanticCaseSearch() {
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [results, setResults] = useState<SemanticResult[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const charCount = description.length;
  const maxChars = 500;
  const isOverLimit = charCount > maxChars;

  /**
   * Handle form submission
   */
  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!description.trim() || isOverLimit) return;

      setIsLoading(true);
      setError('');
      setResults([]);
      setHasSearched(true);

      try {
        const response = await fetch('/api/search/semantic', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ description: description.trim() }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to search');
        }

        const data = await response.json();
        setResults(data.matches || []);

        if (!data.matches || data.matches.length === 0) {
          setError('No matching cases found. Try describing your situation with more detail.');
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : 'An error occurred';
        setError(message);
      } finally {
        setIsLoading(false);
      }
    },
    [description, isOverLimit]
  );

  return (
    <div
      style={{
        display: 'block',
        padding: '24px',
        background: 'var(--card)',
        border: '2px solid var(--link)',
        borderRadius: '4px',
        marginBottom: '24px',
      }}
    >
      {/* Header */}
      <h2
        style={{
          fontSize: '20px',
          fontWeight: '600',
          fontFamily: 'var(--font-heading)',
          color: 'var(--text1)',
          marginBottom: '8px',
        }}
      >
        Describe your situation
      </h2>
      <p
        style={{
          fontSize: '14px',
          color: 'var(--text2)',
          fontFamily: 'var(--font-ui)',
          marginBottom: '16px',
        }}
      >
        Use AI to find cases similar to your situation
      </p>

      {/* Search Form */}
      <form onSubmit={handleSubmit} style={{ marginBottom: '16px' }}>
        <div style={{ marginBottom: '12px' }}>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="I was fired after reporting safety violations to my supervisor. I had worked there for 8 years and had positive performance reviews."
            disabled={isLoading}
            maxLength={maxChars}
            style={{
              width: '100%',
              minHeight: '120px',
              padding: '12px',
              fontSize: '14px',
              fontFamily: 'var(--font-ui)',
              border: isOverLimit ? '1px solid #CC1016' : '1px solid var(--bdr, #E5E7EB)',
              borderRadius: '4px',
              outline: 'none',
              transition: 'border-color 200ms',
              boxSizing: 'border-box',
              resize: 'vertical',
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = isOverLimit ? 'var(--data-negative, #B01E1E)' : 'var(--link)';
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = isOverLimit ? 'var(--data-negative)' : 'var(--bdr)';
            }}
          />
        </div>

        {/* Character Counter */}
        <div
          style={{
            fontSize: '12px',
            color: isOverLimit ? 'var(--data-negative, #B01E1E)' : 'var(--text3, #4A4940)',
            fontFamily: 'var(--font-mono)',
            marginBottom: '12px',
            textAlign: 'right',
          }}
        >
          {charCount} / {maxChars} characters
        </div>

        {/* Button */}
        <button
          type="submit"
          disabled={isLoading || !description.trim() || isOverLimit}
          style={{
            padding: '12px 24px',
            background: isLoading || !description.trim() || isOverLimit ? 'var(--bdr, #E5E7EB)' : 'var(--link)',
            color: 'var(--card)',
            fontSize: '14px',
            fontWeight: '600',
            fontFamily: 'var(--font-ui)',
            border: 'none',
            borderRadius: '4px',
            cursor: isLoading || !description.trim() || isOverLimit ? 'not-allowed' : 'pointer',
            transition: 'background-color 200ms',
          }}
          onMouseEnter={(e) => {
            if (!isLoading && description.trim() && !isOverLimit) {
              e.currentTarget.style.background = 'var(--accent-primary-hover)';
            }
          }}
          onMouseLeave={(e) => {
            if (!isLoading && description.trim() && !isOverLimit) {
              e.currentTarget.style.background = 'var(--link)';
            }
          }}
        >
          {isLoading ? 'Searching...' : 'Find Similar Cases'}
        </button>
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

      {/* Results */}
      {hasSearched && results.length > 0 && (
        <div style={{ marginTop: '16px' }}>
          <p
            style={{
              fontSize: '12px',
              textTransform: 'uppercase',
              color: 'var(--text2)',
              fontWeight: '600',
              fontFamily: 'var(--font-ui)',
              marginBottom: '12px',
            }}
          >
            Cases most similar to your description — based on AI semantic matching.
          </p>
          <div style={{ display: 'grid', gap: '12px' }}>
            {results.map((result) => {
              const winRateColor = result.winRate ? getWinRateColor(result.winRate) : null;
              const similarityPercent = Math.round(result.similarity * 100);

              return (
                <div
                  key={result.nosCode}
                  style={{
                    padding: '16px',
                    background: 'var(--card)',
                    border: '1px solid var(--bdr)',
                    borderRadius: '4px',
                  }}
                >
                  {/* Title and Similarity Score */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      justifyContent: 'space-between',
                      marginBottom: '8px',
                      gap: '12px',
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          fontSize: '14px',
                          fontWeight: '600',
                          fontFamily: 'var(--font-heading)',
                          color: 'var(--text1)',
                          marginBottom: '2px',
                        }}
                      >
                        {result.label}
                      </div>
                      <div
                        style={{
                          fontSize: '12px',
                          color: 'var(--text2)',
                          fontFamily: 'var(--font-mono)',
                          marginBottom: '4px',
                        }}
                      >
                        NOS {result.nosCode}
                      </div>
                    </div>
                    <div
                      style={{
                        display: 'inline-block',
                        padding: '4px 12px',
                        background: 'rgba(59,130,246,0.08)',
                        border: '1px solid var(--link)',
                        borderRadius: '4px',
                        fontSize: '12px',
                        fontWeight: '600',
                        color: 'var(--accent-primary-hover)',
                        fontFamily: 'var(--font-mono)',
                      }}
                    >
                      {similarityPercent}% match
                    </div>
                  </div>

                  {/* Reasoning */}
                  <div
                    style={{
                      fontSize: '12px',
                      color: 'var(--text2)',
                      fontFamily: 'var(--font-ui)',
                      marginBottom: '12px',
                      lineHeight: 1.4,
                    }}
                  >
                    {result.reasoning}
                  </div>

                  {/* Win Rate and Settlement */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: '12px',
                      marginBottom: '12px',
                    }}
                  >
                    {winRateColor && result.winRate !== null ? (
                      <div
                        style={{
                          padding: '8px 12px',
                          background: winRateColor.bg,
                          border: `1px solid ${winRateColor.border}`,
                          borderRadius: '4px',
                          fontSize: '12px',
                          fontFamily: 'var(--font-mono)',
                        }}
                      >
                        <div
                          style={{
                            fontSize: '12px',
                            textTransform: 'uppercase',
                            color: winRateColor.text,
                            fontWeight: '600',
                            marginBottom: '2px',
                          }}
                        >
                          Win Rate
                        </div>
                        <div
                          style={{
                            fontSize: '14px',
                            fontWeight: '600',
                            color: winRateColor.text,
                          }}
                        >
                          {result.winRate.toFixed(1)}%
                        </div>
                        <div
                          style={{
                            fontSize: '12px',
                            color: winRateColor.text,
                            opacity: 0.8,
                          }}
                        >
                          {winRateColor.label}
                        </div>
                      </div>
                    ) : null}

                    {result.settlementMedian !== null ? (
                      <div
                        style={{
                          padding: '8px 12px',
                          background: 'rgba(59,130,246,0.08)',
                          border: '1px solid var(--link)',
                          borderRadius: '4px',
                          fontSize: '12px',
                          fontFamily: 'var(--font-mono)',
                        }}
                      >
                        <div
                          style={{
                            fontSize: '12px',
                            textTransform: 'uppercase',
                            color: 'var(--accent-primary-hover)',
                            fontWeight: '600',
                            marginBottom: '2px',
                          }}
                        >
                          Median Settlement
                        </div>
                        <div
                          style={{
                            fontSize: '14px',
                            fontWeight: '600',
                            color: 'var(--accent-primary-hover)',
                          }}
                        >
                          {formatSettlement(result.settlementMedian)}
                        </div>
                      </div>
                    ) : null}
                  </div>

                  {/* Case Count */}
                  {result.caseCount !== null && (
                    <div
                      style={{
                        fontSize: '12px',
                        color: 'var(--text2)',
                        fontFamily: 'var(--font-mono)',
                        marginBottom: '12px',
                      }}
                    >
                      Cases on file: {result.caseCount.toLocaleString()}
                    </div>
                  )}

                  {/* View Full Report Link */}
                  <Link
                    href={`/nos/${result.nosCode}`}
                    style={{
                      display: 'inline-block',
                      fontSize: '14px',
                      fontWeight: '600',
                      color: 'var(--link)',
                      textDecoration: 'none',
                      fontFamily: 'var(--font-ui)',
                      padding: '4px 0',
                      transition: 'color 200ms',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-primary-hover)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--link)')}
                  >
                    View full report →
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
