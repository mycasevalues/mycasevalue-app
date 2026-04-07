/**
 * Catch-all 404 handler for unknown API routes
 *
 * Returns a consistent JSON 404 response instead of Next.js's default
 * HTML error page. Prevents framework fingerprinting and provides
 * a clean error contract for API consumers.
 */

import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-api-key',
} as const;

function notFound(pathname: string) {
  return NextResponse.json(
    {
      error: 'Not Found',
      message: `No API route matches ${pathname}`,
    },
    { status: 404, headers: CORS_HEADERS }
  );
}

export async function GET(request: NextRequest) {
  return notFound(new URL(request.url).pathname);
}

export async function POST(request: NextRequest) {
  return notFound(new URL(request.url).pathname);
}

export async function PUT(request: NextRequest) {
  return notFound(new URL(request.url).pathname);
}

export async function DELETE(request: NextRequest) {
  return notFound(new URL(request.url).pathname);
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      ...CORS_HEADERS,
      'Access-Control-Max-Age': '86400',
    },
  });
}
