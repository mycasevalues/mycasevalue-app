import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/site-config';
import WidgetGenerator from '@/components/WidgetGenerator';

export const metadata: Metadata = {
  title: 'Widget Generator | MyCaseValue',
  description: 'Build and customize embeddable case settlement widgets for your website.',
  alternates: { canonical: `${SITE_URL}/solutions/api/widget` },
};

export default function WidgetGeneratorPage() {
  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 24px' }}>
        <div style={{ marginBottom: '40px' }}>
          <h1 style={{
            fontSize: '36px',
            fontWeight: 700,
            marginBottom: '12px',
            color: '#1f2937',
          }}>
            Widget Generator
          </h1>
          <p style={{
            fontSize: '16px',
            color: '#6b7280',
            maxWidth: '600px',
          }}>
            Create embeddable widgets to display case settlement data on your website. Customize the case type, district, and display style.
          </p>
        </div>
        <WidgetGenerator />
      </div>
    </main>
  );
}
