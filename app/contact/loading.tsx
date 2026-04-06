export default function ContactLoading() {
  return (
    <div style={{ minHeight: '100vh', background: '#F7F8FA' }}>
      <div style={{ background: '#1B3A5C', padding: '48px 24px', borderBottom: '3px solid #8B5CF6' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ height: '36px', width: '200px', background: 'rgba(255,255,255,0.1)', borderRadius: '12px', marginBottom: '12px' }} />
          <div style={{ height: '16px', width: '300px', background: 'rgba(255,255,255,0.08)', borderRadius: '12px' }} />
        </div>
      </div>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '48px 24px' }}>
        <div style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '12px', padding: '32px' }}>
          <div style={{ height: '24px', width: '200px', background: '#E5E7EB', borderRadius: '12px', marginBottom: '24px' }} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
            <div style={{ height: '48px', background: '#FAFBFC', border: '1px solid #E5E7EB', borderRadius: '12px' }} />
            <div style={{ height: '48px', background: '#FAFBFC', border: '1px solid #E5E7EB', borderRadius: '12px' }} />
          </div>
          <div style={{ height: '48px', background: '#FAFBFC', border: '1px solid #E5E7EB', borderRadius: '12px', marginBottom: '16px' }} />
          <div style={{ height: '140px', background: '#FAFBFC', border: '1px solid #E5E7EB', borderRadius: '12px', marginBottom: '16px' }} />
          <div style={{ height: '48px', background: '#8B5CF6', borderRadius: '12px', opacity: 0.5 }} />
        </div>
      </div>
    </div>
  );
}
