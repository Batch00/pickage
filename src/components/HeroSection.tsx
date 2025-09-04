import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, Shield, Zap } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-hero opacity-95" />
      
      {/* Hero image overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in-up">
          <h1 className="text-5xl md:text-7xl font-bold text-primary-foreground mb-6">
            Smart Betting,
            <br />
            <span className="bg-gradient-success bg-clip-text text-transparent">
              Smarter Wins
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-primary-foreground/80 mb-8 max-w-3xl mx-auto leading-relaxed">
            Experience the future of sports betting with Pickage. Swipe through props like Tinder, 
            access real-time analytics, and make data-driven decisions that matter.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              className="bg-success text-success-foreground hover:bg-success-glow shadow-success text-lg px-8 py-4"
            >
              Start Swiping Bets
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            
            <Button 
              size="lg" 
              variant="outline" 
              className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 text-lg px-8 py-4"
            >
              View Demo
            </Button>
          </div>
          
          {/* Feature highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-3 text-primary-foreground/90">
              <Zap className="h-6 w-6 text-secondary" />
              <span className="font-semibold">Instant Swipe Betting</span>
            </div>
            <div className="flex items-center justify-center gap-3 text-primary-foreground/90">
              <TrendingUp className="h-6 w-6 text-success" />
              <span className="font-semibold">Real-Time Analytics</span>
            </div>
            <div className="flex items-center justify-center gap-3 text-primary-foreground/90">
              <Shield className="h-6 w-6 text-warning" />
              <span className="font-semibold">Vegas-Grade Odds</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-soft">
        <div className="w-6 h-10 border-2 border-primary-foreground/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary-foreground/50 rounded-full mt-2" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;