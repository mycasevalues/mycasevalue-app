'use client';

import { Check } from 'lucide-react';

interface PricingTiersProps {
  lang?: string;
  onSelectPlan: (plan: string) => void;
}

const translations = {
  en: {
    free: 'Free',
    singleReport: 'Single Report',
    unlimited: 'Unlimited Reports',
    attorneyMode: 'Attorney Mode',
    basicInsights: 'Basic case data',
    fullAnalysis: 'Full premium analysis',
    unlimitedAccess: 'Unlimited access',
    proTools: 'Professional tools',
    currentPlan: 'Current Plan',
    getReport: 'Buy Report — $5.99',
    goUnlimited: 'Get Unlimited — $9.99',
    subscribe: 'Subscribe — $29.99/mo',
    mostPopular: 'MOST POPULAR',
    bestValue: 'BEST VALUE',
    features: {
      winRate: 'Win rate data',
      settlementRate: 'Settlement rate',
      caseVolume: 'Case volume',
      medianTimeline: 'Median timeline',
      judgeAnalytics: 'Judge analytics',
      stateComparisons: 'District comparisons',
      fullOutcome: 'Full outcome breakdown',
      pdfExport: 'PDF export',
      attorneyImpact: 'Attorney impact analysis',
      unlimitedReports: 'Unlimited reports',
      priorityUpdates: 'Priority data updates',
      caseComparison: 'Case comparison tool',
      opposingCounsel: 'Opposing counsel lookup',
      savedReports: 'Saved reports library',
      bulkAnalysis: 'Bulk case analysis',
      clientBranding: 'Client report branding',
      apiAccess: 'API access (coming soon)',
      dedicatedSupport: 'Dedicated support',
    },
  },
  es: {
    free: 'Gratis',
    singleReport: 'Informe Único',
    unlimited: 'Informes Ilimitados',
    attorneyMode: 'Modo Abogado',
    basicInsights: 'Datos básicos',
    fullAnalysis: 'Análisis premium completo',
    unlimitedAccess: 'Acceso ilimitado',
    proTools: 'Herramientas profesionales',
    currentPlan: 'Plan Actual',
    getReport: 'Comprar — $5.99',
    goUnlimited: 'Ilimitado — $9.99',
    subscribe: 'Suscribirse — $29.99/mes',
    mostPopular: 'MÁS POPULAR',
    bestValue: 'MEJOR VALOR',
    features: {
      winRate: 'Datos de tasa de victoria',
      settlementRate: 'Tasa de acuerdo',
      caseVolume: 'Volumen de casos',
      medianTimeline: 'Cronograma mediano',
      judgeAnalytics: 'Análisis de jueces',
      stateComparisons: 'Comparaciones de distritos',
      fullOutcome: 'Desglose completo',
      pdfExport: 'Exportación PDF',
      attorneyImpact: 'Análisis de impacto',
      unlimitedReports: 'Informes ilimitados',
      priorityUpdates: 'Actualizaciones prioritarias',
      caseComparison: 'Comparación de casos',
      opposingCounsel: 'Búsqueda de abogado oponente',
      savedReports: 'Informes guardados',
      bulkAnalysis: 'Análisis masivo',
      clientBranding: 'Marca en informes',
      apiAccess: 'Acceso API (próximamente)',
      dedicatedSupport: 'Soporte dedicado',
    },
  },
};

const tiers = [
  {
    id: 'free',
    price: 0,
    period: '',
    nameKey: 'free' as const,
    subtitle: 'basicInsights' as const,
    features: ['winRate', 'settlementRate', 'caseVolume', 'medianTimeline'],
    button: 'currentPlan' as const,
    popular: false,
    badge: null as string | null,
  },
  {
    id: 'single_report',
    price: 5.99,
    period: '',
    nameKey: 'singleReport' as const,
    subtitle: 'fullAnalysis' as const,
    features: ['winRate', 'settlementRate', 'caseVolume', 'medianTimeline', 'judgeAnalytics', 'stateComparisons', 'fullOutcome', 'pdfExport', 'attorneyImpact'],
    button: 'getReport' as const,
    popular: false,
    badge: null as string | null,
  },
  {
    id: 'unlimited',
    price: 9.99,
    period: '',
    nameKey: 'unlimited' as const,
    subtitle: 'unlimitedAccess' as const,
    features: ['winRate', 'settlementRate', 'caseVolume', 'medianTimeline', 'judgeAnalytics', 'stateComparisons', 'fullOutcome', 'pdfExport', 'attorneyImpact', 'unlimitedReports', 'priorityUpdates', 'caseComparison', 'opposingCounsel', 'savedReports'],
    button: 'goUnlimited' as const,
    popular: true,
    badge: 'mostPopular' as const,
  },
  {
    id: 'attorney',
    price: 29.99,
    period: '/mo',
    nameKey: 'attorneyMode' as const,
    subtitle: 'proTools' as const,
    features: ['unlimitedReports', 'judgeAnalytics', 'opposingCounsel', 'bulkAnalysis', 'clientBranding', 'dedicatedSupport', 'apiAccess'],
    button: 'subscribe' as const,
    popular: false,
    badge: null,
  },
];

