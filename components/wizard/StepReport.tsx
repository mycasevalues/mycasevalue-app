'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { Reveal } from '../ui/Reveal';
import { CardBg as Card } from '../ui/CardBg';
import { ProgressRing } from '../ui/ProgressRing';
import { StepReportProps } from './WizardTypes';

// Lazy components for report
const ReportLoader = dynamic(() => import('../ui/ReportLoader'), { ssr: false });
const EmailCaptureGate = dynamic(() => import('../ui/EmailCaptureGate'), { ssr: false });
const ExitIntentModal = dynamic(() => import('../ui/ExitIntentModal'), { ssr: false });
const SocialProofToast = dynamic(() => import('../ui/SocialProofToast'), { ssr: false });
const ReportTabs = dynamic(() => import('../ui/ReportTabs'), { ssr: false });
const ReportSidebar = dynamic(() => import('../ui/ReportSidebar'), { ssr: false });
const ConfidenceRing = dynamic(() => import('../ui/ConfidenceRing'), { ssr: false });
const CaseTimeline = dynamic(() => import('../ui/CaseTimeline'), { ssr: false });
const CaseTimelineSimulator = dynamic(() => import('../features/CaseTimelineSimulator'), { ssr: false });
const LitigationCostEstimator = dynamic(() => import('../features/LitigationCostEstimator'), { ssr: false });
const ShareCard = dynamic(() => import('../features/ShareCard'), { ssr: false });

