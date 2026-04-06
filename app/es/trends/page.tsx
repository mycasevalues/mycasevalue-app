/**
 * Spanish trends page (/es/trends)
 */

import { Metadata } from 'next';
import { SITE_URL } from '../../../lib/site-config';

export const metadata: Metadata = {
  title: 'Tendencias — MyCaseValue',
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
  },
};

export default function SpanishTrendsPage() {
  return (
    <div className="min-h-screen" style={{ background: '#F5F6F7' }}>
      {/* Header with Dark Navy Background */}
      <div className="border-b" style={{ background: '#00172E', borderColor: '#D5D8DC' }}>
        <div className="max-w-5xl mx-auto px-6 py-12 sm:py-16">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 mb-8 text-sm">
            <a href="/es" style={{ color: '#FFFFFF' }} className="hover:opacity-80 transition-opacity">
              Inicio
            </a>
            <span style={{ color: '#FFFFFF' }} className="opacity-60">/</span>
            <span style={{ color: '#FFFFFF' }} className="opacity-80">Tendencias</span>
          </nav>

          {/* Red Accent Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 text-[11px] font-bold tracking-[1.5px] uppercase mb-6"
            style={{ background: '#E8171F', color: '#FFFFFF', borderRadius: '4px' }}>
            ANÁLISIS
          </div>

          <h1 className="text-3xl sm:text-4xl font-display font-extrabold mb-4" style={{ color: '#FFFFFF' }}>
            Tendencias en Casos Federales
          </h1>
          <p className="text-lg leading-relaxed max-w-2xl" style={{ color: '#FFFFFF', opacity: 0.9 }}>
            Explora cómo están evolucionando los litigios federales año tras año.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="text-center p-8 border" style={{ borderColor: '#D5D8DC', background: '#FFFFFF', borderRadius: '4px' }}>
          <p style={{ color: '#455A64' }}>
            Espera a que se carguen los gráficos interactivos...
          </p>
        </div>
      </div>

      {/* Footer disclaimer */}
      <div className="border-t py-6 text-center" style={{ borderColor: '#D5D8DC' }}>
        <p className="text-[11px] max-w-xl mx-auto px-6" style={{ color: '#455A64' }}>
          MyCaseValue proporciona datos históricos agregados de registros judiciales federales públicos únicamente.
          Esto no es asesoramiento legal. No se crea relación abogado-cliente al usar esta herramienta.
          © {new Date().getFullYear()} MyCaseValue LLC.
        </p>
      </div>
    </div>
  );
}
