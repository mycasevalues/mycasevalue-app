'use client';

/**
 * JudgeCompareClient — Interactive comparison tool for up to 3 judges
 * Features:
 * - Judge search by name via /api/judges?q=QUERY
 * - Side-by-side comparison of judge statistics
 * - Overlay radar charts showing all judges
 * - Export to PDF functionality
 * - Responsive layout (side-by-side on desktop, stacked on mobile)
 */

import { useState, useEffect } from 'react';
import Link from 'next/link';
import JudgeRadar, { JudgeRadarData } from '@/components/charts/JudgeRadar';
import { JudgeWithStats, JudgeStatistics, aggregateJudgeStats } from '@/lib/supabase-judges';
import { getWinRateColor } from '@/lib/color-scale';
import { mockJudgesData } from '@/data/mock-judges';
import jsPDF from 'jspdf';

interface SearchResult {
  id: string;
  full_name: string;
  district_id: string | null;
  appointment_year?: number;
  appointing_president: string | null;
  plaintiff_win_rate: number;
  total_cases: number;
}

interface CompareSlot {
  judge: JudgeWithStats | null;
  statistics: JudgeStatistics[];
  aggregated: ReturnType<typeof aggregateJudgeStats> | null;
  radarData: JudgeRadarData | null;
}

const JUDGES_COLORS = ['var(--accent-primary)', '#DC2626', '#059669'];

