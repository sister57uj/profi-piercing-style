import { Button } from "@/components/ui/button";
import { Instagram } from "lucide-react";
import nostrilPiercing from "@/assets/nostril-piercing.jpg";
import septumPiercing from "@/assets/septum-piercing.jpg";
import eyebrowPiercing from "@/assets/eyebrow-piercing.jpg";
import industrialPiercing from "@/assets/industrial-piercing.jpg";
import lipPiercing from "@/assets/lip-piercing.jpg";
import microdermalPiercing from "@/assets/microdermal-piercing.jpg";

const Portfolio = () => {
  const works = [
    { title: "Крыло носа", category: "Нос", image: nostrilPiercing },
    { title: "Септум", category: "Нос", image: septumPiercing },
    { title: "Пирсинг брови", category: "Лицо", image: eyebrowPiercing },
    { title: "Индастриал", category: "Ухо", image: industrialPiercing },
    { title: "Губа", category: "Лицо", image: lipPiercing },
    { title: "Микродермалы", category: "Тело", image: microdermalPiercing }
  ];

  return (
    <section className="py-20 bg-card relative overflow-hidden" id="portfolio">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Наши работы
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Красивый пирсинг для каждого. Каждая работа — это уникальное сочетание 
              профессионализма, безопасности и эстетики.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {works.map((work, index) => (
              <div
                key={work.title}
                className="group relative aspect-square bg-background rounded-lg overflow-hidden border border-border hover:border-primary/60 transition-all hover-lift animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <img 
                  src={work.image} 
                  alt={`${work.title} - ${work.category}`}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/50 to-transparent opacity-90 group-hover:opacity-95 transition-opacity" />
                <div className="absolute inset-0 flex flex-col items-center justify-end p-6 text-center">
                  <h3 className="text-2xl font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">
                    {work.title}
                  </h3>
                  <span className="text-sm text-muted-foreground px-3 py-1 bg-card/80 backdrop-blur-sm rounded-full border border-border">
                    {work.category}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <p className="text-muted-foreground mb-6">
              Смотрите больше наших работ в Instagram
            </p>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-full"
            >
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="mr-2 h-5 w-5" />
                Посмотреть портфолио
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
