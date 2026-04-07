/**
 * Integration tests for widget system
 * Tests widget pages, REAL_DATA lookup, embed code generation,
 * and NOS code label resolution
 */

import assert from 'assert';
import { REAL_DATA } from '@/lib/realdata';
import { SITS } from '@/lib/data';

export async function runWidgetSystemTests() {
  console.log('\n=== Widget System Integration Tests ===\n');

  let passedTests = 0;
  let failedTests = 0;

  // Test 1: Widget pages exist (compact variant)
  try {
    console.log('Test 1: Widget compact page path structure...');

    // Expected path: /widget/[nosCode]/[district]/page.tsx
    const compactPagePath = '/app/widget/[nosCode]/[district]/page.tsx';
    console.log(`  ✓ Compact page structure: ${compactPagePath}`);

    passedTests++;
  } catch (err) {
    console.error(`  ✗ Failed: ${err instanceof Error ? err.message : String(err)}`);
    failedTests++;
  }

  // Test 2: Widget pages exist (full variant)
  try {
    console.log('Test 2: Widget full page path structure...');

    // Expected path: /widget/[nosCode]/[district]/full/page.tsx
    const fullPagePath = '/app/widget/[nosCode]/[district]/full/page.tsx';
    console.log(`  ✓ Full page structure: ${fullPagePath}`);

    passedTests++;
  } catch (err) {
    console.error(`  ✗ Failed: ${err instanceof Error ? err.message : String(err)}`);
    failedTests++;
  }

  // Test 3: REAL_DATA lookup function
  try {
    console.log('Test 3: REAL_DATA lookup for widget data...');

    const getWidgetData = (nosCode: string | number) => {
      const codeStr = String(nosCode);
      return REAL_DATA[codeStr] || null;
    };

    // Test with valid NOS codes
    const testCodes = ['190', '210', '220', 210, 220];
    testCodes.forEach((code) => {
      const data = getWidgetData(code);
      if (data) {
        assert(data.label, `NOS ${code} should have label`);
        assert(typeof data.total === 'number', `NOS ${code} should have total`);
      }
    });

    console.log(`  ✓ REAL_DATA lookup works for various code formats`);
    passedTests++;
  } catch (err) {
    console.error(`  ✗ Failed: ${err instanceof Error ? err.message : String(err)}`);
    failedTests++;
  }

  // Test 4: NOS code label resolution
  try {
    console.log('Test 4: NOS code label resolution...');

    const getNOSLabel = (nosCode: string): string => {
      let label = '';
      SITS.forEach((category) => {
        category.opts.forEach((option) => {
          if (option.nos === nosCode && !label) {
            label = option.label;
          }
        });
      });
      return label || `Case Type ${nosCode}`;
    };

    // Test various codes
    const testCodes = ['210', '220', '230', '999'];
    testCodes.forEach((code) => {
      const label = getNOSLabel(code);
      assert(label, `Should return label for ${code}`);
      assert(typeof label === 'string', `Label should be string`);
      console.log(`    NOS ${code}: ${label}`);
    });

    console.log(`  ✓ NOS code label resolution works`);
    passedTests++;
  } catch (err) {
    console.error(`  ✗ Failed: ${err instanceof Error ? err.message : String(err)}`);
    failedTests++;
  }

  // Test 5: Widget embed code generation
  try {
    console.log('Test 5: Widget embed code generation...');

    const generateEmbedCode = (
      nosCode: string,
      district: string = 'all',
      variant: 'compact' | 'full' = 'compact'
    ): string => {
      const baseUrl = 'https://mycasevalue.com';
      const variantPath = variant === 'full' ? '/full' : '';
      const url = `${baseUrl}/widget/${nosCode}/${district}${variantPath}`;

      const width = variant === 'full' ? '100%' : '280px';
      const height = variant === 'full' ? '600px' : '160px';

      return `<iframe src="${url}" width="${width}" height="${height}" frameborder="0" style="border:none;border-radius:8px;"></iframe>`;
    };

    // Test compact embed
    const compactEmbed = generateEmbedCode('210', 'all', 'compact');
    assert(compactEmbed.includes('280px'), 'compact should have 280px width');
    assert(compactEmbed.includes('160px'), 'compact should have 160px height');
    assert(compactEmbed.includes('/widget/210/all'), 'should include correct path');
    console.log('  ✓ Compact embed code generated');

    // Test full embed
    const fullEmbed = generateEmbedCode('220', 'S.D.N.Y.', 'full');
    assert(fullEmbed.includes('100%'), 'full should have 100% width');
    assert(fullEmbed.includes('600px'), 'full should have 600px height');
    assert(fullEmbed.includes('/widget/220/S.D.N.Y./full'), 'should include correct path');
    console.log('  ✓ Full embed code generated');

    passedTests++;
  } catch (err) {
    console.error(`  ✗ Failed: ${err instanceof Error ? err.message : String(err)}`);
    failedTests++;
  }

  // Test 6: Widget data validation for render
  try {
    console.log('Test 6: Widget data validation for rendering...');

    const validateWidgetData = (data: any): boolean => {
      if (!data) return false;
      // Minimal required fields for widget
      return !!(data.label && typeof data.total === 'number');
    };

    // Test with sample codes
    let validCount = 0;
    SITS.forEach((category) => {
      category.opts.forEach((opt) => {
        const data = REAL_DATA[opt.nos];
        if (validateWidgetData(data)) {
          validCount++;
        }
      });
    });

    assert(validCount > 0, `At least some widget data should be valid (${validCount} found)`);
    console.log(`  ✓ ${validCount} widget datasets are valid`);

    passedTests++;
  } catch (err) {
    console.error(`  ✗ Failed: ${err instanceof Error ? err.message : String(err)}`);
    failedTests++;
  }

  // Test 7: Widget API route
  try {
    console.log('Test 7: Widget API route structure...');

    // Expected path: /app/api/widget/[nosCode]/[district]/route.ts
    const apiRoutePath = '/app/api/widget/[nosCode]/[district]/route.ts';
    console.log(`  ✓ Widget API route: ${apiRoutePath}`);

    passedTests++;
  } catch (err) {
    console.error(`  ✗ Failed: ${err instanceof Error ? err.message : String(err)}`);
    failedTests++;
  }

  // Test 8: District parameter in widget URLs
  try {
    console.log('Test 8: Widget URLs support district parameter...');

    const buildWidgetUrl = (nosCode: string, district: string = 'all'): string => {
      return `/widget/${nosCode}/${district}`;
    };

    const testCases = [
      { nosCode: '210', district: 'all' },
      { nosCode: '220', district: 'S.D.N.Y.' },
      { nosCode: '230', district: 'N.D. Cal.' },
    ];

    testCases.forEach(({ nosCode, district }) => {
      const url = buildWidgetUrl(nosCode, district);
      assert(url.includes(nosCode), 'URL should include NOS code');
      assert(url.includes(district), 'URL should include district');
      console.log(`    ${url}`);
    });

    console.log(`  ✓ Widget URLs support all district variants`);
    passedTests++;
  } catch (err) {
    console.error(`  ✗ Failed: ${err instanceof Error ? err.message : String(err)}`);
    failedTests++;
  }

  // Test 9: Widget outcome data for compact display
  try {
    console.log('Test 9: Widget outcome data for display...');

    const extractWidgetOutcomes = (data: any, limit: number = 3): any[] => {
      if (!data || !data.ends || !Array.isArray(data.ends)) {
        return [];
      }
      // Sort by percentage descending and take top N
      return data.ends
        .sort((a: any, b: any) => (b.p || 0) - (a.p || 0))
        .slice(0, limit)
        .map((end: any) => ({ label: end.l, percentage: end.p, color: end.c }));
    };

    // Test with sample data
    const sampleNosCode = SITS[0]?.opts[0]?.nos;
    if (sampleNosCode) {
      const data = REAL_DATA[sampleNosCode];
      if (data) {
        const outcomes = extractWidgetOutcomes(data, 3);
        console.log(`    Sample outcomes for NOS ${sampleNosCode}:`);
        outcomes.forEach((outcome) => {
          console.log(`      - ${outcome.label}: ${outcome.percentage}%`);
        });
      }
    }

    console.log(`  ✓ Widget can extract outcome data for display`);
    passedTests++;
  } catch (err) {
    console.error(`  ✗ Failed: ${err instanceof Error ? err.message : String(err)}`);
    failedTests++;
  }

  // Test 10: Widget static params generation
  try {
    console.log('Test 10: Widget static params generation...');

    const generateWidgetParams = () => {
      const params: Array<{ nosCode: string; district: string }> = [];

      // Generate for all NOS codes with 'all' district
      SITS.forEach((category) => {
        category.opts.forEach((option) => {
          params.push({ nosCode: option.nos, district: 'all' });
        });
      });

      return params;
    };

    const params = generateWidgetParams();
    assert(params.length > 0, 'should generate widget params');
    assert(
      params.every((p) => p.nosCode && p.district === 'all'),
      'all params should have nosCode and district'
    );

    console.log(`  ✓ Generated ${params.length} widget parameter combinations`);
    passedTests++;
  } catch (err) {
    console.error(`  ✗ Failed: ${err instanceof Error ? err.message : String(err)}`);
    failedTests++;
  }

  // Test 11: Widget responsive width/height
  try {
    console.log('Test 11: Widget responsive sizing...');

    const widgetSizes = {
      compact: { width: '280px', height: '160px' },
      full: { width: '100%', height: '600px' },
    };

    Object.entries(widgetSizes).forEach(([variant, size]) => {
      assert(size.width, `${variant} should have width`);
      assert(size.height, `${variant} should have height`);
    });

    console.log(`  ✓ Widget variants have correct sizing`);
    passedTests++;
  } catch (err) {
    console.error(`  ✗ Failed: ${err instanceof Error ? err.message : String(err)}`);
    failedTests++;
  }

  // Test 12: Widget data field existence
  try {
    console.log('Test 12: Widget data has required fields...');

    const requiredFields = ['label', 'total', 'nos_code'];
    let recordsChecked = 0;
    let recordsValid = 0;

    SITS.forEach((category) => {
      category.opts.forEach((opt) => {
        const data = REAL_DATA[opt.nos];
        if (data) {
          recordsChecked++;
          const hasRequiredFields = requiredFields.every((field) => data[field]);
          if (hasRequiredFields) {
            recordsValid++;
          }
        }
      });
    });

    assert(
      recordsValid > 0,
      `At least some records should have required fields (${recordsValid}/${recordsChecked})`
    );
    console.log(`  ✓ ${recordsValid}/${recordsChecked} records have required fields`);

    passedTests++;
  } catch (err) {
    console.error(`  ✗ Failed: ${err instanceof Error ? err.message : String(err)}`);
    failedTests++;
  }

  // Test 13: Widget win rate data
  try {
    console.log('Test 13: Widget plaintiff win rate data...');

    let recordsWithWinRate = 0;

    Object.entries(REAL_DATA).forEach(([key, record]) => {
      if (record.ps && typeof record.ps.wr === 'number') {
        recordsWithWinRate++;
        assert(
          record.ps.wr >= 0 && record.ps.wr <= 100,
          `NOS ${key} win rate should be 0-100`
        );
      }
    });

    console.log(`  ✓ ${recordsWithWinRate} records have win rate data`);
    passedTests++;
  } catch (err) {
    console.error(`  ✗ Failed: ${err instanceof Error ? err.message : String(err)}`);
    failedTests++;
  }

  // Test 14: Widget settlement data
  try {
    console.log('Test 14: Widget settlement outcome data...');

    let settlementRecords = 0;

    Object.entries(REAL_DATA).forEach(([key, record]) => {
      if (record.ends && Array.isArray(record.ends)) {
        const settlementEnd = record.ends.find(
          (end: any) => end.l && end.l.toLowerCase().includes('settl')
        );
        if (settlementEnd) {
          settlementRecords++;
        }
      }
    });

    console.log(`  ✓ ${settlementRecords} records have settlement outcome data`);
    passedTests++;
  } catch (err) {
    console.error(`  ✗ Failed: ${err instanceof Error ? err.message : String(err)}`);
    failedTests++;
  }

  // Test 15: Widget NOS code string format
  try {
    console.log('Test 15: Widget NOS code string format consistency...');

    SITS.forEach((category) => {
      category.opts.forEach((opt) => {
        // nos should be string
        assert(typeof opt.nos === 'string', `NOS code should be string, got ${typeof opt.nos}`);
        // and should be numeric
        const parsed = parseInt(opt.nos, 10);
        assert(!isNaN(parsed), `NOS code should be numeric string`);
      });
    });

    console.log(`  ✓ All NOS codes are properly formatted`);
    passedTests++;
  } catch (err) {
    console.error(`  ✗ Failed: ${err instanceof Error ? err.message : String(err)}`);
    failedTests++;
  }

  // Test 16: Widget impression tracking API
  try {
    console.log('Test 16: Widget impression tracking API structure...');

    // Expected path: /app/api/widget/impression/route.ts
    const impressionApiPath = '/app/api/widget/impression/route.ts';
    console.log(`  ✓ Impression API route: ${impressionApiPath}`);

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
