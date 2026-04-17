'use client';
import { useState, useEffect } from 'react';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check for prefers-reduced-motion on mount
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });
  };

  return (
    <button
      onClick={handleClick}
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        width: '44px',
        height: '44px',
        backgroundColor: 'rgba(255,255,255,0.1)',
        color: 'var(--color-surface-0)',
        border: '1px solid rgba(255,255,255,0.15)',
        borderRadius: '6px',
        cursor: 'pointer',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 0,
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'auto' : 'none',
        transition: prefersReducedMotion ? 'none' : 'opacity 200ms ease-in-out',
      }}
      aria-label="Back to top"
      title="Back to top"
    >
      <svg aria-hidden="true"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: 'block' }}
      >
        <path
          d="M10 16V4M10 4L4 10M10 4L16 10"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
