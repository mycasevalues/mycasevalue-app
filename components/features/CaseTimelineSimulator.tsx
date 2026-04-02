'use client';

import React, { useRef, useEffect, useState } from 'react';

interface CaseTimelineSimulatorProps {
  lang?: 'en' | 'es';
  caseType: string;
  durationMonths: number;
  settlementPct: number;
  winRate: number;
}

interface TimelinePhase {
  id: string;
  label: string;
  startMonth: number;
  endMonth: number;
  icon: string;
  color: string;
  description: string;
  details: string;
}

function getTimelinePhases(durationMonths: number, settlementPct: number, lang: 'en' | 'es'): TimelinePhase[] {
  const isEs = lang === 'es';
  const settlementMonth = Math.round(durationMonths * (settlementPct / 100));

  return [
    {
      id: 'filing',
      label: isEs ? 'Presentación' : 'Filing',
      startMonth: 0,
      endMonth: 0,
      icon: '📄',
      color: '#6366F1',
      description: isEs ? 'Demanda presentada ante la corte federal' : 'Complaint filed with federal court',
      details: isEs
        ? 'Se completan los documentos iniciales y se paga la cuota de presentación'
        : 'Initial documents completed, filing fee paid ($402 federal standard)',
    },
    {
      id: 'service',
      label: isEs ? 'Notificación y Respuesta' : 'Service & Response',
      startMonth: 1,
      endMonth: 2,
      icon: '📨',
      color: '#A5B4FC',
      description: isEs ? 'El demandado es notificado, presenta respuesta o mociones' : 'Defendant served, answer or motion to dismiss due',
      details: isEs
        ? 'El demandado tiene 21 días para responder. Puede interponer moción para desestimar.'
        : 'Defendant has 21 days to respond. May file motion to dismiss or answer.',
    },
    {
      id: 'discovery',
      label: isEs ? 'Descubrimiento' : 'Discovery',
      startMonth: 2,
      endMonth: 8,
      icon: '',
      color: '#5EEAD4',
      description: isEs ? 'Intercambio de documentos, deposiciones, interrogatorios' : 'Document exchanges, depositions, interrogatories',
      details: isEs
        ? 'Ambas partes intercambian pruebas. Promedio de costos: $5,000-$25,000'
        : 'Both parties exchange documents and evidence. Average costs: $5,000–$25,000',
    },
    {
      id: 'mediation',
      label: isEs ? 'Mediación/Conferencia' : 'Mediation/Settlement Conf.',
      startMonth: 6,
      endMonth: 10,
      icon: '',
      color: '#0D9488',
      description: isEs
        ? `${settlementPct}% de los casos como el suyo se resuelven aquí`
        : `${settlementPct}% of cases like yours settle here`,
      details: isEs
        ? 'Conferencia con un mediador neutral para negociar un acuerdo. Muchos casos terminan aquí.'
        : 'Neutral mediator facilitates settlement negotiations. Many cases resolve here to save costs.',
    },
    {
      id: 'pretrial',
      label: isEs ? 'Mociones Previas al Juicio' : 'Pre-Trial Motions',
      startMonth: 8,
      endMonth: 12,
      icon: '',
      color: '#F59E0B',
      description: isEs ? 'Mociones de sentencia sumaria, mociones Daubert' : 'Summary judgment, Daubert motions',
      details: isEs
        ? 'El juez puede resolver el caso sin juicio. Demora: 1-3 meses.'
        : 'Judge may dismiss case without trial. Timeline: 1–3 months.',
    },
    {
      id: 'trial',
      label: isEs ? 'Juicio' : 'Trial',
      startMonth: 12,
      endMonth: durationMonths,
      icon: '⚡',
      color: '#EF4444',
      description: isEs ? 'Solo ~3% de los casos federales llegan a juicio' : 'Only ~3% of federal cases reach trial',
      details: isEs
        ? 'Si el caso no se resuelve antes, va a juicio ante un jurado o un juez.'
        : 'If unresolved, case proceeds to jury or bench trial. Duration: varies.',
    },
    {
      id: 'resolution',
      label: isEs ? 'Resolución' : 'Resolution',
      startMonth: durationMonths,
      endMonth: durationMonths,
      icon: '',
      color: '#10B981',
      description: isEs
        ? `Resolución media: ${durationMonths} meses para este tipo de caso`
        : `Average resolution: ${durationMonths} months for this case type`,
      details: isEs
        ? 'El caso termina con sentencia, veredicto o acuerdo de última hora.'
        : 'Case concludes with judgment, verdict, or final settlement.',
    },
  ];
}

