import { ImageResponse } from 'next/og';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get('title') || 'Federal Court Outcome Data';
    const category = searchParams.get('category') || 'court outcomes';

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
            background: `linear-gradient(135deg, #0B1221 0%, #131B2E 100%)`,
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
                linear-gradient(rgba(64, 64, 242, 0.03) 1px, transparent 1px),
                linear-gradient(90deg, rgba(64, 64, 242, 0.03) 1px, transparent 1px)
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
              <circle cx="8" cy="14" r="4.5" fill="#4F46E5" />
              {/* Slash */}
              <line
                x1="18"
                y1="6"
                x2="10"
                y2="22"
                stroke="#4F46E5"
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
              fontWeight: '700',
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
              <span style={{ color: '#4F46E5', fontWeight: '700' }}>4.2M+</span>
              <span style={{ color: '#a0a9d4' }}>Cases</span>
            </div>
            <div style={{ color: '#4F46E5' }}>•</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: '#4F46E5', fontWeight: '700' }}>50+</span>
              <span style={{ color: '#a0a9d4' }}>Years</span>
            </div>
            <div style={{ color: '#4F46E5' }}>•</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: '#4F46E5', fontWeight: '700' }}>94</span>
              <span style={{ color: '#a0a9d4' }}>Districts</span>
            </div>
          </div>

          {/* Accent Line */}
          <div
            style={{
              width: '100px',
              height: '3px',
              background: 'linear-gradient(90deg, #4F46E5 0%, transparent 100%)',
              marginTop: '32px',
              position: 'relative',
              zIndex: 1,
              borderRadius: '2px',
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
    console.error('OG image generation error:', error);
    return new Response('Failed to generate OG image', { status: 500 });
  }
}
