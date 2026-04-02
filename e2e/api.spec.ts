import { test, expect } from '@playwright/test';

test.describe('API Endpoints', () => {
  const baseURL = 'http://localhost:3000';

  test('GET /api/health returns 200', async ({ request }) => {
    const response = await request.get(`${baseURL}/api/health`);
    expect(response.status()).toBe(200);

    const data = await response.json();
    expect(data).toBeDefined();
  });

  test('POST /api/analytics accepts events', async ({ request }) => {
    const response = await request.post(`${baseURL}/api/analytics`, {
      data: {
        event: 'page_view',
        page: '/test',
        timestamp: Date.now(),
      },
    });

    // Accept 200, 201, or 204 (No Content) as success
    expect([200, 201, 204]).toContain(response.status());
  });

  test('GET /api/premium/status returns status for unknown email', async ({ request }) => {
    const response = await request.get(
      `${baseURL}/api/premium/status?email=unknown@example.com`
    );

    // Should return 200 with status info or 404
    expect([200, 404]).toContain(response.status());

    if (response.status() === 200) {
      const data = await response.json();
      expect(data).toBeDefined();
    }
  });

  test('POST /api/ab/track accepts conversion events', async ({ request }) => {
    const response = await request.post(`${baseURL}/api/ab/track`, {
      data: {
        event: 'conversion',
        experiment: 'test_experiment',
        variant: 'control',
        timestamp: Date.now(),
      },
    });

    // Accept 200, 201, or 204 as success
    expect([200, 201, 204]).toContain(response.status());
  });

  test('GET /api/quick-stats returns stats', async ({ request }) => {
    const response = await request.get(`${baseURL}/api/quick-stats`);

    // Accept 200 or 404
    expect([200, 404]).toContain(response.status());

    if (response.status() === 200) {
      const data = await response.json();
      expect(data).toBeDefined();
    }
  });
});
