/**
'* Spanish pricing page (/es/pricing)
'* Wrapper that passes lang="es" context to the English pricing component
'*/

import'Link from 'next/link';
import'{ Metadata } from 'next';
import'{ SITE_URL } from '../../../lib/site-config';

export'const metadata: Metadata = {
' title: 'Precios — Informes desde $5.99',
' description: 'Informes asequibles de resultados de casos federales. Elige entre Informe Individual ($5.99), Informes Ilimitados ($9.99/mes) o Modo Abogado ($29.99/mes). Todos los planes incluyen citas de fuentes y soporte bilingüe.',
' alternates: {
'   canonical: `${SITE_URL}/es/pricing`,
'   languages: {
'     en: `${SITE_URL}/pricing`,
'     es: `${SITE_URL}/es/pricing`,
'   },
' },
' openGraph: {
'   title: 'Precios — MyCaseValue | Planes de Datos de Casos Federales',
'   description: 'Precios transparentes y asequibles para datos de resultados de casos federales. Informes individuales, acceso ilimitado o panel de análisis de abogados.',
'   type: 'website',
'   url: `${SITE_URL}/es/pricing`,
'   locale: 'es_ES',
'   siteName: 'MyCaseValue',
'   images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630 }],
' },
' twitter: {
'   card: 'summary_large_image',
'   title: 'Precios — MyCaseValue | Planes de Datos de Casos Federales',
'   description: 'Precios transparentes y asequibles para datos de resultados de casos federales.',
' },
};

const'jsonLd = {
' '@context': 'https://schema.org',
' '@graph': [
'   {
'     '@type': 'BreadcrumbList',
'     itemListElement: [
'       { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${SITE_URL}/es` },
'       { '@type': 'ListItem', position: 2, name: 'Precios', item: `${SITE_URL}/es/pricing` },
'     ],
'   },
' ],
};

const'pricingFaqs = [
' {
'   q: '¿Puedo obtener un reembolso?',
'   a: 'Sí. Si compras un informe y no estás satisfecho, puedes solicitar un reembolso dentro de 30 días. Queremos que confíes en nuestros datos.',
' },
' {
'   q: '¿Es esto asesoramiento legal?',
'   a: 'No. MyCaseValue proporciona datos históricos agregados de registros judiciales federales públicos únicamente. No es asesoramiento legal, y no se crea ninguna relación abogado-cliente. Siempre consulta a un abogado con licencia.',
' },
' {
'   q: '¿Qué métodos de pago aceptan?',
'   a: 'Aceptamos todas las principales tarjetas de crédito (Visa, Mastercard, American Express), Apple Pay y Google Pay. Todos los pagos se procesan de forma segura a través de Stripe.',
' },
' {
'   q: '¿Puedo actualizar de un plan a otro?',
'   a: 'Sí. Si compras un Informe Individual y luego quieres Informes Ilimitados, podemos aplicar tu pago hacia la actualización. Contacta a support@mycasevalues.com para detalles.',
' },
' {
'   q: '¿Hay un nivel gratuito?',
'   a: 'Sí. Puedes generar informes básicos gratuitos sin crear una cuenta ni pagar nada. Las funciones premium requieren un pago único o una suscripción mensual.',
' },
' {
'   q: '¿Qué incluye el "Modo Abogado"?',
'   a: 'El Modo Abogado incluye informes ilimitados, panel de análisis de jueces, predictor de mociones, capacidad de consultas en masa, exportación de escritos (PDF/DOCX), widgets incrustables, acceso al programa de afiliados y opciones de etiqueta blanca para bufetes.',
' },
' {
'   q: '¿Puedo cancelar mi suscripción de Modo Abogado?',
'   a: 'Sí, puedes cancelar en cualquier momento. Tu suscripción continúa hasta el final de tu ciclo de facturación, luego se detiene. Sin compromiso a largo plazo.',
' },
' {
'   q: '¿Ofrecen descuentos educativos o sin fines de lucro?',
'   a: 'Sí. Ofrecemos un 50% de descuento para organizaciones sin fines de lucro verificadas, facultades de derecho y grupos de derechos civiles. Contáctanos en support@mycasevalues.com con prueba de estado.',
' },
];

export'default function SpanishPricingPage() {
' return (
'   <div className="min-h-screen" style={{ background: 'var(--color-surface-1)' }}>
'     <script
'       type="application/ld+json"
'       dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
'     />

