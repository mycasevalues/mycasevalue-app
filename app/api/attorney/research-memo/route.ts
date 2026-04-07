import { NextRequest, NextResponse } from 'next/server';
import { REAL_DATA } from '../../../../lib/realdata';
import { sanitizeForPrompt } from '../../../../lib/sanitize';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { legalQuestion, jurisdiction, caseType } = body;

    if (!legalQuestion) {
      return NextResponse.json({ error: 'Legal question is required' }, { status: 400 });
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'Service temporarily unavailable' }, { status: 503 });
    }

    const sanitized = sanitizeForPrompt(legalQuestion, 2000);
    const nosData = caseType ? REAL_DATA[caseType] : null;

    const statsContext = nosData
      ? `Platform Statistics for NOS ${caseType}:
- Win rate: ${nosData.wr}%
- Settlement rate: ${nosData.sp}%
- Median settlement: $${(nosData.rng?.md || 0) * 1000}
- Average duration: ${nosData.mo} months
- Total cases in database: ${nosData.total?.toLocaleString()}`
      : '';

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 3000,
        stream: true,
        system: `You are an experienced legal research attorney drafting a formal legal research memorandum. Follow the standard IRAC format strictly.

Structure the memo with these exact sections:
I. ISSUE PRESENTED
II. BRIEF ANSWER
III. APPLICABLE LAW
IV. DISCUSSION
V. CONCLUSION

In the APPLICABLE LAW and DISCUSSION sections, reference relevant federal standards, statutes, and leading cases for the case type. Where platform statistics are provided, integrate them naturally to support the analysis (e.g., "Historical data shows a ${nosData?.wr || 55}% win rate for this case type...").

Write in formal legal memo style with proper citations. Use standard legal citation format.`,
        messages: [
          {
            role: 'user',
            content: `Draft a legal research memorandum:

Legal Question/Issue:
${sanitized}

Jurisdiction: ${jurisdiction || 'Federal (general)'}
Case Type: ${caseType || 'General'}

${statsContext}

Generate a comprehensive research memo addressing this issue.`,
          },
        ],
      }),
    });

    if (!response.ok) {
      console.error('Anthropic API error:', await response.text());
      return NextResponse.json({ error: 'Failed to generate memo' }, { status: 500 });
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
    console.error('[api/attorney/research-memo] error:', msg);
    if (err instanceof SyntaxError) return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
    return NextResponse.json({ error: 'Generation failed' }, { status: 500 });
  }
}