export default function JudgeCompareClient({ preselectedJudgeId }: { preselectedJudgeId?: string }) {
  const [slots, setSlots] = useState<CompareSlot[]>([
    { judge: null, statistics: [], aggregated: null, radarData: null },
    { judge: null, statistics: [], aggregated: null, radarData: null },
    { judge: null, statistics: [], aggregated: null, radarData: null },
  ]);

  const [searchQueries, setSearchQueries] = useState(['', '', '']);
  const [searchResults, setSearchResults] = useState<[SearchResult[], SearchResult[], SearchResult[]]>([[], [], []]);
  const [showDropdowns, setShowDropdowns] = useState([false, false, false]);
  const [districtAverage, setDistrictAverage] = useState<JudgeRadarData | null>(null);

  // Pre-select judge if provided via query param
  useEffect(() => {
    if (preselectedJudgeId) {
      const judge = mockJudgesData.judges.find((j) => j.id === preselectedJudgeId);
      if (judge) {
        const statistics = mockJudgesData.statistics.filter((s) => s.judge_id === preselectedJudgeId);
        const aggregated = aggregateJudgeStats(statistics);
        const radarData = buildRadarData(aggregated, statistics);

        const newSlots = [...slots];
        newSlots[0] = {
          judge: {
            ...judge,
            overall_plaintiff_win_rate: aggregated.plaintiffWinRate,
            total_cases_handled: aggregated.totalCases,
            statistics,
          },
          statistics,
          aggregated,
          radarData,
        };
        setSlots(newSlots);
      }
    }
  }, [preselectedJudgeId]);

  // Calculate district average when judges are selected
  useEffect(() => {
    const selectedDistricts = slots
      .map((s) => s.judge?.district_id)
      .filter(Boolean) as string[];

    if (selectedDistricts.length > 0) {
      const districtStats = mockJudgesData.statistics.filter(
        (s) =>
          mockJudgesData.judges.find((j) => j.id === s.judge_id)?.district_id === selectedDistricts[0]
      );
      const districtAgg = aggregateJudgeStats(districtStats);
      const districtRadar = buildRadarData(districtAgg, districtStats);
      setDistrictAverage(districtRadar);
    }
  }, [slots]);

  const handleSearch = async (slotIdx: number, query: string) => {
    setSearchQueries((prev) => {
      const next: typeof prev = [...prev];
      next[slotIdx] = query;
      return next;
    });

    if (query.trim().length < 2) {
      setSearchResults((prev) => {
        const next: typeof prev = [...prev];
        next[slotIdx] = [];
        return next;
      });
      return;
    }

    try {
      const res = await fetch(`/api/judges?q=${encodeURIComponent(query)}&limit=10`);
      const data = await res.json();
      setSearchResults((prev) => {
        const next: typeof prev = [...prev];
        next[slotIdx] = (data.judges || []).map((j: any) => ({
          id: j.id,
          full_name: j.full_name,
          district_id: j.district_id,
          appointment_year: j.appointment_year,
          appointing_president: j.appointing_president,
          plaintiff_win_rate: j.plaintiff_win_rate || j.overall_plaintiff_win_rate || 0,
          total_cases: j.total_cases || j.total_cases_handled || 0,
        }));
        return next;
      });
    } catch (err) {
      console.error('Search error:', err);
    }
  };

  const selectJudge = (slotIdx: number, result: SearchResult) => {
    const judge = mockJudgesData.judges.find((j) => j.id === result.id);
    if (!judge) return;

    const statistics = mockJudgesData.statistics.filter((s) => s.judge_id === result.id);
    const aggregated = aggregateJudgeStats(statistics);
    const radarData = buildRadarData(aggregated, statistics);

    const newSlots = [...slots];
    newSlots[slotIdx] = {
      judge: {
        ...judge,
        overall_plaintiff_win_rate: aggregated.plaintiffWinRate,
        total_cases_handled: aggregated.totalCases,
        statistics,
      },
      statistics,
      aggregated,
      radarData,
    };
    setSlots(newSlots);

    setSearchQueries((prev) => {
      const next = [...prev];
      next[slotIdx] = '';
      return next;
    });
    setShowDropdowns((prev) => {
      const next = [...prev];
      next[slotIdx] = false;
      return next;
    });
  };

  const clearSlot = (slotIdx: number) => {
    const newSlots = [...slots];
    newSlots[slotIdx] = { judge: null, statistics: [], aggregated: null, radarData: null };
    setSlots(newSlots);
  };

  const selectedJudges = slots.filter((s) => s.judge !== null);

  const exportPDF = () => {
    if (selectedJudges.length === 0) return;

    const doc = new jsPDF({ format: 'a4' });
    let yPos = 20;

    // Title
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(18);
    doc.text('Judge Comparison Report', 20, yPos);
    yPos += 15;

    // Export timestamp
    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(10);
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, 20, yPos);
    yPos += 10;

    // Judge sections
    selectedJudges.forEach((slot, idx) => {
      if (!slot.judge || !slot.aggregated) return;

      // Check if we need a new page
      if (yPos > 250) {
        doc.addPage();
        yPos = 20;
      }

      // Judge header
      doc.setFont('Helvetica', 'bold');
      doc.setFontSize(14);
      doc.text(`${slot.judge.full_name}`, 20, yPos);
      yPos += 8;

      // Judge info
      doc.setFont('Helvetica', 'normal');
      doc.setFontSize(10);
      const info = [
        `District: ${slot.judge.district_id || 'N/A'}`,
        `Circuit: ${slot.judge.circuit || 'N/A'}`,
        `Appointed: ${slot.judge.appointment_date ? new Date(slot.judge.appointment_date).getFullYear() : 'N/A'} by ${slot.judge.appointing_president || 'Unknown'}`,
        `Party: ${slot.judge.party_of_appointing_president || 'Unknown'}`,
      ];
      info.forEach((line) => {
        doc.text(line, 20, yPos);
        yPos += 6;
      });
      yPos += 2;

      // Key statistics table
      const stats = [
        ['Metric', 'Value'],
        ['Win Rate', `${(slot.aggregated.plaintiffWinRate || 0).toFixed(1)}%`],
        ['Summary Judgment Rate', `${(slot.aggregated.summaryJudgmentRate || 0).toFixed(1)}%`],
        ['Dismissal Rate', `${(slot.aggregated.dismissalRate || 0).toFixed(1)}%`],
        ['Settlement Rate', `${(slot.aggregated.settlementRate || 0).toFixed(1)}%`],
        ['Avg Duration', `${(slot.aggregated.avgDuration || 0).toFixed(1)} months`],
        ['Total Cases', `${slot.aggregated.totalCases}`],
      ];

      doc.setFont('Helvetica', 'bold');
      doc.setFontSize(10);
      doc.text('Key Statistics', 20, yPos);
      yPos += 7;

      doc.setFont('Helvetica', 'normal');
      doc.setFontSize(9);
      stats.forEach((row) => {
        doc.text(row[0], 20, yPos);
        doc.text(row[1], 100, yPos);
        yPos += 6;
      });
      yPos += 8;

      // Top case types by volume
      if (slot.statistics.length > 0) {
        const topCases = slot.statistics
          .sort((a, b) => (b.total_cases || 0) - (a.total_cases || 0))
          .slice(0, 3);

        doc.setFont('Helvetica', 'bold');
        doc.setFontSize(10);
        doc.text('Top Case Types', 20, yPos);
        yPos += 7;

        doc.setFont('Helvetica', 'normal');
        doc.setFontSize(9);
        topCases.forEach((stat) => {
          const line = `NOS ${stat.nos_code}: ${(stat.total_cases || 0)} cases (${(stat.plaintiff_win_rate || 0).toFixed(1)}% plaintiff wins)`;
          doc.text(line, 20, yPos);
          yPos += 6;
        });
        yPos += 4;
      }

      if (idx < selectedJudges.length - 1) {
        yPos += 8;
        doc.setDrawColor(200);
        doc.line(20, yPos, 190, yPos);
        yPos += 8;
      }
    });

    doc.save(`judge-comparison-${new Date().toISOString().split('T')[0]}.pdf`);
  };

  return (
    <div style={{ background: 'var(--color-surface-1)', minHeight: '100vh', padding: '32px 24px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '48px' }}>
          <h1
            style={{
              fontSize: 'clamp(28px, 5vw, 44px)',
              fontWeight: 900,
              marginBottom: 16,
              color: 'var(--color-text-primary)',
              letterSpacing: '-1.5px',
              fontFamily: 'var(--font-ui)',
              lineHeight: 1.2,
            }}
          >
            Compare Judges
          </h1>
          <p
            style={{
              fontSize: 'clamp(15px, 2vw, 17px)',
              lineHeight: 1.6,
              maxWidth: 640,
              color: 'var(--color-text-secondary)',
              fontFamily: 'var(--font-body)',
            }}
          >
            Select up to 3 judges to compare their ruling patterns, motion grant rates, and case outcomes side by side.
          </p>
        </div>

        {/* Search Slots */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px',
            marginBottom: '48px',
          }}
        >
          {slots.map((slot, idx) => (
            <div
              key={idx}
              style={{
                background: 'var(--color-surface-0)',
                border: '1px solid var(--border-default)',
                borderRadius: 4,
                padding: '20px',
              }}
            >
              {!slot.judge ? (
                <>
                  <label
                    style={{
                      display: 'block',
                      fontSize: 12,
                      fontWeight: 600,
                      color: 'var(--color-text-secondary)',
                      marginBottom: 8,
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      fontFamily: 'var(--font-body)',
                    }}
                  >
                    Judge {idx + 1}
                  </label>
                  <div style={{ position: 'relative', marginBottom: '12px' }}>
                    <input
                      type="text"
                      placeholder="Search by name..."
                      value={searchQueries[idx]}
                      onChange={(e) => handleSearch(idx, e.target.value)}
                      onFocus={() => setShowDropdowns((prev) => {
                        const next = [...prev];
                        next[idx] = true;
                        return next;
                      })}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: 4,
                        fontFamily: 'var(--font-body)',
                        fontSize: 14,
                        boxSizing: 'border-box',
                      }}
                    />
                    {showDropdowns[idx] && searchResults[idx].length > 0 && (
                      <div
                        style={{
                          position: 'absolute',
                          top: '100%',
                          left: 0,
                          right: 0,
                          background: 'var(--color-surface-0)',
                          border: '1px solid rgba(255,255,255,0.1)',
                          borderTop: 'none',
                          borderRadius: '0 0 4px 4px',
                          zIndex: 10,
                          maxHeight: '300px',
                          overflowY: 'auto',
                        }}
                      >
                        {searchResults[idx].map((result) => (
                          <button
                            key={result.id}
                            onClick={() => selectJudge(idx, result)}
                            style={{
                              width: '100%',
                              padding: '12px',
                              border: 'none',
                              background: 'none',
                              textAlign: 'left',
                              cursor: 'pointer',
                              borderBottom: '1px solid rgba(255,255,255,0.05)',
                              fontFamily: 'var(--font-body)',
                              fontSize: 14,
                            }}
                            onMouseEnter={(e) => {
                              (e.target as HTMLElement).style.background = 'var(--color-surface-0)';
                            }}
                            onMouseLeave={(e) => {
                              (e.target as HTMLElement).style.background = 'none';
                            }}
                          >
                            <div style={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>
                              {result.full_name}
                            </div>
                            <div style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>
                              {result.district_id} • {result.plaintiff_win_rate.toFixed(1)}% win rate
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div style={{ position: 'relative' }}>
                  <button
                    onClick={() => clearSlot(idx)}
                    style={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: 20,
                      color: 'var(--color-text-muted)',
                    }}
                  >
                    ×
                  </button>
                  <Link
                    href={`/judges/${slot.judge.id}`}
                    style={{
                      textDecoration: 'none',
                      color: 'inherit',
                    }}
                  >
                    <h3
                      style={{
                        margin: '0 0 12px 0',
                        fontSize: 16,
                        fontWeight: 600,
                        color: 'var(--color-text-primary)',
                        fontFamily: 'var(--font-body)',
                      }}
                    >
                      {slot.judge.full_name}
                    </h3>
                  </Link>
                  <div
                    style={{
                      fontSize: 12,
                      color: 'var(--color-text-muted)',
                      fontFamily: 'var(--font-body)',
                      marginBottom: '12px',
                      lineHeight: 1.5,
                    }}
                  >
                    <div>{slot.judge.district_id || 'N/A'} District</div>
                    <div>{slot.judge.circuit || 'N/A'} Circuit</div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Comparison Section */}
        {selectedJudges.length > 0 && (
          <>
            {/* Radar Chart Overlay */}
            <div
              style={{
                background: 'var(--color-surface-0)',
                border: '1px solid var(--border-default)',
                borderRadius: 4,
                padding: '32px',
                marginBottom: '48px',
              }}
            >
              <h2
                style={{
                  fontSize: 20,
                  fontWeight: 600,
                  color: 'var(--color-text-primary)',
                  fontFamily: 'var(--font-ui)',
                  marginBottom: '24px',
                }}
              >
                Comparative Profile Analysis
              </h2>
              {districtAverage && (
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: selectedJudges.length === 1 ? '1fr' : 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '32px',
                  }}
                >
                  {selectedJudges.map((slot, idx) => (
                    slot.radarData && (
                      <div key={idx}>
                        <div
                          style={{
                            fontSize: 14,
                            fontWeight: 600,
                            color: 'var(--color-text-primary)',
                            fontFamily: 'var(--font-body)',
                            marginBottom: '16px',
                            textAlign: 'center',
                          }}
                        >
                          {slot.judge?.full_name}
                        </div>
                        <JudgeRadar
                          judge={slot.radarData}
                          districtAvg={districtAverage}
                          label={`Judge ${slot.judge?.full_name} vs District Average`}
                        />
                      </div>
                    )
                  ))}
                </div>
              )}
            </div>

            {/* Side-by-Side Statistics Comparison */}
            <div
              style={{
                background: 'var(--color-surface-0)',
                border: '1px solid var(--border-default)',
                borderRadius: 4,
                overflow: 'hidden',
                marginBottom: '48px',
              }}
            >
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: `repeat(${selectedJudges.length}, 1fr)`,
                  borderBottom: '1px solid var(--border-default)',
                }}
              >
                {selectedJudges.map((slot, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: '20px',
                      borderRight: idx < selectedJudges.length - 1 ? '1px solid var(--border-default)' : 'none',
                      background: idx % 2 === 0 ? 'var(--surf, #F6F5F2)' : 'var(--color-surface-0)',
                    }}
                  >
                    <h3
                      style={{
                        margin: 0,
                        fontSize: 16,
                        fontWeight: 600,
                        color: 'var(--color-text-primary)',
                        fontFamily: 'var(--font-body)',
                      }}
                    >
                      {slot.judge?.full_name}
                    </h3>
                    <div
                      style={{
                        fontSize: 12,
                        color: 'var(--color-text-muted)',
                        marginTop: 4,
                        fontFamily: 'var(--font-body)',
                      }}
                    >
                      {slot.judge?.district_id}
                    </div>
                  </div>
                ))}
              </div>

              {/* Statistics rows */}
              {[
                { label: 'Win Rate', key: 'plaintiffWinRate' },
                { label: 'Summary Judgment Rate', key: 'summaryJudgmentRate' },
                { label: 'Dismissal Rate', key: 'dismissalRate' },
                { label: 'Settlement Rate', key: 'settlementRate' },
                { label: 'Avg Duration (months)', key: 'avgDuration' },
                { label: 'Total Cases', key: 'totalCases' },
              ].map((stat) => (
                <div
                  key={stat.key}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: `auto repeat(${selectedJudges.length}, 1fr)`,
                    borderBottom: '1px solid var(--border-default)',
                  }}
                >
                  <div
                    style={{
                      padding: '16px 20px',
                      fontWeight: 600,
                      fontSize: 13,
                      color: 'var(--color-text-primary)',
                      background: 'var(--color-surface-0)',
                      fontFamily: 'var(--font-body)',
                      minWidth: 160,
                    }}
                  >
                    {stat.label}
                  </div>
                  {selectedJudges.map((slot, idx) => {
                    const value = slot.aggregated ? (slot.aggregated as any)[stat.key] : 0;
                    const displayValue = stat.key === 'totalCases' ? value : `${value.toFixed(1)}${stat.key === 'avgDuration' ? '' : '%'}`;

                    return (
                      <div
                        key={idx}
                        style={{
                          padding: '16px 20px',
                          textAlign: 'right',
                          background: idx % 2 === 0 ? 'var(--surf, #F6F5F2)' : 'var(--color-surface-0)',
                          fontFamily: 'var(--font-body)',
                          fontSize: 14,
                          fontWeight: 500,
                          color: 'var(--color-text-primary)',
                        }}
                      >
                        {displayValue}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>

            {/* Export Button */}
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button
                onClick={exportPDF}
                style={{
                  padding: '12px 24px',
                  background: 'var(--accent-primary)',
                  color: 'var(--color-surface-0)',
                  border: 'none',
                  borderRadius: 4,
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontFamily: 'var(--font-body)',
                }}
              >
                Export as PDF
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/**
 * Build radar chart data from aggregated statistics
 */
function buildRadarData(aggregated: ReturnType<typeof aggregateJudgeStats>, stats: JudgeStatistics[]): JudgeRadarData {
  const mtdStats = stats.filter((s) => s.motions_to_dismiss_granted);
  const avgMTDRate = mtdStats.length > 0
    ? mtdStats.reduce((sum, s) => sum + ((s.motions_to_dismiss_granted / (s.total_cases || 1)) * 100), 0) / mtdStats.length
    : 0;

  return {
    plaintiffWinRate: aggregated.plaintiffWinRate || 0,
    sjGrantRate: aggregated.summaryJudgmentRate || 0,
    caseDuration: aggregated.avgDuration || 0,
    settlementRate: aggregated.settlementRate || 0,
    mtdGrantRate: avgMTDRate,
  };
}
