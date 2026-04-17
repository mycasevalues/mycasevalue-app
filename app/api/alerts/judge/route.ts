/**
 * API route for judge alerts
 * Allows users to subscribe to notifications for judge opinion updates
 */

import { z } from 'zod';

// Validation schema for alert requests
const alertSchema = z.object({
  judge_id: z.string().min(1, 'Judge ID is required'),
  email: z.string().email('Invalid email address'),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate input
    const parsed = alertSchema.safeParse(body);
    if (!parsed.success) {
      const firstError = parsed.error.issues[0];
      const errorMessage = firstError?.message || 'Validation failed';
      return Response.json(
        { error: errorMessage },
        { status: 400 }
      );
    }

    const { judge_id, email } = parsed.data;

    // In production: insert into Supabase user_alerts table
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
      try {
        const { createClient } = await import('@supabase/supabase-js');
        const supabase = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL,
          process.env.SUPABASE_SERVICE_ROLE_KEY
        );

        const { error } = await supabase.from('user_alerts').insert({
          email,
          alert_type: 'judge',
          alert_reference: judge_id,
          created_at: new Date().toISOString(),
        });

        if (error) {
          console.error('Supabase alert insert error:', error);
          return Response.json(
            { error: 'Failed to save alert' },
            { status: 500 }
          );
        }
      } catch (supabaseErr) {
        console.error('Supabase connection error:', supabaseErr);
        // Fall through to development mode handling
      }
    }

    return Response.json({
      success: true,
      message: `Alert created for ${email}`,
      judge_id,
    });
  } catch (error) {
    console.error('Judge alert API error:', error);
    return Response.json(
      { error: 'An error occurred while processing your alert' },
      { status: 500 }
    );
  }
}
