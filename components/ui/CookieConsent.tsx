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

  const handleAcceptAll = () => {
    localStorage.setItem('mcv-cookie-consent', 'all');
    setIsVisible(false);
  };

  const handleEssentialOnly = () => {
    localStorage.setItem('mcv-cookie-consent', 'essential');
    setIsVisible(false);
  };

  // TODO: Add geolocation detection for EU/CA specific consent requirements
  // This would require Edge Middleware to detect user location and adjust banner accordingly

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
        background: 'var(--accent-primary)',
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
        .cookie-banner-button {
          padding: 0.625rem 1.25rem;
          border-radius: 12px;
          fontSize: 0.9375rem;
          font-family: var(--font-body);
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          letter-spacing: 0.2px;
          border: none;
          white-space: nowrap;
        }
        .cookie-banner-button:hover {
          transform: translateY(-1px);
        }
        .cookie-banner-accept {
          background-color: var(--accent-primary);
          color: var(--color-surface-0);
        }
        .cookie-banner-accept:hover {
          background-color: #1e40af;
        }
        .cookie-banner-essential {
          background-color: transparent;
          color: var(--color-surface-0);
          border: 1.5px solid rgba(255, 255, 255, 0.3);
        }
        .cookie-banner-essential:hover {
          border-color: rgba(255, 255, 255, 0.6);
          background-color: rgba(255, 255, 255, 0.05);
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
            color: 'var(--color-surface-0)',
            fontFamily: 'var(--font-body)',
            lineHeight: '1.6',
            letterSpacing: '0.3px',
          }}
        >
          We use cookies to improve your experience. Essential cookies are always active. Analytics cookies help us understand how you use the platform.{' '}
          <Link
            href="/legal/cookies"
            style={{
              color: '#E8F0F5',
              textDecoration: 'underline',
              fontWeight: 500,
              transition: 'color 0.2s ease',
            }}
          >
            Learn more
          </Link>
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
            onClick={handleAcceptAll}
            className="cookie-banner-button cookie-banner-accept"
          >
            Accept All
          </button>

          <button
            onClick={handleEssentialOnly}
            className="cookie-banner-button cookie-banner-essential"
          >
            Essential Only
          </button>

          <Link
            href="/legal/cookies"
            style={{
              padding: '0.625rem 1.25rem',
              color: 'var(--color-surface-0)',
              textDecoration: 'none',
              fontSize: '0.9375rem',
              fontFamily: 'var(--font-body)',
              fontWeight: 600,
              transition: 'color 0.2s ease',
              cursor: 'pointer',
              borderBottom: '2px solid rgba(255, 255, 255, 0.3)',
            }}
          >
            Manage Preferences
          </Link>
        </div>
      </div>
    </div>
  );
}
