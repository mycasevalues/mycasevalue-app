import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

/**
 * POST /api/notify/subscribe
 * Subscribe to notifications for a specific case type or state.
 */
export async function POST(request: NextRequest) {
  try {
    const { email, nos_code, state, frequency } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json({ success: false, error: 'Valid email required' }, { status: 400 });
    }

    const cleanEmail = email.toLowerCase().trim().slice(0, 255);
    const cleanFrequency = ['weekly', 'monthly', 'quarterly'].includes(frequency) ? frequency : 'monthly';

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (supabaseUrl && supabaseKey) {
      try {
        const supabase = createClient(supabaseUrl, supabaseKey);
        await supabase.from('notification_subscriptions').upsert({
          email: cleanEmail,
          nos_code: nos_code || null,
          state: state || null,
          frequency: cleanFrequency,
          active: true,
          created_at: new Date().toISOString(),
        }, { onConflict: 'email' });
      } catch (dbError) {
        console.error('Notify subscribe DB error:', dbError);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Subscribed successfully',
      frequency: cleanFrequency,
    });
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid request' }, { status: 400 });
  }
}
