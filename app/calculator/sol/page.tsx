'use client';

import { useState } from 'react';
import Link from 'next/link';
import { SITS } from '../../../lib/data';
import solRulesData from '../../../data/sol-rules.json';

const solRules = solRulesData as Record<string, { years: number; usc: string; trigger: string; tolling: string[] }>;

const allTypes = SITS.flatMap(cat =>
  cat.opts.map(opt => ({ label: opt.label, nos: opt.nos, category: cat.label }))
);

// Deduplicate
const uniqueNOS = new Map<string, { label: string; nos: string; category: string }>();
allTypes.forEach(t => { if (!uniqueNOS.has(t.nos)) uniqueNOS.set(t.nos, t); });

function formatPeriod(years: number): string {
  if (years < 1) {
    const days = Math.round(years * 365);
    return `${days} days`;
  }
  if (years === 1) return '1 year';
  return `${years} years`;
}

export default function SOLCalculatorPage() {
  const [selectedNOS, setSelectedNOS] = useState('');
  const [incidentDate, setIncidentDate] = useState('');
  const [showResult, setShowResult] = useState(false);

  const rule = selectedNOS ? solRules[selectedNOS] : null;
  const typeInfo = selectedNOS ? uniqueNOS.get(selectedNOS) : null;

  // Calculate days remaining
  let daysRemaining: number | null = null;
  let deadlineDate: string | null = null;
  let isExpired = false;

  if (rule && incidentDate) {
    const incident = new Date(incidentDate);
    const deadline = new Date(incident);
    if (rule.years < 1) {
      deadline.setDate(deadline.getDate() + Math.round(rule.years * 365));
    } else {
      deadline.setFullYear(deadline.getFullYear() + Math.floor(rule.years));
      const fraction = rule.years - Math.floor(rule.years);
      if (fraction > 0) {
        deadline.setDate(deadline.getDate() + Math.round(fraction * 365));
      }
    }
    deadlineDate = deadline.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    const now = new Date();
    const diff = deadline.getTime() - now.getTime();
    daysRemaining = Math.ceil(diff / (1000 * 60 * 60 * 24));
    isExpired = daysRemaining <= 0;
  }

  return (
    <>
      <style>{`
        .sol-select {
          height: 48px; width: 100%; border: 1px solid #E5E7EB; border-radius: 12px;
          padding: 0 36px 0 16px; font-family: var(--font-body); font-size: 14px; color: #0f0f0f;
          background: #FFFFFF; appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23212529' d='M6 9L1 4h10z'/%3E%3C/svg%3E");
          background-repeat: no-repeat; background-position: right 12px center; cursor: pointer;
          transition: border-color 0.2s ease;
        }
        .sol-select:hover { border-color: #004182; }
        .sol-select:focus { outline: none; border-color: #004182; box-shadow: 0 0 0 2px rgba(0,105,151,0.1); }
        .sol-input {
          height: 48px; width: 100%; border: 1px solid #E5E7EB; border-radius: 12px;
          padding: 0 16px; font-family: var(--font-body); font-size: 14px; color: #0f0f0f;
          background: #FFFFFF; transition: border-color 0.2s ease;
        }
        .sol-input:focus { outline: none; border-color: #004182; box-shadow: 0 0 0 2px rgba(0,105,151,0.1); }
        @keyframes slideUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      {/* Header */}
      <header style={{ background: '#0966C3', padding: 'clamp(32px, 6vw, 56px) clamp(16px, 4vw, 48px)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'inline-block', background: '#0966C3', color: '#FFF', padding: '4px 12px', borderRadius: 2, fontSize: 11, fontWeight: 600, letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: 16, fontFamily: 'var(--font-display)' }}>
            FREE TOOL
          </div>
          <h1 style={{ color: '#FFF', fontSize: 'clamp(28px, 7vw, 40px)', fontWeight: 600, margin: '0 0 12px', fontFamily: 'var(--font-display)', lineHeight: 1.2 }}>
            Statute of Limitations Calculator
          </h1>
          <p style={{ color: '#b8bcc0', fontSize: 'clamp(14px, 2vw, 16px)', margin: 0, maxWidth: 600, lineHeight: 1.5, fontFamily: 'var(--font-body)' }}>
            Check federal filing deadlines for your case type. Covers all 84 NOS codes with USC citations and tolling exceptions.
          </p>
        </div>
      </header>

      {/* Breadcrumb */}
      <nav style={{ background: '#FFF', padding: '12px 0', borderBottom: '1px solid #E5E7EB', fontSize: 13, fontFamily: 'var(--font-body)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(16px, 4vw, 48px)' }}>
          <Link href="/" style={{ color: '#0966C3', textDecoration: 'none' }}>Home</Link>
          <span style={{ color: '#E5E7EB', margin: '0 8px' }}>/</span>
          <Link href="/calculator" style={{ color: '#0966C3', textDecoration: 'none' }}>Calculator</Link>
          <span style={{ color: '#E5E7EB', margin: '0 8px' }}>/</span>
          <span style={{ color: '#0f0f0f', fontWeight: 600 }}>Statute of Limitations</span>
        </div>
      </nav>

      {/* Main Content */}
      <main style={{ background: '#F7F8FA', minHeight: '60vh', padding: 'clamp(24px, 5vw, 48px) clamp(16px, 4vw, 48px)' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>

          {/* Input Form */}
          <div style={{ background: '#FFF', border: '1px solid #E5E7EB', borderRadius: 12, padding: 'clamp(24px, 4vw, 40px)', marginBottom: 32 }}>
            <h2 style={{ fontSize: 18, fontWeight: 600, color: '#0f0f0f', margin: '0 0 24px', fontFamily: 'var(--font-display)' }}>
              Check Your Deadline
            </h2>

            <div style={{ display: 'grid', gap: 16 }}>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#4B5563', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.3px' }}>
                  Case Type *
                </label>
                <select
                  value={selectedNOS}
                  onChange={e => { setSelectedNOS(e.target.value); setShowResult(true); }}
                  className="sol-select"
                >
                  <option value="">Select a case type...</option>
                  {SITS.map(cat => (
                    <optgroup key={cat.id} label={cat.label}>
                      {cat.opts
                        .filter((opt, idx, arr) => arr.findIndex(o => o.nos === opt.nos) === idx)
                        .map(opt => (
                          <option key={opt.nos} value={opt.nos}>{opt.label} (NOS {opt.nos})</option>
                        ))}
                    </optgroup>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#4B5563', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.3px' }}>
                  Date of Incident (optional — for countdown)
                </label>
                <input
                  type="date"
                  value={incidentDate}
                  onChange={e => setIncidentDate(e.target.value)}
                  className="sol-input"
                />
              </div>
            </div>
          </div>

          {/* Results */}
          {showResult && rule && typeInfo && (
            <div style={{ display: 'grid', gap: 24, animation: 'slideUp 0.4s ease-out' }}>

              {/* SOL Period Card */}
              <div style={{ background: '#FFF', border: '1px solid #E5E7EB', borderRadius: 12, padding: 'clamp(24px, 4vw, 40px)', textAlign: 'center' }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: '#4B5563', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 8 }}>
                  Federal Statute of Limitations
                </div>
                <div style={{ fontSize: 'clamp(48px, 10vw, 64px)', fontWeight: 600, color: '#0966C3', fontFamily: 'var(--font-display)', lineHeight: 1 }}>
                  {formatPeriod(rule.years)}
                </div>
                <div style={{ marginTop: 12, display: 'inline-block', padding: '6px 14px', background: '#EDF3FB', borderRadius: 8, fontSize: 14, fontWeight: 600, color: '#004182', fontFamily: 'var(--font-mono)' }}>
                  {rule.usc}
                </div>
                <div style={{ marginTop: 12, fontSize: 14, color: '#0f0f0f', fontFamily: 'var(--font-body)' }}>
                  {typeInfo.label}
                </div>
              </div>

              {/* Days Remaining (if date entered) */}
              {daysRemaining !== null && deadlineDate && (
                <div style={{
                  background: isExpired ? '#FEF0EF' : daysRemaining <= 90 ? '#FEF3C7' : '#E8F3EB',
                  border: `1px solid ${isExpired ? '#CC1016' : daysRemaining <= 90 ? '#D97706' : '#057642'}`,
                  borderRadius: 12, padding: 'clamp(24px, 4vw, 40px)', textAlign: 'center',
                }}>
                  <div style={{ fontSize: 11, fontWeight: 600, color: '#4B5563', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 8 }}>
                    {isExpired ? 'DEADLINE EXPIRED' : 'Days Remaining'}
                  </div>
                  <div style={{
                    fontSize: 'clamp(40px, 8vw, 56px)', fontWeight: 600,
                    color: isExpired ? '#CC1016' : daysRemaining <= 90 ? '#D97706' : '#057642',
                    fontFamily: 'var(--font-mono)', lineHeight: 1,
                  }}>
                    {isExpired ? '0' : daysRemaining.toLocaleString()}
                  </div>
                  <div style={{ marginTop: 8, fontSize: 13, color: '#4B5563' }}>
                    Deadline: {deadlineDate}
                  </div>
                  {/* Visual progress bar */}
                  {!isExpired && (
                    <div style={{ marginTop: 16, height: 8, background: '#E5E7EB', borderRadius: 4, overflow: 'hidden' }}>
                      <div style={{
                        height: '100%',
                        width: `${Math.max(5, Math.min(100, (daysRemaining / (rule.years * 365)) * 100))}%`,
                        background: daysRemaining <= 90 ? '#D97706' : '#057642',
                        borderRadius: 4,
                        transition: 'width 0.5s ease',
                      }} />
                    </div>
                  )}
                </div>
              )}

              {/* Triggering Event */}
              <div style={{ background: '#FFF', border: '1px solid #E5E7EB', borderRadius: 12, padding: 'clamp(24px, 4vw, 32px)' }}>
                <h3 style={{ fontSize: 14, fontWeight: 600, color: '#0f0f0f', margin: '0 0 12px', fontFamily: 'var(--font-display)' }}>
                  Key Triggering Event
                </h3>
                <p style={{ fontSize: 14, color: '#0f0f0f', margin: 0, lineHeight: 1.6, fontFamily: 'var(--font-body)', padding: '12px 16px', background: '#FAFBFC', borderRadius: 8, border: '1px solid #E5E7EB' }}>
                  {rule.trigger}
                </p>
              </div>

              {/* Tolling Exceptions */}
              <div style={{ background: '#FFF', border: '1px solid #E5E7EB', borderRadius: 12, padding: 'clamp(24px, 4vw, 32px)' }}>
                <h3 style={{ fontSize: 14, fontWeight: 600, color: '#0f0f0f', margin: '0 0 12px', fontFamily: 'var(--font-display)' }}>
                  Common Tolling Exceptions
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {rule.tolling.map((t, i) => (
                    <span key={i} style={{
                      padding: '6px 14px', background: '#EDF3FB', color: '#004182', borderRadius: 20,
                      fontSize: 12, fontWeight: 500, fontFamily: 'var(--font-body)',
                    }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Disclaimer */}
              <div style={{
                padding: '16px', background: '#FEF3C7', borderLeft: '3px solid #D97706', borderRadius: 6,
                fontSize: 12, color: '#78350F', lineHeight: 1.6, fontFamily: 'var(--font-body)',
              }}>
                <strong>Important:</strong> SOL rules are complex and exceptions apply. Tolling provisions, discovery rules, and equitable doctrines can extend or shorten deadlines. Consult an attorney before relying on this information.
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
