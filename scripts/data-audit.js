#!/usr/bin/env node

/**
 * Data Consistency Audit Script
 * Verifies REAL_DATA integrity across all NOS codes
 *
 * Usage: node scripts/data-audit.js
 *        npx tsx scripts/data-audit.js (for TypeScript)
 * Exit codes: 0 = success, 1 = failures
 *
 * This script works with compiled Next.js artifacts or can be run with tsx
 */

const path = require('path');

/**
 * Simple function to load compiled data from .next/server or source
 */
function loadData() {
  try {
    // Try to load from Next.js compiled output
    const projectRoot = path.join(__dirname, '..');
    const realDataPath = path.join(projectRoot, '.next', 'server', 'lib', 'realdata.js');

    try {
      const realdata = require(realDataPath);
      const data = require(path.join(projectRoot, '.next', 'server', 'lib', 'data.js'));
      const statutes = require(path.join(projectRoot, '.next', 'server', 'lib', 'statutes.js'));
      return {
        REAL_DATA: realdata.REAL_DATA || {},
        SITS: data.SITS || [],
        NOS_STATUTE_MAP: statutes.NOS_STATUTE_MAP || {},
      };
    } catch (e) {
      // Build hasn't been compiled, provide helpful error
      console.error('\nError: Next.js build artifacts not found.');
      console.error('Please run: npm run build');
      console.error('Then run this script again.\n');
      process.exit(1);
    }
  } catch (error) {
    console.error('Fatal error loading data:', error.message);
    process.exit(1);
  }
}

/**
 * Run the audit
 */
function runAudit() {
  const { REAL_DATA, SITS, NOS_STATUTE_MAP } = loadData();

  console.log('\n=== CaseCheck Data Consistency Audit ===\n');

  const results = {
    totalCodes: 0,
    passed: 0,
    failed: 0,
    failures: [],
  };

  const sitsCodes = new Set();

  // Build SITS code set using forEach as per requirements
  SITS.forEach((sitItem) => {
    if (sitItem.opts && Array.isArray(sitItem.opts)) {
      sitItem.opts.forEach((opt) => {
        sitsCodes.add(opt.nos);
      });
    }
  });

  // Audit each NOS code
  const nosCodes = Object.keys(REAL_DATA);
  results.totalCodes = nosCodes.length;

  nosCodes.forEach((code) => {
    const data = REAL_DATA[code];
    const codeFailures = [];

    if (!data) {
      codeFailures.push('No data found for code');
    } else {
      // Check: win rate between 0-100
      if (typeof data.wr !== 'number' || data.wr < 0 || data.wr > 100) {
        codeFailures.push(`Invalid win rate (wr): ${data.wr}`);
      }

      // Check: case count > 0
      if (typeof data.total !== 'number' || data.total <= 0) {
        codeFailures.push(`Invalid case count (total): ${data.total}`);
      }

      // Check: median duration > 0
      if (typeof data.mo !== 'number' || data.mo <= 0) {
        codeFailures.push(`Invalid duration (mo): ${data.mo}`);
      }

      // Check: settlement range is valid (lo < md < hi)
      if (data.rng && typeof data.rng === 'object') {
        const lo = data.rng.lo;
        const md = data.rng.md;
        const hi = data.rng.hi;
        if (typeof lo !== 'number' || typeof md !== 'number' || typeof hi !== 'number') {
          codeFailures.push(`Invalid settlement range structure`);
        } else if (!(lo < md && md < hi)) {
          codeFailures.push(`Settlement range invalid: ${lo} < ${md} < ${hi} failed`);
        }
      } else {
        codeFailures.push(`Missing or invalid settlement range (rng)`);
      }

      // Check: SITS cross-reference
      if (!sitsCodes.has(code)) {
        codeFailures.push(`Not found in SITS (missing from situation categories)`);
      }

      // Check: NOS_STATUTE_MAP cross-reference
      const codeNum = parseInt(code, 10);
      if (!NOS_STATUTE_MAP[codeNum]) {
        codeFailures.push(`Not found in NOS_STATUTE_MAP (missing statute mapping)`);
      }

      // Check: label exists
      if (!data.label || typeof data.label !== 'string') {
        codeFailures.push(`Invalid label: ${data.label}`);
      }
    }

    if (codeFailures.length === 0) {
      results.passed++;
    } else {
      results.failed++;
      results.failures.push({
        code,
        label: (data && data.label) || 'Unknown',
        issues: codeFailures,
      });
    }
  });

  // Print results
  console.log(`Total NOS Codes:   ${results.totalCodes}`);
  console.log(`Passed:            ${results.passed}`);
  console.log(`Failed:            ${results.failed}`);

  if (results.failed > 0) {
    console.log('\n=== Failed Codes ===\n');
    results.failures.forEach((failure) => {
      console.log(`[${failure.code}] ${failure.label}`);
      failure.issues.forEach((issue) => {
        console.log(`  ✗ ${issue}`);
      });
      console.log();
    });
  } else {
    console.log('\n✓ All codes passed validation');
  }

  console.log('\n=== Audit Summary ===');
  console.log(`Date: ${new Date().toISOString()}`);
  console.log(`Status: ${results.failed === 0 ? 'SUCCESS' : 'FAILURE'}`);
  console.log();

  // Exit with appropriate code
  process.exit(results.failed === 0 ? 0 : 1);
}

runAudit();
