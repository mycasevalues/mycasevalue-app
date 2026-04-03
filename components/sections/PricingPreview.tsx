'use client';

import React, { useState } from 'react';

interface PricingPreviewProps {
  lang?: 'en' | 'es';
}

interface PlanFeature {
  text: string;
  textEs: string;
  included: boolean;
}

interface Plan {
  id: string;
  name: string;
  nameEs: string;
  price: string;
  period: string;
  periodEs: string;
  description: string;
  descriptionEs: string;
  features: PlanFeature[];
  highlight: boolean;
  badge?: string;
  badgeEs?: string;
  cta: string;
  ctaEs: string;
}

const PLANS: Plan[] = [
  {
    id: 'free',
    name: 'Free Report',
    nameEs: 'Informe Gratuito',
    price: '$0',
    period: 'per report',
    periodEs: 'por informe',
    description: 'Essential case intelligence from public federal data',
    descriptionEs: 'Inteligencia esencial de casos de datos federales públicos',
    features: [
      { text: 'Win rate by case type', textEs: 'Tasa de victoria por tipo de caso', included: true },
      { text: 'Settlement percentile range (P25–P75)', textEs: 'Rango de percentil de acuerdos (P25–P75)', included: true },
      { text: 'Median timeline estimate', textEs: 'Estimación de cronograma mediano', included: true },
      { text: 'District filing data', textEs: 'Datos de presentación del distrito', included: true },
      { text: 'EEOC enforcement statistics', textEs: 'Estadísticas de aplicación del EEOC', included: true },
      { text: 'Judge analytics', textEs: 'Análisis de jueces', included: false },
      { text: 'Opposing counsel lookup', textEs: 'Búsqueda de abogado oponente', included: false },
      { text: 'Litigation cost calculator', textEs: 'Calculadora de costos de litigio', included: false },
      { text: 'PDF export', textEs: 'Exportación PDF', included: false },
    ],
    highlight: false,
    cta: 'Generate free report',
    ctaEs: 'Generar informe gratuito',
  },
  {
    id: 'single',
    name: 'Single Report',
    nameEs: 'Informe Único',
    price: '$5.99',
    period: 'one-time',
    periodEs: 'pago único',
    description: 'Complete case intelligence with advanced analytics',
    descriptionEs: 'Inteligencia completa de casos con análisis avanzado',
    features: [
      { text: 'Everything in Free', textEs: 'Todo lo incluido en Gratuito', included: true },
      { text: 'Full settlement percentiles (P10–P90)', textEs: 'Percentiles completos de acuerdos (P10–P90)', included: true },
      { text: 'Judge analytics & tendencies', textEs: 'Análisis y tendencias de jueces', included: true },
      { text: 'Opposing counsel track record', textEs: 'Historial del abogado oponente', included: true },
      { text: 'Litigation cost estimator', textEs: 'Estimador de costos de litigio', included: true },
      { text: 'Case risk score', textEs: 'Puntuación de riesgo del caso', included: true },
      { text: 'PDF export', textEs: 'Exportación PDF', included: true },
      { text: 'Email support', textEs: 'Soporte por correo', included: true },
      { text: 'Unlimited reports', textEs: 'Informes ilimitados', included: false },
    ],
    highlight: false,
    badge: null,
    badgeEs: null,
    cta: 'Get this report',
    ctaEs: 'Obtener este informe',
  },
  {
    id: 'unlimited',
    name: 'Unlimited Reports',
    nameEs: 'Informes Ilimitados',
    price: '$9.99',
    period: 'one-time',
    periodEs: 'pago único',
    description: 'Lifetime access to unlimited report generations',
    descriptionEs: 'Acceso de por vida a generación ilimitada de informes',
    features: [
      { text: 'Everything in Single Report', textEs: 'Todo en Informe Único', included: true },
      { text: 'Unlimited report generations', textEs: 'Generaciones ilimitadas de informes', included: true },
      { text: 'Lifetime access', textEs: 'Acceso de por vida', included: true },
      { text: 'Priority support', textEs: 'Soporte prioritario', included: false },
      { text: 'API access', textEs: 'Acceso API', included: false },
    ],
    highlight: true,
    badge: 'MOST POPULAR',
    badgeEs: 'MÁS POPULAR',
    cta: 'Get unlimited',
    ctaEs: 'Obtener ilimitado',
  },
  {
    id: 'attorney',
    name: 'Attorney Mode',
    nameEs: 'Modo Abogado',
    price: '$29.99',
    period: '/month',
    periodEs: '/mes',
    description: 'For attorneys and frequent users who need ongoing access',
    descriptionEs: 'Para abogados y usuarios frecuentes que necesitan acceso continuo',
    features: [
      { text: 'Everything in Single Report', textEs: 'Todo en Informe Único', included: true },
      { text: 'Unlimited reports per month', textEs: 'Informes ilimitados por mes', included: true },
      { text: 'Batch case analysis', textEs: 'Análisis de casos en lote', included: true },
      { text: 'Priority support', textEs: 'Soporte prioritario', included: true },
      { text: 'API access (coming soon)', textEs: 'Acceso API (próximamente)', included: false },
    ],
    highlight: false,
    badge: 'BEST VALUE',
    badgeEs: 'MEJOR VALOR',
    cta: 'Subscribe now',
    ctaEs: 'Suscribirse ahora',
  },
];

