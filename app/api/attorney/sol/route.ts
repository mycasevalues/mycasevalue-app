export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface SOLRequestBody {
  state: string;
  caseType: string;
  incidentDate: string; // ISO 8601 date string (YYYY-MM-DD)
}

interface SOLWarning {
  level: 'info' | 'warning' | 'critical';
  message: string;
}

interface SOLResponse {
  state: string;
  stateName: string;
  caseType: string;
  caseTypeLabel: string;
  incidentDate: string;
  deadline: string;
  daysRemaining: number;
  statuteYears: number;
  isExpired: boolean;
  warnings: SOLWarning[];
  tollingNotes: string[];
  discoveryRuleApplies: boolean;
  keyDeadlines: string;
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
    'X-RateLimit-Limit': '120',
    'X-RateLimit-Remaining': '119',
    'X-RateLimit-Reset': String(Math.floor(Date.now() / 1000) + 3600),
    ...headers,
  };
}

// ---------------------------------------------------------------------------
// State & case-type data
// ---------------------------------------------------------------------------

const STATE_NAMES: Record<string, string> = {
  AL: 'Alabama', AK: 'Alaska', AZ: 'Arizona', AR: 'Arkansas', CA: 'California',
  CO: 'Colorado', CT: 'Connecticut', DE: 'Delaware', FL: 'Florida', GA: 'Georgia',
  HI: 'Hawaii', ID: 'Idaho', IL: 'Illinois', IN: 'Indiana', IA: 'Iowa',
  KS: 'Kansas', KY: 'Kentucky', LA: 'Louisiana', ME: 'Maine', MD: 'Maryland',
  MA: 'Massachusetts', MI: 'Michigan', MN: 'Minnesota', MS: 'Mississippi', MO: 'Missouri',
  MT: 'Montana', NE: 'Nebraska', NV: 'Nevada', NH: 'New Hampshire', NJ: 'New Jersey',
  NM: 'New Mexico', NY: 'New York', NC: 'North Carolina', ND: 'North Dakota', OH: 'Ohio',
  OK: 'Oklahoma', OR: 'Oregon', PA: 'Pennsylvania', RI: 'Rhode Island', SC: 'South Carolina',
  SD: 'South Dakota', TN: 'Tennessee', TX: 'Texas', UT: 'Utah', VT: 'Vermont',
  VA: 'Virginia', WA: 'Washington', WV: 'West Virginia', WI: 'Wisconsin', WY: 'Wyoming',
  DC: 'District of Columbia',
};

// TODO: Replace with comprehensive state-specific SOL database
// - Build Supabase table: sol_rules(state, case_type, years, tolling_rules, discovery_rule, notes)
// - Source data from state statutes and legal encyclopedias
// - Add support for federal SOL where applicable
// - Handle dual-filing states (e.g. EEOC 180/300 day rule)
// - Track legislative changes that modify SOL periods

interface SOLRule {
  years: number;
  label: string;
  discoveryRule: boolean;
  tollingNotes: string[];
  keyDeadlines: string;
}

