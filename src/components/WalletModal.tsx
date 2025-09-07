import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/hooks/useAuth';
import { useWallet } from '@/hooks/useWallet';
import { CreditCard, Wallet, ArrowUpRight, ArrowDownLeft, Clock, CheckCircle, XCircle } from 'lucide-react';
import { toast } from 'sonner';

interface WalletModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function WalletModal({ open, onOpenChange }: WalletModalProps) {
  const { profile } = useAuth();
  const { transactions, deposit, withdraw, loading } = useWallet();
  const [depositAmount, setDepositAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');

  const handleDeposit = async (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(depositAmount);
    if (isNaN(amount) || amount <= 0) {
      toast.error('Please enter a valid deposit amount');
      return;
    }
    
    const { error } = await deposit(amount);
    if (!error) {
      setDepositAmount('');
    }
  };

  const handleWithdraw = async (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(withdrawAmount);
    if (isNaN(amount) || amount <= 0) {
      toast.error('Please enter a valid withdrawal amount');
      return;
    }
    
    const { error } = await withdraw(amount);
    if (!error) {
      setWithdrawAmount('');
    }
  };

  const getTransactionIcon = (type: string, status: string) => {
    if (status === 'pending') return <Clock className="h-4 w-4 text-yellow-500" />;
    if (status === 'failed') return <XCircle className="h-4 w-4 text-red-500" />;
    
    switch (type) {
      case 'deposit':
      case 'bet_won':
      case 'bonus':
        return <ArrowDownLeft className="h-4 w-4 text-green-500" />;
      case 'withdrawal':
      case 'bet_placed':
      case 'bet_lost':
        return <ArrowUpRight className="h-4 w-4 text-red-500" />;
      default:
        return <CheckCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  const formatTransactionType = (type: string) => {
    return type.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Wallet className="h-5 w-5" />
            <span>Your Wallet</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Balance Display */}
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-6 rounded-lg">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Available Balance</p>
              <p className="text-3xl font-bold text-primary">
                ${profile?.balance?.toFixed(2) || '0.00'}
              </p>
              <div className="flex justify-center space-x-4 mt-2 text-sm text-muted-foreground">
                <span>Total Bets: {profile?.total_bets || 0}</span>
                <span>Total Winnings: ${profile?.total_winnings?.toFixed(2) || '0.00'}</span>
              </div>
            </div>
          </div>

          <Tabs defaultValue="deposit" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="deposit">Deposit</TabsTrigger>
              <TabsTrigger value="withdraw">Withdraw</TabsTrigger>
              <TabsTrigger value="history">Transactions</TabsTrigger>
            </TabsList>
            
            <TabsContent value="deposit" className="space-y-4">
              <form onSubmit={handleDeposit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="deposit-amount">Deposit Amount</Label>
                  <Input
                    id="deposit-amount"
                    type="number"
                    step="0.01"
                    min="0.01"
                    placeholder="50.00"
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
                    required
                  />
                </div>
                <div className="flex space-x-2">
                  {[25, 50, 100, 200].map(amount => (
                    <Button
                      key={amount}
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setDepositAmount(amount.toString())}
                    >
                      ${amount}
                    </Button>
                  ))}
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  <CreditCard className="mr-2 h-4 w-4" />
                  Deposit Funds
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="withdraw" className="space-y-4">
              <form onSubmit={handleWithdraw} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="withdraw-amount">Withdrawal Amount</Label>
                  <Input
                    id="withdraw-amount"
                    type="number"
                    step="0.01"
                    min="0.01"
                    max={profile?.balance || 0}
                    placeholder="25.00"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    required
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  Maximum: ${profile?.balance?.toFixed(2) || '0.00'}
                </p>
                <Button type="submit" className="w-full" disabled={loading}>
                  <ArrowUpRight className="mr-2 h-4 w-4" />
                  Withdraw Funds
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="history" className="space-y-4">
              <div className="max-h-96 overflow-y-auto space-y-2">
                {transactions.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">
                    No transactions yet
                  </p>
                ) : (
                  transactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        {getTransactionIcon(transaction.type, transaction.status)}
                        <div>
                          <p className="font-medium">{formatTransactionType(transaction.type)}</p>
                          <p className="text-sm text-muted-foreground">{transaction.description}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(transaction.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-medium ${
                          transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                        </p>
                        <p className="text-xs text-muted-foreground capitalize">
                          {transaction.status}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}