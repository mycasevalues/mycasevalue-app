/**
 * Spanish FAQ page (/es/faq)
 * Wrapper with Spanish translations
 */

import Link from 'next/link';
import { Metadata } from 'next';
import { SITE_URL } from '../../../lib/site-config';

export const metadata: Metadata = {
  title: 'Preguntas Frecuentes',
  description: 'Preguntas frecuentes sobre MyCaseValue: Cómo funciona, fuentes de datos, si es asesoramiento legal, precisión, precios, privacidad y cómo usar datos de resultados judiciales.',
  alternates: {
    canonical: `${SITE_URL}/es/faq`,
    languages: {
      en: `${SITE_URL}/faq`,
      es: `${SITE_URL}/es/faq`,
    },
  },
  openGraph: {
    title: 'Preguntas Frecuentes',
    description: 'Obtén respuestas a preguntas frecuentes sobre datos judiciales federales, tasas de victoria, rangos de acuerdos y cómo funciona MyCaseValue.',
    type: 'website',
    url: `${SITE_URL}/es/faq`,
    locale: 'es_ES',
    siteName: 'MyCaseValue',
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Preguntas Frecuentes',
    description: 'Obtén respuestas a preguntas frecuentes sobre datos judiciales federales, tasas de victoria, rangos de acuerdos.',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${SITE_URL}/es` },
        { '@type': 'ListItem', position: 2, name: 'Preguntas Frecuentes', item: `${SITE_URL}/es/faq` },
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
        a: 'La tasa de victoria es el porcentaje de casos donde la parte actora recibió un veredicto favorable. Las tasas de victoria no incluyen acuerdos, desestimaciones o transferencias, solo sentencias finales. Representan resultados históricos y no predicen resultados futuros.',
      },
      {
        q: '¿Por qué no muestran montos de acuerdos?',
        a: 'Los registros judiciales federales no reportan sistemáticamente montos de acuerdos, ya que la mayoría de acuerdos son confidenciales. Los rangos de recuperación mostrados en MyCaseValue provienen solo de casos donde los premios monetarios fueron documentados públicamente (sentencias, órdenes de consentimiento). Esta es una limitación de los datos, no de nuestra herramienta.',
      },
      {
        q: '¿Qué tan antiguos son los datos?',
        a: 'Nuestro conjunto de datos incluye casos federales que se remontan a 55+ años (1970–2025), con actualizaciones trimestrales del Centro Judicial Federal. Las tendencias históricas son visibles en nuestros datos, pero recuerda: los resultados pasados no predicen resultados futuros.',
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
        a: 'MyCaseValue cubre casos civiles federales en los 95 tribunales de distrito federales y datos de apelaciones. Esto incluye tribunales de distrito federales, tribunales de circuito y apelaciones. Los tribunales estatales y locales no se incluyen en nuestro conjunto de datos.',
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
        a: 'Los informes básicos son completamente gratuitos. Los informes premium cuestan $5.99 por un informe individual, $9.99/mes por informes ilimitados, o $29.99/mes para Modo Abogado con análisis avanzados y acceso a la API.',
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
        a: 'Actualmente, MyCaseValue está disponible solo a través de nuestra plataforma web. Estamos explorando acceso a API para instituciones de investigación y profesionales legales. Contáctanos en support@mycasevalues.com si estás interesado.',
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
    <div className="min-h-screen" style={{ background: 'var(--color-surface-1)' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header with Dark Navy Background */}
      <div className="border-b" style={{ background: 'var(--accent-primary)', borderColor: 'var(--border-default)' }}>
        <div className="max-w-3xl mx-auto px-6 py-12 sm:py-16">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 mb-8 text-sm">
            <a href="/es" style={{ color: 'var(--color-surface-0)' }} className="hover:opacity-80 transition-opacity">
              Inicio
            </a>
            <span style={{ color: 'var(--color-surface-0)' }} className="opacity-60">/</span>
            <span style={{ color: 'var(--color-surface-0)' }} className="opacity-80">Preguntas Frecuentes</span>
          </nav>

          {/* Red Accent Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 text-[11px] font-bold tracking-[1.5px] uppercase mb-6"
            style={{ background: 'var(--accent-primary)', color: 'var(--color-surface-0)', borderRadius: '2px' }}>
            AYUDA
          </div>

          <h1 className="text-3xl sm:text-4xl font-legal font-extrabold mb-4" style={{ color: 'var(--color-surface-0)' }}>
            Preguntas Frecuentes
          </h1>
          <p className="text-lg leading-relaxed max-w-2xl" style={{ color: 'var(--color-surface-0)', opacity: 0.9 }}>
            Obtén respuestas a preguntas frecuentes sobre MyCaseValue, datos judiciales federales y cómo usar estadísticas de resultados.
          </p>
        </div>
      </div>

      {/* FAQ Content */}
      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="space-y-12">
          {faqs.map((section, sectionIdx) => (
            <section key={sectionIdx}>
              <h2 className="text-xl font-legal font-bold mb-6" style={{ color: 'var(--color-text-primary)' }}>
                {section.category}
              </h2>
              <div className="space-y-3">
                {section.questions.map((faq, qIdx) => (
                  <details
                    key={qIdx}
                    className="group p-5 border transition-colors cursor-pointer"
                    style={{
                      borderRadius: '4px',
                      borderColor: 'var(--border-default)',
                      background: 'var(--color-surface-0)',
                    }}
                  >
                    <summary className="flex items-start justify-between font-semibold select-none" style={{ color: 'var(--color-text-primary)' }}>
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
                        style={{ color: 'var(--color-text-primary)', marginTop: '2px' }}
                      >
                        <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    </summary>
                    <div className="pt-4 mt-4 border-t" style={{ borderColor: 'var(--border-default)' }}>
                      <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
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
        <div className="mt-16 text-center p-8 border" style={{ borderColor: 'var(--border-default)', background: 'var(--color-surface-0)', borderRadius: '4px' }}>
          <h2 className="text-2xl font-legal font-bold mb-3" style={{ color: 'var(--color-text-primary)' }}>
            ¿Aún tienes preguntas?
          </h2>
          <p className="mb-6" style={{ color: 'var(--color-text-secondary)' }}>
            Ponte en contacto con nuestro equipo de soporte.
          </p>
          <a href="mailto:support@mycasevalues.com"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold transition-colors"
            style={{ borderRadius: '4px', background: 'var(--color-surface-0)', border: '1px solid var(--border-default)', color: 'var(--gold)' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            Contactar Soporte
          </a>
        </div>
      </div>

      {/* Available Tools Section */}
      <div style={{ background: 'var(--color-surface-0)', borderTop: '1px solid var(--border-default)', padding: '48px 24px' }}>
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-2xl font-legal font-bold mb-6" style={{ color: 'var(--color-text-primary)' }}>
            Herramientas Disponibles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link href="/search">
              <div className="p-4 border transition-all hover:shadow-lg" style={{ borderColor: 'var(--border-default)', background: 'var(--color-surface-0)', borderRadius: '4px', cursor: 'pointer' }}>
                <div className="w-10 h-10 flex items-center justify-center mb-3" style={{ background: 'var(--color-surface-1)', borderRadius: '4px' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--link)" strokeWidth="2">
                    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                  </svg>
                </div>
                <h3 className="font-semibold text-sm" style={{ color: 'var(--color-text-primary)' }}>Buscar Casos</h3>
              </div>
            </Link>

            <Link href="/calculator">
              <div className="p-4 border transition-all hover:shadow-lg" style={{ borderColor: 'var(--border-default)', background: 'var(--color-surface-0)', borderRadius: '4px', cursor: 'pointer' }}>
                <div className="w-10 h-10 flex items-center justify-center mb-3" style={{ background: 'var(--color-surface-1)', borderRadius: '4px' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--link)" strokeWidth="2">
                    <rect x="4" y="2" width="16" height="20" rx="2"/><path d="M8 6h8M8 10h8M8 14h8M8 18h4"/>
                  </svg>
                </div>
                <h3 className="font-semibold text-sm" style={{ color: 'var(--color-text-primary)' }}>Calculadora</h3>
              </div>
            </Link>

            <Link href="/compare">
              <div className="p-4 border transition-all hover:shadow-lg" style={{ borderColor: 'var(--border-default)', background: 'var(--color-surface-0)', borderRadius: '4px', cursor: 'pointer' }}>
                <div className="w-10 h-10 flex items-center justify-center mb-3" style={{ background: 'var(--color-surface-1)', borderRadius: '4px' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--link)" strokeWidth="2">
                    <path d="M12 3v18M3 12h18"/><path d="M9 7h2v10H9zM13 14h2v3h-2z"/>
                  </svg>
                </div>
                <h3 className="font-semibold text-sm" style={{ color: 'var(--color-text-primary)' }}>Comparar Tipos</h3>
              </div>
            </Link>

            <Link href="/nos-explorer">
              <div className="p-4 border transition-all hover:shadow-lg" style={{ borderColor: 'var(--border-default)', background: 'var(--color-surface-0)', borderRadius: '4px', cursor: 'pointer' }}>
                <div className="w-10 h-10 flex items-center justify-center mb-3" style={{ background: 'var(--color-surface-1)', borderRadius: '4px' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--link)" strokeWidth="2">
                    <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M3 21v-5h5"/>
                  </svg>
                </div>
                <h3 className="font-semibold text-sm" style={{ color: 'var(--color-text-primary)' }}>Explorador NOS</h3>
              </div>
            </Link>
          </div>

          {/* Language Switcher */}
          <div className="mt-12 p-6 text-center" style={{ background: 'var(--color-surface-1)', borderRadius: '4px' }}>
            <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
              This page is also available in <Link href="/faq" style={{ color: 'var(--gold)', fontWeight: '500', textDecoration: 'none' }} className="hover:underline">English</Link>
            </p>
          </div>
        </div>
      </div>

      {/* Footer disclaimer */}
      <div className="border-t py-6 text-center" style={{ borderColor: 'var(--border-default)' }}>
        <p className="text-[11px] max-w-xl mx-auto px-6" style={{ color: 'var(--color-text-secondary)' }}>
          MyCaseValue proporciona datos históricos agregados de registros judiciales federales públicos únicamente para fines informativos y de investigación.
          Esto no es asesoramiento legal. No se crea relación abogado-cliente al usar esta herramienta.
          © {new Date().getFullYear()} MyCaseValue LLC.
        </p>
      </div>
    </div>
  );
}
