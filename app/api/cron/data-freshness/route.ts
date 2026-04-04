import { NextResponse } from 'next/server';

export async function GET() {
  console.log(`[${new Date().toISOString()}] Quarterly FJC data freshness reminder.`);

  if (process.env.RESEND_API_KEY) {
    try {
      await fetch('https://api.resend.com/emails', {
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
    } catch (e) {
      console.error('Failed to send reminder:', e);
    }
  }

  return NextResponse.json({ ok: true, checked: new Date().toISOString() });
}
