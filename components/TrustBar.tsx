export default function TrustBar() {
  const trustIndicators = [
    {
      id: "users",
      text: "Trusted by ",
      highlight: "10,000+ users",
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <circle cx="7" cy="5" r="2" stroke="#E8171F" strokeWidth="1.5" />
          <circle cx="13" cy="5" r="2" stroke="#E8171F" strokeWidth="1.5" />
          <path
            d="M7 7C5.34315 7 4 8.34315 4 10V14C4 14.5523 4.44772 15 5 15H9C9.55228 15 10 14.5523 10 14V10C10 8.34315 8.65685 7 7 7Z"
            stroke="#E8171F"
            strokeWidth="1.5"
            fill="none"
          />
          <path
            d="M13 7C11.3431 7 10 8.34315 10 10V14C10 14.5523 10.4477 15 11 15H15C15.5523 15 16 14.5523 16 14V10C16 8.34315 14.6569 7 13 7Z"
            stroke="#E8171F"
            strokeWidth="1.5"
            fill="none"
          />
        </svg>
      ),
    },
    {
      id: "sources",
      text: "Data from ",
      highlight: "3 official sources",
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <rect x="3" y="3" width="14" height="14" rx="1" stroke="#E8171F" strokeWidth="1.5" />
          <line x1="3" y1="7" x2="17" y2="7" stroke="#E8171F" strokeWidth="1.5" />
          <line x1="3" y1="11" x2="17" y2="11" stroke="#E8171F" strokeWidth="1.5" />
          <line x1="7" y1="3" x2="7" y2="17" stroke="#E8171F" strokeWidth="1.5" />
          <line x1="11" y1="3" x2="11" y2="17" stroke="#E8171F" strokeWidth="1.5" />
        </svg>
      ),
    },
    {
      id: "accuracy",
      text: "",
      highlight: "94% accuracy rate",
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <circle cx="10" cy="10" r="7" stroke="#E8171F" strokeWidth="1.5" />
          <path
            d="M7.5 10L9 11.5L12.5 8"
            stroke="#E8171F"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      ),
    },
    {
      id: "updated",
      text: "Updated ",
      highlight: "quarterly",
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <circle cx="10" cy="10" r="7" stroke="#E8171F" strokeWidth="1.5" />
          <path
            d="M10 5V10L13 13"
            stroke="#E8171F"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M15 7C16.6569 7 18 5.65685 18 4C18 2.34315 16.6569 1 15 1C13.3431 1 12 2.34315 12 4C12 5.65685 13.3431 7 15 7Z"
            stroke="#E8171F"
            strokeWidth="1.5"
          />
        </svg>
      ),
    },
    {
      id: "noaccount",
      text: "No ",
      highlight: "account required",
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <rect x="4" y="9" width="12" height="8" rx="1" stroke="#E8171F" strokeWidth="1.5" />
          <path
            d="M6 9V6C6 4.34315 7.34315 3 9 3H11C12.6569 3 14 4.34315 14 6V9"
            stroke="#E8171F"
            strokeWidth="1.5"
            fill="none"
          />
          <circle cx="10" cy="13" r="1" fill="#E8171F" />
        </svg>
      ),
    },
  ];

  return (
    <div className="trust-bar-container">
      <div className="trust-bar">
        {trustIndicators.map((indicator) => (
          <div key={indicator.id} className="trust-indicator">
            <div className="trust-icon">{indicator.icon}</div>
            <div className="trust-text">
              {indicator.text}
              <span className="trust-highlight">{indicator.highlight}</span>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .trust-bar-container {
          background-color: #ffffff;
          border-bottom: 1px solid #d5d8dc;
          padding: 24px;
          display: flex;
          justify-content: center;
        }

        .trust-bar {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          gap: 40px;
          max-width: 1140px;
        }

        .trust-indicator {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .trust-icon {
          flex-shrink: 0;
          width: 20px;
          height: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .trust-text {
          font-size: 13px;
          font-weight: 500;
          color: #455a64;
          font-family: var(--font-body, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif);
        }

        .trust-highlight {
          font-weight: 700;
          color: #212529;
        }

        @media (max-width: 640px) {
          .trust-bar {
            gap: 24px;
          }

          .trust-indicator {
            flex: 1 1 calc(50% - 12px);
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
}
