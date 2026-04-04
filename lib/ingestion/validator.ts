/**
 * Data validation module for ingestion pipeline
 * Validates data integrity and completeness
 */

import { getSupabaseAdmin } from '../supabase'
import type { CaseStats } from '../supabase'

export interface ValidationResult {
  valid: boolean
  errors: string[]
}

export interface DataCompletenessMetrics {
  totalNosCodesWithData: number
  nosCodesWithWinRate: number
  nosCodesWithSettlementRate: number
  nosCodesWithBothMetrics: number
  completenessPercentage: number
  dataQualityScore: number
}

/**
 * Validate a single case stat record
 * Checks required fields and valid ranges
 */
export function validateCaseStat(stat: any): ValidationResult {
  const errors: string[] = []

  // Required fields
  if (!stat.nos_code || typeof stat.nos_code !== 'string') {
    errors.push('Invalid or missing nos_code')
  }
  if (!stat.label || typeof stat.label !== 'string') {
    errors.push('Invalid or missing label')
  }
  if (!stat.category || typeof stat.category !== 'string') {
    errors.push('Invalid or missing category')
  }

  // Numeric validations with range checks
  const winRate = parseFloat(stat.win_rate)
  if (isNaN(winRate) || winRate < 0 || winRate > 100) {
    errors.push(`Invalid win_rate: ${stat.win_rate} (must be 0-100)`)
  }

  const settlementRate = parseFloat(stat.settlement_rate)
  if (isNaN(settlementRate) || settlementRate < 0 || settlementRate > 100) {
    errors.push(`Invalid settlement_rate: ${stat.settlement_rate} (must be 0-100)`)
  }

  const totalCases = parseInt(stat.total_cases)
  if (isNaN(totalCases) || totalCases < 0) {
    errors.push(`Invalid total_cases: ${stat.total_cases} (must be >= 0)`)
  }

  const avgDuration = parseFloat(stat.avg_duration_months)
  if (isNaN(avgDuration) || avgDuration < 0) {
    errors.push(`Invalid avg_duration_months: ${stat.avg_duration_months} (must be >= 0)`)
  }

  // Optional numeric fields
  if (stat.represented_win_rate !== null && stat.represented_win_rate !== undefined) {
    const repWinRate = parseFloat(stat.represented_win_rate)
    if (!isNaN(repWinRate) && (repWinRate < 0 || repWinRate > 100)) {
      errors.push(`Invalid represented_win_rate: ${stat.represented_win_rate} (must be 0-100)`)
    }
  }

  if (stat.pro_se_win_rate !== null && stat.pro_se_win_rate !== undefined) {
    const proSeWinRate = parseFloat(stat.pro_se_win_rate)
    if (!isNaN(proSeWinRate) && (proSeWinRate < 0 || proSeWinRate > 100)) {
      errors.push(`Invalid pro_se_win_rate: ${stat.pro_se_win_rate} (must be 0-100)`)
    }
  }

  if (stat.class_action_pct !== null && stat.class_action_pct !== undefined) {
    const classActionPct = parseFloat(stat.class_action_pct)
    if (!isNaN(classActionPct) && (classActionPct < 0 || classActionPct > 100)) {
      errors.push(`Invalid class_action_pct: ${stat.class_action_pct} (must be 0-100)`)
    }
  }

  // Source must be present
  if (!stat.source || typeof stat.source !== 'string') {
    errors.push('Invalid or missing source')
  }

  return {
    valid: errors.length === 0,
    errors
  }
}

/**
 * Validate a single opinion record
 * Checks required fields for court opinions
 */
export function validateOpinion(opinion: any): ValidationResult {
  const errors: string[] = []

  // Required fields
  if (!opinion.courtlistener_id || typeof opinion.courtlistener_id !== 'string') {
    errors.push('Invalid or missing courtlistener_id')
  }
  if (!opinion.case_name || typeof opinion.case_name !== 'string') {
    errors.push('Invalid or missing case_name')
  }
  if (!opinion.court || typeof opinion.court !== 'string') {
    errors.push('Invalid or missing court')
  }
  if (!opinion.source || typeof opinion.source !== 'string') {
    errors.push('Invalid or missing source')
  }

  // Optional but should be validated if present
  if (opinion.date_filed && isNaN(Date.parse(opinion.date_filed))) {
    errors.push(`Invalid date_filed: ${opinion.date_filed}`)
  }

  if (opinion.opinion_type && !['lead', 'concurrence', 'dissent'].includes(opinion.opinion_type)) {
    errors.push(`Invalid opinion_type: ${opinion.opinion_type}`)
  }

  return {
    valid: errors.length === 0,
    errors
  }
}

