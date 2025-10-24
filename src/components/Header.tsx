import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Instagram, Send, User } from "lucide-react";
import logo from "@/assets/logo.jpg";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: "Главная", path: "/" },
    { name: "О нас", path: "/about" },
    { name: "Прайс", path: "/pricing" },
    { name: "Контакты", path: "/contacts" },
  ];

  const handleLogoClick = (e: React.MouseEvent) => {
    if (e.ctrlKey && e.shiftKey) {
      window.location.href = "/profi-admin-2025";
    }
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
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:text-primary transition-colors"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href="https://t.me/+79858504801"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:text-primary transition-colors"
            >
              <Send className="h-5 w-5" />
            </a>
            <a
              href="https://vk.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:text-primary transition-colors"
            >
              <User className="h-5 w-5" />
            </a>
            <Button
              asChild
              className="bg-primary text-primary-foreground hover:bg-primary/90 hover-glow"
            >
              <a href="https://wa.me/79858504801">Записаться</a>
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
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://t.me/+79858504801" target="_blank" rel="noopener noreferrer">
                <Send className="h-5 w-5" />
              </a>
              <a href="https://vk.com" target="_blank" rel="noopener noreferrer">
                <User className="h-5 w-5" />
              </a>
            </div>
            <Button
              asChild
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <a href="https://wa.me/79858504801">Записаться</a>
            </Button>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
