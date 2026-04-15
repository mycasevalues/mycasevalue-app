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
    border: '1px solid var(--border-default)', borderRadius: '12px', fontSize: '14px',
    color: 'var(--color-text-primary)', backgroundColor: '#FFF', fontFamily: 'var(--font-body)',
    appearance: 'none' as const,
    backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23212529' d='M6 9L1 4h10z'/%3E%3C/svg%3E\")",
    backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center',
  };

  const grounds = data?.grounds || ['Procedural error', 'Evidentiary ruling', 'Legal standard misapplication'];

  return (
    <div style={{ background: 'var(--color-surface-1)', minHeight: '100vh', fontFamily: 'var(--font-body)' }}>
      <style>{`select:focus, input:focus { outline: none; border-color: var(--accent-primary); box-shadow: 0 0 0 2px rgba(10,102,194,0.08); }`}</style>

      <div style={{ background: 'var(--accent-primary)', padding: '64px 24px' }}>
        <div style={{ maxWidth: '1080px', margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 12px', borderRadius: '12px', marginBottom: '16px', background: 'rgba(255,255,255,0.15)' }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="2.5"><path d="M18 15l-6-6-6 6" /></svg>
            <span style={{ fontSize: '11px', fontWeight: 600, color: 'rgba(255,255,255,0.9)', textTransform: 'uppercase', letterSpacing: '1.5px' }}>Appeal Analysis</span>
          </div>
          <h1 style={{ fontSize: '40px', fontWeight: 600, color: '#FFF', fontFamily: 'var(--font-display)', margin: '0 0 8px' }}>Appeal Probability Scorer</h1>
          <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.7)', margin: 0, lineHeight: 1.6 }}>
            Assess the likelihood and success probability of an appeal based on case type and trial outcome.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: '1080px', margin: '0 auto', padding: '40px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: showResult && data ? '380px 1fr' : '1fr', gap: '24px' }}>
          {/* Form */}
          <div style={{ background: '#FFF', borderRadius: '12px', padding: '28px', border: '1px solid var(--border-default)' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-text-primary)', margin: '0 0 24px', fontFamily: 'var(--font-display)' }}>Case Information</h2>
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
              <div style={{ background: '#FFF', borderRadius: '12px', padding: '32px', border: '1px solid var(--border-default)', textAlign: 'center' }}>
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
                <div style={{ background: '#FFF', borderRadius: '12px', padding: '24px', border: '1px solid var(--border-default)', textAlign: 'center' }}>
                  <div style={{ fontSize: '10px', fontWeight: 600, color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 6 }}>Reversal Rate</div>
                  <div style={{ fontSize: '36px', fontWeight: 600, color: getWinRateColor(reversalProb).text, fontFamily: 'var(--font-mono)' }}>
                    {reversalProb}%
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)', marginTop: 4 }}>of appeals in this circuit</div>
                </div>
                <div style={{ background: '#FFF', borderRadius: '12px', padding: '24px', border: '1px solid var(--border-default)', textAlign: 'center' }}>
                  <div style={{ fontSize: '10px', fontWeight: 600, color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 6 }}>Average Appeal Duration</div>
                  <div style={{ fontSize: '36px', fontWeight: 600, color: 'var(--accent-primary)', fontFamily: 'var(--font-mono)' }}>
                    {data.avgDuration}
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)', marginTop: 4 }}>months to resolution</div>
                </div>
              </div>

              {/* Common Grounds for Reversal */}
              <div style={{ background: '#FFF', borderRadius: '12px', padding: '28px', border: '1px solid var(--border-default)' }}>
                <h3 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-primary)', margin: '0 0 16px', fontFamily: 'var(--font-display)' }}>
                  Most Common Grounds for Reversal
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {grounds.map((g, i) => (
                    <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                      <div style={{ minWidth: 24, height: 24, borderRadius: '50%', background: '#EDF3FB', color: 'var(--accent-primary-hover)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 600 }}>{i + 1}</div>
                      <span style={{ fontSize: '13px', color: 'var(--color-text-primary)', lineHeight: 1.5 }}>{g}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Filing Deadline Notice */}
              <div style={{ background: '#EDF3FB', borderRadius: '12px', padding: '20px', border: '1px solid var(--accent-primary)' }}>
                <h3 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--accent-primary-hover)', margin: '0 0 8px', fontFamily: 'var(--font-display)' }}>Appeal Filing Deadline</h3>
                <p style={{ fontSize: '13px', color: 'var(--accent-primary-hover)', margin: 0, lineHeight: 1.6 }}>
                  Under FRAP Rule 4(a)(1)(A), a notice of appeal must be filed within <strong>30 days</strong> after entry of judgment. If the United States is a party, the deadline extends to <strong>60 days</strong>. Post-trial motions (FRCP 50(b), 52(b), 59) toll this deadline until the motion is decided.
                </p>
              </div>

              {/* Data Source */}
              <div style={{ padding: '16px', background: '#FEF3C7', borderLeft: '3px solid #D97706', borderRadius: 6, fontSize: 12, color: '#78350F', lineHeight: 1.6 }}>
                <strong>Data Sources:</strong> Appeal rates derived from FJC Integrated Database and Administrative Office of the U.S. Courts annual reports. Reversal rates reflect circuit-level averages. Individual case outcomes depend on specific facts and legal issues. All outputs should be verified with current case law research.
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div style={{ marginTop: '40px', paddingTop: '24px', borderTop: '1px solid var(--border-default)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
          <Link href="/attorney/negotiation" style={{ textDecoration: 'none' }}>
            <div style={{ padding: '16px', background: '#FFF', border: '1px solid var(--border-default)', borderRadius: '12px' }}>
              <p style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-primary)', margin: '0 0 4px' }}>Negotiation Prep</p>
              <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', margin: 0 }}>Settlement strategy</p>
            </div>
          </Link>
          <Link href="/attorney/case-predictor" style={{ textDecoration: 'none' }}>
            <div style={{ padding: '16px', background: '#FFF', border: '1px solid var(--border-default)', borderRadius: '12px' }}>
              <p style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-primary)', margin: '0 0 4px' }}>Case Predictor</p>
              <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', margin: 0 }}>Predict outcomes</p>
            </div>
          </Link>
          <Link href="/attorney/demand-letter" style={{ textDecoration: 'none' }}>
            <div style={{ padding: '16px', background: '#FFF', border: '1px solid var(--border-default)', borderRadius: '12px' }}>
              <p style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-primary)', margin: '0 0 4px' }}>Demand Letter</p>
              <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', margin: 0 }}>Generate letters</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
