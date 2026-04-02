'use client';

import React from 'react';

interface AttorneyReferralProps {
  lang?: string;
  caseName?: string;
  winRate?: number;
}

const translations = {
  en: {
    inlineMessage: 'Based on your data, 77% more cases succeed with attorney representation',
    findAttorney: 'Find an Attorney',
    headline: 'Ready to Take the Next Step?',
    subtext: 'Connect with attorneys who handle {caseName} cases',
    consultation: 'Free initial consultation',
    noObligation: 'No obligation',
    areaAttorneys: 'Attorneys in your area',
    findAttorneyNear: 'Find an Attorney Near You',
    highWinRate: 'Your data shows strong potential—an attorney can help maximize your outcome.',
    lowWinRate: 'An experienced attorney can significantly improve your chances.',
    verified: 'Verified attorneys',
    rating: 'Average 4.8★ rating',
    disclaimer: 'MyCaseValue does not endorse any specific attorney. This is an informational referral.',
  },
  es: {
    inlineMessage: 'Según tus datos, 77% más casos tienen éxito con representación legal',
    findAttorney: 'Encontrar un Abogado',
    headline: '¿Listo para dar el siguiente paso?',
    subtext: 'Conecta con abogados que manejan casos de {caseName}',
    consultation: 'Consulta inicial gratuita',
    noObligation: 'Sin obligación',
    areaAttorneys: 'Abogados en tu área',
    findAttorneyNear: 'Encontrar un Abogado Cerca de Ti',
    highWinRate: 'Tus datos muestran potencial fuerte—un abogado puede ayudarte a maximizar tu resultado.',
    lowWinRate: 'Un abogado experimentado puede mejorar significativamente tus posibilidades.',
    verified: 'Abogados verificados',
    rating: 'Calificación promedio de 4.8★',
    disclaimer: 'MyCaseValue no respalda ningún abogado específico. Esta es una referencia informativa.',
  },
};

export function AttorneyReferralInline({
  lang = 'en',
  caseName,
  winRate,
}: AttorneyReferralProps) {
  const t = translations[lang as keyof typeof translations] || translations.en;

  return (
    <div
      className="w-full px-6 py-5 rounded-lg flex items-center justify-between"
      style={{ backgroundColor: '#131B2E', borderColor: '#1E293B', borderWidth: '1px' }}
    >
      <p style={{ color: '#E2E8F0' }} className="text-sm font-medium">
        {t.inlineMessage}
      </p>
      <button
        style={{
          backgroundColor: '#4F46E5',
          color: '#E2E8F0',
        }}
        className="px-4 py-2 rounded font-medium text-sm hover:opacity-90 transition-opacity whitespace-nowrap ml-4"
      >
        {t.findAttorney}
      </button>
    </div>
  );
}

export default function AttorneyReferral({
  lang = 'en',
  caseName = 'your',
  winRate = 50,
}: AttorneyReferralProps) {
  const t = translations[lang as keyof typeof translations] || translations.en;
  const message = winRate && winRate > 50 ? t.highWinRate : t.lowWinRate;
  const caseNameText = caseName && caseName !== 'your' ? caseName : 'your';

  return (
    <div
      className="w-full rounded-lg p-8 relative overflow-hidden"
      style={{
        backgroundColor: '#131B2E',
        borderWidth: '1px',
        borderColor: '#1E293B',
      }}
    >
      {/* Gradient border accent */}
      <div
        className="absolute inset-0 rounded-lg pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, #0D9488 0%, #4F46E5 100%)',
          padding: '1px',
          WebkitMask:
            'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        }}
      />

      <div className="relative z-10">
        <h3
          className="text-2xl font-bold mb-2"
          style={{ color: '#E2E8F0' }}
        >
          {t.headline}
        </h3>
        <p
          className="text-base mb-6"
          style={{ color: '#B0BDD0' }}
        >
          {t.subtext.replace('{caseName}', caseNameText)}
        </p>

        {/* Dynamic message */}
        <p
          className="text-sm mb-6 font-medium"
          style={{ color: '#0D9488' }}
        >
          {message}
        </p>

        {/* Benefits */}
        <ul className="space-y-3 mb-8">
          {[t.consultation, t.noObligation, t.areaAttorneys].map((item) => (
            <li key={item} className="flex items-start">
              <span
                className="mr-3 font-bold text-lg"
                style={{ color: '#D97706' }}
              >
                
              </span>
              <span style={{ color: '#E2E8F0' }} className="text-sm">
                {item}
              </span>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <a
          href="#attorney-network"
          className="inline-block px-6 py-3 rounded font-semibold text-base transition-opacity hover:opacity-90"
          style={{
            backgroundColor: '#4F46E5',
            color: '#E2E8F0',
          }}
        >
          {t.findAttorneyNear}
        </a>

        {/* Trust badges */}
        <div className="mt-6 flex gap-6">
          {[t.verified, t.rating].map((badge) => (
            <div key={badge} className="flex items-center gap-2">
              <span
                className="text-lg"
                style={{ color: '#0D9488' }}
              >
                ★
              </span>
              <span className="text-xs font-medium" style={{ color: '#B0BDD0' }}>
                {badge}
              </span>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <p
          className="text-xs mt-6 leading-relaxed"
          style={{ color: '#8B95A5' }}
        >
          {t.disclaimer}
        </p>
      </div>
    </div>
  );
}
