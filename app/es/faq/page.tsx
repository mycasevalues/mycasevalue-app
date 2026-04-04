/**
 * Spanish FAQ page (/es/faq)
 * Wrapper with Spanish translations
 */

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Preguntas Frecuentes — MyCaseValue',
  description: 'Preguntas frecuentes sobre MyCaseValue: Cómo funciona, fuentes de datos, si es asesoramiento legal, precisión, precios, privacidad y cómo usar datos de resultados judiciales.',
  alternates: {
    canonical: 'https://www.mycasevalues.com/es/faq',
    languages: {
      en: 'https://www.mycasevalues.com/faq',
      es: 'https://www.mycasevalues.com/es/faq',
    },
  },
  openGraph: {
    title: 'Preguntas Frecuentes — MyCaseValue',
    description: 'Obtén respuestas a preguntas frecuentes sobre datos judicales federales, tasas de victoria, rangos de acuerdos y cómo funciona MyCaseValue.',
    type: 'website',
    url: 'https://www.mycasevalues.com/es/faq',
    locale: 'es_ES',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://www.mycasevalues.com/es' },
        { '@type': 'ListItem', position: 2, name: 'Preguntas Frecuentes', item: 'https://www.mycasevalues.com/es/faq' },
      ],
    },
  ],
};

