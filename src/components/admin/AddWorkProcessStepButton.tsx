import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Save, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useAdmin } from "@/contexts/AdminContext";

interface AddWorkProcessStepButtonProps {
  onAdd: () => void;
  nextStepNumber: number;
}

export const AddWorkProcessStepButton = ({ 
  onAdd, 
  nextStepNumber 
}: AddWorkProcessStepButtonProps) => {
  const { isAdmin } = useAdmin();
  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  if (!isAdmin) return null;

  const handleSave = async () => {
    if (!title.trim() || !description.trim()) {
      toast.error("Заполните все поля");
      return;
    }

    try {
      const { error } = await supabase
        .from('work_process_steps')
        .insert({
          title,
          description,
          step_number: nextStepNumber,
          sort_order: nextStepNumber
        });

      if (error) throw error;

      toast.success("Шаг добавлен");
      setTitle("");
      setDescription("");
      setIsAdding(false);
      onAdd();
    } catch (error) {
      console.error('Error adding step:', error);
      toast.error("Ошибка при добавлении");
    }
  };

  if (isAdding) {
    return (
      <div className="bg-card p-6 rounded-lg border-2 border-primary animate-fade-in">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
            <span className="text-xl font-bold text-primary">{nextStepNumber}</span>
          </div>
          <div className="flex-1 space-y-3">
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Заголовок шага"
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
      Добавить шаг
    </Button>
  );
};
