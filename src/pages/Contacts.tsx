import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AdminHelper } from "@/components/admin/AdminHelper";
import { useState, useEffect } from "react";
import { EditableText } from "@/components/admin/EditableText";
import { EditableLink } from "@/components/admin/EditableLink";
import { AddTextBlockButton } from "@/components/admin/AddTextBlockButton";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import instagramIcon from "@/assets/instagram-icon.webp";
import telegramIcon from "@/assets/telegram-icon.webp";
import vkIcon from "@/assets/vk-icon.png";

const Contacts = () => {
  const [pageTitle, setPageTitle] = useState("Контакты");
  const [pageDescription, setPageDescription] = useState("Свяжитесь с нами удобным способом");
  const [showPhoneDialog, setShowPhoneDialog] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  const [address1, setAddress1] = useState("ул. Рязанский проспект 30/15");
  const [address2, setAddress2] = useState("Москва, м. Окская");
  const [phone, setPhone] = useState("+7 985 850-48-01");
  const [phoneNote, setPhoneNote] = useState("WhatsApp / Telegram");
  const [email1, setEmail1] = useState("Studio.p.t@yandex.ru");
  const [email2, setEmail2] = useState("Ekaterina.v_1996@mail.ru");
  const [hours1, setHours1] = useState("Понедельник — Воскресенье");
  const [hours2, setHours2] = useState("12:00 — 21:00");
  const [hoursNote, setHoursNote] = useState("Только по записи");
  
  const [instagramUrl, setInstagramUrl] = useState("https://instagram.com/piercing_profi_ekaterina?igsh=MWtrcXNycjhzNmo4bw==");
  const [telegramUrl, setTelegramUrl] = useState("https://t.me/piercing_prof");
  const [vkUrl, setVkUrl] = useState("https://vk.com/piercing_profi24");

  useEffect(() => {
    loadContent();
    const checkMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
    setIsMobile(checkMobile);
  }, []);

  const loadContent = async () => {
    const { data } = await supabase
      .from('site_content')
      .select('*')
      .eq('page', 'contacts');

    if (data) {
      data.forEach(item => {
        if (item.content_key === 'page_title') setPageTitle(item.content_value);
        if (item.content_key === 'page_description') setPageDescription(item.content_value);
        if (item.content_key === 'address_1') setAddress1(item.content_value);
        if (item.content_key === 'address_2') setAddress2(item.content_value);
        if (item.content_key === 'phone') setPhone(item.content_value);
        if (item.content_key === 'phone_note') setPhoneNote(item.content_value);
        if (item.content_key === 'email_1') setEmail1(item.content_value);
        if (item.content_key === 'email_2') setEmail2(item.content_value);
        if (item.content_key === 'hours_1') setHours1(item.content_value);
        if (item.content_key === 'hours_2') setHours2(item.content_value);
        if (item.content_key === 'hours_note') setHoursNote(item.content_value);
        if (item.content_key === 'instagram_url') setInstagramUrl(item.content_value);
        if (item.content_key === 'telegram_url') setTelegramUrl(item.content_value);
        if (item.content_key === 'vk_url') setVkUrl(item.content_value);
      });
    }
  };

  const handleCallClick = (e: React.MouseEvent) => {
    if (!isMobile) {
      e.preventDefault();
      setShowPhoneDialog(true);
    }
  };

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
                page="contacts"
                section="hero"
                contentKey="page_title"
                as="h1"
                className="text-5xl md:text-6xl font-display font-bold mb-6"
              />
              <EditableText
                initialValue={pageDescription}
                onSave={setPageDescription}
                page="contacts"
                section="hero"
                contentKey="page_description"
                as="p"
                className="text-xl text-muted-foreground max-w-2xl mx-auto"
              />
            </div>

            <div className="max-w-2xl mx-auto mb-16">
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
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-1">Адрес</h3>
                        <div className="text-muted-foreground">
                          <EditableText
                            initialValue={address1}
                            onSave={setAddress1}
                            page="contacts"
                            section="info"
                            contentKey="address_1"
                            as="p"
                          />
                          <EditableText
                            initialValue={address2}
                            onSave={setAddress2}
                            page="contacts"
                            section="info"
                            contentKey="address_2"
                            as="p"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <Phone className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-1">Телефон</h3>
                        <div className="text-muted-foreground">
                          <a href={`tel:${phone.replace(/\s/g, '')}`} className="hover:text-primary transition-colors">
                            <EditableText
                              initialValue={phone}
                              onSave={setPhone}
                              page="contacts"
                              section="info"
                              contentKey="phone"
                              as="span"
                            />
                          </a>
                          <br />
                          <span className="text-sm">
                            <EditableText
                              initialValue={phoneNote}
                              onSave={setPhoneNote}
                              page="contacts"
                              section="info"
                              contentKey="phone_note"
                              as="span"
                            />
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 rounded-lg bg-accent/20 flex items-center justify-center flex-shrink-0">
                        <Mail className="h-6 w-6 text-accent" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-1">Email</h3>
                        <div className="text-muted-foreground">
                          <a href={`mailto:${email1}`} className="hover:text-primary transition-colors">
                            <EditableText
                              initialValue={email1}
                              onSave={setEmail1}
                              page="contacts"
                              section="info"
                              contentKey="email_1"
                              as="span"
                            />
                          </a>
                          <br />
                          <a href={`mailto:${email2}`} className="hover:text-primary transition-colors">
                            <EditableText
                              initialValue={email2}
                              onSave={setEmail2}
                              page="contacts"
                              section="info"
                              contentKey="email_2"
                              as="span"
                            />
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <Clock className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-1">Часы работы</h3>
                        <div className="text-muted-foreground">
                          <EditableText
                            initialValue={hours1}
                            onSave={setHours1}
                            page="contacts"
                            section="info"
                            contentKey="hours_1"
                            as="p"
                          />
                          <EditableText
                            initialValue={hours2}
                            onSave={setHours2}
                            page="contacts"
                            section="info"
                            contentKey="hours_2"
                            as="p"
                          />
                          <span className="text-sm text-primary">
                            <EditableText
                              initialValue={hoursNote}
                              onSave={setHoursNote}
                              page="contacts"
                              section="info"
                              contentKey="hours_note"
                              as="span"
                            />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Social */}
                <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
                  <h3 className="font-semibold text-lg mb-4">Мы в соцсетях</h3>
                  <div className="flex gap-4">
                    <a
                      href={instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-12 w-12 hover:scale-110 transition-all"
                    >
                      <img src={instagramIcon} alt="Instagram" className="w-full h-full object-cover rounded-lg" />
                    </a>
                    <a
                      href={telegramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-12 w-12 hover:scale-110 transition-all"
                    >
                      <img src={telegramIcon} alt="Telegram" className="w-full h-full object-cover rounded-full" />
                    </a>
                    <a
                      href={vkUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-12 w-12 hover:scale-110 transition-all"
                    >
                      <img src={vkIcon} alt="VK" className="w-full h-full object-cover rounded-lg" />
                    </a>
                  </div>
                  <div className="mt-2 text-xs text-muted-foreground space-y-1">
                    <EditableText
                      initialValue={instagramUrl}
                      onSave={setInstagramUrl}
                      page="contacts"
                      section="social"
                      contentKey="instagram_url"
                      as="p"
                      className="text-xs"
                    />
                    <EditableText
                      initialValue={telegramUrl}
                      onSave={setTelegramUrl}
                      page="contacts"
                      section="social"
                      contentKey="telegram_url"
                      as="p"
                      className="text-xs"
                    />
                    <EditableText
                      initialValue={vkUrl}
                      onSave={setVkUrl}
                      page="contacts"
                      section="social"
                      contentKey="vk_url"
                      as="p"
                      className="text-xs"
                    />
                  </div>
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

            {/* Add custom text block */}
            <div className="mt-8">
              <AddTextBlockButton
                page="contacts"
                section="custom"
                onAdd={loadContent}
                buttonText="Добавить информационный блок"
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <AdminHelper />

      {/* Phone Dialog for Desktop */}
      <Dialog open={showPhoneDialog} onOpenChange={setShowPhoneDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Позвоните нам</DialogTitle>
          </DialogHeader>
          <div className="flex items-center justify-center p-6">
            <a
              href="tel:+79858504801"
              className="text-2xl font-semibold text-primary hover:text-primary/80 transition-colors"
            >
              +7 (985) 850-48-01
            </a>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Contacts;
