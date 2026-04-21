export default function AttorneyLoading() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--surf, #FFFFFF)' }}>
      {/* Header skeleton */}
      <div style={{ background: 'var(--chrome-bg, #1B2D45)', padding: '64px 24px', borderBottom: '3px solid var(--bdr, #E5E7EB)' }}>
        <div style={{ maxWidth: '1140px', margin: '0 auto' }}>
          <div style={{ height: '14px', width: '140px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', marginBottom: '16px' }} />
          <div style={{ height: '40px', width: '50%', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', marginBottom: '12px' }} />
          <div style={{ height: '18px', width: '70%', background: 'rgba(255,255,255,0.08)', borderRadius: '4px' }} />
        </div>
      </div>
      {/* Cards skeleton */}
      <div style={{ maxWidth: '1140px', margin: '0 auto', padding: '48px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} style={{
              background: '#fff', border: '1px solid var(--bdr, #E5E7EB)', borderTop: '3px solid var(--chrome-bg, #1B2D45)',
              borderRadius: '4px', padding: '32px', height: '180px',
            }}>
              <div style={{ height: '18px', width: '60%', background: 'var(--bdr, #E5E7EB)', borderRadius: '4px', marginBottom: '12px' }} />
              <div style={{ height: '14px', width: '90%', background: 'var(--surf, #FFFFFF)', borderRadius: '4px', marginBottom: '8px' }} />
              <div style={{ height: '14px', width: '70%', background: 'var(--surf, #FFFFFF)', borderRadius: '4px' }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
