-- MyCaseValue Database Schema
-- Run this in Supabase SQL Editor to create all tables

-- ============================================================
-- CORE CASE STATISTICS (by NOS code / case type)
-- ============================================================
CREATE TABLE IF NOT EXISTS case_stats (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nos_code TEXT NOT NULL,
  label TEXT NOT NULL,
  category TEXT NOT NULL,
  sub_description TEXT,
  total_cases INTEGER DEFAULT 0,
  win_rate DECIMAL(5,2) DEFAULT 0,
  settlement_rate DECIMAL(5,2) DEFAULT 0,
  avg_duration_months DECIMAL(5,1) DEFAULT 0,
  median_settlement INTEGER DEFAULT 0,
  settlement_lo INTEGER DEFAULT 0,
  settlement_md INTEGER DEFAULT 0,
  settlement_hi INTEGER DEFAULT 0,
  represented_win_rate DECIMAL(5,2) DEFAULT 0,
  represented_total INTEGER DEFAULT 0,
  pro_se_win_rate DECIMAL(5,2) DEFAULT 0,
  pro_se_total INTEGER DEFAULT 0,
  class_action_count INTEGER DEFAULT 0,
  class_action_pct DECIMAL(5,2) DEFAULT 0,
  case_weight DECIMAL(5,2) DEFAULT 0,
  statute_of_limitations TEXT,
  attorney_fee_range TEXT,
  recovery_pct DECIMAL(5,2) DEFAULT 0,
  trial_win_pct DECIMAL(5,2) DEFAULT 0,
  trial_loss_pct DECIMAL(5,2) DEFAULT 0,
  dismiss_pct DECIMAL(5,2) DEFAULT 0,
  favorable_settlement_pct DECIMAL(5,2) DEFAULT 0,
  settlement_avg_months INTEGER DEFAULT 0,
  trial_median_award TEXT,
  source TEXT NOT NULL DEFAULT 'fjc',
  data_year_start INTEGER,
  data_year_end INTEGER,
  last_updated TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(nos_code, source)
);

-- ============================================================
-- OUTCOME DISTRIBUTIONS (how cases end, per NOS code)
-- ============================================================
CREATE TABLE IF NOT EXISTS outcome_distributions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nos_code TEXT NOT NULL,
  outcome_type TEXT NOT NULL,  -- 'Settlement', 'Dismissed', 'Trial', etc.
  percentage DECIMAL(5,2) DEFAULT 0,
  count INTEGER DEFAULT 0,
  color TEXT DEFAULT '#94A3B8',
  source TEXT NOT NULL DEFAULT 'fjc',
  last_updated TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(nos_code, outcome_type, source)
);

-- ============================================================
-- MONEY / RECOVERY DISTRIBUTIONS (per NOS code)
-- ============================================================
CREATE TABLE IF NOT EXISTS money_distributions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nos_code TEXT NOT NULL,
  bracket_label TEXT NOT NULL,  -- 'No recovery', 'Under $10K', '$10K-$50K', etc.
  percentage DECIMAL(5,2) DEFAULT 0,
  bracket_tier INTEGER DEFAULT 0,  -- 0=none, 1=low, 2=mid, 3=high, 4=very high
  source TEXT NOT NULL DEFAULT 'fjc',
  last_updated TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(nos_code, bracket_label, source)
);

-- ============================================================
-- CIRCUIT COURT STATISTICS
-- ============================================================
CREATE TABLE IF NOT EXISTS circuit_stats (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  circuit TEXT NOT NULL,
  circuit_number INTEGER,
  win_rate DECIMAL(5,2) DEFAULT 0,
  total_cases INTEGER DEFAULT 0,
  avg_duration_months DECIMAL(5,1) DEFAULT 0,
  settlement_rate DECIMAL(5,2) DEFAULT 0,
  reversal_rate DECIMAL(5,2) DEFAULT 0,
  source TEXT NOT NULL DEFAULT 'fjc',
  last_updated TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(circuit, source)
);

-- ============================================================
-- STATE-LEVEL STATISTICS
-- ============================================================
CREATE TABLE IF NOT EXISTS state_stats (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  state_code TEXT NOT NULL,
  state_name TEXT NOT NULL,
  win_rate DECIMAL(5,2) DEFAULT 0,
  total_cases INTEGER DEFAULT 0,
  avg_duration_months DECIMAL(5,1) DEFAULT 0,
  settlement_rate DECIMAL(5,2) DEFAULT 0,
  top_case_type TEXT,
  source TEXT NOT NULL DEFAULT 'fjc',
  last_updated TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(state_code, source)
);

