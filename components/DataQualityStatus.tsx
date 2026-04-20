'use client';

import { useState, useEffect } from 'react';
import { type QualityCheckResult } from '../lib/data-quality';

/**
 * DataQualityStatus — Display most recent quality check result.
 * Shows pass/fail badge, anomaly count, and list of issues.
 * Includes "Run Check" button to trigger API.
 *
 * Client component that fetches from /api/admin/data-quality
 */

interface DataQualityStatusProps {
  adminToken?: string;
  onError?: (error: string) => void;
}

export default function DataQualityStatus({ adminToken, onError }: DataQualityStatusProps) {
  const [result, setResult] = useState<QualityCheckResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load last check from localStorage on mount
  useEffect(() => {
    const cached = localStorage.getItem('data-quality-result');
    if (cached) {
      try {
        setResult(JSON.parse(cached));
      } catch {
        // Ignore parsing errors
      }
    }
  }, []);

  const runCheck = async () => {
    setLoading(true);
    setError(null);

    try {
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      };

      if (adminToken) {
        headers.Authorization = `Bearer ${adminToken}`;
      } else if (process.env.NODE_ENV !== 'production') {
        // Dev mode: use test header
        headers['x-admin-key'] = 'dev-local-testing';
      }

      const response = await fetch('/api/admin/data-quality', {
        method: 'GET',
        headers,
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = (await response.json()) as QualityCheckResult;
      setResult(data);
      localStorage.setItem('data-quality-result', JSON.stringify(data));
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      if (onError) onError(message);
    } finally {
      setLoading(false);
    }
  };

  if (!result && !error && !loading) {
    return (
      <div className="rounded-card bg-surface-1 border border-border-light p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-text-color-primary" style={{ fontSize: 14, fontWeight: 600 }}>Data Quality Status</h3>
          <button
 onClick={runCheck}
 disabled={loading}
 className="px-3 py-1 bg-[var(--gold,#C4882A)] text-white rounded hover:bg-[var(--gold-hover,#A87222)] disabled:opacity-50" style={{ fontSize: 12, fontWeight: 500 }}
 >
            Run Check
          </button>
        </div>
        <p className="text-text-color-secondary mt-2" style={{ fontSize: 12 }}>No check results yet</p>
      </div>
    );
  }

  return (
    <div className="rounded-card bg-surface-1 border border-border-light p-4">
      {/* Header with pass/fail badge */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-text-color-primary" style={{ fontSize: 14, fontWeight: 600 }}>Data Quality Status</h3>
        <button
 onClick={runCheck}
 disabled={loading}
 className="px-3 py-1 bg-brand-blue text-white rounded hover:bg-brand-blue-dark disabled:opacity-50 transition-colors" style={{ fontSize: 12, fontWeight: 500 }}
 >
          {loading ? 'Checking...' : 'Run Check'}
        </button>
      </div>

      {/* Error state */}
      {error && (
        <div className="bg-data-bg-neg border border-data-negative rounded-card-sm p-3 mb-3">
          <p className="text-data-negative" style={{ fontSize: 12, fontWeight: 500 }}>Error: {error}</p>
        </div>
      )}

      {/* Result summary */}
      {result && (
        <>
          {/* Pass/fail badge and timestamp */}
          <div className="flex items-center gap-2 mb-3">
            <div
              className={`inline-flex items-center gap-1 px-2 py-1 rounded   transition-colors ${
                result.passed
                  ? 'bg-data-bg-pos text-data-positive border border-data-positive'
                  : 'bg-data-bg-neg text-data-negative border border-data-negative'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${result.passed ? 'bg-data-positive' : 'bg-data-negative'}`} />
              {result.passed ? 'PASSED' : 'FAILED'}
            </div>
            <span className="text-text-color-secondary" style={{ fontSize: 12 }}>
              {new Date(result.timestamp).toLocaleTimeString()}
            </span>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-2 mb-3" style={{ fontSize: 12 }}>
            <div className="bg-surface-0 rounded-card-sm p-2 border border-border-light">
              <div className="text-text-color-muted" style={{ fontWeight: 500 }}>Checks</div>
              <div className="text-text-color-primary" style={{ fontSize: 14, fontWeight: 600 }}>{result.totalChecks}</div>
            </div>
            <div className="bg-surface-0 rounded-card-sm p-2 border border-border-light">
              <div className="text-text-color-muted" style={{ fontWeight: 500 }}>Issues</div>
              <div className={`  ${result.anomalies.length > 0 ? 'text-data-negative' : 'text-data-positive'}`}>
                {result.anomalies.length}
              </div>
            </div>
            <div className="bg-surface-0 rounded-card-sm p-2 border border-border-light">
              <div className="text-text-color-muted" style={{ fontWeight: 500 }}>Critical</div>
              <div className={`  ${result.anomalies.filter((a) => a.severity === 'critical').length > 0 ? 'text-data-negative' : 'text-data-positive'}`}>
                {result.anomalies.filter((a) => a.severity === 'critical').length}
              </div>
            </div>
          </div>

          {/* Anomalies list */}
          {result.anomalies.length > 0 && (
            <div className="border-t border-border-light pt-3">
              <h4 className="text-text-color-primary mb-2" style={{ fontSize: 12, fontWeight: 600 }}>Anomalies</h4>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {result.anomalies.map((anomaly, idx) => (
                  <div
                    key={idx}
                    className={`rounded-card-sm p-2 border ${
                      anomaly.severity === 'critical'
                        ? 'bg-data-bg-neg border-data-negative'
                        : 'bg-data-bg-neu border-data-neutral'
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      <span
                        className={`  px-1.5 py-0.5 rounded ${
                          anomaly.severity === 'critical'
                            ? 'bg-data-negative text-white'
                            : 'bg-data-neutral text-white'
                        }`}
                      >
                        {anomaly.severity === 'critical' ? 'CRITICAL' : 'WARNING'}
                      </span>
                      <div className="flex-1">
                        {anomaly.nosCode && (
                          <div className="font-mono text-text-color-secondary mb-0.5" style={{ fontSize: 12 }}>
                            NOS {anomaly.nosCode}
                          </div>
                        )}
                        <p className="text-text-color-primary leading-tight" style={{ fontSize: 12 }}>
                          {anomaly.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
