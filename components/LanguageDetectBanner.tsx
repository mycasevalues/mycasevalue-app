'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LanguageDetectBanner() {
  const [show, setShow] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof document === 'undefined' || typeof navigator === 'undefined') return;

    // Check if already dismissed
    const cookies = document.cookie.split(';');
    let localeDetected = false;
    let localeSet = false;

    cookies.forEach((cookie) => {
      const [name, value] = cookie.trim().split('=');
      if (name === 'locale-detected') {
        localeDetected = value === 'true';
      }
      if (name === 'locale') {
        localeSet = true;
      }
    });

    // If already dismissed, don't show
    if (localeDetected) {
      setMounted(true);
      return;
    }

    // Check browser language and locale cookie
    const browserLang = navigator.language || navigator.languages?.[0] || 'en';
    const isSpanish = browserLang.startsWith('es');

    // Show banner if Spanish browser and no locale cookie
    if (isSpanish && !localeSet) {
      setShow(true);
    }

    setMounted(true);
  }, []);

  const handleChangeToSpanish = () => {
    // Set both cookies and dismiss banner
    document.cookie = `locale=es; max-age=2592000; path=/`;
    document.cookie = `locale-detected=true; max-age=2592000; path=/`;
    setShow(false);

    // Reload to apply Spanish locale
    window.location.reload();
  };

  const handleDismiss = () => {
    // Mark as detected to not show again
    document.cookie = `locale-detected=true; max-age=2592000; path=/`;
    setShow(false);
  };

  if (!mounted || !show) {
    return null;
  }

  return (
    <div
      style={{
        position: 'fixed',
        top: '52px',
        left: 0,
        right: 0,
        zIndex: 190,
        background: 'var(--card, #FFFFFF)',
        borderBottom: '1px solid var(--bdr)',
        padding: '12px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '16px',
      }}
      role="alert"
      aria-live="polite"
    >
      <span
        style={{
          fontSize: '14px',
          fontFamily: 'var(--font-ui)',
          color: 'var(--color-text-primary)',
          flex: 1,
        }}
      >
        Cambiamos el idioma a español según la configuración de tu navegador.
      </span>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
        <button
          onClick={handleChangeToSpanish}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--accent-primary)',
            fontWeight: 600,
            fontSize: '14px',
            fontFamily: 'var(--font-ui)',
            cursor: 'pointer',
            textDecoration: 'underline',
            padding: '4px 0',
            transition: 'color 150ms',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.color = 'var(--accent-primary-hover)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.color = 'var(--accent-primary)';
          }}
          aria-label="Change to Spanish"
        >
          Cambiar a inglés
        </button>
        <button
          onClick={handleDismiss}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--text3, #78766C)',
            fontSize: '18px',
            cursor: 'pointer',
            padding: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'color 150ms',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.color = 'var(--color-text-secondary)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.color = 'var(--text4, #A8A6A0)';
          }}
          aria-label="Dismiss language suggestion"
        >
          ×
        </button>
      </div>
    </div>
  );
}
