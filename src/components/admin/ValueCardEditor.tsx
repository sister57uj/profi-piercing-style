import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Pencil, Save, X } from "lucide-react";
import { useAdmin } from "@/contexts/AdminContext";

interface ValueCardEditorProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  page: string;
  section: string;
  contentKey: string;
  onSave: (title: string, description: string) => void;
}

export const ValueCardEditor = ({
  icon,
  title,
  description,
  page,
  section,
  contentKey,
  onSave
}: ValueCardEditorProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedDescription, setEditedDescription] = useState(description);
  const { toast } = useToast();
  const { isAdmin } = useAdmin();

  const handleSave = async () => {
    try {
      // Save title
      await supabase.from('site_content').upsert({
        page,
        section,
        content_key: `${contentKey}_title`,
        content_value: editedTitle
      }, { onConflict: 'page,section,content_key' });

      // Save description
      await supabase.from('site_content').upsert({
        page,
        section,
        content_key: `${contentKey}_desc`,
        content_value: editedDescription
      }, { onConflict: 'page,section,content_key' });

      onSave(editedTitle, editedDescription);
      setIsEditing(false);
      toast({ title: "Сохранено", description: "Изменения успешно сохранены" });
    } catch (error) {
      toast({ variant: "destructive", title: "Ошибка", description: "Не удалось сохранить изменения" });
    }
  };

  if (!isAdmin) {
    return (
      <div className="bg-card p-6 rounded-lg border border-border hover-glow animate-fade-in">
        <div className="mb-4">{icon}</div>
        <h3 className="text-xl font-semibold mb-3 text-primary">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    );
  }

  if (isEditing) {
    return (
      <div className="bg-card p-6 rounded-lg border-2 border-primary animate-fade-in">
        <div className="mb-4">{icon}</div>
        <div className="space-y-3">
          <Input
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            placeholder="Заголовок"
          />
          <Textarea
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            placeholder="Описание"
            rows={3}
          />
          <div className="flex gap-2">
            <Button onClick={handleSave} size="sm">
              <Save className="h-4 w-4 mr-2" />
              Сохранить
            </Button>
            <Button onClick={() => setIsEditing(false)} variant="outline" size="sm">
              <X className="h-4 w-4 mr-2" />
              Отмена
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card p-6 rounded-lg border border-border hover-glow animate-fade-in relative group">
      <Button
        onClick={() => setIsEditing(true)}
        variant="ghost"
        size="sm"
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <Pencil className="h-4 w-4" />
      </Button>
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-3 text-primary">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};
