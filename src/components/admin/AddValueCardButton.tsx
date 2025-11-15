import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Save, X, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useAdmin } from "@/contexts/AdminContext";

interface AddValueCardButtonProps {
  page: string;
  section: string;
  onAdd: () => void;
}

export const AddValueCardButton = ({ page, section, onAdd }: AddValueCardButtonProps) => {
  const { isAdmin } = useAdmin();
  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  if (!isAdmin) return null;

  const handleSave = async () => {
    if (!title.trim()) {
      toast.error("Введите заголовок");
      return;
    }

    try {
      const timestamp = Date.now();
      const contentKey = `value_card_${timestamp}`;

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
          content_key: `${contentKey}_desc`,
          content_value: description
        }
      ]);

      toast.success("Карточка добавлена");
      setTitle("");
      setDescription("");
      setIsAdding(false);
      onAdd();
    } catch (error) {
      console.error('Error adding value card:', error);
      toast.error("Ошибка при добавлении");
    }
  };

  if (isAdding) {
    return (
      <div className="bg-card p-6 rounded-lg border-2 border-primary animate-fade-in">
        <div className="mb-4">
          <Sparkles className="h-8 w-8 text-primary" />
        </div>
        <div className="space-y-3">
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Заголовок"
          />
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Описание"
            rows={3}
          />
          <div className="flex gap-2">
            <Button onClick={handleSave} size="sm">
              <Save className="h-4 w-4 mr-2" />
              Сохранить
            </Button>
            <Button onClick={() => setIsAdding(false)} variant="outline" size="sm">
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
      className="w-full h-full min-h-[200px] border-dashed border-2 hover:border-primary hover:bg-primary/5"
    >
      <div className="flex flex-col items-center gap-2">
        <Plus className="h-8 w-8" />
        <span>Добавить карточку</span>
      </div>
    </Button>
  );
};
