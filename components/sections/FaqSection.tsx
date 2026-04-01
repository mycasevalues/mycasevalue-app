'use client';

import { useState } from 'react';
import { Lang } from '../../lib/i18n';

interface FaqItem {
  q: string;
  a: string;
}

const FAQ_EN: FaqItem[] = [
  {
    q: 'What federal courts does your data cover?',
    a: 'We have comprehensive data from all 13 federal circuit courts, district courts across all 50 states, and historical records dating back to 1970. Our database includes civil cases from federal PACER records and the Federal Judicial Center Integrated Database (IDB), covering millions of outcomes.',
  },
  {
    q: 'How is this different from a lawyer\'s opinion?',
    a: 'MyCaseValue shows you what actually happened in similar cases—historical outcomes, win rates, settlement amounts, and timelines. A lawyer provides legal advice tailored to your specific situation and jurisdiction. Our data is a starting point for informed conversations with legal counsel, not a substitute for professional advice.',
  },
  {
    q: 'Is my information kept confidential?',
    a: 'Yes, absolutely. We do not store, share, or sell your data. All case information you enter during your search is used only to generate your report—it\'s not saved to our servers. We don\'t track individuals, and we never contact you about your case unless you opt into our mailing list.',
  },
  {
    q: 'How accurate is the data?',
    a: 'Our data comes directly from federal court records (PACER, Federal Judicial Center, CourtListener). We track accuracy metrics and have reported 94% accuracy in case outcome classifications. However, some older records may have incomplete details, and we always note data limitations in your report.',
  },
  {
    q: 'What if my case type isn\'t listed?',
    a: 'We cover 84 primary federal practice areas and hundreds of subcategories. If your specific case type isn\'t in our system, the closest category will be suggested, and we\'ll explain why. You\'re welcome to contact us for custom analysis of rare case types.',
  },
  {
    q: 'How quickly do I get my report?',
    a: 'Your free report is generated instantly—typically within 60 seconds. Premium reports with detailed settlement data, state comparisons, and attorney impact analysis also generate in real time. No waiting, no processing delays.',
  },
  {
    q: 'Can I use this report with my attorney?',
    a: 'Yes, many attorneys find our reports helpful for case evaluation and settlement discussions. Your report includes data on comparable outcomes, settlement trends, and win rates—information your attorney can reference. Premium reports can be exported as PDF for easy sharing.',
  },
  {
    q: 'What if I\'m not satisfied with my report?',
    a: 'If your free report doesn\'t answer your key questions, we offer a 100% refund on premium reports. We also provide email support to help you interpret your data and answer follow-up questions about your case category.',
  },
  {
    q: 'What types of cases does MyCaseValues cover?',
    a: 'We cover 84 federal civil case types including employment discrimination (Title VII, ADA, ADEA), personal injury, medical malpractice, product liability, civil rights (§1983), contract disputes, FLSA wage violations, FMLA retaliation, premises liability, wrongful termination, and more. Each maps to a specific federal Nature of Suit (NOS) code.',
  },
  {
    q: 'How is MyCaseValues different from Westlaw or LexisNexis?',
    a: 'Westlaw and LexisNexis charge $350-400+/month and are designed for attorneys. MyCaseValues is free, requires no login, and is built specifically for plaintiffs and the public. We provide win rates, settlement ranges, judge analytics, and district intelligence — features that overlap with paid services but are accessible to everyone.',
  },
  {
    q: 'Where does the EEOC data come from?',
    a: 'Our EEOC data comes directly from the EEOC Office of General Counsel FY2024 Annual Report and EEOC Charge Statistics (FY1997-FY2023). This includes total monetary recovery ($699.6M in FY2024), charges by statute, litigation success rates, and statutory damage caps.',
  },
  {
    q: 'What do the settlement percentiles mean?',
    a: 'Settlement percentiles show where outcomes fall in the distribution. P10 means 10% of cases settled for less than that amount. P50 is the median — half settled above, half below. P90 means only 10% exceeded that amount. These come from FJC IDB and BJS Civil Trial Statistics.',
  },
  {
    q: 'Is MyCaseValues legal advice?',
    a: 'No. MyCaseValues is a public data research tool that shows historical outcomes in federal civil cases. It is not legal advice, does not predict outcomes, and should not replace consultation with a qualified attorney. We provide information to help you make more informed decisions.',
  },
  {
    q: 'How often is the data updated?',
    a: 'Our core data from the Federal Judicial Center IDB is updated quarterly. EEOC statistics are updated annually (fiscal year). Administrative Office of U.S. Courts statistical tables are updated annually. CourtListener opinion data updates daily.',
  },
];

