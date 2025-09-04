import { Github, Twitter, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold mb-4 bg-gradient-success bg-clip-text text-transparent">
              Pickage
            </h3>
            <p className="text-primary-foreground/80 mb-6 max-w-md">
              The future of sports betting. Smart. Fast. Data-driven. 
              Experience betting like never before with our innovative swipe interface and advanced analytics.
            </p>
            <div className="flex space-x-4">
              <Github className="h-5 w-5 text-primary-foreground/60 hover:text-primary-foreground cursor-pointer transition-colors" />
              <Twitter className="h-5 w-5 text-primary-foreground/60 hover:text-primary-foreground cursor-pointer transition-colors" />
              <Linkedin className="h-5 w-5 text-primary-foreground/60 hover:text-primary-foreground cursor-pointer transition-colors" />
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Platform</h4>
            <ul className="space-y-2 text-primary-foreground/80">
              <li><a href="#features" className="hover:text-primary-foreground transition-colors">Features</a></li>
              <li><a href="#analytics" className="hover:text-primary-foreground transition-colors">Analytics</a></li>
              <li><a href="#swipe" className="hover:text-primary-foreground transition-colors">Pickage Swipe</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Live Betting</a></li>
            </ul>
          </div>
          
          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-primary-foreground/80">
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Responsible Gaming</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Terms & Privacy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-primary-foreground/60">
          <p>&copy; 2024 Pickage. All rights reserved. | Must be 21+ to play. Gamble responsibly.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;