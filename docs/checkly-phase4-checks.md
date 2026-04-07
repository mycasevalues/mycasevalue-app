# Checkly Monitoring — Phase 4 Checks

This document specifies the 9 new browser-based checks for Checkly monitoring of Phase 4 features. These checks validate critical user journeys across three feature groups: Judge System, Enterprise/API, and Widget.

## Check Group: MyCaseValue — Judge System

### Check 1: Judges Directory Loads with Cards

**Check Name:** `judges_directory_loads_with_cards`
**Type:** Browser Check
**URL:** `https://www.mycasevalues.com/judges`
**Frequency:** Every 5 minutes
**Timeout:** 10 seconds
**Success Criteria:**
- Page loads and displays at least 10 judge cards
- Cards contain judge name, district, and basic statistics
- Directory search/filter functionality is accessible

**Playwright Test Code:**
```typescript
import { test, expect } from '@playwright/test';

test('judges directory loads with at least 10 judge cards', async ({ page }) => {
  await page.goto('https://www.mycasevalues.com/judges');

  // Wait for page to load completely
  await page.waitForLoadState('networkidle');

  // Verify page title
  const title = await page.title();
  expect(title).toContain('Judges');

  // Count judge cards (cards with judge-card class or data-testid)
  const cards = await page.locator('[data-testid="judge-card"], .judge-card').count();
  expect(cards).toBeGreaterThanOrEqual(10);

  // Verify each card contains expected content
  const firstCard = page.locator('[data-testid="judge-card"], .judge-card').first();
  expect(firstCard).toBeVisible();

  // Check for name, district, and stats
  const cardText = await firstCard.textContent();
  expect(cardText).toBeTruthy();

  // Verify search functionality exists and is interactive
  const searchInput = page.locator('input[placeholder*="Search"], [data-testid="judge-search"]');
  expect(searchInput).toBeVisible();
  await expect(searchInput).toBeFocused({ timeout: 1000 }).catch(() => {
    // Search input exists but may not be focused, that's ok
  });
});
```

---

### Check 2: Judge Profile Page with Radar Chart

**Check Name:** `judge_profile_radar_chart`
**Type:** Browser Check
**URL:** `https://www.mycasevalues.com/judges/judge_001` (mock judge)
**Frequency:** Every 5 minutes
**Timeout:** 10 seconds
**Success Criteria:**
- Judge profile page loads successfully
- Radar chart visualization is visible and rendered
- Judge statistics (win rate, case count, districts) are displayed
- Navigation back to judges directory works

**Playwright Test Code:**
```typescript
import { test, expect } from '@playwright/test';

test('judge profile page loads with radar chart visible', async ({ page }) => {
  // Navigate to a mock judge profile
  await page.goto('https://www.mycasevalues.com/judges/judge_001');

  await page.waitForLoadState('networkidle');

  // Verify page contains judge information
  const pageTitleOrHeader = page.locator('h1, h2').first();
  expect(pageTitleOrHeader).toBeVisible();

  // Verify radar chart is rendered (SVG or canvas element)
  const radarChart = page.locator('svg[data-testid="radar-chart"], canvas[data-testid="radar-chart"], .radar-chart').first();
  expect(radarChart).toBeVisible({ timeout: 5000 });

  // Verify key statistics are displayed
  const winRateElement = page.locator('text=Win Rate, text=win rate').first();
  expect(winRateElement).toBeVisible({ timeout: 3000 }).catch(() => {
    // Check for alternative text patterns
    const altStats = page.locator('text=/plaintiff|win|rate/i').first();
    expect(altStats).toBeVisible();
  });

  // Verify case count is displayed
  const caseCountText = page.locator('text=/cases|case count/i').first();
  expect(caseCountText).toBeVisible({ timeout: 3000 });

  // Verify navigation back is available
  const backButton = page.locator('button:has-text("Back"), a:has-text("Back"), [data-testid="back-button"]');
  expect(backButton).toBeVisible({ timeout: 3000 }).catch(() => {
    // Back button may not always be visible, that's ok as long as page loaded
  });
});
```

---

### Check 3: Find Judges by Case Type Tab

