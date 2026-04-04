'use client';

import React, { useRef, useEffect, useState } from 'react';

interface LitigationCostEstimatorProps {
  lang?: 'en' | 'es';
  caseType: string;
  attorneyFeeRange: string; // e.g., "$250-500/hr"
  durationMonths: number;
  isProSe?: boolean;
}

interface CostBreakdown {
  category: string;
  min: number;
  max: number;
  description: string;
  icon: string;
}

interface ComplexityTier {
  id: 'simple' | 'moderate' | 'complex';
  label: string;
  labelEs: string;
  multiplier: number;
  estimatedHours: number;
  description: string;
  descriptionEs: string;
}

const COMPLEXITY_TIERS: ComplexityTier[] = [
  {
    id: 'simple',
    label: 'Simple',
    labelEs: 'Simple',
    multiplier: 0.8,
    estimatedHours: 40,
    description: 'Straightforward case, limited discovery',
    descriptionEs: 'Caso directo, descubrimiento limitado',
  },
  {
    id: 'moderate',
    label: 'Moderate',
    labelEs: 'Moderado',
    multiplier: 1.0,
    estimatedHours: 80,
    description: 'Standard complexity, typical discovery',
    descriptionEs: 'Complejidad estándar, descubrimiento típico',
  },
  {
    id: 'complex',
    label: 'Complex',
    labelEs: 'Complejo',
    multiplier: 1.5,
    estimatedHours: 150,
    description: 'High complexity, extensive discovery, experts',
    descriptionEs: 'Alta complejidad, descubrimiento extenso, expertos',
  },
];

function getCostBreakdown(
  caseType: string,
  durationMonths: number,
  complexity: ComplexityTier,
  attorneyHourlyMin: number,
  attorneyHourlyMax: number,
  isProSe: boolean,
  lang: 'en' | 'es'
): CostBreakdown[] {
  const isEs = lang === 'es';

  if (isProSe) {
    return [
      {
        category: isEs ? 'Cuota de presentación' : 'Filing Fee',
        min: 402,
        max: 402,
        description: isEs ? 'Corte federal estándar' : 'Federal court standard',
        icon: '📄',
      },
      {
        category: isEs ? 'Servicios de Terceros' : 'Third-Party Services',
        min: 500,
        max: 2000,
        description: isEs ? 'Servicios de entrega, copias, búsqueda de registros' : 'Service of process, copies, records search',
        icon: '',
      },
      {
        category: isEs ? 'Gastos de Viaje' : 'Travel Expenses',
        min: 0,
        max: 1500,
        description: isEs ? 'Viajes al tribunal, deposiciones (opcional)' : 'Court trips, depositions (optional)',
        icon: '🚗',
      },
      {
        category: isEs ? 'Costos Misceláneos' : 'Miscellaneous',
        min: 300,
        max: 800,
        description: isEs ? 'Investigación, impresión, software legal' : 'Research, printing, legal software',
        icon: '',
      },
    ];
  }

  const baseLowAttorney = attorneyHourlyMin * complexity.estimatedHours;
  const baseHighAttorney = attorneyHourlyMax * complexity.estimatedHours;

  return [
    {
      category: isEs ? 'Cuota de presentación' : 'Filing Fee',
      min: 402,
      max: 402,
      description: isEs ? 'Corte federal estándar' : 'Federal court standard',
      icon: '📄',
    },
    {
      category: isEs ? 'Honorarios de abogado' : 'Attorney Fees',
      min: Math.round(baseLowAttorney),
      max: Math.round(baseHighAttorney),
      description: isEs
        ? `${complexity.estimatedHours} horas estimadas × ${attorneyHourlyMin}-${attorneyHourlyMax}/hora`
        : `${complexity.estimatedHours} estimated hours × $${attorneyHourlyMin}-$${attorneyHourlyMax}/hr`,
      icon: '',
    },
    {
      category: isEs ? 'Costos de Descubrimiento' : 'Discovery Costs',
      min: 5000,
      max: Math.round(25000 * complexity.multiplier),
      description: isEs
        ? 'Intercambio de documentos, deposiciones, interrogatorios'
        : 'Document exchanges, depositions, interrogatories',
      icon: '',
    },
    {
      category: isEs ? 'Peritos' : 'Expert Witnesses',
      min: complexity.id === 'simple' ? 0 : 10000,
      max: complexity.id === 'complex' ? 50000 : 30000,
      description: isEs ? 'Testigos expertos técnicos, médicos, etc.' : 'Technical, medical, or other expert witnesses',
      icon: '‍🔬',
    },
    {
      category: isEs ? 'Gastos Misceláneos' : 'Miscellaneous',
      min: 2000,
      max: 5000 * complexity.multiplier,
      description: isEs
        ? 'Investigación, viajes, costos administrativos'
        : 'Research, travel, administrative costs',
      icon: '',
    },
  ];
}

