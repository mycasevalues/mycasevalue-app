/**
 * Spanish pricing page (/es/pricing)
 * Wrapper that passes lang="es" context to the English pricing component
 */

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Precios — MyCaseValue | Informes desde $5.99',
  description: 'Informes asequibles de resultados de casos federales. Elige entre Informe Individual ($5.99), Informes Ilimitados ($9.99) o Modo Abogado ($29.99/mes). Todos los planes incluyen citas de fuentes y soporte bilingüe.',
  alternates: {
    canonical: 'https://www.mycasevalues.com/es/pricing',
    languages: {
      en: 'https://www.mycasevalues.com/pricing',
      es: 'https://www.mycasevalues.com/es/pricing',
    },
  },
  openGraph: {
    title: 'Precios — MyCaseValue | Planes de Datos de Casos Federales',
    description: 'Precios transparentes y asequibles para datos de resultados de casos federales. Informes individuales, acceso ilimitado o panel de análisis de abogados.',
    type: 'website',
    url: 'https://www.mycasevalues.com/es/pricing',
    locale: 'es_ES',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://www.mycasevalues.com/es' },
        { '@type': 'ListItem', position: 2, name: 'Precios', item: 'https://www.mycasevalues.com/es/pricing' },
      ],
    },
  ],
};

const pricingFaqs = [
  {
    q: '¿Puedo obtener un reembolso?',
    a: 'Sí. Si compras un informe y no estás satisfecho, puedes solicitar un reembolso dentro de 30 días. Queremos que confíes en nuestros datos.',
  },
  {
    q: '¿Es esto asesoramiento legal?',
    a: 'No. MyCaseValue proporciona datos históricos agregados de registros judiciales federales públicos únicamente. No es asesoramiento legal, y no se crea ninguna relación abogado-cliente. Siempre consulta a un abogado con licencia.',
  },
  {
    q: '¿Qué métodos de pago aceptan?',
    a: 'Aceptamos todas las principales tarjetas de crédito (Visa, Mastercard, American Express), Apple Pay y Google Pay. Todos los pagos se procesan de forma segura a través de Stripe.',
  },
  {
    q: '¿Puedo actualizar de un plan a otro?',
    a: 'Sí. Si compras un Informe Individual y luego quieres Informes Ilimitados, podemos aplicar tu pago hacia la actualización. Contacta a support@mycasevalue.com para detalles.',
  },
  {
    q: '¿Hay prueba gratuita?',
    a: 'Sí. Puedes generar un informe básico gratuito sin comprar nada. Las características premium requieren un pago único o una suscripción mensual.',
  },
  {
    q: '¿Qué incluye el "Modo Abogado"?',
    a: 'El Modo Abogado incluye informes ilimitados, panel de análisis de jueces, predictor de mociones, capacidad de consultas en masa, exportación de escritos (PDF/DOCX), widgets incrustables, acceso al programa de afiliados y opciones de etiqueta blanca para bufetes.',
  },
  {
    q: '¿Puedo cancelar mi suscripción de Modo Abogado?',
    a: 'Sí, puedes cancelar en cualquier momento. Tu suscripción continúa hasta el final de tu ciclo de facturación, luego se detiene. Sin compromiso a largo plazo.',
  },
  {
    q: '¿Ofrecen descuentos educativos o sin fines de lucro?',
    a: 'Sí. Ofrecemos un 50% de descuento para organizaciones sin fines de lucro verificadas, facultades de derecho y grupos de derechos civiles. Contáctanos en support@mycasevalue.com con prueba de estado.',
  },
];

