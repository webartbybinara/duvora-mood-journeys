import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin, Wifi, Car, Coffee, Waves, TreePine, Heart, Camera } from 'lucide-react';

import soulfulSolitude from '@/assets/soulful-solitude.jpg';
import romanticHideouts from '@/assets/romantic-hideouts.jpg';
import instagramWorthy from '@/assets/instagram-worthy.jpg';

interface Hotel {
  id: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  rating: number;
  priceRange: string;
  region: string;
  tags: string[];
  amenities: string[];
  moodTags: string[];
}

const hotels: Hotel[] = [
  {
    id: 'serenity-kandy',
    name: 'Serenity Villa Kandy',
    tagline: 'Where silence speaks volumes',
    description: 'Nestled in the misty hills overlooking Kandy Lake, this boutique villa offers a sanctuary for the soul. Each morning begins with bird songs and ends with firefly dances.',
    image: soulfulSolitude,
    rating: 4.9,
    priceRange: 'Luxe on a Budget',
    region: 'kandy',
    tags: ['Soulful Solitude', 'Mountain Views', 'Eco-Friendly'],
    amenities: ['Free WiFi', 'Airport Transfer', 'Yoga Deck', 'Organic Garden'],
    moodTags: ['soulful-solitude', 'sunrise-sessions']
  },
  {
    id: 'romantic-galle',
    name: 'Moonlit Galle Retreat',
    tagline: 'Love stories written in ocean breeze',
    description: 'An intimate colonial mansion where romance blooms in every corner. Candlelit dinners under frangipani trees and morning walks along the ancient fort walls.',
    image: romanticHideouts,
    rating: 4.8,
    priceRange: 'Luxury Experience',
    region: 'galle',
    tags: ['Romantic Hideouts', 'Historic Charm', 'Sunset Views'],
    amenities: ['Private Pool', 'Spa Services', 'Fine Dining', 'Butler Service'],
    moodTags: ['romantic-hideouts', 'coastal-serenity']
  },
  {
    id: 'instagram-ella',
    name: 'Cloud Nine Ella',
    tagline: 'Every angle tells a story',
    description: 'Perched among the clouds with panoramic tea plantation views. This Instagram paradise offers picture-perfect moments from sunrise to sunset.',
    image: instagramWorthy,
    rating: 4.7,
    priceRange: 'Mid-Range Magic',
    region: 'ella',
    tags: ['Instagram Worthy', 'Tea Plantation Views', 'Adventure Base'],
    amenities: ['Infinity Pool', 'Photo Tours', 'Drone Views', 'Social Media Corner'],
    moodTags: ['instagram-worthy', 'sunrise-sessions']
  }
];

interface HotelListingsProps {
  selectedMoods: string[];
  selectedRegion: string;
  onBack: () => void;
  onHotelSelect: (hotelId: string) => void;
}