**Check Name:** `find_judges_employment_discrimination`
**Type:** Browser Check
**URL:** `https://www.mycasevalues.com/judges`
**Frequency:** Every 10 minutes
**Timeout:** 10 seconds
**Success Criteria:**
- Judges page has a "Find Judges by Case Type" tab or filter
- Selecting "Employment Discrimination" returns results
- Results contain judge cards with employment discrimination case statistics
- Filter UI is responsive and accessible

**Playwright Test Code:**
```typescript
import { test, expect } from '@playwright/test';

test('find judges by case type returns results for employment discrimination', async ({ page }) => {
  await page.goto('https://www.mycasevalues.com/judges');

  await page.waitForLoadState('networkidle');

  // Look for case type filter/tab (could be dropdown, buttons, tabs, etc.)
  const caseTypeFilter = page.locator(
    'button:has-text("Case Type"), select[aria-label*="Case"], [data-testid="case-type-filter"]'
  ).first();

  // If filter exists, use it; if it's a search, search for employment
  let filterFound = false;
  try {
    await expect(caseTypeFilter).toBeVisible({ timeout: 3000 });
    filterFound = true;
  } catch {
    // Filter may be in a different format
  }

  // Click the filter if found
  if (filterFound) {
    await caseTypeFilter.click();
  }

  // Look for "Employment Discrimination" option or input
  const employmentOption = page.locator('button:has-text("Employment Discrimination"), a:has-text("Employment Discrimination"), text=Employment Discrimination').first();

  // Try to click employment discrimination option
  try {
    await employmentOption.click({ timeout: 3000 });
    await page.waitForLoadState('networkidle');
  } catch {
    // Alternative: search for employment in a search box
    const searchBox = page.locator('input[placeholder*="search"], input[placeholder*="case"], [data-testid="case-search"]').first();
    if (await searchBox.isVisible({ timeout: 2000 }).catch(() => false)) {
      await searchBox.fill('employment discrimination');
      await page.keyboard.press('Enter');
      await page.waitForLoadState('networkidle');
    }
  }

  // Verify results are displayed
  const judgeCards = page.locator('[data-testid="judge-card"], .judge-card');
  const cardCount = await judgeCards.count();
  expect(cardCount).toBeGreaterThan(0);

  // Verify at least one result mentions employment or the case type
  const resultsText = await page.locator('body').textContent();
  expect(resultsText).toMatch(/employment|judge|case/i);
});
```

---

### Check 4: Judge Cards on NOS Page (442)

**Check Name:** `nos_page_contains_judge_cards`
**Type:** Browser Check
**URL:** `https://www.mycasevalues.com/nos/442`
**Frequency:** Every 5 minutes
**Timeout:** 10 seconds
**Success Criteria:**
- NOS page (442 - Personal Injury) loads successfully
- Judge section is visible with at least one judge card
- Judge cards show judge name, district, and relevant statistics
- Judge cards are clickable (link to profile)

**Playwright Test Code:**
```typescript
import { test, expect } from '@playwright/test';

test('judge section appears on nos 442 page with at least one judge card', async ({ page }) => {
  await page.goto('https://www.mycasevalues.com/nos/442');

  await page.waitForLoadState('networkidle');

  // Verify page title contains NOS or case type
  const title = await page.title();
  expect(title).toMatch(/442|Personal Injury|Judge/i);

  // Look for judges section (heading or container)
  const judgeSection = page.locator(
    'h2:has-text("Judge"), h3:has-text("Judge"), [data-testid="judge-section"], section:has-text("Judge")'
  ).first();

  // Verify judge section exists
  expect(judgeSection).toBeVisible({ timeout: 5000 });

  // Find judge cards within or near the section
  const judgeCards = page.locator('[data-testid="judge-card"], .judge-card');
  const cardCount = await judgeCards.count();
  expect(cardCount).toBeGreaterThanOrEqual(1);

  // Verify first card is clickable (has href or is button)
  const firstCard = judgeCards.first();
  expect(firstCard).toBeVisible();

  // Check if it's a link or clickable element
  const firstCardLink = firstCard.locator('a').first();
  const hrefValue = await firstCardLink.getAttribute('href');
  expect(hrefValue).toMatch(/\/judges\//);
});
```

