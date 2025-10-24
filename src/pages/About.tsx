import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Award, Heart, Shield, TrendingUp, CheckCircle } from "lucide-react";
import ekaterina from "@/assets/ekaterina-vasina.jpg";

const About = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Наши сотрудники */}
            <div className="mb-16 animate-fade-in">
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-8 text-center">
                Наши сотрудники
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Екатерина Васина */}
                <div className="bg-card rounded-lg border border-primary/20 overflow-hidden hover-lift">
                  <div className="aspect-[3/4] relative overflow-hidden">
                    <img 
                      src={ekaterina} 
                      alt="Екатерина Васина - мастер пирсинга"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 text-primary">Екатерина Васина</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Эксперт по пирсингу с медицинским образованием. Работает с 2017 года.
                    </p>
                    <div className="space-y-1 text-xs text-muted-foreground">
                      <p><strong className="text-foreground">Образование:</strong> Медицинское, сертификация по пирсингу</p>
                      <p><strong className="text-foreground">Опыт:</strong> Более 7 лет</p>
                    </div>
                  </div>
                </div>

                {/* Пустая карточка 1 */}
                <div className="bg-card rounded-lg border border-dashed border-primary/40 overflow-hidden hover-lift flex flex-col items-center justify-center p-8 min-h-[400px]">
                  <div className="w-24 h-24 rounded-full bg-primary/10 border-2 border-dashed border-primary/40 flex items-center justify-center mb-4">
                    <svg className="w-12 h-12 text-primary/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                  <p className="text-muted-foreground text-center">Скоро появится новый мастер</p>
                </div>

                {/* Пустая карточка 2 */}
                <div className="bg-card rounded-lg border border-dashed border-primary/40 overflow-hidden hover-lift flex flex-col items-center justify-center p-8 min-h-[400px]">
                  <div className="w-24 h-24 rounded-full bg-primary/10 border-2 border-dashed border-primary/40 flex items-center justify-center mb-4">
                    <svg className="w-12 h-12 text-primary/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                  <p className="text-muted-foreground text-center">Скоро появится новый мастер</p>
                </div>
              </div>
            </div>

            {/* История */}
            <div className="mb-16 animate-fade-in">
              <div className="bg-card p-8 rounded-lg border border-border">
                <h2 className="text-3xl font-display font-semibold mb-4 text-primary">
                  Наша история
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    С 2017 года студия «Пирсинг Профи» создает безопасный и стильный пирсинг в Москве. 
                    Мы начали с небольшой студии и искренней любви к своему делу, и за годы работы 
                    заслужили доверие сотен клиентов.
                  </p>
                  <p>
                    В 2018 году наша студия была представлена в программе НТВ «Чудо техники» как 
                    образец профессионального подхода к пирсингу в России. Это признание стало 
                    подтверждением нашего профессионализма и ответственного отношения к работе.
                  </p>
                  <p>
                    Сегодня мы продолжаем совершенствоваться, следим за мировыми трендами в 
                    пирсинге и используем только проверенные методы стерилизации и лучшие материалы.
                  </p>
                </div>
              </div>
            </div>

            {/* Ценности */}
            <div className="mb-16">
              <h2 className="text-3xl font-display font-semibold mb-8 text-center">
                Наши ценности
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-card p-6 rounded-lg border border-border hover-glow animate-fade-in">
                  <Shield className="h-10 w-10 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-3 text-primary">Безопасность</h3>
                  <p className="text-muted-foreground">
                    Химическая и термическая стерилизация всех инструментов. 
                    Одноразовые иглы и перчатки, которые мы вскрываем при вас.
                  </p>
                </div>

                <div className="bg-card p-6 rounded-lg border border-border hover-glow animate-fade-in" style={{ animationDelay: "0.1s" }}>
                  <Award className="h-10 w-10 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-3 text-primary">Профессионализм</h3>
                  <p className="text-muted-foreground">
                    Мастера с медицинским образованием и сертификацией. 
                    Постоянное обучение и следование мировым стандартам.
                  </p>
                </div>

                <div className="bg-card p-6 rounded-lg border border-border hover-glow animate-fade-in" style={{ animationDelay: "0.2s" }}>
                  <Heart className="h-10 w-10 text-accent mb-4" />
                  <h3 className="text-xl font-semibold mb-3 text-primary">Индивидуальность</h3>
                  <p className="text-muted-foreground">
                    Мы подбираем украшения и расположение пирсинга индивидуально, 
                    учитывая анатомию и пожелания каждого клиента.
                  </p>
                </div>

                <div className="bg-card p-6 rounded-lg border border-border hover-glow animate-fade-in" style={{ animationDelay: "0.3s" }}>
                  <TrendingUp className="h-10 w-10 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-3 text-primary">Развитие</h3>
                  <p className="text-muted-foreground">
                    Мы следим за трендами, внедряем новые техники и регулярно 
                    повышаем квалификацию для лучшего обслуживания клиентов.
                  </p>
                </div>
              </div>
            </div>

            {/* Процесс работы */}
            <div className="mb-16">
              <h2 className="text-4xl font-display font-bold mb-12 text-center">
                Процесс работы
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                {[
                  { title: "Консультация", description: "Обсуждаем ваши пожелания, подбираем украшение, рассказываем о процессе" },
                  { title: "Подготовка", description: "Дезинфекция зоны, разметка, подготовка стерильных инструментов" },
                  { title: "Прокол", description: "Быстрая и точная процедура с одноразовой иглой, вскрытой при вас" },
                  { title: "Установка украшения", description: "Установка выбранного украшения из гипоаллергенных материалов" },
                  { title: "Рекомендации", description: "Подробные инструкции по уходу за пирсингом в период заживления" }
                ].map((step, index) => (
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
            <div className="bg-card p-8 rounded-lg border border-primary/20 mb-16">
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

            {/* Признание */}
            <div className="text-center animate-fade-in">
              <div className="inline-block bg-primary/10 p-8 rounded-lg border border-primary/30">
                <p className="text-2xl font-semibold mb-2">НТВ «Чудо техники» 2018</p>
                <p className="text-muted-foreground">
                  Наша студия была представлена как образец профессионального подхода к пирсингу в России
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