-- ============================================================
-- TRENDING CASE TYPES (year-over-year filing changes)
-- ============================================================
CREATE TABLE IF NOT EXISTS trending_case_types (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nos_code TEXT NOT NULL,
  label TEXT NOT NULL,
  filing_count_current INTEGER DEFAULT 0,
  filing_count_previous INTEGER DEFAULT 0,
  change_pct DECIMAL(6,2) DEFAULT 0,
  period TEXT NOT NULL,  -- e.g., '2024 vs 2023'
  source TEXT NOT NULL DEFAULT 'fjc',
  last_updated TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(nos_code, period, source)
);

-- ============================================================
-- JUDGE STATISTICS (from CourtListener)
-- ============================================================
CREATE TABLE IF NOT EXISTS judge_stats (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  judge_name TEXT NOT NULL,
  court TEXT NOT NULL,
  circuit TEXT,
  state TEXT,
  total_opinions INTEGER DEFAULT 0,
  plaintiff_favorable_pct DECIMAL(5,2) DEFAULT 0,
  avg_case_duration_months DECIMAL(5,1) DEFAULT 0,
  appointed_by TEXT,
  active_status TEXT DEFAULT 'active',
  courtlistener_id TEXT,
  source TEXT NOT NULL DEFAULT 'courtlistener',
  last_updated TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(judge_name, court, source)
);

