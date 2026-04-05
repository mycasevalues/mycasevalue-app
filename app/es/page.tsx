/**
 * Spanish home page (/es)
 * Imports the English page component and passes lang="es" context
 * Uses dynamic import to prevent SSR and ensure client-side lang handling
 */

import ServerHero from '../../components/ServerHero';
import ServerContent from '../../components/ServerContent';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'MyCaseValue en Español - Datos de Casos Federales',
  description: 'Investiga resultados reales de 5.1M+ casos judiciales federales. Tasas de éxito, rangos de acuerdos, plazos y análisis de jueces. Gratuito, privado e instantáneo.',
  alternates: {
    canonical: 'https://www.mycasevalues.com/es',
    languages: {
      en: 'https://mycasevalues.com',
      es: 'https://www.mycasevalues.com/es',
    },
  },
  openGraph: {
    locale: 'es_ES',
    title: 'MyCaseValue en Español - Datos Federales de Casos',
    description: 'Resultados reales de 5,100,000+ casos judiciales federales. Tasas de victoria, plazos, porcentajes de acuerdo, rangos de recuperación y análisis de impacto de abogados.',
    url: 'https://www.mycasevalues.com/es',
  },
};

export default function SpanishPage() {
  return (
    <div style={{ background: '#F5F6F7', minHeight: '100vh' }}>
      {/* Breadcrumb Navigation Header */}
      <div className="border-b" style={{ background: '#00172E', borderColor: '#D5D8DC', padding: '12px 24px' }}>
        <div className="max-w-7xl mx-auto px-6">
          <nav className="flex items-center gap-2 text-sm">
            <span style={{ color: '#FFFFFF' }} className="opacity-80">Inicio</span>
          </nav>
        </div>
      </div>

      {/* Hero and Content */}
      <ServerHero />
      <ServerContent />
    </div>
  );
}
