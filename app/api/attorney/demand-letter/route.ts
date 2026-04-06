import { NextRequest, NextResponse } from 'next/server';
import { REAL_DATA } from '../../../../lib/realdata';
import { sanitizeForPrompt } from '../../../../lib/sanitize';

export const dynamic = 'force-dynamic';

type DemandLetterInput = {
  caseType: string;
  district: string;
  briefFacts: string;
  partyRole: string;
  economicDamages: number;
  painSuffering: number;
  lostWages: number;
};

async function generateDemandLetter(input: DemandLetterInput): Promise<string> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error('ANTHROPIC_API_KEY not configured');
  }

  const nosData = REAL_DATA[input.caseType];
  const totalDamages = input.economicDamages + input.painSuffering + input.lostWages;
  const sanitizedFacts = sanitizeForPrompt(input.briefFacts, 1000);

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 20000);

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      signal: controller.signal,
      headers: {
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1500,
        system: `You are an expert legal professional specializing in drafting settlement demand letters. Generate a professional, concise demand letter template based on the case details provided.

The letter should:
1. Include standard legal greeting and case reference
2. Clearly state the factual basis for the claim
3. Explain liability and damages with reference to relevant case law or statutes
4. Itemize damages (economic, pain and suffering, lost wages)
5. Reference historical settlement data from similar cases
6. Set a reasonable deadline for response
7. Use professional but accessible language
8. Be comprehensive but not excessive (2-3 pages worth)

Format as a professional letter template that can be customized by the attorney.`,
        messages: [
          {
            role: 'user',
            content: `Generate a settlement demand letter for the following case:

Case Type: ${input.caseType}
District: ${input.district}
Party Role: ${input.partyRole}

Facts of the Case:
${sanitizedFacts}

Damages Breakdown:
- Economic Damages: $${input.economicDamages.toLocaleString()}
- Pain and Suffering: $${input.painSuffering.toLocaleString()}
- Lost Wages: $${input.lostWages.toLocaleString()}
- TOTAL DEMAND: $${totalDamages.toLocaleString()}

Case Category Stats (Historical Data):
- Average win rate: ${nosData?.wr || 55}%
- Settlement rate: ${nosData?.sp || 42}%
- Average settlement: $${(nosData?.rng?.md || 150) * 1000}
- Sample size: ${(nosData?.total || 1000).toLocaleString()} cases

Please generate a professional demand letter template incorporating these facts and the historical settlement data to support the demand amount.`,
          },
        ],
      }),
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const error = await response.text();
      console.error('Anthropic API error:', error);
      throw new Error('Failed to call Anthropic API');
    }

    const data = await response.json();
    return data.content?.[0]?.text || '';
  } catch (err) {
    console.error('Demand letter generation error:', err);
    throw new Error('Failed to generate demand letter');
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { caseType, district, briefFacts, partyRole, economicDamages, painSuffering, lostWages } = body;

    if (!caseType || !briefFacts || !partyRole) {
      return NextResponse.json(
        { error: 'Case type, facts, and party role are required' },
        { status: 400 }
      );
    }

    if (briefFacts.length < 50) {
      return NextResponse.json(
        { error: 'Please provide more detailed facts about the case (minimum 50 characters)' },
        { status: 400 }
      );
    }

    if (briefFacts.length > 3000) {
      return NextResponse.json(
        { error: 'Facts must be 3000 characters or less' },
        { status: 400 }
      );
    }

    const letter = await generateDemandLetter({
      caseType,
      district: district || 'Not specified',
      briefFacts,
      partyRole,
      economicDamages: Math.max(0, parseInt(String(economicDamages)) || 0),
      painSuffering: Math.max(0, parseInt(String(painSuffering)) || 0),
      lostWages: Math.max(0, parseInt(String(lostWages)) || 0),
    });

    return NextResponse.json({
      success: true,
      letter,
      totalDamands: (economicDamages || 0) + (painSuffering || 0) + (lostWages || 0),
      disclaimer: 'This is an AI-generated template. It must be reviewed, customized, and approved by a licensed attorney before use. This template should not be sent to opposing counsel without legal review.',
    });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    console.error('[api/attorney/demand-letter] error:', errorMessage);

    if (err instanceof SyntaxError) {
      return NextResponse.json(
        {
          error: 'Invalid JSON',
          message: 'Request body must be valid JSON'
        },
        { status: 400 }
      );
    }

    // Check for specific error conditions
    if (errorMessage.includes('not configured')) {
      return NextResponse.json(
        {
          error: 'Service temporarily unavailable',
          message: 'The demand letter generation service is not available. Please try again later.'
        },
        { status: 503 }
      );
    }

    if (errorMessage.includes('timeout') || errorMessage.includes('aborted')) {
      return NextResponse.json(
        {
          error: 'Request timeout',
          message: 'The request took too long. Please try again with less complex facts.'
        },
        { status: 504 }
      );
    }

    return NextResponse.json(
      {
        error: 'Generation failed',
        message: 'An unexpected error occurred while generating the demand letter. Please try again.'
      },
      { status: 500 }
    );
  }
}
