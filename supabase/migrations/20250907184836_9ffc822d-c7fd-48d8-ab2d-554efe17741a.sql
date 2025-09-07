-- Create transactions table for wallet operations
CREATE TABLE public.transactions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('deposit', 'withdrawal', 'bet_placed', 'bet_won', 'bet_lost', 'bonus')),
  amount DECIMAL(10,2) NOT NULL,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'completed' CHECK (status IN ('pending', 'completed', 'failed')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create bets table for tracking user bets
CREATE TABLE public.bets (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  player_name TEXT NOT NULL,
  team TEXT NOT NULL,
  opponent TEXT NOT NULL,
  stat_type TEXT NOT NULL,
  line DECIMAL(5,2) NOT NULL,
  bet_type TEXT NOT NULL CHECK (bet_type IN ('over', 'under')),
  odds INTEGER NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  potential_payout DECIMAL(10,2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'won', 'lost', 'voided')),
  game_date TIMESTAMP WITH TIME ZONE,
  result DECIMAL(5,2),
  settled_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user_favorites table for teams and players
CREATE TABLE public.user_favorites (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('team', 'player')),
  name TEXT NOT NULL,
  league TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, type, name)
);

-- Enable RLS on all tables
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_favorites ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for transactions
CREATE POLICY "Users can view their own transactions" 
ON public.transactions 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own transactions" 
ON public.transactions 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Create RLS policies for bets
CREATE POLICY "Users can view their own bets" 
ON public.bets 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own bets" 
ON public.bets 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own bets" 
ON public.bets 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Create RLS policies for user_favorites
CREATE POLICY "Users can manage their own favorites" 
ON public.user_favorites 
FOR ALL 
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX idx_transactions_user_id ON public.transactions(user_id);
CREATE INDEX idx_transactions_created_at ON public.transactions(created_at DESC);
CREATE INDEX idx_bets_user_id ON public.bets(user_id);
CREATE INDEX idx_bets_status ON public.bets(status);
CREATE INDEX idx_bets_created_at ON public.bets(created_at DESC);
CREATE INDEX idx_user_favorites_user_id ON public.user_favorites(user_id);