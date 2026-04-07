/**
 * Judge AI Behavioral Analysis Generator
 * Analyzes published opinions to generate structured behavioral insights
 * about federal judges using Claude AI.
 *
 * Results are cached in the judge_ai_analysis table and re-generated only
 * when new opinions are available for a judge.
 */

import { createClient } from '@supabase/supabase-js';
import { generateText } from 'ai';
import { anthropic } from '@ai-sdk/anthropic';

// ─── Type Definitions ────────────────────────────────────────────────

export interface JudgeAnalysis {
  judge_id: string;
  writing_style: string;
  plaintiff_tendencies: string;
  motion_approach: string;
  notable_patterns: string;
  caveats: string;
  opinion_count: number;
  last_analysis_at: string;
  created_at: string;
  updated_at: string;
}

export interface GenerationResult {
  success: boolean;
  analysis?: JudgeAnalysis;
  cached: boolean;
  errors: string[];
}

// ─── Mock Analysis Data ───────────────────────────────────────────────

const MOCK_ANALYSIS: Record<string, Omit<JudgeAnalysis, 'judge_id'>> = {
  'john-smith-sdny': {
    writing_style: 'Concise and direct prose with minimal case citations.',
    plaintiff_tendencies: 'Shows moderate favor to plaintiffs in contract disputes.',
    motion_approach: 'Grants summary judgment motions approximately 40% of the time.',
    notable_patterns: 'Emphasizes statutory interpretation over common law doctrine.',
    caveats: 'Analysis based on limited sample of published opinions.',
    opinion_count: 23,
    last_analysis_at: new Date().toISOString(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  'jane-doe-cand': {
    writing_style: 'Scholarly style with extensive legal analysis and historical context.',
    plaintiff_tendencies: 'Generally favorable to plaintiff class action claims.',
    motion_approach: 'Denies summary judgment in close cases, favoring fact finder analysis.',
    notable_patterns: 'Frequently cites Ninth Circuit precedent and constitutional principles.',
    caveats: 'Analysis reflects judicial philosophy but may not predict individual case outcomes.',
    opinion_count: 35,
    last_analysis_at: new Date().toISOString(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
};

// ─── Analysis Generation ──────────────────────────────────────────────

/**
 * Generate judge behavioral analysis from opinion summaries using Claude
 */
async function generateAnalysisFromOpinions(
  judgeId: string,
  opinionSummaries: string[],
  anthropicApiKey?: string,
): Promise<JudgeAnalysis | null> {
  try {
    // Check if API key is available (from env or parameter)
    if (!process.env.ANTHROPIC_API_KEY && !anthropicApiKey) {
      console.warn('Anthropic API key not provided, skipping analysis generation');
      return null;
    }

    if (opinionSummaries.length === 0) {
      console.warn(`No opinion summaries for judge ${judgeId}`);
      return null;
    }

    const summariesText = opinionSummaries.slice(0, 20).join('\n- ');

    const systemPrompt = `You are analyzing federal judge behavior based on their published opinions for the legal research platform MyCaseValue. Analyze the provided opinion summaries and return ONLY valid JSON with this structure:
{
  "writing_style": "One sentence describing judicial writing style",
  "plaintiff_tendencies": "One sentence on patterns favorable or unfavorable to plaintiffs",
  "motion_approach": "One sentence on how this judge handles dispositive motions",
  "notable_patterns": "One sentence on any notable patterns in their rulings",
  "caveats": "One sentence on limitations of this analysis"
}
Base analysis only on the provided opinion summaries. Do not speculate beyond the data.`;

    const result = await generateText({
      model: anthropic('claude-3-5-haiku-20241022'),
      system: systemPrompt,
      prompt: `Analyze these judicial opinions:\n- ${summariesText}`,
      maxOutputTokens: 500,
    });

    const responseText = result.text;

    // Parse JSON from response
    let analysisData;
    try {
      analysisData = JSON.parse(responseText);
    } catch (parseErr) {
      // Try to extract JSON from response text
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        analysisData = JSON.parse(jsonMatch[0]);
      } else {
        console.error('Could not parse JSON from Claude response:', responseText);
        return null;
      }
    }

    const now = new Date().toISOString();
    const analysis: JudgeAnalysis = {
      judge_id: judgeId,
      writing_style: analysisData.writing_style || '',
      plaintiff_tendencies: analysisData.plaintiff_tendencies || '',
      motion_approach: analysisData.motion_approach || '',
      notable_patterns: analysisData.notable_patterns || '',
      caveats: analysisData.caveats || '',
      opinion_count: opinionSummaries.length,
      last_analysis_at: now,
      created_at: now,
      updated_at: now,
    };

    return analysis;
  } catch (error) {
    console.error(`Error generating analysis for judge ${judgeId}:`, error);
    return null;
  }
}

/**
 * Check if judge analysis is stale (has new opinions since last analysis)
 */
async function isAnalysisStale(
  judgeId: string,
  supabase: any,
): Promise<boolean> {
  try {
    // Get last analysis time
    const { data: analysis, error: analysisError } = await supabase
      .from('judge_ai_analysis')
      .select('last_analysis_at')
      .eq('judge_id', judgeId)
      .maybeSingle();

    if (analysisError || !analysis) {
      return true; // No analysis exists
    }

    // Check if there are newer opinions
    const { data: newerOpinions, error: opinionsError } = await supabase
      .from('judge_opinions')
      .select('id')
      .eq('judge_id', judgeId)
      .gt('created_at', (analysis as any).last_analysis_at)
      .limit(1);

    return (newerOpinions?.length || 0) > 0;
  } catch (error) {
    console.error(`Error checking if analysis is stale for ${judgeId}:`, error);
    return true; // Assume stale on error
  }
}

/**
 * Main function to generate or retrieve judge behavioral analysis
 */
export async function generateJudgeAnalysis(
  judgeId: string,
  supabaseUrl?: string,
  supabaseServiceKey?: string,
  anthropicApiKey?: string,
): Promise<GenerationResult> {
  const errors: string[] = [];

  try {
    // If no Supabase config, return mock data
    if (!supabaseUrl || !supabaseServiceKey) {
      console.warn('Supabase not configured, using mock analysis data');
      const mockData = MOCK_ANALYSIS[judgeId];
      if (mockData) {
        return {
          success: true,
          analysis: {
            judge_id: judgeId,
            ...mockData,
          },
          cached: false,
          errors: [],
        };
      }
      return {
        success: false,
        cached: false,
        errors: ['Supabase not configured and no mock data available'],
      };
    }

    const supabase: any = createClient(supabaseUrl, supabaseServiceKey);

    // Check if cached analysis exists and is still fresh
    try {
      const { data: cachedAnalysis } = await supabase
        .from('judge_ai_analysis')
        .select('*')
        .eq('judge_id', judgeId)
        .maybeSingle();

      if (cachedAnalysis && !anthropicApiKey) {
        // Return cached if available and no API key to regenerate
        return {
          success: true,
          analysis: cachedAnalysis,
          cached: true,
          errors: [],
        };
      }

      // If cached exists but we can regenerate, check if it's stale
      if (cachedAnalysis && anthropicApiKey) {
        const stale = await isAnalysisStale(judgeId, supabase);
        if (!stale) {
          return {
            success: true,
            analysis: cachedAnalysis,
            cached: true,
            errors: [],
          };
        }
      }
    } catch (cacheErr) {
      console.warn(`Could not check cache for ${judgeId}:`, cacheErr);
    }

    // Fetch opinion summaries for this judge
    let opinionSummaries: string[] = [];
    try {
      const { data: opinions, error: opinionsError } = await supabase
        .from('judge_opinions')
        .select('ai_summary, case_name, court, year')
        .eq('judge_id', judgeId)
        .order('year', { ascending: false })
        .limit(20);

      if (!opinionsError) {
        opinionSummaries = (opinions || [])
          .filter((op: any) => op.ai_summary || op.case_name)
          .map((op: any) => {
            if (op.ai_summary) return op.ai_summary;
            const parts = [op.case_name];
            if (op.court) parts.push(`(${op.court})`);
            if (op.year) parts.push(`[${op.year}]`);
            return parts.join(' ');
          });
      }
    } catch (opinionsErr) {
      console.warn(`Could not fetch opinions for ${judgeId}:`, opinionsErr);
      errors.push(`Opinion fetch failed: ${opinionsErr}`);
    }

    // If no summaries available, try mock data
    if (opinionSummaries.length === 0) {
      const mockData = MOCK_ANALYSIS[judgeId];
      if (mockData) {
        return {
          success: true,
          analysis: {
            judge_id: judgeId,
            ...mockData,
          },
          cached: false,
          errors: errors.length > 0 ? errors : undefined,
        };
      }

      return {
        success: false,
        cached: false,
        errors: [...errors, 'No opinion summaries found for analysis'],
      };
    }

    // Generate analysis using Claude
    const analysis = await generateAnalysisFromOpinions(
      judgeId,
      opinionSummaries,
      anthropicApiKey,
    );

    if (!analysis) {
      errors.push('Failed to generate analysis');
      return {
        success: false,
        cached: false,
        errors,
      };
    }

    // Cache the analysis in Supabase
    try {
      await supabase.from('judge_ai_analysis').upsert(analysis, {
        onConflict: 'judge_id',
      });
    } catch (cacheWriteErr) {
      console.warn(`Could not cache analysis for ${judgeId}:`, cacheWriteErr);
      // Don't fail if caching fails
    }

    return {
      success: true,
      analysis,
      cached: false,
      errors: errors.length > 0 ? errors : [],
    };
  } catch (error: any) {
    console.error(`Error generating analysis for judge ${judgeId}:`, error);
    return {
      success: false,
      cached: false,
      errors: [...errors, error.message || 'Unknown error'],
    };
  }
}

/**
 * Batch generate analysis for multiple judges
 */
export async function generateAnalysisForJudges(
  judgeIds: string[],
  supabaseUrl: string,
  supabaseServiceKey: string,
  anthropicApiKey?: string,
): Promise<GenerationResult[]> {
  const results: GenerationResult[] = [];

  for (const judgeId of judgeIds) {
    const result = await generateJudgeAnalysis(
      judgeId,
      supabaseUrl,
      supabaseServiceKey,
      anthropicApiKey,
    );
    results.push(result);

    // Rate limit between generations
    if (judgeIds.indexOf(judgeId) < judgeIds.length - 1) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }

  return results;
}
