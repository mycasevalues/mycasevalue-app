/**
 * Data Accuracy Verification Script for CaseCheck (JavaScript)
 * Verifies REAL_DATA integrity for 20 NOS codes against expected ranges
 * Runnable with: node scripts/verify-data.js
 */

// Reference dataset with expected win rate ranges
const REFERENCE_DATA = {
  '442': { label: 'Employment Discrimination', expectedWinRateMin: 50, expectedWinRateMax: 54 },
  '445': { label: 'Civil Rights', expectedWinRateMin: 52, expectedWinRateMax: 56 },
  '710': { label: 'Real Property', expectedWinRateMin: 58, expectedWinRateMax: 64 },
  '360': { label: 'Personal Injury', expectedWinRateMin: 40, expectedWinRateMax: 50 },
  '362': { label: 'Medical Malpractice', expectedWinRateMin: 25, expectedWinRateMax: 35 },
  '365': { label: 'Product Liability', expectedWinRateMin: 35, expectedWinRateMax: 45 },
  '370': { label: 'Other Personal Injury', expectedWinRateMin: 35, expectedWinRateMax: 45 },
  '440': { label: 'Other Civil Rights', expectedWinRateMin: 48, expectedWinRateMax: 58 },
  '190': { label: 'Contract', expectedWinRateMin: 59, expectedWinRateMax: 63 },
  '110': { label: 'Insurance', expectedWinRateMin: 40, expectedWinRateMax: 55 },
  '870': { label: 'Bankruptcy', expectedWinRateMin: 20, expectedWinRateMax: 40 },
  '863': { label: 'Tax', expectedWinRateMin: 15, expectedWinRateMax: 35 },
  '220': { label: 'Diversity Jurisdiction', expectedWinRateMin: 45, expectedWinRateMax: 60 },
  '350': { label: 'Tort', expectedWinRateMin: 35, expectedWinRateMax: 55 },
  '830': { label: 'Student Loan', expectedWinRateMin: 5, expectedWinRateMax: 20 },
  '820': { label: 'Copyright', expectedWinRateMin: 40, expectedWinRateMax: 65 },
  '840': { label: 'Patent', expectedWinRateMin: 35, expectedWinRateMax: 55 },
  '550': { label: 'Merchant Marine', expectedWinRateMin: 25, expectedWinRateMax: 32 },
  '791': { label: 'Other Specialized', expectedWinRateMin: 40, expectedWinRateMax: 50 },
  '376': { label: 'False Imprisonment', expectedWinRateMin: 25, expectedWinRateMax: 45 },
};

const CODES_TO_VERIFY = Object.keys(REFERENCE_DATA);

/**
 * Load REAL_DATA from the TypeScript module
 */
async function loadRealData() {
  try {
    // Try ESM import first
    const module = await import('../lib/realdata.js');
    return module.REAL_DATA;
  } catch (error) {
    console.error('Error loading REAL_DATA:', error.message);
    process.exit(1);
  }
}

/**
 * Verify a single NOS code
 */
function verifyCode(code, realData, refData) {
  const codeData = realData[code];

  if (!codeData) {
    return {
      code,
      label: refData?.label || 'Unknown',
      checks: {
        winRateValid: false,
        settlementRange: false,
        caseCountValid: false,
        durationValid: false,
        winRateDrift: false,
      },
      details: {
        winRate: 0,
        winRateDriftPoints: 0,
        settlementLo: 0,
        settlementMd: 0,
        settlementHi: 0,
        caseCount: 0,
        duration: 0,
      },
      status: 'FAIL',
    };
  }

  const winRate = codeData.wr || 0;
  const settlementLo = codeData.rng?.lo || 0;
  const settlementMd = codeData.rng?.md || 0;
  const settlementHi = codeData.rng?.hi || 0;
  const caseCount = codeData.total || 0;
  const duration = codeData.mo || 0;

  // Determine win rate drift
  const winRateDriftPoints =
    winRate < refData.expectedWinRateMin
      ? refData.expectedWinRateMin - winRate
      : winRate > refData.expectedWinRateMax
        ? winRate - refData.expectedWinRateMax
        : 0;

  // Perform validation checks
  const checks = {
    winRateValid: winRate >= 0 && winRate <= 100,
    settlementRange: settlementLo < settlementMd && settlementMd < settlementHi,
    caseCountValid: caseCount > 0,
    durationValid: duration > 0,
    winRateDrift: winRateDriftPoints <= 2,
  };

  const status = Object.values(checks).every((check) => check) ? 'PASS' : 'FAIL';

  return {
    code,
    label: codeData.label || refData.label,
    checks,
    details: {
      winRate,
      winRateDriftPoints,
      settlementLo,
      settlementMd,
      settlementHi,
      caseCount,
      duration,
    },
    status,
  };
}

