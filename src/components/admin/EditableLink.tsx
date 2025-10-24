import { useState } from 'react';
import { Pencil, Check, X, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAdmin } from '@/contexts/AdminContext';

interface EditableLinkProps {
  initialText: string;
  initialUrl: string;
  onSave: (newText: string, newUrl: string) => void;
  page: string;
  section: string;
  contentKey: string;
  className?: string;
  variant?: 'default' | 'outline' | 'ghost';
}

export const EditableLink = ({
  initialText,
  initialUrl,
  onSave,
  page,
  section,
  contentKey,
  className = '',
  variant = 'default'
}: EditableLinkProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(initialText);
  const [url, setUrl] = useState(initialUrl);
  const [isSaving, setIsSaving] = useState(false);
  const { isAdmin } = useAdmin();
  const { toast } = useToast();

  if (!isAdmin) {
    return (
      <Button 
        className={className} 
        variant={variant}
        onClick={() => window.open(url, '_blank')}
      >
        {text}
        <ExternalLink className="ml-2 h-4 w-4" />
      </Button>
    );
  }

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Сохраняем текст кнопки
      const { error: textError } = await supabase
        .from('site_content')
        .upsert({
          page,
          section,
          content_key: `${contentKey}_text`,
          content_value: text
        }, {
          onConflict: 'page,section,content_key'
        });

      if (textError) throw textError;

      // Сохраняем URL
      const { error: urlError } = await supabase
        .from('site_content')
        .upsert({
          page,
          section,
          content_key: `${contentKey}_url`,
          content_value: url
        }, {
          onConflict: 'page,section,content_key'
        });

      if (urlError) throw urlError;

      onSave(text, url);
      setIsEditing(false);
      toast({
        title: 'Сохранено',
        description: 'Ссылка успешно обновлена'
      });
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Ошибка',
        description: error.message || 'Не удалось сохранить изменения'
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setText(initialText);
    setUrl(initialUrl);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="space-y-4 p-4 border rounded-lg bg-background">
        <div className="space-y-2">
          <Label htmlFor="link-text">Текст кнопки</Label>
          <Input
            id="link-text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            disabled={isSaving}
            placeholder="Записаться онлайн"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="link-url">URL ссылки</Label>
          <Input
            id="link-url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            disabled={isSaving}
            placeholder="https://..."
          />
        </div>
        <div className="flex gap-2">
          <Button
            size="sm"
            onClick={handleSave}
            disabled={isSaving}
          >
            <Check className="h-4 w-4 mr-1" />
            Сохранить
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={handleCancel}
            disabled={isSaving}
          >
            <X className="h-4 w-4 mr-1" />
            Отмена
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative group inline-block">
      <Button 
        className={className} 
        variant={variant}
        onClick={() => window.open(url, '_blank')}
      >
        {text}
        <ExternalLink className="ml-2 h-4 w-4" />
      </Button>
      <Button
        size="sm"
        variant="ghost"
        className="absolute -right-10 top-0 opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={() => setIsEditing(true)}
      >
        <Pencil className="h-4 w-4 text-primary" />
      </Button>
    </div>
  );
};
