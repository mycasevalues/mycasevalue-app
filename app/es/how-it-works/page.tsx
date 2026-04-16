/**
 * Spanish how-it-works page (/es/how-it-works)
 * Wrapper with Spanish translation
 */

import Link from 'next/link';
import { Metadata } from 'next';
import { SITE_URL } from '../../../lib/site-config';

export const metadata: Metadata = {
  title: 'Cómo Funciona',
  description: 'Cómo MyCaseValue analiza 5.1M+ casos federales para mostrar tasas de victoria, acuerdos, cronogramas y análisis de jueces.',
  alternates: {
    canonical: `${SITE_URL}/es/how-it-works`,
    languages: {
      en: `${SITE_URL}/how-it-works`,
      es: `${SITE_URL}/es/how-it-works`,
    },
  },
  openGraph: {
    title: 'Cómo Funciona',
    description: 'Cómo MyCaseValue analiza datos de casos federales para revelarte información real sobre resultados legales.',
    type: 'website',
    url: `${SITE_URL}/es/how-it-works`,
    locale: 'es_ES',
    siteName: 'MyCaseValue',
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cómo Funciona',
    description: 'Cómo MyCaseValue analiza datos de casos federales para revelarte información real sobre resultados legales.',
  },
};

export default function SpanishHowItWorksPage() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--color-surface-1)' }}>
      {/* Header with Dark Navy Background */}
      <div className="border-b" style={{ background: 'var(--accent-primary)', borderColor: 'var(--border-default)' }}>
        <div className="max-w-5xl mx-auto px-6 py-12 sm:py-16">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 mb-8 text-sm">
            <a href="/es" style={{ color: 'var(--color-surface-0)' }} className="hover:opacity-80 transition-opacity">
              Inicio
            </a>
            <span style={{ color: 'var(--color-surface-0)' }} className="opacity-60">/</span>
            <span style={{ color: 'var(--color-surface-0)' }} className="opacity-80">Cómo Funciona</span>
          </nav>

          {/* Red Accent Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 text-[11px] font-bold tracking-[1.5px] uppercase mb-6"
            style={{ background: 'var(--accent-primary)', color: 'var(--color-surface-0)', borderRadius: '12px' }}>
            PROCESO
          </div>

          <h1 className="text-3xl sm:text-4xl font-display font-extrabold mb-4" style={{ color: 'var(--color-surface-0)' }}>
            Cómo Funciona MyCaseValue
          </h1>
          <p className="text-lg leading-relaxed max-w-2xl" style={{ color: 'var(--color-surface-0)', opacity: 0.9 }}>
            Te mostramos datos reales de resultados federales en 60 segundos. Sin asesoramiento legal. Sin sorpresas.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="space-y-12">

          {/* Step 1 */}
          <section>
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12" style={{ background: 'var(--accent-primary)', color: 'var(--color-surface-0)', borderRadius: '12px' }}>
                  <span className="text-lg font-bold">1</span>
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-display font-bold mb-3" style={{ color: 'var(--color-text-primary)' }}>
                  Describe Tu Caso
                </h2>
                <p style={{ color: 'var(--color-text-secondary)' }} className="text-lg leading-relaxed">
                  Responde preguntas sencillas sobre tu situación: tipo de caso, estado, cuándo sucedió, y si otros están afectados. No se requiere información detallada ni personal.
                </p>
              </div>
            </div>
          </section>

          {/* Step 2 */}
          <section>
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12" style={{ background: 'var(--accent-primary)', color: 'var(--color-surface-0)', borderRadius: '12px' }}>
                  <span className="text-lg font-bold">2</span>
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-display font-bold mb-3" style={{ color: 'var(--color-text-primary)' }}>
                  Aceptas la Divulgación
                </h2>
                <p style={{ color: 'var(--color-text-secondary)' }} className="text-lg leading-relaxed">
                  Confirmas que entiendes que MyCaseValue muestra datos históricos de casos similares, NO una predicción de tu caso específico. No es asesoramiento legal. No hay relación abogado-cliente.
                </p>
              </div>
            </div>
          </section>

          {/* Step 3 */}
          <section>
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12" style={{ background: 'var(--accent-primary)', color: 'var(--color-surface-0)', borderRadius: '12px' }}>
                  <span className="text-lg font-bold">3</span>
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-display font-bold mb-3" style={{ color: 'var(--color-text-primary)' }}>
                  Obtenemos Datos
                </h2>
                <p style={{ color: 'var(--color-text-secondary)' }} className="text-lg leading-relaxed">
                  Nuestro sistema busca en 5.1M+ casos federales del Centro Judicial Federal, CourtListener y PACER para encontrar casos similares al tuyo.
                </p>
              </div>
            </div>
          </section>

          {/* Step 4 */}
          <section>
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12" style={{ background: 'var(--accent-primary)', color: 'var(--color-surface-0)', borderRadius: '12px' }}>
                  <span className="text-lg font-bold">4</span>
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-display font-bold mb-3" style={{ color: 'var(--color-text-primary)' }}>
                  Analizamos Resultados
                </h2>
                <p style={{ color: 'var(--color-text-secondary)' }} className="text-lg leading-relaxed">
                  Analizamos cómo terminaron esos casos: tasas de victoria, acuerdos, desestimaciones, cronogramas típicos y factores que los tribunales consideran.
                </p>
              </div>
            </div>
          </section>

          {/* Step 5 */}
          <section>
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12" style={{ background: 'var(--accent-primary)', color: 'var(--color-surface-0)', borderRadius: '12px' }}>
                  <span className="text-lg font-bold">5</span>
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-display font-bold mb-3" style={{ color: 'var(--color-text-primary)' }}>
                  Tu Informe
                </h2>
                <p style={{ color: 'var(--color-text-secondary)' }} className="text-lg leading-relaxed">
                  Recibe un informe gratuito que muestra lo que sucedió en casos como el tuyo: números, tasas, cronogramas. Premium desbloqueará análisis de jueces y datos de circuitos.
                </p>
              </div>
            </div>
          </section>

        </div>

        {/* Key principles */}
        <section className="mt-16">
          <h2 className="text-3xl font-display font-bold mb-8" style={{ color: 'var(--color-text-primary)' }}>
            Principios Clave
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 border" style={{ borderColor: 'var(--border-default)', background: 'var(--color-surface-0)', borderRadius: '12px' }}>
              <div className="w-12 h-12 flex items-center justify-center mb-4" style={{ background: 'var(--color-surface-1)', borderRadius: '12px' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0052CC" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
              <h3 className="text-lg font-display font-semibold mb-2" style={{ color: 'var(--color-text-primary)' }}>
                Privacidad Extrema
              </h3>
              <p style={{ color: 'var(--color-text-secondary)' }}>
                Cero datos almacenados. Tus búsquedas son anónimas. Encriptado de extremo a extremo.
              </p>
            </div>

            <div className="p-6 border" style={{ borderColor: 'var(--border-default)', background: 'var(--color-surface-0)', borderRadius: '12px' }}>
              <div className="w-12 h-12 flex items-center justify-center mb-4" style={{ background: 'var(--color-surface-1)', borderRadius: '12px' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0052CC" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 6v6l4 2"/>
                </svg>
              </div>
              <h3 className="text-lg font-display font-semibold mb-2" style={{ color: 'var(--color-text-primary)' }}>
                Instantáneo
              </h3>
              <p style={{ color: 'var(--color-text-secondary)' }}>
                Tu informe se genera en 60 segundos. Sin espera. Sin formularios largos.
              </p>
            </div>

            <div className="p-6 border" style={{ borderColor: 'var(--border-default)', background: 'var(--color-surface-0)', borderRadius: '12px' }}>
              <div className="w-12 h-12 flex items-center justify-center mb-4" style={{ background: 'var(--color-surface-1)', borderRadius: '12px' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0052CC" strokeWidth="2">
                  <path d="M9 12l2 2 4-4"/>
                  <circle cx="12" cy="12" r="10"/>
                </svg>
              </div>
              <h3 className="text-lg font-display font-semibold mb-2" style={{ color: 'var(--color-text-primary)' }}>
                Basado en Hechos
              </h3>
              <p style={{ color: 'var(--color-text-secondary)' }}>
                Todos los datos provienen de registros judiciales federales públicos, no opiniones.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="mt-16 text-center p-8 border" style={{ borderColor: 'var(--border-default)', background: 'var(--color-surface-0)', borderRadius: '12px' }}>
          <h2 className="text-2xl font-display font-bold mb-3" style={{ color: 'var(--color-text-primary)' }}>
            Listo para comenzar?
          </h2>
          <p className="mb-6" style={{ color: 'var(--color-text-secondary)' }}>
            Genera tu informe gratuito en 60 segundos. Sin registro requerido.
          </p>
          <a href="/odds"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold transition-all"
            style={{ borderRadius: '20px', background: 'var(--accent-primary)', color: 'var(--color-surface-0)' }}>
            Consultar Mi Caso
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
        </section>

      </div>

      {/* Available Tools Section */}
      <div style={{ background: 'var(--color-surface-0)', borderTop: '1px solid var(--border-default)', padding: '48px 24px' }}>
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl font-display font-bold mb-6" style={{ color: 'var(--color-text-primary)' }}>
            Herramientas Disponibles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link href="/search">
              <div className="p-4 border transition-all hover:shadow-lg" style={{ borderColor: 'var(--border-default)', background: 'var(--color-surface-0)', borderRadius: '12px', cursor: 'pointer' }}>
                <div className="w-10 h-10 flex items-center justify-center mb-3" style={{ background: 'var(--color-surface-1)', borderRadius: '12px' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0052CC" strokeWidth="2">
                    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                  </svg>
                </div>
                <h3 className="font-semibold text-sm" style={{ color: 'var(--color-text-primary)' }}>Buscar Casos</h3>
              </div>
            </Link>

            <Link href="/calculator">
              <div className="p-4 border transition-all hover:shadow-lg" style={{ borderColor: 'var(--border-default)', background: 'var(--color-surface-0)', borderRadius: '12px', cursor: 'pointer' }}>
                <div className="w-10 h-10 flex items-center justify-center mb-3" style={{ background: 'var(--color-surface-1)', borderRadius: '12px' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0052CC" strokeWidth="2">
                    <rect x="4" y="2" width="16" height="20" rx="2"/><path d="M8 6h8M8 10h8M8 14h8M8 18h4"/>
                  </svg>
                </div>
                <h3 className="font-semibold text-sm" style={{ color: 'var(--color-text-primary)' }}>Calculadora</h3>
              </div>
            </Link>

            <Link href="/compare">
              <div className="p-4 border transition-all hover:shadow-lg" style={{ borderColor: 'var(--border-default)', background: 'var(--color-surface-0)', borderRadius: '12px', cursor: 'pointer' }}>
                <div className="w-10 h-10 flex items-center justify-center mb-3" style={{ background: 'var(--color-surface-1)', borderRadius: '12px' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0052CC" strokeWidth="2">
                    <path d="M12 3v18M3 12h18"/><path d="M9 7h2v10H9zM13 14h2v3h-2z"/>
                  </svg>
                </div>
                <h3 className="font-semibold text-sm" style={{ color: 'var(--color-text-primary)' }}>Comparar Tipos</h3>
              </div>
            </Link>

            <Link href="/nos-explorer">
              <div className="p-4 border transition-all hover:shadow-lg" style={{ borderColor: 'var(--border-default)', background: 'var(--color-surface-0)', borderRadius: '12px', cursor: 'pointer' }}>
                <div className="w-10 h-10 flex items-center justify-center mb-3" style={{ background: 'var(--color-surface-1)', borderRadius: '12px' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0052CC" strokeWidth="2">
                    <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M3 21v-5h5"/>
                  </svg>
                </div>
                <h3 className="font-semibold text-sm" style={{ color: 'var(--color-text-primary)' }}>Explorador NOS</h3>
              </div>
            </Link>
          </div>

          {/* Language Switcher */}
          <div className="mt-12 p-6 text-center" style={{ background: 'var(--color-surface-1)', borderRadius: '12px' }}>
            <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
              This page is also available in <Link href="/how-it-works" style={{ color: 'var(--accent-primary-hover)', fontWeight: '500', textDecoration: 'none' }} className="hover:underline">English</Link>
            </p>
          </div>
        </div>
      </div>

      {/* Footer disclaimer */}
      <div className="border-t py-6 text-center" style={{ borderColor: 'var(--border-default)' }}>
        <p className="text-[11px] max-w-xl mx-auto px-6" style={{ color: 'var(--color-text-secondary)' }}>
          MyCaseValue proporciona datos históricos agregados de registros judiciales federales públicos únicamente.
          No somos un bufete de abogados. Esto no es asesoramiento legal. No se crea relación abogado-cliente al usar esta herramienta.
          © {new Date().getFullYear()} MyCaseValue LLC.
        </p>
      </div>
    </div>
  );
}
