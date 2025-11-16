import { useState } from "react";
import { useAdmin } from "@/contexts/AdminContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Pencil, Save, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface BadgeEditorProps {
  initialTitle: string;
  initialDescription: string;
  page: string;
  section: string;
  contentKey: string;
  icon: React.ReactNode;
  onSave?: (title: string, description: string) => void;
}

export const BadgeEditor = ({
  initialTitle,
  initialDescription,
  page,
  section,
  contentKey,
  icon,
  onSave
}: BadgeEditorProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [isSaving, setIsSaving] = useState(false);
  const { isAdmin } = useAdmin();
  const { toast } = useToast();

  if (!isAdmin) {
    return (
      <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-2 sm:p-3 md:p-4 hover:border-primary/50 transition-all hover-lift overflow-hidden">
        <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-1 sm:mb-2 flex-shrink-0">
          {icon}
        </div>
        <p className="text-foreground font-semibold text-[10px] sm:text-xs md:text-sm mb-0.5 break-words text-center leading-tight">{title}</p>
        <p className="text-muted-foreground text-[8px] sm:text-[10px] md:text-xs break-words text-center leading-tight">{description}</p>
      </div>
    );
  }

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await supabase.from('site_content').upsert([
        {
          page,
          section,
          content_key: `${contentKey}_title`,
          content_value: title
        },
        {
          page,
          section,
          content_key: `${contentKey}_description`,
          content_value: description
        }
      ]);

      toast({
        title: "Сохранено",
        description: "Изменения успешно сохранены"
      });

      onSave?.(title, description);
      setIsEditing(false);
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось сохранить изменения",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setTitle(initialTitle);
    setDescription(initialDescription);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="bg-card/50 backdrop-blur-sm border border-primary rounded-lg p-2 sm:p-3 md:p-4 space-y-2 overflow-hidden">
        <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-1 sm:mb-2 flex-shrink-0">
          {icon}
        </div>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Заголовок"
          className="text-[10px] sm:text-xs md:text-sm"
        />
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Описание"
          className="text-[8px] sm:text-[10px] md:text-xs min-h-[50px] sm:min-h-[60px]"
        />
        <div className="flex gap-2 justify-center">
          <Button
            size="sm"
            onClick={handleSave}
            disabled={isSaving}
            className="bg-primary text-primary-foreground text-[10px] sm:text-xs px-2 py-1"
          >
            <Save className="h-3 w-3 mr-1" />
            Сохранить
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={handleCancel}
            disabled={isSaving}
            className="text-[10px] sm:text-xs px-2 py-1"
          >
            <X className="h-3 w-3 mr-1" />
            Отмена
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-2 sm:p-3 md:p-4 hover:border-primary/50 transition-all hover-lift relative group overflow-hidden">
      <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-1 sm:mb-2 flex-shrink-0">
        {icon}
      </div>
      <p className="text-foreground font-semibold text-[10px] sm:text-xs md:text-sm mb-0.5 break-words text-center leading-tight">{title}</p>
      <p className="text-muted-foreground text-[8px] sm:text-[10px] md:text-xs break-words text-center leading-tight">{description}</p>
      
      <Button
        size="sm"
        variant="ghost"
        onClick={() => setIsEditing(true)}
        className="absolute top-1 right-1 sm:top-2 sm:right-2 opacity-60 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity"
      >
        <Pencil className="h-3 w-3" />
      </Button>
    </div>
  );
};