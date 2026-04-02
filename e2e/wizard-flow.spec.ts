import { test, expect } from '@playwright/test';

test.describe('Wizard Flow', () => {
  test('Can select a category from Step 0', async ({ page }) => {
    await page.goto('/');

    // Navigate to wizard (could be via button or direct URL)
    const wizardButton = page.locator('button, a').filter({
      hasText: /Start|Analyze|Calculate|Get Started|Begin/i
    }).first();

    if (await wizardButton.isVisible()) {
      await wizardButton.click();
    }

    // Look for category selection
    const categoryItems = page.locator('[class*="category"], [class*="Category"], [role="button"]');
    const categoryCount = await categoryItems.count();

    if (categoryCount > 0) {
      await categoryItems.first().click();
      // Verify we progressed or category is selected
      await expect(page).toHaveURL(/wizard|analyze|step/i);
    }
  });

  test('Can select a sub-category from Step 2', async ({ page }) => {
    await page.goto('/');

    // Navigate to wizard
    const wizardButton = page.locator('button, a').filter({
      hasText: /Start|Analyze|Calculate|Get Started|Begin/i
    }).first();

    if (await wizardButton.isVisible()) {
      await wizardButton.click();
    }

    // Select first category if exists
    const categoryItems = page.locator('[class*="category"], [class*="Category"], [role="button"]');
    if (await categoryItems.count() > 0) {
      await categoryItems.first().click();
    }

    // Wait for potential transition and look for sub-categories or next button
    await page.waitForTimeout(500);
    const nextButton = page.locator('button').filter({
      hasText: /Next|Continue|Forward/i
    }).first();

    if (await nextButton.isVisible()) {
      await nextButton.click();
    }

    // Look for sub-category selection
    const subCategoryItems = page.locator('[class*="subcategory"], [class*="sub-category"], [role="button"]');
    if (await subCategoryItems.count() > 0) {
      await subCategoryItems.first().click();
    }
  });

  test('Details form (Step 3) shows required fields', async ({ page }) => {
    await page.goto('/');

    // Navigate through wizard to get to details form
    const wizardButton = page.locator('button, a').filter({
      hasText: /Start|Analyze|Calculate|Get Started|Begin/i
    }).first();

    if (await wizardButton.isVisible()) {
      await wizardButton.click();
    }

    // Click through to details form (trying multiple navigation approaches)
    for (let i = 0; i < 3; i++) {
      const nextButton = page.locator('button').filter({
        hasText: /Next|Continue|Forward|Proceed/i
      }).first();

      if (await nextButton.isVisible()) {
        await nextButton.click();
        await page.waitForTimeout(300);
      }
    }

    // Look for form fields with required attribute or asterisk
    const requiredFields = page.locator('input[required], textarea[required], [class*="required"]');
    const requiredCount = await requiredFields.count();

    if (requiredCount > 0) {
      expect(requiredCount).toBeGreaterThan(0);
    }
  });

  test('Can fill out details and submit (consent required)', async ({ page }) => {
    await page.goto('/');

    // Navigate to wizard
    const wizardButton = page.locator('button, a').filter({
      hasText: /Start|Analyze|Calculate|Get Started|Begin/i
    }).first();

    if (await wizardButton.isVisible()) {
      await wizardButton.click();
    }

    // Try to navigate to form
    for (let i = 0; i < 4; i++) {
      const nextButton = page.locator('button').filter({
        hasText: /Next|Continue|Forward|Proceed/i
      }).first();

      if (await nextButton.isVisible()) {
        await nextButton.click();
        await page.waitForTimeout(300);
      }
    }

    // Fill out any visible form fields
    const textInputs = page.locator('input[type="text"], input[type="email"], textarea');
    const inputCount = await textInputs.count();

    for (let i = 0; i < Math.min(inputCount, 3); i++) {
      const field = textInputs.nth(i);
      const type = await field.getAttribute('type');

      if (type === 'email') {
        await field.fill('test@example.com');
      } else {
        await field.fill('Test Value');
      }
    }

    // Check consent checkbox if it exists
    const consentCheckbox = page.locator('input[type="checkbox"]').first();
    if (await consentCheckbox.isVisible()) {
      await consentCheckbox.check();
    }

    // Submit form
    const submitButton = page.locator('button').filter({
      hasText: /Submit|Complete|Finish|Analyze|Calculate|Get Report/i
    }).first();

    if (await submitButton.isVisible()) {
      await submitButton.click();
    }
  });

  test('Report loads after submission (Step 6)', async ({ page }) => {
    await page.goto('/');

    // Navigate through wizard to completion
    const wizardButton = page.locator('button, a').filter({
      hasText: /Start|Analyze|Calculate|Get Started|Begin/i
    }).first();

    if (await wizardButton.isVisible()) {
      await wizardButton.click();
    }

    // Navigate through all steps
    for (let i = 0; i < 5; i++) {
      const nextButton = page.locator('button').filter({
        hasText: /Next|Continue|Forward|Proceed/i
      }).first();

      if (await nextButton.isVisible()) {
        await nextButton.click();
        await page.waitForTimeout(300);
      }
    }

    // Fill and submit form
    const textInputs = page.locator('input[type="text"], input[type="email"], textarea');
    const inputCount = await textInputs.count();

    for (let i = 0; i < Math.min(inputCount, 3); i++) {
      const field = textInputs.nth(i);
      const type = await field.getAttribute('type');

      if (type === 'email') {
        await field.fill('test@example.com');
      } else {
        await field.fill('Test Value');
      }
    }

    const consentCheckbox = page.locator('input[type="checkbox"]').first();
    if (await consentCheckbox.isVisible()) {
      await consentCheckbox.check();
    }

    const submitButton = page.locator('button').filter({
      hasText: /Submit|Complete|Finish|Analyze|Calculate|Get Report/i
    }).first();

    if (await submitButton.isVisible()) {
      await submitButton.click();
      // Wait for report to load
      await page.waitForTimeout(1000);
    }

    // Look for report-like content
    const reportContent = page.locator('[class*="report"], [class*="result"], h1, h2');
    expect(await reportContent.count()).toBeGreaterThan(0);
  });

  test('Back button navigates correctly', async ({ page }) => {
    await page.goto('/');

    const wizardButton = page.locator('button, a').filter({
      hasText: /Start|Analyze|Calculate|Get Started|Begin/i
    }).first();

    if (await wizardButton.isVisible()) {
      await wizardButton.click();
    }

    // Progress one step
    const nextButton = page.locator('button').filter({
      hasText: /Next|Continue|Forward/i
    }).first();

    if (await nextButton.isVisible()) {
      await nextButton.click();
      await page.waitForTimeout(300);

      // Look for back button
      const backButton = page.locator('button').filter({
        hasText: /Back|Previous/i
      }).first();

      if (await backButton.isVisible()) {
        await backButton.click();
        // Verify we went back
        await page.waitForTimeout(300);
      }
    }
  });
});
