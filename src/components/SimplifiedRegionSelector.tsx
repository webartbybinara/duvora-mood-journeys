import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin } from 'lucide-react';

interface Region {
  id: string;
  name: string;
  description: string;
  highlights: string[];
}

const regions: Region[] = [
  {
    id: 'galle',
    name: 'Galle',
    description: 'Historic coastal charm',
    highlights: ['Dutch Fort', 'Beach Resorts', 'Sunset Views']
  },
  {
    id: 'kandy',
    name: 'Kandy',
    description: 'Cultural heart in the hills',
    highlights: ['Temple of Tooth', 'Tea Estates', 'Mountain Views']
  },
  {
    id: 'ella',
    name: 'Ella',
    description: 'Instagram paradise',
    highlights: ['Nine Arch Bridge', 'Tea Plantations', 'Hiking']
  },
  {
    id: 'yala',
    name: 'Yala',
    description: 'Wild safari adventures',
    highlights: ['Safari Lodges', 'Wildlife', 'Luxury Camps']
  },
  {
    id: 'mirissa',
    name: 'Mirissa',
    description: 'Beach and whale watching',
    highlights: ['Whale Tours', 'Beach Clubs', 'Coconut Hill']
  },
  {
    id: 'sigiriya',
    name: 'Sigiriya',
    description: 'Ancient rock fortress',
    highlights: ['Rock Fortress', 'Sunrise Climbs', 'Heritage']
  }
];

interface SimplifiedRegionSelectorProps {
  selectedMood: string | null;
  selectedRegion: string | null;
  onRegionSelect: (regionId: string) => void;
}

export function SimplifiedRegionSelector({ selectedMood, selectedRegion, onRegionSelect }: SimplifiedRegionSelectorProps) {
  // Get recommended regions based on mood
  const getRecommendedRegions = () => {
    switch (selectedMood) {
      case 'romantic-hideouts':
        return ['galle', 'kandy'];
      case 'instagram-worthy':
        return ['ella', 'mirissa'];
      case 'soulful-solitude':
        return ['kandy', 'sigiriya'];
      case 'coastal-serenity':
        return ['mirissa', 'galle'];
      default:
        return [];
    }
  };

  const recommendedRegions = getRecommendedRegions();
  const recommended = regions.filter(region => recommendedRegions.includes(region.id));
  const others = regions.filter(region => !recommendedRegions.includes(region.id));

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-light text-foreground mb-6 text-center">
        Choose your destination
      </h2>
      
      {/* Recommended Regions */}
      {recommended.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-medium text-foreground mb-4 text-center">
            Perfect for your mood
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {recommended.map((region) => (
              <RegionCard
                key={region.id}
                region={region}
                isSelected={selectedRegion === region.id}
                isRecommended={true}
                onClick={() => onRegionSelect(region.id)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Other Regions */}
      {others.length > 0 && (
        <div>
          <h3 className="text-lg font-medium text-muted-foreground mb-4 text-center">
            Other destinations
          </h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {others.map((region) => (
              <RegionCard
                key={region.id}
                region={region}
                isSelected={selectedRegion === region.id}
                isRecommended={false}
                onClick={() => onRegionSelect(region.id)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

interface RegionCardProps {
  region: Region;
  isSelected: boolean;
  isRecommended: boolean;
  onClick: () => void;
}

function RegionCard({ region, isSelected, isRecommended, onClick }: RegionCardProps) {
  if (isRecommended) {
    return (
      <Card
        className={`cursor-pointer transition-all duration-300 p-6 ${
          isSelected
            ? 'ring-2 ring-primary shadow-lg bg-primary/5'
            : 'hover:shadow-md border-primary/20'
        }`}
        onClick={onClick}
      >
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary" />
            <h3 className="font-medium text-foreground">{region.name}</h3>
          </div>
          {isSelected && (
            <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full" />
            </div>
          )}
        </div>
        <p className="text-muted-foreground text-sm mb-3">{region.description}</p>
        <div className="flex flex-wrap gap-1">
          {region.highlights.slice(0, 2).map((highlight) => (
            <Badge key={highlight} variant="outline" className="text-xs">
              {highlight}
            </Badge>
          ))}
        </div>
      </Card>
    );
  }

  return (
    <Card
      className={`cursor-pointer transition-all duration-300 p-4 ${
        isSelected
          ? 'ring-2 ring-primary shadow-lg bg-primary/5'
          : 'hover:shadow-md'
      }`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-medium text-foreground text-sm">{region.name}</h3>
        {isSelected && (
          <div className="w-4 h-4 bg-primary rounded-full flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-white rounded-full" />
          </div>
        )}
      </div>
      <p className="text-muted-foreground text-xs">{region.description}</p>
    </Card>
  );
}
