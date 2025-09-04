import { Button } from "@/components/ui/button";

const Navigation = () => {
  return (
    <nav className="w-full bg-background/80 backdrop-blur-md border-b border-border/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <div className="text-2xl font-bold bg-gradient-hero bg-clip-text text-transparent">
              Pickage
            </div>
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
            <Button variant="ghost" size="sm">
              Login
            </Button>
            <Button variant="default" size="sm" className="bg-gradient-secondary shadow-secondary">
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;