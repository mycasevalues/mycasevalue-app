'use client';
import { useState, useEffect } from 'react';

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        width: '44px',
        height: '44px',
        background: '#0966C3',
        color: '#FFFFFF',
        border: 'none',
        borderRadius: '12px',
        fontSize: '18px',
        cursor: 'pointer',
        boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 150ms',
      }}
      aria-label="Scroll to top"
    >
      ↑
    </button>
  );
}
