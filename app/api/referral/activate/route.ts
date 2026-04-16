/**
 * POST /api/referral/activate
 * Activates a referral relationship when a referred user signs up
 * Called after user authentication is complete
 */

import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';
import { recordReferral, lookupReferrer } from '@/lib/referral';
import { sendEmail } from '@/lib/email';
import { SITE_URL } from '@/lib/site-config';

export async function POST(request: NextRequest) {
  try {
    // Get user ID from request body (should be passed from auth callback or signup handler)
    const { userId } = await request.json();

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    // Get referral code from cookies
    const referralCode = request.cookies.get('referral_code')?.value;

    // If no referral code, just return success (not an error case)
    if (!referralCode) {
      return NextResponse.json(
        { message: 'No referral code found', activated: false },
        { status: 200 }
      );
    }

    // Look up the referrer by code
    const referrerId = await lookupReferrer(referralCode);

    if (!referrerId) {
      return NextResponse.json(
        { error: 'Invalid referral code' },
        { status: 400 }
      );
    }

    // Prevent self-referrals
    if (referrerId === userId) {
      return NextResponse.json(
        { error: 'Cannot refer yourself' },
        { status: 400 }
      );
    }

    // Record the referral in the database
    const success = await recordReferral(referrerId, userId, true);

    if (!success) {
      return NextResponse.json(
        { error: 'Failed to record referral' },
        { status: 500 }
      );
    }

    // Get referrer's email for notification
    const supabase = getSupabaseAdmin();
    const { data: referrerData, error: fetchError } = await supabase
      .from('users')
      .select('email')
      .eq('id', referrerId)
      .single();

    if (!fetchError && referrerData?.email) {
      // Send notification email to referrer
      await sendEmail({
        to: referrerData.email,
        subject: 'Someone joined MyCaseValue through your referral link!',
        html: `
          <html>
            <head>
              <meta charset="UTF-8">
              <style>
                body { margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif; }
                .email-container { max-width: 600px; margin: 0 auto; }
                .header { background-color: #1a56db; color: white; padding: 24px; text-align: center; }
                .header-text { font-size: 24px; font-weight: bold; margin: 0; }
                .body-content { background-color: white; padding: 32px 24px; }
                .body-content h2 { color: #212529; font-size: 22px; margin: 0 0 16px 0; }
                .body-content p { color: #4B5563; font-size: 15px; line-height: 1.6; margin: 0 0 16px 0; }
                .cta-button { background-color: #1a56db; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block; font-weight: 600; font-size: 15px; margin-top: 16px; }
                .footer { background-color: #F8F9FA; color: #4B5563; padding: 24px; font-size: 13px; line-height: 1.6; text-align: center; border-top: 1px solid #e0e0e0; }
                .footer p { margin: 8px 0; }
                .highlight { background-color: #FFF3CD; padding: 12px; border-left: 4px solid #1a56db; margin: 16px 0; }
              </style>
            </head>
            <body>
              <div class="email-container">
                <div class="header">
                  <div class="header-text">New Referral!</div>
                </div>
                <div class="body-content">
                  <h2>Someone joined MyCaseValue!</h2>
                  <p>Great news! A new user just signed up using your referral link.</p>
                  <div class="highlight">
                    <strong>Your referral reward is unlocked!</strong>
                  </div>
                  <p>Check your dashboard to see your growing referral network and track your rewards.</p>
                  <p><a href="${SITE_URL}/dashboard/referrals" class="cta-button">View Your Referrals</a></p>
                </div>
                <div class="footer">
                  <p>&copy; 2026 MyCaseValue. All rights reserved.</p>
                  <p>This email was sent to ${referrerData.email}.</p>
                </div>
              </div>
            </body>
          </html>
        `,
        text: `Great news! A new user just signed up using your referral link. Visit ${SITE_URL}/dashboard/referrals to see your referral rewards.`,
      });
    }

    // Clear the referral code cookie
    const response = NextResponse.json(
      { message: 'Referral activated successfully', activated: true },
      { status: 200 }
    );

    response.cookies.set({
      name: 'referral_code',
      value: '',
      maxAge: 0,
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Error in referral activation:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
