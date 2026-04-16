'use client';

/**
 * JudgeProfileClient — Interactive client-side component for judge profile page
 * Renders statistics, charts, comparisons, AI analysis, and recent opinions
 */

import { useState } from 'react';
import Link from 'next/link';
import JudgeRadar from '@/components/charts/JudgeRadar';
import JudgeWinRateByNOS from '@/components/charts/JudgeWinRateByNOS';
import { JudgeWithStats, JudgeStatistics, JudgeOpinion, JudgeAIAnalysis } from '@/lib/supabase-judges';
import { getWinRateColor } from '@/lib/color-scale';

interface JudgeProfileClientProps {
  judge: JudgeWithStats;
  statistics: JudgeStatistics[];
  aggregated: {
    totalCases: number;
    plaintiffWinRate: number;
    summaryJudgmentRate: number;
    dismissalRate: number;
    settlementRate: number;
    avgDuration: number;
  };
  districtAverage: {
    totalCases: number;
    plaintiffWinRate: number;
    summaryJudgmentRate: number;
    dismissalRate: number;
    settlementRate: number;
    avgDuration: number;
  };
  opinions: JudgeOpinion[];
  aiAnalysis: JudgeAIAnalysis | null;
}

const NOS_CODE_LABELS: { [key: number]: string } = {
  210: 'Contract Disputes',
  220: 'Personal Injury',
  230: 'Marine Damages',
  240: 'Patents & IP',
  250: 'Bankruptcy',
  260: 'Labor Relations',
  290: 'Other Property',
  310: 'Securities Fraud',
  320: 'Product Liability',
  330: 'Civil Rights',
  340: 'Tax Disputes',
  350: 'Constitutionality',
  360: 'Personal Property',
  370: 'Other Statutes',
  375: 'False Claims',
  380: 'Administrative',
  385: 'Immigration',
  400: 'State Reapportionment',
};

