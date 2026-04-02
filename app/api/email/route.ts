import { NextRequest, NextResponse } from 'next/server';
import { rateLimit, getClientIp } from '../../../lib/rate-limit';
import {
  sendWelcomeEmail,
  sendReportEmail,
  sendPaymentConfirmation,
  EmailLanguage,
  EmailType,
} from '../../../lib/email';

export const dynamic = 'force-dynamic';

interface EmailRequest {
  to: string;
  type: EmailType;
  lang?: EmailLanguage;
  data?: any;
}

export async function POST(req: NextRequest) {
  // Rate limiting: 10 requests per minute per IP
  const ip = getClientIp(req.headers);
  const { success } = rateLimit(ip, { windowMs: 60000, maxRequests: 10 });
  if (!success) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  try {
    const body: EmailRequest = await req.json();
    const { to, type, lang = 'en', data } = body;

    // Validate required fields
    if (!to || !type) {
      return NextResponse.json(
        { error: 'Missing required fields: to, type' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(to)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    // Validate language
    if (!['en', 'es'].includes(lang)) {
      return NextResponse.json({ error: 'Invalid language. Use "en" or "es"' }, { status: 400 });
    }

    // Route to appropriate email function
    let result;
    switch (type) {
      case 'welcome':
        if (!data?.plan) {
          return NextResponse.json({ error: 'Missing plan in data for welcome email' }, { status: 400 });
        }
        result = await sendWelcomeEmail(to, data.plan, lang);
        break;

      case 'report':
        if (!data) {
          return NextResponse.json({ error: 'Missing data for report email' }, { status: 400 });
        }
        result = await sendReportEmail(to, data, lang);
        break;

      case 'payment':
        if (!data?.plan || typeof data?.amount !== 'number') {
          return NextResponse.json(
            { error: 'Missing or invalid plan/amount in data for payment email' },
            { status: 400 }
          );
        }
        result = await sendPaymentConfirmation(to, data.plan, data.amount, lang);
        break;

      default:
        return NextResponse.json(
          { error: 'Invalid email type. Use "welcome", "report", or "payment"' },
          { status: 400 }
        );
    }

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || 'Failed to send email' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Email sent to ${to}`,
      type,
    });
  } catch (err: any) {
    console.error('[Email API Error]', err?.message || err);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
