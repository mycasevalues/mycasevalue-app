'use client';

import React, { useState, useRef, useEffect } from 'react';

interface GlossaryTermProps {
  term: string;
  lang?: string;
  children?: React.ReactNode;
}

interface Definition {
  en: string;
  es: string;
}

const GLOSSARY: Record<string, Definition> = {
  settlement: {
    en: 'An agreement between parties to resolve a legal dispute without going to trial.',
    es: 'Acuerdo entre las partes para resolver una disputa legal sin ir a juicio.',
  },
  discovery: {
    en: 'The legal process of exchanging information between parties before trial.',
    es: 'Proceso legal de intercambio de información entre las partes antes del juicio.',
  },
  deposition: {
    en: 'Sworn testimony given by a witness outside of court, recorded for later use.',
    es: 'Testimonio bajo juramento dado por un testigo fuera de la corte.',
  },
  'summary judgment': {
    en: 'A court decision made without a full trial when facts are not in dispute.',
    es: 'Decisión judicial sin juicio completo cuando los hechos no están en disputa.',
  },
  mediation: {
    en: 'A dispute resolution process where a neutral third party helps parties reach agreement.',
    es: 'Proceso de resolución de disputas donde un tercero neutral ayuda a las partes.',
  },
  arbitration: {
    en: 'A process where parties submit their dispute to an arbitrator for binding decision.',
    es: 'Proceso donde las partes someten su disputa a un árbitro para decisión vinculante.',
  },
  'statute of limitations': {
    en: 'The legal deadline for filing a lawsuit after an injury or damage occurs.',
    es: 'Plazo legal para presentar una demanda después de una lesión o daño.',
  },
  'class action': {
    en: 'A lawsuit filed by one or more people on behalf of a larger group of similarly affected people.',
    es: 'Demanda presentada por una o más personas en nombre de un grupo más grande.',
  },
  'contingency fee': {
    en: 'A fee paid to an attorney only if the case is won or settled successfully.',
    es: 'Honorario pagado a un abogado solo si el caso se gana o resuelve exitosamente.',
  },
  'pro se': {
    en: 'Representing oneself in court without an attorney.',
    es: 'Representarse a sí mismo en la corte sin un abogado.',
  },
  plaintiff: {
    en: 'The party who initiates a lawsuit against another party.',
    es: 'La parte que inicia una demanda contra otra parte.',
  },
  defendant: {
    en: 'The party being sued or accused in a legal proceeding.',
    es: 'La parte demandada o acusada en un procedimiento legal.',
  },
  precedent: {
    en: 'A legal decision that serves as an example or rule for similar future cases.',
    es: 'Una decisión legal que sirve como ejemplo o regla para casos futuros similares.',
  },
  'burden of proof': {
    en: 'The obligation to prove disputed claims in court with sufficient evidence.',
    es: 'La obligación de probar afirmaciones disputadas en la corte con evidencia suficiente.',
  },
  damages: {
    en: 'Money awarded by a court to a person who has suffered loss or injury.',
    es: 'Dinero otorgado por un tribunal a una persona que ha sufrido pérdida o lesión.',
  },
  injunction: {
    en: 'A court order requiring someone to do something or refrain from doing something.',
    es: 'Una orden judicial que requiere que alguien haga algo o se abstenga de hacerlo.',
  },
  tort: {
    en: 'A wrongful act or infringement of a right other than under contract causing damage.',
    es: 'Un acto ilícito o violación de un derecho que no sea contrato que causa daño.',
  },
  liability: {
    en: 'Legal responsibility for one\'s actions or omissions causing harm to another.',
    es: 'Responsabilidad legal por acciones u omisiones que causen daño a otro.',
  },
  negligence: {
    en: 'Failure to exercise reasonable care resulting in damage or injury to another.',
    es: 'Falta de ejercer cuidado razonable que resulta en daño o lesión a otro.',
  },
  'due process': {
    en: 'The legal requirement that the state must respect all legal rights owed to a person.',
    es: 'El requisito legal de que el estado respete todos los derechos legales de una persona.',
  },
};

export default function GlossaryTerm({
  term,
  lang = 'en',
  children,
}: GlossaryTermProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLSpanElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const definition = GLOSSARY[term.toLowerCase()];
  const text = children || term;
  const displayDef = lang === 'es' && definition ? definition.es : definition?.en || '';

  useEffect(() => {
    if (!showTooltip || !triggerRef.current || !tooltipRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();

    setPosition({
      top: triggerRect.top - tooltipRect.height - 12,
      left: triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2,
    });
  }, [showTooltip]);

  const handleTouchStart = () => {
    setShowTooltip(!showTooltip);
  };

  if (!definition) {
    return <span>{text}</span>;
  }

  return (
    <>
      <span
        ref={triggerRef}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onTouchStart={handleTouchStart}
        className="cursor-help border-b border-dotted border-teal-500 transition-colors hover:border-teal-400"
      >
        {text}
      </span>

      {showTooltip && (
        <div
          ref={tooltipRef}
          style={{
            position: 'fixed',
            top: `${position.top}px`,
            left: `${position.left}px`,
            zIndex: 50,
            backgroundColor: '#131B2E',
            borderColor: '#4F46E5',
            color: '#E2E8F0',
          }}
          className="animate-in fade-in-0 duration-200 rounded-lg border px-3 py-2 max-w-xs"
        >
          <div className="font-semibold">{term}</div>
          <div className="text-sm mt-1" style={{ color: '#94A3B8' }}>
            {displayDef}
          </div>
          <div className="text-xs mt-2" style={{ color: '#64748B' }}>
            Federal legal terminology
          </div>
          <div
            className="absolute w-2 h-2 transform rotate-45"
            style={{
              backgroundColor: '#131B2E',
              borderRight: '1px solid #4F46E5',
              borderBottom: '1px solid #4F46E5',
              bottom: '-5px',
              left: '50%',
              marginLeft: '-4px',
            }}
          />
        </div>
      )}
    </>
  );
}

export function wrapGlossaryTerms(
  text: string,
  lang: string = 'en'
): React.ReactNode[] {
  const glossaryTerms = Object.keys(GLOSSARY);
  const sortedTerms = glossaryTerms.sort((a, b) => b.length - a.length);

  const regex = new RegExp(
    `\\b(${sortedTerms.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})\\b`,
    'gi'
  );

  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let keyCounter = 0;

  text.replace(regex, (match, ...args) => {
    const index = args[args.length - 2];
    const before = text.substring(lastIndex, index);

    if (before) {
      parts.push(before);
    }

    parts.push(
      <GlossaryTerm key={`glossary-${keyCounter++}`} term={match} lang={lang} />
    );

    lastIndex = index + match.length;
    return match;
  });

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts;
}
