'use client';

import { useState, useEffect } from 'react';
import { Metadata } from 'next';
import { SITS, STATES } from '../../lib/data';

// Note: Metadata cannot be exported from client components
// This will need to be wrapped or metadata added via layout

interface QuickStatsResponse {
  winRate: number;
  won: number;
  settled: number;
  dismissed: number;
  caseType: string;
  district?: string;
  yearRange?: string;
}

export default function OddsPage() {
  const [selectedCaseType, setSelectedCaseType] = useState<string>('');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('');
  const [selectedYearRange, setSelectedYearRange] = useState<string>('all');
  const [results, setResults] = useState<QuickStatsResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Flatten case types from SITS for dropdown
  const caseTypeOptions = SITS.flatMap((category) =>
    category.opts.map((opt) => ({
      label: opt.label,
      value: opt.d,
      category: category.label,
    }))
  );

  // Federal districts grouped by state
  const districtsByState = STATES.filter((s) => s.id).map((state) => ({
    state: state.label,
    stateId: state.id,
  }));

  const handleSearch = async () => {
    if (!selectedCaseType) {
      setError('Please select a case type');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({
        caseType: selectedCaseType,
        yearRange: selectedYearRange,
      });

      if (selectedDistrict) {
        params.append('district', selectedDistrict);
      }

      const response = await fetch(`/api/quick-stats?${params.toString()}`);

      if (!response.ok) {
        throw new Error('Failed to fetch statistics');
      }

      const data = await response.json();
      setResults(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setResults(null);
    } finally {
      setLoading(false);
    }
  };

  const yearRangeOptions = [
    { id: 'all', label: 'All years' },
    { id: 'last5', label: 'Last 5 years' },
    { id: 'last10', label: 'Last 10 years' },
  ];

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-base)' }}>
      {/* Header */}
      <div
        className="border-b py-16 sm:py-24"
        style={{
          borderColor: 'var(--border-default)',
          background: 'linear-gradient(180deg, #FFFFFF 0%, var(--bg-base) 100%)',
        }}
      >
        <div className="max-w-4xl mx-auto px-6">

          <h1 className="text-4xl sm:text-5xl font-display font-extrabold mb-4" style={{ color: '#111111', letterSpacing: '-1.5px' }}>
            Check My Odds
          </h1>
          <p className="text-lg leading-relaxed max-w-2xl" style={{ color: '#6B7280' }}>
            See real outcomes for cases like yours — free, instant, and private.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Selection Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          {/* Case Type Dropdown */}
          <div>
            <label className="block text-sm font-semibold mb-3" style={{ color: '#111111' }}>
              Case Type
            </label>
            <select
              value={selectedCaseType}
              onChange={(e) => setSelectedCaseType(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border text-sm"
              style={{
                borderColor: 'var(--border-default)',
                background: '#FFFFFF',
                color: '#111111',
              }}
            >
              <option value="">Select a case type...</option>
              {caseTypeOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* District Dropdown */}
          <div>
            <label className="block text-sm font-semibold mb-3" style={{ color: '#111111' }}>
              Federal District
            </label>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border text-sm"
              style={{
                borderColor: 'var(--border-default)',
                background: '#FFFFFF',
                color: '#111111',
              }}
            >
              <option value="">All districts</option>
              {districtsByState.map((state) => (
                <optgroup key={state.stateId} label={state.state}>
                  <option value={state.stateId}>All in {state.state}</option>
                </optgroup>
              ))}
            </select>
          </div>

          {/* Year Range Dropdown */}
          <div>
            <label className="block text-sm font-semibold mb-3" style={{ color: '#111111' }}>
              Year Range
            </label>
            <select
              value={selectedYearRange}
              onChange={(e) => setSelectedYearRange(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border text-sm"
              style={{
                borderColor: 'var(--border-default)',
                background: '#FFFFFF',
                color: '#111111',
              }}
            >
              {yearRangeOptions.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Search Button */}
        <div className="mb-12 flex justify-center">
          <button type="button"
            onClick={handleSearch}
            disabled={loading || !selectedCaseType}
            className="px-8 py-4 rounded-lg text-base font-semibold transition-all"
            style={{
              background: selectedCaseType ? '#111111' : '#E5E7EB',
              color: selectedCaseType ? '#FFFFFF' : '#6B7280',
              cursor: selectedCaseType && !loading ? 'pointer' : 'default',
            }}
          >
            {loading ? 'Loading...' : 'Check My Odds'}
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div
            className="p-4 rounded-lg mb-8 text-sm"
            style={{
              background: 'rgba(220, 38, 38, 0.1)',
              color: '#DC2626',
              borderColor: '#DC2626',
              borderWidth: '1px',
            }}
          >
            {error}
          </div>
        )}

        {/* Results Section */}
        {results && (
          <div className="space-y-8 animate-fadeIn">
            {/* Win Rate Card */}
            <div
              className="p-8 rounded-xl border text-center"
              style={{
                borderColor: 'var(--border-default)',
                background: '#FFFFFF',
              }}
            >
              <p className="text-sm font-semibold mb-4" style={{ color: '#6B7280' }}>
                Win Rate (at Trial)
              </p>
              <div
                className="text-6xl sm:text-7xl font-display font-extrabold"
                style={{ color: '#111111', letterSpacing: '-2px' }}
              >
                {results.winRate}%
              </div>
              <p className="mt-4 text-sm" style={{ color: '#6B7280' }}>
                Based on {results.caseType} cases
              </p>
            </div>

            {/* Outcomes Bar Chart */}
            <div
              className="p-8 rounded-xl border"
              style={{
                borderColor: 'var(--border-default)',
                background: '#FFFFFF',
              }}
            >
              <p className="text-sm font-semibold mb-6" style={{ color: '#111111' }}>
                Case Outcomes Distribution
              </p>
              <div className="space-y-4">
                {[
                  { label: 'Won', value: results.won, color: '#10B981' },
                  { label: 'Settled', value: results.settled, color: '#F59E0B' },
                  { label: 'Dismissed', value: results.dismissed, color: '#EF4444' },
                ].map((outcome) => {
                  const total = results.won + results.settled + results.dismissed;
                  const percentage = ((outcome.value / total) * 100).toFixed(1);
                  return (
                    <div key={outcome.label}>
                      <div className="flex justify-between mb-2">
                        <span style={{ color: '#111111' }}>{outcome.label}</span>
                        <span style={{ color: outcome.color, fontWeight: '600' }}>
                          {percentage}%
                        </span>
                      </div>
                      <div
                        className="h-3 rounded-full overflow-hidden"
                        style={{ background: '#FFFFFF' }}
                      >
                        <div
                          className="h-full transition-all duration-500"
                          style={{
                            background: outcome.color,
                            width: `${percentage}%`,
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Narrative */}
            <div
              className="p-8 rounded-xl border"
              style={{
                borderColor: 'var(--border-default)',
                background: '#FFFFFF',
              }}
            >
              <p className="text-base leading-relaxed" style={{ color: '#6B7280' }}>
                In federal court, {results.caseType} cases go to trial with a {results.winRate}% win rate for plaintiffs.
                However, most cases settle before trial: {((results.settled / (results.won + results.settled + results.dismissed)) * 100).toFixed(0)}% of cases in this
                category settle. The remaining cases are dismissed. These figures represent historical aggregate data
                and do not predict the outcome of your specific case.
              </p>
              <p className="text-sm mt-4 font-semibold" style={{ color: '#6B7280' }}>
                Source: Federal Judicial Center Integrated Database (FJC IDB)
              </p>
            </div>

            {/* CTA */}
            <div className="text-center p-8 rounded-xl border" style={{ borderColor: 'var(--border-default)', background: '#FFFFFF' }}>
              <p className="text-sm mb-4" style={{ color: '#6B7280' }}>
                Want the full picture?
              </p>
              <a
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold transition-all"
                style={{ background: '#111111', color: '#FFFFFF' }}
              >
                Get your personalized report — $5.99
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </div>

            {/* Legal Disclaimer */}
            <div style={{
              background: 'var(--bg-base)',
              color: '#6B7280',
              padding: '40px 20px',
              fontSize: '14px',
              fontFamily: 'Outfit, system-ui, sans-serif',
              lineHeight: '1.6',
            }}>
              <div style={{ maxWidth: 1200, margin: '0 auto' }}>
                <p style={{ margin: '0 0 16px 0' }}>
                  <strong>Research Data Disclaimer:</strong> This page provides research information based on publicly available federal court outcome data. The statistics displayed represent historical aggregate data from the Federal Judicial Center Integrated Database and CourtListener and are not predictions of your case outcome. Case outcomes vary significantly based on specific facts, law applicable to your jurisdiction, quality of legal representation, and numerous other factors.
                </p>
                <p style={{ margin: 0 }}>
                  <strong>Not Legal Advice:</strong> This is not legal advice and does not create an attorney-client relationship. Always consult with a qualified attorney licensed in your jurisdiction for advice specific to your situation.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Trust Bar */}
        <div className="mt-16 pt-8 border-t" style={{ borderColor: 'var(--border-default)' }}>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { v: '5.1M+', l: 'Cases analyzed' },
              { v: '94', l: 'Federal districts' },
              { v: '84', l: 'Case types' },
              { v: '100% Free', l: 'No account needed' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="font-display font-extrabold text-lg" style={{ color: '#111111' }}>
                  {stat.v}
                </div>
                <div className="text-xs mt-1" style={{ color: '#6B7280' }}>
                  {stat.l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
