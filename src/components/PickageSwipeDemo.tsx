import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { useWallet } from "@/hooks/useWallet";
import { Heart, X, TrendingUp, TrendingDown, Star, DollarSign, Sparkles } from "lucide-react";
import { toast } from "sonner";
import confetti from 'canvas-confetti';

interface BetProp {
  id: number;
  player: string;
  team: string;
  opponent: string;
  stat: string;
  line: number;
  odds: number;
  gameDate: string;
  gameTime: string;
  trend: 'up' | 'down';
  confidence: number;
}

const sampleProps: BetProp[] = [
  {
    id: 1,
    player: "Josh Allen",
    team: "BUF",
    opponent: "MIA",
    stat: "Passing Yards",
    line: 267.5,
    odds: -110,
    gameDate: "Today",
    gameTime: "8:20 PM EST",
    trend: "up",
    confidence: 78
  },
  {
    id: 2,
    player: "Derrick Henry",
    team: "BAL",
    opponent: "PIT",
    stat: "Rushing Yards",
    line: 89.5,
    odds: -115,
    gameDate: "Today",
    gameTime: "1:00 PM EST",
    trend: "up",
    confidence: 85
  },
  {
    id: 3,
    player: "Tyreek Hill",
    team: "MIA",
    opponent: "BUF",
    stat: "Receiving Yards",
    line: 74.5,
    odds: -108,
    gameDate: "Today",
    gameTime: "8:20 PM EST",
    trend: "down",
    confidence: 62
  },
  {
    id: 4,
    player: "Lamar Jackson",
    team: "BAL",
    opponent: "PIT",
    stat: "Passing TDs",
    line: 1.5,
    odds: +120,
    gameDate: "Today",
    gameTime: "1:00 PM EST",
    trend: "up",
    confidence: 71
  },
  {
    id: 5,
    player: "Travis Kelce",
    team: "KC",
    opponent: "DEN",
    stat: "Receptions",
    line: 5.5,
    odds: -125,
    gameDate: "Sunday",
    gameTime: "4:25 PM EST",
    trend: "up",
    confidence: 89
  }
];

