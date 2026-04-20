export default function AboutLoading() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--surf)' }}>
      <div style={{ background: 'var(--card)', padding: '64px 24px', borderBottom: '3px solid var(--link)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ height: '40px', width: '50%', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', marginBottom: '16px' }} />
          <div style={{ height: '18px', width: '70%', background: 'rgba(255,255,255,0.08)', borderRadius: '4px' }} />
        </div>
      </div>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '48px 24px' }}>
        {[1, 2, 3].map(i => (
          <div key={i} style={{ marginBottom: '32px' }}>
            <div style={{ height: '24px', width: '40%', background: 'var(--bdr)', borderRadius: '4px', marginBottom: '16px' }} />
            <div style={{ height: '14px', width: '100%', background: 'rgba(255,255,255,0.04)', borderRadius: '4px', marginBottom: '8px' }} />
            <div style={{ height: '14px', width: '90%', background: 'rgba(255,255,255,0.04)', borderRadius: '4px', marginBottom: '8px' }} />
            <div style={{ height: '14px', width: '75%', background: 'rgba(255,255,255,0.04)', borderRadius: '4px' }} />
          </div>
        ))}
      </div>
    </div>
  );
}
