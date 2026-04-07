-- Enterprise leads table for demo requests from institutional buyers
CREATE TABLE IF NOT EXISTS enterprise_leads (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  organization TEXT NOT NULL,
  email TEXT NOT NULL,
  role TEXT,
  team_size TEXT,
  use_case TEXT,
  contact_method TEXT DEFAULT 'email',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for email lookups and filtering
CREATE INDEX IF NOT EXISTS idx_enterprise_leads_email ON enterprise_leads(email);
CREATE INDEX IF NOT EXISTS idx_enterprise_leads_created_at ON enterprise_leads(created_at DESC);

-- Enable RLS (Row Level Security)
ALTER TABLE enterprise_leads ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can insert (public form submission)
CREATE POLICY "Allow public inserts" ON enterprise_leads
  FOR INSERT WITH CHECK (true);

-- Policy: Only authenticated admins can select
CREATE POLICY "Allow authenticated select" ON enterprise_leads
  FOR SELECT USING (auth.role() = 'authenticated');
