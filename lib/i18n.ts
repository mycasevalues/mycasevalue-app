/**
 * MyCaseValue i18n — English / Spanish translations
 * Usage: const t = TRANSLATIONS[lang];  t.hero_title
 */

export type Lang = 'en' | 'es';

const EN = {
  // Nav & global
  new_report: 'New report',
  premium: 'PREMIUM',
  light_mode: 'Switch to light mode',
  dark_mode: 'Switch to dark mode',
  lang_toggle: 'ES',
  lang_label: 'Ver en español',

  // UPL
  upl_banner_prefix: 'INFORMATIONAL ONLY',

  // Hero
  hero_badge: 'Built on PACER \u00B7 FJC \u00B7 CourtListener data',
  hero_privacy: 'Private & encrypted \u2014 zero data stored',
  hero_title_1: 'The settlement data',
  hero_title_2: 'the other side already has.',
  hero_title_3: 'Now you have it too.',
  hero_sub_pre: 'Research real outcomes from',
  hero_sub_post: 'federal court cases across 94 districts. Win rates, settlement ranges, timelines, and judge analytics \u2014 sourced from public court records.',
  hero_cta: 'Check my case type',
  hero_demo: 'View a sample report',

  // Category selector
  select_situation: 'Select your situation',

  // Stats bar
  stat_outcomes: 'Court outcomes analyzed',
  stat_types: 'Federal case categories',
  stat_years: 'Years of judicial data',
  stat_free: 'No account required',

  // Trending
  trending: 'Trending case types',
  trending_sub: 'Federal filings year-over-year',
  circuit_rates: 'Circuit court win rates',
  circuit_sub: 'Aggregate plaintiff win rates',

  // Am I Too Late
  too_late_title: 'Am I too late?',
  too_late_sub: 'Miss your deadline and you may lose your right to proceed. Check yours in 60 seconds.',
  check_deadline: 'Check deadline',

  // Wizard
  step_of: 'Step',
  what_happened: 'What happened?',
  select_closest: 'Select the category closest to your situation.',
  choose_specific: 'Choose the most specific match.',
  your_details: 'Your details',
  state: 'State',
  select_state: 'Select your state...',
  when_happen: 'When did this happen?',
  amount_involved: 'Amount involved',
  have_attorney: 'Do you have an attorney?',
  others_affected: 'Are others affected by the same issue?',
  view_outcomes: 'View outcomes',
  back: 'Back',

  // Timing messages
  timing_recent: 'People who filed within 6 months historically had higher success rates.',
  timing_now: 'Still happening — acting soon helps preserve evidence.',
  timing_old: 'Time is critical. Filing deadlines may be approaching or may have passed.',
  timing_default: 'Filing sooner generally preserves more options.',

  // Others affected
  others_no: 'No, just me',
  others_few: 'Yes, a few people',
  others_many: 'Yes, many people (40+)',
  how_many: 'Approximately how many?',

  // Consent
  one_moment: 'IMPORTANT DISCLOSURE',
  before_report: 'Before your report',
  consent_text_1: 'You are about to access aggregate data from federal court records. This data reflects what happened in similar cases — it is not a prediction or evaluation of your specific situation.',
  consent_text_2: 'Only a licensed attorney can evaluate your specific facts and circumstances. MyCaseValue is a research tool providing public court data, not a legal service.',
  consent_check: 'I understand this is aggregate historical data only, does not evaluate my situation, and no attorney-client relationship is created.',
  generate_report: 'Generate my report',

  // Email step
  data_ready: 'Your data is ready',
  email_prompt: 'Save a copy to your email, or skip to view now.',
  send: 'Send',
  skip: 'Skip for now',

  // Loading
  loading_search: 'Searching {count} court records...',
  loading_match: 'Matching {type} in the database...',
  loading_cross: 'Cross-referencing CourtListener...',
  loading_agg: 'Aggregating historical outcomes...',
  loading_analyze: 'Analyzing {count} similar cases...',
  loading_almost: 'Almost there...',
  loading_fact: 'Federal courts resolved over 400,000 civil cases last year.',

  // Results
  checking_now: 'checking now',
  reports_month: 'reports this month',
  share: 'Share',
  important: 'Important:',
  outcome_report: 'MYCASEVALUE OUTCOME REPORT',
  not_prediction: 'Not a prediction',
  casecheck_score: 'MYCASEVALUE SCORE',
  historical_profile: 'Historical outcome profile',
  similar_cases: 'similar federal cases',
  historical_win: 'historical win rate',
  above_avg: 'Above the federal average',
  near_avg: 'Near the federal average',
  below_avg: 'Below the federal average',

  // Outcome breakdown
  how_resolved: 'How similar cases were resolved',
  fav_settlements: 'Favorable Settlements',
  trial_outcomes: 'Trial Outcomes',
  pretrial_dismiss: 'Pre-Trial Dismissals',
  combined_rate: 'COMBINED WIN + FAVORABLE SETTLEMENT RATE',
  combined_sub: 'Cases with a positive outcome for the plaintiff',
  won: 'Won',
  lost: 'Lost',

  // Recovery
  recovery_available: 'Recovery ranges available in full report',
  lower_range: 'Lower range',
  typical: 'Typical',
  upper_range: 'Upper range',
  recovery_note: 'National aggregate ranges (in thousands). Outcomes vary by jurisdiction.',

  // Quick stats
  win_rate: 'Win rate',
  median_duration: 'Median duration',
  win_settle: 'Win+Settle',
  settlement_rate: 'Settlement rate',

  // Premium sections
  with_attorney: 'WITH ATTORNEY',
  self_represented: 'SELF-REPRESENTED',
  attorney_rep: 'Attorney representation',
  attorney_won_more: 'Attorneys won {pct}% more often',
  how_charge: 'How do attorneys charge for this?',
  circuits_title: 'Win rates by circuit',
  circuits_sub: 'How win rates vary across federal circuits:',
  your_circuit: 'Your circuit',
  how_long: 'How long it takes',
  if_filed_today: 'IF FILED TODAY',
  filed: 'Filed',
  est_resolution: 'Est. resolution',
  timeline_note: 'Based on median duration. Actual timelines vary significantly.',
  outcome_dist: 'Outcome distribution',
  win_trial: 'Win at trial',
  settle_fav: 'Settle favorably',
  dismissed: 'Dismissed',
  lose_trial: 'Lose at trial',
  similar_cases_title: 'Similar cases',
  similar_cases_sub: 'Anonymized examples from public court records:',
  settlement_timing: 'When settlements happen',
  most_settlements: 'Most settlements: 3-6 months after filing.',
  courts_cited: 'What courts cited',
  courts_cited_sub: 'Factors federal courts cited in similar cases:',
  action_plan: 'What people in similar situations commonly did',
  stay_updated: 'STAY UPDATED',
  notify_sub: 'Get notified when new court opinions matching your case type are published.',
  notified: 'You will be notified.',
  notify_me: 'Notify me',

  // CTA
  what_worth: 'What could your situation be worth?',
  cta_sub: 'Your free report reveals win rates, case resolutions, and filing deadlines. Unlock the full report for recovery ranges, comparable outcomes, attorney impact analysis, jurisdiction breakdown, and predictive timeline.',
  cta_note: 'Aggregate historical data only. Not a case valuation.',
  full_report: 'Full report',
  unlimited: 'Unlimited',
  what_next: 'What many people do next',
  next_text: 'Many people use this data when deciding whether to consult with an attorney. Most attorneys offer free initial consultations. MyCaseValue does not evaluate claims, recommend attorneys, or provide referrals.',
  search_attorneys: 'Find attorneys in your area',
  general_deadline: 'GENERAL FILING DEADLINE',
  deadline_warning: 'Based on your timeline, this deadline may have passed. Consult an attorney immediately.',
  deadline_note: 'Only an attorney can determine your specific deadline.',
  legal_aid: 'Free and low-cost legal services in',

  // Poll
  poll_title: 'What would you do next?',
  poll_anon: 'Anonymous — not stored or linked to you.',
  poll_thanks: 'Thank you',
  poll_result: '73% of people who viewed similar data chose to consult an attorney.',
  poll_atty: 'Consult an attorney',
  poll_file: 'File a complaint myself',
  poll_wait: 'Gather more info',
  poll_move: 'Move on',

  // Final notice
  important_notice: 'IMPORTANT NOTICE',

  // Pricing modal
  see_complete: 'Unlock the full intelligence',
  data_tools: '8 premium data tools for deeper analysis',
  pricing_note: 'All data is informational only. No attorney-client relationship is created.',
  single_report: 'SINGLE REPORT',
  one_report: 'One complete report',
  get_report: 'Get my report',
  best_value: 'BEST VALUE',
  all_types: 'All case types, unlimited access',
  card: 'Card',
  apple_pay: 'Apple Pay',
  google_pay: 'Google Pay',
  secure_stripe: 'Secure checkout by Stripe',

  // Footer
  verified_data: 'Verified data:',
  data_updated: 'Data updated Mar 2026',
  methodology: 'Methodology',

  // Wizard labels
  wiz_situation: 'Situation',
  wiz_details: 'Details',
  wiz_confirm: 'Confirm',
  wiz_email: 'Email',
  wiz_report: 'Report',
};

