import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { nosCode: string; district: string } }
) {
  const { nosCode, district } = params;

  // Generate embed code HTML snippet
  const embedCode = `<iframe
  src="https://mycasevalues.com/widget/${nosCode}/${district}"
  width="280"
  height="160"
  frameborder="0"
  style="border: none; border-radius: 6px;"
  title="MyCaseValue Case Settlement Widget"
></iframe>`;

  return new NextResponse(embedCode, {
    status: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
