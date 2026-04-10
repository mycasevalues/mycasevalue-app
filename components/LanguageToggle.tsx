'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function LanguageToggle() {
  const [locale, setLocale] = useState<'en' | 'es'>('en');
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Read current locale from cookie on mount
  useEffect(() => {
    if (typeof document === 'undefined') return;

    // Parse cookies to find locale
    const cookies = document.cookie.split(';');
    let currentLocale: 'en' | 'es' = 'en';

    cookies.forEach((cookie) => {
      const [name, value] = cookie.trim().split('=');
      if (name === 'locale' && (value === 'en' || value === 'es')) {
        currentLocale = value as 'en' | 'es';
      }
    });

    setLocale(currentLocale);
    setMounted(true);
  }, []);

  const handleLanguageChange = (newLocale: 'en' | 'es') => {
    if (newLocale === locale) return;

    // Set locale cookie
    document.cookie = `locale=${newLocale}; max-age=2592000; path=/`;

    // Reload page to apply new locale
    window.location.reload();
  };

  if (!mounted) {
    return null;
  }

  return (
    <div
      className="language-toggle"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '2px',
        fontSize: '13px',
        fontWeight: 500,
        fontFamily: 'Inter, var(--font-body)',
        color: '#666666',
        marginRight: '12px',
      }}
    >
      <button
        onClick={() => handleLanguageChange('en')}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '4px 6px',
          color: locale === 'en' ? '#0966C3' : '#666666',
          fontWeight: locale === 'en' ? 600 : 500,
          transition: 'color 150ms',
          fontSize: '13px',
          fontFamily: 'Inter, var(--font-body)',
        }}
        aria-label="Switch to English"
        aria-pressed={locale === 'en'}
      >
        EN
      </button>
      <span style={{ color: '#595959' }}>|</span>
      <button
        onClick={() => handleLanguageChange('es')}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '4px 6px',
          color: locale === 'es' ? '#0966C3' : '#666666',
          fontWeight: locale === 'es' ? 600 : 500,
          transition: 'color 150ms',
          fontSize: '13px',
          fontFamily: 'Inter, var(--font-body)',
        }}
        aria-label="Switch to Spanish"
        aria-pressed={locale === 'es'}
      >
        ES
      </button>
    </div>
  );
}
