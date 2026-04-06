export default function CalculatorLoading() {
  return (
    <div style={{ minHeight: '100vh', background: '#F5F6F7' }}>
      {/* Header skeleton */}
      <div style={{ background: '#00172E', padding: '48px 24px', borderBottom: '3px solid #E8171F' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ height: '14px', width: '120px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', marginBottom: '16px' }} />
          <div style={{ height: '36px', width: '60%', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', marginBottom: '12px' }} />
          <div style={{ height: '18px', width: '80%', background: 'rgba(255,255,255,0.08)', borderRadius: '2px' }} />
        </div>
      </div>
      {/* Form skeleton */}
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '48px 24px' }}>
        <div style={{ background: '#FFFFFF', border: '1px solid #D5D8DC', borderRadius: '2px', padding: '32px' }}>
          {[1, 2, 3, 4].map(i => (
            <div key={i} style={{ marginBottom: '24px' }}>
              <div style={{ height: '14px', width: '120px', background: '#E5EBF0', borderRadius: '2px', marginBottom: '8px' }} />
              <div style={{ height: '48px', background: '#FAFBFC', border: '1px solid #D5D8DC', borderRadius: '2px' }} />
            </div>
          ))}
          <div style={{ height: '48px', background: '#E8171F', borderRadius: '2px', opacity: 0.5 }} />
        </div>
      </div>
    </div>
  );
}
