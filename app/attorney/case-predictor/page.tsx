'use'client';

import'{ useState } from 'react';
import'Link from 'next/link';
import'{ SITS, STATES } from '../../../lib/data';
import'{ REAL_DATA } from '../../../lib/realdata';

type'Prediction = {
' caseType: string;
' nosCode: string;
' predictedWinRate: number;
' predictedSettlementRate: number;
' predictedDurationMonths: number;
' settlementRange: { low: number; median: number; high: number };
' outcomes: { label: string; percentage: number; color: string }[];
' confidence: string;
' sampleSize: number;
' keyFactors: string[];
' statuteOfLimitations: string;
' typicalFeeRange: string;
' aiInsights?: string;
};

type'PredictionResponse = {
' prediction: Prediction;
' disclaimer: string;
};

const'formatMoney = (k: number) => {
' if (k === 0) return '< $1,000';
' if (k >= 1000) return `$${(k / 1000).toFixed(1)}M`;
' return `$${k}K`;
};

const'ScoreRing = ({ value, label, color, size = 80 }: { value: number; label: string; color: string; size?: number }) => {
' const r = (size - 8) / 2;
' const circ = 2 * Math.PI * r;
' const offset = circ * (1 - value / 100);
' return (
'   <div style={{ textAlign: 'center' }}>
'     <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
'       <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--border-default)" strokeWidth="6" />
'       <circle
'         cx={size / 2}
'         cy={size / 2}
'         r={r}
'         fill="none"
'         stroke={color}
'         strokeWidth="6"
'         strokeLinecap="round"
'         strokeDasharray={circ}
'         strokeDashoffset={offset}
'         transform={`rotate(-90 ${size / 2} ${size / 2})`}
'         style={{ transition: 'stroke-dashoffset 0.8s ease' }}
'       />
'       <text x={size / 2} y={size / 2 + 1} textAnchor="middle" dominantBaseline="middle" fontSize="18" fontWeight="700" fontFamily="var(--font-mono)" fill="var(--color-text-primary)">
'         {value}%
'       </text>
'     </svg>
'     <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)', fontWeight: 600, textTransform: 'uppercase' as const, letterSpacing: '0.5px', marginTop: '4px' }}>{label}</div>
'   </div>
' );
};

export'default function CasePredictorPage() {
' // Form state
' const [caseCategory, setCaseCategory] = useState('');

' // Inline styles for focus states
' const focusStyle = `
'   select:focus, input:focus {
'     outline: none;
'     border-color: var(--accent-primary);
'     box-shadow: 0 0 0 2px rgba(232, 23, 31, 0.08);
'   }
' `;
' const [caseType, setCaseType] = useState('');
' const [state, setState] = useState('');
' const [hasAttorney, setHasAttorney] = useState(true);
' const [damageAmount, setDamageAmount] = useState('mid');
' const [caseStrength, setCaseStrength] = useState('moderate');
' const [priorOffers, setPriorOffers] = useState(false);
' const [documentedEvidence, setDocumentedEvidence] = useState(true);

' // Result state
' const [result, setResult] = useState<PredictionResponse | null>(null);
' const [loading, setLoading] = useState(false);
' const [error, setError] = useState('');

' const selectedCategory = SITS.find((s) => s.id === caseCategory);
' const caseOptions = selectedCategory?.opts || [];

' async function handlePredict(e: React.FormEvent) {
'   e.preventDefault();
'   if (!caseType) {
'     setError('Please select a case type');
'     return;
'   }
'   setLoading(true);
'   setError('');
'   setResult(null);

'   try {
'     const res = await fetch('/api/attorney/case-predictor', {
'       method: 'POST',
'       headers: { 'Content-Type': 'application/json' },
'       body: JSON.stringify({
'         caseType,
'         state,
'         hasAttorney,
'         damageAmount,
'         caseStrength,
'         priorOffers,
'         documentedEvidence,
'       }),
'     });

'     if (!res.ok) {
'       const errData = await res.json();
'       setError(errData.error || 'Prediction failed');
'     } else {
'       const data = await res.json();
'       setResult(data);
'     }
'   } catch {
'     setError('Network error. Please try again.');
'   }
'   setLoading(false);
' }

' const p = result?.prediction;

