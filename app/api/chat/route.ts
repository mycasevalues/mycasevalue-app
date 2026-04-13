import { streamText } from 'ai';
import { createAnthropic } from '@ai-sdk/anthropic';
import { NextResponse } from 'next/server';

const anthropic = createAnthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
});

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Messages array is required' },
        { status: 400 }
      );
    }

    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json(
        { error: 'AI service is not configured' },
        { status: 503 }
      );
    }

    const result = streamText({
      model: anthropic('claude-sonnet-4-20250514'),
      system: `You are a legal research assistant for MyCaseValue, a federal court analytics platform. You help attorneys and legal professionals with:
- Understanding federal court data and settlement values
- Explaining legal concepts related to personal injury, medical malpractice, and civil litigation
- Providing guidance on how to use MyCaseValue tools
- Answering questions about court procedures, case types, and legal terminology

Important: You provide informational assistance only. You do not provide legal advice. Always recommend consulting with a qualified attorney for specific legal matters.

Be concise, professional, and helpful. Use plain language when possible.`,
      messages,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error('[api/chat] Error:', error);
    return NextResponse.json(
      { error: 'Failed to process chat request' },
      { status: 500 }
    );
  }
}
