import { NextRequest, NextResponse } from 'next/server';
import { REAL_DATA } from '../../../../lib/realdata';

export const dynamic = 'force-dynamic';

type FeeCalculatorInput = {
  caseType: string;
  caseValue: number;
  feeArrangement: string;
};

type FeeComparison = {
  contingency25: number;
  contingency33: number;
  contingency40: number;
  contingencyNetToClient: {
    low: number;
    mid: number;
    high: number;
  };
  hourly: {
    lowRate: number;
    highRate: number;
    estimatedHours: number;
    totalLow: number;
    totalHigh: number;
  };
  hybrid: {
    retainer: number;
    hourlyRate: number;
    estimatedTotal: number;
  };
  lodestar?: {
    totalHours: number;
    hourlyRate: number;
    baseAmount: number;
    multiplier: number;
    adjustedTotal: number;
  };
  averageFeeAward?: number;
};

function calculateFeeComparison(input: FeeCalculatorInput): FeeComparison {
  const caseValue = input.caseValue;
  const nosData = REAL_DATA[input.caseType];

  // Contingency fees
  const contingency25 = Math.round(caseValue * 0.25);
  const contingency33 = Math.round(caseValue * 0.33);
  const contingency40 = Math.round(caseValue * 0.40);

  // Net to client (using settlement ranges from REAL_DATA)
  const clientNet33 = caseValue - contingency33;
  const rangeLo = (nosData?.rng?.lo || 100) * 1000;
  const rangeMd = (nosData?.rng?.md || 300) * 1000;
  const rangeHi = (nosData?.rng?.hi || 1000) * 1000;

  // Estimate net to client across range
  const netLo = Math.round(rangeLo * 0.67);
  const netMd = Math.round(rangeMd * 0.67);
  const netHi = Math.round(rangeHi * 0.67);

  // Hourly fees - estimate based on case complexity and duration
  const lowRate = 250;
  const highRate = 550;

  // Estimate hours based on case type settlement rate (proxy for complexity)
  // Simple cases: 40-60 hours, Complex: 100-150+ hours
  const settlementRate = nosData?.sp || 50;
  let estimatedHours = 80;

  if (settlementRate > 60) {
    estimatedHours = 120; // High settlement rate = likely simpler cases
  } else if (settlementRate < 40) {
    estimatedHours = 150; // Low settlement rate = complex disputes
  }

  const hourlyTotalLow = Math.round(estimatedHours * lowRate);
  const hourlyTotalHigh = Math.round(estimatedHours * highRate);

  // Hybrid - retainer + hourly
  const retainer = Math.round(caseValue * 0.1); // 10% upfront
  const hourlyRateHybrid = 350;
  const estimatedTotalHybrid = retainer + Math.round((estimatedHours * 0.7) * hourlyRateHybrid); // 70% of estimated hours post-retainer

  // Lodestar calculation (for fee-shifting cases)
  const isFeeShiftingCase = ['440', '441', '443', '442', '445', '870'].includes(input.caseType);
  let lodestarData;

  if (isFeeShiftingCase) {
    const lodestarHours = estimatedHours;
    const lodestarRate = 400; // Reasonable hourly rate for lodestar
    const lodestarBase = lodestarHours * lodestarRate;
    const multiplier = caseValue > 500000 ? 1.5 : caseValue > 200000 ? 1.3 : 1.2; // Multiplier for difficulty
    const adjustedFee = Math.round(lodestarBase * multiplier);

    lodestarData = {
      totalHours: lodestarHours,
      hourlyRate: lodestarRate,
      baseAmount: lodestarBase,
      multiplier,
      adjustedTotal: adjustedFee,
    };
  }

  return {
    contingency25,
    contingency33,
    contingency40,
    contingencyNetToClient: {
      low: netLo,
      mid: netMd,
      high: netHi,
    },
    hourly: {
      lowRate,
      highRate,
      estimatedHours,
      totalLow: hourlyTotalLow,
      totalHigh: hourlyTotalHigh,
    },
    hybrid: {
      retainer,
      hourlyRate: hourlyRateHybrid,
      estimatedTotal: estimatedTotalHybrid,
    },
    ...(lodestarData && { lodestar: lodestarData }),
  };
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { caseType, caseValue, feeArrangement } = body;

    if (!caseType || !caseValue) {
      return NextResponse.json(
        { error: 'Case type and case value are required' },
        { status: 400 }
      );
    }

    const value = parseInt(String(caseValue));
    if (isNaN(value) || value <= 0) {
      return NextResponse.json(
        { error: 'Case value must be a positive number' },
        { status: 400 }
      );
    }

    if (value > 100000000) {
      return NextResponse.json(
        { error: 'Case value must be less than $100,000,000' },
        { status: 400 }
      );
    }

    const comparison = calculateFeeComparison({
      caseType,
      caseValue: value,
      feeArrangement: feeArrangement || 'contingency',
    });

    return NextResponse.json({
      success: true,
      ...comparison,
    });
  } catch (err) {
    console.error('API error:', err);
    return NextResponse.json(
      { error: 'Failed to calculate fees. Please try again.' },
      { status: 500 }
    );
  }
}