const faqs = [
  {
    category: 'Primeros Pasos',
    questions: [
      {
        q: '¿Qué es MyCaseValue?',
        a: 'MyCaseValue es una plataforma de investigación que agrega datos de resultados históricos de 5.1M+ casos civiles federales. Proporciona tasas de victoria, porcentajes de acuerdos, cronogramas de casos y rangos de recuperación en 84 tipos de casos. No es asesoramiento legal.',
      },
      {
        q: '¿Cómo funciona MyCaseValue?',
        a: 'Busca tu tipo de caso → ve instantáneamente datos de resultados agregados (tasas de victoria, rangos de acuerdos, cronogramas) → descarga un informe detallado. El proceso toma segundos. No se requiere registro para búsquedas básicas.',
      },
      {
        q: '¿Qué tipos de casos cubre MyCaseValue?',
        a: 'Cubrimos 84 categorías de casos federales incluyendo discriminación laboral, lesiones personales, disputas contractuales, propiedad intelectual, derechos civiles, litigios de valores, responsabilidad de productos, protección del consumidor y muchos más. Visita nuestra guía de tipos de casos para la lista completa.',
      },
    ],
  },
  {
    category: 'Aspectos Legales y Responsabilidad',
    questions: [
      {
        q: '¿Es MyCaseValue asesoramiento legal?',
        a: 'No. MyCaseValue proporciona datos estadísticos agregados de registros judiciales públicos únicamente. No evalúa casos individuales, ofrece opiniones legales, hace predicciones sobre tu caso específico, ni crea una relación abogado-cliente. Siempre consulta a un abogado con licencia para asesoramiento legal.',
      },
      {
        q: '¿Debo usar MyCaseValue en lugar de contratar a un abogado?',
        a: 'No. MyCaseValue proporciona datos de investigación de fondo, no asesoramiento legal. Si estás involucrado en una disputa legal o considerando un pleito, debes consultar a un abogado con licencia. MyCaseValue puede ayudarte a hacer mejores preguntas y entender el panorama, pero no puede reemplazar el asesoramiento legal profesional.',
      },
      {
        q: '¿Puede MyCaseValue predecir lo que vale mi caso?',
        a: 'No. MyCaseValue muestra promedios e intervalos históricos de casos anteriores, pero no puede valorar tu caso específico. Los resultados de los casos dependen de hechos únicos, partes involucradas, evidencia y decisiones de jueces/jurados. Consulta a un abogado con licencia para evaluación de casos.',
      },
    ],
  },
  {
    category: 'Datos y Precisión',
    questions: [
      {
        q: '¿De dónde provienen los datos?',
        a: 'Nuestros datos se obtienen de tres sistemas oficiales de registros judiciales federales: la Base de Datos Integrada del Centro Judicial Federal (FJC), CourtListener y PACER (Acceso Público a Registros Electrónicos de Tribunales). Todos los datos de fuente están en el dominio público.',
      },
      {
        q: '¿Qué tan precisos son los datos?',
        a: 'Nuestros datos provienen directamente de registros judiciales federales oficiales (FJC IDB, CourtListener, PACER) con controles de calidad automatizados. Sin embargo, todas las estadísticas tienen limitaciones: la codificación de resultados puede no capturar victorias parciales o acuerdos complejos, y los resultados pasados no garantizan resultados futuros.',
      },
      {
        q: '¿Qué es una "tasa de victoria"?',
        a: 'La tasa de victoria es el porcentaje de casos donde el demandante recibió un veredicto a su favor (veredicto del demandante). Las tasas de victoria no incluyen acuerdos, desestimaciones o transferencias, solo sentencias finales. Representan resultados históricos y no predicen resultados futuros.',
      },
      {
        q: '¿Por qué no muestran montos de acuerdos?',
        a: 'Los registros judiciales federales no reportan sistemáticamente montos de acuerdos, ya que la mayoría de acuerdos son confidenciales. Los rangos de recuperación mostrados en MyCaseValue provienen solo de casos donde los premios monetarios fueron documentados públicamente (sentencias, órdenes de consentimiento). Esta es una limitación de los datos, no de nuestra herramienta.',
      },
      {
        q: '¿Qué tan antiguos son los datos?',
        a: 'Nuestro conjunto de datos incluye casos federales que se remontan a 50+ años (desde 1970), con actualizaciones trimestrales del Centro Judicial Federal. Las tendencias históricas son visibles en nuestros datos, pero recuerda: los resultados pasados no predicen resultados futuros.',
      },
      {
        q: '¿Con qué frecuencia se actualizan los datos?',
        a: 'El Centro Judicial Federal publica datos de casos trimestralmente. Ingerimos y procesamos estas actualizaciones para reflejar las estadísticas más recientes disponibles de casos federales. Típicamente hay un retraso de 1-2 meses entre el cierre del caso y la publicación pública.',
      },
    ],
  },
  {
    category: 'Cobertura y Alcance',
    questions: [
      {
        q: '¿Qué tribunales están cubiertos?',
        a: 'MyCaseValue cubre casos civiles federales en los 94 tribunales de distrito federales y datos de apelaciones. Esto incluye tribunales de distrito federales, tribunales de circuito y apelaciones. Los tribunales estatales y locales no se incluyen en nuestro conjunto de datos.',
      },
      {
        q: '¿Por qué varían los resultados por circuito?',
        a: 'Diferentes circuitos federales (tribunales de apelación regional) tienen diferentes jueces, mezcla de casos e interpretaciones legales. Estos factores crean diferencias de resultados mensurables. Las tasas de victoria y patrones de acuerdos pueden variar significativamente por circuito y distrito.',
      },
      {
        q: '¿Puedo usar datos de MyCaseValue en la corte?',
        a: 'Los datos de MyCaseValue derivan de registros judiciales federales públicos y resúmenes estadísticos. Los tribunales pueden aceptar estadísticas de resultados agregados como evidencia de fondo en algunos contextos, pero debes consultar a tu abogado sobre el uso de datos de cualquier herramienta de investigación en procedimientos legales.',
      },
    ],
  },
  {
    category: 'Precios y Acceso',
    questions: [
      {
        q: '¿Cuánto cuesta MyCaseValue?',
        a: 'Los informes básicos son completamente gratuitos. Los informes premium con análisis detallados, desgloses por circuito/juez y herramientas de comparación cuestan $5.99 por un informe individual o $29.99/mes para acceso ilimitado.',
      },
      {
        q: '¿Necesito crear una cuenta?',
        a: 'No. Puedes buscar y ver informes básicos sin registrarte. Para comprar informes premium o guardar búsquedas, puedes crear una cuenta gratuita.',
      },
      {
        q: '¿Puedo descargar todos los datos?',
        a: 'Los informes individuales se pueden exportar como PDFs. No ofrecemos descargas de datos en masa. Si necesitas acceso en masa a datos de casos federales, puedes acceder directamente a los datos sin procesar del Centro Judicial Federal en fjc.gov.',
      },
      {
        q: '¿Tienen una API?',
        a: 'Actualmente, MyCaseValue está disponible solo a través de nuestra plataforma web. Estamos explorando acceso a API para instituciones de investigación y profesionales legales. Contáctanos en support@mycasevalue.com si estás interesado.',
      },
    ],
  },
  {
    category: 'Privacidad y Seguridad',
    questions: [
      {
        q: '¿Qué información recopilan sobre mí?',
        a: 'MyCaseValue recopila datos mínimos: tus consultas de búsqueda, qué tipos de casos investigas y análisis básicos de uso (vistas de página, duración de sesión). No rastreamos tu identidad, ubicación o comportamiento del navegador en otros sitios. No vendemos ni compartimos tus datos.',
      },
      {
        q: '¿Tienen una política de privacidad?',
        a: 'Sí. Nuestra política de privacidad completa está disponible en https://mycasevalues.com/privacy. Explica exactamente qué datos recopilamos, cómo los usamos y tus derechos.',
      },
      {
        q: '¿Mi investigación es privada?',
        a: 'Sí. No identificamos ni rastreamos a usuarios individuales. Tus búsquedas son anónimas a menos que crees una cuenta. No vendemos datos a terceros.',
      },
      {
        q: '¿Usas cookies?',
        a: 'Usamos cookies esenciales para funcionalidad básica del sitio y cookies de análisis opcionales para entender cómo se usa nuestra herramienta. Controlas las preferencias de cookies en la configuración de tu navegador.',
      },
    ],
  },
];

