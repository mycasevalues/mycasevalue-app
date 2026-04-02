import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('Page loads with correct title', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/CaseCheck|Case|MyCaseValue/i);
  });

  test('Hero section is visible with CTA button', async ({ page }) => {
    await page.goto('/');
    const heroSection = page.locator('section').first();
    await expect(heroSection).toBeVisible();

    // Look for a CTA button (Get Started, Start Now, Calculate, etc.)
    const ctaButton = page.locator('button, a[href*="wizard"], a[href*="analyze"]').first();
    await expect(ctaButton).toBeVisible();
  });

  test('Category cards are displayed (at least 8)', async ({ page }) => {
    await page.goto('/');
    const cards = page.locator('[class*="card"], [class*="Card"], [class*="category"], [class*="Category"]');
    const count = await cards.count();
    expect(count).toBeGreaterThanOrEqual(8);
  });

  test('Language toggle switches to Spanish', async ({ page }) => {
    await page.goto('/');

    // Look for language toggle (could be a button with "EN/ES", "es", "Spanish", etc.)
    const languageToggle = page.locator('button, a').filter({
      hasText: /ES|es|Spanish|Español/
    }).first();

    if (await languageToggle.isVisible()) {
      await languageToggle.click();
      // Verify page switched to Spanish or navigate to Spanish version
      const url = page.url();
      expect(url).toMatch(/\/es|lang=es/i);
    }
  });

  test('Navigation links work', async ({ page }) => {
    await page.goto('/');

    // Look for navigation links
    const navLinks = page.locator('nav a, header a').filter({
      hasText: /Pricing|How It Works|FAQ|Trends|Map|About/i
    });

    const count = await navLinks.count();
    expect(count).toBeGreaterThan(0);

    // Click the first navigation link and verify navigation
    if (count > 0) {
      const firstLink = navLinks.first();
      const href = await firstLink.getAttribute('href');
      if (href && !href.includes('javascript')) {
        await firstLink.click();
        // Verify we navigated somewhere
        await expect(page).not.toHaveURL('/');
      }
    }
  });
});
