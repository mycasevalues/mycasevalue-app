'use client';

import React, { useState, useEffect } from 'react';

interface UpgradeTableProps {
  onBuy: (plan: string) => void;
  lang?: 'en' | 'es';
  currentTier?: string;
}

const features_en = [
  { name: 'Basic case type overview', free: true, single: true, unlimited: true },
  { name: 'Win rate data', free: true, single: true, unlimited: true },
  { name: 'State-specific analysis', free: false, single: true, unlimited: true },
  { name: 'Historical trend charts', free: false, single: true, unlimited: true },
  { name: 'Settlement distribution data', free: false, single: true, unlimited: true },
  { name: 'Case strength radar', free: false, single: true, unlimited: true },
  { name: 'Attorney vs Pro Se comparison', free: false, single: true, unlimited: true },
  { name: 'Jurisdiction intelligence', free: false, single: true, unlimited: true },
  { name: 'Probability matrix', free: false, single: false, unlimited: true },
  { name: 'Case comparison tool', free: false, single: false, unlimited: true },
  { name: 'Unlimited reports', free: false, single: false, unlimited: true },
  { name: 'Priority support', free: false, single: false, unlimited: true },
];

const features_es = [
  { name: 'Resumen básico del caso', free: true, single: true, unlimited: true },
  { name: 'Datos de tasa de éxito', free: true, single: true, unlimited: true },
  { name: 'Análisis por estado', free: false, single: true, unlimited: true },
  { name: 'Gráficos de tendencias', free: false, single: true, unlimited: true },
  { name: 'Distribución de acuerdos', free: false, single: true, unlimited: true },
  { name: 'Radar de fortaleza del caso', free: false, single: true, unlimited: true },
  { name: 'Comparación abogado vs Pro Se', free: false, single: true, unlimited: true },
  { name: 'Inteligencia jurisdiccional', free: false, single: true, unlimited: true },
  { name: 'Matriz de probabilidad', free: false, single: false, unlimited: true },
  { name: 'Herramienta de comparación', free: false, single: false, unlimited: true },
  { name: 'Reportes ilimitados', free: false, single: false, unlimited: true },
  { name: 'Soporte prioritario', free: false, single: false, unlimited: true },
];

const labels = {
  en: {
    free: 'Free',
    single: 'Single Report',
    unlimited: 'Unlimited Reports',
    price_single: '$5.99',
    original_single: '$14.99',
    price_unlimited: '$9.99',
    original_unlimited: '$19.99',
    current: 'Current Plan',
    get_report: 'Get Report',
    go_unlimited: 'Go Unlimited',
    most_popular: 'Most Popular',
    best_value: 'Best Value',
    features: 'Features',
  },
  es: {
    free: 'Gratis',
    single: 'Reporte Único',
    unlimited: 'Reportes Ilimitados',
    price_single: '$5.99',
    original_single: '$14.99',
    price_unlimited: '$9.99',
    original_unlimited: '$19.99',
    current: 'Plan Actual',
    get_report: 'Obtener Reporte',
    go_unlimited: 'Ir a Ilimitado',
    most_popular: 'Más Popular',
    best_value: 'Mejor Valor',
    features: 'Características',
  },
};

