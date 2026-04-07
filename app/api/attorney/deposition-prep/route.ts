import { NextRequest, NextResponse } from 'next/server';
import { streamText } from 'ai';
import { anthropic } from '@ai-sdk/anthropic';
import { sanitizeForPrompt } from '../../../../lib/sanitize';

export const dynamic = 'force-dynamic';
export const maxDuration = 30;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { caseType, deponentRole, deponentPosition } = body;

    if (!caseType || !deponentRole) {
      return NextResponse.json({ error: 'Case type and deponent role are required' }, { status: 400 });
    }

    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json({ error: 'Service temporarily unavailable' }, { status: 503 });
    }

    const sanitizedPosition = sanitizeForPrompt(deponentPosition || '', 500);

    const result = await streamText({
      model: anthropic('claude-sonnet-4-20250514'),
      maxOutputTokens: 2500,
      messages: [
        {
          role: 'system',
          content: `You are an experienced litigation attorney specializing in deposition preparation. Generate a comprehensive, structured deposition outline with numbered questions.

The outline MUST be organized into these sections:
1. BACKGROUND QUESTIONS — Establish identity, qualifications, and relationship to case
2. SUBSTANTIVE CASE-SPECIFIC QUESTIONS — Core factual inquiries based on the case type
3. DOCUMENT AUTHENTICATION QUESTIONS — Questions to authenticate key documents
4. IMPEACHMENT PREPARATION NOTES — Areas of potential inconsistency to probe
5. CLOSING QUESTIONS — Final questions and reservations

Use clear numbering (1.1, 1.2, etc.) within each section. Include strategic notes in [brackets] where helpful.
Questions should be open-ended where appropriate but also include some yes/no questions for pinning down key facts.
Tailor all questions specifically to the case type and deponent role provided.`,
          providerOptions: { anthropic: { cacheControl: { type: 'ephemeral' } } },
        },
        {
          role: 'user',
          content: `Generate a deposition outline for:

Case Type: ${caseType}
Deponent Role: ${deponentRole}
${sanitizedPosition ? `Deponent's Position: ${sanitizedPosition}` : ''}

Create a thorough, organized deposition outline with questions in each of the five required sections.`,
        },
      ],
    });

    return result.toTextStreamResponse();
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unknown error';
    console.error('[api/attorney/deposition-prep] error:', msg);
    if (err instanceof SyntaxError) {
      return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Generation failed' }, { status: 500 });
  }
}