' const selectStyle: React.CSSProperties = {
'   width: '100%',
'   padding: '12px 14px',
'   height: '48px',
'   border: '1px solid var(--border-default)',
'   borderRadius: '12px',
'   fontSize: '14px',
'   color: 'var(--color-text-primary)',
'   backgroundColor: 'var(--color-surface-0)',
'   fontFamily: 'var(--font-body)',
'   transition: 'border-color 0.2s',
' };

' const labelStyle: React.CSSProperties = {
'   display: 'block',
'   fontSize: '13px',
'   fontWeight: 600,
'   color: 'var(--color-text-primary)',
'   marginBottom: '6px',
' };

' return (
'   <div style={{ minHeight: '100vh', background: 'var(--color-surface-1)', fontFamily: 'var(--font-body)' }}>
'     <style>{focusStyle}
'       {`
'       button:hover:not(:disabled) { opacity: 0.9; transform: translateY(-1px); }
'       a:hover { text-decoration: underline; }
'       @media (max-width: 640px) { h1 { font-size: clamp(24px, 5vw, 28px); } }
'       `}
'     </style>
'     {/* Header */}
'     <div style={{ background: 'var(--gradient-hero)', borderBottom: '1px solid var(--border-default)', padding: '20px 20px' }}>
'       <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
'         <Link href="/" style={{ fontSize: '13px', color: 'var(--accent-primary)', textDecoration: 'none', fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: '4px', marginBottom: '12px' }}>
'           <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
'           Home &gt; Attorney Tools &gt; Case Predictor
'         </Link>
'         <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
'           <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(10, 102, 194, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
'             <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" strokeWidth="2">
'               <circle cx="12" cy="12" r="10" />
'               <path d="M8 10h.01M16 10h.01" />
'               <path d="M9 16c1-1 3-1 6 0" />
'             </svg>
'           </div>
'           <div>
'             <h1 className="font-display" style={{ fontSize: '24px', fontWeight: 600, color: 'var(--color-text-inverse)', margin: 0 }}>
'               Forecast Your Case Outcome with Confidence
'             </h1>
'           </div>
'         </div>
'       </div>
'     </div>

'     <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '32px 20px' }}>
'       {/* How It Works Section */}
'       <div style={{ background: 'var(--color-surface-0)', borderRadius: '12px', padding: '32px', border: '1px solid var(--border-default)', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', marginBottom: '32px' }}>
'         <h2 className="font-display" style={{ fontSize: '20px', fontWeight: 600, color: 'var(--color-text-primary)', margin: '0 0 24px' }}>
'           How It Works
'         </h2>
'         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '28px' }}>
'           <div style={{ display: 'flex', gap: '16px' }}>
'             <div style={{ minWidth: '48px', height: '48px', borderRadius: '50%', background: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-inverse)', fontWeight: 600, fontSize: '18px' }}>
'               1
'             </div>
'             <div>
'               <h3 className="font-display" style={{ fontSize: '15px', fontWeight: 600, color: 'var(--color-text-primary)', margin: '0 0 8px' }}>
'                 Enter Case Details
'               </h3>
'               <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', lineHeight: 1.6, margin: 0 }}>
'                 Select your case type, jurisdiction, damages amount, and case strength to provide context.
'               </p>
'             </div>
'           </div>
'           <div style={{ display: 'flex', gap: '16px' }}>
'             <div style={{ minWidth: '48px', height: '48px', borderRadius: '50%', background: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-inverse)', fontWeight: 600, fontSize: '18px' }}>
'               2
'             </div>
'             <div>
'               <h3 className="font-display" style={{ fontSize: '15px', fontWeight: 600, color: 'var(--color-text-primary)', margin: '0 0 8px' }}>
'                 AI Analysis
'               </h3>
'               <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', lineHeight: 1.6, margin: 0 }}>
'                 Our system analyzes 4M+ historical federal cases to predict outcomes with confidence scoring.
'               </p>
'             </div>
'           </div>
'           <div style={{ display: 'flex', gap: '16px' }}>
'             <div style={{ minWidth: '48px', height: '48px', borderRadius: '50%', background: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-inverse)', fontWeight: 600, fontSize: '18px' }}>
'               3
'             </div>
'             <div>
'               <h3 className="font-display" style={{ fontSize: '15px', fontWeight: 600, color: 'var(--color-text-primary)', margin: '0 0 8px' }}>
'                 Get Insights
'               </h3>
'               <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', lineHeight: 1.6, margin: 0 }}>
'                 Receive win rate, settlement range, duration forecast, and key factors influencing your case.
'               </p>
'             </div>
'           </div>
'         </div>
'       </div>

