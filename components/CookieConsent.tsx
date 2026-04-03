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
      setIsVisible(true);
    }
  }, []);

  const setCookie = (value: string) => {
    const date = new Date();
    date.setTime(date.getTime() + 365 * 24 * 60 * 60 * 1000); // 365 days
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `consent_status=${value}; ${expires}; path=/`;
    setIsVisible(false);
  };

  const handleAcceptAll = () => {
    setCookie('accepted');
  };

  const handleRejectNonEssential = () => {
    setCookie('rejected');
  };

  if (!isVisible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        background: 'var(--bg-surface)',
        borderTop: '1px solid var(--border-default)',
        boxShadow: 'var(--shadow-lg)',
        fontFamily: 'var(--font-body)',
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '16px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '24px',
        }}
      >
        <p
          style={{
            margin: 0,
            fontSize: '14px',
            lineHeight: '1.5',
            color: 'var(--fg-primary)',
            flex: 1,
          }}
        >
          We use cookies to improve your experience and analyze site usage.{' '}
          <Link
            href="/privacy"
            style={{
              color: 'var(--accent-secondary)',
              textDecoration: 'none',
              fontWeight: '500',
            }}
          >
            Learn more
          </Link>
        </p>

        <div
          style={{
            display: 'flex',
            gap: '12px',
            flexShrink: 0,
          }}
        >
          <button
            onClick={handleRejectNonEssential}
            style={{
              minHeight: '44px',
              paddingLeft: '24px',
              paddingRight: '24px',
              paddingTop: '8px',
              paddingBottom: '8px',
              borderRadius: '8px',
              fontWeight: '600',
              fontSize: '14px',
              fontFamily: 'var(--font-body)',
              border: '1px solid var(--border-default)',
              background: 'transparent',
              color: 'var(--fg-primary)',
              cursor: 'pointer',
              transition: 'all 0.2s ease-in-out',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--bg-hover)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
            }}
          >
            Reject non-essential
          </button>

          <button
            onClick={handleAcceptAll}
            style={{
              minHeight: '44px',
              paddingLeft: '24px',
              paddingRight: '24px',
              paddingTop: '8px',
              paddingBottom: '8px',
              borderRadius: '8px',
              fontWeight: '600',
              fontSize: '14px',
              fontFamily: 'var(--font-body)',
              border: 'none',
              background: 'var(--accent-primary)',
              color: 'var(--fg-inverse)',
              cursor: 'pointer',
              transition: 'all 0.2s ease-in-out',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '0.9';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '1';
            }}
          >
            Accept all
          </button>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          [data-cookie-consent] {
            flex-direction: column !important;
            align-items: flex-start !important;
          }

          [data-cookie-consent-buttons] {
            flex-direction: column !important;
            width: 100%;
          }

          [data-cookie-consent-buttons] button {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
