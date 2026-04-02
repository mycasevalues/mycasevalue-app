'use client';

import { Lang } from '../../lib/i18n';

interface FinalCtaSectionProps {
  lang: Lang;
  onGetStarted?: () => void;
}

export default function FinalCtaSection({ lang, onGetStarted }: FinalCtaSectionProps) {
  return (
    <div
      className="w-full py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      style={{ background: '#0B1221' }}
    >
      {/* Dot pattern background */}
      <svg
        className="absolute inset-0 w-full h-full opacity-5"
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <pattern id="dots" x="24" y="24" width="48" height="48" patternUnits="userSpaceOnUse">
            <circle cx="24" cy="24" r="2" fill="#4F46E5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dots)" />
      </svg>

      {/* Radial gold glow in upper-right */}
      <div
        className="absolute top-0 right-0 w-96 h-96 opacity-10"
        style={{
          background: 'radial-gradient(circle, #4F46E5, transparent)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
        }}
      />

      {/* Content */}
      <div className="max-w-3xl mx-auto text-center relative z-10">
        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 text-xs font-bold tracking-wider"
          style={{
            background: 'linear-gradient(135deg, #4F46E5, #6366F1)',
            color: '#0B1221',
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#0B1221', opacity: 0.5 }} />
          {lang === 'es' ? 'COMENZAR' : 'GET STARTED'}
        </div>

        {/* Headline */}
        <h2
          className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold mb-6"
          style={{
            color: '#F0F2F5',
            letterSpacing: '-1px',
            lineHeight: 1.2,
          }}
        >
          {lang === 'es' ? 'Descubre dónde te encuentras.' : 'Find out where you stand.'}
        </h2>

        {/* Subtext */}
        <p
          className="text-lg sm:text-xl mb-10 max-w-2xl mx-auto"
          style={{ color: '#B0B9C8' }}
        >
          {lang === 'es'
            ? 'En menos de 60 segundos, descubre qué sucedió en casos como el tuyo. Sin crear cuenta. Sin guardar datos. Solo respuestas.'
            : 'In less than 60 seconds, discover what happened in cases like yours. No account. No data storage. Just answers.'}
        </p>

        {/* CTA Button */}
        <button
          onClick={onGetStarted}
          className="inline-flex items-center justify-center px-8 py-4 text-base sm:text-lg font-semibold text-navy-900 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl active:scale-100 mb-8"
          style={{
            background: 'linear-gradient(135deg, #4F46E5, #6366F1)',
            color: '#0B1221',
            boxShadow: '0 8px 32px rgba(184, 146, 58, 0.3)',
          }}
        >
          {lang === 'es' ? 'Generar mi informe' : 'Generate my report'}
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            className="ml-2"
          >
            <polyline points="5 12 19 12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </button>

        {/* Trust signals */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-sm font-medium"
          style={{ color: '#B0BDD0' }}
        >
          <div className="flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            {lang === 'es' ? 'Sin crear cuenta' : 'No account required'}
          </div>
          <div className="hidden sm:block w-1 h-1 rounded-full" style={{ background: '#B0BDD0' }} />
          <div className="flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            {lang === 'es' ? 'Entrega instantánea' : 'Instant delivery'}
          </div>
          <div className="hidden sm:block w-1 h-1 rounded-full" style={{ background: '#B0BDD0' }} />
          <div className="flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            {lang === 'es' ? 'Seguro y privado' : 'Secure & private'}
          </div>
        </div>

        {/* Data reinforcement */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
          {[
            { value: '5.1M+', label: lang === 'es' ? 'casos analizados' : 'cases analyzed' },
            { value: '94', label: lang === 'es' ? 'distritos federales' : 'federal districts' },
            { value: '84', label: lang === 'es' ? 'tipos de caso' : 'case types' },
            { value: '< 60s', label: lang === 'es' ? 'tiempo de informe' : 'report time' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-lg font-bold" style={{ color: '#6366F1' }}>{stat.value}</div>
              <div className="text-[10px]" style={{ color: '#8B95A5' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
