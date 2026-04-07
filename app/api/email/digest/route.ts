import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { getSupabaseAdmin } from '../../../../lib/supabase';
import WeeklyDigest from '../../../../emails/WeeklyDigest';

export const dynamic = 'force-dynamic';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    // Verify cron secret
    const authHeader = req.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET;
    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const adminDb = getSupabaseAdmin();

    // Get all subscribed users
    const { data: subscribers } = await adminDb
      .from('digest_subscribers')
      .select('email, case_types, districts')
      .eq('active', true);

    if (!subscribers || subscribers.length === 0) {
      return NextResponse.json({ message: 'No subscribers', sent: 0 });
    }

    const weekOf = new Date().toLocaleDateString('en-US', {
      month: 'long', day: 'numeric', year: 'numeric',
    });

    let sentCount = 0;

    for (const sub of subscribers) {
      try {
        const userName = sub.email.split('@')[0] || 'there';

        await resend.emails.send({
          from: 'MyCaseValue <digest@mycasevalues.com>',
          to: sub.email,
          subject: `Federal Court Intelligence Digest — ${weekOf}`,
          react: WeeklyDigest({
            userName,
            weekOf,
            caseTypeUpdates: [],
            recentOpinions: [],
            platformUpdates: ['New attorney tools: Deposition Prep and Discovery Generator now available'],
          }),
        });

        sentCount++;
      } catch (err) {
        console.error(`Failed to send digest to ${sub.email}:`, err);
      }
    }

    return NextResponse.json({ success: true, sent: sentCount });
  } catch (err) {
    console.error('[api/email/digest] error:', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
