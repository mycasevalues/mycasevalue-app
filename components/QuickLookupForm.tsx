'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SITS, STATES } from '../lib/data';

// Build a lookup: option "d" value → SITS category id
const OPT_TO_CATEGORY: Record<string, string> = {};
for (const cat of SITS) {
  for (const opt of cat.opts) {
    OPT_TO_CATEGORY[opt.d] = cat.id;
  }
}

export default function QuickLookupForm() {
  const router = useRouter();
  const [caseType, setCaseType] = useState('');
  const [district, setDistrict] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!caseType) return;
    const category = OPT_TO_CATEGORY[caseType] || 'work';
    const params = new URLSearchParams();
    if (district) params.set('district', district);
    const qs = params.toString();
    router.push(`/report/${category}${qs ? `?${qs}` : ''}`);
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
      }}
    >
      {/* Case Type Select */}
      <select
        value={caseType}
        onChange={(e) => setCaseType(e.target.value)}
        style={{
          height: '48px',
          padding: '12px 16px',
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-default)',
          borderRadius: '8px',
          fontFamily: 'var(--font-body)',
          fontSize: '15px',
          color: 'var(--fg-primary)',
          width: '100%',
          appearance: 'none',
          backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right 12px center',
          backgroundSize: '20px',
          paddingRight: '40px',
        }}
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

      {/* District/State Select */}
      <select
        value={district}
        onChange={(e) => setDistrict(e.target.value)}
        style={{
          height: '48px',
          padding: '12px 16px',
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-default)',
          borderRadius: '8px',
          fontFamily: 'var(--font-body)',
          fontSize: '15px',
          color: 'var(--fg-primary)',
          width: '100%',
          appearance: 'none',
          backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right 12px center',
          backgroundSize: '20px',
          paddingRight: '40px',
        }}
      >
        {STATES.map((state) => (
          <option key={state.id} value={state.id}>
            {state.label}
          </option>
        ))}
      </select>

      {/* Submit Button */}
      <button
        type="submit"
        style={{
          height: '48px',
          background: 'var(--accent-primary)',
          color: 'var(--fg-inverse)',
          fontWeight: 600,
          fontSize: '15px',
          borderRadius: '8px',
          border: 'none',
          cursor: 'pointer',
          fontFamily: 'var(--font-body)',
        }}
      >
        Check my case type
      </button>

      {/* Helper Text */}
      <div
        style={{
          fontSize: '12px',
          color: 'var(--fg-muted)',
          textAlign: 'center',
          marginTop: '4px',
        }}
      >
        3 free lookups/day · No account required
      </div>
    </form>
  );
}
