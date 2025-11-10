import { Link } from "react-router-dom";
import logo from "@/assets/logo.jpg";
import instagramIcon from "@/assets/instagram-icon.webp";
import telegramIcon from "@/assets/telegram-icon.webp";
import vkIcon from "@/assets/vk-icon.png";

const Footer = () => {
  return (
    <footer className="bg-background border-t border-border py-8 sm:py-10 md:py-12">
      <div className="container mx-auto px-3 sm:px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-6 sm:mb-8">
            {/* Brand */}
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <img src={logo} alt="Пирсинг Профи" className="h-8 w-8 sm:h-10 sm:w-10" />
                <span className="text-lg sm:text-xl font-bebas neon-text-pink">
                  Пирсинг Профи
                </span>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Безопасно. Качественно. Красиво.
              </p>
            </div>

            {/* Navigation */}
            <div>
              <h3 className="font-bebas text-base sm:text-lg mb-3 sm:mb-4">Навигация</h3>
              <ul className="space-y-1.5 sm:space-y-2">
                <li>
                  <Link to="/" className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors">
                    Главная
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors">
                    О нас
                  </Link>
                </li>
                <li>
                  <Link to="/services" className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors">
                    Услуги
                  </Link>
                </li>
                <li>
                  <Link to="/pricing" className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors">
                    Прайс
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contacts */}
            <div>
              <h3 className="font-bebas text-base sm:text-lg mb-3 sm:mb-4">Контакты</h3>
              <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                <li className="text-muted-foreground">
                  м. Окская, Рязанский проспект 30/15
                </li>
                <li>
                  <a href="tel:+79858504801" className="text-muted-foreground hover:text-primary transition-colors">
                    +7 985 850-48-01
                  </a>
                </li>
                <li>
                  <a href="mailto:Studio.p.t@yandex.ru" className="text-muted-foreground hover:text-primary transition-colors break-all">
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
              <h3 className="font-bebas text-base sm:text-lg mb-3 sm:mb-4">Мы в соцсетях</h3>
              <div className="flex gap-3 sm:gap-4">
                <a
                  href="https://instagram.com/piercing_profi_ekaterina?igsh=MWtrcXNycjhzNmo4bw=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-9 w-9 sm:h-10 sm:w-10 hover:scale-110 transition-all"
                >
                  <img src={instagramIcon} alt="Instagram" className="w-full h-full object-cover rounded-lg" />
                </a>
                <a
                  href="https://t.me/piercing_prof"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-9 w-9 sm:h-10 sm:w-10 hover:scale-110 transition-all"
                >
                  <img src={telegramIcon} alt="Telegram" className="w-full h-full object-cover rounded-full" />
                </a>
                <a
                  href="https://vk.com/piercing_profi24"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-9 w-9 sm:h-10 sm:w-10 hover:scale-110 transition-all"
                >
                  <img src={vkIcon} alt="VK" className="w-full h-full object-cover rounded-lg" />
                </a>
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="pt-6 sm:pt-8 border-t border-border text-center text-xs sm:text-sm text-muted-foreground">
            <p>
              © 2025 Пирсинг Профи. Все права защищены.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
