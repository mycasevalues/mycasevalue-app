import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    total_cases: 4168590,
    last_updated: '2025-12-01',
  });
}
