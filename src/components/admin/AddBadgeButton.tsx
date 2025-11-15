import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Save, X, Award } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useAdmin } from "@/contexts/AdminContext";

interface AddBadgeButtonProps {
  page: string;
  section: string;
  onAdd: () => void;
}

export const AddBadgeButton = ({ page, section, onAdd }: AddBadgeButtonProps) => {
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
      const contentKey = `badge_${timestamp}`;

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
          content_key: `${contentKey}_description`,
          content_value: description
        }
      ]);

      toast.success("Бейдж добавлен");
      setTitle("");
      setDescription("");
      setIsAdding(false);
      onAdd();
    } catch (error) {
      console.error('Error adding badge:', error);
      toast.error("Ошибка при добавлении");
    }
  };

  if (isAdding) {
    return (
      <div className="bg-card/50 backdrop-blur-sm border-2 border-primary rounded-lg p-4 space-y-2 animate-fade-in">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-2">
          <Award className="h-6 w-6 text-primary" />
        </div>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Заголовок"
          className="text-sm"
        />
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Описание"
          className="text-xs min-h-[60px]"
        />
        <div className="flex gap-2 justify-center">
          <Button size="sm" onClick={handleSave}>
            <Save className="h-3 w-3 mr-1" />
            Сохранить
          </Button>
          <Button size="sm" variant="outline" onClick={() => setIsAdding(false)}>
            <X className="h-3 w-3 mr-1" />
            Отмена
          </Button>
        </div>
      </div>
    );
  }

  return (
    <Button
      onClick={() => setIsAdding(true)}
      variant="outline"
      className="w-full h-full min-h-[120px] border-dashed border-2 hover:border-primary hover:bg-primary/5"
    >
      <div className="flex flex-col items-center gap-2">
        <Plus className="h-6 w-6" />
        <span className="text-xs">Добавить бейдж</span>
      </div>
    </Button>
  );
};
