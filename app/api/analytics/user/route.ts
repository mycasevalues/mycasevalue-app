import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '../../../../lib/supabase';

export const dynamic = 'force-dynamic';

/**
 * User Analytics API
 * Tracks tool usage, session data, popular case types, and conversion metrics.
 * Stores events in Supabase analytics_events table.
 */

type AnalyticsEvent = {
  event_type: 'tool_view' | 'tool_use' | 'search' | 'signup' | 'conversion' | 'page_view';
  tool_name?: string;
  nos_code?: string;
  metadata?: Record<string, unknown>;
  session_id?: string;
  user_agent?: string;
};

export async function POST(req: NextRequest) {
  try {
    const body: AnalyticsEvent = await req.json();

    if (!body.event_type) {
      return NextResponse.json({ error: 'event_type is required' }, { status: 400 });
    }

    const event = {
      event_type: body.event_type,
      tool_name: body.tool_name || null,
      nos_code: body.nos_code || null,
      metadata: body.metadata || {},
      session_id: body.session_id || null,
      user_agent: req.headers.get('user-agent') || null,
      ip_hash: null, // Could hash IP for privacy-safe geo tracking
      created_at: new Date().toISOString(),
    };

    try {
      const supabase = getSupabaseAdmin();
      await supabase.from('analytics_events').insert(event);
    } catch {
      // Supabase unavailable — log to console as fallback
      console.log('[analytics]', JSON.stringify(event));
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const period = searchParams.get('period') || '7d';
    const metric = searchParams.get('metric') || 'overview';

    const supabase = getSupabaseAdmin();

    // Calculate date range
    const days = period === '30d' ? 30 : period === '90d' ? 90 : 7;
    const since = new Date(Date.now() - days * 86400000).toISOString();

    if (metric === 'overview') {
      // Get aggregate stats
      const [toolViews, toolUses, searches, signups] = await Promise.all([
        supabase.from('analytics_events').select('id', { count: 'exact', head: true }).eq('event_type', 'tool_view').gte('created_at', since),
        supabase.from('analytics_events').select('id', { count: 'exact', head: true }).eq('event_type', 'tool_use').gte('created_at', since),
        supabase.from('analytics_events').select('id', { count: 'exact', head: true }).eq('event_type', 'search').gte('created_at', since),
        supabase.from('analytics_events').select('id', { count: 'exact', head: true }).eq('event_type', 'signup').gte('created_at', since),
      ]);

      return NextResponse.json({
        period,
        stats: {
          tool_views: toolViews.count || 0,
          tool_uses: toolUses.count || 0,
          searches: searches.count || 0,
          signups: signups.count || 0,
        },
      });
    }

    if (metric === 'popular_tools') {
      const { data } = await supabase
        .from('analytics_events')
        .select('tool_name')
        .eq('event_type', 'tool_use')
        .gte('created_at', since)
        .not('tool_name', 'is', null);

      // Aggregate by tool name
      const counts: Record<string, number> = {};
      (data || []).forEach((row: { tool_name: string }) => {
        counts[row.tool_name] = (counts[row.tool_name] || 0) + 1;
      });

      const sorted = Object.entries(counts)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 10)
        .map(([name, count]) => ({ tool_name: name, count }));

      return NextResponse.json({ period, popular_tools: sorted });
    }

    if (metric === 'popular_case_types') {
      const { data } = await supabase
        .from('analytics_events')
        .select('nos_code')
        .gte('created_at', since)
        .not('nos_code', 'is', null);

      const counts: Record<string, number> = {};
      (data || []).forEach((row: { nos_code: string }) => {
        counts[row.nos_code] = (counts[row.nos_code] || 0) + 1;
      });

      const sorted = Object.entries(counts)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 10)
        .map(([nos_code, count]) => ({ nos_code, count }));

      return NextResponse.json({ period, popular_case_types: sorted });
    }

    return NextResponse.json({ error: 'Unknown metric' }, { status: 400 });
  } catch (err) {
    console.error('[analytics GET]', err);
    return NextResponse.json({ error: 'Failed to fetch analytics' }, { status: 500 });
  }
}
