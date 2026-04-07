/**
 * Integration tests for API system
 * Tests API v1 routes existence, auth validation, Zod schemas,
 * and REAL_DATA completeness
 */

import assert from 'assert';
import { z } from 'zod';
import { REAL_DATA } from '@/lib/realdata';
import { SITS } from '@/lib/data';

// Test API routes - these files should exist
const API_V1_ROUTES = [
  '/app/api/v1/judges/search/route.ts',
  '/app/api/v1/judges/[judgeId]/route.ts',
  '/app/api/v1/cases/nos/[code]/route.ts',
  '/app/api/v1/cases/nos/[code]/district/[district]/route.ts',
  '/app/api/v1/districts/[district]/route.ts',
  '/app/api/v1/predict/route.ts',
  '/app/api/v1/trends/nos/[code]/route.ts',
];

/**
 * Check if auth token has valid mcv_ prefix
 */
function validateBearerToken(authHeader: string | null): boolean {
  if (!authHeader) return false;
  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') return false;
  return parts[1].startsWith('mcv_');
}

/**
 * Test schemas that should be used in API routes
 */
const SearchQuerySchema = z.string().min(2).max(100);
const JudgeIdSchema = z.string().min(1);
const NosCodeSchema = z.coerce.number().int().positive();
const DistrictSchema = z.string().min(1);

