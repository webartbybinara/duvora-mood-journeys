import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Star, 
  MapPin, 
  ArrowLeft, 
  Wifi, 
  Car, 
  Coffee, 
  Waves, 
  TreePine, 
  Heart, 
  Camera,
  Calendar,
  Users,
  Clock,
  Check,
  ExternalLink
} from 'lucide-react';

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
  fullDescription?: string;
  highlights?: string[];
  location?: string;
  checkIn?: string;
  checkOut?: string;
  maxGuests?: number;
  pricePerNight?: number;
}

// Extended hotel data with detailed information
const detailedHotels: Hotel[] = [
  {
    id: 'serenity-kandy',
    name: 'Serenity Villa Kandy',
    tagline: 'Where silence speaks volumes',
    description: 'Nestled in the misty hills overlooking Kandy Lake, this boutique villa offers a sanctuary for the soul. Each morning begins with bird songs and ends with firefly dances.',
    fullDescription: 'Serenity Villa Kandy is more than just accommodation—it\'s a transformative experience nestled in the heart of Sri Lanka\'s cultural capital. This intimate boutique villa, perched on a hillside overlooking the sacred Kandy Lake, offers guests a perfect blend of traditional Kandyan architecture and modern luxury.\n\nThe villa features just six carefully designed suites, each with private balconies offering panoramic views of the misty hills and the Temple of the Tooth below. Wake up to the gentle sounds of tropical birds and the distant chanting from the temple, creating a natural meditation that sets the tone for peaceful days ahead.\n\nOur organic garden provides fresh ingredients for our farm-to-table dining experiences, while the dedicated yoga deck offers daily sessions with certified instructors. Evening brings the magical dance of fireflies in our grounds, creating an enchanting atmosphere perfect for romantic dinners or quiet contemplation.',
    image: soulfulSolitude,
    rating: 4.9,
    priceRange: 'Luxe on a Budget',
    region: 'kandy',
    tags: ['Soulful Solitude', 'Mountain Views', 'Eco-Friendly'],
    amenities: ['Free WiFi', 'Airport Transfer', 'Yoga Deck', 'Organic Garden', 'Lake Views', 'Cultural Tours', 'Meditation Sessions', 'Local Cuisine'],
    moodTags: ['soulful-solitude', 'sunrise-sessions'],
    highlights: [
      'Panoramic views of Kandy Lake and Temple of the Tooth',
      'Daily yoga sessions on elevated deck',
      'Organic farm-to-table dining experiences',
      'Evening firefly watching in private gardens',
      'Traditional Kandyan architecture with modern amenities',
      'Cultural immersion programs with local artisans'
    ],
    location: '2.5km from Temple of the Tooth, Kandy City Center',
    checkIn: '2:00 PM',
    checkOut: '12:00 PM',
    maxGuests: 2,
    pricePerNight: 185
  },
  {
    id: 'romantic-galle',
    name: 'Moonlit Galle Retreat',
    tagline: 'Love stories written in ocean breeze',
    description: 'An intimate colonial mansion where romance blooms in every corner. Candlelit dinners under frangipani trees and morning walks along the ancient fort walls.',
    fullDescription: 'Moonlit Galle Retreat is a lovingly restored 18th-century Dutch colonial mansion that epitomizes romance and elegance. Located within the UNESCO World Heritage Galle Fort, this intimate property offers just four luxury suites, each uniquely designed to tell a story of Sri Lanka\'s rich colonial heritage.\n\nThe mansion\'s architecture seamlessly blends Dutch colonial elements with tropical luxury, featuring high ceilings, antique furnishings, and private courtyards filled with frangipani trees. Each suite opens onto the mansion\'s central garden, where candlelit dinners are served under the stars.\n\nGuests can begin their day with a private breakfast on the ramparts of the ancient fort, followed by guided walks through cobblestone streets rich with history. Evenings are magical here—the property\'s private terrace offers unobstructed sunset views over the Indian Ocean, while the in-house chef prepares intimate dinners featuring fresh seafood and traditional Sri Lankan delicacies.',
    image: romanticHideouts,
    rating: 4.8,
    priceRange: 'Luxury Experience',
    region: 'galle',
    tags: ['Romantic Hideouts', 'Historic Charm', 'Sunset Views'],
    amenities: ['Private Pool', 'Spa Services', 'Fine Dining', 'Butler Service', 'Historic Tours', 'Sunset Terrace', 'Antique Collections', 'Ocean Views'],
    moodTags: ['romantic-hideouts', 'coastal-serenity'],
    highlights: [
      'Exclusive location within UNESCO World Heritage Galle Fort',
      'Private candlelit dinners in frangipani garden',
      'Sunset views from historic fort ramparts',
      'Personalized butler service for each suite',
      'Antique-filled interiors with colonial charm',
      'Private access to secluded beach coves'
    ],
    location: 'Within Galle Fort, 500m from Lighthouse',
    checkIn: '3:00 PM',
    checkOut: '12:00 PM',
    maxGuests: 2,
    pricePerNight: 425
  },
  {
    id: 'instagram-ella',
    name: 'Cloud Nine Ella',
    tagline: 'Every angle tells a story',
    description: 'Perched among the clouds with panoramic tea plantation views. This Instagram paradise offers picture-perfect moments from sunrise to sunset.',
    fullDescription: 'Cloud Nine Ella redefines the concept of Instagram-worthy travel. This architectural marvel, suspended 1,200 meters above sea level, offers guests an immersive experience in Sri Lanka\'s most photogenic landscape. The property features contemporary design that harmonizes with the natural environment, creating spaces that are both stunning to photograph and comfortable to inhabit.\n\nThe resort\'s infinity pool appears to merge with the cloud-covered valleys below, while each villa is positioned to maximize both privacy and views. Professional photography equipment is available for guests, along with complimentary drone sessions and guided photo tours to the most spectacular viewpoints.\n\nOur Social Media Concierge helps guests capture and curate their perfect Sri Lankan story, from sunrise yoga sessions overlooking tea plantations to helicopter tours over the cultural triangle. The property also features dedicated Instagram spots, professional lighting setups, and editing suites for content creators.',
    image: instagramWorthy,
    rating: 4.7,
    priceRange: 'Mid-Range Magic',
    region: 'ella',
    tags: ['Instagram Worthy', 'Tea Plantation Views', 'Adventure Base'],
    amenities: ['Infinity Pool', 'Photo Tours', 'Drone Views', 'Social Media Corner', 'Professional Photography', 'Helicopter Tours', 'Editing Suite', 'Content Creation'],
    moodTags: ['instagram-worthy', 'sunrise-sessions'],
    highlights: [
      'Infinity pool merging with cloud-covered valleys',
      'Professional photography equipment and guides',
      'Complimentary drone sessions for aerial content',
      'Social Media Concierge for content curation',
      'Helicopter tours over cultural landmarks',
      'Dedicated Instagram spots with professional lighting'
    ],
    location: 'Ella Rock vicinity, 3km from Nine Arch Bridge',
    checkIn: '2:00 PM',
    checkOut: '11:00 AM',
    maxGuests: 4,
    pricePerNight: 295
  }
];

