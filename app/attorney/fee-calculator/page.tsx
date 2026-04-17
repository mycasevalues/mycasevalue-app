'use client';

import { useState } from 'react';
import Link from 'next/link';
import { SITS } from '../../../lib/data';
import { REAL_DATA } from '../../../lib/realdata';

type FeeComparison = {
  contingency25: number;
  contingency33: number;
  contingency40: number;
  contingencyNetToClient: {
    low: number;
    mid: number;
    high: number;
  };
  hourly: {
    lowRate: number;
    highRate: number;
    estimatedHours: number;
    totalLow: number;
    totalHigh: number;
  };
  hybrid: {
    retainer: number;
    hourlyRate: number;
    estimatedTotal: number;
  };
  lodestar?: {
    totalHours: number;
    hourlyRate: number;
    baseAmount: number;
    multiplier: number;
    adjustedTotal: number;
  };
  averageFeeAward?: number;
};

export default function FeeCalculatorPage() {
  const [caseType, setCaseType] = useState('');
  const [caseValue, setCaseValue] = useState('');
  const [feeArrangement, setFeeArrangement] = useState('contingency');
  const [showComparison, setShowComparison] = useState(false);
  const [feeData, setFeeData] = useState<FeeComparison | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const allCaseTypes = SITS.flatMap(cat =>
    cat.opts.map(opt => ({
      label: opt.label,
      nos: opt.nos,
      category: cat.label,
    }))
  ).sort((a, b) => a.label.localeCompare(b.label));

  const handleCalculate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!caseType || !caseValue) {
      setError('Please fill in all required fields');
      return;
    }

    const value = parseInt(caseValue);
    if (isNaN(value) || value <= 0) {
      setError('Case value must be a positive number');
      return;
    }

    setLoading(true);
    setError('');
    setFeeData(null);

    try {
      const response = await fetch('/api/attorney/fee-calculator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          caseType,
          caseValue: value,
          feeArrangement,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Failed to calculate fees');
        return;
      }

      setFeeData(data);
      setShowComparison(true);
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '13px',
    fontWeight: 600,
    color: 'var(--color-text-primary)',
    marginBottom: '6px',
    fontFamily: 'var(--font-body)',
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px 14px',
    height: 'auto',
    border: '1px solid var(--border-default)',
    borderRadius: '4px',
    fontSize: '14px',
    color: 'var(--color-text-primary)',
    backgroundColor: 'var(--color-surface-0)',
    fontFamily: 'var(--font-body)',
    transition: 'border-color 0.2s',
    outline: 'none',
    boxSizing: 'border-box' as const,
  };

  const cardStyle: React.CSSProperties = {
    background: 'var(--color-surface-0)',
    borderRadius: '4px',
    padding: '24px',
    border: '1px solid var(--border-default)',
    boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
  };

  return (
    <div style={{ background: 'var(--color-surface-1)', minHeight: '100vh', fontFamily: 'var(--font-body)' }}>
      {/* Header */}
      <div style={{
        background: 'var(--card, #FFFFFF)',
        color: 'var(--card, #FFFFFF)',
        padding: '40px 24px 32px',
        position: 'relative',
        overflow: 'hidden',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}>
        <div aria-hidden style={{
          position: 'absolute', inset: 0, opacity: 0.03, pointerEvents: 'none',
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />
        <div style={{ maxWidth: '1080px', margin: '0 auto', position: 'relative' }}>
          <h1 style={{ fontSize: '26px', fontWeight: 600, color: 'var(--color-text-inverse)', fontFamily: 'var(--font-ui)', margin: '0 0 8px 0', letterSpacing: '-0.02em' }}>
            Attorney Fee Calculator
          </h1>
          <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.7)', marginBottom: 0, lineHeight: 1.6, fontFamily: 'var(--font-body)' }}>
            Calculate attorney fee structures and compare contingency, hourly, and hybrid arrangements based on your case value.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: '1080px', margin: '0 auto', padding: '40px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: feeData ? '1fr 1fr' : '1fr', gap: '24px' }}>
          {/* Input Form */}
          <div style={{ ...cardStyle, boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-text-primary)', margin: '0 0 24px', fontFamily: 'var(--font-ui)' }}>
              Case Details
            </h2>

            <form onSubmit={handleCalculate} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Case Type */}
              <div>
                <label style={labelStyle}>Case Type *</label>
                <select
                  value={caseType}
                  onChange={(e) => {
                    setCaseType(e.target.value);
                    setError('');
                  }}
                  style={inputStyle}
                >
                  <option value="">Select case type...</option>
                  {allCaseTypes.map((ct) => (
                    <option key={ct.nos} value={ct.nos}>
                      {ct.label} ({ct.category})
                    </option>
                  ))}
                </select>
              </div>

              {/* Case Value */}
              <div>
                <label style={labelStyle}>Estimated Case Value ($) *</label>
                <input
                  type="number"
                  placeholder="e.g., 100000"
                  min="0"
                  value={caseValue}
                  onChange={(e) => {
                    setCaseValue(e.target.value);
                    setError('');
                  }}
                  style={inputStyle}
                />
                <p style={{ fontSize: '11px', color: 'var(--color-text-secondary)', margin: '4px 0 0', fontFamily: 'var(--font-body)' }}>
                  Settlement value, judgment, or case evaluation
                </p>
              </div>

              {/* Fee Arrangement Type */}
              <div>
                <label style={labelStyle}>Primary Fee Arrangement *</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {[
                    { val: 'contingency', label: 'Contingency Fee (25-40%)', desc: 'Risk-sharing' },
                    { val: 'hourly', label: 'Hourly Rate ($200-800/hr)', desc: 'Time-based' },
                    { val: 'hybrid', label: 'Hybrid (Retainer + Hourly)', desc: 'Mixed' },
                  ].map((opt) => (
                    <button
                      key={opt.val}
                      type="button"
                      onClick={() => {
                        setFeeArrangement(opt.val);
                        setError('');
                        setShowComparison(false);
                      }}
                      style={{
                        padding: '12px 14px',
                        borderRadius: '4px',
                        border: `1px solid ${feeArrangement === opt.val ? 'var(--accent-primary)' : 'var(--border-default)'}`,
                        backgroundColor: feeArrangement === opt.val ? 'rgba(10, 102, 194, 0.08)' : 'var(--color-surface-1)',
                        color: feeArrangement === opt.val ? 'var(--accent-primary)' : 'var(--color-text-secondary)',
                        fontSize: '13px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        fontFamily: 'var(--font-body)',
                        textAlign: 'left',
                      }}
                    >
                      <div style={{ fontWeight: 600, color: feeArrangement === opt.val ? 'var(--accent-primary)' : 'var(--color-text-primary)' }}>
                        {opt.label}
                      </div>
                      <div style={{ fontSize: '11px', fontWeight: 400, marginTop: '2px' }}>
                        {opt.desc}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Info Box */}
              <div style={{ background: 'rgba(59,130,246,0.06)', padding: '16px', borderRadius: '4px', border: '1px solid var(--link-light, #BAE6FD)' }}>
                <p style={{ fontSize: '12px', color: '#38bdf8', margin: 0, lineHeight: 1.5, fontFamily: 'var(--font-body)' }}>
                  This calculator shows estimated fees for different arrangements. Actual fees depend on jurisdictional rules, attorney experience, and case complexity.
                </p>
              </div>

              {/* Error */}
              {error && (
                <div style={{ padding: '12px 14px', borderRadius: '4px', backgroundColor: 'rgba(204,16,25,0.08)', border: '1px solid var(--border-default)' }}>
                  <p style={{ fontSize: '13px', color: 'var(--accent-primary)', margin: 0, fontFamily: 'var(--font-body)' }}>{error}</p>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading || !caseType || !caseValue}
                style={{
                  width: '100%',
                  padding: '16px',
                  backgroundColor: loading || !caseType || !caseValue ? 'var(--border-default)' : 'var(--accent-primary)',
                  color: 'var(--color-text-inverse)',
                  border: 'none',
                  borderRadius: '4px',
                  fontSize: '15px',
                  fontWeight: 600,
                  fontFamily: 'var(--font-ui)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                  cursor: loading || !caseType || !caseValue ? 'not-allowed' : 'pointer',
                  transition: 'background-color 0.2s',
                }}
              >
                {loading ? 'Calculating...' : 'Calculate Fees'}
              </button>

              <Link href="/attorney" style={{ textDecoration: 'none' }}>
                <button
                  type="button"
                  style={{
                    width: '100%',
                    padding: '12px',
                    backgroundColor: 'var(--color-surface-0)',
                    color: 'var(--accent-primary)',
                    border: '1px solid var(--accent-primary)',
                    borderRadius: '4px',
                    fontSize: '13px',
                    fontWeight: 600,
                    fontFamily: 'var(--font-body)',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(10, 102, 194, 0.08)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--color-surface-0)';
                  }}
                >
                  Back to Tools
                </button>
              </Link>
            </form>
          </div>

          {/* Results */}
          {feeData && showComparison && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Contingency Analysis */}
              {feeArrangement === 'contingency' && (
                <div style={cardStyle}>
                  <h3 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--color-text-primary)', margin: '0 0 16px', fontFamily: 'var(--font-ui)' }}>
                    Contingency Fee Tiers
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{ padding: '12px', background: 'rgba(59,130,246,0.06)', borderRadius: '4px', border: '1px solid var(--link-light, #BAE6FD)' }}>
                      <div style={{ fontSize: '12px', color: '#38bdf8', fontWeight: 600, marginBottom: '4px' }}>
                        25% Contingency
                      </div>
                      <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--accent-primary)', fontFamily: 'var(--font-mono)' }}>
                        ${feeData.contingency25.toLocaleString()}
                      </div>
                    </div>
                    <div style={{ padding: '12px', background: 'rgba(59,130,246,0.06)', borderRadius: '4px', border: '1px solid var(--link-light, #BAE6FD)' }}>
                      <div style={{ fontSize: '12px', color: '#38bdf8', fontWeight: 600, marginBottom: '4px' }}>
                        33% Contingency (Typical)
                      </div>
                      <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--accent-primary)', fontFamily: 'var(--font-mono)' }}>
                        ${feeData.contingency33.toLocaleString()}
                      </div>
                    </div>
                    <div style={{ padding: '12px', background: 'rgba(59,130,246,0.06)', borderRadius: '4px', border: '1px solid var(--link-light, #BAE6FD)' }}>
                      <div style={{ fontSize: '12px', color: '#38bdf8', fontWeight: 600, marginBottom: '4px' }}>
                        40% Contingency (Higher Risk)
                      </div>
                      <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--accent-primary)', fontFamily: 'var(--font-mono)' }}>
                        ${feeData.contingency40.toLocaleString()}
                      </div>
                    </div>
                  </div>

                  {/* Net to Client */}
                  <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--border-default)' }}>
                    <h4 style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-text-primary)', margin: '0 0 12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      Net to Client (33% arrangement)
                    </h4>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
                      <div style={{ textAlign: 'center', padding: '8px', background: 'var(--color-surface-1)', borderRadius: '4px' }}>
                        <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>Low Range</div>
                        <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                          ${feeData.contingencyNetToClient.low.toLocaleString()}
                        </div>
                      </div>
                      <div style={{ textAlign: 'center', padding: '8px', background: 'var(--color-surface-1)', borderRadius: '4px' }}>
                        <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>Median</div>
                        <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                          ${feeData.contingencyNetToClient.mid.toLocaleString()}
                        </div>
                      </div>
                      <div style={{ textAlign: 'center', padding: '8px', background: 'var(--color-surface-1)', borderRadius: '4px' }}>
                        <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>High Range</div>
                        <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                          ${feeData.contingencyNetToClient.high.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Hourly Analysis */}
              {feeArrangement === 'hourly' && (
                <div style={cardStyle}>
                  <h3 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--color-text-primary)', margin: '0 0 16px', fontFamily: 'var(--font-ui)' }}>
                    Hourly Fee Estimate
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{ padding: '12px', background: 'rgba(59,130,246,0.06)', borderRadius: '4px', border: '1px solid var(--link-light, #BAE6FD)' }}>
                      <div style={{ fontSize: '12px', color: '#38bdf8', fontWeight: 600, marginBottom: '4px' }}>
                        Estimated Hours (Case Phases)
                      </div>
                      <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--accent-primary)', fontFamily: 'var(--font-mono)' }}>
                        {feeData.hourly.estimatedHours} hours
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                      <div style={{ padding: '12px', background: 'rgba(59,130,246,0.06)', borderRadius: '4px', border: '1px solid var(--link-light, #BAE6FD)' }}>
                        <div style={{ fontSize: '11px', color: '#38bdf8', fontWeight: 600 }}>Junior Attorney</div>
                        <div style={{ fontSize: '13px', color: '#38bdf8', marginTop: '4px' }}>
                          ${feeData.hourly.lowRate}/hr
                        </div>
                        <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--accent-primary)', marginTop: '6px' }}>
                          ${feeData.hourly.totalLow.toLocaleString()}
                        </div>
                      </div>
                      <div style={{ padding: '12px', background: 'rgba(59,130,246,0.06)', borderRadius: '4px', border: '1px solid var(--link-light, #BAE6FD)' }}>
                        <div style={{ fontSize: '11px', color: '#38bdf8', fontWeight: 600 }}>Senior Attorney</div>
                        <div style={{ fontSize: '13px', color: '#38bdf8', marginTop: '4px' }}>
                          ${feeData.hourly.highRate}/hr
                        </div>
                        <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--accent-primary)', marginTop: '6px' }}>
                          ${feeData.hourly.totalHigh.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Hybrid Analysis */}
              {feeArrangement === 'hybrid' && (
                <div style={cardStyle}>
                  <h3 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--color-text-primary)', margin: '0 0 16px', fontFamily: 'var(--font-ui)' }}>
                    Hybrid Arrangement
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{ padding: '12px', background: 'rgba(59,130,246,0.06)', borderRadius: '4px', border: '1px solid var(--link-light, #BAE6FD)' }}>
                      <div style={{ fontSize: '12px', color: '#38bdf8', fontWeight: 600, marginBottom: '4px' }}>
                        Upfront Retainer
                      </div>
                      <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--accent-primary)', fontFamily: 'var(--font-mono)' }}>
                        ${feeData.hybrid.retainer.toLocaleString()}
                      </div>
                    </div>
                    <div style={{ padding: '12px', background: 'rgba(59,130,246,0.06)', borderRadius: '4px', border: '1px solid var(--link-light, #BAE6FD)' }}>
                      <div style={{ fontSize: '12px', color: '#38bdf8', fontWeight: 600, marginBottom: '4px' }}>
                        Ongoing Hourly Rate
                      </div>
                      <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--accent-primary)', fontFamily: 'var(--font-mono)' }}>
                        ${feeData.hybrid.hourlyRate}/hr
                      </div>
                    </div>
                    <div style={{ padding: '12px', background: 'rgba(234,179,8,0.1)', borderRadius: '4px', border: '1px solid var(--wrn-bg, #FCD34D)' }}>
                      <div style={{ fontSize: '12px', color: 'var(--wrn-txt, #7A5800)', fontWeight: 600, marginBottom: '4px' }}>
                        Estimated Total (Case Completion)
                      </div>
                      <div style={{ fontSize: '18px', fontWeight: 700, color: '#B86E00', fontFamily: 'var(--font-mono)' }}>
                        ${feeData.hybrid.estimatedTotal.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Lodestar (if applicable) */}
              {feeData.lodestar && (
                <div style={{ ...cardStyle, borderColor: 'rgba(245,158,11,0.3)' }}>
                  <h3 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--color-text-primary)', margin: '0 0 16px', fontFamily: 'var(--font-ui)' }}>
                    Lodestar Calculation (Fee-Shifting)
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid var(--border-default)' }}>
                      <span>Total Billable Hours:</span>
                      <span style={{ fontWeight: 600 }}>{feeData.lodestar.totalHours} hrs</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid var(--border-default)' }}>
                      <span>Hourly Rate:</span>
                      <span style={{ fontWeight: 600 }}>${feeData.lodestar.hourlyRate}/hr</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid var(--border-default)' }}>
                      <span>Lodestar Base:</span>
                      <span style={{ fontWeight: 600 }}>
                        ${feeData.lodestar.baseAmount.toLocaleString()}
                      </span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid var(--border-default)' }}>
                      <span>Multiplier:</span>
                      <span style={{ fontWeight: 600 }}>{feeData.lodestar.multiplier}x</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '8px' }}>
                      <span style={{ fontWeight: 600 }}>Adjusted Fee Award:</span>
                      <span style={{ fontWeight: 700, color: 'var(--wrn-txt, #7A5800)', fontSize: '15px', fontFamily: 'var(--font-mono)' }}>
                        ${feeData.lodestar.adjustedTotal.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Beta Badge */}
              <div style={{ ...cardStyle, textAlign: 'center', border: 'none' }}>
                <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', margin: 0, fontFamily: 'var(--font-body)' }}>
                  Free during public beta
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Comparison Table */}
        {feeData && showComparison && (
          <div style={{ marginTop: '32px', ...cardStyle }}>
            <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--color-text-primary)', margin: '0 0 20px', fontFamily: 'var(--font-ui)' }}>
              Fee Arrangement Comparison
            </h3>

            <div style={{ overflowX: 'auto' }}>
              <table style={{
                width: '100%',
                borderCollapse: 'collapse',
                fontSize: '13px',
                fontFamily: 'var(--font-body)',
              }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--border-default)' }}>
                    <th style={{ textAlign: 'left', padding: '12px 8px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                      Fee Type
                    </th>
                    <th style={{ textAlign: 'right', padding: '12px 8px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                      Attorney Fee
                    </th>
                    <th style={{ textAlign: 'right', padding: '12px 8px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                      Client Net
                    </th>
                    <th style={{ textAlign: 'center', padding: '12px 8px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                      Best For
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid var(--border-default)', background: 'var(--color-surface-0)' }}>
                    <td style={{ padding: '12px 8px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                      25% Contingency
                    </td>
                    <td style={{ textAlign: 'right', padding: '12px 8px', color: 'var(--color-text-primary)', fontFamily: 'var(--font-mono)' }}>
                      ${feeData.contingency25.toLocaleString()}
                    </td>
                    <td style={{ textAlign: 'right', padding: '12px 8px', color: 'var(--color-text-primary)', fontFamily: 'var(--font-mono)' }}>
                      ${(parseInt(caseValue) - feeData.contingency25).toLocaleString()}
                    </td>
                    <td style={{ textAlign: 'center', padding: '12px 8px', color: 'var(--color-text-secondary)' }}>
                      Strong cases
                    </td>
                  </tr>

                  <tr style={{ borderBottom: '1px solid var(--border-default)', background: 'var(--color-surface-0)' }}>
                    <td style={{ padding: '12px 8px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                      33% Contingency
                    </td>
                    <td style={{ textAlign: 'right', padding: '12px 8px', color: 'var(--color-text-primary)', fontFamily: 'var(--font-mono)' }}>
                      ${feeData.contingency33.toLocaleString()}
                    </td>
                    <td style={{ textAlign: 'right', padding: '12px 8px', color: 'var(--color-text-primary)', fontFamily: 'var(--font-mono)' }}>
                      ${(parseInt(caseValue) - feeData.contingency33).toLocaleString()}
                    </td>
                    <td style={{ textAlign: 'center', padding: '12px 8px', color: 'var(--color-text-secondary)' }}>
                      Standard
                    </td>
                  </tr>

                  <tr style={{ borderBottom: '1px solid var(--border-default)', background: 'var(--color-surface-0)' }}>
                    <td style={{ padding: '12px 8px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                      40% Contingency
                    </td>
                    <td style={{ textAlign: 'right', padding: '12px 8px', color: 'var(--color-text-primary)', fontFamily: 'var(--font-mono)' }}>
                      ${feeData.contingency40.toLocaleString()}
                    </td>
                    <td style={{ textAlign: 'right', padding: '12px 8px', color: 'var(--color-text-primary)', fontFamily: 'var(--font-mono)' }}>
                      ${(parseInt(caseValue) - feeData.contingency40).toLocaleString()}
                    </td>
                    <td style={{ textAlign: 'center', padding: '12px 8px', color: 'var(--color-text-secondary)' }}>
                      High-risk
                    </td>
                  </tr>

                  <tr style={{ borderBottom: '1px solid var(--border-default)', background: 'var(--color-surface-0)' }}>
                    <td style={{ padding: '12px 8px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                      Hourly (Low)
                    </td>
                    <td style={{ textAlign: 'right', padding: '12px 8px', color: 'var(--color-text-primary)', fontFamily: 'var(--font-mono)' }}>
                      ${feeData.hourly.totalLow.toLocaleString()}
                    </td>
                    <td style={{ textAlign: 'right', padding: '12px 8px', color: 'var(--color-text-primary)', fontFamily: 'var(--font-mono)' }}>
                      ${(parseInt(caseValue) - feeData.hourly.totalLow).toLocaleString()}
                    </td>
                    <td style={{ textAlign: 'center', padding: '12px 8px', color: 'var(--color-text-secondary)' }}>
                      Fast cases
                    </td>
                  </tr>

                  <tr style={{ borderBottom: '1px solid var(--border-default)', background: 'var(--color-surface-0)' }}>
                    <td style={{ padding: '12px 8px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                      Hourly (High)
                    </td>
                    <td style={{ textAlign: 'right', padding: '12px 8px', color: 'var(--color-text-primary)', fontFamily: 'var(--font-mono)' }}>
                      ${feeData.hourly.totalHigh.toLocaleString()}
                    </td>
                    <td style={{ textAlign: 'right', padding: '12px 8px', color: 'var(--color-text-primary)', fontFamily: 'var(--font-mono)' }}>
                      ${(parseInt(caseValue) - feeData.hourly.totalHigh).toLocaleString()}
                    </td>
                    <td style={{ textAlign: 'center', padding: '12px 8px', color: 'var(--color-text-secondary)' }}>
                      Complex cases
                    </td>
                  </tr>

                  <tr style={{ background: 'var(--color-surface-0)' }}>
                    <td style={{ padding: '12px 8px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                      Hybrid
                    </td>
                    <td style={{ textAlign: 'right', padding: '12px 8px', color: 'var(--color-text-primary)', fontFamily: 'var(--font-mono)' }}>
                      ${feeData.hybrid.estimatedTotal.toLocaleString()}
                    </td>
                    <td style={{ textAlign: 'right', padding: '12px 8px', color: 'var(--color-text-primary)', fontFamily: 'var(--font-mono)' }}>
                      ${(parseInt(caseValue) - feeData.hybrid.estimatedTotal).toLocaleString()}
                    </td>
                    <td style={{ textAlign: 'center', padding: '12px 8px', color: 'var(--color-text-secondary)' }}>
                      Medium-risk
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Info Cards */}
        {!feeData && (
          <div style={{ marginTop: '40px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
            <div style={cardStyle}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" strokeWidth="2" style={{ marginBottom: '12px' }}>
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-13c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5z" />
              </svg>
              <h3 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--color-text-primary)', margin: '0 0 8px', fontFamily: 'var(--font-ui)' }}>
                Multiple Arrangement Types
              </h3>
              <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', margin: 0, lineHeight: 1.6, fontFamily: 'var(--font-body)' }}>
                Compare contingency, hourly, and hybrid fee structures with real market rates.
              </p>
            </div>

            <div style={cardStyle}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" strokeWidth="2" style={{ marginBottom: '12px' }}>
                <line x1="3" y1="12" x2="21" y2="12" />
                <polyline points="3 6 9 12 3 18" />
              </svg>
              <h3 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--color-text-primary)', margin: '0 0 8px', fontFamily: 'var(--font-ui)' }}>
                Lodestar Calculation
              </h3>
              <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', margin: 0, lineHeight: 1.6, fontFamily: 'var(--font-body)' }}>
                Calculate fee awards for cases with fee-shifting statutes (civil rights, consumer).
              </p>
            </div>

            <div style={cardStyle}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" strokeWidth="2" style={{ marginBottom: '12px' }}>
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <path d="M9 9h6v6H9z" />
              </svg>
              <h3 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--color-text-primary)', margin: '0 0 8px', fontFamily: 'var(--font-ui)' }}>
                Case-Type Data
              </h3>
              <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', margin: 0, lineHeight: 1.6, fontFamily: 'var(--font-body)' }}>
                Rates and estimates based on 5.1M+ federal case outcomes and settlement data.
              </p>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div style={{ marginTop: '40px', paddingTop: '24px', borderTop: '1px solid var(--border-default)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
          <Link href="/attorney/intake-forms" style={{ textDecoration: 'none' }}>
            <div style={{ padding: '16px', background: 'var(--color-surface-0)', border: '1px solid var(--border-default)', borderRadius: '4px', cursor: 'pointer', transition: 'all 0.2s' }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--accent-primary)'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(10, 102, 194, 0.1)'; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-default)'; e.currentTarget.style.boxShadow = 'none'; }}>
              <p style={{ fontSize: '13px', fontWeight: '600', color: 'var(--color-text-primary)', margin: '0 0 4px', fontFamily: 'var(--font-body)' }}>
                Intake Forms
              </p>
              <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', margin: 0, fontFamily: 'var(--font-body)' }}>
                Generate intake questionnaires
              </p>
            </div>
          </Link>
          <Link href="/attorney/demand-letter" style={{ textDecoration: 'none' }}>
            <div style={{ padding: '16px', background: 'var(--color-surface-0)', border: '1px solid var(--border-default)', borderRadius: '4px', cursor: 'pointer', transition: 'all 0.2s' }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--accent-primary)'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(10, 102, 194, 0.1)'; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-default)'; e.currentTarget.style.boxShadow = 'none'; }}>
              <p style={{ fontSize: '13px', fontWeight: '600', color: 'var(--color-text-primary)', margin: '0 0 4px', fontFamily: 'var(--font-body)' }}>
                Demand Letter
              </p>
              <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', margin: 0, fontFamily: 'var(--font-body)' }}>
                Generate demand letters
              </p>
            </div>
          </Link>
          <Link href="/attorney/case-predictor" style={{ textDecoration: 'none' }}>
            <div style={{ padding: '16px', background: 'var(--color-surface-0)', border: '1px solid var(--border-default)', borderRadius: '4px', cursor: 'pointer', transition: 'all 0.2s' }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--accent-primary)'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(10, 102, 194, 0.1)'; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-default)'; e.currentTarget.style.boxShadow = 'none'; }}>
              <p style={{ fontSize: '13px', fontWeight: '600', color: 'var(--color-text-primary)', margin: '0 0 4px', fontFamily: 'var(--font-body)' }}>
                Case Predictor
              </p>
              <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', margin: 0, fontFamily: 'var(--font-body)' }}>
                Predict case outcomes
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
