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
    title: 'Cómo Funciona — MyCaseValue',
    description: 'Cómo MyCaseValue analiza datos de casos federales para revelarte información real sobre resultados legales.',
    type: 'website',
    url: `${SITE_URL}/es/how-it-works`,
    locale: 'es_ES',
    siteName: 'MyCaseValue',
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cómo Funciona — MyCaseValue',
    description: 'Cómo MyCaseValue analiza datos de casos federales para revelarte información real sobre resultados legales.',
  },
};

export default function SpanishHowItWorksPage() {
  return (
    <div className="min-h-screen" style={{ background: '#F7F8FA' }}>
      {/* Header with Dark Navy Background */}
      <div className="border-b" style={{ background: '#0966C3', borderColor: '#E5E7EB' }}>
        <div className="max-w-5xl mx-auto px-6 py-12 sm:py-16">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 mb-8 text-sm">
            <a href="/es" style={{ color: '#FFFFFF' }} className="hover:opacity-80 transition-opacity">
              Inicio
            </a>
            <span style={{ color: '#FFFFFF' }} className="opacity-60">/</span>
            <span style={{ color: '#FFFFFF' }} className="opacity-80">Cómo Funciona</span>
          </nav>

          {/* Red Accent Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 text-[11px] font-bold tracking-[1.5px] uppercase mb-6"
            style={{ background: '#0966C3', color: '#FFFFFF', borderRadius: '12px' }}>
            PROCESO
          </div>

          <h1 className="text-3xl sm:text-4xl font-display font-extrabold mb-4" style={{ color: '#FFFFFF' }}>
            Cómo Funciona MyCaseValue
          </h1>
          <p className="text-lg leading-relaxed max-w-2xl" style={{ color: '#FFFFFF', opacity: 0.9 }}>
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
                <div className="flex items-center justify-center h-12 w-12" style={{ background: '#0966C3', color: 'white', borderRadius: '12px' }}>
                  <span className="text-lg font-bold">1</span>
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-display font-bold mb-3" style={{ color: '#0f0f0f' }}>
                  Describe Tu Caso
                </h2>
                <p style={{ color: '#4B5563' }} className="text-lg leading-relaxed">
                  Responde preguntas sencillas sobre tu situación: tipo de caso, estado, cuándo sucedió, y si otros están afectados. No se requiere información detallada ni personal.
                </p>
              </div>
            </div>
          </section>

          {/* Step 2 */}
          <section>
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12" style={{ background: '#0966C3', color: 'white', borderRadius: '12px' }}>
                  <span className="text-lg font-bold">2</span>
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-display font-bold mb-3" style={{ color: '#0f0f0f' }}>
                  Aceptas la Divulgación
                </h2>
                <p style={{ color: '#4B5563' }} className="text-lg leading-relaxed">
                  Confirmas que entiendes que MyCaseValue muestra datos históricos de casos similares, NO una predicción de tu caso específico. No es asesoramiento legal. No hay relación abogado-cliente.
                </p>
              </div>
            </div>
          </section>

          {/* Step 3 */}
          <section>
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12" style={{ background: '#0966C3', color: 'white', borderRadius: '12px' }}>
                  <span className="text-lg font-bold">3</span>
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-display font-bold mb-3" style={{ color: '#0f0f0f' }}>
                  Obtenemos Datos
                </h2>
                <p style={{ color: '#4B5563' }} className="text-lg leading-relaxed">
                  Nuestro sistema busca en 5.1M+ casos federales del Centro Judicial Federal, CourtListener y PACER para encontrar casos similares al tuyo.
                </p>
              </div>
            </div>
          </section>

          {/* Step 4 */}
          <section>
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12" style={{ background: '#0966C3', color: 'white', borderRadius: '12px' }}>
                  <span className="text-lg font-bold">4</span>
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-display font-bold mb-3" style={{ color: '#0f0f0f' }}>
                  Analizamos Resultados
                </h2>
                <p style={{ color: '#4B5563' }} className="text-lg leading-relaxed">
                  Analizamos cómo terminaron esos casos: tasas de victoria, acuerdos, desestimaciones, cronogramas típicos y factores que los tribunales consideran.
                </p>
              </div>
            </div>
          </section>

          {/* Step 5 */}
          <section>
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12" style={{ background: '#0966C3', color: 'white', borderRadius: '12px' }}>
                  <span className="text-lg font-bold">5</span>
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-display font-bold mb-3" style={{ color: '#0f0f0f' }}>
                  Tu Informe
                </h2>
                <p style={{ color: '#4B5563' }} className="text-lg leading-relaxed">
                  Recibe un informe gratuito que muestra lo que sucedió en casos como el tuyo: números, tasas, cronogramas. Premium desbloqueará análisis de jueces y datos de circuitos.
                </p>
              </div>
            </div>
          </section>

        </div>

        {/* Key principles */}
        <section className="mt-16">
          <h2 className="text-3xl font-display font-bold mb-8" style={{ color: '#0f0f0f' }}>
            Principios Clave
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 border" style={{ borderColor: '#E5E7EB', background: '#FFFFFF', borderRadius: '12px' }}>
              <div className="w-12 h-12 flex items-center justify-center mb-4" style={{ background: '#F7F8FA', borderRadius: '12px' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#004182" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
              <h3 className="text-lg font-display font-semibold mb-2" style={{ color: '#0f0f0f' }}>
                Privacidad Extrema
              </h3>
              <p style={{ color: '#4B5563' }}>
                Cero datos almacenados. Tus búsquedas son anónimas. Encriptado de extremo a extremo.
              </p>
            </div>

            <div className="p-6 border" style={{ borderColor: '#E5E7EB', background: '#FFFFFF', borderRadius: '12px' }}>
              <div className="w-12 h-12 flex items-center justify-center mb-4" style={{ background: '#F7F8FA', borderRadius: '12px' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#004182" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 6v6l4 2"/>
                </svg>
              </div>
              <h3 className="text-lg font-display font-semibold mb-2" style={{ color: '#0f0f0f' }}>
                Instantáneo
              </h3>
              <p style={{ color: '#4B5563' }}>
                Tu informe se genera en 60 segundos. Sin espera. Sin formularios largos.
              </p>
            </div>

            <div className="p-6 border" style={{ borderColor: '#E5E7EB', background: '#FFFFFF', borderRadius: '12px' }}>
              <div className="w-12 h-12 flex items-center justify-center mb-4" style={{ background: '#F7F8FA', borderRadius: '12px' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#004182" strokeWidth="2">
                  <path d="M9 12l2 2 4-4"/>
                  <circle cx="12" cy="12" r="10"/>
                </svg>
              </div>
              <h3 className="text-lg font-display font-semibold mb-2" style={{ color: '#0f0f0f' }}>
                Basado en Hechos
              </h3>
              <p style={{ color: '#4B5563' }}>
                Todos los datos provienen de registros judiciales federales públicos, no opiniones.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="mt-16 text-center p-8 border" style={{ borderColor: '#E5E7EB', background: '#FFFFFF', borderRadius: '12px' }}>
          <h2 className="text-2xl font-display font-bold mb-3" style={{ color: '#0f0f0f' }}>
            Listo para comenzar?
          </h2>
          <p className="mb-6" style={{ color: '#4B5563' }}>
            Genera tu informe gratuito en 60 segundos. Sin registro requerido.
          </p>
          <a href="/odds"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold transition-all"
            style={{ borderRadius: '20px', background: '#0966C3', color: '#FFFFFF' }}>
            Consultar Mi Caso
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
        </section>

      </div>

      {/* Available Tools Section */}
      <div style={{ background: '#FFFFFF', borderTop: '1px solid #E5E7EB', padding: '48px 24px' }}>
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl font-display font-bold mb-6" style={{ color: '#0f0f0f' }}>
            Herramientas Disponibles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link href="/search">
              <div className="p-4 border transition-all hover:shadow-lg" style={{ borderColor: '#E5E7EB', background: '#FFFFFF', borderRadius: '12px', cursor: 'pointer' }}>
                <div className="w-10 h-10 flex items-center justify-center mb-3" style={{ background: '#F7F8FA', borderRadius: '12px' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#004182" strokeWidth="2">
                    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                  </svg>
                </div>
                <h3 className="font-semibold text-sm" style={{ color: '#0f0f0f' }}>Buscar Casos</h3>
              </div>
            </Link>

            <Link href="/calculator">
              <div className="p-4 border transition-all hover:shadow-lg" style={{ borderColor: '#E5E7EB', background: '#FFFFFF', borderRadius: '12px', cursor: 'pointer' }}>
                <div className="w-10 h-10 flex items-center justify-center mb-3" style={{ background: '#F7F8FA', borderRadius: '12px' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#004182" strokeWidth="2">
                    <rect x="4" y="2" width="16" height="20" rx="2"/><path d="M8 6h8M8 10h8M8 14h8M8 18h4"/>
                  </svg>
                </div>
                <h3 className="font-semibold text-sm" style={{ color: '#0f0f0f' }}>Calculadora</h3>
              </div>
            </Link>

            <Link href="/compare">
              <div className="p-4 border transition-all hover:shadow-lg" style={{ borderColor: '#E5E7EB', background: '#FFFFFF', borderRadius: '12px', cursor: 'pointer' }}>
                <div className="w-10 h-10 flex items-center justify-center mb-3" style={{ background: '#F7F8FA', borderRadius: '12px' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#004182" strokeWidth="2">
                    <path d="M12 3v18M3 12h18"/><path d="M9 7h2v10H9zM13 14h2v3h-2z"/>
                  </svg>
                </div>
                <h3 className="font-semibold text-sm" style={{ color: '#0f0f0f' }}>Comparar Tipos</h3>
              </div>
            </Link>

            <Link href="/nos-explorer">
              <div className="p-4 border transition-all hover:shadow-lg" style={{ borderColor: '#E5E7EB', background: '#FFFFFF', borderRadius: '12px', cursor: 'pointer' }}>
                <div className="w-10 h-10 flex items-center justify-center mb-3" style={{ background: '#F7F8FA', borderRadius: '12px' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#004182" strokeWidth="2">
                    <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M3 21v-5h5"/>
                  </svg>
                </div>
                <h3 className="font-semibold text-sm" style={{ color: '#0f0f0f' }}>Explorador NOS</h3>
              </div>
            </Link>
          </div>

          {/* Language Switcher */}
          <div className="mt-12 p-6 text-center" style={{ background: '#F7F8FA', borderRadius: '12px' }}>
            <p className="text-sm" style={{ color: '#4B5563' }}>
              This page is also available in <Link href="/how-it-works" style={{ color: '#004182', fontWeight: '500', textDecoration: 'none' }} className="hover:underline">English</Link>
            </p>
          </div>
        </div>
      </div>

      {/* Footer disclaimer */}
      <div className="border-t py-6 text-center" style={{ borderColor: '#E5E7EB' }}>
        <p className="text-[11px] max-w-xl mx-auto px-6" style={{ color: '#4B5563' }}>
          MyCaseValue proporciona datos históricos agregados de registros judiciales federales públicos únicamente.
          No somos un bufete de abogados. Esto no es asesoramiento legal. No se crea relación abogado-cliente al usar esta herramienta.
          © {new Date().getFullYear()} MyCaseValue LLC.
        </p>
      </div>
    </div>
  );
}
