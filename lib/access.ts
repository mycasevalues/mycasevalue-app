/**
 * MyCaseValue — Centralized Feature Access Control
 * 4-tier system: Free → Single Report → Unlimited Reports → Attorney Mode
 *
 * Every gated UI element must check canAccess() server-side.
 * Client-side checks are UX only — never for data security.
 */

import { getSupabase } from './supabase';

// ─── Tier Definitions ─────────────────────────────────────────────
export type Tier = 'free' | 'single_report' | 'unlimited' | 'attorney';

export const TIER_ORDER: Record<Tier, number> = {
  free: 0,
  single_report: 1,
  unlimited: 2,
  attorney: 3,
};

export const TIER_LABELS: Record<Tier, { en: string; es: string }> = {
  free: { en: 'Free', es: 'Gratis' },
  single_report: { en: 'Single Report', es: 'Informe Individual' },
  unlimited: { en: 'Unlimited Reports', es: 'Informes Ilimitados' },
  attorney: { en: 'Attorney Mode', es: 'Modo Abogado' },
};

export const TIER_PRICES: Record<Tier, { amount: number; interval: string | null }> = {
  free: { amount: 0, interval: null },
  single_report: { amount: 5.99, interval: null },
  unlimited: { amount: 9.99, interval: null },
  attorney: { amount: 29.99, interval: 'month' },
};

export const TIER_STRIPE_PRICES: Record<Exclude<Tier, 'free'>, string> = {
  single_report: process.env.NEXT_PUBLIC_STRIPE_PRICE_SINGLE || '',
  unlimited: process.env.NEXT_PUBLIC_STRIPE_PRICE_UNLIMITED || '',
  attorney: process.env.NEXT_PUBLIC_STRIPE_PRICE_ATTORNEY || '',
};

// ─── Feature Keys (Complete Union) ────────────────────────────────
export type FeatureKey =
  // ── Free Tier ──
  | 'basic_win_rate'
  | 'basic_median_settlement'
  | 'basic_duration'
  | 'basic_sample_size'
  | 'basic_district_page'
  | 'basic_case_type_page'
  | 'daily_lookup_limit'
  // ── Single Report ──
  | 'full_settlement_range'
  | 'confidence_intervals'
  | 'full_calculator_results'
  | 'single_report_pdf'
  | 'district_judge_overview'
  | 'single_report_access'
  // ── Unlimited Reports ──
  | 'unlimited_lookups'
  | 'trend_data'
  | 'case_comparison'
  | 'historical_verdicts'
  | 'saved_reports'
  | 'search_history'
  | 'watchlist_alerts'
  | 'clean_pdf_export'
  | 'spanish_language'
  | 'standard_judge_profiles'
  | 'account_dashboard'
  // ── Attorney Mode ──
  | 'judge_intelligence_full'
  | 'ai_outcome_predictor'
  | 'document_intelligence'
  | 'opposing_counsel_research'
  | 'venue_optimizer'
  | 'case_trajectory_mapper'
  | 'appeal_intelligence'
  | 'motion_success_database'
  | 'negotiation_timing'
  | 'expert_witness_tracker'
  | 'pacer_monitoring'
  | 'class_action_intelligence'
  | 'bulk_analysis'
  | 'api_access'
  | 'team_workspace'
  | 'white_label_pdfs'
  | 'custom_dashboards'
  | 'priority_data'
  | 'dedicated_support';

// ─── Feature → Minimum Tier Mapping ──────────────────────────────
const FEATURE_MIN_TIER: Record<FeatureKey, Tier> = {
  // Free
  basic_win_rate: 'free',
  basic_median_settlement: 'free',
  basic_duration: 'free',
  basic_sample_size: 'free',
  basic_district_page: 'free',
  basic_case_type_page: 'free',
  daily_lookup_limit: 'free',

  // Single Report ($5.99 one-time)
  full_settlement_range: 'single_report',
  confidence_intervals: 'single_report',
  full_calculator_results: 'single_report',
  single_report_pdf: 'single_report',
  district_judge_overview: 'single_report',
  single_report_access: 'single_report',

  // Unlimited Reports ($9.99 one-time)
  unlimited_lookups: 'unlimited',
  trend_data: 'unlimited',
  case_comparison: 'unlimited',
  historical_verdicts: 'unlimited',
  saved_reports: 'unlimited',
  search_history: 'unlimited',
  watchlist_alerts: 'unlimited',
  clean_pdf_export: 'unlimited',
  spanish_language: 'unlimited',
  standard_judge_profiles: 'unlimited',
  account_dashboard: 'unlimited',

  // Attorney Mode ($29.99/mo)
  judge_intelligence_full: 'attorney',
  ai_outcome_predictor: 'attorney',
  document_intelligence: 'attorney',
  opposing_counsel_research: 'attorney',
  venue_optimizer: 'attorney',
  case_trajectory_mapper: 'attorney',
  appeal_intelligence: 'attorney',
  motion_success_database: 'attorney',
  negotiation_timing: 'attorney',
  expert_witness_tracker: 'attorney',
  pacer_monitoring: 'attorney',
  class_action_intelligence: 'attorney',
  bulk_analysis: 'attorney',
  api_access: 'attorney',
  team_workspace: 'attorney',
  white_label_pdfs: 'attorney',
  custom_dashboards: 'attorney',
  priority_data: 'attorney',
  dedicated_support: 'attorney',
};

