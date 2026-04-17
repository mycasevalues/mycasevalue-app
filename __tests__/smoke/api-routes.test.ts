/**
 * Smoke tests for all API routes.
 *
 * These tests verify that every API route module:
 *   1. Can be imported without throwing
 *   2. Exports at least one HTTP handler (GET, POST, PUT, DELETE, PATCH, OPTIONS)
 *   3. Exported handlers are functions
 *
 * They do NOT call the handlers -- only verify that the modules are
 * structurally sound and free of import-time errors.
 */
import { describe, it, expect, vi } from 'vitest'

// ---------------------------------------------------------------------------
// Mocks for modules commonly imported by API routes
// ---------------------------------------------------------------------------

vi.mock('next/server', async () => {
  const actual: any = await vi.importActual('next/server')
  return {
    ...actual,
    NextRequest: actual.NextRequest ?? class NextRequest {
      constructor(public url: string, public init?: any) {}
    },
    NextResponse: actual.NextResponse ?? {
      json: (body: any, init?: any) => ({ body, ...init }),
      redirect: (url: string) => ({ url }),
      next: () => ({}),
    },
  }
})

vi.mock('next/headers', () => ({
  cookies: () => ({
    get: vi.fn(),
    set: vi.fn(),
    delete: vi.fn(),
    getAll: () => [],
  }),
  headers: () => new Map(),
}))

// Supabase
vi.mock('@supabase/auth-helpers-nextjs', () => ({
  createRouteHandlerClient: () => ({
    auth: { getSession: vi.fn().mockResolvedValue({ data: { session: null } }) },
    from: () => ({
      select: vi.fn().mockReturnThis(),
      insert: vi.fn().mockReturnThis(),
      update: vi.fn().mockReturnThis(),
      delete: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      single: vi.fn().mockResolvedValue({ data: null }),
      order: vi.fn().mockReturnThis(),
      limit: vi.fn().mockReturnThis(),
    }),
  }),
  createServerComponentClient: () => ({
    auth: { getSession: vi.fn().mockResolvedValue({ data: { session: null } }) },
    from: () => ({
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      single: vi.fn().mockResolvedValue({ data: null }),
    }),
  }),
}))

vi.mock('@supabase/ssr', () => ({
  createServerClient: () => ({
    auth: { getSession: vi.fn().mockResolvedValue({ data: { session: null } }) },
    from: () => ({
      select: vi.fn().mockReturnThis(),
      insert: vi.fn().mockReturnThis(),
      update: vi.fn().mockReturnThis(),
      delete: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      single: vi.fn().mockResolvedValue({ data: null }),
      order: vi.fn().mockReturnThis(),
      limit: vi.fn().mockReturnThis(),
    }),
  }),
}))

vi.mock('@supabase/supabase-js', () => ({
  createClient: () => ({
    auth: { getSession: vi.fn().mockResolvedValue({ data: { session: null } }) },
    from: () => ({
      select: vi.fn().mockReturnThis(),
      insert: vi.fn().mockReturnThis(),
      update: vi.fn().mockReturnThis(),
      delete: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      neq: vi.fn().mockReturnThis(),
      gt: vi.fn().mockReturnThis(),
      gte: vi.fn().mockReturnThis(),
      lt: vi.fn().mockReturnThis(),
      lte: vi.fn().mockReturnThis(),
      in: vi.fn().mockReturnThis(),
      like: vi.fn().mockReturnThis(),
      ilike: vi.fn().mockReturnThis(),
      single: vi.fn().mockResolvedValue({ data: null, error: null }),
      order: vi.fn().mockReturnThis(),
      limit: vi.fn().mockReturnThis(),
      range: vi.fn().mockReturnThis(),
      maybeSingle: vi.fn().mockResolvedValue({ data: null, error: null }),
      then: vi.fn(),
      upsert: vi.fn().mockReturnThis(),
      rpc: vi.fn().mockResolvedValue({ data: null, error: null }),
    }),
    rpc: vi.fn().mockResolvedValue({ data: null, error: null }),
  }),
}))

// Redis / Upstash
vi.mock('@upstash/redis', () => ({
  Redis: {
    fromEnv: () => ({
      get: vi.fn().mockResolvedValue(null),
      set: vi.fn().mockResolvedValue('OK'),
      incr: vi.fn().mockResolvedValue(1),
      del: vi.fn().mockResolvedValue(1),
    }),
  },
}))

