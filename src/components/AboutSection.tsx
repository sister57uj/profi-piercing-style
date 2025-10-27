import { Shield, Award, Sparkles } from "lucide-react";
import { useState } from "react";
import { EditableText } from "./admin/EditableText";

const AboutSection = () => {
  const [aboutTitle, setAboutTitle] = useState("О студии");
  const [aboutDescription, setAboutDescription] = useState(
    "С 2017 года «Пирсинг Профи» создает безопасный и стильный пирсинг. Наши мастера с медицинским образованием и сертификацией работают с одноразовыми инструментами, вскрывая упаковки при вас."
  );

  const features = [
    {
      icon: Shield,
      title: "Безопасно",
      description: "Химическая и термическая стерилизация, одноразовые иглы и перчатки. Вскрываем упаковки при вас.",
      colorClass: "text-primary",
      gradientClass: "gradient-card-pink"
    },
    {
      icon: Award,
      title: "Качественно",
      description: "Сертифицированные мастера с медицинским образованием. Эксперты НТВ в проекте 'Чудо техники' (2018).",
      colorClass: "text-secondary",
      gradientClass: "gradient-card-purple"
    },
    {
      icon: Sparkles,
      title: "Красиво",
      description: "Эксклюзивные украшения, индивидуальный подход. Создаем пирсинг, который подчеркнет вашу уникальность.",
      colorClass: "text-accent",
      gradientClass: "gradient-card-cyan"
    }
  ];

  return (
    <section className="py-8 sm:py-12 md:py-16 bg-card" id="about">
      <div className="container mx-auto px-3 sm:px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-6 sm:mb-8 md:mb-12 animate-fade-in">
            <EditableText
              initialValue={aboutTitle}
              onSave={setAboutTitle}
              page="about"
              section="about"
              contentKey="title"
              as="h2"
              className="text-2xl sm:text-3xl md:text-4xl font-bebas mb-2 sm:mb-3"
            />
            <EditableText
              initialValue={aboutDescription}
              onSave={setAboutDescription}
              page="about"
              section="about"
              contentKey="description"
              multiline
              as="p"
              className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto px-2"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
              <div
                key={feature.title}
                className="p-4 sm:p-5 md:p-6 rounded-lg bg-card/50 border border-primary/30 hover:border-primary/60 hover-glow animate-fade-in"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="mb-2 sm:mb-3">
                  <Icon className={`h-8 w-8 sm:h-10 sm:w-10 ${feature.colorClass}`} />
                </div>
                <h3 className={`text-lg sm:text-xl font-bebas mb-1 sm:mb-2 tracking-wide ${feature.colorClass}`}>
                  {feature.title}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
              );
            })}
          </div>

          {/* Additional info */}
          <div className="mt-6 sm:mt-8 md:mt-12 text-center p-4 sm:p-5 md:p-6 bg-background rounded-lg border border-primary/20">
            <p className="text-sm sm:text-base mb-2 sm:mb-3">
              Мы — эксперты НТВ в проекте «Чудо техники» (2018)
            </p>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Наша студия была представлена как образец профессионального подхода к пирсингу в России
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
