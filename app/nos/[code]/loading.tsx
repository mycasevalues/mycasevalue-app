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
          gap: 24px;
        }
        @media (max-width: 768px) {
          .nos-skeleton-stat-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }
        }
      `}</style>

      <div style={{ minHeight: '100vh', background: 'var(--surf)' }}>
        {/* Dark Navy Header Skeleton */}
        <div style={{ background: 'var(--card)', borderBottom: '1px solid rgba(0,0,0,0.2)' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', padding: 'clamp(24px, 4vw, 32px) 24px' }}>
            {/* Breadcrumb skeleton */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
              {[1, 2, 3].map((i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div
                    style={{
                      width: '60px',
                      height: '14px',
                      background: 'var(--bdr)',
                      borderRadius: '4px',
                      animation: 'pulse-skeleton 2s ease-in-out infinite',
                    }}
                  />
                  {i < 3 && <span style={{ color: 'var(--chrome-text-muted)' }}>/</span>}
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
                    background: 'var(--bdr)',
                    borderRadius: '4px',
                    marginBottom: '12px',
                    animation: 'pulse-skeleton 2s ease-in-out infinite',
                  }}
                />
                <div
                  style={{
                    height: '28px',
                    width: '140px',
                    background: 'var(--link)',
                    borderRadius: '4px',
                    animation: 'pulse-skeleton 2s ease-in-out infinite',
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* White Subheader Section Skeleton */}
        <div style={{ background: 'var(--card)', borderBottom: '1px solid var(--bdr)' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', padding: 'clamp(16px, 3vw, 28px) 24px' }}>
            {/* Description lines skeleton */}
            <div style={{ marginBottom: '24px' }}>
              <div
                style={{
                  height: '14px',
                  width: '85%',
                  background: 'var(--bdr)',
                  marginBottom: '8px',
                  borderRadius: '4px',
                  animation: 'pulse-skeleton 2s ease-in-out infinite',
                }}
              />
              <div
                style={{
                  height: '14px',
                  width: '70%',
                  background: 'var(--bdr)',
                  borderRadius: '4px',
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
                    background: 'var(--bdr)',
                    borderRadius: '4px',
                    animation: 'pulse-skeleton 2s ease-in-out infinite',
                  }}
                />
              ))}
            </div>

            {/* Data source badges skeleton */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  style={{
                    width: '150px',
                    height: '28px',
                    background: 'var(--bdr)',
                    borderRadius: '4px',
                    border: '1px solid var(--bdr)',
                    animation: 'pulse-skeleton 2s ease-in-out infinite',
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Main Content Skeleton */}
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: 'clamp(24px, 4vw, 40px) 24px' }}>
          {/* Case Type Overview Section */}
          <section
            style={{
              background: 'var(--card)',
              border: '1px solid var(--bdr)',
              borderRadius: '4px',
              padding: '32px',
              marginBottom: '24px',
              boxShadow: 'var(--shadow-xs)',
            }}
          >
            <div style={{ marginBottom: '24px' }}>
              <div
                style={{
                  height: '18px',
                  width: '30%',
                  background: 'var(--bdr)',
                  marginBottom: '8px',
                  borderRadius: '4px',
                  animation: 'pulse-skeleton 2s ease-in-out infinite',
                }}
              />
              <div
                style={{
                  height: '14px',
                  width: '50%',
                  background: 'var(--bdr)',
                  borderRadius: '4px',
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
                    padding: '32px 24px',
                    background: 'var(--surf)',
                    borderRadius: '4px',
                    border: '1px solid var(--bdr)',
                  }}
                >
                  <div
                    style={{
                      height: '40px',
                      width: '70%',
                      background: 'var(--bdr)',
                      margin: '0 auto 12px',
                      borderRadius: '4px',
                      animation: 'pulse-skeleton 2s ease-in-out infinite',
                    }}
                  />
                  <div
                    style={{
                      height: '14px',
                      width: '80%',
                      background: 'var(--bdr)',
                      margin: '0 auto 8px',
                      borderRadius: '4px',
                      animation: 'pulse-skeleton 2s ease-in-out infinite',
                    }}
                  />
                  <div
                    style={{
                      height: '12px',
                      width: '70%',
                      background: 'var(--bdr)',
                      margin: '0 auto',
                      borderRadius: '4px',
                      animation: 'pulse-skeleton 2s ease-in-out infinite',
                    }}
                  />
                </div>
              ))}
            </div>

            <div
              style={{
                marginTop: '24px',
                height: '12px',
                width: '50%',
                background: 'var(--bdr)',
                margin: '24px auto 0',
                borderRadius: '4px',
                animation: 'pulse-skeleton 2s ease-in-out infinite',
              }}
            />
          </section>

          {/* Case Timeline Section */}
          <section
            style={{
              background: 'var(--card)',
              border: '1px solid var(--bdr)',
              borderRadius: '4px',
              padding: '32px',
              marginBottom: '24px',
              boxShadow: 'var(--shadow-xs)',
            }}
          >
            <div style={{ marginBottom: '24px' }}>
              <div
                style={{
                  height: '18px',
                  width: '28%',
                  background: 'var(--bdr)',
                  marginBottom: '8px',
                  borderRadius: '4px',
                  animation: 'pulse-skeleton 2s ease-in-out infinite',
                }}
              />
              <div
                style={{
                  height: '14px',
                  width: '50%',
                  background: 'var(--bdr)',
                  borderRadius: '4px',
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
                    padding: '24px',
                    background: 'var(--surf)',
                    borderRadius: '4px',
                    border: '1px solid var(--bdr)',
                  }}
                >
                  <div
                    style={{
                      height: '14px',
                      width: '40%',
                      background: 'var(--bdr)',
                      marginBottom: '8px',
                      borderRadius: '4px',
                      animation: 'pulse-skeleton 2s ease-in-out infinite',
                    }}
                  />
                  <div
                    style={{
                      height: '12px',
                      width: '60%',
                      background: 'var(--bdr)',
                      borderRadius: '4px',
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
              background: 'var(--card)',
              border: '1px solid var(--bdr)',
              borderRadius: '4px',
              padding: '32px',
              marginBottom: '24px',
              boxShadow: 'var(--shadow-xs)',
            }}
          >
            <div style={{ marginBottom: '24px' }}>
              <div
                style={{
                  height: '18px',
                  width: '30%',
                  background: 'var(--bdr)',
                  marginBottom: '8px',
                  borderRadius: '4px',
                  animation: 'pulse-skeleton 2s ease-in-out infinite',
                }}
              />
              <div
                style={{
                  height: '14px',
                  width: '50%',
                  background: 'var(--bdr)',
                  borderRadius: '4px',
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
                    background: 'var(--bdr)',
                    borderRadius: '4px',
                    animation: 'pulse-skeleton 2s ease-in-out infinite',
                  }}
                />
              ))}
            </div>
          </section>

          {/* Related Cases Section */}
          <section
            style={{
              background: 'var(--card)',
              border: '1px solid var(--bdr)',
              borderRadius: '4px',
              padding: '32px',
              boxShadow: 'var(--shadow-xs)',
            }}
          >
            <div style={{ marginBottom: '24px' }}>
              <div
                style={{
                  height: '18px',
                  width: '25%',
                  background: 'var(--bdr)',
                  marginBottom: '8px',
                  borderRadius: '4px',
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
                    background: 'var(--surf)',
                    borderRadius: '4px',
                    border: '1px solid var(--bdr)',
                  }}
                >
                  <div
                    style={{
                      height: '14px',
                      width: '70%',
                      background: 'var(--bdr)',
                      marginBottom: '8px',
                      borderRadius: '4px',
                      animation: 'pulse-skeleton 2s ease-in-out infinite',
                    }}
                  />
                  <div
                    style={{
                      height: '12px',
                      width: '50%',
                      background: 'var(--bdr)',
                      borderRadius: '4px',
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
