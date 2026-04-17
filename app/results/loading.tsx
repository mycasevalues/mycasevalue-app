export default function ResultsLoading() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-surface-1)', fontFamily: 'var(--font-body)' }}>
      {/* Header skeleton with search info */}
      <div style={{ background: 'var(--card, #FFFFFF)', padding: '48px 24px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ height: '14px', width: '100px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', marginBottom: '16px' }} />
          <div style={{ height: '36px', width: '70%', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', marginBottom: '12px' }} />
          <div style={{ height: '14px', width: '200px', background: 'rgba(255,255,255,0.08)', borderRadius: '4px' }} />
        </div>
      </div>

      {/* Results cards */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 24px' }}>
        {[1, 2, 3, 4].map(i => (
          <div key={i} style={{
            background: 'var(--color-surface-0)',
            border: '1px solid var(--border-default)',
            borderRadius: '4px',
            padding: '24px',
            marginBottom: '16px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.08)'
          }}>
            {/* Title skeleton */}
            <div style={{ height: '20px', width: '70%', background: 'var(--border-default)', borderRadius: '4px', marginBottom: '12px' }} />

            {/* Description lines */}
            <div style={{ marginBottom: '16px' }}>
              <div style={{ height: '14px', width: '100%', background: 'rgba(255,255,255,0.04)', borderRadius: '4px', marginBottom: '8px' }} />
              <div style={{ height: '14px', width: '95%', background: 'rgba(255,255,255,0.04)', borderRadius: '4px' }} />
            </div>

            {/* Statistics placeholders */}
            <div style={{ display: 'flex', gap: '24px', paddingTop: '16px', borderTop: '1px solid var(--border-default)' }}>
              {[1, 2, 3].map(j => (
                <div key={j} style={{ flex: 1 }}>
                  <div style={{ height: '16px', width: '60%', background: 'var(--border-default)', borderRadius: '4px', marginBottom: '6px' }} />
                  <div style={{ height: '12px', width: '40%', background: 'rgba(255,255,255,0.04)', borderRadius: '4px' }} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
