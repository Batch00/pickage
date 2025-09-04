import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import StatsSection from "@/components/StatsSection";
import PickageSwipeDemo from "@/components/PickageSwipeDemo";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <FeaturesSection />
      <StatsSection />
      <PickageSwipeDemo />
      <Footer />
    </main>
  );
};

export default Index;
