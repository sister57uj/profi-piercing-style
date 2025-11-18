-- Add is_hidden field to all content tables
ALTER TABLE site_content ADD COLUMN IF NOT EXISTS is_hidden BOOLEAN DEFAULT false;
ALTER TABLE portfolio_items ADD COLUMN IF NOT EXISTS is_hidden BOOLEAN DEFAULT false;
ALTER TABLE pricing_services ADD COLUMN IF NOT EXISTS is_hidden BOOLEAN DEFAULT false;
ALTER TABLE safety_guarantees ADD COLUMN IF NOT EXISTS is_hidden BOOLEAN DEFAULT false;
ALTER TABLE jewelry_items ADD COLUMN IF NOT EXISTS is_hidden BOOLEAN DEFAULT false;
ALTER TABLE employees ADD COLUMN IF NOT EXISTS is_hidden BOOLEAN DEFAULT false;
ALTER TABLE work_process_steps ADD COLUMN IF NOT EXISTS is_hidden BOOLEAN DEFAULT false;

-- Update RLS policies to allow viewing hidden content for admins
-- For site_content
DROP POLICY IF EXISTS "Everyone can read content" ON site_content;
CREATE POLICY "Everyone can read visible content" ON site_content
  FOR SELECT
  USING (is_hidden = false OR has_role(auth.uid(), 'admin'::app_role));

-- For portfolio_items
DROP POLICY IF EXISTS "Everyone can view portfolio items" ON portfolio_items;
CREATE POLICY "Everyone can view visible portfolio items" ON portfolio_items
  FOR SELECT
  USING (is_hidden = false OR has_role(auth.uid(), 'admin'::app_role));

-- For pricing_services
DROP POLICY IF EXISTS "Everyone can view pricing services" ON pricing_services;
CREATE POLICY "Everyone can view visible pricing services" ON pricing_services
  FOR SELECT
  USING (is_hidden = false OR has_role(auth.uid(), 'admin'::app_role));

-- For safety_guarantees
DROP POLICY IF EXISTS "Everyone can view safety guarantees" ON safety_guarantees;
CREATE POLICY "Everyone can view visible safety guarantees" ON safety_guarantees
  FOR SELECT
  USING (is_hidden = false OR has_role(auth.uid(), 'admin'::app_role));

-- For jewelry_items
DROP POLICY IF EXISTS "Everyone can view jewelry items" ON jewelry_items;
CREATE POLICY "Everyone can view visible jewelry items" ON jewelry_items
  FOR SELECT
  USING (is_hidden = false OR has_role(auth.uid(), 'admin'::app_role));

-- For employees
DROP POLICY IF EXISTS "Everyone can view employees" ON employees;
CREATE POLICY "Everyone can view visible employees" ON employees
  FOR SELECT
  USING (is_hidden = false OR has_role(auth.uid(), 'admin'::app_role));

-- For work_process_steps
DROP POLICY IF EXISTS "Everyone can view work process steps" ON work_process_steps;
CREATE POLICY "Everyone can view visible work process steps" ON work_process_steps
  FOR SELECT
  USING (is_hidden = false OR has_role(auth.uid(), 'admin'::app_role));