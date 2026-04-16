'use'client';

import'{ useState, useEffect } from 'react';
import'Link from 'next/link';
import'{ REAL_DATA } from '../../../lib/realdata';

type'JudgeData = {
' name: string;
' appointed: number;
' appointedBy: string;
' senior: boolean;
' casesHandled: number;
' plaintiffWinRate: number;
' settlementRate: number;
' medianDurationMonths: number;
' dismissalRate: number;
' trialRate: number;
' motionGrantRate: number;
' topCaseTypes: { nos: string; label: string; count: number }[];
};

type'JudgeResponse = {
' state: string;
' stateLabel: string;
' judges: JudgeData[];
' disclaimer: string;
};

type'AvailableState = { id: string; label: string };

const'StatBadge = ({ label, value, color }: { label: string; value: string; color: string }) => (
' <div style={{ textAlign: 'center' }}>
'   <div className="font-mono" style={{ fontSize: '22px', fontWeight: 600, color }}>{value}</div>
'   <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)', fontWeight: 500, textTransform: 'uppercase' as const, letterSpacing: '0.5px', marginTop: '2px' }}>{label}</div>
' </div>
);

const'MeterBar = ({ value, max, color, label }: { value: number; max: number; color: string; label: string }) => (
' <div style={{ marginBottom: '8px' }}>
'   <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
'     <span style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>{label}</span>
'     <span className="font-mono" style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-text-primary)' }}>{value}%</span>
'   </div>
'   <div style={{ height: '6px', background: 'var(--border-default)', borderRadius: '8px', overflow: 'hidden' }}>
'     <div style={{ height: '100%', width: `${(value / max) * 100}%`, background: color, borderRadius: '8px', transition: 'width 0.5s ease' }} />
'   </div>
' </div>
);

export'default function JudgeIntelligencePage() {
' // Inline styles for focus states
' const focusStyle = `
'   select:focus, input:focus {
'     outline: none;
'     border-color: var(--accent-primary);
'     box-shadow: 0 0 0 2px rgba(232, 23, 31, 0.08);
'   }
' `;

' const [states, setStates] = useState<AvailableState[]>([]);
' const [selectedState, setSelectedState] = useState('');
' const [data, setData] = useState<JudgeResponse | null>(null);
' const [loading, setLoading] = useState(false);
' const [error, setError] = useState('');
' const [expandedJudge, setExpandedJudge] = useState<string | null>(null);
' const [sortBy, setSortBy] = useState<'name' | 'winRate' | 'settlementRate' | 'duration'>('winRate');

' // Load available states
' useEffect(() => {
'   fetch('/api/attorney/judge-intelligence')
'     .then((r) => r.json())
'     .then((d) => setStates(d.states || []))
'     .catch(() => {});
' }, []);

' async function loadJudges(stateId: string) {
'   setLoading(true);
'   setError('');
'   setData(null);
'   setExpandedJudge(null);

'   try {
'     const res = await fetch(`/api/attorney/judge-intelligence?state=${stateId}`);
'     if (!res.ok) {
'       const errData = await res.json();
'       setError(errData.error || 'Failed to load judge data');
'     } else {
'       const result = await res.json();
'       setData(result);
'     }
'   } catch {
'     setError('Network error. Please try again.');
'   }
'   setLoading(false);
' }

' function handleStateChange(stateId: string) {
'   setSelectedState(stateId);
'   if (stateId) loadJudges(stateId);
'   else setData(null);
' }

