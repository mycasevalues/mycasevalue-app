'use client';

import { useState, useEffect } from 'react';
import { Metadata } from 'next';
import { SITS, STATES } from '../../lib/data';

// Note: Metadata cannot be exported from client components
// For this page to have SEO metadata, wrap it with server-side metadata in layout.tsx or create a separate server component.
// Metadata content for this page:
// title: "Predict Your Case Outcome — Real Win Rates | MyCaseValue"
// description: "Check your case odds with real federal court data. See win rates, settlement statistics, and case outcome distributions for your case type and district."

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
    <div className="min-h-screen" style={{ background: '#F5F6F7' }}>
      <style>{`
        .ln-select {
          height: 48px;
          border: 1px solid #D5D8DC;
          border-radius: 4px;
          padding: 0 16px;
          font-family: var(--font-body);
          color: #212529;
          background: #FFFFFF;
        }
        .ln-select:focus {
          outline: none;
          border-color: #006997;
        }
        .ln-select:hover:not(:disabled) {
          border-color: #006997;
        }
        .ln-button-primary {
          background: #E8171F;
          color: #FFFFFF;
          border: none;
          border-radius: 4px;
          padding: 16px 32px;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          cursor: pointer;
          transition: background 200ms ease;
        }
        .ln-button-primary:hover:not(:disabled) {
          background: #C41219;
        }
        .ln-button-primary:disabled {
          background: #BDBFC5;
          cursor: default;
        }
        .ln-card {
          background: #FFFFFF;
          border: 1px solid #D5D8DC;
          border-radius: 4px;
          font-family: var(--font-body);
        }
        .ln-link {
          color: #006997;
          text-decoration: none;
        }
        .ln-link:hover {
          text-decoration: underline;
        }
      `}</style>

      {/* Header */}
      <div
        style={{
          background: '#00172E',
          borderBottom: '1px solid #D5D8DC',
          padding: '48px 24px',
        }}
      >
        <div style={{ maxWidth: '1024px', margin: '0 auto' }}>
          {/* Breadcrumb */}
          <nav style={{ fontSize: '14px', color: '#FFFFFF', marginBottom: '16px', opacity: 0.85, fontFamily: 'var(--font-body)' }}>
            <a href="/" style={{ color: '#FFFFFF', textDecoration: 'none' }}>Home</a>
            <span> / </span>
            <span>Check My Odds</span>
          </nav>

          <div style={{ marginBottom: '16px' }}>
            <span
              style={{
                display: 'inline-block',
                background: '#E8171F',
                color: '#FFFFFF',
                padding: '6px 12px',
                borderRadius: '4px',
                fontSize: '11px',
                fontWeight: '600',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                fontFamily: 'var(--font-display)',
              }}
            >
              Check My Odds
            </span>
          </div>
          <h1
            style={{
              color: '#FFFFFF',
              fontSize: '36px',
              fontWeight: '700',
              letterSpacing: '-1.5px',
              margin: '0 0 12px 0',
              fontFamily: 'var(--font-display)',
            }}
          >
            Predict Your Case Outcome
          </h1>
          <p
            style={{
              color: '#FFFFFF',
              fontSize: '16px',
              lineHeight: '1.6',
              margin: 0,
              maxWidth: '600px',
              fontFamily: 'var(--font-body)',
            }}
          >
            See real outcomes for cases like yours — free, instant, and private.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: '1024px', margin: '0 auto', padding: '48px 24px' }}>
        {/* Selection Section */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px',
            marginBottom: '32px',
          }}
        >
          {/* Case Type Dropdown */}
          <div>
            <label
              className="font-display"
              style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '600',
                marginBottom: '12px',
                color: '#212529',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
              }}
            >
              Case Type
            </label>
            <select
              value={selectedCaseType}
              onChange={(e) => setSelectedCaseType(e.target.value)}
              className="ln-select w-full"
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
            <label
              className="font-display"
              style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '600',
                marginBottom: '12px',
                color: '#212529',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
              }}
            >
              Federal District
            </label>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="ln-select w-full"
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
            <label
              className="font-display"
              style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '600',
                marginBottom: '12px',
                color: '#212529',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
              }}
            >
              Year Range
            </label>
            <select
              value={selectedYearRange}
              onChange={(e) => setSelectedYearRange(e.target.value)}
              className="ln-select w-full"
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
        <div style={{ marginBottom: '32px', textAlign: 'center' }}>
          <button
            type="button"
            onClick={handleSearch}
            disabled={loading || !selectedCaseType}
            className="ln-button-primary"
          >
            {loading ? 'Loading...' : 'Check My Odds'}
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div
            className="ln-card"
            style={{
              marginBottom: '24px',
              padding: '16px',
              borderColor: '#EF4444',
              background: '#FEF2F2',
            }}
          >
            <p style={{ color: '#991B1B', fontSize: '14px', margin: 0 }}>
              {error}
            </p>
          </div>
        )}

        {/* Results Section */}
        {results && (
          <div style={{ display: 'grid', gap: '32px' }}>
            {/* Win Rate Card */}
            <div className="ln-card" style={{ padding: '40px', textAlign: 'center', borderRadius: '4px' }}>
              <p
                style={{
                  fontSize: '12px',
                  fontWeight: '600',
                  color: '#455A64',
                  margin: '0 0 16px 0',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  fontFamily: 'var(--font-body)',
                }}
              >
                Win Rate (at Trial)
              </p>
              <div
                style={{
                  fontSize: '72px',
                  fontWeight: '700',
                  color: '#E8171F',
                  letterSpacing: '-2px',
                  margin: '0 0 12px 0',
                  fontFamily: 'var(--font-display)',
                }}
              >
                {results.winRate}%
              </div>
              <p style={{ color: '#455A64', fontSize: '14px', margin: 0, fontFamily: 'var(--font-body)' }}>
                Based on {results.caseType} cases
              </p>
            </div>

            {/* Outcomes Bar Chart */}
            <div className="ln-card" style={{ padding: '40px', borderRadius: '4px' }}>
              <p
                style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#212529',
                  margin: '0 0 24px 0',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  fontFamily: 'var(--font-display)',
                }}
              >
                Case Outcomes Distribution
              </p>
              <div style={{ display: 'grid', gap: '24px' }}>
                {[
                  { label: 'Won', value: results.won, color: '#10B981' },
                  { label: 'Settled', value: results.settled, color: '#F59E0B' },
                  { label: 'Dismissed', value: results.dismissed, color: '#EF4444' },
                ].map((outcome) => {
                  const total = results.won + results.settled + results.dismissed;
                  const percentage = ((outcome.value / total) * 100).toFixed(1);
                  return (
                    <div key={outcome.label}>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          marginBottom: '8px',
                        }}
                      >
                        <span style={{ color: '#212529', fontSize: '14px', fontWeight: '500', fontFamily: 'var(--font-body)' }}>
                          {outcome.label}
                        </span>
                        <span
                          style={{
                            color: outcome.color,
                            fontWeight: '600',
                            fontSize: '14px',
                            fontFamily: 'var(--font-display)',
                          }}
                        >
                          {percentage}%
                        </span>
                      </div>
                      <div
                        style={{
                          height: '12px',
                          borderRadius: '4px',
                          background: '#F5F6F7',
                          overflow: 'hidden',
                        }}
                      >
                        <div
                          style={{
                            height: '100%',
                            background: outcome.color,
                            width: `${percentage}%`,
                            transition: 'width 500ms ease',
                            borderRadius: '4px',
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Narrative */}
            <div className="ln-card" style={{ padding: '40px', borderRadius: '4px' }}>
              <p
                style={{
                  color: '#455A64',
                  fontSize: '16px',
                  lineHeight: '1.6',
                  margin: '0 0 16px 0',
                  fontFamily: 'var(--font-body)',
                }}
              >
                In federal court, {results.caseType} cases go to trial with a {results.winRate}% win rate for plaintiffs.
                However, most cases settle before trial: {((results.settled / (results.won + results.settled + results.dismissed)) * 100).toFixed(0)}% of cases in this
                category settle. The remaining cases are dismissed. These figures represent historical aggregate data
                and do not predict the outcome of your specific case.
              </p>
              <p
                style={{
                  color: '#455A64',
                  fontSize: '12px',
                  fontWeight: '600',
                  margin: 0,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  fontFamily: 'var(--font-body)',
                }}
              >
                Source: Federal Judicial Center Integrated Database (FJC IDB)
              </p>
            </div>

            {/* CTA */}
            <div className="ln-card" style={{ padding: '40px', textAlign: 'center', borderRadius: '4px' }}>
              <p
                style={{
                  fontSize: '14px',
                  color: '#455A64',
                  margin: '0 0 16px 0',
                  fontFamily: 'var(--font-body)',
                }}
              >
                Want the full picture?
              </p>
              <a
                href="/"
                className="ln-button-primary"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  textDecoration: 'none',
                  fontFamily: 'var(--font-body)',
                }}
              >
                Get your personalized report
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </div>

            {/* Legal Disclaimer */}
            <div
              style={{
                background: '#F5F6F7',
                color: '#455A64',
                padding: '40px 24px',
                borderRadius: '4px',
                fontSize: '14px',
                lineHeight: '1.6',
                fontFamily: 'var(--font-body)',
              }}
            >
              <div>
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
        <div
          style={{
            marginTop: '64px',
            paddingTop: '32px',
            borderTop: '1px solid #D5D8DC',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
              gap: '24px',
              textAlign: 'center',
            }}
          >
            {[
              { v: '5.1M+', l: 'Cases analyzed' },
              { v: '94', l: 'Federal districts' },
              { v: '84', l: 'Case types' },
              { v: '100% Free', l: 'No account needed' },
            ].map((stat, i) => (
              <div key={i}>
                <div
                  style={{
                    fontSize: '20px',
                    fontWeight: '700',
                    color: '#212529',
                    fontFamily: 'var(--font-display)',
                  }}
                >
                  {stat.v}
                </div>
                <div
                  style={{
                    fontSize: '12px',
                    marginTop: '8px',
                    color: '#455A64',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    fontFamily: 'var(--font-body)',
                  }}
                >
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
