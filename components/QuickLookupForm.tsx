import { SITS, STATES } from '../lib/data';

export default function QuickLookupForm() {
  return (
    <form
      method="get"
      action="/cases"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
      }}
    >
      {/* Case Type Select */}
      <select
        name="type"
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

        {/* Workplace & Employment */}
        <optgroup label="Workplace & Employment">
          {SITS[0].opts.map((opt) => (
            <option key={opt.d} value={opt.d}>
              {opt.label}
            </option>
          ))}
        </optgroup>

        {/* Injury */}
        <optgroup label="Injury">
          {SITS[1].opts.map((opt) => (
            <option key={opt.d} value={opt.d}>
              {opt.label}
            </option>
          ))}
        </optgroup>

        {/* Consumer */}
        <optgroup label="Consumer">
          {SITS[2].opts.map((opt) => (
            <option key={opt.d} value={opt.d}>
              {opt.label}
            </option>
          ))}
        </optgroup>

        {/* Civil Rights */}
        <optgroup label="Civil Rights">
          {SITS[3].opts.map((opt) => (
            <option key={opt.d} value={opt.d}>
              {opt.label}
            </option>
          ))}
        </optgroup>

        {/* Money & Business */}
        <optgroup label="Money & Business">
          {SITS[4].opts.map((opt) => (
            <option key={opt.d} value={opt.d}>
              {opt.label}
            </option>
          ))}
        </optgroup>

        {/* Housing & Property */}
        <optgroup label="Housing & Property">
          {SITS[5].opts.map((opt) => (
            <option key={opt.d} value={opt.d}>
              {opt.label}
            </option>
          ))}
        </optgroup>

        {/* Family & Estate */}
        <optgroup label="Family & Estate">
          {SITS[6].opts.map((opt) => (
            <option key={opt.d} value={opt.d}>
              {opt.label}
            </option>
          ))}
        </optgroup>

        {/* Immigration */}
        <optgroup label="Immigration">
          {SITS[7].opts.map((opt) => (
            <option key={opt.d} value={opt.d}>
              {opt.label}
            </option>
          ))}
        </optgroup>

        {/* Bankruptcy & Debt */}
        <optgroup label="Bankruptcy & Debt">
          {SITS[8].opts.map((opt) => (
            <option key={opt.d} value={opt.d}>
              {opt.label}
            </option>
          ))}
        </optgroup>

        {/* Criminal & Traffic */}
        <optgroup label="Criminal & Traffic">
          {SITS[9].opts.map((opt) => (
            <option key={opt.d} value={opt.d}>
              {opt.label}
            </option>
          ))}
        </optgroup>
      </select>

      {/* District/State Select */}
      <select
        name="district"
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
