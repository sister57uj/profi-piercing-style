import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Sparkles } from "lucide-react";

const Promotions = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    service: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Формируем сообщение для WhatsApp
    const message = `Новая заявка на акцию!\n\nИмя: ${formData.name}\nТелефон: ${formData.phone}\nВид пирсинга: ${formData.service}`;
    const whatsappUrl = `https://wa.me/79858504801?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
    
    toast.success("Перенаправляем в WhatsApp для записи!");
    
    setFormData({ name: "", phone: "", service: "" });
  };

  return (
    <section className="py-20 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary rounded-full mb-4">
              <Sparkles className="h-5 w-5 text-primary" />
              <span className="text-sm font-semibold text-primary">Акция</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bebas mb-4 neon-text-pink">
              Специальное предложение
            </h2>
            <p className="text-lg text-foreground mb-2">
              Ищем моделей на пирсинг!
            </p>
            <p className="text-muted-foreground">
              Пирсинг крыла носа, септума, брови и других зон со скидкой. 
              Количество мест ограничено!
            </p>
          </div>

          <div className="bg-card p-8 rounded-lg border border-primary/20 animate-fade-in">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Ваше имя</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Введите ваше имя"
                    required
                    className="bg-background border-border focus:border-primary"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Телефон</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+7 (___) ___-__-__"
                    required
                    className="bg-background border-border focus:border-primary"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="service">Вид пирсинга</Label>
                <Input
                  id="service"
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  placeholder="Например: крыло носа, септум, бровь"
                  required
                  className="bg-background border-border focus:border-primary"
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 hover-glow"
              >
                Записаться на акцию
              </Button>

              <p className="text-sm text-muted-foreground text-center">
                После отправки формы мы перенаправим вас в WhatsApp для подтверждения записи
              </p>
            </form>
          </div>

          <div className="mt-8 text-center text-sm text-muted-foreground">
            <p>Актуальные условия акций уточняйте у мастера</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Promotions;
