/**
 * AI Enrichment Service
 *
 * Generates case summaries and tags using the Anthropic Claude API.
 * All prompts are centralized here for tuning. Outputs are stored
 * with model/prompt version metadata for reproducibility.
 *
 * Design principles:
 * - Summaries only use available structured fields and trusted source text
 * - Never fabricate facts, holdings, or outcomes
 * - Always note when data is incomplete
 * - Concise, professional, sober tone
 */

import type { EnrichmentInput, SummaryOutput, TagOutput, CaseTagRow } from '../types';

// ── Configuration ──

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
const MODEL_NAME = 'claude-sonnet-4-20250514';
const PROMPT_VERSION = 'v1';
const MAX_RETRIES = 2;
const RETRY_DELAY_MS = 2000;

// ── Provider Abstraction ──

interface AIProvider {
  generate(systemPrompt: string, userPrompt: string): Promise<string>;
}

/**
 * Anthropic Claude provider via REST API.
 * Uses the Messages API directly to avoid SDK dependency bloat in pipeline scripts.
 */
const anthropicProvider: AIProvider = {
  async generate(systemPrompt: string, userPrompt: string): Promise<string> {
    if (!ANTHROPIC_API_KEY) {
      throw new Error('ANTHROPIC_API_KEY not set. Cannot generate enrichment.');
    }

    for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
      try {
        const res = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': ANTHROPIC_API_KEY,
            'anthropic-version': '2023-06-01',
          },
          body: JSON.stringify({
            model: MODEL_NAME,
            max_tokens: 1024,
            system: systemPrompt,
            messages: [{ role: 'user', content: userPrompt }],
          }),
        });

        if (res.status === 429) {
          const delay = RETRY_DELAY_MS * (attempt + 1);
          console.warn(`[enrichment] Rate limited. Waiting ${delay}ms...`);
          await new Promise((r) => setTimeout(r, delay));
          continue;
        }

        if (!res.ok) {
          const body = await res.text().catch(() => '');
          throw new Error(`Anthropic API error ${res.status}: ${body.slice(0, 200)}`);
        }

        const data = await res.json();
        const text = data.content?.[0]?.text;
        if (!text) throw new Error('Empty response from Anthropic API');
        return text;
      } catch (err) {
        if (attempt === MAX_RETRIES) throw err;
        await new Promise((r) => setTimeout(r, RETRY_DELAY_MS));
      }
    }

    throw new Error('AI enrichment: max retries exceeded');
  },
};

// Active provider (swap this for testing or alternative models)
let provider: AIProvider = anthropicProvider;

export function setAIProvider(p: AIProvider): void {
  provider = p;
}

// ── Prompt Templates ──

const SUMMARY_SYSTEM_PROMPT = `You are a legal data analyst summarizing federal court cases for litigation professionals. Your summaries must be:
- Concise (2-4 sentences for overview)
- Professional and neutral in tone
- Based ONLY on the structured fields provided
- Never fabricate facts, holdings, or legal conclusions
- Note when information is incomplete or unavailable

Output format: JSON with two fields:
- "overview": A plain-English summary of the case
- "confidenceNotes": Any caveats about data completeness`;

const TAG_SYSTEM_PROMPT = `You are a legal classification system. Given structured case data, generate relevant tags for search and filtering.

Tag categories (use exactly these):
- practice_area: The broad legal area (e.g., "Securities Law", "Employment Law", "Patent Law")
- claim_type: Specific legal claims (e.g., "Securities Fraud", "Wrongful Termination", "Patent Infringement")
- procedural_stage: Current stage (e.g., "Filed", "Discovery", "Summary Judgment", "Trial", "Appeal", "Closed")
- subject_matter: Topic tags (e.g., "Class Action", "Government Entity", "Pro Se")
- forum_type: Court type (e.g., "District Court", "Appellate Court", "Bankruptcy Court")

Rules:
- Only generate tags supported by the provided data
- Do not invent claims or issues not evident from the fields
- Assign confidence 0.0-1.0 (1.0 = certain from data, 0.5 = reasonable inference)
- Maximum 8 tags per case

Output format: JSON with field "tags" containing array of {tag, category, confidence}`;

// ── Summary Generation ──

