import { NextRequest, NextResponse } from 'next/server';
import { secureCompare } from '../../../../lib/sanitize';
import { getSupabaseAdmin } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

interface SendPushRequest {
  title: string;
  body: string;
  url?: string;
  tag?: string;
  icon?: string;
}

/**
 * POST /api/push/send
 * Send push notification to subscribed users
 * Protected by PUSH_API_KEY environment variable
 * Uses web-push library with dynamic import and graceful fallback
 *
 * Example usage:
 * POST /api/push/send
 * Headers: { 'x-api-key': 'your-api-key' }
 * Body: { title: 'Alert', body: 'New message', url: '/messages' }
 */
export async function POST(req: NextRequest) {
  // Verify API key
  const apiKey = req.headers.get('x-api-key');
  if (!apiKey || !process.env.PUSH_API_KEY || !secureCompare(apiKey, process.env.PUSH_API_KEY)) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const body: SendPushRequest = await req.json();
    const { title, body: notificationBody, url, tag, icon } = body;

    // Validate required fields
    if (!title || !notificationBody) {
      return NextResponse.json(
        { error: 'Missing required fields: title, body' },
        { status: 400 }
      );
    }

    // For now, we'll use a simple in-memory approach without web-push
    // In production, you would dynamically import and use web-push:
    // const webpush = await import('web-push');
    //
    // Example implementation with web-push:
    // const subscriptions = getStoredSubscriptions(); // from subscribe endpoint
    // const results = await Promise.allSettled(
    //   subscriptions.map(sub =>
    //     webpush.sendNotification(sub, JSON.stringify({
    //       title, body: notificationBody, url, icon, tag
    //     }))
    //   )
    // );

    // Attempt to dynamically import web-push (graceful fallback if not installed)
    let sentCount = 0;
    let failedCount = 0;

    // Check VAPID configuration
    const vapidPublicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
    const vapidPrivateKey = process.env.VAPID_PRIVATE_KEY;

    if (!vapidPrivateKey || !vapidPublicKey) {
      console.warn('[api/push/send] VAPID keys not configured — push notifications disabled');
      return NextResponse.json(
        {
          success: false,
          message: 'Push notifications not configured (VAPID keys missing)',
          sent: 0,
          failed: 0,
        },
        { status: 503 }
      );
    }

    try {
      // @ts-ignore - web-push is an optional dependency
      const webpush = await import(/* webpackIgnore: true */ 'web-push') as any;
      webpush.setVapidDetails(
        process.env.VAPID_SUBJECT || 'mailto:support@mycasevalues.com',
        vapidPublicKey,
        vapidPrivateKey
      );

      // Retrieve subscriptions from Supabase push_subscriptions table
      // and send to each subscriber using webpush.sendNotification().

      try {
        const supabase = getSupabaseAdmin();
        const { data: subscriptions, error } = await supabase
          .from('push_subscriptions')
          .select('*');

        if (error) {
          console.error('[api/push/send] Failed to query push_subscriptions:', error.message);
          return NextResponse.json(
            {
              success: false,
              message: 'Failed to retrieve push subscriptions from database',
              sent: 0,
              failed: 0,
            },
            { status: 503 }
          );
        }

        // Implement sending notifications to each subscription when table is ready
        if (subscriptions && subscriptions.length > 0) {
          const results = await Promise.allSettled(
            subscriptions.map(async (sub: any) => {
              try {
                // Validate subscription has required fields
                if (!sub.subscription || !sub.subscription.endpoint) {
                  console.warn('[api/push/send] Invalid subscription object:', sub.id);
                  return { status: 'invalid' };
                }
                return await webpush.sendNotification(sub.subscription, JSON.stringify({
                  title,
                  body: notificationBody,
                  url,
                  icon,
                  tag,
                }));
              } catch (err) {
                console.error('[api/push/send] Failed to send to subscription:', sub.id, err);
                throw err;
              }
            })
          );

          sentCount = results.filter(r => r.status === 'fulfilled').length;
          failedCount = results.filter(r => r.status === 'rejected').length;
        }

        console.info('[api/push/send] Push send completed:', { title, url, tag, subscriptionCount: subscriptions?.length || 0, sentCount, failedCount });
      } catch (dbErr: any) {
        console.error('[api/push/send] Database error retrieving subscriptions:', dbErr.message);
        return NextResponse.json(
          {
            success: false,
            message: 'Error accessing push subscriptions database',
            sent: 0,
            failed: 0,
          },
          { status: 503 }
        );
      }
    } catch (importErr: any) {
      console.warn('[api/push/send] web-push not available:', importErr.message);
      return NextResponse.json(
        {
          success: false,
          message: 'Push notification service unavailable (web-push not installed)',
          sent: 0,
          failed: 0,
        },
        { status: 503 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Push notification queued',
        sent: sentCount,
        failed: failedCount,
      },
      { status: 200 }
    );
  } catch (err: unknown) {
    // Handle JSON parsing errors
    if (err instanceof SyntaxError) {
      return NextResponse.json(
        { error: 'Invalid JSON in request body' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to send push notification' },
      { status: 500 }
    );
  }
}