'       {/* Data-Driven Insights */}
'       <div style={{ background: 'linear-gradient(135deg, var(--accent-primary) 0%, #003366 100%)', borderRadius: '12px', padding: '32px', border: '1px solid var(--border-default)', marginBottom: '32px', color: 'var(--color-text-inverse)' }}>
'         <h2 className="font-display" style={{ fontSize: '20px', fontWeight: 600, color: 'var(--color-text-inverse)', margin: '0 0 24px' }}>
'           Federal Court Data at Your Fingertips
'         </h2>
'         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
'           <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: '12px', padding: '20px', border: '1px solid rgba(255,255,255,0.10)' }}>
'             <div className="font-mono" style={{ fontSize: '28px', fontWeight: 600, color: 'var(--color-text-inverse)', margin: '0 0 8px' }}>
'               5.1M+
'             </div>
'             <div style={{ fontSize: '13px', color: '#B0B5BA' }}>Federal cases analyzed</div>
'           </div>
'           <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: '12px', padding: '20px', border: '1px solid rgba(255,255,255,0.10)' }}>
'             <div className="font-mono" style={{ fontSize: '28px', fontWeight: 600, color: 'var(--color-text-inverse)', margin: '0 0 8px' }}>
'               84
'             </div>
'             <div style={{ fontSize: '13px', color: '#B0B5BA' }}>Nature of suit codes</div>
'           </div>
'           <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: '12px', padding: '20px', border: '1px solid rgba(255,255,255,0.10)' }}>
'             <div className="font-mono" style={{ fontSize: '28px', fontWeight: 600, color: 'var(--color-text-inverse)', margin: '0 0 8px' }}>
'               All 50
'             </div>
'             <div style={{ fontSize: '13px', color: '#B0B5BA' }}>States covered</div>
'           </div>
'           <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: '12px', padding: '20px', border: '1px solid rgba(255,255,255,0.10)' }}>
'             <div className="font-mono" style={{ fontSize: '28px', fontWeight: 600, color: 'var(--color-text-inverse)', margin: '0 0 8px' }}>
'               AI-Powered
'             </div>
'             <div style={{ fontSize: '13px', color: '#B0B5BA' }}>Predictions & analysis</div>
'           </div>
'         </div>
'       </div>

'       <div style={{ display: 'grid', gridTemplateColumns: p ? '1fr 1fr' : '1fr', gap: '24px' }}>
'         {/* Input Form */}
'         <div style={{ background: 'var(--color-surface-0)', borderRadius: '12px', padding: '28px', border: '1px solid var(--border-default)', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
'           <h2 className="font-display" style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-text-primary)', margin: '0 0 24px' }}>
'             Case Details
'           </h2>

'           <form onSubmit={handlePredict}>
'             <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
'               {/* Case Category */}
'               <div>
'                 <label style={labelStyle}>Case Category</label>
'                 <select
'                   value={caseCategory}
'                   onChange={(e) => { setCaseCategory(e.target.value); setCaseType(''); }}
'                   style={selectStyle}
'                 >
'                   <option value="">Select category...</option>
'                   {SITS.map((s) => (
'                     <option key={s.id} value={s.id}>{s.label} — {s.sub}</option>
'                   ))}
'                 </select>
'               </div>

'               {/* Specific Case Type */}
'               {caseCategory && (
'                 <div>
'                   <label style={labelStyle}>Specific Case Type</label>
'                   <select value={caseType} onChange={(e) => setCaseType(e.target.value)} style={selectStyle}>
'                     <option value="">Select type...</option>
'                     {caseOptions.map((opt) => (
'                       <option key={opt.label} value={opt.nos}>{opt.label}</option>
'                     ))}
'                   </select>
'                 </div>
'               )}

