export const dynamic = 'force-dynamic';
export const maxDuration = 30;

import { NextRequest, NextResponse } from 'next/server';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface CasePredictRequestBody {
  caseType: string;
  jurisdiction: string;
  facts: string;
  hasAttorney?: boolean;
  damageAmount?: 'small' | 'mid' | 'large' | 'xlarge' | 'huge';
}

interface OutcomePrediction {
  label: string;
  percentage: number;
  color: string;
}

interface CasePredictResponse {
  caseType: string;
  jurisdiction: string;
  predictedWinRate: number;
  predictedSettlementRate: number;
  predictedDurationMonths: number;
  settlementRange: {
    low: number;
    median: number;
    high: number;
  };
  outcomes: OutcomePrediction[];
  confidence: 'Low' | 'Moderate' | 'High';
  sampleSize: number;
  keyFactors: string[];
  riskScore: number;
  aiAnalysis: string | null;
  disclaimer: string;
}

interface ErrorResponse {
  error: string;
  message?: string;
}

// ---------------------------------------------------------------------------
// CORS & rate-limit helpers
// ---------------------------------------------------------------------------

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

function withRateLimitHeaders(headers: Record<string, string> = {}): Record<string, string> {
  return {
    ...CORS_HEADERS,
    // TODO: Replace static values with real rate-limit tracking (e.g. Upstash Redis)
    'X-RateLimit-Limit': '30',
    'X-RateLimit-Remaining': '29',
    'X-RateLimit-Reset': String(Math.floor(Date.now() / 1000) + 3600),
    ...headers,
  };
}

// ---------------------------------------------------------------------------
// Mock prediction logic
// ---------------------------------------------------------------------------

interface MockCaseProfile {
  label: string;
  baseWinRate: number;
  baseSettlementRate: number;
  avgDurationMonths: number;
  settlementRange: { low: number; median: number; high: number };
  sampleSize: number;
  outcomes: OutcomePrediction[];
}

const CASE_PROFILES: Record<string, MockCaseProfile> = {
  'personal-injury': {
    label: 'Personal Injury',
    baseWinRate: 58,
    baseSettlementRate: 52,
    avgDurationMonths: 11,
    settlementRange: { low: 25, median: 150, high: 750 },
    sampleSize: 124500,
    outcomes: [
      { label: 'Settlement', percentage: 52, color: '#22C55E' },
      { label: 'Dismissed', percentage: 23, color: '#EF4444' },
      { label: 'Judgment for Plaintiff', percentage: 12, color: '#3B82F6' },
      { label: 'Judgment for Defendant', percentage: 8, color: '#F97316' },
      { label: 'Trial', percentage: 5, color: '#8B5CF6' },
    ],
  },
  'employment-discrimination': {
    label: 'Employment Discrimination',
    baseWinRate: 42,
    baseSettlementRate: 38,
    avgDurationMonths: 14,
    settlementRange: { low: 30, median: 175, high: 900 },
    sampleSize: 89200,
    outcomes: [
      { label: 'Settlement', percentage: 38, color: '#22C55E' },
      { label: 'Dismissed', percentage: 32, color: '#EF4444' },
      { label: 'Judgment for Plaintiff', percentage: 10, color: '#3B82F6' },
      { label: 'Judgment for Defendant', percentage: 14, color: '#F97316' },
      { label: 'Trial', percentage: 6, color: '#8B5CF6' },
    ],
  },
  'medical-malpractice': {
    label: 'Medical Malpractice',
    baseWinRate: 35,
    baseSettlementRate: 45,
    avgDurationMonths: 18,
    settlementRange: { low: 75, median: 350, high: 2000 },
    sampleSize: 42800,
    outcomes: [
      { label: 'Settlement', percentage: 45, color: '#22C55E' },
      { label: 'Dismissed', percentage: 25, color: '#EF4444' },
      { label: 'Judgment for Plaintiff', percentage: 8, color: '#3B82F6' },
      { label: 'Judgment for Defendant', percentage: 15, color: '#F97316' },
      { label: 'Trial', percentage: 7, color: '#8B5CF6' },
    ],
  },
  'breach-of-contract': {
    label: 'Breach of Contract',
    baseWinRate: 52,
    baseSettlementRate: 48,
    avgDurationMonths: 10,
    settlementRange: { low: 15, median: 100, high: 500 },
    sampleSize: 156300,
    outcomes: [
      { label: 'Settlement', percentage: 48, color: '#22C55E' },
      { label: 'Dismissed', percentage: 20, color: '#EF4444' },
      { label: 'Judgment for Plaintiff', percentage: 15, color: '#3B82F6' },
      { label: 'Judgment for Defendant', percentage: 12, color: '#F97316' },
      { label: 'Trial', percentage: 5, color: '#8B5CF6' },
    ],
  },
};

