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
    <section className="py-12 sm:py-16 md:py-20 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-64 h-64 sm:w-96 sm:h-96 bg-primary rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-64 h-64 sm:w-96 sm:h-96 bg-accent rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      <div className="container mx-auto px-3 sm:px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 sm:mb-10 md:mb-12 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-primary/10 border border-primary rounded-full mb-3 sm:mb-4">
              <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
              <span className="text-xs sm:text-sm font-semibold text-primary">Акция</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bebas mb-3 sm:mb-4 gradient-text-pink px-4">
              Специальное предложение
            </h2>
            <p className="text-base sm:text-lg text-foreground mb-2 px-4">
              Ищем моделей на пирсинг!
            </p>
            <p className="text-sm sm:text-base text-muted-foreground px-4">
              Пирсинг крыла носа, септума, брови и других зон со скидкой. 
              Количество мест ограничено!
            </p>
          </div>

          <div className="bg-card p-4 sm:p-6 md:p-8 rounded-lg border border-primary/20 animate-fade-in">
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 md:space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm sm:text-base">Ваше имя</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Введите ваше имя"
                    required
                    className="bg-background border-border focus:border-primary text-base h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm sm:text-base">Телефон</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+7 (___) ___-__-__"
                    required
                    className="bg-background border-border focus:border-primary text-base h-11"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="service" className="text-sm sm:text-base">Вид пирсинга</Label>
                <Input
                  id="service"
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  placeholder="Например: крыло носа, септум, бровь"
                  required
                  className="bg-background border-border focus:border-primary text-base h-11"
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 hover-glow text-base h-12"
              >
                Записаться на акцию
              </Button>

              <p className="text-xs sm:text-sm text-muted-foreground text-center">
                После отправки формы мы перенаправим вас в WhatsApp для подтверждения записи
              </p>
            </form>
          </div>

          <div className="mt-6 sm:mt-8 text-center text-xs sm:text-sm text-muted-foreground px-4">
            <p>Актуальные условия акций уточняйте у мастера</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Promotions;
