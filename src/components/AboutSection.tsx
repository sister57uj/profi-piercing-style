import { Shield, Award, Sparkles } from "lucide-react";

const AboutSection = () => {
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
    <section className="py-20 bg-card" id="about">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bebas mb-4">
              О студии
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              С 2017 года «Пирсинг Профи» создает безопасный и стильный пирсинг. 
              Наши мастера с медицинским образованием и сертификацией работают с 
              одноразовыми инструментами, вскрывая упаковки при вас.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
              <div
                key={feature.title}
                className={`p-8 rounded-lg ${feature.gradientClass} hover-glow animate-fade-in`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="mb-4">
                  <Icon className={`h-12 w-12 ${feature.colorClass}`} />
                </div>
                <h3 className={`text-2xl font-bebas mb-3 ${feature.colorClass}`}>
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </div>
              );
            })}
          </div>

          {/* Additional info */}
          <div className="mt-16 text-center p-8 bg-background rounded-lg border border-primary/20">
            <p className="text-lg mb-4">
              Мы — эксперты НТВ в проекте «Чудо техники» (2018)
            </p>
            <p className="text-muted-foreground">
              Наша студия была представлена как образец профессионального подхода к пирсингу в России
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
