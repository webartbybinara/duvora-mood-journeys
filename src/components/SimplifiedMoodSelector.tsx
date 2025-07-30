import { cn } from '@/lib/utils';

interface MoodOption {
  id: string;
  name: string;
  emoji: string;
  description: string;
}

const moodOptions: MoodOption[] = [
  {
    id: 'soulful-solitude',
    name: 'Solitude',
    emoji: '🧘',
    description: 'Peaceful & reflective'
  },
  {
    id: 'romantic-hideouts',
    name: 'Romance',
    emoji: '💕',
    description: 'Intimate & cozy'
  },
  {
    id: 'coastal-serenity',
    name: 'Coastal',
    emoji: '🌊',
    description: 'Beach & ocean'
  },
  {
    id: 'instagram-worthy',
    name: 'Scenic',
    emoji: '📸',
    description: 'Picture perfect'
  },
  {
    id: 'sunrise-sessions',
    name: 'Adventure',
    emoji: '🌅',
    description: 'Active & exploratory'
  },
  {
    id: 'jungle-mornings',
    name: 'Wildlife',
    emoji: '🦎',
    description: 'Nature & safari'
  }
];

interface SimplifiedMoodSelectorProps {
  selectedMood: string | null;
  onMoodSelect: (moodId: string) => void;
}

export function SimplifiedMoodSelector({ selectedMood, onMoodSelect }: SimplifiedMoodSelectorProps) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-medium text-foreground mb-2">What's your mood?</h2>
        <p className="text-muted-foreground">Choose what you're looking for</p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {moodOptions.map((mood) => (
          <button
            key={mood.id}
            onClick={() => onMoodSelect(mood.id)}
            className={cn(
              "p-4 rounded-lg border transition-all duration-200 text-left group hover:border-primary",
              selectedMood === mood.id
                ? "border-primary bg-primary/5"
                : "border-border bg-background hover:bg-muted/50"
            )}
          >
            <div className="text-2xl mb-2">{mood.emoji}</div>
            <div className="text-sm font-medium mb-1">{mood.name}</div>
            <div className="text-xs text-muted-foreground">{mood.description}</div>
          </button>
        ))}
      </div>
    </div>
  );
}