import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin } from 'lucide-react';

interface Hotel {
  id: string;
  name: string;
  tagline: string;
  image: string;
  rating: number;
  priceRange: string;
  region: string;
  tags: string[];
}

interface SimplifiedHotelCardProps {
  hotel: Hotel;
  isRecommended?: boolean;
  onClick: () => void;
}

export function SimplifiedHotelCard({ hotel, isRecommended, onClick }: SimplifiedHotelCardProps) {
  return (
    <Card 
      className="cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.01] overflow-hidden group"
      onClick={onClick}
    >
      <div className="relative aspect-[16/10]">
        <img
          src={hotel.image}
          alt={hotel.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Overlay content */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Top badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {isRecommended && (
            <Badge className="bg-primary text-primary-foreground text-xs">
              Perfect Match
            </Badge>
          )}
          <Badge variant="secondary" className="bg-white/20 backdrop-blur-sm text-white border-white/30 text-xs">
            {hotel.priceRange}
          </Badge>
        </div>

        {/* Rating */}
        <div className="absolute top-3 right-3">
          <div className="bg-white/20 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
            <Star className="w-3 h-3 text-yellow-400 fill-current" />
            <span className="text-white text-xs font-medium">{hotel.rating}</span>
          </div>
        </div>

        {/* Hotel info */}
        <div className="absolute bottom-3 left-3 right-3">
          <h3 className="text-white font-medium text-lg mb-1 line-clamp-1">
            {hotel.name}
          </h3>
          <p className="text-white/90 text-sm mb-2 line-clamp-1 italic">
            {hotel.tagline}
          </p>
          <div className="flex items-center gap-1 text-white/80">
            <MapPin className="w-3 h-3" />
            <span className="text-xs capitalize">{hotel.region}</span>
          </div>
        </div>
      </div>
    </Card>
  );
}