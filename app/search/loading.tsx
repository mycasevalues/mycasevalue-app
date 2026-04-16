export default function SearchLoading() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-surface-1)', fontFamily: 'var(--font-body)' }}>
      {/* Header skeleton */}
      <div style={{ background: 'var(--gradient-hero)', padding: '48px 24px', borderBottom: '3px solid var(--accent-primary)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ height: '36px', width: '50%', background: 'rgba(255,255,255,0.1)', borderRadius: '12px', marginBottom: '16px' }} />
          <div style={{ height: '48px', background: 'rgba(255,255,255,0.08)', borderRadius: '12px' }} />
        </div>
      </div>
      {/* Results skeleton */}
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '32px 24px' }}>
        <div style={{ height: '14px', width: '200px', background: 'var(--border-default)', borderRadius: '12px', marginBottom: '24px' }} />
        {[1, 2, 3, 4, 5].map(i => (
          <div key={i} style={{
            background: 'var(--color-surface-0)', border: '1px solid var(--border-default)', borderRadius: '12px',
            padding: '20px', marginBottom: '12px',
          }}>
            <div style={{ height: '18px', width: '60%', background: 'var(--border-default)', borderRadius: '12px', marginBottom: '8px' }} />
            <div style={{ height: '14px', width: '80%', background: 'rgba(255,255,255,0.04)', borderRadius: '12px' }} />
          </div>
        ))}
      </div>
    </div>
  );
}
