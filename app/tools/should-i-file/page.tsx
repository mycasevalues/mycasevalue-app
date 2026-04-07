import { Metadata } from 'next';
import { SITE_URL } from '../../../lib/site-config';
import DecisionTree from '../../../components/DecisionTree';

export const metadata: Metadata = {
  title: 'Should I File? Decision Tree | MyCaseValue',
  description:
    'Interactive questionnaire to help unrepresented individuals assess whether their situation may qualify as a federal case. Get jurisdiction guidance, win rates, and next steps.',
  alternates: { canonical: `${SITE_URL}/tools/should-i-file` },
  openGraph: {
    title: 'Should I File? Decision Tree | MyCaseValue',
    description:
      'Interactive questionnaire to help unrepresented individuals assess whether their situation may qualify as a federal case. Get jurisdiction guidance, win rates, and next steps.',
    url: `${SITE_URL}/tools/should-i-file`,
    type: 'website',
  },
};

export default function ShouldIFileToolPage() {
  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      <DecisionTree />
    </main>
  );
}