// ─── TIER_FEATURES export (spec requirement) ──────────────────────
export const TIER_FEATURES: Record<Tier, FeatureKey[]> = {
  free: (Object.entries(FEATURE_MIN_TIER) as [FeatureKey, Tier][])
    .filter(([, t]) => t === 'free').map(([k]) => k),
  single_report: (Object.entries(FEATURE_MIN_TIER) as [FeatureKey, Tier][])
    .filter(([, t]) => TIER_ORDER[t] <= TIER_ORDER.single_report).map(([k]) => k),
  unlimited: (Object.entries(FEATURE_MIN_TIER) as [FeatureKey, Tier][])
    .filter(([, t]) => TIER_ORDER[t] <= TIER_ORDER.unlimited).map(([k]) => k),
  attorney: Object.keys(FEATURE_MIN_TIER) as FeatureKey[],
};

// ─── Server-Side Access Functions ────────────────────────────────

/**
 * Get a user's current tier from Supabase.
 * Queries premium_sessions by email (the unique key in that table).
 * Returns 'free' for unauthenticated or unknown users.
 */
export async function getUserTier(email: string | null): Promise<Tier> {
  if (!email) return 'free';

  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from('premium_sessions')
      .select('plan, expires_at')
      .eq('email', email.toLowerCase())
      .order('granted_at', { ascending: false })
      .limit(1)
      .single();

    if (error || !data) return 'free';

    // Check if subscription/access is still active
    if (data.expires_at) {
      const expiresMs = typeof data.expires_at === 'number'
        ? data.expires_at
        : new Date(data.expires_at).getTime();
      if (expiresMs < Date.now()) return 'free'; // Expired
    }

    // Map plan names to tier IDs
    const planToTier: Record<string, Tier> = {
      free: 'free',
      single: 'single_report',
      single_report: 'single_report',
      unlimited: 'unlimited',
      attorney: 'attorney',
    };

    return planToTier[data.plan] || 'free';
  } catch {
    return 'free';
  }
}

/**
 * Server-side async access check.
 * Resolves the user's tier from DB (by email) and checks feature access.
 */
export async function canAccessAsync(
  email: string | null,
  feature: FeatureKey
): Promise<boolean> {
  const tier = await getUserTier(email);
  return canAccess(tier, feature);
}

// ─── Synchronous Access Check (for client-side UX) ───────────────

/**
 * Check if a given tier can access a specific feature.
 * Higher tiers inherit all features from lower tiers.
 */
export function canAccess(userTier: Tier, feature: FeatureKey): boolean {
  const requiredTier = FEATURE_MIN_TIER[feature];
  if (!requiredTier) return false;
  return TIER_ORDER[userTier] >= TIER_ORDER[requiredTier];
}

/**
 * Get all features available to a given tier.
 */
export function getFeaturesForTier(tier: Tier): FeatureKey[] {
  return TIER_FEATURES[tier];
}

/**
 * Get the minimum tier required for a feature.
 */
export function getRequiredTier(feature: FeatureKey): Tier {
  return FEATURE_MIN_TIER[feature];
}

/**
 * Get the upgrade tier suggestion when a user tries to access a locked feature.
 */
export function getUpgradeTier(userTier: Tier, feature: FeatureKey): Tier | null {
  const required = FEATURE_MIN_TIER[feature];
  if (!required) return null;
  if (TIER_ORDER[userTier] >= TIER_ORDER[required]) return null;
  return required;
}

