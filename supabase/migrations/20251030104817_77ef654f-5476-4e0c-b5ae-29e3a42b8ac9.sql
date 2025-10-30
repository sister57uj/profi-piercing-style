-- Create pricing services table
CREATE TABLE IF NOT EXISTS public.pricing_services (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  category TEXT NOT NULL,
  name TEXT NOT NULL,
  price INTEGER NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.pricing_services ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Everyone can view pricing services"
  ON public.pricing_services
  FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage pricing services"
  ON public.pricing_services
  FOR ALL
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Create trigger for updated_at
CREATE TRIGGER update_pricing_services_timestamp
  BEFORE UPDATE ON public.pricing_services
  FOR EACH ROW
  EXECUTE FUNCTION public.update_portfolio_timestamp();

-- Insert initial data
INSERT INTO public.pricing_services (category, name, price, sort_order) VALUES
('Пирсинг носа', 'Крыло носа', 1800, 1),
('Пирсинг носа', 'Септум', 2000, 2),
('Пирсинг носа', 'Nasallang', 2500, 3),
('Пирсинг носа', 'Бридж', 1600, 4),
('Пирсинг лица', 'Пирсинг брови', 1600, 1),
('Пирсинг лица', 'Anti-eyebrow', 2000, 2),
('Пирсинг лица', 'Пирсинг губы', 1600, 3),
('Пирсинг лица', 'Щека (димплы)', 2000, 4),
('Пирсинг ушей', 'Мочка уха', 1000, 1),
('Пирсинг ушей', 'Хеликс', 1500, 2),
('Пирсинг ушей', 'Индастриал', 2200, 3),
('Пирсинг ушей', 'Трагус', 1600, 4),
('Пирсинг ушей', 'Дэйс', 1800, 5),
('Пирсинг ушей', 'Рук', 1800, 6),
('Пирсинг тела', 'Пупок', 2000, 1),
('Пирсинг тела', 'Микродермал (1 шт)', 2500, 2),
('Пирсинг тела', 'Соски (женский)', 2500, 3),
('Пирсинг тела', 'Соски (мужской)', 2000, 4),
('Дополнительные услуги', 'Смена украшения', 500, 1),
('Дополнительные услуги', 'Снятие пирсинга', 300, 2),
('Дополнительные услуги', 'Консультация', 0, 3);