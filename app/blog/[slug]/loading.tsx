export default function BlogPostLoading() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-surface-1)', fontFamily: 'var(--font-body)' }}>
      {/* Navy header with title and date skeleton */}
      <div style={{ background: 'var(--accent-primary)', padding: '40px 24px', borderBottom: '3px solid var(--accent-primary)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ height: '14px', width: '120px', background: 'rgba(255,255,255,0.1)', borderRadius: '12px', marginBottom: '16px' }} />
          <div style={{ height: '42px', width: '85%', background: 'rgba(255,255,255,0.1)', borderRadius: '12px', marginBottom: '16px' }} />
          <div style={{ height: '14px', width: '150px', background: 'rgba(255,255,255,0.08)', borderRadius: '12px' }} />
        </div>
      </div>

      {/* Content area with paragraph skeletons */}
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '32px 24px' }}>
        <div style={{
          background: 'var(--color-surface-0)',
          border: '1px solid var(--border-default)',
          borderRadius: '12px',
          padding: '32px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.08)'
        }}>
          {/* Paragraph skeletons */}
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} style={{ marginBottom: i === 5 ? 0 : '24px' }}>
              <div style={{ height: '14px', width: '100%', background: 'var(--border-default)', borderRadius: '12px', marginBottom: '8px' }} />
              <div style={{ height: '14px', width: '100%', background: 'var(--border-default)', borderRadius: '12px', marginBottom: '8px' }} />
              <div style={{ height: '14px', width: '95%', background: 'var(--border-default)', borderRadius: '12px', marginBottom: '8px' }} />
              <div style={{ height: '14px', width: '85%', background: '#F0F1F2', borderRadius: '12px' }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
