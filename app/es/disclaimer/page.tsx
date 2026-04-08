/**
 * Spanish disclaimer page (/es/disclaimer)
 */

import Link from 'next/link';
import { Metadata } from 'next';
import { SITE_URL } from '../../../lib/site-config';

export const metadata: Metadata = {
  title: 'Descargo de Responsabilidad',
  description: 'Descargo de responsabilidad legal de MyCaseValue. Esta plataforma es solo para fines informativos y no constituye asesoramiento legal.',
  alternates: {
    canonical: `${SITE_URL}/es/disclaimer`,
    languages: {
      en: `${SITE_URL}/disclaimer`,
      es: `${SITE_URL}/es/disclaimer`,
    },
  },
  openGraph: {
    locale: 'es_ES',
  },
};

export default function SpanishDisclaimerPage() {
  return (
    <div className="min-h-screen" style={{ background: '#F7F8FA' }}>
      {/* Header */}
      <div className="border-b" style={{ background: '#0966C3', borderColor: '#E5E7EB' }}>
        <div className="max-w-3xl mx-auto px-6 py-12 sm:py-16">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 mb-8 text-sm">
            <a href="/es" style={{ color: '#FFFFFF' }} className="hover:opacity-80 transition-opacity">
              Inicio
            </a>
            <span style={{ color: '#FFFFFF' }} className="opacity-60">/</span>
            <span style={{ color: '#FFFFFF' }} className="opacity-80">Descargo de Responsabilidad</span>
          </nav>

          {/* Accent Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 text-[11px] font-bold tracking-[1.5px] uppercase mb-6"
            style={{ background: '#0966C3', color: '#FFFFFF', borderRadius: '20px' }}>
            IMPORTANTE
          </div>

          <h1 className="text-4xl font-display font-bold mb-4" style={{ color: '#FFFFFF' }}>
            Descargo de Responsabilidad
          </h1>
          <p className="text-lg leading-relaxed max-w-2xl" style={{ color: '#FFFFFF', opacity: 0.9 }}>
            Información legal importante sobre el uso de MyCaseValue
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* Content starts here */}
        {/* Removed h1 since it's now in header */}

        <div className="space-y-6">
          {/* Disclaimer content with styled cards */}
          <div style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '12px', padding: '24px' }}>
            <section className="mb-8">
              <h2 className="text-2xl font-display font-semibold mb-4" style={{ color: '#0f0f0f' }}>
                Declaración General
              </h2>
              <p style={{ color: '#4B5563', lineHeight: '1.6' }}>
                MyCaseValue es una herramienta de investigación que proporciona datos históricos agregados de registros judiciales federales públicos. NO es asesoramiento legal, una predicción de resultados, o una evaluación de tu caso específico. No se crea ninguna relación abogado-cliente por el uso de MyCaseValue.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-display font-semibold mb-4" style={{ color: '#0f0f0f' }}>
                No es Asesoramiento Legal
              </h2>
              <p style={{ color: '#4B5563', lineHeight: '1.6', marginBottom: '12px' }}>
                MyCaseValue proporciona información histórica sobre cómo han terminado casos federales similares. Esta información no:
              </p>
              <ul className="space-y-2 ml-6" style={{ color: '#4B5563' }}>
                <li>• Evalúa tu situación legal específica</li>
                <li>• Hace predicciones sobre tu caso</li>
                <li>• Reemplaza el asesoramiento de un abogado con licencia</li>
                <li>• Crea una relación abogado-cliente</li>
                <li>• Protege información bajo privilegio abogado-cliente</li>
              </ul>
              <p style={{ color: '#4B5563', lineHeight: '1.6', marginTop: '12px' }}>
                Si tienes preguntas legales, debes consultar a un abogado con licencia en tu estado.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-display font-semibold mb-4" style={{ color: '#0f0f0f' }}>
                Limitaciones de Datos
              </h2>
              <p style={{ color: '#4B5563', lineHeight: '1.6', marginBottom: '12px' }}>
                Nuestros datos históricos provienen de registros judiciales federales públicos (FJC, CourtListener, PACER) y tienen las siguientes limitaciones:
              </p>
              <ul className="space-y-2 ml-6" style={{ color: '#4B5563' }}>
                <li>• Los datos pasados no garantizan resultados futuros</li>
                <li>• La codificación de resultados puede no capturar victorias parciales o acuerdos complejos</li>
                <li>• Las montos de acuerdos generalmente no se reportan públicamente (datos confidenciales)</li>
                <li>• Hay un retraso de 1-2 meses entre el cierre del caso y la publicación de datos</li>
                <li>• Las estadísticas pueden cambiar a medida que se publican más datos</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-display font-semibold mb-4" style={{ color: '#0f0f0f' }}>
                Sin Garantía
              </h2>
              <p style={{ color: '#4B5563', lineHeight: '1.6', marginBottom: '12px' }}>
                MyCaseValue se proporciona "tal cual". Aunque hacemos nuestro mejor esfuerzo para proporcionar datos precisos, no ofrecemos ninguna garantía de:
              </p>
              <ul className="space-y-2 ml-6" style={{ color: '#4B5563' }}>
                <li>• Precisión o integridad de los datos</li>
                <li>• Disponibilidad o funcionamiento ininterrumpido del servicio</li>
                <li>• Idoneidad para un propósito particular</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-display font-semibold mb-4" style={{ color: '#0f0f0f' }}>
                Privacidad de los Datos
              </h2>
              <p style={{ color: '#4B5563', lineHeight: '1.6', marginBottom: '12px' }}>
                La información que proporciones (tipo de caso, estado, etc.) se usa únicamente para generar tu informe. No almacenamos tus datos de forma permanente ni los compartimos con terceros. Consulta nuestra política de privacidad completa en:
              </p>
              <p style={{ color: '#004182', fontWeight: '500' }}>
                https://mycasevalues.com/privacy
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-display font-semibold mb-4" style={{ color: '#0f0f0f' }}>
                Limitación de Responsabilidad
              </h2>
              <p style={{ color: '#4B5563', lineHeight: '1.6' }}>
                En la máxima medida permitida por la ley, MyCaseValue no será responsable por daños indirectos, incidentales, especiales, consecuentes o punitivos, incluida la pérdida de beneficios, datos o uso de datos, que surja del acceso o uso de esta herramienta.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-display font-semibold mb-4" style={{ color: '#0f0f0f' }}>
                Contacto
              </h2>
              <p style={{ color: '#4B5563', lineHeight: '1.6', marginBottom: '12px' }}>
                Si tienes preguntas sobre este descargo de responsabilidad, contáctanos en:
              </p>
              <p style={{ color: '#004182', fontWeight: '500' }}>
                support@mycasevalue.com
              </p>
            </section>
          </div>
        </div>

        {/* Available Tools Section */}
        <section className="mt-16">
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
        </section>

        {/* Language Switcher */}
        <div className="mt-12 p-6 text-center" style={{ background: '#F7F8FA', borderRadius: '12px' }}>
          <p className="text-sm" style={{ color: '#4B5563' }}>
            This page is also available in <Link href="/disclaimer" style={{ color: '#004182', fontWeight: '500', textDecoration: 'none' }} className="hover:underline">English</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
