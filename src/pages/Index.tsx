import Header from "@/components/Header";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import Portfolio from "@/components/Portfolio";
import Reviews from "@/components/Reviews";
import Promotions from "@/components/Promotions";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <AboutSection />
        <Portfolio />
        <Reviews />
        <Promotions />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
