/**
 * Integration test runner
 * Runs all integration tests sequentially with simple assert-based validation
 * Uses Node's built-in assert module (no Jest required)
 */

import { runJudgeSystemTests } from '../tests/integration/judge-system.test';
import { runApiSystemTests } from '../tests/integration/api-system.test';
import { runWidgetSystemTests } from '../tests/integration/widget-system.test';

async function main() {
  console.log('╔════════════════════════════════════════════════════════╗');
  console.log('║     MyCaseValue Integration Test Suite                ║');
  console.log('╚════════════════════════════════════════════════════════╝');
  console.log(`Started: ${new Date().toISOString()}\n`);

  const results: Array<{
    name: string;
    passed: boolean;
    duration: number;
  }> = [];

  // Run Judge System Tests
  const judgeStart = Date.now();
  try {
    const judgePassed = await runJudgeSystemTests();
    results.push({
      name: 'Judge System Integration Tests',
      passed: judgePassed,
      duration: Date.now() - judgeStart,
    });
  } catch (err) {
    console.error('Judge System Tests failed with error:', err);
    results.push({
      name: 'Judge System Integration Tests',
      passed: false,
      duration: Date.now() - judgeStart,
    });
  }

  // Run API System Tests
  const apiStart = Date.now();
  try {
    const apiPassed = await runApiSystemTests();
    results.push({
      name: 'API System Integration Tests',
      passed: apiPassed,
      duration: Date.now() - apiStart,
    });
  } catch (err) {
    console.error('API System Tests failed with error:', err);
    results.push({
      name: 'API System Integration Tests',
      passed: false,
      duration: Date.now() - apiStart,
    });
  }

  // Run Widget System Tests
  const widgetStart = Date.now();
  try {
    const widgetPassed = await runWidgetSystemTests();
    results.push({
      name: 'Widget System Integration Tests',
      passed: widgetPassed,
      duration: Date.now() - widgetStart,
    });
  } catch (err) {
    console.error('Widget System Tests failed with error:', err);
    results.push({
      name: 'Widget System Integration Tests',
      passed: false,
      duration: Date.now() - widgetStart,
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
    const duration = (result.duration / 1000).toFixed(2);
    console.log(`${status} - ${result.name} (${duration}s)`);
    if (result.passed) {
      passedSuites++;
    } else {
      failedSuites++;
    }
  });

  const totalDuration = results.reduce((sum, r) => sum + r.duration, 0) / 1000;

  console.log(`\nSummary: ${passedSuites}/${results.length} suites passed`);
  console.log(`Total time: ${totalDuration.toFixed(2)}s`);
  console.log(`Completed: ${new Date().toISOString()}\n`);

  // Exit with appropriate code
  process.exit(failedSuites > 0 ? 1 : 0);
}

main().catch((err) => {
  console.error('Fatal error running tests:', err);
  process.exit(1);
});
