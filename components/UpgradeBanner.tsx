export default function UpgradeBanner() {
  return (
    <section
      style={{
        background: '#080d19',
        padding: '64px 24px',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div aria-hidden style={{
        position: 'absolute', inset: 0, opacity: 0.03, pointerEvents: 'none',
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }} />
      <style>{`
        .upgrade-banner-grid {
          display: grid;
          grid-template-columns: 60% 40%;
          gap: 48px;
          align-items: center;
        }
        @media (max-width: 768px) {
          .upgrade-banner-grid {
            grid-template-columns: 1fr;
            gap: 32px;
          }
          .upgrade-banner-grid > div:last-child {
            display: none;
          }
        }
        .feature-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-top: 24px;
        }
        .feature-item {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 14px;
          color: rgba(255,255,255,0.8);
          font-family: var(--font-body);
        }
        .feature-checkmark {
          flex-shrink: 0;
          width: 20px;
          height: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--accent-primary);
          font-weight: 600;
        }
        .upgrade-btn-primary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 10px 20px;
          background: #1a56db;
          color: #ffffff;
          border-radius: 6px;
          font-weight: 600;
          font-size: 13px;
          letter-spacing: -0.005em;
          text-decoration: none;
          font-family: var(--font-inter);
          border: 1px solid #1a56db;
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.08);
          cursor: pointer;
          transition: background-color 150ms ease, border-color 150ms ease;
        }
        .upgrade-btn-primary:hover {
          background: #1e40af;
          border-color: #1e40af;
        }
        .upgrade-btn-secondary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 10px 20px;
          background: transparent;
          color: #ffffff;
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 6px;
          font-weight: 600;
          font-size: 13px;
          letter-spacing: -0.005em;
          text-decoration: none;
          font-family: var(--font-inter);
          transition: border-color 150ms ease, background-color 150ms ease;
        }
        .upgrade-btn-secondary:hover {
          border-color: rgba(255,255,255,0.5);
          background: rgba(255,255,255,0.04);
        }
      `}</style>

      <div style={{ maxWidth: '1140px', margin: '0 auto' }}>
        <div className="upgrade-banner-grid">
          {/* Left Side */}
          <div>
            <div style={{
              display: 'inline-flex', alignItems: 'center',
              background: 'rgba(10, 102, 194, 0.2)', color: 'var(--accent-primary)',
              fontSize: '11px', fontWeight: 600, textTransform: 'uppercase',
              padding: '6px 12px', borderRadius: '12px', marginBottom: '16px',
              letterSpacing: '0.08em',
            }}>
              NEW
            </div>

            <h2 style={{
              fontSize: '32px', fontWeight: 600, color: 'var(--color-text-inverse)',
              margin: '0 0 16px 0', fontFamily: 'var(--font-display)', lineHeight: 1.2,
            }}>
              MyCaseValue Attorney Mode
            </h2>

            <p style={{
              fontSize: '16px', color: 'rgba(255,255,255,0.7)', fontWeight: 300,
              lineHeight: 1.7, margin: '0 0 32px 0', fontFamily: 'var(--font-body)',
            }} /* Note: rgba color used for transparency, keeping as-is */>
              AI-powered case predictions, judge intelligence, venue optimization, and bulk
              analysis — built for legal professionals. Get the competitive edge that large
              firms already have.
            </p>

            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '32px' }}>
              <a href="/attorney" className="upgrade-btn-primary">Try Attorney Mode</a>
              <a href="/pricing" className="upgrade-btn-secondary">See Pricing</a>
            </div>

            <div className="feature-list">
              <div className="feature-item">
                <div className="feature-checkmark">[x]</div>
                <span>AI-powered case outcome predictions</span>
              </div>
              <div className="feature-item">
                <div className="feature-checkmark">[x]</div>
                <span>Judge and venue intelligence</span>
              </div>
              <div className="feature-item">
                <div className="feature-checkmark">[x]</div>
                <span>Bulk case analysis tools</span>
              </div>
              <div className="feature-item">
                <div className="feature-checkmark">[x]</div>
                <span>Professional legal insights</span>
              </div>
            </div>
          </div>

          {/* Right Side — Prediction Card Mockup */}
          <div>
            <div style={{
              background: 'var(--color-surface-0)', borderRadius: '12px', padding: '32px',
              boxShadow: '0 4px 24px rgba(0,0,0,0.2)',
            }}>
              <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '20px', fontFamily: 'var(--font-display)' }}>
                Case Outcome Prediction
              </div>
              <div style={{ fontSize: '48px', fontWeight: 600, color: 'var(--accent-primary)', marginBottom: '8px', fontFamily: 'var(--font-mono)' }}>
                72%
              </div>
              <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginBottom: '24px', fontFamily: 'var(--font-body)' }}>
                Favorable Outcome Probability
              </div>
              <div style={{ height: '1px', background: 'var(--border-default)', marginBottom: '20px' }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[
                  { label: 'Win Rate', value: '68%' },
                  { label: 'Settle Rate', value: '24%' },
                  { label: 'Timeline', value: '14mo' },
                ].map((m) => (
                  <div key={m.label} style={{
                    display: 'flex', justifyContent: 'space-between',
                    fontSize: '13px', fontFamily: 'var(--font-body)',
                  }}>
                    <span style={{ color: 'var(--color-text-secondary)' }}>{m.label}</span>
                    <span style={{ fontWeight: 600, color: 'var(--color-text-primary)', fontFamily: 'var(--font-mono)' }}>{m.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
