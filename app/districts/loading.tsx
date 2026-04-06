export default function DistrictsLoading() {
  return (
    <div style={{ minHeight: '100vh', background: '#F7F8FA', fontFamily: 'var(--font-body)' }}>
      {/* Navy header with title skeleton */}
      <div style={{ background: '#1B3A5C', padding: '48px 24px', borderBottom: '3px solid #8B5CF6' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ height: '14px', width: '100px', background: 'rgba(255,255,255,0.1)', borderRadius: '12px', marginBottom: '16px' }} />
          <div style={{ height: '42px', width: '50%', background: 'rgba(255,255,255,0.1)', borderRadius: '12px', marginBottom: '12px' }} />
          <div style={{ height: '14px', width: '70%', background: 'rgba(255,255,255,0.08)', borderRadius: '12px' }} />
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
              background: '#FFFFFF',
              border: '1px solid #E5E7EB',
              borderRadius: '12px',
              padding: '24px',
              minHeight: '160px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.08)'
            }}>
              <div style={{ height: '20px', width: '75%', background: '#E5E7EB', borderRadius: '12px', marginBottom: '12px' }} />
              <div style={{ height: '14px', width: '100%', background: '#F0F1F2', borderRadius: '12px', marginBottom: '8px' }} />
              <div style={{ height: '14px', width: '100%', background: '#F0F1F2', borderRadius: '12px', marginBottom: '8px' }} />
              <div style={{ height: '14px', width: '85%', background: '#F0F1F2', borderRadius: '12px' }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
