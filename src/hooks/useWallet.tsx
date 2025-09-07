import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { toast } from 'sonner';

export interface Transaction {
  id: string;
  type: 'deposit' | 'withdrawal' | 'bet_placed' | 'bet_won' | 'bet_lost' | 'bonus';
  amount: number;
  description: string;
  status: 'pending' | 'completed' | 'failed';
  created_at: string;
}

export function useWallet() {
  const { user, profile, fetchProfile } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchTransactions = async () => {
    if (!user) return;
    
    setLoading(true);
    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(50);
    
    if (error) {
      console.error('Error fetching transactions:', error);
      toast.error('Failed to load transactions');
    } else {
      setTransactions((data || []) as Transaction[]);
    }
    setLoading(false);
  };

  const deposit = async (amount: number, description = 'Deposit') => {
    if (!user) return { error: 'Not authenticated' };
    
    setLoading(true);
    
    // Create transaction record
    const { error: transactionError } = await supabase
      .from('transactions')
      .insert({
        user_id: user.id,
        type: 'deposit',
        amount,
        description,
        status: 'completed'
      });

    if (transactionError) {
      setLoading(false);
      return { error: transactionError.message };
    }

    // Update profile balance
    const newBalance = (profile?.balance || 0) + amount;
    const { error: profileError } = await supabase
      .from('profiles')
      .update({ balance: newBalance })
      .eq('user_id', user.id);

    if (profileError) {
      setLoading(false);
      return { error: profileError.message };
    }

    await fetchProfile();
    await fetchTransactions();
    setLoading(false);
    toast.success(`$${amount.toFixed(2)} deposited successfully!`);
    return { error: null };
  };

  const withdraw = async (amount: number, description = 'Withdrawal') => {
    if (!user) return { error: 'Not authenticated' };
    if ((profile?.balance || 0) < amount) {
      return { error: 'Insufficient funds' };
    }
    
    setLoading(true);
    
    // Create transaction record
    const { error: transactionError } = await supabase
      .from('transactions')
      .insert({
        user_id: user.id,
        type: 'withdrawal',
        amount: -amount,
        description,
        status: 'completed'
      });

    if (transactionError) {
      setLoading(false);
      return { error: transactionError.message };
    }

    // Update profile balance
    const newBalance = (profile?.balance || 0) - amount;
    const { error: profileError } = await supabase
      .from('profiles')
      .update({ balance: newBalance })
      .eq('user_id', user.id);

    if (profileError) {
      setLoading(false);
      return { error: profileError.message };
    }

    await fetchProfile();
    await fetchTransactions();
    setLoading(false);
    toast.success(`$${amount.toFixed(2)} withdrawn successfully!`);
    return { error: null };
  };

  const placeBet = async (betData: {
    player_name: string;
    team: string;
    opponent: string;
    stat_type: string;
    line: number;
    bet_type: 'over' | 'under';
    odds: number;
    amount: number;
    game_date?: string;
  }) => {
    if (!user) return { error: 'Not authenticated' };
    if ((profile?.balance || 0) < betData.amount) {
      return { error: 'Insufficient funds' };
    }

    setLoading(true);
    
    const potential_payout = betData.amount * (betData.odds > 0 ? (betData.odds / 100) + 1 : (100 / Math.abs(betData.odds)) + 1);

    // Create bet record
    const { error: betError } = await supabase
      .from('bets')
      .insert({
        user_id: user.id,
        ...betData,
        potential_payout,
        status: 'pending'
      });

    if (betError) {
      setLoading(false);
      return { error: betError.message };
    }

    // Create transaction record
    const { error: transactionError } = await supabase
      .from('transactions')
      .insert({
        user_id: user.id,
        type: 'bet_placed',
        amount: -betData.amount,
        description: `Bet: ${betData.player_name} ${betData.stat_type} ${betData.bet_type} ${betData.line}`,
        status: 'completed'
      });

    if (transactionError) {
      setLoading(false);
      return { error: transactionError.message };
    }

    // Update profile balance and bet count
    const newBalance = (profile?.balance || 0) - betData.amount;
    const newBetCount = (profile?.total_bets || 0) + 1;
    
    const { error: profileError } = await supabase
      .from('profiles')
      .update({ 
        balance: newBalance,
        total_bets: newBetCount
      })
      .eq('user_id', user.id);

    if (profileError) {
      setLoading(false);
      return { error: profileError.message };
    }

    await fetchProfile();
    await fetchTransactions();
    setLoading(false);
    toast.success(`Bet placed: $${betData.amount.toFixed(2)} on ${betData.player_name}!`);
    return { error: null };
  };

  useEffect(() => {
    if (user) {
      fetchTransactions();
    }
  }, [user]);

  return {
    transactions,
    loading,
    deposit,
    withdraw,
    placeBet,
    fetchTransactions,
  };
}