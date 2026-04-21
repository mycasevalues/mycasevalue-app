export default function CalculatorLoading() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--surf, #FFFFFF)' }}>
      {/* Header skeleton */}
      <div style={{ background: 'var(--chrome-bg, #1B2D45)', padding: '48px 24px', borderBottom: '1px solid var(--bdr, #E2DFD8)' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ height: '14px', width: '120px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', marginBottom: '16px' }} />
          <div style={{ height: '36px', width: '60%', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', marginBottom: '12px' }} />
          <div style={{ height: '18px', width: '80%', background: 'rgba(255,255,255,0.08)', borderRadius: '4px' }} />
        </div>
      </div>
      {/* Form skeleton */}
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '48px 24px' }}>
        <div style={{ background: '#fff', border: '1px solid var(--bdr, #E2DFD8)', borderRadius: '4px', padding: '32px' }}>
          {[1, 2, 3, 4].map(i => (
            <div key={i} style={{ marginBottom: '24px' }}>
              <div style={{ height: '14px', width: '120px', background: 'var(--bdr, #E2DFD8)', borderRadius: '4px', marginBottom: '8px' }} />
              <div style={{ height: '48px', background: 'var(--surf, #FFFFFF)', border: '1px solid var(--bdr, #E2DFD8)', borderRadius: '4px' }} />
            </div>
          ))}
          <div style={{ height: '48px', background: 'var(--chrome-bg, #1B2D45)', borderRadius: '4px', opacity: 0.5 }} />
        </div>
      </div>
    </div>
  );
}
