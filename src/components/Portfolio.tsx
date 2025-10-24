import { Button } from "@/components/ui/button";
import { Instagram } from "lucide-react";
import nostrilPiercing from "@/assets/nostril-piercing.jpg";
import septumPiercing from "@/assets/septum-piercing.jpg";
import nasallangPiercing from "@/assets/nasallang-piercing.jpg";
import bridgePiercing from "@/assets/bridge-piercing.jpg";
import eyebrowPiercing from "@/assets/eyebrow-new.jpg";
import antiEyebrowPiercing from "@/assets/anti-eyebrow-piercing.jpg";
import lipPiercing from "@/assets/lip-new.jpg";
import cheekPiercing from "@/assets/cheek-piercing.jpg";
import lobePiercing from "@/assets/lobe-piercing.jpg";
import helixPiercing from "@/assets/helix-piercing.jpg";
import industrialPiercing from "@/assets/industrial-new.jpg";
import tragusPiercing from "@/assets/tragus-piercing.jpg";
import daithPiercing from "@/assets/daith-piercing.jpg";
import rookPiercing from "@/assets/rook-piercing.jpg";
import navelPiercing from "@/assets/navel-piercing.jpg";
import microdermalPiercing from "@/assets/microdermal-new.jpg";
import nipplePiercing from "@/assets/nipple-piercing.jpg";
import intimatePiercing from "@/assets/intimate-piercing.jpg";

const Portfolio = () => {
  const works = [
    { title: "Крыло носа", category: "Нос", image: nostrilPiercing },
    { title: "Септум", category: "Нос", image: septumPiercing },
    { title: "Nasallang", category: "Нос", image: nasallangPiercing },
    { title: "Бридж", category: "Лицо", image: bridgePiercing },
    { title: "Бровь", category: "Лицо", image: eyebrowPiercing },
    { title: "Anti-eyebrow", category: "Лицо", image: antiEyebrowPiercing },
    { title: "Губа", category: "Лицо", image: lipPiercing },
    { title: "Щека", category: "Лицо", image: cheekPiercing },
    { title: "Мочка уха", category: "Ухо", image: lobePiercing },
    { title: "Хеликс", category: "Ухо", image: helixPiercing },
    { title: "Индастриал", category: "Ухо", image: industrialPiercing },
    { title: "Трагус", category: "Ухо", image: tragusPiercing },
    { title: "Дэйс", category: "Ухо", image: daithPiercing },
    { title: "Рук", category: "Ухо", image: rookPiercing },
    { title: "Пупок", category: "Тело", image: navelPiercing },
    { title: "Микродермалы", category: "Тело", image: microdermalPiercing },
    { title: "Соски", category: "Тело", image: nipplePiercing },
    { title: "Интимный пирсинг", category: "Тело", image: intimatePiercing }
  ];

  return (
    <section className="py-20 bg-card relative overflow-hidden" id="portfolio">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Наши услуги
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
              Смотрите больше наших работ в наших соц. сетях
            </p>
            <a
              href="https://vk.com/piercing_prof"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 hover:bg-primary hover:text-primary-foreground border-2 border-primary transition-all hover:scale-110"
            >
              <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.07 2H8.93C3.33 2 2 3.33 2 8.93v6.14C2 20.67 3.33 22 8.93 22h6.14c5.6 0 6.93-1.33 6.93-6.93V8.93C22 3.33 20.67 2 15.07 2zm3.11 14.75h-1.41c-.46 0-.6-.36-1.42-1.18-.72-.72-1.03-.81-1.21-.81-.25 0-.32.07-.32.41v1.08c0 .29-.09.46-1.12.46-1.52 0-3.21-.92-4.39-2.64-1.77-2.52-2.26-4.41-2.26-4.8 0-.18.07-.35.41-.35h1.41c.31 0 .42.14.54.47.61 1.75 1.63 3.29 2.05 3.29.16 0 .23-.07.23-.48v-1.87c-.05-.87-.51-1-.51-1.33 0-.14.12-.28.31-.28h2.22c.26 0 .35.13.35.44v2.53c0 .26.11.35.19.35.16 0 .28-.09.57-.38 1.07-1.16 1.84-2.92 1.84-2.92.1-.2.24-.35.55-.35h1.41c.34 0 .42.17.34.44-.16.72-.75 1.75-1.43 2.71-.29.41-.39.61 0 1.07.29.35.79.76 1.19 1.21.7.7 1.23 1.28 1.38 1.69.14.41-.08.61-.49.61z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
