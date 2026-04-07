export const dynamic = 'force-dynamic';
export const maxDuration = 30;

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { generateText } from 'ai';
import { anthropic } from '@ai-sdk/anthropic';
import { REAL_DATA } from '@/lib/realdata';

const PredictInputSchema = z.object({
  nos_code: z.string().regex(/^\d{1,4}$/),
  district_id: z.string().min(1).max(20),
  represented: z.boolean(),
});

interface PredictionResponse {
  favorable_outcome_probability: number;
  estimated_settlement_range: {
    p25: number;
    p50: number;
    p75: number;
  };
  estimated_duration_months: number;
  confidence: string;
  interpretation: string;
}

// Simple in-memory rate limiter (per API key)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(apiKey: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(apiKey);

  if (!entry || entry.resetTime < now) {
    rateLimitMap.set(apiKey, { count: 1, resetTime: now + 60000 }); // 1 min window
    return true;
  }

  if (entry.count >= 10) {
    return false;
  }

  entry.count += 1;
  return true;
}

function validateBearerToken(authHeader: string | null): { valid: boolean; token?: string } {
  if (!authHeader) return { valid: false };
  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') return { valid: false };
  if (!parts[1].startsWith('mcv_')) return { valid: false };
  return { valid: true, token: parts[1] };
}

/**
 * POST /api/v1/predict
 * AI-powered case outcome prediction with rate limiting (10 req/min per API key)
 */
export async function POST(request: NextRequest) {
  // Check authentication
  const authHeader = request.headers.get('Authorization');
  const tokenValidation = validateBearerToken(authHeader);
  if (!tokenValidation.valid) {
    return NextResponse.json(
      { error: 'Unauthorized', message: 'Missing or invalid Bearer token' },
      { status: 401, headers: { 'Content-Type': 'application/json' } }
    );
  }

  // Check rate limit
  const apiKey = tokenValidation.token!;
  if (!checkRateLimit(apiKey)) {
    return NextResponse.json(
      {
        error: 'Rate limit exceeded',
        message: 'Maximum 10 requests per minute per API key',
      },
      { status: 429, headers: { 'Content-Type': 'application/json' } }
    );
  }

  // Parse and validate body
  let body: any;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: 'Invalid JSON', message: 'Request body must be valid JSON' },
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const inputValidation = PredictInputSchema.safeParse(body);
  if (!inputValidation.success) {
    const firstError = inputValidation.error.issues?.[0]?.message || 'Invalid input';
    return NextResponse.json(
      {
        error: 'Invalid input',
        message: firstError,
      },
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const { nos_code, district_id, represented } = inputValidation.data;

  // Query historical data
  const caseData = (REAL_DATA as Record<string, any>)[nos_code];
  if (!caseData) {
    return NextResponse.json(
      { error: 'Not found', message: `No data for NOS code ${nos_code}` },
      { status: 404, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    // Use Vercel AI SDK to generate prediction
    const prompt = `Based on federal court case data for ${caseData.label || 'this case type'} (NOS ${nos_code}) in the ${district_id} district, generate a case outcome prediction.

Historical data:
- Plaintiff win rate: ${caseData.wr}%
- Settlement rate: ${caseData.sp}%
- Median settlement: $${caseData.rng?.md || 0}
- Represented: ${represented}

Provide a JSON response with:
{
  "favorable_outcome_probability": <0-100>,
  "confidence": "<high|medium|low>",
  "interpretation": "<2-3 sentence interpretation>"
}`;

    const result = await generateText({
      model: anthropic('claude-3-5-sonnet-20241022'),
      prompt,
      maxOutputTokens: 300,
    });

    // Parse AI response
    const jsonMatch = result.text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Failed to parse AI response');
    }

    const prediction = JSON.parse(jsonMatch[0]);

    // Build response with settlement estimates
    const baseMedian = caseData.rng?.md || 100000;
    const response: PredictionResponse = {
      favorable_outcome_probability: Math.min(
        100,
        Math.max(0, prediction.favorable_outcome_probability || 50)
      ),
      estimated_settlement_range: {
        p25: Math.round(baseMedian * 0.6),
        p50: baseMedian,
        p75: Math.round(baseMedian * 1.4),
      },
      estimated_duration_months: caseData.mo || 12,
      confidence: prediction.confidence || 'medium',
      interpretation:
        prediction.interpretation ||
        `Based on historical data for ${caseData.label}, this case has a favorable outcome probability of ${prediction.favorable_outcome_probability}%.`,
    };

    return NextResponse.json(response, {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'private, no-cache',
      },
    });
  } catch (error) {
    console.error('[api/v1/predict] Error:', error);
    return NextResponse.json(
      { error: 'Server error', message: 'Failed to generate prediction' },
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
