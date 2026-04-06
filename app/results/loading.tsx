export default function ResultsLoading() {
  return (
    <div style={{ minHeight: '100vh', background: '#F7F8FA', fontFamily: 'var(--font-body)' }}>
      {/* Header skeleton with search info */}
      <div style={{ background: '#1B3A5C', padding: '48px 24px', borderBottom: '3px solid #8B5CF6' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ height: '14px', width: '100px', background: 'rgba(255,255,255,0.1)', borderRadius: '12px', marginBottom: '16px' }} />
          <div style={{ height: '36px', width: '70%', background: 'rgba(255,255,255,0.1)', borderRadius: '12px', marginBottom: '12px' }} />
          <div style={{ height: '14px', width: '200px', background: 'rgba(255,255,255,0.08)', borderRadius: '12px' }} />
        </div>
      </div>

      {/* Results cards */}
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '32px 24px' }}>
        {[1, 2, 3, 4].map(i => (
          <div key={i} style={{
            background: '#FFFFFF',
            border: '1px solid #E5E7EB',
            borderRadius: '12px',
            padding: '24px',
            marginBottom: '16px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.08)'
          }}>
            {/* Title skeleton */}
            <div style={{ height: '20px', width: '70%', background: '#E5E7EB', borderRadius: '12px', marginBottom: '12px' }} />

            {/* Description lines */}
            <div style={{ marginBottom: '16px' }}>
              <div style={{ height: '14px', width: '100%', background: '#F0F1F2', borderRadius: '12px', marginBottom: '8px' }} />
              <div style={{ height: '14px', width: '95%', background: '#F0F1F2', borderRadius: '12px' }} />
            </div>

            {/* Statistics placeholders */}
            <div style={{ display: 'flex', gap: '24px', paddingTop: '16px', borderTop: '1px solid #E5E7EB' }}>
              {[1, 2, 3].map(j => (
                <div key={j} style={{ flex: 1 }}>
                  <div style={{ height: '16px', width: '60%', background: '#E5E7EB', borderRadius: '12px', marginBottom: '6px' }} />
                  <div style={{ height: '12px', width: '40%', background: '#F0F1F2', borderRadius: '12px' }} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
