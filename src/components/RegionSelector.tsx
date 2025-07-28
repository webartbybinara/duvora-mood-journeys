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
    <div className="min-h-screen bg-gradient-serene py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Button variant="ghost" onClick={onBack} className="text-muted-foreground hover:text-foreground">
              ← Back to Moods
            </Button>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-light text-foreground mb-4">
            Where shall we take you?
          </h1>
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
            Based on your mood selection, these regions resonate with your spirit. Choose your destination to discover curated stays.
          </p>

          {/* Selected Moods Display */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            {selectedMoods.map((mood) => (
              <Badge key={mood} variant="secondary" className="capitalize">
                {mood.replace('-', ' ')}
              </Badge>
            ))}
          </div>
        </div>

        {/* Recommended Regions */}
        {matchingRegions.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-light text-foreground mb-6 text-center">
              Perfect for Your Mood
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {matchingRegions.map((region, index) => (
                <RegionCard
                  key={region.id}
                  region={region}
                  isSelected={selectedRegion === region.id}
                  isRecommended={true}
                  animationDelay={index * 100}
                  onClick={() => onRegionSelect(region.id)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Other Regions */}
        {otherRegions.length > 0 && (
          <div className="mb-12">
            <h2 className="text-xl font-light text-muted-foreground mb-6 text-center">
              Other Beautiful Destinations
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {otherRegions.map((region, index) => (
                <RegionCard
                  key={region.id}
                  region={region}
                  isSelected={selectedRegion === region.id}
                  isRecommended={false}
                  animationDelay={(matchingRegions.length + index) * 100}
                  onClick={() => onRegionSelect(region.id)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Continue Button */}
        {selectedRegion && (
          <div className="text-center animate-fade-in-up">
            <Button
              onClick={onContinue}
              variant="mood"
              size="lg"
              className="px-12 py-4 text-lg"
            >
              Discover Your Stays
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        )}
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
}

function RegionCard({ region, isSelected, isRecommended, animationDelay, onClick }: RegionCardProps) {
  return (
    <Card
      className={`cursor-pointer transition-all duration-500 hover:scale-105 group ${
        isSelected
          ? 'ring-2 ring-primary shadow-glow'
          : 'hover:shadow-dreamy'
      } ${isRecommended ? 'border-primary/30' : ''}`}
      style={{
        animationDelay: `${animationDelay}ms`
      }}
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
