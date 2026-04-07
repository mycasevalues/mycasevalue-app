import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import AlertTriggered from '../../../../emails/AlertTriggered';

export const dynamic = 'force-dynamic';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    // Verify webhook secret for Supabase Realtime triggers
    const authHeader = req.headers.get('authorization');
    const webhookSecret = process.env.SUPABASE_WEBHOOK_SECRET;
    if (webhookSecret && authHeader !== `Bearer ${webhookSecret}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const record = body.record || body;

    const {
      user_email,
      alert_type,
      case_name,
      case_number,
      trigger_description,
      docket_url,
      case_type_nos,
    } = record;

    if (!user_email) {
      return NextResponse.json({ error: 'No user email' }, { status: 400 });
    }

    const userName = user_email.split('@')[0] || 'there';

    const { data, error } = await resend.emails.send({
      from: 'MyCaseValue <alerts@mycasevalues.com>',
      to: user_email,
      subject: `Alert: ${case_name || case_number || 'Case Activity Detected'}`,
      react: AlertTriggered({
        userName,
        alertType: alert_type || 'Docket Activity',
        caseName: case_name || 'Unknown',
        caseNumber: case_number || 'N/A',
        triggerDescription: trigger_description || 'New docket entry filed',
        docketUrl: docket_url || 'https://www.courtlistener.com',
        caseTypeUrl: case_type_nos
          ? `https://mycasevalues.com/nos/${case_type_nos}`
          : 'https://mycasevalues.com/search',
        triggeredAt: new Date().toLocaleString(),
      }),
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ error: 'Failed to send alert email' }, { status: 500 });
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (err) {
    console.error('[api/email/alert] error:', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
