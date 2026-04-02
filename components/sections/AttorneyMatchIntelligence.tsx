'use client'

import React from 'react'

interface AttorneyMatchIntelligenceProps {
  lang?: 'en' | 'es'
}

const AttorneyMatchIntelligence: React.FC<AttorneyMatchIntelligenceProps> = ({
  lang = 'en',
}) => {
  const isES = lang === 'es'

  const content = {
    badge: 'ATTORNEY INTELLIGENCE',
    title: isES ? 'Conozca a su abogado oponente' : 'Know your opposing counsel',
    subtitle: isES
      ? 'Acceda a tasas de victoria, especializaciones e historiales de casos de registros judiciales públicos'
      : 'Access win rates, specializations, and case track records from public court records',
    attorney: 'Sample Attorney Profile',
    firm: 'Demo Law Firm LLP',
    barNumber: 'Demo-12345',
    practiceAreas: ['Employment Law', 'Civil Rights', 'FLSA'],
    stats: [
      { label: isES ? 'Casos Presentados' : 'Cases Filed', value: '247' },
      { label: isES ? 'Tasa de Victoria' : 'Win Rate', value: '62%' },
      { label: isES ? 'Liquidación Promedio' : 'Avg Settlement', value: '$185K' },
      { label: isES ? 'Cronograma Mediano' : 'Median Timeline', value: '11.2 mo' },
    ],
    outcomes: [
      { label: 'Won', pct: 42, color: '#10B981' },
      { label: 'Settled', pct: 35, color: '#F59E0B' },
      { label: 'Lost', pct: 15, color: '#EF4444' },
      { label: 'Dismissed', pct: 8, color: '#9CA3AF' },
    ],
    disclaimer: isES
      ? 'Datos de abogados obtenidos de registros judicales federales públicos (PACER, CourtListener). Este es un perfil de demostración — los informes reales muestran datos de abogados oponentes reales para su caso específico.'
      : 'Attorney data sourced from public federal court records (PACER, CourtListener). This is a demo profile — actual reports show real opposing counsel data for your specific case.',
    cta: isES ? 'Desbloquear inteligencia de abogados' : 'Unlock attorney intelligence',
    premium: 'PREMIUM',
  }

  return (
    <section
      className="w-full rounded-2xl border p-8 md:p-12"
      style={{
        background: 'rgba(255,255,255,0.02)',
        borderColor: 'var(--border-default)',
      }}
    >
      {/* Badge Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold tracking-[2px] uppercase mb-3"
          style={{ background: 'rgba(139,92,246,0.1)', color: '#A78BFA' }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#A78BFA" strokeWidth="2.5" aria-hidden="true">
            <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4-4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/>
          </svg>
          {content.badge}
        </div>
        <h2 className="text-xl sm:text-2xl font-display font-extrabold mb-2" style={{ color: 'var(--fg-primary)', letterSpacing: '-0.5px' }}>
          {content.title}
        </h2>
        <p className="text-sm max-w-lg mx-auto" style={{ color: 'var(--fg-muted)' }}>{content.subtitle}</p>
      </div>

      {/* Attorney Card */}
      <div
        className="relative mb-8 rounded-xl border p-6 md:p-8"
        style={{
          background: 'rgba(255,255,255,0.01)',
          borderColor: 'var(--border-default)',
        }}
      >
        {/* Premium Badge */}
        <div className="absolute right-4 top-4 rounded-full px-2.5 py-0.5 text-[9px] font-bold tracking-[1.5px]"
          style={{ background: 'rgba(245,158,11,0.15)', color: '#F59E0B' }}>
          {content.premium}
        </div>

        {/* Attorney Header */}
        <div className="mb-6">
          <h3 className="mb-1 text-xl font-bold text-white">
            {content.attorney}
          </h3>
          <p className="text-sm text-gray-400">{content.firm}</p>
          <p className="text-xs text-gray-500">Bar: {content.barNumber}</p>
        </div>

        {/* Practice Areas */}
        <div className="mb-6 flex flex-wrap gap-2">
          {content.practiceAreas.map((area) => (
            <span
              key={area}
              className="rounded-full bg-blue-950 px-3 py-1 text-xs font-medium text-blue-200"
            >
              {area}
            </span>
          ))}
        </div>

        {/* Stats Grid (2x2) */}
        <div className="mb-8 grid grid-cols-2 gap-4 md:gap-6">
          {content.stats.map((stat) => (
            <div key={stat.label} className="rounded-lg p-3" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
              <p className="mb-1 text-[9px] font-bold uppercase tracking-[1.5px]" style={{ color: '#9CA3AF' }}>
                {stat.label}
              </p>
              <p className="text-lg font-bold" style={{ color: '#374151' }}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Case Outcomes Chart */}
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
            Case Outcomes
          </p>
          {content.outcomes.map((outcome) => (
            <div key={outcome.label}>
              <div className="mb-1 flex justify-between text-xs">
                <span className="text-gray-300">{outcome.label}</span>
                <span className="text-gray-400">{outcome.pct}%</span>
              </div>
              <div
                className="h-2 rounded-full"
                style={{ background: 'rgba(255,255,255,0.05)' }}
              >
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${outcome.pct}%`,
                    background: outcome.color,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Disclaimer */}
      <p className="mb-8 text-xs text-gray-500">{content.disclaimer}</p>

      {/* CTA Button */}
      <div className="text-center">
        <button
          className="px-6 py-3 rounded-lg text-sm font-semibold transition-all hover:scale-[1.02]"
          style={{ background: 'linear-gradient(135deg, #7C3AED, #A78BFA)', color: '#fff', border: 'none', cursor: 'pointer' }}
        >
          {content.cta}
        </button>
      </div>
    </section>
  )
}

export default AttorneyMatchIntelligence
