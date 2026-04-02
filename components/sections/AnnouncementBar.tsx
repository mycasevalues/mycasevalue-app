'use client';

import React, { useState, useEffect } from 'react';

interface AnnouncementBarProps {
  lang?: 'en' | 'es';
  totalCases?: number;
}

interface Message {
  en: string;
  es: string;
  highlight?: boolean;
}

const MESSAGES: Message[] = [
  {
    en: '5.1M+ federal court outcomes indexed · Updated quarterly from FJC',
    es: '5.1M+ resultados de tribunales federales indexados · Actualizado trimestralmente del FJC',
  },
  {
    en: 'EEOC recovered $699.6M for discrimination victims in FY2024',
    es: 'La EEOC recupero $699.6M para victimas de discriminacion en AF2024',
    highlight: true,
  },
  {
    en: 'Free access to win rates, settlement ranges & timelines for 84 case types',
    es: 'Acceso gratuito a tasas de exito, rangos de acuerdos y tiempos para 84 tipos de caso',
  },
  {
    en: 'New: District Intelligence — explore data across all 94 federal districts',
    es: 'Nuevo: Inteligencia de Distritos — explore datos de los 94 distritos federales',
    highlight: true,
  },
  {
    en: 'Exposed: 97% EEOC litigation success rate — see the data yourself',
    es: 'Revelado: 97% de exito del EEOC en litigios — vea los datos usted mismo',
  },
];

export default function AnnouncementBar({ lang = 'en' }: AnnouncementBarProps) {
  const [dismissed, setDismissed] = useState(false);
  const [msgIndex, setMsgIndex] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setMsgIndex(prev => (prev + 1) % MESSAGES.length);
        setFading(false);
      }, 300);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  if (dismissed) return null;

  const msg = MESSAGES[msgIndex];
  const text = lang === 'es' ? msg.es : msg.en;

  return (
    <div
      className="relative overflow-hidden no-print"
      style={{
        background: 'linear-gradient(90deg, rgba(17,17,17,0.12) 0%, rgba(13,148,136,0.08) 50%, rgba(17,17,17,0.12) 100%)',
        borderBottom: '1px solid rgba(17,17,17,0.15)',
      }}
    >
      <div className="max-w-[1200px] mx-auto px-4 py-2 flex items-center justify-center gap-2 text-center">
        {/* Live dot */}
        <span
          className="inline-block w-2 h-2 rounded-full flex-shrink-0"
          style={{
            background: msg.highlight ? '#F59E0B' : '#10B981',
            boxShadow: msg.highlight ? '0 0 6px rgba(245,158,11,0.6)' : '0 0 6px rgba(16,185,129,0.6)',
            animation: 'livePulse 2s ease-in-out infinite',
          }}
          aria-hidden="true"
        />

        <span
          className="text-[11px] sm:text-[12px] transition-opacity duration-300"
          style={{
            color: 'var(--fg-secondary)',
            opacity: fading ? 0 : 1,
          }}
        >
          {text}
        </span>

        {/* Progress dots */}
        <div className="flex items-center gap-1 ml-2 hidden sm:flex">
          {MESSAGES.map((_, i) => (
            <button type="button"
              key={i}
              onClick={() => { setFading(true); setTimeout(() => { setMsgIndex(i); setFading(false); }, 200); }}
              className="w-1.5 h-1.5 rounded-full transition-all"
              style={{
                background: i === msgIndex ? '#333333' : 'rgba(17,17,17,0.3)',
                transform: i === msgIndex ? 'scale(1.3)' : 'scale(1)',
              }}
              aria-label={`Message ${i + 1}`}
            />
          ))}
        </div>

        {/* Dismiss */}
        <button type="button"
          onClick={() => setDismissed(true)}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md transition-colors hover:bg-white/5"
          aria-label="Dismiss"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--fg-subtle)" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