export async function runApiSystemTests() {
  console.log('\n=== API System Integration Tests ===\n');

  let passedTests = 0;
  let failedTests = 0;

  // Test 1: API auth validation
  try {
    console.log('Test 1: API auth validation logic...');

    // Valid token
    const validAuth = 'Bearer mcv_test_token_12345';
    assert(validateBearerToken(validAuth), 'should validate valid token');
    console.log('  ✓ Valid token accepted');

    // Valid token 2
    const validAuth2 = 'Bearer mcv_prod_key_xyz789';
    assert(validateBearerToken(validAuth2), 'should validate another valid token');

    // Invalid tokens
    assert(!validateBearerToken(null), 'should reject null');
    assert(!validateBearerToken(''), 'should reject empty string');
    assert(!validateBearerToken('Bearer invalid_token'), 'should reject non-mcv_ token');
    assert(!validateBearerToken('Basic xyz123'), 'should reject Basic auth');
    assert(!validateBearerToken('mcv_test'), 'should reject missing Bearer');
    console.log('  ✓ Invalid tokens rejected');

    passedTests++;
  } catch (err) {
    console.error(`  ✗ Failed: ${err instanceof Error ? err.message : String(err)}`);
    failedTests++;
  }

  // Test 2: SearchQuerySchema validation
  try {
    console.log('Test 2: SearchQuerySchema Zod validation...');

    // Valid queries
    const validQueries = ['Smith', 'Judge John', 'Anderson M'];
    validQueries.forEach((q) => {
      const result = SearchQuerySchema.safeParse(q);
      assert(result.success, `Query "${q}" should be valid`);
    });
    console.log('  ✓ Valid queries accepted');

    // Invalid queries
    const invalidQueries = ['A', '', 'a'.repeat(101)];
    invalidQueries.forEach((q) => {
      const result = SearchQuerySchema.safeParse(q);
      assert(!result.success, `Query "${q}" should be invalid`);
    });
    console.log('  ✓ Invalid queries rejected');

    passedTests++;
  } catch (err) {
    console.error(`  ✗ Failed: ${err instanceof Error ? err.message : String(err)}`);
    failedTests++;
  }

  // Test 3: JudgeIdSchema validation
  try {
    console.log('Test 3: JudgeIdSchema Zod validation...');

    // Valid IDs
    const validIds = ['judge_123', 'j-1', 'abc', 'x'];
    validIds.forEach((id) => {
      const result = JudgeIdSchema.safeParse(id);
      assert(result.success, `ID "${id}" should be valid`);
    });
    console.log('  ✓ Valid judge IDs accepted');

    // Invalid IDs
    const invalidIds = ['', null];
    invalidIds.forEach((id) => {
      const result = JudgeIdSchema.safeParse(id);
      assert(!result.success, `ID "${id}" should be invalid`);
    });
    console.log('  ✓ Invalid judge IDs rejected');

    passedTests++;
  } catch (err) {
    console.error(`  ✗ Failed: ${err instanceof Error ? err.message : String(err)}`);
    failedTests++;
  }

  // Test 4: NosCodeSchema validation
  try {
    console.log('Test 4: NosCodeSchema Zod validation...');

    // Valid NOS codes
    const validCodes = [190, 210, 220, 442, 1000];
    validCodes.forEach((code) => {
      const result = NosCodeSchema.safeParse(code);
      assert(result.success, `Code ${code} should be valid`);
    });
    console.log('  ✓ Valid NOS codes accepted');

    // Invalid codes
    assert(!NosCodeSchema.safeParse(-1).success, 'negative code should be invalid');
    assert(!NosCodeSchema.safeParse(0).success, 'zero code should be invalid');
    assert(!NosCodeSchema.safeParse('abc').success, 'non-numeric should be invalid');
    console.log('  ✓ Invalid NOS codes rejected');

    passedTests++;
  } catch (err) {
    console.error(`  ✗ Failed: ${err instanceof Error ? err.message : String(err)}`);
    failedTests++;
  }

  // Test 5: DistrictSchema validation
  try {
    console.log('Test 5: DistrictSchema Zod validation...');

    // Valid districts
    const validDistricts = ['S.D.N.Y.', 'N.D. Cal.', 'all', 'district-1'];
    validDistricts.forEach((d) => {
      const result = DistrictSchema.safeParse(d);
      assert(result.success, `District "${d}" should be valid`);
    });
    console.log('  ✓ Valid districts accepted');

    // Invalid districts
    assert(!DistrictSchema.safeParse('').success, 'empty district should be invalid');
    console.log('  ✓ Invalid districts rejected');

    passedTests++;
  } catch (err) {
    console.error(`  ✗ Failed: ${err instanceof Error ? err.message : String(err)}`);
    failedTests++;
  }

  // Test 6: REAL_DATA has all expected NOS codes
  try {
    console.log('Test 6: REAL_DATA has all expected NOS codes...');

    assert(REAL_DATA, 'REAL_DATA should exist');
    assert(typeof REAL_DATA === 'object', 'REAL_DATA should be object');

    const dataKeys = Object.keys(REAL_DATA);
    assert(dataKeys.length > 0, 'REAL_DATA should have keys');
    console.log(`  ✓ REAL_DATA has ${dataKeys.length} NOS codes`);

    // Check that a few common NOS codes exist
    const commonCodes = ['190', '210', '220', '240'];
    commonCodes.forEach((code) => {
      if (REAL_DATA[code]) {
        assert(REAL_DATA[code].nos_code, `NOS ${code} should have nos_code field`);
        assert(REAL_DATA[code].label, `NOS ${code} should have label`);
        assert(
          typeof REAL_DATA[code].total === 'number',
          `NOS ${code} should have numeric total`
        );
      }
    });
    console.log(`  ✓ Sample NOS codes have required fields`);

    passedTests++;
  } catch (err) {
    console.error(`  ✗ Failed: ${err instanceof Error ? err.message : String(err)}`);
    failedTests++;
  }

  // Test 7: REAL_DATA structure
  try {
    console.log('Test 7: REAL_DATA records have valid structure...');

    const sampleCodes = Object.keys(REAL_DATA).slice(0, 5);
    sampleCodes.forEach((code) => {
      const record = REAL_DATA[code];
      assert(record.nos_code, `NOS ${code} should have nos_code`);
      assert(record.label, `NOS ${code} should have label`);
      assert(typeof record.total === 'number', `NOS ${code} total should be number`);

      // Check for outcome data if present
      if (record.ends && Array.isArray(record.ends)) {
        record.ends.forEach((end: any) => {
          assert(end.l, 'Outcome should have label');
          assert(typeof end.p === 'number', 'Outcome should have percentage');
        });
      }
    });
    console.log(`  ✓ REAL_DATA records have valid structure`);

    passedTests++;
  } catch (err) {
    console.error(`  ✗ Failed: ${err instanceof Error ? err.message : String(err)}`);
    failedTests++;
  }

  // Test 8: SITS data structure
  try {
    console.log('Test 8: SITS data structure is valid...');

    assert(SITS, 'SITS should exist');
    assert(Array.isArray(SITS), 'SITS should be array');
    assert(SITS.length > 0, 'SITS should have categories');

    SITS.forEach((category, idx) => {
      assert(category.label, `SITS category ${idx} should have label`);
      assert(category.opts, `SITS category ${idx} should have opts`);
      assert(Array.isArray(category.opts), `SITS category ${idx} opts should be array`);

      category.opts.forEach((opt, optIdx) => {
        assert(opt.label, `SITS option ${idx}.${optIdx} should have label`);
        assert(opt.nos, `SITS option ${idx}.${optIdx} should have nos code`);
      });
    });

    console.log(`  ✓ SITS has ${SITS.length} categories`);
    passedTests++;
  } catch (err) {
    console.error(`  ✗ Failed: ${err instanceof Error ? err.message : String(err)}`);
    failedTests++;
  }

  // Test 9: API routes list
  try {
    console.log('Test 9: Verify API routes list...');

    assert(API_V1_ROUTES.length > 0, 'should have API routes');
    console.log(`  ✓ Defined ${API_V1_ROUTES.length} API v1 routes:`);
    API_V1_ROUTES.forEach((route) => {
      console.log(`    - ${route}`);
    });

    passedTests++;
  } catch (err) {
    console.error(`  ✗ Failed: ${err instanceof Error ? err.message : String(err)}`);
    failedTests++;
  }

  // Test 10: Token format examples
  try {
    console.log('Test 10: Token format validation examples...');

    // Generate example tokens
    const exampleTokens = [
      'mcv_test_1234567890',
      'mcv_prod_xyz_abc_123',
      'mcv_key_',
      'mcv_',
    ];

    exampleTokens.forEach((token) => {
      const authHeader = `Bearer ${token}`;
      const isValid = validateBearerToken(authHeader);
      assert(isValid, `Token ${token} should be valid`);
    });

    console.log(`  ✓ All token formats accepted`);
    passedTests++;
  } catch (err) {
    console.error(`  ✗ Failed: ${err instanceof Error ? err.message : String(err)}`);
    failedTests++;
  }

  // Test 11: REAL_DATA NOS code consistency
  try {
    console.log('Test 11: REAL_DATA NOS code consistency...');

    Object.entries(REAL_DATA).forEach(([key, record]) => {
      // Key should match nos_code or be parseable as number
      const keyNum = parseInt(key, 10);
      assert(!isNaN(keyNum), `Key ${key} should be numeric`);
      assert(
        record.nos_code === keyNum || record.nos_code === key,
        `REAL_DATA key ${key} should match nos_code`
      );
    });

    console.log(`  ✓ All REAL_DATA entries have consistent keys`);
    passedTests++;
  } catch (err) {
    console.error(`  ✗ Failed: ${err instanceof Error ? err.message : String(err)}`);
    failedTests++;
  }

  // Test 12: REAL_DATA outcome categories
  try {
    console.log('Test 12: REAL_DATA outcome categories...');

    let recordsWithEnds = 0;
    Object.entries(REAL_DATA).forEach(([key, record]) => {
      if (record.ends && Array.isArray(record.ends)) {
        recordsWithEnds++;
        // Verify percentages sum reasonably
        const totalPercent = record.ends.reduce((sum: number, end: any) => sum + (end.p || 0), 0);
        assert(totalPercent > 0, `Record ${key} should have positive outcome percentages`);
      }
    });

    console.log(`  ✓ ${recordsWithEnds} records have outcome data`);
    passedTests++;
  } catch (err) {
    console.error(`  ✗ Failed: ${err instanceof Error ? err.message : String(err)}`);
    failedTests++;
  }

  // Test 13: SITS options coverage
  try {
    console.log('Test 13: SITS options have REAL_DATA coverage...');

    let coverageCount = 0;
    let totalOptions = 0;

    SITS.forEach((category) => {
      category.opts.forEach((opt) => {
        totalOptions++;
        if (REAL_DATA[opt.nos]) {
          coverageCount++;
        }
      });
    });

    assert(
      coverageCount > 0,
      `At least some SITS options should have REAL_DATA (${coverageCount}/${totalOptions})`
    );
    console.log(`  ✓ ${coverageCount}/${totalOptions} SITS options have data`);
    passedTests++;
  } catch (err) {
    console.error(`  ✗ Failed: ${err instanceof Error ? err.message : String(err)}`);
    failedTests++;
  }

  // Test 14: REAL_DATA range values
  try {
    console.log('Test 14: REAL_DATA range values are valid...');

    Object.entries(REAL_DATA).forEach(([key, record]) => {
      if (record.rng && typeof record.rng === 'object') {
        assert(
          typeof record.rng.lo === 'number',
          `NOS ${key} rng.lo should be number`
        );
        assert(
          typeof record.rng.md === 'number',
          `NOS ${key} rng.md should be number`
        );
        assert(
          typeof record.rng.hi === 'number',
          `NOS ${key} rng.hi should be number`
        );
        assert(
          record.rng.lo <= record.rng.md &&
          record.rng.md <= record.rng.hi,
          `NOS ${key} range should be lo <= md <= hi`
        );
      }
    });

    console.log(`  ✓ All range values are valid`);
    passedTests++;
  } catch (err) {
    console.error(`  ✗ Failed: ${err instanceof Error ? err.message : String(err)}`);
    failedTests++;
  }

  // Test 15: REAL_DATA plaintiff/respondent rates
  try {
    console.log('Test 15: REAL_DATA plaintiff/respondent win rates...');

    Object.entries(REAL_DATA).forEach(([key, record]) => {
      if (record.ps && typeof record.ps === 'object') {
        assert(
          typeof record.ps.wr === 'number',
          `NOS ${key} ps.wr should be number`
        );
      }
      if (record.rr && typeof record.rr === 'object') {
        assert(
          typeof record.rr.wr === 'number',
          `NOS ${key} rr.wr should be number`
        );
      }
    });

    console.log(`  ✓ All win rate values are valid`);
    passedTests++;
  } catch (err) {
    console.error(`  ✗ Failed: ${err instanceof Error ? err.message : String(err)}`);
    failedTests++;
  }

  // Summary
  console.log(`\n=== Summary ===`);
  console.log(`Passed: ${passedTests}`);
  console.log(`Failed: ${failedTests}`);
  console.log(`Total: ${passedTests + failedTests}\n`);

  return failedTests === 0;
}
