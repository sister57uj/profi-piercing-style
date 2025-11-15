import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Save, X, CheckCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useAdmin } from "@/contexts/AdminContext";

interface AddSafetyGuaranteeButtonProps {
  onAdd: () => void;
  nextSortOrder: number;
}

export const AddSafetyGuaranteeButton = ({ 
  onAdd, 
  nextSortOrder 
}: AddSafetyGuaranteeButtonProps) => {
  const { isAdmin } = useAdmin();
  const [isAdding, setIsAdding] = useState(false);
  const [text, setText] = useState("");

  if (!isAdmin) return null;

  const handleSave = async () => {
    if (!text.trim()) {
      toast.error("Введите текст гарантии");
      return;
    }

    try {
      const { error } = await supabase
        .from('safety_guarantees')
        .insert({
          text,
          sort_order: nextSortOrder
        });

      if (error) throw error;

      toast.success("Гарантия добавлена");
      setText("");
      setIsAdding(false);
      onAdd();
    } catch (error) {
      console.error('Error adding guarantee:', error);
      toast.error("Ошибка при добавлении");
    }
  };

  if (isAdding) {
    return (
      <div className="flex items-start gap-3 bg-card p-3 rounded-lg border-2 border-primary">
        <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
        <div className="flex-1 space-y-2">
          <Input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Текст гарантии"
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
      className="w-full border-dashed border-2 hover:border-primary hover:bg-primary/5"
    >
      <Plus className="h-4 w-4 mr-2" />
      Добавить гарантию
    </Button>
  );
};
