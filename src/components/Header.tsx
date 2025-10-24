import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Menu, X, Phone, LogOut, Shield } from "lucide-react";
import { useAdmin } from "@/contexts/AdminContext";
import { useToast } from "@/hooks/use-toast";
import logo from "@/assets/logo.jpg";
import instagramIcon from "@/assets/instagram-icon.webp";
import telegramIcon from "@/assets/telegram-icon.webp";
import vkIcon from "@/assets/vk-icon.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showPhoneDialog, setShowPhoneDialog] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { isAdmin, checkAdmin } = useAdmin();
  const { toast } = useToast();
  const navigate = useNavigate();

  const navItems = [
    { name: "Главная", path: "/" },
    { name: "О нас", path: "/about" },
    { name: "Прайс", path: "/pricing" },
    { name: "Контакты", path: "/contacts" },
  ];

  useEffect(() => {
    const checkMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
    setIsMobile(checkMobile);
  }, []);

  const handleLogoClick = (e: React.MouseEvent) => {
    if (e.ctrlKey && e.shiftKey) {
      window.location.href = "/profi-admin-2025";
    }
  };

  const handleCallClick = (e: React.MouseEvent) => {
    if (!isMobile) {
      e.preventDefault();
      setShowPhoneDialog(true);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('adminLoggedIn');
    checkAdmin();
    toast({
      title: "Выход выполнен",
      description: "Вы вышли из режима администратора"
    });
    navigate('/');
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" onClick={handleLogoClick} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <img src={logo} alt="Пирсинг Профи" className="h-10 w-10" />
            <span className="text-xl font-bebas tracking-wider neon-text-pink">
              Пирсинг Профи
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="text-foreground hover:text-primary transition-colors font-medium"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Social Links & CTA */}
          <div className="hidden md:flex items-center gap-4">
            {isAdmin && (
              <div className="flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/30 rounded-full">
                <Shield className="h-4 w-4 text-primary" />
                <span className="text-sm text-primary font-medium">Режим админа</span>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleLogout}
                  className="h-6 px-2"
                >
                  <LogOut className="h-3 w-3" />
                </Button>
              </div>
            )}
            <a
              href="https://instagram.com/piercing_profi_ekaterina?igsh=MWtrcXNycjhzNmo4bw=="
              target="_blank"
              rel="noopener noreferrer"
              className="h-9 w-9 hover:scale-110 transition-all"
            >
              <img src={instagramIcon} alt="Instagram" className="w-full h-full object-cover rounded-lg" />
            </a>
            <a
              href="https://t.me/piercing_prof"
              target="_blank"
              rel="noopener noreferrer"
              className="h-9 w-9 hover:scale-110 transition-all"
            >
              <img src={telegramIcon} alt="Telegram" className="w-full h-full object-cover rounded-full" />
            </a>
            <a
              href="https://vk.com/piercing_profi24"
              target="_blank"
              rel="noopener noreferrer"
              className="h-9 w-9 hover:scale-110 transition-all"
            >
              <img src={vkIcon} alt="VK" className="w-full h-full object-cover rounded-lg" />
            </a>
            <Button
              asChild
              className="bg-primary text-primary-foreground hover:bg-primary/90 hover-glow"
            >
              <a href="tel:+79858504801" onClick={handleCallClick}>
                Записаться
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-foreground"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4 animate-fade-in">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className="block text-foreground hover:text-primary transition-colors font-medium"
              >
                {item.name}
              </Link>
            ))}
            <div className="flex gap-4 pt-4">
              <a 
                href="https://instagram.com/piercing_profi_ekaterina?igsh=MWtrcXNycjhzNmo4bw==" 
                target="_blank" 
                rel="noopener noreferrer"
                className="h-9 w-9 hover:scale-110 transition-all"
              >
                <img src={instagramIcon} alt="Instagram" className="w-full h-full object-cover rounded-lg" />
              </a>
              <a 
                href="https://t.me/piercing_prof" 
                target="_blank" 
                rel="noopener noreferrer"
                className="h-9 w-9 hover:scale-110 transition-all"
              >
                <img src={telegramIcon} alt="Telegram" className="w-full h-full object-cover rounded-full" />
              </a>
              <a 
                href="https://vk.com/piercing_profi24" 
                target="_blank" 
                rel="noopener noreferrer"
                className="h-9 w-9 hover:scale-110 transition-all"
              >
                <img src={vkIcon} alt="VK" className="w-full h-full object-cover rounded-lg" />
              </a>
            </div>
            <Button
              asChild
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <a href="tel:+79858504801" onClick={handleCallClick}>
                Записаться
              </a>
            </Button>
          </div>
        )}
      </nav>

      {/* Phone Dialog for Desktop */}
      <Dialog open={showPhoneDialog} onOpenChange={setShowPhoneDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Позвоните нам</DialogTitle>
          </DialogHeader>
          <div className="flex items-center justify-center p-6">
            <a
              href="tel:+79858504801"
              className="text-2xl font-semibold text-primary hover:text-primary/80 transition-colors"
            >
              +7 (985) 850-48-01
            </a>
          </div>
        </DialogContent>
      </Dialog>
    </header>
  );
};

export default Header;
