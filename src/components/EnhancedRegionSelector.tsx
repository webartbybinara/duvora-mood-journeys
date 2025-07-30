import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, 
  Thermometer, 
  Calendar, 
  Star, 
  Compass,
  Mountain,
  Waves,
  TreePine,
  Sun,
  Cloud,
  CloudRain,
  Crown
} from 'lucide-react';

interface Region {
  id: string;
  name: string;
  tagline: string;
  description: string;
  highlights: string[];
  bestTime: string;
  temperature: string;
  weatherIcon: React.ComponentType<{ className?: string }>;
  coordinates: { lat: number; lng: number };
  distanceFromColombo: string;
  travelTime: string;
  mood: string[];
  popularity: number;
  exclusivity: 'hidden-gem' | 'popular' | 'luxury';
  vintage: {
    era: string;
    pattern: string;
    stamp: string;
  };
}

const regions: Region[] = [
  {
    id: 'ella',
    name: 'Ella',
    tagline: 'Where clouds dance with tea leaves',
    description: 'Misty mountains, emerald tea plantations, and Instagram-worthy train journeys through paradise.',
    highlights: ['Nine Arch Bridge', 'Little Adam\'s Peak', 'Tea Plantations', 'Mountain Views'],
    bestTime: 'Dec - Mar',
    temperature: '18-25°C',
    weatherIcon: Cloud,
    coordinates: { lat: 6.8667, lng: 81.0500 },
    distanceFromColombo: '230km',
    travelTime: '6h by train',
    mood: ['peaceful', 'adventurous'],
    popularity: 9,
    exclusivity: 'popular',
    vintage: {
      era: '1920s Colonial',
      pattern: 'tea-leaf-border',
      stamp: 'mountain-peak'
    }
  },
  {
    id: 'galle',
    name: 'Galle',
    tagline: 'Where history meets the Indian Ocean',
    description: 'Colonial charm wrapped in ocean breezes, where cobblestone streets tell tales of Dutch merchants.',
    highlights: ['Galle Fort', 'Lighthouse', 'Boutique Hotels', 'Art Galleries'],
    bestTime: 'Nov - Apr',
    temperature: '26-30°C',
    weatherIcon: Sun,
    coordinates: { lat: 6.0535, lng: 80.2210 },
    distanceFromColombo: '120km',
    travelTime: '2h by highway',
    mood: ['romantic', 'beach'],
    popularity: 8,
    exclusivity: 'popular',
    vintage: {
      era: '1650s Dutch',
      pattern: 'colonial-ornament',
      stamp: 'lighthouse'
    }
  },
  {
    id: 'sigiriya',
    name: 'Sigiriya',
    tagline: 'Ancient kingdom floating in the clouds',
    description: 'A 5th-century fortress rising from jungle depths, where kings once ruled from the heavens.',
    highlights: ['Lion Rock', 'Royal Gardens', 'Frescoes', 'Jungle Safaris'],
    bestTime: 'May - Sep',
    temperature: '22-28°C',
    weatherIcon: Sun,
    coordinates: { lat: 7.9568, lng: 80.7599 },
    distanceFromColombo: '170km',
    travelTime: '4h by road',
    mood: ['adventurous', 'peaceful'],
    popularity: 10,
    exclusivity: 'popular',
    vintage: {
      era: '5th Century',
      pattern: 'ancient-sri-lankan',
      stamp: 'lion-paw'
    }
  },
  {
    id: 'mirissa',
    name: 'Mirissa',
    tagline: 'Where whales come to play',
    description: 'Golden crescents of sand meet turquoise waters, while blue whales dance just beyond the horizon.',
    highlights: ['Whale Watching', 'Secret Beach', 'Coconut Hill', 'Fresh Seafood'],
    bestTime: 'Nov - Apr',
    temperature: '27-32°C',
    weatherIcon: Sun,
    coordinates: { lat: 5.9487, lng: 80.4565 },
    distanceFromColombo: '150km',
    travelTime: '3h coastal drive',
    mood: ['beach', 'romantic'],
    popularity: 7,
    exclusivity: 'hidden-gem',
    vintage: {
      era: '1960s Surf',
      pattern: 'wave-motif',
      stamp: 'whale-tail'
    }
  }
];

