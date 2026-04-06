export default function AttorneyLoading() {
  return (
    <div style={{ minHeight: '100vh', background: '#F7F8FA' }}>
      {/* Header skeleton */}
      <div style={{ background: '#1B3A5C', padding: '64px 24px', borderBottom: '3px solid #7C3AED' }}>
        <div style={{ maxWidth: '1140px', margin: '0 auto' }}>
          <div style={{ height: '14px', width: '140px', background: 'rgba(255,255,255,0.1)', borderRadius: '6px', marginBottom: '16px' }} />
          <div style={{ height: '40px', width: '50%', background: 'rgba(255,255,255,0.1)', borderRadius: '6px', marginBottom: '12px' }} />
          <div style={{ height: '18px', width: '70%', background: 'rgba(255,255,255,0.08)', borderRadius: '6px' }} />
        </div>
      </div>
      {/* Cards skeleton */}
      <div style={{ maxWidth: '1140px', margin: '0 auto', padding: '48px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} style={{
              background: '#FFFFFF', border: '1px solid #E5E7EB', borderTop: '3px solid #7C3AED',
              borderRadius: '6px', padding: '28px', height: '180px',
            }}>
              <div style={{ height: '18px', width: '60%', background: '#E5E7EB', borderRadius: '6px', marginBottom: '12px' }} />
              <div style={{ height: '14px', width: '90%', background: '#F0F1F2', borderRadius: '6px', marginBottom: '8px' }} />
              <div style={{ height: '14px', width: '70%', background: '#F0F1F2', borderRadius: '6px' }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
