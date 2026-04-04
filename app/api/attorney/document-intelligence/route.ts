// Requires ANTHROPIC_API_KEY in Vercel environment variables
import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { getUserTier } from '../../../../lib/access';

export async function POST(req: Request) {
  // Check for API key availability
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json({ error: 'Document Intelligence temporarily unavailable' }, { status: 503 });
  }

  try {
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      { cookies: { get: (n: string) => cookieStore.get(n)?.value, set: () => {}, remove: () => {} } }
    );
    const { data: { user } } = await supabase.auth.getUser();
    if (!user?.email) return NextResponse.json({ error: 'Authentication required' }, { status: 401 });

    const tier = await getUserTier(user.email);
    // DEV MODE: All features unlocked — Stripe integration pending
    // if (tier !== 'attorney') return NextResponse.json({ error: 'Attorney Mode subscription required' }, { status: 403 });

    const formData = await req.formData();
    const file = formData.get('file') as File;
    if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    if (file.size > 10 * 1024 * 1024) return NextResponse.json({ error: 'File too large. Maximum 10MB.' }, { status: 400 });

    const text = await file.text();
    const truncated = text.slice(0, 8000);

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1500,
        messages: [{
          role: 'user',
          content: `You are a legal document analyst specializing in federal civil litigation. Analyze this legal document and provide:

1. DOCUMENT TYPE: What kind of document is this (complaint, motion, brief, etc.)?
2. CASE TYPE: What federal case type(s) does this involve? Include the relevant NOS (Nature of Suit) code(s).
3. KEY CLAIMS: List the 3-5 most important legal claims or causes of action.
4. PARTIES: Identify plaintiff(s) and defendant(s) if present.
5. RELIEF SOUGHT: What damages or relief is being requested?
6. COMPARABLE OUTCOMES: Based on this case type and claims, what does federal court data suggest about typical outcomes? (win rates, timelines, settlement likelihood)
7. KEY RISKS: What are the 2-3 most significant legal risks or weaknesses visible in the document?

Be concise, specific, and practical. Format your response clearly with these numbered sections.

DOCUMENT:
${truncated}

${text.length > 8000 ? '\n[Document truncated for analysis — showing first 8,000 characters]' : ''}`,
        }],
      }),
    });

    const data = await response.json();
    const analysis = data.content?.[0]?.text || 'Analysis unavailable';

    return NextResponse.json({ analysis });
  } catch (e) {
    return NextResponse.json({ error: 'Analysis failed. Please try again.' }, { status: 500 });
  }
}
