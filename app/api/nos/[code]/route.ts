export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';

/**
 * GET /api/nos/[code]
 * Proxy to /api/data?type=case&nos=[code]
 * Validates NOS code format before proxying.
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { code: string } }
) {
  const nos = params.code;

  // Validate NOS code: must be 1-4 digits only
  if (!nos || !/^\d{1,4}$/.test(nos)) {
    return NextResponse.json(
      { error: 'Invalid NOS code. Must be 1-4 digits.' },
      { status: 400 }
    );
  }

  const origin = request.nextUrl.origin;

  try {
    const res = await fetch(`${origin}/api/data?type=case&nos=${encodeURIComponent(nos)}`);
    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ source: 'static', data: null });
  }
}
