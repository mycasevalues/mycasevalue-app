import { Metadata } from 'next';
import { SITE_URL } from '../../../lib/site-config';
import DecisionTree from '../../../components/DecisionTree';

export const metadata: Metadata = {
  title: 'Should I File? Decision Tree',
  description:
    'Interactive questionnaire to help unrepresented individuals assess whether their situation may qualify as a federal case. Get jurisdiction guidance, win rates, and next steps.',
  alternates: { canonical: `${SITE_URL}/tools/should-i-file` },
  openGraph: {
    title: 'Should I File? Decision Tree | MyCaseValue',
    description:
      'Interactive questionnaire to help unrepresented individuals assess whether their situation may qualify as a federal case. Get jurisdiction guidance, win rates, and next steps.',
    url: `${SITE_URL}/tools/should-i-file`,
    type: 'website',
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'MyCaseValue — Federal Court Outcome Data' }],
  },
};

export default function ShouldIFileToolPage() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-surface-1)' }}>
      <DecisionTree />
    </div>
  );
}
