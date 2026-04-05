export default function UpgradeBanner() {
  return (
    <section
      style={{
        background: 'linear-gradient(135deg, #00172E 0%, #001A35 50%, #002040 100%)',
        padding: '64px 24px',
        borderBottom: '1px solid #D5D8DC',
      }}
    >
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
          color: #E8171F;
          font-weight: 700;
        }
        .upgrade-btn-primary {
          display: inline-block;
          padding: 12px 28px;
          height: 48px;
          background: #E8171F;
          color: #FFFFFF;
          border-radius: 4px;
          text-transform: uppercase;
          font-weight: 700;
          font-size: 13px;
          text-decoration: none;
          font-family: var(--font-display);
          letter-spacing: 0.04em;
          transition: background 200ms, transform 200ms;
          display: flex;
          align-items: center;
          justify-content: center;
          border: none;
          cursor: pointer;
        }
        .upgrade-btn-primary:hover {
          background: #CC1019;
          transform: translateY(-2px);
        }
        .upgrade-btn-secondary {
          display: inline-block;
          padding: 12px 28px;
          background: transparent;
          color: #FFFFFF;
          border: 1px solid rgba(255,255,255,0.3);
          border-radius: 4px;
          text-transform: uppercase;
          font-weight: 600;
          font-size: 13px;
          text-decoration: none;
          font-family: var(--font-display);
          letter-spacing: 0.04em;
          transition: all 200ms;
        }
        .upgrade-btn-secondary:hover {
          border-color: rgba(255,255,255,0.6);
          background: rgba(255,255,255,0.05);
        }
      `}</style>

      <div style={{ maxWidth: '1140px', margin: '0 auto' }}>
        <div className="upgrade-banner-grid">
          {/* Left Side */}
          <div>
            <div style={{
              display: 'inline-flex', alignItems: 'center',
              background: 'rgba(232,23,31,0.2)', color: '#E8171F',
              fontSize: '11px', fontWeight: 700, textTransform: 'uppercase',
              padding: '6px 12px', borderRadius: '4px', marginBottom: '16px',
              letterSpacing: '0.08em',
            }}>
              NEW
            </div>

            <h2 style={{
              fontSize: '32px', fontWeight: 600, color: '#FFFFFF',
              margin: '0 0 16px 0', fontFamily: 'var(--font-display)', lineHeight: 1.2,
            }}>
              MyCaseValue+ Attorney Mode
            </h2>

            <p style={{
              fontSize: '16px', color: 'rgba(255,255,255,0.7)', fontWeight: 300,
              lineHeight: 1.7, margin: '0 0 32px 0', fontFamily: 'var(--font-body)',
            }}>
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
                <div className="feature-checkmark">✓</div>
                <span>AI-powered case outcome predictions</span>
              </div>
              <div className="feature-item">
                <div className="feature-checkmark">✓</div>
                <span>Judge and venue intelligence</span>
              </div>
              <div className="feature-item">
                <div className="feature-checkmark">✓</div>
                <span>Bulk case analysis tools</span>
              </div>
              <div className="feature-item">
                <div className="feature-checkmark">✓</div>
                <span>Professional legal insights</span>
              </div>
            </div>
          </div>

          {/* Right Side — Prediction Card Mockup */}
          <div>
            <div style={{
              background: '#FFFFFF', borderRadius: '4px', padding: '32px',
              boxShadow: '0 4px 24px rgba(0,0,0,0.2)',
            }}>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#212529', marginBottom: '20px', fontFamily: 'var(--font-display)' }}>
                Case Outcome Prediction
              </div>
              <div style={{ fontSize: '48px', fontWeight: 700, color: '#E8171F', marginBottom: '8px', fontFamily: 'var(--font-mono)' }}>
                72%
              </div>
              <div style={{ fontSize: '13px', color: '#455A64', marginBottom: '24px', fontFamily: 'var(--font-body)' }}>
                Favorable Outcome Probability
              </div>
              <div style={{ height: '1px', background: '#D5D8DC', marginBottom: '20px' }} />
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
                    <span style={{ color: '#455A64' }}>{m.label}</span>
                    <span style={{ fontWeight: 600, color: '#212529' }}>{m.value}</span>
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