'               {/* State */}
'               <div>
'                 <label style={labelStyle}>Filing State</label>
'                 <select value={state} onChange={(e) => setState(e.target.value)} style={selectStyle}>
'                   {STATES.map((s) => (
'                     <option key={s.id} value={s.id}>{s.label}</option>
'                   ))}
'                 </select>
'               </div>

'               {/* Has Attorney */}
'               <div>
'                 <label style={labelStyle}>Representation</label>
'                 <div style={{ display: 'flex', gap: '8px' }}>
'                   {[
'                     { val: true, label: 'Attorney Represented' },
'                     { val: false, label: 'Pro Se (Self)' },
'                   ].map((opt) => (
'                     <button
'                       key={String(opt.val)}
'                       type="button"
'                       onClick={() => setHasAttorney(opt.val)}
'                       style={{
'                         flex: 1,
'                         padding: '10px',
'                         borderRadius: '12px',
'                         border: `1px solid ${hasAttorney === opt.val ? 'var(--accent-primary)' : 'var(--border-default)'}`,
'                         backgroundColor: hasAttorney === opt.val ? 'rgba(10, 102, 194, 0.08)' : '#FAFBFC',
'                         color: hasAttorney === opt.val ? 'var(--accent-primary)' : 'var(--color-text-secondary)',
'                         fontSize: '13px',
'                         fontWeight: 600,
'                         cursor: 'pointer',
'                         transition: 'all 0.2s',
'                       }}
'                     >
'                       {opt.label}
'                     </button>
'                   ))}
'                 </div>
'               </div>

'               {/* Damage Amount */}
'               <div>
'                 <label style={labelStyle}>Estimated Damages</label>
'                 <select value={damageAmount} onChange={(e) => setDamageAmount(e.target.value)} style={selectStyle}>
'                   <option value="small">Under $10,000</option>
'                   <option value="mid">$10,000 – $75,000</option>
'                   <option value="large">$75,000 – $150,000</option>
'                   <option value="xlarge">$150,000 – $500,000</option>
'                   <option value="huge">Over $500,000</option>
'                 </select>
'               </div>

'               {/* Case Strength */}
'               <div>
'                 <label style={labelStyle}>Case Strength Assessment</label>
'                 <div style={{ display: 'flex', gap: '8px' }}>
'                   {[
'                     { val: 'weak', label: 'Weak', color: '#EA2143' },
'                     { val: 'moderate', label: 'Moderate', color: '#E89558' },
'                     { val: 'strong', label: 'Strong', color: '#059669' },
'                   ].map((opt) => (
'                     <button
'                       key={opt.val}
'                       type="button"
'                       onClick={() => setCaseStrength(opt.val)}
'                       style={{
'                         flex: 1,
'                         padding: '10px',
'                         borderRadius: '12px',
'                         border: `1px solid ${caseStrength === opt.val ? opt.color : 'var(--border-default)'}`,
'                         backgroundColor: caseStrength === opt.val ? `${opt.color}15` : '#FAFBFC',
'                         color: caseStrength === opt.val ? opt.color === '#EA2143' ? 'var(--accent-primary)' : opt.color === '#E89558' ? '#B86E00' : '#059669' : 'var(--color-text-secondary)',
'                         fontSize: '13px',
'                         fontWeight: 600,
'                         cursor: 'pointer',
'                         transition: 'all 0.2s',
'                       }}
'                     >
'                       {opt.label}
'                     </button>
'                   ))}
'                 </div>
'               </div>

'               {/* Toggles */}
'               <div style={{ display: 'flex', gap: '16px' }}>
'                 <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--color-text-primary)', cursor: 'pointer', flex: 1 }}>
'                   <input
'                     type="checkbox"
'                     checked={priorOffers}
'                     onChange={(e) => setPriorOffers(e.target.checked)}
'                     style={{ width: '16px', height: '16px', accentColor: 'var(--accent-primary)' }}
'                   />
'                   Prior settlement offers
'                 </label>
'                 <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--color-text-primary)', cursor: 'pointer', flex: 1 }}>
'                   <input
'                     type="checkbox"
'                     checked={documentedEvidence}
'                     onChange={(e) => setDocumentedEvidence(e.target.checked)}
'                     style={{ width: '16px', height: '16px', accentColor: 'var(--accent-primary)' }}
'                   />
'                   Documented evidence
'                 </label>
'               </div>

