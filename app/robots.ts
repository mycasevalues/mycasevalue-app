import { MetadataRoute } from 'next';
import { SITE_URL } from '../lib/site-config';

/**
 * AI crawler user-agents to block from scraping site content.
 * Each entry represents a known AI training or retrieval bot.
 */
const AI_CRAWLERS = [
  'GPTBot',           // OpenAI training crawler
  'ChatGPT-User',     // OpenAI ChatGPT browsing
  'Google-Extended',   // Google Gemini AI training
  'CCBot',            // Common Crawl (used by many AI companies)
  'anthropic-ai',     // Anthropic training crawler
  'ClaudeBot',        // Anthropic Claude browsing
  'Bytespider',       // ByteDance / TikTok AI training
  'Omgilibot',        // Webz.io data collection for AI
  'FacebookBot',      // Meta AI training
  'cohere-ai',        // Cohere AI training crawler
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/dashboard/', '/account/', '/admin/', '/sign-in/', '/sign-up/', '/settings/', '/billing/', '/reports/', '/forgot-password/', '/reset-password/'],
      },
      // Block AI training and retrieval crawlers
      ...AI_CRAWLERS.map((bot) => ({
        userAgent: bot,
        disallow: '/' as const,
      })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
