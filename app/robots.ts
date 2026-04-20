import { MetadataRoute } from 'next';
import { SITE_URL } from '../lib/site-config';

/**
 * AI crawler policy.
 *
 * We split crawlers into two buckets:
 *
 *   TRAINING  — scrape content to build model training corpora. Blocking these
 *               does not hurt us: our content is not freely donated to
 *               foundation-model training.
 *
 *   RETRIEVAL — fetch pages at query time so an AI answer engine (ChatGPT
 *               Search, Perplexity, etc.) can CITE us in its answers. Blocking
 *               these DOES hurt: federal-court-intelligence is a high-signal
 *               vertical for AI answers, and being citable = top-of-funnel.
 *
 * Default posture: BLOCK TRAINING, ALLOW RETRIEVAL.
 * To reverse, move user-agents between AI_TRAINING_BOTS and AI_RETRIEVAL_BOTS.
 */

// AI crawlers used PRIMARILY for training-corpus building. Blocked.
const AI_TRAINING_BOTS = [
  'GPTBot',           // OpenAI training crawler
  'Google-Extended',   // Google Gemini training (Googlebot itself is separate and allowed)
  'CCBot',            // Common Crawl — feeds many AI training pipelines
  'anthropic-ai',     // Anthropic training crawler
  'ClaudeBot',        // Anthropic Claude training
  'Bytespider',       // ByteDance / TikTok training
  'Omgilibot',        // Webz.io data aggregation for AI
  'FacebookBot',      // Meta training
  'cohere-ai',        // Cohere training
];

// AI crawlers that fetch at RETRIEVAL time (to answer a live user query).
// Allowed so MyCaseValue can be cited in AI answer engines.
const AI_RETRIEVAL_BOTS = [
  'OAI-SearchBot',    // ChatGPT Search / OpenAI retrieval
  'ChatGPT-User',     // ChatGPT browsing on a user's behalf
  'PerplexityBot',    // Perplexity AI live retrieval
  'Applebot-Extended',// Apple Intelligence / Siri (retrieval portion)
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Note: /reports is a user-specific dashboard (client-side supabase-gated, nothing to index).
        // We don't disallow /reports/ so /reports/2026-annual (public content report) can be crawled.
        disallow: ['/api/', '/dashboard/', '/account/', '/admin/', '/sign-in/', '/sign-up/', '/settings/', '/billing/', '/forgot-password/', '/reset-password/'],
      },
      // Block training-time AI crawlers
      ...AI_TRAINING_BOTS.map((bot) => ({
        userAgent: bot,
        disallow: '/' as const,
      })),
      // Allow retrieval-time AI crawlers so MyCaseValue is citable in live AI answers
      ...AI_RETRIEVAL_BOTS.map((bot) => ({
        userAgent: bot,
        allow: '/' as const,
      })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
