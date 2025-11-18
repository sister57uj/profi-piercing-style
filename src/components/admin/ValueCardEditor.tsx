import { useState } from 'react';
import { Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAdmin } from '@/contexts/AdminContext';
import { EditableWrapper } from './EditableWrapper';

interface ValueCardEditorProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  page: string;
  section: string;
  contentKey: string;
  onSave?: () => void;
  onDelete?: () => void;
  isHidden?: boolean;
  onToggleVisibility?: () => void;
}

export const ValueCardEditor = ({
  icon,
  title,
  description,
  page,
  section,
  contentKey,
  onSave,
  onDelete,
  isHidden = false,
  onToggleVisibility,
}: ValueCardEditorProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedDescription, setEditedDescription] = useState(description);
  const [isSaving, setIsSaving] = useState(false);
  const { isAdmin } = useAdmin();
  const { toast } = useToast();

  if (!isAdmin && isHidden) {
    return null;
  }

  if (!isAdmin) {
    return (
      <div className="bg-card p-6 rounded-lg border border-border hover-glow animate-fade-in">
        <div className="mb-4">{icon}</div>
        <h3 className="text-xl font-semibold mb-3 text-foreground">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    );
  }

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await supabase.from('site_content').upsert({
        page,
        section,
        content_key: `${contentKey}_title`,
        content_value: editedTitle
      }, { onConflict: 'page,section,content_key' });

      await supabase.from('site_content').upsert({
        page,
        section,
        content_key: `${contentKey}_desc`,
        content_value: editedDescription
      }, { onConflict: 'page,section,content_key' });

      toast({
        title: 'Сохранено',
        description: 'Изменения успешно сохранены',
      });
      
      setIsEditing(false);
      onSave?.();
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Ошибка',
        description: error.message || 'Не удалось сохранить изменения',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setEditedTitle(title);
    setEditedDescription(description);
    setIsEditing(false);
  };

  const handleDeleteConfirm = async () => {
    try {
      await supabase.from('site_content').delete()
        .eq('page', page)
        .eq('section', section)
        .in('content_key', [`${contentKey}_title`, `${contentKey}_desc`]);

      toast({
        title: 'Удалено',
        description: 'Карточка успешно удалена',
      });

      onDelete?.();
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Ошибка',
        description: error.message || 'Не удалось удалить карточку',
      });
    }
  };

  if (isEditing) {
    return (
      <div className="bg-card p-6 rounded-lg border-2 border-primary animate-fade-in">
        <div className="mb-4">{icon}</div>
        <div className="space-y-3">
          <Input
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            placeholder="Заголовок"
            disabled={isSaving}
          />
          <Textarea
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            placeholder="Описание"
            rows={3}
            disabled={isSaving}
          />
          <div className="flex gap-2">
            <Button
              onClick={handleSave}
              size="sm"
              disabled={isSaving}
              className="touch-manipulation"
            >
              <Check className="h-4 w-4 mr-2" />
              Сохранить
            </Button>
            <Button
              onClick={handleCancel}
              size="sm"
              variant="outline"
              disabled={isSaving}
              className="touch-manipulation"
            >
              <X className="h-4 w-4 mr-2" />
              Отмена
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <EditableWrapper
      onEdit={() => setIsEditing(true)}
      onDelete={onDelete ? handleDeleteConfirm : undefined}
      onToggleVisibility={onToggleVisibility}
      isHidden={isHidden}
      showDeleteButton={!!onDelete}
      showVisibilityButton={!!onToggleVisibility}
    >
      <div className="bg-card p-6 rounded-lg border border-border hover-glow animate-fade-in">
        <div className="mb-4">{icon}</div>
        <h3 className="text-xl font-semibold mb-3 text-foreground">{editedTitle}</h3>
        <p className="text-muted-foreground">{editedDescription}</p>
      </div>
    </EditableWrapper>
  );
};
