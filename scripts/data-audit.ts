#!/usr/bin/env npx tsx

/**
 * Data Consistency Audit Script (TypeScript)
 * Verifies REAL_DATA integrity across all NOS codes
 *
 * Usage: npx tsx scripts/data-audit.ts
 *        node scripts/data-audit.js (after npm run build)
 * Exit codes: 0 = success, 1 = failures
 *
 * Checks:
 * - Win rates between 0-100
 * - Case counts > 0
 * - Durations > 0
 * - Settlement ranges valid (lo < md < hi)
 * - SITS cross-references
 * - NOS_STATUTE_MAP cross-references
 * - Valid labels
 */

import { REAL_DATA } from '../lib/realdata';
import { SITS } from '../lib/data';
import { NOS_STATUTE_MAP } from '../lib/statutes';

interface AuditFailure {
  code: string;
  label: string;
  issues: string[];
}

interface AuditResults {
  totalCodes: number;
  passed: number;
  failed: number;
  failures: AuditFailure[];
}

function runAudit(): void {
  console.log('\n=== CaseCheck Data Consistency Audit ===\n');

  const results: AuditResults = {
    totalCodes: 0,
    passed: 0,
    failed: 0,
    failures: [],
  };

  const sitsCodes = new Set<string>();

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

  Object.entries(REAL_DATA).forEach(([code, data]) => {
    const codeFailures: string[] = [];

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
      const lo = data.rng.lo as number;
      const md = data.rng.md as number;
      const hi = data.rng.hi as number;
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

    if (codeFailures.length === 0) {
      results.passed++;
    } else {
      results.failed++;
      results.failures.push({
        code,
        label: data.label || 'Unknown',
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
