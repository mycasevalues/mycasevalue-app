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

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-1">
            {[
              { href: '/how-it-works', label: lang === 'es' ? 'Cómo Funciona' : 'How It Works' },
              { href: '/odds', label: lang === 'es' ? 'Mis Probabilidades' : 'Check My Odds' },
              { href: '/pricing', label: lang === 'es' ? 'Precios' : 'Pricing' },
              { href: '/trends', label: lang === 'es' ? 'Tendencias' : 'Trends' },
              { href: '/map', label: lang === 'es' ? 'Mapa' : 'Map' },
              { href: '/cases', label: lang === 'es' ? 'Categorías' : 'Case Types' },
              { href: '/faq', label: 'FAQ' },
            ].map(link => (
              <a
                key={link.href}
                href={link.href}
                className="px-3 py-1.5 rounded-lg text-[13px] font-medium transition-colors"
                style={{ color: '#B0BDD0', textDecoration: 'none' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#E2E8F0')}
                onMouseLeave={e => (e.currentTarget.style.color = '#B0BDD0')}
              >
                {link.label}
              </a>
            ))}
          </div>

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
                  color: '#B0BDD0',
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

            {/* Search shortcut hint — desktop only */}
            <button
              onClick={() => {
                const ev = new KeyboardEvent('keydown', { key: 'k', metaKey: true, ctrlKey: true, bubbles: true });
                window.dispatchEvent(ev);
              }}
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg border cursor-pointer no-print hover:border-[var(--accent-primary)] transition-colors"
              style={{
                background: 'var(--bg-surface)',
                borderColor: 'var(--border-default)',
                color: 'var(--fg-muted)',
                fontSize: 'var(--text-xs)',
              }}
              aria-label={lang === 'es' ? 'Buscar (Ctrl+K)' : 'Search (Cmd+K)'}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
              <span>{lang === 'es' ? 'Buscar...' : 'Search...'}</span>
              <kbd style={{
                fontSize: '10px',
                fontWeight: 600,
                padding: '1px 5px',
                borderRadius: '4px',
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border-default)',
                fontFamily: 'inherit',
              }}>
                ⌘K
              </kbd>
            </button>

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
            <span className="text-[10px] font-bold tracking-[2px] uppercase mb-2 block" style={{ color: '#8B95A5' }}>
              {lang === 'es' ? 'Idioma' : 'Language'}
            </span>
            <LanguageToggle lang={lang} setLang={setLang} />
          </div>

          {/* Navigation links */}
          <div className="flex flex-col gap-1 pb-3 border-b" style={{ borderColor: '#1E293B' }}>
            {[
              { href: '/how-it-works', label: lang === 'es' ? 'Cómo Funciona' : 'How It Works', icon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
              { href: '/odds', label: lang === 'es' ? 'Mis Probabilidades' : 'Check My Odds', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
              { href: '/pricing', label: lang === 'es' ? 'Precios' : 'Pricing', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
              { href: '/trends', label: lang === 'es' ? 'Tendencias' : 'Trends', icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' },
              { href: '/map', label: lang === 'es' ? 'Mapa de Distritos' : 'District Map', icon: 'M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l5.447 2.724A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7' },
              { href: '/cases', label: lang === 'es' ? 'Categorías de Casos' : 'Case Types', icon: 'M4 6h16M4 12h16M4 18h7' },
              { href: '/faq', label: 'FAQ', icon: 'M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01' },
            ].map(link => (
              <a
                key={link.href}
                href={link.href}
                onClick={closeMobile}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-colors text-sm font-medium"
                style={{ background: 'transparent', color: '#E2E8F0', textDecoration: 'none' }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ color: '#8B95A5' }}>
                  <path d={link.icon}/>
                </svg>
                {link.label}
              </a>
            ))}
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
          color: lang === 'en' ? '#fff' : '#B0BDD0',
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
          color: lang === 'es' ? '#fff' : '#B0BDD0',
        }}
      >
        ES
      </button>
    </div>
  );
}
