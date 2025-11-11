import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAdmin } from "@/contexts/AdminContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Pencil, Save, X, Trash2 } from "lucide-react";
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

interface WorkProcessStep {
  id: string;
  title: string;
  description: string;
  step_number: number;
  sort_order: number;
}

interface WorkProcessStepEditorProps {
  step: WorkProcessStep;
  onUpdate: () => void;
}

export const WorkProcessStepEditor = ({ step, onUpdate }: WorkProcessStepEditorProps) => {
  const { isAdmin } = useAdmin();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(step.title);
  const [editedDescription, setEditedDescription] = useState(step.description);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleSave = async () => {
    try {
      const { error } = await supabase
        .from('work_process_steps')
        .update({
          title: editedTitle,
          description: editedDescription,
        })
        .eq('id', step.id);

      if (error) throw error;

      toast.success('Шаг обновлен');
      setIsEditing(false);
      onUpdate();
    } catch (error) {
      console.error('Error updating step:', error);
      toast.error('Ошибка при сохранении');
    }
  };

  const handleDelete = async () => {
    try {
      const { error } = await supabase
        .from('work_process_steps')
        .delete()
        .eq('id', step.id);

      if (error) throw error;

      toast.success('Шаг удален');
      onUpdate();
    } catch (error) {
      console.error('Error deleting step:', error);
      toast.error('Ошибка при удалении');
    }
  };

  if (!isAdmin) {
    return (
      <div className="bg-card p-6 rounded-lg border border-border hover:border-primary transition-all hover-glow text-center">
        <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl font-semibold text-primary">{step.step_number}</span>
        </div>
        <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
        <p className="text-sm text-muted-foreground">{step.description}</p>
      </div>
    );
  }

  if (isEditing) {
    return (
      <div className="bg-card p-6 rounded-lg border-2 border-primary">
        <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl font-semibold text-primary">{step.step_number}</span>
        </div>
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
          <div className="flex gap-2 justify-center">
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
      <div className="bg-card p-6 rounded-lg border border-border hover:border-primary transition-all hover-glow text-center relative group">
        <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            size="sm"
            variant="secondary"
            onClick={() => setIsEditing(true)}
            className="h-8 w-8 p-0"
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={() => setShowDeleteDialog(true)}
            className="h-8 w-8 p-0"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
        <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl font-semibold text-primary">{step.step_number}</span>
        </div>
        <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
        <p className="text-sm text-muted-foreground">{step.description}</p>
      </div>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Удалить шаг?</AlertDialogTitle>
            <AlertDialogDescription>
              Это действие нельзя отменить. Шаг будет удален навсегда.
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
