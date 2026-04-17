import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'

// Mock createClient before importing
vi.mock('@supabase/supabase-js', () => ({
  createClient: vi.fn(() => ({
    from: vi.fn(),
    auth: { getUser: vi.fn() },
  })),
}))

describe('lib/supabase', () => {
  let supabaseModule: any

  beforeEach(() => {
    // Clear the module cache to reset lazy-loaded clients
    vi.resetModules()
    // Set required env vars
    process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://test.supabase.co'
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'test-anon-key'
    process.env.SUPABASE_SERVICE_ROLE_KEY = 'test-service-role-key'
  })

  afterEach(() => {
    vi.resetAllMocks()
  })

  it('getSupabase() returns a client when env vars are set', async () => {
    const { getSupabase } = await import('../../lib/supabase')
    const client = getSupabase()
    expect(client).toBeDefined()
    expect(client).toHaveProperty('from')
  })

  it('getSupabase() throws error when URL is missing', async () => {
    delete process.env.NEXT_PUBLIC_SUPABASE_URL
    vi.resetModules()

    const { getSupabase } = await import('../../lib/supabase')
    expect(() => getSupabase()).toThrow('Supabase URL and anon key are required')
  })

  it('getSupabase() throws error when anon key is missing', async () => {
    delete process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    vi.resetModules()

    const { getSupabase } = await import('../../lib/supabase')
    expect(() => getSupabase()).toThrow('Supabase URL and anon key are required')
  })

  it('getSupabaseAdmin() returns a client when env vars are set', async () => {
    const { getSupabaseAdmin } = await import('../../lib/supabase')
    const client = getSupabaseAdmin()
    expect(client).toBeDefined()
    expect(client).toHaveProperty('from')
  })

  it('getSupabaseAdmin() throws error when service role key is missing', async () => {
    delete process.env.SUPABASE_SERVICE_ROLE_KEY
    vi.resetModules()

    const { getSupabaseAdmin } = await import('../../lib/supabase')
    expect(() => getSupabaseAdmin()).toThrow('Supabase URL and service role key are required')
  })

  it('getSupabase() caches the client on subsequent calls', async () => {
    const { getSupabase } = await import('../../lib/supabase')
    const client1 = getSupabase()
    const client2 = getSupabase()
    expect(client1).toBe(client2)
  })
})
