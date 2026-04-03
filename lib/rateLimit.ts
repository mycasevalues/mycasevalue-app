import { createServerClient } from '@supabase/ssr';

export async function checkFreeRateLimit(identifier: string): Promise<{ allowed: boolean; remaining: number }> {
  try {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { cookies: { get: () => undefined, set: () => {}, remove: () => {} } }
    );

    const today = new Date().toISOString().split('T')[0];

    const { data } = await supabase
      .from('rate_limits')
      .select('count')
      .eq('identifier', identifier)
      .eq('date', today)
      .single();

    const count = data?.count || 0;

    if (count >= 3) return { allowed: false, remaining: 0 };

    await supabase.from('rate_limits').upsert({
      identifier,
      date: today,
      count: count + 1,
    }, { onConflict: 'identifier,date' });

    return { allowed: true, remaining: 2 - count };
  } catch {
    return { allowed: true, remaining: 3 };
  }
}
