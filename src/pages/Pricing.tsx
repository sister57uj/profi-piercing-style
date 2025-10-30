import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AdminHelper } from "@/components/admin/AdminHelper";
import { EditableText } from "@/components/admin/EditableText";
import { EditableLink } from "@/components/admin/EditableLink";
import { PricingServiceEditor, AddServiceButton } from "@/components/admin/PricingServiceEditor";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Info, Phone } from "lucide-react";
import { useAdmin } from "@/contexts/AdminContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const Pricing = () => {
  const [phoneDialogOpen, setPhoneDialogOpen] = useState(false);
  const [promotionsDialogOpen, setPromotionsDialogOpen] = useState(false);
  const [pageTitle, setPageTitle] = useState("Прайс-лист");
  const [pageDescription, setPageDescription] = useState("Прозрачные цены на все виды пирсинга. Стоимость указана без учета украшений");
  const [services, setServices] = useState<any[]>([]);
  const { isAdmin } = useAdmin();

  useEffect(() => {
    loadContent();
    loadServices();
  }, []);

  const loadContent = async () => {
    const { data } = await supabase
      .from('site_content')
      .select('*')
      .eq('page', 'pricing');

    if (data) {
      data.forEach(item => {
        if (item.content_key === 'page_title') setPageTitle(item.content_value);
        if (item.content_key === 'page_description') setPageDescription(item.content_value);
      });
    }
  };

  const loadServices = async () => {
    const { data, error } = await supabase
      .from('pricing_services')
      .select('*')
      .order('category', { ascending: true })
      .order('sort_order', { ascending: true });

    if (data) {
      setServices(data);
    }
  };

  const groupedServices = services.reduce((acc, service) => {
    if (!acc[service.category]) {
      acc[service.category] = [];
    }
    acc[service.category].push(service);
    return acc;
  }, {} as Record<string, any[]>);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Hero */}
            <div className="text-center mb-16 animate-fade-in">
              <EditableText
                initialValue={pageTitle}
                onSave={setPageTitle}
                page="pricing"
                section="hero"
                contentKey="page_title"
                as="h1"
                className="text-5xl md:text-6xl font-display font-bold mb-6"
              />
              <EditableText
                initialValue={pageDescription}
                onSave={setPageDescription}
                page="pricing"
                section="hero"
                contentKey="page_description"
                multiline
                as="p"
                className="text-xl text-muted-foreground max-w-2xl mx-auto"
              />
            </div>

            {/* Important note */}
            <div className="bg-primary/10 border border-primary/30 rounded-lg p-6 mb-12 animate-fade-in">
              <div className="flex items-start gap-3">
                <Info className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold mb-2">Важная информация</p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Цены указаны за процедуру пирсинга без учета стоимости украшения</li>
                    <li>• Украшения подбираются индивидуально (от 500 до 5000 руб.)</li>
                    <li>• Все цены актуальны на {new Date().toLocaleDateString('ru-RU')}</li>
                    <li>• Актуальные акции и специальные предложения уточняйте у мастера</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Prices */}
            <div className="space-y-12">
              {Object.entries(groupedServices).map(([category, items]: [string, any[]], index) => (
                <div
                  key={category}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <h2 className="text-3xl font-display font-semibold mb-6 text-primary">
                    {category}
                  </h2>
                  <div className="bg-card rounded-lg border border-border overflow-hidden">
                    <div className="divide-y divide-border">
                      {items.map((service) => (
                        isAdmin ? (
                          <PricingServiceEditor
                            key={service.id}
                            service={service}
                            category={category}
                            onSave={loadServices}
                            onDelete={loadServices}
                          />
                        ) : (
                          <div
                            key={service.id}
                            className="flex justify-between items-center p-4 hover:bg-background transition-colors"
                          >
                            <span className="font-medium">{service.name}</span>
                            <span className="text-lg font-semibold text-primary">
                              {service.price === 0 ? 'Бесплатно' : `${service.price} ₽`}
                            </span>
                          </div>
                        )
                      ))}
                    </div>
                    {isAdmin && (
                      <div className="p-4 bg-background/50">
                        <AddServiceButton category={category} onSave={loadServices} />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Jewelry info */}
            <div className="mt-16 mb-12">
              <h2 className="text-3xl font-display font-semibold mb-6 text-center">
                Украшения
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-card p-6 rounded-lg border border-border hover:border-primary transition-all hover-glow text-center">
                  <h3 className="text-xl font-semibold mb-3 text-primary">Базовые</h3>
                  <p className="text-3xl font-semibold mb-2">от 500 ₽</p>
                  <p className="text-sm text-muted-foreground">
                    Качественная хирургическая сталь, титан
                  </p>
                </div>
                
                <div className="bg-card p-6 rounded-lg border border-border hover:border-primary transition-all hover-glow text-center">
                  <h3 className="text-xl font-semibold mb-3 text-primary">Премиум</h3>
                  <p className="text-3xl font-semibold mb-2">от 1500 ₽</p>
                  <p className="text-sm text-muted-foreground">
                    Золото, серебро, биофлекс, с камнями
                  </p>
                </div>
                
                <div className="bg-card p-6 rounded-lg border border-border hover:border-primary transition-all hover-glow text-center">
                  <h3 className="text-xl font-semibold mb-3 text-primary">Эксклюзив</h3>
                  <p className="text-3xl font-semibold mb-2">от 3000 ₽</p>
                  <p className="text-sm text-muted-foreground">
                    Дизайнерские украшения, драгоценные камни
                  </p>
                </div>
              </div>
            </div>

            {/* Promotions reminder */}
            <div className="bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 p-8 rounded-lg border border-primary/30 text-center mb-12">
              <h3 className="text-2xl font-semibold mb-4">Следите за акциями!</h3>
              <p className="text-muted-foreground mb-6">
                Регулярно проводим специальные предложения и ищем моделей для портфолио со скидками до 50%
              </p>
              <Dialog open={promotionsDialogOpen} onOpenChange={setPromotionsDialogOpen}>
                <DialogTrigger asChild>
                  <Button
                    className="bg-primary text-primary-foreground hover:bg-primary/90 hover-glow"
                  >
                    Посмотреть акции
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Акции временно отсутствуют</DialogTitle>
                    <DialogDescription>
                      В данный момент активных акций нет. Следите за обновлениями в наших социальных сетях или свяжитесь с нами для получения актуальной информации.
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>

            {/* CTA */}
            <div className="text-center animate-fade-in">
              <h3 className="text-2xl font-semibold mb-4">
                Остались вопросы по ценам?
              </h3>
              <p className="text-muted-foreground mb-6">
                Свяжитесь с нами для подробной консультации
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <EditableLink
                  initialText="Записаться"
                  initialUrl="https://dikidi.net/1196602"
                  onSave={() => {}}
                  page="pricing"
                  section="cta"
                  contentKey="booking_button"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 hover-glow"
                />
                <Dialog open={phoneDialogOpen} onOpenChange={setPhoneDialogOpen}>
                  <DialogTrigger asChild>
                    <Button
                      size="lg"
                      className="bg-primary text-primary-foreground hover:bg-primary/90 hover-glow"
                    >
                      <Phone className="h-5 w-5" />
                      Позвонить
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Позвоните нам</DialogTitle>
                      <DialogDescription className="text-2xl font-semibold text-foreground pt-4">
                        <a href="tel:+79858504801" className="hover:text-primary transition-colors">
                          +7 (985) 850-48-01
                        </a>
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <AdminHelper />
    </div>
  );
};

export default Pricing;
