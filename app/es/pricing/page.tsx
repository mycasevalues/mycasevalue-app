/**
 * Spanish pricing page (/es/pricing)
 * Wrapper that passes lang="es" context to the English pricing component
 */

import { Metadata } from 'next';
import { SITE_URL } from '../../../lib/site-config';

export const metadata: Metadata = {
  title: 'Precios — MyCaseValue | Informes desde $5.99',
  description: 'Informes asequibles de resultados de casos federales. Elige entre Informe Individual ($5.99), Informes Ilimitados ($9.99) o Modo Abogado ($29.99/mes). Todos los planes incluyen citas de fuentes y soporte bilingüe.',
  alternates: {
    canonical: `${SITE_URL}/es/pricing`,
    languages: {
      en: `${SITE_URL}/pricing`,
      es: `${SITE_URL}/es/pricing`,
    },
  },
  openGraph: {
    title: 'Precios — MyCaseValue | Planes de Datos de Casos Federales',
    description: 'Precios transparentes y asequibles para datos de resultados de casos federales. Informes individuales, acceso ilimitado o panel de análisis de abogados.',
    type: 'website',
    url: `${SITE_URL}/es/pricing`,
    locale: 'es_ES',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${SITE_URL}/es` },
        { '@type': 'ListItem', position: 2, name: 'Precios', item: `${SITE_URL}/es/pricing` },
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
    <div className="min-h-screen" style={{ background: '#F5F6F7' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header with Dark Navy Background */}
      <div className="border-b" style={{ background: '#00172E', borderColor: '#D5D8DC' }}>
        <div className="max-w-5xl mx-auto px-6 py-12 sm:py-16">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 mb-8 text-sm">
            <a href="/es" style={{ color: '#FFFFFF' }} className="hover:opacity-80 transition-opacity">
              Inicio
            </a>
            <span style={{ color: '#FFFFFF' }} className="opacity-60">/</span>
            <span style={{ color: '#FFFFFF' }} className="opacity-80">Precios</span>
          </nav>

          {/* Red Accent Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 text-[11px] font-bold tracking-[1.5px] uppercase mb-6"
            style={{ background: '#E8171F', color: '#FFFFFF', borderRadius: '4px' }}>
            OPCIONES DE PAGO
          </div>

          <h1 className="text-3xl sm:text-4xl font-display font-extrabold mb-4" style={{ color: '#FFFFFF' }}>
            Precios Simples y Transparentes
          </h1>
          <p className="text-lg leading-relaxed max-w-2xl" style={{ color: '#FFFFFF', opacity: 0.9 }}>
            Accede a datos de resultados de casos federales desde solo $5.99. Sin tarifas ocultas. Sin suscripciones obligatorias (a menos que quieras acceso ilimitado).
          </p>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">

          {/* Single Report Card */}
          <div className="border p-8 transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/20"
            style={{
              borderRadius: '4px',
              borderColor: '#D5D8DC',
              background: '#FFFFFF',
            }}>
            <div className="mb-6">
              <h3 className="text-lg font-display font-semibold mb-2" style={{ color: '#212529' }}>
                Informe Individual
              </h3>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-extrabold" style={{ color: '#212529', fontFamily: 'PT Mono' }}>
                  $5.99
                </span>
                <span className="text-sm" style={{ color: '#455A64' }}>
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
                  <span className="text-sm" style={{ color: '#455A64' }}>
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            <button
              disabled={true}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold transition-all"
              style={{ borderRadius: '4px', background: '#F5F6F7', color: '#455A64', opacity: 0.5, cursor: 'not-allowed' }}>
              Próximamente
            </button>
          </div>

          {/* Unlimited Reports Card */}
          <div className="border-2 p-8 transition-all duration-300 hover:shadow-lg md:scale-105 hover:shadow-amber-500/30"
            style={{
              borderRadius: '4px',
              borderColor: '#E8171F',
              background: '#FFFFFF',
            }}>
            <div className="inline-flex items-center gap-2 px-3 py-1 text-[11px] font-bold tracking-[1.5px] uppercase mb-4"
              style={{ borderRadius: '4px', background: '#FCE7E8', color: '#E8171F' }}>
              MEJOR VALOR
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-display font-semibold mb-2" style={{ color: '#212529' }}>
                Informes Ilimitados
              </h3>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-extrabold" style={{ color: '#E8171F', fontFamily: 'PT Mono' }}>
                  $9.99
                </span>
                <span className="text-sm" style={{ color: '#455A64' }}>
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
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#E8171F" strokeWidth="2.5" className="flex-shrink-0 mt-1">
                    <path d="M20 6L9 17l-5-5"/>
                  </svg>
                  <span className="text-sm" style={{ color: '#455A64' }}>
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            <button
              disabled={true}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold transition-all"
              style={{ borderRadius: '4px', background: '#E8171F', color: '#FFFFFF', opacity: 0.5, cursor: 'not-allowed' }}>
              Próximamente
            </button>
          </div>

          {/* Attorney Mode Card */}
          <div className="border p-8 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20"
            style={{
              borderRadius: '4px',
              borderColor: '#D5D8DC',
              background: '#FFFFFF',
            }}>
            <div className="mb-6">
              <h3 className="text-lg font-display font-semibold mb-2" style={{ color: '#212529' }}>
                Modo Abogado
              </h3>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-extrabold" style={{ color: '#006997', fontFamily: 'PT Mono' }}>
                  $29.99
                </span>
                <span className="text-sm" style={{ color: '#455A64' }}>
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
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#006997" strokeWidth="2.5" className="flex-shrink-0 mt-1">
                    <path d="M20 6L9 17l-5-5"/>
                  </svg>
                  <span className="text-sm" style={{ color: '#455A64' }}>
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            <button
              disabled={true}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold transition-all"
              style={{ borderRadius: '4px', background: '#006997', color: 'white', opacity: 0.5, cursor: 'not-allowed' }}>
              Próximamente
            </button>
          </div>

        </div>

        {/* Plan Notes */}
        <div className="text-center p-6 mb-12" style={{ background: '#FFFFFF', borderColor: '#D5D8DC', border: '1px solid #D5D8DC', borderRadius: '4px' }}>
          <p className="text-sm" style={{ color: '#455A64' }}>
            Todos los planes incluyen citas de fuentes, soporte bilingüe (inglés/español) y un aviso de "no es asesoramiento legal".
          </p>
        </div>

        {/* Pricing FAQ */}
        <section>
          <h2 className="text-2xl font-display font-bold mb-8 text-center" style={{ color: '#212529' }}>
            Preguntas sobre Precios
          </h2>
          <div className="space-y-3 max-w-3xl mx-auto">
            {pricingFaqs.map((faq, idx) => (
              <details
                key={idx}
                className="group p-5 border transition-colors cursor-pointer"
                style={{
                  borderRadius: '4px',
                  borderColor: '#D5D8DC',
                  background: '#FFFFFF',
                }}
              >
                <summary className="flex items-start justify-between font-semibold select-none" style={{ color: '#212529' }}>
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
                    style={{ color: '#212529', marginTop: '2px' }}
                  >
                    <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </summary>
                <div className="pt-4 mt-4 border-t" style={{ borderColor: '#D5D8DC' }}>
                  <p className="text-sm leading-relaxed" style={{ color: '#455A64' }}>
                    {faq.a}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="mt-16 text-center p-8 border" style={{ borderColor: '#D5D8DC', background: '#FFFFFF', borderRadius: '4px' }}>
          <h2 className="text-2xl font-display font-bold mb-3" style={{ color: '#212529' }}>
            ¿Listo para ver tus probabilidades de caso?
          </h2>
          <p className="mb-6 max-w-xl mx-auto" style={{ color: '#455A64' }}>
            Genera tu informe básico gratuito instantáneamente, luego actualiza a características premium si deseas análisis más profundo.
          </p>
          <a href="/odds"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold transition-all"
            style={{ borderRadius: '4px', background: '#E8171F', color: '#FFFFFF' }}>
            Consultar Mi Tipo de Caso
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
        </section>

      </div>

      {/* Footer disclaimer */}
      <div className="border-t py-6 text-center" style={{ borderColor: '#D5D8DC' }}>
        <p className="text-[11px] max-w-xl mx-auto px-6" style={{ color: '#455A64' }}>
          MyCaseValue proporciona datos históricos agregados de registros judiciales federales públicos únicamente.
          No somos un bufete de abogados. Esto no es asesoramiento legal. No se crea relación abogado-cliente al usar esta herramienta.
          © {new Date().getFullYear()} MyCaseValue LLC.
        </p>
      </div>
    </div>
  );
}
