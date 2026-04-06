/**
 * Spanish home page (/es)
 * Imports the English page component and passes lang="es" context
 * Uses dynamic import to prevent SSR and ensure client-side lang handling
 */

import Link from 'next/link';
import ServerHero from '../../components/ServerHero';
import ServerContent from '../../components/ServerContent';
import { Metadata } from 'next';
import { SITE_URL } from '../../lib/site-config';

export const metadata: Metadata = {
  title: 'MyCaseValue en Español - Datos de Casos Federales',
  description: 'Investiga resultados reales de 5.1M+ casos judiciales federales. Tasas de éxito, rangos de acuerdos, plazos y análisis de jueces. Gratuito, privado e instantáneo.',
  alternates: {
    canonical: `${SITE_URL}/es`,
    languages: {
      en: SITE_URL,
      es: `${SITE_URL}/es`,
    },
  },
  openGraph: {
    locale: 'es_ES',
    title: 'MyCaseValue en Español - Datos Federales de Casos',
    description: 'Resultados reales de 5,100,000+ casos judiciales federales. Tasas de victoria, plazos, porcentajes de acuerdo, rangos de recuperación y análisis de impacto de abogados.',
    url: `${SITE_URL}/es`,
  },
};

export default function SpanishPage() {
  return (
    <div style={{ background: '#F5F6F7', minHeight: '100vh' }}>
      {/* Language Switcher Note */}
      <div className="border-b" style={{ background: '#FFFFFF', borderColor: '#D5D8DC', padding: '12px 24px' }}>
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-sm" style={{ color: '#455A64' }}>
            This page is also available in <Link href="/" style={{ color: '#006997', fontWeight: '500', textDecoration: 'none' }} className="hover:underline">English</Link>
          </p>
        </div>
      </div>

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

      {/* Available Tools Section */}
      <div style={{ background: '#FFFFFF', borderTop: '1px solid #D5D8DC', padding: '48px 24px' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12">
            <h2 className="text-3xl font-display font-bold mb-4" style={{ color: '#212529' }}>
              Herramientas Disponibles
            </h2>
            <p style={{ color: '#455A64', fontSize: '16px', lineHeight: '1.6' }}>
              Accede a nuestras herramientas de análisis legal para optimizar tu investigación.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Buscar Casos */}
            <Link href="/search">
              <div className="p-6 border transition-all hover:shadow-lg hover:border-opacity-100" style={{ borderColor: '#D5D8DC', background: '#FFFFFF', borderRadius: '2px', cursor: 'pointer' }}>
                <div className="w-12 h-12 flex items-center justify-center mb-4" style={{ background: '#F5F6F7', borderRadius: '2px' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#006997" strokeWidth="2">
                    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                  </svg>
                </div>
                <h3 className="text-lg font-display font-semibold mb-2" style={{ color: '#212529' }}>
                  Buscar Casos
                </h3>
                <p style={{ color: '#455A64', fontSize: '14px', lineHeight: '1.5' }}>
                  Busca entre millones de casos federales por tipo y jurisdicción.
                </p>
              </div>
            </Link>

            {/* Calculadora */}
            <Link href="/calculator">
              <div className="p-6 border transition-all hover:shadow-lg hover:border-opacity-100" style={{ borderColor: '#D5D8DC', background: '#FFFFFF', borderRadius: '2px', cursor: 'pointer' }}>
                <div className="w-12 h-12 flex items-center justify-center mb-4" style={{ background: '#F5F6F7', borderRadius: '2px' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#006997" strokeWidth="2">
                    <rect x="4" y="2" width="16" height="20" rx="2"/><path d="M8 6h8M8 10h8M8 14h8M8 18h4"/>
                  </svg>
                </div>
                <h3 className="text-lg font-display font-semibold mb-2" style={{ color: '#212529' }}>
                  Calculadora
                </h3>
                <p style={{ color: '#455A64', fontSize: '14px', lineHeight: '1.5' }}>
                  Estima costos y plazos basado en datos históricos.
                </p>
              </div>
            </Link>

            {/* Comparar Tipos */}
            <Link href="/compare">
              <div className="p-6 border transition-all hover:shadow-lg hover:border-opacity-100" style={{ borderColor: '#D5D8DC', background: '#FFFFFF', borderRadius: '2px', cursor: 'pointer' }}>
                <div className="w-12 h-12 flex items-center justify-center mb-4" style={{ background: '#F5F6F7', borderRadius: '2px' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#006997" strokeWidth="2">
                    <path d="M12 3v18M3 12h18"/><path d="M9 7h2v10H9zM13 14h2v3h-2z"/>
                  </svg>
                </div>
                <h3 className="text-lg font-display font-semibold mb-2" style={{ color: '#212529' }}>
                  Comparar Tipos
                </h3>
                <p style={{ color: '#455A64', fontSize: '14px', lineHeight: '1.5' }}>
                  Compara resultados entre diferentes categorías de casos.
                </p>
              </div>
            </Link>

            {/* Explorador NOS */}
            <Link href="/nos-explorer">
              <div className="p-6 border transition-all hover:shadow-lg hover:border-opacity-100" style={{ borderColor: '#D5D8DC', background: '#FFFFFF', borderRadius: '2px', cursor: 'pointer' }}>
                <div className="w-12 h-12 flex items-center justify-center mb-4" style={{ background: '#F5F6F7', borderRadius: '2px' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#006997" strokeWidth="2">
                    <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M3 21v-5h5"/>
                  </svg>
                </div>
                <h3 className="text-lg font-display font-semibold mb-2" style={{ color: '#212529' }}>
                  Explorador NOS
                </h3>
                <p style={{ color: '#455A64', fontSize: '14px', lineHeight: '1.5' }}>
                  Navega códigos de casos por jurisdicción y circuito.
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
