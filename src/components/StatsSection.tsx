import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

const statsData = [
  {
    player: "Josh Allen",
    team: "BUF",
    stat: "Passing Yards",
    season: "276.8 avg",
    last5: "312.4 avg",
    trend: "up",
    percentage: 78,
    matchup: "vs MIA (24th vs QB)"
  },
  {
    player: "Derrick Henry", 
    team: "BAL",
    stat: "Rushing Yards",
    season: "118.2 avg",
    last5: "142.6 avg", 
    trend: "up",
    percentage: 85,
    matchup: "vs PIT (18th vs RB)"
  },
  {
    player: "Cooper Kupp",
    team: "LAR",
    stat: "Receptions",
    season: "6.8 avg",
    last5: "5.2 avg",
    trend: "down", 
    percentage: 42,
    matchup: "vs SEA (12th vs WR)"
  },
  {
    player: "Travis Kelce",
    team: "KC", 
    stat: "Receiving Yards",
    season: "67.4 avg",
    last5: "71.2 avg",
    trend: "neutral",
    percentage: 65,
    matchup: "vs DEN (8th vs TE)"
  }
];

const StatsSection = () => {
  return (
    <section id="analytics" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Data-Driven <span className="bg-gradient-success bg-clip-text text-transparent">Intelligence</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Make smarter bets with comprehensive player analytics, matchup insights, 
            and real-time performance tracking. Knowledge is your edge.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {statsData.map((player, index) => (
            <Card key={index} className="border-border/50 hover:shadow-lg transition-all">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg font-bold flex items-center gap-2">
                      {player.player}
                      <Badge variant="outline">{player.team}</Badge>
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">{player.stat}</p>
                  </div>
                  <div className="text-right">
                    {player.trend === 'up' && <TrendingUp className="h-5 w-5 text-success inline" />}
                    {player.trend === 'down' && <TrendingDown className="h-5 w-5 text-destructive inline" />}
                    {player.trend === 'neutral' && <Minus className="h-5 w-5 text-muted-foreground inline" />}
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Season Avg:</span>
                    <div className="font-semibold">{player.season}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Last 5:</span>
                    <div className={`font-semibold ${
                      player.trend === 'up' ? 'text-success' : 
                      player.trend === 'down' ? 'text-destructive' : 
                      'text-foreground'
                    }`}>
                      {player.last5}
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Hit Rate Confidence</span>
                    <span className="font-semibold">{player.percentage}%</span>
                  </div>
                  <Progress 
                    value={player.percentage} 
                    className="h-2"
                  />
                </div>
                
                <div className="text-sm text-muted-foreground">
                  <strong>Matchup:</strong> {player.matchup}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-4 text-sm text-muted-foreground bg-card border border-border/50 rounded-full px-6 py-3">
            <span>Live data updates every 30 seconds</span>
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;