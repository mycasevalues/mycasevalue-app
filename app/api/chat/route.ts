import { NextRequest, NextResponse } from 'next/server';
import { streamText } from 'ai';
import { createAnthropic } from '@ai-sdk/anthropic';

export const dynamic = 'force-dynamic';

const SYSTEM_PROMPT = `You are a professional legal research assistant for MyCaseValue, a federal court data platform.

Your role is to help users understand federal court data, case outcomes, and legal statistics from our database of 5.1M+ federal cases across 95 districts and 84 case types.

Guidelines:
- Provide accurate, data-focused insights about federal court trends and case outcomes
- Be professional and concise
- Clarify that you provide data insights and statistical analysis, NOT legal advice
- Encourage users to consult qualified attorneys for legal advice
- Reference MyCaseValue's database scope when relevant
- Help users interpret patterns, trends, and statistics in federal litigation
- Keep responses under 300 words unless more detail is specifically requested`;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { messages } = body;

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Invalid messages' },
        { status: 400 }
      );
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      console.error('[api/chat] Missing ANTHROPIC_API_KEY');
      return NextResponse.json(
        { error: 'Service unavailable' },
        { status: 500 }
      );
    }

    const anthropic = createAnthropic({ apiKey });

    const result = streamText({
      model: anthropic('claude-sonnet-4-20250514'),
      system: SYSTEM_PROMPT,
      messages,
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error('[api/chat] Error:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}
