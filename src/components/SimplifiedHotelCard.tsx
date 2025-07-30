import { Star } from 'lucide-react';

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

interface SimplifiedHotelCardProps {
  hotel: Hotel;
  onClick: () => void;
}

export function SimplifiedHotelCard({ hotel, onClick }: SimplifiedHotelCardProps) {
  return (
    <button
      onClick={onClick}
      className="group text-left w-full rounded-lg border border-border bg-background hover:border-primary transition-all duration-200 overflow-hidden"
    >
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={hotel.image}
          alt={hotel.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-medium text-foreground">{hotel.name}</h3>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Star className="w-3 h-3 fill-current" />
            {hotel.rating}
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {hotel.description}
        </p>
        
        <div className="text-xs font-medium text-primary">
          {hotel.priceRange}
        </div>
      </div>
    </button>
  );
}