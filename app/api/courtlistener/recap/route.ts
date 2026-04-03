import { NextRequest, NextResponse } from 'next/server';
import { searchRECAPDockets } from '../../../../lib/courtlistener';

export const revalidate = 86400;

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get('q') || '';
  if (!query) return NextResponse.json({ results: [] });
  const results = await searchRECAPDockets(query, 5);
  return NextResponse.json({ results });
}
