import { NextRequest, NextResponse } from 'next/server';

/**
 * GET /api/nos/[code]
 * Proxy to /api/data?type=case&nos=[code]
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { code: string } }
) {
  const nos = params.code;
  const origin = request.nextUrl.origin;

  try {
    const res = await fetch(`${origin}/api/data?type=case&nos=${nos}`);
    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ source: 'static', data: null });
  }
}
