'use client';

import React, { useState, useEffect } from 'react';

interface BottomNavProps {
  lang?: 'en' | 'es';
  activeTab?: string;
  onNavigate?: (tab: string) => void;
  isPremium?: boolean;
}

const TABS = [
  {
    id: 'home',
    labelEn: 'Home',
    labelEs: 'Inicio',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    id: 'search',
    labelEn: 'Search',
    labelEs: 'Buscar',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21l-4.35-4.35" />
      </svg>
    ),
  },
  {
    id: 'reports',
    labelEn: 'Reports',
    labelEs: 'Informes',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
  },
  {
    id: 'premium',
    labelEn: 'Premium',
    labelEs: 'Premium',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  },
];

export default function BottomNav({ lang = 'en', activeTab = 'home', onNavigate, isPremium }: BottomNavProps) {
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Hide on scroll down, show on scroll up (mobile UX pattern)
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <nav
      className="lg:hidden fixed bottom-0 left-0 right-0 no-print"
      style={{
        zIndex: 'var(--z-bottom-nav)',
        height: 'calc(56px + env(safe-area-inset-bottom, 0px))',
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
        background: 'var(--bg-elevated)',
        borderTop: '1px solid var(--border-default)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        transform: visible ? 'translateY(0)' : 'translateY(100%)',
        transition: 'transform 200ms var(--ease-out)',
      }}
      role="navigation"
      aria-label={lang === 'es' ? 'Navegación móvil' : 'Mobile navigation'}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          height: '56px',
          maxWidth: '480px',
          margin: '0 auto',
        }}
      >
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          const label = lang === 'es' ? tab.labelEs : tab.labelEn;

          return (
            <button type="button"
              key={tab.id}
              onClick={() => onNavigate?.(tab.id)}
              className="flex flex-col items-center justify-center gap-0.5 relative"
              style={{
                flex: 1,
                height: '56px',
                minWidth: '64px',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: isActive ? 'var(--accent-primary)' : 'var(--fg-muted)',
                transition: 'color 150ms',
              }}
              aria-label={label}
              aria-current={isActive ? 'page' : undefined}
            >
              {/* Active top border indicator */}
              {isActive && (
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: '25%',
                    right: '25%',
                    height: '2px',
                    background: 'var(--accent-primary)',
                    borderRadius: '0 0 2px 2px',
                  }}
                />
              )}
              <span style={{ display: 'flex', alignItems: 'center' }}>{tab.icon}</span>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: isActive ? 600 : 500,
                  lineHeight: 1,
                  letterSpacing: '0.01em',
                }}
              >
                {label}
              </span>
              {/* Premium badge */}
              {tab.id === 'premium' && isPremium && (
                <span
                  style={{
                    position: 'absolute',
                    top: '6px',
                    right: 'calc(50% - 18px)',
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: 'var(--outcome-win)',
                  }}
                />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
