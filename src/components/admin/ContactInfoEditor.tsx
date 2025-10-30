import { useState } from "react";
import { useAdmin } from "@/contexts/AdminContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Pencil, Save, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ContactInfoEditorProps {
  icon: React.ComponentType<any>;
  title: string;
  content: string;
  subContent?: string;
  color: string;
  page: string;
  section: string;
  contentKey: string;
  onSave?: (content: string, subContent?: string) => void;
}

export const ContactInfoEditor = ({
  icon: Icon,
  title,
  content: initialContent,
  subContent: initialSubContent,
  color,
  page,
  section,
  contentKey,
  onSave
}: ContactInfoEditorProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(initialContent);
  const [subContent, setSubContent] = useState(initialSubContent || "");
  const [isSaving, setIsSaving] = useState(false);
  const { isAdmin } = useAdmin();
  const { toast } = useToast();

  if (!isAdmin) {
    return (
      <div className="bg-background p-3 sm:p-4 md:p-6 rounded-lg border border-border hover:border-primary transition-all hover-glow animate-fade-in text-center">
        <Icon className={`h-6 w-6 sm:h-8 sm:w-8 ${color} mx-auto mb-2 sm:mb-4`} />
        <h3 className="font-bebas text-base sm:text-lg md:text-xl mb-1 sm:mb-2">{title}</h3>
        <p className="text-xs sm:text-sm md:text-base text-foreground mb-0.5 sm:mb-1">{content}</p>
        {subContent && (
          <p className="text-xs sm:text-sm text-muted-foreground">{subContent}</p>
        )}
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
          content_key: `${contentKey}_content`,
          content_value: content
        },
        {
          page,
          section,
          content_key: `${contentKey}_subcontent`,
          content_value: subContent
        }
      ]);

      toast({
        title: "Сохранено",
        description: "Контактная информация обновлена"
      });

      onSave?.(content, subContent);
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
    setContent(initialContent);
    setSubContent(initialSubContent || "");
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="bg-background p-3 sm:p-4 md:p-6 rounded-lg border border-primary space-y-2">
        <Icon className={`h-6 w-6 sm:h-8 sm:w-8 ${color} mx-auto mb-2`} />
        <h3 className="font-bebas text-base sm:text-lg md:text-xl mb-2 text-center">{title}</h3>
        <Input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Основная информация"
          className="text-sm"
        />
        <Input
          value={subContent}
          onChange={(e) => setSubContent(e.target.value)}
          placeholder="Дополнительная информация"
          className="text-sm"
        />
        <div className="flex gap-2 justify-center pt-2">
          <Button
            size="sm"
            onClick={handleSave}
            disabled={isSaving}
            className="bg-primary text-primary-foreground"
          >
            <Save className="h-3 w-3 mr-1" />
            Сохранить
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={handleCancel}
            disabled={isSaving}
          >
            <X className="h-3 w-3 mr-1" />
            Отмена
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background p-3 sm:p-4 md:p-6 rounded-lg border border-border hover:border-primary transition-all hover-glow animate-fade-in text-center relative group">
      <Icon className={`h-6 w-6 sm:h-8 sm:w-8 ${color} mx-auto mb-2 sm:mb-4`} />
      <h3 className="font-bebas text-base sm:text-lg md:text-xl mb-1 sm:mb-2">{title}</h3>
      <p className="text-xs sm:text-sm md:text-base text-foreground mb-0.5 sm:mb-1">{content}</p>
      {subContent && (
        <p className="text-xs sm:text-sm text-muted-foreground">{subContent}</p>
      )}
      
      <Button
        size="sm"
        variant="ghost"
        onClick={() => setIsEditing(true)}
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <Pencil className="h-3 w-3" />
      </Button>
    </div>
  );
};