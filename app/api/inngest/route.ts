/**
 * Inngest Event Handler API Route
 *
 * This route handles all Inngest webhook calls and function serving.
 * Inngest will POST to this endpoint with event data and function execution requests.
 *
 * Environment: Works with Inngest Cloud or Self-Hosted runners
 * Endpoint: POST /api/inngest
 */

import { serve } from 'inngest/next'
import { inngest } from '@/lib/inngest'
import { refreshFJCQuarterly } from '@/inngest/refresh-fjc-quarterly'

/**
 * Serve all Inngest functions
 * This creates the event handler that Inngest Cloud connects to
 */
const handler = serve({
  client: inngest,
  functions: [refreshFJCQuarterly],
})

export const GET = handler
export const POST = handler
