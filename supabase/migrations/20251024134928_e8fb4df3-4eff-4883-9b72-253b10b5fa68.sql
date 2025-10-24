-- Создание enum для ролей
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Создание таблицы user_roles
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Включение RLS
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Функция проверки роли (SECURITY DEFINER для обхода RLS)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Политика: админы могут видеть все роли
CREATE POLICY "Admins can view all roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Политика: админы могут управлять ролями
CREATE POLICY "Admins can manage roles"
ON public.user_roles
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Таблица для редактируемого контента
CREATE TABLE public.site_content (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    page TEXT NOT NULL,
    section TEXT NOT NULL,
    content_key TEXT NOT NULL,
    content_value TEXT NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_by UUID REFERENCES auth.users(id),
    UNIQUE (page, section, content_key)
);

-- Включение RLS для site_content
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;

-- Политика: все могут читать контент
CREATE POLICY "Everyone can read content"
ON public.site_content
FOR SELECT
USING (true);

-- Политика: только админы могут редактировать контент
CREATE POLICY "Admins can edit content"
ON public.site_content
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Триггер для обновления updated_at
CREATE OR REPLACE FUNCTION public.update_site_content_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  NEW.updated_by = auth.uid();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_site_content_updated_at
BEFORE UPDATE ON public.site_content
FOR EACH ROW
EXECUTE FUNCTION public.update_site_content_timestamp();