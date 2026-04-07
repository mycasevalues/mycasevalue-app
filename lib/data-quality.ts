/**
 * Data Quality Monitoring
 *
 * Automated checks for data integrity across REAL_DATA.
 * Detects common issues: invalid win rates, zero case counts,
 * corrupted settlement ranges, year-over-year anomalies.
 */

import { REAL_DATA } from './realdata';

// ─── Types ─────────────────────────────────────────────────────

export type AnomalySeverity = 'warning' | 'critical';

export interface QualityAnomaly {
  type: 'invalid_win_rate' | 'zero_cases' | 'corrupted_settlement' | 'yoy_anomaly';
  nosCode?: string;
  description: string;
  severity: AnomalySeverity;
}

export interface QualityCheckResult {
  timestamp: string;
  passed: boolean;
  anomalies: QualityAnomaly[];
  totalChecks: number;
}

// ─── Main Check Function ──────────────────────────────────────

/**
 * Run comprehensive data quality checks on REAL_DATA.
 * Returns results with timestamp, pass/fail status, and list of anomalies.
 */
export function runDataQualityCheck(): QualityCheckResult {
  const anomalies: QualityAnomaly[] = [];
  let totalChecks = 0;

  // Get all NOS codes
  const nosCodes = Object.keys(REAL_DATA);

  // Check 1: Win rates outside 0-100% range
  Object.entries(REAL_DATA).forEach(([nosCode, data]) => {
    totalChecks++;

    if (typeof data.wr === 'number') {
      if (data.wr < 0 || data.wr > 100) {
        anomalies.push({
          type: 'invalid_win_rate',
          nosCode,
          description: `Invalid win rate: ${data.wr}% (must be 0-100%)`,
          severity: 'critical',
        });
      }
    }

    // Check pro se and represented win rates
    if (data.ps && typeof data.ps.wr === 'number') {
      totalChecks++;
      if (data.ps.wr < 0 || data.ps.wr > 100) {
        anomalies.push({
          type: 'invalid_win_rate',
          nosCode,
          description: `Invalid pro se win rate: ${data.ps.wr}% (must be 0-100%)`,
          severity: 'critical',
        });
      }
    }

    if (data.rr && typeof data.rr.wr === 'number') {
      totalChecks++;
      if (data.rr.wr < 0 || data.rr.wr > 100) {
        anomalies.push({
          type: 'invalid_win_rate',
          nosCode,
          description: `Invalid represented win rate: ${data.rr.wr}% (must be 0-100%)`,
          severity: 'critical',
        });
      }
    }
  });

  // Check 2: Case counts of zero for any NOS code
  Object.entries(REAL_DATA).forEach(([nosCode, data]) => {
    totalChecks++;

    if (typeof data.total === 'number' && data.total === 0) {
      anomalies.push({
        type: 'zero_cases',
        nosCode,
        description: `Zero total cases for NOS code ${nosCode}`,
        severity: 'warning',
      });
    }

    if (data.ps && typeof data.ps.total === 'number' && data.ps.total === 0) {
      totalChecks++;
      anomalies.push({
        type: 'zero_cases',
        nosCode,
        description: `Zero pro se cases for NOS code ${nosCode}`,
        severity: 'warning',
      });
    }

    if (data.rr && typeof data.rr.total === 'number' && data.rr.total === 0) {
      totalChecks++;
      anomalies.push({
        type: 'zero_cases',
        nosCode,
        description: `Zero represented cases for NOS code ${nosCode}`,
        severity: 'warning',
      });
    }
  });

  // Check 3: Settlement data where hi < md (P75 < P50, data corruption)
  // Note: REAL_DATA stores settlement ranges in THOUSANDS
  Object.entries(REAL_DATA).forEach(([nosCode, data]) => {
    totalChecks++;

    if (data.rng && typeof data.rng.hi === 'number' && typeof data.rng.md === 'number') {
      if (data.rng.hi < data.rng.md) {
        anomalies.push({
          type: 'corrupted_settlement',
          nosCode,
          description: `Corrupted settlement range: hi (${data.rng.hi}k) < md (${data.rng.md}k). P75 should be >= P50.`,
          severity: 'critical',
        });
      }

      // Also check lo < md
      if (typeof data.rng.lo === 'number' && data.rng.lo > data.rng.md) {
        anomalies.push({
          type: 'corrupted_settlement',
          nosCode,
          description: `Corrupted settlement range: lo (${data.rng.lo}k) > md (${data.rng.md}k). P25 should be <= P50.`,
          severity: 'critical',
        });
      }
    }
  });

  // Check 4: Year-over-year win rate change > 20pp (percentage points)
  // Use pro se vs represented as proxy for different case types
  Object.entries(REAL_DATA).forEach(([nosCode, data]) => {
    totalChecks++;

    if (
      data.ps &&
      data.rr &&
      typeof data.ps.wr === 'number' &&
      typeof data.rr.wr === 'number'
    ) {
      const yoyDelta = Math.abs(data.rr.wr - data.ps.wr);
      if (yoyDelta > 20) {
        anomalies.push({
          type: 'yoy_anomaly',
          nosCode,
          description: `Large win rate divergence: represented (${data.rr.wr}%) vs pro se (${data.ps.wr}%) = ${yoyDelta.toFixed(1)}pp. Investigate potential data quality issue.`,
          severity: 'warning',
        });
      }
    }

    // Also check yearly trends if available
    if (data.yearly_trend && typeof data.yearly_trend === 'object') {
      const years = Object.keys(data.yearly_trend)
        .map((y) => parseInt(y, 10))
        .sort((a, b) => a - b);

      for (let i = 1; i < years.length; i++) {
        totalChecks++;
        const prevYear = years[i - 1];
        const currYear = years[i];
        const prevData = (data.yearly_trend as any)[prevYear];
        const currData = (data.yearly_trend as any)[currYear];

        if (
          prevData &&
          currData &&
          typeof prevData.wr === 'number' &&
          typeof currData.wr === 'number'
        ) {
          const yoyDelta = Math.abs(currData.wr - prevData.wr);
          if (yoyDelta > 20) {
            anomalies.push({
              type: 'yoy_anomaly',
              nosCode,
              description: `Large YoY win rate change ${prevYear}-${currYear}: ${prevData.wr}% -> ${currData.wr}% (${yoyDelta.toFixed(1)}pp). Investigate data quality.`,
              severity: 'warning',
            });
          }
        }
      }
    }
  });

  const passed = anomalies.length === 0;

  return {
    timestamp: new Date().toISOString(),
    passed,
    anomalies,
    totalChecks,
  };
}

/**
 * Get human-readable summary of check results
 */
export function summarizeCheckResults(result: QualityCheckResult): string {
  if (result.passed) {
    return `All ${result.totalChecks} checks passed at ${new Date(result.timestamp).toLocaleTimeString()}`;
  }

  const criticalCount = result.anomalies.filter((a) => a.severity === 'critical').length;
  const warningCount = result.anomalies.filter((a) => a.severity === 'warning').length;

  return `Quality check failed: ${criticalCount} critical, ${warningCount} warning anomalies detected`;
}
