import { streamText } from 'ai';
import { anthropic } from '@ai-sdk/anthropic';
import { NextRequest } from 'next/server';
import { rateLimit, getClientIp } from '../../../../lib/rate-limit';

export const dynamic = 'force-dynamic';
export const maxDuration = 30;

export async function POST(req: NextRequest) {
  // Rate limit
  const ip = getClientIp(req);
  const { success } = rateLimit(ip, { windowMs: 60000, maxRequests: 5 });
  if (!success) {
    return new Response(JSON.stringify({ error: 'Rate limit exceeded. Please wait before trying again.' }), {
      status: 429,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const { prompt, context, type } = await req.json();

    if (!prompt || typeof prompt !== 'string' || prompt.length > 2000) {
      return new Response(JSON.stringify({ error: 'Invalid prompt' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return new Response(JSON.stringify({ error: 'AI service not configured' }), {
        status: 503,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const systemPrompts: Record<string, string> = {
      'case-analysis': `You are a federal court data analyst for MyCaseValue.com. Analyze the provided case data and give insights about settlement values, win rates, and case duration. Be specific with numbers and cite statistical patterns. Always note that this is statistical analysis, not legal advice.`,
      'search': `You are a legal search assistant for MyCaseValue.com. Help users find relevant federal case data by interpreting their natural language queries into specific case types, NOS codes, districts, and date ranges. Be concise and helpful.`,
      'settlement': `You are a settlement valuation expert for MyCaseValue.com. Based on federal court statistical data, provide settlement range estimates and analysis. Always include confidence levels and note that actual outcomes vary. This is statistical analysis, not legal advice.`,
      'general': `You are a helpful assistant for MyCaseValue.com, a federal court data analytics platform. Help users understand federal court statistics, case types, settlement values, and litigation trends. Be accurate, concise, and note that this is statistical analysis, not legal advice.`,
    };

    const systemPrompt = systemPrompts[type] || systemPrompts['general'];

    const result = streamText({
      model: anthropic('claude-sonnet-4-20250514'),
      system: systemPrompt,
      prompt: context ? `Context: ${context}\n\nUser question: ${prompt}` : prompt,
      maxOutputTokens: 1000,
      temperature: 0.3,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error('[ai/stream] Error:', error);
    return new Response(JSON.stringify({ error: 'AI analysis failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
