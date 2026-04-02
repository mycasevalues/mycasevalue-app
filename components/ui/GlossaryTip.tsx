'use client';

import React, { useState } from 'react';

/* EXTRACTED from MyCaseValue.tsx */

export const LEGAL_GLOSSARY: Record<string, { en: string; es: string }> = {
  'win rate': {
    en: 'How often people in similar situations got a favorable result in court.',
    es: 'Con qué frecuencia las personas en situaciones similares obtienen un resultado favorable en la corte.'
  },
  'settlement': {
    en: 'When both sides agree to resolve the case (usually with a payment) without going to trial.',
    es: 'Cuando ambas partes acuerdan resolver el caso (generalmente con un pago) sin ir a juicio.'
  },
  'dismissal': {
    en: 'When a judge ends a case before it goes to trial, often because of a technicality or lack of evidence.',
    es: 'Cuando un juez termina un caso antes de que vaya a juicio, a menudo por una tecnicidad o falta de evidencia.'
  },
  'summary judgment': {
    en: 'When a judge decides the case without a full trial because the key facts aren\'t in dispute.',
    es: 'Cuando un juez decide el caso sin un juicio completo porque los hechos clave no están en disputa.'
  },
  'statute of limitations': {
    en: 'The legal deadline to file your case. If you miss it, you generally can\'t sue — even if you have a strong case.',
    es: 'El plazo legal para presentar tu demanda. Si lo pierdes, generalmente no puedes demandar, incluso si tienes un caso sólido.'
  },
  'contingency fee': {
    en: 'A payment arrangement where your lawyer only gets paid if you win (usually 33-40% of what you recover).',
    es: 'Un acuerdo de pago en el que tu abogado solo recibe dinero si ganas (generalmente 33-40% de lo que recuperes).'
  },
  'plaintiff': {
    en: 'The person filing the lawsuit — that could be you.',
    es: 'La persona que presenta la demanda, que podrías ser tú.'
  },
  'defendant': {
    en: 'The person or company being sued.',
    es: 'La persona o empresa que está siendo demandada.'
  },
  'circuit': {
    en: 'A regional group of federal courts. The U.S. has 13, and outcomes can vary significantly between them.',
    es: 'Un grupo regional de cortes federales. EE.UU. tiene 13, y los resultados pueden variar significativamente entre ellas.'
  },
  'discovery': {
    en: 'The phase before trial where both sides must share evidence and information with each other.',
    es: 'La fase antes del juicio en la que ambas partes deben compartir evidencia e información entre sí.'
  },
  'deposition': {
    en: 'When a witness answers questions under oath outside of court, typically recorded for later use.',
    es: 'Cuando un testigo responde preguntas bajo juramento fuera de la corte, típicamente grabado para uso posterior.'
  },
  'mediation': {
    en: 'A meeting where a neutral person helps both sides try to reach an agreement without going to trial.',
    es: 'Una reunión donde una persona neutral ayuda a ambas partes a intentar llegar a un acuerdo sin ir a juicio.'
  },
  'class action': {
    en: 'A single lawsuit filed on behalf of a large group of people who were all affected by the same thing.',
    es: 'Una demanda única presentada en nombre de un gran grupo de personas que fueron afectadas por lo mismo.'
  },
  'jurisdiction': {
    en: 'Which court has the authority to hear your type of case.',
    es: 'Qué corte tiene la autoridad para escuchar tu tipo de caso.'
  },
  'filing': {
    en: 'Officially submitting your lawsuit paperwork to the court to start your case.',
    es: 'Presentar oficialmente tus documentos de demanda a la corte para comenzar tu caso.'
  },
  'appeal': {
    en: 'Asking a higher court to review the decision if you disagree with the outcome.',
    es: 'Pedirle a una corte superior que revise la decisión si no estás de acuerdo con el resultado.'
  },
  'damages': {
    en: 'The money you\'re asking for to compensate you for what happened.',
    es: 'El dinero que estás pidiendo para compensarte por lo que sucedió.'
  },
  'pro se': {
    en: 'Representing yourself in court without a lawyer.',
    es: 'Representarte a ti mismo en la corte sin un abogado.'
  },
  'burden of proof': {
    en: 'The responsibility to prove your claims are true. In civil cases, you usually need to show your side is "more likely than not."',
    es: 'La responsabilidad de probar que tus afirmaciones son ciertas. En casos civiles, generalmente necesitas demostrar que tu versión es "más probable que no."'
  },
  'motion to dismiss': {
    en: 'A request asking the judge to throw out a case early — usually because of a legal technicality or insufficient evidence.',
    es: 'Una solicitud pidiéndole al juez que desestime un caso tempranamente, generalmente por una tecnicidad legal o evidencia insuficiente.'
  },
  'injunction': {
    en: 'A court order telling someone to stop doing something (or requiring them to do something) while the case is ongoing.',
    es: 'Una orden judicial que le dice a alguien que deje de hacer algo (o que haga algo) mientras el caso está en curso.'
  },
  'tort': {
    en: 'A wrongful act (other than breaking a contract) that causes harm and allows you to sue for compensation.',
    es: 'Un acto ilícito (diferente a romper un contrato) que causa daño y te permite demandar por compensación.'
  },
  'punitive damages': {
    en: 'Extra money awarded to punish the defendant for especially bad behavior — on top of what covers your actual losses.',
    es: 'Dinero adicional otorgado para castigar al demandado por conducta especialmente mala, además de lo que cubre tus pérdidas reales.'
  },
  'compensatory damages': {
    en: 'Money meant to cover your actual losses — like medical bills, lost wages, and pain and suffering.',
    es: 'Dinero destinado a cubrir tus pérdidas reales, como gastos médicos, salarios perdidos y dolor y sufrimiento.'
  },
  'default judgment': {
    en: 'When one side wins automatically because the other side didn\'t respond to the lawsuit in time.',
    es: 'Cuando una parte gana automáticamente porque la otra parte no respondió a la demanda a tiempo.'
  },
  'interrogatories': {
    en: 'Written questions one side sends to the other that must be answered under oath during discovery.',
    es: 'Preguntas escritas que una parte envía a la otra y que deben responderse bajo juramento durante el descubrimiento.'
  },
  'subpoena': {
    en: 'A legal order requiring someone to appear in court or provide documents. Ignoring it can result in penalties.',
    es: 'Una orden legal que requiere que alguien se presente en la corte o proporcione documentos. Ignorarla puede resultar en sanciones.'
  },
  'precedent': {
    en: 'A past court decision that judges may follow when deciding similar cases in the future.',
    es: 'Una decisión judicial pasada que los jueces pueden seguir al decidir casos similares en el futuro.'
  },
  'voir dire': {
    en: 'The jury selection process where lawyers ask potential jurors questions to determine if they can be fair and impartial.',
    es: 'El proceso de selección del jurado donde los abogados hacen preguntas a posibles jurados para determinar si pueden ser justos e imparciales.'
  },
  'retainer': {
    en: 'An upfront payment to hire a lawyer. Think of it like a deposit that the lawyer draws from as they work on your case.',
    es: 'Un pago anticipado para contratar a un abogado. Es como un depósito del cual el abogado va descontando mientras trabaja en tu caso.'
  },
  'arbitration': {
    en: 'A private process where a neutral third party (not a judge) hears both sides and makes a binding decision.',
    es: 'Un proceso privado donde un tercero neutral (no un juez) escucha ambas partes y toma una decisión vinculante.'
  },
  'liable': {
    en: 'Legally responsible. If someone is found liable in a civil case, they typically must pay damages.',
    es: 'Legalmente responsable. Si alguien es encontrado responsable en un caso civil, generalmente debe pagar daños.'
  },
  'brief': {
    en: 'A written document submitted to the court that argues your side of the case, citing laws and evidence.',
    es: 'Un documento escrito presentado a la corte que argumenta tu versión del caso, citando leyes y evidencia.'
  },
  'counsel': {
    en: 'A lawyer or team of lawyers representing you. "Of counsel" means an attorney affiliated with a firm but not a partner.',
    es: 'Un abogado o equipo de abogados que te representan. "Of counsel" significa un abogado afiliado a una firma pero que no es socio.'
  },
};