export default function PickageSwipeDemo() {
  const { user, profile } = useAuth();
  const { placeBet, loading } = useWallet();
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);
  const [betAmount, setBetAmount] = useState<string>('25');
  const [customAmount, setCustomAmount] = useState<string>('');
  const [useCustomAmount, setUseCustomAmount] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const currentProp = sampleProps[currentCardIndex];
  const actualBetAmount = useCustomAmount ? parseFloat(customAmount) || 0 : parseFloat(betAmount) || 0;
  const canAffordBet = (profile?.balance || 0) >= actualBetAmount;

  const handleSwipe = async (direction: 'left' | 'right') => {
    if (!user) {
      toast.error('Please log in to place bets');
      return;
    }

    if (direction === 'right') {
      // Place bet
      if (!canAffordBet) {
        toast.error('Insufficient funds. Please deposit money to your wallet.');
        return;
      }

      if (actualBetAmount <= 0) {
        toast.error('Please enter a valid bet amount');
        return;
      }

      setIsAnimating(true);
      
      const betData = {
        player_name: currentProp.player,
        team: currentProp.team,
        opponent: currentProp.opponent,
        stat_type: currentProp.stat,
        line: currentProp.line,
        bet_type: 'over' as const,
        odds: currentProp.odds,
        amount: actualBetAmount,
        game_date: currentProp.gameTime
      };

      const { error } = await placeBet(betData);
      
      if (!error) {
        // Trigger confetti animation
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
        
        setTimeout(() => {
          confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.7 }
          });
        }, 300);
      }
      
      setIsAnimating(false);
    }

    // Move to next card
    setSwipeDirection(direction);
    setTimeout(() => {
      setCurrentCardIndex((prev) => (prev + 1) % sampleProps.length);
      setSwipeDirection(null);
    }, 300);
  };

  const quickAmounts = [10, 25, 50, 100];

  useEffect(() => {
    // Reset custom amount when switching back to preset
    if (!useCustomAmount) {
      setCustomAmount('');
    }
  }, [useCustomAmount]);

  if (!user) {
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
          
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold mb-4">Login Required</h3>
            <p className="text-muted-foreground mb-6">
              Please log in to start swiping and placing bets
            </p>
            <Button asChild>
              <a href="/auth">Login to Start Betting</a>
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="swipe" className="py-20 bg-muted/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Pickage Swipe 2.0
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Real money, real bets, real wins. Swipe your way to victory with live odds and instant payouts.
          </p>
        </div>

        <div className="max-w-md mx-auto">
          {/* Balance Display */}
          <div className="mb-6 p-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Available Balance</p>
                <p className="text-2xl font-bold text-primary">
                  ${profile?.balance?.toFixed(2) || '0.00'}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Total Bets</p>
                <p className="text-xl font-semibold">{profile?.total_bets || 0}</p>
              </div>
            </div>
          </div>

          {/* Bet Amount Selection */}
          <div className="mb-6 p-4 border rounded-lg">
            <Label className="text-sm font-medium mb-3 block">Bet Amount</Label>
            
            {!useCustomAmount ? (
              <div className="space-y-3">
                <div className="grid grid-cols-4 gap-2">
                  {quickAmounts.map((amount) => (
                    <Button
                      key={amount}
                      variant={betAmount === amount.toString() ? "default" : "outline"}
                      size="sm"
                      onClick={() => setBetAmount(amount.toString())}
                      className="w-full"
                    >
                      ${amount}
                    </Button>
                  ))}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setUseCustomAmount(true)}
                  className="w-full"
                >
                  Custom Amount
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                <Input
                  type="number"
                  step="0.01"
                  min="0.01"
                  max={profile?.balance || 0}
                  placeholder="Enter amount"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setUseCustomAmount(false)}
                  className="w-full"
                >
                  Use Preset Amounts
                </Button>
              </div>
            )}
            
            <div className="mt-2 text-center">
              <p className="text-sm text-muted-foreground">
                Betting: <span className="font-medium text-foreground">${actualBetAmount.toFixed(2)}</span>
                {!canAffordBet && (
                  <span className="text-red-500 ml-2">Insufficient funds</span>
                )}
              </p>
            </div>
          </div>

          {/* Swipe Card */}
          <div className="relative h-96 mb-8">
            <Card 
              className={`absolute inset-0 p-6 transition-all duration-300 ${
                swipeDirection === 'left' ? 'transform translate-x-[-100%] opacity-0' :
                swipeDirection === 'right' ? 'transform translate-x-[100%] opacity-0' :
                isAnimating ? 'scale-105 shadow-lg border-primary' : ''
              } ${!canAffordBet ? 'opacity-50' : ''}`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span className="font-semibold">{currentProp.player}</span>
                </div>
                <Badge variant="secondary">{currentProp.confidence}% confident</Badge>
              </div>
              
              <div className="text-center mb-6">
                <div className="text-sm text-muted-foreground mb-1">
                  {currentProp.team} vs {currentProp.opponent}
                </div>
                <div className="text-2xl font-bold mb-2">
                  {currentProp.stat}
                </div>
                <div className="text-lg text-muted-foreground">
                  O/U {currentProp.line}
                </div>
              </div>
              
              <div className="flex items-center justify-center space-x-4 mb-6">
                <div className="text-center">
                  <div className="text-sm text-muted-foreground">Odds</div>
                  <div className="font-semibold">
                    {currentProp.odds > 0 ? '+' : ''}{currentProp.odds}
                  </div>
                </div>
                <div className="w-px h-8 bg-border"></div>
                <div className="text-center">
                  <div className="text-sm text-muted-foreground">Potential Win</div>
                  <div className="font-semibold text-green-600">
                    ${(actualBetAmount * (currentProp.odds > 0 ? (currentProp.odds / 100) + 1 : (100 / Math.abs(currentProp.odds)) + 1)).toFixed(2)}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-center space-x-2 mb-4">
                {currentProp.trend === 'up' ? (
                  <TrendingUp className="h-4 w-4 text-green-500" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-500" />
                )}
                <span className="text-sm">Recent trend: {currentProp.trend}</span>
              </div>
              
              <div className="text-center text-sm text-muted-foreground">
                {currentProp.gameDate} • {currentProp.gameTime}
              </div>
              
              {isAnimating && (
                <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm rounded-lg">
                  <div className="text-center">
                    <Sparkles className="h-8 w-8 text-primary mx-auto mb-2 animate-spin" />
                    <p className="font-medium">Placing your bet...</p>
                  </div>
                </div>
              )}
            </Card>
          </div>
          
          {/* Action Buttons */}
          <div className="flex justify-center space-x-8">
            <Button
              variant="outline"
              size="lg"
              onClick={() => handleSwipe('left')}
              className="rounded-full w-16 h-16 p-0 border-2 hover:border-red-500 hover:text-red-500"
              disabled={loading || isAnimating}
            >
              <X className="h-6 w-6" />
            </Button>
            
            <Button
              size="lg"
              onClick={() => handleSwipe('right')}
              className="rounded-full w-16 h-16 p-0 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
              disabled={loading || isAnimating || !canAffordBet}
            >
              <Heart className="h-6 w-6" />
            </Button>
          </div>
          
          <div className="text-center mt-4 space-y-1">
            <p className="text-sm text-muted-foreground">
              <X className="h-4 w-4 inline mr-1" />
              Skip • 
              <Heart className="h-4 w-4 inline mx-1" />
              Bet ${actualBetAmount.toFixed(2)}
            </p>
            {!canAffordBet && (
              <p className="text-xs text-red-500">
                Add funds to your wallet to place this bet
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}