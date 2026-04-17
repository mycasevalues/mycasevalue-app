export default function CompareLoading() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-surface-1)', fontFamily: 'var(--font-body)' }}>
      {/* Header with title skeleton */}
      <div style={{ background: '#FFFFFF', padding: '48px 24px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ height: '14px', width: '80px', background: 'rgba(255,255,255,0.1)', borderRadius: '6px', marginBottom: '16px' }} />
          <div style={{ height: '42px', width: '65%', background: 'rgba(255,255,255,0.1)', borderRadius: '6px' }} />
        </div>
      </div>

      {/* Two side-by-side comparison cards */}
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '32px 24px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '24px'
        }}>
          {[1, 2].map(i => (
            <div key={i} style={{
              background: 'var(--color-surface-0)',
              border: '1px solid var(--border-default)',
              borderRadius: '6px',
              padding: '32px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.08)'
            }}>
              {/* Card header */}
              <div style={{ marginBottom: '24px', paddingBottom: '24px', borderBottom: '1px solid var(--border-default)' }}>
                <div style={{ height: '24px', width: '80%', background: 'var(--border-default)', borderRadius: '6px' }} />
              </div>

              {/* Card content rows */}
              {[1, 2, 3, 4, 5].map(j => (
                <div key={j} style={{ marginBottom: j === 5 ? 0 : '16px' }}>
                  <div style={{ height: '12px', width: '60%', background: 'rgba(255,255,255,0.04)', borderRadius: '6px', marginBottom: '6px' }} />
                  <div style={{ height: '16px', width: '90%', background: 'var(--border-default)', borderRadius: '6px' }} />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
