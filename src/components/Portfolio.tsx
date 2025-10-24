import { useState } from "react";
import { EditableText } from "@/components/admin/EditableText";
import { PortfolioManager } from "@/components/admin/PortfolioManager";
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
  const [portfolioTitle, setPortfolioTitle] = useState("Наши услуги");
  const [portfolioDescription, setPortfolioDescription] = useState(
    "Красивый пирсинг для каждого. Каждая работа — это уникальное сочетание профессионализма, безопасности и эстетики."
  );

  const initialWorks = [
    { id: "1", title: "Крыло носа", category: "Нос", image: nostrilPiercing },
    { id: "2", title: "Септум", category: "Нос", image: septumPiercing },
    { id: "3", title: "Nasallang", category: "Нос", image: nasallangPiercing },
    { id: "4", title: "Бридж", category: "Лицо", image: bridgePiercing },
    { id: "5", title: "Бровь", category: "Лицо", image: eyebrowPiercing },
    { id: "6", title: "Anti-eyebrow", category: "Лицо", image: antiEyebrowPiercing },
    { id: "7", title: "Губа", category: "Лицо", image: lipPiercing },
    { id: "8", title: "Щека", category: "Лицо", image: cheekPiercing },
    { id: "9", title: "Мочка уха", category: "Ухо", image: lobePiercing },
    { id: "10", title: "Хеликс", category: "Ухо", image: helixPiercing },
    { id: "11", title: "Индастриал", category: "Ухо", image: industrialPiercing },
    { id: "12", title: "Трагус", category: "Ухо", image: tragusPiercing },
    { id: "13", title: "Дэйс", category: "Ухо", image: daithPiercing },
    { id: "14", title: "Рук", category: "Ухо", image: rookPiercing },
    { id: "15", title: "Пупок", category: "Тело", image: navelPiercing },
    { id: "16", title: "Микродермалы", category: "Тело", image: microdermalPiercing },
    { id: "17", title: "Соски", category: "Тело", image: nipplePiercing },
    { id: "18", title: "Интимный пирсинг", category: "Тело", image: intimatePiercing }
  ];

  const [works, setWorks] = useState(initialWorks);

  return (
    <section className="py-20 relative overflow-hidden" id="portfolio">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <EditableText
              initialValue={portfolioTitle}
              onSave={setPortfolioTitle}
              page="home"
              section="portfolio"
              contentKey="title"
              as="h2"
              className="text-4xl md:text-5xl font-display font-bold mb-4"
            />
            <EditableText
              initialValue={portfolioDescription}
              onSave={setPortfolioDescription}
              page="home"
              section="portfolio"
              contentKey="description"
              multiline
              as="p"
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
            />
          </div>

          <PortfolioManager items={works} onUpdate={setWorks} />

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
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