/**
 * Validate overall ingestion results
 * Checks pipeline health across multiple records
 */
export function validateIngestionResults(results: {
  totalRecords: number
  successCount: number
  errorCount: number
  records: any[]
}): ValidationResult {
  const errors: string[] = []

  if (!results || typeof results !== 'object') {
    return { valid: false, errors: ['Invalid results object'] }
  }

  // Check counts
  if (typeof results.totalRecords !== 'number' || results.totalRecords < 0) {
    errors.push('Invalid totalRecords count')
  }
  if (typeof results.successCount !== 'number' || results.successCount < 0) {
    errors.push('Invalid successCount')
  }
  if (typeof results.errorCount !== 'number' || results.errorCount < 0) {
    errors.push('Invalid errorCount')
  }

  // Verify counts add up
  const actualTotal = results.successCount + results.errorCount
  if (actualTotal !== results.totalRecords) {
    errors.push(
      `Count mismatch: ${results.successCount} + ${results.errorCount} = ${actualTotal}, expected ${results.totalRecords}`
    )
  }

  // Check records array
  if (!Array.isArray(results.records)) {
    errors.push('Records must be an array')
  } else if (results.records.length > 0) {
    // Sample validation of a few records
    const samplesToCheck = Math.min(5, results.records.length)
    for (let i = 0; i < samplesToCheck; i++) {
      const record = results.records[i]
      if (!record || typeof record !== 'object') {
        errors.push(`Invalid record at index ${i}`)
      }
    }
  }

  return {
    valid: errors.length === 0,
    errors
  }
}

/**
 * Query database to get data completeness metrics
 * Shows what percentage of data has key metrics filled in
 */
export async function getDataCompleteness(): Promise<DataCompletenessMetrics> {
  try {
    const supabase = getSupabaseAdmin()

    // Get total NOS codes
    const { count: totalCount } = await supabase
      .from('case_stats')
      .select('*', { count: 'exact', head: true })

    // Count codes with win_rate > 0
    const { count: withWinRate } = await supabase
      .from('case_stats')
      .select('*', { count: 'exact', head: true })
      .gt('win_rate', 0)

    // Count codes with settlement_rate > 0
    const { count: withSettlementRate } = await supabase
      .from('case_stats')
      .select('*', { count: 'exact', head: true })
      .gt('settlement_rate', 0)

    // Count codes with both metrics
    const { count: withBothMetrics } = await supabase
      .from('case_stats')
      .select('*', { count: 'exact', head: true })
      .gt('win_rate', 0)
      .gt('settlement_rate', 0)

    const total = totalCount || 0
    const bothMetricsCount = withBothMetrics || 0

    // Calculate completeness percentage (0-100)
    const completenessPercentage = total > 0 ? (bothMetricsCount / total) * 100 : 0

    // Data quality score (0-100)
    // Based on: completeness (50%), win_rate distribution (25%), settlement_rate distribution (25%)
    const completenessScore = completenessPercentage
    const winRateScore = total > 0 ? ((withWinRate || 0) / total) * 100 : 0
    const settlementScore = total > 0 ? ((withSettlementRate || 0) / total) * 100 : 0
    const dataQualityScore = (completenessScore * 0.5 + winRateScore * 0.25 + settlementScore * 0.25)

    return {
      totalNosCodesWithData: total,
      nosCodesWithWinRate: withWinRate || 0,
      nosCodesWithSettlementRate: withSettlementRate || 0,
      nosCodesWithBothMetrics: bothMetricsCount,
      completenessPercentage: Math.round(completenessPercentage * 10) / 10,
      dataQualityScore: Math.round(dataQualityScore * 10) / 10
    }
  } catch (error: any) {
    return {
      totalNosCodesWithData: 0,
      nosCodesWithWinRate: 0,
      nosCodesWithSettlementRate: 0,
      nosCodesWithBothMetrics: 0,
      completenessPercentage: 0,
      dataQualityScore: 0
    }
  }
}
