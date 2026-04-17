import { ImageResponse } from 'next/og';

export const runtime = 'nodejs';
export const alt = 'MyCaseValue Case Data';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

async function getOutfitFonts() {
  return {
    bold: await fetch(
      new URL('../../../public/fonts/outfit-700.woff2', import.meta.url)
    ).then((res) => res.arrayBuffer()),
    regular: await fetch(
      new URL('../../../public/fonts/outfit-400.woff2', import.meta.url)
    ).then((res) => res.arrayBuffer()),
    medium: await fetch(
      new URL('../../../public/fonts/outfit-500.woff2', import.meta.url)
    ).then((res) => res.arrayBuffer()),
    extrabold: await fetch(
      new URL('../../../public/fonts/outfit-800.woff2', import.meta.url)
    ).then((res) => res.arrayBuffer()),
  };
}

function formatRecoveryRange(rng: { lo: number; md: number; hi: number }): string {
  const formatNum = (n: number) => {
    if (n >= 1000) return `$${(n / 1000).toFixed(0)}K`;
    return `$${n}`;
  };
  return `${formatNum(rng.lo)}-${formatNum(rng.hi)}`;
}

export default async function Image({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;

  // Dynamically import real data to avoid build-time bloat
  const { MOCK_DATA } = await import('../../../lib/data');
  const caseData = MOCK_DATA[code];

  if (!caseData) {
    return new ImageResponse(
      (
        <div
          style={{
            display: 'flex',
            width: '100%',
            height: '100%',
            background: '#18181A',
            color: '#ffffff',
            fontFamily: 'Inter, sans-serif',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '48px',
            fontWeight: 'bold',
          }}
        >
          Case type not found
        </div>
      ),
      size
    );
  }

  const fonts = await getOutfitFonts();
  const recovery = formatRecoveryRange(caseData.rng);
  const winRate = caseData.wr.toFixed(1);
  const caseCount = caseData.total.toLocaleString('en-US');

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '100%',
          background: '#18181A',
          color: '#ffffff',
          fontFamily: 'Inter, sans-serif',
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
            background: 'rgba(0, 82, 204, 0.1)',
            borderRadius: '50%',
          }}
        />

        {/* Header: Logo + Tagline */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            marginBottom: '40px',
            zIndex: 2,
          }}
        >
          <div
            style={{
              fontSize: '28px',
              fontWeight: '600',
              letterSpacing: '-0.5px',
              color: '#ffffff',
            }}
          >
            MyCaseValue
          </div>
          <div
            style={{
              fontSize: '16px',
              color: '#a0a9d4',
              marginTop: '6px',
              fontWeight: '400',
            }}
          >
            Real Federal Court Data
          </div>
        </div>

        {/* Center: Case Type Name */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            marginBottom: '50px',
            zIndex: 2,
          }}
        >
          <div
            style={{
              fontSize: '64px',
              fontWeight: '800',
              lineHeight: '1.2',
              maxWidth: '900px',
              letterSpacing: '-1px',
              color: '#ffffff',
            }}
          >
            {caseData.label}
          </div>
        </div>

        {/* Bottom: Stats Cards */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: '30px',
            zIndex: 2,
          }}
        >
          {/* Win Rate Card */}
          <div
            style={{
              flex: 1,
              background: 'rgba(0, 82, 204, 0.1)',
              border: '1px solid rgba(0, 82, 204, 0.25)',
              borderRadius: '4px',
              padding: '18px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div
              style={{
                fontSize: '14px',
                color: '#a0a9d4',
                fontWeight: '500',
                marginBottom: '10px',
              }}
            >
              Win Rate
            </div>
            <div
              style={{
                fontSize: '42px',
                fontWeight: '600',
                color: '#0A50A2',
              }}
            >
              {winRate}%
            </div>
          </div>

          {/* Cases Card */}
          <div
            style={{
              flex: 1,
              background: 'rgba(0, 82, 204, 0.1)',
              border: '1px solid rgba(0, 82, 204, 0.25)',
              borderRadius: '4px',
              padding: '18px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div
              style={{
                fontSize: '14px',
                color: '#a0a9d4',
                fontWeight: '500',
                marginBottom: '10px',
              }}
            >
              Cases
            </div>
            <div
              style={{
                fontSize: '42px',
                fontWeight: '600',
                color: '#0A50A2',
              }}
            >
              {caseCount}
            </div>
          </div>

          {/* Recovery Card */}
          <div
            style={{
              flex: 1,
              background: 'rgba(0, 82, 204, 0.1)',
              border: '1px solid rgba(0, 82, 204, 0.25)',
              borderRadius: '4px',
              padding: '18px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div
              style={{
                fontSize: '14px',
                color: '#a0a9d4',
                fontWeight: '500',
                marginBottom: '10px',
              }}
            >
              Recovery Range
            </div>
            <div
              style={{
                fontSize: '42px',
                fontWeight: '600',
                color: '#0A50A2',
              }}
            >
              {recovery}
            </div>
          </div>
        </div>

        {/* Footer: URL */}
        <div
          style={{
            position: 'absolute',
            bottom: '30px',
            left: '60px',
            fontSize: '16px',
            color: '#a0a9d4',
            fontWeight: '500',
            zIndex: 2,
          }}
        >
          mycasevalues.com
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'Inter',
          data: fonts.bold,
          weight: 700,
          style: 'normal',
        },
        {
          name: 'Inter',
          data: fonts.regular,
          weight: 400,
          style: 'normal',
        },
        {
          name: 'Inter',
          data: fonts.medium,
          weight: 500,
          style: 'normal',
        },
        {
          name: 'Inter',
          data: fonts.extrabold,
          weight: 800,
          style: 'normal',
        },
      ],
    }
  );
}
