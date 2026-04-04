/**
 * GET /api/admin/stats — Admin dashboard stats
 * Protected by x-admin-secret header.
 * Returns user count, subscriber count, and paid session count.
 */
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const secret = req.headers.get('x-admin-secret');
  const expected = process.env.ADMIN_SECRET;

  if (!expected || secret !== expected) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!url || !key) {
      return NextResponse.json({
        users: 0,
        subscribers: 0,
        paid_sessions: 0,
        note: 'Supabase not configured',
      });
    }

    const { createClient } = await import('@supabase/supabase-js');
    const supabase = createClient(url, key);

    // Run queries in parallel
    const [usersRes, subscribersRes, sessionsRes] = await Promise.allSettled([
      supabase.from('auth_users_view').select('*', { count: 'exact', head: true }),
      supabase.from('newsletter_subscribers').select('*', { count: 'exact', head: true }),
      supabase.from('paid_sessions').select('*', { count: 'exact', head: true }),
    ]);

    const users = usersRes.status === 'fulfilled' ? (usersRes.value.count ?? 0) : 0;
    const subscribers = subscribersRes.status === 'fulfilled' ? (subscribersRes.value.count ?? 0) : 0;
    const paid_sessions = sessionsRes.status === 'fulfilled' ? (sessionsRes.value.count ?? 0) : 0;

    return NextResponse.json({
      users,
      subscribers,
      paid_sessions,
      timestamp: new Date().toISOString(),
    });
  } catch (err: any) {

    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
