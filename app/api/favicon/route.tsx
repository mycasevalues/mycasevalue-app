import { ImageResponse } from '@vercel/og';

export const runtime = 'edge';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const rate = searchParams.get('rate');

  // Parse rate as a number, default to 50 if invalid
  const rateNum = rate ? parseFloat(rate) : 50;
  const displayRate = Math.min(Math.max(rateNum, 0), 100);

  // Format text: 100 shows smaller, others centered
  const isHundred = displayRate === 100;
  const fontSize = isHundred ? 16 : 24;
  const displayText = Math.round(displayRate).toString();

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          backgroundColor: '#18181A',
          borderRadius: '4px',
          color: '#C4882A',
          fontFamily: 'monospace',
          fontWeight: 700,
          fontSize: `${fontSize}px`,
          lineHeight: 1,
        }}
      >
        {displayText}
      </div>
    ),
    {
      width: 32,
      height: 32,
    }
  );
}