// ─── Feature Descriptions (UI Display) ───────────────────────────
export const FEATURE_DESCRIPTIONS: Record<FeatureKey, { en: string; es: string }> = {
  basic_win_rate: { en: 'Win rate percentage', es: 'Porcentaje de tasa de victoria' },
  basic_median_settlement: { en: 'Median settlement amount', es: 'Monto medio de acuerdos' },
  basic_duration: { en: 'Median case duration', es: 'Duración mediana del caso' },
  basic_sample_size: { en: 'Sample size data', es: 'Datos del tamaño de la muestra' },
  basic_district_page: { en: 'District overview pages', es: 'Páginas de resumen de distritos' },
  basic_case_type_page: { en: 'Case type overview pages', es: 'Páginas de tipos de caso' },
  daily_lookup_limit: { en: '3 free lookups per day', es: '3 búsquedas gratis por día' },

  full_settlement_range: { en: 'Full settlement percentile range', es: 'Rango completo de percentiles' },
  confidence_intervals: { en: 'Confidence intervals', es: 'Intervalos de confianza' },
  full_calculator_results: { en: 'Settlement calculator — full results', es: 'Calculadora — resultados completos' },
  single_report_pdf: { en: 'PDF export — branded report', es: 'Exportar PDF — informe con marca' },
  district_judge_overview: { en: 'Basic judge overview', es: 'Resumen básico de jueces' },
  single_report_access: { en: '90-day report access', es: 'Acceso al informe por 90 días' },

  unlimited_lookups: { en: 'Unlimited lookups', es: 'Búsquedas ilimitadas' },
  trend_data: { en: 'Year-over-year trend data', es: 'Datos de tendencia interanual' },
  case_comparison: { en: 'Compare up to 3 cases', es: 'Comparar hasta 3 casos' },
  historical_verdicts: { en: 'Historical verdict explorer', es: 'Explorador de veredictos históricos' },
  saved_reports: { en: 'Saved reports library', es: 'Biblioteca de informes guardados' },
  search_history: { en: 'Search history (100 searches)', es: 'Historial de búsqueda' },
  watchlist_alerts: { en: 'Watchlist alerts', es: 'Alertas de lista de seguimiento' },
  clean_pdf_export: { en: 'Clean PDF exports', es: 'Exportaciones PDF limpias' },
  spanish_language: { en: 'Full Spanish language', es: 'Interfaz completa en español' },
  standard_judge_profiles: { en: 'Standard judge profiles', es: 'Perfiles estándar de jueces' },
  account_dashboard: { en: 'Full account dashboard', es: 'Panel completo de cuenta' },

  judge_intelligence_full: { en: 'Advanced judge intelligence', es: 'Inteligencia avanzada de jueces' },
  ai_outcome_predictor: { en: 'AI case outcome predictor', es: 'Predictor de resultados con IA' },
  document_intelligence: { en: 'Document intelligence', es: 'Inteligencia de documentos' },
  opposing_counsel_research: { en: 'Opposing counsel research', es: 'Investigación de abogado oponente' },
  venue_optimizer: { en: 'Venue selection optimizer', es: 'Optimizador de selección de sede' },
  case_trajectory_mapper: { en: 'Case trajectory mapper', es: 'Mapa de trayectoria del caso' },
  appeal_intelligence: { en: 'Appeal probability scorer', es: 'Puntuación de probabilidad de apelación' },
  motion_success_database: { en: 'Motion success rate database', es: 'Base de datos de tasas de éxito' },
  negotiation_timing: { en: 'Negotiation timing intelligence', es: 'Inteligencia de tiempo de negociación' },
  expert_witness_tracker: { en: 'Expert witness tracker', es: 'Rastreador de testigos expertos' },
  pacer_monitoring: { en: 'Real-time PACER monitoring', es: 'Monitoreo PACER en tiempo real' },
  class_action_intelligence: { en: 'Class action intelligence', es: 'Inteligencia de acciones colectivas' },
  bulk_analysis: { en: 'Bulk case analysis (CSV)', es: 'Análisis masivo de casos (CSV)' },
  api_access: { en: 'Full API access', es: 'Acceso completo a la API' },
  team_workspace: { en: 'Team workspace (5 seats)', es: 'Espacio de equipo (5 asientos)' },
  white_label_pdfs: { en: 'White-label PDF reports', es: 'Informes PDF marca blanca' },
  custom_dashboards: { en: 'Custom dashboards', es: 'Paneles personalizados' },
  priority_data: { en: 'Daily data refresh', es: 'Actualización diaria de datos' },
  dedicated_support: { en: 'Priority support — 24h response', es: 'Soporte prioritario — 24h' },
};