'               {/* Error */}
'               {error && (
'                 <div style={{ padding: '10px 14px', borderRadius: '12px', backgroundColor: 'rgba(204,16,25,0.08)', border: '1px solid var(--border-default)' }}>
'                   <p style={{ fontSize: '13px', color: 'var(--accent-primary)', margin: 0 }}>{error}</p>
'                 </div>
'               )}

'               {/* Submit */}
'               <button
'                 type="submit"
'                 disabled={loading || !caseType}
'                 style={{
'                   width: '100%',
'                   padding: '14px',
'                   backgroundColor: loading || !caseType ? 'var(--border-default)' : 'var(--accent-primary)',
'                   color: 'var(--color-text-inverse)',
'                   border: 'none',
'                   borderRadius: '12px',
'                   fontSize: '15px',
'                   fontWeight: 600,
'                   fontFamily: 'var(--font-display)',
'                   textTransform: 'uppercase',
'                   letterSpacing: '0.04em',
'                   cursor: loading || !caseType ? 'not-allowed' : 'pointer',
'                   transition: 'background-color 0.2s',
'                 }}
'               >
'                 {loading ? 'Analyzing...' : 'Predict Outcome'}
'               </button>
'             </div>
'           </form>
'         </div>

'         {/* Results */}
'         {p && (
'           <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
'             {/* Score Cards */}
'             <div style={{ background: 'var(--color-surface-0)', borderRadius: '12px', padding: '28px', border: '1px solid var(--border-default)', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
'               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
'                 <h2 className="font-display" style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-text-primary)', margin: 0 }}>
'                   Prediction: {p.caseType}
'                 </h2>
'                 <span style={{
'                   padding: '4px 12px',
'                   borderRadius: '12px',
'                   fontSize: '11px',
'                   fontWeight: 600,
'                   backgroundColor: p.confidence === 'High' ? 'rgba(7,132,74,0.08)' : p.confidence === 'Moderate' ? 'rgba(184,110,0,0.08)' : 'rgba(204,16,25,0.08)',
'                   color: p.confidence === 'High' ? '#059669' : p.confidence === 'Moderate' ? '#B86E00' : 'var(--accent-primary)',
'                 }}>
'                   {p.confidence} Confidence
'                 </span>
'               </div>

'               <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '24px' }}>
'                 <ScoreRing value={p.predictedWinRate} label="Win Rate" color={p.predictedWinRate >= 55 ? '#059669' : p.predictedWinRate >= 40 ? '#B86E00' : 'var(--accent-primary)'} />
'                 <ScoreRing value={p.predictedSettlementRate} label="Settlement" color="var(--accent-primary)" />
'                 <div style={{ textAlign: 'center' }}>
'                   <div style={{ width: 80, height: 80, borderRadius: '50%', border: '6px solid var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
'                     <span className="font-mono" style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-text-primary)' }}>{p.predictedDurationMonths}mo</span>
'                   </div>
'                   <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)', fontWeight: 600, textTransform: 'uppercase' as const, letterSpacing: '0.5px', marginTop: '4px' }}>Duration</div>
'                 </div>
'               </div>

