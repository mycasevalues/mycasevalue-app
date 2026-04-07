import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { nos_code, district, widget_type = 'compact' } = body;

    // Extract referer domain from Referer header
    const referer = request.headers.get('referer') || '';
    let referer_domain = null;
    if (referer) {
      try {
        const url = new URL(referer);
        referer_domain = url.hostname;
      } catch {
        // Invalid referer URL, skip
      }
    }

    if (process.env.NODE_ENV === 'production') {
      // Insert to Supabase in production
      if (!supabaseUrl || !supabaseAnonKey) {
        console.error('Supabase credentials missing');
        return NextResponse.json({ error: 'Database unavailable' }, { status: 500 });
      }

      const supabase = createClient(supabaseUrl, supabaseAnonKey);
      const { error } = await supabase.from('widget_impressions').insert([
        {
          nos_code,
          district: district || null,
          referer_domain,
          widget_type,
          created_at: new Date().toISOString(),
        },
      ]);

      if (error) {
        console.error('Error inserting widget impression:', error);
        return NextResponse.json({ error: 'Failed to log impression' }, { status: 500 });
      }
    } else {
      // Log to console in dev
      console.log('Widget Impression:', {
        nos_code,
        district,
        referer_domain,
        widget_type,
        timestamp: new Date().toISOString(),
      });
    }

    return NextResponse.json({}, { status: 204 });
  } catch (error) {
    console.error('Error in widget impression endpoint:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