'     {/* Header with Dark Navy Background */}
'     <div className="border-b" style={{ background: 'var(--accent-primary)', borderColor: 'var(--border-default)' }}>
'       <div className="max-w-5xl mx-auto px-6 py-12 sm:py-16">
'         {/* Breadcrumb Navigation */}
'         <nav className="flex items-center gap-2 mb-8 text-sm">
'           <a href="/es" style={{ color: 'var(--color-surface-0)' }} className="hover:opacity-80 transition-opacity">
'             Inicio
'           </a>
'           <span style={{ color: 'var(--color-surface-0)' }} className="opacity-60">/</span>
'           <span style={{ color: 'var(--color-surface-0)' }} className="opacity-80">Precios</span>
'         </nav>

'         {/* Red Accent Badge */}
'         <div className="inline-flex items-center gap-2 px-3 py-1.5 text-[11px] font-bold tracking-[1.5px] uppercase mb-6"
'           style={{ background: 'var(--accent-primary)', color: 'var(--color-surface-0)', borderRadius: '12px' }}>
'           OPCIONES DE PAGO
'         </div>

'         <h1 className="text-3xl sm:text-4xl font-display font-extrabold mb-4" style={{ color: 'var(--color-surface-0)' }}>
'           Precios Simples y Transparentes
'         </h1>
'         <p className="text-lg leading-relaxed max-w-2xl" style={{ color: 'var(--color-surface-0)', opacity: 0.9 }}>
'           Accede a datos de resultados de casos federales desde solo $5.99. Sin tarifas ocultas. Sin suscripciones obligatorias (a menos que quieras acceso ilimitado).
'         </p>
'       </div>
'     </div>

'     {/* Pricing Cards */}
'     <div className="max-w-6xl mx-auto px-6 py-16">
'       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">

'         {/* Single Report Card */}
'         <div className="border p-8 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/20"
'           style={{
'             borderRadius: '12px',
'             borderColor: 'var(--border-default)',
'             background: 'var(--color-surface-0)',
'           }}>
'           <div className="mb-6">
'             <h3 className="text-lg font-display font-semibold mb-2" style={{ color: 'var(--color-text-primary)' }}>
'               Informe Individual
'             </h3>
'             <div className="flex items-baseline gap-2">
'               <span className="text-4xl font-extrabold" style={{ color: 'var(--color-text-primary)', fontFamily: 'PT Mono' }}>
'                 $5.99
'               </span>
'               <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
'                 de una sola vez
'               </span>
'             </div>
'           </div>

'           <ul className="space-y-3 mb-8">
'             {[
'               '1 informe completo con datos de jueces',
'               'Análisis de cronología de casos',
'               'Comparación de casos',
'               'Tarjeta de compartir',
'               'Explicación en lenguaje claro',
'               'Citas de fuentes',
'             ].map((feature, i) => (
'               <li key={i} className="flex items-start gap-3">
'                 <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1e40af" strokeWidth="2.5" className="flex-shrink-0 mt-1">
'                   <path d="M20 6L9 17l-5-5"/>
'                 </svg>
'                 <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
'                   {feature}
'                 </span>
'               </li>
'             ))}
'           </ul>

'           <Link
'             href="/search"
'             className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold transition-all hover:opacity-90"
'             style={{ borderRadius: '12px', background: 'var(--color-surface-1)', color: 'var(--color-text-primary)', border: '1px solid var(--border-default)' }}>
'             Comprar un informe
'           </Link>
'         </div>

'         {/* Unlimited Reports Card */}
'         <div className="border-2 p-8 transition-all duration-300 hover:shadow-lg md:scale-105 hover:shadow-amber-500/30"
'           style={{
'             borderRadius: '12px',
'             borderColor: 'var(--accent-primary)',
'             background: 'var(--color-surface-0)',
'           }}>
'           <div className="inline-flex items-center gap-2 px-3 py-1 text-[11px] font-bold tracking-[1.5px] uppercase mb-4"
'             style={{ borderRadius: '12px', background: 'rgba(10, 102, 194, 0.08)', color: 'var(--accent-primary)' }}>
'             MEJOR VALOR
'           </div>

'           <div className="mb-6">
'             <h3 className="text-lg font-display font-semibold mb-2" style={{ color: 'var(--color-text-primary)' }}>
'               Informes Ilimitados
'             </h3>
'             <div className="flex items-baseline gap-2">
'               <span className="text-4xl font-extrabold" style={{ color: 'var(--accent-primary)', fontFamily: 'PT Mono' }}>
'                 $9.99
'               </span>
'               <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
'                 /mes
'               </span>
'             </div>
'           </div>

'           <ul className="space-y-3 mb-8">
'             {[
'               'Todo en Informe Individual',
'               'Informes ilimitados para todos los tipos de casos y distritos',
'               'Herramienta de comparación',
'               'Estimador de costos',
'               'Soporte prioritario',
'             ].map((feature, i) => (
'               <li key={i} className="flex items-start gap-3">
'                 <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" strokeWidth="2.5" className="flex-shrink-0 mt-1">
'                   <path d="M20 6L9 17l-5-5"/>
'                 </svg>
'                 <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
'                   {feature}
'                 </span>
'               </li>
'             ))}
'           </ul>

