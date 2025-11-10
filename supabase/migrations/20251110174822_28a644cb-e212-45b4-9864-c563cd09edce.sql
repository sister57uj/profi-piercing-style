-- Create jewelry_items table for managing jewelry cards
CREATE TABLE IF NOT EXISTS public.jewelry_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  price_from INTEGER NOT NULL,
  description TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.jewelry_items ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Everyone can view jewelry items"
  ON public.jewelry_items
  FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage jewelry items"
  ON public.jewelry_items
  FOR ALL
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Create trigger for updated_at
CREATE TRIGGER update_jewelry_items_updated_at
  BEFORE UPDATE ON public.jewelry_items
  FOR EACH ROW
  EXECUTE FUNCTION public.update_portfolio_timestamp();

-- Insert initial jewelry items
INSERT INTO public.jewelry_items (title, price_from, description, sort_order) VALUES
  ('Базовые', 500, 'Качественная хирургическая сталь, титан', 1),
  ('Премиум', 1500, 'Золото, серебро, биофлекс, с камнями', 2),
  ('Эксклюзив', 3000, 'Дизайнерские украшения, драгоценные камни', 3);