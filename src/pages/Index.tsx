import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Heart, Camera, TreePine, Compass, Sun, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import heroDuvora from '@/assets/hero-duvora.jpg';

const Index = () => {
  const navigate = useNavigate();

  const handleStartJourney = () => {
    navigate('/discovery');
  };

  const moods = [
    { name: "Romantic", icon: Heart, gradient: "from-secondary to-accent" },
    { name: "Instagram-worthy", icon: Camera, gradient: "from-primary to-primary-glow" },
    { name: "Jungle escapes", icon: TreePine, gradient: "from-accent to-secondary" },
    { name: "Adventure", icon: Compass, gradient: "from-primary-glow to-accent" }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Hero Background */}
      <div className="absolute inset-0">
        <img
          src={heroDuvora}
          alt="Tropical paradise in Sri Lanka"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-hero opacity-75" />
      </div>

      {/* Floating Elements - Responsive */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Heart 
          className="absolute top-1/4 left-1/4 w-8 h-8 text-secondary/30 animate-float hidden sm:block" 
          style={{ animationDelay: '0s' }}
        />
        <Camera 
          className="absolute top-1/3 right-1/4 w-6 h-6 text-accent/40 animate-drift hidden md:block" 
          style={{ animationDelay: '2s' }}
        />
        <TreePine 
          className="absolute bottom-1/3 left-1/5 w-10 h-10 text-primary/20 animate-float hidden lg:block" 
          style={{ animationDelay: '4s' }}
        />
        <Sun 
          className="absolute top-1/5 right-1/3 w-7 h-7 text-accent/35 animate-pulse-glow hidden sm:block" 
          style={{ animationDelay: '1s' }}
        />
        <Star 
          className="absolute bottom-1/4 right-1/5 w-5 h-5 text-secondary/25 animate-drift hidden md:block" 
          style={{ animationDelay: '3s' }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="container-xl pt-6 sm:pt-8 lg:pt-12">
          <div className="text-center animate-fade-in-up">
            <Badge className="card-glass text-white border-white/30 mb-4 text-sm px-4 py-2">
              Boutique Travel • Sri Lanka
            </Badge>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extralight text-white mb-2 tracking-wide">
              Duvora
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl font-light text-primary-glow italic mb-4">
              Collection
            </p>
            <div className="w-16 h-0.5 bg-white/60 mx-auto" />
          </div>
        </header>

        {/* Hero Content */}
        <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto space-y-8 sm:space-y-12">
            
            {/* Main Message */}
            <div className="space-y-4 sm:space-y-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-white leading-tight">
                Discover stays that match
                <br className="hidden sm:block" />
                <span className="block font-medium bg-gradient-to-r from-primary-glow to-white bg-clip-text text-transparent">
                  how you feel
                </span>
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
                Every journey begins with an emotion. Choose your mood, find your place, 
                and let Sri Lanka's hidden gems reveal themselves to your soul.
              </p>
            </div>

            {/* Mood Preview */}
            <div className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <p className="text-white/60 text-sm sm:text-base mb-6 uppercase tracking-wide">
                Start with how you feel
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-2xl mx-auto">
                {moods.map((mood, index) => (
                  <div
                    key={mood.name}
                    className="card-base card-glass p-3 sm:p-4 text-center group hover:scale-105 transition-all duration-300"
                    style={{ animationDelay: `${0.6 + index * 0.1}s` }}
                  >
                    <div className={`w-8 h-8 sm:w-10 sm:h-10 mx-auto mb-2 rounded-full bg-gradient-to-br ${mood.gradient} p-2 group-hover:shadow-glow transition-all duration-300`}>
                      <mood.icon className="w-full h-full text-white" />
                    </div>
                    <span className="text-xs sm:text-sm text-white/90 font-medium">
                      {mood.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
              <Button
                onClick={handleStartJourney}
                variant="hero"
                size="lg"
                className="px-8 sm:px-12 py-3 sm:py-4 text-base sm:text-lg font-medium rounded-xl"
              >
                Begin Your Journey
                <Compass className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
              </Button>
              <p className="text-white/50 text-xs sm:text-sm mt-4">
                No commitments • Instant discovery • Curated for you
              </p>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="container-xl pb-6 sm:pb-8 text-center">
          <div className="text-white/40 text-xs sm:text-sm">
            Crafted with care for travelers seeking meaningful connections
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
