import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin, Wifi, Car, Coffee, Waves, TreePine, Heart, Camera } from 'lucide-react';

import soulfulSolitude from '@/assets/soulful-solitude.jpg';
import romanticHideouts from '@/assets/romantic-hideouts.jpg';
import instagramWorthy from '@/assets/instagram-worthy.jpg';
import jungleMornings from '@/assets/jungle-mornings.jpg';
import heroDuvora from '@/assets/hero-duvora.jpg';

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
  // Kandy Hotels
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
    id: 'highland-kandy',
    name: 'Highland Tea Retreat',
    tagline: 'Sip tranquility with every sunrise',
    description: 'A boutique tea estate hotel where guests wake up to mist-covered plantations and experience the art of tea-making firsthand.',
    image: heroDuvora,
    rating: 4.7,
    priceRange: 'Mid-Range Magic',
    region: 'kandy',
    tags: ['Tea Experience', 'Cultural Heritage', 'Mountain Escape'],
    amenities: ['Tea Tasting', 'Cultural Tours', 'Meditation Garden', 'Local Cuisine'],
    moodTags: ['soulful-solitude', 'sunrise-sessions']
  },
  {
    id: 'royal-kandy',
    name: 'Royal Kandy Sanctuary',
    tagline: 'Where ancient royalty meets modern comfort',
    description: 'A heritage hotel overlooking the Temple of the Tooth, blending royal Sri Lankan architecture with contemporary luxury.',
    image: soulfulSolitude,
    rating: 4.8,
    priceRange: 'Luxury Experience',
    region: 'kandy',
    tags: ['Heritage Hotel', 'Temple Views', 'Royal Architecture'],
    amenities: ['Spa Services', 'Cultural Performances', 'Fine Dining', 'Temple Tours'],
    moodTags: ['romantic-hideouts', 'soulful-solitude']
  },

  // Galle Hotels
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
    id: 'fort-galle',
    name: 'Old Fort Heritage Villa',
    tagline: 'History whispers in every corner',
    description: 'A beautifully restored Dutch colonial villa within the UNESCO World Heritage Galle Fort, offering intimate luxury steps from historic ramparts.',
    image: heroDuvora,
    rating: 4.9,
    priceRange: 'Luxury Experience',
    region: 'galle',
    tags: ['UNESCO Heritage', 'Colonial Architecture', 'Historic Location'],
    amenities: ['Heritage Tours', 'Antique Collections', 'Rooftop Terrace', 'Art Gallery'],
    moodTags: ['romantic-hideouts', 'instagram-worthy']
  },
  {
    id: 'lighthouse-galle',
    name: 'Lighthouse Bay Resort',
    tagline: 'Where the ocean meets your dreams',
    description: 'A contemporary beachfront resort with panoramic Indian Ocean views, perfect for both relaxation and Instagram-worthy moments.',
    image: romanticHideouts,
    rating: 4.6,
    priceRange: 'Mid-Range Magic',
    region: 'galle',
    tags: ['Beachfront', 'Ocean Views', 'Modern Design'],
    amenities: ['Beach Access', 'Water Sports', 'Infinity Pool', 'Sunset Deck'],
    moodTags: ['coastal-serenity', 'instagram-worthy']
  },

  // Ella Hotels
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
  },
  {
    id: 'ninearch-ella',
    name: 'Nine Arch Lodge',
    tagline: 'Wake up to train whistles and mountain echoes',
    description: 'A charming eco-lodge overlooking the famous Nine Arch Bridge, where guests can watch trains pass through lush green valleys.',
    image: heroDuvora,
    rating: 4.5,
    priceRange: 'Luxe on a Budget',
    region: 'ella',
    tags: ['Eco-Lodge', 'Train Views', 'Bridge Views'],
    amenities: ['Train Spotting Deck', 'Hiking Trails', 'Local Breakfast', 'Nature Walks'],
    moodTags: ['instagram-worthy', 'soulful-solitude']
  },
  {
    id: 'peak-ella',
    name: 'Little Adams Peak Resort',
    tagline: 'Conquer peaks, capture moments',
    description: 'Adventure-focused luxury resort at the base of Little Adams Peak, offering guided hikes and stunning sunrise experiences.',
    image: instagramWorthy,
    rating: 4.8,
    priceRange: 'Luxury Experience',
    region: 'ella',
    tags: ['Adventure Resort', 'Peak Views', 'Hiking Base'],
    amenities: ['Guided Hikes', 'Adventure Gear', 'Sunrise Tours', 'Photography Workshops'],
    moodTags: ['sunrise-sessions', 'instagram-worthy']
  },

  // Yala Hotels
  {
    id: 'safari-yala',
    name: 'Yala Safari Sanctuary',
    tagline: 'Where the wild things roam free',
    description: 'Luxury tented camp in the heart of Yala, offering unparalleled wildlife viewing and the thrill of sleeping under stars with leopard calls as lullabies.',
    image: jungleMornings,
    rating: 4.8,
    priceRange: 'Luxury Experience',
    region: 'yala',
    tags: ['Safari Lodge', 'Wildlife Viewing', 'Luxury Tents'],
    amenities: ['Game Drives', 'Wildlife Photography', 'Bush Dinners', 'Nature Guides'],
    moodTags: ['jungle-mornings', 'sunrise-sessions']
  },
  {
    id: 'leopard-yala',
    name: 'Leopard Rock Lodge',
    tagline: 'Sleep where leopards prowl',
    description: 'An eco-luxury camp built around ancient rock formations, offering intimate wildlife encounters and sustainable jungle experiences.',
    image: heroDuvora,
    rating: 4.6,
    priceRange: 'Mid-Range Magic',
    region: 'yala',
    tags: ['Eco-Lodge', 'Rock Formations', 'Sustainable Tourism'],
    amenities: ['Eco Tours', 'Bird Watching', 'Rock Climbing', 'Conservation Programs'],
    moodTags: ['jungle-mornings', 'soulful-solitude']
  },

  // Mirissa Hotels
  {
    id: 'whale-mirissa',
    name: 'Whale Song Beach Villa',
    tagline: 'Dance with giants of the deep',
    description: 'Beachfront villa specializing in whale watching experiences, where the rhythm of waves matches the excitement of spotting blue whales.',
    image: romanticHideouts,
    rating: 4.7,
    priceRange: 'Mid-Range Magic',
    region: 'mirissa',
    tags: ['Whale Watching', 'Beachfront', 'Marine Life'],
    amenities: ['Whale Tours', 'Beach Access', 'Snorkeling Gear', 'Marine Biology Tours'],
    moodTags: ['coastal-serenity', 'sunrise-sessions']
  },
  {
    id: 'coconut-mirissa',
    name: 'Coconut Hill Hideaway',
    tagline: 'Bohemian vibes meet tropical luxury',
    description: 'Hilltop retreat with panoramic ocean views, perfect for sunset yoga sessions and Instagram-worthy infinity pool shots.',
    image: instagramWorthy,
    rating: 4.9,
    priceRange: 'Luxury Experience',
    region: 'mirissa',
    tags: ['Hilltop Views', 'Bohemian Style', 'Sunset Spots'],
    amenities: ['Infinity Pool', 'Yoga Deck', 'Sunset Bar', 'Beach Shuttle'],
    moodTags: ['instagram-worthy', 'coastal-serenity']
  },
  {
    id: 'paradise-mirissa',
    name: 'Paradise Beach Resort',
    tagline: 'Where every moment feels like vacation',
    description: 'Family-friendly beachfront resort with vibrant social spaces, perfect for those seeking both relaxation and connection.',
    image: heroDuvora,
    rating: 4.4,
    priceRange: 'Luxe on a Budget',
    region: 'mirissa',
    tags: ['Family Friendly', 'Social Spaces', 'Beach Activities'],
    amenities: ['Kids Club', 'Beach Volleyball', 'Water Sports', 'Social Events'],
    moodTags: ['coastal-serenity', 'romantic-hideouts']
  },

  // Sigiriya Hotels
  {
    id: 'rock-sigiriya',
    name: 'Ancient Rock Resort',
    tagline: 'Wake up to 1500 years of history',
    description: 'Luxury resort with direct views of Sigiriya Rock, offering exclusive sunrise climbing experiences and archaeological insights.',
    image: heroDuvora,
    rating: 4.8,
    priceRange: 'Luxury Experience',
    region: 'sigiriya',
    tags: ['Rock Views', 'Archaeological Tours', 'Sunrise Climbs'],
    amenities: ['Private Guides', 'Sunrise Tours', 'Archaeological Insights', 'Cultural Performances'],
    moodTags: ['sunrise-sessions', 'soulful-solitude']
  },
  {
    id: 'dambulla-sigiriya',
    name: 'Dambulla Cave Sanctuary',
    tagline: 'Sleep among ancient wonders',
    description: 'Boutique hotel near the famous cave temples, blending spiritual tranquility with modern comfort.',
    image: soulfulSolitude,
    rating: 4.6,
    priceRange: 'Mid-Range Magic',
    region: 'sigiriya',
    tags: ['Cave Temples', 'Spiritual Retreat', 'Cultural Heritage'],
    amenities: ['Temple Tours', 'Meditation Sessions', 'Cultural Workshops', 'Ayurvedic Spa'],
    moodTags: ['soulful-solitude', 'sunrise-sessions']
  },
  {
    id: 'fortress-sigiriya',
    name: 'Sky Fortress Eco Lodge',
    tagline: 'Elevated experiences in ancient lands',
    description: 'Eco-friendly treehouse lodge offering unique elevated accommodations with panoramic views of the cultural triangle.',
    image: jungleMornings,
    rating: 4.5,
    priceRange: 'Luxe on a Budget',
    region: 'sigiriya',
    tags: ['Eco-Lodge', 'Treehouse', 'Cultural Triangle'],
    amenities: ['Elevated Views', 'Eco Tours', 'Bird Watching', 'Sustainable Practices'],
    moodTags: ['jungle-mornings', 'instagram-worthy']
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
