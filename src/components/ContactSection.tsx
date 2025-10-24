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
    <section className="py-12 sm:py-16 md:py-20 bg-card" id="contacts">
      <div className="container mx-auto px-3 sm:px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-12 md:mb-16 animate-fade-in">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bebas mb-3 sm:mb-4">
              Контакты
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
              Свяжитесь с нами удобным способом или посетите нашу студию
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
            {/* Контактная информация */}
            <div className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                {contactInfo.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.title}
                      className="bg-background p-3 sm:p-4 md:p-6 rounded-lg border border-border hover:border-primary transition-all hover-glow animate-fade-in text-center"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <Icon className={`h-6 w-6 sm:h-8 sm:w-8 ${item.color} mx-auto mb-2 sm:mb-4`} />
                      <h3 className="font-bebas text-base sm:text-lg md:text-xl mb-1 sm:mb-2">{item.title}</h3>
                      <p className="text-xs sm:text-sm md:text-base text-foreground mb-0.5 sm:mb-1">{item.content}</p>
                      {item.subContent && (
                        <p className="text-xs sm:text-sm text-muted-foreground">{item.subContent}</p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Форма записи Dikidi */}
            <div className="bg-background p-4 sm:p-6 rounded-lg border border-border animate-fade-in">
              <h3 className="font-bebas text-xl sm:text-2xl mb-3 sm:mb-4 text-center">Онлайн запись</h3>
              <div className="aspect-[9/16] w-full rounded-lg overflow-hidden min-h-[500px]">
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
          <div className="bg-background p-3 sm:p-4 rounded-lg border border-border animate-fade-in">
            <div className="aspect-video w-full rounded-lg overflow-hidden min-h-[250px] sm:min-h-[350px]">
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

          <div className="mt-6 sm:mt-8 text-center px-4">
            <p className="text-xs sm:text-sm text-muted-foreground">
              Работаем только по предварительной записи. Записывайтесь заранее!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
