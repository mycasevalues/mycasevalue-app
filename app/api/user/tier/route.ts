import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';
import { getUserTier } from '../../../../lib/access';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      return NextResponse.json({ tier: 'free', email: null }, { status: 200 });
    }

    const cookieStore = await cookies();
    const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll() {},
      },
    });

    const { data: { user } } = await supabase.auth.getUser();

    if (!user || !user.email) {
      return NextResponse.json({ tier: 'free', email: null }, { status: 200 });
    }

    const tier = await getUserTier(user.email);

    return NextResponse.json({ tier, email: user.email }, { status: 200 });
  } catch (err: unknown) {
    console.error('[api/user/tier] Error fetching tier:', err instanceof Error ? err.message : err);
    return NextResponse.json({ tier: 'free', email: null }, { status: 200 });
  }
}
