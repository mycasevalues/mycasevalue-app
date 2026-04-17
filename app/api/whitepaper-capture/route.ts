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

    // Production implementation plan:
    // 1. Send email with PDF attachment using Resend (requires Resend API)
    // 2. Store lead information in Supabase whitepaper_leads table
    //    - Fields: id, email, full_name, organization, pdf_sent, created_at
    // 3. Log analytics event to track conversion funnel
    // Note: PDF is currently generated client-side. Consider server-side generation for consistency.

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
