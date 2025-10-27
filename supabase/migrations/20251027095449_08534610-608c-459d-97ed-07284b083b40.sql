-- Create employees table
CREATE TABLE IF NOT EXISTS public.employees (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  description TEXT,
  education TEXT,
  experience TEXT,
  photo_url TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.employees ENABLE ROW LEVEL SECURITY;

-- Create policies for employees
CREATE POLICY "Everyone can view employees" 
ON public.employees 
FOR SELECT 
USING (true);

CREATE POLICY "Admins can manage employees" 
ON public.employees 
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_employees_updated_at
BEFORE UPDATE ON public.employees
FOR EACH ROW
EXECUTE FUNCTION public.update_portfolio_timestamp();

-- Insert Ekaterina as the first employee
INSERT INTO public.employees (first_name, last_name, description, education, experience, photo_url, sort_order)
VALUES (
  'Екатерина',
  'Васина',
  'Профессиональный пирсер с медицинским образованием',
  'Медицинское училище №13, специальность "Сестринское дело"',
  'С 2017 года работает в сфере пирсинга. Эксперт НТВ в проекте "Чудо техники" (2018)',
  '/src/assets/ekaterina-vasina.jpg',
  0
);