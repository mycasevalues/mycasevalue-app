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

// Dynamic rendering — judge data fetched at request time from Supabase
export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{ judgeId: string }>;
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { judgeId } = await params;
  const judge = await getJudgeById(judgeId);

  if (!judge) {
    return {
      title: 'Judge Profile Not Found',
      description: 'The judge profile you are looking for does not exist.',
    };
  }

  const statistics = await getJudgeStatistics(judgeId);
  const aggregated = aggregateJudgeStats(statistics);

  const title = `Judge ${judge.full_name} — Federal Court Statistics | MyCaseValue`;
  const description = `Research Judge ${judge.full_name}'s ruling patterns and statistics. Win rate: ${(aggregated.plaintiffWinRate || 0).toFixed(1)}%. ${judge.district_id} District, ${judge.circuit} Circuit. ${aggregated.totalCases} cases analyzed.`;

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
      <div style={{ background: '#F7F7F5', minHeight: '100vh' }}>
      {/* Header with breadcrumb */}
      <div style={{ borderBottom: '1px solid #E0E0E0', background: '#FFFFFF' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            style={{
              paddingTop: '16px',
              paddingBottom: '16px',
              fontSize: '13px',
              fontFamily: 'var(--font-inter)',
              color: '#444444',
            }}
          >
            <ol style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: 0, padding: 0, listStyle: 'none' }}>
              <li>
                <Link href="/" style={{ color: '#E65C00', textDecoration: 'none' }}>
                  Home
                </Link>
              </li>
              <li style={{ color: '#CCCCCC' }}>›</li>
              <li>
                <Link href="/judges" style={{ color: '#E65C00', textDecoration: 'none' }}>
                  Judges
                </Link>
              </li>
              <li style={{ color: '#CCCCCC' }}>›</li>
              {judge.circuit && (
                <>
                  <li>
                    <Link href={`/judges?circuit=${judge.circuit}`} style={{ color: '#E65C00', textDecoration: 'none' }}>
                      {judge.circuit} Circuit
                    </Link>
                  </li>
                  <li style={{ color: '#CCCCCC' }}>›</li>
                </>
              )}
              {judge.district_id && (
                <>
                  <li>
                    <Link href={`/judges?district=${judge.district_id}`} style={{ color: '#E65C00', textDecoration: 'none' }}>
                      {judge.district_id}
                    </Link>
                  </li>
                  <li style={{ color: '#CCCCCC' }}>›</li>
                </>
              )}
              <li style={{ color: '#1A1A1A', fontWeight: '600' }}>{judge.full_name}</li>
            </ol>
          </nav>

          {/* Page heading */}
          <div style={{ paddingTop: '0px', paddingBottom: '24px' }}>
            <div style={{ fontSize: '12px', fontFamily: 'var(--font-inter)', color: '#444444', marginBottom: '8px', letterSpacing: '0.5px', textTransform: 'uppercase', fontWeight: '600' }}>
              JUDGE PROFILE
            </div>
            <h1
              style={{
                fontSize: '32px',
                fontFamily: 'var(--font-heading)',
                fontWeight: '700',
                color: '#1A1A1A',
                margin: '0 0 12px 0',
              }}
            >
              Judge {judge.full_name}
            </h1>
            <p
              style={{
                fontSize: '14px',
                fontFamily: 'var(--font-inter)',
                color: '#444444',
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
                  fontFamily: 'var(--font-inter)',
                  color: '#444444',
                  flex: '1 1 auto',
                }}
              >
                Appointed {appointmentYear || 'N/A'} by President{' '}
                <span style={{ fontWeight: '600', color: '#1A1A1A' }}>
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
                      borderRadius: '8px',
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
                  background: 'rgba(0,82,204,0.04)',
                  border: '1px solid #E65C00',
                  borderRadius: '8px',
                  fontSize: '12px',
                  fontFamily: 'var(--font-inter)',
                  color: '#CC5200',
                  fontWeight: '500',
                  flexShrink: 0,
                }}
              >
                <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: '#E65C00' }} />
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
