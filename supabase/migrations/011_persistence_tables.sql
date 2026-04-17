-- Persistence Tables for MyCaseValue
-- Handles saved reports, search history, user preferences, and email leads
-- Used by lib/persistence.ts

-- ============================================================
-- SAVED REPORTS (user-saved case reports)
-- ============================================================
CREATE TABLE IF NOT EXISTS saved_reports (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  user_email TEXT,
  nos_code TEXT,
  district TEXT,
  category TEXT,
  title TEXT,
  report_data JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  viewed_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_saved_reports_user_id ON saved_reports(user_id);
CREATE INDEX IF NOT EXISTS idx_saved_reports_user_email ON saved_reports(user_email);
CREATE INDEX IF NOT EXISTS idx_saved_reports_viewed_at ON saved_reports(user_email, viewed_at DESC);
CREATE INDEX IF NOT EXISTS idx_saved_reports_nos_code ON saved_reports(nos_code);

-- ============================================================
-- SEARCH HISTORY (user search queries and results)
-- ============================================================
CREATE TABLE IF NOT EXISTS search_history (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  user_email TEXT,
  query TEXT NOT NULL,
  category TEXT,
  results_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  searched_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_search_history_user_id ON search_history(user_id);
CREATE INDEX IF NOT EXISTS idx_search_history_user_email ON search_history(user_email);
CREATE INDEX IF NOT EXISTS idx_search_history_searched_at ON search_history(user_email, searched_at DESC);
CREATE INDEX IF NOT EXISTS idx_search_history_query ON search_history(query);

-- ============================================================
-- USER PREFERENCES (theme, notifications, defaults)
-- ============================================================
CREATE TABLE IF NOT EXISTS user_preferences (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  user_email TEXT UNIQUE,
  preferences JSONB DEFAULT '{}',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_user_preferences_user_id ON user_preferences(user_id);
CREATE INDEX IF NOT EXISTS idx_user_preferences_user_email ON user_preferences(user_email);

-- ============================================================
-- NEWSLETTER SUBSCRIBERS (email subscription list)
-- ============================================================
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  source TEXT DEFAULT 'website',
  subscribed_at TIMESTAMPTZ DEFAULT NOW(),
  unsubscribed_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_email ON newsletter_subscribers(email);
CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_subscribed ON newsletter_subscribers(subscribed_at DESC);

-- ============================================================
-- EMAIL LEADS (form capture for marketing)
-- ============================================================
CREATE TABLE IF NOT EXISTS email_leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  source TEXT,
  nos_code TEXT,
  district TEXT,
  captured_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_email_leads_email ON email_leads(email);
CREATE INDEX IF NOT EXISTS idx_email_leads_nos_code ON email_leads(nos_code);
CREATE INDEX IF NOT EXISTS idx_email_leads_captured_at ON email_leads(captured_at DESC);

-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================

-- Enable RLS on all persistence tables
ALTER TABLE saved_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE search_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_leads ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- SAVED REPORTS POLICIES
-- ============================================================

-- Users can read only their own reports
CREATE POLICY "Users can read own saved reports"
  ON saved_reports FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert their own reports
CREATE POLICY "Users can insert own saved reports"
  ON saved_reports FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own reports
CREATE POLICY "Users can update own saved reports"
  ON saved_reports FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Users can delete their own reports
CREATE POLICY "Users can delete own saved reports"
  ON saved_reports FOR DELETE
  USING (auth.uid() = user_id);

-- Service role can do anything (for admin operations)
CREATE POLICY "Service role can manage saved reports"
  ON saved_reports FOR ALL
  USING (auth.role() = 'service_role');

-- ============================================================
-- SEARCH HISTORY POLICIES
-- ============================================================

-- Users can read only their own search history
CREATE POLICY "Users can read own search history"
  ON search_history FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert their own searches
CREATE POLICY "Users can insert own search history"
  ON search_history FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can delete their own search history
CREATE POLICY "Users can delete own search history"
  ON search_history FOR DELETE
  USING (auth.uid() = user_id);

-- Service role can do anything
CREATE POLICY "Service role can manage search history"
  ON search_history FOR ALL
  USING (auth.role() = 'service_role');

-- ============================================================
-- USER PREFERENCES POLICIES
-- ============================================================

-- Users can read only their own preferences
CREATE POLICY "Users can read own preferences"
  ON user_preferences FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert their own preferences
CREATE POLICY "Users can insert own preferences"
  ON user_preferences FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own preferences
CREATE POLICY "Users can update own preferences"
  ON user_preferences FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Service role can do anything
CREATE POLICY "Service role can manage preferences"
  ON user_preferences FOR ALL
  USING (auth.role() = 'service_role');

-- ============================================================
-- NEWSLETTER SUBSCRIBERS POLICIES
-- ============================================================

-- Anyone can insert (subscribe)
CREATE POLICY "Anyone can subscribe to newsletter"
  ON newsletter_subscribers FOR INSERT
  WITH CHECK (true);

-- Anyone can update their own subscription status
CREATE POLICY "Anyone can update subscription"
  ON newsletter_subscribers FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- Service role can read all subscriptions
CREATE POLICY "Service role can read subscribers"
  ON newsletter_subscribers FOR SELECT
  USING (auth.role() = 'service_role');

-- Service role can manage subscribers
CREATE POLICY "Service role can manage subscribers"
  ON newsletter_subscribers FOR ALL
  USING (auth.role() = 'service_role');

-- ============================================================
-- EMAIL LEADS POLICIES
-- ============================================================

-- Anyone can insert leads (form submissions)
CREATE POLICY "Anyone can submit email leads"
  ON email_leads FOR INSERT
  WITH CHECK (true);

-- Service role can read all leads
CREATE POLICY "Service role can read leads"
  ON email_leads FOR SELECT
  USING (auth.role() = 'service_role');

-- Service role can manage leads
CREATE POLICY "Service role can manage leads"
  ON email_leads FOR ALL
  USING (auth.role() = 'service_role');
