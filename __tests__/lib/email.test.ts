import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'

describe('lib/email', () => {
  beforeEach(() => {
    vi.resetModules()
  })

  afterEach(() => {
    vi.resetAllMocks()
  })

  it('sendEmail() returns success when RESEND_API_KEY is missing', async () => {
    delete process.env.RESEND_API_KEY
    vi.resetModules()

    const { sendEmail } = await import('../../lib/email')
    const result = await sendEmail({
      to: 'test@example.com',
      subject: 'Test',
      html: '<p>Test</p>',
    })

    expect(result.success).toBe(true)
  })

  it('sendWelcomeEmail() validates email format', async () => {
    const { sendWelcomeEmail } = await import('../../lib/email')

    const result = await sendWelcomeEmail('invalid-email', 'single')
    expect(result.success).toBe(false)
    expect(result.error).toBe('Invalid email address')
  })

  it('sendWelcomeEmail() sends email with valid address', async () => {
    const { sendWelcomeEmail } = await import('../../lib/email')

    const result = await sendWelcomeEmail('user@example.com', 'single')
    expect(result.success).toBe(true)
  })

  it('sendReportEmail() validates email format', async () => {
    const { sendReportEmail } = await import('../../lib/email')

    const result = await sendReportEmail('invalid-email', { caseNumber: '123' })
    expect(result.success).toBe(false)
    expect(result.error).toBe('Invalid email address')
  })

  it('sendReportEmail() sends email with valid data', async () => {
    const { sendReportEmail } = await import('../../lib/email')

    const result = await sendReportEmail('user@example.com', {
      caseNumber: '2023-CV-001',
      jurisdiction: 'SDNY',
      caseValue: '$100,000',
    })
    expect(result.success).toBe(true)
  })

  it('sendReportEmail() supports Spanish language', async () => {
    const { sendReportEmail } = await import('../../lib/email')

    const result = await sendReportEmail(
      'user@example.com',
      {
        caseNumber: '2023-CV-001',
        jurisdiction: 'SDNY',
        caseValue: '$100,000',
      },
      'es'
    )
    expect(result.success).toBe(true)
  })

  it('sendPasswordResetEmail() validates email format', async () => {
    const { sendPasswordResetEmail } = await import('../../lib/email')

    const result = await sendPasswordResetEmail('invalid-email', 'https://example.com/reset')
    expect(result.success).toBe(false)
    expect(result.error).toBe('Invalid email address')
  })

  it('sendReportReadyEmail() validates email format', async () => {
    const { sendReportReadyEmail } = await import('../../lib/email')

    const result = await sendReportReadyEmail('invalid-email', {
      caseType: 'Employment',
      nos: '1100',
    })
    expect(result.success).toBe(false)
    expect(result.error).toBe('Invalid email address')
  })

  it('sendReportCaptureConfirmation() validates email format', async () => {
    const { sendReportCaptureConfirmation } = await import('../../lib/email')

    const result = await sendReportCaptureConfirmation('invalid-email')
    expect(result.success).toBe(false)
    expect(result.error).toBe('Invalid email address')
  })

  it('sendReportCaptureConfirmation() sends email with valid address', async () => {
    const { sendReportCaptureConfirmation } = await import('../../lib/email')

    const result = await sendReportCaptureConfirmation('user@example.com')
    expect(result.success).toBe(true)
  })

  it('sendDataQualityEmail() validates email format', async () => {
    const { sendDataQualityEmail } = await import('../../lib/email')

    const result = await sendDataQualityEmail('invalid-email', '<p>Report</p>', true, 'Summary')
    expect(result.success).toBe(false)
    expect(result.error).toBe('Invalid email address')
  })

  it('sendWhitepaperConfirmation() validates email format', async () => {
    const { sendWhitepaperConfirmation } = await import('../../lib/email')

    const result = await sendWhitepaperConfirmation('invalid-email', 'John Doe', 'ACME Inc')
    expect(result.success).toBe(false)
    expect(result.error).toBe('Invalid email address')
  })
})
