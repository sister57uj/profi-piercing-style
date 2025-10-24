-- Исправление security warning для функции update_site_content_timestamp
-- Добавляем SET search_path для безопасности
DROP FUNCTION IF EXISTS public.update_site_content_timestamp() CASCADE;

CREATE OR REPLACE FUNCTION public.update_site_content_timestamp()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  NEW.updated_by = auth.uid();
  RETURN NEW;
END;
$$;

-- Пересоздаем триггер
CREATE TRIGGER update_site_content_updated_at
BEFORE UPDATE ON public.site_content
FOR EACH ROW
EXECUTE FUNCTION public.update_site_content_timestamp();