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
          height: 48px; width: 100%; border: 1px solid var(--border-default); border-radius: 2px;
          padding: 0 36px 0 16px; font-family: var(--font-ui); font-size: 14px; color: var(--color-text-primary);
          background: var(--color-surface-0); appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23212529' d='M6 9L1 4h10z'/%3E%3C/svg%3E");
          background-repeat: no-repeat; background-position: right 12px center; cursor: pointer;
          transition: border-color 0.2s ease;
        }
        .sol-select:hover { border-color: var(--link); }
        .sol-select:focus { outline: none; border-color: var(--link); box-shadow: 0 0 0 2px rgba(0,105,151,0.1); }
        .sol-input {
          height: 48px; width: 100%; border: 1px solid var(--border-default); border-radius: 2px;
          padding: 0 16px; font-family: var(--font-ui); font-size: 14px; color: var(--color-text-primary);
          background: var(--color-surface-0); transition: border-color 0.2s ease;
        }
        .sol-input:focus { outline: none; border-color: var(--link); box-shadow: 0 0 0 2px rgba(0,105,151,0.1); }
        @keyframes slideUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      {/* Header */}
      <header style={{
        background: 'var(--card)',
        color: 'var(--color-text-inverse)',
        padding: '40px 24px 32px',
        position: 'relative',
        overflow: 'hidden',
        borderBottom: '1px solid var(--bdr)',
      }}>
        <div aria-hidden style={{
          position: 'absolute', inset: 0, opacity: 0.03, pointerEvents: 'none',
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />
        <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '4px 10px', marginBottom: 16,
            borderRadius: 999,
            border: '1px solid rgba(10,80,162,0.2)',
            background: 'rgba(10,80,162,0.08)',
            fontFamily: 'var(--font-mono)', fontSize: 10,
            fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase',
            color: 'var(--link)',
          }}>
            <span className="animate-pulse" style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--data-positive)' }} />
            Statute of Limitations
          </div>
          <h1 style={{ color: 'var(--color-text-inverse)', fontFamily: 'var(--font-legal)', fontSize: '28px', fontWeight: 700, letterSpacing: '-0.025em', lineHeight: 1.1, margin: '0 0 16px' }}>
            Know When Your Federal Deadline Expires
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'var(--font-ui)', fontSize: '14px', margin: 0, maxWidth: 600, lineHeight: 1.6 }}>
            Federal filing deadlines across 84 NOS codes — with USC citations, tolling exceptions, and circuit-specific precedent.
          </p>
        </div>
      </header>

      {/* Breadcrumb */}
      <nav style={{ background: 'var(--color-surface-0)', padding: '12px 0', borderBottom: '1px solid var(--border-default)', fontSize: 13, fontFamily: 'var(--font-ui)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(16px, 4vw, 48px)' }}>
          <Link href="/" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>Home</Link>
          <span style={{ color: 'var(--border-default)', margin: '0 8px' }}>/</span>
          <Link href="/calculator" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>Calculator</Link>
          <span style={{ color: 'var(--border-default)', margin: '0 8px' }}>/</span>
          <span style={{ color: 'var(--color-text-primary)', fontWeight: 600 }}>Statute of Limitations</span>
        </div>
      </nav>

      {/* Main Content */}
      <div style={{ background: 'var(--color-surface-1)', minHeight: '60vh', padding: 'clamp(24px, 5vw, 48px) clamp(16px, 4vw, 48px)' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>

          {/* Input Form */}
          <div style={{ background: 'var(--color-surface-0)', border: '1px solid var(--border-default)', borderRadius: 4, padding: 'clamp(24px, 4vw, 40px)', marginBottom: 32 }}>
            <h2 style={{ fontSize: 20, fontWeight: 600, color: 'var(--color-text-primary)', margin: '0 0 24px', fontFamily: 'var(--font-ui)' }}>
              Check Your Deadline
            </h2>


            <div style={{ display: 'grid', gap: 16 }}>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--color-text-secondary)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.3px' }}>
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
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--color-text-secondary)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.3px' }}>
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
              <div style={{ background: 'var(--color-surface-0)', border: '1px solid var(--border-default)', borderRadius: 4, padding: 'clamp(24px, 4vw, 40px)', textAlign: 'center' }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 8 }}>
                  Federal Statute of Limitations
                </div>
                <div style={{ fontSize: '28px', fontWeight: 700, color: 'var(--accent-primary)', fontFamily: 'var(--font-mono)', lineHeight: 1 }}>
                  {formatPeriod(rule.years)}
                </div>
                <div style={{ marginTop: 12, display: 'inline-block', padding: '6px 14px', background: 'rgba(10,80,162,0.08)', borderRadius: 4, fontSize: 14, fontWeight: 600, color: 'var(--gold)', fontFamily: 'var(--font-mono)' }}>
                  {rule.usc}
                </div>
                <div style={{ marginTop: 12, fontSize: 14, color: 'var(--color-text-primary)', fontFamily: 'var(--font-ui)' }}>
                  {typeInfo.label}
                </div>
              </div>

              {/* Days Remaining (if date entered) */}
              {daysRemaining !== null && deadlineDate && (
                <div style={{
                  background: isExpired ? 'var(--data-negative-bg)' : daysRemaining <= 90 ? 'rgba(234,179,8,0.1)' : 'rgba(34,197,94,0.1)',
                  border: `1px solid ${isExpired ? 'var(--data-negative)' : daysRemaining <= 90 ? 'var(--wrn-txt)' : 'var(--data-positive)'}`,
                  borderRadius: 4, padding: 'clamp(24px, 4vw, 40px)', textAlign: 'center',
                }}>
                  <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 8 }}>
                    {isExpired ? 'DEADLINE EXPIRED' : 'Days Remaining'}
                  </div>
                  <div style={{
                    fontSize: '28px', fontWeight: 700,
                    color: isExpired ? 'var(--data-negative)' : daysRemaining <= 90 ? 'var(--wrn-txt)' : 'var(--data-positive)',
                    fontFamily: 'var(--font-mono)', lineHeight: 1,
                  }}>
                    {isExpired ? '0' : daysRemaining.toLocaleString()}
                  </div>
                  <div style={{ marginTop: 8, fontSize: 13, color: 'var(--color-text-secondary)' }}>
                    Deadline: {deadlineDate}
                  </div>
                  {/* Visual progress bar */}
                  {!isExpired && (
                    <div style={{ marginTop: 16, height: 8, background: 'var(--border-default)', borderRadius: 4, overflow: 'hidden' }}>
                      <div style={{
                        height: '100%',
                        width: `${Math.max(5, Math.min(100, (daysRemaining / (rule.years * 365)) * 100))}%`,
                        background: daysRemaining <= 90 ? 'var(--wrn-txt)' : 'var(--data-positive)',
                        borderRadius: 4,
                        transition: 'width 0.5s ease',
                      }} />
                    </div>
                  )}
                </div>
              )}

              {/* Triggering Event */}
              <div style={{ background: 'var(--color-surface-0)', border: '1px solid var(--border-default)', borderRadius: 4, padding: 'clamp(24px, 4vw, 32px)' }}>
                <h3 style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-text-primary)', margin: '0 0 12px', fontFamily: 'var(--font-ui)' }}>
                  Key Triggering Event
                </h3>
                <p style={{ fontSize: 14, color: 'var(--color-text-primary)', margin: 0, lineHeight: 1.6, fontFamily: 'var(--font-ui)', padding: '12px 16px', background: 'var(--color-surface-1)', borderRadius: 4, border: '1px solid var(--border-default)' }}>
                  {rule.trigger}
                </p>
              </div>

              {/* Tolling Exceptions */}
              <div style={{ background: 'var(--color-surface-0)', border: '1px solid var(--border-default)', borderRadius: 4, padding: 'clamp(24px, 4vw, 32px)' }}>
                <h3 style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-text-primary)', margin: '0 0 12px', fontFamily: 'var(--font-ui)' }}>
                  Common Tolling Exceptions
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {rule.tolling.map((t, i) => (
                    <span key={i} style={{
                      padding: '6px 14px', background: 'rgba(10,80,162,0.08)', color: 'var(--gold)', borderRadius: 3,
                      fontSize: 12, fontWeight: 500, fontFamily: 'var(--font-ui)',
                    }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Disclaimer */}
              <div style={{
                padding: '16px', background: 'rgba(234,179,8,0.1)', borderLeft: '3px solid var(--flag-yellow)', borderRadius: 4,
                fontSize: 12, color: 'var(--wrn-txt)', lineHeight: 1.6, fontFamily: 'var(--font-ui)',
              }}>
                <strong>Important:</strong> SOL rules are complex and exceptions apply. Tolling provisions, discovery rules, and equitable doctrines can extend or shorten deadlines. Consult an attorney before relying on this information.
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
