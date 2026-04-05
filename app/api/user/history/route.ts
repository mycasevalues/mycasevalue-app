import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { getUserTier } from '../../../../lib/access';
import { sanitizeString } from '../../../../lib/sanitize';

export async function POST(req: NextRequest) {
  try {
    const { query, category } = await req.json();
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      { cookies: { get: (n: string) => cookieStore.get(n)?.value, set: () => {}, remove: () => {} } }
    );
    const { data: { user } } = await supabase.auth.getUser();
    if (!user?.email) return NextResponse.json({ ok: false });

    // All features open to all users for now
    // const tier = await getUserTier(user.email);
    // if (tier === 'free') return NextResponse.json({ ok: false, error: 'Search history requires a paid plan' });

    const adminSupabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { cookies: { get: () => undefined, set: () => {}, remove: () => {} } }
    );

    // Sanitize inputs before DB insert
    const sanitizedQuery = sanitizeString(query || '', 500);
    const sanitizedCategory = sanitizeString(category || '', 100);

    await adminSupabase.from('search_history').insert({
      user_email: user.email.toLowerCase(),
      query: sanitizedQuery,
      category: sanitizedCategory || null,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false });
  }
}

export async function GET() {
  try {
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      { cookies: { get: (n: string) => cookieStore.get(n)?.value, set: () => {}, remove: () => {} } }
    );
    const { data: { user } } = await supabase.auth.getUser();
    if (!user?.email) return NextResponse.json({ history: [] });

    const adminSupabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { cookies: { get: () => undefined, set: () => {}, remove: () => {} } }
    );

    const { data } = await adminSupabase
      .from('search_history')
      .select('query, category, searched_at')
      .eq('user_email', user.email.toLowerCase())
      .order('searched_at', { ascending: false })
      .limit(100);

    return NextResponse.json({ history: data || [] });
  } catch {
    return NextResponse.json({ history: [] });
  }
}
