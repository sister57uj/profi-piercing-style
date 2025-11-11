-- Create work_process_steps table for editable work process cards
CREATE TABLE public.work_process_steps (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  step_number INTEGER NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.work_process_steps ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Everyone can view work process steps"
ON public.work_process_steps
FOR SELECT
USING (true);

CREATE POLICY "Admins can manage work process steps"
ON public.work_process_steps
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Create trigger for timestamps
CREATE TRIGGER update_work_process_steps_updated_at
BEFORE UPDATE ON public.work_process_steps
FOR EACH ROW
EXECUTE FUNCTION public.update_portfolio_timestamp();

-- Insert default data
INSERT INTO public.work_process_steps (title, description, step_number, sort_order) VALUES
('Консультация', 'Обсуждаем ваши пожелания, подбираем украшение, рассказываем о процессе', 1, 1),
('Подготовка', 'Дезинфекция зоны, разметка, подготовка стерильных инструментов', 2, 2),
('Прокол', 'Быстрая и точная процедура с одноразовой иглой, вскрытой при вас', 3, 3),
('Установка украшения', 'Установка выбранного украшения из гипоаллергенных материалов', 4, 4),
('Рекомендации', 'Подробные инструкции по уходу за пирсингом в период заживления', 5, 5);

-- Create safety_guarantees table for editable safety guarantee items
CREATE TABLE public.safety_guarantees (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  text TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.safety_guarantees ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Everyone can view safety guarantees"
ON public.safety_guarantees
FOR SELECT
USING (true);

CREATE POLICY "Admins can manage safety guarantees"
ON public.safety_guarantees
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Create trigger for timestamps
CREATE TRIGGER update_safety_guarantees_updated_at
BEFORE UPDATE ON public.safety_guarantees
FOR EACH ROW
EXECUTE FUNCTION public.update_portfolio_timestamp();

-- Insert default data
INSERT INTO public.safety_guarantees (text, sort_order) VALUES
('Химическая стерилизация всех многоразовых инструментов', 1),
('Термическая обработка в сухожаровом шкафу', 2),
('Одноразовые иглы, вскрываемые при клиенте', 3),
('Одноразовые перчатки для каждой процедуры', 4),
('Гипоаллергенные материалы украшений', 5),
('Подробные инструкции по уходу', 6);