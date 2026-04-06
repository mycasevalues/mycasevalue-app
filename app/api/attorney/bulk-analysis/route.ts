import { NextRequest, NextResponse } from 'next/server';
import { REAL_DATA } from '../../../../lib/realdata';
import { validateNOSCode } from '../../../../lib/sanitize';

/**
 * Bulk Case Analysis API
 * Analyze a portfolio of case types for pattern recognition and risk clustering
 */

export async function POST(req: NextRequest) {
  try {
    const { nosCodes } = await req.json();

    if (!nosCodes || !Array.isArray(nosCodes) || nosCodes.length === 0) {
      return NextResponse.json({ error: 'Provide an array of NOS codes' }, { status: 400 });
    }

    if (nosCodes.length > 20) {
      return NextResponse.json({ error: 'Maximum 20 case types per analysis' }, { status: 400 });
    }

    // Validate each NOS code and filter out invalid ones
    const validatedNosCodes = nosCodes
      .map((nos: unknown) => validateNOSCode(nos))
      .filter((nos): nos is string => nos !== null);

    if (validatedNosCodes.length === 0) {
      return NextResponse.json(
        { error: 'No valid NOS codes provided. Each code must be 1-4 digits.' },
        { status: 400 }
      );
    }

    const cases = validatedNosCodes
      .map((nos: string) => {
        const d = REAL_DATA[nos];
        if (!d) return null;

        const outcomes = d.ends || [];
        const settlementPct = outcomes.find((o: { l: string }) => o.l === 'Settlement')?.p || 0;
        const dismissPct = outcomes.find((o: { l: string }) => o.l === 'Dismissed')?.p || 0;
        const trialPct = outcomes.find((o: { l: string }) => o.l === 'Trial')?.p || 0;

        // Risk classification
        let risk: 'low' | 'moderate' | 'high' | 'very-high';
        if (d.wr >= 65 && settlementPct >= 40) risk = 'low';
        else if (d.wr >= 50 && settlementPct >= 30) risk = 'moderate';
        else if (d.wr >= 35) risk = 'high';
        else risk = 'very-high';

        return {
          nos,
          label: d.label,
          category: d.category,
          totalCases: d.total,
          winRate: d.wr,
          settlementRate: d.sp || settlementPct,
          medianDurationMonths: d.mo,
          settlementRange: d.rng || { lo: 0, md: 0, hi: 0 },
          representedWinRate: d.rr?.wr || d.wr,
          proSeWinRate: d.ps?.wr || d.wr * 0.65,
          dismissalRate: dismissPct,
          trialRate: trialPct,
          risk,
          classActionPct: d.class_action_pct || 0,
          statuteOfLimitations: d.sol || 'Varies',
          attorneyFeeRange: d.af || 'Varies',
        };
      })
      .filter(Boolean);

    if (cases.length === 0) {
      return NextResponse.json({ error: 'No valid case types found' }, { status: 404 });
    }

    // Portfolio aggregates
    const totalCases = cases.reduce((s: number, c: any) => s + c.totalCases, 0);
    const avgWinRate = Math.round(cases.reduce((s: number, c: any) => s + c.winRate * c.totalCases, 0) / totalCases * 10) / 10;
    const avgSettlement = Math.round(cases.reduce((s: number, c: any) => s + c.settlementRate * c.totalCases, 0) / totalCases * 10) / 10;
    const avgDuration = Math.round(cases.reduce((s: number, c: any) => s + c.medianDurationMonths * c.totalCases, 0) / totalCases * 10) / 10;

    // Risk distribution
    const riskCounts = { low: 0, moderate: 0, high: 0, 'very-high': 0 };
    cases.forEach((c: any) => { riskCounts[c.risk as keyof typeof riskCounts]++; });

    // Trend insights
    const insights: string[] = [];
    const highRiskCases = cases.filter((c: any) => c.risk === 'high' || c.risk === 'very-high');
    if (highRiskCases.length > 0) {
      insights.push(`${highRiskCases.length} case type(s) classified as high risk: ${highRiskCases.map((c: any) => c.label).join(', ')}`);
    }
    const bestPerformer = cases.reduce((best: any, c: any) => c.winRate > best.winRate ? c : best, cases[0]);
    insights.push(`Strongest case type: ${bestPerformer.label} (${bestPerformer.winRate}% win rate)`);
    const fastestCase = cases.reduce((fast: any, c: any) => c.medianDurationMonths < fast.medianDurationMonths ? c : fast, cases[0]);
    insights.push(`Fastest resolution: ${fastestCase.label} (${fastestCase.medianDurationMonths} months median)`);
    if (avgWinRate > 55) insights.push('Portfolio has above-average overall win rate — favorable risk profile');
    else if (avgWinRate < 45) insights.push('Portfolio win rate is below national average — consider case selection strategy');

    return NextResponse.json({
      portfolio: {
        caseCount: cases.length,
        totalCasesInDatabase: totalCases,
        avgWinRate,
        avgSettlementRate: avgSettlement,
        avgDurationMonths: avgDuration,
        riskDistribution: riskCounts,
      },
      cases,
      insights,
      disclaimer: 'Analysis based on aggregate federal court statistics. Individual case outcomes depend on specific facts and circumstances.',
    });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    console.error('[api/attorney/bulk-analysis] error:', errorMessage);

    // Distinguish between JSON parsing errors and other errors
    if (err instanceof SyntaxError) {
      return NextResponse.json(
        {
          error: 'Invalid JSON',
          message: 'Request body must be valid JSON with a nosCodes array'
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        error: 'Analysis failed',
        message: 'An unexpected error occurred while processing your analysis. Please try again.'
      },
      { status: 500 }
    );
  }
}
