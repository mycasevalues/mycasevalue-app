export default function ContactLoading() {
  return (
    <div style={{ minHeight: '100vh', background: '#F5F6F7' }}>
      <div style={{ background: '#00172E', padding: '48px 24px', borderBottom: '3px solid #E8171F' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ height: '36px', width: '200px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', marginBottom: '12px' }} />
          <div style={{ height: '16px', width: '300px', background: 'rgba(255,255,255,0.08)', borderRadius: '4px' }} />
        </div>
      </div>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '48px 24px' }}>
        <div style={{ background: '#FFFFFF', border: '1px solid #D5D8DC', borderRadius: '4px', padding: '32px' }}>
          <div style={{ height: '24px', width: '200px', background: '#E5EBF0', borderRadius: '4px', marginBottom: '24px' }} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
            <div style={{ height: '48px', background: '#FAFBFC', border: '1px solid #D5D8DC', borderRadius: '4px' }} />
            <div style={{ height: '48px', background: '#FAFBFC', border: '1px solid #D5D8DC', borderRadius: '4px' }} />
          </div>
          <div style={{ height: '48px', background: '#FAFBFC', border: '1px solid #D5D8DC', borderRadius: '4px', marginBottom: '16px' }} />
          <div style={{ height: '140px', background: '#FAFBFC', border: '1px solid #D5D8DC', borderRadius: '4px', marginBottom: '16px' }} />
          <div style={{ height: '48px', background: '#E8171F', borderRadius: '4px', opacity: 0.5 }} />
        </div>
      </div>
    </div>
  );
}
