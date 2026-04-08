import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { z } from 'zod';

export const dynamic = 'force-dynamic';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/**
 * Zod schema for widget impression payload
 */
const impressionSchema = z.object({
  nos_code: z.string().regex(/^\d{1,4}$/, 'NOS code must be 1-4 digits'),
  district: z.string().max(20).optional().default('all'),
  widget_type: z.enum(['compact', 'detailed', 'mini']).optional().default('compact'),
});

/**
 * Simple in-memory rate limiter for impression tracking
 * Prevents abuse of the impression endpoint
 */
const ipRequestCounts = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60000; // 1 minute
  const maxRequests = 60; // 60 impressions per minute per IP

  const entry = ipRequestCounts.get(ip);
  if (!entry || now > entry.resetAt) {
    ipRequestCounts.set(ip, { count: 1, resetAt: now + windowMs });
    return true;
  }
  if (entry.count >= maxRequests) {
    return false;
  }
  entry.count++;
  return true;
}

export async function POST(request: NextRequest) {
  try {
    // Rate limit check
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0].trim() : 'unknown';
    if (!checkRateLimit(ip)) {
      return new NextResponse(null, { status: 429 });
    }

    const body = await request.json();

    // Validate input
    const validation = impressionSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: validation.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { nos_code, district, widget_type } = validation.data;

    // Extract referer domain from Referer header
    const referer = request.headers.get('referer') || '';
    let referer_domain: string | null = null;
    if (referer) {
      try {
        const url = new URL(referer);
        referer_domain = url.hostname;
      } catch {
        // Invalid referer URL, skip
      }
    }

    if (process.env.NODE_ENV === 'production') {
      // Insert to Supabase in production
      if (!supabaseUrl || !supabaseAnonKey) {
        console.error('Supabase credentials missing');
        return new NextResponse(null, { status: 500 });
      }

      const supabase = createClient(supabaseUrl, supabaseAnonKey);
      const { error } = await supabase.from('widget_impressions').insert([
        {
          nos_code,
          district: district || null,
          referer_domain,
          widget_type,
          created_at: new Date().toISOString(),
        },
      ]);

      if (error) {
        console.error('Error inserting widget impression:', error);
        return new NextResponse(null, { status: 500 });
      }
    }

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    if (error instanceof SyntaxError) {
      return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
    }
    console.error('Error in widget impression endpoint:', error);
    return new NextResponse(null, { status: 500 });
  }
}
