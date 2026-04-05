/**
 * POST /api/subscribe — Newsletter / waitlist signup
 * Upserts email into the newsletter_subscribers table in Supabase.
 * Graceful fallback: if the table doesn't exist yet, logs and returns success.
 */
export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { apiHandler } from '../../../lib/api-middleware';
import { apiSuccess, apiBadRequest } from '../../../lib/api-response';
import { getSupabaseAdmin } from '../../../lib/supabase';

export const POST = apiHandler(
  { rateLimit: { windowMs: 60000, maxRequests: 10 } },
  async (request, { log }) => {
    const { email } = await request.json();

    // Validation: email is required
    if (!email || typeof email !== 'string') {
      return apiBadRequest('Email is required');
    }

    // Validation: email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return apiBadRequest('Invalid email address');
    }

    const normalized = email.toLowerCase().trim();

    // Try Supabase upsert
    try {
      const supabase = getSupabaseAdmin();

      const { error } = await supabase
        .from('newsletter_subscribers')
        .upsert(
          { email: normalized, subscribed_at: new Date().toISOString(), status: 'active' },
          { onConflict: 'email' }
        );

      if (error) {
        log.error('Supabase upsert failed', { errorMessage: error.message });
      }
    } catch (dbErr: unknown) {
      const message = dbErr instanceof Error ? dbErr.message : String(dbErr);
      log.error('Database operation failed', { error: message });
    }

    // Return success even if DB operation failed (graceful degradation)
    return apiSuccess({ success: true, message: 'Subscribed successfully' });
  }
);
