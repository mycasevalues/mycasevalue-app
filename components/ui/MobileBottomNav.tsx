'use client';

import React, { useState, useEffect } from 'react';

interface MobileBottomNavProps {
  step: number;
  onReset: () => void;
  onSearch: () => void;
  isPremium: boolean;
  lang?: 'en' | 'es';
  onSaved?: () => void;
  savedCount?: number;
}

export default function MobileBottomNav({
  step,
  onReset,
  onSearch,
  isPremium,
  lang = 'en',
  onSaved,
  savedCount = 0,
}: MobileBottomNavProps) {
  const [mounted, setMounted] = useState(false);
  const [isPressed, setIsPressed] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Determine active step
  const isHomeActive = step === 0;
  const isSearchActive = step >= 1 && step <= 5;
  const isReportsActive = step === 6;

  const handleHome = () => {
    onReset();
  };

  const handleSearch = () => {
    onSearch();
  };

  const handleReports = () => {
    onSaved?.();
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: lang === 'es' ? 'Revisor de Casos' : 'Case Check',
          text: lang === 'es' ? 'Revisa tus casos aquí' : 'Check your cases here',
          url: window.location.href,
        });
      } else {
        // Fallback: copy URL to clipboard
        await navigator.clipboard.writeText(window.location.href);
        // You could add a toast notification here if desired
      }
    } catch (error) {
      // Share cancelled or failed — silent
    }
  };

  const handlePressDown = (item: string) => {
    setIsPressed(item);
  };

  const handlePressUp = () => {
    setIsPressed(null);
  };

  const navItems = [
    {
      id: 'home',
      label: lang === 'es' ? 'Inicio' : 'Home',
      icon: 'home',
      isActive: isHomeActive,
      onClick: handleHome,
    },
    {
      id: 'search',
      label: lang === 'es' ? 'Búsqueda' : 'Search',
      icon: 'search',
      isActive: isSearchActive,
      onClick: handleSearch,
    },
    {
      id: 'reports',
      label: lang === 'es' ? 'Informes' : 'Reports',
      icon: 'reports',
      isActive: isReportsActive,
      onClick: handleReports,
      badge: savedCount > 0 ? savedCount : null,
    },
    {
      id: 'share',
      label: lang === 'es' ? 'Compartir' : 'Share',
      icon: 'share',
      isActive: false,
      onClick: handleShare,
    },
  ];

  const IconComponent = ({ icon }: { icon: string }) => {
    switch (icon) {
      case 'home':
        return (
          <svg
            className="w-6 h-6"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7A1 1 0 003 13h1v7a1 1 0 001 1h12a1 1 0 001-1v-7h1a1 1 0 00.707-1.707l-7-7zM17 13v7H7v-7h10z" />
          </svg>
        );
      case 'search':
        return (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        );
      case 'reports':
        return (
          <svg
            className="w-6 h-6"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M9 12h6m-6 4h6m2-13H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2z" />
          </svg>
        );
      case 'share':
        return (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8.684 13.342C9.839 10.319 13.161 10.319 14.316 13.342m-4.324-7.1c-.805-.857-.805-2.25 0-3.107A2.03 2.03 0 0110.5 2c.85 0 1.663.336 2.25.925.805.857.805 2.25 0 3.107-.587.589-1.4.925-2.25.925-.85 0-1.663-.336-2.25-.925zM19 12a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <style>{`
        @media (min-width: 640px) {
          .mobile-bottom-nav {
            display: none !important;
          }
        }
      `}</style>

      <nav
        className="mobile-bottom-nav fixed bottom-0 left-0 right-0 z-40"
        style={{
          backgroundColor: 'rgba(11, 18, 33, 0.8)',
          backdropFilter: 'blur(12px)',
          borderTop: '1px solid #1E293B',
          paddingBottom: 'max(1rem, env(safe-area-inset-bottom))',
          height: '64px',
        }}
      >
        <div className="flex items-center justify-around h-16 px-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={item.onClick}
              onMouseDown={() => handlePressDown(item.id)}
              onMouseUp={handlePressUp}
              onMouseLeave={handlePressUp}
              onTouchStart={() => handlePressDown(item.id)}
              onTouchEnd={handlePressUp}
              className="relative flex flex-col items-center justify-center transition-all duration-200 focus:outline-none"
              style={{
                color: item.isActive ? '#4F46E5' : '#64748B',
                transform: isPressed === item.id ? 'scale(0.92)' : 'scale(1)',
              }}
              aria-label={item.label}
              title={item.label}
            >
              {/* Icon container */}
              <div className="relative">
                <IconComponent icon={item.icon} />

                {/* Badge for Reports */}
                {item.badge && (
                  <div
                    className="absolute -top-2 -right-2 w-5 h-5 rounded-full flex items-center justify-center text-xs font-semibold text-white"
                    style={{ backgroundColor: '#4F46E5' }}
                  >
                    {item.badge}
                  </div>
                )}
              </div>

              {/* Active indicator dot */}
              {item.isActive && (
                <div
                  className="mt-1 w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: '#4F46E5' }}
                />
              )}
            </button>
          ))}
        </div>
      </nav>

      {/* Spacer for safe area */}
      <div
        style={{
          height: 'calc(64px + max(1rem, env(safe-area-inset-bottom)))',
        }}
        className="sm:hidden"
      />
    </>
  );
}
