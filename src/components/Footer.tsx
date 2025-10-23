import { Link } from "react-router-dom";
import { Instagram, Send, User } from "lucide-react";
import logo from "@/assets/logo.jpg";

const Footer = () => {
  return (
    <footer className="bg-background border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <img src={logo} alt="Пирсинг Профи" className="h-10 w-10" />
                <span className="text-xl font-bebas neon-text-pink">
                  Пирсинг Профи
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                Безопасно. Качественно. Красиво.
              </p>
            </div>

            {/* Navigation */}
            <div>
              <h3 className="font-bebas text-lg mb-4">Навигация</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
                    Главная
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
                    О нас
                  </Link>
                </li>
                <li>
                  <Link to="/services" className="text-muted-foreground hover:text-primary transition-colors">
                    Услуги
                  </Link>
                </li>
                <li>
                  <Link to="/pricing" className="text-muted-foreground hover:text-primary transition-colors">
                    Прайс
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contacts */}
            <div>
              <h3 className="font-bebas text-lg mb-4">Контакты</h3>
              <ul className="space-y-2 text-sm">
                <li className="text-muted-foreground">
                  м. Окская, Рязанский проспект 30/15
                </li>
                <li>
                  <a href="tel:+79858504801" className="text-muted-foreground hover:text-primary transition-colors">
                    +7 985 850-48-01
                  </a>
                </li>
                <li>
                  <a href="mailto:Studio.p.t@yandex.ru" className="text-muted-foreground hover:text-primary transition-colors">
                    Studio.p.t@yandex.ru
                  </a>
                </li>
                <li className="text-muted-foreground">
                  Пн-Вс: 12:00 — 21:00
                </li>
              </ul>
            </div>

            {/* Social */}
            <div>
              <h3 className="font-bebas text-lg mb-4">Мы в соцсетях</h3>
              <div className="flex gap-4">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-10 w-10 rounded-full bg-card border border-border flex items-center justify-center hover:border-primary transition-all hover-glow"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href="https://t.me/+79858504801"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-10 w-10 rounded-full bg-card border border-border flex items-center justify-center hover:border-primary transition-all hover-glow"
                >
                  <Send className="h-5 w-5" />
                </a>
                <a
                  href="https://vk.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-10 w-10 rounded-full bg-card border border-border flex items-center justify-center hover:border-primary transition-all hover-glow"
                >
                  <User className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
            <p>© 2025 Пирсинг Профи. Все права защищены.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