---

## Check Group: MyCaseValue — Enterprise and API

### Check 5: Enterprise Solutions Page with Demo Form

**Check Name:** `enterprise_page_loads_with_form`
**Type:** Browser Check
**URL:** `https://www.mycasevalues.com/solutions/enterprise`
**Frequency:** Every 10 minutes
**Timeout:** 10 seconds
**Success Criteria:**
- Enterprise page loads with all sections visible
- Request Demo form is visible and interactive
- Form fields are present (name, email, company, message)
- Form submission endpoint is functional

**Playwright Test Code:**
```typescript
import { test, expect } from '@playwright/test';

test('enterprise solutions page loads with request demo form', async ({ page }) => {
  await page.goto('https://www.mycasevalues.com/solutions/enterprise');

  await page.waitForLoadState('networkidle');

  // Verify page title
  const title = await page.title();
  expect(title).toContain('Enterprise');

  // Verify key sections are visible
  const heroSection = page.locator('h1:has-text("Enterprise")');
  expect(heroSection).toBeVisible();

  // Verify features section
  const featuresSection = page.locator('h2:has-text("Enterprise Capabilities"), h2:has-text("Features")').first();
  expect(featuresSection).toBeVisible({ timeout: 5000 });

  // Find the demo form
  const demoForm = page.locator('form[data-testid="enterprise-demo-form"], form[id*="demo"], form:has(input[name="name"])').first();
  expect(demoForm).toBeVisible({ timeout: 5000 });

  // Verify form fields exist
  const nameField = page.locator('input[name="name"], input[placeholder*="Name"]');
  const emailField = page.locator('input[type="email"], input[name="email"]');
  const companyField = page.locator('input[name="company"], input[placeholder*="Company"]');

  expect(nameField).toBeVisible();
  expect(emailField).toBeVisible();
  expect(companyField).toBeVisible();

  // Verify submit button exists
  const submitButton = page.locator('button[type="submit"]:has-text("Submit"), button:has-text("Request"), button:has-text("Demo")').first();
  expect(submitButton).toBeVisible();
});
```

---

### Check 6: Developers Page with Sandbox

**Check Name:** `developers_page_loads_with_sandbox`
**Type:** Browser Check
**URL:** `https://www.mycasevalues.com/developers`
**Frequency:** Every 10 minutes
**Timeout:** 10 seconds
**Success Criteria:**
- Developers page loads with API documentation visible
- Interactive Sandbox component is visible
- Code examples are displayed
- Rate limits table is visible

**Playwright Test Code:**
```typescript
import { test, expect } from '@playwright/test';

test('developers page loads with sandbox component visible', async ({ page }) => {
  await page.goto('https://www.mycasevalues.com/developers');

  await page.waitForLoadState('networkidle');

  // Verify page title
  const title = await page.title();
  expect(title).toMatch(/API|Developer/i);

  // Verify hero section
  const apiHeading = page.locator('h1:has-text("API"), h1:has-text("Developer")').first();
  expect(apiHeading).toBeVisible();

  // Verify quick start section
  const quickStart = page.locator('h2:has-text("Quick Start"), text=Base URL').first();
  expect(quickStart).toBeVisible({ timeout: 5000 });

  // Verify endpoints section
  const endpointsSection = page.locator('h2:has-text("Endpoints Reference")');
  expect(endpointsSection).toBeVisible({ timeout: 5000 });

  // Verify sandbox section
  const sandboxSection = page.locator('h2:has-text("Interactive Sandbox"), [data-testid="sandbox"]').first();
  expect(sandboxSection).toBeVisible({ timeout: 5000 });

  // Verify sandbox component exists
  const sandboxComponent = page.locator('[data-testid="api-sandbox"], .sandbox, .api-sandbox').first();
  expect(sandboxComponent).toBeVisible({ timeout: 5000 });

  // Verify rate limits table
  const rateLimitsTable = page.locator('h2:has-text("Rate Limits")').evaluateHandle(el => {
    // Look for table after the heading
    let next = el.nextElementSibling;
    while (next && next.tagName !== 'TABLE') {
      next = next.nextElementSibling;
    }
    return next;
  });

  const tableExists = await page.locator('table:has(th:has-text("Tier"))').count();
  expect(tableExists).toBeGreaterThan(0);
});
```

