import { NextRequest, NextResponse } from 'next/server';
import { REAL_DATA } from '../../../../lib/realdata';
import { validateNOSCode, validateState, validateEnum, sanitizeForPrompt } from '../../../../lib/sanitize';
import { getSupabaseAdmin } from '../../../../lib/supabase';

/**
 * Fetch case stats from Supabase, falling back to REAL_DATA
 */
async function getCaseData(nosCode: string) {
  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from('case_stats')
      .select('*')
      .eq('nos_code', nosCode)
      .single();

    if (!error && data) {
      // Map Supabase schema to REAL_DATA shape for compatibility
      return {
        label: data.label,
        wr: data.win_rate,
        sp: data.settlement_rate,
        mo: data.avg_duration_months,
        rng: { lo: data.settlement_lo, md: data.median_settlement, hi: data.settlement_hi },
        total: data.total_cases,
        rr: { wr: data.represented_win_rate },
        ps: { wr: data.pro_se_win_rate },
        sol: data.statute_of_limitations,
        af: data.attorney_fee_range,
        ends: null, // Will fall back to REAL_DATA for outcome distribution
        state_rates: null,
        _source: 'supabase',
      };
    }
  } catch {
    // Supabase unavailable — fall through to REAL_DATA
  }

  // Fallback to local REAL_DATA
  const local = REAL_DATA[nosCode];
  return local ? { ...local, _source: 'local' } : null;
}

/**
 * AI Case Outcome Predictor API
 * Uses real federal court statistics to generate predictions
 * Optionally enhanced with Claude AI analysis
 */

export const dynamic = 'force-dynamic';
export const maxDuration = 30;

type PredictionInput = {
  caseType: string;     // NOS code
  state: string;        // state ID
  hasAttorney: boolean;
  damageAmount: string;  // "small" | "mid" | "large" | "xlarge" | "huge"
  caseStrength: string;  // "weak" | "moderate" | "strong"
  priorOffers: boolean;
  documentedEvidence: boolean;
};

