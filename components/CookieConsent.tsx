'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if consent has already been given
    const consentStatus = document.cookie
      .split('; ')
      .find((row) => row.startsWith('consent_status='));

    if (!consentStatus) {
      // Delay slightly so it doesn't flash on first paint
      const timer = setTimeout(() => setIsVisible(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const setCookie = (value: string) => {
    const date = new Date();
    date.setTime(date.getTime() + 365 * 24 * 60 * 60 * 1000);
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `consent_status=${value}; ${expires}; path=/; SameSite=Lax`;
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      className="cookie-banner"
      role="dialog"
      aria-modal="true"
      aria-label="Cookie consent"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        background: 'var(--color-surface-0)',
        borderTop: '1px solid var(--border-default)',
        boxShadow: '0 -1px 8px rgba(0,0,0,0.06)',
        fontFamily: 'var(--font-body)',
        animation: 'slideUp 400ms cubic-bezier(0.34, 1.56, 0.64, 1)',
      }}
    >
      <div
        className="cookie-inner"
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '16px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '20px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', flex: 1 }}>
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--color-text-secondary)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            style={{ flexShrink: 0, marginTop: '2px' }}
          >
            <circle cx="12" cy="12" r="1" /><path d="M12 1v6m4.22-4.22-4.24 4.24m6 4.22h-6m4.24 4.24-4.24-4.24m6-6-4.24-4.24" />
          </svg>
          <p
            style={{
              margin: 0,
              fontSize: '14px',
              lineHeight: '1.5',
              color: 'var(--color-text-primary)',
              fontFamily: 'var(--font-body)',
            }}
          >
            We use cookies for analytics and to improve your experience.{' '}
            <Link
              href="/privacy"
              style={{
                color: 'var(--accent-primary-hover)',
                textDecoration: 'underline',
                textUnderlineOffset: '2px',
                fontWeight: 500,
              }}
            >
              Privacy policy
            </Link>
          </p>
        </div>

        <div
          className="cookie-buttons"
          style={{
            display: 'flex',
            gap: '8px',
            flexShrink: 0,
          }}
        >
          <button
            onClick={() => setCookie('rejected')}
            style={{
              padding: '10px 20px',
              borderRadius: '4px',
              fontWeight: 600,
              fontSize: '12px',
              fontFamily: 'var(--font-body)',
              border: '1px solid var(--border-default)',
              background: 'transparent',
              color: 'var(--color-text-secondary)',
              cursor: 'pointer',
              transition: 'all 200ms',
              whiteSpace: 'nowrap',
            }}
          >
            Decline
          </button>

          <button
            onClick={() => setCookie('accepted')}
            style={{
              padding: '10px 20px',
              borderRadius: '4px',
              fontWeight: 600,
              fontSize: '12px',
              fontFamily: 'var(--font-body)',
              border: 'none',
              background: 'var(--accent-primary)',
              color: 'var(--color-surface-0)',
              cursor: 'pointer',
              transition: 'all 200ms',
              whiteSpace: 'nowrap',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}
          >
            Accept
          </button>
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        @media (max-width: 640px) {
          .cookie-inner {
            flex-direction: column !important;
            align-items: stretch !important;
            gap: 12px !important;
          }
          .cookie-buttons {
            width: 100%;
          }
          .cookie-buttons button {
            flex: 1;
          }
        }
      `}</style>
    </div>
  );
}
