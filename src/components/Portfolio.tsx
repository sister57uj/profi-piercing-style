import { useState, useEffect } from "react";
import { EditableText } from "@/components/admin/EditableText";
import { PortfolioItemEditor } from "@/components/admin/PortfolioItemEditor";
import { supabase } from "@/integrations/supabase/client";
import { useAdmin } from "@/contexts/AdminContext";
import { useToast } from "@/hooks/use-toast";
import { Pencil, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  cover_image: string | null;
  sort_order: number;
}

interface PortfolioImage {
  id: string;
  portfolio_item_id: string;
  image_url: string;
  sort_order: number;
}

const Portfolio = () => {
  const [portfolioTitle, setPortfolioTitle] = useState("Наши услуги");
  const [portfolioDescription, setPortfolioDescription] = useState(
    "Красивый пирсинг для каждого. Каждая работа — это уникальное сочетание профессионализма, безопасности и эстетики."
  );
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [images, setImages] = useState<PortfolioImage[]>([]);
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newItemTitle, setNewItemTitle] = useState("");
  const [newItemCategory, setNewItemCategory] = useState("");
  const { isAdmin } = useAdmin();
  const { toast } = useToast();

  useEffect(() => {
    loadContent();
    loadPortfolioItems();
  }, []);

  const loadContent = async () => {
    const { data } = await supabase
      .from('site_content')
      .select('*')
      .eq('page', 'home')
      .eq('section', 'portfolio');

    if (data) {
      const titleContent = data.find(c => c.content_key === 'title');
      const descContent = data.find(c => c.content_key === 'description');
      
      if (titleContent) setPortfolioTitle(titleContent.content_value);
      if (descContent) setPortfolioDescription(descContent.content_value);
    }
  };

  const loadPortfolioItems = async () => {
    const { data: itemsData } = await supabase
      .from('portfolio_items')
      .select('*')
      .order('sort_order');

    const { data: imagesData } = await supabase
      .from('portfolio_images')
      .select('*')
      .order('sort_order');

    if (itemsData) setItems(itemsData);
    if (imagesData) setImages(imagesData);
  };

  const handleAddItem = async () => {
    if (!newItemTitle || !newItemCategory) {
      toast({
        variant: 'destructive',
        title: 'Ошибка',
        description: 'Заполните все поля'
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('portfolio_items')
        .insert({
          title: newItemTitle,
          category: newItemCategory,
          sort_order: items.length
        });

      if (error) throw error;

      toast({
        title: 'Успешно',
        description: 'Новая карточка добавлена'
      });
      
      setShowAddDialog(false);
      setNewItemTitle("");
      setNewItemCategory("");
      loadPortfolioItems();
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Ошибка',
        description: error.message
      });
    }
  };

  const handleDeleteItem = async (itemId: string) => {
    if (!confirm('Удалить эту карточку?')) return;

    try {
      const { error } = await supabase
        .from('portfolio_items')
        .delete()
        .eq('id', itemId);

      if (error) throw error;

      toast({
        title: 'Удалено',
        description: 'Карточка успешно удалена'
      });
      
      loadPortfolioItems();
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Ошибка',
        description: error.message
      });
    }
  };

  return (
    <section className="py-12 sm:py-16 md:py-20 relative overflow-hidden" id="portfolio">
      <div className="container mx-auto px-3 sm:px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-12 md:mb-16 animate-fade-in">
            <EditableText
              initialValue={portfolioTitle}
              onSave={setPortfolioTitle}
              page="home"
              section="portfolio"
              contentKey="title"
              as="h2"
              className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-3 sm:mb-4"
            />
            <EditableText
              initialValue={portfolioDescription}
              onSave={setPortfolioDescription}
              page="home"
              section="portfolio"
              contentKey="description"
              multiline
              as="p"
              className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4"
            />
          </div>

          {isAdmin && (
            <div className="flex justify-center mb-6 sm:mb-8">
              <Button onClick={() => setShowAddDialog(true)} className="touch-manipulation w-full sm:w-auto">
                <Plus className="h-4 w-4 mr-2" />
                Добавить карточку
              </Button>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 mb-8 sm:mb-10 md:mb-12">
            {items.map((item, index) => {
              const itemImages = images.filter(img => img.portfolio_item_id === item.id);
              const displayImage = item.cover_image || itemImages[0]?.image_url;
              
              return (
                <div
                  key={item.id}
                  className="group relative aspect-square bg-background rounded-lg overflow-hidden border border-border hover:border-primary/60 transition-all hover-lift animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {displayImage && (
                    <img 
                      src={displayImage} 
                      alt={`${item.title} - ${item.category}`}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/50 to-transparent opacity-90 group-hover:opacity-95 transition-opacity" />
                  <div className="absolute inset-0 flex flex-col items-center justify-end p-4 sm:p-5 md:p-6 text-center">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-1.5 sm:mb-2 text-foreground group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <span className="text-xs sm:text-sm text-muted-foreground px-2.5 sm:px-3 py-0.5 sm:py-1 bg-card/80 backdrop-blur-sm rounded-full border border-border">
                      {item.category}
                    </span>
                  </div>

                  {isAdmin && (
                    <div className="absolute top-2 right-2 opacity-60 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity flex gap-1.5 sm:gap-2">
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => setEditingItem(item)}
                        className="touch-manipulation h-8 sm:h-9"
                      >
                        <Pencil className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDeleteItem(item.id)}
                        className="touch-manipulation h-8 sm:h-9"
                      >
                        ✕
                      </Button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {editingItem && (
        <PortfolioItemEditor
          item={editingItem}
          images={images.filter(img => img.portfolio_item_id === editingItem.id)}
          isOpen={!!editingItem}
          onClose={() => setEditingItem(null)}
          onUpdate={loadPortfolioItems}
        />
      )}

      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Добавить новую карточку</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Название</Label>
              <Input
                id="title"
                value={newItemTitle}
                onChange={(e) => setNewItemTitle(e.target.value)}
                placeholder="Крыло носа"
              />
            </div>
            <div>
              <Label htmlFor="category">Категория</Label>
              <Input
                id="category"
                value={newItemCategory}
                onChange={(e) => setNewItemCategory(e.target.value)}
                placeholder="Нос"
              />
            </div>
            <Button onClick={handleAddItem} className="w-full">
              Создать
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Portfolio;
