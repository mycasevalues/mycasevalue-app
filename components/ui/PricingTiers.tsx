'use client';

import { useState } from 'react';
import { Check } from 'lucide-react';

interface PricingTiersProps {
  lang?: string;
  onSelectPlan: (plan: string) => void;
}

const translations = {
  en: {
    free: 'Free',
    singleReport: 'Single Report',
    unlimited: 'Unlimited',
    basicInsights: 'Basic Insights',
    fullAnalysis: 'Full Analysis',
    professional: 'Professional',
    currentPlan: 'Current Plan',
    getReport: 'Get Report',
    goUnlimited: 'Go Unlimited',
    mostPopular: 'MOST POPULAR',
    monthly: 'Monthly',
    annual: 'Annual',
    save30: 'Save 30%',
    moneyBack: '30-Day Money-Back Guarantee',
    features: {
      winRate: 'Win rate data',
      settlementRate: 'Settlement rate',
      caseVolume: 'Case volume',
      medianTimeline: 'Median timeline',
      judgeAnalytics: 'Judge analytics',
      stateComparisons: 'State comparisons',
      fullOutcome: 'Full outcome breakdown',
      pdfExport: 'PDF export',
      attorneyImpact: 'Attorney impact analysis',
      unlimitedReports: 'Unlimited reports',
      priorityUpdates: 'Priority data updates',
      caseComparison: 'Case comparison tool',
      whatIfSimulator: 'What-If simulator',
      savedReports: 'Saved reports dashboard',
      whiteLabelExport: 'White-label export',
    },
  },
  es: {
    free: 'Gratis',
    singleReport: 'Informe Único',
    unlimited: 'Ilimitado',
    basicInsights: 'Análisis Básico',
    fullAnalysis: 'Análisis Completo',
    professional: 'Profesional',
    currentPlan: 'Plan Actual',
    getReport: 'Obtener Informe',
    goUnlimited: 'Ir a Ilimitado',
    mostPopular: 'MÁS POPULAR',
    monthly: 'Mensual',
    annual: 'Anual',
    save30: 'Ahorrar 30%',
    moneyBack: 'Garantía de Reembolso de 30 Días',
    features: {
      winRate: 'Datos de tasa de victoria',
      settlementRate: 'Tasa de acuerdo',
      caseVolume: 'Volumen de casos',
      medianTimeline: 'Cronograma mediano',
      judgeAnalytics: 'Análisis de jueces',
      stateComparisons: 'Comparaciones estatales',
      fullOutcome: 'Desglose completo de resultados',
      pdfExport: 'Exportación a PDF',
      attorneyImpact: 'Análisis de impacto del abogado',
      unlimitedReports: 'Informes ilimitados',
      priorityUpdates: 'Actualizaciones de datos prioritarias',
      caseComparison: 'Herramienta de comparación de casos',
      whatIfSimulator: 'Simulador de "Qué pasaría si"',
      savedReports: 'Panel de informes guardados',
      whiteLabelExport: 'Exportación de marca blanca',
    },
  },
};

const tiers = [
  {
    id: 'free',
    price: 0,
    billing: '',
    subtitle: 'basicInsights',
    features: ['winRate', 'settlementRate', 'caseVolume', 'medianTimeline'],
    button: 'currentPlan',
    popular: false,
  },
  {
    id: 'single',
    price: 5.99,
    billing: '',
    subtitle: 'fullAnalysis',
    features: [
      'winRate',
      'settlementRate',
      'caseVolume',
      'medianTimeline',
      'judgeAnalytics',
      'stateComparisons',
      'fullOutcome',
      'pdfExport',
      'attorneyImpact',
    ],
    button: 'getReport',
    popular: true,
  },
  {
    id: 'unlimited',
    price: 29.99,
    billing: 'monthly',
    annualPrice: 249.99,
    subtitle: 'professional',
    features: [
      'winRate',
      'settlementRate',
      'caseVolume',
      'medianTimeline',
      'judgeAnalytics',
      'stateComparisons',
      'fullOutcome',
      'pdfExport',
      'attorneyImpact',
      'unlimitedReports',
      'priorityUpdates',
      'caseComparison',
      'whatIfSimulator',
      'savedReports',
      'whiteLabelExport',
    ],
    button: 'goUnlimited',
    popular: false,
  },
];

