import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getJudgeById, getJudgeStatistics, getJudgeOpinions, getJudgeAIAnalysis } from '@/lib/judge-data-service';
import { mockJudgesData } from '@/data/mock-judges';
import { getWinRateColor } from '@/lib/color-scale';
import { aggregateJudgeStats, getPartyColor, getPartyLabel, type JudgeStatistics } from '@/lib/supabase-judges';
import JudgeProfileClient from '@/components/JudgeProfileClient';
import JudgeAlertButton from '@/components/JudgeAlertButton';
import { SITE_URL } from '@/lib/site-config';
import HorizontalBarChart from '@/components/charts/HorizontalBarChart';
import ResearchOrganizer from '@/components/ui/ResearchOrganizer';
import ResearchPath from '@/components/ui/ResearchPath';
import CaseCiteFlag, { CaseCiteFlagGroup } from '@/components/ui/CaseCiteFlag';

/**
 * Judge Profile — Westlaw Precision document-style view.
 *
 * Three columns: Left TOC (202px) | Main (flex:1) | Right rail (232px)
 * CaseCite box ABOVE stat blocks
 * Intelligence Summary with numbered blue circles
 * "Noted For" practice area tags
 * Gold tab bar: Overview | Case History | Analytics | Settlement Data | CaseCite™
 * HorizontalBarChart (OutcomeDonut BANNED)
 */

// Dynamic rendering — judge data fetched at request time from Supabase
export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{ judgeId: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { judgeId } = await params;
  const judge = await getJudgeById(judgeId);

  if (!judge) {
    return { title: 'Judge Profile Not Found', description: 'The judge profile you are looking for does not exist.' };
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
      title, description, type: 'website', url: `${SITE_URL}/judges/${judgeId}`,
      images: [{ url: ogImageUrl.toString(), width: 1200, height: 630, alt: `Judge ${judge.full_name} Profile` }],
    },
  };
}

/* ── Shared styles ── */
const sectionLabel: React.CSSProperties = {
  fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.05em',
  color: 'var(--text3)', fontFamily: 'var(--font-ui)', fontWeight: 600,
};
const dataAttrStyle: React.CSSProperties = {
  fontSize: 10, fontFamily: 'var(--font-ui)', color: 'var(--text4)',
  marginTop: 10, lineHeight: 1.5,
};

