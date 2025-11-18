import { ReactNode, useState } from 'react';
import { useAdmin } from '@/contexts/AdminContext';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface DraggableItem {
  id: string;
  sort_order: number;
  [key: string]: any;
}

interface DraggableListProps<T extends DraggableItem> {
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
  onReorder: (items: T[]) => Promise<void>;
  className?: string;
}

export function DraggableList<T extends DraggableItem>({
  items,
  renderItem,
  onReorder,
  className = '',
}: DraggableListProps<T>) {
  const { isAdmin } = useAdmin();
  const { toast } = useToast();
  const [isReordering, setIsReordering] = useState(false);

  const moveItem = async (index: number, direction: 'up' | 'down') => {
    if (isReordering) return;

    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= items.length) return;

    setIsReordering(true);
    try {
      const newItems = [...items];
      const temp = newItems[index];
      newItems[index] = newItems[newIndex];
      newItems[newIndex] = temp;

      // Update sort_order
      const updatedItems = newItems.map((item, idx) => ({
        ...item,
        sort_order: idx,
      }));

      await onReorder(updatedItems);

      toast({
        title: 'Успешно',
        description: 'Порядок изменён',
      });
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Ошибка',
        description: error.message || 'Не удалось изменить порядок',
      });
    } finally {
      setIsReordering(false);
    }
  };

  return (
    <div className={className}>
      {items.map((item, index) => (
        <div key={item.id} className="relative group">
          {renderItem(item, index)}
          
          {isAdmin && (
            <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col gap-1 bg-background/95 backdrop-blur-sm rounded-md p-1 shadow-lg border">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => moveItem(index, 'up')}
                disabled={index === 0 || isReordering}
                className="h-8 w-8 p-0 touch-manipulation"
              >
                <ArrowUp className="h-4 w-4" />
              </Button>
              
              <Button
                size="sm"
                variant="ghost"
                onClick={() => moveItem(index, 'down')}
                disabled={index === items.length - 1 || isReordering}
                className="h-8 w-8 p-0 touch-manipulation"
              >
                <ArrowDown className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
