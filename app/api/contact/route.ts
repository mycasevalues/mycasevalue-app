import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '../../../lib/email';
import { rateLimit, getClientIp } from '../../../lib/rate-limit';
import { SITE_URL } from '../../../lib/site-config';

export const dynamic = 'force-dynamic';

interface ContactRequest {
  name: string;
  email: string;
  subject: string;
  message: string;
}

/**
 * POST /api/contact
 *
 * Accepts contact form submissions and sends them via Resend email service.
 * Includes rate limiting to prevent spam.
 *
 * Request body:
 * - name: string (required, 1-100 chars)
 * - email: string (required, valid email)
 * - subject: string (required, one of: general, support, enterprise, data, billing, feedback)
 * - message: string (required, 10-5000 chars)
 *
 * Response:
 * - { success: true, message: "Contact form submitted" }
 * - { error: string, status: 400/429/500 }
 */
export async function POST(req: NextRequest) {
  // Rate limiting: 5 requests per hour per IP
  const ip = getClientIp(req.headers);
  const { success } = rateLimit(ip, { windowMs: 3600000, maxRequests: 5 });

  if (!success) {
    return NextResponse.json(
      { error: 'Too many contact requests. Please try again later.' },
      { status: 429 }
    );
  }

  try {
    const body: ContactRequest = await req.json();
    const { name, email, subject, message } = body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields: name, email, subject, message' },
        { status: 400 }
      );
    }

    // Validate field lengths
    if (name.length < 1 || name.length > 100) {
      return NextResponse.json(
        { error: 'Name must be between 1 and 100 characters' },
        { status: 400 }
      );
    }

    if (message.length < 10 || message.length > 5000) {
      return NextResponse.json(
        { error: 'Message must be between 10 and 5000 characters' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate subject
    const validSubjects = ['general', 'support', 'enterprise', 'data', 'billing', 'feedback'];
    if (!validSubjects.includes(subject)) {
      return NextResponse.json(
        { error: 'Invalid subject. Must be one of: general, support, enterprise, data, billing, feedback' },
        { status: 400 }
      );
    }

    // Check if RESEND_API_KEY is configured
    if (!process.env.RESEND_API_KEY) {
      console.warn('[api/contact] RESEND_API_KEY not configured, contact form would fail in production');
      // Return success anyway in development to allow testing
      if (process.env.NODE_ENV === 'development') {
        console.log('[api/contact] Development mode: contact submitted', { name, email, subject });
        return NextResponse.json({
          success: true,
          message: 'Contact form submitted (development mode)',
        });
      }
      return NextResponse.json(
        { error: 'Email service is not configured. Please try again later.' },
        { status: 500 }
      );
    }

    // Determine recipient email based on subject
    const recipientMap: Record<string, string> = {
      general: 'support@mycasevalues.com',
      support: 'support@mycasevalues.com',
      enterprise: 'enterprise@mycasevalues.com',
      data: 'support@mycasevalues.com',
      billing: 'support@mycasevalues.com',
      feedback: 'support@mycasevalues.com',
    };

    const recipientEmail = recipientMap[subject] || 'support@mycasevalues.com';

    // Create email HTML
    const subjectLine = `New Contact Form Submission: ${subject.replace(/([A-Z])/g, ' $1').trim()}`;
    const emailHtml = `
      <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { margin: 0; padding: 0; font-family: Arial, sans-serif; }
            .container { max-width: 600px; margin: 0 auto; background: #f9fafb; }
            .header { background: #1A1A1A; color: white; padding: 24px; text-align: center; }
            .content { background: white; padding: 32px 24px; }
            .field { margin-bottom: 24px; }
            .label { font-weight: 600; color: #0052CC; margin-bottom: 8px; font-size: 14px; }
            .value { color: #4B5563; font-size: 15px; line-height: 1.6; }
            .message-box { background: #f3f4f6; padding: 16px; border-left: 4px solid #E65C00; border-radius: 4px; }
            .footer { background: #f9fafb; padding: 16px 24px; border-top: 1px solid #e5e7eb; font-size: 13px; color: #6b7280; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2 style="margin: 0;">MyCaseValue — Contact Form Submission</h2>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">From:</div>
                <div class="value">${name} &lt;${email}&gt;</div>
              </div>
              <div class="field">
                <div class="label">Subject:</div>
                <div class="value">${subject.charAt(0).toUpperCase() + subject.slice(1).replace(/([A-Z])/g, ' $1')}</div>
              </div>
              <div class="field">
                <div class="label">Message:</div>
                <div class="message-box">
                  ${message.replace(/\n/g, '<br />')}
                </div>
              </div>
              <div class="field" style="margin-top: 32px; padding-top: 24px; border-top: 1px solid #e5e7eb;">
                <div style="font-size: 13px; color: #6b7280;">
                  <strong>Action:</strong> Reply directly to ${email} or use your contact management system.
                </div>
              </div>
            </div>
            <div class="footer">
              <p style="margin: 0;">
                This is an automated message from the MyCaseValue contact form.
                <br />Submitted from: ${SITE_URL}/contact
              </p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Send email to support team
    const result = await sendEmail({
      to: recipientEmail,
      subject: subjectLine,
      html: emailHtml,
      text: `New Contact Form Submission\n\nFrom: ${name} <${email}>\nSubject: ${subject}\n\nMessage:\n${message}`,
    });

    if (!result.success) {
      console.error('[api/contact] Email send failed:', result.error);
      return NextResponse.json(
        { error: 'Failed to submit contact form. Please try again later.' },
        { status: 500 }
      );
    }

    // Log successful submission
    console.log('[api/contact] Contact form submitted', {
      name,
      email,
      subject,
      messageLength: message.length,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: 'Contact form submitted successfully. We will respond within 24-48 hours.',
    });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    console.error('[api/contact] Contact submission failed:', errorMessage);
    return NextResponse.json(
      { error: 'An error occurred while processing your request. Please try again later.' },
      { status: 500 }
    );
  }
}