export function StepReport({
  lang,
  t,
  toast,
  go,
  loading,
  loadPct,
  showReportLoader,
  setShowReportLoader,
  result,
  setResult,
  spec,
  sit,
  stateCode,
  timing,
  amount,
  attorney,
  isPremium,
  darkMode,
  emailCaptured,
  showEmailGate,
  setShowEmailGate,
  setEmailCaptured,
  activeReportTab,
  setActiveReportTab,
  showShareCard,
  setShowShareCard,
  saveReport,
  reportsGeneratedRef,
  buy,
  setShowPricing,
  ...rest
}: StepReportProps) {
  // Loading state
  if (loading) {
    return (
      <div className="max-w-3xl mx-auto py-8 relative scan-line">
        {showReportLoader && (
          <ReportLoader
            lang={lang}
            caseName={spec?.d || ''}
            onComplete={() => setShowReportLoader(false)}
          />
        )}
        {/* Animated header skeleton */}
        <div className="flex justify-between mb-6">
          <div className="flex-1">
            <div className="h-3 w-44 rounded-lg skeleton" />
            <div className="h-7 w-3/5 rounded-lg mt-2.5 skeleton" />
          </div>
          <div className="h-11 w-24 rounded-lg skeleton" />
        </div>

        {/* Animated metric cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6 stagger-in">
          {[
            { label: lang === 'es' ? 'Registros' : 'Records', color: 'var(--accent-primary)' },
            { label: lang === 'es' ? 'Comparando' : 'Matching', color: 'var(--accent-secondary)' },
            { label: lang === 'es' ? 'Analizando' : 'Analyzing', color: 'var(--accent-secondary, #8B5CF6)' },
          ].map((item, i) => (
            <div key={i} className="p-5 border border-[var(--border-default)] rounded-2xl glass-premium" style={{ animationDelay: `${i * 100}ms` }}>
              <div className="text-[10px] font-bold tracking-[2px] uppercase mb-2" style={{ color: item.color }}>{item.label}</div>
              <div className="h-8 w-2/3 rounded skeleton" />
              {loadPct > (i + 1) * 25 && (
                <div className="mt-2 h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--bg-elevated)' }}>
                  <div className="h-full rounded-full transition-all duration-500" style={{ width: '100%', background: `linear-gradient(90deg, ${item.color}, ${item.color}80)` }} />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Main progress bar */}
        <div className="w-full h-2 bg-[var(--bg-elevated)] rounded-full overflow-hidden mb-4 relative">
          <div className="h-full rounded-full transition-all duration-300 progress-animated" style={{
            width: `${loadPct}%`,
            boxShadow: '0 0 20px rgba(17,17,17,0.4)',
          }} />
        </div>

        {/* Progress ring + status */}
        <div className="flex flex-col items-center">
          <div className="mb-3 relative">
            <ProgressRing pct={loadPct} size={64} />
            <div className="absolute inset-0 rounded-full morph-blob" style={{ background: 'radial-gradient(circle, rgba(17,17,17,0.06) 0%, transparent 70%)', transform: 'scale(2)' }} />
          </div>
          <div className="text-[15px] text-[var(--fg-secondary)] mb-2 text-center font-medium">
            {lang === 'es' ? (
              loadPct < 15 ? 'Buscando registros judicales...'
              : loadPct < 30 ? `Coincidiendo ${spec?.d || 'tu situación'}...`
              : loadPct < 50 ? 'Cruzando datos con CourtListener...'
              : loadPct < 70 ? 'Agregando resultados históricos...'
              : loadPct < 85 ? 'Analizando casos similares...'
              : 'Generando tu informe personalizado...'
            ) : (
              loadPct < 15 ? 'Searching court records...'
              : loadPct < 30 ? `Matching ${spec?.d || 'your situation'}...`
              : loadPct < 50 ? 'Cross-referencing CourtListener...'
              : loadPct < 70 ? 'Aggregating historical outcomes...'
              : loadPct < 85 ? 'Analyzing similar cases...'
              : 'Generating your personalized report...'
            )}
          </div>

          {/* Data source badges */}
          {loadPct > 20 && (
            <div className="flex flex-wrap gap-2 mt-3 justify-center">
              {[
                { name: 'Federal Judicial Center', done: loadPct > 30 },
                { name: 'CourtListener', done: loadPct > 50 },
                { name: 'PACER Records', done: loadPct > 70 },
              ].map((src, i) => (
                <div key={i} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-medium transition-all" style={{
                  background: src.done ? 'rgba(13,148,136,0.1)' : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${src.done ? 'rgba(13,148,136,0.2)' : '#E5E7EB'}`,
                  color: src.done ? '#0D9488' : '#9CA3AF',
                }}>
                  {src.done ? (
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#0D9488" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  ) : (
                    <div className="w-2.5 h-2.5 rounded-full border border-[var(--border-muted)] breathe" />
                  )}
                  {src.name}
                </div>
              ))}
            </div>
          )}

          {loadPct > 30 && loadPct < 90 && (
            <div className="text-[12px] text-[var(--fg-muted)] mt-3 text-center max-w-md">
              {lang === 'es' ? 'Los tribunales federales resolvieron más de 400,000 casos civiles el año pasado.' : 'Federal courts resolved over 400,000 civil cases last year.'}
            </div>
          )}
        </div>
      </div>
    );
  }

  if (!result) return null;

  // Placeholder implementation for report view
  // In production, this would render the full report with all analytics
  return (
    <>
      {showEmailGate && !emailCaptured && !isPremium && (
        <EmailCaptureGate
          lang={lang}
          caseType={spec?.d}
          onSubmit={(email) => {
            setEmailCaptured(true);
            setShowEmailGate(false);
            try { localStorage.setItem('mcv-email', email); } catch {}
          }}
          onSkip={() => setShowEmailGate(false)}
        />
      )}
      <SocialProofToast lang={lang} active={true} />
      {!emailCaptured && !isPremium && (
        <ExitIntentModal
          lang={lang}
          caseType={spec?.d}
          onCapture={(email) => {
            setEmailCaptured(true);
            try { localStorage.setItem('mcv-email', email); } catch {}
          }}
        />
      )}
      <div className="py-6 cinematic-enter">
        {/* Start New Report button */}
        <Reveal>
          <div className="mb-6 flex gap-2">
            <button
              onClick={() => { setResult(null); go(0); }}
              className="ml-auto px-5 py-2.5 text-sm font-semibold rounded-lg border transition-all no-print"
              style={{ background: 'linear-gradient(135deg, rgba(17,17,17,0.1), rgba(17,17,17,0.05))', border: '1.5px solid var(--border-default)', color: '#8B5CF6' }}
            >
              {lang === 'es' ? '+ Nuevo informe' : '+ Start New Report'}
            </button>
          </div>
        </Reveal>

        {/* Report header - case value estimate */}
        <Reveal>
          <div className="mb-6 p-6 sm:p-8 rounded-2xl text-center relative overflow-hidden" style={{
            background: 'linear-gradient(135deg, rgba(17,17,17,0.12), rgba(13,148,136,0.08))',
            border: '1.5px solid rgba(17,17,17,0.2)',
          }}>
            <div className="absolute inset-0 rounded-2xl" style={{ background: 'radial-gradient(ellipse at top, rgba(17,17,17,0.08) 0%, transparent 60%)' }} />
            <div className="relative">
              <div className="text-[11px] font-bold tracking-[2px] uppercase mb-2" style={{ color: 'var(--accent-secondary, #8B5CF6)' }}>
                {lang === 'es' ? 'Valor estimado de su caso' : 'Your Estimated Case Value'}
              </div>
              <div className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold mb-2" style={{ letterSpacing: '-2px', color: '#FFFFFF', textShadow: '0 2px 20px rgba(17,17,17,0.3)' }}>
                N/A
              </div>
              <div className="text-[12px]" style={{ color: '#9BA8BE' }}>
                {lang === 'es'
                  ? 'Basado en casos similares'
                  : 'Based on similar cases'}
              </div>
            </div>
          </div>
        </Reveal>

        {/* Quick metrics */}
        <Reveal>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5 data-grid-stagger">
            {[
              { label: lang === 'es' ? 'Tasa de éxito' : 'Win Rate', value: '—', color: '#333333' },
              { label: lang === 'es' ? 'Casos similares' : 'Similar Cases', value: '—', color: '#333333' },
              { label: lang === 'es' ? 'Duración típica' : 'Typical Duration', value: '—', color: 'var(--accent-secondary, #8B5CF6)' },
              { label: lang === 'es' ? 'Acuerdo + Victoria' : 'Settle + Win', value: '—', color: '#5EEAD4' },
            ].map((m, i) => (
              <div key={i} className="glass-ultra rounded-xl p-4 text-center spotlight-card gpu-accelerate">
                <div className="text-[10px] font-bold tracking-[2px] uppercase mb-2" style={{ color: 'var(--fg-muted)' }}>{m.label}</div>
                <div className="text-2xl sm:text-3xl font-display font-extrabold" style={{ color: m.color, letterSpacing: '-1px' }}>{m.value}</div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Report action buttons */}
        <Reveal>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4 no-print">
            <div className="flex items-center gap-2">
              <span className="live-beacon" />
              <span className="text-sm text-[var(--fg-muted)]">
                <strong className="text-[var(--fg-muted)]">{reportsGeneratedRef.current}</strong> {lang === 'es' ? 'informes generados hoy' : 'reports generated today'}
              </span>
            </div>
            <div className="flex gap-2">
              <button onClick={() => {
                try {
                  const u = window.location.origin;
                  navigator.clipboard.writeText(u);
                  toast(lang === 'es' ? '¡Enlace copiado!' : 'Link copied!');
                } catch { toast(lang === 'es' ? 'No se pudo copiar' : 'Could not copy'); }
              }} className="text-sm font-semibold px-5 py-2.5 card-bg bg-[#FFFFFF] border border-[var(--border-default)] rounded-lg cursor-pointer text-[var(--fg-muted)] hover:text-[var(--fg-muted)] transition-colors" style={{ minHeight: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {lang === 'es' ? 'Compartir' : 'Share'}
              </button>
              <button onClick={() => setShowShareCard(!showShareCard)} className="text-sm font-semibold px-5 py-2.5 card-bg bg-[#FFFFFF] border border-[var(--border-default)] rounded-lg cursor-pointer text-[var(--fg-muted)] hover:text-[var(--fg-muted)] transition-colors" style={{ minHeight: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {lang === 'es' ? 'Tarjeta' : 'Card'}
              </button>
              <button onClick={saveReport} className="text-sm font-semibold px-5 py-2.5 card-bg bg-[#FFFFFF] border border-[var(--border-default)] rounded-lg cursor-pointer text-[var(--fg-muted)] hover:text-[var(--fg-muted)] transition-colors" style={{ minHeight: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="inline-block mr-1" style={{ verticalAlign: '-2px' }}><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/></svg>
                {lang === 'es' ? 'Guardar' : 'Save'}
              </button>
              {isPremium && (
                <button onClick={() => { try { window.print(); } catch {} }}
                  className="text-sm font-semibold px-5 py-2.5 card-bg bg-[#FFFFFF] border border-[var(--border-default)] rounded-lg cursor-pointer text-[var(--fg-muted)] hover:text-[var(--fg-muted)] transition-colors" style={{ minHeight: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  PDF
                </button>
              )}
            </div>
          </div>
        </Reveal>

        {showShareCard && (
          <Reveal>
            <div className="mb-4">
              <ShareCard
                lang={lang}
                caseType={spec?.d || ''}
                winRate={50}
                settlementPct={0}
                medianRecovery="—"
                duration="— months"
                totalCases={0}
              />
            </div>
          </Reveal>
        )}

        {/* Report tabs */}
        <ReportTabs lang={lang} activeTab={activeReportTab} onTabChange={setActiveReportTab} />

        {/* Report content */}
        <div style={{ display: 'flex', gap: 'var(--space-6, 24px)', alignItems: 'flex-start' }}>
          <div className="hidden lg:block" style={{ flexShrink: 0 }}>
            <ReportSidebar
              lang={lang}
              caseType={spec?.d || ''}
              category={sit?.label || ''}
              winRate={50}
              medianDays={300}
              settlementRate={0}
              activeTab={activeReportTab}
              onTabChange={setActiveReportTab}
              isPremium={isPremium}
              onUpgrade={() => setShowPricing(true)}
            />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <Reveal delay={20}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <Card className="flex items-center justify-center p-6">
                  <ConfidenceRing score={50} lang={lang} sublabel={lang === 'es' ? 'Basado en datos históricos' : 'Based on historical data'} />
                </Card>
                <Card className="p-5">
                  <CaseTimeline medianMonths={10} caseType={spec?.d} lang={lang} />
                </Card>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </>
  );
}
