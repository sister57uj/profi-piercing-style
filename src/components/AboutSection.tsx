import { Shield, Award, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import { EditableText } from "./admin/EditableText";
import { supabase } from "@/integrations/supabase/client";

const AboutSection = () => {
  const [aboutTitle, setAboutTitle] = useState("О студии");
  const [aboutDescription, setAboutDescription] = useState(
    "С 2017 года «Пирсинг Профи» создает безопасный и стильный пирсинг. Наши мастера с медицинским образованием и сертификацией работают с одноразовыми инструментами, вскрывая упаковки при вас."
  );
  const [feature1Title, setFeature1Title] = useState("Безопасно");
  const [feature1Desc, setFeature1Desc] = useState("Химическая и термическая стерилизация, одноразовые иглы и перчатки. Вскрываем упаковки при вас.");
  const [feature2Title, setFeature2Title] = useState("Качественно");
  const [feature2Desc, setFeature2Desc] = useState("Сертифицированные мастера с медицинским образованием. Эксперты НТВ в проекте 'Чудо техники' (2018).");
  const [feature3Title, setFeature3Title] = useState("Красиво");
  const [feature3Desc, setFeature3Desc] = useState("Эксклюзивные украшения, индивидуальный подход. Создаем пирсинг, который подчеркнет вашу уникальность.");
  const [ntvTitle, setNtvTitle] = useState("Мы — эксперты НТВ в проекте «Чудо техники» (2018)");
  const [ntvDesc, setNtvDesc] = useState("Наша студия была представлена как образец профессионального подхода к пирсингу в России");

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    const { data } = await supabase
      .from('site_content')
      .select('*')
      .eq('page', 'about')
      .eq('section', 'about');

    if (data) {
      data.forEach(item => {
        if (item.content_key === 'title') setAboutTitle(item.content_value);
        if (item.content_key === 'description') setAboutDescription(item.content_value);
        if (item.content_key === 'feature1_title') setFeature1Title(item.content_value);
        if (item.content_key === 'feature1_desc') setFeature1Desc(item.content_value);
        if (item.content_key === 'feature2_title') setFeature2Title(item.content_value);
        if (item.content_key === 'feature2_desc') setFeature2Desc(item.content_value);
        if (item.content_key === 'feature3_title') setFeature3Title(item.content_value);
        if (item.content_key === 'feature3_desc') setFeature3Desc(item.content_value);
        if (item.content_key === 'ntv_title') setNtvTitle(item.content_value);
        if (item.content_key === 'ntv_desc') setNtvDesc(item.content_value);
      });
    }
  };

  const features = [
    {
      icon: Shield,
      title: feature1Title,
      description: feature1Desc,
      colorClass: "text-primary",
      key: "feature1"
    },
    {
      icon: Award,
      title: feature2Title,
      description: feature2Desc,
      colorClass: "text-secondary",
      key: "feature2"
    },
    {
      icon: Sparkles,
      title: feature3Title,
      description: feature3Desc,
      colorClass: "text-accent",
      key: "feature3"
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
                key={feature.key}
                className="p-4 sm:p-5 md:p-6 rounded-lg bg-card/50 border border-primary/30 hover:border-primary/60 hover-glow animate-fade-in"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="mb-2 sm:mb-3">
                  <Icon className={`h-8 w-8 sm:h-10 sm:w-10 ${feature.colorClass}`} />
                </div>
                <EditableText
                  initialValue={feature.title}
                  onSave={(val) => {
                    if (feature.key === 'feature1') setFeature1Title(val);
                    if (feature.key === 'feature2') setFeature2Title(val);
                    if (feature.key === 'feature3') setFeature3Title(val);
                  }}
                  page="about"
                  section="about"
                  contentKey={`${feature.key}_title`}
                  as="h3"
                  className={`text-lg sm:text-xl font-bebas mb-1 sm:mb-2 tracking-wide ${feature.colorClass}`}
                />
                <EditableText
                  initialValue={feature.description}
                  onSave={(val) => {
                    if (feature.key === 'feature1') setFeature1Desc(val);
                    if (feature.key === 'feature2') setFeature2Desc(val);
                    if (feature.key === 'feature3') setFeature3Desc(val);
                  }}
                  page="about"
                  section="about"
                  contentKey={`${feature.key}_desc`}
                  multiline
                  as="p"
                  className="text-xs sm:text-sm text-muted-foreground"
                />
              </div>
              );
            })}
          </div>

          {/* Additional info */}
          <div className="mt-6 sm:mt-8 md:mt-12 text-center p-4 sm:p-5 md:p-6 bg-background rounded-lg border border-primary/20">
            <EditableText
              initialValue={ntvTitle}
              onSave={setNtvTitle}
              page="about"
              section="about"
              contentKey="ntv_title"
              as="p"
              className="text-sm sm:text-base mb-2 sm:mb-3"
            />
            <EditableText
              initialValue={ntvDesc}
              onSave={setNtvDesc}
              page="about"
              section="about"
              contentKey="ntv_desc"
              multiline
              as="p"
              className="text-xs sm:text-sm text-muted-foreground"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
