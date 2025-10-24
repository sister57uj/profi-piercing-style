import { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Trash2, Star, Upload, MoveUp, MoveDown, X } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface PortfolioImage {
  id: string;
  image_url: string;
  sort_order: number;
}

interface PortfolioItemEditorProps {
  item: {
    id: string;
    title: string;
    category: string;
    cover_image: string | null;
  };
  images: PortfolioImage[];
  isOpen: boolean;
  onClose: () => void;
  onUpdate: () => void;
}

export const PortfolioItemEditor = ({ item, images, isOpen, onClose, onUpdate }: PortfolioItemEditorProps) => {
  const [title, setTitle] = useState(item.title);
  const [category, setCategory] = useState(item.category);
  const [itemImages, setItemImages] = useState<PortfolioImage[]>(images);
  const [coverImage, setCoverImage] = useState<string | null>(item.cover_image);
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleUploadImages = async (files: FileList) => {
    setIsUploading(true);
    try {
      const uploadPromises = Array.from(files).map(async (file) => {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('portfolio')
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('portfolio')
          .getPublicUrl(filePath);

        // Добавляем изображение в базу данных
        const { data, error } = await supabase
          .from('portfolio_images')
          .insert({
            portfolio_item_id: item.id,
            image_url: publicUrl,
            sort_order: itemImages.length
          })
          .select()
          .single();

        if (error) throw error;
        return data;
      });

      const newImages = await Promise.all(uploadPromises);
      setItemImages([...itemImages, ...newImages]);

      toast({
        title: 'Успешно',
        description: `Загружено ${files.length} изображений`
      });
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Ошибка загрузки',
        description: error.message
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteImage = async (imageId: string, imageUrl: string) => {
    try {
      // Удаляем из storage
      const path = imageUrl.split('/').pop();
      if (path) {
        await supabase.storage.from('portfolio').remove([path]);
      }

      // Удаляем из базы данных
      const { error } = await supabase
        .from('portfolio_images')
        .delete()
        .eq('id', imageId);

      if (error) throw error;

      setItemImages(itemImages.filter(img => img.id !== imageId));
      
      if (coverImage === imageUrl) {
        setCoverImage(null);
      }

      toast({
        title: 'Удалено',
        description: 'Изображение успешно удалено'
      });
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Ошибка',
        description: error.message
      });
    }
  };

  const handleMoveImage = async (index: number, direction: 'up' | 'down') => {
    const newImages = [...itemImages];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    if (targetIndex < 0 || targetIndex >= newImages.length) return;

    [newImages[index], newImages[targetIndex]] = [newImages[targetIndex], newImages[index]];
    
    // Обновляем sort_order
    const updates = newImages.map((img, idx) => 
      supabase
        .from('portfolio_images')
        .update({ sort_order: idx })
        .eq('id', img.id)
    );

    await Promise.all(updates);
    setItemImages(newImages);
  };

  const handleSetCover = (imageUrl: string) => {
    setCoverImage(imageUrl);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('portfolio_items')
        .update({
          title,
          category,
          cover_image: coverImage
        })
        .eq('id', item.id);

      if (error) throw error;

      toast({
        title: 'Сохранено',
        description: 'Изменения успешно сохранены'
      });
      
      onUpdate();
      onClose();
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Ошибка',
        description: error.message
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Редактирование карточки</DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="max-h-[70vh] pr-4">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Название</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Название услуги"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Категория</Label>
              <Input
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Категория"
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Изображения ({itemImages.length})</Label>
                <Button
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  {isUploading ? 'Загрузка...' : 'Добавить фото'}
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => e.target.files && handleUploadImages(e.target.files)}
                />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {itemImages.map((img, index) => (
                  <div key={img.id} className="relative group border rounded-lg overflow-hidden">
                    <img 
                      src={img.image_url} 
                      alt="" 
                      className="w-full h-40 object-cover"
                    />
                    
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <Button
                        size="sm"
                        variant={coverImage === img.image_url ? 'default' : 'secondary'}
                        onClick={() => handleSetCover(img.image_url)}
                      >
                        <Star className="h-4 w-4" />
                      </Button>
                      
                      {index > 0 && (
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => handleMoveImage(index, 'up')}
                        >
                          <MoveUp className="h-4 w-4" />
                        </Button>
                      )}
                      
                      {index < itemImages.length - 1 && (
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => handleMoveImage(index, 'down')}
                        >
                          <MoveDown className="h-4 w-4" />
                        </Button>
                      )}
                      
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDeleteImage(img.id, img.image_url)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    {coverImage === img.image_url && (
                      <div className="absolute top-2 right-2 bg-primary text-primary-foreground px-2 py-1 rounded text-xs">
                        Обложка
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>

        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={onClose}>
            <X className="h-4 w-4 mr-2" />
            Отмена
          </Button>
          <Button onClick={handleSave} disabled={isSaving}>
            Сохранить
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
