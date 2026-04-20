'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SITS, STATES } from '../lib/data';
import { REAL_DATA } from '../lib/realdata';

// Build a lookup: option "d" value → NOS code for direct report routing
const OPT_TO_NOS: Record<string, string> = {};
for (const cat of SITS) {
  for (const opt of cat.opts) {
    OPT_TO_NOS[opt.d] = (opt as { nos?: string }).nos || cat.id;
  }
}

export default function QuickLookupForm() {
  const router = useRouter();
  const [caseType, setCaseType] = useState('');
  const [district, setDistrict] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!caseType) return;
    const nos = OPT_TO_NOS[caseType] || 'work';
    const params = new URLSearchParams();
    if (district) params.set('district', district);
    const qs = params.toString();
    router.push(`/report/${nos}${qs ? `?${qs}` : ''}`);
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
      }}
    >
      {/* Case Type Label & Select */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <label
          style={{
            fontSize: '14px',
            fontWeight: 600,
            color: 'var(--text1)',
            fontFamily: 'var(--font-ui)',
          }}
        >
          Case Type
        </label>
        <select
          value={caseType}
          onChange={(e) => setCaseType(e.target.value)}
          aria-label="Select your case type"
          style={{
            height: '48px',
            padding: '12px 16px',
            background: 'var(--card)',
            border: '1px solid var(--bdr)',
            borderRadius: '3px',
            fontFamily: 'var(--font-ui)',
            fontSize: '14px',
            color: 'var(--text1)',
            width: '100%',
            appearance: 'none',
            backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right 12px center',
            backgroundSize: '20px',
            paddingRight: '40px',
            transition: 'border-color 150ms ease, box-shadow 150ms ease',
            cursor: 'pointer',
          }}
          className="quick-lookup-select"
        >
          <option value="">Select case type</option>

            {SITS.map((cat) => (
              <optgroup key={cat.id} label={cat.label}>
                {cat.opts.map((opt) => (
                  <option key={opt.d} value={opt.d}>
                    {opt.label}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>

        {/* District/State Label & Select */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label
            style={{
              fontSize: '14px',
              fontWeight: 600,
              color: 'var(--text1)',
              fontFamily: 'var(--font-ui)',
            }}
          >
            District or State
          </label>
          <select
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            aria-label="Select your district or state"
            style={{
              height: '48px',
              padding: '12px 16px',
              background: 'var(--card)',
              border: '1px solid var(--bdr)',
              borderRadius: '3px',
              fontFamily: 'var(--font-ui)',
              fontSize: '14px',
              color: 'var(--text1)',
              width: '100%',
              appearance: 'none',
              backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 12px center',
              backgroundSize: '20px',
              paddingRight: '40px',
              transition: 'border-color 150ms ease, box-shadow 150ms ease',
              cursor: 'pointer',
            }}
            className="quick-lookup-select"
          >
            {STATES.map((state) => (
              <option key={state.id} value={state.id}>
                {state.label}
              </option>
            ))}
          </select>
        </div>

      {/* Submit Button */}
      <button
        type="submit"
        style={{
          height: '48px',
          background: 'var(--link)',
          color: 'var(--card)',
          fontWeight: 600,
          fontSize: '14px',
          borderRadius: '3px',
          border: 'none',
          cursor: 'pointer',
          fontFamily: 'var(--font-ui)',
          transition: 'all 150ms ease',
          marginTop: '8px',
        }}
        className="quick-lookup-submit"
      >
        View Outcome Data
      </button>

      {/* Instant Preview */}
      {(() => {
        const nos = OPT_TO_NOS[caseType];
        const rd = nos ? (REAL_DATA as any)[nos] : null;
        if (!rd) return null;
        const wrColor = (rd.wr ?? 0) >= 50 ? 'var(--data-positive, #176438)' : (rd.wr ?? 0) >= 35 ? 'var(--wrn-txt, #7A5800)' : 'var(--data-negative, #B01E1E)';
        return (
          <div style={{
            background: 'var(--surf)',
            border: '1px solid var(--bdr)',
            borderRadius: 2,
            padding: '12px 16px',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: 8,
            textAlign: 'center',
            marginTop: 4,
          }}>
            <div>
              <div style={{ fontSize: 18, fontWeight: 600, color: wrColor, fontFamily: 'var(--font-mono)', lineHeight: 1 }}>
                {(rd.wr ?? 0).toFixed(1)}%
              </div>
              <div style={{ fontSize: 12, color: 'var(--text2)', textTransform: 'uppercase', letterSpacing: '0.3px', marginTop: 2 }}>Win Rate</div>
            </div>
            <div>
              <div style={{ fontSize: 18, fontWeight: 600, color: 'var(--accent-primary-hover)', fontFamily: 'var(--font-mono)', lineHeight: 1 }}>
                {rd.mo ?? '–'}mo
              </div>
              <div style={{ fontSize: 12, color: 'var(--text2)', textTransform: 'uppercase', letterSpacing: '0.3px', marginTop: 2 }}>Duration</div>
            </div>
            <div>
              <div style={{ fontSize: 18, fontWeight: 600, color: 'var(--text1)', fontFamily: 'var(--font-mono)', lineHeight: 1 }}>
                {rd.total ? (rd.total >= 1000 ? `${(rd.total / 1000).toFixed(0)}K` : rd.total.toLocaleString()) : '–'}
              </div>
              <div style={{ fontSize: 12, color: 'var(--text2)', textTransform: 'uppercase', letterSpacing: '0.3px', marginTop: 2 }}>Cases</div>
            </div>
          </div>
        );
      })()}

      {/* Helper Text */}
      <div
        style={{
          fontSize: '12px',
          color: 'var(--text2)',
          textAlign: 'center',
          marginTop: '8px',
        }}
      >
        Free access · No account required
      </div>

      {/* Styles */}
      <style dangerouslySetInnerHTML={{ __html: `
        .quick-lookup-select:focus {
          border-color: var(--link-hover, #083D7A) !important;
          box-shadow: 0 0 0 3px rgba(10, 102, 194, 0.1) !important;
          outline: none;
        }
        .quick-lookup-select:invalid {
          border-color: var(--link) !important;
        }
        .quick-lookup-submit:hover {
          background: var(--accent-primary-hover, #A87222) !important;
        }
        .quick-lookup-submit:active {
          transform: scale(0.98);
        }
        @media (max-width: 640px) {
          form {
            gap: 16px !important;
          }
        }
      `}} />
    </form>
  );
}
