export const dynamic = 'force-dynamic';

import { NextRequest } from 'next/server';
import { apiHandler } from '../../../lib/api-middleware';
import { apiSuccess, apiBadRequest } from '../../../lib/api-response';
import { getSupabaseAdmin } from '../../../lib/supabase';

const VALID_VOTES = ['fair', 'low', 'high', 'unsure'];

/**
 * POST /api/poll
 * Records user poll votes with input validation.
 * Rate limited to 50 requests per minute per IP.
 */
export const POST = apiHandler(
  {
    rateLimit: { windowMs: 60000, maxRequests: 50 },
  },
  async (request: NextRequest, { log, clientIp }) => {
    const body = await request.json();
    const vote = typeof body.vote === 'string' ? body.vote.trim().toLowerCase().slice(0, 20) : '';
    const nos = typeof body.nos === 'string' ? body.nos.trim().slice(0, 10) : '';

    // Validate vote
    if (!vote || !VALID_VOTES.includes(vote)) {
      return apiBadRequest('Invalid vote. Must be one of: fair, low, high, unsure');
    }

    // Validate NOS code
    if (nos && !/^\d{1,4}$/.test(nos)) {
      return apiBadRequest('Invalid NOS code');
    }

    // Persist vote to Supabase (fire-and-forget)
    try {
      const supabase = getSupabaseAdmin();
      await supabase.from('poll_votes').insert({
        vote,
        nos_code: nos || null,
        ip: clientIp,
        created_at: new Date().toISOString(),
      });
    } catch (dbErr) {
      const message = dbErr instanceof Error ? dbErr.message : String(dbErr);
      log.warn('Failed to insert poll vote', { error: message });
    }

    return apiSuccess({ success: true, vote, nos });
  }
);