export default function PricingTiers({ lang = 'en', onSelectPlan }: PricingTiersProps) {
  const t = translations[lang as keyof typeof translations] || translations.en;

  return (
    <div className="w-full py-16" style={{ backgroundColor: '#F9F8F6' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4" style={{ color: '#111827', fontFamily: 'Montserrat, system-ui, sans-serif' }}>
            {lang === 'es' ? 'Precios transparentes' : 'Simple, Transparent Pricing'}
          </h2>
          <p className="text-base" style={{ color: '#6B7280' }}>
            {lang === 'es' ? 'Elige el plan que funcione para ti' : 'Choose the plan that works for you'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className="relative flex flex-col h-full transition-all duration-200"
              style={{
                borderRadius: '12px',
                border: tier.popular ? '2px solid #111111' : '1px solid #E5E0D8',
                background: '#FFFFFF',
                boxShadow: tier.popular ? '0 4px 20px rgba(17,17,17,0.12)' : '0 1px 3px rgba(0,0,0,0.06)',
              }}
            >
              {tier.badge && (
                <div
                  className="absolute -top-3 left-1/2 transform -translate-x-1/2 px-3 py-1 text-[10px] font-bold tracking-wider uppercase"
                  style={{
                    borderRadius: '9999px',
                    background: tier.popular ? '#111111' : '#D97706',
                    color: '#FFFFFF',
                  }}
                >
                  {t[tier.badge as keyof typeof t] as string}
                </div>
              )}

              <div className={`p-6 flex flex-col h-full ${tier.badge ? 'pt-8' : ''}`}>
                <h3 className="text-lg font-semibold mb-1" style={{ color: '#111827', fontFamily: 'Montserrat, system-ui, sans-serif' }}>
                  {t[tier.nameKey] as string}
                </h3>
                <p className="text-xs mb-4" style={{ color: '#6B7280' }}>
                  {t[tier.subtitle] as string}
                </p>

                <div className="mb-6">
                  <span className="text-3xl font-bold" style={{ color: '#111827', fontFamily: 'PT Mono, monospace' }}>
                    ${tier.price}
                  </span>
                  {tier.period && <span className="text-sm ml-1" style={{ color: '#6B7280' }}>{tier.period}</span>}
                </div>

                <button type="button"
                  onClick={() => { if (tier.id !== 'free') onSelectPlan(tier.id); }}
                  disabled={tier.id === 'free'}
                  className="w-full py-3 px-4 font-semibold text-sm transition-all mb-6"
                  style={{
                    borderRadius: '9999px',
                    backgroundColor: tier.id === 'free' ? '#E5E0D8' : tier.popular ? '#111111' : 'transparent',
                    color: tier.id === 'free' ? '#6B7280' : tier.popular ? '#FFFFFF' : '#111827',
                    border: tier.id === 'free' || tier.popular ? 'none' : '1px solid #E5E0D8',
                    opacity: tier.id === 'free' ? 0.7 : 1,
                    cursor: tier.id === 'free' ? 'default' : 'pointer',
                  }}
                >
                  {t[tier.button] as string}
                </button>

                <div className="space-y-3 flex-grow">
                  {tier.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-2.5">
                      <Check size={16} style={{ color: '#16A34A', flexShrink: 0, marginTop: '2px' }} />
                      <span className="text-sm" style={{ color: '#374151' }}>
                        {t.features[feature as keyof typeof t.features]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
