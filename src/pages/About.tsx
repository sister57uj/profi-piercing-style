import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Award, Heart, Shield, TrendingUp } from "lucide-react";

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
              <div className="bg-card p-8 rounded-lg border border-primary/20 max-w-3xl mx-auto">
                <h3 className="text-2xl font-semibold mb-4 text-primary">Екатерина Васина</h3>
                <p className="text-muted-foreground mb-4">
                  Эксперт по пирсингу с медицинским образованием. Екатерина работает в сфере 
                  пирсинга с 2017 года и за это время выполнила тысячи успешных процедур.
                </p>
                <p className="text-muted-foreground mb-4">
                  Она специализируется на всех видах пирсинга — от классического крыла носа 
                  до сложных проектов как индастриал и микродермалы. Екатерина подходит к 
                  каждому клиенту индивидуально, помогая воплотить любые идеи с учетом 
                  анатомических особенностей.
                </p>
                <div className="pt-4 border-t border-border space-y-2">
                  <p className="text-sm text-muted-foreground">
                    <strong className="text-foreground">Образование:</strong> Медицинское образование, сертификация по пирсингу
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong className="text-foreground">Опыт:</strong> Более 7 лет в индустрии пирсинга
                  </p>
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
                  <Award className="h-10 w-10 text-secondary mb-4" />
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
