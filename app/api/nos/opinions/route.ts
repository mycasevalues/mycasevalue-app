import { NextRequest, NextResponse } from 'next/server';
import { generateText } from 'ai';
import { anthropic } from '@ai-sdk/anthropic';
import { getTopOpinionsByNos } from '../../../../lib/courtlistener';

export const revalidate = 86400; // Cache for 24 hours
export const maxDuration = 30;

// Top 10 NOS codes that get the Relevant Opinions feature
const ENABLED_NOS = new Set([442, 365, 190, 110, 360, 710, 445, 870, 440, 863]);

interface CachedOpinion {
  id: number;
  case_name: string;
  court: string;
  year: string;
  citation: string;
  url: string;
  summary: string;
}

/**
 * GET /api/nos/opinions?code=442
 * Returns up to 5 relevant opinions for a NOS code with AI-generated summaries.
 * Summaries are cached permanently in Supabase (opinion_summaries table).
 */
export async function GET(req: NextRequest) {
  const codeStr = req.nextUrl.searchParams.get('code');
  if (!codeStr) {
    return NextResponse.json({ error: 'Missing code parameter' }, { status: 400 });
  }

  const nosCode = parseInt(codeStr, 10);
  if (!ENABLED_NOS.has(nosCode)) {
    return NextResponse.json({ opinions: [], message: 'NOS code not enabled for opinions' });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  let supabase: any = null;
  if (supabaseUrl && supabaseKey) {
    try {
      const { createClient } = await import('@supabase/supabase-js');
      supabase = createClient(supabaseUrl, supabaseKey);
    } catch {
      // No Supabase available
    }
  }

  // Step 1: Check Supabase cache first
  if (supabase) {
    try {
      const { data: cached } = await supabase
        .from('opinion_summaries')
        .select('*')
        .eq('nos_code', nosCode)
        .order('created_at', { ascending: false })
        .limit(5);

      if (cached && cached.length > 0) {
        return NextResponse.json({
          opinions: cached.map((c: any) => ({
            id: c.opinion_id,
            case_name: c.case_name,
            court: c.court,
            year: c.year,
            citation: c.citation,
            url: c.url,
            summary: c.summary,
          })),
          cached: true,
        });
      }
    } catch {
      // Continue to fetch fresh
    }
  }

  // Step 2: Fetch from CourtListener
  const opinions = await getTopOpinionsByNos(nosCode, 5);
  if (!opinions || opinions.length === 0) {
    return NextResponse.json({ opinions: [] });
  }

  // Step 3: Generate AI summaries via Anthropic Claude
  const results: CachedOpinion[] = [];

  for (const op of opinions) {
    const year = op.dateFiled ? op.dateFiled.substring(0, 4) : '';
    let summary = '';

    // Try to generate AI summary
    if (process.env.ANTHROPIC_API_KEY && op.snippet) {
      try {
        const result = await generateText({
          model: anthropic('claude-sonnet-4-20250514'),
          maxOutputTokens: 100,
          messages: [{
            role: 'user',
            content: `Summarize this court opinion in exactly one sentence (max 30 words). Case: ${op.caseName}. Court: ${op.court}. Excerpt: ${op.snippet.substring(0, 500)}`,
          }],
        });

        if (result) {
          summary = result.text || '';
        }
      } catch {
        // No summary available
      }
    }

    // Fallback summary from snippet
    if (!summary && op.snippet) {
      const cleaned = op.snippet.replace(/<[^>]*>/g, '').trim();
      summary = cleaned.length > 120 ? cleaned.substring(0, 117) + '...' : cleaned;
    }

    const opinion: CachedOpinion = {
      id: op.id,
      case_name: op.caseName,
      court: op.court,
      year,
      citation: op.citation,
      url: op.url,
      summary,
    };

    results.push(opinion);

    // Step 4: Cache in Supabase permanently
    if (supabase && opinion.summary) {
      try {
        await supabase.from('opinion_summaries').upsert({
          opinion_id: op.id,
          nos_code: nosCode,
          case_name: op.caseName,
          court: op.court,
          year,
          citation: op.citation,
          url: op.url,
          summary: opinion.summary,
          created_at: new Date().toISOString(),
        }, { onConflict: 'opinion_id,nos_code' });
      } catch {
        // Cache failure is non-critical
      }
    }
  }

  return NextResponse.json({ opinions: results, cached: false });
}
