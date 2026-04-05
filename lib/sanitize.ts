/**
 * MyCaseValue — Input Sanitization & Validation Utilities
 *
 * Centralized validation for all API route inputs.
 * Every public-facing parameter should pass through one of these helpers
 * before touching a database query, AI prompt, or response body.
 */

import { timingSafeEqual } from 'crypto';

// ─── String Sanitization ────────────────────────────────────────

/**
 * Strip HTML/script tags and trim whitespace.
 * Use on any user-provided string before storage or display.
 */
export function sanitizeString(input: unknown, maxLength = 500): string {
  if (typeof input !== 'string') return '';
  return input
    .replace(/<[^>]*>/g, '')       // strip HTML tags
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g, '') // strip control chars (keep \n \r \t)
    .trim()
    .slice(0, maxLength);
}

/**
 * Escape text before embedding in an AI prompt.
 * Wraps content in delimiters to reduce prompt-injection risk.
 */
export function sanitizeForPrompt(input: string, maxLength = 3000): string {
  const cleaned = sanitizeString(input, maxLength);
  // Replace sequences that could break prompt structure
  return cleaned
    .replace(/\[INST\]/gi, '')
    .replace(/\[\/INST\]/gi, '')
    .replace(/<\|.*?\|>/g, '')      // strip special tokens
    .replace(/```/g, "'''");        // prevent code fence injection
}

// ─── Type Validators ────────────────────────────────────────────

/**
 * Validate that a value is one of the allowed options (enum/whitelist).
 * Returns the value if valid, or the defaultValue if not.
 */
export function validateEnum<T extends string>(
  value: unknown,
  allowed: readonly T[],
  defaultValue: T
): T {
  if (typeof value !== 'string') return defaultValue;
  return allowed.includes(value as T) ? (value as T) : defaultValue;
}

/**
 * Validate and parse a positive integer within a range.
 * Returns null if invalid.
 */
export function validatePositiveInt(
  value: unknown,
  min = 1,
  max = 999999
): number | null {
  const num = typeof value === 'string' ? parseInt(value, 10) : typeof value === 'number' ? value : NaN;
  if (isNaN(num) || !isFinite(num) || num < min || num > max || num !== Math.floor(num)) {
    return null;
  }
  return num;
}

/**
 * Validate a NOS (Nature of Suit) code: 1-4 digit string.
 */
export function validateNOSCode(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  if (!/^\d{1,4}$/.test(trimmed)) return null;
  return trimmed;
}

/**
 * Validate an email address. Returns lowercase trimmed email or null.
 */
export function validateEmail(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  const trimmed = value.toLowerCase().trim();
  if (trimmed.length > 254) return null; // RFC 5321 max
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) return null;
  return trimmed;
}

/**
 * Validate a US state code (2-letter uppercase).
 */
const VALID_STATES = [
  'AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA',
  'HI','ID','IL','IN','IA','KS','KY','LA','ME','MD',
  'MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ',
  'NM','NY','NC','ND','OH','OK','OR','PA','RI','SC',
  'SD','TN','TX','UT','VT','VA','WA','WV','WI','WY',
  'DC','PR','VI','GU','AS','MP',
] as const;

export type USState = typeof VALID_STATES[number];

export function validateState(value: unknown): USState | null {
  if (typeof value !== 'string') return null;
  const upper = value.toUpperCase().trim() as USState;
  return (VALID_STATES as readonly string[]).includes(upper) ? upper : null;
}

/**
 * Validate a year (reasonable range for federal case data).
 */
export function validateYear(value: unknown): number | null {
  return validatePositiveInt(value, 1970, new Date().getFullYear() + 1);
}

/**
 * Validate a district court name. Only allow alphanumeric, spaces, hyphens, periods.
 */
export function validateDistrict(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim().slice(0, 100);
  if (!/^[a-zA-Z0-9\s.\-,()]+$/.test(trimmed)) return null;
  return trimmed;
}

/**
 * Validate a language code.
 */
const VALID_LANGUAGES = ['en', 'es'] as const;
export type Language = typeof VALID_LANGUAGES[number];

export function validateLanguage(value: unknown): Language {
  return validateEnum(value, VALID_LANGUAGES, 'en');
}

// ─── Object Sanitization ────────────────────────────────────────

/**
 * Deep-sanitize a plain object: strip HTML from string values,
 * remove __proto__ and constructor keys, enforce max depth.
 */
export function sanitizeObject(
  obj: unknown,
  maxDepth = 5,
  currentDepth = 0
): Record<string, unknown> {
  if (currentDepth >= maxDepth || typeof obj !== 'object' || obj === null) {
    return {};
  }

  const result: Record<string, unknown> = {};
  const dangerousKeys = ['__proto__', 'constructor', 'prototype'];

  for (const [key, value] of Object.entries(obj as Record<string, unknown>)) {
    // Skip dangerous keys (prototype pollution)
    if (dangerousKeys.includes(key)) continue;
    // Sanitize the key itself
    const safeKey = sanitizeString(key, 100);
    if (!safeKey) continue;

    if (typeof value === 'string') {
      result[safeKey] = sanitizeString(value, 1000);
    } else if (typeof value === 'number' && isFinite(value)) {
      result[safeKey] = value;
    } else if (typeof value === 'boolean') {
      result[safeKey] = value;
    } else if (Array.isArray(value)) {
      result[safeKey] = value.slice(0, 100).map(item =>
        typeof item === 'string'
          ? sanitizeString(item, 500)
          : typeof item === 'number' && isFinite(item)
          ? item
          : typeof item === 'boolean'
          ? item
          : typeof item === 'object' && item !== null
          ? sanitizeObject(item, maxDepth, currentDepth + 1)
          : null
      );
    } else if (typeof value === 'object' && value !== null) {
      result[safeKey] = sanitizeObject(value, maxDepth, currentDepth + 1);
    }
  }

  return result;
}

// ─── Security Utilities ─────────────────────────────────────────

/**
 * Constant-time string comparison for API keys / secrets.
 * Prevents timing attacks on authentication headers.
 */
export function secureCompare(a: string, b: string): boolean {
  if (typeof a !== 'string' || typeof b !== 'string') return false;
  // Pad to same length to avoid length-leak
  const bufA = Buffer.from(a.padEnd(256, '\0'));
  const bufB = Buffer.from(b.padEnd(256, '\0'));
  try {
    return bufA.length === bufB.length && timingSafeEqual(bufA, bufB);
  } catch {
    return false;
  }
}

/**
 * Validate a redirect URL to prevent open-redirect attacks.
 * Only allows relative paths starting with /.
 */
export function validateRedirectPath(value: unknown): string {
  if (typeof value !== 'string') return '/';
  const trimmed = value.trim();
  // Must start with / and must NOT start with // (protocol-relative URL)
  if (!trimmed.startsWith('/') || trimmed.startsWith('//')) return '/';
  // Strip any query params or fragments that could contain javascript:
  const pathOnly = trimmed.split('?')[0].split('#')[0];
  // Only allow path chars
  if (!/^[a-zA-Z0-9/\-._~]+$/.test(pathOnly)) return '/';
  return trimmed;
}

// ─── Request Helpers ────────────────────────────────────────────

/**
 * Safely parse JSON body from a NextRequest.
 * Returns { data, error } to avoid try/catch boilerplate in routes.
 */
export async function safeParseJSON<T = Record<string, unknown>>(
  request: Request
): Promise<{ data: T | null; error: string | null }> {
  try {
    const body = await request.json();
    if (typeof body !== 'object' || body === null) {
      return { data: null, error: 'Request body must be a JSON object' };
    }
    return { data: body as T, error: null };
  } catch {
    return { data: null, error: 'Invalid JSON in request body' };
  }
}
