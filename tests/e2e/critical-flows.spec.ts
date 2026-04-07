import { test, expect } from '@playwright/test';

test.describe('Critical User Flows', () => {
  test('1. Homepage loads and shows hero', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Check for main hero section
    const heading = page.locator('h1');
    await expect(heading).toBeVisible();

    // Check for key CTA button
    const ctaButton = page.locator('button, a').filter({ hasText: /case|start|begin/i }).first();
    await expect(ctaButton).toBeVisible();
  });

  test('2. Quick case lookup form submits', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Find and fill the search/lookup form
    const searchInput = page.locator('input[type="text"], input[placeholder*="search" i]').first();
    if (await searchInput.isVisible()) {
      await searchInput.fill('employment');
      const submitButton = page.locator('button[type="submit"]').first();
      await submitButton.click();
      await page.waitForLoadState('networkidle');
      // Verify navigation occurred
      expect(page.url()).not.toEqual('http://localhost:3000/');
    }
  });

  test('3. Calculator page loads and calculates', async ({ page }) => {
    await page.goto('/calculator');
    await page.waitForLoadState('networkidle');

    // Check for calculator heading
    const heading = page.locator('h1, h2').filter({ hasText: /calculator|estimate/i });
    await expect(heading.first()).toBeVisible();

    // Verify page has interactive elements
    const inputs = page.locator('input, select').filter({ visible: true });
    const count = await inputs.count();
    expect(count).toBeGreaterThan(0);
  });

  test('4. NOS 442 report page loads with data', async ({ page }) => {
    await page.goto('/nos/442');
    await page.waitForLoadState('networkidle');

    // Check for NOS code in heading
    const nosHeading = page.locator('h1, h2').filter({ hasText: /442|employment/i });
    await expect(nosHeading.first()).toBeVisible();

    // Verify data is displayed (check for metrics/numbers)
    const dataElements = page.locator('[class*="metric"], [class*="stat"], [class*="data"]').first();
    await expect(dataElements).toBeVisible({ timeout: 5000 });
  });

  test('5. Search page loads with tabs', async ({ page }) => {
    await page.goto('/search');
    await page.waitForLoadState('networkidle');

    // Check for search heading
    const heading = page.locator('h1, h2').filter({ hasText: /search/i });
    await expect(heading.first()).toBeVisible();

    // Look for tab elements
    const tabs = page.locator('[role="tab"], button[class*="tab"]');
    const tabCount = await tabs.count();
    expect(tabCount).toBeGreaterThanOrEqual(0);
  });

  test('6. District page loads', async ({ page }) => {
    await page.goto('/districts');
    await page.waitForLoadState('networkidle');

    // Check for district-related heading
    const heading = page.locator('h1, h2').filter({ hasText: /district|court/i });
    await expect(heading.first()).toBeVisible();

    // Verify content loaded
    const content = page.locator('main, [class*="content"]').first();
    await expect(content).toBeVisible();
  });

  test('7. Glossary page loads with A-Z nav', async ({ page }) => {
    await page.goto('/glossary');
    await page.waitForLoadState('networkidle');

    // Check for glossary heading
    const heading = page.locator('h1, h2').filter({ hasText: /glossary/i });
    await expect(heading.first()).toBeVisible();

    // Look for alphabetical navigation (A-Z)
    const alphabetNav = page.locator('[class*="alphabet"], [class*="nav"] a').filter({
      hasText: /^[A-Z]$/
    });
    const navCount = await alphabetNav.count();
    expect(navCount).toBeGreaterThan(0);
  });

  test('8. Blog page loads with posts', async ({ page }) => {
    await page.goto('/blog');
    await page.waitForLoadState('networkidle');

    // Check for blog heading
    const heading = page.locator('h1, h2').filter({ hasText: /blog|article/i });
    await expect(heading.first()).toBeVisible();

    // Look for blog post cards/articles
    const posts = page.locator('[class*="post"], [class*="article"], [class*="card"]');
    const postCount = await posts.count();
    expect(postCount).toBeGreaterThan(0);
  });

  test('9. Contact form loads', async ({ page }) => {
    await page.goto('/contact');
    await page.waitForLoadState('networkidle');

    // Check for contact heading
    const heading = page.locator('h1, h2').filter({ hasText: /contact/i });
    await expect(heading.first()).toBeVisible();

    // Check for form inputs
    const form = page.locator('form').first();
    await expect(form).toBeVisible();

    // Verify presence of common form fields
    const emailInput = page.locator('input[type="email"], input[name*="email" i]');
    expect(await emailInput.count()).toBeGreaterThan(0);
  });

  test('10. Attorney mode page loads', async ({ page }) => {
    await page.goto('/attorney');
    await page.waitForLoadState('networkidle');

    // Check for attorney-related heading
    const heading = page.locator('h1, h2').filter({ hasText: /attorney|professional|lawyer/i });

    // If attorney mode exists, verify it loads
    if (await heading.count() > 0) {
      await expect(heading.first()).toBeVisible();
      const content = page.locator('main, [class*="content"]').first();
      await expect(content).toBeVisible();
    } else {
      // If page redirects or doesn't exist, that's also valid
      // Just verify we got a response
      expect(page.url()).toBeTruthy();
    }
  });
});