const FAQ_ES: FaqItem[] = [
  {
    q: '¿Qué tribunales federales cubre tu base de datos?',
    a: 'Tenemos datos completos de los 13 tribunales federales de apelación, tribunales de distrito en los 50 estados, y registros históricos desde 1970. Nuestra base de datos incluye casos civiles de registros PACER federales y la Base de Datos Integrada (IDB) del Centro Judicial Federal, abarcando millones de resultados.',
  },
  {
    q: '¿Cómo es diferente de la opinión de un abogado?',
    a: 'MyCaseValue te muestra lo que realmente sucedió en casos similares: resultados históricos, tasas de éxito, montos de acuerdos y plazos. Un abogado proporciona asesoramiento legal adaptado a tu situación específica y jurisdicción. Nuestros datos son un punto de partida para conversaciones informadas con asesoramiento legal, no un sustituto del asesoramiento profesional.',
  },
  {
    q: '¿Mi información se mantiene confidencial?',
    a: 'Sí, absolutamente. No almacenamos, compartimos ni vendemos tus datos. Toda la información del caso que ingreses durante tu búsqueda se usa solo para generar tu informe; no se guarda en nuestros servidores. No rastreamos individuos y nunca nos comunicamos contigo sobre tu caso a menos que optes por nuestra lista de correo.',
  },
  {
    q: '¿Qué tan precisos son los datos?',
    a: 'Nuestros datos provienen directamente de registros de tribunales federales (PACER, Centro Judicial Federal, CourtListener). Rastreamos métricas de precisión e informamos 94% de precisión en clasificaciones de resultados de casos. Sin embargo, algunos registros antiguos pueden tener detalles incompletos, y siempre notamos limitaciones de datos en tu informe.',
  },
  {
    q: '¿Qué pasa si mi tipo de caso no está en la lista?',
    a: 'Cubrimos 84 áreas principales de práctica federal y cientos de subcategorías. Si tu tipo de caso específico no está en nuestro sistema, se sugerirá la categoría más cercana y explicaremos por qué. Puedes contactarnos para análisis personalizados de tipos de casos raros.',
  },
  {
    q: '¿Qué tan rápido recibo mi informe?',
    a: 'Tu informe gratuito se genera instantáneamente, típicamente en menos de 60 segundos. Los informes premium con datos detallados de acuerdos, comparaciones estatales e impacto de abogados también se generan en tiempo real. Sin esperas, sin retrasos en el procesamiento.',
  },
  {
    q: '¿Puedo usar este informe con mi abogado?',
    a: 'Sí, muchos abogados encuentran nuestros informes útiles para evaluación de casos y discusiones de acuerdos. Tu informe incluye datos sobre resultados comparables, tendencias de acuerdos y tasas de éxito; información que tu abogado puede consultar. Los informes premium se pueden exportar como PDF para compartir fácilmente.',
  },
  {
    q: '¿Qué pasa si no estoy satisfecho con mi informe?',
    a: 'Si tu informe gratuito no responde tus preguntas clave, ofrecemos un reembolso del 100% en informes premium. También proporcionamos soporte por correo electrónico para ayudarte a interpretar tus datos y responder preguntas de seguimiento sobre tu categoría de caso.',
  },
  {
    q: '¿Qué tipos de casos cubre MyCaseValues?',
    a: 'Cubrimos más de 50 tipos de casos civiles federales incluyendo discriminación laboral (Título VII, ADA, ADEA), lesiones personales, negligencia médica, responsabilidad de producto, derechos civiles (§1983), disputas contractuales, violaciones salariales FLSA, represalias FMLA, responsabilidad de instalaciones, despido injustificado y más.',
  },
  {
    q: '¿Cómo se diferencia MyCaseValues de Westlaw o LexisNexis?',
    a: 'Westlaw y LexisNexis cobran $350-400+/mes y están diseñados para abogados. MyCaseValues es gratuito, no requiere registro y está construido específicamente para demandantes y el público. Proporcionamos tasas de éxito, rangos de acuerdos, análisis de jueces e inteligencia de distritos.',
  },
  {
    q: '¿De dónde provienen los datos del EEOC?',
    a: 'Nuestros datos del EEOC provienen directamente del Informe Anual de la Oficina del Consejero General del EEOC AF2024 y las Estadísticas de Cargos del EEOC (AF1997-AF2023). Esto incluye recuperación monetaria total ($699.6M en AF2024), cargos por estatuto, tasas de éxito en litigios y topes de daños.',
  },
  {
    q: '¿Qué significan los percentiles de acuerdos?',
    a: 'Los percentiles de acuerdos muestran dónde caen los resultados en la distribución. P10 significa que el 10% de los casos se resolvieron por menos de esa cantidad. P50 es la mediana. P90 significa que solo el 10% superó esa cantidad. Estos provienen del FJC IDB y las Estadísticas de Juicios Civiles del BJS.',
  },
  {
    q: '¿MyCaseValues es asesoría legal?',
    a: 'No. MyCaseValues es una herramienta de investigación de datos públicos que muestra resultados históricos en casos civiles federales. No es asesoría legal, no predice resultados y no debe reemplazar la consulta con un abogado calificado.',
  },
  {
    q: '¿Con qué frecuencia se actualizan los datos?',
    a: 'Nuestros datos principales del FJC IDB se actualizan trimestralmente. Las estadísticas del EEOC se actualizan anualmente. Las tablas estadísticas de la Oficina Administrativa se actualizan anualmente. Los datos de opiniones de CourtListener se actualizan diariamente.',
  },
];

