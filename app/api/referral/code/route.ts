/**
 * GET /api/referral/code - Get current user's referral code
 * POST /api/referral/code - Generate new referral code if none exists
 */

import { NextRequest, NextResponse } from 'next/server';
import { createReferralCode } from '@/lib/referral';
import { getSupabaseAdmin } from '@/lib/supabase';

/**
 * Get the current user's referral code
 * Requires authentication (user ID should be passed in request)
 */
export async function GET(request: NextRequest) {
  try {
    // Extract user ID from auth header or session
    // In a real app, this would come from Supabase auth context
    const authHeader = request.headers.get('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);

    // Verify token and get user from Supabase
    const supabase = getSupabaseAdmin();
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }

    // Get user's referral code
    const { data, error } = await supabase
      .from('users')
      .select('referral_code')
      .eq('id', user.id)
      .single();

    if (error) {
      return NextResponse.json(
        { error: 'Failed to fetch referral code' },
        { status: 500 }
      );
    }

    if (!data?.referral_code) {
      return NextResponse.json(
        { referralCode: null, message: 'No referral code found' },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { referralCode: data.referral_code },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error getting referral code:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * Generate a new referral code for the current user
 */
export async function POST(request: NextRequest) {
  try {
    // Extract user ID from auth header or session
    const authHeader = request.headers.get('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);

    // Verify token and get user from Supabase
    const supabase = getSupabaseAdmin();
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }

    // Generate or get existing referral code
    const code = await createReferralCode(user.id);

    if (!code) {
      return NextResponse.json(
        { error: 'Failed to generate referral code' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { referralCode: code, message: 'Referral code created successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error creating referral code:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
