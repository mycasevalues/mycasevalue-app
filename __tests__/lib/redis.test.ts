import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'

describe('lib/redis', () => {
  beforeEach(() => {
    vi.resetModules()
  })

  afterEach(() => {
    vi.resetAllMocks()
    delete process.env.UPSTASH_REDIS_REST_URL
    delete process.env.UPSTASH_REDIS_REST_TOKEN
  })

  it('getRedis() returns null when env vars are missing', async () => {
    delete process.env.UPSTASH_REDIS_REST_URL
    delete process.env.UPSTASH_REDIS_REST_TOKEN

    const { getRedis } = await import('../../lib/redis')
    const redis = getRedis()
    expect(redis).toBeNull()
  })

  it('getRedis() returns null when only URL is set', async () => {
    process.env.UPSTASH_REDIS_REST_URL = 'https://test.upstash.io'
    delete process.env.UPSTASH_REDIS_REST_TOKEN
    vi.resetModules()

    const { getRedis } = await import('../../lib/redis')
    const redis = getRedis()
    expect(redis).toBeNull()
  })

  it('getRedis() returns null when only token is set', async () => {
    delete process.env.UPSTASH_REDIS_REST_URL
    process.env.UPSTASH_REDIS_REST_TOKEN = 'test-token'
    vi.resetModules()

    const { getRedis } = await import('../../lib/redis')
    const redis = getRedis()
    expect(redis).toBeNull()
  })

  it('getRateLimiter() returns null when Redis is not available', async () => {
    delete process.env.UPSTASH_REDIS_REST_URL
    delete process.env.UPSTASH_REDIS_REST_TOKEN

    const { getRateLimiter } = await import('../../lib/redis')
    const limiter = getRateLimiter()
    expect(limiter).toBeNull()
  })

  it('cacheGet() returns null when Redis is not available', async () => {
    delete process.env.UPSTASH_REDIS_REST_URL
    delete process.env.UPSTASH_REDIS_REST_TOKEN

    const { cacheGet } = await import('../../lib/redis')
    const result = await cacheGet('test-key')
    expect(result).toBeNull()
  })

  it('cacheSet() completes gracefully when Redis is not available', async () => {
    delete process.env.UPSTASH_REDIS_REST_URL
    delete process.env.UPSTASH_REDIS_REST_TOKEN

    const { cacheSet } = await import('../../lib/redis')
    // Should not throw
    await expect(cacheSet('test-key', 'test-value')).resolves.toBeUndefined()
  })
})
