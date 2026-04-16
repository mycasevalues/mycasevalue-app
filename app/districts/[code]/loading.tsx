/**
 * Skeleton loading state for individual district pages.
 * Next.js automatically wraps this in a Suspense boundary.
 */

const pulseStyle: React.CSSProperties = {
  background: 'linear-gradient(90deg, #F3F2EF 25%, #E9E5DF 50%, #F3F2EF 75%)',
  backgroundSize: '200% 100%',
  animation: 'skeleton-pulse 1.5s ease-in-out infinite',
  borderRadius: '6px',
};

function Sk({ width = '100%', height = '20px', style }: { width?: string; height?: string; style?: React.CSSProperties }) {
  return <div style={{ ...pulseStyle, width, height, ...style }} />;
}

export default function Loading() {
  return (
    <div style={{ background: 'var(--color-surface-1)', minHeight: '100vh' }}>
      <style>{`
        @keyframes skeleton-pulse {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>

      {/* Breadcrumb skeleton */}
      <nav style={{
        background: 'var(--color-surface-0)',
        borderBottom: '1px solid #e5e7eb',
        padding: '12px 0',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(16px, 3vw, 48px)', display: 'flex', gap: 8, alignItems: 'center' }}>
          <Sk width="40px" height="14px" />
          <span style={{ color: '#e5e7eb' }}>{'>'}</span>
          <Sk width="60px" height="14px" />
          <span style={{ color: '#e5e7eb' }}>{'>'}</span>
          <Sk width="180px" height="14px" />
        </div>
      </nav>

      {/* Hero skeleton */}
      <header style={{
        background: 'var(--accent-primary)',
        borderBottom: '1px solid #e5e7eb',
        padding: 'clamp(32px, 6vw, 56px) 0',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(16px, 3vw, 48px)' }}>
          <Sk width="80px" height="22px" style={{ borderRadius: '4px', marginBottom: 16, opacity: 0.3 }} />
          <Sk width="360px" height="44px" style={{ marginBottom: 8, opacity: 0.3 }} />
          <Sk width="140px" height="16px" style={{ marginBottom: 32, opacity: 0.3 }} />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 24, maxWidth: 600 }}>
            <div>
              <Sk width="100px" height="10px" style={{ marginBottom: 8, opacity: 0.3 }} />
              <Sk width="80px" height="32px" style={{ opacity: 0.3 }} />
            </div>
            <div>
              <Sk width="80px" height="10px" style={{ marginBottom: 8, opacity: 0.3 }} />
              <Sk width="60px" height="32px" style={{ opacity: 0.3 }} />
            </div>
          </div>
        </div>
      </header>

      {/* Main content skeleton */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: 'clamp(32px, 5vw, 56px) clamp(16px, 3vw, 48px)' }}>
        {/* Section heading */}
        <Sk width="280px" height="22px" style={{ marginBottom: 24 }} />

        {/* Case type cards grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} style={{
              background: 'var(--color-surface-0)',
              border: '1px solid #e5e7eb',
              borderRadius: '12px',
              padding: '20px',
            }}>
              <Sk width="200px" height="15px" style={{ marginBottom: 16 }} />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16, paddingBottom: 16, borderBottom: '1px solid #e5e7eb' }}>
                <div>
                  <Sk width="60px" height="10px" style={{ marginBottom: 4 }} />
                  <Sk width="70px" height="22px" />
                </div>
                <div>
                  <Sk width="80px" height="10px" style={{ marginBottom: 4 }} />
                  <Sk width="100px" height="14px" />
                </div>
              </div>
              <Sk width="100%" height="8px" style={{ borderRadius: '4px' }} />
            </div>
          ))}
        </div>

        {/* Local Rules section skeleton */}
        <div style={{ marginTop: 48 }}>
          <Sk width="160px" height="22px" style={{ marginBottom: 24 }} />
          <div style={{ background: 'var(--color-surface-0)', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '24px' }}>
            {[1, 2, 3, 4].map((i) => (
              <div key={i} style={{ marginBottom: i < 4 ? 16 : 0 }}>
                <Sk width="240px" height="14px" style={{ marginBottom: 6 }} />
                <Sk width="100%" height="12px" />
              </div>
            ))}
          </div>
        </div>

        {/* Legal Aid section skeleton */}
        <div style={{ marginTop: 48 }}>
          <Sk width="200px" height="22px" style={{ marginBottom: 24 }} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
            {[1, 2, 3].map((i) => (
              <div key={i} style={{ background: 'var(--color-surface-0)', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px' }}>
                <Sk width="180px" height="15px" style={{ marginBottom: 12 }} />
                <Sk width="100%" height="12px" style={{ marginBottom: 6 }} />
                <Sk width="80%" height="12px" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
