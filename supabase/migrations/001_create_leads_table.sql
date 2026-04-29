-- DataOverMind — Leads Table
-- Run this in Supabase SQL Editor (Dashboard → SQL Editor → New Query)

CREATE TABLE IF NOT EXISTS leads (
  id         UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name       TEXT NOT NULL,
  email      TEXT NOT NULL,
  company    TEXT DEFAULT '',
  message    TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Index on email for quick lookups
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads (email);

-- Index on created_at for sorting recent leads
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads (created_at DESC);

-- Enable Row Level Security (recommended for production)
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Allow service role (used by our API) to do everything
-- No public access policies — only the service role key can read/write
