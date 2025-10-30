import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Pencil, Trash2, Plus, Save, X } from "lucide-react";
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

interface PricingService {
  id: string;
  category: string;
  name: string;
  price: number;
  sort_order: number;
}

interface PricingServiceEditorProps {
  service?: PricingService;
  category: string;
  onSave: () => void;
  onDelete?: () => void;
}

export const PricingServiceEditor = ({ service, category, onSave, onDelete }: PricingServiceEditorProps) => {
  const [isEditing, setIsEditing] = useState(!service);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [name, setName] = useState(service?.name || "");
  const [price, setPrice] = useState(service?.price.toString() || "0");
  const { toast } = useToast();

  const handleSave = async () => {
    try {
      if (service) {
        await supabase
          .from('pricing_services')
          .update({ name, price: parseInt(price), category })
          .eq('id', service.id);
      } else {
        await supabase
          .from('pricing_services')
          .insert({ name, price: parseInt(price), category, sort_order: 999 });
      }

      toast({ title: "Сохранено", description: "Услуга успешно сохранена" });
      setIsEditing(false);
      onSave();
    } catch (error) {
      toast({ title: "Ошибка", description: "Не удалось сохранить услугу", variant: "destructive" });
    }
  };

  const handleDelete = async () => {
    if (!service) return;
    
    try {
      await supabase.from('pricing_services').delete().eq('id', service.id);
      toast({ title: "Удалено", description: "Услуга успешно удалена" });
      onDelete?.();
    } catch (error) {
      toast({ title: "Ошибка", description: "Не удалось удалить услугу", variant: "destructive" });
    }
  };

  if (isEditing) {
    return (
      <div className="flex gap-2 items-center p-4 bg-primary/5 border border-primary/30 rounded">
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Название услуги"
          className="flex-1"
        />
        <Input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Цена"
          className="w-32"
        />
        <Button size="sm" onClick={handleSave}>
          <Save className="h-4 w-4" />
        </Button>
        {service && (
          <Button size="sm" variant="outline" onClick={() => setIsEditing(false)}>
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-between items-center p-4 hover:bg-background transition-colors group">
        <span className="font-medium">{name}</span>
        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold text-primary">
            {parseInt(price) === 0 ? 'Бесплатно' : `${price} ₽`}
          </span>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setIsEditing(true)}
            className="opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setDeleteDialogOpen(true)}
            className="opacity-0 group-hover:opacity-100 transition-opacity text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Удалить услугу?</AlertDialogTitle>
            <AlertDialogDescription>
              Вы уверены, что хотите удалить "{name}"? Это действие нельзя отменить.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Отмена</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
              Удалить
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export const AddServiceButton = ({ category, onSave }: { category: string; onSave: () => void }) => {
  const [isAdding, setIsAdding] = useState(false);

  if (isAdding) {
    return (
      <PricingServiceEditor
        category={category}
        onSave={() => {
          setIsAdding(false);
          onSave();
        }}
      />
    );
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => setIsAdding(true)}
      className="w-full border-dashed"
    >
      <Plus className="h-4 w-4 mr-2" />
      Добавить услугу
    </Button>
  );
};