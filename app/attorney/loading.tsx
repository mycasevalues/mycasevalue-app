export default function AttorneyLoading() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-surface-1)' }}>
      {/* Header skeleton */}
      <div style={{ background: '#080d19', padding: '64px 24px', borderBottom: '3px solid var(--accent-primary)' }}>
        <div style={{ maxWidth: '1140px', margin: '0 auto' }}>
          <div style={{ height: '14px', width: '140px', background: 'rgba(255,255,255,0.1)', borderRadius: '12px', marginBottom: '16px' }} />
          <div style={{ height: '40px', width: '50%', background: 'rgba(255,255,255,0.1)', borderRadius: '12px', marginBottom: '12px' }} />
          <div style={{ height: '18px', width: '70%', background: 'rgba(255,255,255,0.08)', borderRadius: '12px' }} />
        </div>
      </div>
      {/* Cards skeleton */}
      <div style={{ maxWidth: '1140px', margin: '0 auto', padding: '48px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} style={{
              background: 'var(--color-surface-0)', border: '1px solid var(--border-default)', borderTop: '3px solid var(--accent-primary)',
              borderRadius: '12px', padding: '28px', height: '180px',
            }}>
              <div style={{ height: '18px', width: '60%', background: 'var(--border-default)', borderRadius: '12px', marginBottom: '12px' }} />
              <div style={{ height: '14px', width: '90%', background: 'rgba(255,255,255,0.04)', borderRadius: '12px', marginBottom: '8px' }} />
              <div style={{ height: '14px', width: '70%', background: 'rgba(255,255,255,0.04)', borderRadius: '12px' }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
