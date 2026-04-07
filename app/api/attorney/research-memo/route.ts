import { NextRequest, NextResponse } from 'next/server';
import { streamText } from 'ai';
import { anthropic } from '@ai-sdk/anthropic';
import { REAL_DATA } from '../../../../lib/realdata';
import { sanitizeForPrompt } from '../../../../lib/sanitize';

export const dynamic = 'force-dynamic';
export const maxDuration = 30;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { legalQuestion, jurisdiction, caseType } = body;

    if (!legalQuestion) {
      return NextResponse.json({ error: 'Legal question is required' }, { status: 400 });
    }

    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json({ error: 'Service temporarily unavailable' }, { status: 503 });
    }

    const sanitized = sanitizeForPrompt(legalQuestion, 2000);
    const nosData = caseType ? REAL_DATA[caseType] : null;

    const statsContext = nosData
      ? `Platform Statistics for NOS ${caseType}:
- Win rate: ${nosData.wr}%
- Settlement rate: ${nosData.sp}%
- Median settlement: $${(nosData.rng?.md || 0) * 1000}
- Average duration: ${nosData.mo} months
- Total cases in database: ${nosData.total?.toLocaleString()}`
      : '';

    const result = await streamText({
      model: anthropic('claude-sonnet-4-20250514'),
      maxOutputTokens: 3000,
      system: `You are an experienced legal research attorney drafting a formal legal research memorandum. Follow the standard IRAC format strictly.

Structure the memo with these exact sections:
I. ISSUE PRESENTED
II. BRIEF ANSWER
III. APPLICABLE LAW
IV. DISCUSSION
V. CONCLUSION

In the APPLICABLE LAW and DISCUSSION sections, reference relevant federal standards, statutes, and leading cases for the case type. Where platform statistics are provided, integrate them naturally to support the analysis (e.g., "Historical data shows a ${nosData?.wr || 55}% win rate for this case type...").

Write in formal legal memo style with proper citations. Use standard legal citation format.`,
      messages: [
        {
          role: 'user',
          content: `Draft a legal research memorandum:

Legal Question/Issue:
${sanitized}

Jurisdiction: ${jurisdiction || 'Federal (general)'}
Case Type: ${caseType || 'General'}

${statsContext}

Generate a comprehensive research memo addressing this issue.`,
        },
      ],
    });

    return result.toTextStreamResponse();
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unknown error';
    console.error('[api/attorney/research-memo] error:', msg);
    if (err instanceof SyntaxError) return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
    return NextResponse.json({ error: 'Generation failed' }, { status: 500 });
  }
}
