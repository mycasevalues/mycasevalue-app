'use client';

export default function TrustSignals() {
  return (
    <>
      <div className="trust-signals-card">
        <div className="trust-signals-row">
          {/* 5.1M+ Federal Cases Analyzed */}
          <div className="trust-signal-badge">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <rect x="2" y="3" width="14" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
              <line x1="2" y1="7" x2="16" y2="7" stroke="currentColor" strokeWidth="1.3" />
              <line x1="2" y1="11" x2="16" y2="11" stroke="currentColor" strokeWidth="1.3" />
              <line x1="7" y1="7" x2="7" y2="15" stroke="currentColor" strokeWidth="1.3" />
            </svg>
            <span>5.1M+ Federal Cases Analyzed</span>
          </div>

          {/* 94 Federal Districts Covered */}
          <div className="trust-signal-badge">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path d="M9 1.5L3 4.5V9C3 12.5 5.5 15.5 9 16.5C12.5 15.5 15 12.5 15 9V4.5L9 1.5Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
              <circle cx="9" cy="8.5" r="2.5" stroke="currentColor" strokeWidth="1.2" />
              <path d="M6.5 8.5H11.5" stroke="currentColor" strokeWidth="1" />
              <path d="M9 6V11" stroke="currentColor" strokeWidth="1" />
            </svg>
            <span>94 Federal Districts Covered</span>
          </div>

          {/* Source: FJC Integrated Database */}
          <div className="trust-signal-badge">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path d="M9 1.5L3 4.5V9C3 12.5 5.5 15.5 9 16.5C12.5 15.5 15 12.5 15 9V4.5L9 1.5Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
              <path d="M7 9L8.5 10.5L11 7.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>Source: FJC Integrated Database</span>
          </div>

          {/* Updated Quarterly */}
          <div className="trust-signal-badge">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <circle cx="9" cy="9" r="6.5" stroke="currentColor" strokeWidth="1.3" />
              <path d="M9 5.5V9L11.5 10.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>Updated Quarterly</span>
          </div>
        </div>
      </div>

      <style>{`
        .trust-signals-card {
          background: var(--surf, #F9F8F5);
          border: 1px solid var(--bdr, #E5E2DA);
          border-radius: 4px;
          padding: 14px 20px;
        }

        .trust-signals-row {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }

        .trust-signal-badge {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-ui);
          font-size: 14px;
          font-weight: 500;
          color: var(--text2, #525252);
          white-space: nowrap;
        }

        .trust-signal-badge svg {
          flex-shrink: 0;
          color: var(--text2, #525252);
        }

        @media (max-width: 900px) {
          .trust-signals-row {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }

        @media (max-width: 520px) {
          .trust-signals-row {
            grid-template-columns: 1fr !important;
          }
          .trust-signal-badge {
            white-space: normal;
          }
        }
      `}</style>
    </>
  );
}
