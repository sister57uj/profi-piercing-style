import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

const Reviews = () => {
  const reviews = [
    {
      name: "Анна",
      age: 24,
      text: "Профессионально и не больно! Все стерильно, мастер — супер! Очень довольна результатом.",
      rating: 5
    },
    {
      name: "Дмитрий",
      age: 28,
      text: "Делал индастриал, все прошло отлично. Мастер объяснил весь процесс, показал инструменты. Рекомендую!",
      rating: 5
    },
    {
      name: "Мария",
      age: 22,
      text: "Лучшая студия в Москве! Чистота, профессионализм, внимание к деталям. Уже третий раз прихожу сюда.",
      rating: 5
    }
  ];

  return (
    <section className="py-20 bg-card" id="reviews">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bebas mb-4">
              Отзывы клиентов
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Нам доверяют сотни клиентов по всей Москве
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {reviews.map((review, index) => (
              <div
                key={review.name}
                className="bg-background p-6 rounded-lg border border-border hover:border-primary transition-all hover-glow animate-fade-in"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-foreground mb-4 italic">
                  "{review.text}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary via-secondary to-accent" />
                  <div>
                    <p className="font-semibold">{review.name}</p>
                    <p className="text-sm text-muted-foreground">{review.age} года</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center space-y-4">
            <p className="text-muted-foreground">
              Читайте больше отзывов на Яндекс.Картах и в наших социальных сетях
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              >
                <a href="mailto:Ekaterina.v_1996@mail.ru">
                  Оставить отзыв
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground"
              >
                <a
                  href="https://yandex.ru/maps"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Отзывы на Яндекс.Картах
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