-- ============================================================
-- RAW CASE RECORDS (for detailed queries / future ML)
-- ============================================================
CREATE TABLE IF NOT EXISTS raw_cases (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  case_id TEXT,
  nos_code TEXT,
  court TEXT,
  circuit TEXT,
  state TEXT,
  filing_date DATE,
  termination_date DATE,
  duration_days INTEGER,
  disposition TEXT,
  disposition_code TEXT,
  judgment TEXT,
  pro_se INTEGER DEFAULT 0,  -- 0=represented, 1=pro se
  monetary_award DECIMAL(12,2),
  class_action INTEGER DEFAULT 0,
  nature_of_suit TEXT,
  source TEXT NOT NULL DEFAULT 'fjc',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for fast queries
CREATE INDEX IF NOT EXISTS idx_raw_cases_nos ON raw_cases(nos_code);
CREATE INDEX IF NOT EXISTS idx_raw_cases_court ON raw_cases(court);
CREATE INDEX IF NOT EXISTS idx_raw_cases_state ON raw_cases(state);
CREATE INDEX IF NOT EXISTS idx_raw_cases_filing ON raw_cases(filing_date);
CREATE INDEX IF NOT EXISTS idx_raw_cases_disposition ON raw_cases(disposition_code);

-- ============================================================
-- COURTLISTENER OPINIONS (case law from CourtListener API)
-- ============================================================
CREATE TABLE IF NOT EXISTS opinions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  courtlistener_id TEXT UNIQUE,
  case_name TEXT,
  court TEXT,
  date_filed DATE,
  citation TEXT,
  nos_code TEXT,
  opinion_type TEXT,  -- 'lead', 'concurrence', 'dissent'
  summary TEXT,
  precedential_status TEXT,
  source TEXT NOT NULL DEFAULT 'courtlistener',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_opinions_court ON opinions(court);
CREATE INDEX IF NOT EXISTS idx_opinions_nos ON opinions(nos_code);
CREATE INDEX IF NOT EXISTS idx_opinions_date ON opinions(date_filed);

-- ============================================================
-- DATA INGESTION LOG (tracks ETL runs)
-- ============================================================
CREATE TABLE IF NOT EXISTS ingestion_log (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  source TEXT NOT NULL,
  job_type TEXT NOT NULL,  -- 'full', 'incremental', 'stats_refresh'
  status TEXT NOT NULL DEFAULT 'running',  -- 'running', 'completed', 'failed'
  records_processed INTEGER DEFAULT 0,
  records_inserted INTEGER DEFAULT 0,
  records_updated INTEGER DEFAULT 0,
  error_message TEXT,
  metadata JSONB,
  started_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);

-- ============================================================
-- AGGREGATE STATS CACHE (pre-computed for fast frontend queries)
-- ============================================================
CREATE TABLE IF NOT EXISTS stats_cache (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  cache_key TEXT UNIQUE NOT NULL,  -- e.g., 'total_cases', 'homepage_stats', 'circuit_overview'
  data JSONB NOT NULL,
  computed_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ DEFAULT NOW() + INTERVAL '24 hours'
);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================
ALTER TABLE case_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE circuit_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE state_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE trending_case_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE outcome_distributions ENABLE ROW LEVEL SECURITY;
ALTER TABLE money_distributions ENABLE ROW LEVEL SECURITY;
ALTER TABLE judge_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE opinions ENABLE ROW LEVEL SECURITY;
ALTER TABLE stats_cache ENABLE ROW LEVEL SECURITY;

-- Public read access for all stat tables (no auth needed to view data)
CREATE POLICY "Public read case_stats" ON case_stats FOR SELECT USING (true);
CREATE POLICY "Public read circuit_stats" ON circuit_stats FOR SELECT USING (true);
CREATE POLICY "Public read state_stats" ON state_stats FOR SELECT USING (true);
CREATE POLICY "Public read trending" ON trending_case_types FOR SELECT USING (true);
CREATE POLICY "Public read outcomes" ON outcome_distributions FOR SELECT USING (true);
CREATE POLICY "Public read money" ON money_distributions FOR SELECT USING (true);
CREATE POLICY "Public read judges" ON judge_stats FOR SELECT USING (true);
CREATE POLICY "Public read opinions" ON opinions FOR SELECT USING (true);
CREATE POLICY "Public read cache" ON stats_cache FOR SELECT USING (true);

-- Only service role can write (ingestion scripts use service key)
CREATE POLICY "Service write case_stats" ON case_stats FOR INSERT WITH CHECK (true);
CREATE POLICY "Service update case_stats" ON case_stats FOR UPDATE USING (true);
CREATE POLICY "Service write circuit_stats" ON circuit_stats FOR INSERT WITH CHECK (true);
CREATE POLICY "Service update circuit_stats" ON circuit_stats FOR UPDATE USING (true);
CREATE POLICY "Service write state_stats" ON state_stats FOR INSERT WITH CHECK (true);
CREATE POLICY "Service update state_stats" ON state_stats FOR UPDATE USING (true);
CREATE POLICY "Service write trending" ON trending_case_types FOR INSERT WITH CHECK (true);
CREATE POLICY "Service update trending" ON trending_case_types FOR UPDATE USING (true);
CREATE POLICY "Service write outcomes" ON outcome_distributions FOR INSERT WITH CHECK (true);
CREATE POLICY "Service update outcomes" ON outcome_distributions FOR UPDATE USING (true);
CREATE POLICY "Service write money" ON money_distributions FOR INSERT WITH CHECK (true);
CREATE POLICY "Service update money" ON money_distributions FOR UPDATE USING (true);
CREATE POLICY "Service write judges" ON judge_stats FOR INSERT WITH CHECK (true);
CREATE POLICY "Service update judges" ON judge_stats FOR UPDATE USING (true);
CREATE POLICY "Service write opinions" ON opinions FOR INSERT WITH CHECK (true);
CREATE POLICY "Service update opinions" ON opinions FOR UPDATE USING (true);
CREATE POLICY "Service write cache" ON stats_cache FOR INSERT WITH CHECK (true);
CREATE POLICY "Service update cache" ON stats_cache FOR UPDATE USING (true);

-- ============================================================
-- PREMIUM SESSIONS (subscription and access management)
-- ============================================================
CREATE TABLE IF NOT EXISTS premium_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  plan TEXT NOT NULL CHECK (plan IN ('single', 'unlimited', 'attorney')),
  granted_at BIGINT NOT NULL,
  expires_at BIGINT,
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_premium_email ON premium_sessions(email);

-- ============================================================
-- HELPER FUNCTIONS
-- ============================================================

-- Function to refresh the stats cache
CREATE OR REPLACE FUNCTION refresh_stats_cache()
RETURNS void AS $$
BEGIN
  -- Total cases across all types
  INSERT INTO stats_cache (cache_key, data, computed_at, expires_at)
  VALUES (
    'total_cases',
    (SELECT jsonb_build_object('total', SUM(total_cases)) FROM case_stats),
    NOW(),
    NOW() + INTERVAL '6 hours'
  )
  ON CONFLICT (cache_key)
  DO UPDATE SET data = EXCLUDED.data, computed_at = NOW(), expires_at = NOW() + INTERVAL '6 hours';

  -- Homepage stats
  INSERT INTO stats_cache (cache_key, data, computed_at, expires_at)
  VALUES (
    'homepage_stats',
    (SELECT jsonb_build_object(
      'total_cases', SUM(total_cases),
      'case_types', COUNT(DISTINCT nos_code),
      'circuits', (SELECT COUNT(*) FROM circuit_stats),
      'states', (SELECT COUNT(*) FROM state_stats),
      'avg_win_rate', ROUND(AVG(win_rate)::numeric, 1),
      'last_updated', NOW()
    ) FROM case_stats),
    NOW(),
    NOW() + INTERVAL '6 hours'
  )
  ON CONFLICT (cache_key)
  DO UPDATE SET data = EXCLUDED.data, computed_at = NOW(), expires_at = NOW() + INTERVAL '6 hours';
END;
$$ LANGUAGE plpgsql;


-- ============================================================
-- RATE LIMITING (free-tier daily caps)
-- ============================================================
CREATE TABLE IF NOT EXISTS rate_limits (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  identifier TEXT NOT NULL,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  count INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (identifier, date)
);

CREATE INDEX IF NOT EXISTS idx_rate_limits_lookup
  ON rate_limits (identifier, date);


-- ============================================================
-- SAVED REPORTS (premium user report views)
-- ============================================================
CREATE TABLE IF NOT EXISTS saved_reports (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_email TEXT NOT NULL,
  category TEXT NOT NULL,
  district TEXT DEFAULT 'national',
  viewed_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_saved_reports_user
  ON saved_reports (user_email, viewed_at DESC);


-- ============================================================
-- SEARCH HISTORY (unlimited+ user searches)
-- ============================================================
CREATE TABLE IF NOT EXISTS search_history (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_email TEXT NOT NULL,
  query TEXT NOT NULL DEFAULT '',
  category TEXT,
  searched_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_search_history_user
  ON search_history (user_email, searched_at DESC);


-- ============================================================
-- NEWSLETTER SUBSCRIBERS
-- ============================================================
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  subscribed_at TIMESTAMPTZ DEFAULT NOW(),
  unsubscribed_at TIMESTAMPTZ
);


-- ============================================================
-- ANALYTICS EVENTS (client + server event tracking)
-- ============================================================
CREATE TABLE IF NOT EXISTS analytics_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  event TEXT NOT NULL,
  session_id TEXT,
  properties JSONB DEFAULT '{}',
  pathname TEXT,
  ip TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_analytics_event ON analytics_events(event, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_analytics_session ON analytics_events(session_id);


-- ============================================================
-- EMAIL LEADS (captured from report delivery forms)
-- ============================================================
CREATE TABLE IF NOT EXISTS email_leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  case_type TEXT,
  nos_code TEXT,
  state TEXT,
  source TEXT DEFAULT 'report',
  ip TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_email_leads_email ON email_leads(email);


-- ============================================================
-- NOTIFICATION SUBSCRIPTIONS (email alerts for case types)
-- ============================================================
CREATE TABLE IF NOT EXISTS notification_subscriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  nos_code TEXT,
  state TEXT,
  frequency TEXT DEFAULT 'monthly' CHECK (frequency IN ('weekly', 'monthly', 'quarterly')),
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);


-- ============================================================
-- POLL VOTES (accuracy feedback from users)
-- ============================================================
CREATE TABLE IF NOT EXISTS poll_votes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  vote TEXT NOT NULL CHECK (vote IN ('fair', 'low', 'high', 'unsure')),
  nos_code TEXT,
  ip TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_poll_votes_nos ON poll_votes(nos_code);


-- ============================================================
-- REPORT LOGS (tracks free-tier daily usage)
-- ============================================================
CREATE TABLE IF NOT EXISTS report_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  nos_code TEXT,
  state TEXT,
  tier TEXT DEFAULT 'free',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_report_logs_email ON report_logs(email, created_at DESC);

-- ============================================================
-- AI-GENERATED OPINION SUMMARIES (cached permanently)
-- ============================================================
CREATE TABLE IF NOT EXISTS opinion_summaries (
  opinion_id INTEGER NOT NULL,
  nos_code INTEGER NOT NULL,
  case_name TEXT NOT NULL,
  court TEXT,
  year TEXT,
  citation TEXT,
  url TEXT,
  summary TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (opinion_id, nos_code)
);

CREATE INDEX IF NOT EXISTS idx_opinion_summaries_nos ON opinion_summaries(nos_code);
