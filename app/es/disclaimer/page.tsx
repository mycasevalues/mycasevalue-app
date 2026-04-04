/**
 * Spanish disclaimer page (/es/disclaimer)
 */

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Descargo de Responsabilidad — MyCaseValue',
  alternates: {
    canonical: 'https://www.mycasevalues.com/es/disclaimer',
    languages: {
      en: 'https://www.mycasevalues.com/disclaimer',
      es: 'https://www.mycasevalues.com/es/disclaimer',
    },
  },
  openGraph: {
    locale: 'es_ES',
  },
};

export default function SpanishDisclaimerPage() {
  return (
    <div className="min-h-screen" style={{ background: '#EDEEEE' }}>
      <div className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-display font-bold mb-8" style={{ color: '#212529' }}>
          Descargo de Responsabilidad
        </h1>

        <div className="prose max-w-none space-y-6" style={{ color: '#455A64' }}>
          <section>
            <h2 className="text-2xl font-semibold mb-4" style={{ color: '#212529' }}>
              Declaración General
            </h2>
            <p>
              MyCaseValue es una herramienta de investigación que proporciona datos históricos agregados de registros judiciales federales públicos. NO es asesoramiento legal, una predicción de resultados, o una evaluación de tu caso específico. No se crea ninguna relación abogado-cliente por el uso de MyCaseValue.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4" style={{ color: '#212529' }}>
              No es Asesoramiento Legal
            </h2>
            <p>
              MyCaseValue proporciona información histórica sobre cómo han terminado casos federales similares. Esta información no:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>Evalúa tu situación legal específica</li>
              <li>Hace predicciones sobre tu caso</li>
              <li>Reemplaza el asesoramiento de un abogado con licencia</li>
              <li>Crea una relación abogado-cliente</li>
              <li>Protege información bajo privilegio abogado-cliente</li>
            </ul>
            <p className="mt-4">
              Si tienes preguntas legales, debes consultar a un abogado con licencia en tu estado.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4" style={{ color: '#212529' }}>
              Limitaciones de Datos
            </h2>
            <p>
              Nuestros datos históricos provienen de registros judiciales federales públicos (FJC, CourtListener, PACER) y tienen las siguientes limitaciones:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>Los datos pasados no garantizan resultados futuros</li>
              <li>La codificación de resultados puede no capturar victorias parciales o acuerdos complejos</li>
              <li>Las montos de acuerdos generalmente no se reportan públicamente (datos confidenciales)</li>
              <li>Hay un retraso de 1-2 meses entre el cierre del caso y la publicación de datos</li>
              <li>Las estadísticas pueden cambiar a medida que se publican más datos</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4" style={{ color: '#212529' }}>
              Sin Garantía
            </h2>
            <p>
              MyCaseValue se proporciona "tal cual". Aunque hacemos nuestro mejor esfuerzo para proporcionar datos precisos, no ofrecemos ninguna garantía de:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>Precisión o integridad de los datos</li>
              <li>Disponibilidad o funcionamiento ininterrumpido del servicio</li>
              <li>Idoneidad para un propósito particular</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4" style={{ color: '#212529' }}>
              Privacidad de los Datos
            </h2>
            <p>
              La información que proporciones (tipo de caso, estado, etc.) se usa únicamente para generar tu informe. No almacenamos tus datos de forma permanente ni los compartimos con terceros. Consulta nuestra política de privacidad completa en:
            </p>
            <p className="font-semibold" style={{ color: '#212529' }}>
              https://mycasevalues.com/privacy
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4" style={{ color: '#212529' }}>
              Limitación de Responsabilidad
            </h2>
            <p>
              En la máxima medida permitida por la ley, MyCaseValue no será responsable por daños indirectos, incidentales, especiales, consecuentes o punitivos, incluida la pérdida de beneficios, datos o uso de datos, que surja del acceso o uso de esta herramienta.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4" style={{ color: '#212529' }}>
              Contacto
            </h2>
            <p>
              Si tienes preguntas sobre este descargo de responsabilidad, contáctanos en:
            </p>
            <p className="font-semibold" style={{ color: '#212529' }}>
              support@mycasevalue.com
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
