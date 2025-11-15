import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Save, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useAdmin } from "@/contexts/AdminContext";

interface AddTextBlockButtonProps {
  page: string;
  section: string;
  onAdd: () => void;
  buttonText?: string;
}

export const AddTextBlockButton = ({ 
  page, 
  section, 
  onAdd,
  buttonText = "Добавить текстовый блок" 
}: AddTextBlockButtonProps) => {
  const { isAdmin } = useAdmin();
  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  if (!isAdmin) return null;

  const handleSave = async () => {
    if (!title.trim()) {
      toast.error("Введите заголовок");
      return;
    }

    try {
      const timestamp = Date.now();
      const contentKey = `custom_text_${timestamp}`;

      await supabase.from('site_content').insert([
        {
          page,
          section,
          content_key: `${contentKey}_title`,
          content_value: title
        },
        {
          page,
          section,
          content_key: `${contentKey}_content`,
          content_value: content
        }
      ]);

      toast.success("Текстовый блок добавлен");
      setTitle("");
      setContent("");
      setIsAdding(false);
      onAdd();
    } catch (error) {
      console.error('Error adding text block:', error);
      toast.error("Ошибка при добавлении");
    }
  };

  if (isAdding) {
    return (
      <div className="bg-card p-6 rounded-lg border-2 border-primary animate-fade-in">
        <h3 className="text-lg font-semibold mb-4 text-foreground">Новый текстовый блок</h3>
        <div className="space-y-4">
          <div>
            <label className="text-sm text-muted-foreground mb-2 block">Заголовок</label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Введите заголовок"
            />
          </div>
          <div>
            <label className="text-sm text-muted-foreground mb-2 block">Содержание</label>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Введите текст"
              rows={4}
            />
          </div>
          <div className="flex gap-2">
            <Button onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" />
              Сохранить
            </Button>
            <Button onClick={() => setIsAdding(false)} variant="outline">
              <X className="h-4 w-4 mr-2" />
              Отмена
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Button
      onClick={() => setIsAdding(true)}
      variant="outline"
      className="w-full border-dashed border-2 hover:border-primary hover:bg-primary/5"
    >
      <Plus className="h-4 w-4 mr-2" />
      {buttonText}
    </Button>
  );
};