function parseAttorneyRate(rateStr: string): { min: number; max: number } {
  // Parse strings like "$250-500/hr"
  const match = rateStr.match(/\$(\d+)[^0-9]*(\d+)?/);
  if (match && match[2]) {
    return {
      min: parseInt(match[1], 10),
      max: parseInt(match[2], 10),
    };
  }
  if (match && match[1]) {
    const val = parseInt(match[1], 10);
    return { min: val, max: val };
  }
  // Default fallback
  return { min: 250, max: 500 };
}

function getTranslation(key: string, lang: 'en' | 'es'): string {
  const translations: Record<string, Record<string, string>> = {
    'cost-breakdown': { en: 'Cost Breakdown', es: 'Desglose de Costos' },
    'with-attorney': { en: 'With Attorney', es: 'Con Abogado' },
    'pro-se': { en: 'Pro Se (Self-Represented)', es: 'Pro Se (Auto-Representado)' },
    'case-complexity': { en: 'Case Complexity', es: 'Complejidad del Caso' },
    'estimated-total': { en: 'Estimated Total Range', es: 'Rango Total Estimado' },
    'pro-se-warning': {
      en: 'Self-representation may reduce costs but significantly impacts win rates. Pro se litigants win ~10% vs. attorney-represented at ~35%.',
      es: 'La auto-representación puede reducir costos pero afecta significativamente las tasas de victoria. Los litigantes pro se ganan ~10% vs. ~35% con abogado.',
    },
    'contingency-tip': {
      en: 'Many attorneys work on contingency (only paid if you win/settle). Ask your attorney about contingency arrangements.',
      es: 'Muchos abogados trabajan por contingencia (solo se pagan si gana/acuerda). Pregunte a su abogado sobre arreglos de contingencia.',
    },
    'low-estimate': { en: 'Low Estimate', es: 'Estimación Baja' },
    'high-estimate': { en: 'High Estimate', es: 'Estimación Alta' },
    'per-hour': { en: '/hr', es: '/hr' },
  };
  return translations[key]?.[lang] || key;
}

