import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import WelcomeEmail from '../../../../emails/WelcomeEmail';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    // Verify webhook secret for Supabase database webhooks
    const authHeader = req.headers.get('authorization');
    const webhookSecret = process.env.SUPABASE_WEBHOOK_SECRET;
    if (!webhookSecret || authHeader !== `Bearer ${webhookSecret}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();

    // Supabase sends: { type: "INSERT", table: "users", record: {...}, ... }
    const record = body.record || body;
    const email = record.email;

    if (!email) {
      return NextResponse.json({ error: 'No email provided' }, { status: 400 });
    }

    const userName = email.split('@')[0] || 'there';

    const { data, error } = await resend.emails.send({
      from: 'MyCaseValue <welcome@mycasevalues.com>',
      to: email,
      subject: 'Welcome to MyCaseValue — Your Federal Court Intelligence Platform',
      react: WelcomeEmail({ userName }),
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (err) {
    console.error('[api/email/welcome] error:', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
