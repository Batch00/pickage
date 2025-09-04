import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, X, TrendingUp, User } from "lucide-react";

interface BetProp {
  id: number;
  player: string;
  team: string;
  stat: string;
  line: number;
  over: string;
  under: string;
  game: string;
  trend: string;
  confidence: number;
}

const sampleProps: BetProp[] = [
  {
    id: 1,
    player: "Josh Allen",
    team: "BUF",
    stat: "Passing Yards",
    line: 267.5,
    over: "-110",
    under: "-110",
    game: "BUF vs MIA",
    trend: "3-1 O/U Last 4",
    confidence: 78
  },
  {
    id: 2,
    player: "Derrick Henry",
    team: "BAL",
    stat: "Rushing Yards",
    line: 89.5,
    over: "-115",
    under: "-105",
    game: "BAL vs PIT",
    trend: "Hit Over 6/8",
    confidence: 85
  },
  {
    id: 3,
    player: "Tyreek Hill",
    team: "MIA",
    stat: "Receiving Yards",
    line: 74.5,
    over: "-108",
    under: "-112",
    game: "MIA vs BUF",
    trend: "Weather Alert",
    confidence: 62
  }
];

const PickageSwipeDemo = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);

  const currentProp = sampleProps[currentIndex];

  const handleSwipe = (direction: 'left' | 'right') => {
    setSwipeDirection(direction);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % sampleProps.length);
      setSwipeDirection(null);
    }, 300);
  };

  if (!currentProp) return null;

  return (
    <section id="swipe" className="py-20 bg-muted/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Pickage Swipe
        </h2>
        <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
          Swipe right to bet, left to skip. It's that simple. 
          Filter by sport, player, or game - then swipe your way to victory.
        </p>
        
        <div className="max-w-sm mx-auto relative">
          {/* Swipe demo container */}
          <div className="relative h-96">
            <Card 
              className={`absolute inset-0 border-2 shadow-primary transition-all duration-300 ${
                swipeDirection === 'right' ? 'animate-swipe-right' : 
                swipeDirection === 'left' ? 'animate-swipe-left' : 
                'hover:scale-105'
              }`}
            >
              <CardContent className="p-6 h-full flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <User className="h-5 w-5 text-primary" />
                    <span className="font-bold text-lg">{currentProp.player}</span>
                    <Badge variant="secondary">{currentProp.team}</Badge>
                  </div>
                  <Badge 
                    variant="outline" 
                    className={`${
                      currentProp.confidence > 75 ? 'border-success text-success' : 
                      currentProp.confidence > 65 ? 'border-warning text-warning' : 
                      'border-destructive text-destructive'
                    }`}
                  >
                    {currentProp.confidence}% Confidence
                  </Badge>
                </div>

                {/* Game info */}
                <div className="text-sm text-muted-foreground mb-6">
                  {currentProp.game}
                </div>

                {/* Main stat */}
                <div className="text-center mb-6 flex-1 flex flex-col justify-center">
                  <h3 className="text-2xl font-bold mb-2">{currentProp.stat}</h3>
                  <div className="text-4xl font-bold text-primary mb-4">
                    {currentProp.line}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-success/10 rounded-lg border border-success/20">
                      <div className="text-success font-semibold">Over</div>
                      <div className="text-lg font-bold">{currentProp.over}</div>
                    </div>
                    <div className="p-3 bg-destructive/10 rounded-lg border border-destructive/20">
                      <div className="text-destructive font-semibold">Under</div>
                      <div className="text-lg font-bold">{currentProp.under}</div>
                    </div>
                  </div>
                </div>

                {/* Trend info */}
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-4">
                  <TrendingUp className="h-4 w-4" />
                  {currentProp.trend}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Swipe buttons */}
          <div className="flex justify-center gap-8 mt-8">
            <Button
              size="lg"
              variant="outline"
              className="rounded-full w-16 h-16 border-destructive/30 text-destructive hover:bg-destructive/10"
              onClick={() => handleSwipe('left')}
            >
              <X className="h-8 w-8" />
            </Button>
            <Button
              size="lg"
              className="rounded-full w-16 h-16 bg-success hover:bg-success-glow shadow-success"
              onClick={() => handleSwipe('right')}
            >
              <Heart className="h-8 w-8" />
            </Button>
          </div>
          
          <p className="text-sm text-muted-foreground mt-4">
            Swipe left to skip • Swipe right to bet
          </p>
        </div>
      </div>
    </section>
  );
};

export default PickageSwipeDemo;