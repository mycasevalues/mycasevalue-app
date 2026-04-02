'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { AnimatedNumber } from '../ui/AnimatedNumber';
import { CategoryIcon } from '../ui/Icons';
import { Reveal } from '../ui/Reveal';
import { CardBg as Card } from '../ui/CardBg';
import { SectionLabel } from '../ui/SectionLabel';
import { GlossaryTip } from '../ui/GlossaryTip';
import EnhancedSearch from '../ui/EnhancedSearch';
import { formatCount } from '../../lib/formatters';
import { StepHomeProps } from './WizardTypes';

// Lazy components
const LazySection = dynamic(() => import('../ui/LazySection'), { ssr: false });
const SectionNav = dynamic(() => import('../navigation/SectionNav'), { ssr: false });
const VerdictTicker = dynamic(() => import('../sections/VerdictTicker'), { ssr: false });
const TrustBar = dynamic(() => import('../sections/TrustBar'), { ssr: false });
const SocialProofBar = dynamic(() => import('../ui/SocialProofBar'), { ssr: false });
const DataFreshness = dynamic(() => import('../ui/DataFreshness'), { ssr: false });
const HeroStats = dynamic(() => import('../ui/HeroStats'), { ssr: false });
const TrustSourceBar = dynamic(() => import('../sections/TrustSourceBar'), { ssr: false });
const SettlementEvaluator = dynamic(() => import('../sections/SettlementEvaluator'), { ssr: false });
const CompetitorTable = dynamic(() => import('../sections/CompetitorTable'), { ssr: false });
const TheProblem = dynamic(() => import('../sections/TheProblem'), { ssr: false });
const OnboardingTour = dynamic(() => import('../ui/OnboardingTour'), { ssr: false });

