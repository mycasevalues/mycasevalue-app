/**
 * FJC Quarterly Data Refresh Pipeline
 * Scheduled to run on the first Monday of each month at 6am ET / 10am UTC
 *
 * This function:
 * 1. Checks FJC website for latest IDB release date
 * 2. Compares against last ingested date in Supabase
 * 3. Downloads new IDB CSV if newer release available
 * 4. Parses and upserts records to fjc_cases table
 * 5. Triggers recalculation of win rates and settlement ranges
 * 6. Triggers ISR revalidation for affected NOS and district pages
 * 7. Updates data_sources table with new refresh timestamp
 * 8. Sends completion notification email via Resend
 */

import { inngest } from '../lib/inngest'

interface FJCRefreshStep {
  timestamp: string
  releaseDate: string | null
  lastIngestedDate: string | null
  newDataAvailable: boolean
  recordsProcessed: number
  recordsInserted: number
  recordsUpdated: number
  pagesRevalidated: number
  emailSent: boolean
  errors: string[]
}

/**
 * Main FJC quarterly refresh function
 * Scheduled: First Monday of each month at 10am UTC (6am ET)
 * Cron: "0 10 1-7 * 1"
 */
export const refreshFJCQuarterly = inngest.createFunction(
  { id: 'refresh-fjc-quarterly', triggers: [{ cron: '0 10 1-7 * 1' }] },
  async ({ step }) => {
    const stepResult: FJCRefreshStep = {
      timestamp: new Date().toISOString(),
      releaseDate: null,
      lastIngestedDate: null,
      newDataAvailable: false,
      recordsProcessed: 0,
      recordsInserted: 0,
      recordsUpdated: 0,
      pagesRevalidated: 0,
      emailSent: false,
      errors: [],
    }

    try {
      // Step 1: Check FJC website for latest IDB release date
      const fjcReleaseDate = await step.run('check-fjc-release-date', async () => {
        try {
          // TODO: Replace with actual FJC website fetch
          // Current implementation simulates the fetch
          // In production: fetch from https://www.fjc.gov/content/federal-judicial-center-integrated-database-idb
          // Parse release date from the page content

          console.log('[FJC Refresh] Checking FJC website for latest IDB release date...')

          // Simulated release date for demonstration
          const mockReleaseDate = '2026-03-01'
          return mockReleaseDate
        } catch (error) {
          const errMsg = error instanceof Error ? error.message : 'Unknown error'
          stepResult.errors.push(`Failed to check FJC release date: ${errMsg}`)
          throw error
        }
      })

      stepResult.releaseDate = fjcReleaseDate

      // Step 2: Compare against last ingested date in Supabase
      const lastIngestedDate = await step.run('get-last-ingested-date', async () => {
        try {
          // TODO: Query Supabase data_sources table
          // const { data, error } = await getSupabaseAdmin()
          //   .from('data_sources')
          //   .select('last_refresh')
          //   .eq('source', 'fjc_idb')
          //   .single()
          //
          // if (error) throw error
          // return data?.last_refresh || null

          console.log('[FJC Refresh] Comparing FJC release date with last ingested date...')

          // Simulated last ingested date
          const mockLastIngested = '2025-12-01'
          return mockLastIngested
        } catch (error) {
          const errMsg = error instanceof Error ? error.message : 'Unknown error'
          stepResult.errors.push(`Failed to get last ingested date: ${errMsg}`)
          throw error
        }
      })

      stepResult.lastIngestedDate = lastIngestedDate

      // Step 3: Determine if new data is available
      const newDataAvailable = fjcReleaseDate > (lastIngestedDate || '')
      stepResult.newDataAvailable = newDataAvailable

      if (!newDataAvailable) {
        console.log('[FJC Refresh] No new FJC data available. Skipping download and processing.')
        await step.run('send-no-update-email', async () => {
          try {
            // TODO: Send email notification that no new data was available
            // await sendEmail({
            //   to: process.env.ADMIN_EMAIL,
            //   subject: 'FJC Quarterly Refresh - No New Data',
            //   html: `<p>FJC refresh run completed. No new data was available.</p>`,
            // })

            console.log('[FJC Refresh] Sent no-update notification email')
            stepResult.emailSent = true
          } catch (error) {
            const errMsg = error instanceof Error ? error.message : 'Unknown error'
            stepResult.errors.push(`Failed to send no-update email: ${errMsg}`)
          }
        })

        return {
          success: true,
          message: 'FJC refresh completed - no new data available',
          data: stepResult,
        }
      }

      // Step 4: Download new IDB CSV
      const csvData = await step.run('download-fjc-csv', async () => {
        try {
          // TODO: Download CSV from FJC
          // const response = await fetch('https://www.fjc.gov/content/...')
          // const csvText = await response.text()
          // return csvText

          console.log(`[FJC Refresh] Downloading FJC IDB CSV from release date: ${fjcReleaseDate}`)

          // Simulated CSV data (would be actual CSV content in production)
          const mockCsvData = `case_id,district,nos_code,filing_date,termination_date,outcome
1,NDCA,210,2025-01-01,2025-06-01,Settlement
2,NDCA,210,2025-01-05,2025-06-15,Judgment
3,SDNY,220,2025-01-10,2025-07-01,Settlement`
          return mockCsvData
        } catch (error) {
          const errMsg = error instanceof Error ? error.message : 'Unknown error'
          stepResult.errors.push(`Failed to download FJC CSV: ${errMsg}`)
          throw error
        }
      })

      // Step 5: Parse and upsert records to fjc_cases table
      const parseResult = await step.run('parse-and-upsert-fjc-data', async () => {
        try {
          // TODO: Parse CSV and upsert to Supabase fjc_cases table
          // const lines = csvData.split('\n')
          // const headers = lines[0].split(',')
          // const records = lines.slice(1).map(line => {
          //   const values = line.split(',')
          //   // Map to fjc_cases schema
          //   return { ... }
          // })
          //
          // const { error } = await getSupabaseAdmin()
          //   .from('fjc_cases')
          //   .upsert(records, { onConflict: 'case_id' })
          //
          // if (error) throw error

          console.log('[FJC Refresh] Parsing and upserting FJC data...')

          // Simulated parsing result
          const mockRecordsProcessed = csvData.split('\n').length - 1
          const mockRecordsInserted = Math.floor(mockRecordsProcessed * 0.7)
          const mockRecordsUpdated = mockRecordsProcessed - mockRecordsInserted

          return {
            recordsProcessed: mockRecordsProcessed,
            recordsInserted: mockRecordsInserted,
            recordsUpdated: mockRecordsUpdated,
          }
        } catch (error) {
          const errMsg = error instanceof Error ? error.message : 'Unknown error'
          stepResult.errors.push(`Failed to parse and upsert FJC data: ${errMsg}`)
          throw error
        }
      })

      stepResult.recordsProcessed = parseResult.recordsProcessed
      stepResult.recordsInserted = parseResult.recordsInserted
      stepResult.recordsUpdated = parseResult.recordsUpdated

      // Step 6: Trigger recalculation of win rates and settlement ranges
      await step.run('trigger-win-rate-recalculation', async () => {
        try {
          // TODO: Call stored procedure or API to recalculate win rates
          // This could be:
          // 1. A Supabase edge function
          // 2. A direct SQL call with getSupabaseAdmin()
          // 3. Another Inngest function via inngest.send()

          console.log('[FJC Refresh] Triggering win rate and settlement range recalculation...')

          // Simulated calculation trigger
          await new Promise((resolve) => setTimeout(resolve, 100))
        } catch (error) {
          const errMsg = error instanceof Error ? error.message : 'Unknown error'
          stepResult.errors.push(`Failed to trigger win rate recalculation: ${errMsg}`)
          // Don't throw - this is a non-critical step
          console.error('[FJC Refresh] Win rate recalculation failed:', errMsg)
        }
      })

      // Step 7: Trigger ISR revalidation for affected NOS and district pages
      const revalidationResult = await step.run('trigger-isr-revalidation', async () => {
        try {
          // TODO: Find affected NOS codes and districts from the imported data
          // Then call Next.js revalidateTag() or fetch revalidate API
          // Example routes to revalidate:
          // - /insights/nos/[nosCode]
          // - /district/[districtCode]
          // - /stats

          console.log('[FJC Refresh] Triggering ISR revalidation for affected pages...')

          // Simulated affected pages
          const affectedPages = [
            '/insights/nos/210',
            '/insights/nos/220',
            '/district/NDCA',
            '/district/SDNY',
            '/stats',
          ]

          // TODO: In production, call revalidate endpoint or use revalidateTag
          // Example:
          // const revalidatePromises = affectedPages.map(page =>
          //   fetch(`/api/revalidate?secret=${REVALIDATE_SECRET}&path=${encodeURIComponent(page)}`)
          // )
          // await Promise.all(revalidatePromises)

          return {
            pagesRevalidated: affectedPages.length,
            pages: affectedPages,
          }
        } catch (error) {
          const errMsg = error instanceof Error ? error.message : 'Unknown error'
          stepResult.errors.push(`Failed to trigger ISR revalidation: ${errMsg}`)
          // Don't throw - this is a non-critical step
          console.error('[FJC Refresh] ISR revalidation failed:', errMsg)
          return {
            pagesRevalidated: 0,
            pages: [],
          }
        }
      })

      stepResult.pagesRevalidated = revalidationResult.pagesRevalidated

      // Step 8: Update data_sources table with new refresh timestamp
      await step.run('update-data-sources', async () => {
        try {
          // TODO: Update Supabase data_sources table
          // const { error } = await getSupabaseAdmin()
          //   .from('data_sources')
          //   .update({
          //     last_refresh: new Date().toISOString(),
          //     last_release_date: fjcReleaseDate,
          //     status: 'completed',
          //   })
          //   .eq('source', 'fjc_idb')
          //
          // if (error) throw error

          console.log('[FJC Refresh] Updating data_sources table...')

          await new Promise((resolve) => setTimeout(resolve, 100))
        } catch (error) {
          const errMsg = error instanceof Error ? error.message : 'Unknown error'
          stepResult.errors.push(`Failed to update data_sources: ${errMsg}`)
          throw error
        }
      })

      // Step 9: Send completion notification email via Resend
      await step.run('send-completion-email', async () => {
        try {
          // TODO: Send email notification via Resend
          // import { sendEmail } from '../lib/email'
          // await sendEmail({
          //   to: process.env.ADMIN_EMAIL,
          //   subject: 'FJC Quarterly Refresh Completed',
          //   html: `
          //     <h2>FJC Quarterly Data Refresh Completed</h2>
          //     <p>Release Date: ${fjcReleaseDate}</p>
          //     <p>Records Processed: ${stepResult.recordsProcessed}</p>
          //     <p>Records Inserted: ${stepResult.recordsInserted}</p>
          //     <p>Records Updated: ${stepResult.recordsUpdated}</p>
          //     <p>Pages Revalidated: ${stepResult.pagesRevalidated}</p>
          //     ${stepResult.errors.length > 0 ? `<p>Errors: ${stepResult.errors.join(', ')}</p>` : ''}
          //   `,
          // })

          console.log('[FJC Refresh] Sending completion email...')

          await new Promise((resolve) => setTimeout(resolve, 100))
          stepResult.emailSent = true
        } catch (error) {
          const errMsg = error instanceof Error ? error.message : 'Unknown error'
          stepResult.errors.push(`Failed to send completion email: ${errMsg}`)
          // Don't throw - email failure shouldn't fail the entire pipeline
          console.error('[FJC Refresh] Email notification failed:', errMsg)
        }
      })

      return {
        success: true,
        message: 'FJC quarterly refresh completed successfully',
        data: stepResult,
      }
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : 'Unknown error'
      console.error('[FJC Refresh] Pipeline failed:', errMsg)

      // Send error notification email
      try {
        await step.run('send-error-email', async () => {
          // TODO: Send error notification email
          // import { sendEmail } from '../lib/email'
          // await sendEmail({
          //   to: process.env.ADMIN_EMAIL,
          //   subject: 'FJC Quarterly Refresh Failed',
          //   html: `
          //     <h2>FJC Quarterly Data Refresh Failed</h2>
          //     <p>Error: ${errMsg}</p>
          //     <p>Errors: ${stepResult.errors.join(', ')}</p>
          //   `,
          // })

          console.log('[FJC Refresh] Sent error notification email')
        })
      } catch (emailError) {
        console.error('[FJC Refresh] Failed to send error email:', emailError)
      }

      return {
        success: false,
        message: `FJC quarterly refresh failed: ${errMsg}`,
        data: stepResult,
      }
    }
  }
)
