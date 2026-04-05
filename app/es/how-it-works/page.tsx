/**
 * Spanish how-it-works page (/es/how-it-works)
 * Wrapper with Spanish translation
 */

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cómo Funciona — MyCaseValue',
  description: 'Cómo MyCaseValue analiza 5.1M+ casos federales para mostrar tasas de victoria, acuerdos, cronogramas y análisis de jueces.',
  alternates: {
    canonical: 'https://www.mycasevalues.com/es/how-it-works',
    languages: {
      en: 'https://www.mycasevalues.com/how-it-works',
      es: 'https://www.mycasevalues.com/es/how-it-works',
    },
  },
  openGraph: {
    title: 'Cómo Funciona — MyCaseValue',
    description: 'Cómo MyCaseValue analiza datos de casos federales para revelarte información real sobre resultados legales.',
    type: 'website',
    url: 'https://www.mycasevalues.com/es/how-it-works',
    locale: 'es_ES',
  },
};

export default function SpanishHowItWorksPage() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-base)' }}>
      {/* Header */}
      <div className="border-b" style={{ borderColor: '#D5D8DC', background: '#EDEEEE' }}>
        <div className="max-w-5xl mx-auto px-6 py-16 sm:py-24">
          <a href="/es" className="inline-flex items-center gap-2 text-sm font-semibold mb-6 transition-colors hover:opacity-80" style={{ color: '#006997' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            Volver a MyCaseValue
          </a>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 text-[11px] font-bold tracking-[1.5px] uppercase mb-4"
            style={{ background: '#E5EBF0', color: '#006997', borderRadius: '9999px' }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#006997" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            CÓMO FUNCIONA
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-extrabold mb-4" style={{ color: '#212529', letterSpacing: '-1.5px' }}>
            Cómo Funciona MyCaseValue
          </h1>
          <p className="text-lg leading-relaxed max-w-2xl" style={{ color: '#666666' }}>
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
                <div className="flex items-center justify-center h-12 w-12" style={{ background: '#E8171F', color: 'white', borderRadius: '50%' }}>
                  <span className="text-lg font-bold">1</span>
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-display font-bold mb-3" style={{ color: '#212529' }}>
                  Describe Tu Caso
                </h2>
                <p style={{ color: '#666666' }} className="text-lg leading-relaxed">
                  Responde preguntas sencillas sobre tu situación: tipo de caso, estado, cuándo sucedió, y si otros están afectados. No se requiere información detallada ni personal.
                </p>
              </div>
            </div>
          </section>

          {/* Step 2 */}
          <section>
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12" style={{ background: '#E8171F', color: 'white', borderRadius: '50%' }}>
                  <span className="text-lg font-bold">2</span>
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-display font-bold mb-3" style={{ color: '#212529' }}>
                  Aceptas la Divulgación
                </h2>
                <p style={{ color: '#666666' }} className="text-lg leading-relaxed">
                  Confirmas que entiendes que MyCaseValue muestra datos históricos de casos similares, NO una predicción de tu caso específico. No es asesoramiento legal. No hay relación abogado-cliente.
                </p>
              </div>
            </div>
          </section>

          {/* Step 3 */}
          <section>
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12" style={{ background: '#E8171F', color: 'white', borderRadius: '50%' }}>
                  <span className="text-lg font-bold">3</span>
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-display font-bold mb-3" style={{ color: '#212529' }}>
                  Obtenemos Datos
                </h2>
                <p style={{ color: '#666666' }} className="text-lg leading-relaxed">
                  Nuestro sistema busca en 5.1M+ casos federales del Centro Judicial Federal, CourtListener y PACER para encontrar casos similares al tuyo.
                </p>
              </div>
            </div>
          </section>

          {/* Step 4 */}
          <section>
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12" style={{ background: '#E8171F', color: 'white', borderRadius: '50%' }}>
                  <span className="text-lg font-bold">4</span>
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-display font-bold mb-3" style={{ color: '#212529' }}>
                  Analizamos Resultados
                </h2>
                <p style={{ color: '#666666' }} className="text-lg leading-relaxed">
                  Analizamos cómo terminaron esos casos: tasas de victoria, acuerdos, desestimaciones, cronogramas típicos y factores que los tribunales consideran.
                </p>
              </div>
            </div>
          </section>

          {/* Step 5 */}
          <section>
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12" style={{ background: '#E8171F', color: 'white', borderRadius: '50%' }}>
                  <span className="text-lg font-bold">5</span>
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-display font-bold mb-3" style={{ color: '#212529' }}>
                  Tu Informe
                </h2>
                <p style={{ color: '#666666' }} className="text-lg leading-relaxed">
                  Recibe un informe gratuito que muestra lo que sucedió en casos como el tuyo: números, tasas, cronogramas. Premium desbloqueará análisis de jueces y datos de circuitos.
                </p>
              </div>
            </div>
          </section>

        </div>

        {/* Key principles */}
        <section className="mt-16">
          <h2 className="text-3xl font-display font-bold mb-8" style={{ color: '#212529' }}>
            Principios Clave
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 border" style={{ borderColor: '#D5D8DC', background: '#FAFBFC', borderRadius: '4px' }}>
              <div className="w-12 h-12 flex items-center justify-center mb-4" style={{ background: '#E5EBF0', borderRadius: '50%' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#006997" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2" style={{ color: '#212529' }}>
                Privacidad Extrema
              </h3>
              <p style={{ color: '#666666' }}>
                Cero datos almacenados. Tus búsquedas son anónimas. Encriptado de extremo a extremo.
              </p>
            </div>

            <div className="p-6 border" style={{ borderColor: '#D5D8DC', background: '#FAFBFC', borderRadius: '4px' }}>
              <div className="w-12 h-12 flex items-center justify-center mb-4" style={{ background: '#E5EBF0', borderRadius: '50%' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#006997" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 6v6l4 2"/>
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2" style={{ color: '#212529' }}>
                Instantáneo
              </h3>
              <p style={{ color: '#666666' }}>
                Tu informe se genera en 60 segundos. Sin espera. Sin formularios largos.
              </p>
            </div>

            <div className="p-6 border" style={{ borderColor: '#D5D8DC', background: '#FAFBFC', borderRadius: '4px' }}>
              <div className="w-12 h-12 flex items-center justify-center mb-4" style={{ background: '#E5EBF0', borderRadius: '50%' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#006997" strokeWidth="2">
                  <path d="M9 12l2 2 4-4"/>
                  <circle cx="12" cy="12" r="10"/>
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2" style={{ color: '#212529' }}>
                Basado en Hechos
              </h3>
              <p style={{ color: '#666666' }}>
                Todos los datos provienen de registros judiciales federales públicos, no opiniones.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="mt-16 text-center p-8 border" style={{ borderColor: '#D5D8DC', background: '#FAFBFC', borderRadius: '4px' }}>
          <h2 className="text-2xl font-display font-bold mb-3" style={{ color: '#212529' }}>
            Listo para comenzar?
          </h2>
          <p className="mb-6" style={{ color: '#666666' }}>
            Genera tu informe gratuito en 60 segundos. Sin registro requerido.
          </p>
          <a href="/odds"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold transition-all"
            style={{ borderRadius: '4px', background: '#E8171F', color: '#FFFFFF' }}>
            Consultar Mi Caso
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
        </section>

      </div>

      {/* Footer disclaimer */}
      <div className="border-t py-6 text-center" style={{ borderColor: '#D5D8DC' }}>
        <p className="text-[11px] max-w-xl mx-auto px-6" style={{ color: '#666666' }}>
          MyCaseValue proporciona datos históricos agregados de registros judiciales federales públicos únicamente.
          No somos un bufete de abogados. Esto no es asesoramiento legal. No se crea relación abogado-cliente al usar esta herramienta.
          © {new Date().getFullYear()} MyCaseValue LLC.
        </p>
      </div>
    </div>
  );
}
