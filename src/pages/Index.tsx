import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Portfolio from "@/components/Portfolio";
import Footer from "@/components/Footer";
import { AdminHelper } from "@/components/admin/AdminHelper";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Portfolio />
      </main>
      <Footer />
      <AdminHelper />
    </div>
  );
};

export default Index;
