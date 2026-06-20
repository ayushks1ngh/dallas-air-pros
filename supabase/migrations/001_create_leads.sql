-- Leads table for quote form submissions
CREATE TABLE IF NOT EXISTS public.leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  email VARCHAR(255) NOT NULL,
  service VARCHAR(50) NOT NULL,
  message TEXT,
  source_page VARCHAR(100),
  status VARCHAR(20) DEFAULT 'new',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS disabled: anon can insert, reads are only via service_role (admin/dashboard)
ALTER TABLE public.leads DISABLE ROW LEVEL SECURITY;

-- Grant insert to anon (website form submissions)
GRANT ALL ON public.leads TO anon;
GRANT ALL ON public.leads TO authenticated;

-- Indexes for admin queries
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON public.leads (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_status ON public.leads (status);
