export default function AccountLoading() {
  return (
    <div style={{ minHeight: '100vh', background: '#F7F8FA' }}>
      <div style={{ background: '#1B3A5C', padding: '48px 24px', borderBottom: '3px solid #7C3AED' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ height: '32px', width: '180px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', marginBottom: '8px' }} />
          <div style={{ height: '16px', width: '280px', background: 'rgba(255,255,255,0.08)', borderRadius: '2px' }} />
        </div>
      </div>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '32px 24px' }}>
        {[1, 2, 3].map(i => (
          <div key={i} style={{
            background: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '2px',
            padding: '28px', marginBottom: '16px',
          }}>
            <div style={{ height: '18px', width: '30%', background: '#E5E7EB', borderRadius: '2px', marginBottom: '16px' }} />
            <div style={{ height: '14px', width: '60%', background: '#F0F1F2', borderRadius: '2px', marginBottom: '8px' }} />
            <div style={{ height: '14px', width: '45%', background: '#F0F1F2', borderRadius: '2px' }} />
          </div>
        ))}
      </div>
    </div>
  );
}
