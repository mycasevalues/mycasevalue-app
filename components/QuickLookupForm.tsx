'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SITS, STATES } from '../lib/data';

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
        gap: '20px',
      }}
    >
      {/* Case Type Label & Select */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <label
          style={{
            fontSize: '14px',
            fontWeight: 600,
            color: '#212529',
            fontFamily: 'var(--font-body)',
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
            background: '#FFFFFF',
            border: '4px solid #D5D8DC',
            borderRadius: '4px',
            fontFamily: 'var(--font-body)',
            fontSize: '15px',
            color: '#212529',
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
              color: '#212529',
              fontFamily: 'var(--font-body)',
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
              background: '#FFFFFF',
              border: '4px solid #D5D8DC',
              borderRadius: '4px',
              fontFamily: 'var(--font-body)',
              fontSize: '15px',
              color: '#212529',
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
          background: '#E8171F',
          color: '#FFFFFF',
          fontWeight: 700,
          fontSize: '15px',
          borderRadius: '4px',
          border: 'none',
          cursor: 'pointer',
          fontFamily: 'var(--font-body)',
          transition: 'all 150ms ease',
          marginTop: '8px',
        }}
        className="quick-lookup-submit"
      >
        Check my case type
      </button>

      {/* Helper Text */}
      <div
        style={{
          fontSize: '12px',
          color: '#455A64',
          textAlign: 'center',
          marginTop: '8px',
        }}
      >
        Free access · No account required
      </div>

      {/* Styles */}
      <style dangerouslySetInnerHTML={{ __html: `
        .quick-lookup-select:focus {
          border-color: #006997 !important;
          box-shadow: 0 0 0 3px rgba(0, 105, 151, 0.1) !important;
          outline: none;
        }
        .quick-lookup-select:invalid {
          border-color: #E8171F !important;
        }
        .quick-lookup-submit:hover {
          background: #CC1219 !important;
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
