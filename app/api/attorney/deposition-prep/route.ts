import { NextRequest, NextResponse } from 'next/server';
import { sanitizeForPrompt } from '../../../../lib/sanitize';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { caseType, deponentRole, deponentPosition } = body;

    if (!caseType || !deponentRole) {
      return NextResponse.json({ error: 'Case type and deponent role are required' }, { status: 400 });
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'Service temporarily unavailable' }, { status: 503 });
    }

    const sanitizedPosition = sanitizeForPrompt(deponentPosition || '', 500);

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
        system: `You are an experienced litigation attorney specializing in deposition preparation. Generate a comprehensive, structured deposition outline with numbered questions.

The outline MUST be organized into these sections:
1. BACKGROUND QUESTIONS — Establish identity, qualifications, and relationship to case
2. SUBSTANTIVE CASE-SPECIFIC QUESTIONS — Core factual inquiries based on the case type
3. DOCUMENT AUTHENTICATION QUESTIONS — Questions to authenticate key documents
4. IMPEACHMENT PREPARATION NOTES — Areas of potential inconsistency to probe
5. CLOSING QUESTIONS — Final questions and reservations

Use clear numbering (1.1, 1.2, etc.) within each section. Include strategic notes in [brackets] where helpful.
Questions should be open-ended where appropriate but also include some yes/no questions for pinning down key facts.
Tailor all questions specifically to the case type and deponent role provided.`,
        messages: [
          {
            role: 'user',
            content: `Generate a deposition outline for:

Case Type: ${caseType}
Deponent Role: ${deponentRole}
${sanitizedPosition ? `Deponent's Position: ${sanitizedPosition}` : ''}

Create a thorough, organized deposition outline with questions in each of the five required sections.`,
          },
        ],
      }),
    });

    if (!response.ok) {
      console.error('Anthropic API error:', await response.text());
      return NextResponse.json({ error: 'Failed to generate outline' }, { status: 500 });
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
        } catch (err) {
          console.error('Stream error:', err);
        } finally {
          controller.close();
        }
      },
    });

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Transfer-Encoding': 'chunked',
        'Cache-Control': 'no-cache',
      },
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unknown error';
    console.error('[api/attorney/deposition-prep] error:', msg);
    if (err instanceof SyntaxError) {
      return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Generation failed' }, { status: 500 });
  }
}