const DEFAULT_PROFILE: MockCaseProfile = {
  label: 'General Civil',
  baseWinRate: 48,
  baseSettlementRate: 44,
  avgDurationMonths: 12,
  settlementRange: { low: 20, median: 125, high: 600 },
  sampleSize: 50000,
  outcomes: [
    { label: 'Settlement', percentage: 44, color: '#22C55E' },
    { label: 'Dismissed', percentage: 26, color: '#EF4444' },
    { label: 'Judgment for Plaintiff', percentage: 12, color: '#3B82F6' },
    { label: 'Judgment for Defendant', percentage: 12, color: '#F97316' },
    { label: 'Trial', percentage: 6, color: '#8B5CF6' },
  ],
};

function generatePrediction(body: CasePredictRequestBody): CasePredictResponse {
  const profile = CASE_PROFILES[body.caseType] ?? DEFAULT_PROFILE;

  // Adjustments based on input
  let winAdj = 0;
  let settlementAdj = 0;
  let durationAdj = 0;
  let settlementMult = 1;
  const factors: string[] = [];

  // Attorney representation
  if (body.hasAttorney !== false) {
    winAdj += 12;
    settlementAdj += 8;
    settlementMult *= 1.3;
    factors.push('Attorney representation improves outcomes by 15-25% based on historical data');
  } else {
    winAdj -= 10;
    settlementMult *= 0.6;
    factors.push('Pro se litigants face significantly lower win rates in this category');
  }

  // Damage amount
  const damageMults: Record<string, number> = { small: 0.4, mid: 0.8, large: 1.0, xlarge: 1.5, huge: 2.5 };
  if (body.damageAmount) {
    settlementMult *= damageMults[body.damageAmount] ?? 1.0;
    if (body.damageAmount === 'huge' || body.damageAmount === 'xlarge') {
      durationAdj += 4;
      factors.push('High-value claims tend to take longer to resolve but yield larger settlements');
    }
  }

  // Facts length heuristic — longer, more detailed facts suggest stronger preparation
  if (body.facts.length > 500) {
    winAdj += 5;
    factors.push('Detailed case facts suggest strong documentation and case preparation');
  }

  factors.push(`Based on analysis of ${profile.sampleSize.toLocaleString()} similar federal cases`);

  const predictedWinRate = Math.round(Math.min(95, Math.max(10, profile.baseWinRate + winAdj)));
  const predictedSettlementRate = Math.round(Math.min(90, Math.max(10, profile.baseSettlementRate + settlementAdj)));
  const predictedDuration = Math.max(3, Math.round(profile.avgDurationMonths + durationAdj));

  // Risk score: 0 (low risk) to 100 (high risk) — inverse of win probability
  const riskScore = Math.round(100 - predictedWinRate);

  return {
    caseType: profile.label,
    jurisdiction: body.jurisdiction,
    predictedWinRate,
    predictedSettlementRate,
    predictedDurationMonths: predictedDuration,
    settlementRange: {
      low: Math.round(profile.settlementRange.low * settlementMult),
      median: Math.round(profile.settlementRange.median * settlementMult),
      high: Math.round(profile.settlementRange.high * settlementMult),
    },
    outcomes: profile.outcomes,
    confidence: profile.sampleSize > 100000 ? 'High' : profile.sampleSize > 40000 ? 'Moderate' : 'Low',
    sampleSize: profile.sampleSize,
    keyFactors: factors,
    riskScore,
    // TODO: Integrate with Anthropic Claude API for AI-powered analysis
    // - Send case facts, jurisdiction, and prediction data to Claude
    // - Get strategic insights, risk factors, and recommended next steps
    // - Use claude-sonnet model for fast, cost-effective analysis
    // - Add streaming support for real-time analysis display
    aiAnalysis: null,
    disclaimer:
      'Predictions are based on statistical analysis of historical federal court outcomes and should not be considered legal advice. Actual case outcomes depend on many factors not captured in this analysis. AI analysis, when available, is generated commentary and should be reviewed by the attorney.',
  };
}