' // Sort judges
' const sortedJudges = data?.judges
'   ? [...data.judges].sort((a, b) => {
'       switch (sortBy) {
'         case 'name': return a.name.localeCompare(b.name);
'         case 'winRate': return b.plaintiffWinRate - a.plaintiffWinRate;
'         case 'settlementRate': return b.settlementRate - a.settlementRate;
'         case 'duration': return a.medianDurationMonths - b.medianDurationMonths;
'         default: return 0;
'       }
'     })
'   : [];

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
'           Home &gt; Attorney Tools &gt; Judge Intelligence
'         </Link>
'         <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
'           <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(10, 102, 194, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
'             <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" strokeWidth="2">
'               <path d="M12 2v20M2 10h20M4 10l3 8h10l3-8" />
'               <line x1="12" y1="10" x2="12" y2="18" />
'             </svg>
'           </div>
'           <div>
'             <h1 className="font-display" style={{ fontSize: '24px', fontWeight: 600, color: 'var(--color-surface-0)', margin: 0 }}>
'               Know Your Judge Before the Courtroom
'             </h1>
'           </div>
'         </div>
'       </div>
'     </div>

'     <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '32px 20px' }}>
'       {/* Controls */}
'       <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', flexWrap: 'wrap', alignItems: 'center' }}>
'         <div style={{ flex: '1 1 240px' }}>
'           <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--color-text-secondary)', textTransform: 'uppercase' as const, letterSpacing: '0.5px', marginBottom: '6px' }}>
'             Select District
'           </label>
'           <select
'             value={selectedState}
'             onChange={(e) => handleStateChange(e.target.value)}
'             style={{
'               width: '100%',
'               padding: '12px 14px',
'               height: '48px',
'               border: '1px solid var(--border-default)',
'               borderRadius: '12px',
'               fontSize: '14px',
'               color: 'var(--color-text-primary)',
'               background: 'var(--color-surface-0)',
'               cursor: 'pointer',
'               fontFamily: 'var(--font-body)',
'               transition: 'border-color 0.2s',
'             }}
'           >
'             <option value="">Choose a state...</option>
'             {states.map((s) => (
'               <option key={s.id} value={s.id}>{s.label}</option>
'             ))}
'           </select>
'         </div>

'         {data && (
'           <div style={{ flex: '0 0 auto' }}>
'             <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--color-text-secondary)', textTransform: 'uppercase' as const, letterSpacing: '0.5px', marginBottom: '6px' }}>
'               Sort By
'             </label>
'             <div style={{ display: 'flex', gap: '4px', background: 'var(--color-surface-0)', borderRadius: '12px', border: '1px solid var(--border-default)', padding: '3px' }}>
'               {([
'                 { key: 'winRate', label: 'Win Rate' },
'                 { key: 'settlementRate', label: 'Settlement' },
'                 { key: 'duration', label: 'Duration' },
'                 { key: 'name', label: 'Name' },
'               ] as const).map((opt) => (
'                 <button
'                   key={opt.key}
'                   onClick={() => setSortBy(opt.key)}
'                   style={{
'                     padding: '6px 12px',
'                     borderRadius: '12px',
'                     border: 'none',
'                     fontSize: '12px',
'                     fontWeight: 600,
'                     cursor: 'pointer',
'                     textTransform: 'uppercase',
'                     letterSpacing: '0.04em',
'                     backgroundColor: sortBy === opt.key ? 'var(--accent-primary)' : 'transparent',
'                     color: sortBy === opt.key ? 'var(--color-surface-0)' : 'var(--color-text-secondary)',
'                     transition: 'all 0.2s',
'                   }}
'                 >
'                   {opt.label}
'                 </button>
'               ))}
'             </div>
'           </div>
'         )}
'       </div>

'       {/* Loading */}
'       {loading && (
'         <div style={{ textAlign: 'center', padding: '64px 0' }}>
'           <div style={{ width: 36, height: 36, border: '3px solid var(--border-default)', borderTopColor: 'var(--accent-primary)', borderRadius: '50%', animation: 'spin 0.6s linear infinite', margin: '0 auto 16px' }} />
'           <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
'           <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>Loading judge data...</p>
'         </div>
'       )}

'       {/* Error */}
'       {error && (
'         <div style={{ backgroundColor: 'rgba(204,16,25,0.08)', border: '1px solid var(--border-default)', borderRadius: '12px', padding: '20px 24px', marginBottom: '24px' }}>
'           <p style={{ fontSize: '14px', color: 'var(--accent-primary)', margin: 0 }}>{error}</p>
'         </div>
'       )}

