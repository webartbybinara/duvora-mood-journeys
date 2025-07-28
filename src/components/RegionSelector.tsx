import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, ChevronRight } from 'lucide-react';

interface Region {
  id: string;
  name: string;
  description: string;
  highlights: string[];
  mood: string;
}

const regions: Region[] = [
  {
    id: 'galle',
    name: 'Galle',
    description: 'Historic coastal charm meets tropical luxury',
    highlights: ['Dutch Fort', 'Lighthouse', 'Boutique Hotels', 'Sunset Views'],
    mood: 'romantic-hideouts'
  },
  {
    id: 'kandy',
    name: 'Kandy',
    description: 'Cultural heart surrounded by misty mountains',
    highlights: ['Temple of Tooth', 'Royal Gardens', 'Hill Country', 'Tea Estates'],
    mood: 'soulful-solitude'
  },
  {
    id: 'ella',
    name: 'Ella',
    description: 'Instagram paradise in the cloud forests',
    highlights: ['Nine Arch Bridge', 'Little Adams Peak', 'Tea Plantations', 'Train Journeys'],
    mood: 'instagram-worthy'
  },
  {
    id: 'yala',
    name: 'Yala',
    description: 'Wild adventures where jungle meets luxury',
    highlights: ['Safari Lodges', 'Leopard Spotting', 'Jungle Camps', 'Wildlife Photography'],
    mood: 'jungle-mornings'
  },
  {
    id: 'mirissa',
    name: 'Mirissa',
    description: 'Bohemian beach vibes and whale watching',
    highlights: ['Whale Watching', 'Beach Clubs', 'Sunset Spots', 'Coconut Hill'],
    mood: 'coastal-serenity'
  },
  {
    id: 'sigiriya',
    name: 'Sigiriya',
    description: 'Ancient wonder with sunrise ceremonies',
    highlights: ['Rock Fortress', 'Ancient Frescoes', 'Sunrise Climbs', 'Luxury Camps'],
    mood: 'sunrise-sessions'
  }
];

interface RegionSelectorProps {
  selectedMoods: string[];
  selectedRegion: string | null;
  onRegionSelect: (regionId: string) => void;
  onContinue: () => void;
  onBack: () => void;
}

