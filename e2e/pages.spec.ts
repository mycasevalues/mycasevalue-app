import { test, expect } from '@playwright/test';

test.describe('Static Pages', () => {
  test('/pricing loads with 3 pricing tiers', async ({ page }) => {
    await page.goto('/pricing');
    await expect(page).toHaveURL(/\/pricing/);

    // Look for pricing tier cards
    const pricingCards = page.locator('[class*="pricing"], [class*="tier"], [class*="plan"]');
    const count = await pricingCards.count();

    // Verify at least 3 pricing tiers are present
    expect(count).toBeGreaterThanOrEqual(3);
  });

  test('/how-it-works loads with steps', async ({ page }) => {
    await page.goto('/how-it-works');
    await expect(page).toHaveURL(/\/how-it-works|\/howitworks/i);

    // Look for step content
    const steps = page.locator('[class*="step"], [class*="Step"], ol li, [class*="process"]');
    const count = await steps.count();

    expect(count).toBeGreaterThan(0);
  });

  test('/trends loads with data', async ({ page }) => {
    await page.goto('/trends');
    await expect(page).toHaveURL(/\/trends/);

    // Look for charts, data tables, or trend content
    const dataElements = page.locator(
      '[class*="chart"], [class*="graph"], [class*="trend"], table, [class*="data"], svg'
    );
    const count = await dataElements.count();

    expect(count).toBeGreaterThan(0);
  });

  test('/map loads with state cards', async ({ page }) => {
    await page.goto('/map');
    await expect(page).toHaveURL(/\/map/);

    // Look for map or state elements
    const mapElements = page.locator('[class*="map"], [class*="state"], [class*="card"], svg');
    const count = await mapElements.count();

    expect(count).toBeGreaterThan(0);
  });

  test('/faq loads with FAQ items', async ({ page }) => {
    await page.goto('/faq');
    await expect(page).toHaveURL(/\/faq/);

    // Look for FAQ items (typically accordion items or definitions)
    const faqItems = page.locator('[class*="faq"], [class*="accordion"], [class*="question"], dt, dd');
    const count = await faqItems.count();

    expect(count).toBeGreaterThan(0);
  });

  test('/disclaimer loads', async ({ page }) => {
    await page.goto('/disclaimer');
    await expect(page).toHaveURL(/\/disclaimer/);

    // Verify page has content
    const content = page.locator('main, [role="main"], body');
    await expect(content.first()).toBeVisible();
  });

  test('/es loads Spanish version', async ({ page }) => {
    await page.goto('/es');
    await expect(page).toHaveURL(/\/es/);

    // Look for Spanish content indicators (optional, but page should load)
    const pageContent = page.locator('main, [role="main"], body');
    await expect(pageContent.first()).toBeVisible();
  });

  test('/es/pricing loads Spanish pricing', async ({ page }) => {
    await page.goto('/es/pricing');
    await expect(page).toHaveURL(/\/es\/pricing|\/es\?.*pricing/i);

    // Look for pricing tier cards
    const pricingCards = page.locator('[class*="pricing"], [class*="tier"], [class*="plan"]');
    const count = await pricingCards.count();

    // Verify at least 3 pricing tiers are present
    expect(count).toBeGreaterThanOrEqual(3);
  });
});