'       {/* Empty state */}
'       {!selectedState && !loading && (
'         <div style={{ background: 'var(--color-surface-0)', border: '1px solid var(--border-default)', borderRadius: '12px', padding: '64px 32px', textAlign: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
'           <div style={{ width: '64px', height: '64px', borderRadius: '12px', background: 'rgba(0,105,151,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
'             <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" strokeWidth="2">
'               <path d="M12 2v20M2 10h20M4 10l3 8h10l3-8" />
'             </svg>
'           </div>
'           <h2 className="font-display" style={{ fontSize: '22px', fontWeight: 600, color: 'var(--color-text-primary)', margin: '0 0 12px' }}>
'             Select a District
'           </h2>
'           <p style={{ fontSize: '15px', color: 'var(--color-text-secondary)', lineHeight: 1.6, maxWidth: '400px', margin: '0 auto' }}>
'             Choose a state above to view federal judge statistics, ruling patterns, and case tendencies.
'           </p>
'           <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginTop: '24px', flexWrap: 'wrap' }}>
'             {states.slice(0, 6).map((s) => (
'               <button
'                 key={s.id}
'                 onClick={() => handleStateChange(s.id)}
'                 style={{ padding: '8px 16px', border: '1px solid var(--border-default)', borderRadius: '12px', fontSize: '13px', fontWeight: 500, cursor: 'pointer', background: '#FAFBFC', color: 'var(--accent-primary)', transition: 'border-color 0.2s' }}
'               >
'                 {s.label}
'               </button>
'             ))}
'           </div>
'         </div>
'       )}

'       {/* Judge Cards */}
'       {data && sortedJudges.length > 0 && (
'         <>
'           <div style={{ marginBottom: '16px' }}>
'             <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>
'               Showing {sortedJudges.length} federal judges in {data.stateLabel}
'             </p>
'           </div>

'           <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
'             {sortedJudges.map((judge) => {
'               const isExpanded = expandedJudge === judge.name;
'               return (
'                 <div
'                   key={judge.name}
'                   style={{
'                     background: 'var(--color-surface-0)',
'                     borderRadius: '12px',
'                     border: isExpanded ? '2px solid var(--accent-primary)' : '1px solid var(--border-default)',
'                     overflow: 'hidden',
'                     transition: 'border-color 0.2s, box-shadow 0.2s',
'                     boxShadow: isExpanded ? '0 4px 12px rgba(0,0,0,0.12)' : '0 1px 3px rgba(0,0,0,0.08)',
'                   }}
'                 >
'                   {/* Judge Header */}
'                   <button
'                     onClick={() => setExpandedJudge(isExpanded ? null : judge.name)}
'                     style={{
'                       width: '100%',
'                       padding: '20px 24px',
'                       border: 'none',
'                       background: 'none',
'                       cursor: 'pointer',
'                       textAlign: 'left',
'                       display: 'flex',
'                       justifyContent: 'space-between',
'                       alignItems: 'center',
'                       gap: '16px',
'                     }}
'                   >
'                     <div style={{ flex: 1 }}>
'                       <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
'                         <span className="font-display" style={{ fontSize: '17px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
'                           {judge.name}
'                         </span>
'                         {judge.senior && (
'                           <span style={{ fontSize: '10px', fontWeight: 600, textTransform: 'uppercase' as const, letterSpacing: '0.5px', padding: '2px 8px', borderRadius: '12px', backgroundColor: 'rgba(184,110,0,0.08)', color: '#B86E00' }}>
'                             Senior
'                           </span>
'                         )}
'                       </div>
'                       <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', margin: 0 }}>
'                         Appointed {judge.appointed} by {judge.appointedBy} · {judge.casesHandled} cases handled
'                       </p>
'                     </div>

