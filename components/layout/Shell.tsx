'use client';

import React from 'react';
import { Logo } from '../ui/Logo';
import { Navbar } from '../navigation/Navbar';
import MobileBottomNav from '../ui/MobileBottomNav';
import SavedReports from '../ui/SavedReports';
import dynamic from 'next/dynamic';
import { Lang } from '../../lib/i18n';
import type { TRANSLATIONS } from '../../lib/i18n';

// Lazy load heavy components
const AnnouncementBar = dynamic(() => import('../sections/AnnouncementBar'), { ssr: false });
const BottomNav = dynamic(() => import('../navigation/BottomNav'), { ssr: false });

export interface ShellProps {
  darkMode: boolean;
  viewMode: 'auto' | 'mobile' | 'desktop' | 'tablet';
  step: number;
  readingPct: number;
  showConfetti: boolean;
  lang: Lang;
  navScrolled: boolean;
  scrollProgress: number;
  setLang: (lang: Lang) => void;
  isPremium: boolean;
  savedReportsLength: number;
  setShowSaved: (show: boolean) => void;
  reset: () => void;
  t: typeof TRANSLATIONS['en'];
  UPL: {
    banner: string;
  };
  showBackToTop: boolean;
  toastMsg: string;
  toastVis: boolean;
  showExitIntent: boolean;
  setShowExitIntent: (show: boolean) => void;
  buy: (plan: string) => void;
  showSaved: boolean;
  referralCode: string;
  toast: (msg: string) => void;
  showCookieConsent: boolean;
  setShowCookieConsent: (show: boolean) => void;
  setLegalPage: (page: 'terms' | 'privacy' | 'cookies' | 'disclaimer') => void;
  legalPage: 'terms' | 'privacy' | 'cookies' | 'disclaimer' | null;
  showMethodology: boolean;
  children: React.ReactNode;
}

// Toast notification component
function Toast({ message, visible }: { message: string; visible: boolean }) {
  if (!visible) return null;
  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-6 left-1/2 -translate-x-1/2 px-6 py-3 rounded-xl text-sm font-medium z-[var(--z-modal)] text-white"
      style={{
        background: '#F9F8F6',
        boxShadow: '0 8px 32px rgba(255,255,255,.2)',
        animation: 'slideUp 0.3s ease',
      }}
    >
      {message}
    </div>
  );
}

// Success celebration component with confetti-like animation
function SuccessCelebration() {
  const sparkles = React.useMemo(
    () =>
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: 20 + Math.random() * 60,
        delay: Math.random() * 800,
        duration: 1200 + Math.random() * 1000,
        size: 2 + Math.random() * 4,
        opacity: 0.4 + Math.random() * 0.6,
      })),
    []
  );

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[var(--z-modal)] overflow-hidden"
      aria-hidden="true"
    >
      {/* Center pulse rings */}
      <div className="success-pulse-ring" style={{ animationDelay: '0ms' }} />
      <div className="success-pulse-ring" style={{ animationDelay: '300ms' }} />
      <div className="success-pulse-ring" style={{ animationDelay: '600ms' }} />
      {/* Rising sparkles */}
      {sparkles.map((s) => (
        <div
          key={s.id}
          style={{
            position: 'absolute',
            left: `${s.x}%`,
            bottom: '-8px',
            width: s.size,
            height: s.size,
            borderRadius: '50%',
            background: `radial-gradient(circle, #7C3AED, #8B5CF6)`,
            boxShadow: `0 0 ${s.size * 2}px #11111188`,
            opacity: s.opacity,
            animation: `sparkleRise ${s.duration}ms ${s.delay}ms ease-out forwards`,
          }}
        />
      ))}
      {/* Center checkmark burst */}
      <div className="success-check-burst">
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
          <circle cx="32" cy="32" r="30" stroke="#111111" strokeWidth="2" opacity="0.3" />
          <path
            d="M20 33 L28 41 L44 23"
            stroke="#111111"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="success-check-path"
          />
        </svg>
      </div>
    </div>
  );
}

