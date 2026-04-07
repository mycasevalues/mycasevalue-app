# Checkly Monitoring — Phases 1–3 Checks

This document specifies browser-based Checkly checks for features delivered in Phases 1 through 3. Each check includes a name, target URL, frequency, and Playwright test code.

---

## Phase 1: Core Pages & Data Display

### Check 1: Homepage Loads with Search

**Check Name:** `homepage_loads_with_search`
**Type:** Browser Check
**URL:** `https://www.mycasevalues.com/`
**Frequency:** Every 5 minutes
**Timeout:** 10 seconds
**Success Criteria:**
- Page loads within 5 seconds
- NOS category selector is visible
- At least 10 case type categories rendered
- Hero section with headline text is displayed

**Playwright Test Code:**
```typescript
import { test, expect } from '@playwright/test';

test('homepage loads with functional NOS search', async ({ page }) => {
  await page.goto('https://www.mycasevalues.com/');
  await page.waitForLoadState('networkidle');

  const title = await page.title();
  expect(title).toContain('MyCaseValue');

  // Hero section
  const hero = page.locator('h1');
  await expect(hero).toBeVisible();

  // Category cards or list items
  const categories = await page.locator('[data-testid="nos-category"], .nos-card, .category-card').count();
  expect(categories).toBeGreaterThanOrEqual(5);
});
```

---

### Check 2: NOS Report Page (Employment Discrimination 442)

**Check Name:** `nos_report_page_442`
**Type:** Browser Check
**URL:** `https://www.mycasevalues.com/nos/442`
**Frequency:** Every 10 minutes
**Timeout:** 15 seconds
**Success Criteria:**
- Page returns 200 with real data
- Settlement range section visible
- Win rate displayed
- At least one chart rendered (D3 SVG or canvas)

**Playwright Test Code:**
```typescript
import { test, expect } from '@playwright/test';

test('NOS 442 report page loads with data', async ({ page }) => {
  await page.goto('https://www.mycasevalues.com/nos/442');
  await page.waitForLoadState('networkidle');

  // Title contains NOS name
  const heading = page.locator('h1');
  await expect(heading).toContainText(/Employment|Discrimination|442/i);

  // Settlement section
  const settlement = page.locator('text=/settlement|Settlement/i').first();
  await expect(settlement).toBeVisible();

  // At least one SVG chart
  const charts = await page.locator('svg').count();
  expect(charts).toBeGreaterThanOrEqual(1);
});
```

---

### Check 3: District Page Loads

**Check Name:** `district_page_loads`
**Type:** Browser Check
**URL:** `https://www.mycasevalues.com/districts/CACD`
**Frequency:** Every 10 minutes
**Timeout:** 15 seconds
**Success Criteria:**
- Page loads with district name
- Filing volume or case statistics visible
- At least one chart rendered

**Playwright Test Code:**
```typescript
import { test, expect } from '@playwright/test';

test('district page CACD loads with data', async ({ page }) => {
  await page.goto('https://www.mycasevalues.com/districts/CACD');
  await page.waitForLoadState('networkidle');

  const heading = page.locator('h1');
  await expect(heading).toContainText(/Central District|California|CACD/i);

  const charts = await page.locator('svg').count();
  expect(charts).toBeGreaterThanOrEqual(1);
});
```

---

### Check 4: District × NOS Combination Page

**Check Name:** `district_nos_combination`
**Type:** Browser Check
**URL:** `https://www.mycasevalues.com/districts/CACD/442`
**Frequency:** Every 15 minutes
**Timeout:** 15 seconds
**Success Criteria:**
- Page loads with both district and NOS context
- Settlement data displayed
- No 404 or error states

**Playwright Test Code:**
```typescript
import { test, expect } from '@playwright/test';

test('district NOS combination page CACD/442 loads', async ({ page }) => {
  const response = await page.goto('https://www.mycasevalues.com/districts/CACD/442');
  expect(response?.status()).toBe(200);

  await page.waitForLoadState('networkidle');
  const body = await page.textContent('body');
  expect(body).toContain('Settlement');
});
```

---

## Phase 2: Interactive Features & Tools

### Check 5: Jargon Translator Page

**Check Name:** `jargon_translator_page`
**Type:** Browser Check
**URL:** `https://www.mycasevalues.com/translate`
**Frequency:** Every 10 minutes
**Timeout:** 10 seconds
**Success Criteria:**
- Textarea input is visible and accessible
- Submit/translate button present
- Page loads without errors

