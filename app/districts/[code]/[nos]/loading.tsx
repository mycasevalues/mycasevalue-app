export default function Loading() {
  return (
    <div style={{ background: 'var(--color-surface-1)', minHeight: '100vh' }}>
      {/* Breadcrumb Skeleton */}
      <nav style={{
        background: 'var(--color-surface-0)',
        borderBottom: '1px solid var(--bdr, #E2DFD8)',
        padding: '12px 0',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(16px, 3vw, 48px)' }}>
          <div
            style={{
              height: 16,
              background: 'var(--bdr, #E2DFD8)',
              borderRadius: 4,
              width: 200,
              animation: 'pulse 2s infinite',
            }}
          />
        </div>
      </nav>

      {/* Hero Skeleton */}
      <header style={{
        background: 'var(--accent-primary)',
        borderBottom: '1px solid var(--bdr, #E2DFD8)',
        padding: 'clamp(32px, 6vw, 56px) 0',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(16px, 3vw, 48px)' }}>
          <div
            style={{
              height: 28,
              background: 'var(--bdr, #E2DFD8)',
              borderRadius: 4,
              width: 80,
              marginBottom: 16,
              animation: 'pulse 2s infinite',
            }}
          />
          <div
            style={{
              height: 48,
              background: 'var(--bdr, #E2DFD8)',
              borderRadius: 4,
              width: '70%',
              marginBottom: 24,
              animation: 'pulse 2s infinite',
            }}
          />
        </div>
      </header>

      {/* Content Skeleton */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: 'clamp(32px, 5vw, 56px) clamp(16px, 3vw, 48px)' }}>
        {/* Metrics Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 16,
          marginBottom: 56,
        }}>
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              style={{
                background: 'var(--color-surface-0)',
                border: '1px solid var(--bdr, #E2DFD8)',
                borderRadius: '4px',
                padding: '20px',
              }}
            >
              <div
                style={{
                  height: 12,
                  background: 'var(--bdr, #E2DFD8)',
                  borderRadius: 4,
                  marginBottom: 12,
                  animation: 'pulse 2s infinite',
                }}
              />
              <div
                style={{
                  height: 32,
                  background: 'var(--bdr, #E2DFD8)',
                  borderRadius: 4,
                  animation: 'pulse 2s infinite',
                }}
              />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}
