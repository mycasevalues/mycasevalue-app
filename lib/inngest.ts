/**
 * Inngest client for MyCaseValue
 * Handles all serverless event processing and workflow orchestration
 */

import { Inngest } from 'inngest'

/**
 * Create and export the Inngest client
 * This client is used by all Inngest functions for event processing
 */
export const inngest = new Inngest({
  id: 'mycasevalue',
  name: 'MyCaseValue',
})
