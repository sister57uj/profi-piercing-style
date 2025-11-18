import { useState } from 'react';
import { Plus, Type, Image as ImageIcon, LayoutGrid, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAdmin } from '@/contexts/AdminContext';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface AdminToolbarProps {
  page: string;
  section: string;
  onAdd: () => void;
}

type ContentType = 'text' | 'image' | 'card' | null;

export const AdminToolbar = ({ page, section, onAdd }: AdminToolbarProps) => {
  const { isAdmin } = useAdmin();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [contentType, setContentType] = useState<ContentType>(null);
  const [isAdding, setIsAdding] = useState(false);

  // Form states
  const [textValue, setTextValue] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [cardTitle, setCardTitle] = useState('');
  const [cardDescription, setCardDescription] = useState('');
  const [cardIcon, setCardIcon] = useState('');

  if (!isAdmin) return null;

  const resetForm = () => {
    setTextValue('');
    setImageUrl('');
    setCardTitle('');
    setCardDescription('');
    setCardIcon('');
    setContentType(null);
  };

  const handleClose = () => {
    setIsOpen(false);
    resetForm();
  };

  const handleSave = async () => {
    setIsAdding(true);
    try {
      let contentKey = '';
      let contentValue = '';

      switch (contentType) {
        case 'text':
          if (!textValue.trim()) {
            toast({
              variant: 'destructive',
              title: 'Ошибка',
              description: 'Введите текст',
            });
            return;
          }
          contentKey = `text_${Date.now()}`;
          contentValue = textValue;
          break;

        case 'image':
          if (!imageUrl.trim()) {
            toast({
              variant: 'destructive',
              title: 'Ошибка',
              description: 'Введите URL изображения',
            });
            return;
          }
          contentKey = `image_${Date.now()}`;
          contentValue = imageUrl;
          break;

        case 'card':
          if (!cardTitle.trim() || !cardDescription.trim()) {
            toast({
              variant: 'destructive',
              title: 'Ошибка',
              description: 'Заполните все поля карточки',
            });
            return;
          }
          contentKey = `card_${Date.now()}`;
          contentValue = JSON.stringify({
            title: cardTitle,
            description: cardDescription,
            icon: cardIcon,
          });
          break;

        default:
          return;
      }

      const { error } = await supabase.from('site_content').insert({
        page,
        section,
        content_key: contentKey,
        content_value: contentValue,
      });

      if (error) throw error;

      toast({
        title: 'Успешно',
        description: 'Элемент добавлен',
      });

      handleClose();
      onAdd();
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Ошибка',
        description: error.message || 'Не удалось добавить элемент',
      });
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <>
      <div className="flex justify-center my-8">
        <Button
          onClick={() => setIsOpen(true)}
          variant="outline"
          className="gap-2"
        >
          <Plus className="h-4 w-4" />
          Добавить элемент
        </Button>
      </div>

      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Добавить новый элемент</DialogTitle>
          </DialogHeader>

          {!contentType ? (
            <div className="grid grid-cols-3 gap-4 py-4">
              <button
                onClick={() => setContentType('text')}
                className="flex flex-col items-center gap-2 p-6 rounded-lg border-2 border-dashed border-border hover:border-primary hover:bg-accent transition-colors"
              >
                <Type className="h-8 w-8 text-primary" />
                <span className="text-sm font-medium">Текст</span>
              </button>

              <button
                onClick={() => setContentType('image')}
                className="flex flex-col items-center gap-2 p-6 rounded-lg border-2 border-dashed border-border hover:border-primary hover:bg-accent transition-colors"
              >
                <ImageIcon className="h-8 w-8 text-primary" />
                <span className="text-sm font-medium">Изображение</span>
              </button>

              <button
                onClick={() => setContentType('card')}
                className="flex flex-col items-center gap-2 p-6 rounded-lg border-2 border-dashed border-border hover:border-primary hover:bg-accent transition-colors"
              >
                <LayoutGrid className="h-8 w-8 text-primary" />
                <span className="text-sm font-medium">Карточка</span>
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">
                  {contentType === 'text' && 'Текстовый блок'}
                  {contentType === 'image' && 'Изображение'}
                  {contentType === 'card' && 'Карточка'}
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setContentType(null)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {contentType === 'text' && (
                <div className="space-y-2">
                  <Label htmlFor="text">Текст</Label>
                  <Textarea
                    id="text"
                    value={textValue}
                    onChange={(e) => setTextValue(e.target.value)}
                    placeholder="Введите текст"
                    rows={5}
                  />
                </div>
              )}

              {contentType === 'image' && (
                <div className="space-y-2">
                  <Label htmlFor="imageUrl">URL изображения</Label>
                  <Input
                    id="imageUrl"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              )}

              {contentType === 'card' && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="cardTitle">Заголовок</Label>
                    <Input
                      id="cardTitle"
                      value={cardTitle}
                      onChange={(e) => setCardTitle(e.target.value)}
                      placeholder="Заголовок карточки"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cardDescription">Описание</Label>
                    <Textarea
                      id="cardDescription"
                      value={cardDescription}
                      onChange={(e) => setCardDescription(e.target.value)}
                      placeholder="Описание карточки"
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cardIcon">Иконка (опционально)</Label>
                    <Input
                      id="cardIcon"
                      value={cardIcon}
                      onChange={(e) => setCardIcon(e.target.value)}
                      placeholder="Название иконки из lucide-react"
                    />
                  </div>
                </div>
              )}

              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={handleClose}>
                  Отмена
                </Button>
                <Button onClick={handleSave} disabled={isAdding}>
                  Добавить
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