export function RegionSelector({ selectedMoods, selectedRegion, onRegionSelect, onContinue, onBack }: RegionSelectorProps) {
  // Filter regions that match selected moods
  const matchingRegions = regions.filter(region => 
    selectedMoods.includes(region.mood) || selectedMoods.length === 0
  );

  const otherRegions = regions.filter(region => 
    !selectedMoods.includes(region.mood) && selectedMoods.length > 0
  );

  return (
    <div className="min-h-screen bg-gradient-serene relative overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/5 rounded-full blur-xl animate-float" />
        <div className="absolute top-40 right-20 w-24 h-24 bg-accent/10 rounded-full blur-lg animate-drift" />
        <div className="absolute bottom-40 left-20 w-40 h-40 bg-secondary/5 rounded-full blur-2xl animate-float" style={{animationDelay: '2s'}} />
        <div className="absolute bottom-20 right-10 w-20 h-20 bg-primary/8 rounded-full blur-lg animate-drift" style={{animationDelay: '4s'}} />
      </div>

      <div className="relative z-10 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 animate-fade-in-up">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Button variant="ghost" onClick={onBack} className="text-muted-foreground hover:text-foreground bg-background/80 border border-border/30">
                ← Back to Moods
              </Button>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-light text-foreground mb-6 tracking-tight">
              Where shall we take you?
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Based on your mood selection, these regions resonate with your spirit. Choose your destination to discover curated stays.
            </p>

            {/* Selected Moods Display */}
            <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
              {selectedMoods.map((mood) => (
                <Badge key={mood} variant="secondary" className="capitalize px-4 py-2 text-sm bg-secondary/60 border border-secondary/30">
                  {mood.replace('-', ' ')}
                </Badge>
              ))}
            </div>
          </div>

          {/* Recommended Regions */}
          {matchingRegions.length > 0 && (
            <div className="mb-20">
              <h2 className="text-3xl font-light text-foreground mb-12 text-center">
                Perfect for Your Mood
              </h2>
              <div className="relative">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                  {matchingRegions.map((region, index) => (
                    <div
                      key={region.id}
                      className="w-full"
                      style={{
                        transform: `translateY(${index * 15}px) rotate(${index % 2 === 0 ? '-0.5deg' : '0.5deg'})`,
                        animationDelay: `${index * 200}ms`
                      }}
                    >
                      <RegionCard
                        region={region}
                        isSelected={selectedRegion === region.id}
                        isRecommended={true}
                        animationDelay={index * 200}
                        onClick={() => onRegionSelect(region.id)}
                        cardIndex={index}
                        isStaggered={true}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Other Regions */}
          {otherRegions.length > 0 && (
            <div className="mb-16">
              <h2 className="text-2xl font-light text-muted-foreground mb-10 text-center">
                Other Beautiful Destinations
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {otherRegions.map((region, index) => (
                  <div
                    key={region.id}
                    style={{
                      transform: `translateY(${(index % 3) * 10}px) rotate(${index % 2 === 0 ? '0.5deg' : '-0.5deg'})`,
                      animationDelay: `${(matchingRegions.length + index) * 150}ms`
                    }}
                  >
                    <RegionCard
                      region={region}
                      isSelected={selectedRegion === region.id}
                      isRecommended={false}
                      animationDelay={(matchingRegions.length + index) * 150}
                      onClick={() => onRegionSelect(region.id)}
                      cardIndex={index}
                      isStaggered={false}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Continue Button */}
          {selectedRegion && (
            <div className="text-center animate-fade-in-up relative z-20">
              <div className="inline-block">
                <Button
                  onClick={onContinue}
                  variant="mood"
                  size="lg"
                  className="px-16 py-6 text-xl bg-primary border border-primary/30 hover:bg-primary/90 shadow-glow hover:shadow-strong transition-all duration-300 hover:scale-105"
                >
                  Discover Your Stays
                  <ChevronRight className="w-6 h-6 ml-3" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

interface RegionCardProps {
  region: Region;
  isSelected: boolean;
  isRecommended: boolean;
  animationDelay: number;
  onClick: () => void;
  cardIndex: number;
  isStaggered: boolean;
}

function RegionCard({ region, isSelected, isRecommended, animationDelay, onClick, cardIndex, isStaggered }: RegionCardProps) {
  const getCardStyle = () => {
    if (isStaggered) {
      return {
        animationDelay: `${animationDelay}ms`,
        // Additional staggered styling is handled by parent container
      };
    }
    return {
      animationDelay: `${animationDelay}ms`,
    };
  };

  return (
    <Card
      className={`cursor-pointer transition-all duration-500 group animate-fade-in-up
        ${isSelected
          ? 'ring-2 ring-primary shadow-glow scale-105 bg-gradient-card'
          : 'hover:shadow-strong hover:scale-105 hover:-translate-y-2'
        } 
        ${isRecommended 
          ? 'border-primary/40 bg-card shadow-medium' 
          : 'bg-card/90 border-border/30'
        }
        ${isStaggered ? 'hover:rotate-0 hover:z-50' : ''}
      `}
      style={getCardStyle()}
      onClick={onClick}
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="w-5 h-5 text-primary" />
              <h3 className="text-xl font-medium text-foreground">
                {region.name}
              </h3>
              {isRecommended && (
                <Badge variant="default" className="text-xs">
                  Recommended
                </Badge>
              )}
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {region.description}
            </p>
          </div>
          
          {isSelected && (
            <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center animate-pulse-glow">
              <div className="w-2 h-2 bg-primary-foreground rounded-full" />
            </div>
          )}
        </div>

        {/* Highlights */}
        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Highlights
          </p>
          <div className="flex flex-wrap gap-2">
            {region.highlights.map((highlight) => (
              <Badge
                key={highlight}
                variant="outline"
                className="text-xs border-border/50 hover:border-primary/50 transition-colors"
              >
                {highlight}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
