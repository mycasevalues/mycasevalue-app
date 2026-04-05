/**
 * GET /api/admin/stats — Admin dashboard stats
 * Protected by x-admin-secret header.
 * Returns user count, subscriber count, and paid session count.
 */
import { NextRequest, NextResponse } from 'next/server';
import { secureCompare } from '../../../../lib/sanitize';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const secret = req.headers.get('x-admin-secret');
  const expected = process.env.ADMIN_SECRET;

  if (!expected || !secret || !secureCompare(secret, expected)) {
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

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayISO = today.toISOString();
    const last7d = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

    // Run queries in parallel for comprehensive dashboard
    const [subscribersRes, sessionsRes, leadsRes, reportsRes, analyticsRes, pollsRes] = await Promise.allSettled([
      supabase.from('newsletter_subscribers').select('*', { count: 'exact', head: true }),
      supabase.from('premium_sessions').select('*', { count: 'exact', head: true }),
      supabase.from('email_leads').select('*', { count: 'exact', head: true }),
      supabase.from('report_logs').select('*', { count: 'exact', head: true }).gte('created_at', todayISO),
      supabase.from('analytics_events').select('*', { count: 'exact', head: true }).gte('created_at', last7d),
      supabase.from('poll_votes').select('*', { count: 'exact', head: true }),
    ]);

    const subscribers = subscribersRes.status === 'fulfilled' ? (subscribersRes.value.count ?? 0) : 0;
    const paid_sessions = sessionsRes.status === 'fulfilled' ? (sessionsRes.value.count ?? 0) : 0;
    const email_leads = leadsRes.status === 'fulfilled' ? (leadsRes.value.count ?? 0) : 0;
    const reports_today = reportsRes.status === 'fulfilled' ? (reportsRes.value.count ?? 0) : 0;
    const events_7d = analyticsRes.status === 'fulfilled' ? (analyticsRes.value.count ?? 0) : 0;
    const total_polls = pollsRes.status === 'fulfilled' ? (pollsRes.value.count ?? 0) : 0;

    return NextResponse.json({
      subscribers,
      paid_sessions,
      email_leads,
      reports_today,
      events_7d,
      total_polls,
      timestamp: new Date().toISOString(),
    });
  } catch (err: any) {
    console.error('[api/admin/stats] Error:', err.message || err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
