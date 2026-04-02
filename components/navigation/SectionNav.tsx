'use client';

import React, { useState, useEffect, useCallback } from 'react';

interface SectionNavProps {
  lang: 'en' | 'es';
}

interface NavSection {
  id: string;
  label: string;
  labelEs: string;
}

const SECTIONS: NavSection[] = [
  { id: 'settlement', label: 'Settlement', labelEs: 'Acuerdo' },
  { id: 'eeoc', label: 'EEOC', labelEs: 'EEOC' },
  { id: 'districts', label: 'Districts', labelEs: 'Distritos' },
  { id: 'statutes', label: 'Statutes', labelEs: 'Estatutos' },
  { id: 'pricing', label: 'Pricing', labelEs: 'Precios' },
];

export default function SectionNav({ lang }: SectionNavProps) {
  const [visible, setVisible] = useState(false);
  const [activeId, setActiveId] = useState<string>('');

  const handleScroll = useCallback(() => {
    // Show after scrolling 600px
    setVisible(window.scrollY > 600);

    // Determine active section
    let current = '';
    for (const section of SECTIONS) {
      const el = document.getElementById(section.id);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= 200) {
          current = section.id;
        }
      }
    }
    setActiveId(current);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (!visible) return null;

  return (
    <nav
      aria-label={lang === 'es' ? 'Navegación de secciones' : 'Section navigation'}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] transition-all duration-300"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateX(-50%) translateY(0)' : 'translateX(-50%) translateY(20px)',
        pointerEvents: visible ? 'auto' : 'none',
      }}
    >
      <div
        className="flex items-center gap-1 px-2 py-1.5 rounded-full"
        style={{
          background: 'rgba(15, 23, 42, 0.85)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          border: '1px solid rgba(99, 102, 241, 0.2)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(99,102,241,0.1)',
        }}
      >
        {SECTIONS.map((section) => {
          const isActive = activeId === section.id;
          return (
            <button
              key={section.id}
              onClick={() => scrollTo(section.id)}
              className="px-3 py-1.5 rounded-full text-[11px] font-semibold transition-all duration-200 whitespace-nowrap"
              style={{
                background: isActive ? 'rgba(99,102,241,0.2)' : 'transparent',
                color: isActive ? '#A5B4FC' : '#8B95A5',
                border: 'none',
                cursor: 'pointer',
                minHeight: '44px',
                minWidth: '44px',
              }}
              aria-current={isActive ? 'true' : undefined}
            >
              {lang === 'es' ? section.labelEs : section.label}
            </button>
          );
        })}

        {/* Back to top */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center justify-center w-11 h-11 rounded-full transition-all duration-200"
          style={{
            background: 'rgba(255,255,255,0.05)',
            color: '#8B95A5',
            border: 'none',
            cursor: 'pointer',
            minHeight: '44px',
            minWidth: '44px',
          }}
          aria-label={lang === 'es' ? 'Volver arriba' : 'Back to top'}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="18 15 12 9 6 15" />
          </svg>
        </button>
      </div>
    </nav>
  );
}
