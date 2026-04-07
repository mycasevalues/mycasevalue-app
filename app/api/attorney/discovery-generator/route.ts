import { NextRequest, NextResponse } from 'next/server';
import { streamText } from 'ai';
import { anthropic } from '@ai-sdk/anthropic';
import { sanitizeForPrompt } from '../../../../lib/sanitize';

export const dynamic = 'force-dynamic';
export const maxDuration = 30;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { caseType, partyRole, claimsDefenses, discoveryType } = body;

    if (!caseType || !partyRole || !discoveryType) {
      return NextResponse.json({ error: 'Case type, party role, and discovery type are required' }, { status: 400 });
    }

    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json({ error: 'Service temporarily unavailable' }, { status: 503 });
    }

    const sanitized = sanitizeForPrompt(claimsDefenses || '', 1000);

    const typeLabels: Record<string, string> = {
      interrogatories: 'Interrogatories (FRCP Rule 33)',
      production: 'Requests for Production of Documents (FRCP Rule 34)',
      admissions: 'Requests for Admissions (FRCP Rule 36)',
    };

    const typeInstructions: Record<string, string> = {
      interrogatories: `Generate numbered interrogatories in FRCP Rule 33 format. Include:
- Standard preliminary interrogatories (identity, address, involvement)
- Substantive interrogatories specific to the case type
- Damages interrogatories
- Expert witness interrogatories
- Insurance interrogatories
Limit to 25 interrogatories (standard FRCP limit). Number each interrogatory sequentially.`,
      production: `Generate numbered Requests for Production in FRCP Rule 34 format. Include:
- Communications and correspondence
- Contracts and agreements
- Financial records and documents
- Photographs, videos, and digital evidence
- Medical records (if applicable)
- Business records relevant to the case
Number each request sequentially. Use standard "any and all documents" language where appropriate.`,
      admissions: `Generate numbered Requests for Admissions in FRCP Rule 36 format. Include:
- Authenticity of key documents
- Factual admissions regarding liability
- Admissions regarding damages
- Admissions regarding applicable law
Number each request sequentially. Frame each as a clear, specific statement to be admitted or denied.`,
    };

    const result = await streamText({
      model: anthropic('claude-sonnet-4-20250514'),
      maxOutputTokens: 2500,
      system: `You are an experienced litigation attorney drafting formal discovery requests. Generate discovery in proper FRCP format with appropriate legal language and definitions.

Include a standard DEFINITIONS AND INSTRUCTIONS section at the top with common discovery definitions (e.g., "Document," "Communication," "You/Your," "Identify," "Relate to," "Person").

${typeInstructions[discoveryType] || typeInstructions.interrogatories}

Format output as a formal legal document ready for attorney review.`,
      messages: [
        {
          role: 'user',
          content: `Generate ${typeLabels[discoveryType] || 'Interrogatories'} for:

Case Type: ${caseType}
Party Role: ${partyRole} (propounding party)
${sanitized ? `Claims/Defenses: ${sanitized}` : ''}

Generate formal discovery requests appropriate for this case type and party role.`,
        },
      ],
    });

    return result.toTextStreamResponse();
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unknown error';
    console.error('[api/attorney/discovery-generator] error:', msg);
    if (err instanceof SyntaxError) return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
    return NextResponse.json({ error: 'Generation failed' }, { status: 500 });
  }
}