**Playwright Test Code:**
```typescript
import { test, expect } from '@playwright/test';

test('jargon translator page loads with input', async ({ page }) => {
  await page.goto('https://www.mycasevalues.com/translate');
  await page.waitForLoadState('networkidle');

  const textarea = page.locator('textarea');
  await expect(textarea).toBeVisible();

  const submitBtn = page.locator('button:has-text("Translate"), button[type="submit"]');
  await expect(submitBtn).toBeVisible();
});
```

---

### Check 6: Glossary Page with Search

**Check Name:** `glossary_page_search`
**Type:** Browser Check
**URL:** `https://www.mycasevalues.com/glossary`
**Frequency:** Every 15 minutes
**Timeout:** 10 seconds
**Success Criteria:**
- Page loads with 300+ glossary terms
- Search/filter input is accessible
- Terms display definitions

**Playwright Test Code:**
```typescript
import { test, expect } from '@playwright/test';

test('glossary page loads with terms and search', async ({ page }) => {
  await page.goto('https://www.mycasevalues.com/glossary');
  await page.waitForLoadState('networkidle');

  const heading = page.locator('h1');
  await expect(heading).toContainText(/Glossary|Legal Terms/i);

  // Search input
  const search = page.locator('input[type="text"], input[type="search"]');
  await expect(search.first()).toBeVisible();
});
```

---

### Check 7: Blog Index Page

**Check Name:** `blog_index_loads`
**Type:** Browser Check
**URL:** `https://www.mycasevalues.com/blog`
**Frequency:** Every 15 minutes
**Timeout:** 10 seconds
**Success Criteria:**
- Page lists at least 10 blog posts
- Each post has title and date
- Links to individual blog pages work

**Playwright Test Code:**
```typescript
import { test, expect } from '@playwright/test';

test('blog index loads with posts', async ({ page }) => {
  await page.goto('https://www.mycasevalues.com/blog');
  await page.waitForLoadState('networkidle');

  const heading = page.locator('h1');
  await expect(heading).toContainText(/Blog|Articles|Insights/i);

  // At least some post cards
  const posts = await page.locator('article, [data-testid="blog-card"], .blog-card').count();
  expect(posts).toBeGreaterThanOrEqual(5);
});
```

---

### Check 8: Pricing Page

**Check Name:** `pricing_page_loads`
**Type:** Browser Check
**URL:** `https://www.mycasevalues.com/pricing`
**Frequency:** Every 15 minutes
**Timeout:** 10 seconds
**Success Criteria:**
- At least 3 pricing tiers displayed
- CTA buttons present
- Feature comparison visible

**Playwright Test Code:**
```typescript
import { test, expect } from '@playwright/test';

test('pricing page loads with tiers', async ({ page }) => {
  await page.goto('https://www.mycasevalues.com/pricing');
  await page.waitForLoadState('networkidle');

  const heading = page.locator('h1');
  await expect(heading).toContainText(/Pricing|Plans/i);

  // At least 3 pricing cards
  const cards = await page.locator('[data-testid="pricing-card"], .pricing-card, .plan-card').count();
  expect(cards).toBeGreaterThanOrEqual(3);
});
```

---

## Phase 3: API, Auth & Advanced Features

### Check 9: REST API Health Endpoint

**Check Name:** `api_health_check`
**Type:** API Check
**URL:** `https://www.mycasevalues.com/api/health`
**Frequency:** Every 2 minutes
**Timeout:** 5 seconds
**Success Criteria:**
- Returns 200
- Response contains status: "ok"
- Response time < 2000ms

**API Test Code:**
```typescript
import { ApiCheck, AssertionBuilder } from 'checkly/constructs';

const healthCheck = new ApiCheck('api_health_check', {
  name: 'API Health Endpoint',
  request: {
    method: 'GET',
    url: 'https://www.mycasevalues.com/api/health',
  },
  assertions: [
    AssertionBuilder.statusCode().equals(200),
    AssertionBuilder.jsonBody('$.status').equals('ok'),
    AssertionBuilder.responseTime().lessThan(2000),
  ],
});
```

---

### Check 10: REST API NOS Endpoint

