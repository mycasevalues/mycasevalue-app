#!/usr/bin/env node

const ANSI = {
  RESET: '\x1b[0m',
  RED: '\x1b[31m',
  GREEN: '\x1b[32m',
  YELLOW: '\x1b[33m',
  BLUE: '\x1b[34m',
};

interface PageConfig {
  [key: string]: string[];
}

const PAGES: PageConfig = {
  '/': ['MyCaseValue', 'settlement data', 'federal court', 'PACER', 'Check my case type'],
  '/pricing': ['Simple, transparent pricing', 'Free', '$5.99', '$9.99', '$29.99'],
  '/attorney': ['Attorney Mode', 'Document Intelligence', '$29.99', 'Available now', 'In development'],
  '/about': ['MyCaseValue', 'Federal court data', 'PACER', 'public domain', 'Start Researching'],
  '/methodology': ['Data Sources', 'Federal Judicial Center', 'CourtListener', 'PACER', 'Processing'],
  '/faq': ['MyCaseValue', 'legal advice', 'data come from', 'how much', 'settlement'],
  '/how-it-works': ['How It Works', 'case type', 'district', 'report', 'data'],
  '/districts': ['Federal Court', 'Districts', '94', 'district', 'outcomes'],
  '/cases': ['Case Types', 'Employment', 'Personal Injury', 'Consumer', 'Civil Rights'],
  '/judges': ['Judge', 'federal', 'district', 'analytics', 'Intelligence'],
  '/calculator': ['Calculator', 'case type', 'district', 'settlement', 'Calculate'],
  '/sample': ['Sample', 'Employment Discrimination', 'S.D.N.Y.', 'Win Rate', 'Settlement'],
  '/privacy': ['Privacy', 'data', 'information', 'MyCaseValue', 'cookies'],
  '/terms': ['Terms', 'Service', 'MyCaseValue', 'use', 'agreement'],
  '/disclaimer': ['Disclaimer', 'legal advice', 'MyCaseValue', 'informational', 'attorney'],
};

interface VerificationResult {
  page: string;
  passed: boolean;
  status?: number;
  error?: string;
  missingContent?: string[];
  hasJSWarning?: boolean;
}

async function fetchPage(url: string): Promise<string> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000);

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; SSR-Verification/1.0)',
      },
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    return await response.text();
  } finally {
    clearTimeout(timeoutId);
  }
}

function normalizeText(text: string): string {
  return text.toLowerCase().trim();
}

function checkContentPresent(html: string, contentStrings: string[]): {
  present: boolean;
  missing: string[];
} {
  const htmlLower = normalizeText(html);
  const missing: string[] = [];

  for (const content of contentStrings) {
    if (!htmlLower.includes(normalizeText(content))) {
      missing.push(content);
    }
  }

  return {
    present: missing.length === 0,
    missing,
  };
}

function checkJSWarning(html: string): boolean {
  const htmlLower = html.toLowerCase();
  return htmlLower.includes('please enable javascript to use');
}

function formatResult(result: VerificationResult): void {
  const statusIcon = result.passed ? `${ANSI.GREEN}✓${ANSI.RESET}` : `${ANSI.RED}✗${ANSI.RESET}`;
  const statusText = result.passed
    ? `${ANSI.GREEN}PASS${ANSI.RESET}`
    : `${ANSI.RED}FAIL${ANSI.RESET}`;

  console.log(`\n${statusIcon} ${result.page.padEnd(20)} ${statusText}`);

  if (!result.passed) {
    if (result.error) {
      console.log(`  ${ANSI.RED}Error:${ANSI.RESET} ${result.error}`);
    }
    if (result.missingContent && result.missingContent.length > 0) {
      console.log(`  ${ANSI.RED}Missing content:${ANSI.RESET}`);
      result.missingContent.forEach((content) => {
        console.log(`    - "${content}"`);
      });
    }
    if (result.hasJSWarning) {
      console.log(`  ${ANSI.YELLOW}Warning:${ANSI.RESET} Found JavaScript warning in HTML`);
    }
  }
}

async function verifyPage(
  baseUrl: string,
  page: string,
  expectedContent: string[],
): Promise<VerificationResult> {
  const url = `${baseUrl}${page}`;

  try {
    const html = await fetchPage(url);

    // Check for JavaScript warning
    const hasJSWarning = checkJSWarning(html);

    // Check for expected content
    const { present, missing } = checkContentPresent(html, expectedContent);

    if (!present || hasJSWarning) {
      return {
        page,
        passed: false,
        missingContent: missing.length > 0 ? missing : undefined,
        hasJSWarning,
      };
    }

    return {
      page,
      passed: true,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return {
      page,
      passed: false,
      error: errorMessage,
    };
  }
}

async function main(): Promise<void> {
  const baseUrl = process.env.BASE_URL || 'http://localhost:3000';

  console.log(`${ANSI.BLUE}SSR Verification Script${ANSI.RESET}`);
  console.log(`Base URL: ${ANSI.YELLOW}${baseUrl}${ANSI.RESET}`);
  console.log(`Total pages to verify: ${Object.keys(PAGES).length}\n`);
  console.log(`${ANSI.BLUE}${'='.repeat(60)}${ANSI.RESET}`);

  const results: VerificationResult[] = [];

  for (const [page, expectedContent] of Object.entries(PAGES)) {
    const result = await verifyPage(baseUrl, page, expectedContent);
    results.push(result);
    formatResult(result);
  }

  const passedCount = results.filter((r) => r.passed).length;
  const totalCount = results.length;

  console.log(`\n${ANSI.BLUE}${'='.repeat(60)}${ANSI.RESET}`);

  if (passedCount === totalCount) {
    console.log(
      `${ANSI.GREEN}✓ All tests passed!${ANSI.RESET} ${ANSI.GREEN}${passedCount}/${totalCount}${ANSI.RESET}`,
    );
    process.exit(0);
  } else {
    const failedCount = totalCount - passedCount;
    console.log(
      `${ANSI.RED}✗ ${failedCount} test(s) failed${ANSI.RESET} ${ANSI.YELLOW}${passedCount}/${totalCount}${ANSI.RESET}`,
    );
    process.exit(1);
  }
}

main().catch((error) => {
  console.error(`${ANSI.RED}Fatal error:${ANSI.RESET}`, error);
  process.exit(1);
});
