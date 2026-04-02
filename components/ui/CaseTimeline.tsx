'use client';

import React, { useRef, useEffect, useState } from 'react';

interface TimelineEvent {
  label: string;
  months: number;
  icon: string;
  color: string;
  description?: string;
}

interface CaseTimelineProps {
  medianMonths: number;
  caseType?: string;
  lang?: 'en' | 'es';
}

function getTimelineEvents(medianMonths: number, lang: string): TimelineEvent[] {
  const m = medianMonths;
  const isEs = lang === 'es';
  return [
    {
      label: isEs ? 'Presentación' : 'Filing',
      months: 0,
      icon: '📄',
      color: '#333333',
      description: isEs ? 'Se presenta la demanda' : 'Complaint filed with court',
    },
    {
      label: isEs ? 'Respuesta' : 'Answer',
      months: Math.min(Math.round(m * 0.08), 2),
      icon: '📨',
      color: '#8B5CF6',
      description: isEs ? 'El demandado responde' : 'Defendant responds',
    },
    {
      label: isEs ? 'Descubrimiento' : 'Discovery',
      months: Math.round(m * 0.35),
      icon: '',
      color: '#5EEAD4',
      description: isEs ? 'Intercambio de pruebas' : 'Evidence exchange period',
    },
    {
      label: isEs ? 'Mediación' : 'Mediation',
      months: Math.round(m * 0.55),
      icon: '',
      color: '#0D9488',
      description: isEs ? 'Negociación de acuerdo' : 'Settlement negotiation',
    },
    {
      label: isEs ? 'Juicio/Resolución' : 'Trial / Resolution',
      months: m,
      icon: '',
      color: '#F472B6',
      description: isEs ? `Duración media: ${m} meses` : `Median duration: ${m} months`,
    },
  ];
}

