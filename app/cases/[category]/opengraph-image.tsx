import { ImageResponse } from 'next/og';
import { SITS } from '../../../lib/data';

export const runtime = 'nodejs';
export const alt = 'MyCaseValue Category Data';
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

async function getCategoryStats(categoryId: string) {
  const category = SITS.find((c) => c.id === categoryId);

  if (!category) {
    return null;
  }

  // Dynamically import real data to avoid build-time bloat
  const { MOCK_DATA } = await import('../../../lib/data');

  // Get all NOS codes for this category
  const nosCodes = category.opts.map((opt) => opt.nos);

  // Aggregate stats from MOCK_DATA
  let totalCases = 0;
  let totalWins = 0;
  let avgWinRate = 0;
  const validCodes: string[] = [];

  nosCodes.forEach((code) => {
    if (MOCK_DATA[code]) {
      const data = MOCK_DATA[code];
      totalCases += data.total || 0;
      totalWins += (data.wr / 100) * (data.total || 0);
      validCodes.push(code);
    }
  });

  if (validCodes.length > 0) {
    avgWinRate = (totalWins / totalCases) * 100;
  }

  return {
    name: category.label,
    caseTypeCount: category.opts.length,
    totalCases,
    avgWinRate: avgWinRate.toFixed(1),
  };
}

export default async function Image({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const stats = await getCategoryStats(category);

  if (!stats) {
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
          Category not found
        </div>
      ),
      size
    );
  }

  const fonts = await getOutfitFonts();
  const caseCount = stats.totalCases.toLocaleString('en-US');

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
            background: 'radial-gradient(circle, rgba(230, 92, 0, 0.15) 0%, transparent 70%)',
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

        {/* Center: Category Name */}
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
            {stats.name}
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
              Avg Win Rate
            </div>
            <div
              style={{
                fontSize: '42px',
                fontWeight: '600',
                color: '#0A50A2',
              }}
            >
              {stats.avgWinRate}%
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
              Total Cases
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

          {/* Case Types Card */}
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
              Case Types
            </div>
            <div
              style={{
                fontSize: '42px',
                fontWeight: '600',
                color: '#0A50A2',
              }}
            >
              {stats.caseTypeCount}
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
