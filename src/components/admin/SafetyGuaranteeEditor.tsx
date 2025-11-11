import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAdmin } from "@/contexts/AdminContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil, Save, X, Trash2, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface SafetyGuarantee {
  id: string;
  text: string;
  sort_order: number;
}

interface SafetyGuaranteeEditorProps {
  guarantee: SafetyGuarantee;
  onUpdate: () => void;
}

export const SafetyGuaranteeEditor = ({ guarantee, onUpdate }: SafetyGuaranteeEditorProps) => {
  const { isAdmin } = useAdmin();
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(guarantee.text);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleSave = async () => {
    try {
      const { error } = await supabase
        .from('safety_guarantees')
        .update({ text: editedText })
        .eq('id', guarantee.id);

      if (error) throw error;

      toast.success('Гарантия обновлена');
      setIsEditing(false);
      onUpdate();
    } catch (error) {
      console.error('Error updating guarantee:', error);
      toast.error('Ошибка при сохранении');
    }
  };

  const handleDelete = async () => {
    try {
      const { error } = await supabase
        .from('safety_guarantees')
        .delete()
        .eq('id', guarantee.id);

      if (error) throw error;

      toast.success('Гарантия удалена');
      onUpdate();
    } catch (error) {
      console.error('Error deleting guarantee:', error);
      toast.error('Ошибка при удалении');
    }
  };

  if (!isAdmin) {
    return (
      <div className="flex items-start gap-3">
        <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
        <p className="text-muted-foreground">{guarantee.text}</p>
      </div>
    );
  }

  if (isEditing) {
    return (
      <div className="flex items-start gap-3 bg-card p-3 rounded-lg border-2 border-primary">
        <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
        <div className="flex-1 space-y-2">
          <Input
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            placeholder="Текст гарантии"
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
    <>
      <div className="flex items-start gap-3 group relative">
        <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
        <p className="text-muted-foreground flex-1">{guarantee.text}</p>
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            onClick={() => setIsEditing(true)}
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            onClick={() => setShowDeleteDialog(true)}
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 text-destructive hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Удалить гарантию?</AlertDialogTitle>
            <AlertDialogDescription>
              Это действие нельзя отменить.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Отмена</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Удалить
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