function getTranslation(key: string, lang: 'en' | 'es'): string {
  const translations: Record<string, Record<string, string>> = {
    'case-type-avg': {
      en: `Your case type averages`,
      es: 'Su tipo de caso promedía',
    },
    'months-duration': {
      en: 'months',
      es: 'meses',
    },
    'phase-based-data': {
      en: 'Timeline based on federal case data',
      es: 'Línea de tiempo basada en datos de casos federales',
    },
    'most-likely-outcome': {
      en: 'Most likely outcome',
      es: 'Resultado más probable',
    },
    'settlement-likely': {
      en: 'Settlement likely',
      es: 'Acuerdo probable',
    },
    'trial-possible': {
      en: 'Trial possible',
      es: 'Juicio posible',
    },
  };
  return translations[key]?.[lang] || key;
}

export function CaseTimelineSimulator({
  lang = 'en',
  caseType,
  durationMonths,
  settlementPct,
  winRate,
}: CaseTimelineSimulatorProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [expandedPhase, setExpandedPhase] = useState<string | null>(null);
  const [activePhaseIdx, setActivePhaseIdx] = useState(-1);

  const phases = getTimelinePhases(durationMonths, settlementPct, lang);
  const likelyOutcomePhase = settlementPct > 50 ? 'mediation' : 'trial';

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

  // Stagger animation of phases
  useEffect(() => {
    if (!isVisible) return;

    let idx = 0;
    const interval = setInterval(() => {
      setActivePhaseIdx(idx);
      idx++;
      if (idx >= phases.length) clearInterval(interval);
    }, 250);

    return () => clearInterval(interval);
  }, [isVisible, phases.length]);

  const maxMonth = Math.max(...phases.map((p) => p.endMonth || durationMonths));

  return (
    <div
      ref={ref}
      className="w-full"
      style={{ padding: '24px 0' }}
    >
      {/* Header */}
      <div
        style={{
          marginBottom: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        }}
      >
        <div
          style={{
            fontSize: '11px',
            fontWeight: 700,
            color: '#8B95A5',
            letterSpacing: '1.5px',
            textTransform: 'uppercase',
          }}
        >
          {lang === 'es' ? 'Simulador de Línea de Tiempo' : 'Case Timeline Simulator'}
        </div>

        {/* Case type callout card */}
        <div
          style={{
            padding: '14px 16px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #4F46E5 0%, #6366F1 100%)',
            border: '1px solid rgba(99, 102, 241, 0.3)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: 'rgba(255,255,255,0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '16px',
              flexShrink: 0,
            }}
          >
            
          </div>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 600, color: '#F0F2F5' }}>
              {getTranslation('case-type-avg', lang)} <strong>{durationMonths}</strong> {getTranslation('months-duration', lang)}
            </div>
            <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.8)' }}>
              {caseType} • {getTranslation('phase-based-data', lang)}
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Horizontal Timeline */}
      <div className="timeline-horizontal" style={{ display: 'none' }}>
        <div style={{ position: 'relative' }}>
          {/* Background line */}
          <div
            style={{
              position: 'absolute',
              top: '24px',
              left: '0',
              right: '0',
              height: '3px',
              background: '#1E293B',
              borderRadius: '2px',
            }}
          />

          {/* Progress line with gradient */}
          <div
            style={{
              position: 'absolute',
              top: '24px',
              left: '0',
              height: '3px',
              borderRadius: '2px',
              background: 'linear-gradient(90deg, #4F46E5, #0D9488, #EF4444)',
              width: isVisible ? '100%' : '0%',
              transition: 'width 2.5s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          />

          {/* Timeline nodes */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              position: 'relative',
              zIndex: 1,
            }}
          >
            {phases.map((phase, i) => {
              const isHighlighted = phase.id === likelyOutcomePhase;
              const isActive = i <= activePhaseIdx;

              return (
                <div
                  key={phase.id}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    flex: 1,
                    minWidth: 0,
                    opacity: isActive ? 1 : 0.3,
                    transform: isActive ? 'translateY(0) scale(1)' : 'translateY(8px) scale(0.9)',
                    transition: `all 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${i * 80}ms`,
                  }}
                >
                  {/* Node circle */}
                  <div
                    style={{
                      width: isHighlighted ? '48px' : '40px',
                      height: isHighlighted ? '48px' : '40px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: isActive ? `${phase.color}20` : '#131B2E',
                      border: `${isHighlighted ? 3 : 2}px solid ${isActive ? phase.color : '#1E293B'}`,
                      fontSize: isHighlighted ? '18px' : '16px',
                      boxShadow: isActive ? `0 0 20px ${phase.color}40` : 'none',
                      transition: 'all 0.5s ease',
                      flexShrink: 0,
                      cursor: 'pointer',
                      position: 'relative',
                    }}
                    onClick={() => setExpandedPhase(expandedPhase === phase.id ? null : phase.id)}
                  >
                    {phase.icon}
                    {isHighlighted && (
                      <div
                        style={{
                          position: 'absolute',
                          top: '-8px',
                          right: '-8px',
                          width: '20px',
                          height: '20px',
                          borderRadius: '50%',
                          background: '#10B981',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '12px',
                          fontWeight: 'bold',
                          color: '#fff',
                        }}
                      >
                        ★
                      </div>
                    )}
                  </div>

                  {/* Label */}
                  <div
                    style={{
                      fontSize: '11px',
                      fontWeight: 600,
                      color: isActive ? '#F0F2F5' : '#475569',
                      marginTop: '10px',
                      textAlign: 'center',
                      whiteSpace: 'nowrap',
                      maxWidth: '70px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {phase.label}
                  </div>

                  {/* Month range */}
                  {phase.startMonth !== phase.endMonth && (
                    <div
                      style={{
                        fontSize: '9px',
                        fontFamily: "'JetBrains Mono', monospace",
                        color: isActive ? phase.color : '#334155',
                        marginTop: '4px',
                      }}
                    >
                      mo {phase.startMonth}-{phase.endMonth}
                    </div>
                  )}

                  {/* Description tooltip */}
                  {expandedPhase === phase.id && isActive && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '70px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        background: '#1E293B',
                        border: `1px solid ${phase.color}40`,
                        borderRadius: '8px',
                        padding: '12px',
                        minWidth: '180px',
                        zIndex: 10,
                        boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
                      }}
                    >
                      <div style={{ fontSize: '11px', fontWeight: 600, color: phase.color, marginBottom: '6px' }}>
                        {phase.description}
                      </div>
                      <div style={{ fontSize: '10px', color: '#8B95A5', lineHeight: 1.4 }}>
                        {phase.details}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile Vertical Timeline */}
      <div className="timeline-vertical">
        <div style={{ position: 'relative', paddingLeft: '36px' }}>
          {/* Vertical line */}
          <div
            style={{
              position: 'absolute',
              top: '8px',
              left: '15px',
              bottom: '8px',
              width: '3px',
              borderRadius: '2px',
              background: isVisible
                ? 'linear-gradient(180deg, #4F46E5, #0D9488, #EF4444)'
                : '#1E293B',
              transition: 'background 2.5s ease',
            }}
          />

          {phases.map((phase, i) => {
            const isHighlighted = phase.id === likelyOutcomePhase;
            const isActive = i <= activePhaseIdx;

            return (
              <div
                key={phase.id}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  marginBottom: i < phases.length - 1 ? '20px' : '0',
                  opacity: isActive ? 1 : 0.3,
                  transform: isActive ? 'translateX(0)' : 'translateX(-8px)',
                  transition: `all 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${i * 80}ms`,
                }}
              >
                {/* Node circle - absolutely positioned on the line */}
                <div
                  style={{
                    position: 'absolute',
                    left: isHighlighted ? '2px' : '4px',
                    width: isHighlighted ? '30px' : '26px',
                    height: isHighlighted ? '30px' : '26px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: isActive ? `${phase.color}20` : '#131B2E',
                    border: `${isHighlighted ? 3 : 2}px solid ${isActive ? phase.color : '#1E293B'}`,
                    fontSize: isHighlighted ? '14px' : '12px',
                    boxShadow: isActive ? `0 0 16px ${phase.color}40` : 'none',
                    transition: 'all 0.5s ease',
                    flexShrink: 0,
                    cursor: 'pointer',
                  }}
                  onClick={() => setExpandedPhase(expandedPhase === phase.id ? null : phase.id)}
                >
                  {phase.icon}
                  {isHighlighted && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '-6px',
                        right: '-6px',
                        width: '16px',
                        height: '16px',
                        borderRadius: '50%',
                        background: '#10B981',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '10px',
                        fontWeight: 'bold',
                        color: '#fff',
                      }}
                    >
                      ★
                    </div>
                  )}
                </div>

                {/* Content */}
                <div style={{ paddingTop: '2px', flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <span style={{ fontSize: '13px', fontWeight: 600, color: isActive ? '#F0F2F5' : '#475569' }}>
                      {phase.label}
                    </span>
                    {isHighlighted && (
                      <span style={{ fontSize: '9px', color: '#10B981', fontWeight: 700, textTransform: 'uppercase' }}>
                        {getTranslation('most-likely-outcome', lang)}
                      </span>
                    )}
                  </div>

                  {phase.startMonth !== phase.endMonth && (
                    <div style={{ fontSize: '11px', color: '#8B95A5', marginBottom: '6px' }}>
                      {lang === 'es' ? 'Mes' : 'Month'} {phase.startMonth}-{phase.endMonth}
                    </div>
                  )}

                  {/* Expandable description */}
                  <div style={{ fontSize: '11px', color: '#8B95A5', marginBottom: '8px', lineHeight: 1.4 }}>
                    {phase.description}
                  </div>

                  {expandedPhase === phase.id && isActive && (
                    <div
                      style={{
                        padding: '10px',
                        background: '#1E293B',
                        border: `1px solid ${phase.color}40`,
                        borderRadius: '6px',
                        fontSize: '10px',
                        color: '#CBD5E1',
                        lineHeight: 1.5,
                        marginTop: '8px',
                      }}
                    >
                      {phase.details}
                    </div>
                  )}

                  {/* Clickable indicator */}
                  {!expandedPhase && isActive && (
                    <div
                      onClick={() => setExpandedPhase(phase.id)}
                      style={{
                        cursor: 'pointer',
                        fontSize: '10px',
                        color: phase.color,
                        fontWeight: 600,
                        textDecoration: 'underline',
                      }}
                    >
                      {lang === 'es' ? 'Ver detalles' : 'See details'}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Outcome indicator card */}
      <div
        style={{
          marginTop: '24px',
          padding: '14px 16px',
          borderRadius: '10px',
          background: '#131B2E',
          border: `2px solid ${likelyOutcomePhase === 'mediation' ? '#0D9488' : '#EF4444'}40`,
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.8s ease 1.8s',
        }}
      >
        <div
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '8px',
            background: likelyOutcomePhase === 'mediation' ? 'rgba(13, 148, 136, 0.12)' : 'rgba(239, 68, 68, 0.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '14px',
            flexShrink: 0,
          }}
        >
          {likelyOutcomePhase === 'mediation' ? '' : ''}
        </div>
        <div>
          <div
            style={{
              fontSize: '13px',
              fontWeight: 600,
              color: likelyOutcomePhase === 'mediation' ? '#0D9488' : '#EF4444',
            }}
          >
            {likelyOutcomePhase === 'mediation'
              ? getTranslation('settlement-likely', lang)
              : getTranslation('trial-possible', lang)}
          </div>
          <div style={{ fontSize: '11px', color: '#8B95A5' }}>
            {settlementPct}% {lang === 'es' ? 'de probabilidad de acuerdo' : 'settlement probability'}
          </div>
        </div>
      </div>

      {/* Responsive styles */}
      <style>{`
        .timeline-vertical { display: none; }
        .timeline-horizontal { display: block; }
        @media (max-width: 768px) {
          .timeline-horizontal { display: none; }
          .timeline-vertical { display: block; }
        }
      `}</style>
    </div>
  );
}

export default CaseTimelineSimulator;
