import { Metadata } from 'next';
import { SITE_URL } from '../../../lib/site-config';
import CaseStrengthAssessment from '../../../components/CaseStrengthAssessment';

export const metadata: Metadata = {
  title: 'Case Strength Assessment',
  description:
    'Evaluate your case strength across key legal factors. Get a personalized assessment score, win rate comparison, and recommendations for next steps.',
  alternates: { canonical: `${SITE_URL}/tools/case-strength` },
  openGraph: {
    title: 'Case Strength Assessment',
    description:
      'Evaluate your case strength across key legal factors. Get a personalized assessment score, win rate comparison, and recommendations for next steps.',
    url: `${SITE_URL}/tools/case-strength`,
    type: 'website',
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'MyCaseValue — Federal Court Outcome Data' }],
  },
};

export default function CaseStrengthPage() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-surface-1)' }}>
      <CaseStrengthAssessment />
    </div>
  );
}
