ALTER TABLE public.guest_applications 
  ADD COLUMN IF NOT EXISTS linkedin_url text,
  ADD COLUMN IF NOT EXISTS what_building text,
  ADD COLUMN IF NOT EXISTS how_using_ai text,
  ADD COLUMN IF NOT EXISTS surprise_insight text,
  ADD COLUMN IF NOT EXISTS stage text,
  ADD COLUMN IF NOT EXISTS product_link text,
  ADD COLUMN IF NOT EXISTS takeaway text;