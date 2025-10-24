import { useState } from 'react';
import { Pencil, Plus, Trash2, GripVertical, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useAdmin } from '@/contexts/AdminContext';

interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  image: string;
  isCover?: boolean;
}

interface PortfolioManagerProps {
  items: PortfolioItem[];
  onUpdate: (items: PortfolioItem[]) => void;
}

export const PortfolioManager = ({ items, onUpdate }: PortfolioManagerProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingItems, setEditingItems] = useState<PortfolioItem[]>(items);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newItem, setNewItem] = useState({ title: '', category: '', image: '' });
  const { isAdmin } = useAdmin();
  const { toast } = useToast();

  if (!isAdmin) return null;

  const handleSave = () => {
    onUpdate(editingItems);
    setIsEditing(false);
    toast({
      title: 'Сохранено',
      description: 'Изменения в галерее сохранены'
    });
  };

  const handleDelete = (id: string) => {
    setEditingItems(prev => prev.filter(item => item.id !== id));
  };

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const newItems = [...editingItems];
    [newItems[index - 1], newItems[index]] = [newItems[index], newItems[index - 1]];
    setEditingItems(newItems);
  };

  const handleMoveDown = (index: number) => {
    if (index === editingItems.length - 1) return;
    const newItems = [...editingItems];
    [newItems[index], newItems[index + 1]] = [newItems[index + 1], newItems[index]];
    setEditingItems(newItems);
  };

  const handleSetCover = (id: string) => {
    setEditingItems(prev =>
      prev.map(item => ({
        ...item,
        isCover: item.id === id
      }))
    );
  };

  const handleAddItem = () => {
    if (!newItem.title || !newItem.category || !newItem.image) {
      toast({
        variant: 'destructive',
        title: 'Ошибка',
        description: 'Заполните все поля'
      });
      return;
    }

    const item: PortfolioItem = {
      id: Date.now().toString(),
      ...newItem
    };

    setEditingItems(prev => [...prev, item]);
    setNewItem({ title: '', category: '', image: '' });
    setShowAddDialog(false);
    toast({
      title: 'Добавлено',
      description: 'Новый элемент добавлен в галерею'
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isEditing ? (
        <Button
          size="lg"
          onClick={() => {
            setEditingItems(items);
            setIsEditing(true);
          }}
          className="shadow-lg"
        >
          <Pencil className="h-5 w-5 mr-2" />
          Редактировать галерею
        </Button>
      ) : (
        <div className="bg-background border border-border rounded-lg shadow-xl p-6 max-w-4xl max-h-[80vh] overflow-auto">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">Управление галереей</h3>
            <div className="flex gap-2">
              <Button onClick={() => setShowAddDialog(true)} variant="outline">
                <Plus className="h-4 w-4 mr-1" />
                Добавить
              </Button>
              <Button onClick={handleSave}>Сохранить</Button>
              <Button onClick={() => setIsEditing(false)} variant="outline">
                Закрыть
              </Button>
            </div>
          </div>

          <div className="space-y-3">
            {editingItems.map((item, index) => (
              <div
                key={item.id}
                className="flex items-center gap-3 p-3 bg-card rounded-lg border"
              >
                <GripVertical className="h-5 w-5 text-muted-foreground cursor-move" />
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-16 w-16 object-cover rounded"
                />
                <div className="flex-1">
                  <p className="font-semibold">{item.title}</p>
                  <p className="text-sm text-muted-foreground">{item.category}</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleSetCover(item.id)}
                    className={item.isCover ? 'text-yellow-500' : ''}
                  >
                    <Star className="h-4 w-4" fill={item.isCover ? 'currentColor' : 'none'} />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleMoveUp(index)}
                    disabled={index === 0}
                  >
                    ↑
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleMoveDown(index)}
                    disabled={index === editingItems.length - 1}
                  >
                    ↓
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleDelete(item.id)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Добавить новый элемент</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Название</Label>
              <Input
                id="title"
                value={newItem.title}
                onChange={(e) => setNewItem(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Название услуги"
              />
            </div>
            <div>
              <Label htmlFor="category">Категория</Label>
              <Input
                id="category"
                value={newItem.category}
                onChange={(e) => setNewItem(prev => ({ ...prev, category: e.target.value }))}
                placeholder="Категория"
              />
            </div>
            <div>
              <Label htmlFor="image">URL изображения</Label>
              <Input
                id="image"
                value={newItem.image}
                onChange={(e) => setNewItem(prev => ({ ...prev, image: e.target.value }))}
                placeholder="/src/assets/image.jpg"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Загрузите изображение в src/assets и укажите путь
              </p>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                Отмена
              </Button>
              <Button onClick={handleAddItem}>Добавить</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};