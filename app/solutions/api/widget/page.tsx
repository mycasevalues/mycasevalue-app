import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/site-config';
import WidgetGenerator from '@/components/WidgetGenerator';

export const metadata: Metadata = {
  title: 'Widget Generator',
  description: 'Build and customize embeddable case settlement widgets for your website.',
  alternates: { canonical: `${SITE_URL}/solutions/api/widget` },
  openGraph: {
    title: 'Widget Generator',
    description: 'Create embeddable widgets to display case settlement data on your website.',
    type: 'website',
    url: `${SITE_URL}/solutions/api/widget`,
  },
};

export default function WidgetGeneratorPage() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-surface-0)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 24px' }}>
        <div style={{ marginBottom: '48px' }}>
          <h1 style={{
            fontSize: '36px',
            fontWeight: 700,
            marginBottom: '12px',
            color: 'var(--text-primary)',
          }}>
            Widget Generator
          </h1>
          <p style={{
            fontSize: '16px',
            color: 'var(--text-tertiary)',
            maxWidth: '600px',
          }}>
            Create embeddable widgets to display case settlement data on your website. Customize the case type, district, and display style.
          </p>
        </div>
        <WidgetGenerator />
      </div>
    </div>
  );
}