export default function PricingTiers({ lang = 'en', onSelectPlan }: PricingTiersProps) {
  const [isAnnual, setIsAnnual] = useState(false);
  const t = translations[lang as keyof typeof translations] || translations.en;

  const getTierName = (id: string) => {
    switch (id) {
      case 'free':
        return t.free;
      case 'single':
        return t.singleReport;
      case 'unlimited':
        return t.unlimited;
      default:
        return id;
    }
  };

  const getPrice = (tier: (typeof tiers)[0]) => {
    if (tier.id === 'single') return '$5.99';
    if (tier.id === 'unlimited' && isAnnual) {
      return `$${tier.annualPrice}`;
    }
    if (tier.id === 'unlimited') {
      return `$${tier.price}/mo`;
    }
    return '$0';
  };

  return (
    <div className="w-full py-16" style={{ backgroundColor: '#0B1221' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4" style={{ color: '#E2E8F0' }}>
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg mb-8" style={{ color: '#B0BDD0' }}>
            Choose the plan that works for you
          </p>

          {/* Annual Toggle */}
          <div className="flex items-center justify-center gap-4">
            <span
              style={{
                color: !isAnnual ? '#E2E8F0' : '#B0BDD0',
              }}
            >
              {t.monthly}
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className="relative inline-flex h-8 w-14 items-center rounded-full transition-colors"
              style={{
                backgroundColor: isAnnual ? '#4F46E5' : '#1E293B',
              }}
            >
              <span
                className="inline-block h-6 w-6 transform rounded-full bg-white transition-transform"
                style={{
                  transform: isAnnual ? 'translateX(1.5rem)' : 'translateX(0.25rem)',
                }}
              />
            </button>
            <span
              style={{
                color: isAnnual ? '#E2E8F0' : '#B0BDD0',
              }}
            >
              {t.annual}
            </span>
            {isAnnual && (
              <span
                className="ml-2 px-3 py-1 rounded-full text-sm font-semibold"
                style={{
                  backgroundColor: '#D97706',
                  color: '#ffffff',
                }}
              >
                {t.save30}
              </span>
            )}
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className="relative rounded-lg overflow-hidden transition-transform duration-300"
              style={{
                transform: tier.popular ? 'scale(1.05)' : 'scale(1)',
              }}
            >
              {/* Gradient Border for Popular */}
              {tier.popular && (
                <div
                  className="absolute inset-0 rounded-lg p-[2px]"
                  style={{
                    background: 'linear-gradient(135deg, #4F46E5 0%, #0D9488 100%)',
                  }}
                >
                  <div
                    className="absolute inset-[2px] rounded-lg"
                    style={{ backgroundColor: '#131B2E' }}
                  />
                </div>
              )}

              {/* Card Content */}
              <div
                className="relative h-full p-8 flex flex-col"
                style={{
                  backgroundColor: '#131B2E',
                  border: `1px solid ${tier.popular ? 'transparent' : '#1E293B'}`,
                }}
              >
                {/* Popular Badge */}
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span
                      className="px-4 py-1 rounded-full text-xs font-bold"
                      style={{
                        backgroundColor: '#4F46E5',
                        color: '#ffffff',
                      }}
                    >
                      {t.mostPopular}
                    </span>
                  </div>
                )}

                {/* Tier Name */}
                <h3
                  className="text-2xl font-bold mb-2"
                  style={{ color: '#E2E8F0' }}
                >
                  {getTierName(tier.id)}
                </h3>

                {/* Subtitle */}
                <p
                  className="text-sm mb-6"
                  style={{ color: '#B0BDD0' }}
                >
                  {String(t[tier.subtitle as keyof typeof t] || '')}
                </p>

                {/* Price */}
                <div className="mb-8">
                  <span
                    className="text-4xl font-bold"
                    style={{ color: '#E2E8F0' }}
                  >
                    {getPrice(tier)}
                  </span>
                  {tier.id === 'unlimited' && (
                    <span
                      className="text-sm ml-2"
                      style={{ color: '#B0BDD0' }}
                    >
                      {isAnnual ? '/year' : '/month'}
                    </span>
                  )}
                </div>

                {/* Button */}
                <button
                  onClick={() => {
                    if (tier.id !== 'free') {
                      onSelectPlan(tier.id);
                    }
                  }}
                  disabled={tier.id === 'free'}
                  className="w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 mb-8"
                  style={{
                    backgroundColor:
                      tier.id === 'free'
                        ? '#1E293B'
                        : tier.popular
                          ? '#4F46E5'
                          : '#0D9488',
                    color: '#ffffff',
                    opacity: tier.id === 'free' ? 0.6 : 1,
                    cursor: tier.id === 'free' ? 'not-allowed' : 'pointer',
                  }}
                >
                  {String(t[tier.button as keyof typeof t] || '')}
                </button>

                {/* Features */}
                <div className="space-y-4 flex-grow">
                  {tier.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-3">
                      <Check
                        size={20}
                        style={{ color: '#0D9488', flexShrink: 0, marginTop: '2px' }}
                      />
                      <span style={{ color: '#E2E8F0' }}>
                        {t.features[feature as keyof typeof t.features]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Money-Back Guarantee */}
        <div
          className="text-center py-6 px-6 rounded-lg"
          style={{
            backgroundColor: '#131B2E',
            border: '1px solid #1E293B',
          }}
        >
          <p
            className="text-sm font-semibold"
            style={{ color: '#E2E8F0' }}
          >
            ✓ {t.moneyBack}
          </p>
        </div>
      </div>
    </div>
  );
}
