export default function Loading() {
  return (
    <>
      <style>{`
        @keyframes pulse-skeleton {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        .nos-skeleton-stat-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        @media (max-width: 768px) {
          .nos-skeleton-stat-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }
        }
      `}</style>

      <div style={{ minHeight: '100vh', background: 'var(--color-surface-1)' }}>
        {/* Dark Navy Header Skeleton */}
        <div style={{ background: '#FFFFFF', borderBottom: '1px solid rgba(0,0,0,0.2)' }}>
          <div style={{ maxWidth: 900, margin: '0 auto', padding: 'clamp(20px, 4vw, 32px) 24px' }}>
            {/* Breadcrumb skeleton */}
            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
              {[1, 2, 3].map((i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div
                    style={{
                      width: '60px',
                      height: '14px',
                      background: 'rgba(255,255,255,0.06)',
                      borderRadius: '6px',
                      animation: 'pulse-skeleton 2s ease-in-out infinite',
                    }}
                  />
                  {i < 3 && <span style={{ color: '#556b7f' }}>/</span>}
                </div>
              ))}
            </div>

            {/* Case type name skeleton */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16 }}>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    height: 'clamp(24px, 5vw, 32px)',
                    width: '60%',
                    background: 'rgba(255,255,255,0.06)',
                    borderRadius: '6px',
                    marginBottom: '12px',
                    animation: 'pulse-skeleton 2s ease-in-out infinite',
                  }}
                />
                <div
                  style={{
                    height: '28px',
                    width: '140px',
                    background: 'var(--accent-primary)',
                    borderRadius: '6px',
                    animation: 'pulse-skeleton 2s ease-in-out infinite',
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* White Subheader Section Skeleton */}
        <div style={{ background: 'var(--color-surface-0)', borderBottom: '1px solid var(--border-default)' }}>
          <div style={{ maxWidth: 900, margin: '0 auto', padding: 'clamp(16px, 3vw, 28px) 24px' }}>
            {/* Description lines skeleton */}
            <div style={{ marginBottom: '20px' }}>
              <div
                style={{
                  height: '14px',
                  width: '85%',
                  background: 'var(--border-default)',
                  marginBottom: '8px',
                  borderRadius: '6px',
                  animation: 'pulse-skeleton 2s ease-in-out infinite',
                }}
              />
              <div
                style={{
                  height: '14px',
                  width: '70%',
                  background: 'var(--border-default)',
                  borderRadius: '6px',
                  animation: 'pulse-skeleton 2s ease-in-out infinite',
                }}
              />
            </div>

            {/* Share buttons skeleton */}
            <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  style={{
                    width: '100px',
                    height: '36px',
                    background: 'var(--border-default)',
                    borderRadius: '6px',
                    animation: 'pulse-skeleton 2s ease-in-out infinite',
                  }}
                />
              ))}
            </div>

            {/* Data source badges skeleton */}
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  style={{
                    width: '150px',
                    height: '28px',
                    background: 'var(--border-default)',
                    borderRadius: '6px',
                    border: '1px solid var(--border-default)',
                    animation: 'pulse-skeleton 2s ease-in-out infinite',
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Main Content Skeleton */}
        <div style={{ maxWidth: 900, margin: '0 auto', padding: 'clamp(20px, 4vw, 40px) 24px' }}>
          {/* Case Type Overview Section */}
          <section
            style={{
              background: 'var(--color-surface-0)',
              border: '1px solid var(--border-default)',
              borderRadius: '6px',
              padding: '32px',
              marginBottom: '24px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
            }}
          >
            <div style={{ marginBottom: '24px' }}>
              <div
                style={{
                  height: '18px',
                  width: '30%',
                  background: 'var(--border-default)',
                  marginBottom: '8px',
                  borderRadius: '6px',
                  animation: 'pulse-skeleton 2s ease-in-out infinite',
                }}
              />
              <div
                style={{
                  height: '14px',
                  width: '50%',
                  background: 'var(--border-default)',
                  borderRadius: '6px',
                  animation: 'pulse-skeleton 2s ease-in-out infinite',
                }}
              />
            </div>

            {/* Stat cards skeleton (3 in a row) */}
            <div className="nos-skeleton-stat-grid">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  style={{
                    textAlign: 'center',
                    padding: '28px 20px',
                    background: 'var(--color-surface-1)',
                    borderRadius: '6px',
                    border: '1px solid var(--border-default)',
                  }}
                >
                  <div
                    style={{
                      height: '40px',
                      width: '70%',
                      background: 'var(--border-default)',
                      margin: '0 auto 12px',
                      borderRadius: '6px',
                      animation: 'pulse-skeleton 2s ease-in-out infinite',
                    }}
                  />
                  <div
                    style={{
                      height: '14px',
                      width: '80%',
                      background: 'var(--border-default)',
                      margin: '0 auto 8px',
                      borderRadius: '6px',
                      animation: 'pulse-skeleton 2s ease-in-out infinite',
                    }}
                  />
                  <div
                    style={{
                      height: '12px',
                      width: '70%',
                      background: 'var(--border-default)',
                      margin: '0 auto',
                      borderRadius: '6px',
                      animation: 'pulse-skeleton 2s ease-in-out infinite',
                    }}
                  />
                </div>
              ))}
            </div>

            <div
              style={{
                marginTop: '20px',
                height: '12px',
                width: '50%',
                background: 'var(--border-default)',
                margin: '20px auto 0',
                borderRadius: '6px',
                animation: 'pulse-skeleton 2s ease-in-out infinite',
              }}
            />
          </section>

          {/* Case Timeline Section */}
          <section
            style={{
              background: 'var(--color-surface-0)',
              border: '1px solid var(--border-default)',
              borderRadius: '6px',
              padding: '32px',
              marginBottom: '24px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
            }}
          >
            <div style={{ marginBottom: '24px' }}>
              <div
                style={{
                  height: '18px',
                  width: '28%',
                  background: 'var(--border-default)',
                  marginBottom: '8px',
                  borderRadius: '6px',
                  animation: 'pulse-skeleton 2s ease-in-out infinite',
                }}
              />
              <div
                style={{
                  height: '14px',
                  width: '50%',
                  background: 'var(--border-default)',
                  borderRadius: '6px',
                  animation: 'pulse-skeleton 2s ease-in-out infinite',
                }}
              />
            </div>

            {/* Timeline skeleton blocks */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  style={{
                    padding: '20px',
                    background: 'var(--color-surface-1)',
                    borderRadius: '6px',
                    border: '1px solid var(--border-default)',
                  }}
                >
                  <div
                    style={{
                      height: '14px',
                      width: '40%',
                      background: 'var(--border-default)',
                      marginBottom: '8px',
                      borderRadius: '6px',
                      animation: 'pulse-skeleton 2s ease-in-out infinite',
                    }}
                  />
                  <div
                    style={{
                      height: '12px',
                      width: '60%',
                      background: 'var(--border-default)',
                      borderRadius: '6px',
                      animation: 'pulse-skeleton 2s ease-in-out infinite',
                    }}
                  />
                </div>
              ))}
            </div>
          </section>

          {/* Settlement & Outcomes Section */}
          <section
            style={{
              background: 'var(--color-surface-0)',
              border: '1px solid var(--border-default)',
              borderRadius: '6px',
              padding: '32px',
              marginBottom: '24px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
            }}
          >
            <div style={{ marginBottom: '24px' }}>
              <div
                style={{
                  height: '18px',
                  width: '30%',
                  background: 'var(--border-default)',
                  marginBottom: '8px',
                  borderRadius: '6px',
                  animation: 'pulse-skeleton 2s ease-in-out infinite',
                }}
              />
              <div
                style={{
                  height: '14px',
                  width: '50%',
                  background: 'var(--border-default)',
                  borderRadius: '6px',
                  animation: 'pulse-skeleton 2s ease-in-out infinite',
                }}
              />
            </div>

            {/* Content blocks skeleton */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  style={{
                    height: '16px',
                    width: i === 4 ? '30%' : '100%',
                    background: 'var(--border-default)',
                    borderRadius: '6px',
                    animation: 'pulse-skeleton 2s ease-in-out infinite',
                  }}
                />
              ))}
            </div>
          </section>

          {/* Related Cases Section */}
          <section
            style={{
              background: 'var(--color-surface-0)',
              border: '1px solid var(--border-default)',
              borderRadius: '6px',
              padding: '32px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
            }}
          >
            <div style={{ marginBottom: '24px' }}>
              <div
                style={{
                  height: '18px',
                  width: '25%',
                  background: 'var(--border-default)',
                  marginBottom: '8px',
                  borderRadius: '6px',
                  animation: 'pulse-skeleton 2s ease-in-out infinite',
                }}
              />
            </div>

            {/* Case list skeleton */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  style={{
                    padding: '16px',
                    background: 'var(--color-surface-1)',
                    borderRadius: '6px',
                    border: '1px solid var(--border-default)',
                  }}
                >
                  <div
                    style={{
                      height: '14px',
                      width: '70%',
                      background: 'var(--border-default)',
                      marginBottom: '8px',
                      borderRadius: '6px',
                      animation: 'pulse-skeleton 2s ease-in-out infinite',
                    }}
                  />
                  <div
                    style={{
                      height: '12px',
                      width: '50%',
                      background: 'var(--border-default)',
                      borderRadius: '6px',
                      animation: 'pulse-skeleton 2s ease-in-out infinite',
                    }}
                  />
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
