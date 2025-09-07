import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "react-router-dom";
import { User, LogOut, Wallet } from "lucide-react";
import { useState } from "react";
import WalletModal from "./WalletModal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navigation = () => {
  const { user, profile, signOut, loading } = useAuth();
  const [walletModalOpen, setWalletModalOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <>
      <nav className="w-full bg-background/80 backdrop-blur-md border-b border-border/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link to="/" className="text-2xl font-bold bg-gradient-hero bg-clip-text text-transparent">
                Pickage
              </Link>
              <div className="hidden md:flex items-center space-x-8 ml-12">
                <a href="#features" className="text-foreground hover:text-secondary transition-colors">
                  Features
                </a>
                <a href="#analytics" className="text-foreground hover:text-secondary transition-colors">
                  Analytics
                </a>
                <a href="#swipe" className="text-foreground hover:text-secondary transition-colors">
                  Pickage Swipe
                </a>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="text-xs">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                Live Data
              </Badge>
              
              {user && profile && (
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setWalletModalOpen(true)} 
                    className="flex items-center space-x-2 px-3 py-1 bg-secondary/50 rounded-full hover:bg-secondary/70 transition-colors cursor-pointer"
                  >
                    <Wallet className="h-4 w-4 text-green-500" />
                    <span className="text-sm font-medium">${profile.balance?.toFixed(2) || '0.00'}</span>
                  </button>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                        <User className="h-4 w-4" />
                        <span>{profile.display_name || 'User'}</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <User className="mr-2 h-4 w-4" />
                        Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setWalletModalOpen(true)}>
                        <Wallet className="mr-2 h-4 w-4" />
                        Wallet
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleSignOut}>
                        <LogOut className="mr-2 h-4 w-4" />
                        Sign Out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              )}
              
              {!user && !loading && (
                <>
                  <Link to="/auth">
                    <Button variant="ghost" size="sm">
                      Login
                    </Button>
                  </Link>
                  <Link to="/auth">
                    <Button variant="default" size="sm" className="bg-gradient-secondary shadow-secondary">
                      Get Started
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
      
      <WalletModal open={walletModalOpen} onOpenChange={setWalletModalOpen} />
    </>
  );
};

export default Navigation;