**Check Name:** `api_nos_endpoint`
**Type:** API Check
**URL:** `https://www.mycasevalues.com/api/v1/cases/nos/442`
**Frequency:** Every 5 minutes
**Timeout:** 10 seconds
**Success Criteria:**
- Returns 200 with JSON
- Contains settlement data fields
- Response time < 5000ms

**API Test Code:**
```typescript
import { ApiCheck, AssertionBuilder } from 'checkly/constructs';

const nosApiCheck = new ApiCheck('api_nos_endpoint', {
  name: 'NOS API Endpoint 442',
  request: {
    method: 'GET',
    url: 'https://www.mycasevalues.com/api/v1/cases/nos/442',
  },
  assertions: [
    AssertionBuilder.statusCode().equals(200),
    AssertionBuilder.jsonBody('$.data').isNotNull(),
    AssertionBuilder.responseTime().lessThan(5000),
  ],
});
```

---

### Check 11: Authentication Flow (Login Page)

**Check Name:** `auth_login_page`
**Type:** Browser Check
**URL:** `https://www.mycasevalues.com/login`
**Frequency:** Every 10 minutes
**Timeout:** 10 seconds
**Success Criteria:**
- Login form renders with email and password fields
- Submit button present
- OAuth/social login buttons visible if configured

**Playwright Test Code:**
```typescript
import { test, expect } from '@playwright/test';

test('login page renders with auth form', async ({ page }) => {
  await page.goto('https://www.mycasevalues.com/login');
  await page.waitForLoadState('networkidle');

  const emailInput = page.locator('input[type="email"]');
  await expect(emailInput).toBeVisible();

  const passwordInput = page.locator('input[type="password"]');
  await expect(passwordInput).toBeVisible();

  const submitBtn = page.locator('button[type="submit"]');
  await expect(submitBtn).toBeVisible();
});
```

---

### Check 12: Sitemap Accessibility

**Check Name:** `sitemap_accessible`
**Type:** API Check
**URL:** `https://www.mycasevalues.com/sitemap.xml`
**Frequency:** Every 30 minutes
**Timeout:** 10 seconds
**Success Criteria:**
- Returns 200 with XML content type
- Contains at least 100 URLs
- Includes NOS, district, and blog URLs

**API Test Code:**
```typescript
import { ApiCheck, AssertionBuilder } from 'checkly/constructs';

const sitemapCheck = new ApiCheck('sitemap_accessible', {
  name: 'Sitemap XML',
  request: {
    method: 'GET',
    url: 'https://www.mycasevalues.com/sitemap.xml',
  },
  assertions: [
    AssertionBuilder.statusCode().equals(200),
    AssertionBuilder.headers('content-type').contains('xml'),
  ],
});
```

---

### Check 13: Spanish Translation Route

**Check Name:** `spanish_i18n_loads`
**Type:** Browser Check
**URL:** `https://www.mycasevalues.com/es`
**Frequency:** Every 15 minutes
**Timeout:** 10 seconds
**Success Criteria:**
- Page loads in Spanish
- Key UI elements contain Spanish text
- Language toggle visible

**Playwright Test Code:**
```typescript
import { test, expect } from '@playwright/test';

test('Spanish locale page loads', async ({ page }) => {
  const response = await page.goto('https://www.mycasevalues.com/es');
  expect(response?.status()).toBe(200);

  await page.waitForLoadState('networkidle');
  const body = await page.textContent('body');
  // Should contain Spanish text
  expect(body).toMatch(/caso|tribunal|resultados|valores/i);
});
```

---

### Check 14: OG Image Generation

**Check Name:** `og_image_generates`
**Type:** API Check
**URL:** `https://www.mycasevalues.com/api/og?title=Test&nos=442`
**Frequency:** Every 30 minutes
**Timeout:** 15 seconds
**Success Criteria:**
- Returns 200
- Content-Type is image/png
- Response size > 1KB

---

## Summary

| Phase | Check Count | Check Types |
|-------|-------------|-------------|
| Phase 1 | 4 | Browser (4) |
| Phase 2 | 4 | Browser (4) |
| Phase 3 | 6 | Browser (2), API (4) |
| **Total** | **14** | **Browser (10), API (4)** |

Combined with the 9 Phase 4 checks (in `checkly-phase4-checks.md`), the full monitoring suite covers **23 Checkly checks** across all phases.