export default function PricingPreview({ lang = 'en' }: PricingPreviewProps) {
  const isEs = lang === 'es';

  return (
    <div className="rounded-2xl p-6 sm:p-8" style={{ background: '#FFFFFF', border: '1px solid #E5E0D8' }}>
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold tracking-[2px] uppercase mb-3"
          style={{ background: 'rgba(17,17,17,0.1)', color: '#818CF8' }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#818CF8" strokeWidth="2.5" aria-hidden="true">
            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>
          </svg>
          {isEs ? 'PRECIOS' : 'PRICING'}
        </div>
        <h2 className="text-xl sm:text-2xl font-display font-extrabold mb-2" style={{ color: 'var(--fg-primary)', letterSpacing: '-0.5px' }}>
          {isEs ? 'Precios transparentes, sin sorpresas' : 'Transparent pricing, no surprises'}
        </h2>
        <p className="text-sm max-w-lg mx-auto" style={{ color: 'var(--fg-muted)' }}>
          {isEs
            ? 'Comience gratis. Actualice solo si necesita análisis avanzados.'
            : 'Start free. Upgrade only if you need advanced analytics.'}
        </p>
      </div>

      {/* Plans grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 max-w-5xl mx-auto">
        {PLANS.map(plan => (
          <div
            key={plan.id}
            className="relative rounded-xl p-4 flex flex-col"
            style={{
              background: plan.highlight ? 'rgba(17,17,17,0.03)' : '#FFFFFF',
              border: `1px solid ${plan.highlight ? '#111111' : '#E5E0D8'}`,
              borderRadius: '12px',
            }}
          >
            {/* Badge */}
            {plan.badge && (
              <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full text-[8px] font-bold tracking-[1.5px]"
                style={{
                  background: plan.highlight ? 'linear-gradient(135deg, #8B5CF6, #7C3AED)' : 'rgba(245,158,11,0.15)',
                  color: plan.highlight ? '#fff' : '#F59E0B',
                }}>
                {isEs ? plan.badgeEs : plan.badge}
              </div>
            )}

            {/* Plan name & price */}
            <div className="mb-3 mt-1">
              <h3 className="text-sm font-bold mb-1" style={{ color: '#111827' }}>
                {isEs ? plan.nameEs : plan.name}
              </h3>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-extrabold" style={{ color: plan.highlight ? '#818CF8' : '#374151' }}>
                  {plan.price}
                </span>
                <span className="text-[10px]" style={{ color: '#9CA3AF' }}>
                  {isEs ? plan.periodEs : plan.period}
                </span>
              </div>
              <p className="text-[10px] mt-1" style={{ color: '#9CA3AF' }}>
                {isEs ? plan.descriptionEs : plan.description}
              </p>
            </div>

            {/* Features */}
            <div className="flex-1 space-y-1.5 mb-4">
              {plan.features.map((f, i) => (
                <div key={i} className="flex items-start gap-2">
                  {f.included ? (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="3" className="flex-shrink-0 mt-0.5" aria-hidden="true">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  ) : (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" className="flex-shrink-0 mt-0.5" aria-hidden="true">
                      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                  )}
                  <span className="text-[11px]" style={{ color: f.included ? '#374151' : '#9CA3AF' }}>
                    {isEs ? f.textEs : f.text}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <button type="button"
              className="w-full py-2.5 rounded-lg text-[12px] font-semibold transition-all hover:scale-[1.02]"
              style={{
                background: plan.highlight ? '#8B5CF6' : 'transparent',
                color: plan.highlight ? '#fff' : '#111827',
                border: plan.highlight ? 'none' : '1px solid #E5E0D8',
                borderRadius: '9999px',
                cursor: 'pointer',
              }}
            >
              {isEs ? plan.ctaEs : plan.cta}
            </button>
          </div>
        ))}
      </div>

      {/* Guarantee bar */}
      <div className="text-center mt-6">
        <div className="inline-flex items-center gap-2 text-[11px]" style={{ color: '#9CA3AF' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2" aria-hidden="true">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
          {isEs ? 'Garantía de reembolso del 100% en informes premium' : '100% money-back guarantee on premium reports'}
        </div>
      </div>
    </div>
  );
}
