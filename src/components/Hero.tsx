import { useState, useEffect } from "react";
import { EditableText } from "@/components/admin/EditableText";
import { EditableLink } from "@/components/admin/EditableLink";
import { supabase } from "@/integrations/supabase/client";

const Hero = () => {
  const [tagline, setTagline] = useState("МЕДИЦИНСКИЙ ПОДХОД К ПИРСИНГУ");
  const [title, setTitle] = useState("Профессиональный");
  const [subtitle, setSubtitle] = useState("Пирсинг");

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
    }
  };

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      
      <div className="container mx-auto px-3 sm:px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center space-y-6 sm:space-y-8 md:space-y-12 animate-fade-in py-12 sm:py-16 md:py-20">
          <div className="space-y-4 sm:space-y-5 md:space-y-6">
            <div className="inline-block px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 rounded-full bg-primary/10 border border-primary/20 mb-4 sm:mb-5 md:mb-6">
              <EditableText
                initialValue={tagline}
                onSave={setTagline}
                page="home"
                section="hero"
                contentKey="tagline"
                as="p"
                className="text-primary text-xs sm:text-sm font-medium tracking-wide"
              />
            </div>
            
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl xl:text-7xl font-display font-bold text-foreground leading-[1.1] break-words px-4">
              <EditableText
                initialValue={title}
                onSave={setTitle}
                page="home"
                section="hero"
                contentKey="title"
                as="span"
                className="inline-block"
              />
              <EditableText
                initialValue={subtitle}
                onSave={setSubtitle}
                page="home"
                section="hero"
                contentKey="subtitle"
                as="span"
                className="block text-primary mt-2 sm:mt-3"
              />
            </h1>
          </div>
          
          {/* Medical standards badges */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4 pt-4 sm:pt-5 md:pt-6 max-w-3xl mx-auto px-2 sm:px-4">
            <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-2 sm:p-3 md:p-4 hover:border-primary/50 transition-all hover-lift">
              <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-1 sm:mb-2">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-foreground font-semibold text-xs sm:text-sm mb-0.5">Стерильность</p>
              <p className="text-muted-foreground text-[10px] sm:text-xs">Медицинские стандарты</p>
            </div>
            
            <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-2 sm:p-3 md:p-4 hover:border-primary/50 transition-all hover-lift">
              <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-1 sm:mb-2">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
              </div>
              <p className="text-foreground font-semibold text-xs sm:text-sm mb-0.5">Безопасность</p>
              <p className="text-muted-foreground text-[10px] sm:text-xs">Сертифицированные мастера</p>
            </div>
            
            <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-2 sm:p-3 md:p-4 hover:border-primary/50 transition-all hover-lift">
              <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-1 sm:mb-2">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <p className="text-foreground font-semibold text-xs sm:text-sm mb-0.5">Красота</p>
              <p className="text-muted-foreground text-[10px] sm:text-xs">Индивидуальный подход</p>
            </div>
          </div>
          
          <div className="pt-6 sm:pt-7 md:pt-8 flex justify-center px-3 sm:px-4">
            <EditableLink
              initialText="Записаться онлайн"
              initialUrl="https://dikidi.net/1196602"
              onSave={(text, url) => {}}
              page="home"
              section="hero"
              contentKey="booking_button"
              className="text-base sm:text-lg px-6 sm:px-8 md:px-10 py-4 sm:py-5 md:py-7 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-full hover:scale-105 transition-all shadow-lg hover:shadow-primary/25 w-full sm:w-auto text-center"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
