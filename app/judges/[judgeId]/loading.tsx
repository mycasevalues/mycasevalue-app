'use client';

export default function LoadingPage() {
  const shimmerStyle = {
    animation: 'shimmer 2s infinite',
    backgroundSize: '200% 100%',
    backgroundImage: 'linear-gradient(90deg, var(--tbl-hdr, #EDEAE4) 0%, var(--bdr, #E2DFD8) 50%, var(--tbl-hdr, #EDEAE4) 100%)',
  };

  return (
    <div style={{ background: 'var(--surf, #F6F5F2)', minHeight: '100vh' }}>
      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>

      {/* Header skeleton */}
      <div style={{ borderBottom: '1px solid var(--bdr, #E2DFD8)', background: 'var(--card)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          {/* Breadcrumb skeleton */}
          <div style={{ paddingTop: '16px', paddingBottom: '16px' }}>
            <div style={{ ...shimmerStyle, height: '14px', width: '200px', borderRadius: '4px', marginBottom: '16px' }} />
          </div>

          {/* Heading skeletons */}
          <div style={{ paddingTop: '0px', paddingBottom: '24px' }}>
            <div style={{ ...shimmerStyle, height: '12px', width: '80px', borderRadius: '4px', marginBottom: '12px' }} />
            <div style={{ ...shimmerStyle, height: '32px', width: '300px', borderRadius: '4px', marginBottom: '12px' }} />
            <div style={{ ...shimmerStyle, height: '16px', width: '250px', borderRadius: '4px', marginBottom: '12px' }} />
            <div style={{ ...shimmerStyle, height: '16px', width: '320px', borderRadius: '4px', marginTop: '12px' }} />
          </div>
        </div>
      </div>

      {/* Main content skeleton */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px' }}>
        {/* Statistics row skeleton */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '16px',
            marginBottom: '48px',
          }}
        >
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} style={{ background: 'var(--card)', padding: '24px', borderRadius: '4px', border: '1px solid var(--bdr, #E2DFD8)' }}>
              <div style={{ ...shimmerStyle, height: '14px', width: '120px', borderRadius: '4px', marginBottom: '12px' }} />
              <div style={{ ...shimmerStyle, height: '28px', width: '80px', borderRadius: '4px', marginBottom: '8px' }} />
              <div style={{ ...shimmerStyle, height: '12px', width: '100px', borderRadius: '4px' }} />
            </div>
          ))}
        </div>

        {/* Radar chart skeleton */}
        <div style={{ background: 'var(--card)', padding: '32px', borderRadius: '4px', border: '1px solid var(--bdr, #E2DFD8)', marginBottom: '48px' }}>
          <div style={{ ...shimmerStyle, height: '20px', width: '150px', borderRadius: '4px', marginBottom: '16px' }} />
          <div style={{ ...shimmerStyle, height: '340px', width: '100%', borderRadius: '4px' }} />
        </div>

        {/* Table skeleton */}
        <div style={{ background: 'var(--card)', padding: '32px', borderRadius: '4px', border: '1px solid var(--bdr, #E2DFD8)' }}>
          <div style={{ ...shimmerStyle, height: '20px', width: '180px', borderRadius: '4px', marginBottom: '24px' }} />
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '16px', paddingBottom: '16px', borderBottom: '1px solid var(--bdr, #E2DFD8)' }}>
              <div style={{ ...shimmerStyle, height: '14px', borderRadius: '4px' }} />
              <div style={{ ...shimmerStyle, height: '14px', borderRadius: '4px' }} />
              <div style={{ ...shimmerStyle, height: '14px', borderRadius: '4px' }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