export default function SpanishFAQPage() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-base)' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header */}
      <div className="border-b" style={{ borderColor: 'var(--border-default)', background: 'linear-gradient(180deg, #FFFFFF 0%, var(--bg-base) 100%)' }}>
        <div className="max-w-3xl mx-auto px-6 py-16 sm:py-24">
          <a href="/es" className="inline-flex items-center gap-2 text-sm font-semibold mb-6 transition-colors hover:opacity-80" style={{ color: '#111111' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            Volver a MyCaseValue
          </a>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-bold tracking-[1.5px] uppercase mb-4"
            style={{ background: 'rgba(17,17,17,0.15)', color: '#111111' }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            PREGUNTAS FRECUENTES
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-extrabold mb-4" style={{ color: '#111111', letterSpacing: '-1.5px' }}>
            Preguntas Frecuentes
          </h1>
          <p className="text-lg leading-relaxed max-w-2xl" style={{ color: '#6B7280' }}>
            Obtén respuestas a preguntas frecuentes sobre MyCaseValue, datos judicales federales y cómo usar estadísticas de resultados.
          </p>
        </div>
      </div>

      {/* FAQ Content */}
      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="space-y-12">
          {faqs.map((section, sectionIdx) => (
            <section key={sectionIdx}>
              <h2 className="text-xl font-display font-bold mb-6" style={{ color: '#111111' }}>
                {section.category}
              </h2>
              <div className="space-y-3">
                {section.questions.map((faq, qIdx) => (
                  <details
                    key={qIdx}
                    className="group p-5 rounded-xl border transition-colors cursor-pointer"
                    style={{
                      borderColor: 'var(--border-default)',
                      background: '#FFFFFF',
                    }}
                  >
                    <summary className="flex items-start justify-between font-semibold select-none" style={{ color: '#111111' }}>
                      <span className="flex-1 text-base leading-relaxed pr-4">
                        {faq.q}
                      </span>
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="flex-shrink-0 transition-transform group-open:rotate-180"
                        style={{ color: '#111111', marginTop: '2px' }}
                      >
                        <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    </summary>
                    <div className="pt-4 mt-4 border-t" style={{ borderColor: 'var(--border-default)' }}>
                      <p className="text-sm leading-relaxed" style={{ color: '#6B7280' }}>
                        {faq.a}
                      </p>
                    </div>
                  </details>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Still have questions */}
        <div className="mt-16 text-center p-8 rounded-xl border" style={{ borderColor: 'var(--border-default)', background: 'linear-gradient(135deg, #FFFFFF 0%, #FFFFFF 100%)' }}>
          <h2 className="text-2xl font-display font-bold mb-3" style={{ color: '#111111' }}>
            ¿Aún tienes preguntas?
          </h2>
          <p className="mb-6" style={{ color: '#6B7280' }}>
            Ponte en contacto con nuestro equipo de soporte.
          </p>
          <a href="mailto:support@mycasevalue.com"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors"
            style={{ background: '#FFFFFF', border: '1px solid #334155', color: '#111111' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            Contactar Soporte
          </a>
        </div>
      </div>

      {/* Footer disclaimer */}
      <div className="border-t py-6 text-center" style={{ borderColor: 'var(--border-default)' }}>
        <p className="text-[11px] max-w-xl mx-auto px-6" style={{ color: '#6B7280' }}>
          MyCaseValue proporciona datos históricos agregados de registros judiciales federales públicos únicamente para fines informativos y de investigación.
          Esto no es asesoramiento legal. No se crea relación abogado-cliente al usar esta herramienta.
          © {new Date().getFullYear()} MyCaseValue LLC.
        </p>
      </div>
    </div>
  );
}
