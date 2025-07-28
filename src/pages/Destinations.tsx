import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Star, Camera, Heart, TreePine, Waves, Sunrise, Sparkles } from 'lucide-react';
import { Navigation } from '@/components/Navigation';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { useNavigate } from 'react-router-dom';

import soulfulSolitude from '@/assets/soulful-solitude.jpg';
import romanticHideouts from '@/assets/romantic-hideouts.jpg';
import instagramWorthy from '@/assets/instagram-worthy.jpg';
import jungleMornings from '@/assets/jungle-mornings.jpg';

interface Destination {
  id: string;
  name: string;
  description: string;
  image: string;
  highlights: string[];
  moodTags: Array<{
    id: string;
    name: string;
    icon: any;
    color: string;
  }>;
  propertyCount: number;
  priceRange: string;
  bestTime: string;
}

const destinations: Destination[] = [
  {
    id: 'kandy',
    name: 'Kandy',
    description: 'Cultural heart surrounded by misty mountains, where ancient temples meet modern luxury.',
    image: soulfulSolitude,
    highlights: ['Temple of Tooth', 'Royal Botanical Gardens', 'Tea Plantations', 'Cultural Shows'],
    moodTags: [
      { id: 'soulful-solitude', name: 'Soulful Solitude', icon: Sparkles, color: 'purple' },
      { id: 'sunrise-sessions', name: 'Sunrise Sessions', icon: Sunrise, color: 'amber' }
    ],
    propertyCount: 12,
    priceRange: 'Mid-Range to Luxury',
    bestTime: 'Dec - Apr'
  },
  {
    id: 'galle',
    name: 'Galle',
    description: 'Historic coastal charm where Dutch colonial architecture meets tropical romance.',
    image: romanticHideouts,
    highlights: ['Dutch Fort', 'Lighthouse', 'Art Galleries', 'Sunset Beaches'],
    moodTags: [
      { id: 'romantic-hideouts', name: 'Romantic Hideouts', icon: Heart, color: 'rose' },
      { id: 'coastal-serenity', name: 'Coastal Serenity', icon: Waves, color: 'blue' }
    ],
    propertyCount: 18,
    priceRange: 'Luxury Experience',
    bestTime: 'Nov - Apr'
  },
  {
    id: 'ella',
    name: 'Ella',
    description: 'Instagram paradise nestled in cloud forests with breathtaking train journeys.',
    image: instagramWorthy,
    highlights: ['Nine Arch Bridge', 'Little Adams Peak', 'Tea Country', 'Train Rides'],
    moodTags: [
      { id: 'instagram-worthy', name: 'Instagram Worthy', icon: Camera, color: 'cyan' },
      { id: 'sunrise-sessions', name: 'Sunrise Sessions', icon: Sunrise, color: 'amber' }
    ],
    propertyCount: 15,
    priceRange: 'Budget to Mid-Range',
    bestTime: 'Dec - Sep'
  },
  {
    id: 'yala',
    name: 'Yala National Park',
    description: 'Wild adventures where jungle luxury meets Sri Lanka\'s most diverse wildlife.',
    image: jungleMornings,
    highlights: ['Leopard Safaris', 'Luxury Camps', 'Bird Watching', 'Wilderness Dining'],
    moodTags: [
      { id: 'jungle-mornings', name: 'Jungle Mornings', icon: TreePine, color: 'emerald' }
    ],
    propertyCount: 8,
    priceRange: 'Luxury Experience',
    bestTime: 'Feb - Jul'
  }
];