'           <Link
'             href="/sign-up"
'             className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold transition-all hover:opacity-90"
'             style={{ borderRadius: '12px', background: 'var(--accent-primary)', color: 'var(--color-surface-0)' }}>
'             Obtener ilimitado
'           </Link>
'         </div>

'         {/* Attorney Mode Card */}
'         <div className="border p-8 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/20"
'           style={{
'             borderRadius: '12px',
'             borderColor: 'var(--border-default)',
'             background: 'var(--color-surface-0)',
'           }}>
'           <div className="mb-6">
'             <h3 className="text-lg font-display font-semibold mb-2" style={{ color: 'var(--color-text-primary)' }}>
'               Modo Abogado
'             </h3>
'             <div className="flex items-baseline gap-2">
'               <span className="text-4xl font-extrabold" style={{ color: 'var(--accent-primary-hover)', fontFamily: 'PT Mono' }}>
'                 $29.99
'               </span>
'               <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
'                 /mes
'               </span>
'             </div>
'           </div>

'           <ul className="space-y-3 mb-8">
'             {[
'               'Todo en Informes Ilimitados',
'               'Panel de análisis de jueces',
'               'Predictor de mociones',
'               'Exportación de escritos (PDF/DOCX)',
'               'Consultas en masa',
'               'Widgets incrustables',
'               'Programa de afiliados',
'               'Opciones de etiqueta blanca',
'             ].map((feature, i) => (
'               <li key={i} className="flex items-start gap-3">
'                 <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1e40af" strokeWidth="2.5" className="flex-shrink-0 mt-1">
'                   <path d="M20 6L9 17l-5-5"/>
'                 </svg>
'                 <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
'                   {feature}
'                 </span>
'               </li>
'             ))}
'           </ul>

'           <Link
'             href="/attorney"
'             className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold transition-all hover:opacity-90"
'             style={{ borderRadius: '12px', background: 'var(--accent-primary-hover)', color: 'var(--color-surface-0)' }}>
'             Probar Modo Abogado
'           </Link>
'         </div>

'       </div>

'       {/* Plan Notes */}
'       <div className="text-center p-6 mb-12" style={{ background: 'var(--color-surface-0)', borderColor: 'var(--border-default)', border: '1px solid var(--border-default)', borderRadius: '12px' }}>
'         <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
'           Todos los planes incluyen citas de fuentes, soporte bilingüe (inglés/español) y un aviso de "no es asesoramiento legal".
'         </p>
'       </div>

'       {/* Pricing FAQ */}
'       <section>
'         <h2 className="text-2xl font-display font-bold mb-8 text-center" style={{ color: 'var(--color-text-primary)' }}>
'           Preguntas sobre Precios
'         </h2>
'         <div className="space-y-3 max-w-3xl mx-auto">
'           {pricingFaqs.map((faq, idx) => (
'             <details
'               key={idx}
'               className="group p-5 border transition-colors cursor-pointer"
'               style={{
'                 borderRadius: '12px',
'                 borderColor: 'var(--border-default)',
'                 background: 'var(--color-surface-0)',
'               }}
'             >
'               <summary className="flex items-start justify-between font-semibold select-none" style={{ color: 'var(--color-text-primary)' }}>
'                 <span className="flex-1 text-base leading-relaxed pr-4">
'                   {faq.q}
'                 </span>
'                 <svg
'                   width="20"
'                   height="20"
'                   viewBox="0 0 24 24"
'                   fill="none"
'                   stroke="currentColor"
'                   strokeWidth="2"
'                   className="flex-shrink-0 transition-transform group-open:rotate-180"
'                   style={{ color: 'var(--color-text-primary)', marginTop: '2px' }}
'                 >
'                   <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
'                 </svg>
'               </summary>
'               <div className="pt-4 mt-4 border-t" style={{ borderColor: 'var(--border-default)' }}>
'                 <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
'                   {faq.a}
'                 </p>
'               </div>
'             </details>
'           ))}
'         </div>
'       </section>

'       {/* CTA Section */}
'       <section className="mt-16 text-center p-8 border" style={{ borderColor: 'var(--border-default)', background: 'var(--color-surface-0)', borderRadius: '12px' }}>
'         <h2 className="text-2xl font-display font-bold mb-3" style={{ color: 'var(--color-text-primary)' }}>
'           ¿Listo para ver tus probabilidades de caso?
'         </h2>
'         <p className="mb-6 max-w-xl mx-auto" style={{ color: 'var(--color-text-secondary)' }}>
'           Genera tu informe básico gratuito instantáneamente, luego actualiza a características premium si deseas análisis más profundo.
'         </p>
'         <a href="/odds"
'           className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold transition-all"
'           style={{ borderRadius: '20px', background: 'var(--accent-primary)', color: 'var(--color-surface-0)' }}>
'           Consultar Mi Tipo de Caso
'           <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
'         </a>
'       </section>