const ES: typeof EN = {
  // Nav & global
  new_report: 'Nuevo informe',
  premium: 'PREMIUM',
  light_mode: 'Cambiar a modo claro',
  dark_mode: 'Cambiar a modo oscuro',
  lang_toggle: 'EN',
  lang_label: 'View in English',

  // UPL
  upl_banner_prefix: 'SOLO INFORMATIVO',

  // Hero
  hero_badge: 'Datos de PACER \u00B7 FJC \u00B7 CourtListener',
  hero_privacy: 'Privado y encriptado \u2014 cero datos almacenados',
  hero_title_1: 'Los datos de acuerdos',
  hero_title_2: 'que la otra parte ya tiene.',
  hero_title_3: 'Ahora t\u00FA tambi\u00E9n.',
  hero_sub_pre: 'Investiga resultados reales de',
  hero_sub_post: 'casos judiciales federales en 94 distritos. Tasas de \u00E9xito, rangos de acuerdos, plazos y an\u00E1lisis de jueces \u2014 de registros p\u00FAblicos.',
  hero_cta: 'Consultar mi tipo de caso',
  hero_demo: 'Ver informe de ejemplo',

  // Category selector
  select_situation: 'Selecciona tu situación',

  // Stats bar
  stat_outcomes: 'Resultados analizados',
  stat_types: 'Categorías de casos federales',
  stat_years: 'Años de datos judiciales',
  stat_free: 'Sin cuenta requerida',

  // Trending
  trending: 'Casos en tendencia',
  trending_sub: 'Demandas federales año tras año',
  circuit_rates: 'Tasas de victoria por circuito',
  circuit_sub: 'Tasas agregadas de victoria del demandante',

  // Am I Too Late
  too_late_title: '¿Es demasiado tarde?',
  too_late_sub: 'Si pierdes tu fecha límite, podrías perder tu derecho a proceder. Verifica la tuya en 60 segundos.',
  check_deadline: 'Verificar fecha límite',

  // Wizard
  step_of: 'Paso',
  what_happened: '¿Qué pasó?',
  select_closest: 'Selecciona la categoría más cercana a tu situación.',
  choose_specific: 'Elige la opción más específica.',
  your_details: 'Tus detalles',
  state: 'Estado',
  select_state: 'Selecciona tu estado...',
  when_happen: '¿Cuándo ocurrió esto?',
  amount_involved: 'Cantidad involucrada',
  have_attorney: '¿Tienes abogado?',
  others_affected: '¿Otros son afectados por el mismo problema?',
  view_outcomes: 'Ver resultados',
  back: 'Atrás',

  // Timing messages
  timing_recent: 'Las personas que presentaron dentro de 6 meses históricamente tuvieron mayores tasas de éxito.',
  timing_now: 'Sigue ocurriendo — actuar pronto ayuda a preservar evidencia.',
  timing_old: 'El tiempo es crítico. Las fechas límite de presentación pueden estar acercándose o haber pasado.',
  timing_default: 'Presentar antes generalmente preserva más opciones.',

  // Others affected
  others_no: 'No, solo yo',
  others_few: 'Sí, algunas personas',
  others_many: 'Sí, muchas personas (40+)',
  how_many: '¿Aproximadamente cuántas?',

  // Consent
  one_moment: 'UN MOMENTO',
  before_report: 'Antes de tu informe',
  consent_text_1: 'Estás a punto de ver datos reales de registros judiciales federales. Estos datos muestran lo que pasó con otras personas — no predicen lo que pasará contigo.',
  consent_text_2: 'Solo un abogado con licencia puede evaluar tus hechos y circunstancias específicas. MyCaseValue es una herramienta informativa, no un servicio legal.',
  consent_check: 'Entiendo que estos son solo datos históricos, no evalúan mi situación, y no se crea ninguna relación abogado-cliente.',
  generate_report: 'Generar informe',

  // Email step
  data_ready: 'Tus datos están listos',
  email_prompt: 'Guarda una copia en tu email, o salta para ver ahora.',
  send: 'Enviar',
  skip: 'Saltar por ahora',

  // Loading
  loading_search: 'Buscando en {count} registros judiciales...',
  loading_match: 'Buscando {type} en la base de datos...',
  loading_cross: 'Referencia cruzada con CourtListener...',
  loading_agg: 'Agregando resultados históricos...',
  loading_analyze: 'Analizando {count} casos similares...',
  loading_almost: 'Casi listo...',
  loading_fact: 'Los tribunales federales resolvieron más de 400,000 casos civiles el año pasado.',

  // Results
  checking_now: 'consultando ahora',
  reports_month: 'informes este mes',
  share: 'Compartir',
  important: 'Importante:',
  outcome_report: 'INFORME DE RESULTADOS MYCASEVALUE',
  not_prediction: 'No es una predicción',
  casecheck_score: 'PUNTAJE MYCASEVALUE',
  historical_profile: 'Perfil de resultados históricos',
  similar_cases: 'casos federales similares',
  historical_win: 'tasa histórica de victoria',
  above_avg: 'Por encima del promedio federal',
  near_avg: 'Cerca del promedio federal',
  below_avg: 'Por debajo del promedio federal',

  // Outcome breakdown
  how_resolved: 'Cómo se resolvieron casos similares',
  fav_settlements: 'Acuerdos Favorables',
  trial_outcomes: 'Resultados de Juicio',
  pretrial_dismiss: 'Desestimaciones Previas al Juicio',
  combined_rate: 'TASA COMBINADA DE VICTORIA + ACUERDO FAVORABLE',
  combined_sub: 'Casos con resultado positivo para el demandante',
  won: 'Ganado',
  lost: 'Perdido',

  // Recovery
  recovery_available: 'Rangos de recuperación disponibles en el informe completo',
  lower_range: 'Rango bajo',
  typical: 'Típico',
  upper_range: 'Rango alto',
  recovery_note: 'Rangos agregados nacionales (en miles). Los resultados varían por jurisdicción.',

  // Quick stats
  win_rate: 'Tasa de victoria',
  median_duration: 'Duración mediana',
  win_settle: 'Victoria+Acuerdo',
  settlement_rate: 'Tasa de acuerdo',

  // Premium sections
  with_attorney: 'CON ABOGADO',
  self_represented: 'SIN REPRESENTACIÓN',
  attorney_rep: 'Representación legal',
  attorney_won_more: 'Los abogados ganaron {pct}% más frecuentemente',
  how_charge: '¿Cómo cobran los abogados por esto?',
  circuits_title: 'Tasas de victoria por circuito',
  circuits_sub: 'Cómo varían las tasas de victoria entre circuitos federales:',
  your_circuit: 'Tu circuito',
  how_long: 'Cuánto tiempo toma',
  if_filed_today: 'SI SE PRESENTA HOY',
  filed: 'Presentado',
  est_resolution: 'Resolución est.',
  timeline_note: 'Basado en duración mediana. Los plazos reales varían significativamente.',
  outcome_dist: 'Distribución de resultados',
  win_trial: 'Victoria en juicio',
  settle_fav: 'Acuerdo favorable',
  dismissed: 'Desestimado',
  lose_trial: 'Derrota en juicio',
  similar_cases_title: 'Casos similares',
  similar_cases_sub: 'Ejemplos anonimizados de registros judiciales públicos:',
  settlement_timing: 'Cuándo ocurren los acuerdos',
  most_settlements: 'La mayoría de acuerdos: 3-6 meses después de la presentación.',
  courts_cited: 'Lo que citaron los tribunales',
  courts_cited_sub: 'Factores que los tribunales federales citaron en casos similares:',
  action_plan: 'Lo que comúnmente hicieron personas en situaciones similares',
  stay_updated: 'MANTENTE ACTUALIZADO',
  notify_sub: 'Recibe notificaciones cuando se publiquen nuevas opiniones judiciales que coincidan con tu tipo de caso.',
  notified: 'Serás notificado.',
  notify_me: 'Notifícame',

  // CTA
  what_worth: '¿Cuánto podría valer tu situación?',
  cta_sub: 'Tu informe gratuito muestra la tasa de victoria, cómo terminaron los casos y la fecha límite. El informe completo agrega rangos de recuperación, resultados comparables, impacto del abogado, cronología y más.',
  cta_note: 'Solo datos históricos agregados. No es una valoración de caso.',
  full_report: 'Informe completo',
  unlimited: 'Ilimitado',
  what_next: 'Lo que muchas personas hacen después',
  next_text: 'Muchas personas usan estos datos antes de consultar con un abogado. La mayoría ofrece consultas iniciales gratuitas. MyCaseValue no evalúa reclamos, no recomienda abogados ni proporciona referencias.',
  search_attorneys: 'Buscar abogados en tu área',
  general_deadline: 'FECHA LÍMITE GENERAL DE PRESENTACIÓN',
  deadline_warning: 'Según tu cronología, esta fecha límite puede haber pasado. Consulta a un abogado inmediatamente.',
  deadline_note: 'Solo un abogado puede determinar tu fecha límite específica.',
  legal_aid: 'Servicios legales gratuitos y de bajo costo en',

  // Poll
  poll_title: '¿Qué harías después?',
  poll_anon: 'Anónimo — no se almacena ni se vincula contigo.',
  poll_thanks: 'Gracias',
  poll_result: 'El 73% de las personas que vieron datos similares eligieron consultar a un abogado.',
  poll_atty: 'Consultar a un abogado',
  poll_file: 'Presentar queja yo mismo',
  poll_wait: 'Recopilar más información',
  poll_move: 'Seguir adelante',

  // Final notice
  important_notice: 'AVISO IMPORTANTE',

  // Pricing modal
  see_complete: 'Ve el panorama completo',
  data_tools: '8 herramientas de datos para mayor comprensión',
  pricing_note: 'Todos los datos son solo informativos. No se crea relación abogado-cliente.',
  single_report: 'INFORME INDIVIDUAL',
  one_report: 'Un informe completo',
  get_report: 'Obtener informe',
  best_value: 'MEJOR VALOR',
  all_types: 'Todos los tipos de casos, para siempre',
  card: 'Tarjeta',
  apple_pay: 'Apple Pay',
  google_pay: 'Google Pay',
  secure_stripe: 'Pago seguro por Stripe',

  // Footer
  verified_data: 'Datos verificados:',
  data_updated: 'Datos actualizados Mar 2026',
  methodology: 'Metodología',

  // Wizard labels
  wiz_situation: 'Situación',
  wiz_details: 'Detalles',
  wiz_confirm: 'Confirmar',
  wiz_email: 'Email',
  wiz_report: 'Informe',
};

export const TRANSLATIONS = { en: EN, es: ES } as const;
export type Translations = typeof EN;
