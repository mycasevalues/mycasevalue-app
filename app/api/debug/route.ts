import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!url || !serviceKey) {
      return NextResponse.json({ error: 'Missing env vars', hasUrl: !!url, hasKey: !!serviceKey });
    }

    const supabase = createClient(url, serviceKey);

    // 1. List all public tables
    const { data: tables, error: tablesErr } = await supabase.rpc('', undefined).select('*');
    // Use raw SQL via the REST endpoint
    const tablesRes = await fetch(`${url}/rest/v1/rpc/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': serviceKey,
        'Authorization': `Bearer ${serviceKey}`,
      },
    });

    // Alternative: query information_schema via PostgREST
    // PostgREST doesn't expose information_schema, so let's query the tables we know about

    // 2. Check premium_sessions exists by querying it
    const { data: psData, error: psError, count: psCount } = await supabase
      .from('premium_sessions')
      .select('*', { count: 'exact', head: false })
      .limit(5);

    // 3. Check premium_sessions columns by fetching one row structure
    const { data: colCheck, error: colError } = await supabase
      .from('premium_sessions')
      .select('email, plan, granted_at, expires_at, stripe_customer_id, stripe_subscription_id, created_at, updated_at')
      .limit(0);

    // 4. Check all public tables by trying to select from known tables
    const knownTables = [
      'premium_sessions', 'case_stats', 'circuit_stats', 'ingestion_log',
      'judge_stats', 'money_distributions', 'opinions', 'outcome_distributions',
      'raw_cases', 'state_stats', 'stats_cache', 'trending_case_types'
    ];
    const tableChecks: Record<string, { exists: boolean; count?: number; error?: string }> = {};
    for (const t of knownTables) {
      const { count, error } = await supabase.from(t).select('*', { count: 'exact', head: true });
      tableChecks[t] = { exists: !error, count: count ?? undefined, error: error?.message };
    }

    // 5. Check RLS - try to query with anon key (should be restricted)
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    let rlsCheck = 'not tested';
    if (anonKey) {
      const anonClient = createClient(url, anonKey);
      const { data: anonData, error: anonErr } = await anonClient
        .from('premium_sessions')
        .select('*')
        .limit(5);
      rlsCheck = anonErr
        ? `RLS blocking: ${anonErr.message}`
        : `RLS allowed ${anonData?.length ?? 0} rows (may indicate RLS not working)`;
    }

    return NextResponse.json({
      tables: tableChecks,
      premium_sessions: {
        exists: !psError,
        row_count: psCount,
        sample_rows: psData,
        columns: colError ? `Error: ${colError.message}` : 'email, plan, granted_at, expires_at, stripe_customer_id, stripe_subscription_id, created_at, updated_at',
        error: psError?.message,
      },
      rls_check: rlsCheck,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Unknown error' }, { status: 500 });
  }
}
