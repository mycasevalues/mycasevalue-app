'use client';

import { useState } from 'react';
import Link from 'next/link';
import { SITS, STATES } from '../../../lib/data';
import { REAL_DATA } from '../../../lib/realdata';
import { ATTORNEY_IMPACT } from '../../../lib/attorney-impact';
import { getWinRateColor } from '../../../lib/color-scale';

const formatMoney = (v: number) => {
  if (v >= 1000000) return `$${(v / 1000000).toFixed(1)}M`;
  if (v >= 1000) return `$${(v / 1000).toFixed(0)}K`;
  return `$${v.toLocaleString()}`;
};

type NegResults = {
  offerPercentile: number;
  batna: number;
  negotiationRange: { floor: number; target: number; ceiling: number };
  settlementTiming: string;
  talkingPoints: string[];
  winRate: number;
  medianVerdict: number;
  settlementRate: number;
  p25: number;
  p50: number;
  p75: number;
};

export default function NegotiationPage() {
  const [caseCategory, setCaseCategory] = useState('');
  const [caseType, setCaseType] = useState('');
  const [district, setDistrict] = useState('');
  const [currentOffer, setCurrentOffer] = useState('');
  const [litigationCost, setLitigationCost] = useState('');
  const [represented, setRepresented] = useState(true);
  const [caseStrength, setCaseStrength] = useState('moderate');
  const [results, setResults] = useState<NegResults | null>(null);

  const selectedCategory = SITS.find(s => s.id === caseCategory);
  const caseOptions = selectedCategory?.opts || [];

  const handleAnalyze = (e: React.FormEvent) => {
    e.preventDefault();
    if (!caseType) return;

    const data = REAL_DATA[caseType];
    if (!data) return;

    const offer = parseInt(currentOffer) || 0;
    const litCost = parseInt(litigationCost) || 50000;

    const attyData = ATTORNEY_IMPACT[caseType];
    const wr = represented ? (attyData?.rwr || data.wr) : (attyData?.pwr || data.wr * 0.6);

    // Settlement percentiles (stored in thousands)
    const p25 = (data.rng?.lo || 50) * 1000;
    const p50 = (data.rng?.md || 150) * 1000;
    const p75 = (data.rng?.hi || 400) * 1000;

    // Strength multiplier
    const strengthMult = caseStrength === 'strong' ? 1.2 : caseStrength === 'weak' ? 0.7 : 1.0;

    // Offer percentile
    let offerPercentile = 0;
    if (offer <= p25) offerPercentile = Math.round((offer / p25) * 25);
    else if (offer <= p50) offerPercentile = 25 + Math.round(((offer - p25) / (p50 - p25)) * 25);
    else if (offer <= p75) offerPercentile = 50 + Math.round(((offer - p50) / (p75 - p50)) * 25);
    else offerPercentile = Math.min(99, 75 + Math.round(((offer - p75) / (p75 * 0.5)) * 25));

    // BATNA: P(win) × median verdict − litigation costs
    const medianVerdict = p50 * 1.8; // verdicts typically higher than settlements
    const batna = Math.round((wr / 100) * medianVerdict * strengthMult - litCost);

    // Negotiation range
    const floor = Math.max(batna, Math.round(p25 * strengthMult));
    const target = Math.round(p50 * strengthMult);
    const ceiling = Math.round(p75 * strengthMult * 1.1);

    // Settlement timing
    const mo = data.mo || 12;
    let settlementTiming: string;
    if (mo <= 8) settlementTiming = `Cases of this type typically settle within ${mo} months. The median settlement occurs 3-6 months after initial disclosures.`;
    else if (mo <= 14) settlementTiming = `These cases have a typical duration of ${mo} months. Most settlements occur around the discovery cutoff or shortly after expert depositions.`;
    else settlementTiming = `Complex cases of this type average ${mo} months. Peak settlement activity occurs near summary judgment deadlines and 30-60 days before trial.`;

    // Talking points
    const sr = data.sp || 40;
    const nosLabel = caseOptions.find(o => o.nos === caseType)?.label || `NOS ${caseType}`;
    const talkingPoints = [
      `Historical data from ${(data.total || 1000).toLocaleString()} federal ${nosLabel} cases shows a ${sr}% settlement rate. The median settlement is ${formatMoney(p50)}, placing the current offer at the ${offerPercentile}th percentile — ${offerPercentile < 50 ? 'below' : 'above'} the typical resolution range.`,
      `Case win rate for ${represented ? 'represented parties' : 'pro se litigants'} in this case type is ${wr}%. ${represented ? 'With representation,' : 'Without representation,'} the expected value at trial (${Math.round(wr)}% × ${formatMoney(Math.round(medianVerdict))} median verdict) is ${formatMoney(Math.round((wr / 100) * medianVerdict))}, which ${batna > offer ? 'exceeds' : 'is below'} the current offer after litigation costs.`,
      `The BATNA analysis suggests a negotiation floor of ${formatMoney(floor)}. Given the ${caseStrength} case assessment and comparable settlement data, the target settlement should be ${formatMoney(target)} with an aspirational ceiling of ${formatMoney(ceiling)}.`,
    ];

    setResults({
      offerPercentile,
      batna,
      negotiationRange: { floor, target, ceiling },
      settlementTiming,
      talkingPoints,
      winRate: wr,
      medianVerdict: Math.round(medianVerdict),
      settlementRate: sr,
      p25, p50, p75,
    });
  };

  const selectStyle: React.CSSProperties = {
    width: '100%', padding: '12px 14px', height: '48px',
    border: '1px solid var(--bdr)', borderRadius: '4px', fontSize: '14px',
    color: 'var(--text1)', backgroundColor: 'var(--card)', fontFamily: 'var(--font-ui)',
    appearance: 'none' as const,
    backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23212529' d='M6 9L1 4h10z'/%3E%3C/svg%3E\")",
    backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center',
  };

  const r = results;

  return (
    <div style={{ background: 'var(--surf)', minHeight: '100vh', fontFamily: 'var(--font-ui)' }}>
      <style>{`
        select:focus, input:focus { outline: none; border-color: var(--link); box-shadow: var(--shadow-focus); }
        @media (max-width: 768px) {
          .negotiation-form-grid { grid-template-columns: 1fr !important; }
          .negotiation-range-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 480px) {
          .negotiation-page-header { padding: 20px 12px !important; }
        }
      `}</style>

      <div style={{
        background: 'var(--card)',
        color: 'var(--card)',
        padding: '40px 24px 32px',
        position: 'relative',
        overflow: 'hidden',
        borderBottom: '1px solid var(--bdr)',
      }} className="negotiation-page-header">
        <div aria-hidden style={{
          position: 'absolute', inset: 0, opacity: 0.03, pointerEvents: 'none',
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />
        <div style={{ maxWidth: '1080px', margin: '0 auto', position: 'relative' }}>
          <h1 style={{ fontSize: '28px', fontWeight: 700, color: 'var(--chrome-text)', fontFamily: 'var(--font-legal)', margin: '0 0 16px' }}>Negotiate from Strength with Real Trial Data</h1>
          <p style={{ fontSize: '14px', color: 'var(--text3)', margin: 0, lineHeight: 1.6 }}>
            Benchmark offers against 100K+ settlements, calculate your BATNA, and execute a data-backed negotiation strategy
          </p>
        </div>
      </div>

      <div style={{ maxWidth: '1080px', margin: '0 auto', padding: '40px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: r ? '380px 1fr' : '1fr', gap: '24px' }} className="negotiation-form-grid">
          {/* Form */}
          <div style={{ background: 'var(--card)', borderRadius: '4px', padding: '32px', border: '1px solid var(--bdr)' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--text1)', margin: '0 0 24px', fontFamily: 'var(--font-ui)' }}>Case & Offer Details</h2>
            <form onSubmit={handleAnalyze} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label htmlFor="case-category" style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: 'var(--text1)', marginBottom: '6px' }}>Case Category</label>
                <select id="case-category" value={caseCategory} onChange={e => { setCaseCategory(e.target.value); setCaseType(''); setResults(null); }} style={selectStyle}>
                  <option value="">Select category...</option>
                  {SITS.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
                </select>
              </div>
              {caseCategory && (
                <div>
                  <label htmlFor="case-type" style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: 'var(--text1)', marginBottom: '6px' }}>Case Type *</label>
                  <select id="case-type" value={caseType} onChange={e => { setCaseType(e.target.value); setResults(null); }} style={selectStyle}>
                    <option value="">Select type...</option>
                    {caseOptions.map(opt => <option key={opt.label} value={opt.nos}>{opt.label}</option>)}
                  </select>
                </div>
              )}
              <div>
                <label htmlFor="district" style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: 'var(--text1)', marginBottom: '6px' }}>District (optional)</label>
                <select id="district" value={district} onChange={e => setDistrict(e.target.value)} style={selectStyle}>
                  <option value="">All districts</option>
                  {STATES.filter(s => s.id).map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="current-settlement-offer" style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: 'var(--text1)', marginBottom: '6px' }}>Current Settlement Offer ($) *</label>
                <input id="current-settlement-offer" type="number" placeholder="e.g., 75000" value={currentOffer} onChange={e => setCurrentOffer(e.target.value)} style={{ ...selectStyle, appearance: 'auto' as const, backgroundImage: 'none' }} />
              </div>
              <div>
                <label htmlFor="estimated-litigation-cost" style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: 'var(--text1)', marginBottom: '6px' }}>Estimated Litigation Cost to Trial ($)</label>
                <input id="estimated-litigation-cost" type="number" placeholder="e.g., 50000" value={litigationCost} onChange={e => setLitigationCost(e.target.value)} style={{ ...selectStyle, appearance: 'auto' as const, backgroundImage: 'none' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: 'var(--text1)', marginBottom: '6px' }}>Representation</label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {[{ val: true, label: 'Attorney' }, { val: false, label: 'Pro Se' }].map(opt => (
                    <button key={String(opt.val)} type="button" onClick={() => setRepresented(opt.val)} style={{ flex: 1, padding: '8px', borderRadius: '2px', border: `1px solid ${represented === opt.val ? 'var(--link)' : 'var(--bdr)'}`, backgroundColor: represented === opt.val ? 'rgba(10,102,194,0.08)' : 'var(--surf)', color: represented === opt.val ? 'var(--link)' : 'var(--text2)', fontSize: '14px', fontWeight: 600, cursor: 'pointer' }}>
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: 'var(--text1)', marginBottom: '6px' }}>Case Strength</label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {[{ v: 'weak', l: 'Weak', c: 'var(--data-negative)' }, { v: 'moderate', l: 'Moderate', c: 'var(--wrn-txt)' }, { v: 'strong', l: 'Strong', c: 'var(--data-positive)' }].map(opt => (
                    <button key={opt.v} type="button" onClick={() => setCaseStrength(opt.v)} style={{ flex: 1, padding: '8px', borderRadius: '2px', border: `1px solid ${caseStrength === opt.v ? opt.c : 'var(--bdr)'}`, backgroundColor: caseStrength === opt.v ? `${opt.c}15` : 'var(--surf)', color: caseStrength === opt.v ? opt.c : 'var(--text2)', fontSize: '14px', fontWeight: 600, cursor: 'pointer' }}>
                      {opt.l}
                    </button>
                  ))}
                </div>
              </div>
              <button type="submit" disabled={!caseType || !currentOffer} style={{ width: '100%', padding: '16px', backgroundColor: !caseType || !currentOffer ? 'var(--bdr)' : 'var(--link)', color: 'var(--text1)', border: 'none', borderRadius: '2px', fontSize: '14px', fontWeight: 600, fontFamily: 'var(--font-ui)', textTransform: 'uppercase', letterSpacing: '0.5px', cursor: !caseType || !currentOffer ? 'not-allowed' : 'pointer' }}>
                Analyze Negotiation Position
              </button>
            </form>
          </div>

          {/* Results */}
          {r && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Offer Percentile */}
              <div style={{ background: 'var(--card)', borderRadius: '4px', padding: '32px', border: '1px solid var(--bdr)', textAlign: 'center' }}>
                <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text2)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 8 }}>Current Offer Position</div>
                <div style={{ fontSize: '56px', fontWeight: 600, color: getWinRateColor(r.offerPercentile).text, fontFamily: 'var(--font-mono)', lineHeight: 1 }}>
                  {r.offerPercentile}<span style={{ fontSize: '24px' }}>th</span>
                </div>
                <div style={{ fontSize: '14px', color: 'var(--text2)', marginTop: 4 }}>percentile of historical settlements</div>
                <div style={{ marginTop: 16, height: 10, background: 'var(--bdr)', borderRadius: 4, position: 'relative' }}>
                  <div style={{ position: 'absolute', left: `${Math.min(r.offerPercentile, 98)}%`, top: -4, width: 18, height: 18, borderRadius: '50%', background: getWinRateColor(r.offerPercentile).bg, border: '3px solid var(--card)', boxShadow: '0 2px 4px rgba(0,0,0,0.2)', transform: 'translateX(-50%)' }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 16, fontSize: 12, color: 'var(--text2)', fontFamily: 'var(--font-mono)' }}>
                    <span>{formatMoney(r.p25)}</span><span>{formatMoney(r.p50)}</span><span>{formatMoney(r.p75)}</span>
                  </div>
                </div>
              </div>

              {/* BATNA */}
              <div style={{ background: r.batna > parseInt(currentOffer) ? 'rgba(23,100,56,0.08)' : 'rgba(176,30,30,0.08)', borderRadius: '4px', padding: '24px', border: `1px solid ${r.batna > parseInt(currentOffer) ? 'var(--data-positive)' : 'var(--data-negative)'}` }}>
                <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text2)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 8 }}>BATNA (Best Alternative to Negotiated Agreement)</div>
                <div style={{ fontSize: '28px', fontWeight: 600, color: r.batna > parseInt(currentOffer) ? 'var(--data-positive)' : 'var(--data-negative)', fontFamily: 'var(--font-mono)' }}>
                  {formatMoney(r.batna)}
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text2)', marginTop: 4 }}>
                  = {Math.round(r.winRate)}% win rate × {formatMoney(r.medianVerdict)} median verdict − {formatMoney(parseInt(litigationCost) || 50000)} litigation costs
                </div>
                <div style={{ marginTop: 8, fontSize: '14px', fontWeight: 600, color: r.batna > parseInt(currentOffer) ? 'var(--data-positive)' : 'var(--data-negative)' }}>
                  {r.batna > parseInt(currentOffer) ? 'BATNA exceeds current offer — reject and negotiate higher' : 'Current offer exceeds BATNA — consider accepting or negotiating modestly higher'}
                </div>
              </div>

              {/* Negotiation Range */}
              <div style={{ background: 'var(--card)', borderRadius: '4px', padding: '32px', border: '1px solid var(--bdr)' }}>
                <h3 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text1)', margin: '0 0 16px', fontFamily: 'var(--font-ui)' }}>Recommended Negotiation Range</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }} className="negotiation-range-grid">
                  <div style={{ textAlign: 'center', padding: '16px', background: 'rgba(176,30,30,0.08)', borderRadius: 4 }}>
                    <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text2, #525252)', textTransform: 'uppercase', marginBottom: 4 }}>Floor</div>
                    <div style={{ fontSize: '20px', fontWeight: 600, color: 'var(--data-negative)', fontFamily: 'var(--font-mono)' }}>{formatMoney(r.negotiationRange.floor)}</div>
                  </div>
                  <div style={{ textAlign: 'center', padding: '16px', background: 'rgba(10,80,162,0.06)', borderRadius: 4, border: '2px solid var(--link)' }}>
                    <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text2, #525252)', textTransform: 'uppercase', marginBottom: 4 }}>Target</div>
                    <div style={{ fontSize: '20px', fontWeight: 600, color: 'var(--link)', fontFamily: 'var(--font-mono)' }}>{formatMoney(r.negotiationRange.target)}</div>
                  </div>
                  <div style={{ textAlign: 'center', padding: '16px', background: 'rgba(23,100,56,0.08)', borderRadius: 4 }}>
                    <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text2, #525252)', textTransform: 'uppercase', marginBottom: 4 }}>Ceiling</div>
                    <div style={{ fontSize: '20px', fontWeight: 600, color: 'var(--data-positive)', fontFamily: 'var(--font-mono)' }}>{formatMoney(r.negotiationRange.ceiling)}</div>
                  </div>
                </div>
              </div>

              {/* Timing */}
              <div style={{ background: 'var(--card)', borderRadius: '4px', padding: '24px', border: '1px solid var(--bdr)' }}>
                <h3 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text1)', margin: '0 0 16px', fontFamily: 'var(--font-ui)' }}>Settlement Timing Intelligence</h3>
                <p style={{ fontSize: '14px', color: 'var(--text2)', margin: 0, lineHeight: 1.6 }}>{r.settlementTiming}</p>
              </div>

              {/* Talking Points */}
              <div style={{ background: 'var(--card)', borderRadius: '4px', padding: '32px', border: '1px solid var(--bdr)' }}>
                <h3 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text1)', margin: '0 0 16px', fontFamily: 'var(--font-ui)' }}>Negotiation Talking Points</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {r.talkingPoints.map((pt, i) => (
                    <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                      <div style={{ minWidth: 24, height: 24, borderRadius: '50%', background: 'var(--link)', color: 'var(--chrome-text)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 600, marginTop: 2 }}>{i + 1}</div>
                      <p style={{ fontSize: '14px', color: 'var(--text1)', margin: 0, lineHeight: 1.6 }}>{pt}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Disclaimer */}
              <div style={{ padding: '16px', background: 'rgba(122,88,0,0.08)', borderLeft: '3px solid var(--wrn-txt)', borderRadius: 4, fontSize: 12, color: 'var(--wrn-txt)', lineHeight: 1.6 }}>
                <strong>Important:</strong> AI-generated negotiation intelligence — for attorney use only. Historical data provides context but does not predict specific case outcomes. All negotiation strategies should account for case-specific factors not captured in aggregate data.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