'     </div>

'     {/* Available Tools Section */}
'     <div style={{ background: 'var(--color-surface-0)', borderTop: '1px solid var(--border-default)', padding: '48px 24px' }}>
'       <div className="max-w-6xl mx-auto px-6">
'         <h2 className="text-2xl font-display font-bold mb-6" style={{ color: 'var(--color-text-primary)' }}>
'           Herramientas Disponibles
'         </h2>
'         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
'           <Link href="/search">
'             <div className="p-4 border transition-all hover:shadow-lg" style={{ borderColor: 'var(--border-default)', background: 'var(--color-surface-0)', borderRadius: '12px', cursor: 'pointer' }}>
'               <div className="w-10 h-10 flex items-center justify-center mb-3" style={{ background: 'var(--color-surface-1)', borderRadius: '12px' }}>
'                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1e40af" strokeWidth="2">
'                   <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
'                 </svg>
'               </div>
'               <h3 className="font-semibold text-sm" style={{ color: 'var(--color-text-primary)' }}>Buscar Casos</h3>
'             </div>
'           </Link>

'           <Link href="/calculator">
'             <div className="p-4 border transition-all hover:shadow-lg" style={{ borderColor: 'var(--border-default)', background: 'var(--color-surface-0)', borderRadius: '12px', cursor: 'pointer' }}>
'               <div className="w-10 h-10 flex items-center justify-center mb-3" style={{ background: 'var(--color-surface-1)', borderRadius: '12px' }}>
'                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1e40af" strokeWidth="2">
'                   <rect x="4" y="2" width="16" height="20" rx="2"/><path d="M8 6h8M8 10h8M8 14h8M8 18h4"/>
'                 </svg>
'               </div>
'               <h3 className="font-semibold text-sm" style={{ color: 'var(--color-text-primary)' }}>Calculadora</h3>
'             </div>
'           </Link>

'           <Link href="/compare">
'             <div className="p-4 border transition-all hover:shadow-lg" style={{ borderColor: 'var(--border-default)', background: 'var(--color-surface-0)', borderRadius: '12px', cursor: 'pointer' }}>
'               <div className="w-10 h-10 flex items-center justify-center mb-3" style={{ background: 'var(--color-surface-1)', borderRadius: '12px' }}>
'                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1e40af" strokeWidth="2">
'                   <path d="M12 3v18M3 12h18"/><path d="M9 7h2v10H9zM13 14h2v3h-2z"/>
'                 </svg>
'               </div>
'               <h3 className="font-semibold text-sm" style={{ color: 'var(--color-text-primary)' }}>Comparar Tipos</h3>
'             </div>
'           </Link>

'           <Link href="/nos-explorer">
'             <div className="p-4 border transition-all hover:shadow-lg" style={{ borderColor: 'var(--border-default)', background: 'var(--color-surface-0)', borderRadius: '12px', cursor: 'pointer' }}>
'               <div className="w-10 h-10 flex items-center justify-center mb-3" style={{ background: 'var(--color-surface-1)', borderRadius: '12px' }}>
'                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1e40af" strokeWidth="2">
'                   <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M3 21v-5h5"/>
'                 </svg>
'               </div>
'               <h3 className="font-semibold text-sm" style={{ color: 'var(--color-text-primary)' }}>Explorador NOS</h3>
'             </div>
'           </Link>
'         </div>

'         {/* Language Switcher */}
'         <div className="mt-12 p-6 text-center" style={{ background: 'var(--color-surface-1)', borderRadius: '12px' }}>
'           <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
'             This page is also available in <Link href="/pricing" style={{ color: 'var(--accent-primary-hover)', fontWeight: '500', textDecoration: 'none' }} className="hover:underline">English</Link>
'           </p>
'         </div>
'       </div>
'     </div>

'     {/* Footer disclaimer */}
'     <div className="border-t py-6 text-center" style={{ borderColor: 'var(--border-default)' }}>
'       <p className="text-[11px] max-w-xl mx-auto px-6" style={{ color: 'var(--color-text-secondary)' }}>
'         MyCaseValue proporciona datos históricos agregados de registros judiciales federales públicos únicamente.
'         No somos un bufete de abogados. Esto no es asesoramiento legal. No se crea relación abogado-cliente al usar esta herramienta.
'         © {new Date().getFullYear()} MyCaseValue LLC.
'       </p>
'     </div>
'   </div>
' );
}