export function Shell({
  darkMode,
  viewMode,
  step,
  readingPct,
  showConfetti,
  lang,
  navScrolled,
  scrollProgress,
  setLang,
  isPremium,
  savedReportsLength,
  setShowSaved,
  reset,
  t,
  UPL,
  showBackToTop,
  toastMsg,
  toastVis,
  showExitIntent,
  setShowExitIntent,
  buy,
  showSaved,
  referralCode,
  toast,
  showCookieConsent,
  setShowCookieConsent,
  setLegalPage,
  legalPage,
  showMethodology,
  children,
}: ShellProps) {
  return (
    <>
      <a href="#main-content" className="skip-link">
        {lang === 'es' ? 'Ir al contenido' : 'Skip to content'}
      </a>
      <div
        role="application"
        aria-label="MyCaseValue"
        data-mcv-loaded="true"
        style={{
          background: 'var(--bg-base)',
          minHeight: '100vh',
          fontFamily: "'Roboto', system-ui, sans-serif",
          color: '#111111',
          maxWidth:
            viewMode === 'mobile' ? '430px' : viewMode === 'desktop' ? '100%' : undefined,
          margin: viewMode === 'mobile' ? '0 auto' : undefined,
          boxShadow: viewMode === 'mobile' ? '0 0 40px rgba(255,255,255,.08)' : undefined,
          transition: 'max-width 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Reading progress bar */}
        {step === 6 && (
          <div className="reading-progress" style={{ width: `${readingPct}%` }} />
        )}

        {/* Success celebration on report completion */}
        {showConfetti && <SuccessCelebration />}

        {/* Announcement Bar — live case count */}
        <AnnouncementBar lang={lang} />

        {/* Sticky Nav */}
        <Navbar
          lang={lang}
          setLang={setLang}
          darkMode={darkMode}
          isPremium={isPremium}
          savedReportsCount={savedReportsLength}
          onShowSaved={() => setShowSaved(true)}
          onReset={reset}
          onNewReport={reset}
          newReportLabel={t.new_report}
          premiumLabel={t.premium}
          scrolled={navScrolled}
          scrollProgress={scrollProgress}
        />

        <main
          id="main-content"
          className="w-full relative z-10"
          role="main"
          style={{ paddingBottom: 'calc(72px + env(safe-area-inset-bottom, 0px))' }}
        >
          {/* UPL Banner */}
          <div
            className="text-center py-2 border-b no-print"
            style={{
              borderColor: 'var(--border-default)',
              background: 'rgba(229,231,235,0.3)',
            }}
          >
            <span
              className="text-[10px] sm:text-[11px] font-semibold tracking-[2px]"
              style={{ color: '#6B7280' }}
            >
              {lang === 'es'
                ? 'HERRAMIENTA INFORMATIVA SOLAMENTE — NO ES ASESORÍA LEGAL'
                : UPL.banner}
            </span>
          </div>

          {children}

        </main>

        <Toast message={toastMsg} visible={toastVis} />

        {/* Back to top button */}
        {showBackToTop && (
          <button type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-6 right-6 w-10 h-10 rounded-full flex items-center justify-center z-[var(--z-dropdown)] cursor-pointer no-print transition-all"
            style={{
              background: 'linear-gradient(135deg, #8B5CF6, #7C3AED)',
              boxShadow: '0 4px 16px rgba(17,17,17,.3)',
            }}
            aria-label="Back to top"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              <path d="M18 15l-6-6-6 6" />
            </svg>
          </button>
        )}

        {/* Exit intent popup */}
        {showExitIntent && !isPremium && (
          <div
            className="fixed inset-0 z-[var(--z-modal)] flex items-end sm:items-center justify-center p-4"
            style={{ background: 'rgba(255,255,255,.6)', backdropFilter: 'blur(8px)' }}
          >
            <div
              className="exit-intent-modal card-bg bg-[#FFFFFF] rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <button type="button"
                onClick={() => setShowExitIntent(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[var(--bg-elevated)] flex items-center justify-center cursor-pointer border-none"
                aria-label="Close"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#9CA3AF"
                  strokeWidth="2"
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-3 mx-auto"
                style={{ background: 'linear-gradient(135deg, #8B5CF6, #7C3AED)' }}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="M21 21l-4.35-4.35" />
                </svg>
              </div>
              <div className="text-xl font-display font-bold mb-2">
                {lang === 'es' ? '¡Espera! Te falta lo mejor' : "Wait — you're missing the best part"}
              </div>
              <p className="text-[14px] text-[#6B7280] mb-1 leading-relaxed">
                {lang === 'es'
                  ? 'Tu informe gratuito muestra la tasa de éxito. El informe completo agrega rangos de recuperación, impacto del abogado, cronología y más.'
                  : 'Your free report shows the win rate. The full report adds recovery ranges, attorney impact, timeline, and more.'}
              </p>
              <div
                className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[12px] font-bold mb-4"
                style={{ background: 'rgba(232,116,97,0.12)', color: '#E87461' }}
              >
                {lang === 'es' ? 'Oferta por tiempo limitado' : 'Limited time offer'}
              </div>
              <button type="button"
                onClick={() => {
                  setShowExitIntent(false);
                  buy('single');
                }}
                className="w-full py-3.5 text-[15px] font-semibold text-white border-none rounded-xl cursor-pointer"
                style={{ background: 'linear-gradient(135deg, #8B5CF6, #7C3AED)' }}
              >
                {lang === 'es' ? 'Informe Premium — $5.99' : 'Premium Report — $5.99'}
              </button>
              <button type="button"
                onClick={() => setShowExitIntent(false)}
                className="text-[13px] text-[#6B7280] mt-3 bg-transparent border-none cursor-pointer"
              >
                {lang === 'es' ? 'Ahora no' : 'Not now'}
              </button>
            </div>
          </div>
        )}

        {/* Saved Reports drawer */}
        {showSaved && (
          <div
            className="fixed inset-0 z-[var(--z-modal)] flex items-center justify-center p-4"
            style={{ background: 'rgba(255,255,255,.5)', backdropFilter: 'blur(8px)' }}
            onClick={() => setShowSaved(false)}
          >
            <div
              className="card-bg bg-[#FFFFFF] rounded-2xl p-6 max-w-lg w-full shadow-2xl max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="text-lg font-display font-bold">
                  {lang === 'es' ? 'Mis informes' : 'My Reports'}
                </div>
                <button type="button"
                  onClick={() => setShowSaved(false)}
                  className="w-8 h-8 rounded-full bg-[var(--bg-elevated)] flex items-center justify-center cursor-pointer border-none"
                  aria-label="Close"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#9CA3AF"
                    strokeWidth="2"
                  >
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <SavedReports
                lang={lang}
                onLoadReport={(report: any) => {
                  setShowSaved(false);
                  toast(lang === 'es' ? 'Cargando informe...' : 'Loading report...');
                }}
              />
              {/* Referral code */}
              <div className="mt-4 pt-4 border-t border-[var(--border-default)]">
                <div className="text-[11px] font-bold text-[#6B7280] tracking-[2px] mb-1">
                  {lang === 'es' ? 'TU CÓDIGO DE REFERENCIA' : 'YOUR REFERRAL CODE'}
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className="flex-1 px-3 py-2 rounded-lg bg-[var(--bg-elevated)] text-sm font-data font-bold"
                    style={{ color: '#8B5CF6' }}
                  >
                    {referralCode}
                  </div>
                  <button type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(referralCode);
                      toast(lang === 'es' ? '¡Copiado!' : 'Copied!');
                    }}
                    className="px-3 py-2 text-[12px] font-semibold rounded-lg cursor-pointer"
                    style={{
                      background: 'rgba(17,17,17,0.15)',
                      color: '#8B5CF6',
                      border: 'none',
                    }}
                  >
                    {lang === 'es' ? 'Copiar' : 'Copy'}
                  </button>
                </div>
                <div className="text-[11px] text-[#6B7280] mt-1">
                  {lang === 'es' ? 'Comparte y obtén un informe gratis' : 'Share and get a free report'}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Mobile bottom navigation */}
        <MobileBottomNav
          step={step}
          onReset={reset}
          onSearch={() => {
            if (step !== 1) reset();
          }}
          isPremium={isPremium}
          lang={lang}
          onSaved={() => setShowSaved(true)}
          savedCount={savedReportsLength}
        />

        {/* Bottom navigation */}
        <BottomNav
          lang={lang}
          activeTab={step === 0 ? 'home' : step === 6 ? 'reports' : 'search'}
          onNavigate={(tab) => {
            if (tab === 'home') reset();
            if (tab === 'search') {
              if (step !== 0) reset();
              setTimeout(() => {
                const el = document.querySelector('input[type="search"], input[type="text"]');
                if (el) (el as HTMLElement).focus();
              }, 100);
            }
            if (tab === 'premium') buy('unlimited');
          }}
          isPremium={isPremium}
        />

        {/* Cookie consent banner */}
        {showCookieConsent && (
          <div
            className="fixed bottom-0 left-0 right-0 z-[var(--z-modal)] p-4 no-print"
            style={{
              background: 'rgba(255,255,255,0.95)',
              backdropFilter: 'blur(12px)',
            }}
          >
            <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <div className="flex-1">
                <p className="text-[13px] leading-relaxed" style={{ color: 'var(--fg-secondary)' }}>
                  {lang === 'es'
                    ? 'Usamos cookies esenciales para el funcionamiento del sitio. Las cookies opcionales de análisis nos ayudan a mejorar.'
                    : 'We use essential cookies for site functionality. Optional analytics cookies help us improve your experience.'}
                  <button type="button"
                    onClick={() => setLegalPage('privacy')}
                    className="text-[#111111] underline bg-transparent border-none cursor-pointer ml-1 text-[13px]"
                  >
                    {lang === 'es' ? 'Política de privacidad' : 'Privacy Policy'}
                  </button>
                </p>
              </div>
              <div className="flex gap-2">
                <button type="button"
                  onClick={() => {
                    try {
                      localStorage.setItem('mcv_cookies_accepted', 'essential');
                    } catch {}
                    setShowCookieConsent(false);
                  }}
                  className="px-4 py-2 text-[12px] font-semibold bg-transparent rounded-lg cursor-pointer transition-colors"
                  style={{ color: 'var(--fg-secondary)', border: '1px solid #4B5563' }}
                >
                  {lang === 'es' ? 'Solo esenciales' : 'Essential only'}
                </button>
                <button type="button"
                  onClick={() => {
                    try {
                      localStorage.setItem('mcv_cookies_accepted', 'all');
                    } catch {}
                    setShowCookieConsent(false);
                  }}
                  className="px-4 py-2 text-[12px] font-semibold text-white rounded-lg cursor-pointer border-none"
                  style={{ background: 'linear-gradient(135deg, #8B5CF6, #7C3AED)' }}
                >
                  {lang === 'es' ? 'Aceptar todo' : 'Accept all'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Shell;

// ============================================================
// FOOTER COMPONENT
// ============================================================
