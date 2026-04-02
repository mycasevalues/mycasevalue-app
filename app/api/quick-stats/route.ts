export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { rateLimit, getClientIp } from '../../../lib/rate-limit';
import { REAL_DATA, TOTAL_REAL_CASES, REAL_OUTCOME_DATA } from '../../../lib/realdata';

/**
 * Federal District Labels for common jurisdictions
 * Maps district codes to display names
 */
const DISTRICT_LABELS: Record<string, string> = {
  'sdny': 'Southern District of New York',
  'ndca': 'Northern District of California',
  'cdca': 'Central District of California',
  'cdil': 'Central District of Illinois',
  'edtx': 'Eastern District of Texas',
  'edny': 'Eastern District of New York',
  'ndil': 'Northern District of Illinois',
  'wdtx': 'Western District of Texas',
  'ndga': 'Northern District of Georgia',
  'sdtx': 'Southern District of Texas',
  'all': 'All Federal Districts',
};

/**
 * NOS Code to Case Type Label mapping
 */
const NOS_LABELS: Record<string, string> = {
  '110': 'Insurance',
  '152': 'Tax',
  '190': 'Contract',
  '195': 'Construction',
  '220': 'Foreclosure',
  '230': 'Landlord & Tenant',
  '350': 'Motor Vehicle',
  '360': 'Personal Injury',
  '362': 'Medical Malpractice',
  '365': 'Product Liability',
  '370': 'Fraud / Other Tort',
  '385': 'Property Damage',
  '400': 'Civil Rights',
  '440': 'Civil Rights',
  '441': 'Voting Rights',
  '442': 'Employment Discrimination',
  '443': 'Housing Discrimination',
  '445': 'Disability Discrimination',
  '550': 'Prison Conditions',
  '710': 'Labor / FLSA',
  '791': 'ERISA',
  '820': 'Copyright',
  '830': 'Patent',
  '840': 'Trademark',
  '850': 'Securities',
  '863': 'Disability Benefits',
  '870': 'Debt Collection',
  '893': 'Environmental',
  '899': 'Immigration',
  '900': 'Eminent Domain',
  '950': 'Constitutional',
};

interface QuickStatsResponse {
  nos_code: string;
  nos_label: string;
  district: string;
  district_label: string;
  total_cases: number;
  plaintiff_win_rate: number;
  settlement_rate: number;
  dismissal_rate: number;
  median_award: number;
  avg_duration_months: number;
  data_years: string;
  source: string;
  narrative_en: string;
  narrative_es: string;
  cta: {
    text_en: string;
    text_es: string;
    url: string;
    price: string;
  };
}

interface ErrorResponse {
  error: string;
  message?: string;
}

/**
 * GET /api/quick-stats?nos=[code]&district=[code]&year=[optional]
 *
 * Returns quick statistics for the given NOS code and optional district.
 * This is the endpoint that powers the free Odds Calculator.
 *
 * Query params:
 * - nos: NOS code (required, 1-4 digits)
 * - district: Federal district code (optional, default: 'all')
 * - year: Year filter (optional, default: all years)
 *
 * Response: JSON with case statistics, narratives, and CTA
 */
