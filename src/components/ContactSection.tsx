import { MapPin, Phone, Mail, Clock } from "lucide-react";

const ContactSection = () => {
  const contactInfo = [
    {
      icon: MapPin,
      title: "Адрес",
      content: "ул. Рязанский проспект 30/15",
      subContent: "Москва, м. Окская",
      color: "text-primary"
    },
    {
      icon: Phone,
      title: "Телефон",
      content: "+7 985 850-48-01",
      subContent: "WhatsApp / Telegram",
      color: "text-primary"
    },
    {
      icon: Mail,
      title: "Email",
      content: "Studio.p.t@yandex.ru",
      subContent: "Ekaterina.v_1996@mail.ru",
      color: "text-accent"
    },
    {
      icon: Clock,
      title: "Часы работы",
      content: "Пн-Вс: 12:00 — 21:00",
      subContent: "Только по записи",
      color: "text-primary"
    }
  ];

  return (
    <section className="py-20 bg-card" id="contacts">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bebas mb-4">
              Контакты
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Свяжитесь с нами удобным способом или посетите нашу студию
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Контактная информация */}
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {contactInfo.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.title}
                      className="bg-background p-6 rounded-lg border border-border hover:border-primary transition-all hover-glow animate-fade-in text-center"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <Icon className={`h-8 w-8 ${item.color} mx-auto mb-4`} />
                      <h3 className="font-bebas text-xl mb-2">{item.title}</h3>
                      <p className="text-foreground mb-1">{item.content}</p>
                      {item.subContent && (
                        <p className="text-sm text-muted-foreground">{item.subContent}</p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Форма записи Dikidi */}
            <div className="bg-background p-6 rounded-lg border border-border animate-fade-in">
              <h3 className="font-bebas text-2xl mb-4 text-center">Онлайн запись</h3>
              <div className="aspect-[9/16] w-full rounded-lg overflow-hidden">
                <iframe
                  src="https://dikidi.net/1196602"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  className="w-full h-full"
                  title="Форма онлайн записи Dikidi"
                />
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="bg-background p-4 rounded-lg border border-border animate-fade-in">
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

          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              Работаем только по предварительной записи. Записывайтесь заранее!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
