'use client';

import { useState } from 'react';
import Link from 'next/link';
import { SITS, STATES } from '../../../lib/data';
import { REAL_DATA } from '../../../lib/realdata';

type Prediction = {
  caseType: string;
  nosCode: string;
  predictedWinRate: number;
  predictedSettlementRate: number;
  predictedDurationMonths: number;
  settlementRange: { low: number; median: number; high: number };
  outcomes: { label: string; percentage: number; color: string }[];
  confidence: string;
  sampleSize: number;
  keyFactors: string[];
  statuteOfLimitations: string;
  typicalFeeRange: string;
  aiInsights?: string;
};

type PredictionResponse = {
  prediction: Prediction;
  disclaimer: string;
};

const formatMoney = (k: number) => {
  if (k === 0) return '< $1,000';
  if (k >= 1000) return `$${(k / 1000).toFixed(1)}M`;
  return `$${k}K`;
};

const ScoreRing = ({ value, label, color, size = 80 }: { value: number; label: string; color: string; size?: number }) => {
  const r = (size - 8) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - value / 100);
  return (
    <div style={{ textAlign: 'center' }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--bdr)" strokeWidth="6" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={{ transition: 'stroke-dashoffset 0.8s ease' }}
        />
        <text x={size / 2} y={size / 2 + 1} textAnchor="middle" dominantBaseline="middle" fontSize="18" fontWeight="700" fontFamily="var(--font-mono)" fill="var(--text1, #333333)">
          {value}%
        </text>
      </svg>
      <div style={{ fontSize: '12px', color: 'var(--text2, #42403C)', fontWeight: 600, textTransform: 'uppercase' as const, letterSpacing: '0.5px', marginTop: '4px' }}>{label}</div>
    </div>
  );
};