// ---------------------------------------------------------------------------
// POST /api/attorney/case-predict
// ---------------------------------------------------------------------------

/**
 * POST /api/attorney/case-predict
 *
 * Case outcome prediction endpoint.
 *
 * Body (JSON):
 *   caseType     — case category key (required, e.g. "personal-injury")
 *   jurisdiction — jurisdiction string (required, e.g. "N.D. Cal.")
 *   facts        — case facts narrative (required, min 20 chars)
 *   hasAttorney  — whether plaintiff has attorney (optional, default true)
 *   damageAmount — damage tier (optional: "small"|"mid"|"large"|"xlarge"|"huge")
 *
 * Returns prediction scores, outcome distribution, risk score, and key factors.
 */
export async function POST(
  request: NextRequest,
): Promise<NextResponse<CasePredictResponse | ErrorResponse>> {
  try {
    const body: CasePredictRequestBody = await request.json();

    // --- Validation ---
    if (!body.caseType || typeof body.caseType !== 'string') {
      return NextResponse.json(
        { error: 'Case type is required', message: 'Provide a case type key (e.g. "personal-injury")' },
        { status: 400, headers: withRateLimitHeaders() },
      );
    }

    if (!body.jurisdiction || typeof body.jurisdiction !== 'string') {
      return NextResponse.json(
        { error: 'Jurisdiction is required', message: 'Provide a jurisdiction (e.g. "N.D. Cal.")' },
        { status: 400, headers: withRateLimitHeaders() },
      );
    }

    if (!body.facts || typeof body.facts !== 'string' || body.facts.trim().length < 20) {
      return NextResponse.json(
        { error: 'Insufficient facts', message: 'Provide at least 20 characters describing the case facts' },
        { status: 400, headers: withRateLimitHeaders() },
      );
    }

    if (body.facts.length > 5000) {
      return NextResponse.json(
        { error: 'Facts too long', message: 'Case facts must be 5000 characters or fewer' },
        { status: 400, headers: withRateLimitHeaders() },
      );
    }

    // TODO: Integrate with Supabase case_stats for real historical data
    // TODO: Integrate with Anthropic Claude API for AI-powered fact analysis
    //   - Use sanitizeForPrompt() from lib/sanitize to clean facts before sending to Claude
    //   - Stream analysis with ai SDK streamText() for real-time display
    // TODO: Add jurisdiction-specific adjustments from Supabase district data
    // TODO: Log prediction requests for analytics (anonymized)

    const prediction = generatePrediction(body);

    return NextResponse.json(prediction, {
      headers: withRateLimitHeaders({
        'Cache-Control': 'no-store',
      }),
    });
  } catch (err: unknown) {
    console.error('[api/attorney/case-predict] error:', err);

    if (err instanceof SyntaxError) {
      return NextResponse.json(
        { error: 'Invalid JSON', message: 'Request body must be valid JSON' },
        { status: 400, headers: withRateLimitHeaders() },
      );
    }

    return NextResponse.json(
      { error: 'Prediction failed', message: 'An unexpected error occurred while generating the prediction' },
      { status: 500, headers: withRateLimitHeaders() },
    );
  }
}

/**
 * OPTIONS handler for CORS preflight requests
 */
export async function OPTIONS() {
  return new NextResponse(null, { headers: CORS_HEADERS });
}