export default function JudgeProfileClient({
  judge,
  statistics,
  aggregated,
  districtAverage,
  opinions,
  aiAnalysis,
}: JudgeProfileClientProps) {
  const [expandedOpinion, setExpandedOpinion] = useState<number | null>(null);

  // Get SJ grant rate (inverse for display)
  const sjGrantRateInverse = 100 - (aggregated.summaryJudgmentRate || 0);
  const districtSJInverse = 100 - (districtAverage.summaryJudgmentRate || 0);

  // MTD grant rate (use motions_to_dismiss_granted from first stat)
  const mtdStats = statistics.filter((s) => s.motions_to_dismiss_granted);
  const avgMTDRate = mtdStats.length > 0
    ? mtdStats.reduce((sum, s) => sum + ((s.motions_to_dismiss_granted / (s.total_cases || 1)) * 100), 0) / mtdStats.length
    : 0;
  const districtMTDStats = statistics.filter((s) => s.nos_code);
  const districtAvgMTDRate = districtMTDStats.length > 0
    ? districtMTDStats.reduce((sum, s) => sum + ((s.motions_to_dismiss_granted / (s.total_cases || 1)) * 100), 0) / districtMTDStats.length
    : 0;

  const radarData = {
    judge: {
      plaintiffWinRate: aggregated.plaintiffWinRate || 0,
      sjGrantRate: aggregated.summaryJudgmentRate || 0,
      caseDuration: aggregated.avgDuration || 0,
      settlementRate: aggregated.settlementRate || 0,
      mtdGrantRate: avgMTDRate,
    },
    districtAvg: {
      plaintiffWinRate: districtAverage.plaintiffWinRate || 0,
      sjGrantRate: districtAverage.summaryJudgmentRate || 0,
      caseDuration: districtAverage.avgDuration || 0,
      settlementRate: districtAverage.settlementRate || 0,
      mtdGrantRate: districtAvgMTDRate,
    },
  };

  return (
    <div>
      {/* Section 1: Primary Statistics Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '20px',
          marginBottom: '48px',
        }}
      >
        {/* Overall Win Rate */}
        <StatCard
          label="Overall Win Rate"
          value={isNaN(aggregated?.plaintiffWinRate ?? 0) ? '—' : `${(aggregated?.plaintiffWinRate ?? 0).toFixed(0)}%`}
          sublabel={`(n = ${aggregated?.totalCases ?? 0} cases)`}
          colorObj={getWinRateColor(isNaN(aggregated?.plaintiffWinRate ?? 0) ? 0 : aggregated.plaintiffWinRate || 0)}
        />

        {/* Summary Judgment Grant Rate (inversed) */}
        <StatCard
          label="Summary Judgment Defense Rate"
          value={isNaN(aggregated?.summaryJudgmentRate ?? 0) ? '—' : `${(aggregated?.summaryJudgmentRate ?? 0).toFixed(1)}%`}
          sublabel="Grants defendant motions"
          colorObj={getWinRateColor(100 - (isNaN(aggregated?.summaryJudgmentRate ?? 0) ? 0 : aggregated?.summaryJudgmentRate ?? 0))}
        />

        {/* Average Case Duration */}
        <StatCard
          label="Average Case Duration"
          value={isNaN(aggregated?.avgDuration ?? 0) ? '—' : `${(aggregated?.avgDuration ?? 0).toFixed(1)} months`}
          sublabel={`vs ${isNaN(districtAverage?.avgDuration ?? 0) ? '—' : (districtAverage?.avgDuration ?? 0).toFixed(1)} month district avg`}
          colorObj={
            (aggregated?.avgDuration ?? 0) < (districtAverage?.avgDuration ?? 0)
              ? getWinRateColor(65) // Green for faster
              : getWinRateColor(20) // Red for slower
          }
        />

        {/* Settlement Rate */}
        <StatCard
          label="Settlement Rate"
          value={isNaN(aggregated?.settlementRate ?? 0) ? '—' : `${(aggregated?.settlementRate ?? 0).toFixed(1)}%`}
          sublabel="Cases settle before trial"
          colorObj={getWinRateColor(aggregated?.settlementRate ? Math.min(aggregated.settlementRate, 65) : 0)}
        />
      </div>

      {/* Section 2: Judge Radar Chart */}
      <div
        style={{
          background: 'var(--color-surface-0)',
          padding: '32px',
          borderRadius: '8px',
          border: '1px solid var(--border-default)',
          marginBottom: '48px',
        }}
      >
        <h2
          style={{
            fontSize: '16px',
            fontFamily: 'var(--font-heading)',
            fontWeight: '700',
            color: 'var(--color-text-primary)',
            marginTop: 0,
            marginBottom: '24px',
          }}
        >
          Judge Profile Comparison
        </h2>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ width: '100%', maxWidth: '420px' }}>
            <JudgeRadar
              judge={radarData.judge}
              districtAvg={radarData.districtAvg}
              width={420}
              height={420}
              label="Judge profile radar chart"
            />
          </div>
        </div>
      </div>

      {/* Section 3: Win Rate by Case Type */}
      {statistics.length > 0 && (
        <div
          style={{
            background: 'var(--color-surface-0)',
            padding: '32px',
            borderRadius: '8px',
            border: '1px solid var(--border-default)',
            marginBottom: '48px',
          }}
        >
          <h2
            style={{
              fontSize: '16px',
              fontFamily: 'var(--font-heading)',
              fontWeight: '700',
              color: 'var(--color-text-primary)',
              marginTop: 0,
              marginBottom: '24px',
            }}
          >
            Win Rate by Case Type
          </h2>
          <JudgeWinRateByNOS statistics={statistics} minCases={10} />
        </div>
      )}

      {/* Section 4: District Comparison Table */}
      <div
        style={{
          background: 'var(--color-surface-0)',
          padding: '32px',
          borderRadius: '8px',
          border: '1px solid var(--border-default)',
          marginBottom: '48px',
          overflowX: 'auto',
        }}
      >
        <h2
          style={{
            fontSize: '16px',
            fontFamily: 'var(--font-heading)',
            fontWeight: '700',
            color: 'var(--color-text-primary)',
            marginTop: 0,
            marginBottom: '24px',
          }}
        >
          District Comparison
        </h2>
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontFamily: 'var(--font-body)',
            fontSize: '14px',
          }}
        >
          <thead>
            <tr style={{ borderBottom: '2px solid var(--border-default)' }}>
              <th style={{ textAlign: 'left', padding: '12px 0', fontWeight: '600', color: 'var(--color-text-primary)' }}>Metric</th>
              <th style={{ textAlign: 'right', padding: '12px 0', fontWeight: '600', color: 'var(--color-text-primary)' }}>This Judge</th>
              <th style={{ textAlign: 'right', padding: '12px 0', fontWeight: '600', color: 'var(--color-text-primary)' }}>District Average</th>
              <th style={{ textAlign: 'right', padding: '12px 0', fontWeight: '600', color: 'var(--color-text-primary)' }}>Difference</th>
            </tr>
          </thead>
          <tbody>
            <DistrictComparisonRow
              metric="Win Rate"
              judgeValue={aggregated?.plaintiffWinRate ?? 0}
              districtValue={districtAverage?.plaintiffWinRate ?? 0}
              suffix="%"
              isInverse={false}
            />
            <DistrictComparisonRow
              metric="Summary Judgment Rate"
              judgeValue={aggregated?.summaryJudgmentRate ?? 0}
              districtValue={districtAverage?.summaryJudgmentRate ?? 0}
              suffix="%"
              isInverse={true}
            />
            <DistrictComparisonRow
              metric="Dismissal Rate"
              judgeValue={aggregated?.dismissalRate ?? 0}
              districtValue={districtAverage?.dismissalRate ?? 0}
              suffix="%"
              isInverse={true}
            />
            <DistrictComparisonRow
              metric="Average Duration"
              judgeValue={aggregated?.avgDuration ?? 0}
              districtValue={districtAverage?.avgDuration ?? 0}
              suffix=" months"
              isInverse={true}
            />
            <DistrictComparisonRow
              metric="Settlement Rate"
              judgeValue={aggregated?.settlementRate ?? 0}
              districtValue={districtAverage?.settlementRate ?? 0}
              suffix="%"
              isInverse={false}
            />
          </tbody>
        </table>
      </div>

      {/* Section 5: AI Behavioral Analysis */}
      {aiAnalysis && (
        <div
          style={{
            background: 'var(--color-surface-0)',
            padding: '32px',
            borderRadius: '8px',
            border: '1px solid var(--border-default)',
            marginBottom: '48px',
          }}
        >
          <div
            style={{
              padding: '12px 16px',
              background: '#FDF4EC',
              border: '1px solid #C37D16',
              borderRadius: '6px',
              marginBottom: '24px',
            }}
          >
            <p
              style={{
                fontSize: '13px',
                fontFamily: 'var(--font-body)',
                color: '#B24020',
                margin: 0,
                fontWeight: '600',
              }}
            >
              AI-Generated Analysis (For reference only)
            </p>
            <p
              style={{
                fontSize: '12px',
                fontFamily: 'var(--font-body)',
                color: '#B24020',
                margin: '4px 0 0 0',
              }}
            >
              This analysis is AI-generated from public court documents and may contain errors. Always verify with original sources.
            </p>
          </div>

          <h2
            style={{
              fontSize: '16px',
              fontFamily: 'var(--font-heading)',
              fontWeight: '700',
              color: 'var(--color-text-primary)',
              marginTop: 0,
              marginBottom: '24px',
            }}
          >
            Behavioral Profile
          </h2>

          {aiAnalysis.writing_style && (
            <AnalysisSection title="Writing Style" content={aiAnalysis.writing_style} />
          )}
          {aiAnalysis.plaintiff_tendencies && (
            <AnalysisSection title="Plaintiff Tendencies" content={aiAnalysis.plaintiff_tendencies} />
          )}
          {aiAnalysis.motion_approach && (
            <AnalysisSection title="Motion Approach" content={aiAnalysis.motion_approach} />
          )}
          {aiAnalysis.notable_patterns && (
            <AnalysisSection title="Notable Patterns" content={aiAnalysis.notable_patterns} />
          )}
          {aiAnalysis.caveats && (
            <AnalysisSection title="Caveats" content={aiAnalysis.caveats} />
          )}
        </div>
      )}

      {/* Section 6: Recent Opinions */}
      {opinions.length > 0 && (
        <div
          style={{
            background: 'var(--color-surface-0)',
            padding: '32px',
            borderRadius: '8px',
            border: '1px solid var(--border-default)',
            marginBottom: '48px',
          }}
        >
          <h2
            style={{
              fontSize: '16px',
              fontFamily: 'var(--font-heading)',
              fontWeight: '700',
              color: 'var(--color-text-primary)',
              marginTop: 0,
              marginBottom: '24px',
            }}
          >
            Recent Opinions ({opinions.length})
          </h2>

          <div
            style={{
              padding: '12px 16px',
              background: '#EDF3FB',
              border: '1px solid var(--accent-primary)',
              borderRadius: '6px',
              marginBottom: '24px',
            }}
          >
            <p
              style={{
                fontSize: '13px',
                fontFamily: 'var(--font-body)',
                color: 'var(--accent-primary-hover)',
                margin: 0,
              }}
            >
              Summarized by AI — <strong>read the full opinion for accuracy</strong>
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {opinions.map((opinion) => {
              const isExpanded = expandedOpinion === opinion.id;
              const nosLabel = opinion.nos_code ? NOS_CODE_LABELS[opinion.nos_code] || `NOS ${opinion.nos_code}` : null;

              return (
                <div
                  key={opinion.id}
                  style={{
                    padding: '20px',
                    background: '#FAFBFC',
                    border: '1px solid var(--border-default)',
                    borderRadius: '6px',
                    cursor: 'pointer',
                  }}
                  onClick={() => setExpandedOpinion(isExpanded ? null : opinion.id)}
                >
                  {/* Opinion header */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px' }}>
                    <div style={{ flex: 1 }}>
                      {opinion.courtlistener_url ? (
                        <a
                          href={opinion.courtlistener_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            fontSize: '14px',
                            fontFamily: 'var(--font-heading)',
                            fontWeight: '700',
                            color: 'var(--accent-primary)',
                            textDecoration: 'none',
                            display: 'block',
                            marginBottom: '8px',
                          }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          {opinion.case_name || 'Untitled Opinion'}
                        </a>
                      ) : (
                        <p
                          style={{
                            fontSize: '14px',
                            fontFamily: 'var(--font-heading)',
                            fontWeight: '700',
                            color: 'var(--color-text-primary)',
                            margin: '0 0 8px 0',
                          }}
                        >
                          {opinion.case_name || 'Untitled Opinion'}
                        </p>
                      )}

                      {/* Meta info */}
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          fontSize: '12px',
                          fontFamily: 'var(--font-body)',
                          color: 'var(--color-text-secondary)',
                          marginBottom: '8px',
                        }}
                      >
                        <span>{opinion.court}</span>
                        <span>•</span>
                        <span>{opinion.year}</span>
                        {opinion.citation_count !== null && opinion.citation_count > 0 && (
                          <>
                            <span>•</span>
                            <span
                              style={{
                                display: 'inline-block',
                                padding: '2px 8px',
                                background: '#EDF3FB',
                                border: '1px solid var(--accent-primary)',
                                borderRadius: '3px',
                                color: 'var(--accent-primary-hover)',
                                fontSize: '11px',
                                fontWeight: '600',
                              }}
                            >
                              {opinion.citation_count} citations
                            </span>
                          </>
                        )}
                        {nosLabel && (
                          <>
                            <span>•</span>
                            <span
                              style={{
                                display: 'inline-block',
                                padding: '2px 8px',
                                background: '#F3F4F6',
                                border: '1px solid #D1D5DB',
                                borderRadius: '3px',
                                color: 'var(--color-text-secondary)',
                                fontSize: '11px',
                                fontWeight: '600',
                              }}
                            >
                              {nosLabel}
                            </span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Expand arrow */}
                    <div
                      style={{
                        fontSize: '20px',
                        color: 'var(--color-text-muted)',
                        transition: 'transform 0.2s ease',
                        transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                      }}
                    >
                      ▼
                    </div>
                  </div>

                  {/* Expanded summary */}
                  {isExpanded && opinion.ai_summary && (
                    <div
                      style={{
                        marginTop: '16px',
                        paddingTop: '16px',
                        borderTop: '1px solid var(--border-default)',
                      }}
                    >
                      <p
                        style={{
                          fontSize: '13px',
                          fontFamily: 'var(--font-body)',
                          color: 'var(--color-text-secondary)',
                          margin: 0,
                          lineHeight: '1.6',
                        }}
                      >
                        {opinion.ai_summary}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Last Updated and Data Attribution */}
      <div
        style={{
          background: 'var(--color-surface-1)',
          padding: '20px',
          borderRadius: '8px',
          marginBottom: '48px',
        }}
      >
        <p
          style={{
            fontSize: '12px',
            color: 'var(--color-text-muted)',
            margin: '0 0 8px 0',
          }}
        >
          Last updated: April 2026
        </p>
        <p
          style={{
            fontSize: '11px',
            color: 'var(--color-text-muted)',
            margin: 0,
          }}
        >
          Source: FJC Integrated Database · CourtListener / RECAP · Public Federal Records
        </p>
      </div>

      {/* Section 7: CTA / Next Steps */}
      <div
        style={{
          background: 'linear-gradient(135deg, var(--accent-primary) 0%, #1e40af 100%)',
          padding: '40px',
          borderRadius: '8px',
          color: 'var(--color-surface-0)',
          marginTop: '48px',
        }}
      >
        <h2
          style={{
            fontSize: '20px',
            fontFamily: 'var(--font-heading)',
            fontWeight: '700',
            margin: '0 0 16px 0',
          }}
        >
          Explore More
        </h2>
        <p style={{ fontSize: '14px', fontFamily: 'var(--font-body)', margin: '0 0 24px 0' }}>
          Get deeper insights into this judge's behavior, compare with other judges, or set up case outcome alerts.
        </p>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <Link
            href={`/judges?district=${judge.district_id}`}
            style={{
              display: 'inline-block',
              padding: '12px 24px',
              background: 'var(--color-surface-0)',
              color: 'var(--accent-primary)',
              textDecoration: 'none',
              borderRadius: '6px',
              fontFamily: 'var(--font-body)',
              fontWeight: '600',
              fontSize: '14px',
              transition: 'background-color 0.2s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = '#F0F0F0')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--color-surface-0)')}
          >
            View District Judges
          </Link>
          {statistics.length > 0 && (
            <Link
              href={`/judges?district=${judge.district_id}&nos=${statistics[0]?.nos_code}`}
              style={{
                display: 'inline-block',
                padding: '12px 24px',
                background: 'rgba(255, 255, 255, 0.2)',
                color: 'var(--color-surface-0)',
                textDecoration: 'none',
                borderRadius: '6px',
                fontFamily: 'var(--font-body)',
                fontWeight: '600',
                fontSize: '14px',
                border: '1px solid rgba(255, 255, 255, 0.4)',
                transition: 'background-color 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)')}
            >
              Find Similar Cases
            </Link>
          )}
          <Link
            href="/dashboard"
            style={{
              display: 'inline-block',
              padding: '12px 24px',
              background: 'rgba(255, 255, 255, 0.2)',
              color: 'var(--color-surface-0)',
              textDecoration: 'none',
              borderRadius: '6px',
              fontFamily: 'var(--font-body)',
              fontWeight: '600',
              fontSize: '14px',
              border: '1px solid rgba(255, 255, 255, 0.4)',
              transition: 'background-color 0.2s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)')}
          >
            View Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}

// Helper component for statistic cards
function StatCard({
  label,
  value,
  sublabel,
  colorObj,
}: {
  label: string;
  value: string;
  sublabel: string;
  colorObj: { bg: string; text: string; border: string; label: string };
}) {
  return (
    <div
      style={{
        background: colorObj.bg,
        border: `2px solid ${colorObj.border}`,
        padding: '24px',
        borderRadius: '8px',
        textAlign: 'center',
      }}
    >
      <p
        style={{
          fontSize: '12px',
          fontFamily: 'var(--font-body)',
          color: 'var(--color-text-secondary)',
          margin: '0 0 12px 0',
          fontWeight: '500',
          textTransform: 'uppercase',
          letterSpacing: '0.3px',
        }}
      >
        {label}
      </p>
      <p
        style={{
          fontSize: '28px',
          fontFamily: 'var(--font-heading)',
          fontWeight: '700',
          color: colorObj.text,
          margin: '0 0 8px 0',
        }}
      >
        {value}
      </p>
      <p
        style={{
          fontSize: '12px',
          fontFamily: 'var(--font-body)',
          color: colorObj.text,
          margin: 0,
          opacity: 0.8,
        }}
      >
        {sublabel}
      </p>
    </div>
  );
}

// Helper component for district comparison rows
function DistrictComparisonRow({
  metric,
  judgeValue,
  districtValue,
  suffix,
  isInverse,
}: {
  metric: string;
  judgeValue: number;
  districtValue: number;
  suffix: string;
  isInverse: boolean;
}) {
  const diff = judgeValue - districtValue;
  const isFavorable = isInverse ? diff < 0 : diff > 0;
  const diffColor = isFavorable ? '#057642' : '#CC1016';
  const diffText = isFavorable ? '✓' : '';

  const judgeVal = isNaN(judgeValue ?? 0) ? 0 : judgeValue ?? 0;
  const districtVal = isNaN(districtValue ?? 0) ? 0 : districtValue ?? 0;

  return (
    <tr style={{ borderBottom: '1px solid var(--border-default)' }}>
      <td style={{ padding: '16px 0', color: 'var(--color-text-primary)', fontWeight: '500' }}>{metric}</td>
      <td style={{ padding: '16px 0', textAlign: 'right', color: 'var(--color-text-primary)', fontWeight: '600' }}>
        {isNaN(judgeVal) ? '—' : `${judgeVal.toFixed(1)}${suffix}`}
      </td>
      <td style={{ padding: '16px 0', textAlign: 'right', color: 'var(--color-text-secondary)' }}>
        {isNaN(districtVal) ? '—' : `${districtVal.toFixed(1)}${suffix}`}
      </td>
      <td style={{ padding: '16px 0', textAlign: 'right', color: diffColor, fontWeight: '600' }}>
        {isNaN(diff) ? '—' : `${diffText}${diff > 0 ? '+' : ''}${diff.toFixed(1)}${suffix}`}
      </td>
    </tr>
  );
}

// Helper component for AI analysis sections
function AnalysisSection({ title, content }: { title: string; content: string }) {
  return (
    <div style={{ marginBottom: '24px' }}>
      <h3
        style={{
          fontSize: '13px',
          fontFamily: 'var(--font-heading)',
          fontWeight: '700',
          color: 'var(--color-text-primary)',
          marginTop: 0,
          marginBottom: '8px',
          textTransform: 'uppercase',
          letterSpacing: '0.3px',
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontSize: '13px',
          fontFamily: 'var(--font-body)',
          color: 'var(--color-text-secondary)',
          lineHeight: '1.6',
          margin: 0,
        }}
      >
        {content}
      </p>
    </div>
  );
}
