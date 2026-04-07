-- Judge data tables for MyCaseValue
-- Phase 4: Judge Directory and Profiles

-- Judges table
CREATE TABLE IF NOT EXISTS judges (
  id TEXT PRIMARY KEY,
  courtlistener_id INTEGER UNIQUE,
  full_name TEXT NOT NULL,
  first_name TEXT,
  last_name TEXT,
  district_id TEXT,
  circuit TEXT,
  appointment_date DATE,
  appointing_president TEXT,
  party_of_appointing_president TEXT,
  termination_date DATE,
  is_active BOOLEAN DEFAULT true,
  position TEXT,
  courtlistener_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Judge statistics table
CREATE TABLE IF NOT EXISTS judge_statistics (
  id SERIAL PRIMARY KEY,
  judge_id TEXT REFERENCES judges(id),
  nos_code INTEGER,
  total_cases INTEGER,
  plaintiff_wins INTEGER,
  defendant_wins INTEGER,
  settlements INTEGER,
  dismissals INTEGER,
  summary_judgments_defense INTEGER,
  motions_to_dismiss_granted INTEGER,
  avg_duration_months NUMERIC,
  plaintiff_win_rate NUMERIC,
  summary_judgment_rate_defense NUMERIC,
  dismissal_rate NUMERIC,
  settlement_rate NUMERIC,
  last_calculated TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(judge_id, nos_code)
);

-- Judge opinions table
CREATE TABLE IF NOT EXISTS judge_opinions (
  id SERIAL PRIMARY KEY,
  judge_id TEXT REFERENCES judges(id),
  courtlistener_opinion_id INTEGER,
  case_name TEXT,
  court TEXT,
  year INTEGER,
  citation_count INTEGER,
  nos_code INTEGER,
  ai_summary TEXT,
  ai_summary_generated_at TIMESTAMPTZ,
  courtlistener_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Judge AI analysis cache
CREATE TABLE IF NOT EXISTS judge_ai_analysis (
  id SERIAL PRIMARY KEY,
  judge_id TEXT REFERENCES judges(id) UNIQUE,
  writing_style TEXT,
  plaintiff_tendencies TEXT,
  motion_approach TEXT,
  notable_patterns TEXT,
  caveats TEXT,
  generated_at TIMESTAMPTZ DEFAULT NOW(),
  opinions_count_at_generation INTEGER
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_judges_district ON judges(district_id);
CREATE INDEX IF NOT EXISTS idx_judges_active ON judges(is_active);
CREATE INDEX IF NOT EXISTS idx_judges_last_name ON judges(last_name);
CREATE INDEX IF NOT EXISTS idx_judge_stats_judge ON judge_statistics(judge_id);
CREATE INDEX IF NOT EXISTS idx_judge_stats_nos ON judge_statistics(judge_id, nos_code);
CREATE INDEX IF NOT EXISTS idx_judge_opinions_judge ON judge_opinions(judge_id);
CREATE INDEX IF NOT EXISTS idx_judge_opinions_year ON judge_opinions(judge_id, year DESC);

-- RLS: judge data is public read
ALTER TABLE judges ENABLE ROW LEVEL SECURITY;
ALTER TABLE judge_statistics ENABLE ROW LEVEL SECURITY;
ALTER TABLE judge_opinions ENABLE ROW LEVEL SECURITY;
ALTER TABLE judge_ai_analysis ENABLE ROW LEVEL SECURITY;

CREATE POLICY "judges_public_read" ON judges FOR SELECT USING (true);
CREATE POLICY "judge_stats_public_read" ON judge_statistics FOR SELECT USING (true);
CREATE POLICY "judge_opinions_public_read" ON judge_opinions FOR SELECT USING (true);
CREATE POLICY "judge_ai_analysis_public_read" ON judge_ai_analysis FOR SELECT USING (true);

-- Ingestion logs table
CREATE TABLE IF NOT EXISTS ingestion_logs (
  id SERIAL PRIMARY KEY,
  job_name TEXT NOT NULL,
  status TEXT NOT NULL,
  records_processed INTEGER DEFAULT 0,
  errors JSONB DEFAULT '[]',
  started_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);