interface EnhancedRegionSelectorProps {
  selectedMood: string | null;
  selectedRegion: string | null;
  onRegionSelect: (regionId: string) => void;
}

export function EnhancedRegionSelector({ selectedMood, selectedRegion, onRegionSelect }: EnhancedRegionSelectorProps) {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getRecommendedRegions = () => {
    if (!selectedMood) return [];
    return regions.filter(region => region.mood.includes(selectedMood));
  };

  const recommendedRegions = getRecommendedRegions();
  const otherRegions = regions.filter(region => !recommendedRegions.includes(region));

  const RegionCard = ({ region, isRecommended, isSelected }: { 
    region: Region; 
    isRecommended: boolean; 
    isSelected: boolean; 
  }) => {
    const isHovered = hoveredRegion === region.id;

    return (
      <Card
        className={`group relative overflow-hidden cursor-pointer transition-all duration-500 transform-gpu
          ${isSelected 
            ? 'ring-2 ring-primary shadow-dreamy scale-[1.02]' 
            : 'hover:scale-[1.01] hover:shadow-float'
          }
          ${isRecommended ? 'border-primary/30' : ''}
        `}
        onClick={() => onRegionSelect(region.id)}
        onMouseEnter={() => setHoveredRegion(region.id)}
        onMouseLeave={() => setHoveredRegion(null)}
      >
        {/* Vintage Postcard Background */}
        <div className="relative h-80 bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 dark:from-amber-900/20 dark:via-yellow-900/20 dark:to-orange-900/20">
          
          {/* Vintage Pattern Overlay */}
          <div className="absolute inset-0 opacity-5">
            <div className={`w-full h-full bg-repeat ${
              region.vintage.pattern === 'tea-leaf-border' ? 'bg-[url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23000000" fill-opacity="0.1"%3E%3Cpath d="M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zM10 50c11.046 0 20-8.954 20-20s-8.954-20-20-20-20 8.954-20 20 8.954 20 20 20z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")]' :
              region.vintage.pattern === 'wave-motif' ? 'bg-[url("data:image/svg+xml,%3Csvg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cpath d="M0 20c10 0 10-10 20-10s10 10 20 10v20H0V20z" fill="%23000000" fill-opacity="0.05"/%3E%3C/g%3E%3C/svg%3E")]' :
              'bg-[url("data:image/svg+xml,%3Csvg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Ccircle fill="%23000000" fill-opacity="0.05" cx="10" cy="10" r="2"/%3E%3C/g%3E%3C/svg%3E")]'
            }`} />
          </div>

          {/* Vintage Postcard Header */}
          <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-r from-red-600 via-red-500 to-red-600">
            <div className="flex items-center justify-between h-full px-4 text-white">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span className="font-dancing text-lg">Sri Lanka</span>
              </div>
              <div className="flex items-center space-x-2">
                <Crown className="w-4 h-4" />
                <span className="text-xs font-medium">{region.vintage.era}</span>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="pt-20 p-6 h-full flex flex-col">
            
            {/* Location Header */}
            <div className="mb-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-playfair text-2xl font-bold text-foreground">
                    {region.name}
                  </h3>
                  <p className="font-dancing text-lg text-primary italic">
                    {region.tagline}
                  </p>
                </div>
                
                {/* Vintage Stamp */}
                <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-red-700 rounded-sm border-4 border-white border-dashed flex items-center justify-center shadow-md transform rotate-12">
                  {region.vintage.stamp === 'whale-tail' && <Waves className="w-6 h-6 text-white" />}
                  {region.vintage.stamp === 'mountain-peak' && <Mountain className="w-6 h-6 text-white" />}
                  {region.vintage.stamp === 'lighthouse' && <Compass className="w-6 h-6 text-white" />}
                  {region.vintage.stamp === 'lion-paw' && <Crown className="w-6 h-6 text-white" />}
                </div>
              </div>
              
              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-3">
                {isRecommended && (
                  <Badge variant="default" className="bg-primary text-primary-foreground">
                    Perfect Match
                  </Badge>
                )}
                <Badge 
                  variant="outline" 
                  className={`${
                    region.exclusivity === 'hidden-gem' ? 'border-emerald-500 text-emerald-600' :
                    region.exclusivity === 'luxury' ? 'border-amber-500 text-amber-600' :
                    'border-blue-500 text-blue-600'
                  }`}
                >
                  {region.exclusivity === 'hidden-gem' ? 'Hidden Gem' :
                   region.exclusivity === 'luxury' ? 'Luxury' : 'Popular'}
                </Badge>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-grow">
              {region.description}
            </p>

            {/* Travel Info Grid */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="flex items-center space-x-2 text-xs">
                <region.weatherIcon className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground">{region.temperature}</span>
              </div>
              <div className="flex items-center space-x-2 text-xs">
                <Calendar className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground">{region.bestTime}</span>
              </div>
              <div className="flex items-center space-x-2 text-xs">
                <Compass className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground">{region.distanceFromColombo}</span>
              </div>
              <div className="flex items-center space-x-2 text-xs">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground">{region.travelTime}</span>
              </div>
            </div>

            {/* Highlights */}
            <div className="space-y-2">
              <h4 className="font-medium text-xs text-muted-foreground uppercase tracking-wider">
                Must Experience
              </h4>
              <div className="grid grid-cols-2 gap-1">
                {region.highlights.slice(0, 4).map((highlight, index) => (
                  <div key={index} className="flex items-center space-x-1">
                    <Star className="w-3 h-3 text-accent fill-current" />
                    <span className="text-xs text-muted-foreground truncate">
                      {highlight}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Popularity Indicator */}
            <div className="mt-4 pt-3 border-t border-border/50">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Popularity</span>
                <div className="flex space-x-1">
                  {[...Array(10)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-1 h-2 rounded-full ${
                        i < region.popularity 
                          ? 'bg-primary' 
                          : 'bg-muted'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Animated Weather Effect */}
          {isHovered && (
            <div className="absolute inset-0 pointer-events-none">
              {region.weatherIcon === Sun && (
                <div className="absolute top-20 right-6 w-8 h-8 bg-yellow-400/30 rounded-full animate-pulse-glow" />
              )}
              {region.weatherIcon === Cloud && (
                <>
                  <div className="absolute top-24 right-8 w-6 h-6 bg-white/40 rounded-full animate-drift" />
                  <div className="absolute top-28 right-12 w-4 h-4 bg-white/30 rounded-full animate-float" />
                </>
              )}
            </div>
          )}

          {/* Selection Glow */}
          {isSelected && (
            <div className="absolute inset-0 rounded-lg border-2 border-primary/50 animate-pulse-glow" />
          )}
        </div>
      </Card>
    );
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="font-playfair text-4xl md:text-5xl font-bold bg-gradient-tropical bg-clip-text text-transparent">
          Living Postcards from Paradise
        </h2>
        <p className="text-lg text-muted-foreground font-light max-w-2xl mx-auto">
          Each destination is a story waiting to be written, a memory waiting to be made
        </p>
      </div>

      {recommendedRegions.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center space-x-3">
            <Star className="w-6 h-6 text-primary fill-current" />
            <h3 className="font-playfair text-2xl font-semibold text-foreground">
              Curated for You
            </h3>
            <div className="flex-1 h-px bg-gradient-to-r from-primary/50 to-transparent" />
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedRegions.map((region) => (
              <RegionCard
                key={region.id}
                region={region}
                isRecommended={true}
                isSelected={selectedRegion === region.id}
              />
            ))}
          </div>
        </div>
      )}

      {otherRegions.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center space-x-3">
            <Compass className="w-6 h-6 text-muted-foreground" />
            <h3 className="font-playfair text-2xl font-semibold text-foreground">
              More Destinations
            </h3>
            <div className="flex-1 h-px bg-gradient-to-r from-muted-foreground/30 to-transparent" />
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherRegions.map((region) => (
              <RegionCard
                key={region.id}
                region={region}
                isRecommended={false}
                isSelected={selectedRegion === region.id}
              />
            ))}
          </div>
        </div>
      )}

      {/* Current Time & Weather Info */}
      <Card className="p-4 bg-gradient-serene border-border/50">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>Current time in Sri Lanka: {currentTime.toLocaleTimeString('en-US', { timeZone: 'Asia/Colombo' })}</span>
          <span className="flex items-center space-x-2">
            <Sun className="w-4 h-4" />
            <span>Perfect weather for exploring</span>
          </span>
        </div>
      </Card>
    </div>
  );
}