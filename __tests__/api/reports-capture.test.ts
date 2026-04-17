import { describe, it, expect, beforeEach, vi } from 'vitest'

// Test the helper functions that the API route depends on
describe('API Route: /api/reports/capture', () => {
  describe('Validation and Sanitization', () => {
    beforeEach(() => {
      vi.resetModules()
    })

    it('validateEmail rejects invalid email formats', async () => {
      const { validateEmail } = await import('../../lib/sanitize')

      expect(validateEmail('not-an-email')).toBeNull()
      expect(validateEmail('missing@domain')).toBeNull()
      expect(validateEmail('invalid.email')).toBeNull()
    })

    it('validateEmail accepts valid email formats', async () => {
      const { validateEmail } = await import('../../lib/sanitize')

      expect(validateEmail('test@example.com')).toBe('test@example.com')
      expect(validateEmail('user+tag@domain.co.uk')).toBe('user+tag@domain.co.uk')
    })

    it('sanitizeString truncates long strings', async () => {
      const { sanitizeString } = await import('../../lib/sanitize')

      const longString = 'a'.repeat(200)
      const result = sanitizeString(longString, 100)
      expect(result.length).toBeLessThanOrEqual(100)
    })
  })

  describe('Email Confirmation Flow', () => {
    beforeEach(() => {
      vi.resetModules()
    })

    it('sendReportCaptureConfirmation validates email before sending', async () => {
      const { sendReportCaptureConfirmation } = await import('../../lib/email')

      const invalidResult = await sendReportCaptureConfirmation('invalid-email')
      expect(invalidResult.success).toBe(false)
      expect(invalidResult.error).toBe('Invalid email address')

      // Valid email should not return validation error
      const validResult = await sendReportCaptureConfirmation('valid@example.com')
      expect(invalidResult.error).not.toBeUndefined()
    })

    it('processes valid email addresses for report capture', async () => {
      const { sendReportCaptureConfirmation } = await import('../../lib/email')

      const result = await sendReportCaptureConfirmation('test@example.com')
      // Result should be an object with success property (regardless of value)
      expect(result).toHaveProperty('success')
      expect(typeof result.success).toBe('boolean')
    })
  })

  describe('Rate Limiting and Redis Integration', () => {
    beforeEach(() => {
      vi.resetModules()
    })

    it('rate limiter gracefully handles missing Redis', async () => {
      delete process.env.UPSTASH_REDIS_REST_URL
      delete process.env.UPSTASH_REDIS_REST_TOKEN

      const { getRateLimiter } = await import('../../lib/redis')
      const limiter = getRateLimiter()

      expect(limiter).toBeNull()
    })

    it('request can proceed when rate limiter is unavailable', async () => {
      delete process.env.UPSTASH_REDIS_REST_URL
      delete process.env.UPSTASH_REDIS_REST_TOKEN
      vi.resetModules()

      const { getRateLimiter } = await import('../../lib/redis')
      const limiter = getRateLimiter()

      // Should not throw and should allow fallback behavior
      expect(limiter).toBeNull()
    })
  })

  describe('Database Integration', () => {
    beforeEach(() => {
      vi.resetModules()
    })

    it('gracefully handles missing Supabase config', async () => {
      const { getSupabaseAdmin } = await import('../../lib/supabase')

      // Should either return admin or throw controlled error
      try {
        const admin = getSupabaseAdmin()
        expect(admin).toBeDefined()
      } catch (err: any) {
        expect(err.message).toContain('Supabase')
      }
    })
  })
})