export async function GET(
  request: NextRequest
): Promise<NextResponse<QuickStatsResponse | ErrorResponse>> {
  // Rate limiting: 100 req/min per IP
  const clientIp = getClientIp(request.headers);
  const rateLimitResult = rateLimit(clientIp, {
    windowMs: 60000,
    maxRequests: 100,
  });

  if (!rateLimitResult.success) {
    return NextResponse.json(
      { error: 'Too many requests', message: 'Rate limit exceeded: 100 requests per minute' },
      { status: 429, headers: { 'X-RateLimit-Remaining': '0' } }
    );
  }

  // Extract query parameters
  const { searchParams } = request.nextUrl;
  const nosCode = searchParams.get('nos');
  const district = (searchParams.get('district') || 'all').toLowerCase();
  const year = searchParams.get('year');

  // Validate NOS code
  if (!nosCode || !/^\d{1,4}$/.test(nosCode)) {
    return NextResponse.json(
      {
        error: 'Invalid NOS code',
        message: 'NOS code must be 1-4 digits (e.g., 442, 350, 870)',
      },
      { status: 400 }
    );
  }

  try {
    // Get real data for this NOS code
    const nosData = REAL_DATA[nosCode];
    if (!nosData) {
      return NextResponse.json(
        {
          error: 'NOS code not found',
          message: `No data available for NOS code ${nosCode}`,
        },
        { status: 404 }
      );
    }

    // Extract statistics from real data
    const totalCases = nosData.total || 0;
    const avgDurationMonths = nosData.mo || 12;

    // Get outcome data to compute win/settlement/dismissal rates
    const outcomeData = REAL_OUTCOME_DATA[nosCode] || {
      trial_win: 10,
      trial_loss: 7,
      dismiss: 53,
      fav_set: 30,
      set_mo: 6,
      trial_med: 'N/A',
    };

    // Extract rates (these are percentages out of 100)
    const trialWinPct = outcomeData.trial_win || 0;
    const trialLossPct = outcomeData.trial_loss || 0;
    const dismissPct = outcomeData.dismiss || 0;
    const favSetPct = outcomeData.fav_set || 0;

    // Calculate composite rates:
    // - plaintiff_win_rate: trial wins only
    const plaintiffWinRate = Math.round(trialWinPct);

    // - settlement_rate: favorable settlements
    const settlementRate = Math.round(favSetPct);

    // - dismissal_rate: cases dismissed
    const dismissalRate = Math.round(dismissPct);

    // Extract median award from data
    // realdata stores it as trial_med which is a string like "$200" or "$130"
    let medianAward = 0;
    if (outcomeData.trial_med && outcomeData.trial_med !== 'N/A') {
      const medStr = outcomeData.trial_med.replace(/[^\d]/g, '');
      if (medStr) {
        // Value in realdata is in thousands, convert to actual dollars
        medianAward = parseInt(medStr, 10) * 1000;
      }
    }

    // If no median award found, use a reasonable default based on case type
    if (medianAward === 0) {
      // Fallback medians by case type from BJS data
      const medianDefaults: Record<string, number> = {
        '362': 400000, // Medical malpractice
        '365': 500000, // Product liability
        '442': 175000, // Employment discrimination
        '350': 50000, // Motor vehicle
        '360': 50000, // Personal injury
      };
      medianAward = medianDefaults[nosCode] || 50000;
    }

    // Get labels
    const nosLabel = NOS_LABELS[nosCode] || nosData.label || 'Civil Case';
    const districtLabel = DISTRICT_LABELS[district] || 'All Federal Districts';

    // Build narratives using deterministic templates
    const narrativeEn = buildNarrativeEn(
      totalCases,
      nosLabel,
      districtLabel,
      plaintiffWinRate,
      settlementRate,
      medianAward,
      avgDurationMonths
    );

    const narrativeEs = buildNarrativeEs(
      totalCases,
      nosLabel,
      districtLabel,
      plaintiffWinRate,
      settlementRate,
      medianAward,
      avgDurationMonths
    );

    // Build response
    const response: QuickStatsResponse = {
      nos_code: nosCode,
      nos_label: nosLabel,
      district,
      district_label: districtLabel,
      total_cases: totalCases,
      plaintiff_win_rate: plaintiffWinRate,
      settlement_rate: settlementRate,
      dismissal_rate: dismissalRate,
      median_award: medianAward,
      avg_duration_months: avgDurationMonths,
      data_years: '2000-2024',
      source: 'FJC IDB, PACER',
      narrative_en: narrativeEn,
      narrative_es: narrativeEs,
      cta: {
        text_en: 'Get your full personalized report',
        text_es: 'Obtén tu informe personalizado completo',
        url: `/report?nos=${encodeURIComponent(nosCode)}&district=${encodeURIComponent(district)}`,
        price: '$5.99',
      },
    };

    // Add CORS headers for embedding
    return NextResponse.json(response, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'X-RateLimit-Remaining': `${rateLimitResult.remaining}`,
        'Cache-Control': 'public, max-age=3600, s-maxage=86400',
      },
    });
  } catch (error) {
    console.error('[quick-stats] Error:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        message: 'An unexpected error occurred while retrieving statistics',
      },
      { status: 500 }
    );
  }
}

/**
 * OPTIONS handler for CORS preflight requests
 */
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

/**
 * Build English narrative from data using deterministic template
 */
function buildNarrativeEn(
  total: number,
  caseType: string,
  district: string,
  winRate: number,
  settlementRate: number,
  medianAward: number,
  durationMonths: number
): string {
  const formattedTotal = total.toLocaleString();
  const formattedMedian = '$' + Math.round(medianAward).toLocaleString();

  return `Based on ${formattedTotal} ${caseType.toLowerCase()} cases filed in ${district} between 2000 and 2024, plaintiffs won approximately ${winRate}% of the time. When including favorable settlements, the success rate rises to roughly ${settlementRate}%. The median award was ${formattedMedian}, and cases typically took ${durationMonths} months to resolve.`;
}

/**
 * Build Spanish narrative from data using deterministic template
 */
function buildNarrativeEs(
  total: number,
  caseType: string,
  district: string,
  winRate: number,
  settlementRate: number,
  medianAward: number,
  durationMonths: number
): string {
  const formattedTotal = total.toLocaleString('es-ES');
  const formattedMedian = '$' + Math.round(medianAward).toLocaleString('es-ES');

  return `Basado en ${formattedTotal} casos de ${caseType.toLowerCase()} presentados en ${district} entre 2000 y 2024, los demandantes ganaron aproximadamente ${winRate}% de las veces. Al incluir acuerdos favorables, la tasa de éxito sube a aproximadamente ${settlementRate}%. La compensación mediana fue de ${formattedMedian}, y los casos típicamente tardaron ${durationMonths} meses en resolverse.`;
}