const Destinations = () => {
  const navigate = useNavigate();
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  const handleDiscoverStays = (destinationId: string) => {
    // Navigate to discovery with pre-selected region
    navigate(`/discovery?region=${destinationId}`);
  };

  const filteredDestinations = selectedMood 
    ? destinations.filter(dest => dest.moodTags.some(tag => tag.id === selectedMood))
    : destinations;

  const allMoodTags = Array.from(
    new Set(destinations.flatMap(dest => dest.moodTags.map(tag => tag.id)))
  ).map(moodId => {
    const mood = destinations.flatMap(dest => dest.moodTags).find(tag => tag.id === moodId);
    return mood!;
  });

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-gradient-serene pt-20">
        <div className="container-xl py-8 lg:py-12">
          <Breadcrumbs />
          
          <article className="max-w-6xl mx-auto">
            {/* Header */}
            <header className="text-center mb-12 animate-fade-in-up">
              <Badge className="mb-4 text-sm px-4 py-2">
                Curated Destinations
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-foreground mb-6">
                Discover Sri Lanka's
                <br />
                <span className="text-primary">Hidden Gems</span>
              </h1>
              <p className="text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                From misty mountains to pristine beaches, each destination offers unique experiences 
                tailored to different moods and travel desires.
              </p>
            </header>

            {/* Mood Filter */}
            <section className="mb-12 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="text-center mb-8">
                <h2 className="text-2xl font-light text-foreground mb-4">
                  Filter by Mood
                </h2>
                <div className="flex flex-wrap justify-center gap-3">
                  <Button
                    variant={selectedMood === null ? "default" : "outline"}
                    onClick={() => setSelectedMood(null)}
                    className="rounded-full"
                  >
                    All Destinations
                  </Button>
                  {allMoodTags.map((mood) => {
                    const Icon = mood.icon;
                    return (
                      <Button
                        key={mood.id}
                        variant={selectedMood === mood.id ? "default" : "outline"}
                        onClick={() => setSelectedMood(mood.id)}
                        className="rounded-full"
                      >
                        <Icon className="w-4 h-4 mr-2" />
                        {mood.name}
                      </Button>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* Destinations Grid - Layered Depth Design */}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
              {filteredDestinations.map((destination, index) => (
                <div 
                  key={destination.id} 
                  className="group relative animate-fade-in-up" 
                  style={{ animationDelay: `${0.4 + index * 0.1}s` }}
                >
                  {/* Main Card Container with Layered Effect */}
                  <div className="relative bg-gradient-card backdrop-blur-sm rounded-2xl border border-border/30 overflow-hidden shadow-subtle hover:shadow-dreamy transition-all duration-700 group-hover:scale-[1.02]">
                    
                    {/* Background Glow Effect */}
                    <div className="absolute -inset-0.5 bg-gradient-tropical opacity-0 group-hover:opacity-20 rounded-2xl blur-sm transition-opacity duration-700" />
                    
                    {/* Hero Image Section */}
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={destination.image}
                        alt={`${destination.name} destination`}
                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                        loading="lazy"
                      />
                      
                      {/* Multi-layered Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 opacity-60" />
                      
                      {/* Floating Property Count Badge */}
                      <div className="absolute top-4 left-4 transform group-hover:scale-110 transition-transform duration-300">
                        <div className="bg-background/95 backdrop-blur-md text-foreground px-3 py-1.5 rounded-full text-xs font-medium border border-border/50 shadow-medium">
                          {destination.propertyCount} Properties
                        </div>
                      </div>
                      
                      {/* Floating Price Range Badge */}
                      <div className="absolute top-4 right-4 transform group-hover:scale-110 transition-transform duration-300">
                        <div className="bg-primary/90 backdrop-blur-md text-primary-foreground px-3 py-1.5 rounded-full text-xs font-medium shadow-glow">
                          {destination.priceRange}
                        </div>
                      </div>

                      {/* Bottom Title Overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <div className="flex items-end justify-between">
                          <div>
                            <h3 className="text-2xl lg:text-3xl font-light text-white mb-2 flex items-center gap-2">
                              <MapPin className="w-5 h-5 text-primary-glow" />
                              {destination.name}
                            </h3>
                            <p className="text-white/90 text-sm leading-relaxed max-w-sm">
                              {destination.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Content Layers */}
                    <div className="relative bg-card/95 backdrop-blur-sm">
                      {/* Mood Tags Layer */}
                      <div className="p-6 pb-4 border-b border-border/30">
                        <div className="flex items-center justify-between mb-4">
                          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            Perfect For
                          </p>
                          <div className="text-xs text-muted-foreground">
                            Best: {destination.bestTime}
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {destination.moodTags.map((mood) => {
                            const Icon = mood.icon;
                            return (
                              <div
                                key={mood.id}
                                className="group/mood relative bg-gradient-card border border-border/50 hover:border-primary/50 px-3 py-1.5 rounded-full transition-all duration-300 hover:shadow-float"
                              >
                                <div className="flex items-center gap-1.5 text-xs font-medium">
                                  <Icon className="w-3.5 h-3.5 text-primary" />
                                  <span className="text-foreground">{mood.name}</span>
                                </div>
                                {/* Subtle hover glow */}
                                <div className="absolute inset-0 bg-primary/5 rounded-full opacity-0 group-hover/mood:opacity-100 transition-opacity duration-300" />
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Highlights Layer */}
                      <div className="p-6 pt-4">
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
                          Must-See Highlights
                        </p>
                        <div className="grid grid-cols-2 gap-3 mb-6">
                          {destination.highlights.map((highlight, idx) => (
                            <div 
                              key={highlight} 
                              className="flex items-center gap-2 text-sm text-muted-foreground group/highlight"
                              style={{ animationDelay: `${idx * 0.1}s` }}
                            >
                              <div className="w-1.5 h-1.5 bg-gradient-tropical rounded-full flex-shrink-0 group-hover/highlight:shadow-glow transition-shadow duration-300" />
                              <span className="group-hover/highlight:text-foreground transition-colors duration-300">{highlight}</span>
                            </div>
                          ))}
                        </div>

                        {/* Action Button */}
                        <Button 
                          onClick={() => handleDiscoverStays(destination.id)}
                          className="w-full bg-gradient-tropical hover:shadow-glow transition-all duration-300 group-hover:scale-[1.02] font-medium"
                          size="lg"
                        >
                          Discover {destination.name} Stays
                          <Star className="w-4 h-4 ml-2 group-hover:rotate-12 transition-transform duration-300" />
                        </Button>
                      </div>
                    </div>
                    
                    {/* Floating Decorative Elements */}
                    <div className="absolute -bottom-2 -right-2 w-24 h-24 bg-gradient-sunset opacity-10 rounded-full blur-xl group-hover:opacity-20 transition-opacity duration-700" />
                    <div className="absolute -top-2 -left-2 w-16 h-16 bg-gradient-tropical opacity-10 rounded-full blur-lg group-hover:opacity-20 transition-opacity duration-700" />
                  </div>
                </div>
              ))}
            </section>

            {/* CTA Section */}
            <section className="text-center animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
              <Card className="p-12 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
                <h2 className="text-3xl font-light text-foreground mb-6">
                  Ready to Begin Your Journey?
                </h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Let your emotions guide you to the perfect destination. 
                  Start with our mood discovery to find stays that resonate with your soul.
                </p>
                <Button 
                  onClick={() => navigate('/discovery')}
                  variant="default" 
                  size="lg"
                  className="px-8 py-4"
                >
                  Start Mood Discovery
                  <Heart className="w-5 h-5 ml-2" />
                </Button>
              </Card>
            </section>
          </article>
        </div>
      </main>
    </>
  );
};

export default Destinations;