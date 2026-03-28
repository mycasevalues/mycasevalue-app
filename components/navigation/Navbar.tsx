'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Logo } from '../ui/Logo';

interface NavbarProps {
  lang: 'en' | 'es';
  setLang: (l: 'en' | 'es') => void;
  darkMode: boolean;
  isPremium: boolean;
  savedReportsCount: number;
  onShowSaved: () => void;
  onReset: () => void;
  onNewReport: () => void;
  newReportLabel: string;
  premiumLabel: string;
  scrolled: boolean;
  scrollProgress: number;
}

export function Navbar({
  lang, setLang, darkMode, isPremium,
  savedReportsCount, onShowSaved, onReset, onNewReport,
  newReportLabel, premiumLabel, scrolled, scrollProgress,
}: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Focus trap for mobile drawer
  useEffect(() => {
    if (!mobileOpen) return;
    const drawer = drawerRef.current;
    if (!drawer) return;

    const focusable = drawer.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    first?.focus();

    const trap = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { e.preventDefault(); setMobileOpen(false); triggerRef.current?.focus(); return; }
      if (e.key !== 'Tab') return;
      if (e.shiftKey) { if (document.activeElement === first) { e.preventDefault(); last?.focus(); } }
      else { if (document.activeElement === last) { e.preventDefault(); first?.focus(); } }
    };
    document.addEventListener('keydown', trap);

    // Lock body scroll
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', trap);
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const closeMobile = useCallback(() => {
    setMobileOpen(false);
    triggerRef.current?.focus();
  }, []);

  return (
    <>
      <nav
        className={`sticky top-0 z-50 no-print transition-all duration-300 ${
          scrolled ? 'shadow-card border-b' : 'bg-transparent'
        }`}
        style={{
          background: scrolled ? 'rgba(11,18,33,0.85)' : 'transparent',
          backdropFilter: scrolled ? 'blur(24px) saturate(180%)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(24px) saturate(180%)' : 'none',
          borderColor: scrolled ? '#1E293B' : 'transparent',
        }}
        role="navigation"
        aria-label="Main navigation"
      >
        {/* Scroll progress bar */}
        {scrolled && scrollProgress > 0 && (
          <div className="absolute bottom-0 left-0 right-0 h-[2px]" style={{ background: 'rgba(255,255,255,0.05)' }}>
            <div className="h-full transition-none" style={{
              width: `${scrollProgress * 100}%`,
              background: 'linear-gradient(90deg, #4F46E5, #0D9488)',
              boxShadow: '0 0 8px rgba(64,64,242,0.3)',
            }} />
          </div>
        )}
        <div className="max-w-[1140px] mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={onReset}
            className="flex items-center gap-2.5 bg-transparent border-none cursor-pointer focus-ring"
            aria-label="MyCaseValue home"
          >
            <Logo size="md" darkMode={true} />
          </button>

          {/* Desktop actions */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Language toggle */}
            <LanguageToggle lang={lang} setLang={setLang} />

            {/* Saved reports */}
            {savedReportsCount > 0 && (
              <button
                onClick={onShowSaved}
                className="h-8 px-2.5 rounded-lg border cursor-pointer flex items-center justify-center transition-colors text-[12px] font-bold tracking-wide focus-ring"
                style={{
                  background: '#1E293B',
                  borderColor: '#334155',
                  color: '#94A3B8',
                }}
                aria-label={`${savedReportsCount} saved report${savedReportsCount !== 1 ? 's' : ''}`}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-1" aria-hidden="true">
                  <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/>
                </svg>
                {savedReportsCount}
              </button>
            )}

            {/* Premium badge */}
            {isPremium && (
              <span className="text-[11px] font-bold px-3 py-1 rounded-full" style={{ color: '#A5B4FC', background: 'rgba(99,102,241,0.15)' }}>
                {premiumLabel}
              </span>
            )}

            {/* New Report CTA */}
            <button
              onClick={onNewReport}
              className="text-sm font-semibold px-5 py-2.5 text-white border-none rounded-full cursor-pointer no-print hover:scale-[1.03] active:scale-[0.97] transition-all duration-200 focus-ring"
              style={{ background: 'linear-gradient(135deg, #4F46E5, #6366F1)', boxShadow: '0 2px 12px rgba(64,64,242,.25)' }}
            >
              {newReportLabel}
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            ref={triggerRef}
            onClick={() => setMobileOpen(!mobileOpen)}
            className="sm:hidden w-10 h-10 flex items-center justify-center rounded-lg border-none bg-transparent cursor-pointer focus-ring"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-drawer"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            <div className="flex flex-col gap-[5px] w-5">
              <span className="h-[2px] rounded-full transition-all duration-300"
                style={{ background: '#E2E8F0', transform: mobileOpen ? 'rotate(45deg) translateY(7px)' : 'none' }} />
              <span className="h-[2px] rounded-full transition-all duration-300"
                style={{ background: '#E2E8F0', opacity: mobileOpen ? 0 : 1 }} />
              <span className="h-[2px] rounded-full transition-all duration-300"
                style={{ background: '#E2E8F0', transform: mobileOpen ? 'rotate(-45deg) translateY(-7px)' : 'none' }} />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile drawer overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 sm:hidden"
          style={{ background: 'rgba(11,18,33,0.7)', backdropFilter: 'blur(4px)' }}
          onClick={closeMobile}
          aria-hidden="true"
        />
      )}

      {/* Mobile drawer */}
      <div
        ref={drawerRef}
        id="mobile-nav-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={`fixed top-16 right-0 z-50 w-72 max-w-[85vw] sm:hidden transition-transform duration-300 ${
          mobileOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{
          height: 'calc(100vh - 4rem)',
          background: '#0D1117',
          borderLeft: '1px solid #1E293B',
          boxShadow: '-8px 0 32px rgba(0,0,0,0.3)',
        }}
      >
        <div className="flex flex-col gap-3 p-5 h-full overflow-y-auto">
          {/* Language */}
          <div className="pb-3 border-b" style={{ borderColor: '#1E293B' }}>
            <span className="text-[10px] font-bold tracking-[2px] uppercase mb-2 block" style={{ color: '#64748B' }}>
              {lang === 'es' ? 'Idioma' : 'Language'}
            </span>
            <LanguageToggle lang={lang} setLang={setLang} />
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-2">
            {savedReportsCount > 0 && (
              <button
                onClick={() => { closeMobile(); onShowSaved(); }}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-colors text-sm font-medium focus-ring"
                style={{ background: '#161B22', color: '#E2E8F0' }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/>
                </svg>
                {lang === 'es' ? 'Mis informes' : 'My Reports'}
                <span className="ml-auto text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: 'rgba(99,102,241,0.15)', color: '#A5B4FC' }}>
                  {savedReportsCount}
                </span>
              </button>
            )}
          </div>

          {/* CTA */}
          <div className="mt-auto pt-4 border-t" style={{ borderColor: '#1E293B' }}>
            {isPremium && (
              <div className="text-center mb-3">
                <span className="text-[11px] font-bold px-3 py-1 rounded-full" style={{ color: '#A5B4FC', background: 'rgba(99,102,241,0.15)' }}>
                  {premiumLabel}
                </span>
              </div>
            )}
            <button
              onClick={() => { closeMobile(); onNewReport(); }}
              className="w-full py-3 text-sm font-semibold text-white border-none rounded-xl cursor-pointer transition-all focus-ring"
              style={{ background: 'linear-gradient(135deg, #4F46E5, #6366F1)', boxShadow: '0 2px 12px rgba(64,64,242,.25)' }}
            >
              {newReportLabel}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

/* --- Sub-components --- */

function LanguageToggle({ lang, setLang }: { lang: 'en' | 'es'; setLang: (l: 'en' | 'es') => void }) {
  return (
    <div
      className="h-8 rounded-lg border flex items-center overflow-hidden transition-colors"
      role="radiogroup"
      aria-label="Language selection"
      style={{ background: '#1E293B', borderColor: '#334155' }}
    >
      <button
        onClick={() => setLang('en')}
        role="radio"
        aria-checked={lang === 'en'}
        aria-label="English"
        className="h-full px-2.5 text-[11px] font-bold tracking-wide cursor-pointer border-none transition-all duration-200 focus-ring"
        style={{
          background: lang === 'en' ? 'linear-gradient(135deg, #4F46E5, #6366F1)' : 'transparent',
          color: lang === 'en' ? '#fff' : '#94A3B8',
        }}
      >
        EN
      </button>
      <button
        onClick={() => setLang('es')}
        role="radio"
        aria-checked={lang === 'es'}
        aria-label="Español"
        className="h-full px-2.5 text-[11px] font-bold tracking-wide cursor-pointer border-none transition-all duration-200 focus-ring"
        style={{
          background: lang === 'es' ? 'linear-gradient(135deg, #4F46E5, #6366F1)' : 'transparent',
          color: lang === 'es' ? '#fff' : '#94A3B8',
        }}
      >
        ES
      </button>
    </div>
  );
}