export function LitigationCostEstimator({
  lang = 'en',
  caseType,
  attorneyFeeRange = '$250-500/hr',
  durationMonths,
  isProSe: initialProSe = false,
}: LitigationCostEstimatorProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isProSe, setIsProSe] = useState(initialProSe);
  const [complexity, setComplexity] = useState<'simple' | 'moderate' | 'complex'>('moderate');

  const isEs = lang === 'es';
  const rates = parseAttorneyRate(attorneyFeeRange);
  const complexityTier = COMPLEXITY_TIERS.find((t) => t.id === complexity) || COMPLEXITY_TIERS[1];

  // Intersection observer for visibility
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const costBreakdown = getCostBreakdown(
    caseType,
    durationMonths,
    complexityTier,
    rates.min,
    rates.max,
    isProSe,
    lang
  );

  const totalMin = costBreakdown.reduce((sum, item) => sum + item.min, 0);
  const totalMax = costBreakdown.reduce((sum, item) => sum + item.max, 0);
  const totalAvg = Math.round((totalMin + totalMax) / 2);

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat(lang === 'es' ? 'es-ES' : 'en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div
      ref={ref}
      className="w-full"
      style={{ padding: '24px 0' }}
    >
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <div
          style={{
            fontSize: '11px',
            fontWeight: 700,
            color: '#9CA3AF',
            letterSpacing: '1.5px',
            textTransform: 'uppercase',
            marginBottom: '16px',
          }}
        >
          {getTranslation('cost-breakdown', lang)}
        </div>

        {/* Mode Toggle */}
        <div
          style={{
            display: 'flex',
            gap: '8px',
            marginBottom: '20px',
            padding: '4px',
            background: '#E5E0D8',
            borderRadius: '8px',
            border: '1px solid #E5E0D8',
          }}
        >
          {[false, true].map((proseMode) => (
            <button type="button"
              key={proseMode ? 'pro-se' : 'attorney'}
              onClick={() => setIsProSe(proseMode)}
              style={{
                flex: 1,
                padding: '10px 16px',
                borderRadius: '6px',
                border: 'none',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                background: isProSe === proseMode ? '#111111' : 'transparent',
                color: isProSe === proseMode ? '#111827' : '#9CA3AF',
              }}
            >
              {proseMode ? getTranslation('pro-se', lang) : getTranslation('with-attorney', lang)}
            </button>
          ))}
        </div>

        {/* Complexity selector (hidden if pro-se) */}
        {!isProSe && (
          <div style={{ marginBottom: '20px' }}>
            <div
              style={{
                fontSize: '12px',
                fontWeight: 600,
                color: '#374151',
                marginBottom: '10px',
              }}
            >
              {getTranslation('case-complexity', lang)}
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              {COMPLEXITY_TIERS.map((tier) => (
                <button type="button"
                  key={tier.id}
                  onClick={() => setComplexity(tier.id)}
                  style={{
                    flex: 1,
                    padding: '10px 12px',
                    borderRadius: '6px',
                    border: `2px solid ${complexity === tier.id ? '#111111' : '#E5E0D8'}`,
                    background: complexity === tier.id ? '#11111140' : 'transparent',
                    fontSize: '12px',
                    fontWeight: 600,
                    color: complexity === tier.id ? '#111827' : '#9CA3AF',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                  }}
                >
                  {isEs ? tier.labelEs : tier.label}
                </button>
              ))}
            </div>
            {complexityTier && (
              <div style={{ fontSize: '11px', color: '#9CA3AF', marginTop: '8px' }}>
                {isEs ? complexityTier.descriptionEs : complexityTier.description}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Cost breakdown cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
        {costBreakdown.map((item, i) => (
          <div
            key={i}
            style={{
              padding: '14px 16px',
              background: '#E5E0D8',
              border: '1px solid #E5E0D8',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px',
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(8px)',
              transition: `all 0.5s ease ${i * 80}ms`,
            }}
          >
            <div
              style={{
                fontSize: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '28px',
                flexShrink: 0,
              }}
            >
              {item.icon}
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  fontSize: '12px',
                  fontWeight: 600,
                  color: '#111827',
                  marginBottom: '4px',
                }}
              >
                {item.category}
              </div>
              <div
                style={{
                  fontSize: '11px',
                  color: '#9CA3AF',
                  lineHeight: 1.4,
                  marginBottom: '8px',
                }}
              >
                {item.description}
              </div>

              {/* Cost range bar */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ fontSize: '11px', fontWeight: 600, color: '#374151', minWidth: '80px' }}>
                  {formatCurrency(item.min)} – {formatCurrency(item.max)}
                </div>

                {/* Visual bar */}
                <div
                  style={{
                    flex: 1,
                    height: '4px',
                    background: '#E5E0D8',
                    borderRadius: '2px',
                    overflow: 'hidden',
                    position: 'relative',
                  }}
                >
                  <div
                    style={{
                      height: '100%',
                      background: 'linear-gradient(90deg, #333333, #111111)',
                      borderRadius: '2px',
                      width: isVisible ? '100%' : '0%',
                      transition: `width 1s cubic-bezier(0.16, 1, 0.3, 1) ${i * 100}ms`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Total estimated range card - prominent display */}
      <div
        style={{
          padding: '18px 20px',
          background: 'linear-gradient(135deg, #111111 0%, #333333 100%)',
          border: '2px solid rgba(99, 102, 241, 0.4)',
          borderRadius: '10px',
          marginBottom: '20px',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'scale(1)' : 'scale(0.95)',
          transition: 'all 0.6s ease 0.4s',
        }}
      >
        <div
          style={{
            fontSize: '11px',
            fontWeight: 700,
            color: 'rgba(255,255,255,0.8)',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            marginBottom: '8px',
          }}
        >
          {getTranslation('estimated-total', lang)}
        </div>

        <div
          style={{
            fontSize: '28px',
            fontWeight: 700,
            color: '#111827',
            fontFamily: "'PT Mono', monospace",
            marginBottom: '8px',
          }}
        >
          {formatCurrency(totalMin)} – {formatCurrency(totalMax)}
        </div>

        <div
          style={{
            fontSize: '12px',
            color: 'rgba(255,255,255,0.9)',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
          }}
        >
          <span style={{ fontFamily: "'PT Mono', monospace", fontWeight: 600 }}>
            {lang === 'es' ? 'Promedio: ' : 'Average: '}
            {formatCurrency(totalAvg)}
          </span>
        </div>
      </div>

      {/* Pro Se warning */}
      {isProSe && (
        <div
          style={{
            padding: '12px 16px',
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            borderRadius: '8px',
            marginBottom: '20px',
          }}
        >
          <div
            style={{
              fontSize: '11px',
              color: '#FCA5A5',
              lineHeight: 1.5,
              display: 'flex',
              gap: '10px',
              alignItems: 'flex-start',
            }}
          >
            <span style={{ fontSize: '14px', flexShrink: 0 }}></span>
            <span>{getTranslation('pro-se-warning', lang)}</span>
          </div>
        </div>
      )}

      {/* Contingency fee pro tip */}
      <div
        style={{
          padding: '12px 16px',
          background: 'rgba(13, 148, 136, 0.1)',
          border: '1px solid rgba(13, 148, 136, 0.3)',
          borderRadius: '8px',
        }}
      >
        <div
          style={{
            fontSize: '11px',
            color: '#86EFAC',
            lineHeight: 1.5,
            display: 'flex',
            gap: '10px',
            alignItems: 'flex-start',
          }}
        >
          <span style={{ fontSize: '14px', flexShrink: 0 }}></span>
          <span>{getTranslation('contingency-tip', lang)}</span>
        </div>
      </div>

      {/* Attribution */}
      <div
        style={{
          marginTop: '16px',
          fontSize: '10px',
          color: '#4B5563',
          textAlign: 'center',
        }}
      >
        {lang === 'es'
          ? 'Basado en datos de casos federales y tasas de mercado promedio'
          : 'Based on federal case data and average market rates'}
      </div>
    </div>
  );
}

export default LitigationCostEstimator;
