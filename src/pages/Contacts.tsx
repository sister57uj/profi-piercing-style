import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock, Instagram, Send } from "lucide-react";
import { SiVk } from "react-icons/si";
import { toast } from "sonner";

const Contacts = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const message = `Новое сообщение с сайта!\n\nИмя: ${formData.name}\nТелефон: ${formData.phone}\nСообщение: ${formData.message}`;
    const whatsappUrl = `https://wa.me/79858504801?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
    
    toast.success("Перенаправляем в WhatsApp!");
    
    setFormData({ name: "", phone: "", message: "" });
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Hero */}
            <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
              Контакты
            </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Свяжитесь с нами удобным способом или приходите в студию
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
              {/* Contact info */}
              <div className="space-y-8">
                <div className="animate-fade-in">
                  <h2 className="text-3xl font-display font-semibold mb-6 text-primary">
                    Информация
                  </h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <MapPin className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-1">Адрес</h3>
                        <p className="text-muted-foreground">
                          ул. Рязанский проспект 30/15<br />
                          Москва, м. Окская
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <Phone className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-1">Телефон</h3>
                        <p className="text-muted-foreground">
                          <a href="tel:+79858504801" className="hover:text-primary transition-colors">
                            +7 985 850-48-01
                          </a><br />
                          <span className="text-sm">WhatsApp / Telegram</span>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 rounded-lg bg-accent/20 flex items-center justify-center flex-shrink-0">
                        <Mail className="h-6 w-6 text-accent" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-1">Email</h3>
                        <p className="text-muted-foreground">
                          <a href="mailto:Studio.p.t@yandex.ru" className="hover:text-primary transition-colors">
                            Studio.p.t@yandex.ru
                          </a><br />
                          <a href="mailto:Ekaterina.v_1996@mail.ru" className="hover:text-primary transition-colors">
                            Ekaterina.v_1996@mail.ru
                          </a>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <Clock className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-1">Часы работы</h3>
                        <p className="text-muted-foreground">
                          Понедельник — Воскресенье<br />
                          12:00 — 21:00<br />
                          <span className="text-sm text-primary">Только по записи</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Social */}
                <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
                  <h3 className="font-semibold text-lg mb-4">Мы в соцсетях</h3>
                  <div className="flex gap-4">
                    <a
                      href="https://instagram.com/piercing_profi_ekaterina?igsh=MWtrcXNycjhzNmo4bw=="
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-12 w-12 rounded-lg bg-gradient-to-br from-[#f09433] via-[#e6683c] to-[#bc1888] flex items-center justify-center hover:scale-110 transition-all"
                    >
                      <Instagram className="h-6 w-6 text-white" />
                    </a>
                    <a
                      href="https://t.me/piercing_prof"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-12 w-12 rounded-lg bg-[#0088cc] flex items-center justify-center hover:scale-110 transition-all"
                    >
                      <Send className="h-6 w-6 text-white" />
                    </a>
                    <a
                      href="https://vk.com/piercing_profi24"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-12 w-12 rounded-lg bg-[#0077FF] flex items-center justify-center hover:scale-110 transition-all"
                    >
                      <SiVk className="h-6 w-6 text-white" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Contact form */}
              <div className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
                <h2 className="text-3xl font-display font-semibold mb-6 text-primary">
                  Напишите нам
                </h2>
                <div className="bg-card p-8 rounded-lg border border-border">
                  <form onSubmit={handleSubmit} className="space-y-6">
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

                    <div className="space-y-2">
                      <Label htmlFor="message">Сообщение</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Расскажите, чем мы можем вам помочь"
                        required
                        rows={5}
                        className="bg-background border-border focus:border-primary resize-none"
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90 hover-glow"
                    >
                      Отправить сообщение
                    </Button>

                    <p className="text-sm text-muted-foreground text-center">
                      После отправки формы мы перенаправим вас в WhatsApp
                    </p>
                  </form>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="animate-fade-in">
              <h2 className="text-3xl font-display font-semibold mb-6 text-center">
                Как нас найти
              </h2>
              <div className="bg-card p-4 rounded-lg border border-border">
                <div className="aspect-video w-full rounded-lg overflow-hidden">
                  <iframe
                    src="https://yandex.ru/map-widget/v1/?ll=37.801917%2C55.705556&z=16&l=map&pt=37.801917,55.705556,pm2rdm"
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    className="w-full h-full"
                    title="Карта студии Пирсинг Профи - Рязанский проспект 30/15"
                  />
                </div>
              </div>
              <div className="text-center mt-6">
                <p className="text-muted-foreground">
                  Студия находится в 5 минутах от метро Окская.<br />
                  Удобная транспортная доступность и парковка рядом.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contacts;