export async function generateSummary(input: EnrichmentInput): Promise<SummaryOutput> {
  const caseFields = buildCaseDescription(input);

  if (!caseFields) {
    return {
      overview: 'Insufficient data to generate a meaningful summary for this case.',
      confidenceNotes: 'No structured fields available beyond case name.',
    };
  }

  const userPrompt = `Summarize this federal court case based on the following structured data. Only use the information provided.

${caseFields}

Respond with valid JSON only.`;

  try {
    const response = await provider.generate(SUMMARY_SYSTEM_PROMPT, userPrompt);
    const parsed = parseJSON<SummaryOutput>(response);

    return {
      overview: parsed.overview || 'Summary generation produced no overview.',
      confidenceNotes: parsed.confidenceNotes || 'No confidence notes.',
    };
  } catch (err) {
    console.error(`[enrichment] Summary generation failed for case ${input.caseId}:`, err);
    return {
      overview: 'Summary could not be generated due to a processing error.',
      confidenceNotes: `Error: ${err instanceof Error ? err.message : 'Unknown error'}`,
    };
  }
}

// ── Tag Generation ──

export async function generateTags(input: EnrichmentInput): Promise<TagOutput> {
  const caseFields = buildCaseDescription(input);

  if (!caseFields) {
    return { tags: [] };
  }

  const userPrompt = `Generate classification tags for this federal court case based on the following structured data. Only generate tags supported by the provided information.

${caseFields}

Respond with valid JSON only.`;

  try {
    const response = await provider.generate(TAG_SYSTEM_PROMPT, userPrompt);
    const parsed = parseJSON<TagOutput>(response);

    // Validate and filter tags
    const validCategories = new Set(['practice_area', 'claim_type', 'procedural_stage', 'subject_matter', 'forum_type']);
    const validTags = (parsed.tags || [])
      .filter(
        (t) =>
          t.tag &&
          t.category &&
          validCategories.has(t.category) &&
          typeof t.confidence === 'number' &&
          t.confidence >= 0 &&
          t.confidence <= 1
      )
      .slice(0, 8); // Cap at 8 tags

    return { tags: validTags };
  } catch (err) {
    console.error(`[enrichment] Tag generation failed for case ${input.caseId}:`, err);
    return { tags: [] };
  }
}

// ── Helpers ──

/** Build a structured description of the case for the AI prompt */
function buildCaseDescription(input: EnrichmentInput): string | null {
  const lines: string[] = [];

  lines.push(`Case Name: ${input.caseName}`);
  if (input.docketNumber) lines.push(`Docket Number: ${input.docketNumber}`);
  if (input.courtName) lines.push(`Court: ${input.courtName}`);
  if (input.caseType) lines.push(`Case Type: ${input.caseType}`);
  if (input.natureOfSuit) lines.push(`Nature of Suit: ${input.natureOfSuit}`);
  if (input.filingDate) lines.push(`Filing Date: ${input.filingDate}`);
  if (input.terminationDate) lines.push(`Termination Date: ${input.terminationDate}`);
  if (input.status) lines.push(`Status: ${input.status}`);

  if (input.parties.length > 0) {
    const partyList = input.parties
      .slice(0, 10) // Cap party display
      .map((p) => `  - ${p.name}${p.role ? ` (${p.role})` : ''}`)
      .join('\n');
    lines.push(`Parties:\n${partyList}`);
  }

  if (input.opinionExcerpt) {
    lines.push(`Opinion Excerpt (first 2000 chars):\n${input.opinionExcerpt}`);
  }

  // Need at least case name + one other field to produce useful output
  if (lines.length < 2) return null;

  return lines.join('\n');
}

/** Safely parse JSON from AI response, handling markdown code blocks */
function parseJSON<T>(text: string): T {
  // Strip markdown code fences if present
  let cleaned = text.trim();
  if (cleaned.startsWith('```json')) {
    cleaned = cleaned.slice(7);
  } else if (cleaned.startsWith('```')) {
    cleaned = cleaned.slice(3);
  }
  if (cleaned.endsWith('```')) {
    cleaned = cleaned.slice(0, -3);
  }

  return JSON.parse(cleaned.trim());
}

// ── Exported Config (for provenance tracking) ──

export const ENRICHMENT_CONFIG = {
  modelName: MODEL_NAME,
  promptVersion: PROMPT_VERSION,
} as const;