const SOL_DATABASE: Record<string, Record<string, SOLRule>> = {
  'personal-injury': {
    _default: { years: 2, label: 'Personal Injury', discoveryRule: true, tollingNotes: ['Minors: tolled until age of majority', 'Mental incapacity may toll the statute'], keyDeadlines: 'File complaint within statute period from date of injury or discovery' },
    CA: { years: 2, label: 'Personal Injury', discoveryRule: true, tollingNotes: ['Tolled for minors until age 18', 'Discovery rule applies: clock starts when injury is discovered or should have been discovered', 'Government claims: 6-month notice requirement'], keyDeadlines: 'Government claims: file notice within 6 months. Lawsuit: 2 years from injury/discovery' },
    NY: { years: 3, label: 'Personal Injury', discoveryRule: false, tollingNotes: ['Tolled for infancy (under 18) and insanity', 'No general discovery rule for PI in NY', 'Notice of Claim for government: 90 days'], keyDeadlines: '90-day Notice of Claim for government defendants. 3 years from date of injury' },
    TX: { years: 2, label: 'Personal Injury', discoveryRule: true, tollingNotes: ['Tolled for minors and persons of unsound mind', 'Discovery rule recognized in limited circumstances'], keyDeadlines: '2 years from injury or discovery' },
    FL: { years: 4, label: 'Personal Injury', discoveryRule: true, tollingNotes: ['Tolled during defendant absence from state', 'Discovery rule applies'], keyDeadlines: '4 years from injury or discovery (note: reduced from prior 4-year period by 2024 tort reform)' },
    IL: { years: 2, label: 'Personal Injury', discoveryRule: true, tollingNotes: ['Tolled for minors and persons under legal disability', 'Discovery rule applies'], keyDeadlines: '2 years from injury or discovery' },
  },
  'medical-malpractice': {
    _default: { years: 2, label: 'Medical Malpractice', discoveryRule: true, tollingNotes: ['Discovery rule commonly applies', 'Statute of repose may cap total time (typically 5-10 years)'], keyDeadlines: 'Typically 2-3 years from discovery; check statute of repose' },
    CA: { years: 3, label: 'Medical Malpractice (MICRA)', discoveryRule: true, tollingNotes: ['3 years from injury OR 1 year from discovery, whichever is first', 'Foreign body exception: 1 year from discovery', 'Fraudulent concealment tolls the statute'], keyDeadlines: '1 year from discovery or 3 years from injury (whichever first)' },
    NY: { years: 2.5, label: 'Medical Malpractice', discoveryRule: true, tollingNotes: ['2.5 years from act or last treatment (continuous treatment doctrine)', 'Discovery rule for foreign objects only', 'Certificate of merit required'], keyDeadlines: '2 years 6 months from malpractice or last treatment. Foreign objects: 1 year from discovery' },
    TX: { years: 2, label: 'Medical Malpractice', discoveryRule: true, tollingNotes: ['10-year statute of repose', 'Expert report required within 120 days of filing'], keyDeadlines: '2 years from act; 10-year absolute repose; expert report due 120 days after filing' },
    FL: { years: 2, label: 'Medical Malpractice', discoveryRule: true, tollingNotes: ['2 years from discovery or when should have been discovered', '4-year statute of repose (7 years for fraud/concealment)', 'Pre-suit notice required 90 days before filing'], keyDeadlines: '90-day pre-suit notice. 2 years from discovery. 4-year repose' },
  },
  'employment-discrimination': {
    _default: { years: 1, label: 'Employment Discrimination (EEOC)', discoveryRule: false, tollingNotes: ['EEOC charge: 180 days (300 in dual-filing states)', 'Federal suit: 90 days after Right-to-Sue letter', 'State agencies may have separate deadlines'], keyDeadlines: 'EEOC charge: 180/300 days. Federal suit: 90 days after Right-to-Sue' },
    CA: { years: 1, label: 'Employment Discrimination (DFEH/CRD)', discoveryRule: false, tollingNotes: ['CRD complaint: 3 years from discriminatory act', 'Federal EEOC charge: 300 days (dual-filing state)', 'Right-to-Sue: 1 year to file in state court'], keyDeadlines: 'CRD: 3 years. EEOC: 300 days. Lawsuit: 1 year after Right-to-Sue' },
    NY: { years: 1, label: 'Employment Discrimination', discoveryRule: false, tollingNotes: ['NYSDHR complaint: 1 year (3 years for sexual harassment)', 'EEOC: 300 days (dual-filing state)', 'NYC Human Rights Law: 3 years'], keyDeadlines: 'EEOC: 300 days. NYSDHR: 1 year. NYC HRL: 3 years' },
  },
  'breach-of-contract': {
    _default: { years: 4, label: 'Breach of Contract', discoveryRule: false, tollingNotes: ['Runs from date of breach', 'UCC: 4 years for sale of goods'], keyDeadlines: '4-6 years from breach depending on state' },
    CA: { years: 4, label: 'Breach of Contract (Written: 4yr, Oral: 2yr)', discoveryRule: false, tollingNotes: ['Written contracts: 4 years', 'Oral contracts: 2 years', 'Acknowledgment of debt restarts the clock'], keyDeadlines: 'Written: 4 years. Oral: 2 years from breach' },
    NY: { years: 6, label: 'Breach of Contract', discoveryRule: false, tollingNotes: ['6 years for all contract actions', 'UCC sale of goods: 4 years', 'Acknowledgment or part payment may restart'], keyDeadlines: '6 years from breach. UCC goods: 4 years' },
  },
  'product-liability': {
    _default: { years: 2, label: 'Product Liability', discoveryRule: true, tollingNotes: ['Discovery rule typically applies', 'Statute of repose may apply (varies by state)'], keyDeadlines: '2-3 years from injury or discovery; check repose period' },
    CA: { years: 2, label: 'Product Liability', discoveryRule: true, tollingNotes: ['Discovery rule applies', 'No statute of repose in CA for product liability'], keyDeadlines: '2 years from injury or discovery' },
    NY: { years: 3, label: 'Product Liability', discoveryRule: true, tollingNotes: ['3 years from injury', 'Discovery rule for latent defects', 'No statute of repose'], keyDeadlines: '3 years from injury. Discovery rule for latent injuries' },
  },
};