'               {/* Settlement Range */}
'               <div style={{ background: '#FAFBFC', borderRadius: '12px', padding: '16px', marginBottom: '16px' }}>
'                 <p style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-text-secondary)', textTransform: 'uppercase' as const, letterSpacing: '0.5px', margin: '0 0 10px' }}>
'                   Projected Settlement Range
'                 </p>
'                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
'                   <div style={{ textAlign: 'center' }}>
'                     <div className="font-mono" style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>{formatMoney(p.settlementRange.low)}</div>
'                     <div style={{ fontSize: '10px', color: 'var(--color-text-secondary)' }}>25th pctile</div>
'                   </div>
'                   <div style={{ textAlign: 'center' }}>
'                     <div className="font-mono" style={{ fontSize: '24px', fontWeight: 600, color: 'var(--color-text-primary)' }}>{formatMoney(p.settlementRange.median)}</div>
'                     <div style={{ fontSize: '10px', color: 'var(--color-text-secondary)' }}>Median</div>
'                   </div>
'                   <div style={{ textAlign: 'center' }}>
'                     <div className="font-mono" style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>{formatMoney(p.settlementRange.high)}</div>
'                     <div style={{ fontSize: '10px', color: 'var(--color-text-secondary)' }}>75th pctile</div>
'                   </div>
'                 </div>
'                 {/* Range bar */}
'                 <div style={{ height: '8px', background: 'var(--border-default)', borderRadius: '12px', marginTop: '12px', position: 'relative' }}>
'                   <div style={{
'                     position: 'absolute',
'                     left: '10%',
'                     right: '10%',
'                     height: '100%',
'                     background: 'linear-gradient(90deg, var(--accent-primary), #059669)',
'                     borderRadius: '12px',
'                   }} />
'                 </div>
'               </div>

'               {/* Quick Stats */}
'               <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
'                 <div style={{ padding: '10px', background: '#FAFBFC', borderRadius: '12px' }}>
'                   <p style={{ fontSize: '11px', color: 'var(--color-text-secondary)', margin: '0 0 2px' }}>Statute of Limitations</p>
'                   <p className="font-mono" style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-primary)', margin: 0 }}>{p.statuteOfLimitations}</p>
'                 </div>
'                 <div style={{ padding: '10px', background: '#FAFBFC', borderRadius: '12px' }}>
'                   <p style={{ fontSize: '11px', color: 'var(--color-text-secondary)', margin: '0 0 2px' }}>Typical Fee Range</p>
'                   <p className="font-mono" style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-primary)', margin: 0 }}>{p.typicalFeeRange}</p>
'                 </div>
'               </div>
'             </div>

'             {/* Outcome Distribution */}
'             <div style={{ background: 'var(--color-surface-0)', borderRadius: '12px', padding: '28px', border: '1px solid var(--border-default)', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
'               <h3 className="font-display" style={{ fontSize: '15px', fontWeight: 600, color: 'var(--color-text-primary)', margin: '0 0 16px' }}>
'                 Predicted Outcome Distribution
'               </h3>
'               <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
'                 {p.outcomes.filter((o) => o.percentage > 1).map((o) => (
'                   <div key={o.label}>
'                     <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
'                       <span style={{ fontSize: '13px', color: 'var(--color-text-primary)' }}>{o.label}</span>
'                       <span className="font-mono" style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-primary)' }}>{o.percentage}%</span>
'                     </div>
'                     <div style={{ height: '8px', background: 'var(--border-default)', borderRadius: '12px', overflow: 'hidden' }}>
'                       <div style={{ height: '100%', width: `${o.percentage}%`, background: o.color === '#EA2143' ? 'var(--accent-primary)' : o.color === '#E89558' ? '#B86E00' : o.color === '#059669' ? '#059669' : 'var(--accent-primary)', borderRadius: '12px', transition: 'width 0.5s ease' }} />
'                     </div>
'                   </div>
'                 ))}
'               </div>
'             </div>

'             {/* Key Factors */}
'             <div style={{ background: 'var(--color-surface-0)', borderRadius: '12px', padding: '28px', border: '1px solid var(--border-default)', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
'               <h3 className="font-display" style={{ fontSize: '15px', fontWeight: 600, color: 'var(--color-text-primary)', margin: '0 0 16px' }}>
'                 Key Analysis Factors
'               </h3>
'               <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
'                 {p.keyFactors.map((f, i) => (
'                   <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
'                     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" strokeWidth="2.5" style={{ flexShrink: 0, marginTop: '2px' }}>
'                       <polyline points="20 6 9 17 4 12" />
'                     </svg>
'                     <span style={{ fontSize: '13px', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>{f}</span>
'                   </div>
'                 ))}
'               </div>
'             </div>

'             {/* AI-Generated Strategic Insights */}
'             {p.aiInsights && (
'               <div style={{ background: 'linear-gradient(135deg, #F0E7FF 0%, #E8D5FF 100%)', borderRadius: '12px', padding: '28px', border: '1px solid #D8BFFF', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
'                 <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
'                   <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--accent-primary)', flexShrink: 0 }}>
'                     <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
'                   </svg>
'                   <h3 className="font-display" style={{ fontSize: '15px', fontWeight: 600, color: 'var(--accent-primary-hover)', margin: '0' }}>
'                     AI Strategic Insights
'                   </h3>
'                 </div>
'                 <div style={{ fontSize: '13px', color: '#5B21B6', lineHeight: 1.7, fontFamily: 'var(--font-body)', whiteSpace: 'pre-wrap' }}>
'                   {p.aiInsights}
'                 </div>
'                 <p style={{ fontSize: '10px', color: '#6B21A8', margin: '12px 0 0', fontFamily: 'var(--font-body)' }}>
'                   AI-generated analysis based on historical patterns. Review with legal judgment.
'                 </p>
'               </div>
'             )}

