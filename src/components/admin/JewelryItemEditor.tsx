import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Pencil, Trash2, Save, X, Plus } from "lucide-react";

interface JewelryItem {
  id: string;
  title: string;
  price_from: number;
  description: string;
  sort_order: number;
}

interface JewelryItemEditorProps {
  item: JewelryItem;
  onSave: () => void;
  onDelete: () => void;
}

export const JewelryItemEditor = ({ item, onSave, onDelete }: JewelryItemEditorProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(item.title);
  const [priceFrom, setPriceFrom] = useState(item.price_from);
  const [description, setDescription] = useState(item.description);
  const { toast } = useToast();

  const handleSave = async () => {
    const { error } = await supabase
      .from('jewelry_items')
      .update({
        title,
        price_from: priceFrom,
        description,
      })
      .eq('id', item.id);

    if (error) {
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: "Не удалось сохранить изменения",
      });
      return;
    }

    toast({
      title: "Сохранено",
      description: "Изменения успешно сохранены",
    });
    setIsEditing(false);
    onSave();
  };

  const handleDelete = async () => {
    if (!confirm("Удалить это украшение?")) return;

    const { error } = await supabase
      .from('jewelry_items')
      .delete()
      .eq('id', item.id);

    if (error) {
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: "Не удалось удалить украшение",
      });
      return;
    }

    toast({
      title: "Удалено",
      description: "Украшение успешно удалено",
    });
    onDelete();
  };

  if (isEditing) {
    return (
      <div className="bg-card p-6 rounded-lg border-2 border-primary">
        <div className="space-y-4">
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Название"
          />
          <Input
            type="number"
            value={priceFrom}
            onChange={(e) => setPriceFrom(Number(e.target.value))}
            placeholder="Цена от"
          />
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Описание"
            rows={2}
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
            <Button onClick={handleDelete} variant="destructive" size="sm">
              <Trash2 className="h-4 w-4 mr-2" />
              Удалить
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card p-6 rounded-lg border border-border hover:border-primary transition-all hover-glow text-center relative group">
      <Button
        onClick={() => setIsEditing(true)}
        variant="ghost"
        size="sm"
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <Pencil className="h-4 w-4" />
      </Button>
      <h3 className="text-xl font-semibold mb-3 text-primary">{item.title}</h3>
      <p className="text-3xl font-semibold mb-2">от {item.price_from} ₽</p>
      <p className="text-sm text-muted-foreground">{item.description}</p>
    </div>
  );
};

interface AddJewelryButtonProps {
  onSave: () => void;
}

export const AddJewelryButton = ({ onSave }: AddJewelryButtonProps) => {
  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState("");
  const [priceFrom, setPriceFrom] = useState(500);
  const [description, setDescription] = useState("");
  const { toast } = useToast();

  const handleAdd = async () => {
    if (!title.trim() || !description.trim()) {
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: "Заполните все поля",
      });
      return;
    }

    const { error } = await supabase
      .from('jewelry_items')
      .insert({
        title,
        price_from: priceFrom,
        description,
        sort_order: 999,
      });

    if (error) {
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: "Не удалось добавить украшение",
      });
      return;
    }

    toast({
      title: "Добавлено",
      description: "Украшение успешно добавлено",
    });
    setTitle("");
    setPriceFrom(500);
    setDescription("");
    setIsAdding(false);
    onSave();
  };

  if (isAdding) {
    return (
      <div className="bg-card p-6 rounded-lg border-2 border-primary">
        <div className="space-y-4">
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Название"
          />
          <Input
            type="number"
            value={priceFrom}
            onChange={(e) => setPriceFrom(Number(e.target.value))}
            placeholder="Цена от"
          />
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Описание"
            rows={2}
          />
          <div className="flex gap-2">
            <Button onClick={handleAdd} size="sm">
              <Save className="h-4 w-4 mr-2" />
              Добавить
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
    <div className="bg-card/50 p-6 rounded-lg border-2 border-dashed border-border hover:border-primary transition-all text-center cursor-pointer" onClick={() => setIsAdding(true)}>
      <Plus className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
      <p className="text-sm text-muted-foreground">Добавить украшение</p>
    </div>
  );
};
