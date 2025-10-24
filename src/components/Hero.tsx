import { Button } from "@/components/ui/button";
import { ArrowRight, Phone } from "lucide-react";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const Hero = () => {
  const [showPhoneDialog, setShowPhoneDialog] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const phoneNumber = "+79858504801";
  const phoneDisplay = "+7 (985) 850-48-01";

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
    };
    checkMobile();
  }, []);

  const handleCallClick = (e: React.MouseEvent) => {
    if (!isMobile) {
      e.preventDefault();
      setShowPhoneDialog(true);
    }
  };

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background"
    >
      {/* Subtle gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 -left-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 -right-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center space-y-12 animate-fade-in py-20">
          <div className="space-y-6">
            <div className="inline-block px-5 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <p className="text-primary text-sm font-medium tracking-wide">МЕДИЦИНСКИЙ ПОДХОД К ПИРСИНГУ</p>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-foreground leading-[1.1]">
              Профессиональный
              <span className="block text-primary mt-3">Пирсинг</span>
            </h1>
          </div>
          
          {/* Medical standards badges */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 max-w-3xl mx-auto">
            <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6 hover:border-primary/50 transition-all hover-lift">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-foreground font-semibold text-lg mb-2">Стерильность</p>
              <p className="text-muted-foreground text-sm">Медицинские стандарты</p>
            </div>
            
            <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6 hover:border-primary/50 transition-all hover-lift">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
              </div>
              <p className="text-foreground font-semibold text-lg mb-2">Безопасность</p>
              <p className="text-muted-foreground text-sm">Сертифицированные мастера</p>
            </div>
            
            <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6 hover:border-primary/50 transition-all hover-lift">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <p className="text-foreground font-semibold text-lg mb-2">Красота</p>
              <p className="text-muted-foreground text-sm">Индивидуальный подход</p>
            </div>
          </div>
          
          <div className="pt-8 flex justify-center">
            <Button 
              asChild 
              size="lg" 
              className="text-lg px-10 py-7 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-full hover:scale-105 transition-all shadow-lg hover:shadow-primary/25"
            >
              <a href={`tel:${phoneNumber}`} onClick={handleCallClick}>
                Записаться
                <Phone className="ml-2" />
              </a>
            </Button>
          </div>

          <Dialog open={showPhoneDialog} onOpenChange={setShowPhoneDialog}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="text-2xl">Позвоните нам</DialogTitle>
                <DialogDescription className="text-base pt-4">
                  Наш номер телефона для записи:
                </DialogDescription>
              </DialogHeader>
              <div className="flex items-center justify-center py-6">
                <a 
                  href={`tel:${phoneNumber}`}
                  className="text-3xl font-bold text-primary hover:text-primary/80 transition-colors flex items-center gap-3"
                >
                  <Phone className="h-8 w-8" />
                  {phoneDisplay}
                </a>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </section>
  );
};

export default Hero;
