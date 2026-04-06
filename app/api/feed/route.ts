/**
 * GET /api/feed
 * Server-Sent Events (SSE) endpoint for real-time case feed
 *
 * Streams a new realistic case filing/outcome every 3-8 seconds
 * Includes auto-reconnection support and rate limiting
 *
 * Usage:
 * const eventSource = new EventSource('/api/feed');
 * eventSource.onmessage = (event) => {
 *   const feedItem = JSON.parse(event.data);
 *   // handle feed item
 * };
 */

export const dynamic = 'force-dynamic';
export const maxDuration = 60; // Serverless timeout safety (60 seconds)

import { NextRequest, NextResponse } from 'next/server';
import { generateRealisticFeedItem } from '../../../lib/case-feed';
import { rateLimit, getClientIp } from '../../../lib/rate-limit';

export async function GET(request: NextRequest) {
  // Rate limit: 10 connections per IP
  const clientIp = getClientIp(request.headers);
  const rateLimitResult = rateLimit(clientIp, {
    windowMs: 60000, // 1 minute window
    maxRequests: 10, // 10 concurrent connections max
  });

  if (!rateLimitResult.success) {
    return NextResponse.json(
      { error: 'Too many connections. Maximum 10 per minute.' },
      { status: 429, headers: { 'Retry-After': '60' } }
    );
  }

  // Create a readable stream for SSE
  const encoder = new TextEncoder();
  let isClosed = false;

  const readable = new ReadableStream({
    async start(controller) {
      try {
        // Send initial comment to keep connection alive
        controller.enqueue(encoder.encode(': connected\n\n'));

        // Send retry instruction (5 seconds)
        controller.enqueue(encoder.encode('retry: 5000\n\n'));

        // Track start time for 5-minute timeout
        const startTime = Date.now();
        const TIMEOUT_MS = 5 * 60 * 1000; // 5 minutes

        // Generator loop: send case data every 3-8 seconds
        while (!isClosed && Date.now() - startTime < TIMEOUT_MS) {
          try {
            // Wait 3-8 seconds before sending next item
            const delayMs = 3000 + Math.random() * 5000;
            await new Promise((resolve) => setTimeout(resolve, delayMs));

            // Check if stream is still writable
            if (isClosed) break;

            // Generate realistic feed item
            const feedItem = generateRealisticFeedItem();

            // Send as SSE
            const eventData = `data: ${JSON.stringify(feedItem)}\n\n`;
            controller.enqueue(encoder.encode(eventData));
          } catch (innerError: any) {
            // Try to continue, but if it's a write error, break
            if (innerError.message?.includes('write') || innerError.message?.includes('closed')) {
              isClosed = true;
              break;
            }
          }
        }

        // Close stream after timeout
        if (!isClosed) {
          controller.enqueue(encoder.encode(': timeout\n\n'));
          controller.close();
        }
      } catch (error: unknown) {
        try {
          controller.close();
        } catch {
          // Already closed
        }
      }
    },

    cancel() {
      // Called when client disconnects
      isClosed = true;
    },
  });

  // Return SSE response
  return new Response(readable, {
    status: 200,
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      'Connection': 'keep-alive',
      'X-Accel-Buffering': 'no',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

/**
 * Handle CORS preflight for SSE
 */
export async function OPTIONS(request: NextRequest) {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