export default function CasePredictorPage() {
  // Form state
  const [caseCategory, setCaseCategory] = useState('');

  // Inline styles for focus states
  const focusStyle = `
    select:focus, input:focus {
      outline: none;
      border-color: var(--link);
      box-shadow: var(--shadow-focus);
    }
  `;
  const [caseType, setCaseType] = useState('');
  const [state, setState] = useState('');
  const [hasAttorney, setHasAttorney] = useState(true);
  const [damageAmount, setDamageAmount] = useState('mid');
  const [caseStrength, setCaseStrength] = useState('moderate');
  const [priorOffers, setPriorOffers] = useState(false);
  const [documentedEvidence, setDocumentedEvidence] = useState(true);

  // Result state
  const [result, setResult] = useState<PredictionResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const selectedCategory = SITS.find((s) => s.id === caseCategory);
  const caseOptions = selectedCategory?.opts || [];

  async function handlePredict(e: React.FormEvent) {
    e.preventDefault();
    if (!caseType) {
      setError('Please select a case type');
      return;
    }
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const res = await fetch('/api/attorney/case-predictor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          caseType,
          state,
          hasAttorney,
          damageAmount,
          caseStrength,
          priorOffers,
          documentedEvidence,
        }),
      });

      if (!res.ok) {
        const errData = await res.json();
        setError(errData.error || 'Prediction failed');
      } else {
        const data = await res.json();
        setResult(data);
      }
    } catch {
      setError('Network error. Please try again.');
    }
    setLoading(false);
  }

  const p = result?.prediction;

  const selectStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px 14px',
    height: '48px',
    border: '1px solid var(--bdr)',
    borderRadius: '4px',
    fontSize: '14px',
    color: 'var(--text1)',
    backgroundColor: 'var(--card)',
    fontFamily: 'var(--font-ui)',
    transition: 'border-color 200ms',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '14px',
    fontWeight: 600,
    color: 'var(--text1)',
    marginBottom: '6px',
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--surf)', fontFamily: 'var(--font-ui)' }}>
      <style>{focusStyle}
        {`
        button:hover:not(:disabled) { opacity: 0.9; transform: translateY(-1px); }
        a:hover { text-decoration: underline; }
        @media (max-width: 640px) { h1 { font-size: 20px; } }
        @media (max-width: 768px) {
          .predictor-form-grid { grid-template-columns: 1fr !important; }
          .predictor-stats-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 480px) {
          .predictor-page-header { padding: 20px 12px !important; }
        }
        `}
      </style>
      {/* Header */}
      <div style={{
        background: 'var(--card)',
        color: 'var(--card)',
        padding: '40px 24px 32px',
        position: 'relative',
        overflow: 'hidden',
        borderBottom: '1px solid var(--bdr)',
      }} className="predictor-page-header">
        <div aria-hidden style={{
          position: 'absolute', inset: 0, opacity: 0.03, pointerEvents: 'none',
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />
        <div style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative' }}>
          <Link href="/attorney" style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'rgba(255,255,255,0.5)', textDecoration: 'none', letterSpacing: '0.02em', display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 16 }}>
            Home / Attorney / Case Predictor
          </Link>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '4px 10px', marginBottom: 16,
            borderRadius: 999,
            border: '1px solid rgba(59,130,246,0.2)',
            background: 'rgba(59,130,246,0.08)',
            fontFamily: 'var(--font-mono)', fontSize: 12,
            fontWeight: 600, letterSpacing: '0.5px', textTransform: 'uppercase',
            color: 'var(--link)',
          }}>
            <span className="animate-pulse" style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--data-positive)' }} />
            Case Predictor
          </div>
          <h1 className="font-legal" style={{
            fontFamily: 'var(--font-legal)',
            fontSize: '20px',
            fontWeight: 700,
            letterSpacing: '-0.025em',
            lineHeight: 1.1,
            color: 'var(--card)',
            margin: 0,
          }}>
            Forecast outcomes with confidence
          </h1>
        </div>
      </div>

      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '32px 24px' }}>
        {/* How It Works Section */}
        <div style={{ background: 'var(--card)', borderRadius: '4px', padding: '32px', border: '1px solid var(--bdr)', boxShadow: 'var(--shadow-xs)', marginBottom: '32px' }}>
          <h2 style={{ fontSize: 20, fontWeight: 600, fontFamily: 'var(--font-ui)', color: 'var(--text1)', margin: '0 0 24px' }}>
            How It Works
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px' }}>
            <div style={{ display: 'flex', gap: '16px' }}>
              <div style={{ minWidth: '48px', height: '48px', borderRadius: '50%', background: 'var(--link)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--chrome-text)', fontWeight: 600, fontSize: '20px' }}>
                1
              </div>
              <div>
                <h3 className="font-legal" style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text1)', margin: '0 0 16px' }}>
                  Enter Case Details
                </h3>
                <p style={{ fontSize: '14px', color: 'var(--text2)', lineHeight: 1.6, margin: 0 }}>
                  Select your case type, jurisdiction, damages amount, and case strength to provide context.
                </p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '16px' }}>
              <div style={{ minWidth: '48px', height: '48px', borderRadius: '50%', background: 'var(--link)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--chrome-text)', fontWeight: 600, fontSize: '16px' }}>
                2
              </div>
              <div>
                <h3 className="font-legal" style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text1)', margin: '0 0 16px' }}>
                  AI Analysis
                </h3>
                <p style={{ fontSize: '14px', color: 'var(--text2)', lineHeight: 1.6, margin: 0 }}>
                  Our system analyzes 4M+ historical federal cases to predict outcomes with confidence scoring.
                </p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '16px' }}>
              <div style={{ minWidth: '48px', height: '48px', borderRadius: '50%', background: 'var(--link)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--chrome-text)', fontWeight: 600, fontSize: '16px' }}>
                3
              </div>
              <div>
                <h3 className="font-legal" style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text1)', margin: '0 0 16px' }}>
                  Get Insights
                </h3>
                <p style={{ fontSize: '14px', color: 'var(--text2)', lineHeight: 1.6, margin: 0 }}>
                  Receive win rate, settlement range, duration forecast, and key factors influencing your case.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Data-Driven Insights */}
        <div style={{ background: 'linear-gradient(135deg, var(--link) 0%, var(--chrome-bg) 100%)', borderRadius: '4px', padding: '32px', border: '1px solid var(--bdr)', marginBottom: '32px', color: 'var(--chrome-text)' }}>
          <h2 style={{ fontSize: 20, fontWeight: 600, fontFamily: 'var(--font-ui)', color: 'var(--chrome-text)', margin: '0 0 24px' }}>
            Federal Court Data at Your Fingertips
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
            <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: '4px', padding: '24px', border: '1px solid rgba(255,255,255,0.10)' }}>
              <div className="font-mono" style={{ fontSize: '28px', fontWeight: 600, color: 'var(--chrome-text)', margin: '0 0 16px' }}>
                5.1M+
              </div>
              <div style={{ fontSize: '14px', color: 'var(--text-tertiary)' }}>Federal cases analyzed</div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: '4px', padding: '24px', border: '1px solid rgba(255,255,255,0.10)' }}>
              <div className="font-mono" style={{ fontSize: '28px', fontWeight: 600, color: 'var(--chrome-text)', margin: '0 0 16px' }}>
                84
              </div>
              <div style={{ fontSize: '14px', color: 'var(--text-tertiary)' }}>Nature of suit codes</div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: '4px', padding: '24px', border: '1px solid rgba(255,255,255,0.10)' }}>
              <div className="font-mono" style={{ fontSize: '28px', fontWeight: 600, color: 'var(--chrome-text)', margin: '0 0 16px' }}>
                All 50
              </div>
              <div style={{ fontSize: '14px', color: 'var(--text-tertiary)' }}>States covered</div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: '4px', padding: '24px', border: '1px solid rgba(255,255,255,0.10)' }}>
              <div className="font-mono" style={{ fontSize: '28px', fontWeight: 600, color: 'var(--chrome-text)', margin: '0 0 16px' }}>
                AI-Powered
              </div>
              <div style={{ fontSize: '14px', color: 'var(--text-tertiary)' }}>Predictions & analysis</div>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: p ? '1fr 1fr' : '1fr', gap: '24px' }} className="predictor-form-grid">
          {/* Input Form */}
          <div style={{ background: 'var(--card)', borderRadius: '4px', padding: '32px', border: '1px solid var(--bdr)', boxShadow: 'var(--shadow-xs)' }}>
            <h2 className="font-ui" style={{ fontSize: 20, fontWeight: 600, color: 'var(--text1)', margin: '0 0 12px' }}>
              Case Details
            </h2>

            <form onSubmit={handlePredict}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {/* Case Category */}
                <div>
                  <label htmlFor="case-category" style={labelStyle}>Case Category</label>
                  <select
                    id="case-category"
                    value={caseCategory}
                    onChange={(e) => { setCaseCategory(e.target.value); setCaseType(''); }}
                    style={selectStyle}
                  >
                    <option value="">Select category...</option>
                    {SITS.map((s) => (
                      <option key={s.id} value={s.id}>{s.label} — {s.sub}</option>
                    ))}
                  </select>
                </div>

                {/* Specific Case Type */}
                {caseCategory && (
                  <div>
                    <label htmlFor="specific-case-type" style={labelStyle}>Specific Case Type</label>
                    <select id="specific-case-type" value={caseType} onChange={(e) => setCaseType(e.target.value)} style={selectStyle}>
                      <option value="">Select type...</option>
                      {caseOptions.map((opt) => (
                        <option key={opt.label} value={opt.nos}>{opt.label}</option>
                      ))}
                    </select>
                  </div>
                )}

                {/* State */}
                <div>
                  <label htmlFor="filing-state" style={labelStyle}>Filing State</label>
                  <select id="filing-state" value={state} onChange={(e) => setState(e.target.value)} style={selectStyle}>
                    {STATES.map((s) => (
                      <option key={s.id} value={s.id}>{s.label}</option>
                    ))}
                  </select>
                </div>

                {/* Has Attorney */}
                <div>
                  <label style={labelStyle}>Representation</label>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {[
                      { val: true, label: 'Attorney Represented' },
                      { val: false, label: 'Pro Se (Self)' },
                    ].map((opt) => (
                      <button
                        key={String(opt.val)}
                        type="button"
                        onClick={() => setHasAttorney(opt.val)}
                        style={{
                          flex: 1,
                          padding: '8px',
                          borderRadius: '4px',
                          border: `1px solid ${hasAttorney === opt.val ? 'var(--link)' : 'var(--bdr)'}`,
                          backgroundColor: hasAttorney === opt.val ? 'rgba(10, 102, 194, 0.08)' : 'var(--surf)',
                          color: hasAttorney === opt.val ? 'var(--link)' : 'var(--text2)',
                          fontSize: '14px',
                          fontWeight: 600,
                          cursor: 'pointer',
                          transition: 'all 200ms',
                        }}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Damage Amount */}
                <div>
                  <label htmlFor="estimated-damages" style={labelStyle}>Estimated Damages</label>
                  <select id="estimated-damages" value={damageAmount} onChange={(e) => setDamageAmount(e.target.value)} style={selectStyle}>
                    <option value="small">Under $10,000</option>
                    <option value="mid">$10,000 – $75,000</option>
                    <option value="large">$75,000 – $150,000</option>
                    <option value="xlarge">$150,000 – $500,000</option>
                    <option value="huge">Over $500,000</option>
                  </select>
                </div>

                {/* Case Strength */}
                <div>
                  <label style={labelStyle}>Case Strength Assessment</label>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {[
                      { val: 'weak', label: 'Weak', color: 'var(--data-negative)' },
                      { val: 'moderate', label: 'Moderate', color: 'var(--flag-yellow)' },
                      { val: 'strong', label: 'Strong', color: 'var(--data-positive)' },
                    ].map((opt) => (
                      <button
                        key={opt.val}
                        type="button"
                        onClick={() => setCaseStrength(opt.val)}
                        style={{
                          flex: 1,
                          padding: '8px',
                          borderRadius: '4px',
                          border: `1px solid ${caseStrength === opt.val ? opt.color : 'var(--bdr)'}`,
                          backgroundColor: caseStrength === opt.val ? `${opt.color}15` : 'var(--surf)',
                          color: caseStrength === opt.val ? opt.color === '#EA2143' ? 'var(--link)' : opt.color === '#E89558' ? 'var(--wrn-txt)' : 'var(--data-positive)' : 'var(--text2)',
                          fontSize: '14px',
                          fontWeight: 600,
                          cursor: 'pointer',
                          transition: 'all 200ms',
                        }}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Toggles */}
                <div style={{ display: 'flex', gap: '16px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: 'var(--text1)', cursor: 'pointer', flex: 1 }}>
                    <input
                      type="checkbox"
                      checked={priorOffers}
                      onChange={(e) => setPriorOffers(e.target.checked)}
                      style={{ width: '16px', height: '16px', accentColor: 'var(--link)' }}
                    />
                    Prior settlement offers
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: 'var(--text1)', cursor: 'pointer', flex: 1 }}>
                    <input
                      type="checkbox"
                      checked={documentedEvidence}
                      onChange={(e) => setDocumentedEvidence(e.target.checked)}
                      style={{ width: '16px', height: '16px', accentColor: 'var(--link)' }}
                    />
                    Documented evidence
                  </label>
                </div>

                {/* Error */}
                {error && (
                  <div style={{ padding: '8px 16px', borderRadius: '4px', backgroundColor: 'rgba(204,16,25,0.08)', border: '1px solid var(--bdr)' }}>
                    <p style={{ fontSize: '14px', color: 'var(--link)', margin: 0 }}>{error}</p>
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading || !caseType}
                  style={{
                    width: '100%',
                    padding: '16px',
                    backgroundColor: loading || !caseType ? 'var(--bdr)' : 'var(--link)',
                    color: 'var(--chrome-text)',
                    border: 'none',
                    borderRadius: '4px',
                    fontSize: '14px',
                    fontWeight: 600,
                    fontFamily: 'var(--font-ui)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    cursor: loading || !caseType ? 'not-allowed' : 'pointer',
                    transition: 'background-color 200ms',
                  }}
                >
                  {loading ? 'Analyzing...' : 'Predict Outcome'}
                </button>
              </div>
            </form>
          </div>

          {/* Results */}
          {p && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Score Cards */}
              <div style={{ background: 'var(--card)', borderRadius: '4px', padding: '32px', border: '1px solid var(--bdr)', boxShadow: 'var(--shadow-xs)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                  <h2 style={{ fontSize: '20px', fontWeight: 600, fontFamily: 'var(--font-ui)', color: 'var(--text1)', margin: 0 }}>
                    Prediction: {p.caseType}
                  </h2>
                  <span style={{
                    padding: '4px 12px',
                    borderRadius: '4px',
                    fontSize: '12px',
                    fontWeight: 600,
                    backgroundColor: p.confidence === 'High' ? 'rgba(7,132,74,0.08)' : p.confidence === 'Moderate' ? 'rgba(184,110,0,0.08)' : 'rgba(204,16,25,0.08)',
                    color: p.confidence === 'High' ? 'var(--data-positive)' : p.confidence === 'Moderate' ? 'var(--wrn-txt)' : 'var(--link)',
                  }}>
                    {p.confidence} Confidence
                  </span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '24px' }}>
                  <ScoreRing value={p.predictedWinRate} label="Win Rate" color={p.predictedWinRate >= 55 ? 'var(--data-positive)' : p.predictedWinRate >= 40 ? 'var(--wrn-txt)' : 'var(--link)'} />
                  <ScoreRing value={p.predictedSettlementRate} label="Settlement" color="var(--link)" />
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ width: 80, height: 80, borderRadius: '50%', border: '6px solid var(--link)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span className="font-mono" style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text1, #333333)' }}>{p.predictedDurationMonths}mo</span>
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--text2, #42403C)', fontWeight: 600, textTransform: 'uppercase' as const, letterSpacing: '0.5px', marginTop: '4px' }}>Duration</div>
                  </div>
                </div>

                {/* Settlement Range */}
                <div style={{ background: 'var(--surf)', borderRadius: '4px', padding: '16px', marginBottom: '16px' }}>
                  <p style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text2)', textTransform: 'uppercase' as const, letterSpacing: '0.5px', margin: '0 0 10px' }}>
                    Projected Settlement Range
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <div style={{ textAlign: 'center' }}>
                      <div className="font-mono" style={{ fontSize: '14px', color: 'var(--text2)' }}>{formatMoney(p.settlementRange.low)}</div>
                      <div style={{ fontSize: '12px', color: 'var(--text2)' }}>25th pctile</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div className="font-mono" style={{ fontSize: '24px', fontWeight: 600, color: 'var(--text1)' }}>{formatMoney(p.settlementRange.median)}</div>
                      <div style={{ fontSize: '12px', color: 'var(--text2)' }}>Median</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div className="font-mono" style={{ fontSize: '14px', color: 'var(--text2)' }}>{formatMoney(p.settlementRange.high)}</div>
                      <div style={{ fontSize: '12px', color: 'var(--text2)' }}>75th pctile</div>
                    </div>
                  </div>
                  {/* Range bar */}
                  <div style={{ height: '8px', background: 'var(--bdr)', borderRadius: '4px', marginTop: '12px', position: 'relative' }}>
                    <div style={{
                      position: 'absolute',
                      left: '10%',
                      right: '10%',
                      height: '100%',
                      background: 'linear-gradient(90deg, var(--link), var(--data-positive))',
                      borderRadius: '4px',
                    }} />
                  </div>
                </div>

                {/* Quick Stats */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }} className="predictor-stats-grid">
                  <div style={{ padding: '8px', background: 'var(--surf)', borderRadius: '4px' }}>
                    <p style={{ fontSize: '12px', color: 'var(--text2)', margin: '0 0 2px' }}>Statute of Limitations</p>
                    <p className="font-mono" style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text1)', margin: 0 }}>{p.statuteOfLimitations}</p>
                  </div>
                  <div style={{ padding: '8px', background: 'var(--surf)', borderRadius: '4px' }}>
                    <p style={{ fontSize: '12px', color: 'var(--text2)', margin: '0 0 2px' }}>Typical Fee Range</p>
                    <p className="font-mono" style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text1)', margin: 0 }}>{p.typicalFeeRange}</p>
                  </div>
                </div>
              </div>

              {/* Outcome Distribution */}
              <div style={{ background: 'var(--card)', borderRadius: '4px', padding: '32px', border: '1px solid var(--bdr)', boxShadow: 'var(--shadow-xs)' }}>
                <h3 className="font-legal" style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text1)', margin: '0 0 16px' }}>
                  Predicted Outcome Distribution
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {p.outcomes.filter((o) => o.percentage > 1).map((o) => (
                    <div key={o.label}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                        <span style={{ fontSize: '14px', color: 'var(--text1)' }}>{o.label}</span>
                        <span className="font-mono" style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text1)' }}>{o.percentage}%</span>
                      </div>
                      <div style={{ height: '8px', background: 'var(--bdr)', borderRadius: '4px', overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${o.percentage}%`, background: o.color === '#EA2143' ? 'var(--link)' : o.color === '#E89558' ? 'var(--wrn-txt)' : o.color === 'var(--data-positive)' ? 'var(--data-positive)' : 'var(--link)', borderRadius: '4px', transition: 'width 0.5s ease' }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Factors */}
              <div style={{ background: 'var(--card)', borderRadius: '4px', padding: '32px', border: '1px solid var(--bdr)', boxShadow: 'var(--shadow-xs)' }}>
                <h3 className="font-legal" style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text1)', margin: '0 0 16px' }}>
                  Key Analysis Factors
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {p.keyFactors.map((f, i) => (
                    <div key={i} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--link)" strokeWidth="2.5" style={{ flexShrink: 0, marginTop: '2px' }}>
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span style={{ fontSize: '14px', color: 'var(--text2)', lineHeight: 1.5 }}>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI-Generated Strategic Insights */}
              {p.aiInsights && (
                <div style={{ background: 'linear-gradient(135deg, var(--surf) 0%, var(--surf) 100%)', borderRadius: '4px', padding: '32px', border: '1px solid var(--bdr)', boxShadow: 'var(--shadow-xs)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--link)', flexShrink: 0 }}>
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
                    </svg>
                    <h3 className="font-legal" style={{ fontSize: '16px', fontWeight: 600, color: 'var(--link)', margin: '0' }}>
                      AI Strategic Insights
                    </h3>
                  </div>
                  <div style={{ fontSize: '14px', color: 'var(--link)', lineHeight: 1.7, fontFamily: 'var(--font-ui)', whiteSpace: 'pre-wrap' }}>
                    {p.aiInsights}
                  </div>
                  <p style={{ fontSize: '12px', color: 'var(--link)', margin: '12px 0 0', fontFamily: 'var(--font-ui)' }}>
                    AI-generated analysis based on historical patterns. Review with legal judgment.
                  </p>
                </div>
              )}

              {/* Disclaimer */}
              <div style={{ padding: '16px 16px', backgroundColor: 'rgba(122,88,0,0.08)', border: '1px solid var(--bdr)', borderRadius: '4px' }}>
                <p style={{ fontSize: '12px', color: 'var(--wrn-txt)', margin: 0, lineHeight: 1.5 }}>
                  <strong>Disclaimer:</strong> {result.disclaimer}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Related Attorney Tools Section */}
        <div style={{ marginTop: '48px', paddingTop: '32px', borderTop: '2px solid var(--bdr)' }}>
          <h2 style={{ fontSize: 20, fontWeight: 600, fontFamily: 'var(--font-ui)', color: 'var(--text1)', margin: '0 0 24px' }}>
            Related Attorney Tools
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
            <Link href="/attorney/judge-intelligence" style={{ textDecoration: 'none' }}>
              <div style={{ background: 'var(--card)', borderRadius: '4px', padding: '24px', border: '1px solid var(--bdr)', boxShadow: 'var(--shadow-xs)', transition: 'all 200ms', cursor: 'pointer' }} onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.12)'; e.currentTarget.style.borderColor = 'var(--link)'; }} onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.08)'; e.currentTarget.style.borderColor = 'var(--bdr)'; }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '4px', background: 'rgba(10, 102, 194, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--link)" strokeWidth="2">
                    <path d="M12 2v20M2 10h20M4 10l3 8h10l3-8" />
                  </svg>
                </div>
                <h3 className="font-legal" style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text1)', margin: '0 0 16px' }}>
                  Judge Intelligence
                </h3>
                <p style={{ fontSize: '14px', color: 'var(--text2)', margin: 0, lineHeight: 1.5 }}>
                  Research federal judges' ruling patterns, settlement tendencies, and historical outcomes.
                </p>
              </div>
            </Link>
            <Link href="/attorney/venue-optimizer" style={{ textDecoration: 'none' }}>
              <div style={{ background: 'var(--card)', borderRadius: '4px', padding: '24px', border: '1px solid var(--bdr)', boxShadow: 'var(--shadow-xs)', transition: 'all 200ms', cursor: 'pointer' }} onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.12)'; e.currentTarget.style.borderColor = 'var(--link)'; }} onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.08)'; e.currentTarget.style.borderColor = 'var(--bdr)'; }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '4px', background: 'rgba(10, 102, 194, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--link)" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <circle cx="12" cy="12" r="6" />
                    <circle cx="12" cy="12" r="2" />
                  </svg>
                </div>
                <h3 className="font-legal" style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text1)', margin: '0 0 16px' }}>
                  Venue Optimizer
                </h3>
                <p style={{ fontSize: '14px', color: 'var(--text2)', margin: 0, lineHeight: 1.5 }}>
                  Find the optimal filing district by case type, win rates, and settlement data.
                </p>
              </div>
            </Link>
            <Link href="/attorney/motion-analytics" style={{ textDecoration: 'none' }}>
              <div style={{ background: 'var(--card)', borderRadius: '4px', padding: '24px', border: '1px solid var(--bdr)', boxShadow: 'var(--shadow-xs)', transition: 'all 200ms', cursor: 'pointer' }} onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.12)'; e.currentTarget.style.borderColor = 'var(--link)'; }} onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.08)'; e.currentTarget.style.borderColor = 'var(--bdr)'; }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '4px', background: 'rgba(10, 102, 194, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--link)" strokeWidth="2">
                    <path d="M3 3h18v18H3z" />
                  </svg>
                </div>
                <h3 className="font-legal" style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text1)', margin: '0 0 16px' }}>
                  Motion Analytics
                </h3>
                <p style={{ fontSize: '14px', color: 'var(--text2)', margin: 0, lineHeight: 1.5 }}>
                  Analyze motion success rates and judicial patterns by type and judge.
                </p>
              </div>
            </Link>
            <Link href="/attorney/bulk-analysis" style={{ textDecoration: 'none' }}>
              <div style={{ background: 'var(--card)', borderRadius: '4px', padding: '24px', border: '1px solid var(--bdr)', boxShadow: 'var(--shadow-xs)', transition: 'all 200ms', cursor: 'pointer' }} onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.12)'; e.currentTarget.style.borderColor = 'var(--link)'; }} onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.08)'; e.currentTarget.style.borderColor = 'var(--bdr)'; }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '4px', background: 'rgba(10, 102, 194, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--link)" strokeWidth="2">
                    <path d="M4 3h16v2H4V3zm0 4h16v2H4V7zm0 4h16v2H4v-2zm0 4h16v2H4v-2z" />
                  </svg>
                </div>
                <h3 className="font-legal" style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text1)', margin: '0 0 16px' }}>
                  Bulk Analysis
                </h3>
                <p style={{ fontSize: '14px', color: 'var(--text2)', margin: 0, lineHeight: 1.5 }}>
                  Analyze multiple cases and documents in bulk for trends and insights.
                </p>
              </div>
            </Link>
          </div>
        </div>

        {/* Free-During-Beta Badge */}
        <div style={{ marginTop: '32px', padding: '16px 24px', background: 'linear-gradient(135deg, rgba(21, 128, 61, 0.08) 0%, rgba(21, 128, 61, 0.04) 100%)', border: '1px solid rgba(21, 128, 61, 0.20)', borderRadius: '4px', textAlign: 'center' }}>
          <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--data-positive)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Free During Beta
          </span>
        </div>
      </div>
    </div>
  );
}
