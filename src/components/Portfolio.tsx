import { Button } from "@/components/ui/button";
import { Instagram } from "lucide-react";
import portfolioBg from "@/assets/portfolio-bg.jpg";

const Portfolio = () => {
  const works = [
    { title: "Крыло носа", category: "Нос" },
    { title: "Септум", category: "Нос" },
    { title: "Пирсинг брови", category: "Лицо" },
    { title: "Индастриал", category: "Ухо" },
    { title: "Губа", category: "Лицо" },
    { title: "Микродермалы", category: "Тело" }
  ];

  return (
    <section className="py-20 bg-background relative overflow-hidden" id="portfolio">
      {/* Background with portfolio image */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{ 
          backgroundImage: `url(${portfolioBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(10px)'
        }}
      />
      
      {/* Gaming grid overlay */}
      <div className="absolute inset-0 gaming-grid opacity-20" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bebas mb-4">
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
                className="group relative aspect-square bg-card rounded-lg overflow-hidden border border-primary/30 hover:border-primary/60 transition-all hover-glow animate-fade-in backdrop-blur-sm"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20" />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                  <h3 className="text-2xl font-bebas mb-2 gradient-text-pink group-hover:scale-110 transition-transform tracking-wide">
                    {work.title}
                  </h3>
                  <span className="text-sm text-muted-foreground px-3 py-1 bg-background/50 rounded-full border border-primary/30">
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
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
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