export default function CaseTimeline({ medianMonths, caseType, lang = 'en' }: CaseTimelineProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeIdx, setActiveIdx] = useState(-1);
  const events = getTimelineEvents(medianMonths, lang);

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

  // Stagger animation of timeline nodes
  useEffect(() => {
    if (!isVisible) return;
    let idx = 0;
    const interval = setInterval(() => {
      setActiveIdx(idx);
      idx++;
      if (idx >= events.length) clearInterval(interval);
    }, 300);
    return () => clearInterval(interval);
  }, [isVisible, events.length]);

  return (
    <div ref={ref} style={{ padding: '16px 0' }}>
      {caseType && (
        <div style={{ fontSize: '11px', fontWeight: 700, color: '#9CA3AF', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '16px' }}>
          {lang === 'es' ? 'Línea de tiempo típica' : 'Typical Case Timeline'}
        </div>
      )}

      {/* Desktop horizontal timeline */}
      <div className="timeline-horizontal">
        <div style={{ position: 'relative' }}>
          {/* Background line */}
          <div style={{
            position: 'absolute', top: '20px', left: '20px', right: '20px',
            height: '3px', background: '#E5E7EB', borderRadius: '2px',
          }} />

          {/* Progress line */}
          <div style={{
            position: 'absolute', top: '20px', left: '20px',
            height: '3px', borderRadius: '2px',
            background: 'linear-gradient(90deg, #333333, #5EEAD4, #0D9488, #F472B6)',
            width: isVisible ? `calc(100% - 40px)` : '0%',
            transition: 'width 2s cubic-bezier(0.16, 1, 0.3, 1)',
          }} />

          {/* Timeline nodes */}
          <div style={{
            display: 'flex', justifyContent: 'space-between',
            position: 'relative', zIndex: 1,
          }}>
            {events.map((event, i) => (
              <div key={i} style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                flex: 1, minWidth: 0,
                opacity: i <= activeIdx ? 1 : 0.3,
                transform: i <= activeIdx ? 'translateY(0) scale(1)' : 'translateY(8px) scale(0.9)',
                transition: `all 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${i * 100}ms`,
              }}>
                {/* Node circle */}
                <div style={{
                  width: '40px', height: '40px', borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: i <= activeIdx ? `${event.color}20` : '#FFFFFF',
                  border: `2px solid ${i <= activeIdx ? event.color : '#E5E7EB'}`,
                  fontSize: '16px',
                  boxShadow: i <= activeIdx ? `0 0 16px ${event.color}30` : 'none',
                  transition: 'all 0.5s ease',
                  flexShrink: 0,
                }}>
                  {event.icon}
                </div>

                {/* Label */}
                <div style={{
                  fontSize: '11px', fontWeight: 600,
                  color: i <= activeIdx ? '#111827' : '#4B5563',
                  marginTop: '8px', textAlign: 'center',
                  whiteSpace: 'nowrap',
                }}>
                  {event.label}
                </div>

                {/* Month marker */}
                <div style={{
                  fontSize: '10px', fontWeight: 500,
                  fontFamily: "'JetBrains Mono', monospace",
                  color: i <= activeIdx ? event.color : '#334155',
                  marginTop: '2px',
                }}>
                  {event.months === 0 ? (lang === 'es' ? 'Día 1' : 'Day 1') : `${event.months}mo`}
                </div>

                {/* Description */}
                {event.description && i <= activeIdx && (
                  <div style={{
                    fontSize: '9px', color: '#9CA3AF',
                    marginTop: '4px', textAlign: 'center',
                    maxWidth: '80px', lineHeight: 1.3,
                  }}>
                    {event.description}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile vertical timeline */}
      <div className="timeline-vertical">
        <div style={{ position: 'relative', paddingLeft: '32px' }}>
          {/* Vertical line */}
          <div style={{
            position: 'absolute', top: '8px', left: '15px', bottom: '8px',
            width: '3px', borderRadius: '2px',
            background: isVisible
              ? 'linear-gradient(180deg, #333333, #5EEAD4, #0D9488, #F472B6)'
              : '#E5E7EB',
            transition: 'background 2s ease',
          }} />

          {events.map((event, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'flex-start', gap: '12px',
              marginBottom: i < events.length - 1 ? '20px' : '0',
              opacity: i <= activeIdx ? 1 : 0.3,
              transform: i <= activeIdx ? 'translateX(0)' : 'translateX(-8px)',
              transition: `all 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${i * 100}ms`,
            }}>
              {/* Node circle - absolutely positioned on the line */}
              <div style={{
                position: 'absolute', left: '4px',
                width: '26px', height: '26px', borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: i <= activeIdx ? `${event.color}20` : '#FFFFFF',
                border: `2px solid ${i <= activeIdx ? event.color : '#E5E7EB'}`,
                fontSize: '12px',
                boxShadow: i <= activeIdx ? `0 0 12px ${event.color}30` : 'none',
                transition: 'all 0.5s ease',
                flexShrink: 0,
              }}>
                {event.icon}
              </div>

              {/* Content */}
              <div style={{ paddingTop: '2px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{
                    fontSize: '13px', fontWeight: 600,
                    color: i <= activeIdx ? '#111827' : '#4B5563',
                  }}>
                    {event.label}
                  </span>
                  <span style={{
                    fontSize: '11px', fontWeight: 500,
                    fontFamily: "'JetBrains Mono', monospace",
                    color: i <= activeIdx ? event.color : '#334155',
                  }}>
                    {event.months === 0 ? (lang === 'es' ? 'Día 1' : 'Day 1') : `${event.months}mo`}
                  </span>
                </div>
                {event.description && i <= activeIdx && (
                  <div style={{
                    fontSize: '11px', color: '#9CA3AF',
                    marginTop: '2px', lineHeight: 1.4,
                  }}>
                    {event.description}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Duration callout */}
      <div style={{
        marginTop: '20px', padding: '12px 16px',
        borderRadius: '10px', background: '#FFFFFF',
        border: '1px solid #E5E7EB',
        display: 'flex', alignItems: 'center', gap: '10px',
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.8s ease 1.5s',
      }}>
        <div style={{
          width: '32px', height: '32px', borderRadius: '8px',
          background: 'rgba(17,17,17,0.12)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '14px', flexShrink: 0,
        }}></div>
        <div>
          <div style={{ fontSize: '13px', fontWeight: 600, color: '#111827' }}>
            {lang === 'es' ? 'Duración media' : 'Median Duration'}: <span style={{ color: '#333333', fontFamily: "'JetBrains Mono', monospace" }}>{medianMonths} {lang === 'es' ? 'meses' : 'months'}</span>
          </div>
          <div style={{ fontSize: '11px', color: '#9CA3AF' }}>
            {lang === 'es' ? 'Basado en datos históricos de casos federales' : 'Based on historical federal case data'}
          </div>
        </div>
      </div>

      <style>{`
        .timeline-vertical { display: none; }
        .timeline-horizontal { display: block; }
        @media (max-width: 580px) {
          .timeline-horizontal { display: none; }
          .timeline-vertical { display: block; }
        }
      `}</style>
    </div>
  );
}
