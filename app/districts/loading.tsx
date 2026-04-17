export default function DistrictsLoading() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--surf, #F6F5F2)', fontFamily: 'var(--font-ui)' }}>
      {/* Navy header with title skeleton */}
      <div style={{ background: 'var(--card, #FFFFFF)', padding: '48px 24px', borderBottom: '1px solid var(--bdr, #E2DFD8)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ height: '14px', width: '100px', background: '#F0F0F0', borderRadius: '4px', marginBottom: '16px' }} />
          <div style={{ height: '42px', width: '50%', background: '#F0F0F0', borderRadius: '4px', marginBottom: '12px' }} />
          <div style={{ height: '14px', width: '70%', background: 'var(--bdr, #E2DFD8)', borderRadius: '4px' }} />
        </div>
      </div>

      {/* Grid of district cards */}
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '32px 24px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '24px'
        }}>
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} style={{
              background: 'var(--card, #FFFFFF)',
              border: '1px solid var(--bdr, #E2DFD8)',
              borderRadius: '4px',
              padding: '24px',
              minHeight: '160px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.08)'
            }}>
              <div style={{ height: '20px', width: '75%', background: 'var(--bdr, #E2DFD8)', borderRadius: '4px', marginBottom: '12px' }} />
              <div style={{ height: '14px', width: '100%', background: '#F0F0F0', borderRadius: '4px', marginBottom: '8px' }} />
              <div style={{ height: '14px', width: '100%', background: '#F0F0F0', borderRadius: '4px', marginBottom: '8px' }} />
              <div style={{ height: '14px', width: '85%', background: '#F0F0F0', borderRadius: '4px' }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
