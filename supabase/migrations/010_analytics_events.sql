-- Analytics events table for tracking tool usage, searches, and conversions
-- Used by /api/analytics and the useAnalytics client hook

CREATE TABLE IF NOT EXISTS analytics_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  event_type TEXT NOT NULL CHECK (event_type IN ('tool_view', 'tool_use', 'search', 'signup', 'conversion', 'page_view')),
  tool_name TEXT,
  nos_code TEXT,
  metadata JSONB DEFAULT '{}',
  session_id TEXT,
  user_agent TEXT,
  ip_hash TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for common query patterns
CREATE INDEX IF NOT EXISTS idx_analytics_event_type ON analytics_events(event_type);
CREATE INDEX IF NOT EXISTS idx_analytics_created_at ON analytics_events(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_analytics_tool_name ON analytics_events(tool_name) WHERE tool_name IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_analytics_nos_code ON analytics_events(nos_code) WHERE nos_code IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_analytics_session ON analytics_events(session_id) WHERE session_id IS NOT NULL;

-- Composite index for dashboard queries (event_type + date range)
CREATE INDEX IF NOT EXISTS idx_analytics_type_date ON analytics_events(event_type, created_at DESC);

-- Enable RLS
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;

-- Public insert policy (anyone can track events)
CREATE POLICY "Anyone can insert analytics events"
  ON analytics_events FOR INSERT
  WITH CHECK (true);

-- Only service role can read (admin dashboard)
CREATE POLICY "Service role can read analytics"
  ON analytics_events FOR SELECT
  USING (auth.role() = 'service_role');

-- Auto-cleanup: delete events older than 90 days (optional cron)
-- Can be triggered via pg_cron or Supabase Edge Functions
