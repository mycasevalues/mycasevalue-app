import { ImageResponse } from 'next/og';
import { rateLimit, getClientIp } from '../../../lib/rate-limit';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Sanitization utility
function sanitizeInput(input: string | null, maxLength: number = 100): string {
  if (!input) return '';

  // Strip HTML tags, limit length, and escape special chars
  let sanitized = input
    .substring(0, maxLength)
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/[&<>"']/g, (char) => {
      const entities: { [key: string]: string } = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;'
      };
      return entities[char] || char;
    });

  return sanitized;
}

// Whitelist of allowed category values
const ALLOWED_CATEGORIES = new Set([
  'court outcomes',
  'federal courts',
  'case statistics',
  'litigation data',
  'judicial analytics',
  'case outcomes',
  'court cases',
  'legal analytics'
]);

export async function GET(request: Request) {
  try {
    const headers = {
      get: (name: string) => request.headers.get(name)
    } as any;
    const clientIp = getClientIp(headers);

    // Apply rate limiting: 30 req/min
    const rateLimitResult = rateLimit(clientIp, { windowMs: 60000, maxRequests: 30 });
    if (!rateLimitResult.success) {
      return new Response('Too many requests', { status: 429 });
    }

    const { searchParams } = new URL(request.url);
    let title = sanitizeInput(searchParams.get('title'), 100) || 'Federal Court Outcome Data';
    let category = sanitizeInput(searchParams.get('category'), 100) || 'court outcomes';

    // Validate category against whitelist
    if (!ALLOWED_CATEGORIES.has(category.toLowerCase())) {
      category = 'court outcomes'; // Default to safe value
    }

    return new ImageResponse(
      (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#1B3A5C',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Grid Pattern Overlay */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: `
                linear-gradient(rgba(10, 102, 194, 0.03) 1px, transparent 1px),
                linear-gradient(90deg, rgba(10, 102, 194, 0.03) 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px',
              pointerEvents: 'none',
            }}
          />

          {/* Logo Section */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '32px',
              position: 'relative',
              zIndex: 1,
            }}
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Dot */}
              <circle cx="8" cy="14" r="4.5" fill="#0A66C2" />
              {/* Slash */}
              <line
                x1="18"
                y1="6"
                x2="10"
                y2="22"
                stroke="#0A66C2"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
            <span
              style={{
                fontSize: '18px',
                fontWeight: '600',
                color: '#ffffff',
                letterSpacing: '-0.5px',
              }}
            >
              MyCaseValue
            </span>
          </div>

          {/* Main Headline */}
          <h1
            style={{
              fontSize: '56px',
              fontWeight: '600',
              color: '#ffffff',
              margin: '0 0 24px 0',
              textAlign: 'center',
              maxWidth: '90%',
              lineHeight: '1.2',
              letterSpacing: '-1px',
              position: 'relative',
              zIndex: 1,
            }}
          >
            {title}
          </h1>

          {/* Category Subtitle */}
          {category && (
            <div
              style={{
                fontSize: '16px',
                color: '#a0a9d4',
                marginBottom: '32px',
                fontWeight: '400',
                position: 'relative',
                zIndex: 1,
              }}
            >
              {category}
            </div>
          )}

          {/* Stats Line */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '32px',
              fontSize: '18px',
              fontWeight: '500',
              color: '#ffffff',
              marginTop: '16px',
              position: 'relative',
              zIndex: 1,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: '#0A66C2', fontWeight: '600' }}>5.1M+</span>
              <span style={{ color: '#a0a9d4' }}>Cases</span>
            </div>
            <div style={{ color: '#0A66C2' }}>•</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: '#0A66C2', fontWeight: '600' }}>84</span>
              <span style={{ color: '#a0a9d4' }}>Types</span>
            </div>
            <div style={{ color: '#0A66C2' }}>•</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: '#0A66C2', fontWeight: '600' }}>94</span>
              <span style={{ color: '#a0a9d4' }}>Districts</span>
            </div>
          </div>

          {/* Accent Line */}
          <div
            style={{
              width: '100px',
              height: '3px',
              background: 'linear-gradient(90deg, #0A66C2 0%, transparent 100%)',
              marginTop: '32px',
              position: 'relative',
              zIndex: 1,
              borderRadius: '12px',
            }}
          />
        </div>
      ),
      {
        width: 1200,
        height: 630,
      },
    );
  } catch (error) {
    return new Response('Failed to generate OG image', { status: 500 });
  }
}

/**
 * Task 1 Security Fixes Applied:
 * 1. Sanitized title and category parameters:
 *    - Strip HTML tags to prevent XSS
 *    - Limit to 100 characters max
 *    - Escape special characters (&, <, >, ", ')
 * 2. Category whitelist validation:
 *    - Only allow predefined safe category values
 *    - Default to 'court outcomes' if invalid
 * 3. Rate limiting:
 *    - Added 30 req/min limit to prevent abuse
 *    - Uses client IP for tracking
 * 4. Response size control:
 *    - Fixed dimensions (1200x630) prevent oversized responses
 */
