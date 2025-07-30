import React, { useState } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Star, 
  MapPin, 
  Calendar, 
  Users, 
  Wifi, 
  Car, 
  Utensils, 
  Waves,
  Heart,
  Sparkles,
  TrendingUp,
  Award,
  Clock,
  ThumbsUp,
  Lightbulb,
  Zap
} from 'lucide-react';

interface Hotel {
  id: string;
  name: string;
  tagline: string;
  image: string;
  rating: number;
  priceRange: string;
  region: string;
  tags: string[];
  moodTags: string[];
  description?: string;
  amenities?: string[];
  lastBooked?: string;
  availability?: 'high' | 'medium' | 'low';
  seasonalScore?: number;
  trendingScore?: number;
}

interface EnhancedHotelCardProps {
  hotel: Hotel;
  selectedMood: string | null;
  selectedRegion: string | null;
  isRecommended?: boolean;
  onClick: () => void;
}

interface RecommendationReason {
  type: 'mood' | 'season' | 'trending' | 'exclusive' | 'value';
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  score: number;
}

export function EnhancedHotelCard({ 
  hotel, 
  selectedMood, 
  selectedRegion, 
  isRecommended, 
  onClick 
}: EnhancedHotelCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  // Calculate compatibility score
  const calculateCompatibilityScore = (): number => {
    let score = 0;
    
    // Mood compatibility (40% weight)
    if (selectedMood && hotel.moodTags.includes(selectedMood)) {
      score += 40;
    }
    
    // Region match (30% weight)
    if (selectedRegion && hotel.region === selectedRegion) {
      score += 30;
    }
    
    // Seasonal relevance (15% weight)
    score += (hotel.seasonalScore || 0) * 0.15;
    
    // Trending factor (10% weight)
    score += (hotel.trendingScore || 0) * 0.10;
    
    // Base quality (5% weight)
    score += hotel.rating * 1;
    
    return Math.min(Math.round(score), 100);
  };

  // Generate recommendation reasons
  const getRecommendationReasons = (): RecommendationReason[] => {
    const reasons: RecommendationReason[] = [];
    
    if (selectedMood && hotel.moodTags.includes(selectedMood)) {
      reasons.push({
        type: 'mood',
        icon: Sparkles,
        title: 'Perfect Mood Match',
        description: `Ideal for your ${selectedMood} getaway`,
        score: 95
      });
    }
    
    if (hotel.seasonalScore && hotel.seasonalScore > 80) {
      reasons.push({
        type: 'season',
        icon: Calendar,
        title: 'Perfect Season',
        description: 'Best time to visit right now',
        score: hotel.seasonalScore
      });
    }
    
    if (hotel.trendingScore && hotel.trendingScore > 85) {
      reasons.push({
        type: 'trending',
        icon: TrendingUp,
        title: 'Trending Now',
        description: 'Popular among recent travelers',
        score: hotel.trendingScore
      });
    }
    
    if (hotel.availability === 'low') {
      reasons.push({
        type: 'exclusive',
        icon: Award,
        title: 'Limited Availability',
        description: 'Only a few rooms left',
        score: 90
      });
    }
    
    if (hotel.rating >= 4.5) {
      reasons.push({
        type: 'value',
        icon: ThumbsUp,
        title: 'Exceptional Quality',
        description: `${hotel.rating}★ guest satisfaction`,
        score: hotel.rating * 20
      });
    }
    
    return reasons.slice(0, 3); // Show max 3 reasons
  };

  const compatibilityScore = calculateCompatibilityScore();
  const recommendationReasons = getRecommendationReasons();

  const getAvailabilityColor = () => {
    switch (hotel.availability) {
      case 'high': return 'text-emerald-600 bg-emerald-50';
      case 'medium': return 'text-amber-600 bg-amber-50';
      case 'low': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getAvailabilityText = () => {
    switch (hotel.availability) {
      case 'high': return 'Great Availability';
      case 'medium': return 'Limited Rooms';
      case 'low': return 'Almost Full';
      default: return 'Check Availability';
    }
  };

  return (
    <Card 
      className={`group relative overflow-hidden cursor-pointer transition-all duration-500 transform-gpu hover:shadow-dreamy
        ${isRecommended ? 'ring-2 ring-primary/30 shadow-float' : 'hover:shadow-medium'}
        ${isHovered ? 'scale-[1.02]' : 'hover:scale-[1.01]'}
      `}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={hotel.image} 
          alt={hotel.name}
          className={`w-full h-full object-cover transition-transform duration-700 ${
            isHovered ? 'scale-110' : 'scale-100'
          }`}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        
        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          {isRecommended && (
            <Badge className="bg-primary text-primary-foreground shadow-md">
              <Sparkles className="w-3 h-3 mr-1" />
              Perfect Match
            </Badge>
          )}
          {hotel.trendingScore && hotel.trendingScore > 85 && (
            <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md">
              <TrendingUp className="w-3 h-3 mr-1" />
              Trending
            </Badge>
          )}
        </div>
        
        {/* Compatibility Score */}
        {compatibilityScore > 70 && (
          <div className="absolute top-3 right-3">
            <div className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-md">
              <div className="relative w-8 h-8">
                <svg className="w-8 h-8 transform -rotate-90" viewBox="0 0 32 32">
                  <circle
                    cx="16"
                    cy="16"
                    r="12"
                    stroke="currentColor"
                    strokeWidth="3"
                    fill="transparent"
                    className="text-gray-200"
                  />
                  <circle
                    cx="16"
                    cy="16"
                    r="12"
                    stroke="currentColor"
                    strokeWidth="3"
                    fill="transparent"
                    strokeDasharray={`${compatibilityScore * 0.75} 75`}
                    className="text-primary transition-all duration-1000"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs font-bold text-primary">{compatibilityScore}</span>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Bottom Info */}
        <div className="absolute bottom-3 left-3 right-3">
          <div className="flex items-end justify-between">
            <div className="text-white">
              <h3 className="font-playfair text-xl font-bold mb-1">{hotel.name}</h3>
              <p className="font-dancing text-sm text-white/90 italic">{hotel.tagline}</p>
            </div>
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsLiked(!isLiked);
              }}
              className="p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-200"
            >
              <Heart className={`w-4 h-4 transition-colors ${
                isLiked ? 'text-red-500 fill-current' : 'text-white'
              }`} />
            </button>
          </div>
        </div>
        
        {/* Floating Animation Effect */}
        {isHovered && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white/40 rounded-full animate-float"
                style={{
                  left: `${20 + i * 15}%`,
                  top: `${30 + (i % 2) * 30}%`,
                  animationDelay: `${i * 0.3}s`,
                }}
              />
            ))}
          </div>
        )}
      </div>

      <CardContent className="p-4 space-y-4">
        {/* Rating and Location */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-amber-400 fill-current" />
            <span className="font-medium text-sm">{hotel.rating}</span>
          </div>
          <div className="flex items-center space-x-1 text-muted-foreground">
            <MapPin className="w-3 h-3" />
            <span className="text-xs">{hotel.region}</span>
          </div>
        </div>

        {/* Recommendation Reasons */}
        {recommendationReasons.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Lightbulb className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground">Why we recommend:</span>
            </div>
            <div className="space-y-1">
              {recommendationReasons.map((reason, index) => (
                <div key={index} className="flex items-center space-x-2 text-xs">
                  <reason.icon className="w-3 h-3 text-primary flex-shrink-0" />
                  <span className="text-muted-foreground">{reason.description}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-1">
          {hotel.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        {/* Availability Status */}
        <div className="flex items-center justify-between">
          <div className={`px-2 py-1 rounded-full text-xs font-medium ${getAvailabilityColor()}`}>
            {getAvailabilityText()}
          </div>
          <div className="text-right">
            <span className="font-playfair text-lg font-bold text-primary">
              {hotel.priceRange}
            </span>
            <div className="text-xs text-muted-foreground">per night</div>
          </div>
        </div>

        {/* Last Booked Info */}
        {hotel.lastBooked && (
          <div className="flex items-center space-x-1 text-xs text-muted-foreground">
            <Clock className="w-3 h-3" />
            <span>Last booked {hotel.lastBooked}</span>
          </div>
        )}
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button 
          className="w-full btn-floating group-hover:shadow-float"
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
        >
          <span>Explore Details</span>
          <Zap className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
        </Button>
      </CardFooter>

      {/* Pulse Effect for High Compatibility */}
      {compatibilityScore > 90 && (
        <div className="absolute inset-0 rounded-lg animate-pulse-glow pointer-events-none">
          <div className="absolute inset-0 rounded-lg ring-2 ring-primary/20" />
        </div>
      )}
    </Card>
  );
}