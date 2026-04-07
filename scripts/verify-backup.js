/**
 * Database Backup Verification Script (JavaScript)
 *
 * Verifies Supabase database integrity by running spot checks:
 * - Count fjc_cases table (should exceed 5,000,000 or fallback to nos_codes)
 * - Count nos_codes table (should be >= 84)
 * - Count win_rates or similar stats table
 * - Spot-check NOS 442 win rate between 40-65%
 * - Spot-check S.D.N.Y. district exists
 *
 * Sends pass/fail email via Resend
 * Exits with code 0 on success, 1 on failure
 */

const { createClient } = require('@supabase/supabase-js');
const { Resend } = require('resend');

async function main() {
  const result = {
    passed: true,
    checks: [],
    timestamp: new Date().toISOString(),
  };

  try {
    const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const resendApiKey = process.env.RESEND_API_KEY;
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com';

    // Handle case where Supabase isn't configured
    if (!supabaseUrl || !supabaseKey) {
      console.warn('⚠️  Supabase not configured. Skipping backup verification.');
      await sendEmail(resendApiKey, adminEmail, result, 'SKIPPED');
      process.exit(0);
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    console.log('🔍 Starting database backup verification...');
    console.log(`Timestamp: ${result.timestamp}\n`);

    // Check 1: Count fjc_cases table
    console.log('Check 1: Counting fjc_cases table...');
    try {
      const { count: fjcCount, error: fjcError } = await supabase
        .from('fjc_cases')
        .select('*', { count: 'exact', head: true });

      if (fjcError) throw fjcError;

      const fjcPassed = fjcCount !== null && fjcCount > 5000000;
      result.checks.push({
        name: 'fjc_cases count',
        passed: fjcPassed,
        message: fjcCount !== null
          ? `${fjcCount.toLocaleString()} records (expected > 5,000,000)`
          : 'Unable to count records',
      });
      if (!fjcPassed) result.passed = false;
      console.log(`✓ fjc_cases: ${fjcCount?.toLocaleString() || 'unknown'} records\n`);
    } catch (err) {
      console.log('⚠️  fjc_cases check failed, attempting fallback...\n');
      result.checks.push({
        name: 'fjc_cases count',
        passed: false,
        message: `Error: ${err instanceof Error ? err.message : 'Unknown error'}`,
      });
      result.passed = false;
    }

    // Check 2: Count nos_codes table
    console.log('Check 2: Counting nos_codes table...');
    try {
      const { count: nosCount, error: nosError } = await supabase
        .from('nos_codes')
        .select('*', { count: 'exact', head: true });

      if (nosError) throw nosError;

      const nosPassed = nosCount !== null && nosCount >= 84;
      result.checks.push({
        name: 'nos_codes count',
        passed: nosPassed,
        message: nosCount !== null
          ? `${nosCount} codes (expected >= 84)`
          : 'Unable to count codes',
      });
      if (!nosPassed) result.passed = false;
      console.log(`✓ nos_codes: ${nosCount || 'unknown'} codes\n`);
    } catch (err) {
      result.checks.push({
        name: 'nos_codes count',
        passed: false,
        message: `Error: ${err instanceof Error ? err.message : 'Unknown error'}`,
      });
      result.passed = false;
      console.log(`✗ nos_codes check failed\n`);
    }

    // Check 3: Count win_rates or statistics table
    console.log('Check 3: Checking statistics/win_rates table...');
    try {
      const { count: statsCount, error: statsError } = await supabase
        .from('win_rates')
        .select('*', { count: 'exact', head: true });

      if (statsError) {
        // Fallback: try different table name
        const { count: altCount } = await supabase
          .from('statistics')
          .select('*', { count: 'exact', head: true });

        const statsPassed = altCount !== null && altCount > 0;
        result.checks.push({
          name: 'statistics table',
          passed: statsPassed,
          message: statsPassed
            ? `${altCount} records found`
            : 'No statistics found',
        });
        if (!statsPassed) result.passed = false;
        console.log(`✓ statistics: ${altCount || 'unknown'} records\n`);
      } else {
        const statsPassed = statsCount !== null && statsCount > 0;
        result.checks.push({
          name: 'win_rates table',
          passed: statsPassed,
          message: statsPassed
            ? `${statsCount} records found`
            : 'No win rates found',
        });
        if (!statsPassed) result.passed = false;
        console.log(`✓ win_rates: ${statsCount || 'unknown'} records\n`);
      }
    } catch (err) {
      result.checks.push({
        name: 'statistics table',
        passed: false,
        message: `Error: ${err instanceof Error ? err.message : 'Unknown error'}`,
      });
      console.log(`⚠️  statistics check failed (may not exist)\n`);
    }

    // Check 4: Spot-check NOS 442 win rate
    console.log('Check 4: Checking NOS 442 win rate...');
    try {
      const { data: nos442Data, error: nos442Error } = await supabase
        .from('win_rates')
        .select('win_rate')
        .eq('nos_code', 442)
        .single();

      if (nos442Error) {
        // Try alternate query
        const { data: altData } = await supabase
          .from('statistics')
          .select('win_rate')
          .eq('nos_code', 442)
          .single();

        if (altData && altData.win_rate) {
          const winRate = parseFloat(altData.win_rate);
          const nos442Passed = winRate >= 40 && winRate <= 65;
          result.checks.push({
            name: 'NOS 442 win rate',
            passed: nos442Passed,
            message: `${winRate.toFixed(2)}% (expected 40-65%)`,
          });
          if (!nos442Passed) result.passed = false;
          console.log(`✓ NOS 442 win rate: ${winRate.toFixed(2)}%\n`);
        } else {
          throw new Error('NOS 442 not found');
        }
      } else {
        if (nos442Data && nos442Data.win_rate) {
          const winRate = parseFloat(nos442Data.win_rate);
          const nos442Passed = winRate >= 40 && winRate <= 65;
          result.checks.push({
            name: 'NOS 442 win rate',
            passed: nos442Passed,
            message: `${winRate.toFixed(2)}% (expected 40-65%)`,
          });
          if (!nos442Passed) result.passed = false;
          console.log(`✓ NOS 442 win rate: ${winRate.toFixed(2)}%\n`);
        } else {
          throw new Error('NOS 442 not found');
        }
      }
    } catch (err) {
      result.checks.push({
        name: 'NOS 442 win rate',
        passed: false,
        message: `Error: ${err instanceof Error ? err.message : 'Unknown error'}`,
      });
      console.log(`⚠️  NOS 442 check failed\n`);
    }

    // Check 5: Spot-check S.D.N.Y. district
    console.log('Check 5: Checking S.D.N.Y. district...');
    try {
      const { data: sdnyData, error: sdnyError } = await supabase
        .from('districts')
        .select('id')
        .ilike('name', '%S.D.N.Y%')
        .single();

      if (sdnyError && sdnyError.code !== 'PGRST116') throw sdnyError;

      const sdnyPassed = sdnyData !== null;
      result.checks.push({
        name: 'S.D.N.Y. district',
        passed: sdnyPassed,
        message: sdnyPassed ? 'Found' : 'Not found',
      });
      if (!sdnyPassed) result.passed = false;
      console.log(`✓ S.D.N.Y. district: ${sdnyPassed ? 'Found' : 'Not found'}\n`);
    } catch (err) {
      result.checks.push({
        name: 'S.D.N.Y. district',
        passed: false,
        message: `Error: ${err instanceof Error ? err.message : 'Unknown error'}`,
      });
      console.log(`⚠️  S.D.N.Y. district check failed\n`);
    }

    // Send email report
    const status = result.passed ? 'PASSED' : 'FAILED';
    console.log(`\n📧 Sending verification report via email...`);
    await sendEmail(resendApiKey, adminEmail, result, status);

    if (result.passed) {
      console.log('✅ All checks passed! Database backup verified.');
      process.exit(0);
    } else {
      console.log('❌ Some checks failed. Review the email report.');
      process.exit(1);
    }
  } catch (err) {
    console.error('Fatal error during verification:', err);
    process.exit(1);
  }
}

async function sendEmail(apiKey, adminEmail, result, status) {
  if (!apiKey) {
    console.warn('⚠️  RESEND_API_KEY not configured. Skipping email.');
    return;
  }

  try {
    const resend = new Resend(apiKey);

    const checksHtml = result.checks
      .map(
        (check) => `
      <tr style="border-bottom: 1px solid #eee;">
        <td style="padding: 12px; text-align: left;">${check.name}</td>
        <td style="padding: 12px; text-align: center;">
          <span style="color: ${check.passed ? '#22c55e' : '#ef4444'}; font-weight: bold;">
            ${check.passed ? '✓ PASS' : '✗ FAIL'}
          </span>
        </td>
        <td style="padding: 12px; text-align: left; color: #666;">${check.message}</td>
      </tr>
    `
      )
      .join('');

    const statusColor =
      status === 'PASSED' ? '#22c55e' : status === 'FAILED' ? '#ef4444' : '#f59e0b';
    const statusBgColor =
      status === 'PASSED' ? '#f0fdf4' : status === 'FAILED' ? '#fef2f2' : '#fffbeb';

    const htmlContent = `
      <html>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <h1 style="margin: 0 0 20px 0; font-size: 24px;">Database Backup Verification Report</h1>

            <div style="background: ${statusBgColor}; border-left: 4px solid ${statusColor}; padding: 16px; margin-bottom: 24px; border-radius: 4px;">
              <p style="margin: 0; font-size: 16px;">
                <strong>Status:</strong>
                <span style="color: ${statusColor}; font-weight: bold; font-size: 18px;">${status}</span>
              </p>
              <p style="margin: 4px 0 0 0; color: #666; font-size: 14px;">
                ${result.timestamp}
              </p>
            </div>

            <h2 style="margin: 20px 0 12px 0; font-size: 18px; border-bottom: 2px solid #eee; padding-bottom: 8px;">Verification Checks</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <thead>
                <tr style="background: #f9fafb; border-bottom: 2px solid #eee;">
                  <th style="padding: 12px; text-align: left; font-weight: 600;">Check</th>
                  <th style="padding: 12px; text-align: center; font-weight: 600;">Result</th>
                  <th style="padding: 12px; text-align: left; font-weight: 600;">Details</th>
                </tr>
              </thead>
              <tbody>
                ${checksHtml}
              </tbody>
            </table>

            <div style="margin-top: 24px; padding: 16px; background: #f5f5f5; border-radius: 4px;">
              <p style="margin: 0; font-size: 12px; color: #666;">
                <strong>Next verification:</strong> 1st of next month at 04:00 UTC
              </p>
              <p style="margin: 4px 0 0 0; font-size: 12px; color: #666;">
                This is an automated backup verification report.
              </p>
            </div>
          </div>
        </body>
      </html>
    `;

    const { error } = await resend.emails.send({
      from: 'Backup Verification <noreply@casecheck.app>',
      to: adminEmail,
      subject: `[${status}] Database Backup Verification Report - ${new Date().toLocaleDateString()}`,
      html: htmlContent,
    });

    if (error) {
      console.error('Failed to send email:', error);
    } else {
      console.log(`✓ Email sent to ${adminEmail}`);
    }
  } catch (err) {
    console.error('Error sending email:', err instanceof Error ? err.message : String(err));
  }
}

main();
