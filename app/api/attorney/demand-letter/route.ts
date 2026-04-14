import { NextRequest, NextResponse } from 'next/server';
import { streamText } from 'ai';
import { anthropic } from '@ai-sdk/anthropic';
import { REAL_DATA } from '../../../../lib/realdata';
import { sanitizeForPrompt } from '../../../../lib/sanitize';
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


export const dynamic = 'force-dynamic';
export const maxDuration = 30;

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

    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json(
        { error: 'Service temporarily unavailable' },
        { status: 503 }
      );
    }

    const nosData = REAL_DATA[caseType];
    const eco = Math.max(0, parseInt(String(economicDamages)) || 0);
    const pain = Math.max(0, parseInt(String(painSuffering)) || 0);
    const wages = Math.max(0, parseInt(String(lostWages)) || 0);
    const totalDamages = eco + pain + wages;
    const sanitizedFacts = sanitizeForPrompt(briefFacts, 1000);

    const result = await streamText({
      model: anthropic('claude-sonnet-4-20250514'),
      maxOutputTokens: 2000,
      messages: [
        {
          role: 'system',
          content: `You are an expert legal professional specializing in drafting settlement demand letters. Generate a professional, concise demand letter template based on the case details provided.

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
          providerOptions: { anthropic: { cacheControl: { type: 'ephemeral' } } },
        },
        {
          role: 'user',
          content: `Generate a settlement demand letter for the following case:

Case Type: ${caseType}
District: ${district || 'Not specified'}
Party Role: ${partyRole}

Facts of the Case:
${sanitizedFacts}

Damages Breakdown:
- Economic Damages: $${eco.toLocaleString()}
- Pain and Suffering: $${pain.toLocaleString()}
- Lost Wages: $${wages.toLocaleString()}
- TOTAL DEMAND: $${totalDamages.toLocaleString()}

Case Category Stats (Historical Data):
- Average win rate: ${nosData?.wr || 55}%
- Settlement rate: ${nosData?.sp || 42}%
- Average settlement: $${(nosData?.rng?.md || 150) * 1000}
- Sample size: ${(nosData?.total || 1000).toLocaleString()} cases

Please generate a professional demand letter template incorporating these facts and the historical settlement data to support the demand amount.`,
        },
      ],
    });

    return result.toTextStreamResponse();
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    console.error('[api/attorney/demand-letter] error:', errorMessage);

    if (err instanceof SyntaxError) {
      return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
    }

    return NextResponse.json({ error: 'Generation failed' }, { status: 500 });
  }
}
