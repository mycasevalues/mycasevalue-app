/**
 * Spanish trends page (/es/trends)
 */

import Link from 'next/link';
import { Metadata } from 'next';
import { SITE_URL } from '../../../lib/site-config';

export const metadata: Metadata = {
  title: 'Tendencias',
  description: 'Tendencias en demandas federales año tras año. Análisis de qué tipos de casos están aumentando en los tribunales federales.',
  alternates: {
    canonical: `${SITE_URL}/es/trends`,
    languages: {
      en: `${SITE_URL}/trends`,
      es: `${SITE_URL}/es/trends`,
    },
  },
  openGraph: {
    locale: 'es_ES',
    title: 'Tendencias',
    description: 'Tendencias en demandas federales año tras año. Análisis de qué tipos de casos están aumentando en los tribunales federales.',
    url: `${SITE_URL}/es/trends`,
    type: 'website',
    siteName: 'MyCaseValue',
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tendencias',
    description: 'Tendencias en demandas federales año tras año. Análisis de qué tipos de casos están aumentando.',
  },
};

export default function SpanishTrendsPage() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--surf)' }}>
      {/* Header with Dark Navy Background */}
      <div className="border-b" style={{ background: 'var(--link)', borderColor: 'var(--bdr)' }}>
        <div className="max-w-5xl mx-auto px-6 py-12 sm:py-16">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 mb-8" style={{ fontSize: 14 }}>
            <a href="/es" style={{ color: 'var(--card)' }} className="hover:opacity-80 transition-opacity">
              Inicio
            </a>
            <span style={{ color: 'var(--card)' }} className="opacity-60">/</span>
            <span style={{ color: 'var(--card)' }} className="opacity-80">Tendencias</span>
          </nav>

          {/* Red Accent Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 text-[11px] tracking-[1.5px] uppercase mb-6"
 style={{ background: 'var(--link)', color: 'var(--card)', borderRadius: '2px', fontWeight: 700 }}>
            ANÁLISIS
          </div>

          <h1 className="font-legal mb-4" style={{ color: 'var(--card)', fontSize: 28, fontWeight: 700 }}>
            Tendencias en Casos Federales
          </h1>
          <p className="leading-relaxed max-w-2xl" style={{ color: 'var(--card)', opacity: 0.9, fontSize: 16 }}>
            Explora cómo están evolucionando los litigios federales año tras año.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="text-center p-8 border" style={{ borderColor: 'var(--bdr)', background: 'var(--card)', borderRadius: '4px' }}>
          <p style={{ color: 'var(--text2)' }}>
            Espera a que se carguen los gráficos interactivos...
          </p>
        </div>

        {/* Key Stats */}
        <section className="mt-16">
          <h2 className="font-legal mb-8 text-center" style={{ color: 'var(--text1)', fontSize: 20, fontWeight: 700 }}>
            Datos Clave
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 border text-center" style={{ borderColor: 'var(--bdr)', background: 'var(--card)', borderRadius: '4px' }}>
              <div className="mb-2" style={{ color: 'var(--link)', fontSize: 28, fontWeight: 700 }}>5.1M+</div>
              <p style={{ color: 'var(--text2)', fontSize: 14 }}>Casos federales analizados</p>
            </div>

            <div className="p-6 border text-center" style={{ borderColor: 'var(--bdr)', background: 'var(--card)', borderRadius: '4px' }}>
              <div className="mb-2" style={{ color: 'var(--gold)', fontSize: 28, fontWeight: 700 }}>84</div>
              <p style={{ color: 'var(--text2)', fontSize: 14 }}>Tipos de casos cubiertos</p>
            </div>

            <div className="p-6 border text-center" style={{ borderColor: 'var(--bdr)', background: 'var(--card)', borderRadius: '4px' }}>
              <div className="mb-2" style={{ color: 'var(--link)', fontSize: 28, fontWeight: 700 }}>94</div>
              <p style={{ color: 'var(--text2)', fontSize: 14 }}>Distritos federales</p>
            </div>

            <div className="p-6 border text-center" style={{ borderColor: 'var(--bdr)', background: 'var(--card)', borderRadius: '4px' }}>
              <div className="mb-2" style={{ color: 'var(--gold)', fontSize: 28, fontWeight: 700 }}>Gratis</div>
              <p style={{ color: 'var(--text2)', fontSize: 14 }}>Durante el lanzamiento</p>
            </div>
          </div>
        </section>
      </div>

      {/* Available Tools Section */}
      <div style={{ background: 'var(--card)', borderTop: '1px solid var(--bdr)', padding: '48px 24px' }}>
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="font-legal mb-6" style={{ color: 'var(--text1)', fontSize: 20, fontWeight: 700 }}>
            Herramientas Disponibles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link href="/search">
              <div className="p-4 border transition-all hover:shadow-lg" style={{ borderColor: 'var(--bdr)', background: 'var(--card)', borderRadius: '4px', cursor: 'pointer' }}>
                <div className="w-10 h-10 flex items-center justify-center mb-3" style={{ background: 'var(--surf)', borderRadius: '4px' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--link)" strokeWidth="2">
                    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                  </svg>
                </div>
                <h3 style={{ color: 'var(--text1)', fontSize: 14, fontWeight: 600 }}>Buscar Casos</h3>
              </div>
            </Link>

            <Link href="/calculator">
              <div className="p-4 border transition-all hover:shadow-lg" style={{ borderColor: 'var(--bdr)', background: 'var(--card)', borderRadius: '4px', cursor: 'pointer' }}>
                <div className="w-10 h-10 flex items-center justify-center mb-3" style={{ background: 'var(--surf)', borderRadius: '4px' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--link)" strokeWidth="2">
                    <rect x="4" y="2" width="16" height="20" rx="2"/><path d="M8 6h8M8 10h8M8 14h8M8 18h4"/>
                  </svg>
                </div>
                <h3 style={{ color: 'var(--text1)', fontSize: 14, fontWeight: 600 }}>Calculadora</h3>
              </div>
            </Link>

            <Link href="/compare">
              <div className="p-4 border transition-all hover:shadow-lg" style={{ borderColor: 'var(--bdr)', background: 'var(--card)', borderRadius: '4px', cursor: 'pointer' }}>
                <div className="w-10 h-10 flex items-center justify-center mb-3" style={{ background: 'var(--surf)', borderRadius: '4px' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--link)" strokeWidth="2">
                    <path d="M12 3v18M3 12h18"/><path d="M9 7h2v10H9zM13 14h2v3h-2z"/>
                  </svg>
                </div>
                <h3 style={{ color: 'var(--text1)', fontSize: 14, fontWeight: 600 }}>Comparar Tipos</h3>
              </div>
            </Link>

            <Link href="/nos-explorer">
              <div className="p-4 border transition-all hover:shadow-lg" style={{ borderColor: 'var(--bdr)', background: 'var(--card)', borderRadius: '4px', cursor: 'pointer' }}>
                <div className="w-10 h-10 flex items-center justify-center mb-3" style={{ background: 'var(--surf)', borderRadius: '4px' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--link)" strokeWidth="2">
                    <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M3 21v-5h5"/>
                  </svg>
                </div>
                <h3 style={{ color: 'var(--text1)', fontSize: 14, fontWeight: 600 }}>Explorador NOS</h3>
              </div>
            </Link>
          </div>

          {/* Language Switcher */}
          <div className="mt-12 p-6 text-center" style={{ background: 'var(--surf)', borderRadius: '4px' }}>
            <p style={{ color: 'var(--text2)', fontSize: 14 }}>
              This page is also available in <Link href="/trends" style={{ color: 'var(--gold)', fontWeight: '500', textDecoration: 'none' }} className="hover:underline">English</Link>
            </p>
          </div>
        </div>
      </div>

      {/* Footer disclaimer */}
      <div className="border-t py-6 text-center" style={{ borderColor: 'var(--bdr)' }}>
        <p className="text-[11px] max-w-xl mx-auto px-6" style={{ color: 'var(--text2)' }}>
          MyCaseValue proporciona datos históricos agregados de registros judiciales federales públicos únicamente.
          Esto no es asesoramiento legal. No se crea relación abogado-cliente al usar esta herramienta.
          © {new Date().getFullYear()} MyCaseValue LLC.
        </p>
      </div>
    </div>
  );
}
