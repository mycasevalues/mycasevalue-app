'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Logo } from '../ui/Logo';

interface NavbarProps {
  lang: 'en' | 'es';
  setLang: (l: 'en' | 'es') => void;
  darkMode: boolean;
  setDarkMode: (d: boolean) => void;
  isPremium: boolean;
  savedReportsCount: number;
  onShowSaved: () => void;
  onReset: () => void;
  onNewReport: () => void;
  newReportLabel: string;
  premiumLabel: string;
}

export function Navbar({
  lang, setLang, darkMode, setDarkMode, isPremium,
  savedReportsCount, onShowSaved, onReset, onNewReport,
  newReportLabel, premiumLabel,
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Scroll detection
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

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
      if (e.key === 'Escape') { setMobileOpen(false); triggerRef.current?.focus(); return; }
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
          scrolled
            ? 'glass shadow-card border-b border-surface-border'
            : 'bg-transparent'
        } ${darkMode ? 'glass-dark' : ''}`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-[1140px] mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={onReset}
            className="flex items-center gap-2.5 bg-transparent border-none cursor-pointer focus-ring"
            aria-label="MyCaseValue home"
          >
            <Logo size="sm" />
          </button>

          {/* Desktop actions */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Language toggle */}
            <LanguageToggle lang={lang} setLang={setLang} darkMode={darkMode} />

            {/* Saved reports */}
            {savedReportsCount > 0 && (
              <button
                onClick={onShowSaved}
                className="h-8 px-2.5 rounded-lg border cursor-pointer flex items-center justify-center transition-colors text-[12px] font-bold tracking-wide focus-ring"
                style={{
                  background: darkMode ? '#1E293B' : '#fff',
                  borderColor: darkMode ? '#334155' : '#E2E8F0',
                  color: '#64748B',
                }}
                aria-label={`${savedReportsCount} saved report${savedReportsCount !== 1 ? 's' : ''}`}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-1" aria-hidden="true">
                  <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/>
                </svg>
                {savedReportsCount}
              </button>
            )}

            {/* Dark mode */}
            <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} lang={lang} />

            {/* Premium badge */}
            {isPremium && (
              <span className="text-[11px] font-bold px-3 py-1 rounded-full" style={{ color: '#4040F2', background: '#E4E5FF' }}>
                {premiumLabel}
              </span>
            )}

            {/* New Report CTA */}
            <button
              onClick={onNewReport}
              className="text-sm font-semibold px-5 py-2.5 text-white border-none rounded-full cursor-pointer no-print hover:scale-[1.03] active:scale-[0.97] transition-all duration-200 focus-ring"
              style={{ background: 'linear-gradient(135deg, #4040F2, #5C5CF5)', boxShadow: '0 2px 12px rgba(64,64,242,.25)' }}
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
              <span
                className="h-[2px] rounded-full transition-all duration-300"
                style={{
                  background: darkMode ? '#E2E8F0' : '#0F172A',
                  transform: mobileOpen ? 'rotate(45deg) translateY(7px)' : 'none',
                }}
              />
              <span
                className="h-[2px] rounded-full transition-all duration-300"
                style={{
                  background: darkMode ? '#E2E8F0' : '#0F172A',
                  opacity: mobileOpen ? 0 : 1,
                }}
              />
              <span
                className="h-[2px] rounded-full transition-all duration-300"
                style={{
                  background: darkMode ? '#E2E8F0' : '#0F172A',
                  transform: mobileOpen ? 'rotate(-45deg) translateY(-7px)' : 'none',
                }}
              />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile drawer overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 sm:hidden"
          style={{ background: 'rgba(15,31,61,0.5)', backdropFilter: 'blur(4px)' }}
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
          background: darkMode ? '#0D1117' : '#FFFFFF',
          borderLeft: `1px solid ${darkMode ? '#1E293B' : '#E2E8F0'}`,
          boxShadow: '-8px 0 32px rgba(0,0,0,0.12)',
        }}
      >
        <div className="flex flex-col gap-3 p-5 h-full overflow-y-auto">
          {/* Language */}
          <div className="pb-3 border-b" style={{ borderColor: darkMode ? '#1E293B' : '#E2E8F0' }}>
            <span className="text-[10px] font-bold tracking-[2px] uppercase mb-2 block" style={{ color: '#94A3B8' }}>
              {lang === 'es' ? 'Idioma' : 'Language'}
            </span>
            <LanguageToggle lang={lang} setLang={(l) => { setLang(l); }} darkMode={darkMode} />
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-2">
            {savedReportsCount > 0 && (
              <button
                onClick={() => { closeMobile(); onShowSaved(); }}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-colors text-sm font-medium focus-ring"
                style={{
                  background: darkMode ? '#161B22' : '#F8FAFC',
                  color: darkMode ? '#E2E8F0' : '#334155',
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/>
                </svg>
                {lang === 'es' ? 'Mis informes' : 'My Reports'}
                <span className="ml-auto text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: '#E4E5FF', color: '#4040F2' }}>
                  {savedReportsCount}
                </span>
              </button>
            )}

            <button
              onClick={() => { closeMobile(); setDarkMode(!darkMode); }}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-colors text-sm font-medium focus-ring"
              style={{
                background: darkMode ? '#161B22' : '#F8FAFC',
                color: darkMode ? '#E2E8F0' : '#334155',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d={darkMode
                  ? "M12 3v1m0 16v1m9-9h-1M4 12H3m15.4 6.4l-.7-.7M6.3 6.3l-.7-.7m12.7 0l-.7.7M6.3 17.7l-.7.7M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  : "M21 12.8A9 9 0 1111.2 3 7 7 0 0021 12.8z"
                } />
              </svg>
              {darkMode
                ? (lang === 'es' ? 'Modo claro' : 'Light mode')
                : (lang === 'es' ? 'Modo oscuro' : 'Dark mode')
              }
            </button>
          </div>

          {/* CTA */}
          <div className="mt-auto pt-4 border-t" style={{ borderColor: darkMode ? '#1E293B' : '#E2E8F0' }}>
            {isPremium && (
              <div className="text-center mb-3">
                <span className="text-[11px] font-bold px-3 py-1 rounded-full" style={{ color: '#4040F2', background: '#E4E5FF' }}>
                  {premiumLabel}
                </span>
              </div>
            )}
            <button
              onClick={() => { closeMobile(); onNewReport(); }}
              className="w-full py-3 text-sm font-semibold text-white border-none rounded-xl cursor-pointer transition-all focus-ring"
              style={{ background: 'linear-gradient(135deg, #4040F2, #5C5CF5)', boxShadow: '0 2px 12px rgba(64,64,242,.25)' }}
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

function LanguageToggle({ lang, setLang, darkMode }: { lang: 'en' | 'es'; setLang: (l: 'en' | 'es') => void; darkMode: boolean }) {
  return (
    <div
      className="h-8 rounded-lg border flex items-center overflow-hidden transition-colors"
      role="radiogroup"
      aria-label="Language selection"
      style={{ background: darkMode ? '#1E293B' : '#F8FAFC', borderColor: darkMode ? '#334155' : '#E2E8F0' }}
    >
      <button
        onClick={() => setLang('en')}
        role="radio"
        aria-checked={lang === 'en'}
        aria-label="English"
        className="h-full px-2.5 text-[11px] font-bold tracking-wide cursor-pointer border-none transition-all duration-200 focus-ring"
        style={{
          background: lang === 'en' ? 'linear-gradient(135deg, #4040F2, #5C5CF5)' : 'transparent',
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
          background: lang === 'es' ? 'linear-gradient(135deg, #4040F2, #5C5CF5)' : 'transparent',
          color: lang === 'es' ? '#fff' : '#94A3B8',
        }}
      >
        ES
      </button>
    </div>
  );
}

function DarkModeToggle({ darkMode, setDarkMode, lang }: { darkMode: boolean; setDarkMode: (d: boolean) => void; lang: string }) {
  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      aria-label={darkMode
        ? (lang === 'es' ? 'Cambiar a modo claro' : 'Switch to light mode')
        : (lang === 'es' ? 'Cambiar a modo oscuro' : 'Switch to dark mode')
      }
      className="w-8 h-8 rounded-lg border cursor-pointer flex items-center justify-center transition-all duration-300 hover:scale-105 focus-ring"
      style={{
        background: darkMode ? 'linear-gradient(135deg, #1A2744, #243352)' : '#fff',
        borderColor: darkMode ? 'rgba(64,64,242,0.19)' : '#E2E8F0',
        boxShadow: darkMode ? '0 0 12px rgba(252,211,77,0.1)' : 'none',
      }}
    >
      <div style={{ transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)', transform: darkMode ? 'rotate(360deg)' : 'rotate(0deg)' }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={darkMode ? '#FCD34D' : '#94A3B8'} strokeWidth="2" aria-hidden="true"
          style={{ transition: 'stroke 0.3s ease' }}>
          <path d={darkMode
            ? "M12 3v1m0 16v1m9-9h-1M4 12H3m15.4 6.4l-.7-.7M6.3 6.3l-.7-.7m12.7 0l-.7.7M6.3 17.7l-.7.7M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            : "M21 12.8A9 9 0 1111.2 3 7 7 0 0021 12.8z"
          } />
        </svg>
      </div>
    </button>
  );
}
