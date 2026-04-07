import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getJudgeById, getJudgeStatistics, getJudgeOpinions, getJudgeAIAnalysis } from '@/lib/judge-data-service';
import { mockJudgesData } from '@/data/mock-judges';
import { getWinRateColor } from '@/lib/color-scale';
import { aggregateJudgeStats, getPartyColor, getPartyLabel } from '@/lib/supabase-judges';
import JudgeProfileClient from '@/components/JudgeProfileClient';
import JudgeAlertButton from '@/components/JudgeAlertButton';
import { SITE_URL } from '@/lib/site-config';

interface PageProps {
  params: Promise<{ judgeId: string }>;
}

// Generate static params for mock judges
export async function generateStaticParams() {
  return mockJudgesData.judges.map((judge) => ({
    judgeId: judge.id,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { judgeId } = await params;
  const judge = await getJudgeById(judgeId);

  if (!judge) {
    return {
      title: 'Judge Profile Not Found — MyCaseValue',
      description: 'The judge profile you are looking for does not exist.',
    };
  }

  const statistics = await getJudgeStatistics(judgeId);
  const aggregated = aggregateJudgeStats(statistics);

  const title = `Judge ${judge.full_name} — Federal Court Statistics | MyCaseValue`;
  const description = `Research Judge ${judge.full_name}'s ruling patterns and statistics. Plaintiff win rate: ${(aggregated.plaintiffWinRate || 0).toFixed(1)}%. ${judge.district_id} District, ${judge.circuit} Circuit. ${aggregated.totalCases} cases analyzed.`;

  const ogImageUrl = new URL('/api/og', SITE_URL);
  ogImageUrl.searchParams.set('title', `Judge ${judge.full_name}`);
  ogImageUrl.searchParams.set('judge', judgeId);

  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/judges/${judgeId}` },
    openGraph: {
      title,
      description,
      type: 'website',
      url: `${SITE_URL}/judges/${judgeId}`,
      images: [
        {
          url: ogImageUrl.toString(),
          width: 1200,
          height: 630,
          alt: `Judge ${judge.full_name} Profile`,
        },
      ],
    },
  };
}

export const revalidate = 604800; // ISR: revalidate every 7 days

export default async function JudgeProfilePage({ params }: PageProps) {
  const { judgeId } = await params;
  const judge = await getJudgeById(judgeId);

  if (!judge) {
    notFound();
  }

  // Fetch judge statistics and opinions
  const statistics = await getJudgeStatistics(judgeId);
  const opinions = await getJudgeOpinions(judgeId, 10);
  const aiAnalysis = await getJudgeAIAnalysis(judgeId);

  // Aggregate statistics across all NOS codes
  const aggregated = aggregateJudgeStats(statistics);

  // Get district averages from mock data (in production, fetch from DB)
  const districtStats = mockJudgesData.statistics.filter(
    (s) => mockJudgesData.judges.find((j) => j.id === s.judge_id)?.district_id === judge.district_id
  );
  const districtAveraged = aggregateJudgeStats(districtStats);

  // Extract appointment year
  const appointmentYear = judge.appointment_date ? new Date(judge.appointment_date).getFullYear() : null;

  // Get color for party
  const partyColor = getPartyColor(judge.party_of_appointing_president);
  const partyLabel = getPartyLabel(judge.party_of_appointing_president);

  // Build JSON-LD structured data
  const jsonLdData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: judge.full_name,
    givenName: judge.first_name || undefined,
    familyName: judge.last_name || undefined,
    jobTitle: judge.position || 'United States District Judge',
    description: `Federal judge in the ${judge.district_id} District, ${judge.circuit} Circuit`,
    ...(judge.appointment_date && {
      dateOfAppointment: judge.appointment_date,
    }),
    ...(judge.appointing_president && {
      appointedBy: judge.appointing_president,
    }),
    workLocation: {
      '@type': 'Place',
      name: `${judge.district_id} District Court`,
    },
  };

  return (
    <>
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
      />
      <div style={{ background: '#F7F8FA', minHeight: '100vh' }}>
      {/* Header with breadcrumb */}
      <div style={{ borderBottom: '1px solid #E5E7EB', background: '#FFFFFF' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            style={{
              paddingTop: '16px',
              paddingBottom: '16px',
              fontSize: '13px',
              fontFamily: 'var(--font-body)',
              color: '#4B5563',
            }}
          >
            <ol style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: 0, padding: 0, listStyle: 'none' }}>
              <li>
                <Link href="/" style={{ color: '#0A66C2', textDecoration: 'none' }}>
                  Home
                </Link>
              </li>
              <li style={{ color: '#B0B8C1' }}>›</li>
              <li>
                <Link href="/judges" style={{ color: '#0A66C2', textDecoration: 'none' }}>
                  Judges
                </Link>
              </li>
              <li style={{ color: '#B0B8C1' }}>›</li>
              {judge.circuit && (
                <>
                  <li>
                    <Link href={`/judges?circuit=${judge.circuit}`} style={{ color: '#0A66C2', textDecoration: 'none' }}>
                      {judge.circuit} Circuit
                    </Link>
                  </li>
                  <li style={{ color: '#B0B8C1' }}>›</li>
                </>
              )}
              {judge.district_id && (
                <>
                  <li>
                    <Link href={`/judges?district=${judge.district_id}`} style={{ color: '#0A66C2', textDecoration: 'none' }}>
                      {judge.district_id}
                    </Link>
                  </li>
                  <li style={{ color: '#B0B8C1' }}>›</li>
                </>
              )}
              <li style={{ color: '#0f0f0f', fontWeight: '600' }}>{judge.full_name}</li>
            </ol>
          </nav>

          {/* Page heading */}
          <div style={{ paddingTop: '0px', paddingBottom: '24px' }}>
            <div style={{ fontSize: '12px', fontFamily: 'var(--font-body)', color: '#4B5563', marginBottom: '8px', letterSpacing: '0.5px', textTransform: 'uppercase', fontWeight: '600' }}>
              JUDGE PROFILE
            </div>
            <h1
              style={{
                fontSize: '32px',
                fontFamily: 'var(--font-heading)',
                fontWeight: '700',
                color: '#0f0f0f',
                margin: '0 0 12px 0',
              }}
            >
              Judge {judge.full_name}
            </h1>
            <p
              style={{
                fontSize: '14px',
                fontFamily: 'var(--font-body)',
                color: '#4B5563',
                margin: '0 0 12px 0',
              }}
            >
              {judge.position || 'United States District Judge'} · {judge.district_id || 'Federal Court'} · {judge.circuit || 'N/A'} Circuit
            </p>

            {/* Appointment info and action row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '12px', flexWrap: 'wrap' }}>
              <div
                style={{
                  fontSize: '13px',
                  fontFamily: 'var(--font-body)',
                  color: '#4B5563',
                  flex: '1 1 auto',
                }}
              >
                Appointed {appointmentYear || 'N/A'} by President{' '}
                <span style={{ fontWeight: '600', color: '#0f0f0f' }}>
                  {judge.appointing_president || 'Unknown'}
                </span>
                {partyLabel !== '—' && (
                  <span
                    style={{
                      display: 'inline-block',
                      marginLeft: '8px',
                      padding: '2px 8px',
                      background: partyColor,
                      color: '#FFFFFF',
                      borderRadius: '4px',
                      fontSize: '12px',
                      fontWeight: '600',
                    }}
                  >
                    {judge.party_of_appointing_president}
                  </span>
                )}
              </div>

              {/* Data freshness badge */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '4px 12px',
                  background: '#EDF3FB',
                  border: '1px solid #0A66C2',
                  borderRadius: '4px',
                  fontSize: '12px',
                  fontFamily: 'var(--font-body)',
                  color: '#004182',
                  fontWeight: '500',
                  flexShrink: 0,
                }}
              >
                <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: '#0A66C2' }} />
                Data as of {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
              </div>

              {/* Judge Alert Button */}
              <div style={{ flexShrink: 0 }}>
                <JudgeAlertButton judgeId={judge.id} judgeName={judge.full_name} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px' }}>
        <JudgeProfileClient
          judge={judge}
          statistics={statistics}
          aggregated={aggregated}
          districtAverage={districtAveraged}
          opinions={opinions}
          aiAnalysis={aiAnalysis}
        />
      </div>
      </div>
    </>
  );
}
