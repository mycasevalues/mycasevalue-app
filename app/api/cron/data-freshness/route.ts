import { NextResponse } from 'next/server';

export async function GET() {
  if (process.env.RESEND_API_KEY) {
    try {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'MyCaseValue System <system@mycasevalues.com>',
          to: 'support@mycasevalue.com',
          subject: 'Quarterly: Check FJC IDB for new data',
          html: '<p>Check <a href="https://www.fjc.gov/research/idb">FJC IDB</a> for new data releases.</p>',
        }),
      });

      if (!res.ok) {
        console.error('[cron/data-freshness] Resend API returned', res.status, await res.text().catch(() => ''));
      }
    } catch (e) {
      console.error('[cron/data-freshness] Failed to send reminder email:', e instanceof Error ? e.message : e);
    }
  } else {
    console.warn('[cron/data-freshness] RESEND_API_KEY not configured, skipping email');
  }

  return NextResponse.json({ ok: true, checked: new Date().toISOString() });
}
