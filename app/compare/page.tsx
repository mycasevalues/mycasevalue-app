'use client';

import { useState } from 'react';
import Link from 'next/link';
import { SITS } from '../../lib/data';
import { REAL_DATA } from '../../lib/realdata';

const allTypes = SITS.flatMap(cat =>
  cat.opts.map(opt => ({ label: opt.label, nos: opt.nos, category: cat.label }))
);

interface CaseStats {
  label: string;
  nos: string;
  winRate: number;
  settlementRate: number;
  dismissRate: number;
  medianDuration: number;
  totalCases: number | null;
}

function getStats(nos: string): CaseStats | null {
  const type = allTypes.find(t => t.nos === nos);
  if (!type) return null;
  const real = REAL_DATA[nos] as any;
  if (!real) return null;
  const winRate = real.wr ?? 0;
  const settlementRate = real.sp ?? 0;
  const dismissRate = Math.max(0, 100 - winRate - settlementRate);
  return {
    label: type.label,
    nos,
    winRate,
    settlementRate,
    dismissRate,
    medianDuration: real.mo ?? 0,
    totalCases: real.total ?? null,
  };
}

export default function ComparePage() {
  const [selected, setSelected] = useState<string[]>(['', '', '']);
  const [comparing, setComparing] = useState(false);

  const stats = comparing ? selected.filter(Boolean).map(getStats).filter(Boolean) as CaseStats[] : [];

  const handleSelect = (idx: number, val: string) => {
    const next = [...selected];
    next[idx] = val;
    setSelected(next);
    setComparing(false);
  };

  const canCompare = selected.filter(Boolean).length >= 2;

  const rows: { label: string; key: keyof CaseStats; suffix: string; format?: (v: number) => string }[] = [
    { label: 'Win Rate', key: 'winRate', suffix: '%', format: (v) => v.toFixed(1) },
    { label: 'Settlement Rate', key: 'settlementRate', suffix: '%', format: (v) => v.toFixed(1) },
    { label: 'Dismissal Rate', key: 'dismissRate', suffix: '%', format: (v) => v.toFixed(1) },
    { label: 'Median Duration', key: 'medianDuration', suffix: ' months' },
    { label: 'Total Cases', key: 'totalCases', suffix: '', format: (v) => v?.toLocaleString() ?? 'N/A' },
  ];

  return (
    <main style={{ maxWidth: 900, margin: '0 auto', padding: '48px 24px', fontFamily: 'var(--font-body)' }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8, color: 'var(--fg-primary)', fontFamily: 'var(--font-display)' }}>
        Compare case types
      </h1>
      <p style={{ color: 'var(--fg-muted)', fontSize: 15, marginBottom: 32 }}>
        Select up to 3 federal case types to compare outcomes side by side.
      </p>

      {/* Selectors */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 24 }}>
        {[0, 1, 2].map(idx => (
          <div key={idx}>
            <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--fg-muted)', display: 'block', marginBottom: 6 }}>
              Case Type {idx + 1}{idx < 2 ? ' *' : ' (optional)'}
            </label>
            <select
              value={selected[idx]}
              onChange={e => handleSelect(idx, e.target.value)}
              style={{
                width: '100%',
                padding: '10px 12px',
                fontSize: 14,
                border: '1.5px solid var(--border-default)',
                borderRadius: 8,
                background: 'var(--bg-surface)',
                color: 'var(--fg-primary)',
                fontFamily: 'var(--font-body)',
              }}
            >
              <option value="">Select a case type...</option>
              {SITS.map(cat => (
                <optgroup key={cat.id} label={cat.label}>
                  {cat.opts.map(opt => (
                    <option key={opt.nos} value={opt.nos} disabled={selected.includes(opt.nos) && selected[idx] !== opt.nos}>
                      {opt.label} (NOS {opt.nos})
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>
        ))}
      </div>

      <button
        onClick={() => setComparing(true)}
        disabled={!canCompare}
        style={{
          padding: '12px 28px',
          background: canCompare ? 'var(--accent-primary)' : 'var(--border-default)',
          color: canCompare ? '#fff' : 'var(--fg-muted)',
          border: 'none',
          borderRadius: 10,
          fontSize: 15,
          fontWeight: 600,
          cursor: canCompare ? 'pointer' : 'not-allowed',
          fontFamily: 'var(--font-display)',
          marginBottom: 32,
        }}
      >
        Compare
      </button>

      {/* Results table */}
      {comparing && stats.length >= 2 && (
        <div style={{ overflowX: 'auto' }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: 14,
            fontFamily: 'var(--font-body)',
          }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border-default)' }}>
                <th style={{ textAlign: 'left', padding: '12px 16px', color: 'var(--fg-muted)', fontWeight: 600, fontSize: 13 }}>Metric</th>
                {stats.map(s => (
                  <th key={s.nos} style={{ textAlign: 'center', padding: '12px 16px', color: 'var(--fg-primary)', fontWeight: 700 }}>
                    <Link href={`/report/${s.nos}`} style={{ color: 'var(--fg-primary)', textDecoration: 'none' }}>
                      {s.label}
                    </Link>
                    <span style={{
                      display: 'block',
                      fontSize: 11,
                      fontFamily: 'var(--font-mono)',
                      color: 'var(--fg-muted)',
                      fontWeight: 400,
                      marginTop: 2,
                    }}>
                      NOS {s.nos}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, ri) => {
                const values = stats.map(s => {
                  const v = s[row.key];
                  return typeof v === 'number' ? v : null;
                });
                const best = row.key !== 'medianDuration' && row.key !== 'dismissRate'
                  ? Math.max(...values.filter((v): v is number => v !== null))
                  : null;
                return (
                  <tr key={row.label} style={{ borderBottom: '1px solid var(--border-default)', background: ri % 2 === 0 ? 'var(--bg-surface)' : 'transparent' }}>
                    <td style={{ padding: '12px 16px', fontWeight: 600, color: 'var(--fg-secondary)' }}>{row.label}</td>
                    {stats.map((s, si) => {
                      const v = values[si];
                      const formatted = v !== null
                        ? (row.format ? row.format(v) : `${v}`) + row.suffix
                        : 'N/A';
                      const isBest = best !== null && v === best && row.key !== 'totalCases';
                      return (
                        <td key={s.nos} style={{
                          textAlign: 'center',
                          padding: '12px 16px',
                          color: isBest ? 'var(--accent-primary)' : 'var(--fg-primary)',
                          fontWeight: isBest ? 700 : 400,
                          fontFamily: 'var(--font-mono)',
                        }}>
                          {formatted}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Disclaimer */}
      <p style={{ fontSize: 12, color: 'var(--fg-muted)', marginTop: 32, lineHeight: 1.6 }}>
        Data sourced from the Federal Judicial Center Integrated Database. Outcomes are historical averages and do not predict future results.
        This is not legal advice.{' '}
        <Link href="/methodology" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>Learn about our methodology</Link>
      </p>
    </main>
  );
}
