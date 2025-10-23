import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroBg from "@/assets/hero-bg-new.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background image with blur */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: `url(${heroBg})`,
          filter: 'blur(8px)',
          transform: 'scale(1.1)'
        }}
      />
      
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-background/80" />
      
      {/* Gaming grid overlay */}
      <div className="absolute inset-0 gaming-grid opacity-30" />
      
      {/* Animated accent lines */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-accent rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bebas leading-tight tracking-wider glitch">
            Пирсинг Профи
          </h1>
          
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            <p className="text-3xl md:text-5xl font-bebas gradient-text-pink">
              Безопасно.
            </p>
            <p className="text-3xl md:text-5xl font-bebas gradient-text-purple">
              Качественно.
            </p>
            <p className="text-3xl md:text-5xl font-bebas gradient-text-cyan">
              Красиво.
            </p>
          </div>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Профессиональный пирсинг в Москве. Создаем твой стиль с заботой о здоровье с 2017 года
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button
              asChild
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 hover-glow text-lg px-8"
            >
              <a href="https://wa.me/79858504801">
                Записаться на сеанс
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground text-lg px-8"
            >
              <a href="#portfolio">Портфолио</a>
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 max-w-3xl mx-auto">
            <div className="space-y-2 p-6 rounded-lg bg-card/50 border border-primary/30 hover-glow backdrop-blur-sm">
              <div className="text-3xl font-bebas text-primary">2017</div>
              <div className="text-sm text-muted-foreground">Работаем с</div>
            </div>
            <div className="space-y-2 p-6 rounded-lg bg-card/50 border border-primary/30 hover-glow backdrop-blur-sm">
              <div className="text-3xl font-bebas text-secondary">100%</div>
              <div className="text-sm text-muted-foreground">Стерильность</div>
            </div>
            <div className="space-y-2 p-6 rounded-lg bg-card/50 border border-primary/30 hover-glow backdrop-blur-sm">
              <div className="text-3xl font-bebas text-accent">НТВ</div>
              <div className="text-sm text-muted-foreground">Эксперты</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-primary rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
