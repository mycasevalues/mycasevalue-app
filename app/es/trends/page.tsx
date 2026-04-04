/**
 * Spanish trends page (/es/trends)
 */

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tendencias — MyCaseValue',
  description: 'Tendencias en demandas federales año tras año. Análisis de qué tipos de casos están aumentando en los tribunales federales.',
  alternates: {
    canonical: 'https://www.mycasevalues.com/es/trends',
    languages: {
      en: 'https://www.mycasevalues.com/trends',
      es: 'https://www.mycasevalues.com/es/trends',
    },
  },
  openGraph: {
    locale: 'es_ES',
  },
};

export default function SpanishTrendsPage() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-base)' }}>
      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-display font-bold mb-4" style={{ color: '#F0F2F5' }}>
            Tendencias en Casos Federales
          </h1>
          <p className="text-lg" style={{ color: 'rgba(240,242,245,0.70)' }}>
            Explora cómo están evolucionando los litigios federales año tras año.
          </p>
        </div>

        <div className="text-center p-8 rounded-xl border" style={{ borderColor: 'var(--border-default)', background: 'rgba(255,255,255,0.06)' }}>
          <p style={{ color: 'rgba(240,242,245,0.70)' }}>
            Espera a que se carguen los gráficos interactivos...
          </p>
        </div>
      </div>
    </div>
  );
}