export function HotelListings({ selectedMoods, selectedRegion, onBack, onHotelSelect }: HotelListingsProps) {
  // Filter hotels by region and mood compatibility
  const filteredHotels = hotels.filter(hotel => 
    hotel.region === selectedRegion &&
    hotel.moodTags.some(tag => selectedMoods.includes(tag))
  );

  const otherHotels = hotels.filter(hotel => 
    hotel.region === selectedRegion &&
    !hotel.moodTags.some(tag => selectedMoods.includes(tag))
  );

  const getMoodIcon = (mood: string) => {
    switch (mood) {
      case 'romantic-hideouts': return Heart;
      case 'instagram-worthy': return Camera;
      case 'soulful-solitude': return TreePine;
      case 'coastal-serenity': return Waves;
      default: return Star;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-serene py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Button variant="ghost" onClick={onBack} className="text-muted-foreground hover:text-foreground">
              ← Back to Regions
            </Button>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-light text-foreground mb-4">
            Your perfect stays await
          </h1>
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
            Curated properties in {selectedRegion} that resonate with your chosen moods. Each stay promises a unique emotional journey.
          </p>

          {/* Selected Context */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            <Badge variant="outline" className="capitalize">
              <MapPin className="w-3 h-3 mr-1" />
              {selectedRegion}
            </Badge>
            {selectedMoods.map((mood) => {
              const Icon = getMoodIcon(mood);
              return (
                <Badge key={mood} variant="secondary" className="capitalize">
                  <Icon className="w-3 h-3 mr-1" />
                  {mood.replace('-', ' ')}
                </Badge>
              );
            })}
          </div>
        </div>

        {/* Perfect Matches */}
        {filteredHotels.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-light text-foreground mb-8 text-center">
              Perfect Matches for Your Mood
            </h2>
            <div className="space-y-8">
              {filteredHotels.map((hotel, index) => (
                <HotelCard
                  key={hotel.id}
                  hotel={hotel}
                  selectedMoods={selectedMoods}
                  isRecommended={true}
                  animationDelay={index * 200}
                  onClick={() => onHotelSelect(hotel.id)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Other Options */}
        {otherHotels.length > 0 && (
          <div className="mb-12">
            <h2 className="text-xl font-light text-muted-foreground mb-6 text-center">
              Other Beautiful Options
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {otherHotels.map((hotel, index) => (
                <HotelCard
                  key={hotel.id}
                  hotel={hotel}
                  selectedMoods={selectedMoods}
                  isRecommended={false}
                  animationDelay={(filteredHotels.length + index) * 200}
                  onClick={() => onHotelSelect(hotel.id)}
                />
              ))}
            </div>
          </div>
        )}

        {filteredHotels.length === 0 && otherHotels.length === 0 && (
          <div className="text-center py-16">
            <p className="text-xl text-muted-foreground mb-4">
              No stays found for this combination
            </p>
            <Button variant="outline" onClick={onBack}>
              Try a different region
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

interface HotelCardProps {
  hotel: Hotel;
  selectedMoods: string[];
  isRecommended: boolean;
  animationDelay: number;
  onClick: () => void;
}

function HotelCard({ hotel, selectedMoods, isRecommended, animationDelay, onClick }: HotelCardProps) {
  const matchingMoods = hotel.moodTags.filter(tag => selectedMoods.includes(tag));

  return (
    <Card
      className={`overflow-hidden cursor-pointer transition-all duration-500 hover:scale-[1.02] group ${
        isRecommended ? 'border-primary/30 shadow-float' : ''
      } hover:shadow-dreamy`}
      style={{
        animationDelay: `${animationDelay}ms`
      }}
      onClick={onClick}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
        {/* Image Section */}
        <div className="relative aspect-[4/3] lg:aspect-auto overflow-hidden">
          <img
            src={hotel.image}
            alt={hotel.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          
          {/* Floating Tags */}
          <div className="absolute top-4 left-4">
            {isRecommended && (
              <Badge className="bg-primary text-primary-foreground mb-2 animate-pulse-glow">
                Perfect Match
              </Badge>
            )}
            <Badge variant="secondary" className="bg-white/20 backdrop-blur-md text-white border-white/30">
              {hotel.priceRange}
            </Badge>
          </div>

          {/* Rating */}
          <div className="absolute top-4 right-4">
            <div className="bg-white/20 backdrop-blur-md rounded-full px-3 py-1 flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-white text-sm font-medium">{hotel.rating}</span>
            </div>
          </div>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Content Section */}
        <div className="p-8 flex flex-col justify-between">
          <div>
            <h3 className="text-2xl font-light text-foreground mb-2">
              {hotel.name}
            </h3>
            <p className="text-primary font-medium text-sm mb-4 italic">
              {hotel.tagline}
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              {hotel.description}
            </p>

            {/* Matching Mood Tags */}
            {matchingMoods.length > 0 && (
              <div className="mb-6">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
                  Matches Your Mood
                </p>
                <div className="flex flex-wrap gap-2">
                  {matchingMoods.map((mood) => (
                    <Badge
                      key={mood}
                      variant="default"
                      className="text-xs capitalize bg-primary/10 text-primary border-primary/20"
                    >
                      {mood.replace('-', ' ')}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Property Tags */}
            <div className="mb-6">
              <div className="flex flex-wrap gap-2">
                {hotel.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="text-xs border-border/50 hover:border-primary/50 transition-colors"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Amenities */}
            <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
              {hotel.amenities.slice(0, 4).map((amenity) => (
                <div key={amenity} className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-primary rounded-full" />
                  {amenity}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <Button variant="dreamy" className="w-full">
              Discover This Stay
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
