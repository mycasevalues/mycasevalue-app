import { Metadata } from 'next';

/**
 * Spanish (es) root layout
 * Wraps all Spanish-language routes with lang="es" attribute
 */

export const metadata: Metadata = {
  title: 'MyCaseValue en Español',
  description: 'Datos de resultados de casos federales en español. Tasas de victoria, acuerdos y cronogramas de 4.1M+ casos judiciales federales.',
  openGraph: {
    locale: 'es_ES',
  },
  alternates: {
    canonical: 'https://mycasevalues.com/es',
  },
};

export default function SpanishLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