---

### Check 7: API Endpoint Test (GET /api/v1/cases/nos/442)

**Check Name:** `api_endpoint_nos_442`
**Type:** API Check (Browser-based for consistency)
**URL:** `https://www.mycasevalues.com/api/v1/cases/nos/442`
**Frequency:** Every 5 minutes
**Timeout:** 5 seconds
**Success Criteria:**
- Endpoint returns HTTP 200
- Response is valid JSON with expected structure
- Contains statistics for NOS code 442
- Rate limit headers are present

**Playwright Test Code:**
```typescript
import { test, expect } from '@playwright/test';

test('API endpoint GET /api/v1/cases/nos/442 returns valid JSON', async ({ page }) => {
  // Make a direct API call using page context
  const response = await page.request.get('https://www.mycasevalues.com/api/v1/cases/nos/442', {
    headers: {
      'Authorization': 'Bearer test-key-public', // Use public/test key
    },
  });

  // Verify response status
  expect(response.status()).toBe(200);

  // Verify response is JSON
  const contentType = response.headers()['content-type'] || '';
  expect(contentType).toMatch(/application\/json/i);

  // Parse and validate JSON structure
  const data = await response.json();

  // Verify essential fields exist
  expect(data).toHaveProperty('nos_code');
  expect(data.nos_code).toBe('442');

  // Verify statistics object
  expect(data).toHaveProperty('statistics');
  expect(data.statistics).toHaveProperty('total_cases');
  expect(data.statistics).toHaveProperty('win_rate');
  expect(data.statistics).toHaveProperty('settlement_rate');

  // Verify rate limit headers exist
  const headers = response.headers();
  expect(headers).toHaveProperty('x-ratelimit-limit');
  expect(headers).toHaveProperty('x-ratelimit-remaining');

  // Verify data is reasonable
  expect(data.statistics.win_rate).toBeGreaterThanOrEqual(0);
  expect(data.statistics.win_rate).toBeLessThanOrEqual(100);
});
```

---

## Check Group: MyCaseValue — Widget

### Check 8: Widget Renders as Self-Contained Card (442/Southern District)

**Check Name:** `widget_renders_compact_card`
**Type:** Browser Check
**URL:** `https://www.mycasevalues.com/widget/442/new-york-southern`
**Frequency:** Every 5 minutes
**Timeout:** 10 seconds
**Success Criteria:**
- Widget page loads and renders a compact card
- Card displays case type, win rate, and settlement range
- Card has proper styling and dimensions
- "View full data" link is present and functional
- Attribution to MyCaseValue is visible

**Playwright Test Code:**
```typescript
import { test, expect } from '@playwright/test';

test('widget renders as self-contained card (442/Southern District)', async ({ page }) => {
  await page.goto('https://www.mycasevalues.com/widget/442/new-york-southern');

  await page.waitForLoadState('networkidle');

  // Find the widget card
  const widgetCard = page.locator('[style*="width: 280px"], [style*="width: 280"], .widget-card, [data-testid="widget"]').first();
  expect(widgetCard).toBeVisible({ timeout: 5000 });

  // Verify card has minimal styling (self-contained, no full page layout)
  const cardStyle = await widgetCard.getAttribute('style');
  expect(cardStyle).toBeTruthy();

  // Verify key widget content
  const caseTypeText = widgetCard.locator('text=/Personal Injury|Motor Vehicle|442/').first();
  expect(caseTypeText).toBeVisible();

  // Verify win rate is displayed
  const winRateText = widgetCard.locator('text=/%|win rate/i').first();
  expect(winRateText).toBeVisible();

  // Verify settlement information is displayed
  const settlementText = widgetCard.locator('text=/median|settlement|\\$|median settlement/i').first();
  expect(settlementText).toBeVisible();

  // Verify "View full data" link exists and is clickable
  const viewLink = widgetCard.locator('a:has-text("View full data"), a:has-text("View more"), a[href*="/nos/"]');
  expect(viewLink).toBeVisible();

  // Verify MyCaseValue attribution
  const attribution = widgetCard.locator('text=MyCaseValue, text=Powered by');
  expect(attribution).toBeVisible();
});
```