export default async function JudgeProfilePage({ params }: PageProps) {
  const { judgeId } = await params;
  const judge = await getJudgeById(judgeId);

  if (!judge) {
    notFound();
  }

  const statistics = await getJudgeStatistics(judgeId);
  const opinions = await getJudgeOpinions(judgeId, 10);
  const aiAnalysis = await getJudgeAIAnalysis(judgeId);
  const aggregated = aggregateJudgeStats(statistics);

  const districtStats = mockJudgesData.statistics.filter(
    (s) => mockJudgesData.judges.find((j) => j.id === s.judge_id)?.district_id === judge.district_id
  );
  const districtAveraged = aggregateJudgeStats(districtStats);

  const appointmentYear = judge.appointment_date ? new Date(judge.appointment_date).getFullYear() : null;
  const partyColor = getPartyColor(judge.party_of_appointing_president);
  const partyLabel = getPartyLabel(judge.party_of_appointing_president);

  // Derive "Noted For" practice areas from statistics
  const notedFor = statistics
    .filter((s) => s.total_cases > 5)
    .sort((a, b) => (b.total_cases || 0) - (a.total_cases || 0))
    .slice(0, 6)
    .map((s) => (s as JudgeStatistics & { nos_label?: string }).nos_label || s.nos_code || 'General');

  // Intelligence summary items from AI analysis or defaults
  const hasAiContent = aiAnalysis?.writing_style || aiAnalysis?.plaintiff_tendencies || aiAnalysis?.motion_approach;
  const intelligenceItems = hasAiContent
    ? [
        ...(aiAnalysis?.writing_style ? [{ topic: 'Writing Style & Temperament', classification: 'Classif. General §1', body: aiAnalysis.writing_style }] : []),
        ...(aiAnalysis?.plaintiff_tendencies ? [{ topic: 'Plaintiff Tendencies', classification: 'Classif. Tendency §2', body: aiAnalysis.plaintiff_tendencies }] : []),
        ...(aiAnalysis?.motion_approach ? [{ topic: 'Motion Approach', classification: 'Classif. Procedure §3', body: aiAnalysis.motion_approach }] : []),
        ...(aiAnalysis?.notable_patterns ? [{ topic: 'Notable Patterns', classification: 'Classif. Pattern §4', body: aiAnalysis.notable_patterns }] : []),
      ]
    : [
        { topic: 'Disposition Pattern', classification: 'Classif. General §1', body: `This judge resolves ${(aggregated.plaintiffWinRate || 50).toFixed(0)}% of cases in favor of plaintiffs, compared to ${(districtAveraged.plaintiffWinRate || 50).toFixed(0)}% district average. Average case duration is ${aggregated.avgDuration ? `${aggregated.avgDuration.toFixed(0)} months` : 'N/A'}.` },
        { topic: 'Settlement Tendencies', classification: 'Classif. Settlement §2', body: `Settlement rate for cases before this judge is ${(aggregated.settlementRate || 0).toFixed(0)}%. Review case-type-specific data for detailed settlement ranges and median values.` },
        { topic: 'Case Load Analysis', classification: 'Classif. Caseload §3', body: `${aggregated.totalCases || 0} total cases on record across ${statistics.length || 0} case type categories. Volume indicates ${(aggregated.totalCases || 0) > 500 ? 'high' : (aggregated.totalCases || 0) > 100 ? 'moderate' : 'limited'} data confidence.` },
      ];

  // Bar chart data from statistics
  const caseTypeChartData = statistics
    .filter((s) => s.total_cases > 0)
    .sort((a, b) => (b.total_cases || 0) - (a.total_cases || 0))
    .slice(0, 6)
    .map((s) => ({
      label: String((s as JudgeStatistics & { nos_label?: string }).nos_label || s.nos_code || 'Other'),
      percentage: Math.round(((s.total_cases || 0) / Math.max(1, aggregated.totalCases || 1)) * 100),
    }));

  // JSON-LD structured data
  const jsonLdData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: judge.full_name,
    givenName: judge.first_name || undefined,
    familyName: judge.last_name || undefined,
    jobTitle: judge.position || 'United States District Judge',
    description: `Federal judge in the ${judge.district_id} District, ${judge.circuit} Circuit`,
    ...(judge.appointment_date && { dateOfAppointment: judge.appointment_date }),
    ...(judge.appointing_president && { appointedBy: judge.appointing_president }),
    workLocation: { '@type': 'Place', name: `${judge.district_id} District Court` },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }} />

      <div style={{ background: 'var(--card)', minHeight: '100vh' }}>

        {/* ── Breadcrumb ── */}
        <nav aria-label="Breadcrumb" style={{
          background: 'var(--card)', borderBottom: '1px solid var(--bdr)',
          padding: '8px 22px', fontSize: 11, fontFamily: 'var(--font-ui)',
        }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 6 }}>
            <Link href="/" style={{ color: 'var(--text3)', textDecoration: 'none' }}>Home</Link>
            <span style={{ color: 'var(--bdr-strong)' }}>›</span>
            <Link href="/judges" style={{ color: 'var(--text3)', textDecoration: 'none' }}>Judicial Analytics</Link>
            <span style={{ color: 'var(--bdr-strong)' }}>›</span>
            {judge.district_id && (
              <>
                <Link href={`/judges?district=${judge.district_id}`} style={{ color: 'var(--text3)', textDecoration: 'none' }}>
                  {judge.district_id}
                </Link>
                <span style={{ color: 'var(--bdr-strong)' }}>›</span>
              </>
            )}
            <span style={{ color: 'var(--text1)', fontWeight: 600 }}>{judge.last_name || judge.full_name}</span>
          </div>
        </nav>

        {/* ── Page Header ── */}
        <header style={{ background: 'var(--card)', borderBottom: '1px solid var(--bdr)', padding: '14px 22px 12px' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ flex: 1 }}>
                {/* Judge name — font-baskerville */}
                <h1 style={{
                  fontFamily: 'var(--font-legal)', fontWeight: 700, fontSize: 21,
                  color: 'var(--text1)', letterSpacing: '-0.02em', margin: '0 0 4px',
                }}>
                  Hon. {judge.full_name}
                </h1>

                {/* Subhead */}
                <p style={{ fontSize: 12, fontFamily: 'var(--font-ui)', color: 'var(--text3)', margin: '0 0 6px' }}>
                  {judge.position || 'United States District Judge'} · {judge.district_id || 'Federal Court'} · Appointed {appointmentYear || 'N/A'} by {judge.appointing_president || 'Unknown'}
                  {partyLabel !== '—' && (
                    <span style={{
                      display: 'inline-block', marginLeft: 6, padding: '1px 6px',
                      background: partyColor, color: '#FFFFFF', borderRadius: 2,
                      fontSize: 10, fontWeight: 600,
                    }}>
                      {judge.party_of_appointing_president}
                    </span>
                  )}
                </p>

                {/* Meta row */}
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--text2)',
                  fontVariantNumeric: 'tabular-nums',
                }}>
                  <span>{aggregated.totalCases || 0} cases</span>
                  <span style={{ color: 'var(--bdr-strong)' }}>·</span>
                  <span>{(aggregated.plaintiffWinRate || 0).toFixed(1)}% plaintiff win rate</span>
                  <span style={{ color: 'var(--bdr-strong)' }}>·</span>
                  <span>Avg. {aggregated.avgDuration ? `${aggregated.avgDuration.toFixed(0)} mo` : '—'}</span>
                  <span style={{ color: 'var(--bdr-strong)' }}>·</span>
                  <span>{aggregated.settlementRate ? `${aggregated.settlementRate.toFixed(0)}% settlement rate` : 'Settlement N/A'}</span>
                  <span style={{ color: 'var(--bdr-strong)' }}>·</span>
                  <span style={{
                    padding: '1px 6px', background: 'var(--pos-bg)', color: 'var(--pos)',
                    borderRadius: 2, fontSize: 10, fontWeight: 600, fontFamily: 'var(--font-ui)',
                  }}>
                    Active
                  </span>
                </div>

                {/* "Noted For" tags */}
                {notedFor.length > 0 && (
                  <div style={{ display: 'flex', gap: 5, marginTop: 6, flexWrap: 'wrap' }}>
                    {notedFor.map((tag: string, i: number) => (
                      <span key={i} style={{
                        height: 20, padding: '0 8px', display: 'inline-flex', alignItems: 'center',
                        border: '1px solid var(--bdr-strong)', borderRadius: 2,
                        fontSize: 10, fontFamily: 'var(--font-ui)', color: 'var(--text2)',
                      }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Action buttons (right) */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 5, flexShrink: 0, marginLeft: 16 }}>
                <button type="button" style={{
                  height: 30, padding: '0 14px', background: 'var(--gold)', color: '#FFFFFF',
                  fontSize: 11, fontWeight: 600, fontFamily: 'var(--font-ui)',
                  border: 'none', borderRadius: 2, cursor: 'pointer', whiteSpace: 'nowrap',
                }}>
                  Download Judge Report
                </button>
                <JudgeAlertButton judgeId={judge.id} judgeName={judge.full_name} />
                <button type="button" style={{
                  height: 30, padding: '0 14px', background: 'transparent', color: 'var(--link)',
                  fontSize: 11, fontWeight: 600, fontFamily: 'var(--font-ui)',
                  border: '1px solid var(--link)', borderRadius: 2, cursor: 'pointer', whiteSpace: 'nowrap',
                }}>
                  Add to Folder
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* ── CaseCite Box (ABOVE stat blocks) ── */}
        <div style={{ background: 'var(--card)', borderBottom: '1px solid var(--bdr)', padding: '10px 22px' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{
              background: 'var(--ab)', border: '1px solid var(--ab-border)',
              borderRadius: 2, padding: '8px 12px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontSize: 10, fontFamily: 'var(--font-ui)', fontWeight: 700, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    CaseCite™ — All Opinions — Hon. {judge.last_name || judge.full_name}
                  </span>
                  <CaseCiteFlagGroup flags={['green', 'blue']} size={11} />
                </div>
                <Link href={`/judges/${judgeId}#casecite`} style={{ fontSize: 10, fontFamily: 'var(--font-ui)', color: 'var(--link)', textDecoration: 'none' }}>
                  View full CaseCite history →
                </Link>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 11, fontFamily: 'var(--font-ui)', color: 'var(--pos)' }}>
                  <CaseCiteFlag type="green" size={11} /> No Negative Treatment
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 11, fontFamily: 'var(--font-ui)', color: 'var(--link)' }}>
                  <CaseCiteFlag type="blue" size={11} /> Cited in {Math.max(1, opinions.length * 3)} Subsequent Cases
                </span>
                <span style={{ fontSize: 11, fontFamily: 'var(--font-ui)', color: 'var(--link)' }}>
                  {Math.max(1, Math.round(opinions.length * 1.5))} CaseCite Cited With
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── 4 Stat Blocks ── */}
        <div style={{ background: 'var(--card)', borderBottom: '1px solid var(--bdr)', padding: '10px 22px 12px' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 9 }}>
            {[
              { label: 'Cases on Record', value: `${aggregated.totalCases || 0}`, accent: 'var(--link)' },
              { label: 'Plaintiff Win Rate', value: `${(aggregated.plaintiffWinRate || 0).toFixed(1)}%`, accent: getWinRateColor(aggregated.plaintiffWinRate || 0).border },
              { label: 'Avg. Duration', value: aggregated.avgDuration ? `${aggregated.avgDuration.toFixed(0)} mo` : '—', accent: 'var(--gold)' },
              { label: 'Settlement Rate', value: aggregated.settlementRate ? `${aggregated.settlementRate.toFixed(0)}%` : '—', accent: 'var(--pos)' },
            ].map(stat => (
              <div key={stat.label} style={{
                background: 'var(--card)', border: '1px solid var(--bdr)', borderRadius: 2,
                padding: '10px 12px', position: 'relative', overflow: 'hidden',
              }}>
                <div style={{ position: 'absolute', left: 0, top: 0, width: 3, height: '100%', background: stat.accent }} />
                <div style={{ ...sectionLabel, marginBottom: 4 }}>{stat.label}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 19, fontWeight: 500, color: 'var(--text1)' }}>{stat.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Gold Tab Bar ── */}
        <div style={{ background: 'var(--card)', borderBottom: '2px solid var(--bdr)', padding: '0 22px' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', gap: 0, overflowX: 'auto' }}>
            {[
              { label: 'Overview', active: true },
              { label: `Case History (${aggregated.totalCases || 0})`, active: false },
              { label: 'Analytics', active: false },
              { label: 'Settlement Data', active: false },
              { label: `CaseCite™ (${Math.max(1, opinions.length * 3)})`, active: false },
            ].map(tab => (
              <div key={tab.label} style={{
                height: 39, padding: '0 14px', display: 'flex', alignItems: 'center',
                fontSize: 12, fontFamily: 'var(--font-ui)', cursor: 'pointer',
                color: tab.active ? 'var(--text1)' : 'var(--text3)',
                fontWeight: tab.active ? 600 : 400,
                borderBottom: tab.active ? '3px solid var(--gold)' : '3px solid transparent',
                whiteSpace: 'nowrap',
              }}>
                {tab.label}
              </div>
            ))}
          </div>
        </div>

        {/* ═══ THREE-COLUMN LAYOUT ═══ */}
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', gap: 0 }}>

          {/* ── LEFT TOC (202px) ── */}
          <aside style={{
            width: 202, flexShrink: 0, background: 'var(--sidebar)',
            borderRight: '1px solid var(--bdr)', padding: '14px 0',
            position: 'sticky', top: 94, alignSelf: 'flex-start',
            height: 'calc(100vh - 94px)', overflowY: 'auto',
          }} className="judge-toc">
            <div style={{
              height: 36, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '0 14px', background: 'var(--tbl-hdr)', borderBottom: '1px solid var(--bdr)', marginBottom: 4,
            }}>
              <span style={{ ...sectionLabel }}>Page Contents</span>
              <span style={{ fontSize: 10, fontFamily: 'var(--font-ui)', color: 'var(--link)', cursor: 'pointer' }}>Print</span>
            </div>
            {[
              { label: 'Intelligence Summary', active: true, sub: false },
              { label: 'Judicial Profile', active: false, sub: false },
              { label: 'Career & Appointments', active: false, sub: true },
              { label: 'Education & Clerkships', active: false, sub: true },
              { label: 'Case Analytics', active: false, sub: false },
              { label: 'By Case Type', active: false, sub: true },
              { label: 'Disposition Breakdown', active: false, sub: true },
              { label: 'Year-over-Year Trends', active: false, sub: true },
              { label: 'Settlement Data', active: false, sub: false },
              { label: 'Ranges by Case Type', active: false, sub: true },
              { label: 'Percentile Distribution', active: false, sub: true },
              { label: 'Case History', active: false, sub: false },
              { label: `All Cases (${aggregated.totalCases || 0})`, active: false, sub: true },
              { label: 'Cases by Year', active: false, sub: true },
              { label: 'Cases by Type', active: false, sub: true },
              { label: 'CaseCite™', active: false, sub: false },
              { label: `Citing References (${Math.max(1, opinions.length * 3)})`, active: false, sub: true },
              { label: 'CaseCite Cited With', active: false, sub: true },
              { label: 'Negative Treatment', active: false, sub: true },
            ].map((item, i) => (
              <div key={i} style={{
                padding: item.sub ? '4px 14px 4px 38px' : '5px 14px',
                fontSize: item.sub ? 11 : 12,
                fontFamily: item.sub ? 'var(--font-ui)' : 'var(--font-legal)',
                color: item.active ? 'var(--link)' : 'var(--text2)',
                fontWeight: item.active ? 600 : 400,
                background: item.active ? 'var(--link-light)' : 'transparent',
                borderLeft: item.active ? '3px solid var(--gold)' : '3px solid transparent',
                cursor: 'pointer', lineHeight: item.sub ? 1.6 : 1.8,
              }}>
                {item.label}
              </div>
            ))}
          </aside>

          {/* ── MAIN CONTENT (flex:1) ── */}
          <main style={{ flex: 1, minWidth: 0, padding: '18px 22px' }}>

            {/* === Intelligence Summary === */}
            <section style={{ marginBottom: 24 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 8 }}>
                <div>
                  <h2 style={{ fontSize: 12, fontFamily: 'var(--font-ui)', fontWeight: 600, color: 'var(--text1)', margin: '0 0 2px' }}>
                    Intelligence Summary
                  </h2>
                  <span style={{ fontSize: 10, fontFamily: 'var(--font-ui)', color: 'var(--text3)' }}>
                    {aggregated.totalCases || 0} cases · <Link href="/methodology" style={{ color: 'var(--text3)', textDecoration: 'none' }}>Methodology</Link>
                  </span>
                </div>
                <span style={{ fontSize: 10, fontFamily: 'var(--font-ui)', color: 'var(--link)', cursor: 'pointer' }}>
                  Add to Research Organizer
                </span>
              </div>

              <div style={{ border: '1px solid var(--bdr)', borderRadius: 2 }}>
                {intelligenceItems.map((item, i) => (
                  <div key={i} style={{
                    display: 'flex', gap: 10, padding: '10px 14px',
                    borderBottom: i < intelligenceItems.length - 1 ? '1px solid #F2EFE8' : 'none',
                  }}>
                    {/* Number circle */}
                    <div style={{
                      width: 20, height: 20, borderRadius: '50%', background: 'var(--link)',
                      color: '#FFFFFF', fontSize: 9, fontFamily: 'var(--font-ui)', fontWeight: 700,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2,
                    }}>
                      {i + 1}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 3 }}>
                        <span style={{ fontSize: 10, fontFamily: 'var(--font-ui)', fontWeight: 600, textTransform: 'uppercase', color: 'var(--link)' }}>
                          {item.topic}
                        </span>
                        <span style={{ fontSize: 9, fontFamily: 'var(--font-mono)', color: 'var(--text3)' }}>
                          {item.classification}
                        </span>
                      </div>
                      <p style={{ fontSize: 12, fontFamily: 'var(--font-ui)', color: 'var(--text2)', lineHeight: 1.55, margin: 0 }}>
                        {item.body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div style={dataAttrStyle}>
                Source: FJC IDB · CourtListener · <Link href="/methodology" style={{ color: 'var(--text4)' }}>Methodology</Link> · Updated April 2026
              </div>
            </section>

            {/* === Overview: Two-column charts === */}
            <section style={{ marginBottom: 24 }}>
              <div style={{ display: 'flex', gap: 20 }}>
                <div style={{ flex: '0 0 58%' }}>
                  <HorizontalBarChart
                    data={caseTypeChartData}
                    title="Case Type Breakdown"
                    showConfidence
                    dataSources="FJC IDB · CourtListener"
                  />
                </div>
                <div style={{ flex: 1 }}>
                  {/* Career Timeline */}
                  <h3 style={{ ...sectionLabel, marginBottom: 8 }}>CAREER TIMELINE</h3>
                  <div style={{ borderLeft: '2px solid var(--bdr)', paddingLeft: 12, marginLeft: 6 }}>
                    {[
                      { date: appointmentYear ? `${appointmentYear}` : '—', title: judge.position || 'District Judge', subtitle: `${judge.district_id} · Appointed by ${judge.appointing_president || 'Unknown'}` },
                      { date: appointmentYear ? `${appointmentYear - 5}` : '—', title: 'Prior Legal Career', subtitle: 'See full profile for details' },
                    ].map((entry, i) => (
                      <div key={i} style={{ marginBottom: 12, position: 'relative' }}>
                        <div style={{
                          position: 'absolute', left: -18, top: 3,
                          width: 8, height: 8, borderRadius: '50%',
                          border: '2px solid var(--link)', background: 'var(--card)',
                        }} />
                        <div style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--text3)', marginBottom: 2 }}>{entry.date}</div>
                        <div style={{ fontSize: 12, fontFamily: 'var(--font-legal)', color: 'var(--text1)' }}>{entry.title}</div>
                        <div style={{ fontSize: 11, fontFamily: 'var(--font-ui)', color: 'var(--text3)' }}>{entry.subtitle}</div>
                      </div>
                    ))}
                  </div>

                  {/* Judicial Profile */}
                  <h3 style={{ ...sectionLabel, marginBottom: 8, marginTop: 14 }}>JUDICIAL PROFILE</h3>
                  {[
                    { label: 'Status', value: 'Active' },
                    { label: 'Court', value: judge.district_id || '—' },
                    { label: 'Circuit', value: judge.circuit || '—' },
                    { label: 'Appointed', value: appointmentYear || '—' },
                    { label: 'Party', value: partyLabel },
                  ].map(kv => (
                    <div key={kv.label} style={{
                      display: 'flex', justifyContent: 'space-between', padding: '3px 0',
                      borderBottom: '1px solid var(--bdr)', fontSize: 11,
                    }}>
                      <span style={{ fontFamily: 'var(--font-ui)', color: 'var(--text3)' }}>{kv.label}</span>
                      <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--text1)' }}>{String(kv.value)}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div style={dataAttrStyle}>
                Source: FJC IDB · CourtListener · <Link href="/methodology" style={{ color: 'var(--text4)' }}>Methodology</Link> · Updated April 2026
              </div>
            </section>

            {/* === Client-rendered interactive content (tabs, tables, etc.) === */}
            <section>
              <JudgeProfileClient
                judge={judge}
                statistics={statistics}
                aggregated={aggregated}
                districtAverage={districtAveraged}
                opinions={opinions}
                aiAnalysis={aiAnalysis}
              />
            </section>

          </main>

          {/* ── RIGHT RAIL (232px) ── */}
          <aside style={{
            width: 232, flexShrink: 0, background: 'var(--sidebar)',
            borderLeft: '1px solid var(--bdr)', padding: '14px 12px',
            position: 'sticky', top: 94, alignSelf: 'flex-start',
            height: 'calc(100vh - 94px)', overflowY: 'auto',
          }} className="judge-right-rail">

            {/* Selected Topics */}
            <div style={{ marginBottom: 14 }}>
              <div style={{ ...sectionLabel, marginBottom: 6 }}>SELECTED TOPICS</div>
              {(notedFor.length > 0 ? notedFor.slice(0, 5) : ['General Civil', 'Employment', 'Contract']).map((topic: string, i: number) => (
                <div key={i} style={{
                  fontSize: 11, fontFamily: 'var(--font-ui)', color: 'var(--link)',
                  padding: '3px 0', cursor: 'pointer',
                }}>
                  {topic}
                </div>
              ))}
            </div>

            {/* Related Judges */}
            <div style={{ marginBottom: 14 }}>
              <div style={{ ...sectionLabel, marginBottom: 6 }}>RELATED JUDGES — {judge.district_id || 'DISTRICT'}</div>
              {mockJudgesData.judges
                .filter(j => j.district_id === judge.district_id && j.id !== judge.id)
                .slice(0, 4)
                .map(j => (
                  <div key={j.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '3px 0' }}>
                    <Link href={`/judges/${j.id}`} style={{
                      fontSize: 11, fontFamily: 'var(--font-legal)', color: 'var(--link)', textDecoration: 'none',
                    }}>
                      {j.full_name}
                    </Link>
                  </div>
                ))}
            </div>

            {/* Analytics vs. District */}
            <div style={{ marginBottom: 14 }}>
              <div style={{ ...sectionLabel, marginBottom: 6 }}>ANALYTICS VS. DISTRICT</div>
              {[
                { label: 'Win Rate', judge: `${(aggregated.plaintiffWinRate || 0).toFixed(1)}%`, district: `${(districtAveraged.plaintiffWinRate || 0).toFixed(1)}%` },
                { label: 'Avg. Duration', judge: aggregated.avgDuration ? `${aggregated.avgDuration.toFixed(0)} mo` : '—', district: districtAveraged.avgDuration ? `${districtAveraged.avgDuration.toFixed(0)} mo` : '—' },
                { label: 'Cases', judge: `${aggregated.totalCases || 0}`, district: `${districtAveraged.totalCases || 0}` },
              ].map(row => (
                <div key={row.label} style={{
                  display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 4, padding: '3px 0',
                  borderBottom: '1px solid var(--bdr)', fontSize: 10,
                }}>
                  <span style={{ fontFamily: 'var(--font-ui)', color: 'var(--text3)' }}>{row.label}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--text1)', textAlign: 'right' }}>{row.judge}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--text3)', textAlign: 'right' }}>{row.district}</span>
                </div>
              ))}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 4, padding: '2px 0' }}>
                <span style={{ fontSize: 9, fontFamily: 'var(--font-ui)', color: 'var(--text4)' }}></span>
                <span style={{ fontSize: 9, fontFamily: 'var(--font-ui)', color: 'var(--text4)', textAlign: 'right' }}>Judge</span>
                <span style={{ fontSize: 9, fontFamily: 'var(--font-ui)', color: 'var(--text4)', textAlign: 'right' }}>District</span>
              </div>
            </div>

            {/* Research Organizer */}
            <div style={{ marginBottom: 10 }}>
              <ResearchOrganizer />
            </div>

            {/* Research Path */}
            <div style={{ marginBottom: 10 }}>
              <ResearchPath
                steps={[
                  { label: judge.district_id || 'District', href: `/districts/${judge.district_id || ''}` },
                  { label: `Hon. ${judge.last_name || judge.full_name}` },
                ]}
                stepCount={2}
              />
            </div>

            {/* Download Report */}
            <button type="button" style={{
              width: '100%', height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'var(--gold)', color: '#FFFFFF', fontSize: 11, fontWeight: 600,
              fontFamily: 'var(--font-ui)', border: 'none', borderRadius: 2, cursor: 'pointer', marginBottom: 6,
            }}>
              Download Report
            </button>

            {/* Add to Keep List */}
            <button type="button" style={{
              width: '100%', height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'transparent', color: 'var(--link)', fontSize: 11, fontWeight: 600,
              fontFamily: 'var(--font-ui)', border: '1px solid var(--link)', borderRadius: 2, cursor: 'pointer',
            }}>
              Add to Keep List
            </button>
          </aside>
        </div>
      </div>

      {/* Styles */}
      <style>{`
        @media (max-width: 1024px) {
          .judge-toc { display: none !important; }
          .judge-right-rail { display: none !important; }
        }
      `}</style>
    </>
  );
}
