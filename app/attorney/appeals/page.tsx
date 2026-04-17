'use client';

import { useState } from 'react';
import Link from 'next/link';
import { SITS, STATES } from '../../../lib/data';
import { getWinRateColor } from '../../../lib/color-scale';
import appealRatesData from '../../../data/appeal-rates.json';

const appealRates = appealRatesData as Record<string, { appealRate: number; reversalRate: number; avgDuration: number; grounds: string[] }>;

const TRIAL_OUTCOMES = [
  { value: 'plaintiff_verdict', label: 'Plaintiff Verdict' },
  { value: 'defendant_verdict', label: 'Defendant Verdict' },
  { value: 'sj_defendant', label: 'Summary Judgment for Defendant' },
  { value: 'sj_plaintiff', label: 'Summary Judgment for Plaintiff' },
  { value: 'dismissal', label: 'Dismissal with Prejudice' },
];

export default function AppealsPage() {
  const [caseCategory, setCaseCategory] = useState('');
  const [caseType, setCaseType] = useState('');
  const [district, setDistrict] = useState('');
  const [trialOutcome, setTrialOutcome] = useState('');
  const [timeSinceJudgment, setTimeSinceJudgment] = useState('');
  const [showResult, setShowResult] = useState(false);

  const selectedCategory = SITS.find(s => s.id === caseCategory);
  const caseOptions = selectedCategory?.opts || [];

  const data = caseType ? appealRates[caseType] : null;

  // Adjust appeal probability based on outcome
  let appealProb = data?.appealRate || 15;
  let reversalProb = data?.reversalRate || 18;

  if (trialOutcome === 'sj_defendant') { appealProb = Math.round(appealProb * 1.3); reversalProb = Math.round(reversalProb * 0.8); }
  else if (trialOutcome === 'sj_plaintiff') { appealProb = Math.round(appealProb * 0.9); reversalProb = Math.round(reversalProb * 0.7); }
  else if (trialOutcome === 'dismissal') { appealProb = Math.round(appealProb * 1.4); reversalProb = Math.round(reversalProb * 0.6); }
  else if (trialOutcome === 'plaintiff_verdict') { appealProb = Math.round(appealProb * 1.1); }
  else if (trialOutcome === 'defendant_verdict') { appealProb = Math.round(appealProb * 0.8); }

  // Time factor
  const months = parseInt(timeSinceJudgment) || 0;
  if (months > 0 && months <= 1) appealProb = Math.min(95, Math.round(appealProb * 1.5));
  else if (months > 10) appealProb = Math.round(appealProb * 0.3);

  const selectStyle: React.CSSProperties = {
    width: '100%', padding: '12px 14px', height: '48px',
    border: '1px solid var(--border-default)', borderRadius: '6px', fontSize: '14px',
    color: 'var(--color-text-primary)', backgroundColor: 'var(--color-surface-0)', fontFamily: 'var(--font-body)',
    appearance: 'none' as const,
    backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23212529' d='M6 9L1 4h10z'/%3E%3C/svg%3E\")",
    backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center',
  };

  const grounds = data?.grounds || ['Procedural error', 'Evidentiary ruling', 'Legal standard misapplication'];

  return (
    <div style={{ background: 'var(--color-surface-1)', minHeight: '100vh', fontFamily: 'var(--font-body)' }}>
      <style>{`select:focus, input:focus { outline: none; border-color: var(--accent-primary); box-shadow: 0 0 0 2px rgba(10,102,194,0.08); }`}</style>

      <div style={{
        background: '#FFFFFF',
        color: '#fff',
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
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '4px 10px', marginBottom: 16,
            borderRadius: 999,
            border: '1px solid rgba(59,130,246,0.2)',
            background: 'rgba(59,130,246,0.08)',
            fontFamily: 'var(--font-mono)', fontSize: 10,
            fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase',
            color: '#60a5fa',
          }}>
            <span className="animate-pulse" style={{ width: 4, height: 4, borderRadius: '50%', background: '#22c55e' }} />
            Appeals Analytics
          </div>
          <h1 style={{ fontFamily: 'var(--font-ui)', fontSize: 'clamp(24px, 3.5vw, 30px)', fontWeight: 700, letterSpacing: '-0.025em', lineHeight: 1.1, color: '#FFF', margin: '0 0 12px' }}>Know your reversal odds before you file</h1>
          <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.7)', margin: 0, lineHeight: 1.6, maxWidth: 600 }}>
            Reversal probability and strategic insight — by case type, circuit, and trial outcome — derived from millions of federal appeals.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: '1080px', margin: '0 auto', padding: '40px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: showResult && data ? '380px 1fr' : '1fr', gap: '24px' }}>
          {/* Form */}
          <div style={{ background: 'var(--color-surface-0)', borderRadius: '6px', padding: '28px', border: '1px solid var(--border-default)' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-text-primary)', margin: '0 0 24px', fontFamily: 'var(--font-ui)' }}>Case Information</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '6px' }}>Case Category</label>
                <select value={caseCategory} onChange={e => { setCaseCategory(e.target.value); setCaseType(''); setShowResult(false); }} style={selectStyle}>
                  <option value="">Select category...</option>
                  {SITS.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
                </select>
              </div>
              {caseCategory && (
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '6px' }}>Case Type *</label>
                  <select value={caseType} onChange={e => { setCaseType(e.target.value); setShowResult(true); }} style={selectStyle}>
                    <option value="">Select type...</option>
                    {caseOptions.map(opt => <option key={opt.label} value={opt.nos}>{opt.label}</option>)}
                  </select>
                </div>
              )}
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '6px' }}>District (optional)</label>
                <select value={district} onChange={e => setDistrict(e.target.value)} style={selectStyle}>
                  <option value="">All districts</option>
                  {STATES.filter(s => s.id).map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '6px' }}>Trial Outcome *</label>
                <select value={trialOutcome} onChange={e => setTrialOutcome(e.target.value)} style={selectStyle}>
                  <option value="">Select outcome...</option>
                  {TRIAL_OUTCOMES.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '6px' }}>Months Since Judgment (optional)</label>
                <input type="number" placeholder="e.g., 3" value={timeSinceJudgment} onChange={e => setTimeSinceJudgment(e.target.value)} style={{ ...selectStyle, appearance: 'auto' as const, backgroundImage: 'none' }} />
              </div>
            </div>
          </div>

          {/* Results */}
          {showResult && data && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Appeal Probability */}
              <div style={{ background: 'var(--color-surface-0)', borderRadius: '6px', padding: '32px', border: '1px solid var(--border-default)', textAlign: 'center' }}>
                <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 8 }}>Probability of Appeal</div>
                <div style={{ fontSize: '64px', fontWeight: 600, color: getWinRateColor(appealProb).text, fontFamily: 'var(--font-mono)', lineHeight: 1 }}>
                  {Math.min(95, appealProb)}%
                </div>
                <div style={{ marginTop: 8, display: 'inline-block', padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 600, background: getWinRateColor(appealProb).bg, color: getWinRateColor(appealProb).text }}>
                  {appealProb >= 25 ? 'High Likelihood' : appealProb >= 15 ? 'Moderate Likelihood' : 'Low Likelihood'}
                </div>
              </div>

              {/* Success Rate + Duration */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div style={{ background: 'var(--color-surface-0)', borderRadius: '6px', padding: '24px', border: '1px solid var(--border-default)', textAlign: 'center' }}>
                  <div style={{ fontSize: '10px', fontWeight: 600, color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 6 }}>Reversal Rate</div>
                  <div style={{ fontSize: '36px', fontWeight: 600, color: getWinRateColor(reversalProb).text, fontFamily: 'var(--font-mono)' }}>
                    {reversalProb}%
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)', marginTop: 4 }}>of appeals in this circuit</div>
                </div>
                <div style={{ background: 'var(--color-surface-0)', borderRadius: '6px', padding: '24px', border: '1px solid var(--border-default)', textAlign: 'center' }}>
                  <div style={{ fontSize: '10px', fontWeight: 600, color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 6 }}>Average Appeal Duration</div>
                  <div style={{ fontSize: '36px', fontWeight: 600, color: 'var(--accent-primary)', fontFamily: 'var(--font-mono)' }}>
                    {data.avgDuration}
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)', marginTop: 4 }}>months to resolution</div>
                </div>
              </div>

              {/* Common Grounds for Reversal */}
              <div style={{ background: 'var(--color-surface-0)', borderRadius: '6px', padding: '28px', border: '1px solid var(--border-default)' }}>
                <h3 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-primary)', margin: '0 0 16px', fontFamily: 'var(--font-ui)' }}>
                  Most Common Grounds for Reversal
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {grounds.map((g, i) => (
                    <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                      <div style={{ minWidth: 24, height: 24, borderRadius: '50%', background: 'rgba(59,130,246,0.08)', color: 'var(--accent-primary-hover)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 600 }}>{i + 1}</div>
                      <span style={{ fontSize: '13px', color: 'var(--color-text-primary)', lineHeight: 1.5 }}>{g}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Filing Deadline Notice */}
              <div style={{ background: 'rgba(59,130,246,0.08)', borderRadius: '6px', padding: '20px', border: '1px solid var(--accent-primary)' }}>
                <h3 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--accent-primary-hover)', margin: '0 0 8px', fontFamily: 'var(--font-ui)' }}>Appeal Filing Deadline</h3>
                <p style={{ fontSize: '13px', color: 'var(--accent-primary-hover)', margin: 0, lineHeight: 1.6 }}>
                  Under FRAP Rule 4(a)(1)(A), a notice of appeal must be filed within <strong>30 days</strong> after entry of judgment. If the United States is a party, the deadline extends to <strong>60 days</strong>. Post-trial motions (FRCP 50(b), 52(b), 59) toll this deadline until the motion is decided.
                </p>
              </div>

              {/* Data Source */}
              <div style={{ padding: '16px', background: 'rgba(234,179,8,0.1)', borderLeft: '3px solid #D97706', borderRadius: 6, fontSize: 12, color: '#fde68a', lineHeight: 1.6 }}>
                <strong>Data Sources:</strong> Appeal rates derived from FJC Integrated Database and Administrative Office of the U.S. Courts annual reports. Reversal rates reflect circuit-level averages. Individual case outcomes depend on specific facts and legal issues. All outputs should be verified with current case law research.
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div style={{ marginTop: '40px', paddingTop: '24px', borderTop: '1px solid var(--border-default)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
          <Link href="/attorney/negotiation" style={{ textDecoration: 'none' }}>
            <div style={{ padding: '16px', background: 'var(--color-surface-0)', border: '1px solid var(--border-default)', borderRadius: '6px' }}>
              <p style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-primary)', margin: '0 0 4px' }}>Negotiation Prep</p>
              <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', margin: 0 }}>Settlement strategy</p>
            </div>
          </Link>
          <Link href="/attorney/case-predictor" style={{ textDecoration: 'none' }}>
            <div style={{ padding: '16px', background: 'var(--color-surface-0)', border: '1px solid var(--border-default)', borderRadius: '6px' }}>
              <p style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-primary)', margin: '0 0 4px' }}>Case Predictor</p>
              <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', margin: 0 }}>Predict outcomes</p>
            </div>
          </Link>
          <Link href="/attorney/demand-letter" style={{ textDecoration: 'none' }}>
            <div style={{ padding: '16px', background: 'var(--color-surface-0)', border: '1px solid var(--border-default)', borderRadius: '6px' }}>
              <p style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-primary)', margin: '0 0 4px' }}>Demand Letter</p>
              <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', margin: 0 }}>Generate letters</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