interface FaqSectionProps {
  lang: Lang;
}

export default function FaqSection({ lang }: FaqSectionProps) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const faqs = lang === 'es' ? FAQ_ES : FAQ_EN;

  return (
    <div className="w-full py-12 px-4 sm:px-6 lg:px-8 bg-[#0B1221]">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div
            className="text-[11px] font-bold tracking-[2.5px] uppercase mb-3"
            style={{ color: '#94A3B8' }}
          >
            {lang === 'es' ? 'Preguntas Frecuentes' : 'Frequently Asked Questions'}
          </div>
          <h2
            className="text-3xl sm:text-4xl font-display font-bold mb-4"
            style={{ letterSpacing: '-1px' }}
          >
            {lang === 'es' ? 'Respuestas a tus preguntas' : 'Answers to your questions'}
          </h2>
          <p className="text-base text-[#94A3B8] max-w-2xl mx-auto">
            {lang === 'es'
              ? 'Todo lo que necesitas saber sobre MyCaseValue, nuestros datos y cómo funciona el informe.'
              : 'Everything you need to know about MyCaseValue, our data, and how reports work.'}
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-3">
          {faqs.map((item, idx) => (
            <div
              key={idx}
              className="border rounded-xl overflow-hidden transition-all duration-200"
              style={{
                borderColor: openIdx === idx ? '#4F46E5' : '#1E293B',
                background: openIdx === idx ? 'linear-gradient(180deg, #1E2941, #131B2E)' : '#131B2E',
              }}
            >
              <button
                id={`faq-question-${idx}`}
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                aria-expanded={openIdx === idx}
                aria-controls={`faq-answer-${idx}`}
                className="w-full px-6 py-4 flex items-start justify-between hover:bg-[#1E293B] transition-colors text-left"
                style={{
                  background: openIdx === idx ? 'transparent' : 'transparent',
                }}
              >
                <h3
                  className="text-base sm:text-lg font-semibold font-display"
                  style={{
                    color: openIdx === idx ? '#4F46E5' : '#F0F2F5',
                    letterSpacing: '-0.5px',
                  }}
                >
                  {item.q}
                </h3>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={openIdx === idx ? '#4F46E5' : '#94A3B8'}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="flex-shrink-0 ml-4 transition-transform duration-300"
                  style={{
                    transform: openIdx === idx ? 'rotate(180deg)' : 'rotate(0deg)',
                  }}
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              {/* Answer - fade in when open */}
              <div
                id={`faq-answer-${idx}`}
                role="region"
                aria-labelledby={`faq-question-${idx}`}
                className="overflow-hidden transition-all duration-200"
                style={{
                  maxHeight: openIdx === idx ? '500px' : '0',
                  opacity: openIdx === idx ? 1 : 0,
                }}
              >
                <div className="px-6 pb-4 border-t" style={{ borderColor: '#1E293B' }}>
                  <p className="text-sm sm:text-base leading-relaxed text-[#94A3B8] font-body">
                    {item.a}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="mt-10 p-6 rounded-xl text-center" style={{ background: '#131B2E' }}>
          <p className="text-sm text-[#94A3B8] mb-3">
            {lang === 'es'
              ? '¿No encontraste tu respuesta?'
              : 'Didn\'t find your answer?'}
          </p>
          <button
            className="text-sm font-semibold rounded-lg px-5 py-2.5 transition-all hover:scale-105"
            style={{
              color: '#4F46E5',
              background: 'rgba(99,102,241,0.15)',
            }}
          >
            {lang === 'es' ? 'Contacta soporte' : 'Contact support'}
          </button>
        </div>
      </div>
    </div>
  );
}
