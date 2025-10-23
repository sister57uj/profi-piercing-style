import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

const Services = () => {
  const services = [
    {
      category: "Пирсинг носа",
      items: [
        { name: "Крыло носа", description: "Классический и самый популярный вид пирсинга" },
        { name: "Септум", description: "Прокол перегородки носа" },
        { name: "Nasallang", description: "Горизонтальный прокол через обе ноздри" },
        { name: "Бридж", description: "Прокол переносицы" }
      ]
    },
    {
      category: "Пирсинг лица",
      items: [
        { name: "Бровь", description: "Вертикальный или горизонтальный прокол брови" },
        { name: "Anti-eyebrow", description: "Прокол под бровью на скуле" },
        { name: "Губа", description: "Различные виды проколов губ" },
        { name: "Щека", description: "Прокол щеки (димплы)" }
      ]
    },
    {
      category: "Пирсинг ушей",
      items: [
        { name: "Мочка уха", description: "Классический прокол мочки" },
        { name: "Хеликс", description: "Прокол верхнего завитка хряща уха" },
        { name: "Индастриал", description: "Двойной прокол через ухо с длинной штангой" },
        { name: "Трагус", description: "Прокол хряща на входе в ушную раковину" },
        { name: "Дэйс", description: "Прокол внутреннего хряща уха" },
        { name: "Рук", description: "Прокол внутренней части уха" }
      ]
    },
    {
      category: "Пирсинг тела",
      items: [
        { name: "Пупок", description: "Классический прокол пупка" },
        { name: "Микродермалы", description: "Имплантанты в кожу в любых зонах" },
        { name: "Соски", description: "Прокол сосков (женский и мужской)" }
      ]
    }
  ];

  const process = [
    {
      title: "Консультация",
      description: "Обсуждаем ваши пожелания, подбираем украшение, рассказываем о процессе"
    },
    {
      title: "Подготовка",
      description: "Дезинфекция зоны, разметка, подготовка стерильных инструментов"
    },
    {
      title: "Прокол",
      description: "Быстрая и точная процедура с одноразовой иглой, вскрытой при вас"
    },
    {
      title: "Установка украшения",
      description: "Установка выбранного украшения из гипоаллергенных материалов"
    },
    {
      title: "Рекомендации",
      description: "Подробные инструкции по уходу за пирсингом в период заживления"
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Hero */}
            <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
              Наши услуги
            </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Профессиональный пирсинг любой сложности с соблюдением всех стандартов безопасности
              </p>
            </div>

            {/* Services */}
            {services.map((category, index) => (
              <div
                key={category.category}
                className="mb-12 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <h2 className="text-3xl font-display font-semibold mb-6 text-primary">
                  {category.category}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {category.items.map((item) => (
                    <div
                      key={item.name}
                      className="bg-card p-6 rounded-lg border border-border hover:border-primary transition-all hover-glow"
                    >
                      <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                      <p className="text-muted-foreground">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Process */}
            <div className="mt-20 mb-16">
              <h2 className="text-4xl font-display font-bold mb-12 text-center">
                Процесс работы
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                {process.map((step, index) => (
                  <div
                    key={step.title}
                    className="bg-card p-6 rounded-lg border border-border hover:border-primary transition-all hover-glow text-center animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-semibold text-primary">{index + 1}</span>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Гарантии безопасности */}
            <div className="bg-card p-8 rounded-lg border border-primary/20 mb-12">
              <h2 className="text-3xl font-display font-semibold mb-6 text-primary text-center">
                Гарантии безопасности
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  "Химическая стерилизация всех многоразовых инструментов",
                  "Термическая обработка в сухожаровом шкафу",
                  "Одноразовые иглы, вскрываемые при клиенте",
                  "Одноразовые перчатки для каждой процедуры",
                  "Гипоаллергенные материалы украшений",
                  "Подробные инструкции по уходу"
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <p className="text-muted-foreground">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="text-center animate-fade-in">
              <h3 className="text-2xl font-semibold mb-4">
                Готовы записаться?
              </h3>
              <p className="text-muted-foreground mb-6">
                Свяжитесь с нами удобным способом, и мы подберем удобное время
              </p>
              <Button
                asChild
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 hover-glow"
              >
                <a href="https://wa.me/79858504801">
                  Записаться на сеанс
                </a>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Services;
