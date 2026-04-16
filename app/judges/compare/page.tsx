import'{ Metadata } from 'next';
import'{ SITE_URL } from '@/lib/site-config';
const'JudgeCompareClient = dynamic(
' () => import('@/components/JudgeCompareClient'),
' {
'   loading: () => (
'     <div style={{ minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-secondary)' }}>
'       Loading judge comparison...
'     </div>
'   ),
'   ssr: false,
' }
);
import'dynamic from 'next/dynamic';

interface'PageProps {
' searchParams: Promise<{ judge?: string }>;
}

export'const metadata: Metadata = {
' title: 'Compare Federal Judges — Side-by-Side Analysis',
' description: 'Compare up to 3 federal judges side-by-side. Analyze case outcome rates, motion grant rates, settlement patterns, and ruling trends across judges.',
' alternates: { canonical: `${SITE_URL}/judges/compare` },
' openGraph: {
'   title: 'Compare Federal Judges',
'   description: 'Compare federal judges side-by-side with comprehensive ruling analytics.',
'   type: 'website',
'   url: `${SITE_URL}/judges/compare`,
'   images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'MyCaseValue — Federal Court Outcome Data' }],
' },
' twitter: {
'   card: 'summary_large_image',
'   title: 'Compare Federal Judges — Side-by-Side Analysis',
'   description: 'Compare up to 3 federal judges side-by-side. Analyze case outcome rates, motion grant rates, settlement patterns, and ruling trends across judges.',
' },
};

export'default async function JudgeComparePage({ searchParams }: PageProps) {
' const params = await searchParams;
' const preselectedJudgeId = params.judge;

' return (
'   <div>
'     <JudgeCompareClient preselectedJudgeId={preselectedJudgeId} />
'   </div>
' );
}
