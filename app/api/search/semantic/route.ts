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
  description: z.string().min(1).max(500),
});

/**
 * Semantic search result
 */
interface SemanticMatch {
  nosCode: number;
  similarity: number; // 0-1
  reasoning: string;
}

/**
 * Build NOS reference with titles and descriptions for semantic matching
 */
function buildSemanticNOSReference(): string {
  const nosEntries: Array<{ code: string; label: string; sub?: string }> = [];

  Object.entries(REAL_DATA).forEach(([code, data]) => {
    if (data && data.label) {
      nosEntries.push({
        code,
        label: data.label,
        sub: data.sub,
      });
    }
  });

  // Sort by code for consistent ordering
  nosEntries.sort((a, b) => a.code.localeCompare(b.code));

  const lines = nosEntries.map(({ code, label, sub }) =>
    sub ? `- ${code}: ${label} (${sub})` : `- ${code}: ${label}`
  );
  return lines.join('\n');
}

/**
 * Find semantically similar NOS codes using Claude
 */
async function findSemanticMatches(description: string): Promise<SemanticMatch[]> {
  if (!process.env.ANTHROPIC_API_KEY) {
    console.warn('[api/search/semantic] ANTHROPIC_API_KEY not configured, using fallback');
    return [];
  }

  const sanitizedDescription = sanitizeForPrompt(description, 500);
  const nosReference = buildSemanticNOSReference();

  try {
    const result = await generateText({
      model: anthropic('claude-sonnet-4-20250514'),
      maxOutputTokens: 800,
      system: `You are an expert legal case classifier specializing in federal court litigation. Your task is to analyze case descriptions and find the most semantically similar Nature of Suit (NOS) codes.

Available Nature of Suit (NOS) Codes:
${nosReference}

Analyze the user's case description and identify the top 5 most relevant NOS codes based on:
1. Case type (e.g., employment, contract, tort, intellectual property)
2. Legal issue (e.g., discrimination, breach, negligence, patent infringement)
3. Nature of dispute and claims made
4. Plaintiff/defendant relationship

Return ONLY a valid JSON array with these exact fields for each match:
[
  {
    "nosCode": <number>,
    "similarity": <number between 0 and 1>,
    "reasoning": <brief explanation of why this matches>
  }
]

Rules:
- nosCode: The Nature of Suit code (100-999) from the reference list
- similarity: A score from 0 to 1 indicating how well the case matches this NOS code (1.0 = perfect match, 0.8+ = strong match, 0.6-0.79 = moderate match)
- reasoning: A 1-2 sentence explanation of why this case matches (focus on the legal issue and case type)
- Return exactly 5 matches, sorted by similarity score (highest first)
- All similarities should be >= 0.5 and <= 1.0

Return ONLY valid JSON array, no markdown, no backticks, no explanations.`,
      messages: [
        {
          role: 'user',
          content: `Analyze this case description and find the top 5 most similar case types: "${sanitizedDescription}"`,
        },
      ],
    });

    const content = result.text || '[]';

    try {
      const parsed = JSON.parse(content);
      if (!Array.isArray(parsed)) {
        return [];
      }

      // Validate and sanitize results
      return parsed
        .filter(
          (item: any) =>
            typeof item.nosCode === 'number' &&
            typeof item.similarity === 'number' &&
            typeof item.reasoning === 'string'
        )
        .map((item: any) => ({
          nosCode: Math.floor(item.nosCode),
          similarity: Math.min(1, Math.max(0, item.similarity)),
          reasoning: item.reasoning.substring(0, 200),
        }))
        .slice(0, 5);
    } catch (parseError) {
      console.error('[api/search/semantic] JSON parse error:', parseError);
      return [];
    }
  } catch (err) {
    console.error('[api/search/semantic] AI matching error:', err);
    throw err;
  }
}

/**
 * POST /api/search/semantic
 * Accepts a case description and returns semantically similar NOS codes
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
          message: 'Maximum 10 semantic searches per minute. Please try again later.',
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
          message: 'Request must contain a "description" field (string, 1-500 characters)',
        },
        { status: 400 }
      );
    }

    const { description } = validation.data;

    // Find semantic matches using AI
    const matches = await findSemanticMatches(description);

    // Enrich matches with REAL_DATA info
    const enrichedMatches = matches
      .map((match) => {
        const data = REAL_DATA[String(match.nosCode)];
        return {
          nosCode: match.nosCode,
          label: data?.label || `NOS ${match.nosCode}`,
          similarity: match.similarity,
          reasoning: match.reasoning,
          winRate: data?.wr || null,
          settlementMedian: data?.rng?.md || null,
          caseCount: data?.total || null,
        };
      })
      .filter((m) => m.label && m.winRate !== null);

    return NextResponse.json({
      success: true,
      matches: enrichedMatches,
      disclosure: 'AI-generated semantic matching. Results are suggestions only.',
    });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    console.error('[api/search/semantic] error:', errorMessage);

    if (err instanceof SyntaxError) {
      return NextResponse.json(
        {
          error: 'Invalid JSON',
          message: 'Request body must be valid JSON with a "description" field',
        },
        { status: 400 }
      );
    }

    if (errorMessage.includes('timeout') || errorMessage.includes('aborted')) {
      return NextResponse.json(
        {
          error: 'Request timeout',
          message: 'AI processing took too long. Please try again with a simpler description.',
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
