import { NextRequest, NextResponse } from 'next/server';
import { generateText } from 'ai';
import { anthropic } from '@ai-sdk/anthropic';
import { z } from 'zod';
import { rateLimit, getClientIp } from '../../../../lib/rate-limit';
import { REAL_DATA } from '../../../../lib/realdata';
import { sanitizeForPrompt } from '../../../../lib/sanitize';

export const dynamic = 'force-dynamic';
export const maxDuration = 30;

/**
 * Request validation schema
 */
const requestSchema = z.object({
  query: z.string().min(1).max(1000),
});

/**
 * Response type for extracted parameters
 */
type ExtractedParams = {
  nosCode: number | null;
  district: string | null;
  minSettlement: number | null;
  maxSettlement: number | null;
  yearFrom: number | null;
  yearTo: number | null;
  keywords: string[];
};

/**
 * Build NOS code reference from REAL_DATA
 * Maps each NOS code to its label for Claude to understand
 */
function buildNOSReference(): string {
  const nosEntries: Array<[string, string]> = [];

  Object.entries(REAL_DATA).forEach(([code, data]) => {
    if (data && data.label) {
      nosEntries.push([code, data.label]);
    }
  });

  // Sort by code for consistent ordering
  nosEntries.sort((a, b) => a[0].localeCompare(b[0]));

  const lines = nosEntries.map(([code, label]) => `- ${code}: ${label}`);
  return lines.join('\n');
}

/**
 * Extract search parameters from natural language query using Claude
 */
async function extractParametersWithAI(query: string): Promise<ExtractedParams> {
  if (!process.env.ANTHROPIC_API_KEY) {
    console.warn('[api/search/natural] ANTHROPIC_API_KEY not configured, using fallback');
    return {
      nosCode: null,
      district: null,
      minSettlement: null,
      maxSettlement: null,
      yearFrom: null,
      yearTo: null,
      keywords: [query],
    };
  }

  const sanitizedQuery = sanitizeForPrompt(query, 1000);
  const nosReference = buildNOSReference();

  try {
    const result = await generateText({
      model: anthropic('claude-sonnet-4-20250514'),
      maxOutputTokens: 500,
      system: `You are an expert legal case analyzer. Your job is to extract search parameters from natural language case descriptions.

Available Nature of Suit (NOS) Codes:
${nosReference}

Extract and return ONLY a valid JSON object with these exact fields:
{
  "nosCode": <number or null>,
  "district": <string or null>,
  "minSettlement": <number or null>,
  "maxSettlement": <number or null>,
  "yearFrom": <number or null>,
  "yearTo": <number or null>,
  "keywords": <array of strings>
}

Rules:
- nosCode: The Nature of Suit code (100-999) if determinable from the description. Use the reference list above.
- district: US federal court district if mentioned (e.g., "Southern District of New York", "S.D.N.Y.", "SDNY"), or null if not mentioned.
- minSettlement: Minimum settlement amount in dollars as an integer (e.g., 100000 for $100K). Extract from phrases like "settled over $100K", null if not mentioned.
- maxSettlement: Maximum settlement amount in dollars as an integer, null if not mentioned.
- yearFrom: Start year if a time range is mentioned (e.g., 2019 from "last 5 years" or "since 2019"), null if not mentioned.
- yearTo: End year if a time range is mentioned, null if not mentioned.
- keywords: Array of key search terms extracted from the query (e.g., ["wrongful termination", "employment"], always return at least one keyword from the query).

Return ONLY valid JSON, no markdown, no backticks, no explanations.`,
      messages: [
        {
          role: 'user',
          content: `Extract search parameters from this query: "${sanitizedQuery}"`,
        },
      ],
    });

    const content = result.text || '{}';

    try {
      const parsed = JSON.parse(content);
      return {
        nosCode: parsed.nosCode ?? null,
        district: parsed.district ?? null,
        minSettlement: parsed.minSettlement ?? null,
        maxSettlement: parsed.maxSettlement ?? null,
        yearFrom: parsed.yearFrom ?? null,
        yearTo: parsed.yearTo ?? null,
        keywords: Array.isArray(parsed.keywords) ? parsed.keywords : [sanitizedQuery],
      };
    } catch (parseError) {
      console.error('[api/search/natural] JSON parse error:', parseError);
      // Fallback if JSON parsing fails
      return {
        nosCode: null,
        district: null,
        minSettlement: null,
        maxSettlement: null,
        yearFrom: null,
        yearTo: null,
        keywords: [sanitizedQuery],
      };
    }
  } catch (err) {
    console.error('[api/search/natural] AI extraction error:', err);
    throw err;
  }
}

/**
 * POST /api/search/natural
 * Accepts a natural language query and returns extracted search parameters
 */
export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    // Rate limiting: 10 requests per minute per IP (AI tier)
    const clientIp = getClientIp(req.headers);
    const rateLimitResult = rateLimit(clientIp, {
      windowMs: 60000,
      maxRequests: 10,
    });

    if (!rateLimitResult.success) {
      return NextResponse.json(
        {
          error: 'Rate limit exceeded',
          message: 'Maximum 10 natural language searches per minute. Please try again later.',
        },
        { status: 429 }
      );
    }

    // Parse and validate request
    const body = await req.json();
    const validation = requestSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          error: 'Invalid request',
          message: 'Request must contain a "query" field (string, 1-1000 characters)',
        },
        { status: 400 }
      );
    }

    const { query } = validation.data;

    // Extract parameters using AI
    const params = await extractParametersWithAI(query);

    return NextResponse.json({
      success: true,
      parameters: params,
      disclosure:
        'AI-generated parameter extraction. Please review to ensure the extracted values match your search intent.',
    });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    console.error('[api/search/natural] error:', errorMessage);

    if (err instanceof SyntaxError) {
      return NextResponse.json(
        {
          error: 'Invalid JSON',
          message: 'Request body must be valid JSON with a "query" field',
        },
        { status: 400 }
      );
    }

    if (errorMessage.includes('timeout') || errorMessage.includes('aborted')) {
      return NextResponse.json(
        {
          error: 'Request timeout',
          message: 'AI processing took too long. Please try again with a simpler query.',
        },
        { status: 504 }
      );
    }

    return NextResponse.json(
      {
        error: 'Search processing failed',
        message: 'An unexpected error occurred while processing your search. Please try again.',
      },
      { status: 500 }
    );
  }
}
