// Security utilities for input validation and sanitization
import { z } from 'zod';

// Content Security Policy builder
export function buildCSP(): string {
  const directives = {
    'default-src': ["'self'"],
    'script-src': ["'self'", "'unsafe-eval'", "'unsafe-inline'", 'https://vercel.live'],
    'style-src': ["'self'", "'unsafe-inline'"],
    'img-src': ["'self'", 'data:', 'blob:', 'https://*.supabase.co'],
    'font-src': ["'self'"],
    'connect-src': ["'self'", 'https://*.supabase.co', 'https://api.anthropic.com', 'https://www.courtlistener.com', 'https://api.bls.gov', 'https://api.govinfo.gov', 'https://vercel.live', 'wss://ws-us3.pusher.com'],
    'frame-ancestors': ["'none'"],
    'base-uri': ["'self'"],
    'form-action': ["'self'"],
  };

  return Object.entries(directives)
    .map(([key, values]) => `${key} ${values.join(' ')}`)
    .join('; ');
}

// XSS prevention
export function escapeHtml(str: string): string {
  const escapeMap: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;',
  };
  return str.replace(/[&<>"'/]/g, (char) => escapeMap[char] || char);
}

// SQL injection prevention for search queries
export function sanitizeSearchQuery(query: string): string {
  return query
    .replace(/[;'"\\]/g, '')
    .replace(/--/g, '')
    .replace(/\/\*/g, '')
    .replace(/\*\//g, '')
    .trim()
    .slice(0, 500);
}

// Rate limit key generator
export function generateRateLimitKey(ip: string, route: string): string {
  return `rl:${route}:${ip}`;
}

// CSRF token validation
export function validateCSRFToken(token: string | null, sessionToken: string | null): boolean {
  if (!token || !sessionToken) return false;
  return token === sessionToken;
}

// Input validation schemas
export const SecuritySchemas = {
  email: z.string().email().max(254),
  password: z.string().min(8).max(128),
  searchQuery: z.string().min(1).max(500).transform(sanitizeSearchQuery),
  nosCode: z.string().regex(/^\d{3}$/, 'NOS code must be 3 digits'),
  districtCode: z.string().regex(/^[A-Z]{2}(-[A-Z]{1,3})?$/, 'Invalid district code'),
  dateRange: z.object({
    start: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    end: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  }),
  pagination: z.object({
    page: z.number().int().min(1).max(1000).default(1),
    limit: z.number().int().min(1).max(100).default(20),
  }),
};

// Request origin validation
export function isAllowedOrigin(origin: string | null): boolean {
  if (!origin) return true; // Same-origin requests
  const allowed = [
    'https://mycasevalue.com',
    'https://www.mycasevalue.com',
    'https://mycasevalues.com',
    'https://www.mycasevalues.com',
    process.env.NEXT_PUBLIC_APP_URL,
  ].filter(Boolean);

  if (process.env.NODE_ENV === 'development') {
    allowed.push('http://localhost:3000', 'http://localhost:3001');
  }

  return allowed.includes(origin);
}