async function calculatePrediction(input: PredictionInput) {
  const nosData = await getCaseData(input.caseType);
  if (!nosData) {
    return null;
  }

  // If Supabase data doesn't have outcome distribution, merge from REAL_DATA
  if (!nosData.ends) {
    const localData = REAL_DATA[input.caseType];
    if (localData?.ends) nosData.ends = localData.ends;
  }
  if (!nosData.state_rates) {
    const localData = REAL_DATA[input.caseType];
    if (localData?.state_rates) nosData.state_rates = localData.state_rates;
  }

  // Base rates from real data
  let baseWinRate = nosData.wr ?? 55;
  let baseSettlementRate = nosData.sp ?? 42;
  const baseDuration = nosData.mo ?? 8;
  const baseRange = nosData.rng ?? { lo: 50, md: 150, hi: 800 };

  // State-level adjustment
  if (nosData.state_rates && nosData.state_rates[input.state]) {
    const sr = nosData.state_rates[input.state];
    if (sr.wr) baseWinRate = sr.wr;
  }

  // Attorney representation adjustment
  let winRateAdj = 0;
  let settlementAdj = 0;
  let durationAdj = 0;
  let settlementMultiplier = 1;

  if (input.hasAttorney) {
    // Real data shows represented plaintiffs win more
    const repWr = nosData.rr?.wr ?? baseWinRate;
    const proSeWr = nosData.ps?.wr ?? baseWinRate * 0.65;
    winRateAdj += (repWr - baseWinRate) * 0.5;
    settlementAdj += 5;
    settlementMultiplier *= 1.3;
  } else {
    const proSeWr = nosData.ps?.wr ?? baseWinRate * 0.65;
    winRateAdj += (proSeWr - baseWinRate) * 0.5;
    settlementMultiplier *= 0.6;
  }

  // Case strength adjustment
  if (input.caseStrength === 'strong') {
    winRateAdj += 12;
    settlementAdj += 8;
    settlementMultiplier *= 1.2;
  } else if (input.caseStrength === 'weak') {
    winRateAdj -= 15;
    settlementAdj -= 10;
    settlementMultiplier *= 0.7;
    durationAdj -= 2; // weaker cases resolve faster (dismissed)
  }

  // Damage amount adjustment
  const damageMultipliers: Record<string, number> = {
    small: 0.4,
    mid: 0.8,
    large: 1.0,
    xlarge: 1.5,
    huge: 2.5,
  };
  const dmMult = damageMultipliers[input.damageAmount] || 1.0;
  settlementMultiplier *= dmMult;

  // Prior offers indicate higher settlement likelihood
  if (input.priorOffers) {
    settlementAdj += 12;
    durationAdj -= 2;
  }

  // Documented evidence increases chances
  if (input.documentedEvidence) {
    winRateAdj += 8;
    settlementAdj += 5;
  }

  // Compute final scores
  const predictedWinRate = Math.round(Math.min(95, Math.max(10, baseWinRate + winRateAdj)));
  const predictedSettlementRate = Math.round(Math.min(90, Math.max(10, baseSettlementRate + settlementAdj)));
  const predictedDuration = Math.max(2, Math.round(baseDuration + durationAdj));

  // Settlement range calculation
  const settlementLo = Math.round(baseRange.lo * settlementMultiplier);
  const settlementMd = Math.round(baseRange.md * settlementMultiplier);
  const settlementHi = Math.round(baseRange.hi * settlementMultiplier);

  // Outcome probabilities
  const outcomes = nosData.ends || [];
  const adjustedOutcomes = outcomes.map((o: { l: string; p: number; c: string }) => {
    let pct = o.p;
    if (o.l === 'Settlement') pct = Math.min(70, pct + settlementAdj * 0.3);
    if (o.l === 'Trial') pct = input.hasAttorney ? pct * 1.2 : pct * 0.5;
    if (o.l === 'Dismissed') pct = input.caseStrength === 'weak' ? pct * 1.4 : pct * 0.8;
    return { label: o.l, percentage: Math.round(pct * 10) / 10, color: o.c };
  });

  // Normalize to 100%
  const total = adjustedOutcomes.reduce((s: number, o: { percentage: number }) => s + o.percentage, 0);
  const normalizedOutcomes = adjustedOutcomes.map((o: { label: string; percentage: number; color: string }) => ({
    ...o,
    percentage: Math.round((o.percentage / total) * 1000) / 10,
  }));

  // Confidence score
  const sampleSize = nosData.total || 1000;
  const confidence = sampleSize > 50000 ? 'High' : sampleSize > 10000 ? 'Moderate' : 'Low';

  // Key factors
  const factors: string[] = [];
  if (input.hasAttorney) factors.push('Attorney representation significantly improves outcomes (+15-25%)');
  else factors.push('Pro se litigants face substantially lower win rates in this category');
  if (input.documentedEvidence) factors.push('Documented evidence strengthens motion practice and settlement leverage');
  if (input.priorOffers) factors.push('Prior settlement offers indicate defendant willingness to negotiate');
  if (input.caseStrength === 'strong') factors.push('Strong case facts align with favorable precedent in this category');
  if (input.caseStrength === 'weak') factors.push('Case factors suggest elevated risk of early dismissal');
  factors.push(`Based on ${sampleSize.toLocaleString()} federal cases in this category`);

  return {
    caseType: nosData.label,
    nosCode: input.caseType,
    predictedWinRate,
    predictedSettlementRate,
    predictedDurationMonths: predictedDuration,
    settlementRange: {
      low: settlementLo,
      median: settlementMd,
      high: settlementHi,
    },
    outcomes: normalizedOutcomes,
    confidence,
    sampleSize,
    keyFactors: factors,
    statuteOfLimitations: nosData.sol || 'Varies by jurisdiction',
    typicalFeeRange: nosData.af || 'Varies',
  };
}

/**
 * Get AI-generated strategic insights for the case prediction
 */
