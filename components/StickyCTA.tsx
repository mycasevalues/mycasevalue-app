'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

/**
 * Sticky CTA bar that appears after the user scrolls past the hero section.
 * Hides again when nearing the footer. Desktop: centered pill. Mobile: full-width.
 */
export default function StickyCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const viewportHeight = window.innerHeight;

      // Show after scrolling ~500px (past hero)
      const pastHero = scrollY > 500;
      // Hide when within 300px of the bottom (near footer)
      const nearFooter = scrollY + viewportHeight > docHeight - 300;

      setVisible(pastHero && !nearFooter);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        bottom: visible ? '24px' : '-80px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 45,
        transition: 'bottom 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        background: '#FFFFFF',
        border: '1px solid #E5E7EB',
        borderRadius: '9999px',
        padding: '8px 8px 8px 24px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)',
        maxWidth: 'calc(100vw - 32px)',
        whiteSpace: 'nowrap',
      }}
      aria-hidden={!visible}
    >
      <span style={{
        fontFamily: 'var(--font-body)',
        fontSize: '14px',
        fontWeight: 500,
        color: '#374151',
      }}>
        Research your case value
      </span>

      <Link
        href="/cases"
        style={{
          background: '#0966C3',
          color: '#FAFBFC',
          padding: '10px 20px',
          borderRadius: '9999px',
          textDecoration: 'none',
          fontFamily: 'var(--font-body)',
          fontWeight: 600,
          fontSize: '13px',
          letterSpacing: '0.02em',
          display: 'inline-block',
          whiteSpace: 'nowrap',
        }}
      >
        Start Searching Free &rarr;
      </Link>

      <Link
        href="/pricing"
        style={{
          color: '#4B5563',
          padding: '10px 16px',
          textDecoration: 'none',
          fontFamily: 'var(--font-body)',
          fontWeight: 500,
          fontSize: '13px',
          display: 'inline-block',
          whiteSpace: 'nowrap',
        }}
      >
        View Pricing
      </Link>
    </div>
  );
}
