import { useState, useEffect } from "react";
import { EditableText } from "@/components/admin/EditableText";
import { EditableLink } from "@/components/admin/EditableLink";
import { BadgeEditor } from "@/components/admin/BadgeEditor";
import { AddBadgeButton } from "@/components/admin/AddBadgeButton";
import { supabase } from "@/integrations/supabase/client";

const Hero = () => {
  const [tagline, setTagline] = useState("МЕДИЦИНСКИЙ ПОДХОД К ПИРСИНГУ");
  const [title, setTitle] = useState("Профессиональный");
  const [subtitle, setSubtitle] = useState("Пирсинг");
  const [badges, setBadges] = useState({
    sterility: { title: "Стерильность", description: "Медицинские стандарты" },
    safety: { title: "Безопасность", description: "Сертифицированные мастера" },
    beauty: { title: "Красота", description: "Индивидуальный подход" }
  });

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    const { data } = await supabase
      .from('site_content')
      .select('*')
      .eq('page', 'home')
      .eq('section', 'hero');

    if (data) {
      const taglineContent = data.find(c => c.content_key === 'tagline');
      const titleContent = data.find(c => c.content_key === 'title');
      const subtitleContent = data.find(c => c.content_key === 'subtitle');
      
      if (taglineContent) setTagline(taglineContent.content_value);
      if (titleContent) setTitle(titleContent.content_value);
      if (subtitleContent) setSubtitle(subtitleContent.content_value);

      // Load badges
      const badgesData = {
        sterility: {
          title: data.find(c => c.content_key === 'badge_sterility_title')?.content_value || badges.sterility.title,
          description: data.find(c => c.content_key === 'badge_sterility_description')?.content_value || badges.sterility.description
        },
        safety: {
          title: data.find(c => c.content_key === 'badge_safety_title')?.content_value || badges.safety.title,
          description: data.find(c => c.content_key === 'badge_safety_description')?.content_value || badges.safety.description
        },
        beauty: {
          title: data.find(c => c.content_key === 'badge_beauty_title')?.content_value || badges.beauty.title,
          description: data.find(c => c.content_key === 'badge_beauty_description')?.content_value || badges.beauty.description
        }
      };
      setBadges(badgesData);
    }
  };

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      
      <div className="container mx-auto px-3 sm:px-4 relative z-10 max-w-full">
        <div className="max-w-5xl mx-auto text-center space-y-4 sm:space-y-6 md:space-y-8 animate-fade-in py-12 sm:py-16 md:py-20 overflow-hidden">
          <div className="space-y-3 sm:space-y-4 md:space-y-5">
            <div className="inline-block px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 rounded-full bg-primary/20 border-2 border-primary/50 mb-3 sm:mb-4 md:mb-5 backdrop-blur-sm">
              <EditableText
                initialValue={tagline}
                onSave={setTagline}
                page="home"
                section="hero"
                contentKey="tagline"
                as="p"
                className="neon-text-cyan text-[10px] sm:text-xs md:text-sm font-bold tracking-wide break-words uppercase"
              />
            </div>
            
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display font-bold leading-[1.1] break-words text-center px-2">
              <EditableText
                initialValue={title}
                onSave={setTitle}
                page="home"
                section="hero"
                contentKey="title"
                as="span"
                className="inline-block break-words text-foreground"
              />
              <EditableText
                initialValue={subtitle}
                onSave={setSubtitle}
                page="home"
                section="hero"
                contentKey="subtitle"
                as="span"
                className="block neon-text-pink mt-2 sm:mt-3 break-words font-extrabold"
              />
            </h1>
          </div>
          
          {/* Medical standards badges */}
          <div className="grid grid-cols-3 gap-1.5 sm:gap-2 md:gap-3 lg:gap-4 pt-3 sm:pt-4 md:pt-5 max-w-3xl mx-auto px-1 sm:px-2">
            <BadgeEditor
              initialTitle={badges.sterility.title}
              initialDescription={badges.sterility.description}
              page="home"
              section="hero"
              contentKey="badge_sterility"
              onSave={(title, description) => setBadges(prev => ({ ...prev, sterility: { title, description } }))}
              icon={
                <svg className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
            />
            
            <BadgeEditor
              initialTitle={badges.safety.title}
              initialDescription={badges.safety.description}
              page="home"
              section="hero"
              contentKey="badge_safety"
              onSave={(title, description) => setBadges(prev => ({ ...prev, safety: { title, description } }))}
              icon={
                <svg className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
              }
            />
            
            <BadgeEditor
              initialTitle={badges.beauty.title}
              initialDescription={badges.beauty.description}
              page="home"
              section="hero"
              contentKey="badge_beauty"
              onSave={(title, description) => setBadges(prev => ({ ...prev, beauty: { title, description } }))}
              icon={
                <svg className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              }
            />
            
            <AddBadgeButton
              page="home"
              section="hero"
              onAdd={loadContent}
            />
          </div>
          
          <div className="pt-4 sm:pt-5 md:pt-6 flex justify-center px-3 sm:px-4">
            <EditableLink
              initialText="Записаться онлайн"
              initialUrl="https://dikidi.net/1196602"
              onSave={(text, url) => {}}
              page="home"
              section="hero"
              contentKey="booking_button"
              className="text-sm sm:text-base md:text-lg px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-5 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-full hover:scale-105 transition-all shadow-lg hover:shadow-primary/25 w-full sm:w-auto text-center whitespace-nowrap"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