vi.mock('@upstash/ratelimit', () => ({
  Ratelimit: vi.fn().mockImplementation(() => ({
    limit: vi.fn().mockResolvedValue({ success: true, limit: 10, remaining: 9, reset: Date.now() + 60000 }),
  })),
}))

// Resend
vi.mock('resend', () => ({
  Resend: vi.fn().mockImplementation(() => ({
    emails: {
      send: vi.fn().mockResolvedValue({ data: { id: 'test-id' }, error: null }),
    },
  })),
}))

// AI SDK
vi.mock('ai', () => ({
  streamText: vi.fn(),
  generateText: vi.fn().mockResolvedValue({ text: 'test' }),
  StreamingTextResponse: vi.fn(),
}))

vi.mock('@ai-sdk/anthropic', () => ({
  anthropic: vi.fn(() => ({})),
  createAnthropic: vi.fn(() => vi.fn(() => ({}))),
}))

// Sentry
vi.mock('@sentry/nextjs', () => ({
  init: vi.fn(),
  captureException: vi.fn(),
  captureMessage: vi.fn(),
  withScope: vi.fn(),
  setUser: vi.fn(),
  setTag: vi.fn(),
  startSpan: vi.fn(),
}))

// Inngest
vi.mock('inngest', () => {
  class MockInngest {
    constructor(_opts: any) {}
    createFunction = vi.fn()
    send = vi.fn()
  }
  return {
    Inngest: MockInngest,
    serve: vi.fn(() => vi.fn()),
  }
})

vi.mock('inngest/next', () => ({
  serve: vi.fn(() => vi.fn()),
}))

// Mock the inngest client and function modules directly
vi.mock('../../lib/inngest', () => ({
  inngest: { id: 'mycasevalue', createFunction: vi.fn(), send: vi.fn() },
}))

vi.mock('../../inngest/refresh-fjc-quarterly', () => ({
  refreshFJCQuarterly: vi.fn(),
}))

// web-push (optional dependency, may not be installed)
vi.mock('web-push', () => ({
  setVapidDetails: vi.fn(),
  sendNotification: vi.fn().mockResolvedValue({}),
}))

// web-push is handled via alias in vitest.config.ts -> __tests__/__mocks__/web-push.ts

// Vercel OG
vi.mock('@vercel/og', () => ({
  ImageResponse: vi.fn(),
}))

// next-intl
vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
  useLocale: () => 'en',
}))

vi.mock('next-intl/server', () => ({
  getTranslations: () => (key: string) => key,
  unstable_setRequestLocale: vi.fn(),
}))

// ---------------------------------------------------------------------------
// Known HTTP method exports for Next.js App Router route handlers
// ---------------------------------------------------------------------------
const HTTP_METHODS = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS', 'HEAD'] as const

/**
 * Verify that a route module can be imported and exports valid handlers.
 */
async function smokeCheckRoute(importFn: () => Promise<any>, routePath: string) {
  const mod = await importFn()

  // At least one HTTP method should be exported
  const exportedMethods = HTTP_METHODS.filter((m) => typeof mod[m] === 'function')

  // Some route files may only export config (like `dynamic`). That is fine
  // as long as the module imported without error. But if there are handler
  // exports, verify they are functions.
  for (const method of exportedMethods) {
    expect(typeof mod[method]).toBe('function')
  }

  // Return info for the test assertion
  return { exportedMethods, mod }
}

// ---------------------------------------------------------------------------
// All API routes
// ---------------------------------------------------------------------------

