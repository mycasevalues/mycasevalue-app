/**
 * Build verification test
 * Verifies that TypeScript compilation passes without errors
 * This test runs `npx tsc --noEmit` to check for type errors
 */

import { execSync } from 'child_process';
import assert from 'assert';

export async function runBuildCheck(): Promise<boolean> {
  console.log('\n=== Build Check ===\n');

  try {
    console.log('Test: Running TypeScript type check (tsc --noEmit)...');

    // Run TypeScript compiler without emitting output
    // This validates all .ts and .tsx files against tsconfig.json
    const output = execSync('npx tsc --noEmit', {
      encoding: 'utf-8',
      stdio: ['pipe', 'pipe', 'pipe'],
    });

    console.log('  ✓ TypeScript compilation passed');
    console.log(`\n=== Summary ===`);
    console.log('Passed: 1');
    console.log('Failed: 0');
    console.log('Total: 1\n');

    return true;
  } catch (err: any) {
    console.error('  ✗ TypeScript compilation failed');

    if (err.stdout) {
      console.error('\nTypeScript errors:');
      console.error(err.stdout.toString());
    }

    if (err.stderr) {
      console.error('\nStderr:');
      console.error(err.stderr.toString());
    }

    console.log(`\n=== Summary ===`);
    console.log('Passed: 0');
    console.log('Failed: 1');
    console.log('Total: 1\n');

    return false;
  }
}

// Run if called directly
if (require.main === module) {
  runBuildCheck().then((passed) => {
    process.exit(passed ? 0 : 1);
  });
}
