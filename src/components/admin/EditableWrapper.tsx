import { ReactNode, useState } from 'react';
import { Pencil, Trash2, Eye, EyeOff, GripVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAdmin } from '@/contexts/AdminContext';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { cn } from '@/lib/utils';

interface EditableWrapperProps {
  children: ReactNode;
  onEdit?: () => void;
  onDelete?: () => void;
  onToggleVisibility?: () => void;
  isHidden?: boolean;
  isDraggable?: boolean;
  dragHandleProps?: any;
  className?: string;
  showEditButton?: boolean;
  showDeleteButton?: boolean;
  showVisibilityButton?: boolean;
}

export const EditableWrapper = ({
  children,
  onEdit,
  onDelete,
  onToggleVisibility,
  isHidden = false,
  isDraggable = false,
  dragHandleProps,
  className = '',
  showEditButton = true,
  showDeleteButton = true,
  showVisibilityButton = true,
}: EditableWrapperProps) => {
  const { isAdmin } = useAdmin();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  if (!isAdmin) {
    return <>{children}</>;
  }

  const handleDelete = () => {
    onDelete?.();
    setShowDeleteDialog(false);
  };

  return (
    <>
      <div className={cn(
        "relative group",
        isHidden && "opacity-50",
        className
      )}>
        {children}
        
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1 bg-background/95 backdrop-blur-sm rounded-md p-1 shadow-lg border">
          {isDraggable && dragHandleProps && (
            <div {...dragHandleProps} className="cursor-move">
              <Button
                size="sm"
                variant="ghost"
                className="h-8 w-8 p-0 touch-manipulation"
              >
                <GripVertical className="h-4 w-4" />
              </Button>
            </div>
          )}
          
          {showEditButton && onEdit && (
            <Button
              size="sm"
              variant="ghost"
              onClick={onEdit}
              className="h-8 w-8 p-0 touch-manipulation"
            >
              <Pencil className="h-4 w-4 text-primary" />
            </Button>
          )}
          
          {showVisibilityButton && onToggleVisibility && (
            <Button
              size="sm"
              variant="ghost"
              onClick={onToggleVisibility}
              className="h-8 w-8 p-0 touch-manipulation"
            >
              {isHidden ? (
                <EyeOff className="h-4 w-4 text-muted-foreground" />
              ) : (
                <Eye className="h-4 w-4 text-primary" />
              )}
            </Button>
          )}
          
          {showDeleteButton && onDelete && (
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setShowDeleteDialog(true)}
              className="h-8 w-8 p-0 touch-manipulation"
            >
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          )}
        </div>
      </div>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Подтвердите удаление</AlertDialogTitle>
            <AlertDialogDescription>
              Вы уверены, что хотите удалить этот элемент? Это действие нельзя отменить.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Отмена</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Удалить</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
