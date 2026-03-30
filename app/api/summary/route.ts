import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    total_cases: 4200000,
    last_updated: '2026-03-15',
  });
}