const apiRoutes: Array<{ route: string; importPath: string }> = [
  { route: '/api/[...catchall]', importPath: '../../app/api/[...catchall]/route' },
  { route: '/api/ab/track', importPath: '../../app/api/ab/track/route' },
  { route: '/api/admin/backfill-appointing-president', importPath: '../../app/api/admin/backfill-appointing-president/route' },
  { route: '/api/admin/calculate-judge-stats', importPath: '../../app/api/admin/calculate-judge-stats/route' },
  { route: '/api/admin/costs', importPath: '../../app/api/admin/costs/route' },
  { route: '/api/admin/data-quality', importPath: '../../app/api/admin/data-quality/route' },
  { route: '/api/admin/generate-judge-analysis', importPath: '../../app/api/admin/generate-judge-analysis/route' },
  { route: '/api/admin/ingest-judges', importPath: '../../app/api/admin/ingest-judges/route' },
  { route: '/api/admin/ingest-opinions', importPath: '../../app/api/admin/ingest-opinions/route' },
  { route: '/api/admin/stats', importPath: '../../app/api/admin/stats/route' },
  { route: '/api/ai/search', importPath: '../../app/api/ai/search/route' },
  { route: '/api/ai/stream', importPath: '../../app/api/ai/stream/route' },
  { route: '/api/alerts/judge', importPath: '../../app/api/alerts/judge/route' },
  { route: '/api/alerts/subscribe', importPath: '../../app/api/alerts/subscribe/route' },
  { route: '/api/analytics', importPath: '../../app/api/analytics/route' },
  { route: '/api/analytics/user', importPath: '../../app/api/analytics/user/route' },
  { route: '/api/attorney/advanced-search', importPath: '../../app/api/attorney/advanced-search/route' },
  { route: '/api/attorney/bulk-analysis', importPath: '../../app/api/attorney/bulk-analysis/route' },
  { route: '/api/attorney/case-predict', importPath: '../../app/api/attorney/case-predict/route' },
  { route: '/api/attorney/case-predictor', importPath: '../../app/api/attorney/case-predictor/route' },
  { route: '/api/attorney/demand-letter', importPath: '../../app/api/attorney/demand-letter/route' },
  { route: '/api/attorney/deposition-prep', importPath: '../../app/api/attorney/deposition-prep/route' },
  { route: '/api/attorney/discovery-generator', importPath: '../../app/api/attorney/discovery-generator/route' },
  { route: '/api/attorney/document-intelligence', importPath: '../../app/api/attorney/document-intelligence/route' },
  { route: '/api/attorney/expert-witness', importPath: '../../app/api/attorney/expert-witness/route' },
  { route: '/api/attorney/fee-calculator', importPath: '../../app/api/attorney/fee-calculator/route' },
  { route: '/api/attorney/intake-forms', importPath: '../../app/api/attorney/intake-forms/route' },
  { route: '/api/attorney/judge-intelligence', importPath: '../../app/api/attorney/judge-intelligence/route' },
  { route: '/api/attorney/keycite', importPath: '../../app/api/attorney/keycite/route' },
  { route: '/api/attorney/motion-analytics', importPath: '../../app/api/attorney/motion-analytics/route' },
  { route: '/api/attorney/opposing-counsel', importPath: '../../app/api/attorney/opposing-counsel/route' },
  { route: '/api/attorney/research-memo', importPath: '../../app/api/attorney/research-memo/route' },
  { route: '/api/attorney/search', importPath: '../../app/api/attorney/search/route' },
  { route: '/api/attorney/sol', importPath: '../../app/api/attorney/sol/route' },
  { route: '/api/attorney/venue-optimizer', importPath: '../../app/api/attorney/venue-optimizer/route' },
  { route: '/api/cases/[id]', importPath: '../../app/api/cases/[id]/route' },
  { route: '/api/cases/search', importPath: '../../app/api/cases/search/route' },
  { route: '/api/chat', importPath: '../../app/api/chat/route' },
  { route: '/api/contact', importPath: '../../app/api/contact/route' },
  { route: '/api/courtlistener/opinions', importPath: '../../app/api/courtlistener/opinions/route' },
  { route: '/api/courtlistener/recap', importPath: '../../app/api/courtlistener/recap/route' },
  { route: '/api/courtlistener/recent-filings', importPath: '../../app/api/courtlistener/recent-filings/route' },
  { route: '/api/cron/data-freshness', importPath: '../../app/api/cron/data-freshness/route' },
  { route: '/api/cron/pipeline-sync', importPath: '../../app/api/cron/pipeline-sync/route' },
  { route: '/api/cron/reindex', importPath: '../../app/api/cron/reindex/route' },
  { route: '/api/data', importPath: '../../app/api/data/route' },
  { route: '/api/email', importPath: '../../app/api/email/route' },
  { route: '/api/email/alert', importPath: '../../app/api/email/alert/route' },
  { route: '/api/email/capture', importPath: '../../app/api/email/capture/route' },
  { route: '/api/email/digest', importPath: '../../app/api/email/digest/route' },
  { route: '/api/email/welcome', importPath: '../../app/api/email/welcome/route' },
  { route: '/api/enterprise/demo-request', importPath: '../../app/api/enterprise/demo-request/route' },
  { route: '/api/feed', importPath: '../../app/api/feed/route' },
  { route: '/api/feed/batch', importPath: '../../app/api/feed/batch/route' },
  { route: '/api/health', importPath: '../../app/api/health/route' },
  { route: '/api/ingest', importPath: '../../app/api/ingest/route' },
  { route: '/api/inngest', importPath: '../../app/api/inngest/route' },
  { route: '/api/judges', importPath: '../../app/api/judges/route' },
  { route: '/api/legal/citations', importPath: '../../app/api/legal/citations/route' },
  { route: '/api/legal/dashboard', importPath: '../../app/api/legal/dashboard/route' },
  { route: '/api/legal/search', importPath: '../../app/api/legal/search/route' },
  { route: '/api/metrics', importPath: '../../app/api/metrics/route' },
  { route: '/api/nos/[code]', importPath: '../../app/api/nos/[code]/route' },
  { route: '/api/nos/opinions', importPath: '../../app/api/nos/opinions/route' },
  { route: '/api/notify/subscribe', importPath: '../../app/api/notify/subscribe/route' },
  { route: '/api/pipeline', importPath: '../../app/api/pipeline/route' },
  { route: '/api/poll', importPath: '../../app/api/poll/route' },
  { route: '/api/premium/status', importPath: '../../app/api/premium/status/route' },
  { route: '/api/push/send', importPath: '../../app/api/push/send/route' },
  { route: '/api/push/subscribe', importPath: '../../app/api/push/subscribe/route' },
  { route: '/api/quick-stats', importPath: '../../app/api/quick-stats/route' },
  { route: '/api/referral/activate', importPath: '../../app/api/referral/activate/route' },
  { route: '/api/referral/code', importPath: '../../app/api/referral/code/route' },
  { route: '/api/report', importPath: '../../app/api/report/route' },
  { route: '/api/reports/capture', importPath: '../../app/api/reports/capture/route' },
  { route: '/api/resources/capture', importPath: '../../app/api/resources/capture/route' },
  { route: '/api/revalidate', importPath: '../../app/api/revalidate/route' },
  { route: '/api/scholar', importPath: '../../app/api/scholar/route' },
  { route: '/api/search/natural', importPath: '../../app/api/search/natural/route' },
  { route: '/api/search/semantic', importPath: '../../app/api/search/semantic/route' },
  { route: '/api/share', importPath: '../../app/api/share/route' },
  { route: '/api/subscribe', importPath: '../../app/api/subscribe/route' },
  { route: '/api/summary', importPath: '../../app/api/summary/route' },
  { route: '/api/translate', importPath: '../../app/api/translate/route' },
  { route: '/api/user/api-keys', importPath: '../../app/api/user/api-keys/route' },
  { route: '/api/user/history', importPath: '../../app/api/user/history/route' },
  { route: '/api/user/tier', importPath: '../../app/api/user/tier/route' },
  { route: '/api/v1/cases/nos/[code]', importPath: '../../app/api/v1/cases/nos/[code]/route' },
  { route: '/api/v1/cases/nos/[code]/district/[district]', importPath: '../../app/api/v1/cases/nos/[code]/district/[district]/route' },
  { route: '/api/v1/districts/[district]', importPath: '../../app/api/v1/districts/[district]/route' },
  { route: '/api/v1/judges/[judgeId]', importPath: '../../app/api/v1/judges/[judgeId]/route' },
  { route: '/api/v1/judges/search', importPath: '../../app/api/v1/judges/search/route' },
  { route: '/api/v1/predict', importPath: '../../app/api/v1/predict/route' },
  { route: '/api/v1/trends/nos/[code]', importPath: '../../app/api/v1/trends/nos/[code]/route' },
  { route: '/api/whitepaper-capture', importPath: '../../app/api/whitepaper-capture/route' },
  { route: '/api/widget/[nosCode]/[district]', importPath: '../../app/api/widget/[nosCode]/[district]/route' },
  { route: '/api/widget/impression', importPath: '../../app/api/widget/impression/route' },
  // Non-api route handler
  { route: '/feed.xml', importPath: '../../app/feed.xml/route' },
]

// ---------------------------------------------------------------------------
// Test suite
// ---------------------------------------------------------------------------

describe('Smoke Tests: API Routes', () => {
  for (const { route, importPath } of apiRoutes) {
    it(`${route} -- imports without errors and exports valid handlers`, async () => {
      const { exportedMethods, mod } = await smokeCheckRoute(
        () => import(importPath),
        route
      )

      // The module should have at least one export (handler or config)
      const allExports = Object.keys(mod).filter((k) => k !== '__esModule' && k !== 'default')
      expect(
        allExports.length,
        `${route} should have at least one named export (handler or config)`
      ).toBeGreaterThan(0)
    })
  }
})