/**
 * Generate HTML email report
 */
function generateHtmlReport(results) {
  const passCount = results.filter((r) => r.status === 'PASS').length;
  const failCount = results.filter((r) => r.status === 'FAIL').length;
  const timestamp = new Date().toISOString();

  const tableRows = results
    .map(
      (r) => `
    <tr style="border-bottom: 1px solid #e5e7eb;">
      <td style="padding: 12px; text-align: left; font-family: monospace;">${r.code}</td>
      <td style="padding: 12px; text-align: left;">${r.label}</td>
      <td style="padding: 12px; text-align: right; color: ${r.checks.winRateValid ? '#059669' : '#dc2626'}; font-weight: bold;">
        ${r.details.winRate}% ${r.details.winRateDriftPoints > 0 ? `(drift: +${r.details.winRateDriftPoints.toFixed(1)}pt)` : ''}
      </td>
      <td style="padding: 12px; text-align: left; font-family: monospace; color: ${r.checks.settlementRange ? '#059669' : '#dc2626'};">
        $${r.details.settlementLo} - $${r.details.settlementMd} - $${r.details.settlementHi}
      </td>
      <td style="padding: 12px; text-align: right; color: ${r.checks.caseCountValid ? '#059669' : '#dc2626'};">
        ${r.details.caseCount.toLocaleString()}
      </td>
      <td style="padding: 12px; text-align: center; color: ${r.checks.durationValid ? '#059669' : '#dc2626'};">
        ${r.details.duration} mo
      </td>
      <td style="padding: 12px; text-align: center; font-weight: bold; color: ${r.status === 'PASS' ? '#059669' : '#dc2626'};">
        ${r.status}
      </td>
    </tr>
  `
    )
    .join('');

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CaseCheck Data Verification Report</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', sans-serif; color: #1f2937; background-color: #f9fafb;">
  <div style="max-width: 1200px; margin: 0 auto; padding: 24px;">
    <div style="background: white; border-radius: 8px; padding: 24px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
      <h1 style="margin: 0 0 8px 0; color: #111827; font-size: 24px;">CaseCheck Data Verification Report</h1>
      <p style="margin: 0 0 16px 0; color: #6b7280; font-size: 14px;">Generated on ${timestamp}</p>

      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-bottom: 32px;">
        <div style="background: #f0fdf4; border-left: 4px solid #10b981; padding: 16px; border-radius: 4px;">
          <p style="margin: 0 0 4px 0; color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Passed</p>
          <p style="margin: 0; color: #059669; font-size: 28px; font-weight: bold;">${passCount}/${results.length}</p>
        </div>
        <div style="background: ${failCount > 0 ? '#fef2f2' : '#f0fdf4'}; border-left: 4px solid ${failCount > 0 ? '#ef4444' : '#10b981'}; padding: 16px; border-radius: 4px;">
          <p style="margin: 0 0 4px 0; color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Failed</p>
          <p style="margin: 0; color: ${failCount > 0 ? '#dc2626' : '#059669'}; font-size: 28px; font-weight: bold;">${failCount}/${results.length}</p>
        </div>
      </div>

      <h2 style="margin: 0 0 16px 0; color: #111827; font-size: 16px; font-weight: 600;">Code Verification Details</h2>
      <div style="overflow-x: auto;">
        <table style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr style="background: #f3f4f6; border-bottom: 2px solid #d1d5db;">
              <th style="padding: 12px; text-align: left; font-weight: 600; font-size: 13px; color: #374151;">Code</th>
              <th style="padding: 12px; text-align: left; font-weight: 600; font-size: 13px; color: #374151;">Case Type</th>
              <th style="padding: 12px; text-align: right; font-weight: 600; font-size: 13px; color: #374151;">Win Rate</th>
              <th style="padding: 12px; text-align: left; font-weight: 600; font-size: 13px; color: #374151;">Settlement Range</th>
              <th style="padding: 12px; text-align: right; font-weight: 600; font-size: 13px; color: #374151;">Cases</th>
              <th style="padding: 12px; text-align: center; font-weight: 600; font-size: 13px; color: #374151;">Duration</th>
              <th style="padding: 12px; text-align: center; font-weight: 600; font-size: 13px; color: #374151;">Status</th>
            </tr>
          </thead>
          <tbody>
            ${tableRows}
          </tbody>
        </table>
      </div>

      <div style="background: #eff6ff; border-left: 4px solid #3b82f6; padding: 16px; border-radius: 4px; margin-top: 24px;">
        <h3 style="margin: 0 0 8px 0; color: #0052CC; font-size: 14px; font-weight: 600;">Validation Criteria</h3>
        <ul style="margin: 0; padding-left: 20px; color: #0052CC; font-size: 13px;">
          <li>Win rate between 0-100%</li>
          <li>Settlement range: lo &lt; md &lt; hi</li>
          <li>Case count &gt; 0</li>
          <li>Duration (months) &gt; 0</li>
          <li>Win rate drift from expected range &le; 2 percentage points</li>
        </ul>
      </div>
    </div>
  </div>
</body>
</html>
  `;
}

/**
 * Send email report via Resend API
 */
async function sendEmailReport(htmlContent) {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.log('⚠️  RESEND_API_KEY not configured. Skipping email send.');
    return false;
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'noreply@casecheck.app',
        to: 'data-team@casecheck.app',
        subject: 'CaseCheck Data Verification Report',
        html: htmlContent,
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      console.error('Failed to send email:', response.statusText, text);
      return false;
    }

    console.log('✓ Email report sent successfully');
    return true;
  } catch (error) {
    console.error('Error sending email:', error.message);
    return false;
  }
}

/**
 * Main entry point
 */
async function main() {
  console.log('\n📊 CaseCheck Data Accuracy Verification');
  console.log('==========================================\n');

  const REAL_DATA = await loadRealData();
  const results = CODES_TO_VERIFY.map((code) => verifyCode(code, REAL_DATA, REFERENCE_DATA[code]));

  // Print console summary
  results.forEach((result) => {
    const statusIcon = result.status === 'PASS' ? '✓' : '✗';
    const statusColor = result.status === 'PASS' ? '\x1b[32m' : '\x1b[31m';
    const resetColor = '\x1b[0m';

    console.log(
      `${statusColor}${statusIcon}${resetColor} Code ${result.code} (${result.label}): ${statusColor}${result.status}${resetColor}`
    );

    if (result.status === 'FAIL') {
      if (!result.checks.winRateValid) {
        console.log(`    ├─ Win rate out of range: ${result.details.winRate}%`);
      }
      if (!result.checks.settlementRange) {
        console.log(
          `    ├─ Settlement range invalid: $${result.details.settlementLo} - $${result.details.settlementMd} - $${result.details.settlementHi}`
        );
      }
      if (!result.checks.caseCountValid) {
        console.log(`    ├─ Case count invalid: ${result.details.caseCount}`);
      }
      if (!result.checks.durationValid) {
        console.log(`    ├─ Duration invalid: ${result.details.duration} months`);
      }
      if (!result.checks.winRateDrift) {
        console.log(`    └─ Win rate drift exceeds threshold: ${result.details.winRateDriftPoints.toFixed(1)}pt`);
      }
    }
  });

  const passCount = results.filter((r) => r.status === 'PASS').length;
  const failCount = results.filter((r) => r.status === 'FAIL').length;

  console.log('\n' + '='.repeat(50));
  console.log(`Summary: ${passCount} PASSED, ${failCount} FAILED\n`);

  // Generate and send email report
  const htmlReport = generateHtmlReport(results);
  await sendEmailReport(htmlReport);

  // Exit with appropriate code
  process.exit(failCount > 0 ? 1 : 0);
}

main().catch((error) => {
  console.error('Script error:', error);
  process.exit(1);
});
