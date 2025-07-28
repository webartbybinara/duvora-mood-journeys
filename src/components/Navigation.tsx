import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, X, Compass, Heart, Phone, Info, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

const navigationItems = [
  { name: 'Home', href: '/', icon: Compass },
  { name: 'Mood Discovery', href: '/discovery', icon: Heart },
  { name: 'Destinations', href: '/destinations', icon: MapPin },
  { name: 'About Us', href: '/about', icon: Info },
  { name: 'Contact', href: '/contact', icon: Phone },
];

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const NavLink = ({ item, mobile = false }: { item: typeof navigationItems[0]; mobile?: boolean }) => {
    const isActive = location.pathname === item.href;
    const Icon = item.icon;
    
    return (
      <Link
        to={item.href}
        className={cn(
          "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
          mobile 
            ? "w-full justify-start hover:bg-accent/50"
            : "hover:bg-white/10",
          isActive 
            ? mobile 
              ? "bg-primary text-primary-foreground" 
              : "bg-white/20 text-white"
            : mobile
              ? "text-foreground hover:text-foreground"
              : "text-white/80 hover:text-white"
        )}
        onClick={() => mobile && setIsMobileMenuOpen(false)}
        aria-current={isActive ? 'page' : undefined}
      >
        <Icon className="w-4 h-4" aria-hidden="true" />
        {item.name}
      </Link>
    );
  };

  return (
    <nav 
      className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="container-xl">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-2 text-white font-light text-xl"
            aria-label="Duvora Collection - Home"
          >
            <Compass className="w-6 h-6 text-primary" aria-hidden="true" />
            Duvora
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navigationItems.map((item) => (
              <NavLink key={item.name} item={item} />
            ))}
          </div>

          {/* Mobile Menu Button */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden text-white hover:bg-white/10"
                aria-label="Open navigation menu"
              >
                <Menu className="w-5 h-5" aria-hidden="true" />
              </Button>
            </SheetTrigger>
            <SheetContent 
              side="right" 
              className="w-80 bg-background/95 backdrop-blur-md"
              aria-label="Mobile navigation menu"
            >
              <div className="flex flex-col gap-4 mt-8">
                <div className="flex items-center gap-2 mb-6">
                  <Compass className="w-6 h-6 text-primary" aria-hidden="true" />
                  <span className="text-xl font-light">Duvora Collection</span>
                </div>
                
                {navigationItems.map((item) => (
                  <NavLink key={item.name} item={item} mobile />
                ))}
                
                <div className="mt-8 pt-8 border-t border-border">
                  <Button 
                    asChild 
                    variant="default" 
                    className="w-full"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Link to="/discovery">Start Your Journey</Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}