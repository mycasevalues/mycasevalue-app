'use client';

import { useState, useMemo } from 'react';
import { REAL_DATA } from '../lib/realdata';
import { SITS } from '../lib/data';
import { fmtK } from '../lib/format';

interface NosEntry {
  nos: string;
  label: string;
  total: number;
  wr: number;
  sp: number;
  mo: number;
  rngLo: number;
  rngMd: number;
  rngHi: number;
}

function getAllNosEntries(): NosEntry[] {
  const entries: NosEntry[] = [];
  for (const [nos, data] of Object.entries(REAL_DATA)) {
    if (!data || !data.total) continue;
    entries.push({
      nos,
      label: (data as any).label || nos,
      total: data.total,
      wr: data.wr || 0,
      sp: data.sp || 0,
      mo: data.mo || 0,
      rngLo: data.rng?.lo || 0,
      rngMd: data.rng?.md || 0,
      rngHi: data.rng?.hi || 0,
    });
  }
  return entries.sort((a, b) => b.total - a.total);
}

const wrColor = (wr: number) => wr >= 50 ? '#059669' : wr >= 35 ? '#D97706' : '#0966C3';

export default function CaseTypeComparison() {
  const allEntries = useMemo(() => getAllNosEntries(), []);
  const [nosA, setNosA] = useState('');
  const [nosB, setNosB] = useState('');

  const entryA = allEntries.find(e => e.nos === nosA);
  const entryB = allEntries.find(e => e.nos === nosB);

  const metrics = entryA && entryB ? [
    { label: 'Total Cases', a: entryA.total.toLocaleString(), b: entryB.total.toLocaleString(), aVal: entryA.total, bVal: entryB.total, higher: 'neutral' },
    { label: 'Win Rate', a: `${entryA.wr}%`, b: `${entryB.wr}%`, aVal: entryA.wr, bVal: entryB.wr, higher: 'green' },
    { label: 'Settlement Rate', a: `${entryA.sp}%`, b: `${entryB.sp}%`, aVal: entryA.sp, bVal: entryB.sp, higher: 'green' },
    { label: 'Avg Duration', a: `${entryA.mo} months`, b: `${entryB.mo} months`, aVal: entryA.mo, bVal: entryB.mo, higher: 'red' },
    { label: '25th %ile Recovery', a: fmtK(entryA.rngLo), b: fmtK(entryB.rngLo), aVal: entryA.rngLo, bVal: entryB.rngLo, higher: 'green' },
    { label: 'Median Recovery', a: fmtK(entryA.rngMd), b: fmtK(entryB.rngMd), aVal: entryA.rngMd, bVal: entryB.rngMd, higher: 'green' },
    { label: '75th %ile Recovery', a: fmtK(entryA.rngHi), b: fmtK(entryB.rngHi), aVal: entryA.rngHi, bVal: entryB.rngHi, higher: 'green' },
  ] : [];

  return (
    <div>
      <style>{`
        .cmp-select:focus { border-color: #004182 !important; box-shadow: 0 0 0 3px rgba(0,105,151,0.1) !important; outline: none; }
      `}</style>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 16, alignItems: 'center', marginBottom: 24 }}>
        {/* Left selector */}
        <div>
          <label style={{ display: 'block', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.8px', color: '#0f0f0f', fontFamily: 'var(--font-display)', marginBottom: 8 }}>
            Case Type A
          </label>
          <select
            value={nosA}
            onChange={e => setNosA(e.target.value)}
            className="cmp-select"
            style={{
              width: '100%', height: 44, padding: '0 32px 0 12px', border: '1px solid #E5E7EB', borderRadius: 2,
              fontFamily: 'var(--font-body)', fontSize: 13, color: '#0f0f0f', background: '#FFFFFF',
              appearance: 'none', backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23455A64' stroke-width='2'%3e%3cpolyline points='6 9 12 15 18 9'/%3e%3c/svg%3e")`,
              backgroundRepeat: 'no-repeat', backgroundPosition: 'right 8px center', backgroundSize: '16px',
            }}
          >
            <option value="">Select case type...</option>
            {SITS.map((cat) => (
              <optgroup key={cat.id} label={cat.label}>
                {cat.opts.map((opt) => {
                  const nosCode = (opt as any).nos || cat.id;
                  return <option key={opt.d} value={nosCode}>{opt.label}</option>;
                })}
              </optgroup>
            ))}
          </select>
        </div>

        {/* VS badge */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: 20 }}>
          <div style={{
            width: 40, height: 40, borderRadius: '50%', background: '#1C3A5E', color: '#FFFFFF',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 600,
            fontFamily: 'var(--font-display)',
          }}>
            VS
          </div>
        </div>

        {/* Right selector */}
        <div>
          <label style={{ display: 'block', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.8px', color: '#0f0f0f', fontFamily: 'var(--font-display)', marginBottom: 8 }}>
            Case Type B
          </label>
          <select
            value={nosB}
            onChange={e => setNosB(e.target.value)}
            className="cmp-select"
            style={{
              width: '100%', height: 44, padding: '0 32px 0 12px', border: '1px solid #E5E7EB', borderRadius: 2,
              fontFamily: 'var(--font-body)', fontSize: 13, color: '#0f0f0f', background: '#FFFFFF',
              appearance: 'none', backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23455A64' stroke-width='2'%3e%3cpolyline points='6 9 12 15 18 9'/%3e%3c/svg%3e")`,
              backgroundRepeat: 'no-repeat', backgroundPosition: 'right 8px center', backgroundSize: '16px',
            }}
          >
            <option value="">Select case type...</option>
            {SITS.map((cat) => (
              <optgroup key={cat.id} label={cat.label}>
                {cat.opts.map((opt) => {
                  const nosCode = (opt as any).nos || cat.id;
                  return <option key={opt.d} value={nosCode}>{opt.label}</option>;
                })}
              </optgroup>
            ))}
          </select>
        </div>
      </div>

      {/* Comparison Table */}
      {entryA && entryB ? (
        <div style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: 2, overflow: 'hidden' }}>
          {/* Header row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 2fr', background: '#1C3A5E', padding: '12px 16px' }}>
            <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', color: '#C7D1D8' }}>Metric</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#FFFFFF', textAlign: 'center' }}>{entryA.label}</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#FFFFFF', textAlign: 'center' }}>{entryB.label}</div>
          </div>
          {/* Data rows */}
          {metrics.map((m, i) => {
            const aWins = m.higher === 'green' ? m.aVal > m.bVal : m.higher === 'red' ? m.aVal < m.bVal : false;
            const bWins = m.higher === 'green' ? m.bVal > m.aVal : m.higher === 'red' ? m.bVal < m.aVal : false;
            return (
              <div key={m.label} style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 2fr', padding: '12px 16px', borderTop: '1px solid #F0F0F0', background: i % 2 === 0 ? '#FFFFFF' : '#FAFAFA' }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: '#4B5563', fontFamily: 'var(--font-body)' }}>{m.label}</div>
                <div style={{ textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: 600, color: aWins ? '#059669' : '#0f0f0f' }}>
                  {m.a} {aWins && <span style={{ fontSize: 10, color: '#059669' }}>●</span>}
                </div>
                <div style={{ textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: 600, color: bWins ? '#059669' : '#0f0f0f' }}>
                  {m.b} {bWins && <span style={{ fontSize: 10, color: '#059669' }}>●</span>}
                </div>
              </div>
            );
          })}
          {/* Visual comparison bars */}
          <div style={{ padding: '16px', borderTop: '1px solid #E5E7EB', background: '#F8F9FA' }}>
            <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', color: '#4B5563', marginBottom: 12 }}>Win Rate Comparison</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div>
                <div style={{ fontSize: 11, color: '#4B5563', marginBottom: 4 }}>{entryA.label}</div>
                <div style={{ height: 24, background: '#F0F0F0', borderRadius: 2, overflow: 'hidden', position: 'relative' }}>
                  <div style={{ width: `${entryA.wr}%`, height: '100%', background: wrColor(entryA.wr), borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: 6 }}>
                    <span style={{ fontSize: 11, fontWeight: 600, color: '#FFFFFF', fontFamily: 'var(--font-mono)' }}>{entryA.wr}%</span>
                  </div>
                </div>
              </div>
              <div>
                <div style={{ fontSize: 11, color: '#4B5563', marginBottom: 4 }}>{entryB.label}</div>
                <div style={{ height: 24, background: '#F0F0F0', borderRadius: 2, overflow: 'hidden', position: 'relative' }}>
                  <div style={{ width: `${entryB.wr}%`, height: '100%', background: wrColor(entryB.wr), borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: 6 }}>
                    <span style={{ fontSize: 11, fontWeight: 600, color: '#FFFFFF', fontFamily: 'var(--font-mono)' }}>{entryB.wr}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '48px 24px', background: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: 2 }}>
          <svg aria-hidden="true" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#E5E7EB" strokeWidth="1.5" style={{ margin: '0 auto 16px' }}>
            <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
          </svg>
          <p style={{ fontSize: 14, color: '#4B5563', fontFamily: 'var(--font-body)' }}>
            Select two case types above to see a side-by-side comparison of win rates, settlement rates, duration, and recovery ranges.
          </p>
        </div>
      )}
    </div>
  );
}
