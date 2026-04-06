export default function CategoryLoading() {
  return (
    <div style={{ minHeight: '100vh', background: '#F5F6F7', fontFamily: 'var(--font-body)' }}>
      {/* Hero header skeleton */}
      <div style={{ background: '#00172E', padding: '48px 24px', borderBottom: '3px solid #E8171F' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ height: '36px', width: '40%', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', marginBottom: '16px' }} />
          <div style={{ height: '48px', background: 'rgba(255,255,255,0.08)', borderRadius: '4px', marginBottom: '12px' }} />
          <div style={{ height: '18px', width: '60%', background: 'rgba(255,255,255,0.08)', borderRadius: '4px' }} />
        </div>
      </div>

      {/* Case type cards grid */}
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '32px 24px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '24px'
        }}>
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} style={{
              background: '#FFFFFF',
              border: '1px solid #D5D8DC',
              borderRadius: '4px',
              padding: '24px',
              minHeight: '160px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.08)'
            }}>
              <div style={{ height: '24px', width: '80%', background: '#E5EBF0', borderRadius: '4px', marginBottom: '12px' }} />
              <div style={{ height: '14px', width: '100%', background: '#F0F1F2', borderRadius: '4px', marginBottom: '8px' }} />
              <div style={{ height: '14px', width: '90%', background: '#F0F1F2', borderRadius: '4px' }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
