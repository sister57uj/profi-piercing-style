import { useState } from 'react';
import { Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAdmin } from '@/contexts/AdminContext';
import { EditableWrapper } from './EditableWrapper';

interface EditableTextProps {
  initialValue: string;
  onSave: (newValue: string) => void;
  page: string;
  section: string;
  contentKey: string;
  multiline?: boolean;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  onDelete?: () => void;
  isHidden?: boolean;
  onToggleVisibility?: () => void;
}

export const EditableText = ({
  initialValue,
  onSave,
  page,
  section,
  contentKey,
  multiline = false,
  className = '',
  as: Component = 'p',
  onDelete,
  isHidden = false,
  onToggleVisibility,
}: EditableTextProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialValue);
  const [isSaving, setIsSaving] = useState(false);
  const { isAdmin } = useAdmin();
  const { toast } = useToast();

  if (!isAdmin && isHidden) {
    return null;
  }

  if (!isAdmin) {
    return <Component className={className}>{value}</Component>;
  }

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Сохраняем в базу данных
      const { error } = await supabase
        .from('site_content')
        .upsert({
          page,
          section,
          content_key: contentKey,
          content_value: value
        }, {
          onConflict: 'page,section,content_key'
        });

      if (error) throw error;

      onSave(value);
      setIsEditing(false);
      toast({
        title: 'Сохранено',
        description: 'Изменения успешно сохранены'
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
    setValue(initialValue);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="relative group">
        {multiline ? (
          <Textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className={`${className} min-h-[100px] text-base`}
            disabled={isSaving}
          />
        ) : (
          <Input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className={`${className} text-base h-11`}
            disabled={isSaving}
          />
        )}
        <div className="flex gap-2 mt-2">
          <Button
            size="sm"
            onClick={handleSave}
            disabled={isSaving}
            className="touch-manipulation h-10"
          >
            <Check className="h-4 w-4 mr-1" />
            Сохранить
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={handleCancel}
            disabled={isSaving}
            className="touch-manipulation h-10"
          >
            <X className="h-4 w-4 mr-1" />
            Отмена
          </Button>
        </div>
      </div>
    );
  }

  return (
    <EditableWrapper
      onEdit={() => setIsEditing(true)}
      onDelete={onDelete}
      onToggleVisibility={onToggleVisibility}
      isHidden={isHidden}
      showDeleteButton={!!onDelete}
      showVisibilityButton={!!onToggleVisibility}
    >
      <Component className={className}>{value}</Component>
    </EditableWrapper>
  );
};