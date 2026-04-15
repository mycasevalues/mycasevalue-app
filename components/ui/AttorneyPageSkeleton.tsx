/**
 * Reusable loading skeleton for attorney tool sub-pages.
 * Matches the Lexis+ design language with navy header + content cards.
 */
export default function AttorneyPageSkeleton({
  headerLines = 2,
  cards = 3,
  columns = 1,
  showTabs = false,
}: {
  headerLines?: number;
  cards?: number;
  columns?: 1 | 2 | 3;
  showTabs?: boolean;
}) {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-surface-1)' }}>
      <style>{`
        @keyframes skeletonPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        .skel-pulse { animation: skeletonPulse 1.5s ease-in-out infinite; }
      `}</style>

      {/* Navy header skeleton */}
      <div style={{ backgroundColor: 'var(--accent-primary)', color: 'var(--color-surface-0)', padding: '32px 20px' }}>
        <div style={{ maxWidth: '1140px', margin: '0 auto' }}>
          {/* Breadcrumb */}
          <div className="skel-pulse" style={{ height: 12, width: 180, background: 'rgba(255,255,255,0.1)', borderRadius: 2, marginBottom: 20 }} />
          {/* Badge */}
          <div className="skel-pulse" style={{ height: 26, width: 120, background: 'var(--accent-primary)', borderRadius: 2, marginBottom: 16, opacity: 0.5 }} />
          {/* Title */}
          <div className="skel-pulse" style={{ height: 36, width: '45%', background: 'rgba(255,255,255,0.12)', borderRadius: 2, marginBottom: 12 }} />
          {/* Description */}
          {Array.from({ length: headerLines }).map((_, i) => (
            <div key={i} className="skel-pulse" style={{ height: 16, width: i === 0 ? '65%' : '45%', background: 'rgba(255,255,255,0.07)', borderRadius: 2, marginBottom: 8 }} />
          ))}
        </div>
      </div>

      {/* Content area */}
      <div style={{ maxWidth: '1140px', margin: '0 auto', padding: '32px 20px' }}>
        {/* Optional tabs */}
        {showTabs && (
          <div style={{ display: 'flex', gap: 0, marginBottom: 24, borderBottom: '1px solid var(--border-default)' }}>
            {[1, 2, 3].map(i => (
              <div
                key={i}
                className="skel-pulse"
                style={{
                  height: 40,
                  width: 100,
                  background: i === 1 ? 'var(--color-surface-0)' : 'var(--color-surface-1)',
                  borderTop: i === 1 ? '2px solid var(--accent-primary)' : '2px solid transparent',
                  borderLeft: '1px solid var(--border-default)',
                  borderRight: '1px solid var(--border-default)',
                  padding: '10px 16px',
                }}
              />
            ))}
          </div>
        )}

        {/* Cards grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: columns === 3 ? 'repeat(3, 1fr)' : columns === 2 ? 'repeat(2, 1fr)' : '1fr',
          gap: 20,
        }}>
          {Array.from({ length: cards }).map((_, i) => (
            <div
              key={i}
              className="skel-pulse"
              style={{
                background: 'var(--color-surface-0)',
                border: '1px solid var(--border-default)',
                borderRadius: 2,
                padding: 24,
                animationDelay: `${i * 150}ms`,
              }}
            >
              {/* Card header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <div style={{ height: 18, width: '50%', background: 'var(--border-default)', borderRadius: 2 }} />
                <div style={{ height: 24, width: 60, background: '#F0F3F5', borderRadius: 2 }} />
              </div>
              {/* Card body lines */}
              <div style={{ height: 14, width: '90%', background: '#F0F1F2', borderRadius: 2, marginBottom: 10 }} />
              <div style={{ height: 14, width: '75%', background: '#F0F1F2', borderRadius: 2, marginBottom: 10 }} />
              <div style={{ height: 14, width: '60%', background: 'var(--color-surface-1)', borderRadius: 2, marginBottom: 16 }} />
              {/* Card footer bar */}
              <div style={{ height: 8, width: '100%', background: 'var(--color-surface-1)', borderRadius: 2 }}>
                <div style={{ height: '100%', width: `${30 + (i * 15) % 50}%`, background: 'var(--border-default)', borderRadius: 2 }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
