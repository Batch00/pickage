import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart3, 
  Smartphone, 
  Shield, 
  TrendingUp, 
  DollarSign, 
  Bell,
  BookOpen,
  Zap
} from "lucide-react";

const features = [
  {
    icon: Smartphone,
    title: "Pickage Swipe",
    description: "Revolutionary Tinder-style betting interface. Swipe right to bet, left to skip. Set your bet size and filter by sport or player.",
    gradient: "bg-gradient-secondary"
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description: "Comprehensive player stats, matchup history, and visual dashboards to help you make informed betting decisions.",
    gradient: "bg-gradient-primary"
  },
  {
    icon: TrendingUp,
    title: "Predictive Insights",
    description: "AI-powered predictions and trend analysis to assess likely outcomes and identify value opportunities.",
    gradient: "bg-gradient-success"
  },
  {
    icon: Shield,
    title: "Vegas-Grade Odds",
    description: "Real-time odds sourced directly from major sportsbooks and trusted data feeds for maximum accuracy.",
    gradient: "bg-gradient-primary"
  },
  {
    icon: DollarSign,
    title: "Bankroll Management",
    description: "Smart tools to help you budget, track, and optimize your betting strategy for long-term success.",
    gradient: "bg-gradient-success"
  },
  {
    icon: Bell,
    title: "Live Alerts",
    description: "Real-time notifications for changing odds, game updates, and betting opportunities during live games.",
    gradient: "bg-gradient-secondary"
  },
  {
    icon: BookOpen,
    title: "Education Hub",
    description: "Comprehensive tutorials, strategy guides, and expert insights for bettors of all experience levels.",
    gradient: "bg-gradient-primary"
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Instant bet placement, real-time updates, and seamless user experience optimized for mobile and desktop.",
    gradient: "bg-gradient-secondary"
  }
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Why Choose <span className="bg-gradient-hero bg-clip-text text-transparent">Pickage</span>?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We're not just another sportsbook. We're building the future of sports betting with 
            innovative tools, data-driven insights, and an experience that's both fun and smart.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card 
                key={index} 
                className="border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-primary/20 hover:shadow-lg group"
              >
                <CardHeader className="text-center pb-4">
                  <div className={`w-16 h-16 mx-auto ${feature.gradient} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-lg font-bold">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;