export function StepHome({
  lang,
  t,
  toast,
  go,
  demo,
  naturalInput,
  setNaturalInput,
  showSuggestions,
  setShowSuggestions,
  aiSuggestions,
  setSit,
  setSpec,
  setAmount,
  detectCaseType,
  SITS,
  totalDisplay,
  liveCounter,
  heroCounterDone,
  showOnboarding,
  setShowOnboarding,
}: StepHomeProps) {
  return (
    <>
      {showOnboarding && (
        <OnboardingTour lang={lang} onComplete={() => setShowOnboarding(false)} />
      )}
      <SectionNav lang={lang} />
      <div className="hero-bg hero-parallax mesh-bg py-4 sm:py-6 pb-6 relative overflow-hidden noise-overlay particle-field cinematic-enter">
        {/* Animated floating orbs */}
        <div className="hero-orb hero-orb-1" />
        <div className="hero-orb hero-orb-2" />
        <div className="hero-orb hero-orb-3" />

        {/* Floating particles */}
        {[...Array(8)].map((_, i) => (
          <div key={i} className="particle" style={{
            left: `${10 + i * 12}%`,
            top: `${20 + (i % 3) * 25}%`,
            '--duration': `${10 + i * 2}s`,
            '--delay': `${i * 0.8}s`,
            '--dx': `${(i % 2 ? 1 : -1) * (20 + i * 5)}px`,
            '--dy': `${-30 - i * 10}px`,
            '--dx2': `${(i % 2 ? -1 : 1) * (15 + i * 3)}px`,
            '--dy2': `${-60 - i * 8}px`,
            '--dx3': `${(i % 2 ? 1 : -1) * 10}px`,
            '--dy3': `${-20 - i * 5}px`,
            width: `${3 + (i % 3)}px`,
            height: `${3 + (i % 3)}px`,
            background: i % 3 === 0 ? 'rgba(17, 17, 17, 0.06)' : i % 3 === 1 ? 'rgba(139, 92, 246, 0.04)' : 'rgba(17, 17, 17, 0.03)',
          } as any} />
        ))}

        <div className="hero-grid grid gap-6 lg:gap-10">
          <div className="relative z-10">
            <Reveal>
              {/* Top badges row */}
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold"
                  style={{ color: 'var(--accent-secondary, #8B5CF6)', background: 'rgba(17,17,17,0.12)', border: '1px solid rgba(17,17,17,0.2)' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                  {t.hero_badge}
                </div>
                <div className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-[11px] font-semibold"
                  style={{ color: '#8B5CF6', background: 'rgba(17,17,17,0.12)', border: '1px solid rgba(17,17,17,0.2)' }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                  {t.hero_privacy}
                </div>
              </div>

              {/* Tagline */}
              <div className="flex items-start gap-4 mb-3">
                <div className="hero-accent-line mt-2 hidden sm:block" />
                <h1 className="font-display text-[32px] sm:text-[44px] lg:text-[54px] leading-[1.1] font-extrabold" style={{ letterSpacing: '-2px' }}>
                  <span className="hero-tagline-bold">{t.hero_title_1}</span><br />
                  <span className="hero-tagline-bold">{t.hero_title_2}</span><br />
                  <span className="text-shimmer hero-tagline-light gradient-text-animated">{t.hero_title_3}</span>
                </h1>
              </div>

              <p className="text-[14px] sm:text-[15px] max-w-xl leading-[1.5] mb-3" style={{ color: '#6B7280' }}>
                {t.hero_sub_pre} <strong className="font-data" style={{ color: 'var(--accent-secondary, #8B5CF6)' }}>{totalDisplay}</strong> {t.hero_sub_post}
              </p>

              {/* AI Input */}
              <div className="mb-3 max-w-lg relative" style={{ zIndex: 20 }}>
                <div className="relative group">
                  <div className="absolute -inset-0.5 rounded-2xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"
                    style={{ background: 'linear-gradient(135deg, rgba(17,17,17,0.2), rgba(13,148,136,0.1), rgba(17,17,17,0.2))', filter: 'blur(8px)' }} />
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-1.5" style={{ pointerEvents: 'none' }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#333333" strokeWidth="2"><path d="M12 2a4 4 0 0 1 4 4c0 2-2 3-2 5h-4c0-2-2-3-2-5a4 4 0 0 1 4-4z"/><path d="M10 17h4"/><path d="M10 20h4"/></svg>
                      <span className="text-[10px] font-bold tracking-[2px] uppercase" style={{ color: '#333333' }}>AI</span>
                    </div>
                    <input type="text" value={naturalInput}
                      onChange={e => setNaturalInput(e.target.value)}
                      onFocus={() => { if (aiSuggestions.length > 0) setShowSuggestions(true); }}
                      onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                      onKeyDown={e => {
                        if (e.key === 'Enter' && naturalInput.trim()) {
                          setShowSuggestions(false);
                          if (aiSuggestions.length > 0) {
                            const top = aiSuggestions[0];
                            setSit(top.sit); setSpec(top.opt); setAmount(top.sit.dm); go(2);
                            toast(lang === 'es' ? `Detectado: ${top.opt.d}` : `Matched: ${top.opt.d}`);
                          } else {
                            if (!detectCaseType(naturalInput)) go(1);
                          }
                        }
                        if (e.key === 'Escape') setShowSuggestions(false);
                      }}
                      placeholder={lang === 'es' ? 'Describe tu situación en pocas palabras...' : 'Describe your situation in a few words...'}
                      aria-label={lang === 'es' ? 'Descripción AI de su situación' : 'AI case description'}
                      className="w-full text-[15px] rounded-2xl transition-all input-frosted focus-ring-premium"
                      style={{
                        color: '#111827',
                        boxShadow: '0 4px 20px rgba(0,0,0,.15)',
                        padding: '18px 56px 18px 58px',
                      }} />
                    <button onClick={() => {
                        if (naturalInput.trim()) {
                          setShowSuggestions(false);
                          if (aiSuggestions.length > 0) {
                            const top = aiSuggestions[0];
                            setSit(top.sit); setSpec(top.opt); setAmount(top.sit.dm); go(2);
                            toast(lang === 'es' ? `Detectado: ${top.opt.d}` : `Matched: ${top.opt.d}`);
                          } else { if (!detectCaseType(naturalInput)) go(1); }
                        }
                      }}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl flex items-center justify-center border-none magnetic-btn ripple-effect"
                      aria-label={lang === 'es' ? 'Buscar' : 'Search'}
                      style={{ background: 'linear-gradient(135deg, #111111, #333333)', boxShadow: '0 2px 10px rgba(17,17,17,.25)' }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                    </button>
                  </div>

                  {/* AI suggestions */}
                  {showSuggestions && aiSuggestions.length > 0 && (
                    <div className="absolute left-0 right-0 top-full mt-2 rounded-2xl overflow-hidden border shadow-2xl"
                      style={{ background: '#FFFFFF', borderColor: 'rgba(17,17,17,0.2)', boxShadow: '0 12px 48px rgba(0,0,0,0.5), 0 0 0 1px rgba(17,17,17,0.1)', zIndex: 50 }}>
                      <div className="flex items-center gap-2 px-4 py-2.5 border-b" style={{ borderColor: 'rgba(17,17,17,0.1)', background: 'rgba(17,17,17,0.05)' }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="2"><path d="M12 2a4 4 0 0 1 4 4c0 2-2 3-2 5h-4c0-2-2-3-2-5a4 4 0 0 1 4-4z"/><path d="M10 17h4"/></svg>
                        <span className="text-[10px] font-bold tracking-[2px] uppercase" style={{ color: 'var(--accent-secondary, #8B5CF6)' }}>
                          {lang === 'es' ? 'COINCIDENCIAS INTELIGENTES' : 'SMART MATCHES'}
                        </span>
                        <span className="text-[10px] ml-auto" style={{ color: 'var(--fg-muted)' }}>
                          {lang === 'es' ? 'Presiona Enter para seleccionar' : 'Press Enter to select top match'}
                        </span>
                      </div>
                      {aiSuggestions.map((s, i) => (
                        <button key={i}
                          onMouseDown={(e) => { e.preventDefault(); setSit(s.sit); setSpec(s.opt); setAmount(s.sit.dm); go(2); setShowSuggestions(false); toast(lang === 'es' ? `Seleccionado: ${s.opt.d}` : `Selected: ${s.opt.d}`); }}
                          className="w-full flex items-center gap-3 px-4 py-3 text-left transition-all border-none bg-transparent"
                          style={{ borderBottom: i < aiSuggestions.length - 1 ? '1px solid rgba(229,231,235,0.5)' : 'none' }}
                          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(17,17,17,0.08)'; }}
                          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}>
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${s.sit.color}20`, border: `1px solid ${s.sit.color}30` }}>
                            <CategoryIcon name={s.sit.icon} size={14} color={s.sit.color} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-[13px] font-semibold truncate" style={{ color: '#D1D5DB' }}>{s.opt.label}</div>
                            <div className="text-[11px] truncate" style={{ color: 'var(--fg-muted)' }}>{s.sit.label} · {s.opt.d}</div>
                          </div>
                          {i === 0 && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0" style={{ background: 'rgba(17,17,17,0.15)', color: 'var(--accent-secondary, #8B5CF6)' }}>
                              {lang === 'es' ? 'Mejor' : 'Best match'}
                            </span>
                          )}
                          <span className="text-[11px] font-data flex-shrink-0" style={{ color: 'var(--fg-muted)' }}>{Math.min(Math.round(s.score * 8), 99)}%</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <div className="text-[11px] mt-2 px-1 flex items-center gap-1.5" style={{ color: '#9BA8BE' }}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#9BA8BE" strokeWidth="2"><path d="M12 2a4 4 0 0 1 4 4c0 2-2 3-2 5h-4c0-2-2-3-2-5a4 4 0 0 1 4-4z"/><path d="M10 17h4"/></svg>
                  {lang === 'es' ? 'AI detecta automáticamente tu tipo de caso mientras escribes' : 'AI automatically detects your case type as you type'}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button onClick={() => go(1)}
                  className="cta-glow cta-pulse btn-primary magnetic-btn ripple-effect px-8 sm:px-8 py-3.5 sm:py-4.5 text-[15px] sm:text-[16px] font-semibold text-white border-none rounded-full cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-transform w-full sm:w-auto"
                  style={{ background: 'linear-gradient(135deg, #111111, #333333)', boxShadow: '0 4px 24px rgba(17,17,17,.3)' }}>
                  {t.hero_cta}
                </button>
                <button onClick={demo}
                  className="magnetic-btn px-8 py-3.5 sm:py-4.5 text-[15px] font-medium rounded-full cursor-pointer transition-all"
                  style={{
                    background: 'rgba(255,255,255,0.06)',
                    border: '1.5px solid rgba(255,255,255,0.15)',
                    color: '#C8D3E5',
                  }}>
                  {t.hero_demo}
                </button>
              </div>

              {/* Social proof */}
              <div className="flex items-center gap-3 mt-6">
                <div className="flex -space-x-2">
                  {['#111111', '#0D9488', '#1A2744', '#333333', '#0D9488'].map((c, i) => (
                    <div key={i} className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold text-white shadow-[0_2px_8px_rgba(0,0,0,0.3)]"
                      style={{ background: c, zIndex: 5 - i, border: '2px solid #131D35' }}>
                      {['J', 'M', 'K', 'S', 'A'][i]}
                    </div>
                  ))}
                </div>
                <div className="text-[12px]" style={{ color: '#6B7280' }}>
                  <strong className="font-data" style={{ color: 'var(--accent-secondary, #8B5CF6)' }}>{liveCounter}+</strong> {lang === 'es' ? 'informes hoy' : 'reports today'}
                  <span className="live-beacon ml-1.5" style={{ display: 'inline-block', verticalAlign: 'middle' }} />
                </div>
              </div>

              {/* Trust signals */}
              <div className="mt-10 pt-8" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                {/* Hero stats */}
                <div className="flex gap-4 sm:gap-6 mb-8 flex-wrap data-grid-stagger">
                  <div className="stat-glow" style={{ '--stat-color': '#FFFFFF' } as any}>
                    <div className="text-3xl sm:text-4xl font-display font-extrabold counter-animate" style={{ letterSpacing: '-1.5px', color: '#FFFFFF', textShadow: '0 2px 12px rgba(255,255,255,0.1)' }}>
                      {heroCounterDone ? <><AnimatedNumber value={5.1} decimals={1} />M+</> : <span className="inline-block w-12 h-8 rounded skeleton-premium" />}
                    </div>
                    <div className="text-[11px] mt-1.5 font-semibold" style={{ color: '#6B7280' }}>{lang === 'es' ? 'Casos federales' : 'Federal cases'}</div>
                  </div>
                  <div className="w-px self-stretch" style={{ background: 'linear-gradient(180deg, transparent, #0D9488, transparent)', opacity: 0.4 }} />
                  <div className="stat-glow" style={{ '--stat-color': '#0D9488' } as any}>
                    <div className="text-3xl sm:text-4xl font-display font-extrabold counter-animate" style={{ letterSpacing: '-1.5px', color: 'var(--accent-secondary)', textShadow: '0 2px 12px rgba(13,148,136,0.3)' }}>
                      {heroCounterDone ? '94' : <span className="inline-block w-12 h-8 rounded skeleton-premium" />}
                    </div>
                    <div className="text-[11px] mt-1.5 font-semibold" style={{ color: '#6B7280' }}>{lang === 'es' ? 'Distritos federales' : 'Federal districts'}</div>
                  </div>
                  <div className="w-px self-stretch" style={{ background: 'linear-gradient(180deg, transparent, #333333, transparent)', opacity: 0.4 }} />
                  <div className="stat-glow" style={{ '--stat-color': '#8B5CF6' } as any}>
                    <div className="text-3xl sm:text-4xl font-display font-extrabold counter-animate" style={{ letterSpacing: '-1.5px', color: 'var(--accent-secondary, #8B5CF6)', textShadow: '0 2px 12px rgba(165,180,252,0.3)' }}>
                      {heroCounterDone ? '50+' : <span className="inline-block w-12 h-8 rounded skeleton-premium" />}
                    </div>
                    <div className="text-[11px] mt-1.5 font-semibold" style={{ color: '#6B7280' }}>{lang === 'es' ? 'Años de datos' : 'Years of data'}</div>
                  </div>
                  <div className="w-px self-stretch" style={{ background: 'linear-gradient(180deg, transparent, #333333, transparent)', opacity: 0.4 }} />
                  <div className="stat-glow" style={{ '--stat-color': '#5EEAD4' } as any}>
                    <div className="text-3xl sm:text-4xl font-display font-extrabold counter-animate" style={{ letterSpacing: '-1.5px', color: '#5EEAD4', textShadow: '0 2px 12px rgba(94,234,212,0.3)' }}>
                      {heroCounterDone ? '84' : <span className="inline-block w-12 h-8 rounded skeleton-premium" />}
                    </div>
                    <div className="text-[11px] mt-1.5 font-semibold" style={{ color: '#6B7280' }}>{lang === 'es' ? 'Tipos de caso' : 'Case types'}</div>
                  </div>
                </div>

                {/* Data sources */}
                <div>
                  <div className="text-[10px] font-bold mb-3 tracking-[2px] uppercase" style={{ color: '#9BA8BE' }}>{lang === 'es' ? 'Fuente de datos' : 'Data sourced from'}</div>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { name: 'Federal Judicial Center', icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="2"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" /></svg> },
                      { name: 'CourtListener', icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#5EEAD4" strokeWidth="2"><path d="M9 11L12 14L22 4" /></svg> },
                      { name: 'PACER', icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="2"><circle cx="12" cy="12" r="9" /><polyline points="9 11 12 14 15 10" /></svg> },
                    ].map((s, i) => (
                      <div key={i} className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-[12px] font-semibold transition-all hover:scale-[1.02] spotlight-card stat-underline" style={{
                        color: '#C8D3E5',
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.08)',
                      }}>
                        {s.icon}
                        {s.name}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Category selector section */}
        <div style={{ marginTop: '2rem' }}>
          <Reveal delay={200}>
            <div className="relative">
              <div className="absolute -top-10 -right-6 opacity-[0.04] pointer-events-none z-0" aria-hidden="true">
                <svg width="140" height="140" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
                  <line x1="50" y1="10" x2="50" y2="85" />
                  <line x1="20" y1="25" x2="80" y2="25" />
                  <path d="M20 25 L10 55 L30 55 Z" />
                  <path d="M80 25 L70 55 L90 55 Z" />
                  <ellipse cx="50" cy="90" rx="15" ry="4" />
                  <rect x="45" y="85" width="10" height="5" />
                </svg>
              </div>
              <Card glow className="relative overflow-hidden" style={{ padding: '32px' }}>
                <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl" style={{ background: 'linear-gradient(90deg, #111111, #333333, #0D9488)' }} />
                <SectionLabel>{t.select_situation}</SectionLabel>
                <div className="grid grid-cols-2 gap-3 stagger-in">
                  {SITS.map(si => (
                    <button key={si.id} onClick={() => { setSit(si); setAmount(si.dm); go(2); }}
                      className="category-card p-5 card-bg rounded-xl cursor-pointer text-left group border-[1.5px] transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 tilt-hover"
                      style={{
                        background: `linear-gradient(180deg, ${si.color}20 0%, ${si.color}10 100%)`,
                        borderColor: si.color + '40',
                        borderLeft: `3px solid ${si.color}`,
                        boxShadow: `0 4px 20px ${si.color}20, inset 0 1px 0 rgba(255,255,255,0.03)`,
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.borderColor = si.color + '60';
                        e.currentTarget.style.boxShadow = `0 8px 30px ${si.color}30, inset 0 1px 0 rgba(255,255,255,0.03)`;
                        e.currentTarget.style.background = `linear-gradient(180deg, ${si.color}30 0%, ${si.color}15 100%)`;
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.borderColor = si.color + '40';
                        e.currentTarget.style.boxShadow = `0 4px 20px ${si.color}20, inset 0 1px 0 rgba(255,255,255,0.03)`;
                        e.currentTarget.style.background = `linear-gradient(180deg, ${si.color}20 0%, ${si.color}10 100%)`;
                      }}>
                      <div className="flex items-start gap-3.5">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-all group-hover:scale-[1.15] group-hover:rotate-3" style={{ background: `${si.color}30`, boxShadow: `0 4px 12px ${si.color}25` }}>
                          <CategoryIcon name={si.icon} color={si.color} size={22} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-extrabold text-[15px] truncate group-hover:text-[16px] transition-all" style={{ color: si.color, textShadow: `0 1px 3px ${si.color}10` }}>{si.label}</div>
                          <div className="text-[11px] text-[var(--fg-muted)] mt-0.5 line-clamp-1 font-medium">{si.sub}</div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
                {/* Search */}
                <div className="mt-5 pt-4" style={{ borderTop: '1px solid var(--border-default)' }}>
                  <div className="text-[11px] font-bold tracking-[2px] uppercase mb-3" style={{ color: 'var(--fg-muted)' }}>{lang === 'es' ? 'O BUSCA TU TIPO DE CASO' : 'OR SEARCH YOUR CASE TYPE'}</div>
                  <EnhancedSearch sits={SITS} lang={lang} onSelect={(opt: any) => {
                    const parentSit = SITS.find(s => s.opts.some((o: any) => o.nos === opt.nos && o.label === opt.label));
                    if (parentSit) { setSit(parentSit); setSpec(opt); setAmount(parentSit.dm); go(3); }
                  }} />
                </div>
                <div className="flex items-center justify-center mt-4 text-[11px] gap-1.5" style={{ color: 'var(--fg-muted)' }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="scroll-indicator"><path d="M12 5v14M19 12l-7 7-7-7" /></svg>
                  {lang === 'es' ? 'O desplázate para explorar datos' : 'Or scroll to explore data'}
                </div>
              </Card>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Lazy-loaded sections below fold */}
      <LazySection minHeight={120}>
        <VerdictTicker lang={lang} />
      </LazySection>

      <LazySection minHeight={300}>
        <Reveal delay={175}>
          <TheProblem lang={lang} />
        </Reveal>
      </LazySection>

      <LazySection minHeight={200}>
        <Reveal delay={180}>
          <TrustBar lang={lang} />
        </Reveal>
        <Reveal delay={190}>
          <SocialProofBar totalCases={5100000} lang={lang} />
        </Reveal>
        <Reveal delay={195}>
          <DataFreshness compact lang={lang} totalCases={5100000} />
        </Reveal>
        <Reveal delay={210}>
          <HeroStats lang={lang} />
        </Reveal>
      </LazySection>

      <LazySection minHeight={200}>
        <Reveal delay={220}>
          <TrustSourceBar lang={lang} />
        </Reveal>
      </LazySection>

      <LazySection minHeight={400}>
        <Reveal delay={230}>
          <SettlementEvaluator lang={lang} />
        </Reveal>
      </LazySection>

      <LazySection minHeight={300}>
        <Reveal delay={240}>
          <CompetitorTable lang={lang} />
        </Reveal>
      </LazySection>
    </>
  );
}
