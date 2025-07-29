import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, ChevronRight, Stamp, Star, Heart } from 'lucide-react';

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

// Postcard stamp designs for each region
const regionStamps = {
  galle: { icon: Heart, color: 'text-red-500', stamp: 'HISTORIC' },
  kandy: { icon: Star, color: 'text-purple-500', stamp: 'CULTURAL' },
  ella: { icon: MapPin, color: 'text-green-500', stamp: 'SCENIC' },
  yala: { icon: Star, color: 'text-orange-500', stamp: 'WILDLIFE' },
  mirissa: { icon: Heart, color: 'text-blue-500', stamp: 'COASTAL' },
  sigiriya: { icon: MapPin, color: 'text-yellow-600', stamp: 'ANCIENT' }
};

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
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 relative overflow-hidden">
      {/* Vintage Paper Texture Background */}
      <div className="absolute inset-0 opacity-30 pointer-events-none" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill-opacity='0.03'%3E%3Cpolygon fill='%23000' points='50 0 60 40 100 50 60 60 50 100 40 60 0 50 40 40'/%3E%3C/g%3E%3C/svg%3E")`
      }} />
      
      {/* Floating Travel Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-16 h-16 opacity-20 rotate-12 animate-float">
          <div className="w-full h-full border-4 border-red-500 rounded-full border-dashed" />
        </div>
        <div className="absolute top-40 right-20 w-12 h-12 opacity-15 -rotate-6 animate-drift">
          <div className="w-full h-full bg-blue-500 transform rotate-45" />
        </div>
        <div className="absolute bottom-40 left-20 text-6xl opacity-10 rotate-45 animate-float font-dancing text-primary" style={{animationDelay: '2s'}}>
          ✈
        </div>
        <div className="absolute bottom-20 right-10 w-8 h-8 opacity-20 -rotate-12 animate-drift" style={{animationDelay: '4s'}}>
          <Star className="w-full h-full text-yellow-600" />
        </div>
      </div>

      <div className="relative z-10 py-6 sm:py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 sm:mb-16 lg:mb-20 animate-fade-in-up">
            <div className="flex items-center justify-center gap-2 mb-6 sm:mb-8">
              <Button 
                variant="ghost" 
                onClick={onBack} 
                className="text-muted-foreground hover:text-foreground bg-white/80 border border-amber-200 text-sm sm:text-base rounded-full px-6 py-2 shadow-sm hover:shadow-md transition-all"
              >
                ← Back to Moods
              </Button>
            </div>
            
            <h1 className="font-playfair text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-amber-900 mb-6 sm:mb-8 tracking-tight px-4">
              Your Travel Journal
            </h1>
            <p className="font-dancing text-xl sm:text-2xl lg:text-3xl text-amber-700 mb-8 sm:mb-12 max-w-4xl mx-auto leading-relaxed px-4">
              Collect postcards from your dream destinations...
            </p>

            {/* Selected Moods Display - Styled as Travel Stamps */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-12 sm:mb-16 px-4">
              {selectedMoods.map((mood, index) => (
                <div 
                  key={mood} 
                  className="relative"
                  style={{ transform: `rotate(${(index % 3 - 1) * 3}deg)` }}
                >
                  <Badge 
                    variant="secondary" 
                    className="capitalize px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm bg-white border-2 border-dashed border-red-500 text-red-700 font-medium shadow-md"
                  >
                    {mood.replace('-', ' ')}
                  </Badge>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full opacity-80" />
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Regions */}
          {matchingRegions.length > 0 && (
            <div className="mb-12 sm:mb-16 lg:mb-20">
              <h2 className="text-2xl sm:text-3xl font-light text-foreground mb-8 sm:mb-12 text-center px-4">
                Perfect for Your Mood
              </h2>
              <div className="relative px-4">
                <div className="flex flex-col items-center gap-4 sm:gap-6 lg:gap-8 max-w-4xl mx-auto">
                  {matchingRegions.map((region, index) => (
                    <div
                      key={region.id}
                      className="w-full max-w-2xl"
                      style={{
                        transform: window.innerWidth >= 640 
                          ? `translateX(${index % 2 === 0 ? '-20px' : '20px'}) rotate(${index % 2 === 0 ? '-1deg' : '1deg'})`
                          : 'none',
                        zIndex: matchingRegions.length - index,
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
            <div className="mb-12 sm:mb-16 px-4">
              <h2 className="text-xl sm:text-2xl font-light text-muted-foreground mb-6 sm:mb-10 text-center">
                Other Beautiful Destinations
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-5xl mx-auto">
                {otherRegions.map((region, index) => (
                  <div
                    key={region.id}
                    style={{
                      transform: window.innerWidth >= 640 
                        ? `translateY(${(index % 3) * 10}px) rotate(${index % 2 === 0 ? '0.5deg' : '-0.5deg'})`
                        : 'none',
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
            <div className="text-center animate-fade-in-up relative z-20 px-4 pb-4 sm:pb-8">
              <div className="inline-block">
                <Button
                  onClick={onContinue}
                  variant="mood"
                  size="lg"
                  className="px-8 sm:px-12 lg:px-16 py-4 sm:py-5 lg:py-6 text-base sm:text-lg lg:text-xl backdrop-blur-sm bg-primary/90 border border-primary/30 hover:bg-primary shadow-glow hover:shadow-strong transition-all duration-300 hover:scale-105 w-full sm:w-auto max-w-sm sm:max-w-none"
                >
                  Discover Your Stays
                  <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 ml-2 sm:ml-3" />
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
  const stamp = regionStamps[region.id as keyof typeof regionStamps];
  const StampIcon = stamp.icon;
  
  const getCardStyle = () => {
    const rotation = isStaggered ? 0 : (cardIndex % 2 === 0 ? -1.5 : 1.5);
    return {
      animationDelay: `${animationDelay}ms`,
      transform: `rotate(${rotation}deg)`,
    };
  };

  return (
    <div
      className={`relative cursor-pointer transition-all duration-500 group animate-fade-in-up hover:rotate-0 hover:scale-105 hover:z-50
        ${isSelected ? 'scale-110 rotate-0 z-40' : ''}
      `}
      style={getCardStyle()}
      onClick={onClick}
    >
      {/* Postcard Base */}
      <Card className={`relative bg-gradient-to-br from-amber-50 to-orange-100 border-2 
        ${isSelected 
          ? 'border-amber-400 shadow-2xl' 
          : 'border-amber-200 shadow-lg hover:shadow-xl'
        }
        ${isRecommended ? 'border-red-300' : ''}
        rounded-lg overflow-hidden transition-all duration-300`}
      >
        {/* Postcard Top Section - Image Area */}
        <div className="relative h-32 sm:h-40 bg-gradient-to-r from-amber-100 to-orange-200 border-b-2 border-dashed border-amber-300">
          {/* Travel Stamp */}
          <div className={`absolute top-2 right-2 w-16 h-16 bg-white border-2 border-dashed ${stamp.color.replace('text-', 'border-')} rounded-lg flex flex-col items-center justify-center transform rotate-12 shadow-sm`}>
            <StampIcon className={`w-6 h-6 ${stamp.color}`} />
            <span className={`text-xs font-bold ${stamp.color} mt-1`}>
              {stamp.stamp}
            </span>
          </div>
          
          {/* Postmark */}
          <div className="absolute top-3 left-3 w-12 h-12 border-2 border-red-400 rounded-full flex items-center justify-center opacity-60">
            <div className="text-xs font-bold text-red-600 text-center leading-tight">
              SRI<br/>LANKA
            </div>
          </div>

          {/* Region Name - Vintage Style */}
          <div className="absolute bottom-2 left-3 right-3">
            <h3 className="font-playfair text-lg sm:text-xl font-bold text-amber-900 leading-tight">
              {region.name}
            </h3>
          </div>
        </div>

        {/* Postcard Message Area */}
        <div className="p-4 sm:p-6 bg-white/90">
          {/* Dear... greeting */}
          <div className="mb-3">
            <p className="font-dancing text-sm text-amber-700">
              Dear Traveler,
            </p>
          </div>

          {/* Main description */}
          <p className="text-sm text-amber-800 leading-relaxed mb-4 font-medium">
            {region.description}
          </p>

          {/* Highlights as handwritten notes */}
          <div className="space-y-2">
            <p className="font-dancing text-xs text-amber-600 font-medium">
              Must see & do:
            </p>
            <div className="flex flex-wrap gap-1.5">
              {region.highlights.map((highlight, idx) => (
                <span
                  key={highlight}
                  className="text-xs bg-yellow-100 text-amber-800 px-2 py-1 rounded-full border border-yellow-300 font-medium"
                  style={{ transform: `rotate(${(idx % 3 - 1) * 2}deg)` }}
                >
                  {highlight}
                </span>
              ))}
            </div>
          </div>

          {/* Signature */}
          <div className="mt-4 pt-3 border-t border-dashed border-amber-200">
            <p className="font-dancing text-sm text-amber-700 text-right">
              Wish you were here! ✈
            </p>
          </div>
        </div>

        {/* Selected Indicator */}
        {isSelected && (
          <div className="absolute top-3 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg animate-pulse">
            SELECTED
          </div>
        )}

        {/* Recommended Badge */}
        {isRecommended && (
          <div className="absolute -top-2 -left-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold transform -rotate-12 shadow-md">
            ⭐ TOP PICK
          </div>
        )}
      </Card>
    </div>
  );
}
