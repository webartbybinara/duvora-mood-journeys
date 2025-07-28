import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Heart, Camera, TreePine } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import heroDuvora from '@/assets/hero-duvora.jpg';

const Index = () => {
  const navigate = useNavigate();

  const handleStartJourney = () => {
    navigate('/discovery');
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Hero Background */}
      <div className="absolute inset-0">
        <img
          src={heroDuvora}
          alt="Duvora Collection - Tropical Paradise"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/40" />
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 animate-float">
        <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center">
          <Heart className="w-8 h-8 text-white" />
        </div>
      </div>
      
      <div className="absolute top-40 right-16 animate-drift">
        <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center">
          <Camera className="w-6 h-6 text-white" />
        </div>
      </div>

      <div className="absolute bottom-32 left-20 animate-float" style={{ animationDelay: '2s' }}>
        <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center">
          <TreePine className="w-7 h-7 text-white" />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-4xl mx-auto animate-fade-in-up">
          {/* Brand Header */}
          <div className="mb-8">
            <Badge className="bg-white/20 backdrop-blur-md text-white border-white/30 mb-4 text-sm px-4 py-2">
              Boutique Travel • Sri Lanka
            </Badge>
            <h1 className="text-5xl md:text-7xl font-extralight text-white mb-4 tracking-wide">
              Duvora
              <span className="block text-3xl md:text-4xl font-light text-primary-glow italic">
                Collection
              </span>
            </h1>
          </div>

          {/* Main Message */}
          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-light text-white/90 mb-6 leading-relaxed">
              Discover stays that match
              <br />
              <span className="text-primary-glow">how you feel</span>
            </h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
              Every journey begins with an emotion. Choose your mood, find your place, 
              and let Sri Lanka's hidden gems reveal themselves to your soul.
            </p>
          </div>

          {/* Mood Preview */}
          <div className="mb-12">
            <p className="text-white/70 text-sm uppercase tracking-wide mb-4">
              Start with how you feel
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {[
                { name: 'Jungle Mornings', icon: TreePine },
                { name: 'Romantic Hideouts', icon: Heart },
                { name: 'Instagram Worthy', icon: Camera },
                { name: 'Soulful Solitude', icon: Sparkles }
              ].map((mood, index) => {
                const Icon = mood.icon;
                return (
                  <Badge
                    key={mood.name}
                    variant="outline"
                    className="bg-white/10 backdrop-blur-md text-white border-white/30 hover:bg-white/20 transition-all duration-300 px-4 py-2 animate-fade-in-up"
                    style={{ animationDelay: `${index * 200}ms` }}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {mood.name}
                  </Badge>
                );
              })}
            </div>
          </div>

          {/* CTA */}
          <div className="space-y-4">
            <Button
              onClick={handleStartJourney}
              variant="mood"
              size="lg"
              className="px-12 py-4 text-lg shadow-glow hover:shadow-dreamy"
            >
              Begin Your Journey
              <Sparkles className="w-5 h-5 ml-2" />
            </Button>
            <p className="text-white/60 text-sm">
              No booking required • Curated with love
            </p>
          </div>
        </div>
      </div>

      {/* Ambient Elements */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/50 to-transparent" />
    </div>
  );
};

export default Index;
