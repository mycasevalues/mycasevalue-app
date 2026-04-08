export default function AboutLoading() {
  return (
    <div style={{ minHeight: '100vh', background: '#F7F8FA' }}>
      <div style={{ background: '#0966C3', padding: '64px 24px', borderBottom: '3px solid #0966C3' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ height: '40px', width: '50%', background: 'rgba(255,255,255,0.1)', borderRadius: '12px', marginBottom: '16px' }} />
          <div style={{ height: '18px', width: '70%', background: 'rgba(255,255,255,0.08)', borderRadius: '12px' }} />
        </div>
      </div>
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '48px 24px' }}>
        {[1, 2, 3].map(i => (
          <div key={i} style={{ marginBottom: '32px' }}>
            <div style={{ height: '24px', width: '40%', background: '#E5E7EB', borderRadius: '12px', marginBottom: '16px' }} />
            <div style={{ height: '14px', width: '100%', background: '#F0F1F2', borderRadius: '12px', marginBottom: '8px' }} />
            <div style={{ height: '14px', width: '90%', background: '#F0F1F2', borderRadius: '12px', marginBottom: '8px' }} />
            <div style={{ height: '14px', width: '75%', background: '#F0F1F2', borderRadius: '12px' }} />
          </div>
        ))}
      </div>
    </div>
  );
}
