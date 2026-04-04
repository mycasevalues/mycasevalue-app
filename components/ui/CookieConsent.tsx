'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Check if user has already made a choice
    const consent = localStorage.getItem('mcv-cookie-consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('mcv-cookie-consent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('mcv-cookie-consent', 'declined');
    setIsVisible(false);
  };

  // Don't render until mounted to prevent hydration mismatch
  if (!isMounted || !isVisible) {
    return null;
  }

  return (
    <div
      className="cookie-consent-banner"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 300,
        padding: '1rem',
        background: '#FFFFFF',
        borderTop: '1px solid var(--border-default)',
        boxShadow: '0 -2px 8px rgba(0, 0, 0, 0.08)',
        animation: 'slideUp 0.3s ease-out',
      }}
    >
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
      `}</style>

      <div
        style={{
          maxWidth: '600px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          alignItems: 'flex-start',
        }}
      >
        <p
          style={{
            margin: 0,
            fontSize: '0.875rem',
            color: '#212529',
            fontFamily: 'var(--font-body)',
            lineHeight: '1.5',
          }}
        >
          We use cookies to improve your experience. By continuing to use this site, you agree to our{' '}
          <Link
            href="/privacy"
            style={{
              color: '#006997',
              textDecoration: 'underline',
              fontWeight: 500,
            }}
          >
            cookie policy
          </Link>
          .
        </p>

        <div
          style={{
            display: 'flex',
            gap: '0.75rem',
            flexWrap: 'wrap',
          }}
        >
          <button
            onClick={handleAccept}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#E8171F',
              color: 'white',
              border: 'none',
              borderRadius: '0px',
              fontSize: '0.875rem',
              fontFamily: 'var(--font-body)',
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'opacity 0.2s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.9')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
          >
            Accept
          </button>

          <button
            onClick={handleDecline}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: 'transparent',
              color: '#212529',
              border: '1px solid var(--border-default)',
              borderRadius: '0px',
              fontSize: '0.875rem',
              fontFamily: 'var(--font-body)',
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'opacity 0.2s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.8')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  );
}
