import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Heart, Camera, TreePine, Compass, Sun, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';

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
    <>
      <Navigation />
      <div className="min-h-screen relative overflow-hidden">
        {/* Hero Background */}
        <div className="absolute inset-0">
          <img
            src={heroDuvora}
            alt="Tropical paradise in Sri Lanka showcasing the natural beauty that awaits travelers"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        </div>

        {/* Main Content */}
        <div className="relative z-10 min-h-screen flex flex-col pt-16">
          {/* Header */}
          <header className="container-xl pt-8 sm:pt-12 lg:pt-16">
          <div className="text-center animate-fade-in-up">
            <Badge className="bg-white/95 text-gray-800 border-0 mb-6 text-sm px-6 py-2 shadow-lg backdrop-blur-sm">
              Boutique Travel • Sri Lanka
            </Badge>
            <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extralight text-white mb-3 tracking-wide drop-shadow-lg">
              Duvora
            </div>
            <p className="text-xl sm:text-2xl md:text-3xl font-light text-white/90 italic mb-6">
              Collection
            </p>
            <div className="w-20 h-0.5 bg-white/80 mx-auto" />
          </div>
        </header>

          {/* Hero Content */}
          <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8" role="main">
            <div className="text-center max-w-4xl mx-auto space-y-8 sm:space-y-12">
              
              {/* Main Message */}
              <section className="space-y-6 sm:space-y-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-white leading-tight drop-shadow-lg">
                  Discover stays that match
                  <br className="hidden sm:block" />
                  <span className="block font-medium text-white">
                    how you feel
                  </span>
                </h1>
                <p className="text-lg sm:text-xl lg:text-2xl text-white/90 max-w-2xl mx-auto leading-relaxed drop-shadow-md">
                  Every journey begins with an emotion. Choose your mood, find your place, 
                  and let Sri Lanka reveal itself to you.
                </p>
              </section>

              {/* Mood Preview */}
              <section className="animate-fade-in-up" style={{ animationDelay: '0.4s' }} aria-labelledby="mood-preview">
                <h2 id="mood-preview" className="text-white/70 text-base sm:text-lg mb-8 font-light">
                  Start with how you feel
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-3xl mx-auto" role="list">
                  {moods.map((mood, index) => (
                    <div
                      key={mood.name}
                      className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 sm:p-6 text-center group hover:scale-105 hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl"
                      style={{ animationDelay: `${0.6 + index * 0.1}s` }}
                      role="listitem"
                    >
                      <div 
                        className={`w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 rounded-full bg-gradient-to-br ${mood.gradient} p-2.5 group-hover:shadow-lg transition-all duration-300`}
                        aria-hidden="true"
                      >
                        <mood.icon className="w-full h-full text-white" />
                      </div>
                      <span className="text-sm sm:text-base text-gray-800 font-medium">
                        {mood.name}
                      </span>
                    </div>
                  ))}
                </div>
              </section>

              {/* CTA */}
              <section className="animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
                <Button
                  onClick={handleStartJourney}
                  className="bg-white text-gray-900 hover:bg-gray-50 px-10 sm:px-14 py-4 sm:py-5 text-lg sm:text-xl font-medium rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                  aria-describedby="cta-description"
                >
                  Begin Your Journey
                  <Compass className="w-5 h-5 sm:w-6 sm:h-6 ml-3" aria-hidden="true" />
                </Button>
                <p id="cta-description" className="text-white/60 text-sm sm:text-base mt-6 font-light">
                  No commitments • Instant discovery • Curated for you
                </p>
              </section>
             </div>
           </main>

           {/* Footer */}
          <footer className="container-xl pb-6 sm:pb-8 text-center" role="contentinfo">
            <div className="text-white/40 text-xs sm:text-sm">
              Crafted with care for travelers seeking meaningful connections
            </div>
          </footer>
        </div>
      </div>
    </>
  );
};

export default Index;
