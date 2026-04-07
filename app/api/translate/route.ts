/**
 * POST /api/translate
 * Translates legal jargon to plain English using Vercel AI SDK streaming.
 *
 * Request body:
 * { text: string }
 *
 * Response:
 * Streaming text response (word-by-word) or JSON error
 *
 * Rate limit: 3 translations per day per IP
 */

export const dynamic = 'force-dynamic';
export const maxDuration = 30;

import { NextRequest, NextResponse } from 'next/server';
import { streamText } from 'ai';
import { anthropic } from '@ai-sdk/anthropic';
import { rateLimit, getClientIp } from '../../../lib/rate-limit';
import { sanitizeForPrompt } from '../../../lib/sanitize';

// Legal phrases dictionary for fallback (no API key) mode
const LEGAL_PHRASES: Record<string, string> = {
  'summary judgment': 'A request for the judge to decide the case without a full trial, because the key facts aren\'t disputed.',
  'dismissed without prejudice': 'The case was thrown out, but the plaintiff can refile it later.',
  'dismissed with prejudice': 'The case was thrown out permanently — the plaintiff cannot refile.',
  'motion to compel': 'A request asking the judge to force the other side to hand over evidence.',
  'motion to dismiss': 'A request asking the judge to throw out the case, usually for legal deficiency.',
  'default judgment': 'The plaintiff wins because the defendant didn\'t respond to the lawsuit.',
  'standing': 'The legal right to bring a lawsuit — you must show personal injury or harm.',
  'statute of limitations': 'The legal deadline for filing a lawsuit.',
  'discovery': 'The phase where both sides exchange evidence and information.',
  'deposition': 'Sworn testimony given outside the courtroom, usually in a lawyer\'s office.',
  'arbitration': 'A private process where a neutral decision-maker resolves the dispute instead of a judge.',
  'injunction': 'A court order requiring someone to do or stop doing something.',
  'stipulation': 'An agreement between the parties about a fact or procedure in the case.',
  'pro se': 'Representing yourself in court without a lawyer.',
  'class action': 'A lawsuit filed by one or a few people on behalf of a larger group with similar claims.',
  'remand': 'Sending the case back to a lower court for further proceedings.',
};

/**
 * Generate a fallback translation using pattern matching on known legal phrases
 */
function generateFallbackTranslation(text: string): string {
  const lowerText = text.toLowerCase();
  const foundPhrases: Array<{ phrase: string; definition: string }> = [];

  Object.entries(LEGAL_PHRASES).forEach(([phrase, definition]) => {
    if (lowerText.includes(phrase)) {
      foundPhrases.push({ phrase, definition });
    }
  });

  if (foundPhrases.length === 0) {
    return 'This text contains legal language that I cannot fully explain without using the translation service. Try copying a specific legal phrase or motion from the document, such as "motion for summary judgment" or "dismissed without prejudice".';
  }

  let explanation = 'Based on the legal terms found in your text:\n\n';
  foundPhrases.forEach(({ phrase, definition }, index) => {
    explanation += `"${phrase}" — ${definition}`;
    if (index < foundPhrases.length - 1) {
      explanation += '\n\n';
    }
  });
  explanation += '\n\nFor a complete translation of your full text, please sign up for unlimited translations.';

  return explanation;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const text = body.text?.trim();

    // Validate input
    if (!text) {
      return NextResponse.json(
        { error: 'Please provide legal text to translate.' },
        { status: 400 }
      );
    }

    if (text.length < 10) {
      return NextResponse.json(
        { error: 'Text must be at least 10 characters long.' },
        { status: 400 }
      );
    }

    if (text.length > 3000) {
      return NextResponse.json(
        { error: 'Text cannot exceed 3,000 characters.' },
        { status: 400 }
      );
    }

    // Apply rate limiting: 3 per day per IP
    const clientIp = getClientIp(request.headers);
    const rateLimitResult = rateLimit(clientIp, {
      windowMs: 24 * 60 * 60 * 1000, // 24 hours
      maxRequests: 3,
    });

    if (!rateLimitResult.success) {
      return NextResponse.json(
        {
          error: 'You have reached your daily limit of 3 free translations. Come back tomorrow!',
          remaining: 0,
        },
        { status: 429 }
      );
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      // Fallback to pattern matching
      const translation = generateFallbackTranslation(text);
      return NextResponse.json({ translation, remaining: rateLimitResult.remaining });
    }

    const sanitizedText = sanitizeForPrompt(text, 3000);

    const result = streamText({
      model: anthropic('claude-sonnet-4-20250514'),
      system: `You are an expert legal translator. Your job is to explain legal jargon and complex legal language in simple, plain English that a layperson can understand.

When translating legal text:
- Use simple, everyday words instead of jargon
- Explain what the legal action or concept means in practical terms
- Keep explanations concise (2-3 sentences max per concept)
- Focus on what it means for the person reading the document
- Do not give legal advice, just explain what the language means
- If the text contains multiple concepts, explain each one clearly

Your response should be a clear, friendly explanation that helps someone understand what the legal language means.`,
      prompt: `Please translate this legal text to plain English:\n\n${sanitizedText}`,
      maxOutputTokens: 1024,
      temperature: 0.3,
    });

    return result.toTextStreamResponse();
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('[api/translate] error:', errorMessage);

    if (error instanceof SyntaxError) {
      return NextResponse.json(
        {
          error: 'Invalid JSON',
          message: 'Request body must be valid JSON with a text field'
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        error: 'Translation failed',
        message: 'An unexpected error occurred while translating your text. Please try again.'
      },
      { status: 500 }
    );
  }
}