'             {/* Disclaimer */}
'             <div style={{ padding: '14px 18px', backgroundColor: 'rgba(184,110,0,0.08)', border: '1px solid var(--border-default)', borderRadius: '12px' }}>
'               <p style={{ fontSize: '11px', color: '#B86E00', margin: 0, lineHeight: 1.5 }}>
'                 <strong>Disclaimer:</strong> {result.disclaimer}
'               </p>
'             </div>
'           </div>
'         )}
'       </div>

'       {/* Related Attorney Tools Section */}
'       <div style={{ marginTop: '48px', paddingTop: '32px', borderTop: '2px solid var(--border-default)' }}>
'         <h2 className="font-display" style={{ fontSize: '20px', fontWeight: 600, color: 'var(--color-text-primary)', margin: '0 0 24px' }}>
'           Related Attorney Tools
'         </h2>
'         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
'           <Link href="/attorney/judge-intelligence" style={{ textDecoration: 'none' }}>
'             <div style={{ background: 'var(--color-surface-0)', borderRadius: '12px', padding: '24px', border: '1px solid var(--border-default)', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', transition: 'all 0.2s', cursor: 'pointer' }} onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.12)'; e.currentTarget.style.borderColor = 'var(--accent-primary)'; }} onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.08)'; e.currentTarget.style.borderColor = 'var(--border-default)'; }}>
'               <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(10, 102, 194, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
'                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" strokeWidth="2">
'                   <path d="M12 2v20M2 10h20M4 10l3 8h10l3-8" />
'                 </svg>
'               </div>
'               <h3 className="font-display" style={{ fontSize: '16px', fontWeight: 600, color: 'var(--color-text-primary)', margin: '0 0 8px' }}>
'                 Judge Intelligence
'               </h3>
'               <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', margin: 0, lineHeight: 1.5 }}>
'                 Research federal judges' ruling patterns, settlement tendencies, and historical outcomes.
'               </p>
'             </div>
'           </Link>
'           <Link href="/attorney/venue-optimizer" style={{ textDecoration: 'none' }}>
'             <div style={{ background: 'var(--color-surface-0)', borderRadius: '12px', padding: '24px', border: '1px solid var(--border-default)', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', transition: 'all 0.2s', cursor: 'pointer' }} onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.12)'; e.currentTarget.style.borderColor = 'var(--accent-primary)'; }} onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.08)'; e.currentTarget.style.borderColor = 'var(--border-default)'; }}>
'               <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(10, 102, 194, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
'                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" strokeWidth="2">
'                   <circle cx="12" cy="12" r="10" />
'                   <circle cx="12" cy="12" r="6" />
'                   <circle cx="12" cy="12" r="2" />
'                 </svg>
'               </div>
'               <h3 className="font-display" style={{ fontSize: '16px', fontWeight: 600, color: 'var(--color-text-primary)', margin: '0 0 8px' }}>
'                 Venue Optimizer
'               </h3>
'               <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', margin: 0, lineHeight: 1.5 }}>
'                 Find the optimal filing district by case type, win rates, and settlement data.
'               </p>
'             </div>
'           </Link>
'         </div>
'       </div>

'       {/* Free-During-Beta Badge */}
'       <div style={{ marginTop: '32px', padding: '16px 20px', background: 'linear-gradient(135deg, rgba(21, 128, 61, 0.08) 0%, rgba(21, 128, 61, 0.04) 100%)', border: '1px solid rgba(21, 128, 61, 0.20)', borderRadius: '12px', textAlign: 'center' }}>
'         <span style={{ fontSize: '12px', fontWeight: 600, color: '#059669', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
'           Free During Beta
'         </span>
'       </div>
'     </div>
'   </div>
' );
}
