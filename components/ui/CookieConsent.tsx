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
        padding: '1.5rem 1rem',
        background: '#1B3A5C',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 -4px 12px rgba(0, 23, 46, 0.15)',
        animation: 'slideUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
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
          maxWidth: '900px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem',
          alignItems: 'flex-start',
        }}
      >
        <p
          style={{
            margin: 0,
            fontSize: '0.9375rem',
            color: '#FFFFFF',
            fontFamily: 'var(--font-body)',
            lineHeight: '1.6',
            letterSpacing: '0.3px',
          }}
        >
          We use cookies to improve your experience. By continuing to use this site, you agree to our{' '}
          <Link
            href="/privacy"
            style={{
              color: '#E8F0F5',
              textDecoration: 'underline',
              fontWeight: 500,
              transition: 'color 0.2s ease',
            }}
          >
            cookie policy
          </Link>
          .
        </p>

        <div
          style={{
            display: 'flex',
            gap: '1rem',
            flexWrap: 'wrap',
            alignItems: 'center',
          }}
        >
          <button
            onClick={handleAccept}
            style={{
              padding: '0.625rem 1.25rem',
              backgroundColor: '#0A66C2',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '12px',
              fontSize: '0.9375rem',
              fontFamily: 'var(--font-body)',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              letterSpacing: '0.2px',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
          >
            Accept
          </button>

          <button
            onClick={handleDecline}
            style={{
              padding: '0.625rem 1.25rem',
              backgroundColor: 'transparent',
              color: '#FFFFFF',
              border: '1.5px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '12px',
              fontSize: '0.9375rem',
              fontFamily: 'var(--font-body)',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              letterSpacing: '0.2px',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.6)';
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  );
}
