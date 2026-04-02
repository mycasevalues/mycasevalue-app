/**
 * Spanish how-it-works page (/es/how-it-works)
 * Wrapper with Spanish translation
 */

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cómo Funciona — MyCaseValue',
  description: 'Cómo MyCaseValue analiza 5.1M+ casos federales para mostrar tasas de victoria, acuerdos, cronogramas y análisis de jueces.',
  alternates: {
    canonical: 'https://mycasevalues.com/es/how-it-works',
    languages: {
      en: 'https://mycasevalues.com/how-it-works',
      es: 'https://mycasevalues.com/es/how-it-works',
    },
  },
  openGraph: {
    title: 'Cómo Funciona — MyCaseValue',
    description: 'Cómo MyCaseValue analiza datos de casos federales para revelarte información real sobre resultados legales.',
    type: 'website',
    url: 'https://mycasevalues.com/es/how-it-works',
    locale: 'es_ES',
  },
};

export default function SpanishHowItWorksPage() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-base)' }}>
      {/* Header */}
      <div className="border-b" style={{ borderColor: 'var(--border-default)', background: 'linear-gradient(180deg, #131B2E 0%, #0B1221 100%)' }}>
        <div className="max-w-5xl mx-auto px-6 py-16 sm:py-24">
          <a href="/es" className="inline-flex items-center gap-2 text-sm font-semibold mb-6 transition-colors hover:opacity-80" style={{ color: '#4F46E5' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            Volver a MyCaseValue
          </a>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-bold tracking-[1.5px] uppercase mb-4"
            style={{ background: 'rgba(99,102,241,0.15)', color: '#4F46E5' }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#4F46E5" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            CÓMO FUNCIONA
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-extrabold mb-4" style={{ color: 'var(--fg-primary)', letterSpacing: '-1.5px' }}>
            Cómo Funciona MyCaseValue
          </h1>
          <p className="text-lg leading-relaxed max-w-2xl" style={{ color: 'var(--fg-muted)' }}>
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
                <div className="flex items-center justify-center h-12 w-12 rounded-full" style={{ background: '#4F46E5', color: 'white' }}>
                  <span className="text-lg font-bold">1</span>
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-display font-bold mb-3" style={{ color: 'var(--fg-primary)' }}>
                  Describe Tu Caso
                </h2>
                <p style={{ color: 'var(--fg-muted)' }} className="text-lg leading-relaxed">
                  Responde preguntas sencillas sobre tu situación: tipo de caso, estado, cuándo sucedió, y si otros están afectados. No se requiere información detallada ni personal.
                </p>
              </div>
            </div>
          </section>

          {/* Step 2 */}
          <section>
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-full" style={{ background: '#4F46E5', color: 'white' }}>
                  <span className="text-lg font-bold">2</span>
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-display font-bold mb-3" style={{ color: 'var(--fg-primary)' }}>
                  Aceptas la Divulgación
                </h2>
                <p style={{ color: 'var(--fg-muted)' }} className="text-lg leading-relaxed">
                  Confirmas que entiendes que MyCaseValue muestra datos históricos de casos similares, NO una predicción de tu caso específico. No es asesoramiento legal. No hay relación abogado-cliente.
                </p>
              </div>
            </div>
          </section>

          {/* Step 3 */}
          <section>
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-full" style={{ background: '#4F46E5', color: 'white' }}>
                  <span className="text-lg font-bold">3</span>
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-display font-bold mb-3" style={{ color: 'var(--fg-primary)' }}>
                  Obtenemos Datos
                </h2>
                <p style={{ color: 'var(--fg-muted)' }} className="text-lg leading-relaxed">
                  Nuestro sistema busca en 5.1M+ casos federales del Centro Judicial Federal, CourtListener y PACER para encontrar casos similares al tuyo.
                </p>
              </div>
            </div>
          </section>

          {/* Step 4 */}
          <section>
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-full" style={{ background: '#4F46E5', color: 'white' }}>
                  <span className="text-lg font-bold">4</span>
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-display font-bold mb-3" style={{ color: 'var(--fg-primary)' }}>
                  Analizamos Resultados
                </h2>
                <p style={{ color: 'var(--fg-muted)' }} className="text-lg leading-relaxed">
                  Analizamos cómo terminaron esos casos: tasas de victoria, acuerdos, desestimaciones, cronogramas típicos y factores que los tribunales consideran.
                </p>
              </div>
            </div>
          </section>

          {/* Step 5 */}
          <section>
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-full" style={{ background: '#4F46E5', color: 'white' }}>
                  <span className="text-lg font-bold">5</span>
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-display font-bold mb-3" style={{ color: 'var(--fg-primary)' }}>
                  Tu Informe
                </h2>
                <p style={{ color: 'var(--fg-muted)' }} className="text-lg leading-relaxed">
                  Recibe un informe gratuito que muestra lo que sucedió en casos como el tuyo: números, tasas, cronogramas. Premium desbloqueará análisis de jueces y datos de circuitos.
                </p>
              </div>
            </div>
          </section>

        </div>

        {/* Key principles */}
        <section className="mt-16">
          <h2 className="text-3xl font-display font-bold mb-8" style={{ color: 'var(--fg-primary)' }}>
            Principios Clave
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl border" style={{ borderColor: 'var(--border-default)', background: '#131B2E' }}>
              <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4" style={{ background: 'rgba(79, 70, 229, 0.15)' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4F46E5" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--fg-primary)' }}>
                Privacidad Extrema
              </h3>
              <p style={{ color: 'var(--fg-muted)' }}>
                Cero datos almacenados. Tus búsquedas son anónimas. Encriptado de extremo a extremo.
              </p>
            </div>

            <div className="p-6 rounded-xl border" style={{ borderColor: 'var(--border-default)', background: '#131B2E' }}>
              <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4" style={{ background: 'rgba(79, 70, 229, 0.15)' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4F46E5" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 6v6l4 2"/>
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--fg-primary)' }}>
                Instantáneo
              </h3>
              <p style={{ color: 'var(--fg-muted)' }}>
                Tu informe se genera en 60 segundos. Sin espera. Sin formularios largos.
              </p>
            </div>

            <div className="p-6 rounded-xl border" style={{ borderColor: 'var(--border-default)', background: '#131B2E' }}>
              <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4" style={{ background: 'rgba(79, 70, 229, 0.15)' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4F46E5" strokeWidth="2">
                  <path d="M9 12l2 2 4-4"/>
                  <circle cx="12" cy="12" r="10"/>
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--fg-primary)' }}>
                Basado en Hechos
              </h3>
              <p style={{ color: 'var(--fg-muted)' }}>
                Todos los datos provienen de registros judiciales federales públicos, no opiniones.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="mt-16 text-center p-8 rounded-xl border" style={{ borderColor: 'var(--border-default)', background: 'linear-gradient(135deg, #131B2E 0%, #0F172A 100%)' }}>
          <h2 className="text-2xl font-display font-bold mb-3" style={{ color: 'var(--fg-primary)' }}>
            Listo para comenzar?
          </h2>
          <p className="mb-6" style={{ color: 'var(--fg-muted)' }}>
            Genera tu informe gratuito en 60 segundos. Sin registro requerido.
          </p>
          <a href="/es/odds"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all"
            style={{ background: '#4F46E5', color: '#131B2E' }}>
            Consultar Mi Caso
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
        </section>

      </div>

      {/* Footer disclaimer */}
      <div className="border-t py-6 text-center" style={{ borderColor: 'var(--border-default)' }}>
        <p className="text-[11px] max-w-xl mx-auto px-6" style={{ color: 'var(--fg-muted)' }}>
          MyCaseValue proporciona datos históricos agregados de registros judiciales federales públicos únicamente.
          No somos un bufete de abogados. Esto no es asesoramiento legal. No se crea relación abogado-cliente al usar esta herramienta.
          © {new Date().getFullYear()} MyCaseValue LLC.
        </p>
      </div>
    </div>
  );
}