export default function SpanishPricingPage() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-base)' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header */}
      <div className="border-b" style={{ borderColor: 'var(--border-default)', background: 'linear-gradient(180deg, #FFFFFF 0%, #F9F8F6 100%)' }}>
        <div className="max-w-5xl mx-auto px-6 py-16 sm:py-24">
          <a href="/es" className="inline-flex items-center gap-2 text-sm font-semibold mb-6 transition-colors hover:opacity-80" style={{ color: '#111111' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            Volver a MyCaseValue
          </a>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-bold tracking-[1.5px] uppercase mb-4"
            style={{ background: 'rgba(17,17,17,0.15)', color: '#111111' }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            PRECIOS
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-extrabold mb-4" style={{ color: 'var(--fg-primary)', letterSpacing: '-1.5px' }}>
            Precios Simples y Transparentes
          </h1>
          <p className="text-lg leading-relaxed max-w-2xl" style={{ color: 'var(--fg-muted)' }}>
            Accede a datos de resultados de casos federales desde solo $5.99. Sin tarifas ocultas. Sin suscripciones obligatorias (a menos que quieras acceso ilimitado).
          </p>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">

          {/* Single Report Card */}
          <div className="rounded-2xl border p-8 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/20"
            style={{
              borderColor: 'var(--border-default)',
              background: 'rgba(25, 32, 56, 0.4)',
              backdropFilter: 'blur(10px)',
            }}>
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--fg-primary)' }}>
                Informe Individual
              </h3>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-extrabold" style={{ color: '#111111', fontFamily: 'PT Mono' }}>
                  $5.99
                </span>
                <span className="text-sm" style={{ color: 'var(--fg-muted)' }}>
                  de una sola vez
                </span>
              </div>
            </div>

            <ul className="space-y-3 mb-8">
              {[
                '1 informe completo con datos de jueces',
                'Análisis de cronología de casos',
                'Comparación de casos',
                'Tarjeta de compartir',
                'Explicación en lenguaje claro',
                'Citas de fuentes',
              ].map((feature, i) => (
                <li key={i} className="flex items-start gap-3">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0D9488" strokeWidth="2.5" className="flex-shrink-0 mt-1">
                    <path d="M20 6L9 17l-5-5"/>
                  </svg>
                  <span className="text-sm" style={{ color: 'var(--fg-muted)' }}>
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            <a href="/es/odds"
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all"
              style={{ background: '#111111', color: '#FFFFFF' }}>
              Obtener Informe
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
          </div>

          {/* Unlimited Reports Card */}
          <div className="rounded-2xl border-2 p-8 transition-all duration-300 hover:shadow-lg md:scale-105 hover:shadow-amber-500/30"
            style={{
              borderColor: '#F59E0B',
              background: 'rgba(25, 32, 56, 0.6)',
              backdropFilter: 'blur(10px)',
            }}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-bold tracking-[1.5px] uppercase mb-4"
              style={{ background: 'rgba(245,158,11,0.15)', color: '#F59E0B' }}>
              MEJOR VALOR
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--fg-primary)' }}>
                Informes Ilimitados
              </h3>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-extrabold" style={{ color: '#F59E0B', fontFamily: 'PT Mono' }}>
                  $9.99
                </span>
                <span className="text-sm" style={{ color: 'var(--fg-muted)' }}>
                  de una sola vez
                </span>
              </div>
            </div>

            <ul className="space-y-3 mb-8">
              {[
                'Todo en Informe Individual',
                'Informes ilimitados para todos los tipos de casos y distritos',
                'Herramienta de comparación',
                'Estimador de costos',
                'Soporte prioritario',
              ].map((feature, i) => (
                <li key={i} className="flex items-start gap-3">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2.5" className="flex-shrink-0 mt-1">
                    <path d="M20 6L9 17l-5-5"/>
                  </svg>
                  <span className="text-sm" style={{ color: 'var(--fg-muted)' }}>
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            <a href="/es/odds"
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all"
              style={{ background: '#F59E0B', color: '#FFFFFF' }}>
              Obtener Ilimitado
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
          </div>

          {/* Attorney Mode Card */}
          <div className="rounded-2xl border p-8 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20"
            style={{
              borderColor: 'var(--border-default)',
              background: 'rgba(25, 32, 56, 0.4)',
              backdropFilter: 'blur(10px)',
            }}>
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--fg-primary)' }}>
                Modo Abogado
              </h3>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-extrabold" style={{ color: '#8B5CF6', fontFamily: 'PT Mono' }}>
                  $29.99
                </span>
                <span className="text-sm" style={{ color: 'var(--fg-muted)' }}>
                  /mes
                </span>
              </div>
            </div>

            <ul className="space-y-3 mb-8">
              {[
                'Todo en Informes Ilimitados',
                'Panel de análisis de jueces',
                'Predictor de mociones',
                'Exportación de escritos (PDF/DOCX)',
                'Consultas en masa',
                'Widgets incrustables',
                'Programa de afiliados',
                'Opciones de etiqueta blanca',
              ].map((feature, i) => (
                <li key={i} className="flex items-start gap-3">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="2.5" className="flex-shrink-0 mt-1">
                    <path d="M20 6L9 17l-5-5"/>
                  </svg>
                  <span className="text-sm" style={{ color: 'var(--fg-muted)' }}>
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            <a href="/es/odds"
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all"
              style={{ background: '#8B5CF6', color: 'white' }}>
              Iniciar Modo Abogado
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
          </div>

        </div>

        {/* Plan Notes */}
        <div className="text-center p-6 rounded-xl mb-12" style={{ background: '#FFFFFF', borderColor: 'var(--border-default)', border: '1px solid var(--border-default)' }}>
          <p className="text-sm" style={{ color: 'var(--fg-muted)' }}>
            Todos los planes incluyen citas de fuentes, soporte bilingüe (inglés/español) y un aviso de "no es asesoramiento legal".
          </p>
        </div>

        {/* Pricing FAQ */}
        <section>
          <h2 className="text-2xl font-display font-bold mb-8 text-center" style={{ color: 'var(--fg-primary)' }}>
            Preguntas sobre Precios
          </h2>
          <div className="space-y-3 max-w-3xl mx-auto">
            {pricingFaqs.map((faq, idx) => (
              <details
                key={idx}
                className="group p-5 rounded-xl border transition-colors cursor-pointer"
                style={{
                  borderColor: 'var(--border-default)',
                  background: '#FFFFFF',
                }}
              >
                <summary className="flex items-start justify-between font-semibold select-none" style={{ color: 'var(--fg-primary)' }}>
                  <span className="flex-1 text-base leading-relaxed pr-4">
                    {faq.q}
                  </span>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="flex-shrink-0 transition-transform group-open:rotate-180"
                    style={{ color: '#111111', marginTop: '2px' }}
                  >
                    <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </summary>
                <div className="pt-4 mt-4 border-t" style={{ borderColor: 'var(--border-default)' }}>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--fg-muted)' }}>
                    {faq.a}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="mt-16 text-center p-8 rounded-xl border" style={{ borderColor: 'var(--border-default)', background: 'linear-gradient(135deg, #FFFFFF 0%, #FFFFFF 100%)' }}>
          <h2 className="text-2xl font-display font-bold mb-3" style={{ color: 'var(--fg-primary)' }}>
            ¿Listo para ver tus probabilidades de caso?
          </h2>
          <p className="mb-6 max-w-xl mx-auto" style={{ color: 'var(--fg-muted)' }}>
            Genera tu informe básico gratuito instantáneamente, luego actualiza a características premium si deseas análisis más profundo.
          </p>
          <a href="/es/odds"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all"
            style={{ background: '#111111', color: '#FFFFFF' }}>
            Consultar Mi Tipo de Caso
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
