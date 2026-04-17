import { NextRequest, NextResponse } from 'next/server';
import { validateEmail } from '../../../lib/sanitize';
import { sendWhitepaperConfirmation } from '../../../lib/email';

interface WhitepaperCapturePayload {
  email: string;
  fullName: string;
  organization: string;
  pdfBase64: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: WhitepaperCapturePayload = await request.json();

    // Validate required fields
    if (!body.email || !body.fullName || !body.organization || !body.pdfBase64) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const cleanEmail = validateEmail(body.email);
    if (!cleanEmail) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Sanitize inputs
    const fullName = body.fullName.slice(0, 255);
    const organization = body.organization.slice(0, 255);

    // Send confirmation email
    const emailResult = await sendWhitepaperConfirmation(cleanEmail, fullName, organization);

    // TODO: In production, also implement:
    // 1. Send email with PDF attachment using Resend
    // 2. Store lead information in database (Supabase)
    // 3. Log analytics event

    if (!emailResult.success) {
      console.warn('[whitepaper-capture] Email send failed:', emailResult.error);
      // Still return success to client, but log the error
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Whitepaper request received. PDF is generated on client side.',
        email_sent: emailResult.success,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing whitepaper capture:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
