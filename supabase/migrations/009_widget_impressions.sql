CREATE TABLE IF NOT EXISTS widget_impressions (
  id SERIAL PRIMARY KEY,
  nos_code TEXT NOT NULL,
  district TEXT,
  referer_domain TEXT,
  widget_type TEXT DEFAULT 'compact',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_widget_impressions_created ON widget_impressions(created_at);
CREATE INDEX idx_widget_impressions_nos ON widget_impressions(nos_code);
