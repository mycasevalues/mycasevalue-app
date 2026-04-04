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
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#F3F4F6" strokeWidth="6" />
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
        <text x={size / 2} y={size / 2 + 1} textAnchor="middle" dominantBaseline="middle" fontSize="18" fontWeight="700" fontFamily="var(--font-mono)" fill="#111111">
          {value}%
        </text>
      </svg>
      <div style={{ fontSize: '11px', color: '#6B7280', fontWeight: 600, textTransform: 'uppercase' as const, letterSpacing: '0.5px', marginTop: '4px' }}>{label}</div>
    </div>
  );
};

export default function CasePredictorPage() {
  // Form state
  const [caseCategory, setCaseCategory] = useState('');
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
    padding: '10px 12px',
    border: '1px solid #E5E7EB',
    borderRadius: '8px',
    fontSize: '14px',
    color: '#111111',
    backgroundColor: '#FFFFFF',
    fontFamily: 'var(--font-body)',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '13px',
    fontWeight: 600,
    color: '#111111',
    marginBottom: '6px',
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F9FAFB', fontFamily: 'var(--font-body)' }}>
      {/* Header */}
      <div style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid #E5E7EB', padding: '32px 20px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <Link href="/attorney" style={{ fontSize: '13px', color: '#8B5CF6', textDecoration: 'none', fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: '4px', marginBottom: '16px' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            Attorney Mode
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#F3E8FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M8 10h.01M16 10h.01" />
                <path d="M9 16c1-1 3-1 6 0" />
              </svg>
            </div>
            <div>
              <h1 className="font-display" style={{ fontSize: '28px', fontWeight: 700, color: '#111111', margin: 0 }}>
                AI Case Outcome Predictor
              </h1>
              <p style={{ fontSize: '14px', color: '#6B7280', margin: '4px 0 0 0' }}>
                Predict case outcomes using historical federal court data and AI analysis
              </p>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '32px 20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: p ? '1fr 1fr' : '1fr', gap: '24px' }}>
          {/* Input Form */}
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', padding: '28px', border: '1px solid #E5E7EB' }}>
            <h2 className="font-display" style={{ fontSize: '18px', fontWeight: 700, color: '#111111', margin: '0 0 24px' }}>
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
                          borderRadius: '8px',
                          border: `1px solid ${hasAttorney === opt.val ? '#8B5CF6' : '#E5E7EB'}`,
                          backgroundColor: hasAttorney === opt.val ? '#F3E8FF' : '#FFFFFF',
                          color: hasAttorney === opt.val ? '#7C3AED' : '#6B7280',
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
                      { val: 'weak', label: 'Weak', color: '#DC2626' },
                      { val: 'moderate', label: 'Moderate', color: '#D97706' },
                      { val: 'strong', label: 'Strong', color: '#16A34A' },
                    ].map((opt) => (
                      <button
                        key={opt.val}
                        type="button"
                        onClick={() => setCaseStrength(opt.val)}
                        style={{
                          flex: 1,
                          padding: '10px',
                          borderRadius: '8px',
                          border: `1px solid ${caseStrength === opt.val ? opt.color : '#E5E7EB'}`,
                          backgroundColor: caseStrength === opt.val ? `${opt.color}10` : '#FFFFFF',
                          color: caseStrength === opt.val ? opt.color : '#6B7280',
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
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#111111', cursor: 'pointer', flex: 1 }}>
                    <input
                      type="checkbox"
                      checked={priorOffers}
                      onChange={(e) => setPriorOffers(e.target.checked)}
                      style={{ width: '16px', height: '16px', accentColor: '#8B5CF6' }}
                    />
                    Prior settlement offers
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#111111', cursor: 'pointer', flex: 1 }}>
                    <input
                      type="checkbox"
                      checked={documentedEvidence}
                      onChange={(e) => setDocumentedEvidence(e.target.checked)}
                      style={{ width: '16px', height: '16px', accentColor: '#8B5CF6' }}
                    />
                    Documented evidence
                  </label>
                </div>

                {/* Error */}
                {error && (
                  <div style={{ padding: '10px 14px', borderRadius: '8px', backgroundColor: '#FEF2F2', border: '1px solid #FECACA' }}>
                    <p style={{ fontSize: '13px', color: '#991B1B', margin: 0 }}>{error}</p>
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading || !caseType}
                  style={{
                    width: '100%',
                    padding: '14px',
                    backgroundColor: loading || !caseType ? '#D1D5DB' : '#8B5CF6',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '15px',
                    fontWeight: 700,
                    fontFamily: 'var(--font-display)',
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
              <div style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', padding: '28px', border: '1px solid #E5E7EB' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <h2 className="font-display" style={{ fontSize: '18px', fontWeight: 700, color: '#111111', margin: 0 }}>
                    Prediction: {p.caseType}
                  </h2>
                  <span style={{
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '11px',
                    fontWeight: 700,
                    backgroundColor: p.confidence === 'High' ? '#ECFDF5' : p.confidence === 'Moderate' ? '#FFFBEB' : '#FEF2F2',
                    color: p.confidence === 'High' ? '#065F46' : p.confidence === 'Moderate' ? '#92400E' : '#991B1B',
                  }}>
                    {p.confidence} Confidence
                  </span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '24px' }}>
                  <ScoreRing value={p.predictedWinRate} label="Win Rate" color={p.predictedWinRate >= 55 ? '#16A34A' : p.predictedWinRate >= 40 ? '#D97706' : '#DC2626'} />
                  <ScoreRing value={p.predictedSettlementRate} label="Settlement" color="#0D9488" />
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ width: 80, height: 80, borderRadius: '50%', border: '6px solid #8B5CF6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span className="font-mono" style={{ fontSize: '18px', fontWeight: 700, color: '#111111' }}>{p.predictedDurationMonths}mo</span>
                    </div>
                    <div style={{ fontSize: '11px', color: '#6B7280', fontWeight: 600, textTransform: 'uppercase' as const, letterSpacing: '0.5px', marginTop: '4px' }}>Duration</div>
                  </div>
                </div>

                {/* Settlement Range */}
                <div style={{ background: '#F9FAFB', borderRadius: '8px', padding: '16px', marginBottom: '16px' }}>
                  <p style={{ fontSize: '12px', fontWeight: 600, color: '#6B7280', textTransform: 'uppercase' as const, letterSpacing: '0.5px', margin: '0 0 10px' }}>
                    Projected Settlement Range
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <div style={{ textAlign: 'center' }}>
                      <div className="font-mono" style={{ fontSize: '14px', color: '#6B7280' }}>{formatMoney(p.settlementRange.low)}</div>
                      <div style={{ fontSize: '10px', color: '#9CA3AF' }}>25th pctile</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div className="font-mono" style={{ fontSize: '24px', fontWeight: 700, color: '#111111' }}>{formatMoney(p.settlementRange.median)}</div>
                      <div style={{ fontSize: '10px', color: '#9CA3AF' }}>Median</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div className="font-mono" style={{ fontSize: '14px', color: '#6B7280' }}>{formatMoney(p.settlementRange.high)}</div>
                      <div style={{ fontSize: '10px', color: '#9CA3AF' }}>75th pctile</div>
                    </div>
                  </div>
                  {/* Range bar */}
                  <div style={{ height: '8px', background: '#E5E7EB', borderRadius: '4px', marginTop: '12px', position: 'relative' }}>
                    <div style={{
                      position: 'absolute',
                      left: '10%',
                      right: '10%',
                      height: '100%',
                      background: 'linear-gradient(90deg, #8B5CF6, #0D9488)',
                      borderRadius: '4px',
                    }} />
                  </div>
                </div>

                {/* Quick Stats */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <div style={{ padding: '10px', background: '#F9FAFB', borderRadius: '8px' }}>
                    <p style={{ fontSize: '11px', color: '#6B7280', margin: '0 0 2px' }}>Statute of Limitations</p>
                    <p className="font-mono" style={{ fontSize: '13px', fontWeight: 600, color: '#111111', margin: 0 }}>{p.statuteOfLimitations}</p>
                  </div>
                  <div style={{ padding: '10px', background: '#F9FAFB', borderRadius: '8px' }}>
                    <p style={{ fontSize: '11px', color: '#6B7280', margin: '0 0 2px' }}>Typical Fee Range</p>
                    <p className="font-mono" style={{ fontSize: '13px', fontWeight: 600, color: '#111111', margin: 0 }}>{p.typicalFeeRange}</p>
                  </div>
                </div>
              </div>

              {/* Outcome Distribution */}
              <div style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', padding: '28px', border: '1px solid #E5E7EB' }}>
                <h3 className="font-display" style={{ fontSize: '15px', fontWeight: 700, color: '#111111', margin: '0 0 16px' }}>
                  Predicted Outcome Distribution
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {p.outcomes.filter((o) => o.percentage > 1).map((o) => (
                    <div key={o.label}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                        <span style={{ fontSize: '13px', color: '#111111' }}>{o.label}</span>
                        <span className="font-mono" style={{ fontSize: '13px', fontWeight: 600, color: '#111111' }}>{o.percentage}%</span>
                      </div>
                      <div style={{ height: '8px', background: '#F3F4F6', borderRadius: '4px', overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${o.percentage}%`, background: o.color, borderRadius: '4px', transition: 'width 0.5s ease' }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Factors */}
              <div style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', padding: '28px', border: '1px solid #E5E7EB' }}>
                <h3 className="font-display" style={{ fontSize: '15px', fontWeight: 700, color: '#111111', margin: '0 0 16px' }}>
                  Key Analysis Factors
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {p.keyFactors.map((f, i) => (
                    <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="2.5" style={{ flexShrink: 0, marginTop: '2px' }}>
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span style={{ fontSize: '13px', color: '#374151', lineHeight: 1.5 }}>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Disclaimer */}
              <div style={{ padding: '14px 18px', backgroundColor: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: '8px' }}>
                <p style={{ fontSize: '11px', color: '#92400E', margin: 0, lineHeight: 1.5 }}>
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