async function getAIInsights(prediction: any, input: PredictionInput): Promise<string> {
  if (!process.env.ANTHROPIC_API_KEY) {
    return '';
  }

  try {
    const { generateText } = await import('ai');
    const { anthropic } = await import('@ai-sdk/anthropic');

    const nosData = REAL_DATA[input.caseType];
    const context = `
Case Type: ${prediction.caseType}
Win Rate: ${prediction.predictedWinRate}%
Settlement Rate: ${prediction.predictedSettlementRate}%
Predicted Duration: ${prediction.predictedDurationMonths} months
Settlement Range: ${prediction.settlementRange.low >= 1000 ? `$${(prediction.settlementRange.low / 1000).toFixed(1)}M` : `$${prediction.settlementRange.low}K`} - ${prediction.settlementRange.high >= 1000 ? `$${(prediction.settlementRange.high / 1000).toFixed(1)}M` : `$${prediction.settlementRange.high}K`}
Represented: ${input.hasAttorney ? 'Yes' : 'Pro Se'}
Case Strength: ${input.caseStrength}
Sample Size: ${prediction.sampleSize.toLocaleString()} cases
Win Rate in Category: ${nosData?.wr ?? 55}%
Settlement Rate in Category: ${nosData?.sp ?? 42}%
`.trim();

    const result = await generateText({
      model: anthropic('claude-sonnet-4-20250514'),
      maxOutputTokens: 300,
      messages: [
        {
          role: 'system',
          content: `You are an expert litigation strategist. Provide 2-3 key strategic insights based on the case prediction data. Focus on actionable advice for the attorney about settlement strategy, risk factors, and next steps. Keep insights concise and practical.`,
          providerOptions: { anthropic: { cacheControl: { type: 'ephemeral' } } },
        },
        {
          role: 'user',
          content: `Based on this case prediction data, provide strategic insights:\n${context}`,
        },
      ],
    });

    return result.text || '';
  } catch {
    return '';
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { caseType, state, hasAttorney, damageAmount, caseStrength, priorOffers, documentedEvidence } = body;

    if (!caseType) {
      return NextResponse.json({ error: 'Case type (NOS code) is required' }, { status: 400 });
    }

    // Validate caseType (should be valid NOS code or known string)
    const validatedCaseType = validateNOSCode(caseType);
    if (!validatedCaseType) {
      return NextResponse.json(
        { error: 'Invalid case type. Provide a valid 1-4 digit NOS code.' },
        { status: 400 }
      );
    }

    // Validate state if provided
    let validatedState = '';
    if (state) {
      const validated = validateState(state);
      if (!validated) {
        return NextResponse.json(
          { error: 'Invalid state code. Provide a valid 2-letter US state code.' },
          { status: 400 }
        );
      }
      validatedState = validated;
    }

    // Validate damageAmount against allowed values
    const validDamageAmounts = ['small', 'mid', 'large', 'xlarge', 'huge'] as const;
    const validatedDamageAmount = validateEnum(damageAmount, validDamageAmounts, 'mid');

    // Validate caseStrength against allowed values
    const validCaseStrengths = ['weak', 'moderate', 'strong'] as const;
    const validatedCaseStrength = validateEnum(caseStrength, validCaseStrengths, 'moderate');

    const prediction = await calculatePrediction({
      caseType: validatedCaseType,
      state: validatedState,
      hasAttorney: !!hasAttorney,
      damageAmount: validatedDamageAmount,
      caseStrength: validatedCaseStrength,
      priorOffers: !!priorOffers,
      documentedEvidence: !!documentedEvidence,
    });

    if (!prediction) {
      return NextResponse.json(
        { error: `No data available for case type ${caseType}` },
        { status: 404 }
      );
    }

    // Get AI-generated strategic insights
    const aiInsights = await getAIInsights(prediction, {
      caseType: validatedCaseType,
      state: validatedState,
      hasAttorney: !!hasAttorney,
      damageAmount: validatedDamageAmount,
      caseStrength: validatedCaseStrength,
      priorOffers: !!priorOffers,
      documentedEvidence: !!documentedEvidence,
    });

    return NextResponse.json({
      prediction: {
        ...prediction,
        aiInsights: aiInsights || null,
      },
      disclaimer: 'This prediction is based on statistical analysis of historical federal court data and should not be considered legal advice. Actual outcomes depend on many case-specific factors not captured here. AI insights are generated analysis and should be reviewed by the attorney.',
    });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    console.error('[api/attorney/case-predictor] error:', errorMessage);

    if (err instanceof SyntaxError) {
      return NextResponse.json(
        {
          error: 'Invalid JSON',
          message: 'Request body must be valid JSON'
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        error: 'Prediction failed',
        message: 'An unexpected error occurred while generating the prediction. Please try again.'
      },
      { status: 500 }
    );
  }
}