export interface GlossaryTipProps {
  term: string;
  children: React.ReactNode;
  lang?: string;
}

export function GlossaryTip({ term, children, lang = 'en' }: GlossaryTipProps) {
  const [show, setShow] = useState(false);
  const def = LEGAL_GLOSSARY[term.toLowerCase()];
  if (!def) return <>{children}</>;
  const displayDef = lang === 'es' ? def.es : def.en;
  return (
    <span
      className="relative inline-block cursor-help"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      style={{ borderBottom: '1px dashed #11111140' }}
      role="tooltip"
      aria-label={displayDef}
    >
      {children}
      {show && (
        <span
          className="absolute z-[var(--z-dropdown)] bottom-full left-1/2 -translate-x-1/2 mb-2 px-4 py-3 rounded-xl text-[12px] leading-relaxed font-normal text-left w-56 sm:w-64 max-w-[calc(100vw-2rem)]"
          style={{ background: '#FAFAF8', color: '#D1D5DB', boxShadow: '0 8px 32px rgba(255,255,255,.25)' }}
          role="tooltip"
        >
          <span className="font-bold text-white block mb-0.5 capitalize">{term}</span>
          {displayDef}
          <span
            className="absolute top-full left-1/2 -translate-x-1/2 -mt-px w-2.5 h-2.5 rotate-45"
            style={{ background: '#FAFAF8' }}
            aria-hidden="true"
          />
        </span>
      )}
    </span>
  );
}

export default GlossaryTip;
