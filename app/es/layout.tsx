import { Metadata } from 'next';
import { SITE_URL } from '../../lib/site-config';

/**
 * Spanish (es) root layout
 * Wraps all Spanish-language routes with lang="es" attribute
 */

export const metadata: Metadata = {
  title: 'MyCaseValue en Español',
  description: 'Datos de resultados de casos federales en español. Tasas de victoria, acuerdos y cronogramas de 5.1M+ casos judiciales federales.',
  openGraph: {
    locale: 'es_ES',
  },
  alternates: {
    canonical: `${SITE_URL}/es`,
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
