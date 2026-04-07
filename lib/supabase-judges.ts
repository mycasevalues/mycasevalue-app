/**
 * Supabase types and helpers for the judge data system.
 * Used by judge directory, profile pages, and API routes.
 */

export interface Judge {
  id: string;
  courtlistener_id: number | null;
  full_name: string;
  first_name: string | null;
  last_name: string | null;
  district_id: string | null;
  circuit: string | null;
  appointment_date: string | null;
  appointing_president: string | null;
  party_of_appointing_president: string | null;
  termination_date: string | null;
  is_active: boolean;
  position: string | null;
  courtlistener_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface JudgeStatistics {
  id: number;
  judge_id: string;
  nos_code: number;
  total_cases: number;
  plaintiff_wins: number;
  defendant_wins: number;
  settlements: number;
  dismissals: number;
  summary_judgments_defense: number;
  motions_to_dismiss_granted: number;
  avg_duration_months: number;
  plaintiff_win_rate: number;
  summary_judgment_rate_defense: number;
  dismissal_rate: number;
  settlement_rate: number;
  last_calculated: string;
}

export interface JudgeOpinion {
  id: number;
  judge_id: string;
  courtlistener_opinion_id: number | null;
  case_name: string | null;
  court: string | null;
  year: number | null;
  citation_count: number | null;
  nos_code: number | null;
  ai_summary: string | null;
  ai_summary_generated_at: string | null;
  courtlistener_url: string | null;
  created_at: string;
}

export interface JudgeAIAnalysis {
  id: number;
  judge_id: string;
  writing_style: string | null;
  plaintiff_tendencies: string | null;
  motion_approach: string | null;
  notable_patterns: string | null;
  caveats: string | null;
  generated_at: string;
  opinions_count_at_generation: number | null;
}

export interface JudgeWithStats extends Judge {
  overall_plaintiff_win_rate: number | null;
  total_cases_handled: number;
  statistics?: JudgeStatistics[];
}

/** Aggregate stats across all NOS codes for a judge */
export function aggregateJudgeStats(stats: JudgeStatistics[]): {
  totalCases: number;
  plaintiffWinRate: number;
  summaryJudgmentRate: number;
  dismissalRate: number;
  settlementRate: number;
  avgDuration: number;
} {
  if (!stats || stats.length === 0) {
    return { totalCases: 0, plaintiffWinRate: 0, summaryJudgmentRate: 0, dismissalRate: 0, settlementRate: 0, avgDuration: 0 };
  }

  let totalCases = 0;
  let totalPWins = 0;
  let totalDWins = 0;
  let totalSettlements = 0;
  let totalDismissals = 0;
  let totalSJDefense = 0;
  let durationSum = 0;
  let durationCount = 0;

  stats.forEach((s) => {
    totalCases += s.total_cases || 0;
    totalPWins += s.plaintiff_wins || 0;
    totalDWins += s.defendant_wins || 0;
    totalSettlements += s.settlements || 0;
    totalDismissals += s.dismissals || 0;
    totalSJDefense += s.summary_judgments_defense || 0;
    if (s.avg_duration_months && s.total_cases) {
      durationSum += s.avg_duration_months * s.total_cases;
      durationCount += s.total_cases;
    }
  });

  const trialDecided = totalPWins + totalDWins;

  return {
    totalCases,
    plaintiffWinRate: trialDecided > 0 ? (totalPWins / trialDecided) * 100 : 0,
    summaryJudgmentRate: totalCases > 0 ? (totalSJDefense / totalCases) * 100 : 0,
    dismissalRate: totalCases > 0 ? (totalDismissals / totalCases) * 100 : 0,
    settlementRate: totalCases > 0 ? (totalSettlements / totalCases) * 100 : 0,
    avgDuration: durationCount > 0 ? durationSum / durationCount : 0,
  };
}

/** Map party of appointing president to display color */
export function getPartyColor(party: string | null): string {
  if (!party) return '#9CA3AF';
  const p = party.toLowerCase();
  if (p.includes('democrat')) return '#2563EB';
  if (p.includes('republican')) return '#DC2626';
  return '#9CA3AF';
}

/** Map party to short label */
export function getPartyLabel(party: string | null): string {
  if (!party) return 'Unknown';
  const p = party.toLowerCase();
  if (p.includes('democrat')) return 'D';
  if (p.includes('republican')) return 'R';
  return '—';
}
