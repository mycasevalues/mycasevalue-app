'use client';

import { Lang } from '../../lib/i18n';

interface TrustBarProps {
  lang: Lang;
}

export default function TrustBar({ lang }: TrustBarProps) {
  const stats = [
    {
      number: '5.1M+',
      label: lang === 'es' ? 'Casos Federales Analizados' : 'Federal Cases Analyzed',
    },
    {
      number: '84',
      label: lang === 'es' ? 'Áreas de Práctica' : 'Practice Areas Covered',
    },
    {
      number: '94%',
      label: lang === 'es' ? 'Precisión del Informe' : 'Report Accuracy Rating',
    },
    {
      number: '60s',
      label: lang === 'es' ? 'Tiempo Promedio' : 'Average Report Time',
    },
  ];

  return (
    <div
      className="w-full py-12 px-4 sm:px-6 lg:px-8"
      style={{ background: '#F9F8F6' }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center">
              {/* Number in PT Mono */}
              <div
                className="text-3xl sm:text-4xl font-bold mb-2"
                style={{
                  fontFamily: '"PT Mono", "Courier New", monospace',
                  color: '#111111',
                  letterSpacing: '-0.5px',
                }}
              >
                {stat.number}
              </div>
              {/* Label in Outfit */}
              <div
                className="text-xs sm:text-sm font-medium"
                style={{
                  fontFamily: '"Montserrat", system-ui, sans-serif',
                  color: '#111827',
                  letterSpacing: '0.5px',
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
