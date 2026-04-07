import { NextRequest, NextResponse } from 'next/server';

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
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // TODO: In production, implement:
    // 1. Send email with PDF attachment using Resend
    // 2. Store lead information in database (Supabase)
    // 3. Log analytics event

    // For now, just acknowledge receipt
    return NextResponse.json(
      {
        success: true,
        message: 'Whitepaper request received. PDF is generated on client side.',
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
