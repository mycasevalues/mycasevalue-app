export default function DashboardLoading() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-surface-1)' }}>
      {/* Header skeleton */}
      <div style={{ background: 'var(--card)', padding: '48px 24px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: '1140px', margin: '0 auto' }}>
          <div style={{ height: '32px', width: '200px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', marginBottom: '8px' }} />
          <div style={{ height: '16px', width: '300px', background: 'rgba(255,255,255,0.08)', borderRadius: '4px' }} />
        </div>
      </div>
      {/* Dashboard grid skeleton */}
      <div style={{ maxWidth: '1140px', margin: '0 auto', padding: '32px 24px' }}>
        {/* Stats row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '32px' }}>
          {[1, 2, 3, 4].map(i => (
            <div key={i} style={{
              background: 'var(--color-surface-0)', border: '1px solid var(--border-default)', borderRadius: '4px', padding: '24px',
            }}>
              <div style={{ height: '14px', width: '60%', background: 'var(--border-default)', borderRadius: '4px', marginBottom: '12px' }} />
              <div style={{ height: '28px', width: '40%', background: 'rgba(255,255,255,0.04)', borderRadius: '4px' }} />
            </div>
          ))}
        </div>
        {/* Content area */}
        <div style={{ background: 'var(--color-surface-0)', border: '1px solid var(--border-default)', borderRadius: '4px', padding: '32px', height: '400px' }}>
          <div style={{ height: '20px', width: '30%', background: 'var(--border-default)', borderRadius: '4px', marginBottom: '24px' }} />
          {[1, 2, 3].map(i => (
            <div key={i} style={{ height: '60px', background: 'var(--color-surface-1)', borderRadius: '4px', marginBottom: '12px' }} />
          ))}
        </div>
      </div>
    </div>
  );
}