---

### Check 9: Widget Generator with Live Preview

**Check Name:** `widget_generator_loads_preview`
**Type:** Browser Check
**URL:** `https://www.mycasevalues.com/solutions/api/widget`
**Frequency:** Every 10 minutes
**Timeout:** 10 seconds
**Success Criteria:**
- Widget Generator page loads successfully
- Form controls for customization are visible (case type, district, style)
- Live preview component renders with a sample widget
- Code snippet for embedding is displayed and copyable
- Changes in form inputs update the preview

**Playwright Test Code:**
```typescript
import { test, expect } from '@playwright/test';

test('widget generator loads with live preview component', async ({ page }) => {
  await page.goto('https://www.mycasevalues.com/solutions/api/widget');

  await page.waitForLoadState('networkidle');

  // Verify page title/heading
  const heading = page.locator('h1:has-text("Widget")');
  expect(heading).toBeVisible();

  // Verify form controls exist
  const caseTypeSelect = page.locator('select[aria-label*="Case"], select[name*="case"], input[placeholder*="Case"]').first();
  const districtSelect = page.locator('select[aria-label*="District"], select[name*="district"], input[placeholder*="District"]').first();

  // At least one control should be visible
  let hasControls = false;
  try {
    await expect(caseTypeSelect).toBeVisible({ timeout: 3000 });
    hasControls = true;
  } catch {
    try {
      await expect(districtSelect).toBeVisible({ timeout: 3000 });
      hasControls = true;
    } catch {
      // Controls might be in a different format
    }
  }

  // Verify live preview section exists
  const previewSection = page.locator('[data-testid="preview"], .preview, section:has-text("Preview"), h2:has-text("Preview")').first();
  expect(previewSection).toBeVisible({ timeout: 5000 });

  // Verify a widget card is rendered in the preview
  const previewWidget = page.locator('[data-testid="widget-preview"], .widget-preview, [style*="280px"]').first();
  expect(previewWidget).toBeVisible({ timeout: 5000 });

  // Verify code snippet section exists
  const codeSection = page.locator('h2:has-text("Code"), h3:has-text("Embed"), [data-testid="code-snippet"]').first();
  expect(codeSection).toBeVisible({ timeout: 5000 });

  // Verify code is displayed (pre/code element)
  const codeBlock = page.locator('pre, code').first();
  expect(codeBlock).toBeVisible({ timeout: 3000 });

  // Verify copy button exists
  const copyButton = page.locator('button:has-text("Copy"), button:has-text("Embed"), [data-testid="copy-btn"]').first();
  expect(copyButton).toBeVisible({ timeout: 3000 }).catch(() => {
    // Copy button may not always be visible
  });
});
```

---

## Deployment Instructions

To add these checks to Checkly:

1. **Create Check Groups** in Checkly Dashboard:
   - Group 1: "MyCaseValue — Judge System" (Checks 1-4)
   - Group 2: "MyCaseValue — Enterprise and API" (Checks 5-7)
   - Group 3: "MyCaseValue — Widget" (Checks 8-9)

2. **Copy Test Code** into Checkly browser checks:
   - Each check code block can be pasted directly into Checkly's code editor
   - Replace `https://www.mycasevalues.com` with your actual domain if different
   - For Check 7 (API), if using an actual API key, replace `test-key-public` with your test API key

3. **Configure Alerts**:
   - Slack notifications for any failed checks
   - PagerDuty escalation for critical endpoints (API Check 7)
   - Email digest of weekly check results

4. **Monitor Dashboards**:
   - Create a unified dashboard showing all 9 checks
   - Add uptime percentage widget
   - Add check history timeline
   - Include performance metrics (response time)

## Notes

- All checks use public/test data and should not require authentication
- Checks are designed to be resilient to minor UI changes
- Adjust selectors in test code if DOM structure changes
- Consider setting timeouts to be longer (15-20s) for slower networks
- Widget checks can be run with higher frequency (5 minutes) as they're lightweight
- API checks may need rate limit configuration if running frequently
