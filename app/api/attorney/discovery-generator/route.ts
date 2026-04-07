import { NextRequest, NextResponse } from 'next/server';
import { sanitizeForPrompt } from '../../../../lib/sanitize';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { caseType, partyRole, claimsDefenses, discoveryType } = body;

    if (!caseType || !partyRole || !discoveryType) {
      return NextResponse.json({ error: 'Case type, party role, and discovery type are required' }, { status: 400 });
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
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

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 2500,
        stream: true,
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
      }),
    });

    if (!response.ok) {
      console.error('Anthropic API error:', await response.text());
      return NextResponse.json({ error: 'Failed to generate discovery' }, { status: 500 });
    }

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        const reader = response.body?.getReader();
        if (!reader) { controller.close(); return; }
        const decoder = new TextDecoder();
        let buffer = '';
        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split('\n');
            buffer = lines.pop() || '';
            for (const line of lines) {
              if (line.startsWith('data: ')) {
                const jsonStr = line.slice(6).trim();
                if (jsonStr === '[DONE]') continue;
                try {
                  const event = JSON.parse(jsonStr);
                  if (event.type === 'content_block_delta' && event.delta?.text) {
                    controller.enqueue(encoder.encode(event.delta.text));
                  }
                } catch { /* skip */ }
              }
            }
          }
        } catch (err) { console.error('Stream error:', err); }
        finally { controller.close(); }
      },
    });

    return new Response(readable, {
      headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Transfer-Encoding': 'chunked', 'Cache-Control': 'no-cache' },
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unknown error';
    console.error('[api/attorney/discovery-generator] error:', msg);
    if (err instanceof SyntaxError) return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
    return NextResponse.json({ error: 'Generation failed' }, { status: 500 });
  }
}
