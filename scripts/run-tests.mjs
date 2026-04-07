#!/usr/bin/env node

/**
 * Simple test runner for integration tests
 * Can be run with: node scripts/run-tests.mjs
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('╔════════════════════════════════════════════════════════╗');
console.log('║     MyCaseValue Integration Test Suite                ║');
console.log('╚════════════════════════════════════════════════════════╝');
console.log(`Started: ${new Date().toISOString()}\n`);

const results = [];

// Check TypeScript build
console.log('Running TypeScript build check...\n');
try {
  execSync('npx tsc --noEmit', {
    stdio: 'pipe',
    cwd: process.cwd(),
  });
  console.log('✓ TypeScript compilation passed');
  results.push({
    name: 'TypeScript Build Check',
    passed: true,
    duration: 0,
  });
} catch (error) {
  console.log('✗ TypeScript compilation failed');
  if (error.stdout) {
    console.log('Output:', error.stdout.toString());
  }
  results.push({
    name: 'TypeScript Build Check',
    passed: false,
    duration: 0,
  });
}

// Print summary
console.log('\n╔════════════════════════════════════════════════════════╗');
console.log('║                   Test Summary                        ║');
console.log('╚════════════════════════════════════════════════════════╝\n');

let passedSuites = 0;
let failedSuites = 0;

results.forEach((result) => {
  const status = result.passed ? '✓ PASS' : '✗ FAIL';
  console.log(`${status} - ${result.name}`);
  if (result.passed) {
    passedSuites++;
  } else {
    failedSuites++;
  }
});

console.log(`\nSummary: ${passedSuites}/${results.length} checks passed`);
console.log(`Completed: ${new Date().toISOString()}\n`);

// Check test files exist
console.log('Integration test files created:');
const testFiles = [
  'tests/integration/judge-system.test.ts',
  'tests/integration/api-system.test.ts',
  'tests/integration/widget-system.test.ts',
  'tests/integration/build-check.ts',
  'scripts/run-integration-tests.ts',
];

testFiles.forEach((file) => {
  const exists = fs.existsSync(path.join(process.cwd(), file));
  const status = exists ? '✓' : '✗';
  console.log(`${status} ${file}`);
});

console.log('\nTo run specific integration tests, use:');
console.log('  npx tsx scripts/run-integration-tests.ts');
console.log('');

process.exit(failedSuites > 0 ? 1 : 0);
