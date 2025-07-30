import { cn } from '@/lib/utils';

interface Region {
  id: string;
  name: string;
  description: string;
}

const regions: Region[] = [
  { id: 'kandy', name: 'Kandy', description: 'Cultural heart & hills' },
  { id: 'galle', name: 'Galle', description: 'Historic coastal city' },
  { id: 'ella', name: 'Ella', description: 'Tea country views' },
  { id: 'yala', name: 'Yala', description: 'Wildlife safari' },
  { id: 'mirissa', name: 'Mirissa', description: 'Beach & whales' },
  { id: 'sigiriya', name: 'Sigiriya', description: 'Ancient rock fortress' }
];

interface SimplifiedRegionSelectorProps {
  selectedRegion: string | null;
  onRegionSelect: (regionId: string) => void;
}

export function SimplifiedRegionSelector({ selectedRegion, onRegionSelect }: SimplifiedRegionSelectorProps) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-medium text-foreground mb-2">Where to?</h2>
        <p className="text-muted-foreground">Pick your destination</p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {regions.map((region) => (
          <button
            key={region.id}
            onClick={() => onRegionSelect(region.id)}
            className={cn(
              "p-4 rounded-lg border transition-all duration-200 text-left hover:border-primary",
              selectedRegion === region.id
                ? "border-primary bg-primary/5"
                : "border-border bg-background hover:bg-muted/50"
            )}
          >
            <div className="text-sm font-medium mb-1">{region.name}</div>
            <div className="text-xs text-muted-foreground">{region.description}</div>
          </button>
        ))}
      </div>
    </div>
  );
}