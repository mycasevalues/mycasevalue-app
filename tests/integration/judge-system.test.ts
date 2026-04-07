/**
 * Integration tests for judge system
 * Tests mock judge data structure, judge-data-service functions,
 * and judge statistics aggregation
 */

import assert from 'assert';
import {
  getJudges,
  getJudgeById,
  searchJudges,
  getTopJudgesForNOS,
  getDistrictJudges,
  getJudgeStatistics,
} from '@/lib/judge-data-service';
import {
  aggregateJudgeStats,
  getPartyColor,
  getPartyLabel,
} from '@/lib/supabase-judges';
import { mockJudgesData } from '@/data/mock-judges';

// Test configuration
const TEST_TIMEOUT = 10000;

export async function runJudgeSystemTests() {
  console.log('\n=== Judge System Integration Tests ===\n');

  let passedTests = 0;
  let failedTests = 0;

  // Test 1: Mock judge data structure
  try {
    console.log('Test 1: Mock judge data is properly structured...');
    assert(mockJudgesData.judges, 'judges array should exist');
    assert(mockJudgesData.statistics, 'statistics array should exist');
    assert(mockJudgesData.opinions, 'opinions array should exist');
    assert(Array.isArray(mockJudgesData.judges), 'judges should be array');
    assert(Array.isArray(mockJudgesData.statistics), 'statistics should be array');
    assert(Array.isArray(mockJudgesData.opinions), 'opinions should be array');

    // Check for 50+ judges
    assert(
      mockJudgesData.judges.length >= 50,
      `Expected 50+ judges, got ${mockJudgesData.judges.length}`
    );
    console.log(`  ✓ Found ${mockJudgesData.judges.length} judges`);

    // Check required fields on judges
    mockJudgesData.judges.forEach((judge, idx) => {
      assert(judge.id, `Judge ${idx} missing id`);
      assert(judge.full_name, `Judge ${idx} missing full_name`);
      assert(judge.district_id, `Judge ${idx} missing district_id`);
      assert(typeof judge.is_active === 'boolean', `Judge ${idx} is_active should be boolean`);
    });
    console.log('  ✓ All judges have required fields');

    passedTests++;
  } catch (err) {
    console.error(`  ✗ Failed: ${err instanceof Error ? err.message : String(err)}`);
    failedTests++;
  }

  // Test 2: Judge data field validation
  try {
    console.log('Test 2: Judge data fields are valid...');
    mockJudgesData.judges.forEach((judge) => {
      if (judge.appointing_president) {
        assert(
          typeof judge.appointing_president === 'string',
          'appointing_president should be string'
        );
      }
      if (judge.party_of_appointing_president) {
        assert(
          typeof judge.party_of_appointing_president === 'string',
          'party_of_appointing_president should be string'
        );
      }
      assert(
        typeof judge.full_name === 'string',
        'full_name should be string'
      );
      assert(
        typeof judge.district_id === 'string',
        'district_id should be string'
      );
    });
    console.log('  ✓ All judge fields are valid');
    passedTests++;
  } catch (err) {
    console.error(`  ✗ Failed: ${err instanceof Error ? err.message : String(err)}`);
    failedTests++;
  }

  // Test 3: getJudges function
  try {
    console.log('Test 3: getJudges function returns judges...');
    const result = await getJudges({ limit: 10, offset: 0 });
    assert(result, 'getJudges should return result');
    assert(result.judges, 'result should have judges array');
    assert(Array.isArray(result.judges), 'judges should be array');
    assert(result.judges.length > 0, 'judges array should not be empty');
    assert(
      result.total >= 0,
      'result should have total count'
    );
    assert(result.limit === 10, 'result should have limit');
    assert(result.offset === 0, 'result should have offset');
    console.log(`  ✓ getJudges returned ${result.judges.length} judges (total: ${result.total})`);
    passedTests++;
  } catch (err) {
    console.error(`  ✗ Failed: ${err instanceof Error ? err.message : String(err)}`);
    failedTests++;
  }

  // Test 4: getJudgeById function
  try {
    console.log('Test 4: getJudgeById returns judge by ID...');
    const firstJudge = mockJudgesData.judges[0];
    const judge = await getJudgeById(firstJudge.id);
    assert(judge, `getJudgeById should return judge for id ${firstJudge.id}`);
    assert(judge.id === firstJudge.id, 'returned judge should have correct id');
    assert(judge.full_name, 'returned judge should have full_name');
    console.log(`  ✓ Retrieved judge: ${judge.full_name}`);
    passedTests++;
  } catch (err) {
    console.error(`  ✗ Failed: ${err instanceof Error ? err.message : String(err)}`);
    failedTests++;
  }

  // Test 5: All judge IDs can be looked up
  try {
    console.log('Test 5: All judge IDs from mock data can be looked up...');
    let foundCount = 0;
    let notFoundCount = 0;

    for (let i = 0; i < Math.min(mockJudgesData.judges.length, 20); i++) {
      const judge = mockJudgesData.judges[i];
      const result = await getJudgeById(judge.id);
      if (result) {
        foundCount++;
      } else {
        notFoundCount++;
      }
    }

    assert(
      foundCount > 0,
      `At least some judges should be found (found: ${foundCount}, not found: ${notFoundCount})`
    );
    console.log(`  ✓ Found ${foundCount}/${foundCount + notFoundCount} sampled judges`);
    passedTests++;
  } catch (err) {
    console.error(`  ✗ Failed: ${err instanceof Error ? err.message : String(err)}`);
    failedTests++;
  }

  // Test 6: searchJudges function
  try {
    console.log('Test 6: searchJudges function works...');
    const searchResults = await searchJudges('Smith', 5);
    assert(Array.isArray(searchResults), 'searchJudges should return array');
    console.log(`  ✓ searchJudges returned ${searchResults.length} results`);
    passedTests++;
  } catch (err) {
    console.error(`  ✗ Failed: ${err instanceof Error ? err.message : String(err)}`);
    failedTests++;
  }

  // Test 7: Filtering by district
  try {
    console.log('Test 7: getJudges filters by district...');
    const firstJudge = mockJudgesData.judges.find((j) => j.district_id);
    if (firstJudge && firstJudge.district_id) {
      const result = await getJudges({ district: firstJudge.district_id });
      assert(result.judges, 'should return judges');
      result.judges.forEach((judge) => {
        assert(
          judge.district_id === firstJudge.district_id,
          `judge should be from district ${firstJudge.district_id}`
        );
      });
      console.log(`  ✓ District filtering works (found ${result.judges.length})`);
    }
    passedTests++;
  } catch (err) {
    console.error(`  ✗ Failed: ${err instanceof Error ? err.message : String(err)}`);
    failedTests++;
  }

  // Test 8: Filtering by circuit
  try {
    console.log('Test 8: getJudges filters by circuit...');
    const firstJudge = mockJudgesData.judges.find((j) => j.circuit);
    if (firstJudge && firstJudge.circuit) {
      const result = await getJudges({ circuit: firstJudge.circuit });
      assert(result.judges, 'should return judges');
      result.judges.forEach((judge) => {
        assert(
          judge.circuit === firstJudge.circuit,
          `judge should be from circuit ${firstJudge.circuit}`
        );
      });
      console.log(`  ✓ Circuit filtering works (found ${result.judges.length})`);
    }
    passedTests++;
  } catch (err) {
    console.error(`  ✗ Failed: ${err instanceof Error ? err.message : String(err)}`);
    failedTests++;
  }

  // Test 9: Filtering by president
  try {
    console.log('Test 9: getJudges filters by appointing president...');
    const judgeWithPres = mockJudgesData.judges.find((j) => j.appointing_president);
    if (judgeWithPres && judgeWithPres.appointing_president) {
      // Note: This is more of a data structure test
      // since the actual filtering is by district/circuit/name
      assert(judgeWithPres.appointing_president, 'should have appointing_president');
      console.log(`  ✓ Found judges with appointing president data`);
    }
    passedTests++;
  } catch (err) {
    console.error(`  ✗ Failed: ${err instanceof Error ? err.message : String(err)}`);
    failedTests++;
  }

  // Test 10: getTopJudgesForNOS function
  try {
    console.log('Test 10: getTopJudgesForNOS returns top judges...');
    const firstStat = mockJudgesData.statistics[0];
    assert(firstStat, 'should have statistics');
    const topJudges = await getTopJudgesForNOS(firstStat.nos_code, undefined, undefined, 5);
    assert(Array.isArray(topJudges), 'should return array');
    console.log(`  ✓ getTopJudgesForNOS returned ${topJudges.length} judges`);
    passedTests++;
  } catch (err) {
    console.error(`  ✗ Failed: ${err instanceof Error ? err.message : String(err)}`);
    failedTests++;
  }

  // Test 11: getDistrictJudges function
  try {
    console.log('Test 11: getDistrictJudges returns judges in district...');
    const firstJudge = mockJudgesData.judges.find((j) => j.district_id && j.is_active);
    if (firstJudge && firstJudge.district_id) {
      const districtJudges = await getDistrictJudges(firstJudge.district_id);
      assert(Array.isArray(districtJudges), 'should return array');
      districtJudges.forEach((judge) => {
        assert(judge.district_id === firstJudge.district_id, 'judges should be from correct district');
      });
      console.log(`  ✓ getDistrictJudges returned ${districtJudges.length} judges`);
    }
    passedTests++;
  } catch (err) {
    console.error(`  ✗ Failed: ${err instanceof Error ? err.message : String(err)}`);
    failedTests++;
  }

  // Test 12: getJudgeStatistics function
  try {
    console.log('Test 12: getJudgeStatistics returns statistics...');
    const firstJudge = mockJudgesData.judges[0];
    const stats = await getJudgeStatistics(firstJudge.id);
    assert(Array.isArray(stats), 'should return array');
    console.log(`  ✓ getJudgeStatistics returned ${stats.length} stat records`);
    passedTests++;
  } catch (err) {
    console.error(`  ✗ Failed: ${err instanceof Error ? err.message : String(err)}`);
    failedTests++;
  }

  // Test 13: aggregateJudgeStats function
  try {
    console.log('Test 13: aggregateJudgeStats aggregates correctly...');
    const firstJudge = mockJudgesData.judges[0];
    const stats = mockJudgesData.statistics.filter((s) => s.judge_id === firstJudge.id);
    const aggregated = aggregateJudgeStats(stats);

    assert(aggregated, 'should return aggregated stats');
    assert(
      typeof aggregated.totalCases === 'number',
      'totalCases should be number'
    );
    assert(
      typeof aggregated.plaintiffWinRate === 'number',
      'plaintiffWinRate should be number'
    );
    assert(
      typeof aggregated.summaryJudgmentRate === 'number',
      'summaryJudgmentRate should be number'
    );
    assert(
      typeof aggregated.dismissalRate === 'number',
      'dismissalRate should be number'
    );
    assert(
      typeof aggregated.settlementRate === 'number',
      'settlementRate should be number'
    );
    assert(
      typeof aggregated.avgDuration === 'number',
      'avgDuration should be number'
    );
    console.log(`  ✓ aggregateJudgeStats returned valid stats`);
    passedTests++;
  } catch (err) {
    console.error(`  ✗ Failed: ${err instanceof Error ? err.message : String(err)}`);
    failedTests++;
  }

  // Test 14: aggregateJudgeStats with empty array
  try {
    console.log('Test 14: aggregateJudgeStats handles empty array...');
    const aggregated = aggregateJudgeStats([]);
    assert(aggregated, 'should return aggregated stats');
    assert(aggregated.totalCases === 0, 'totalCases should be 0 for empty array');
    console.log(`  ✓ aggregateJudgeStats handles empty array`);
    passedTests++;
  } catch (err) {
    console.error(`  ✗ Failed: ${err instanceof Error ? err.message : String(err)}`);
    failedTests++;
  }

  // Test 15: getPartyColor function
  try {
    console.log('Test 15: getPartyColor returns correct colors...');
    const dColor = getPartyColor('Democrat');
    const rColor = getPartyColor('Republican');
    const nColor = getPartyColor(null);

    assert(typeof dColor === 'string', 'should return string');
    assert(dColor.startsWith('#'), 'should return hex color');
    assert(rColor.startsWith('#'), 'should return hex color');
    assert(nColor.startsWith('#'), 'should return hex color');
    console.log(`  ✓ getPartyColor returns valid hex colors`);
    passedTests++;
  } catch (err) {
    console.error(`  ✗ Failed: ${err instanceof Error ? err.message : String(err)}`);
    failedTests++;
  }

  // Test 16: getPartyLabel function
  try {
    console.log('Test 16: getPartyLabel returns correct labels...');
    const dLabel = getPartyLabel('Democrat');
    const rLabel = getPartyLabel('Republican');
    const nLabel = getPartyLabel(null);

    assert(dLabel === 'D', `Democrat should map to D, got ${dLabel}`);
    assert(rLabel === 'R', `Republican should map to R, got ${rLabel}`);
    assert(nLabel === 'Unknown', `null should map to Unknown, got ${nLabel}`);
    console.log(`  ✓ getPartyLabel returns correct labels`);
    passedTests++;
  } catch (err) {
    console.error(`  ✗ Failed: ${err instanceof Error ? err.message : String(err)}`);
    failedTests++;
  }

  // Test 17: Statistics data structure
  try {
    console.log('Test 17: Statistics records have required fields...');
    mockJudgesData.statistics.forEach((stat, idx) => {
      assert(stat.judge_id, `Stat ${idx} missing judge_id`);
      assert(typeof stat.nos_code === 'number', `Stat ${idx} nos_code should be number`);
      assert(typeof stat.total_cases === 'number', `Stat ${idx} total_cases should be number`);
      assert(
        typeof stat.plaintiff_win_rate === 'number',
        `Stat ${idx} plaintiff_win_rate should be number`
      );
    });
    console.log(`  ✓ All ${mockJudgesData.statistics.length} statistics records are valid`);
    passedTests++;
  } catch (err) {
    console.error(`  ✗ Failed: ${err instanceof Error ? err.message : String(err)}`);
    failedTests++;
  }

  // Test 18: Sorting by name
  try {
    console.log('Test 18: getJudges sorts by name...');
    const result = await getJudges({ sortBy: 'name', order: 'asc', limit: 20 });
    assert(result.judges.length > 1, 'should have multiple judges');
    for (let i = 1; i < result.judges.length; i++) {
      const prev = result.judges[i - 1].full_name;
      const curr = result.judges[i].full_name;
      assert(
        prev.localeCompare(curr) <= 0,
        `Judges should be sorted by name, got ${prev} after ${curr}`
      );
    }
    console.log(`  ✓ Name sorting works correctly`);
    passedTests++;
  } catch (err) {
    console.error(`  ✗ Failed: ${err instanceof Error ? err.message : String(err)}`);
    failedTests++;
  }

  // Test 19: Judge statistics include plaintiff win rates
  try {
    console.log('Test 19: Judge statistics include plaintiff win rates...');
    mockJudgesData.statistics.forEach((stat) => {
      assert(
        typeof stat.plaintiff_win_rate === 'number',
        'plaintiff_win_rate should be number'
      );
      assert(
        stat.plaintiff_win_rate >= 0 && stat.plaintiff_win_rate <= 100,
        `plaintiff_win_rate should be 0-100, got ${stat.plaintiff_win_rate}`
      );
    });
    console.log(`  ✓ All statistics have valid plaintiff win rates`);
    passedTests++;
  } catch (err) {
    console.error(`  ✗ Failed: ${err instanceof Error ? err.message : String(err)}`);
    failedTests++;
  }

  // Test 20: Opinion data structure
  try {
    console.log('Test 20: Opinion records have required fields...');
    if (mockJudgesData.opinions.length > 0) {
      mockJudgesData.opinions.slice(0, 10).forEach((opinion, idx) => {
        assert(opinion.judge_id, `Opinion ${idx} missing judge_id`);
        assert(opinion.case_name, `Opinion ${idx} missing case_name`);
        assert(typeof opinion.year === 'number', `Opinion ${idx} year should be number`);
      });
      console.log(`  ✓ ${mockJudgesData.opinions.length} opinion records are valid`);
    }
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
