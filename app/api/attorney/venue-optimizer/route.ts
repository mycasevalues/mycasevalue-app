import { NextRequest, NextResponse } from 'next/server';
import { REAL_DATA } from '../../../../lib/realdata';
import { STATES } from '../../../../lib/data';
import { validateNOSCode, validateEnum } from '../../../../lib/sanitize';
import { getSupabaseAdmin } from '../../../../lib/supabase';

/**
 * Fetch case data from Supabase with REAL_DATA fallback.
 * This ensures the tool works even if Supabase is unavailable.
 */
async function getDataWithFallback(nosCode: string) {
  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from('case_stats')
      .select('*')
      .eq('nos_code', nosCode)
      .single();
    if (!error && data) return { ...data, _source: 'supabase' };
  } catch { /* Supabase unavailable */ }
  return REAL_DATA[nosCode] ? { ...REAL_DATA[nosCode], _source: 'local' } : null;
}


/**
 * Venue Optimizer API
 * Ranks states by favorability for a given case type
 */

type VenueScore = {
  state: string;
  stateLabel: string;
  winRate: number;
  nationalAvgWinRate: number;
  advantage: number;
  settlementRate: number;
  medianDurationMonths: number;
  totalCases: number;
  score: number;
  rank: number;
};

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const nos = searchParams.get('nos') || '';
  const prioritizeRaw = searchParams.get('prioritize') || 'winRate';

  if (!nos) {
    // Return available NOS codes
    const available = Object.entries(REAL_DATA)
      .filter(([, d]) => d && d.wr && d.total > 100)
      .map(([code, d]) => ({ nos: code, label: d.label, total: d.total }))
      .sort((a, b) => b.total - a.total);
    return NextResponse.json({ caseTypes: available });
  }

  // Validate NOS code
  const validatedNos = validateNOSCode(nos);
  if (!validatedNos) {
    return NextResponse.json(
      { error: 'Invalid NOS code. Provide a 1-4 digit numeric code.' },
      { status: 400 }
    );
  }

  // Validate prioritize parameter
  const validPrioritizeValues = ['winRate', 'settlement', 'speed'] as const;
  const prioritize = validateEnum(prioritizeRaw, validPrioritizeValues, 'winRate');

  const caseData = REAL_DATA[validatedNos];
  if (!caseData || !caseData.state_rates) {
    return NextResponse.json(
      { error: 'No data available for this case type.' },
      { status: 404 }
    );
  }

  const nationalWinRate = caseData.wr || 0;
  const nationalSettlementRate = caseData.sp || 0;
  const nationalDuration = caseData.mo || 0;
  const caseType = caseData.label || 'Unknown';

  // Process state data
  const venues: VenueScore[] = [];

  Object.entries(caseData.state_rates || {}).forEach(([stateCode, stateData]: [string, any]) => {
    if (!stateData || !stateData.wr) return;

    const stateLabel = STATES.find((s) => s.id === stateCode)?.label || stateCode;
    const winRate = stateData.wr;
    const settlementRate = stateData.sp || nationalSettlementRate;
    const duration = stateData.mo || nationalDuration;
    const totalCases = stateData.total || 0;

    // Calculate advantage
    const advantage = winRate - nationalWinRate;

    // Compute composite score (0-100)
    let score = 50; // baseline

    // Win rate component
    score += (winRate - 30) * 0.5;

    // Settlement rate bonus
    score += (settlementRate - 30) * 0.3;

    // Speed bonus
    const speedBonus = Math.max(0, (nationalDuration - duration) / nationalDuration) * 10;
    score += speedBonus;

    // Volume confidence
    if (totalCases > 1000) score += 5;
    else if (totalCases > 100) score += 2;

    score = Math.min(100, Math.max(0, score));

    venues.push({
      state: stateCode,
      stateLabel,
      winRate: Math.round(winRate * 10) / 10,
      nationalAvgWinRate: Math.round(nationalWinRate * 10) / 10,
      advantage: Math.round(advantage * 10) / 10,
      settlementRate: Math.round(settlementRate * 10) / 10,
      medianDurationMonths: duration,
      totalCases,
      score: Math.round(score * 10) / 10,
      rank: 0,
    });
  });

  // Sort by priority
  if (prioritize === 'settlement') {
    venues.sort((a, b) => b.settlementRate - a.settlementRate || b.score - a.score);
  } else if (prioritize === 'speed') {
    venues.sort((a, b) => a.medianDurationMonths - b.medianDurationMonths || b.score - a.score);
  } else {
    // winRate (default)
    venues.sort((a, b) => b.winRate - a.winRate || b.score - a.score);
  }

  // Assign ranks
  venues.forEach((v, idx) => {
    v.rank = idx + 1;
  });

  return NextResponse.json({
    nos: validatedNos,
    caseType,
    nationalStats: {
      winRate: Math.round(nationalWinRate * 10) / 10,
      settlementRate: Math.round(nationalSettlementRate * 10) / 10,
      medianDurationMonths: nationalDuration,
      totalCases: caseData.total || 0,
    },
    prioritize,
    venues,
    disclaimer: 'Rankings based on real federal court case outcomes. Consult your attorney for jurisdiction-specific legal advice.',
  });
}
