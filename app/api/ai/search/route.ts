import { NextRequest, NextResponse } from 'next/server';
import { sanitizeForPrompt } from '../../../../lib/sanitize';

export const dynamic = 'force-dynamic';

type AISearchResponse = {
  caseType?: string;
  nosCode?: string;
  district?: string;
  timeRange?: string;
  settlementMinimum?: number;
  interpretation: string;
  rawQuery: string;
};

async function extractParametersWithAI(query: string): Promise<AISearchResponse> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    // Return fallback response instead of throwing - allows graceful degradation
    console.warn('[api/ai/search] ANTHROPIC_API_KEY not configured, using fallback');
    return {
      caseType: query,
      interpretation: 'Natural language search for: ' + query,
      rawQuery: query,
    };
  }

  const sanitizedQuery = sanitizeForPrompt(query, 500);

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 15000);

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
        max_tokens: 500,
        system: `You are an expert legal case analyzer. Your job is to extract search parameters from natural language case descriptions.

Extract and return ONLY a JSON object with these exact fields (omit fields that cannot be determined):
- caseType: The type of case in plain English (e.g., "wrongful termination", "medical malpractice", "car accident")
- nosCode: The 1-4 digit Nature of Suit code if you can determine it (common codes: 442=employment, 350=personal injury, 190=contract, 365=product liability, 440=civil rights)
- district: US federal court district if mentioned (e.g., "Southern District of New York", "N.D. California")
- timeRange: Time range if mentioned (e.g., "last 5 years", "since 2020")
- settlementMinimum: Dollar amount threshold if mentioned (as integer, e.g., 100000)
- interpretation: Brief 1-2 sentence plain English summary of what the user is looking for

Return ONLY valid JSON, no markdown formatting, no backticks.`,
        messages: [
          {
            role: 'user',
            content: `Extract search parameters from this query: "${sanitizedQuery}"`,
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
    const content = data.content?.[0]?.text || '';

    try {
      const parsed = JSON.parse(content);
      return {
        ...parsed,
        rawQuery: sanitizedQuery,
      };
    } catch {
      // Fallback if JSON parsing fails
      return {
        caseType: sanitizedQuery,
        interpretation: 'Natural language search for: ' + sanitizedQuery,
        rawQuery: sanitizedQuery,
      };
    }
  } catch (err) {
    console.error('AI search error:', err);
    throw new Error('Failed to process search query with AI');
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { query } = body;

    if (!query || typeof query !== 'string' || query.trim().length === 0) {
      return NextResponse.json(
        { error: 'Query is required and must be a non-empty string' },
        { status: 400 }
      );
    }

    if (query.length > 500) {
      return NextResponse.json(
        { error: 'Query must be 500 characters or less' },
        { status: 400 }
      );
    }

    const result = await extractParametersWithAI(query);

    return NextResponse.json({
      success: true,
      parameters: {
        caseType: result.caseType,
        nosCode: result.nosCode,
        district: result.district,
        timeRange: result.timeRange,
        settlementMinimum: result.settlementMinimum,
      },
      interpretation: result.interpretation,
      disclosure: 'AI-generated interpretation - please verify parameters match your search intent',
    });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    console.error('[api/ai/search] error:', errorMessage);

    if (err instanceof SyntaxError) {
      return NextResponse.json(
        {
          error: 'Invalid JSON',
          message: 'Request body must be valid JSON with a query field'
        },
        { status: 400 }
      );
    }

    // Check for specific error messages and return appropriate status
    if (errorMessage.includes('timeout') || errorMessage.includes('aborted')) {
      return NextResponse.json(
        {
          error: 'Request timeout',
          message: 'AI processing took too long. Please try again with a shorter query.'
        },
        { status: 504 }
      );
    }

    return NextResponse.json(
      {
        error: 'Search processing failed',
        message: 'An unexpected error occurred while processing your search. Please try again.'
      },
      { status: 500 }
    );
  }
}
