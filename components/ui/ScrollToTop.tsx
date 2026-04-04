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
        background: '#8B5CF6',
        color: '#FFFFFF',
        border: 'none',
        borderRadius: '50%',
        fontSize: '18px',
        cursor: 'pointer',
        boxShadow: '0 4px 12px rgba(139,92,246,0.4)',
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
