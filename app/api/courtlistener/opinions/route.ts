import { NextRequest, NextResponse } from 'next/server';
import { searchOpinions } from '../../../../lib/courtlistener';

export const revalidate = 86400;

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get('q') || '';
  const court = req.nextUrl.searchParams.get('court') || undefined;
  if (!query) return NextResponse.json({ results: [] });
  const results = await searchOpinions(query, court, 5);
  return NextResponse.json({ results });
}
