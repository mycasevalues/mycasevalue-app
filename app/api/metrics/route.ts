import { NextResponse } from 'next/server';

export const revalidate = 300; // Cache for 5 minutes

export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  let reportsGenerated = 0;

  if (url && key) {
    try {
      const { createClient } = await import('@supabase/supabase-js');
      const supabase = createClient(url, key);
      const { count } = await supabase
        .from('report_logs')
        .select('*', { count: 'exact', head: true });
      reportsGenerated = count ?? 0;
    } catch {
      // Fallback to 0
    }
  }

  return NextResponse.json({ reportsGenerated }, {
    headers: { 'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600' },
  });
}
