export default function CalculatorLoading() {
  return (
    <div style={{ minHeight: '100vh', background: '#F7F8FA' }}>
      {/* Header skeleton */}
      <div style={{ background: '#1B3A5C', padding: '48px 24px', borderBottom: '3px solid #7C3AED' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ height: '14px', width: '120px', background: 'rgba(255,255,255,0.1)', borderRadius: '6px', marginBottom: '16px' }} />
          <div style={{ height: '36px', width: '60%', background: 'rgba(255,255,255,0.1)', borderRadius: '6px', marginBottom: '12px' }} />
          <div style={{ height: '18px', width: '80%', background: 'rgba(255,255,255,0.08)', borderRadius: '6px' }} />
        </div>
      </div>
      {/* Form skeleton */}
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '48px 24px' }}>
        <div style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '6px', padding: '32px' }}>
          {[1, 2, 3, 4].map(i => (
            <div key={i} style={{ marginBottom: '24px' }}>
              <div style={{ height: '14px', width: '120px', background: '#E5E7EB', borderRadius: '6px', marginBottom: '8px' }} />
              <div style={{ height: '48px', background: '#FAFBFC', border: '1px solid #E5E7EB', borderRadius: '6px' }} />
            </div>
          ))}
          <div style={{ height: '48px', background: '#7C3AED', borderRadius: '6px', opacity: 0.5 }} />
        </div>
      </div>
    </div>
  );
}
