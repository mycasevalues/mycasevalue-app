'use client';

import { useState } from 'react';
import Link from 'next/link';
import { SITS, STATES } from '../../../lib/data';

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
};

type PredictionResponse = {
  prediction: Prediction;
  disclaimer: string;
};

const formatMoney = (k: number) => {
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
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#E5EBF0" strokeWidth="6" />
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
        <text x={size / 2} y={size / 2 + 1} textAnchor="middle" dominantBaseline="middle" fontSize="18" fontWeight="700" fontFamily="var(--font-mono)" fill="#212529">
          {value}%
        </text>
      </svg>
      <div style={{ fontSize: '11px', color: '#666666', fontWeight: 600, textTransform: 'uppercase' as const, letterSpacing: '0.5px', marginTop: '4px' }}>{label}</div>
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
      border-color: #E8171F;
      box-shadow: 0 0 0 2px rgba(232, 23, 31, 0.08);
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
    border: '1px solid #D5D8DC',
    borderRadius: '4px',
    fontSize: '14px',
    color: '#212529',
    backgroundColor: '#FFFFFF',
    fontFamily: 'var(--font-body)',
    transition: 'border-color 0.2s',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '13px',
    fontWeight: 600,
    color: '#212529',
    marginBottom: '6px',
  };

  return (
    <div style={{ minHeight: '100vh', background: '#EDEEEE', fontFamily: 'var(--font-body)' }}>
      <style>{focusStyle}</style>
      {/* Header */}
      <div style={{ background: '#00172E', borderBottom: '1px solid #D5D8DC', padding: '32px 20px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <Link href="/attorney" style={{ fontSize: '13px', color: '#E8171F', textDecoration: 'none', fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: '4px', marginBottom: '16px' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            Home &gt; Attorney Mode &gt; Case Predictor
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '4px', background: 'rgba(232,23,31,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#E8171F" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M8 10h.01M16 10h.01" />
                <path d="M9 16c1-1 3-1 6 0" />
              </svg>
            </div>
            <div>
              <h1 className="font-display" style={{ fontSize: '28px', fontWeight: 700, color: '#FFFFFF', margin: 0 }}>
                AI Case Outcome Predictor
              </h1>
              <p style={{ fontSize: '14px', color: '#B0B5BA', margin: '4px 0 0 0' }}>
                Predict case outcomes using historical federal court data and AI analysis
              </p>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '32px 20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: p ? '1fr 1fr' : '1fr', gap: '24px' }}>
          {/* Input Form */}
          <div style={{ background: '#FFFFFF', borderRadius: '4px', padding: '28px', border: '1px solid #D5D8DC', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
            <h2 className="font-display" style={{ fontSize: '18px', fontWeight: 700, color: '#212529', margin: '0 0 24px' }}>
              Case Details
            </h2>

            <form onSubmit={handlePredict}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                {/* Case Category */}
                <div>
                  <label style={labelStyle}>Case Category</label>
                  <select
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
                    <label style={labelStyle}>Specific Case Type</label>
                    <select value={caseType} onChange={(e) => setCaseType(e.target.value)} style={selectStyle}>
                      <option value="">Select type...</option>
                      {caseOptions.map((opt) => (
                        <option key={opt.label} value={opt.nos}>{opt.label}</option>
                      ))}
                    </select>
                  </div>
                )}

                {/* State */}
                <div>
                  <label style={labelStyle}>Filing State</label>
                  <select value={state} onChange={(e) => setState(e.target.value)} style={selectStyle}>
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
                          padding: '10px',
                          borderRadius: '4px',
                          border: `1px solid ${hasAttorney === opt.val ? '#E8171F' : '#D5D8DC'}`,
                          backgroundColor: hasAttorney === opt.val ? 'rgba(232,23,31,0.08)' : '#FAFBFC',
                          color: hasAttorney === opt.val ? '#E8171F' : '#666666',
                          fontSize: '13px',
                          fontWeight: 600,
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                        }}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Damage Amount */}
                <div>
                  <label style={labelStyle}>Estimated Damages</label>
                  <select value={damageAmount} onChange={(e) => setDamageAmount(e.target.value)} style={selectStyle}>
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
                      { val: 'weak', label: 'Weak', color: '#EA2143' },
                      { val: 'moderate', label: 'Moderate', color: '#E89558' },
                      { val: 'strong', label: 'Strong', color: '#07CA6B' },
                    ].map((opt) => (
                      <button
                        key={opt.val}
                        type="button"
                        onClick={() => setCaseStrength(opt.val)}
                        style={{
                          flex: 1,
                          padding: '10px',
                          borderRadius: '4px',
                          border: `1px solid ${caseStrength === opt.val ? opt.color : '#D5D8DC'}`,
                          backgroundColor: caseStrength === opt.val ? `${opt.color}15` : '#FAFBFC',
                          color: caseStrength === opt.val ? opt.color === '#EA2143' ? '#E8171F' : opt.color === '#E89558' ? '#B86E00' : '#07874A' : '#666666',
                          fontSize: '13px',
                          fontWeight: 600,
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                        }}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Toggles */}
                <div style={{ display: 'flex', gap: '16px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#212529', cursor: 'pointer', flex: 1 }}>
                    <input
                      type="checkbox"
                      checked={priorOffers}
                      onChange={(e) => setPriorOffers(e.target.checked)}
                      style={{ width: '16px', height: '16px', accentColor: '#E8171F' }}
                    />
                    Prior settlement offers
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#212529', cursor: 'pointer', flex: 1 }}>
                    <input
                      type="checkbox"
                      checked={documentedEvidence}
                      onChange={(e) => setDocumentedEvidence(e.target.checked)}
                      style={{ width: '16px', height: '16px', accentColor: '#E8171F' }}
                    />
                    Documented evidence
                  </label>
                </div>

                {/* Error */}
                {error && (
                  <div style={{ padding: '10px 14px', borderRadius: '4px', backgroundColor: 'rgba(204,16,25,0.08)', border: '1px solid #D5D8DC' }}>
                    <p style={{ fontSize: '13px', color: '#E8171F', margin: 0 }}>{error}</p>
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading || !caseType}
                  style={{
                    width: '100%',
                    padding: '14px',
                    backgroundColor: loading || !caseType ? '#E5EBF0' : '#E8171F',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '4px',
                    fontSize: '15px',
                    fontWeight: 700,
                    fontFamily: 'var(--font-display)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                    cursor: loading || !caseType ? 'not-allowed' : 'pointer',
                    transition: 'background-color 0.2s',
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
              <div style={{ background: '#FFFFFF', borderRadius: '4px', padding: '28px', border: '1px solid #D5D8DC', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <h2 className="font-display" style={{ fontSize: '18px', fontWeight: 700, color: '#212529', margin: 0 }}>
                    Prediction: {p.caseType}
                  </h2>
                  <span style={{
                    padding: '4px 12px',
                    borderRadius: '0px',
                    fontSize: '11px',
                    fontWeight: 700,
                    backgroundColor: p.confidence === 'High' ? 'rgba(7,132,74,0.08)' : p.confidence === 'Moderate' ? 'rgba(184,110,0,0.08)' : 'rgba(204,16,25,0.08)',
                    color: p.confidence === 'High' ? '#07874A' : p.confidence === 'Moderate' ? '#B86E00' : '#E8171F',
                  }}>
                    {p.confidence} Confidence
                  </span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '24px' }}>
                  <ScoreRing value={p.predictedWinRate} label="Win Rate" color={p.predictedWinRate >= 55 ? '#07874A' : p.predictedWinRate >= 40 ? '#B86E00' : '#E8171F'} />
                  <ScoreRing value={p.predictedSettlementRate} label="Settlement" color="#E8171F" />
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ width: 80, height: 80, borderRadius: '50%', border: '6px solid #E8171F', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span className="font-mono" style={{ fontSize: '18px', fontWeight: 700, color: '#212529' }}>{p.predictedDurationMonths}mo</span>
                    </div>
                    <div style={{ fontSize: '11px', color: '#666666', fontWeight: 600, textTransform: 'uppercase' as const, letterSpacing: '0.5px', marginTop: '4px' }}>Duration</div>
                  </div>
                </div>

                {/* Settlement Range */}
                <div style={{ background: '#FAFBFC', borderRadius: '4px', padding: '16px', marginBottom: '16px' }}>
                  <p style={{ fontSize: '12px', fontWeight: 600, color: '#666666', textTransform: 'uppercase' as const, letterSpacing: '0.5px', margin: '0 0 10px' }}>
                    Projected Settlement Range
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <div style={{ textAlign: 'center' }}>
                      <div className="font-mono" style={{ fontSize: '14px', color: '#666666' }}>{formatMoney(p.settlementRange.low)}</div>
                      <div style={{ fontSize: '10px', color: '#999999' }}>25th pctile</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div className="font-mono" style={{ fontSize: '24px', fontWeight: 700, color: '#212529' }}>{formatMoney(p.settlementRange.median)}</div>
                      <div style={{ fontSize: '10px', color: '#999999' }}>Median</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div className="font-mono" style={{ fontSize: '14px', color: '#666666' }}>{formatMoney(p.settlementRange.high)}</div>
                      <div style={{ fontSize: '10px', color: '#999999' }}>75th pctile</div>
                    </div>
                  </div>
                  {/* Range bar */}
                  <div style={{ height: '8px', background: '#E5EBF0', borderRadius: '4px', marginTop: '12px', position: 'relative' }}>
                    <div style={{
                      position: 'absolute',
                      left: '10%',
                      right: '10%',
                      height: '100%',
                      background: 'linear-gradient(90deg, #E8171F, #07874A)',
                      borderRadius: '4px',
                    }} />
                  </div>
                </div>

                {/* Quick Stats */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <div style={{ padding: '10px', background: '#FAFBFC', borderRadius: '4px' }}>
                    <p style={{ fontSize: '11px', color: '#666666', margin: '0 0 2px' }}>Statute of Limitations</p>
                    <p className="font-mono" style={{ fontSize: '13px', fontWeight: 600, color: '#212529', margin: 0 }}>{p.statuteOfLimitations}</p>
                  </div>
                  <div style={{ padding: '10px', background: '#FAFBFC', borderRadius: '4px' }}>
                    <p style={{ fontSize: '11px', color: '#666666', margin: '0 0 2px' }}>Typical Fee Range</p>
                    <p className="font-mono" style={{ fontSize: '13px', fontWeight: 600, color: '#212529', margin: 0 }}>{p.typicalFeeRange}</p>
                  </div>
                </div>
              </div>

              {/* Outcome Distribution */}
              <div style={{ background: '#FFFFFF', borderRadius: '4px', padding: '28px', border: '1px solid #D5D8DC', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
                <h3 className="font-display" style={{ fontSize: '15px', fontWeight: 700, color: '#212529', margin: '0 0 16px' }}>
                  Predicted Outcome Distribution
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {p.outcomes.filter((o) => o.percentage > 1).map((o) => (
                    <div key={o.label}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                        <span style={{ fontSize: '13px', color: '#212529' }}>{o.label}</span>
                        <span className="font-mono" style={{ fontSize: '13px', fontWeight: 600, color: '#212529' }}>{o.percentage}%</span>
                      </div>
                      <div style={{ height: '8px', background: '#E5EBF0', borderRadius: '4px', overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${o.percentage}%`, background: o.color === '#EA2143' ? '#E8171F' : o.color === '#E89558' ? '#B86E00' : o.color === '#07CA6B' ? '#07874A' : '#E8171F', borderRadius: '4px', transition: 'width 0.5s ease' }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Factors */}
              <div style={{ background: '#FFFFFF', borderRadius: '4px', padding: '28px', border: '1px solid #D5D8DC', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
                <h3 className="font-display" style={{ fontSize: '15px', fontWeight: 700, color: '#212529', margin: '0 0 16px' }}>
                  Key Analysis Factors
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {p.keyFactors.map((f, i) => (
                    <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#E8171F" strokeWidth="2.5" style={{ flexShrink: 0, marginTop: '2px' }}>
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span style={{ fontSize: '13px', color: '#455A64', lineHeight: 1.5 }}>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Disclaimer */}
              <div style={{ padding: '14px 18px', backgroundColor: 'rgba(184,110,0,0.08)', border: '1px solid #D5D8DC', borderRadius: '4px' }}>
                <p style={{ fontSize: '11px', color: '#B86E00', margin: 0, lineHeight: 1.5 }}>
                  <strong>Disclaimer:</strong> {result.disclaimer}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