'                     <div style={{ display: 'flex', gap: '24px', alignItems: 'center', flexShrink: 0 }}>
'                       <StatBadge label="Win Rate" value={`${judge.plaintiffWinRate}%`} color={judge.plaintiffWinRate >= 55 ? '#059669' : judge.plaintiffWinRate >= 40 ? '#B86E00' : 'var(--accent-primary)'} />
'                       <StatBadge label="Settlement" value={`${judge.settlementRate}%`} color="#1B7C7D" />
'                       <StatBadge label="Duration" value={`${judge.medianDurationMonths}mo`} color="var(--color-text-primary)" />
'                       <svg
'                         width="18"
'                         height="18"
'                         viewBox="0 0 24 24"
'                         fill="none"
'                         stroke="var(--color-text-secondary)"
'                         strokeWidth="2"
'                         style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}
'                       >
'                         <polyline points="6 9 12 15 18 9" />
'                       </svg>
'                     </div>
'                   </button>

'                   {/* Expanded Details */}
'                   {isExpanded && (
'                     <div style={{ padding: '0 24px 24px', borderTop: '1px solid var(--border-default)' }}>
'                       <div style={{ paddingTop: '20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
'                         {/* Ruling Patterns */}
'                         <div>
'                           <h4 className="font-display" style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-primary)', margin: '0 0 16px', textTransform: 'uppercase' as const, letterSpacing: '0.5px' }}>
'                             Ruling Patterns
'                           </h4>
'                           <MeterBar value={judge.plaintiffWinRate} max={100} color="#059669" label="Favorable Outcome Rate" />
'                           <MeterBar value={judge.settlementRate} max={100} color="#1B7C7D" label="Settlement Rate" />
'                           <MeterBar value={judge.dismissalRate} max={100} color="var(--accent-primary)" label="Dismissal Rate" />
'                           <MeterBar value={judge.trialRate} max={100} color='var(--accent-primary)' label="Trial Rate" />
'                           <MeterBar value={judge.motionGrantRate} max={100} color="#004D80" label="Motion Grant Rate" />
'                         </div>

'                         {/* Judge Profile */}
'                         <div>
'                           <h4 className="font-display" style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-primary)', margin: '0 0 16px', textTransform: 'uppercase' as const, letterSpacing: '0.5px' }}>
'                             Profile
'                           </h4>
'                           <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
'                             {[
'                               { label: 'Appointed', value: `${judge.appointed} by Pres. ${judge.appointedBy}` },
'                               { label: 'Status', value: judge.senior ? 'Senior Status' : 'Active' },
'                               { label: 'Cases Handled', value: judge.casesHandled.toLocaleString() },
'                               { label: 'Median Duration', value: `${judge.medianDurationMonths} months` },
'                             ].map((item) => (
'                               <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--border-default)' }}>
'                                 <span style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>{item.label}</span>
'                                 <span className="font-mono" style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-primary)' }}>{item.value}</span>
'                               </div>
'                             ))}
'                           </div>

'                           <h4 className="font-display" style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-primary)', margin: '20px 0 12px', textTransform: 'uppercase' as const, letterSpacing: '0.5px' }}>
'                             Top Case Types
'                           </h4>
'                           <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
'                             {judge.topCaseTypes.map((ct) => (
'                               <div key={ct.nos} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0' }}>
'                                 <span style={{ fontSize: '13px', color: 'var(--color-text-primary)' }}>{ct.label}</span>
'                                 <span className="font-mono" style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>{ct.count} cases</span>
'                               </div>
'                             ))}
'                           </div>
'                         </div>
'                       </div>
'                     </div>
'                   )}
'                 </div>
'               );
'             })}
'           </div>

'           {/* Disclaimer */}
'           <div style={{ marginTop: '24px', padding: '20px 20px', backgroundColor: 'rgba(184,110,0,0.08)', border: '1px solid var(--border-default)', borderRadius: '12px' }}>
'             <p style={{ fontSize: '12px', color: '#B86E00', margin: 0, lineHeight: 1.5 }}>
'               <strong>Disclaimer:</strong> {data.disclaimer}
'             </p>
'           </div>
'         </>
'       )}
'     </div>
'   </div>
' );
}