// ---------------------------------------------------------------------------
// POST /api/attorney/sol
// ---------------------------------------------------------------------------

/**
 * POST /api/attorney/sol
 *
 * Statute of Limitations calculator endpoint.
 *
 * Body (JSON):
 *   state        — 2-letter US state code (required)
 *   caseType     — case type key (required, e.g. "personal-injury")
 *   incidentDate — ISO date string YYYY-MM-DD (required)
 *
 * Returns deadline, days remaining, warnings, and tolling notes.
 */
export async function POST(
  request: NextRequest,
): Promise<NextResponse<SOLResponse | ErrorResponse>> {
  try {
    const body: SOLRequestBody = await request.json();
    const { state, caseType, incidentDate } = body;

    // --- Validation ---
    if (!state || typeof state !== 'string') {
      return NextResponse.json(
        { error: 'State is required', message: 'Provide a 2-letter US state code' },
        { status: 400, headers: withRateLimitHeaders() },
      );
    }

    const stateUpper = state.trim().toUpperCase();
    if (!STATE_NAMES[stateUpper]) {
      return NextResponse.json(
        { error: 'Invalid state', message: `"${state}" is not a valid US state code` },
        { status: 400, headers: withRateLimitHeaders() },
      );
    }

    if (!caseType || typeof caseType !== 'string') {
      return NextResponse.json(
        { error: 'Case type is required', message: 'Provide a case type key (e.g. "personal-injury")' },
        { status: 400, headers: withRateLimitHeaders() },
      );
    }

    if (!incidentDate || typeof incidentDate !== 'string') {
      return NextResponse.json(
        { error: 'Incident date is required', message: 'Provide an ISO date string (YYYY-MM-DD)' },
        { status: 400, headers: withRateLimitHeaders() },
      );
    }

    const parsedDate = new Date(incidentDate);
    if (isNaN(parsedDate.getTime())) {
      return NextResponse.json(
        { error: 'Invalid date', message: 'incidentDate must be a valid ISO date (YYYY-MM-DD)' },
        { status: 400, headers: withRateLimitHeaders() },
      );
    }

    if (new Date(incidentDate) > new Date()) {
      return NextResponse.json({ error: 'Incident date cannot be in the future' }, { status: 400 });
    }

    // Look up SOL rule
    const caseTypeRules = SOL_DATABASE[caseType];
    if (!caseTypeRules) {
      return NextResponse.json(
        {
          error: 'Unknown case type',
          message: `Case type "${caseType}" is not recognized. Available: ${Object.keys(SOL_DATABASE).join(', ')}`,
        },
        { status: 400, headers: withRateLimitHeaders() },
      );
    }

    const rule = caseTypeRules[stateUpper] ?? caseTypeRules['_default'];
    if (!rule) {
      return NextResponse.json(
        { error: 'No SOL data', message: `No statute of limitations data for ${stateUpper} / ${caseType}` },
        { status: 404, headers: withRateLimitHeaders() },
      );
    }

    // TODO: Query Supabase sol_rules table for state-specific data
    // TODO: Handle fractional years (e.g. 2.5 years for NY med-mal)
    // TODO: Add support for federal SOL periods
    // TODO: Integrate with state legislative tracking for SOL changes
    // TODO: Add tolling calculator for specific tolling events (minority, disability, absence)

    // Calculate deadline
    const deadlineDate = new Date(parsedDate);
    const fullYears = Math.floor(rule.years);
    const fractionalMonths = Math.round((rule.years - fullYears) * 12);
    deadlineDate.setFullYear(deadlineDate.getFullYear() + fullYears);
    if (fractionalMonths > 0) {
      deadlineDate.setMonth(deadlineDate.getMonth() + fractionalMonths);
    }

    const now = new Date();
    const daysRemaining = Math.ceil((deadlineDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    const isExpired = daysRemaining < 0;

    // Build warnings
    const warnings: SOLWarning[] = [];

    if (isExpired) {
      warnings.push({
        level: 'critical',
        message: `The statute of limitations has EXPIRED. Deadline was ${deadlineDate.toISOString().split('T')[0]}. Filing may be time-barred unless tolling applies.`,
      });
    } else if (daysRemaining <= 30) {
      warnings.push({
        level: 'critical',
        message: `URGENT: Only ${daysRemaining} day(s) remaining. Immediate action required.`,
      });
    } else if (daysRemaining <= 90) {
      warnings.push({
        level: 'warning',
        message: `Approaching deadline: ${daysRemaining} days remaining. Begin preparing filings now.`,
      });
    } else if (daysRemaining <= 180) {
      warnings.push({
        level: 'info',
        message: `${daysRemaining} days remaining. Consider beginning case evaluation and evidence preservation.`,
      });
    }

    if (rule.discoveryRule) {
      warnings.push({
        level: 'info',
        message: 'Discovery rule may apply: the statute may run from the date of discovery rather than the date of injury. Consult jurisdiction-specific rules.',
      });
    }

    const response: SOLResponse = {
      state: stateUpper,
      stateName: STATE_NAMES[stateUpper],
      caseType,
      caseTypeLabel: rule.label,
      incidentDate: parsedDate.toISOString().split('T')[0],
      deadline: deadlineDate.toISOString().split('T')[0],
      daysRemaining,
      statuteYears: rule.years,
      isExpired,
      warnings,
      tollingNotes: rule.tollingNotes,
      discoveryRuleApplies: rule.discoveryRule,
      keyDeadlines: rule.keyDeadlines,
      disclaimer:
        'This calculator provides general estimates based on common statute of limitations periods. Actual deadlines may vary based on tolling events, discovery rules, government notice requirements, and other jurisdiction-specific factors. This is not legal advice. Consult an attorney for case-specific guidance.',
    };

    return NextResponse.json(response, {
      headers: withRateLimitHeaders({
        'Cache-Control': 'no-store',
      }),
    });
  } catch (err: unknown) {
    console.error('[api/attorney/sol] error:', err);

    if (err instanceof SyntaxError) {
      return NextResponse.json(
        { error: 'Invalid JSON', message: 'Request body must be valid JSON' },
        { status: 400, headers: withRateLimitHeaders() },
      );
    }

    return NextResponse.json(
      { error: 'SOL calculation failed', message: 'An unexpected error occurred' },
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