export default function UpgradeTable({
  onBuy,
  lang = 'en',
  currentTier = 'free',
}: UpgradeTableProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('single');

  const currentLabels = labels[lang] || labels['en'];
  const features = lang === 'es' ? features_es : features_en;

  // Auto-detect mobile
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const colors = {
    bg: '#FFFFFF',
    border: '#E5E0D8',
    text: '#111827',
    muted: '#6B7280',
    accent: '#111111',
    teal: '#5EEAD4',
  };

  const CheckIcon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16.5 5L8 13.5L3.5 9" stroke={colors.teal} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  const XIcon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15 5L5 15M5 5L15 15" stroke={colors.muted} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  if (isMobile) {
    return (
      <div style={{
        backgroundColor: colors.bg, color: colors.text,
        padding: '24px 16px', borderRadius: '8px',
        border: `1px solid ${colors.border}`,
      }}>
        <div style={{
          display: 'flex', gap: '8px', marginBottom: '24px',
          justifyContent: 'center', flexWrap: 'wrap',
        }}>
          {['free', 'single', 'unlimited'].map((plan) => (
            <button type="button" key={plan} onClick={() => setSelectedPlan(plan)}
              style={{
                padding: '8px 14px', borderRadius: '6px',
                border: `1px solid ${selectedPlan === plan ? colors.accent : colors.border}`,
                backgroundColor: selectedPlan === plan ? colors.accent : 'transparent',
                color: colors.text, cursor: 'pointer',
                fontSize: '13px', fontWeight: selectedPlan === plan ? 600 : 500,
              }}>
              {plan === 'free' ? currentLabels.free : plan === 'single' ? currentLabels.single : currentLabels.unlimited}
            </button>
          ))}
        </div>

        <div style={{ marginBottom: '24px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px', margin: 0 }}>
            {selectedPlan === 'free' ? currentLabels.free : selectedPlan === 'single' ? currentLabels.single : currentLabels.unlimited}
          </h3>
          {selectedPlan !== 'free' && (
            <div style={{ marginTop: '8px', marginBottom: '12px' }}>
              <p style={{ color: colors.muted, fontSize: '14px', margin: 0 }}>
                <span style={{ textDecoration: 'line-through', marginRight: '8px' }}>
                  {selectedPlan === 'single' ? currentLabels.original_single : currentLabels.original_unlimited}
                </span>
                <span style={{ fontSize: '22px', fontWeight: 700, color: colors.teal }}>
                  {selectedPlan === 'single' ? currentLabels.price_single : currentLabels.price_unlimited}
                </span>
              </p>
            </div>
          )}
        </div>

        <div style={{ marginBottom: '24px' }}>
          {features.map((feature, idx) => {
            const hasFeature = selectedPlan === 'free' ? feature.free
              : selectedPlan === 'single' ? feature.single : feature.unlimited;
            return (
              <div key={idx} style={{
                display: 'flex', alignItems: 'center',
                paddingBottom: '10px', marginBottom: '10px',
                borderBottom: `1px solid ${colors.border}`,
              }}>
                <div style={{ marginRight: '10px', flexShrink: 0 }}>
                  {hasFeature ? <CheckIcon /> : <XIcon />}
                </div>
                <span style={{ color: hasFeature ? colors.text : colors.muted, fontSize: '13px' }}>
                  {feature.name}
                </span>
              </div>
            );
          })}
        </div>

        <button type="button" onClick={() => onBuy(selectedPlan)}
          disabled={selectedPlan === 'free' || currentTier === selectedPlan}
          style={{
            width: '100%', padding: '14px 16px', borderRadius: '8px',
            border: 'none',
            background: selectedPlan === 'free' ? colors.border
              : selectedPlan === 'unlimited'
                ? `linear-gradient(135deg, ${colors.teal} 0%, ${colors.accent} 100%)`
                : colors.accent,
            color: colors.text, fontSize: '15px', fontWeight: 600,
            cursor: selectedPlan === 'free' || currentTier === selectedPlan ? 'not-allowed' : 'pointer',
            opacity: selectedPlan === 'free' || currentTier === selectedPlan ? 0.5 : 1,
          }}>
          {currentTier === selectedPlan ? currentLabels.current
            : selectedPlan === 'single' ? currentLabels.get_report : currentLabels.go_unlimited}
        </button>
      </div>
    );
  }

  return (
    <div style={{
      backgroundColor: colors.bg, color: colors.text,
      padding: '32px 24px', borderRadius: '12px',
      border: `1px solid ${colors.border}`,
      overflowX: 'auto',
    }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '640px' }}>
        <thead>
          <tr style={{ borderBottom: `2px solid ${colors.border}` }}>
            <th scope="col" style={{ padding: '20px 12px', textAlign: 'left', fontWeight: 600, fontSize: '14px', color: colors.muted }}>
              {currentLabels.features}
            </th>
            <th scope="col" style={{ padding: '20px 12px', textAlign: 'center', position: 'relative' }}>
              <div style={{ fontSize: '16px', fontWeight: 700 }}>{currentLabels.free}</div>
              <div style={{ fontSize: '22px', fontWeight: 700, marginTop: '6px', color: colors.teal }}>Free</div>
            </th>
            <th scope="col" style={{
              padding: '20px 12px', textAlign: 'center', position: 'relative',
              backgroundColor: currentTier === 'single' ? colors.border : 'transparent',
              borderRadius: '8px',
            }}>
              <div style={{
                position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)',
                backgroundColor: colors.accent, color: colors.text,
                padding: '4px 12px', borderRadius: '4px',
                fontSize: '11px', fontWeight: 700, whiteSpace: 'nowrap',
              }}>{currentLabels.most_popular}</div>
              <div style={{ fontSize: '16px', fontWeight: 700 }}>{currentLabels.single}</div>
              <div style={{ marginTop: '6px' }}>
                <p style={{ margin: 0, color: colors.muted, fontSize: '13px' }}>
                  <span style={{ textDecoration: 'line-through' }}>{currentLabels.original_single}</span>
                </p>
                <div style={{ fontSize: '22px', fontWeight: 700, color: colors.teal, marginTop: '2px' }}>
                  {currentLabels.price_single}
                </div>
              </div>
            </th>
            <th scope="col" style={{
              padding: '20px 12px', textAlign: 'center', position: 'relative',
              backgroundColor: currentTier === 'unlimited' ? colors.border : 'transparent',
              borderRadius: '8px',
            }}>
              <div style={{
                position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)',
                backgroundColor: colors.teal, color: colors.bg,
                padding: '4px 12px', borderRadius: '4px',
                fontSize: '11px', fontWeight: 700, whiteSpace: 'nowrap',
              }}>{currentLabels.best_value}</div>
              <div style={{ fontSize: '16px', fontWeight: 700 }}>{currentLabels.unlimited}</div>
              <div style={{ marginTop: '6px' }}>
                <p style={{ margin: 0, color: colors.muted, fontSize: '13px' }}>
                  <span style={{ textDecoration: 'line-through' }}>{currentLabels.original_unlimited}</span>
                </p>
                <div style={{ fontSize: '22px', fontWeight: 700, color: colors.teal, marginTop: '2px' }}>
                  {currentLabels.price_unlimited}
                </div>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {features.map((feature, idx) => (
            <tr key={idx} style={{ borderBottom: `1px solid ${colors.border}`, transition: 'background-color 0.2s ease' }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = colors.border; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}>
              <td style={{ padding: '14px 12px', fontSize: '13px', color: colors.text }}>{feature.name}</td>
              <td style={{ padding: '14px 12px', textAlign: 'center' }}>{feature.free ? <CheckIcon /> : <XIcon />}</td>
              <td style={{
                padding: '14px 12px', textAlign: 'center',
                backgroundColor: currentTier === 'single' ? colors.border : 'transparent',
                borderRadius: '8px',
              }}>{feature.single ? <CheckIcon /> : <XIcon />}</td>
              <td style={{
                padding: '14px 12px', textAlign: 'center',
                backgroundColor: currentTier === 'unlimited' ? colors.border : 'transparent',
                borderRadius: '8px',
              }}>{feature.unlimited ? <CheckIcon /> : <XIcon />}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginTop: '32px' }}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button type="button" onClick={() => onBuy('free')} disabled
            style={{
              width: '100%', maxWidth: '180px', padding: '12px 20px', borderRadius: '6px',
              border: `1px solid ${colors.border}`, backgroundColor: 'transparent',
              color: colors.muted, fontSize: '14px', fontWeight: 600,
              cursor: 'not-allowed', opacity: 0.5,
            }}>{currentLabels.current}</button>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button type="button" onClick={() => onBuy('single')} disabled={currentTier === 'single'}
            style={{
              width: '100%', maxWidth: '180px', padding: '12px 20px', borderRadius: '6px',
              border: 'none', backgroundColor: currentTier === 'single' ? colors.border : colors.accent,
              color: colors.text, fontSize: '14px', fontWeight: 600,
              cursor: currentTier === 'single' ? 'not-allowed' : 'pointer',
              opacity: currentTier === 'single' ? 0.7 : 1,
              transition: 'background-color 0.2s ease',
            }}
            onMouseEnter={(e) => { if (currentTier !== 'single') e.currentTarget.style.backgroundColor = '#333333'; }}
            onMouseLeave={(e) => { if (currentTier !== 'single') e.currentTarget.style.backgroundColor = colors.accent; }}>
            {currentTier === 'single' ? currentLabels.current : currentLabels.get_report}
          </button>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button type="button" onClick={() => onBuy('unlimited')} disabled={currentTier === 'unlimited'}
            style={{
              width: '100%', maxWidth: '180px', padding: '12px 20px', borderRadius: '6px',
              border: 'none',
              background: currentTier === 'unlimited' ? colors.border : `linear-gradient(135deg, ${colors.teal} 0%, ${colors.accent} 100%)`,
              color: colors.text, fontSize: '14px', fontWeight: 600,
              cursor: currentTier === 'unlimited' ? 'not-allowed' : 'pointer',
              opacity: currentTier === 'unlimited' ? 0.7 : 1,
              transition: 'opacity 0.2s ease',
            }}
            onMouseEnter={(e) => { if (currentTier !== 'unlimited') e.currentTarget.style.opacity = '0.9'; }}
            onMouseLeave={(e) => { if (currentTier !== 'unlimited') e.currentTarget.style.opacity = '1'; }}>
            {currentTier === 'unlimited' ? currentLabels.current : currentLabels.go_unlimited}
          </button>
        </div>
      </div>
    </div>
  );
}
