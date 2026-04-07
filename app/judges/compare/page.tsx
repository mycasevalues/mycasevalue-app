import { Metadata } from 'next';
import { SITE_URL } from '@/lib/site-config';
import JudgeCompareClient from '@/components/JudgeCompareClient';

interface PageProps {
  searchParams: Promise<{ judge?: string }>;
}

export const metadata: Metadata = {
  title: 'Compare Federal Judges — Side-by-Side Analysis | MyCaseValue',
  description: 'Compare up to 3 federal judges side-by-side. Analyze plaintiff win rates, motion grant rates, settlement patterns, and ruling trends across judges.',
  alternates: { canonical: `${SITE_URL}/judges/compare` },
  openGraph: {
    title: 'Compare Federal Judges',
    description: 'Compare federal judges side-by-side with comprehensive ruling analytics.',
    type: 'website',
    url: `${SITE_URL}/judges/compare`,
  },
};

export default async function JudgeComparePage({ searchParams }: PageProps) {
  const params = await searchParams;
  const preselectedJudgeId = params.judge;

  return (
    <div>
      <JudgeCompareClient preselectedJudgeId={preselectedJudgeId} />
    </div>
  );
}
