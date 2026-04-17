export default function AccountLoading() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-surface-1)' }}>
      <div style={{ background: 'var(--card)', padding: '48px 24px', borderBottom: '1px solid var(--bdr)' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ height: '32px', width: '180px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', marginBottom: '8px' }} />
          <div style={{ height: '16px', width: '280px', background: 'rgba(255,255,255,0.08)', borderRadius: '4px' }} />
        </div>
      </div>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '32px 24px' }}>
        {[1, 2, 3].map(i => (
          <div key={i} style={{
            background: 'var(--color-surface-0)', border: '1px solid var(--border-default)', borderRadius: '4px',
            padding: '32px', marginBottom: '16px',
          }}>
            <div style={{ height: '18px', width: '30%', background: 'var(--border-default)', borderRadius: '4px', marginBottom: '16px' }} />
            <div style={{ height: '14px', width: '60%', background: 'rgba(255,255,255,0.04)', borderRadius: '4px', marginBottom: '8px' }} />
            <div style={{ height: '14px', width: '45%', background: 'rgba(255,255,255,0.04)', borderRadius: '4px' }} />
          </div>
        ))}
      </div>
    </div>
  );
}
