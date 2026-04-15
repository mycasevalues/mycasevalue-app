'use client';

/**
 * JudgeSearchResults — displays judge cards for search query matches
 * Fetches judges from /api/judges and renders them in a consistent card format
 */

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getWinRateColor } from '@/lib/color-scale';

interface Judge {
  id: string;
  full_name: string;
  district_id?: string;
  overall_plaintiff_win_rate?: number;
  total_cases_handled?: number;
}

interface JudgeSearchResultsProps {
  query: string;
}

export default function JudgeSearchResults({ query }: JudgeSearchResultsProps) {
  const [judges, setJudges] = useState<Judge[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!query || query.length < 2) {
      setJudges([]);
      setError('');
      return;
    }

    const fetchJudges = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await fetch(`/api/judges?q=${encodeURIComponent(query)}`);
        if (!response.ok) {
          throw new Error('Failed to fetch judges');
        }
        const data = await response.json();
        setJudges(data.judges || []);
      } catch (err) {
        console.error('Judge search error:', err);
        setError('');
        setJudges([]);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(fetchJudges, 300);
    return () => clearTimeout(debounceTimer);
  }, [query]);

  if (!query || query.length < 2) {
    return null;
  }

  if (loading) {
    return (
      <div style={{ marginTop: '32px', marginBottom: '32px' }}>
        <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginBottom: '12px', fontWeight: '500', fontFamily: 'var(--font-body)' }}>
          Judges
        </p>
        <div style={{ display: 'grid', gap: '12px' }}>
          {[1, 2].map((i) => (
            <div
              key={i}
              style={{
                padding: '16px',
                background: 'var(--color-surface-0)',
                border: '1px solid var(--border-default)',
                borderRadius: '12px',
                animation: 'shimmer 2s infinite',
              }}
            >
              <div
                style={{
                  height: '20px',
                  width: '60%',
                  background: '#E8EAED',
                  borderRadius: '4px',
                  marginBottom: '8px',
                }}
              />
              <div
                style={{
                  height: '14px',
                  width: '40%',
                  background: '#E8EAED',
                  borderRadius: '4px',
                }}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (judges.length === 0) {
    return null;
  }

  return (
    <div style={{ marginTop: '32px', marginBottom: '32px' }}>
      <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginBottom: '12px', fontWeight: '500', fontFamily: 'var(--font-body)' }}>
        Judges <span style={{ color: 'var(--color-text-muted)' }}>({judges.length})</span>
      </p>
      <div style={{ display: 'grid', gap: '12px' }}>
        {judges.map((judge) => {
          const winRateColor = getWinRateColor(judge.overall_plaintiff_win_rate || 0);
          return (
            <Link
              key={judge.id}
              href={`/judges/${judge.id}`}
              style={{
                display: 'block',
                padding: '16px',
                background: 'var(--color-surface-0)',
                border: '1px solid var(--border-default)',
                borderRadius: '12px',
                textDecoration: 'none',
                transition: 'all 150ms ease-out',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.1)';
                e.currentTarget.style.borderColor = 'var(--accent-primary)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.05)';
                e.currentTarget.style.borderColor = 'var(--border-default)';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontSize: '15px', fontWeight: '600', color: 'var(--color-text-primary)', margin: '0 0 4px 0', fontFamily: 'var(--font-display)' }}>
                    {judge.full_name}
                  </h4>
                  {judge.district_id && (
                    <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', margin: '0 0 8px 0', fontFamily: 'var(--font-body)' }}>
                      {judge.district_id}
                    </p>
                  )}
                  <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
                    {judge.overall_plaintiff_win_rate != null && (
                      <div
                        style={{
                          padding: '6px 12px',
                          background: winRateColor.bg,
                          border: `1px solid ${winRateColor.border}`,
                          borderRadius: '6px',
                          fontSize: '13px',
                          fontWeight: '600',
                          color: winRateColor.text,
                          fontFamily: 'var(--font-mono)',
                        }}
                      >
                        {(judge.overall_plaintiff_win_rate).toFixed(0)}% win rate
                      </div>
                    )}
                    {judge.total_cases_handled != null && (
                      <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', fontFamily: 'var(--font-mono)' }}>
                        {judge.total_cases_handled.toLocaleString()} cases
                      </div>
                    )}
                  </div>
                </div>
                <div
                  style={{
                    padding: '6px 12px',
                    background: '#F0F6FB',
                    border: '1px solid var(--accent-primary)',
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontWeight: '600',
                    color: 'var(--accent-primary)',
                    fontFamily: 'var(--font-body)',
                    whiteSpace: 'nowrap',
                    flexShrink: 0,
                  }}
                >
                  View Profile
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