function getMoodIcon(mood: string) {
  switch (mood) {
    case 'romantic-hideouts': return Heart;
    case 'instagram-worthy': return Camera;
    case 'soulful-solitude': return TreePine;
    case 'coastal-serenity': return Waves;
    case 'jungle-mornings': return TreePine;
    case 'sunrise-sessions': return Star;
    default: return Star;
  }
}

export default function HotelDetail() {
  const { hotelId } = useParams();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);
  
  const hotel = detailedHotels.find(h => h.id === hotelId);
  
  if (!hotel) {
    return (
      <div className="min-h-screen bg-gradient-serene flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-light text-foreground mb-4">Hotel not found</h1>
          <Button onClick={() => navigate('/discovery')} variant="outline">
            Back to Discovery
          </Button>
        </div>
      </div>
    );
  }

  const images = [hotel.image, soulfulSolitude, romanticHideouts, instagramWorthy, jungleMornings, heroDuvora];

  return (
    <div className="min-h-screen bg-gradient-serene">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              onClick={() => navigate(-1)}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="font-medium">{hotel.rating}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        {/* Image Gallery */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 lg:mb-8">
          <div className="lg:col-span-3">
            <div className="relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-[16/9] rounded-xl overflow-hidden">
              <img
                src={images[selectedImage]}
                alt={hotel.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-1 gap-2 lg:gap-3">
            {images.slice(0, 5).map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`relative aspect-square rounded-lg overflow-hidden transition-all ${
                  selectedImage === index ? 'ring-2 ring-primary' : 'hover:scale-105'
                }`}
              >
                <img src={image} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
          {/* Main Content */}
          <div className="xl:col-span-2 space-y-6">
            {/* Hotel Header */}
            <div>
              <h1 className="text-3xl lg:text-4xl xl:text-5xl font-light text-foreground mb-3">{hotel.name}</h1>
              <p className="text-primary font-medium text-lg lg:text-xl italic mb-4 lg:mb-6">{hotel.tagline}</p>
              
              <div className="flex flex-wrap gap-2 mb-4 lg:mb-6">
                <Badge variant="outline" className="capitalize">
                  <MapPin className="w-3 h-3 mr-1" />
                  {hotel.region}
                </Badge>
                <Badge variant="secondary">{hotel.priceRange}</Badge>
                {hotel.moodTags.map((mood) => {
                  const Icon = getMoodIcon(mood);
                  return (
                    <Badge key={mood} variant="default" className="capitalize">
                      <Icon className="w-3 h-3 mr-1" />
                      {mood.replace('-', ' ')}
                    </Badge>
                  );
                })}
              </div>
              
              <p className="text-muted-foreground leading-relaxed text-base lg:text-lg">{hotel.description}</p>
            </div>

            <Separator />

            {/* Tabs Content */}
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="amenities">Amenities</TabsTrigger>
                <TabsTrigger value="location">Location</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-6">
                <div>
                  <h3 className="text-xl lg:text-2xl font-semibold mb-4">About This Stay</h3>
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-line text-base lg:text-lg">
                    {hotel.fullDescription}
                  </p>
                </div>
                
                {hotel.highlights && (
                  <div>
                    <h3 className="text-xl lg:text-2xl font-semibold mb-4">Highlights</h3>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      {hotel.highlights.map((highlight, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground text-base">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="amenities" className="space-y-6">
                <div>
                  <h3 className="text-xl lg:text-2xl font-semibold mb-4">All Amenities</h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {hotel.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 lg:p-4 bg-muted/30 rounded-lg">
                        <div className="w-2 h-2 bg-primary rounded-full" />
                        <span className="text-base">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="location" className="space-y-6">
                <div>
                  <h3 className="text-xl lg:text-2xl font-semibold mb-4">Location Details</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-primary" />
                      <span className="text-base">{hotel.location || `Located in ${hotel.region}, Sri Lanka`}</span>
                    </div>
                    <div className="bg-muted/30 rounded-lg p-6 lg:p-8 text-center">
                      <ExternalLink className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-muted-foreground">Interactive map coming soon</p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Booking Sidebar */}
          <div className="xl:col-span-1">
            <Card className="sticky top-24 lg:top-28">
              <CardHeader className="pb-4">
                <CardTitle className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2">
                  <span className="text-lg lg:text-xl">Book Your Stay</span>
                  {hotel.pricePerNight && (
                    <span className="text-2xl lg:text-3xl font-light">
                      ${hotel.pricePerNight}
                      <span className="text-sm text-muted-foreground">/night</span>
                    </span>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 lg:space-y-6">
                <div className="grid grid-cols-2 gap-3 lg:gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <div className="font-medium">Check-in</div>
                      <div className="text-muted-foreground">{hotel.checkIn || '2:00 PM'}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <div className="font-medium">Check-out</div>
                      <div className="text-muted-foreground">{hotel.checkOut || '11:00 AM'}</div>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex items-center gap-2 text-sm lg:text-base">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <span>Max {hotel.maxGuests || 2} guests</span>
                </div>
                
                <div className="space-y-3">
                  <Button className="w-full" size="lg">
                    <Calendar className="w-4 h-4 mr-2" />
                    Check Availability
                  </Button>
                  <p className="text-xs text-center text-muted-foreground">
                    This is a demo booking system
                  </p>
                </div>
                
                <Separator />
                
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Base rate (demo)</span>
                    <span>${hotel.pricePerNight || 250}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Service fee</span>
                    <span>$25</span>
                  </div>
                  <div className="flex justify-between font-medium text-foreground border-t pt-2">
                    <span>Total per night</span>
                    <span>${(hotel.pricePerNight || 250) + 25}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}