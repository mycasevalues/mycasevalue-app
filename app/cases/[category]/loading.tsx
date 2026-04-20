export default function CategoryLoading() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--surf)', fontFamily: 'var(--font-ui)' }}>
      {/* Hero header skeleton */}
      <div style={{ background: 'var(--card)', padding: '48px 24px', borderBottom: '1px solid var(--bdr)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ height: '36px', width: '40%', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', marginBottom: '16px' }} />
          <div style={{ height: '48px', background: 'rgba(255,255,255,0.08)', borderRadius: '4px', marginBottom: '12px' }} />
          <div style={{ height: '18px', width: '60%', background: 'rgba(255,255,255,0.08)', borderRadius: '4px' }} />
        </div>
      </div>

      {/* Case type cards grid */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 24px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '24px'
        }}>
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} style={{
              background: 'var(--card)',
              border: '1px solid var(--bdr)',
              borderRadius: '4px',
              padding: '24px',
              minHeight: '160px',
              boxShadow: 'var(--shadow-xs)'
            }}>
              <div style={{ height: '24px', width: '80%', background: 'var(--bdr)', borderRadius: '4px', marginBottom: '12px' }} />
              <div style={{ height: '14px', width: '100%', background: 'var(--surf)', borderRadius: '4px', marginBottom: '8px' }} />
              <div style={{ height: '14px', width: '90%', background: 'var(--surf)', borderRadius: '4px' }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
