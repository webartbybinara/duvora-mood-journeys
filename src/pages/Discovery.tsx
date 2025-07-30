import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { SimplifiedMoodSelector } from '@/components/SimplifiedMoodSelector';
import { SimplifiedRegionSelector } from '@/components/SimplifiedRegionSelector';
import { SimplifiedHotelCard } from '@/components/SimplifiedHotelCard';
import { Navigation } from '@/components/Navigation';

// Import hotel data from HotelListings
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
    description: 'Nestled in the misty hills overlooking Kandy Lake, this boutique villa offers a sanctuary for the soul.',
    image: soulfulSolitude,
    rating: 4.9,
    priceRange: 'Luxe on a Budget',
    region: 'kandy',
    tags: ['Soulful Solitude', 'Mountain Views', 'Eco-Friendly'],
    amenities: ['Free WiFi', 'Airport Transfer', 'Yoga Deck', 'Organic Garden'],
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
    description: 'An intimate colonial mansion where romance blooms in every corner.',
    image: romanticHideouts,
    rating: 4.8,
    priceRange: 'Luxury Experience',
    region: 'galle',
    tags: ['Romantic Hideouts', 'Historic Charm', 'Sunset Views'],
    amenities: ['Private Pool', 'Spa Services', 'Fine Dining', 'Butler Service'],
    moodTags: ['romantic-hideouts', 'coastal-serenity']
  },
  {
    id: 'lighthouse-galle',
    name: 'Lighthouse Bay Resort',
    tagline: 'Where the ocean meets your dreams',
    description: 'A contemporary beachfront resort with panoramic Indian Ocean views.',
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
    description: 'Perched among the clouds with panoramic tea plantation views.',
    image: instagramWorthy,
    rating: 4.7,
    priceRange: 'Mid-Range Magic',
    region: 'ella',
    tags: ['Instagram Worthy', 'Tea Plantation Views', 'Adventure Base'],
    amenities: ['Infinity Pool', 'Photo Tours', 'Drone Views', 'Social Media Corner'],
    moodTags: ['instagram-worthy', 'sunrise-sessions']
  },
  {
    id: 'peak-ella',
    name: 'Little Adams Peak Resort',
    tagline: 'Conquer peaks, capture moments',
    description: 'Adventure-focused luxury resort at the base of Little Adams Peak.',
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
    description: 'Luxury tented camp in the heart of Yala, offering unparalleled wildlife viewing.',
    image: jungleMornings,
    rating: 4.8,
    priceRange: 'Luxury Experience',
    region: 'yala',
    tags: ['Safari Lodge', 'Wildlife Viewing', 'Luxury Tents'],
    amenities: ['Game Drives', 'Wildlife Photography', 'Bush Dinners', 'Nature Guides'],
    moodTags: ['jungle-mornings', 'sunrise-sessions']
  },
  // Mirissa Hotels
  {
    id: 'whale-mirissa',
    name: 'Whale Song Beach Villa',
    tagline: 'Dance with giants of the deep',
    description: 'Beachfront villa specializing in whale watching experiences.',
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
    description: 'Hilltop retreat with panoramic ocean views.',
    image: instagramWorthy,
    rating: 4.9,
    priceRange: 'Luxury Experience',
    region: 'mirissa',
    tags: ['Hilltop Views', 'Bohemian Style', 'Sunset Spots'],
    amenities: ['Infinity Pool', 'Yoga Deck', 'Sunset Bar', 'Beach Shuttle'],
    moodTags: ['instagram-worthy', 'coastal-serenity']
  },
  // Sigiriya Hotels
  {
    id: 'rock-sigiriya',
    name: 'Ancient Rock Resort',
    tagline: 'Wake up to 1500 years of history',
    description: 'Luxury resort with direct views of Sigiriya Rock.',
    image: heroDuvora,
    rating: 4.8,
    priceRange: 'Luxury Experience',
    region: 'sigiriya',
    tags: ['Rock Views', 'Archaeological Tours', 'Sunrise Climbs'],
    amenities: ['Private Guides', 'Sunrise Tours', 'Archaeological Insights', 'Cultural Performances'],
    moodTags: ['sunrise-sessions', 'soulful-solitude']
  }
];

export default function Discovery() {
  const navigate = useNavigate();
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [filteredHotels, setFilteredHotels] = useState<Hotel[]>([]);

  const handleMoodSelect = (moodId: string) => {
    setSelectedMood(moodId);
    setSelectedRegion(null); // Reset region when mood changes
  };

  const handleRegionSelect = (regionId: string) => {
    setSelectedRegion(regionId);
  };

  const handleHotelSelect = (hotelId: string) => {
    navigate(`/hotel/${hotelId}`);
  };

  const handleStartOver = () => {
    setSelectedMood(null);
    setSelectedRegion(null);
    setFilteredHotels([]);
  };

  // Filter hotels when mood and region change
  useEffect(() => {
    if (selectedMood && selectedRegion) {
      const perfect = hotels.filter(hotel => 
        hotel.region === selectedRegion &&
        hotel.moodTags.includes(selectedMood)
      );
      
      const others = hotels.filter(hotel => 
        hotel.region === selectedRegion &&
        !hotel.moodTags.includes(selectedMood)
      );

      setFilteredHotels([...perfect, ...others]);
    } else {
      setFilteredHotels([]);
    }
  }, [selectedMood, selectedRegion]);

  return (
    <>
      <Navigation />
      <main className="pt-16 min-h-screen bg-background">
        <div className="container mx-auto max-w-4xl px-4 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-medium text-foreground mb-4">
              Find Your Stay
            </h1>
            <p className="text-muted-foreground max-w-lg mx-auto mb-8">
              Discover the perfect accommodation in Sri Lanka
            </p>
            {(selectedMood || selectedRegion) && (
              <Button variant="outline" onClick={handleStartOver} size="sm">
                Reset
              </Button>
            )}
          </div>

          <div className="space-y-12">
            {/* Step 1: Mood Selection */}
            {!selectedMood && (
              <SimplifiedMoodSelector
                selectedMood={selectedMood}
                onMoodSelect={handleMoodSelect}
              />
            )}

            {/* Step 2: Region Selection */}
            {selectedMood && !selectedRegion && (
              <SimplifiedRegionSelector
                selectedRegion={selectedRegion}
                onRegionSelect={handleRegionSelect}
              />
            )}

            {/* Step 3: Hotel Results */}
            {selectedMood && selectedRegion && (
              <div className="space-y-8">
                <div className="text-center">
                  <h2 className="text-2xl font-medium text-foreground mb-2">
                    Available Hotels
                  </h2>
                  <p className="text-muted-foreground">
                    Hotels in {selectedRegion}
                  </p>
                </div>

                {filteredHotels.length > 0 ? (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredHotels.map((hotel) => (
                      <SimplifiedHotelCard
                        key={hotel.id}
                        hotel={hotel}
                        onClick={() => handleHotelSelect(hotel.id)}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">
                      No hotels found. Try a different selection.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}