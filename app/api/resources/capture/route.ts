import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { rateLimit, getClientIp } from '@/lib/rate-limit';

/**
 * POST /api/resources/capture
 * Capture email for resource downloads (guides, reports, etc.)
 */
export async function POST(request: NextRequest) {
  // Rate limiting: 20 requests per minute per IP
  const ip = getClientIp(request.headers);
  const { success } = rateLimit(ip, { windowMs: 60000, maxRequests: 20 });
  if (!success) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  try {
    const { email, resource, timestamp } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { success: false, error: 'Valid email required' },
        { status: 400 }
      );
    }

    const cleanEmail = email.toLowerCase().trim().slice(0, 255);
    const cleanResource = (resource || 'unknown').slice(0, 100);

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (supabaseUrl && supabaseKey) {
      try {
        const supabase = createClient(supabaseUrl, supabaseKey);

        // Insert into resource_captures table
        await supabase.from('resource_captures').insert({
          email: cleanEmail,
          resource: cleanResource,
          captured_at: timestamp || new Date().toISOString(),
          user_agent: request.headers.get('user-agent'),
          ip_hash: ip,
        });
      } catch (dbError) {
        console.error(
          '[api/resources/capture] DB insert failed:',
          dbError instanceof Error ? dbError.message : dbError
        );
        // Do not fail the request if DB fails - still return success
        // This prevents blocking the user's PDF download
      }
    } else {
      console.warn(
        '[api/resources/capture] Supabase not configured, capture not persisted'
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Email captured successfully',
      resource: cleanResource,
    });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Invalid request' },
      { status: 400 }
    );
  }
}
