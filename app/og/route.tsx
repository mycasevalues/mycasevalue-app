import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  try {
    // Parse query parameters
    const searchParams = request.nextUrl.searchParams;
    const type = searchParams.get('type') || 'MyCaseValue';
    const winRate = searchParams.get('winRate') || '52.3';
    const cases = searchParams.get('cases') || '45000';
    const recovery = searchParams.get('recovery') || '$125K-$450K';
    const lang = searchParams.get('lang') || 'en';

    // Spanish translations
    const translations = {
      en: {
        tagline: 'Real Federal Court Data',
        winRate: 'Win Rate',
        cases: 'Cases',
        recovery: 'Recovery Range',
        url: 'mycasevalues.com',
      },
      es: {
        tagline: 'Datos Reales de Cortes Federales',
        winRate: 'Tasa de Ganancia',
        cases: 'Casos',
        recovery: 'Rango de Recuperación',
        url: 'mycasevalues.com',
      },
    };

    const t = translations[lang as keyof typeof translations] || translations.en;

    const formattedCases = parseInt(cases as string)
      .toLocaleString('en-US')
      .replace(/,/g, ',');

    return new ImageResponse(
      (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '1200px',
            height: '630px',
            background: '#1B3A5C',
            color: '#ffffff',
            fontFamily: '"Outfit", system-ui, sans-serif',
            padding: '60px',
            boxSizing: 'border-box',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Gradient accent background */}
          <div
            style={{
              position: 'absolute',
              top: '-100px',
              right: '-100px',
              width: '400px',
              height: '400px',
              background: 'radial-gradient(circle, rgba(232, 23, 31, 0.15) 0%, transparent 70%)',
              borderRadius: '50%',
            }}
          />

          {/* Header: Logo + Tagline */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              marginBottom: '60px',
              zIndex: 2,
            }}
          >
            <div
              style={{
                fontSize: '32px',
                fontWeight: '600',
                letterSpacing: '-0.5px',
                color: '#ffffff',
              }}
            >
              MyCaseValue
            </div>
            <div
              style={{
                fontSize: '18px',
                color: '#a0a9d4',
                marginTop: '8px',
                fontWeight: '400',
              }}
            >
              {t.tagline}
            </div>
          </div>

          {/* Center: Case Type Name */}
          <div
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              marginBottom: '60px',
              zIndex: 2,
            }}
          >
            <div
              style={{
                fontSize: '72px',
                fontWeight: '800',
                lineHeight: '1.1',
                maxWidth: '900px',
                letterSpacing: '-1px',
                color: '#ffffff',
              }}
            >
              {decodeURIComponent(type as string)}
            </div>
          </div>

          {/* Bottom: Stats Cards */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              gap: '40px',
              zIndex: 2,
            }}
          >
            {/* Win Rate Card */}
            <div
              style={{
                flex: 1,
                background: 'rgba(139, 92, 246, 0.1)',
                border: '1px solid rgba(139, 92, 246, 0.25)',
                borderRadius: '12px',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div
                style={{
                  fontSize: '16px',
                  color: '#a0a9d4',
                  fontWeight: '500',
                  marginBottom: '12px',
                }}
              >
                {t.winRate}
              </div>
              <div
                style={{
                  fontSize: '48px',
                  fontWeight: '600',
                  color: '#8B5CF6',
                }}
              >
                {winRate}%
              </div>
            </div>

            {/* Cases Card */}
            <div
              style={{
                flex: 1,
                background: 'rgba(139, 92, 246, 0.1)',
                border: '1px solid rgba(139, 92, 246, 0.25)',
                borderRadius: '12px',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div
                style={{
                  fontSize: '16px',
                  color: '#a0a9d4',
                  fontWeight: '500',
                  marginBottom: '12px',
                }}
              >
                {t.cases}
              </div>
              <div
                style={{
                  fontSize: '48px',
                  fontWeight: '600',
                  color: '#8B5CF6',
                }}
              >
                {parseInt(cases as string).toLocaleString('en-US')}
              </div>
            </div>

            {/* Recovery Card */}
            <div
              style={{
                flex: 1,
                background: 'rgba(139, 92, 246, 0.1)',
                border: '1px solid rgba(139, 92, 246, 0.25)',
                borderRadius: '12px',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div
                style={{
                  fontSize: '16px',
                  color: '#a0a9d4',
                  fontWeight: '500',
                  marginBottom: '12px',
                }}
              >
                {t.recovery}
              </div>
              <div
                style={{
                  fontSize: '48px',
                  fontWeight: '600',
                  color: '#8B5CF6',
                }}
              >
                {decodeURIComponent(recovery as string)}
              </div>
            </div>
          </div>

          {/* Footer: URL */}
          <div
            style={{
              position: 'absolute',
              bottom: '30px',
              left: '60px',
              fontSize: '18px',
              color: '#a0a9d4',
              fontWeight: '500',
              zIndex: 2,
            }}
          >
            {t.url}
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: 'Roboto',
            data: await fetch(new URL('../../public/fonts/outfit-700.woff2', import.meta.url)).then((res) =>
              res.arrayBuffer()
            ),
            weight: 700,
            style: 'normal',
          },
          {
            name: 'Roboto',
            data: await fetch(new URL('../../public/fonts/outfit-400.woff2', import.meta.url)).then((res) =>
              res.arrayBuffer()
            ),
            weight: 400,
            style: 'normal',
          },
          {
            name: 'Roboto',
            data: await fetch(new URL('../../public/fonts/outfit-500.woff2', import.meta.url)).then((res) =>
              res.arrayBuffer()
            ),
            weight: 500,
            style: 'normal',
          },
          {
            name: 'Roboto',
            data: await fetch(new URL('../../public/fonts/outfit-800.woff2', import.meta.url)).then((res) =>
              res.arrayBuffer()
            ),
            weight: 800,
            style: 'normal',
          },
        ],
      }
    );
  } catch (error) {
    // Fallback default image
    return new ImageResponse(
      (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '1200px',
            height: '630px',
            background: '#1B3A5C',
            color: '#ffffff',
            fontFamily: 'system-ui, sans-serif',
            padding: '60px',
            boxSizing: 'border-box',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: '64px', fontWeight: 'bold', marginBottom: '20px', color: '#ffffff' }}>
            MyCaseValue
          </div>
          <div style={{ fontSize: '32px', color: '#a0a9d4' }}>
            Real Federal Court Data for Your Case
          </div>
          <div style={{ fontSize: '18px', color: '#a0a9d4', marginTop: '40px' }}>
            mycasevalues.com
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  }
}
